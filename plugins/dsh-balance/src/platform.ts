/**
 * dsh-balance 的 DeepSeek 平台私有用量客户端（纯函数 + fetch，无 Cordis 依赖）。
 *
 * DeepSeek **没有**面向 API key 的用量查询接口（api.deepseek.com 上所有候选
 * 路由实测 404）；精确的每日消费只在官网控制台背后的私有接口里
 * （platform.deepseek.com/api/v0/usage/*），需要浏览器登录会话的 userToken
 * （localStorage 里的 `userToken`，非 API key）。因此本模块：
 *
 *   GET https://platform.deepseek.com/api/v0/usage/cost?month=<M>&year=<Y>
 *
 * 请求头带 `Authorization: Bearer <userToken>` + 平台同源头。响应信封：
 * `{ code, data: { biz_code, biz_data } }`；code/biz_code 为 40002 / 40003
 * 表示会话失效。
 *
 * 接口返回两种格式（平台可能随时切换）：
 *
 * 格式 A（旧）：按天汇总
 * ```json
 * {
 *   "biz_data": [
 *     { "currency": "CNY", "days": [{ "date": "YYYY-MM-DD", "data": [
 *       { "model": "...", "usage": [{ "type": "...", "amount": "..." }] }
 *     ] }], "total": [...] }
 *   ]
 * }
 * ```
 *
 * 格式 B（新）：按小时桶时间序列
 * ```json
 * {
 *   "biz_data": {
 *     "start": 1787241600, "end": 1787328000, "bucket": 3600,
 *     "models": ["deepseek-v4-pro", "deepseek-v4-flash", ...],
 *     "data": [{ "currency": "CNY", "series": [
 *       { "api_key": {...}, "model": "...", "buckets": [
 *         { "time": 1787241600, "cost": "0.9048" }
 *       ]}
 *     ]}]
 *   }
 * }
 * ```
 *
 * 两种格式都防御式处理，任何失败都返回带机器可读 code 的错误而不是
 * 抛异常。userToken 只在请求头里使用，绝不回显 / 记日志。
 */

/** 平台基址与用量端点（与官方控制台同源）。 */
export const PLATFORM_BASE_URL = 'https://platform.deepseek.com'
export const PLATFORM_USAGE_COST_PATH = '/api/v0/usage/cost'
/** 按 API key 维度的成本端点（返回小时桶时间序列，数据更实时）。 */
export const PLATFORM_USAGE_BY_API_KEY_COST_PATH = '/api/v0/usage/by_api_key/cost'

/** 平台用量请求超时（毫秒）。 */
export const PLATFORM_TIMEOUT_MS = 10_000

/** 北京时区偏移秒数（8h × 3600s），平台按此参数归日。 */
export const BEIJING_TZ_OFFSET_SECONDS = 28_800

/** 一个时间戳的北京时区（年, 月），平台控制台按北京时间归月。 */
export function beijingMonthKey(nowMs: number): { year: number; month: number } {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
    }).formatToParts(new Date(nowMs))
    const value = (type: string): number => Number(parts.find(part => part.type === type)?.value ?? '0')
    return { year: value('year'), month: value('month') }
  } catch {
    const date = new Date(nowMs)
    return { year: date.getFullYear(), month: date.getMonth() + 1 }
  }
}

/** 一个时间戳的北京日期键 `YYYY-MM-DD`（平台控制台按北京时间归日）。 */
export function beijingDateKey(nowMs: number): string {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date(nowMs))
    const value = (type: string): string => parts.find(part => part.type === type)?.value ?? ''
    return `${value('year')}-${value('month')}-${value('day')}`
  } catch {
    const date = new Date(nowMs)
    const two = (n: number): string => String(n).padStart(2, '0')
    return `${date.getFullYear()}-${two(date.getMonth() + 1)}-${two(date.getDate())}`
  }
}

/** 解析平台用量响应的结果（防御式）。 */
export type PlatformTodayResult =
  | { ok: true; todayCost: number; currency: string }
  | { ok: false; code: 'platform-auth' | 'upstream' | 'network'; message: string }

/** 平台会话失效的错误码（biz_code / code 共用）。 */
const AUTH_CODES = new Set([40002, 40003])

/**
 * 拉取「今天（北京日历日）」的官方消费金额（元）。
 *
 * 优先尝试精确时间范围查询（返回小时桶时间序列），失败时回退到月度
 * 查询（返回按天汇总）。两种格式均由 parsePlatformCostToday 处理。
 *
 * @param token 平台会话 userToken（浏览器 localStorage 的值，非 API key）。
 * @returns 今日消费与币种；token 无效 / 接口异常时返回对应 code 的错误。
 */
export async function fetchPlatformTodayCost(token: string, preferredCurrency?: string): Promise<PlatformTodayResult> {
  const nowMs = Date.now()
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'x-app-version': '1.0.0',
    Origin: PLATFORM_BASE_URL,
    Referer: `${PLATFORM_BASE_URL}/usage`,
  }

  // 计算今天（北京时间）的起止时间戳（秒）
  const startEnd = beijingTodayRange(nowMs)

  // 优先：按 API key 维度查询（小时桶时间序列，数据最实时）
  const byKey = await fetchCost(
    `${PLATFORM_BASE_URL}${PLATFORM_USAGE_BY_API_KEY_COST_PATH}?start=${String(startEnd.start)}&end=${String(startEnd.end)}&tz=${String(BEIJING_TZ_OFFSET_SECONDS)}`,
    headers,
  )
  if (byKey.ok) return byKey
  // 解析失败（含网络错误）时回退；业务错误（如 token 失效）直接返回
  if (byKey.code !== 'upstream') return byKey

  // 回退：月度查询（旧格式，按天汇总）
  const key = beijingMonthKey(nowMs)
  return fetchCost(
    `${PLATFORM_BASE_URL}${PLATFORM_USAGE_COST_PATH}?month=${String(key.month)}&year=${String(key.year)}`,
    headers,
    nowMs,
    preferredCurrency,
  )
}

/** 一次 fetch + 解析的封装，返回统一结果。 */
async function fetchCost(url: string, headers: Record<string, string>, nowMs?: number, preferredCurrency?: string): Promise<PlatformTodayResult> {
  let response: Response
  try {
    response = await fetch(url, { headers, signal: AbortSignal.timeout(PLATFORM_TIMEOUT_MS) })
  } catch (error) {
    const aborted = (error as Error & { name?: string })?.name === 'TimeoutError'
    return {
      ok: false,
      code: 'network',
      message: aborted
        ? `平台用量接口请求超时（${String(PLATFORM_TIMEOUT_MS / 1000)}s）`
        : `网络错误：${error instanceof Error ? error.message : String(error)}`,
    }
  }
  if (!response.ok) {
    return { ok: false, code: 'upstream', message: `平台用量接口返回 HTTP ${String(response.status)}` }
  }

  let body: any
  try {
    body = await response.json()
  } catch {
    return { ok: false, code: 'upstream', message: '平台用量接口返回了无法解析的内容' }
  }

  return parsePlatformCostToday(body, nowMs ?? Date.now(), preferredCurrency)
}

/** 今天（北京时间）的起止 Unix 秒时间戳 + 所属年月。 */
function beijingTodayRange(nowMs: number): { start: number; end: number; month: number; year: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(nowMs))
  const get = (type: string): number => Number(parts.find(part => part.type === type)?.value ?? '0')
  const year = get('year')
  const month = get('month')
  const day = get('day')
  // 今天 00:00 北京时间 = Date.UTC(Y, M-1, D) - 8h
  const startUtcMs = Date.UTC(year, month - 1, day, 0, 0, 0) - 8 * 3600 * 1000
  const endUtcMs = startUtcMs + 86_400_000
  return { start: Math.floor(startUtcMs / 1000), end: Math.floor(endUtcMs / 1000), month, year }
}

/**
 * 解析平台 usage/cost 的响应体，取「今天（北京日历日）」的消费金额（元）。
 * 纯函数（nowMs 注入），便于独立测试。支持两种响应格式（旧：按天汇总；
 * 新：按小时桶时间序列）。防御式：任何异常形状都返回 upstream 错误而
 * 不是抛异常。
 */
export function parsePlatformCostToday(body: any, nowMs: number, preferredCurrency?: string): PlatformTodayResult {
  // 信封：{ code, data: { biz_code, biz_data } }；40002/40003 = 会话失效。
  if (body === null || typeof body !== 'object') {
    return { ok: false, code: 'upstream', message: '平台用量接口返回了无法解析的内容' }
  }
  if (body.code !== undefined && body.code !== 0) {
    if (AUTH_CODES.has(body.code)) return platformAuthError()
    return { ok: false, code: 'upstream', message: `平台用量接口返回错误 code ${String(body.code)}` }
  }
  const data = body.data
  if (data === null || typeof data !== 'object') {
    return { ok: false, code: 'upstream', message: '平台用量接口返回了无法解析的内容' }
  }
  if (data.biz_code !== undefined && data.biz_code !== 0) {
    if (AUTH_CODES.has(data.biz_code)) return platformAuthError()
    return { ok: false, code: 'upstream', message: `平台用量接口返回错误 biz_code ${String(data.biz_code)}` }
  }

  const raw = data.biz_data
  if (raw === null || typeof raw !== 'object') {
    return { ok: false, code: 'upstream', message: '平台用量接口返回了无法解析的内容' }
  }

  // 格式 B（新）：biz_data 为含 data 数组的时间序列对象
  if (!Array.isArray(raw) && Array.isArray(raw.data)) {
    return parseTimeSeriesCost(raw, preferredCurrency)
  }

  // 格式 A（旧）：biz_data 为每币种一个条目的数组
  return parseDailyCost(raw, nowMs, preferredCurrency)
}

/**
 * 解析旧格式（按天汇总）：biz_data 为数组，每项含 currency/days/total。
 */
function parseDailyCost(raw: any, nowMs: number, preferredCurrency?: string): PlatformTodayResult {
  const items = Array.isArray(raw) ? raw : [raw]
  const today = beijingDateKey(nowMs)
  // 逐条目累计今日金额（每条目独立币种），再按「有数据优先 → 首选币种决选」
  // 选出一个条目作为今日消费口径——多币种账户不把不同币种的金额混加。
  const computed: Array<{ total: number; currency: string }> = []
  for (const item of items) {
    if (item === null || typeof item !== 'object') continue
    const currency = typeof item.currency === 'string' ? item.currency : ''
    let total = 0
    const days = Array.isArray(item.days) ? item.days : []
    for (const day of days) {
      if (day === null || typeof day !== 'object' || day.date !== today) continue
      const models = Array.isArray(day.data) ? day.data : []
      for (const model of models) {
        if (model === null || typeof model !== 'object') continue
        const usage = Array.isArray(model.usage) ? model.usage : []
        for (const entry of usage) {
          if (entry === null || typeof entry !== 'object') continue
          const type = typeof entry.type === 'string' ? entry.type.toUpperCase() : ''
          // cost 接口的 REQUEST 项（若有）不是金额，跳过。
          if (type === 'REQUEST') continue
          const value = Number(entry.amount)
          if (Number.isFinite(value)) total += value
        }
      }
    }
    computed.push({ total, currency })
  }
  return pickCost(computed, preferredCurrency)
}

/**
 * 解析新格式（按小时桶时间序列）：biz_data 为含 data 数组的对象。
 * 累加所有币种、所有模型、所有桶的 cost 字段。
 */
function parseTimeSeriesCost(bizData: any, preferredCurrency?: string): PlatformTodayResult {
  const dataArray: any[] = Array.isArray(bizData.data) ? bizData.data : []
  if (dataArray.length === 0) {
    return { ok: false, code: 'upstream', message: '平台用量接口返回了无法解析的内容' }
  }
  // 逐币种累计全部桶的费用（每条目独立币种），再按「有数据优先 → 首选币种决选」
  const computed: Array<{ total: number; currency: string }> = []
  for (const entry of dataArray) {
    if (entry === null || typeof entry !== 'object') continue
    const currency = typeof entry.currency === 'string' ? entry.currency : ''
    let total = 0
    const series = Array.isArray(entry.series) ? entry.series : []
    for (const s of series) {
      if (s === null || typeof s !== 'object') continue
      const buckets = Array.isArray(s.buckets) ? s.buckets : []
      for (const bucket of buckets) {
        if (bucket === null || typeof bucket !== 'object') continue
        const value = Number(bucket.cost)
        if (Number.isFinite(value)) total += value
      }
    }
    computed.push({ total, currency })
  }
  return pickCost(computed, preferredCurrency)
}

/**
 * 从计算结果中选出一个币种的消费金额：有今日数据的条目优先；多个有数据时
 * 按首选币种决选；全空时取首选币种条目。
 */
function pickCost(computed: Array<{ total: number; currency: string }>, preferredCurrency?: string): PlatformTodayResult {
  if (computed.length === 0) {
    return { ok: false, code: 'upstream', message: '平台用量接口返回了无法解析的内容' }
  }
  const withData = computed.filter(entry => entry.total > 0)
  let chosen: { total: number; currency: string }
  if (withData.length > 0) {
    chosen = preferredCurrency !== undefined
      ? withData.find(entry => entry.currency === preferredCurrency) ?? withData[0]
      : withData[0]
  } else {
    chosen = preferredCurrency !== undefined
      ? computed.find(entry => entry.currency === preferredCurrency) ?? computed[0]
      : computed[0]
  }
  return { ok: true, todayCost: chosen.total, currency: chosen.currency }
}

/** 统一的平台会话失效错误（含操作指引，不泄露 token）。 */
function platformAuthError(): PlatformTodayResult {
  return {
    ok: false,
    code: 'platform-auth',
    message: '平台 Token 无效或已过期：请在 platform.deepseek.com 重新登录后，从浏览器 localStorage 复制新的 userToken 更新配置',
  }
}
