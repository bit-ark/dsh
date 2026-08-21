/**
 * dsh-balance 的纯 token 用量折叠函数。
 *
 * harness 把 provider 上报的 token 记账挂在会话事件上：`assistant/chunk` 中
 * `chunk.type === 'usage'` 的块携带早期样本，该 step 的 `assistant/message`
 * 携带最终样本。两者都标明自己的 `(turn, step)`；provider 契约保证同一个
 * step 的上报是相邻的——message 就是该 step 的终结样本。这里的折叠语义与
 * harness 自带 token-meter 用量投影一致
 * （packages/llm/token-meter/src/usage-projection.ts）：同一 step 的重复样本
 * 以最后一条为准（替换而非累加），保证重试 / 分块不会双算。
 *
 * 本文件零依赖、纯函数：宿主半可以直接导入，测试套件无需 Cordis 运行时即可
 * 独立验证。
 */

/** 互斥的 provider 用量分桶（计费输入 = uncachedInput + cacheRead + cacheWrite）。 */
export interface UsageBuckets {
  uncachedInput: number
  output: number
  cacheRead: number
  cacheWrite: number
}

/** 一个 LLM step 的最终用量样本。 */
export interface UsageSample {
  /** 提供最终样本的事件的时间戳（Unix epoch 毫秒）。 */
  time: number
  /**
   * 产生该样本的 provider 路由（最近一条 `request/header` 的
   * `config.provider`，如 `deepseek-official`）；日志里没有 header 时为
   * `'(unknown)'`。这是把样本归属到鉴权 API key 的依据。
   */
  provider: string
  /**
   * 产生该样本的模型（最近一条 `request/header` 的 `config.model`，
   * 如 `deepseek-v4-flash`）；没有 header 时为 `'(unknown)'`。
   */
  model: string
  buckets: UsageBuckets
}

/** 折叠一个会话持久化日志的结果。 */
export interface SessionUsageFold {
  totals: UsageBuckets
  /** 上报过用量的 step 数。 */
  requests: number
  /** 每个 step 的最终样本（按天分桶的输入）。 */
  samples: UsageSample[]
}

/** 消耗图窗口中的一个日历日。 */
export interface DayBucket {
  /** 本地日历日期，`YYYY-MM-DD`。 */
  date: string
  /** 图表轴标签，`MM-DD`。 */
  label: string
  uncachedInput: number
  output: number
  cacheRead: number
  cacheWrite: number
  /** 四个分桶之和。 */
  total: number
  /** 最终样本落在该日的 step 数。 */
  requests: number
  /** 该日估算费用（元）；未配置价格表时为 0。 */
  cost: number
  /** 该日是否有可计价样本（模型配了价格）；无价格表时为 false。 */
  priced: boolean
}

/**
 * 一个模型的单价（元 / 百万 tokens，空闲时段基准；高峰时段按 ×2 计）。
 * DeepSeek V4 系列 2026-08-17 起峰谷定价；缓存写入按未命中输入价近似。
 */
export interface ModelPrice {
  /** 输入缓存未命中单价。 */
  inputMiss: number
  /** 输入缓存命中单价。 */
  inputHit: number
  /** 输出单价。 */
  output: number
}

/** 模型 id → 单价表（深度解构模型 + 其他 provider）。 */
export type PriceTable = Record<string, ModelPrice>

/**
 * 高峰时段（北京时间小时，0..23）。DeepSeek V4 官方（2026-08-17 生效）：每日
 * 北京时间 09:00–12:00 与 14:00–18:00 为高峰（正常价），其余时间为空闲/低谷
 * （价格约为高峰的一半）。峰谷按北京时间计时、对全球所有地区统一适用。
 */
export const DEFAULT_PEAK_HOURS = [9, 10, 11, 14, 15, 16, 17] as const

/** 北京时区（UTC+8，中国无夏令时）。 */
const BEIJING_OFFSET_MS = 8 * 3_600_000

/** 一个时间戳的北京时间小时（0..23）。 */
function beijingHour(ms: number): number {
  return new Date(ms + BEIJING_OFFSET_MS).getUTCHours()
}

/**
 * 一个样本的估算费用（元）：未缓存输入与缓存写入按「未命中」价、缓存读按
 * 「命中」价、输出按输出价；落在高峰时段（北京时间）的样本 ×2。
 * 模型没有价格配置时返回 undefined（不计费，而非 0 元）。
 */
export function costOfSample(
  sample: UsageSample,
  prices: PriceTable | undefined,
  peakHours: readonly number[],
): number | undefined {
  if (prices === undefined) return undefined
  const price = prices[sample.model]
  if (price === undefined) return undefined
  const missTokens = sample.buckets.uncachedInput + sample.buckets.cacheWrite
  const base = missTokens / 1_000_000 * price.inputMiss
    + sample.buckets.cacheRead / 1_000_000 * price.inputHit
    + sample.buckets.output / 1_000_000 * price.output
  const peak = peakHours.includes(beijingHour(sample.time))
  return base * (peak ? 2 : 1)
}

/** 一组样本的估算费用合计（元）；没有任何样本可计价时返回 undefined。 */
export function sumCost(
  samples: readonly UsageSample[],
  prices: PriceTable | undefined,
  peakHours: readonly number[],
): number | undefined {
  if (prices === undefined) return undefined
  let total = 0
  let priced = 0
  for (const sample of samples) {
    const cost = costOfSample(sample, prices, peakHours)
    if (cost === undefined) continue
    total += cost
    priced += 1
  }
  return priced === 0 ? undefined : total
}

/** 今日消费按峰谷拆分（元）：peak = 高峰时段消费，offPeak = 低谷时段消费。 */
export interface TodayCostSplit {
  peak: number
  offPeak: number
  total: number
  /** 今日是否有可计价样本（模型配了价格）。 */
  priced: boolean
}

/**
 * 把「今天（本地日历日）」的样本的估算费用按高峰/低谷拆分，供侧边栏小部件
 * 把今日消费画成两段不同颜色。口径与 buildDayBuckets 完全一致：非今日样本
 * 丢弃；高峰时段的样本按 ×2 计（costOfSample 内部）；模型无价格配置的样本
 * 不计入（priced 保持 false，消费金额为 0 而非未知）。
 */
export function splitTodayCost(
  samples: readonly UsageSample[],
  nowMs: number,
  prices?: PriceTable,
  peakHours: readonly number[] = DEFAULT_PEAK_HOURS,
): TodayCostSplit {
  const today = localDate(nowMs)
  const result: TodayCostSplit = { peak: 0, offPeak: 0, total: 0, priced: false }
  for (const sample of samples) {
    if (sample.time <= 0) continue
    const { year, month, day } = localDate(sample.time)
    if (year !== today.year || month !== today.month || day !== today.day) continue
    const cost = costOfSample(sample, prices, peakHours)
    if (cost === undefined) continue
    result.priced = true
    if (peakHours.includes(beijingHour(sample.time))) result.peak += cost
    else result.offPeak += cost
  }
  result.total = result.peak + result.offPeak
  return result
}

/** 持久化会话 header 的最小结构视图（不引入 harness 依赖）。 */
export interface SessionHeaderLike {
  id: string
  cwd?: string
  createdAt?: number
  /** fork/子代理从父会话继承的开头事件数——父日志里已经数过。 */
  seedLength?: number
}

/** 一个持久化会话事件的最小结构视图（导出：宿主半折叠时做类型断言用）。 */
export interface EventLike {
  type: string
  seq: number
  time: number
  data: {
    turn?: number
    step?: number
    usage?: TokenUsageLike
    chunk?: { type?: string; usage?: TokenUsageLike }
    header?: { config?: { provider?: string; model?: string } }
    [key: string]: unknown
  }
}

/** 事件上记录的 provider 用量形状（字段可能缺失）。 */
interface TokenUsageLike {
  inputTokens?: number
  outputTokens?: number
  cacheReadTokens?: number
  cacheWriteTokens?: number
  [key: string]: unknown
}

/** 归一化一个 provider 计数：仅接受有限非负数，否则记 0（脏数据不抛错）。 */
function count(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : 0
}

/** 四个分桶之和（计费总额）。 */
export function totalOf(buckets: UsageBuckets): number {
  return buckets.uncachedInput + buckets.output + buckets.cacheRead + buckets.cacheWrite
}

/** 全零分桶。 */
export function zeroBuckets(): UsageBuckets {
  return { uncachedInput: 0, output: 0, cacheRead: 0, cacheWrite: 0 }
}

/** 原地累加（target += add）。 */
function addBuckets(target: UsageBuckets, add: UsageBuckets): void {
  target.uncachedInput += add.uncachedInput
  target.output += add.output
  target.cacheRead += add.cacheRead
  target.cacheWrite += add.cacheWrite
}

/** 从事件里提取它上报的用量样本（没有则返回 undefined）。 */
function sampleOf(event: EventLike): { turn: number; step: number; usage: TokenUsageLike } | undefined {
  const data = event.data
  if (data === undefined || data === null) return undefined
  if (event.type === 'assistant/chunk') {
    const chunk = data.chunk
    if (chunk === undefined || chunk === null || chunk.type !== 'usage') return undefined
    if (chunk.usage === undefined || chunk.usage === null) return undefined
    if (typeof data.turn !== 'number' || typeof data.step !== 'number') return undefined
    return { turn: data.turn, step: data.step, usage: chunk.usage }
  }
  if (event.type === 'assistant/message') {
    if (data.usage === undefined || data.usage === null) return undefined
    if (typeof data.turn !== 'number' || typeof data.step !== 'number') return undefined
    return { turn: data.turn, step: data.step, usage: data.usage }
  }
  return undefined
}

/** 把 provider 用量形状转成内部四桶（缺失/非法字段按 0 计）。 */
function bucketsFrom(usage: TokenUsageLike): UsageBuckets {
  return {
    uncachedInput: count(usage.inputTokens),
    output: count(usage.outputTokens),
    cacheRead: count(usage.cacheReadTokens),
    cacheWrite: count(usage.cacheWriteTokens),
  }
}

/**
 * 折叠一个会话的持久化日志，得到每个 step 的最终用量样本。
 *
 * 事件按存储顺序消费，跳过开头 `seedLength` 个事件（fork/子代理从父会话继承
 * 的部分——父日志里已经数过）。对每个 `(turn, step)` 取最后一条样本——step 的
 * `assistant/message` 用量覆盖更早的 usage chunk——这正是防止重试 / 分块 step
 * 被重复计数的关键。
 * 注意 last-wins 是按事件顺序而非类型优先级：若某条 usage chunk 在其所属
 * `assistant/message` 之后重放，会覆盖最终样本。这依赖 provider 契约（message
 * 是终端样本，与 harness 自带 token-meter 语义一致），不额外做类型仲裁。
 */
export function foldSessionUsage(
  header: SessionHeaderLike,
  events: readonly EventLike[],
): SessionUsageFold {
  const seed = typeof header.seedLength === 'number'
    && Number.isInteger(header.seedLength)
    && header.seedLength > 0
    ? header.seedLength
    : 0

  // 插入顺序兼作日志顺序；key 对每次 LLM 调用唯一（turn:step）。
  const byStep = new Map<string, UsageSample>()
  let currentProvider = '(unknown)'
  let currentModel = '(unknown)'
  for (let index = 0; index < events.length; index += 1) {
    const event = events[index]
    if (event === undefined) continue
    // 请求头更新当前 provider / model：其后的 usage 样本都属于该路由与模型。
    // seed 前缀里的 header 也参与跟踪（子会话继承父上下文），但 seed 范围内的
    // usage 不采纳。
    if (event.type === 'request/header') {
      const config = event.data?.header?.config
      if (typeof config?.provider === 'string' && config.provider.length > 0) currentProvider = config.provider
      if (typeof config?.model === 'string' && config.model.length > 0) currentModel = config.model
      continue
    }
    if (index < seed) continue
    const sample = sampleOf(event)
    if (sample === undefined) continue
    // 没有有效时间戳的样本直接丢弃：图表按本地日历日分桶，buildDayBuckets
    // 会跳过 time<=0（否则会落到 1970 年），而全量合计 / topKeys / 费用此前
    // 仍会计入它们——同一批数据两套口径互相矛盾。折叠时就排除，三处口径
    // 统一为「只统计有时间的样本」。
    const time = typeof event.time === 'number' && Number.isFinite(event.time) ? event.time : 0
    if (time <= 0) continue
    byStep.set(`${sample.turn}:${sample.step}`, {
      time,
      provider: currentProvider,
      model: currentModel,
      buckets: bucketsFrom(sample.usage),
    })
  }

  const totals = zeroBuckets()
  const samples: UsageSample[] = []
  for (const sample of byStep.values()) {
    addBuckets(totals, sample.buckets)
    samples.push(sample)
  }
  return { totals, requests: byStep.size, samples }
}

/** 对任意样本集合求和（与窗口无关的整段日志口径）。 */
export function sumSamples(samples: readonly UsageSample[]): {
  buckets: UsageBuckets
  total: number
  requests: number
} {
  const buckets = zeroBuckets()
  for (const sample of samples) addBuckets(buckets, sample.buckets)
  return { buckets, total: totalOf(buckets), requests: samples.length }
}

/** 补零到两位（月份 / 日期格式化用）。 */
function two(n: number): string {
  return String(n).padStart(2, '0')
}

/** 一个时间戳的本地日历日期分量。 */
function localDate(ms: number): { year: number; month: number; day: number } {
  const d = new Date(ms)
  return { year: d.getFullYear(), month: d.getMonth(), day: d.getDate() }
}

/**
 * 把样本分桶到「到今天为止的最后 `days` 个本地日历日」。
 * 没有活动的日子以零填充，保证图表连续；`days` 钳到 1..90；
 * 窗口外的样本被丢弃。传 `prices` / `peakHours` 时同步累计每日的估算费用
 * （高峰时段按 ×2；模型无价格配置的样本不计入费用）。
 */
export function buildDayBuckets(
  samples: readonly UsageSample[],
  days: number,
  nowMs: number,
  prices?: PriceTable,
  peakHours: readonly number[] = DEFAULT_PEAK_HOURS,
): DayBucket[] {
  const windowDays = Math.max(1, Math.min(90, Math.trunc(Number.isFinite(days) ? days : 14)))
  const today = localDate(nowMs)

  // 从旧到新建桶；对年月日做 Date 运算可自然处理月边界 / 夏令时。
  const buckets: DayBucket[] = []
  const byKey = new Map<string, DayBucket>()
  for (let back = windowDays - 1; back >= 0; back -= 1) {
    const d = new Date(today.year, today.month, today.day - back)
    const date = `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(d.getDate())}`
    const bucket: DayBucket = {
      date,
      label: `${two(d.getMonth() + 1)}-${two(d.getDate())}`,
      uncachedInput: 0,
      output: 0,
      cacheRead: 0,
      cacheWrite: 0,
      total: 0,
      requests: 0,
      cost: 0,
      priced: false,
    }
    buckets.push(bucket)
    byKey.set(date, bucket)
  }

  for (const sample of samples) {
    if (sample.time <= 0) continue
    const { year, month, day } = localDate(sample.time)
    const bucket = byKey.get(`${year}-${two(month + 1)}-${two(day)}`)
    if (bucket === undefined) continue
    bucket.uncachedInput += sample.buckets.uncachedInput
    bucket.output += sample.buckets.output
    bucket.cacheRead += sample.buckets.cacheRead
    bucket.cacheWrite += sample.buckets.cacheWrite
    bucket.requests += 1
    const cost = costOfSample(sample, prices, peakHours)
    if (cost !== undefined) {
      bucket.cost += cost
      bucket.priced = true
    }
  }
  for (const bucket of buckets) bucket.total = totalOf(bucket)
  return buckets
}
