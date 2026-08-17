/**
 * dsh-deepseek-balance 的纯 token 用量折叠函数。
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
}

/** 持久化会话 header 的最小结构视图（不引入 harness 依赖）。 */
export interface SessionHeaderLike {
  id: string
  cwd?: string
  createdAt?: number
  /** fork/子代理从父会话继承的开头事件数——父日志里已经数过。 */
  seedLength?: number
}

/** 一个持久化会话事件的最小结构视图。 */
interface EventLike {
  type: string
  seq: number
  time: number
  data: {
    turn?: number
    step?: number
    usage?: TokenUsageLike
    chunk?: { type?: string; usage?: TokenUsageLike }
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
  for (let index = seed; index < events.length; index += 1) {
    const event = events[index]
    if (event === undefined) continue
    const sample = sampleOf(event)
    if (sample === undefined) continue
    byStep.set(`${sample.turn}:${sample.step}`, {
      time: typeof event.time === 'number' && Number.isFinite(event.time) ? event.time : 0,
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
 * 窗口外的样本被丢弃。
 */
export function buildDayBuckets(
  samples: readonly UsageSample[],
  days: number,
  nowMs: number,
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
  }
  for (const bucket of buckets) bucket.total = totalOf(bucket)
  return buckets
}
