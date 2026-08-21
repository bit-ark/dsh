/**
 * dsh-work — 终端会话管理（宿主半）。
 *
 * 每个会话 = 一个 node-pty 进程 + 输出环形缓冲 + 订阅者集合（WebSocket，
 * 装配在 routes.js）。设计要点：
 *
 *  - node-pty 惰性加载：缺失/加载失败不影响插件其余功能，create 时回友好错误。
 *  - 环形缓冲保留最近 ~256KB 输出：标签切换/页面刷新后重新 attach 能回放近期内容。
 *  - 多订阅者：同一会话可挂多个 WebSocket（输出镜像，任一方可输入）。
 *  - 孤儿回收：最后一个订阅者断开后宽限 60s 无人重连即杀掉会话（页面刷新
 *    会在宽限内重连，属预期路径）；进程退出后会话信息保留 10s 供查询。
 *  - 安全边界沿用 /workbench/* 全局信任模型（本机可信环境）；但子进程 env
 *    按 harness 惯例剔除凭据形（KEY/PASSWORD/SECRET/TOKEN）与 DSH_* 变量。
 *
 * 纯逻辑（createOutputRing / clampedTermSize / scrubbedEnv / loginShellArgs）
 * 经 src/index.js re-export，供 node 测试套件断言。
 */
import { randomBytes } from 'node:crypto'
import { chmodSync, statSync } from 'node:fs'
import { dirname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

/** 终端会话数上限（超过拒绝创建）。 */
export const MAX_TERMINAL_SESSIONS = 8
/** 孤儿会话宽限：客户端断开后保留 PTY 的时间（期间刷新可重连接回）。 */
export const TERMINAL_ORPHAN_GRACE_MS = 60_000
/** 每会话输出环形缓冲上限（回放给新连接，防无限增长）。 */
export const TERMINAL_RING_BYTES = 256 * 1024
const TERMINAL_EXIT_LINGER_MS = 10_000
const TERMINAL_KILL_ESCALATE_MS = 1200
const MIN_TERM_DIM = 2
const MAX_TERM_COLS = 500
const MAX_TERM_ROWS = 300

/** 环形输出缓冲：只保留最近 maxBytes 字节（UTF-8 计），最新块始终保留。 */
export function createOutputRing(maxBytes = TERMINAL_RING_BYTES) {
  const chunks = []
  let bytes = 0
  return {
    push(text) {
      if (typeof text !== 'string' || text.length === 0) return
      chunks.push(text)
      bytes += Buffer.byteLength(text)
      while (bytes > maxBytes && chunks.length > 1) {
        bytes -= Buffer.byteLength(chunks.shift())
      }
    },
    text() { return chunks.join('') },
    get size() { return bytes },
    clear() { chunks.length = 0; bytes = 0 },
  }
}

/** 终端尺寸钳制：整数化 + 区间 [2, 500]×[2, 300]，非法值回退 80×24。 */
export function clampedTermSize(cols, rows) {
  const toInt = (value, fallback) => {
    const n = typeof value === 'number' && Number.isFinite(value) ? Math.round(value) : fallback
    return n
  }
  const colsClamped = Math.min(MAX_TERM_COLS, Math.max(MIN_TERM_DIM, toInt(cols, 80)))
  const rowsClamped = Math.min(MAX_TERM_ROWS, Math.max(MIN_TERM_DIM, toInt(rows, 24)))
  return { cols: colsClamped, rows: rowsClamped }
}

/**
 * 子进程环境：父进程环境剔除凭据形变量（KEY/PASSWORD/SECRET/TOKEN，与
 * harness 的 subprocess seam 同一启发式）与 DSH_* 运行时事实，再叠加 extra。
 */
export function scrubbedEnv(extra = {}, source = process.env) {
  const env = {}
  for (const [key, value] of Object.entries(source)) {
    if (value === undefined) continue
    if (/KEY|PASSWORD|SECRET|TOKEN/i.test(key)) continue
    if (key.toUpperCase().startsWith('DSH_')) continue
    env[key] = value
  }
  return { ...env, ...extra }
}

/** 登录 shell 参数：交互式 tty 上的 zsh/bash/fish 以登录 shell 启动（对齐系统终端）。 */
export function loginShellArgs(shell) {
  const base = shell.split('/').filter((segment) => segment !== '').pop() || ''
  if (base === 'zsh' || base === 'bash' || base === 'fish') return ['-l']
  return []
}

/** 缺省 shell：$SHELL（绝对路径）→ 平台缺省。 */
export function defaultShell(platform = process.platform) {
  const fromEnv = process.env.SHELL
  if (typeof fromEnv === 'string' && fromEnv.length > 0 && fromEnv.startsWith('/') && !fromEnv.includes('\0')) {
    return fromEnv
  }
  if (platform === 'darwin') return '/bin/zsh'
  if (platform === 'win32') return process.env.COMSPEC || 'cmd.exe'
  return '/bin/bash'
}

/**
 * macOS/Linux 上把 node-pty prebuilds 里的 spawn-helper 恢复可执行位
 * （打包/解包可能丢失 +x，harness 对同一问题专门打过补丁）。best-effort。
 */
function ensureSpawnHelperExecutable() {
  if (process.platform === 'win32') return
  try {
    const resolved = import.meta.resolve('node-pty')
    const ptyLibDir = fileURLToPath(new URL('.', resolved))
    const helper = normalize(join(ptyLibDir, '..', 'prebuilds', `${process.platform}-${process.arch}`, 'spawn-helper'))
    const mode = statSync(helper).mode
    if ((mode & 0o111) === 0) chmodSync(helper, mode | 0o755)
  } catch { /* 路径不存在/已可执行/权限不足：交给 spawn 时报错 */ }
}

/** 会话对外事实（list/create 响应共用）。 */
function publicInfo(session) {
  return {
    id: session.id,
    pid: session.pid,
    shell: session.shell,
    cwd: session.cwd,
    cols: session.cols,
    rows: session.rows,
    running: !session.exited,
    exitCode: session.exited ? session.exitCode ?? null : undefined,
    exitSignal: session.exited ? session.exitSignal ?? null : undefined,
    subscribers: session.subscribers.size,
    createdAt: session.createdAt,
  }
}

/**
 * 创建终端会话管理器。返回 { create, get, list, write, resize, kill, attach, dispose }。
 * routes.js 在 ctx.effect 里持有一个实例，卸载时 dispose() 杀掉全部会话。
 */
export function createTerminalManager(options = {}) {
  const graceMs = options.orphanGraceMs ?? TERMINAL_ORPHAN_GRACE_MS
  const maxSessions = options.maxSessions ?? MAX_TERMINAL_SESSIONS
  const sessions = new Map()
  let ptyModule = undefined
  let ptyError = undefined

  const loadPty = async () => {
    if (ptyModule !== undefined) return ptyModule
    if (ptyError !== undefined) throw new Error(ptyError)
    try {
      const mod = await import('node-pty')
      ptyModule = mod.default ?? mod
      ensureSpawnHelperExecutable()
      return ptyModule
    } catch (error) {
      ptyError = `终端后端（node-pty）不可用：${error instanceof Error ? error.message : String(error)}`
      throw new Error(ptyError)
    }
  }

  const safeSend = (ws, frame) => {
    try {
      if (ws.readyState === 1) ws.send(frame)
    } catch { /* 单订阅者写失败不波及其他订阅者 */ }
  }

  const tryClose = (ws) => {
    try { ws.close() } catch { /* already closed */ }
  }

  const clearOrphanTimer = (session) => {
    if (session.orphanTimer !== undefined) {
      clearTimeout(session.orphanTimer)
      session.orphanTimer = undefined
    }
  }

  const kill = (session) => {
    if (session.exited) return
    clearOrphanTimer(session)
    if (process.platform === 'win32') {
      try { session.proc.kill() } catch { /* exit 事件是权威 */ }
      return
    }
    try { session.proc.kill('SIGTERM') } catch { /* exit 事件是权威 */ }
    const escalation = setTimeout(() => {
      if (!session.exited) {
        try { session.proc.kill('SIGKILL') } catch { /* already gone */ }
      }
    }, TERMINAL_KILL_ESCALATE_MS)
    escalation.unref?.()
  }

  const scheduleOrphanKill = (session) => {
    if (session.exited || session.subscribers.size > 0 || session.orphanTimer !== undefined) return
    session.orphanTimer = setTimeout(() => {
      session.orphanTimer = undefined
      kill(session)
    }, graceMs)
    session.orphanTimer.unref?.()
  }

  const create = async ({ cwd, cols, rows } = {}) => {
    const pty = await loadPty()
    const live = [...sessions.values()].filter((s) => !s.exited).length
    if (live >= maxSessions) {
      const error = new Error(`终端数量已达上限（${maxSessions} 个）`)
      error.code = 'limit'
      throw error
    }
    const size = clampedTermSize(cols, rows)
    const shell = defaultShell()
    const proc = pty.spawn(shell, loginShellArgs(shell), {
      name: 'xterm-256color',
      cols: size.cols,
      rows: size.rows,
      cwd,
      env: scrubbedEnv({ TERM: 'xterm-256color' }),
    })
    const session = {
      id: randomBytes(8).toString('hex'),
      shell,
      cwd,
      pid: proc.pid,
      cols: size.cols,
      rows: size.rows,
      proc,
      ring: createOutputRing(),
      subscribers: new Set(),
      exited: false,
      exitCode: undefined,
      exitSignal: undefined,
      orphanTimer: undefined,
      createdAt: Date.now(),
    }
    sessions.set(session.id, session)

    proc.onData((data) => {
      session.ring.push(data)
      const frame = JSON.stringify({ t: 'o', d: data })
      for (const ws of session.subscribers) safeSend(ws, frame)
    })
    proc.onExit(({ exitCode, signal }) => {
      if (session.exited) return
      session.exited = true
      session.exitCode = exitCode
      session.exitSignal = signal
      clearOrphanTimer(session)
      const frame = JSON.stringify({ t: 'exit', code: exitCode ?? null, signal: signal ?? null })
      for (const ws of session.subscribers) safeSend(ws, frame)
      const closeTimer = setTimeout(() => {
        for (const ws of [...session.subscribers]) tryClose(ws)
      }, 500)
      closeTimer.unref?.()
      const lingerTimer = setTimeout(() => { sessions.delete(session.id) }, TERMINAL_EXIT_LINGER_MS)
      lingerTimer.unref?.()
    })

    return publicInfo(session)
  }

  const get = (id) => (typeof id === 'string' ? sessions.get(id) : undefined)

  const list = () => [...sessions.values()]
    .sort((a, b) => a.createdAt - b.createdAt)
    .map(publicInfo)

  const write = (id, data) => {
    const session = get(id)
    if (session === undefined || session.exited) return false
    try { session.proc.write(data) } catch { return false }
    return true
  }

  const resize = (id, cols, rows) => {
    const session = get(id)
    if (session === undefined || session.exited) return false
    const size = clampedTermSize(cols, rows)
    if (size.cols === session.cols && size.rows === session.rows) return true
    try { session.proc.resize(size.cols, size.rows) } catch { return false }
    session.cols = size.cols
    session.rows = size.rows
    return true
  }

  /** 杀掉会话（幂等）。未知 id 也按成功处理，关闭标签不必报错。 */
  const killById = (id) => {
    const session = get(id)
    if (session !== undefined) kill(session)
    return true
  }

  /**
   * 挂一个 WebSocket 订阅者：同步回放环形缓冲（单线程，add 与回放之间不会
   * 插入 onData），返回 detach 函数。detach 后若无订阅者则启动孤儿宽限。
   */
  const attach = (session, ws) => {
    clearOrphanTimer(session)
    session.subscribers.add(ws)
    const replay = session.ring.text()
    if (replay !== '') safeSend(ws, JSON.stringify({ t: 'o', d: replay }))
    if (session.exited) {
      safeSend(ws, JSON.stringify({ t: 'exit', code: session.exitCode ?? null, signal: session.exitSignal ?? null }))
    }
    return () => {
      if (!session.subscribers.delete(ws)) return
      scheduleOrphanKill(session)
    }
  }

  /** 卸载：杀掉所有会话（SIGKILL 直落，退出路径不等待）。 */
  const dispose = () => {
    for (const session of sessions.values()) {
      clearOrphanTimer(session)
      if (session.exited) continue
      try {
        if (process.platform === 'win32') session.proc.kill()
        else session.proc.kill('SIGKILL')
      } catch { /* already gone */ }
      for (const ws of [...session.subscribers]) tryClose(ws)
    }
    sessions.clear()
  }

  return { create, get, list, write, resize, kill: killById, attach, dispose }
}
