/**
 * dsh-archive-tab — 宿主半（Host）。
 *
 * 在 DSH web 服务上注册两个 JSON 端点（路径前缀 /dsh-archive-tab）：
 *
 *  - POST /dsh-archive-tab/restore  { sessionId }
 *      把会话从 workspace registry 的全局归档集合中移除（侧边栏「归档会话」
 *      动作的逆操作；harness 本身没有公开的 unarchive API）。写入走 registry
 *      自己的领域串行链，因此 api-proxy 的 `domain/changed` 监听会广播
 *      `host/archived-sessions-changed` 帧，所有已连接的客户端（含侧边栏）
 *      都会实时刷新。
 *
 *  - POST /dsh-archive-tab/delete   { sessionId }
 *      硬删除：移除会话的持久化工件目录（`sessionPersistence.locate()` 指向
 *      的目标）、把会话从每个 workspace 账目上解除、移出归档集合，并尽力清理
 *      投影缓存行。正在运行的（live）会话会被拒绝。
 *
 *  - POST /dsh-archive-tab/delete-all   { sessionIds: string[] }
 *      一键批量硬删除：按序对每个 id 执行与 /delete 相同的步骤（共享同一个
 *      核心函数）。与单删不同，live 会话不会让整批失败——跳过并计入
 *      skippedLive；其他硬错误（目录名守卫等）计入 failed 且不中断整批，
 *      逐会话结果随响应返回。上限 500 个 id，去重保序。
 *
 * 删除顺序（防脏状态的关键）：
 *    1. 只读校验（live 检查、header/locate、目录名守卫、写链探测）；
 *    2. 先做 registry 域写入（unarchive → 逐个 workspace detach，单次失败
 *       收集警告而非中断）；
 *    3. 最后才 `rm` 删除文件目录（仍保留目录名守卫）；
 *    4. 尽力清理投影缓存。
 *  这样任何 503/500 都会在任何破坏性操作之前中止，不会出现「文件已删但归档
 *  集合还残留」的半删除状态。
 *
 * unarchive 需要 registry 的运行时私有写链（harness 无公开 unarchive 接口）。
 * 成员在调用时特性探测；若未来 harness 改名，端点返回 503 并提示，绝不猜测
 * 性写入（这是本插件对 harness 内部实现的唯一触碰点，见 README 通用性说明）。
 */
import type { IncomingMessage, ServerResponse } from 'node:http'
import { rm } from 'node:fs/promises'
import { basename, dirname } from 'node:path'

/** 插件名：与包名 / 组合行 id / 客户端模块 id 保持一致（dsh-* 前缀）。 */
export const name = 'dsh-archive-tab'

/** 本行离不开的 Web 组合服务（硬依赖，注入声明）。 */
export const inject = ['webServer', 'workspaceRegistry', 'sessionPersistence']

/** 本插件触及的 harness 类型的最小结构视图（避免引入 harness 类型依赖）。 */
interface SessionHeaderLike {
  id: string
  cwd?: string
}
interface SessionLocationLike {
  kind: string
  path: string
}
interface WorkspaceLike {
  id: string
  sessionIds: readonly string[]
  detachSession(sessionId: string): Promise<void>
}
interface RegistryLike {
  readonly archivedSessionIds: readonly string[]
  list(): WorkspaceLike[]
}

/** registry 的运行时私有写链（使用前特性探测；harness 改名时走 503 安全失败）。 */
interface RegistryInternals {
  enqueueOperation?: <T>(operation: () => Promise<T>) => Promise<T>
  requireState?: () => { archivedSessionIds: readonly string[]; [key: string]: unknown }
  setState?: (state: { archivedSessionIds: readonly string[]; [key: string]: unknown }) => Promise<void>
}

/** 带 HTTP 状态码的错误：handler 依此返回对应响应，而非一律 500。 */
class HttpError extends Error {
  constructor(readonly status: number, message: string) {
    super(message)
    this.name = 'HttpError'
  }
}

/**
 * 读取并 JSON 解析请求体（上限 1MB，防止恶意大请求占满内存）。
 * 解析失败 / 流错误以 HttpError reject。
 */
function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > 1_000_000) {
        reject(new HttpError(413, 'request body too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      try {
        const text = Buffer.concat(chunks).toString('utf8')
        resolve(text === '' ? {} : JSON.parse(text) as Record<string, unknown>)
      } catch {
        reject(new HttpError(400, 'request body is not valid JSON'))
      }
    })
    req.on('error', () => reject(new HttpError(400, 'request stream failed')))
  })
}

/** 写一个 JSON 响应（禁用缓存，避免浏览器对接口结果做快照）。 */
function sendJson(res: ServerResponse, status: number, value: unknown): void {
  const body = JSON.stringify(value)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(body)
}

/** 校验并取回 body 中的 sessionId（非空字符串，上限 512 字符）。 */
function requireSessionId(body: Record<string, unknown>): string {
  const sessionId = body.sessionId
  if (typeof sessionId !== 'string' || sessionId.length === 0 || sessionId.length > 512) {
    throw new HttpError(400, 'sessionId must be a non-empty string')
  }
  return sessionId
}

/**
 * 校验并取回 body 中的 sessionIds（批量删除用）。
 * 必须是数组，至少 1 个、至多 500 个非空字符串；去重保序，防止重复提交
 * 同一会话导致同一目录被 rm 两次（rm force 幂等，但计数会失真）。
 */
function requireSessionIds(body: Record<string, unknown>): string[] {
  const raw = body.sessionIds
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new HttpError(400, 'sessionIds must be a non-empty array')
  }
  if (raw.length > 500) {
    throw new HttpError(400, 'sessionIds must not exceed 500 entries')
  }
  const seen = new Set<string>()
  const ids: string[] = []
  for (const value of raw) {
    if (typeof value !== 'string' || value.length === 0 || value.length > 512) {
      throw new HttpError(400, 'sessionIds must contain only non-empty strings')
    }
    if (seen.has(value)) continue
    seen.add(value)
    ids.push(value)
  }
  return ids
}

/**
 * 通过 registry 自身的串行化链，把一个会话 id 从持久归档集合中移除。
 * 幂等：id 本就不在集合中时返回 `changed: false` 且不写盘。
 * 若 id 在集合中但写链不可用（harness API 漂移），抛 503——调用方必须把
 * 本函数放在任何破坏性操作之前，以保证 503 时没有任何副作用。
 */
async function unarchiveSession(registry: RegistryLike, sessionId: string): Promise<{ changed: boolean }> {
  if (!registry.archivedSessionIds.includes(sessionId)) return { changed: false }
  const internals = registry as unknown as RegistryInternals
  if (
    typeof internals.enqueueOperation !== 'function'
    || typeof internals.requireState !== 'function'
    || typeof internals.setState !== 'function'
  ) {
    throw new HttpError(
      503,
      'workspace registry write chain is unavailable (harness API drift); restore is disabled until this plugin is updated',
    )
  }
  let changed = false
  await internals.enqueueOperation(async () => {
    const state = internals.requireState!()
    if (!state.archivedSessionIds.includes(sessionId)) return
    await internals.setState!({
      ...state,
      archivedSessionIds: state.archivedSessionIds.filter(id => id !== sessionId),
    })
    changed = true
  })
  return { changed }
}

export function apply(ctx: any): void {
  const handler = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const pathname = new URL(req.url ?? '/', 'http://x').pathname
    const route = pathname === '/dsh-archive-tab/restore'
      ? 'restore'
      : pathname === '/dsh-archive-tab/delete'
        ? 'delete'
        : pathname === '/dsh-archive-tab/delete-all'
          ? 'delete-all'
          : undefined
    try {
      if (route === undefined) throw new HttpError(404, `unknown route ${JSON.stringify(pathname)}`)
      if (req.method !== 'POST') throw new HttpError(405, 'method not allowed; use POST')
      const body = await readJsonBody(req)
      if (route === 'restore') {
        await handleRestore(ctx, requireSessionId(body), res)
      } else if (route === 'delete') {
        await handleDelete(ctx, requireSessionId(body), res)
      } else {
        await handleDeleteAll(ctx, requireSessionIds(body), res)
      }
    } catch (error) {
      if (error instanceof HttpError) {
        sendJson(res, error.status, { ok: false, error: error.message })
        return
      }
      ctx.logger.warn(error instanceof Error ? error : new Error(String(error)))
      sendJson(res, 500, { ok: false, error: 'internal error' })
    }
  }

  // 路由挂到 web 服务的前缀表；effect 保证插件停止/更新时自动摘除。
  ctx.effect(
    () => ctx.webServer.register({ kind: 'prefix', path: '/dsh-archive-tab', handler }),
    'dsh-archive-tab: routes',
  )
}

/** 恢复：把会话移出归档集合（写链 503 时先于任何副作用失败）。 */
async function handleRestore(ctx: any, sessionId: string, res: ServerResponse): Promise<void> {
  const registry = ctx.workspaceRegistry as RegistryLike
  const { changed } = await unarchiveSession(registry, sessionId)
  sendJson(res, 200, {
    ok: true,
    sessionId,
    changed,
    archivedSessionIds: [...registry.archivedSessionIds],
  })
}

/**
 * 单个会话的硬删除核心步骤（单删 /delete 与批量 /delete-all 共用）。
 * 步骤顺序见文件头注释：先只读校验，再写 registry（unarchive → detach），
 * 最后才删文件，以保证任何失败都停在可恢复状态。返回结果字段，硬错误
 * （目录名守卫等）抛 HttpError，由调用方决定是 500 还是整批继续。
 */
async function deleteSessionCore(ctx: any, sessionId: string): Promise<{
  removedFiles: boolean
  detachedWorkspaces: number
  unarchived: boolean
  clearedProjectionCache: boolean
  persisted: boolean
  detachErrors: string[]
}> {
  const registry = ctx.workspaceRegistry as RegistryLike
  const headers = (await ctx.sessionPersistence.list()) as SessionHeaderLike[]
  const header = headers.find(candidate => candidate.id === sessionId)

  // 1. 只读定位：算出日志所在目录并先行做目录名守卫（不在此处删任何东西）。
  //    目录名必须是会话 id 本身（harness 的 encodeSegment 对真实 id
  //    `session-<n>` / `*-session-<uuid>` 是恒等变换，与 encodeURIComponent
  //    一致；这里双保险只允许这两种写法，绝不删除名字对不上的目录）。
  let targetDir: string | null = null
  if (header !== undefined) {
    const location = ctx.sessionPersistence.locate(header) as SessionLocationLike | undefined
    if (location !== undefined && typeof location.path === 'string' && location.path !== '') {
      const dir = dirname(location.path)
      const dirName = basename(dir)
      if (dirName !== sessionId && dirName !== encodeURIComponent(sessionId)) {
        throw new HttpError(500, `refusing to remove unexpected session directory ${JSON.stringify(dir)}`)
      }
      targetDir = dir
    }
  }

  // 2. 先做 registry 域写入。
  //    2a. unarchive 优先：若会话在归档集合中而写链不可用，这里就抛 503，
  //        任何 detach / 删文件都还没有发生，状态保持原样。
  const { changed: unarchived } = await unarchiveSession(registry, sessionId)

  //    2b. 逐个 workspace 解除账目（公开、幂等 API）。单个失败不中断整体，
  //        收集到 detachErrors 随响应返回并在日志里警告。
  let detachedWorkspaces = 0
  const detachErrors: string[] = []
  for (const workspace of registry.list()) {
    if (!workspace.sessionIds.includes(sessionId)) continue
    try {
      await workspace.detachSession(sessionId)
      detachedWorkspaces += 1
    } catch (error) {
      detachErrors.push(`workspace ${workspace.id}: ${String(error)}`)
      ctx.logger.warn(new Error(`archive-tab: detach failed for '${sessionId}' in workspace '${workspace.id}': ${String(error)}`))
    }
  }

  // 3. 最后才是破坏性文件删除（守卫在步骤 1 已先行校验，这里再核验一次）。
  let removedFiles = false
  if (targetDir !== null) {
    const dirName = basename(targetDir)
    if (dirName !== sessionId && dirName !== encodeURIComponent(sessionId)) {
      throw new HttpError(500, `refusing to remove unexpected session directory ${JSON.stringify(targetDir)}`)
    }
    await rm(targetDir, { recursive: true, force: true })
    removedFiles = true
  }

  // 4. 尽力清理投影缓存行；残留行是惰性的（按身份守卫的读取永远匹配不到
  //    已删除的日志），但用户要求零残留，失败仅告警不致命。
  let clearedProjectionCache = false
  const cache = ctx.get('sessionProjectionCache')
  const table = (cache as { table?: { delete(key: string): Promise<boolean> } } | undefined)?.table
  if (table !== undefined && typeof table.delete === 'function') {
    try {
      clearedProjectionCache = await table.delete(sessionId)
    } catch (error) {
      ctx.logger.warn(new Error(`archive-tab: projection-cache cleanup failed for '${sessionId}': ${String(error)}`))
    }
  }

  return {
    removedFiles,
    detachedWorkspaces,
    unarchived,
    clearedProjectionCache,
    persisted: header !== undefined,
    detachErrors,
  }
}

/** 单删：live 检查 → 核心步骤 → 200 响应。 */
async function handleDelete(ctx: any, sessionId: string, res: ServerResponse): Promise<void> {
  // 0. live 检查：正在运行的会话仍绑定 agent 与可能的浏览器面板，拒绝删除。
  const live = ctx.get('sessions')?.get(sessionId)
  if (live !== undefined) {
    throw new HttpError(409, 'session is live in this process; close it before deleting')
  }

  const result = await deleteSessionCore(ctx, sessionId)
  sendJson(res, 200, {
    ok: true,
    sessionId,
    ...result,
  })
}

/**
 * 一键批量硬删除：对每个 id 复用 deleteSessionCore。live 会话跳过并计入
 * skipped（批量语义：能删多少删多少，不让一个运行中的会话卡死整批）；
 * 硬错误计入 failed 且不中断整批。响应携带汇总计数与逐会话结果。
 */
async function handleDeleteAll(ctx: any, sessionIds: readonly string[], res: ServerResponse): Promise<void> {
  let deleted = 0
  let skipped = 0
  let failed = 0
  const failures: Array<{ sessionId: string; error: string }> = []
  for (const sessionId of sessionIds) {
    const live = ctx.get('sessions')?.get(sessionId)
    if (live !== undefined) {
      skipped += 1
      continue
    }
    try {
      await deleteSessionCore(ctx, sessionId)
      deleted += 1
    } catch (error) {
      failed += 1
      const message = error instanceof HttpError ? error.message : String(error)
      failures.push({ sessionId, error: message })
      ctx.logger.warn(new Error(`archive-tab: batch delete failed for '${sessionId}': ${message}`))
    }
  }

  sendJson(res, 200, {
    ok: true,
    total: sessionIds.length,
    deleted,
    skipped,
    failed,
    failures,
  })
}
