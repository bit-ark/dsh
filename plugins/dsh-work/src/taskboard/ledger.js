/**
 * dsh-work taskboard — Host 权威任务账本：串行动作、原子持久化、幂等请求、目录锁。
 *
 * Ported from zhu1090093659/dsh-web-ui packages/dsh-task-board
 * src/host-ledger.ts (Apache-2.0)。移植裁剪：去掉浏览器 v1 import 动作与
 * 多浏览器合并逻辑；账本目录改为 $DSH_HOME/dsh-work，与上游
 * $DSH_HOME/task-board 隔离，两个插件可共存但数据不互通。
 *
 * 文档形状：{ schemaVersion: 2, revision, tasks, scheduler, recentRequests }，
 * 临时文件 + 原子 rename 持久化；最近 256 个 requestId 的动作 SHA-256 指纹
 * 随账本持久化，Host 重启后的变更重试保持幂等。
 */
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { chmodSync, closeSync, existsSync, fsyncSync, mkdirSync, openSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { dshHome } from './dsh-home.js'
import { isValidCron, nextRunAtMs } from './schedule.js'
import { parseLedger } from './parse.js'
import {
  applyArchiveTask, applyCreateTask, applyDeleteTask, applyRestoreTask,
  applyScheduleNextRun, applySetSchedule, applyUpdateTask,
  canMoveManually, settleExecution, startExecution, withStatus,
} from './domain.js'

export const TASKBOARD_SCHEMA_VERSION = 2

const MAX_REQUEST_CACHE = 256
const PROCESS_PROBE_TIMEOUT_MS = 3000

function timeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'local'
}

function cloneTasks(tasks) {
  return JSON.parse(JSON.stringify(tasks))
}

function hasOpenExecution(task) {
  return task.executions.some(execution => execution.endedAt === undefined)
}

/**
 * 已死但仍占据 PID 表的进程状态：'Z'（僵尸）与 'X'（死亡待回收）。
 * process.kill(pid, 0) 会把这类 PID 报为存活；崩溃残留锁的进程若变成僵尸且
 * 一直不被回收，不先查状态就会把账本启动永久阻塞。
 */
const DEAD_STATES = new Set(['Z', 'X'])

/**
 * 尽力获取进程单字母状态（'R'/'S'/'D'/'Z' 等），平台探测不可用时返回
 * undefined。Linux 直读 /proc/<pid>/stat（无子进程）；其他 POSIX 走
 * ps -o stat=；Windows 没有僵尸态，返回 undefined，由 kill(0) 单独裁定。
 */
function processState(pid) {
  if (process.platform === 'linux') {
    try {
      const stat = readFileSync(`/proc/${pid}/stat`, 'utf8')
      const end = stat.lastIndexOf(')')
      if (end === -1) return undefined
      return stat.slice(end + 2).split(' ')[0] || undefined
    } catch {
      return undefined // 无此进程（或不可读）
    }
  }
  if (process.platform === 'win32') return undefined
  try {
    const probe = spawnSync('ps', ['-o', 'stat=', '-p', String(pid)], { timeout: PROCESS_PROBE_TIMEOUT_MS })
    if (probe.status !== 0 || probe.stdout.length === 0) return undefined
    const state = probe.stdout.toString('utf8').trim()
    return state.length > 0 ? state[0] : undefined
  } catch {
    return undefined
  }
}

function processIsAlive(pid) {
  if (!Number.isSafeInteger(pid) || pid <= 0) return false
  const state = processState(pid)
  if (state !== undefined && DEAD_STATES.has(state)) return false
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return error.code !== 'ESRCH'
  }
}

/**
 * Linux 专用：直读 /proc/<pid>/stat 的精确启动时刻（Unix 纪元毫秒）。
 * 第 22 字段 = 开机以来的 clock tick，btime = 开机纪元秒；无子进程、无取整，
 * 上一轮启动记录的 startedAt 可与存活进程身份精确比对。
 */
function linuxStartTimeMs(pid) {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, 'utf8')
    const end = stat.lastIndexOf(')')
    if (end === -1) return undefined
    const ticks = Number(stat.slice(end + 2).split(' ')[19])
    if (!Number.isFinite(ticks)) return undefined
    const bootMatch = /^btime\s+(\d+)/m.exec(readFileSync('/proc/stat', 'utf8'))
    if (bootMatch === null) return undefined
    const btime = Number(bootMatch[1])
    if (!Number.isFinite(btime)) return undefined
    return btime * 1000 + (ticks * 1000) / 100 // Linux USER_HZ 为 100
  } catch {
    return undefined
  }
}

let ownStartTime
let ownStartTimeResolved = false

/**
 * 尽力获取存活进程的启动时刻（Unix 纪元毫秒）。用于证明账本锁确实属于其中记录
 * 的 PID：崩溃残留的 PID 被无关进程复用时（上游 issue #786）应识别为陈旧锁而非
 * 永久阻塞启动。平台探测不可用时返回 undefined，调用方失败即关闭。
 */
function processStartTimeMs(pid) {
  if (process.platform === 'linux') return linuxStartTimeMs(pid)
  if (process.platform === 'win32') {
    const probe = spawnSync(
      'powershell',
      ['-NoProfile', '-NonInteractive', '-Command',
        '[DateTimeOffset]::FromFileTime((Get-Process -Id ' + String(pid) + ' -ErrorAction SilentlyContinue).StartTime.ToUniversalTime().ToFileTime()).ToUnixTimeMilliseconds()'],
      { timeout: PROCESS_PROBE_TIMEOUT_MS, windowsHide: true },
    )
    if (probe.status !== 0 || probe.stdout.length === 0) return undefined
    const started = Number(probe.stdout.toString('utf8').trim())
    return Number.isFinite(started) ? started : undefined
  }
  // POSIX：ps lstart（强制英文 locale），失败回退 elapsed 秒数列。
  const env = { ...process.env, LC_ALL: 'C' }
  const probe = spawnSync('ps', ['-o', 'lstart=', '-p', String(pid)], { timeout: PROCESS_PROBE_TIMEOUT_MS, env })
  if (probe.status === 0 && probe.stdout.length > 0) {
    const started = Date.parse(probe.stdout.toString('utf8').trim())
    if (Number.isFinite(started)) return started
  }
  const elapsed = spawnSync('ps', ['-o', 'etimes=', '-p', String(pid)], { timeout: PROCESS_PROBE_TIMEOUT_MS, env })
  if (elapsed.status !== 0 || elapsed.stdout.length === 0) return undefined
  const seconds = Number(elapsed.stdout.toString('utf8').trim())
  if (!Number.isFinite(seconds)) return undefined
  return Date.now() - seconds * 1000
}

function ownProcessStartTimeMs() {
  if (!ownStartTimeResolved) {
    ownStartTimeResolved = true
    ownStartTime = processStartTimeMs(process.pid)
  }
  return ownStartTime
}

/**
 * 旧式锁记录的有界容差。毫秒级探测（probe:'exact'）写入的锁严格比对；
 * 其余（秒级 ps 探测写入的旧锁）允许 2s 误差——把同一存活进程的秒级取整
 * 差异误判为 PID 复用，会抢走活锁并放出第二个账本写入者。
 */
const LEGACY_START_TOLERANCE_MS = 2000

/** 记录的启动时刻是否证明锁属于另一个进程。 */
function startTimeMismatch(recorded, actual, exact) {
  return exact ? recorded !== actual : Math.abs(recorded - actual) > LEGACY_START_TOLERANCE_MS
}

/** 加载时修复无效 cron：保留规则但解除武装（parseLedger 会直接丢弃它们）。 */
function parseHostTasks(values) {
  const rawById = new Map()
  for (const value of values) {
    if (typeof value !== 'object' || value === null) continue
    if (typeof value.id === 'string') rawById.set(value.id, value)
  }
  return parseLedger(JSON.stringify(values)).map(task => {
    const rawSchedule = rawById.get(task.id)?.schedule
    if (typeof rawSchedule !== 'object' || rawSchedule === null) return task
    if (typeof rawSchedule.cron !== 'string' || isValidCron(rawSchedule.cron)) return task
    return {
      ...task,
      schedule: {
        enabled: false,
        cron: rawSchedule.cron,
        nextRunAt: undefined,
        lastTriggeredAt: typeof rawSchedule.lastTriggeredAt === 'number' && Number.isFinite(rawSchedule.lastTriggeredAt)
          ? rawSchedule.lastTriggeredAt
          : undefined,
      },
    }
  })
}

export class TaskboardLedger {
  #document
  #listeners = new Set()
  #requestCache = new Map()
  #lockToken = crypto.randomUUID()
  #lockFd
  #now

  /** 账本主文件。 */
  file
  /** 目录锁文件（同一时间只允许一个 Host 进程持有）。 */
  lockFile
  /** 30s 调度心跳的小型旁车文件（仅 lastTickAt）。 */
  schedulerFile

  /**
   * @param {string} [dir] 账本目录，缺省 $DSH_HOME/dsh-work。
   * @param {() => number} [now] 时钟（测试缝）。
   */
  constructor(dir = join(dshHome(), 'dsh-work'), now = Date.now) {
    this.#now = now
    mkdirSync(dir, { recursive: true })
    this.file = join(dir, 'taskboard-ledger.json')
    this.lockFile = join(dir, 'taskboard-ledger.lock')
    this.schedulerFile = join(dir, 'taskboard-scheduler.json')
    this.#lockFd = this.#acquireLock()
    try {
      this.#document = this.#load(dir)
      for (const request of this.#document.recentRequests) {
        this.#requestCache.set(request.requestId, { fingerprint: request.fingerprint })
      }
      this.#repairSchedules(true)
      this.#reconcileInterruptedStarts()
      // 立即持久化新生成的账本身份与恢复错误，即使没有任务触发后续动作。
      this.#commit(false)
    } catch (error) {
      this.dispose()
      throw error
    }
  }

  /** revision + scheduler，不克隆任务；供轮询轻量比对。 */
  summary() {
    return { revision: this.#document.revision, scheduler: { ...this.#document.scheduler } }
  }

  state() {
    const { revision, scheduler } = this.summary()
    return { revision, tasks: cloneTasks(this.#document.tasks), scheduler }
  }

  subscribe(listener) {
    this.#listeners.add(listener)
    return () => { this.#listeners.delete(listener) }
  }

  dispose() {
    const fd = this.#lockFd
    if (fd === undefined) return
    this.#lockFd = undefined
    closeSync(fd)
    try {
      const owner = JSON.parse(readFileSync(this.lockFile, 'utf8'))
      if (owner.token === this.#lockToken) unlinkSync(this.lockFile)
    } catch {
      // 缺失或被外部替换的锁不得盲目删除。
    }
  }

  /**
   * 幂等应用一个动作：相同 requestId + 相同指纹的重放直接返回当前状态；
   * 相同 requestId 携带不同动作视为错误。
   */
  applyRequest(requestId, action) {
    const fingerprint = createHash('sha256').update(JSON.stringify(action)).digest('hex')
    const cached = this.#requestCache.get(requestId)
    if (cached !== undefined) {
      if (cached.fingerprint !== fingerprint) throw new Error('request id was reused with a different action')
      return { state: this.state() }
    }

    // 指纹先入缓存再 apply()：成功的动作在同一次原子账本写入里持久化指纹。
    this.#requestCache.set(requestId, { fingerprint })
    while (this.#requestCache.size > MAX_REQUEST_CACHE) this.#requestCache.delete(this.#requestCache.keys().next().value)
    this.#syncRecentRequests()
    try {
      return this.#apply(action)
    } catch (error) {
      this.#requestCache.delete(requestId)
      this.#syncRecentRequests()
      throw error
    }
  }

  /** 调度器触发：任务空闲则开启执行，运行中则只滚动 nextRunAt。 */
  openScheduled(taskId, nextRunAt, triggeredAt) {
    const task = this.#document.tasks.find(item => item.id === taskId)
    if (task === undefined || task.archivedAt !== undefined) return undefined
    let opened
    if (task.status !== 'running' && !hasOpenExecution(task)) {
      opened = startExecution(task, triggeredAt, crypto.randomUUID())
      this.#document.tasks = this.#document.tasks.map(item => item.id === taskId ? opened.task : item)
    }
    if (nextRunAt === undefined) {
      // 窗口内算不出下个触发点（如世纪闰年间隙的 2 月 29 日）：本次触发
      // 照常进行，随后解除武装并记录原因——写入 undefined 的 nextRunAt
      // 会让任务被 tick 守卫永久跳过、无声卡死。
      this.#disarmSchedule(taskId, `schedule disabled for task: ${taskId} (no reachable next run)`, triggeredAt)
    } else {
      this.#document.tasks = [...applyScheduleNextRun(
        this.#document.tasks,
        taskId,
        nextRunAt,
        opened === undefined ? task.schedule?.lastTriggeredAt : triggeredAt,
        triggeredAt,
      )]
    }
    this.#commit()
    return opened
  }

  /** 错过触发点一律跳过：从当前时刻滚动 nextRunAt，不补跑。 */
  skipMissed(now) {
    let changed = false
    this.#document.tasks = this.#document.tasks.map(task => {
      const schedule = task.schedule
      if (schedule === undefined || !schedule.enabled || schedule.nextRunAt === undefined || schedule.nextRunAt > now) return task
      changed = true
      const next = nextRunAtMs(schedule.cron, now)
      if (next === undefined) {
        // 滚动后仍无可达触发点：解除武装并记录，而非写入 undefined 静默卡死。
        this.#document.scheduler = { ...this.#document.scheduler, error: `schedule disabled for task: ${task.id} (no reachable next run)` }
        return { ...task, schedule: { ...schedule, enabled: false, nextRunAt: undefined }, updatedAt: now }
      }
      return { ...task, schedule: { ...schedule, nextRunAt: next }, updatedAt: now }
    })
    if (changed) this.#commit()
  }

  /** 解除武装一条调度并记录调度错误（不提交，由调用方统一 commit）。 */
  #disarmSchedule(taskId, reason, now) {
    this.#document.tasks = this.#document.tasks.map(item => item.id !== taskId || item.schedule === undefined ? item : {
      ...item,
      schedule: { ...item.schedule, enabled: false, nextRunAt: undefined },
      updatedAt: now,
    })
    this.#document.scheduler = { ...this.#document.scheduler, error: reason }
  }

  setScheduler(patch) {
    this.#document.scheduler = { ...this.#document.scheduler, ...patch }
    // 30s 心跳只移动 lastTickAt；为它重写整个账本会让空闲成本 O(账本字节)。
    // 只含 lastTickAt 的补丁走小旁车，其余补丁走完整原子提交。
    if (patch.lastTickAt !== undefined && Object.keys(patch).every(key => key === 'lastTickAt')) {
      this.#writeSchedulerSidecar()
      return
    }
    this.#commit(false)
  }

  attachSession(taskId, executionId, sessionId) {
    const now = this.#now()
    this.#document.tasks = this.#document.tasks.map(task => task.id !== taskId ? task : {
      ...task,
      updatedAt: now,
      executions: task.executions.map(entry => entry.id === executionId ? { ...entry, sessionId } : entry),
    })
    this.#commit()
  }

  settle(taskId, executionId, outcome, error) {
    this.#document.tasks = this.#document.tasks.map(task => task.id === taskId
      ? settleExecution(task, executionId, outcome, this.#now(), error)
      : task)
    this.#commit()
  }

  #apply(action) {
    const now = this.#now()
    let run
    switch (action.kind) {
      case 'create': {
        if (this.#document.tasks.some(task => task.id === action.id)) throw new Error('task id already exists')
        if (action.input.schedule?.enabled === true && (!isValidCron(action.input.schedule.cron) || nextRunAtMs(action.input.schedule.cron, now) === undefined)) {
          throw new Error('invalid schedule')
        }
        const result = applyCreateTask(this.#document.tasks, action.input, now, action.id)
        if (result.task === undefined) throw new Error('invalid task')
        this.#document.tasks = [...result.tasks]
        break
      }
      case 'update': {
        const task = this.#document.tasks.find(task => task.id === action.taskId)
        if (task === undefined) throw new Error('task not found')
        if (task.archivedAt !== undefined) throw new Error('archived task is read-only')
        // 标题不得被清空（与 create 的非空校验对齐）。
        if ('title' in action.patch && action.patch.title.trim() === '') throw new Error('task title must not be empty')
        this.#document.tasks = [...applyUpdateTask(this.#document.tasks, action.taskId, action.patch, now)]
        break
      }
      case 'delete': {
        const task = this.#document.tasks.find(task => task.id === action.taskId)
        if (task === undefined) throw new Error('task not found')
        if (task.status === 'running' || hasOpenExecution(task)) throw new Error('running task cannot be deleted')
        this.#document.tasks = [...applyDeleteTask(this.#document.tasks, action.taskId)]
        break
      }
      case 'move': {
        const task = this.#document.tasks.find(item => item.id === action.taskId)
        if (task === undefined) throw new Error('task not found')
        if (task.archivedAt !== undefined) throw new Error('archived task is read-only')
        if (task.status === 'running' || hasOpenExecution(task)) throw new Error('running task cannot be moved')
        if (!canMoveManually(task.status, action.status)) throw new Error('invalid manual status')
        this.#document.tasks = this.#document.tasks.map(item => item.id === action.taskId ? withStatus(item, action.status, now) : item)
        break
      }
      case 'archive': {
        const result = applyArchiveTask(this.#document.tasks, action.taskId, now)
        if (!result.archived) throw new Error('task cannot be archived')
        this.#document.tasks = [...result.tasks]
        break
      }
      case 'restore': {
        const result = applyRestoreTask(this.#document.tasks, action.taskId, now)
        if (!result.archived) throw new Error('task is not archived')
        this.#document.tasks = [...result.tasks]
        break
      }
      case 'set-schedule': {
        const task = this.#document.tasks.find(task => task.id === action.taskId)
        if (task?.archivedAt !== undefined) throw new Error('archived task is read-only')
        const result = applySetSchedule(this.#document.tasks, action.taskId, action.patch, now)
        if (!result.applied) throw new Error('invalid schedule')
        this.#document.tasks = [...result.tasks]
        break
      }
      case 'rerun':
      case 'run': {
        const task = this.#document.tasks.find(item => item.id === action.taskId)
        if (task?.archivedAt !== undefined) throw new Error('archived task is read-only')
        if (task === undefined || task.status === 'running' || hasOpenExecution(task)) throw new Error('task is already running or missing')
        const base = action.kind === 'rerun' ? withStatus(task, 'todo', now) : task
        run = startExecution(base, now, crypto.randomUUID())
        this.#document.tasks = this.#document.tasks.map(item => item.id === task.id ? run.task : item)
        break
      }
      default:
        throw new Error(`unknown action kind: ${action.kind}`)
    }
    this.#commit()
    return { state: this.state(), ...(run === undefined ? {} : { run }) }
  }

  /** 修复已启用调度的 nextRunAt；无法匹配的 cron 解除武装并记录调度错误。 */
  #repairSchedules(skipPast, persist = true) {
    const now = this.#now()
    let changed = false
    this.#document.tasks = this.#document.tasks.map(task => {
      const schedule = task.schedule
      if (schedule === undefined || !schedule.enabled) return task
      if (!skipPast && schedule.nextRunAt !== undefined) return task
      const next = nextRunAtMs(schedule.cron, now)
      if (next === undefined) {
        changed = true
        this.#document.scheduler.error = `invalid cron disabled for task: ${task.id}`
        return { ...task, schedule: { ...schedule, enabled: false, nextRunAt: undefined }, updatedAt: now }
      }
      if (schedule.nextRunAt === next) return task
      changed = true
      return { ...task, schedule: { ...schedule, nextRunAt: next }, updatedAt: now }
    })
    if (changed && persist) this.#commit()
  }

  /**
   * 确定性恢复：已有 session id 的 running execution 重启后继续观察；
   * 没有 session id 的启动中断取消且不重发。
   */
  #reconcileInterruptedStarts(persist = true) {
    const now = this.#now()
    let changed = false
    this.#document.tasks = this.#document.tasks.map(task => {
      if (task.status !== 'running') return task
      const execution = task.executions.at(-1)
      if (execution === undefined || execution.endedAt !== undefined || execution.sessionId !== undefined) return task
      changed = true
      return settleExecution(task, execution.id, 'cancelled', now, 'host restarted before the execution session was recorded')
    })
    if (changed && persist) this.#commit()
  }

  #load(dir) {
    const existed = existsSync(this.file)
    try {
      const parsed = JSON.parse(readFileSync(this.file, 'utf8'))
      if (parsed.schemaVersion !== TASKBOARD_SCHEMA_VERSION || !Array.isArray(parsed.tasks)) throw new Error('unsupported ledger schema')
      const tasks = parseHostTasks(parsed.tasks)
      const invalidScheduleIds = parsed.tasks.flatMap(value => {
        if (typeof value !== 'object' || value === null) return []
        if (typeof value.schedule !== 'object' || value.schedule === null) return []
        const cron = value.schedule.cron
        return typeof cron !== 'string' || !isValidCron(cron)
          ? [typeof value.id === 'string' ? value.id : 'unknown']
          : []
      })
      const documentLastTickAt = typeof parsed.scheduler?.lastTickAt === 'number' ? parsed.scheduler.lastTickAt : undefined
      const sidecarLastTickAt = this.#readSchedulerSidecar()
      // 旁车写入可能比最后一次完整提交更新（两者之间崩溃）；lastTickAt 只前进，取大者。
      const lastTickAt = sidecarLastTickAt === undefined || (documentLastTickAt !== undefined && documentLastTickAt >= sidecarLastTickAt)
        ? documentLastTickAt
        : sidecarLastTickAt
      return {
        schemaVersion: TASKBOARD_SCHEMA_VERSION,
        revision: Number.isSafeInteger(parsed.revision) && parsed.revision >= 0 ? parsed.revision : 0,
        tasks,
        scheduler: {
          timeZone: timeZone(),
          ...(lastTickAt === undefined ? {} : { lastTickAt }),
          // 持久化的调度错误不跨重启携带：加载期修复（invalidScheduleIds 与
          // #repairSchedules）会重新发现仍然成立的问题；已随隔离文件消除或
          // 已被用户处理掉的陈旧错误不再上屏。
          ...(invalidScheduleIds.length > 0 ? { error: `invalid cron disabled for task(s): ${invalidScheduleIds.join(', ')}` } : {}),
        },
        recentRequests: Array.isArray(parsed.recentRequests)
          ? parsed.recentRequests.flatMap((entry) => {
              if (typeof entry !== 'object' || entry === null) return []
              return typeof entry.requestId === 'string' && entry.requestId !== '' && typeof entry.fingerprint === 'string'
                ? [{ requestId: entry.requestId, fingerprint: entry.fingerprint }]
                : []
            }).slice(-MAX_REQUEST_CACHE)
          : [],
      }
    } catch (error) {
      // 损坏文件改名隔离，绝不覆盖损坏字节；Host 以空账本与可见错误启动。
      if (existed) renameSync(this.file, `${this.file}.corrupt-${this.#now()}-${process.pid}-${crypto.randomUUID()}`)
      mkdirSync(dir, { recursive: true })
      return {
        schemaVersion: TASKBOARD_SCHEMA_VERSION,
        revision: 0,
        tasks: [],
        scheduler: { timeZone: timeZone(), ...(existed ? { error: `corrupt ledger was quarantined: ${error instanceof Error ? error.message : String(error)}` } : {}) },
        recentRequests: [],
      }
    }
  }

  #syncRecentRequests() {
    this.#document.recentRequests = [...this.#requestCache].map(([requestId, request]) => ({
      requestId,
      fingerprint: request.fingerprint,
    }))
  }

  #readSchedulerSidecar() {
    try {
      const parsed = JSON.parse(readFileSync(this.schedulerFile, 'utf8'))
      return typeof parsed.lastTickAt === 'number' && Number.isFinite(parsed.lastTickAt) ? parsed.lastTickAt : undefined
    } catch {
      return undefined
    }
  }

  /** 原子写入调度心跳旁车（0600，tmp + rename + fsync）。 */
  #writeSchedulerSidecar() {
    const payload = JSON.stringify({ lastTickAt: this.#document.scheduler.lastTickAt })
    mkdirSync(dirname(this.schedulerFile), { recursive: true })
    // tmp 名带实例 token：同进程热重载时新旧实例不会写同一 tmp。
    const tmp = `${this.schedulerFile}.tmp-${process.pid}-${this.#lockToken.slice(0, 8)}`
    let fd
    try {
      fd = openSync(tmp, 'w', 0o600)
      writeFileSync(fd, payload, { encoding: 'utf8' })
      fsyncSync(fd)
      closeSync(fd)
      fd = undefined
      try { chmodSync(tmp, 0o600) } catch { /* Windows ACL 自管访问 */ }
      renameSync(tmp, this.schedulerFile)
      try {
        const dirFd = openSync(dirname(this.schedulerFile), 'r')
        try { fsyncSync(dirFd) } finally { closeSync(dirFd) }
      } catch {
        // Windows 不允许目录句柄 fsync；rename 仍是原子的。
      }
    } catch (error) {
      if (fd !== undefined) closeSync(fd)
      try { unlinkSync(tmp) } catch { /* 尽力清理临时文件 */ }
      throw error
    }
    this.#notify()
  }

  #commit(bumpRevision = true) {
    if (bumpRevision) this.#document.revision += 1
    mkdirSync(dirname(this.file), { recursive: true })
    // tmp 名带实例 token：同进程热重载时新旧实例不会写同一 tmp。
    const tmp = `${this.file}.tmp-${process.pid}-${this.#lockToken.slice(0, 8)}`
    let fd
    try {
      fd = openSync(tmp, 'w', 0o600)
      writeFileSync(fd, JSON.stringify(this.#document, null, 2), { encoding: 'utf8' })
      fsyncSync(fd)
      closeSync(fd)
      fd = undefined
      try { chmodSync(tmp, 0o600) } catch { /* Windows ACL 自管访问 */ }
      renameSync(tmp, this.file)
      try {
        const dirFd = openSync(dirname(this.file), 'r')
        try { fsyncSync(dirFd) } finally { closeSync(dirFd) }
      } catch {
        // Windows 不允许目录句柄 fsync；rename 仍是原子的。
      }
    } catch (error) {
      if (fd !== undefined) closeSync(fd)
      try { unlinkSync(tmp) } catch { /* 尽力清理临时文件 */ }
      throw error
    }
    this.#notify()
  }

  #notify() {
    for (const listener of [...this.#listeners]) listener()
  }

  /**
   * 目录锁：同一时间只有一个 Host 进程能持有账本目录。第二个使用同一
   * DSH home 的 Host 失败关闭，不并发写账本。锁记录 PID 与进程启动时刻，
   * 用于识别崩溃残留 + PID 复用的陈旧锁。
   */
  #acquireLock() {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      let fd
      try {
        fd = openSync(this.lockFile, 'wx', 0o600)
        // Linux /proc 与 Windows PowerShell 探测是毫秒级，记录 exact；其他
        // POSIX（ps）为秒级，记录 legacy，读取端按各自容差比对。
        const probe = process.platform === 'linux' || process.platform === 'win32' ? 'exact' : 'legacy'
        writeFileSync(fd, JSON.stringify({ pid: process.pid, token: this.#lockToken, startedAt: ownProcessStartTimeMs(), probe }), { encoding: 'utf8' })
        fsyncSync(fd)
        try { chmodSync(this.lockFile, 0o600) } catch { /* Windows ACL 自管访问 */ }
        const held = fd
        fd = undefined
        return held
      } catch (error) {
        if (fd !== undefined) {
          // 锁创建成功但写入失败：关闭句柄并清掉自己留下的半截锁。
          try { closeSync(fd) } catch { /* 句柄可能已失效 */ }
          try { unlinkSync(this.lockFile) } catch { /* 尽力清理 */ }
        }
        if (error.code !== 'EEXIST') throw error
        let pid
        let ownerStartedAt
        let ownerExact = false
        try {
          const owner = JSON.parse(readFileSync(this.lockFile, 'utf8'))
          if (typeof owner.pid === 'number') pid = owner.pid
          if (typeof owner.startedAt === 'number') ownerStartedAt = owner.startedAt
          ownerExact = owner.probe === 'exact'
        } catch {
          // 写入中途掉电可能留下半截锁；失败关闭，但必须告诉使用者如何恢复。
          throw new Error(`taskboard ledger lock is unreadable: ${this.lockFile}; if this is a leftover from an unclean shutdown and no other DSH host is running, remove it manually and retry`)
        }
        if (pid !== undefined && processIsAlive(pid)) {
          const actualStartedAt = pid === process.pid ? ownProcessStartTimeMs() : processStartTimeMs(pid)
          // PID 复用的暴露方式：存活进程身份与记录不一致——启动时刻超出
          // 记录探测精度的容差（exact 严格、legacy 有界），或无启动时刻的
          // 旧锁文件早于存活进程。两种情况接管都安全——原 owner 已不存在。
          const staleReuse = actualStartedAt !== undefined && (
            ownerStartedAt !== undefined
              ? startTimeMismatch(ownerStartedAt, actualStartedAt, ownerExact)
              : (() => {
                try { return statSync(this.lockFile).mtimeMs < actualStartedAt } catch { return true }
              })()
          )
          if (!staleReuse) {
            const confirmedOwner = ownerStartedAt !== undefined && actualStartedAt !== undefined && !startTimeMismatch(ownerStartedAt, actualStartedAt, ownerExact)
            const hint = confirmedOwner
              ? ''
              : `; if this PID was reused after a crash and no other DSH host is running, remove ${this.lockFile} manually and retry`
            throw new Error(`taskboard ledger is already owned by process ${pid}${hint}`)
          }
        }
        try { unlinkSync(this.lockFile) } catch (unlinkError) {
          if (unlinkError.code !== 'ENOENT') throw unlinkError
        }
      }
    }
    throw new Error(`taskboard ledger lock could not be acquired: ${this.lockFile}`)
  }
}
