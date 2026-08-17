/**
 * dsh-deepseek-balance — 宿主半（Host）。
 *
 * 在 DSH web 服务上注册两个只读 JSON 端点（路径前缀 /dsh-deepseek-balance）：
 *
 *  - GET /dsh-deepseek-balance/balance
 *      通过凭据接缝解析 DeepSeek API key（与 Models 设置页写入的是同一个凭据
 *      引用，默认 `DEEPSEEK_API_KEY`，另带纯环境变量回退），再调用官方公开端点
 *      `GET <balanceBaseURL>/user/balance` 并归一化响应：
 *      { ok, available, balances: [{ currency, total, granted, toppedUp }],
 *        fetchedAt }。业务失败以 200 + `ok:false` 返回，并带机器可读的 `code`
 *      （'missing-key' | 'auth-failed' | 'upstream' | 'network'），设置页据此
 *      渲染友好状态。key 本身绝不回显。
 *
 *  - GET /dsh-deepseek-balance/usage?days=N&refresh=1
 *      从持久化会话日志（sessionPersistence.list/load —— zstd 解码在后端内部）
 *      聚合 provider 上报的 token 用量：每个 LLM step 的最终 usage 样本按本地
 *      日历日分桶，覆盖最近 N 天（1..90，默认取行配置）。fork/子代理的
 *      seed 前缀被跳过，避免继承历史被重复计数。结果在内存缓存 `cacheTtlMs`
 *      毫秒；`refresh=1` 强制重算。
 *
 * 性能说明：聚合是单遍的——工作线程内对每个会话做 fold 的同时增量累加全量
 * 合计（allTime），窗口合计直接由 buildDayBuckets 的日桶求和得出，不再对全部
 * 样本做第二次遍历与重复的日期计算。缓存 5 分钟 + 在途请求去重。
 *
 * 本插件全程只读：不写会话 / 设置 / 磁盘，无定时器（缓存只是时间戳比较）。
 */
import type { IncomingMessage, ServerResponse } from 'node:http'
import {
  buildDayBuckets,
  foldSessionUsage,
  sumSamples,
  totalOf,
  zeroBuckets,
} from './usage-fold.ts'
import type { UsageBuckets, UsageSample } from './usage-fold.ts'

// 重新导出，供独立测试套件从构建后的宿主 bundle 导入纯折叠函数
// （node test/usage-fold.test.mjs）。
export { buildDayBuckets, foldSessionUsage, sumSamples, totalOf, zeroBuckets }

/** 插件名：与包名 / 组合行 id / 客户端模块 id 保持一致（dsh-* 前缀）。 */
export const name = 'dsh-deepseek-balance'

/** 本行离不开的 Web 组合服务（硬依赖，注入声明）。 */
export const inject = ['webServer', 'sessionPersistence']

const DEFAULT_BALANCE_BASE_URL = 'https://api.deepseek.com'
const DEFAULT_API_KEY_ENV = 'DEEPSEEK_API_KEY'
const DEFAULT_USAGE_DAYS = 14
const MAX_USAGE_DAYS = 90
const DEFAULT_CACHE_TTL_MS = 300_000
const BALANCE_TIMEOUT_MS = 8_000
const USAGE_LOAD_CONCURRENCY = 4

interface Config {
  /** 凭据引用（环境变量名），指向 DeepSeek API key。 */
  apiKeyEnv?: string
  /** 账户端点基址；即使聊天走了代理，余额查询也固定走官方 API。 */
  balanceBaseURL?: string
  /** 默认图表窗口天数（1..90）。 */
  usageDays?: number
  /** 用量聚合缓存的存活时长（毫秒）。 */
  cacheTtlMs?: number
}

/** 本插件触及的 harness 服务的最小结构视图。 */
interface SessionHeaderLike {
  id: string
  cwd?: string
  createdAt?: number
  seedLength?: number
}
interface SessionInspectionLike {
  meta: SessionHeaderLike
  events: readonly unknown[]
}
interface SessionPersistenceLike {
  list(): Promise<SessionHeaderLike[]>
  load(id: string): Promise<SessionInspectionLike>
}
interface CredentialsLike {
  resolve(ref: string): Promise<{ value: string } | undefined>
}

/** 一个日历日的用量（线上传输形状）。 */
interface DayBucketWire {
  date: string
  label: string
  uncachedInput: number
  output: number
  cacheRead: number
  cacheWrite: number
  total: number
  requests: number
}
/** /usage 的成功响应。 */
interface UsageResult {
  ok: true
  days: DayBucketWire[]
  totals: UsageBuckets & { total: number }
  allTimeTotal: number
  allTimeRequests: number
  topSessions: Array<{ sessionId: string; cwdLabel: string; total: number }>
  sessionsScanned: number
  skipped: number
  windowDays: number
  generatedAt: string
  cached: boolean
}

/** 非空字符串守卫。 */
function nonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * 归一化行配置：非法值回退默认，days 钳到 1..90，
 * balanceBaseURL 做一次 URL 解析（解析失败保持官方默认，拼写错误不能炸掉整行）。
 */
function resolveConfig(config: Config | undefined): {
  apiKeyEnv: string
  balanceBaseURL: string
  usageDays: number
  cacheTtlMs: number
} {
  let usageDays = DEFAULT_USAGE_DAYS
  if (typeof config?.usageDays === 'number' && Number.isFinite(config.usageDays)) {
    usageDays = Math.max(1, Math.min(MAX_USAGE_DAYS, Math.trunc(config.usageDays)))
  }
  let cacheTtlMs = DEFAULT_CACHE_TTL_MS
  if (typeof config?.cacheTtlMs === 'number' && Number.isFinite(config.cacheTtlMs) && config.cacheTtlMs >= 0) {
    cacheTtlMs = Math.trunc(config.cacheTtlMs)
  }
  let balanceBaseURL = DEFAULT_BALANCE_BASE_URL
  if (nonEmptyString(config?.balanceBaseURL)) {
    try {
      balanceBaseURL = new URL(config.balanceBaseURL.trim()).toString().replace(/\/+$/, '')
    } catch {
      // 无法解析的基址保持官方默认。
    }
  }
  return {
    apiKeyEnv: nonEmptyString(config?.apiKeyEnv) ? config.apiKeyEnv.trim() : DEFAULT_API_KEY_ENV,
    balanceBaseURL,
    usageDays,
    cacheTtlMs,
  }
}

/** 写一个 JSON 响应（禁用缓存）。 */
function sendJson(res: ServerResponse, status: number, value: unknown): void {
  const body = JSON.stringify(value)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(body)
}

/** 解析 DeepSeek API key：凭据接缝优先，其次进程环境变量。 */
async function resolveApiKey(ctx: any, apiKeyEnv: string): Promise<string | undefined> {
  const credentials = ctx.get('credentials') as CredentialsLike | undefined
  if (credentials !== undefined && typeof credentials.resolve === 'function') {
    try {
      const hit = await credentials.resolve(apiKeyEnv)
      if (hit !== undefined && nonEmptyString(hit.value)) return hit.value
    } catch (error) {
      ctx.logger?.warn?.(new Error(`deepseek-balance: credentials resolve failed: ${String(error)}`))
    }
  }
  const ambient = process.env[apiKeyEnv]
  if (nonEmptyString(ambient)) return ambient
  return undefined
}

/**
 * 调用官方余额接口并归一化。
 * 超时 / 网络错误 → code 'network'；401/403 → 'auth-failed'；
 * 其他非 2xx 或响应不可解析 → 'upstream'。所有业务失败均以 200 + ok:false 返回。
 */
async function fetchBalance(baseURL: string, apiKey: string): Promise<Record<string, unknown>> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), BALANCE_TIMEOUT_MS)
  let response: Response
  try {
    response = await fetch(`${baseURL}/user/balance`, {
      method: 'GET',
      headers: { authorization: `Bearer ${apiKey}`, accept: 'application/json' },
      signal: controller.signal,
    })
  } catch (error) {
    const aborted = controller.signal.aborted
    return {
      ok: false,
      code: 'network',
      message: aborted
        ? `请求超时（${String(BALANCE_TIMEOUT_MS / 1000)}s）：无法连接 ${baseURL}`
        : `网络错误：${error instanceof Error ? error.message : String(error)}`,
    }
  } finally {
    clearTimeout(timer)
  }

  if (response.status === 401 || response.status === 403) {
    return {
      ok: false,
      code: 'auth-failed',
      message: `API Key 被拒绝（HTTP ${String(response.status)}）：可能无效或已过期`,
    }
  }
  if (!response.ok) {
    return {
      ok: false,
      code: 'upstream',
      message: `余额接口返回 HTTP ${String(response.status)}`,
    }
  }

  let body: any
  try {
    body = await response.json()
  } catch {
    return { ok: false, code: 'upstream', message: '余额接口返回了无法解析的内容' }
  }

  const infos = Array.isArray(body?.balance_infos) ? body.balance_infos : []
  const balances = infos.map((info: any) => ({
    currency: typeof info?.currency === 'string' ? info.currency : '',
    total: typeof info?.total_balance === 'string' ? info.total_balance : String(info?.total_balance ?? '0'),
    granted: typeof info?.granted_balance === 'string' ? info.granted_balance : String(info?.granted_balance ?? '0'),
    toppedUp: typeof info?.topped_up_balance === 'string' ? info.topped_up_balance : String(info?.topped_up_balance ?? '0'),
  }))
  return {
    ok: true,
    available: body?.is_available === true,
    balances,
    fetchedAt: new Date().toISOString(),
  }
}

/** 会话 cwd 的 basename，用于 Top 会话列表展示。 */
function cwdLabelOf(cwd: string | undefined): string {
  if (!nonEmptyString(cwd)) return '(未知目录)'
  const index = cwd.lastIndexOf('/')
  const label = index >= 0 ? cwd.slice(index + 1) : cwd
  return label === '' ? cwd : label
}

/**
 * 全量聚合会话日志用量（单遍）。
 *
 * 并发上限 USAGE_LOAD_CONCURRENCY 的工作线程遍历持久化会话：每个会话 fold 出
 * 最终样本（foldSessionUsage 内做 seed 前缀跳过与 last-wins 去重），同时增量
 * 累加全量合计与请求数——不再像旧实现那样对全部样本做第二次遍历。单个日志
 * 读取失败只计数跳过（skipped），绝不致命。
 */
async function computeUsage(
  ctx: any,
  persistence: SessionPersistenceLike,
  days: number,
): Promise<UsageResult> {
  const headers = await persistence.list()
  const allSamples: UsageSample[] = []
  const perSession: Array<{ sessionId: string; cwdLabel: string; total: number }> = []
  let skipped = 0
  let allTimeTotal = 0
  let allTimeRequests = 0

  // 有界并发映射：cursor 原子递增分配任务给固定数量的 worker。
  let cursor = 0
  const worker = async (): Promise<void> => {
    for (;;) {
      const index = cursor
      cursor += 1
      const header = headers[index]
      if (header === undefined) return
      try {
        const inspection = await persistence.load(header.id)
        const fold = foldSessionUsage(
          { id: header.id, cwd: header.cwd, seedLength: header.seedLength },
          inspection.events as never,
        )
        allSamples.push(...fold.samples)
        allTimeTotal += totalOf(fold.totals)
        allTimeRequests += fold.requests
        perSession.push({
          sessionId: header.id,
          cwdLabel: cwdLabelOf(header.cwd),
          total: totalOf(fold.totals),
        })
      } catch (error) {
        skipped += 1
        ctx.logger?.warn?.(new Error(`deepseek-balance: failed to load session '${header.id}': ${String(error)}`))
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(USAGE_LOAD_CONCURRENCY, Math.max(1, headers.length)) }, () => worker()),
  )

  const nowMs = Date.now()
  const dayBuckets = buildDayBuckets(allSamples, days, nowMs)

  // 窗口合计直接由日桶求和：buildDayBuckets 已完成「窗口内/外」的样本归类，
  // 这里累加一次即可，等价于旧实现的二次过滤求和且少一遍日期计算。
  const windowBuckets = zeroBuckets()
  let windowRequests = 0
  for (const bucket of dayBuckets) {
    windowBuckets.uncachedInput += bucket.uncachedInput
    windowBuckets.output += bucket.output
    windowBuckets.cacheRead += bucket.cacheRead
    windowBuckets.cacheWrite += bucket.cacheWrite
    windowRequests += bucket.requests
  }

  perSession.sort((left, right) => right.total - left.total)

  return {
    ok: true,
    days: dayBuckets,
    totals: { ...windowBuckets, total: totalOf(windowBuckets) },
    allTimeTotal,
    allTimeRequests,
    topSessions: perSession.filter(entry => entry.total > 0).slice(0, 5),
    sessionsScanned: headers.length - skipped,
    skipped,
    windowDays: days,
    generatedAt: new Date(nowMs).toISOString(),
    cached: false,
  }
}

export function apply(ctx: any, config: Config | undefined): void {
  const resolved = resolveConfig(config)
  let usageCache: { at: number; days: number; result: UsageResult } | null = null
  let usageInflight: Promise<UsageResult> | null = null

  /**
   * 取用量结果：缓存命中（同 days 且未过期）直接返回并标记 cached；
   * 未命中时合并并发请求（usageInflight 去重），完成后回填缓存。
   */
  const getUsage = async (days: number, refresh: boolean): Promise<UsageResult> => {
    if (!refresh
      && usageCache !== null
      && usageCache.days === days
      && Date.now() - usageCache.at < resolved.cacheTtlMs) {
      return { ...usageCache.result, cached: true }
    }
    if (usageInflight === null) {
      usageInflight = computeUsage(ctx, ctx.sessionPersistence as SessionPersistenceLike, days)
        .then((result) => {
          usageCache = { at: Date.now(), days, result }
          usageInflight = null
          return result
        })
        .catch((error) => {
          usageInflight = null
          throw error
        })
    }
    return usageInflight
  }

  const handler = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const url = new URL(req.url ?? '/', 'http://x')
    const pathname = url.pathname
    try {
      if (req.method !== 'GET') {
        sendJson(res, 405, { ok: false, code: 'method-not-allowed', message: 'method not allowed; use GET' })
        return
      }
      if (pathname === '/dsh-deepseek-balance/balance') {
        const apiKey = await resolveApiKey(ctx, resolved.apiKeyEnv)
        if (apiKey === undefined) {
          sendJson(res, 200, {
            ok: false,
            code: 'missing-key',
            message: `未找到 API Key（凭据引用 ${resolved.apiKeyEnv}）。请到 设置 → Models 配置 DeepSeek API Key，或在启动环境中导出该变量。`,
          })
          return
        }
        sendJson(res, 200, await fetchBalance(resolved.balanceBaseURL, apiKey))
        return
      }
      if (pathname === '/dsh-deepseek-balance/usage') {
        // days 参数可覆盖默认窗口；非法值回退默认，且钳到 1..90。
        const rawDays = url.searchParams.get('days')
        let days = resolved.usageDays
        if (rawDays !== null) {
          const parsed = Number.parseInt(rawDays, 10)
          if (Number.isFinite(parsed)) days = Math.max(1, Math.min(MAX_USAGE_DAYS, parsed))
        }
        const refresh = url.searchParams.get('refresh') === '1'
        sendJson(res, 200, await getUsage(days, refresh))
        return
      }
      sendJson(res, 404, { ok: false, code: 'not-found', message: `unknown route ${JSON.stringify(pathname)}` })
    } catch (error) {
      ctx.logger?.warn?.(new Error(`deepseek-balance: ${String(error)}`))
      sendJson(res, 500, { ok: false, code: 'internal', message: 'internal error' })
    }
  }

  // 路由挂到 web 服务的前缀表；effect 保证插件停止/更新时自动摘除。
  ctx.effect(
    () => ctx.webServer.register({ kind: 'prefix', path: '/dsh-deepseek-balance', handler }),
    'deepseek-balance: routes',
  )
}
