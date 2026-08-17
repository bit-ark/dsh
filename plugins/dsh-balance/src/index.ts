/**
 * dsh-balance — 宿主半（Host）。
 *
 * 在 DSH web 服务上注册两个只读 JSON 端点（路径前缀 /dsh-balance）：
 *
 *  - GET /dsh-balance/balance
 *      通过凭据接缝解析 DeepSeek API key（与 Models 设置页写入的是同一个凭据
 *      引用，默认 `DEEPSEEK_API_KEY`，另带纯环境变量回退），再调用官方公开端点
 *      `GET <balanceBaseURL>/user/balance` 并归一化响应：
 *      { ok, available, balances: [{ currency, total, granted, toppedUp }],
 *        fetchedAt }。业务失败以 200 + `ok:false` 返回，并带机器可读的 `code`
 *      （'missing-key' | 'auth-failed' | 'upstream' | 'network'），设置页据此
 *      渲染友好状态。key 本身绝不回显。
 *
 *  - GET /dsh-balance/usage?days=N&refresh=1
 *      从持久化会话日志（sessionPersistence.list/load —— zstd 解码在后端内部）
 *      聚合 provider 上报的 token 用量：每个 LLM step 的最终 usage 样本按本地
 *      日历日分桶，覆盖最近 N 天（1..90，默认取行配置）。fork/子代理的
 *      seed 前缀被跳过，避免继承历史被重复计数。结果在内存缓存 `cacheTtlMs`
 *      毫秒；`refresh=1` 强制重算。
 *
 * 性能说明：样本在内存里只保留一份（每个 LLM step 一个最终样本），聚合分
 * 三趟——buildDayBuckets 分桶（含窗口内费用）、sumCost 算全量费用、perKey
 * 按 key 聚合；对同一份样本重复遍历是 O(n)，不是 O(n²)，且窗口合计直接由
 * 日桶求和、全量合计在 worker 内增量累加。缓存 5 分钟 + 在途请求按
 * (days, refresh) 键控去重。会话极多时首查需全量解压日志，属预期（README
 * 已注明）。
 *
 * 本插件全程只读：不写会话 / 设置 / 磁盘，无定时器（缓存只是时间戳比较）。
 */
import type { IncomingMessage, ServerResponse } from 'node:http'
import {
  buildDayBuckets,
  costOfSample,
  DEFAULT_PEAK_HOURS,
  foldSessionUsage,
  sumCost,
  sumSamples,
  totalOf,
  zeroBuckets,
} from './usage-fold.ts'
import type { ModelPrice, PriceTable, UsageBuckets, UsageSample, EventLike } from './usage-fold.ts'

// 重新导出，供独立测试套件从构建后的宿主 bundle 导入纯折叠函数
// （node test/usage-fold.test.mjs）。
export {
  buildDayBuckets,
  costOfSample,
  DEFAULT_PEAK_HOURS,
  foldSessionUsage,
  sumCost,
  sumSamples,
  totalOf,
  zeroBuckets,
}

/** 插件名：与包名 / 组合行 id / 客户端模块 id 保持一致（dsh-* 前缀）。 */
export const name = 'dsh-balance'

/** 本行离不开的 Web 组合服务（硬依赖，注入声明）。 */
export const inject = ['webServer', 'sessionPersistence']

const DEFAULT_BALANCE_BASE_URL = 'https://api.deepseek.com'
const DEFAULT_API_KEY_ENV = 'DEEPSEEK_API_KEY'
const DEFAULT_USAGE_DAYS = 14
const MAX_USAGE_DAYS = 90
const DEFAULT_CACHE_TTL_MS = 300_000
const BALANCE_TIMEOUT_MS = 8_000
const USAGE_LOAD_CONCURRENCY = 4

/**
 * 内置默认单价（元 / 百万 tokens，空闲时段基准；高峰 ×2）。
 * DeepSeek V4 系列 2026-08-17 起峰谷定价：Flash 命中 0.05 / 未命中 1.5 /
 * 输出 4.5；Pro 命中 0.15 / 未命中 4.5 / 输出 13.5。行配置 pricesPerM 可覆盖。
 * 其他 provider（如 qwen-token-plan-cn）无默认价——需要时在行配置里补。
 */
const DEFAULT_PRICES: PriceTable = {
  'deepseek-v4-flash': { inputMiss: 1.5, inputHit: 0.05, output: 4.5 },
  'deepseek-v4-pro': { inputMiss: 4.5, inputHit: 0.15, output: 13.5 },
}

interface Config {
  /** 凭据引用（环境变量名），指向 DeepSeek API key。 */
  apiKeyEnv?: string
  /** 账户端点基址；即使聊天走了代理，余额查询也固定走官方 API。 */
  balanceBaseURL?: string
  /** 默认图表窗口天数（1..90）。 */
  usageDays?: number
  /** 用量聚合缓存的存活时长（毫秒）。 */
  cacheTtlMs?: number
  /**
   * provider 路由 → API key 名称（凭据引用）的显式映射，覆盖自动探测。
   * 如 { 'deepseek-official': 'DEEPSEEK_API_KEY', 'qwen-token-plan-cn': 'QWEN_TOKEN_PLAN_CN_API_KEY' }。
   * 缺省时自动读取 llm-deepseek / llm-pi-ai 的设置命名空间推导。
   */
  keyNameByProvider?: Record<string, string>
  /** 费用显示币种（'CNY' → ¥，'USD' → $）；只影响展示。 */
  costCurrency?: string
  /**
   * 模型单价表（元 / 百万 tokens，空闲基准），合并覆盖内置默认价；
   * 未配置价格的模型不计费（费用显示为「—」）。
   */
  pricesPerM?: Record<string, ModelPrice>
  /** 高峰时段（北京时间小时 0..23）；落在其中的请求按单价 ×2。默认 09:00–14:00。 */
  peakHours?: number[]
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
  /** 该日估算费用（元）；未配置价格表时为 0。 */
  cost: number
}
/** 费用形状：null = 没有可计价样本（未配置价格），0 = 配置了价格但无费用。 */
type CostWire = number | null
/** /usage 的成功响应。 */
interface UsageResult {
  ok: true
  days: DayBucketWire[]
  totals: UsageBuckets & { total: number; cost: CostWire }
  allTimeTotal: number
  allTimeRequests: number
  allTimeCost: CostWire
  /** 费用展示币种（'CNY' | 'USD'），客户端据此选择符号。 */
  costCurrency: string
  topSessions: Array<{ sessionId: string; cwdLabel: string; total: number }>
  /** 按 API key（凭据引用）分组的全量消耗，取 top 5；含模型级细分与费用。 */
  topKeys: Array<{
    keyName: string
    providerIds: string[]
    models: Array<{ model: string; total: number; requests: number; cost: CostWire }>
    total: number
    requests: number
    cost: CostWire
  }>
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

/** 归一化后的行配置（resolveConfig 的返回值，供各消费方类型化使用）。 */
interface ResolvedConfig {
  apiKeyEnv: string
  balanceBaseURL: string
  usageDays: number
  cacheTtlMs: number
  costCurrency: 'CNY' | 'USD'
  prices: PriceTable
  peakHours: number[]
}

/**
 * 归一化行配置：非法值回退默认，days 钳到 1..90，
 * balanceBaseURL 做一次 URL 解析（解析失败保持官方默认，拼写错误不能炸掉整行）。
 */
function resolveConfig(config: Config | undefined): ResolvedConfig {
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
  // 价格表：内置默认（V4 Flash/Pro）+ 行配置合并覆盖（配置项优先级更高）。
  const prices: PriceTable = { ...DEFAULT_PRICES }
  if (config?.pricesPerM !== undefined && config.pricesPerM !== null && typeof config.pricesPerM === 'object') {
    for (const [model, price] of Object.entries(config.pricesPerM)) {
      if (price !== null && typeof price === 'object') {
        prices[model] = {
          inputMiss: Number(price.inputMiss) || 0,
          inputHit: Number(price.inputHit) || 0,
          output: Number(price.output) || 0,
        }
      }
    }
  }
  // 高峰时段：默认 09:00–14:00 北京；只收 0..23 的合法整数小时。
  const peakHours = Array.isArray(config?.peakHours) && config.peakHours.length > 0
    ? [...new Set(config.peakHours.map(hour => Math.trunc(Number(hour)))
      .filter(hour => Number.isFinite(hour) && hour >= 0 && hour <= 23))]
      .sort((left, right) => left - right)
    : [...DEFAULT_PEAK_HOURS]
  return {
    apiKeyEnv: nonEmptyString(config?.apiKeyEnv) ? config.apiKeyEnv.trim() : DEFAULT_API_KEY_ENV,
    balanceBaseURL,
    usageDays,
    cacheTtlMs,
    costCurrency: config?.costCurrency === 'USD' ? 'USD' : 'CNY',
    prices,
    peakHours,
  }
}

/** 两位小数（费用聚合后统一取整，避免浮点噪声累积展示）。 */
function roundCost(value: number): number {
  return Math.round(value * 100) / 100
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
 * 解析 provider 路由 → API key 名称（凭据引用）的映射，优先级从低到高：
 *
 * 1. 内置默认：`deepseek-official` → `DEEPSEEK_API_KEY`（llm-deepseek 的文档默认）；
 * 2. settings 服务自动探测：`llm-deepseek` 命名空间的 `apiKeyEnv`、
 *    `llm-pi-ai` 命名空间 `providers` 字典里每个路由的 `apiKeyEnv`
 *    （对应 Models 页写入的配置，无需用户手工维护）；
 * 3. 行配置 `keyNameByProvider` 显式覆盖（兜底一切自动推导不到的 provider）。
 *
 * 映射不到的 provider 在聚合时以其路由 id 本身作为 key 名展示。
 */
function resolveProviderKeyNames(ctx: any, config: Config | undefined): Map<string, string> {
  const names = new Map<string, string>()
  names.set('deepseek-official', DEFAULT_API_KEY_ENV)

  const settings = ctx.get('settings')
  if (settings !== undefined && typeof settings.get === 'function') {
    try {
      const deepseek = settings.get('llm-deepseek')
      if (deepseek !== undefined && deepseek !== null
        && typeof (deepseek as { apiKeyEnv?: unknown }).apiKeyEnv === 'string'
        && nonEmptyString((deepseek as { apiKeyEnv?: string }).apiKeyEnv)) {
        names.set('deepseek-official', (deepseek as { apiKeyEnv: string }).apiKeyEnv)
      }
    } catch {
      // 命名空间不可读就保持默认；探测失败不能影响聚合主流程。
    }
    try {
      const piAi = settings.get('llm-pi-ai') as { providers?: Record<string, { apiKeyEnv?: string }> } | undefined
      const providers = piAi?.providers
      if (providers !== undefined && providers !== null && typeof providers === 'object') {
        for (const [provider, profile] of Object.entries(providers)) {
          if (profile !== null && typeof profile === 'object' && nonEmptyString(profile.apiKeyEnv)) {
            names.set(provider, profile.apiKeyEnv as string)
          }
        }
      }
    } catch {
      // 同上：探测失败静默跳过。
    }
  }

  if (config?.keyNameByProvider !== undefined && config.keyNameByProvider !== null
    && typeof config.keyNameByProvider === 'object') {
    for (const [provider, keyName] of Object.entries(config.keyNameByProvider)) {
      if (nonEmptyString(keyName)) names.set(provider, keyName)
    }
  }
  return names
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
  config: Config | undefined,
  resolved: ResolvedConfig,
): Promise<UsageResult> {
  const headers = await persistence.list()
  const allSamples: UsageSample[] = []
  const perSession: Array<{ sessionId: string; cwdLabel: string; total: number }> = []
  const keyNames = resolveProviderKeyNames(ctx, config)
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
          // persistence.load 的事件是运行时域对象数组，这里按 EventLike
          // 的最小形状（type/time/data）消费，双断言避免类型系统纠缠。
          inspection.events as unknown as readonly EventLike[],
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
  const dayBuckets = buildDayBuckets(allSamples, days, nowMs, resolved.prices, resolved.peakHours)

  // 窗口合计直接由日桶求和：buildDayBuckets 已完成「窗口内/外」的样本归类，
  // 这里累加一次即可，等价于旧实现的二次过滤求和且少一遍日期计算。
  const windowBuckets = zeroBuckets()
  let windowRequests = 0
  let windowCost = 0
  // 窗口内是否存在可计价样本：不能拿全量的 pricedSamples 判定（那是所有
  // 历史样本的计数，窗口内若只有未配置价格的模型，会误把 0 元显示成 ¥0.00
  // 而不是「—」）。
  let windowPriced = false
  for (const bucket of dayBuckets) {
    windowBuckets.uncachedInput += bucket.uncachedInput
    windowBuckets.output += bucket.output
    windowBuckets.cacheRead += bucket.cacheRead
    windowBuckets.cacheWrite += bucket.cacheWrite
    windowRequests += bucket.requests
    windowCost += bucket.cost
    if (bucket.priced) windowPriced = true
  }

  // 全量费用（含窗口外历史）：没有任何可计价样本时为 null（未配置价格）。
  const allTimeCostRaw = sumCost(allSamples, resolved.prices, resolved.peakHours)
  const allTimeCost = allTimeCostRaw === undefined ? null : roundCost(allTimeCostRaw)

  perSession.sort((left, right) => right.total - left.total)

  // 按 API key 聚合全量消耗：sample.provider 先经 keyNames 映射成凭据引用，
  // 同一个 key 名下的多个 provider 路由合并成一行（如 deepseek-official 与
  // 其他共用 DEEPSEEK_API_KEY 的路由）；每个 key 下再按 model 细分，便于
  // 区分 v4-flash / v4-pro 等模型的实际消耗。
  const perKey = new Map<string, {
    keyName: string
    providers: Set<string>
    models: Map<string, { total: number; requests: number; cost: number; priced: boolean }>
    total: number
    requests: number
    cost: number
    priced: boolean
  }>()
  for (const sample of allSamples) {
    const keyName = keyNames.get(sample.provider) ?? sample.provider
    let entry = perKey.get(keyName)
    if (entry === undefined) {
      entry = { keyName, providers: new Set<string>(), models: new Map(), total: 0, requests: 0, cost: 0, priced: false }
      perKey.set(keyName, entry)
    }
    const sampleCost = costOfSample(sample, resolved.prices, resolved.peakHours)
    if (sampleCost !== undefined) {
      entry.cost += sampleCost
      entry.priced = true
    }
    entry.providers.add(sample.provider)
    entry.total += totalOf(sample.buckets)
    entry.requests += 1
    const modelTotal = entry.models.get(sample.model)
    if (modelTotal === undefined) {
      entry.models.set(sample.model, {
        total: totalOf(sample.buckets),
        requests: 1,
        cost: sampleCost ?? 0,
        priced: sampleCost !== undefined,
      })
    } else {
      modelTotal.total += totalOf(sample.buckets)
      modelTotal.requests += 1
      if (sampleCost !== undefined) {
        modelTotal.cost += sampleCost
        modelTotal.priced = true
      }
    }
  }
  const topKeys = [...perKey.values()]
    .filter(entry => entry.total > 0)
    .map(entry => ({
      keyName: entry.keyName,
      providerIds: [...entry.providers].sort(),
      models: [...entry.models.entries()]
        .map(([model, modelTotal]) => ({
          model,
          total: modelTotal.total,
          requests: modelTotal.requests,
          cost: modelTotal.priced ? roundCost(modelTotal.cost) : null,
        }))
        .sort((left, right) => right.total - left.total),
      total: entry.total,
      requests: entry.requests,
      cost: entry.priced ? roundCost(entry.cost) : null,
    }))
    .sort((left, right) => right.total - left.total)
    .slice(0, 5)

  return {
    ok: true,
    days: dayBuckets,
    totals: {
      ...windowBuckets,
      total: totalOf(windowBuckets),
      cost: windowPriced ? roundCost(windowCost) : null,
    },
    allTimeTotal,
    allTimeRequests,
    allTimeCost,
    costCurrency: resolved.costCurrency,
    topSessions: perSession.filter(entry => entry.total > 0).slice(0, 5),
    topKeys,
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
  // 在途计算按 `${days}:${refresh}` 键控去重：不同窗口的并发请求各算各的，
  // refresh=1 不会被同键的在途普通请求吞掉（旧实现是单一 Promise 槽，
  // 后到的 days=30 请求会拿到 days=14 的中间结果）。
  const usageInflight = new Map<string, Promise<UsageResult>>()

  /**
   * 取用量结果：缓存命中（同 days 且未过期）直接返回并标记 cached；
   * 未命中时合并同键并发请求，完成后回填缓存。
   */
  const getUsage = async (days: number, refresh: boolean): Promise<UsageResult> => {
    if (!refresh
      && usageCache !== null
      && usageCache.days === days
      && Date.now() - usageCache.at < resolved.cacheTtlMs) {
      return { ...usageCache.result, cached: true }
    }
    const key = `${days}:${refresh ? '1' : '0'}`
    let inflight = usageInflight.get(key)
    if (inflight === undefined) {
      inflight = computeUsage(ctx, ctx.sessionPersistence as SessionPersistenceLike, days, config, resolved)
        .then((result) => {
          usageCache = { at: Date.now(), days, result }
          usageInflight.delete(key)
          return result
        })
        .catch((error) => {
          usageInflight.delete(key)
          throw error
        })
      usageInflight.set(key, inflight)
    }
    return inflight
  }

  const handler = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const url = new URL(req.url ?? '/', 'http://x')
    const pathname = url.pathname
    try {
      // GET 与 HEAD 都允许：HEAD 是纯只读探测（如客户端确认端点可用性），
      // 语义与 GET 相同但不回传 body。
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        sendJson(res, 405, { ok: false, code: 'method-not-allowed', message: 'method not allowed; use GET' })
        return
      }
      if (pathname === '/dsh-balance/balance') {
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
      if (pathname === '/dsh-balance/usage') {
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
    () => ctx.webServer.register({ kind: 'prefix', path: '/dsh-balance', handler }),
    'deepseek-balance: routes',
  )
}
