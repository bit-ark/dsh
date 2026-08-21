/**
 * dsh-work taskboard — Host 服务：cron tick、会话轮询对账、动作入口。
 *
 * Ported from zhu1090093659/dsh-web-ui packages/dsh-task-board
 * src/host-service.ts (Apache-2.0)。移植裁剪：去掉空闲睡眠保护（power）。
 *
 * 浏览器只是异步视图；关闭页面不会停止 Host 调度或执行结算。
 */
import { nextRunAtMs } from './schedule.js'
import { TaskboardLedger } from './ledger.js'
import { TaskboardRunner, SessionLaunchError } from './runner.js'

const SESSION_POLL_MS = 5_000
const SCHEDULE_TICK_MS = 30_000
const RESUME_GAP_MS = SCHEDULE_TICK_MS + 15_000

export class TaskboardHostService {
  #listeners = new Set()
  #timers = []
  #lastScheduleTick
  #disposed = false
  #pollInFlight = false
  #tickInFlight = false
  #now

  /**
   * @param {object} api Host apiProxy 面。
   * @param {{ ledger?: TaskboardLedger, now?: () => number, commandDispatcher?: object }} [options]
   */
  constructor(api, options = {}) {
    this.ledger = options.ledger ?? new TaskboardLedger()
    this.runner = new TaskboardRunner(api, options.commandDispatcher)
    this.#now = options.now ?? Date.now
    this.ledger.subscribe(() => { this.#emit() })
  }

  start() {
    if (this.#disposed || this.#timers.length > 0) return
    this.#timers.push(setInterval(() => { this.#schedulePoll() }, SESSION_POLL_MS))
    this.#timers.push(setInterval(() => { this.#scheduleTick(false) }, SCHEDULE_TICK_MS))
    this.#schedulePoll()
    this.#scheduleTick(true)
  }

  snapshot() {
    const state = this.ledger.state()
    return {
      schemaVersion: 2,
      revision: state.revision,
      tasks: state.tasks,
      scheduler: state.scheduler,
    }
  }

  subscribe(listener) {
    this.#listeners.add(listener)
    return () => { this.#listeners.delete(listener) }
  }

  /** 幂等应用浏览器动作，返回完整 revision snapshot。 */
  apply(requestId, action) {
    const result = this.ledger.applyRequest(requestId, action)
    if (result.run !== undefined) this.#scheduleLaunch(result.run)
    return {
      schemaVersion: 2,
      revision: result.state.revision,
      tasks: result.state.tasks,
      scheduler: result.state.scheduler,
    }
  }

  dispose() {
    this.#disposed = true
    for (const timer of this.#timers.splice(0)) clearInterval(timer)
    this.ledger.dispose()
    this.#listeners.clear()
  }

  async #launch(opened) {
    try {
      const sessionId = await this.runner.launch(opened.task)
      // 服务已释放（插件热重载）时不再写账本：目录锁已释放，写入是无锁写。
      // 会话可能已启动，交由下个实例对账（带 sessionId 的 running 继续观察；
      // 没记上 sessionId 的按启动中断取消）。
      if (this.#disposed) return
      this.ledger.attachSession(opened.task.id, opened.execution.id, sessionId)
    } catch (error) {
      if (this.#disposed) return
      if (error instanceof SessionLaunchError) {
        this.ledger.attachSession(opened.task.id, opened.execution.id, error.sessionId)
      }
      this.ledger.settle(opened.task.id, opened.execution.id, 'failed', error instanceof Error ? error.message : String(error))
    }
  }

  async #pollSessions() {
    if (this.#disposed) return
    const running = await this.runner.listRunning()
    if (this.#disposed) return
    if (running.known) await this.#reconcileExecutions(running.items)
  }

  /** 复用本次 poll 已取到的会话列表：一次 list RPC，而不是 1+E。 */
  async #reconcileExecutions(sessions) {
    for (const task of this.ledger.state().tasks) {
      for (const execution of task.executions) {
        if (execution.sessionId === undefined || execution.endedAt !== undefined) continue
        try {
          const result = await this.runner.inspect(execution.sessionId, execution.startedAt, sessions)
          if (this.#disposed) return
          if (result.outcome === 'pending') continue
          this.ledger.settle(task.id, execution.id, result.outcome, 'error' in result ? result.error : undefined)
        } catch {
          // 瞬时检查失败永不结算运行中的执行。
        }
      }
    }
  }

  async #tickSchedule(first) {
    if (this.#disposed) return
    const now = this.#now()
    // 首 tick 或与上次 tick 间隔过大的恢复 tick：错过的触发点跳过不补跑。
    const recovered = first || (this.#lastScheduleTick !== undefined && now - this.#lastScheduleTick > RESUME_GAP_MS)
    this.#lastScheduleTick = now
    this.ledger.setScheduler({ lastTickAt: now })
    if (recovered) {
      this.ledger.skipMissed(now)
      return
    }
    for (const task of this.ledger.state().tasks) {
      if (task.archivedAt !== undefined) continue
      const schedule = task.schedule
      if (schedule === undefined || !schedule.enabled || schedule.nextRunAt === undefined || schedule.nextRunAt > now) continue
      const next = nextRunAtMs(schedule.cron, schedule.nextRunAt)
      const opened = this.ledger.openScheduled(task.id, next, now)
      if (opened !== undefined) this.#scheduleLaunch(opened)
    }
  }

  #scheduleLaunch(opened) {
    void this.#launch(opened).catch(error => {
      console.error('[dsh-work:taskboard] execution launch settlement failed', error)
    })
  }

  #schedulePoll() {
    if (this.#pollInFlight || this.#disposed) return
    this.#pollInFlight = true
    void this.#pollSessions().catch(error => {
      console.error('[dsh-work:taskboard] session polling failed', error)
    }).finally(() => { this.#pollInFlight = false })
  }

  #scheduleTick(first) {
    if (this.#tickInFlight || this.#disposed) return
    this.#tickInFlight = true
    void this.#tickSchedule(first).catch(error => {
      console.error('[dsh-work:taskboard] scheduler tick failed', error)
    }).finally(() => { this.#tickInFlight = false })
  }

  #emit() {
    for (const listener of [...this.#listeners]) listener()
  }
}
