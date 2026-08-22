/**
 * Standalone assertions for the pure usage folds, run against the built host
 * bundle: `pnpm build && node test/usage-fold.test.mjs`.
 */
import assert from 'node:assert/strict'
import {
  buildDayBuckets,
  costOfSample,
  DEFAULT_PEAK_HOURS,
  foldSessionUsage,
  isPeakHour,
  splitTodayCost,
  sumCost,
  sumSamples,
  totalOf,
} from '../lib/index.js'

// ── builders ─────────────────────────────────────────────────────────────────
let seqCounter = 0
const msg = (time, turn, step, usage) => ({
  type: 'assistant/message',
  seq: seqCounter++,
  time,
  data: { turn, step, message: { role: 'assistant', content: [] }, usage },
})
const chunk = (time, turn, step, usage) => ({
  type: 'assistant/chunk',
  seq: seqCounter++,
  time,
  data: { turn, step, chunk: { type: 'usage', usage } },
})
const reqHeader = (time, provider, model = '(none)') => ({
  type: 'request/header',
  seq: seqCounter++,
  time,
  data: { header: { config: { provider, model } }, reason: 'test' },
})
// Local-component timestamps: both samples and the window anchor use the same
// local calendar math, so the assertions are timezone-independent.
const at = (y, m1, d, h = 12) => new Date(y, m1 - 1, d, h).getTime()

const NOW = at(2026, 8, 17, 15)
const header = { id: 'session-test' }

// ── (a) same-step chunk then message: the message wins, no double count ──────
{
  const fold = foldSessionUsage(header, [
    chunk(at(2026, 8, 17, 9), 1, 1, { inputTokens: 100, outputTokens: 5 }),
    msg(at(2026, 8, 17, 9), 1, 1, { inputTokens: 120, outputTokens: 30, cacheReadTokens: 10 }),
  ])
  assert.equal(fold.requests, 1, 'one step reports usage once')
  assert.deepEqual(fold.totals, { uncachedInput: 120, output: 30, cacheRead: 10, cacheWrite: 0 })
  assert.equal(fold.samples.length, 1)
  console.log('ok (a) same-step replacement')
}

// ── (b) multiple steps sum ────────────────────────────────────────────────────
{
  const fold = foldSessionUsage(header, [
    msg(at(2026, 8, 17, 9), 1, 1, { inputTokens: 10, outputTokens: 20 }),
    msg(at(2026, 8, 17, 10), 1, 2, { inputTokens: 30, outputTokens: 40, cacheWriteTokens: 5 }),
    msg(at(2026, 8, 17, 11), 2, 1, { inputTokens: 50, outputTokens: 60 }),
  ])
  assert.equal(fold.requests, 3)
  assert.deepEqual(fold.totals, { uncachedInput: 90, output: 120, cacheRead: 0, cacheWrite: 5 })
  assert.equal(totalOf(fold.totals), 215)
  console.log('ok (b) multi-step sum')
}

// ── (c) seed prefix is skipped (fork/subagent dedupe) ─────────────────────────
{
  const fold = foldSessionUsage(
    { id: 'session-child', seedLength: 2 },
    [
      msg(at(2026, 8, 16, 9), 1, 1, { inputTokens: 999, outputTokens: 999 }),
      chunk(at(2026, 8, 16, 10), 1, 1, { inputTokens: 999, outputTokens: 999 }),
      msg(at(2026, 8, 17, 9), 1, 2, { inputTokens: 11, outputTokens: 22 }),
    ],
  )
  assert.equal(fold.requests, 1, 'seeded events belong to the parent log')
  assert.deepEqual(fold.totals, { uncachedInput: 11, output: 22, cacheRead: 0, cacheWrite: 0 })
  console.log('ok (c) seedLength skip')
}

// ── (d) day bucketing across dates + window membership ─────────────────────────
{
  const samples = [
    ...foldSessionUsage(header, [msg(at(2026, 8, 17, 9), 1, 1, { inputTokens: 100, outputTokens: 50 })]).samples,
    ...foldSessionUsage(header, [msg(at(2026, 8, 16, 20), 1, 1, { inputTokens: 0, outputTokens: 20 })]).samples,
    ...foldSessionUsage(header, [msg(at(2026, 8, 10, 8), 1, 1, { cacheReadTokens: 7 })]).samples,
    // Outside a 14-day window ending 2026-08-17:
    ...foldSessionUsage(header, [msg(at(2026, 8, 1, 8), 1, 1, { inputTokens: 999 })]).samples,
  ]
  const days = buildDayBuckets(samples, 14, NOW)
  assert.equal(days.length, 14, 'window is contiguous days')
  assert.equal(days[days.length - 1].date, '2026-08-17')
  assert.equal(days[0].date, '2026-08-04')
  const byDate = new Map(days.map(bucket => [bucket.date, bucket]))
  assert.equal(byDate.get('2026-08-17').total, 150)
  assert.equal(byDate.get('2026-08-17').requests, 1)
  assert.equal(byDate.get('2026-08-16').output, 20)
  assert.equal(byDate.get('2026-08-10').cacheRead, 7)
  assert.equal(byDate.get('2026-08-15').total, 0, 'empty days stay zero-filled')
  const windowTotal = days.reduce((sum, bucket) => sum + bucket.total, 0)
  assert.equal(windowTotal, 177, 'out-of-window sample excluded')
  console.log('ok (d) day buckets + window')
}

// ── (e) total = sum of the four disjoint buckets ───────────────────────────────
{
  const { buckets, total } = sumSamples([
    { time: NOW, provider: 'deepseek-official', model: 'deepseek-v4-flash', buckets: { uncachedInput: 1, output: 2, cacheRead: 3, cacheWrite: 4 } },
    { time: NOW, provider: 'qwen-token-plan-cn', model: 'qwen3.8-max', buckets: { uncachedInput: 10, output: 20, cacheRead: 30, cacheWrite: 40 } },
  ])
  assert.equal(total, 110)
  assert.equal(totalOf(buckets), 110)
  console.log('ok (e) total identity')
}

// ── (f) tolerance: garbage never throws, never counts ─────────────────────────
{
  const fold = foldSessionUsage(header, [
    { type: 'user/message', seq: 0, time: NOW, data: {} },
    { type: 'assistant/chunk', seq: 1, time: NOW, data: { turn: 1, step: 1, chunk: { type: 'text' } } },
    { type: 'assistant/chunk', seq: 2, time: NOW, data: { turn: 1, step: 1 } },
    msg(NOW, 1, 2, undefined),
    msg(NOW, 1, 3, { inputTokens: -5, outputTokens: Number.NaN, cacheReadTokens: 'x', cacheWriteTokens: 6 }),
    { type: 'assistant/message', seq: 5, time: NOW, data: { usage: { inputTokens: 1 } } },
  ])
  assert.equal(fold.requests, 1, 'only the well-formed step counts')
  assert.deepEqual(fold.totals, { uncachedInput: 0, output: 0, cacheRead: 0, cacheWrite: 6 })
  const empty = foldSessionUsage(header, [])
  assert.equal(empty.requests, 0)
  assert.equal(totalOf(empty.totals), 0)
  console.log('ok (f) tolerance')
}

// ── (g) window clamping ────────────────────────────────────────────────────────
{
  assert.equal(buildDayBuckets([], 200, NOW).length, 90, 'days clamped to 90')
  assert.equal(buildDayBuckets([], 0, NOW).length, 1, 'days clamped to 1')
  assert.equal(buildDayBuckets([{ time: 0, provider: 'deepseek-official', model: 'deepseek-v4-flash', buckets: { uncachedInput: 5, output: 0, cacheRead: 0, cacheWrite: 0 } }], 14, NOW)
    .reduce((sum, bucket) => sum + bucket.total, 0), 0, 'timeless samples are dropped')
  console.log('ok (g) clamping')
}

// ── (h) provider/model attribution via request/header ──────────────────────────
{
  // Header before usage stamps provider + model; a later header switches both.
  const fold = foldSessionUsage(header, [
    reqHeader(at(2026, 8, 17, 8), 'deepseek-official', 'deepseek-v4-flash'),
    msg(at(2026, 8, 17, 9), 1, 1, { inputTokens: 10, outputTokens: 5 }),
    reqHeader(at(2026, 8, 17, 10), 'qwen-token-plan-cn', 'qwen3.8-max'),
    msg(at(2026, 8, 17, 11), 1, 2, { inputTokens: 20, outputTokens: 10 }),
  ])
  assert.equal(fold.samples.length, 2)
  assert.equal(fold.samples[0].provider, 'deepseek-official')
  assert.equal(fold.samples[0].model, 'deepseek-v4-flash')
  assert.equal(fold.samples[1].provider, 'qwen-token-plan-cn')
  assert.equal(fold.samples[1].model, 'qwen3.8-max')
  console.log('ok (h) provider/model switch')
}

// ── (i) provider fallbacks: no header → unknown; seed inherits parent context ───
{
  const noHeader = foldSessionUsage(header, [
    msg(at(2026, 8, 17, 9), 1, 1, { inputTokens: 1 }),
  ])
  assert.equal(noHeader.samples[0].provider, '(unknown)')
  assert.equal(noHeader.samples[0].model, '(unknown)')

  // Seed range: header events still feed provider/model state, usage is not adopted.
  const child = foldSessionUsage(
    { id: 'session-child', seedLength: 2 },
    [
      reqHeader(at(2026, 8, 16, 9), 'deepseek-official', 'deepseek-v4-pro'),
      msg(at(2026, 8, 16, 10), 1, 1, { inputTokens: 999 }),
      msg(at(2026, 8, 17, 9), 1, 2, { inputTokens: 11 }),
    ],
  )
  assert.equal(child.requests, 1)
  assert.equal(child.samples[0].provider, 'deepseek-official', 'seed header context inherited')
  assert.equal(child.samples[0].model, 'deepseek-v4-pro', 'seed header model inherited')
  assert.deepEqual(child.totals, { uncachedInput: 11, output: 0, cacheRead: 0, cacheWrite: 0 })
  console.log('ok (i) provider fallbacks')
}

// ── (j) cost estimation ─────────────────────────────────────────────────────────
{
  const prices = {
    'deepseek-v4-flash': { inputMiss: 1.5, inputHit: 0.05, output: 4.5 },
  }
  // 北京 18:00（空闲）与北京 10:00（高峰）——用 UTC 构造，与时区无关。
  const offPeak = Date.UTC(2026, 7, 17, 10, 0)
  const peak = Date.UTC(2026, 7, 17, 2, 0)
  const mk = (time, extra = {}) => ({
    time,
    provider: 'deepseek-official',
    model: 'deepseek-v4-flash',
    buckets: { uncachedInput: 0, output: 0, cacheRead: 0, cacheWrite: 0, ...extra },
  })

  // 各 100 万：未命中输入 + 命中 + 输出，空闲 = 1.5 + 0.05 + 4.5 = 6.05。
  const off = costOfSample(
    mk(offPeak, { uncachedInput: 1_000_000, cacheRead: 1_000_000, output: 1_000_000 }),
    prices, DEFAULT_PEAK_HOURS,
  )
  assert.ok(off !== undefined && Math.abs(off - 6.05) < 1e-9, `off-peak cost ${String(off)}`)
  // 高峰 ×2 = 12.1。
  const on = costOfSample(
    mk(peak, { uncachedInput: 1_000_000, cacheRead: 1_000_000, output: 1_000_000 }),
    prices, DEFAULT_PEAK_HOURS,
  )
  assert.ok(on !== undefined && Math.abs(on - 12.1) < 1e-9, `peak cost ${String(on)}`)
  // 缓存写入按未命中价：100 万 → 1.5（空闲）。
  const write = costOfSample(mk(offPeak, { cacheWrite: 1_000_000 }), prices, DEFAULT_PEAK_HOURS)
  assert.ok(write !== undefined && Math.abs(write - 1.5) < 1e-9, `cacheWrite cost ${String(write)}`)
  // 未知模型 / 无价格表 → undefined（不计费而非 0 元）。
  assert.equal(costOfSample(mk(offPeak), { other: { inputMiss: 1, inputHit: 1, output: 1 } }, DEFAULT_PEAK_HOURS), undefined)
  assert.equal(costOfSample(mk(offPeak), undefined, DEFAULT_PEAK_HOURS), undefined)
  assert.equal(sumCost([mk(offPeak)], undefined, DEFAULT_PEAK_HOURS), undefined)
  // 日桶费用累计（本地同日样本，与测试机器时区无关的两条都落在 08-17）。
  const daySamples = [
    mk(new Date(2026, 7, 17, 9).getTime(), { uncachedInput: 1_000_000 }),
    mk(new Date(2026, 7, 17, 18).getTime(), { output: 1_000_000 }),
  ]
  const days = buildDayBuckets(daySamples, 14, NOW, prices, DEFAULT_PEAK_HOURS)
  const day = days.find(bucket => bucket.date === '2026-08-17')
  assert.ok(day !== undefined && day.cost > 0, 'day bucket accumulates cost')
  console.log('ok (j) cost estimation')
}

// ── (j2) 周末统一低谷价（2026-08-23 00:00 北京时间起生效）────────────────────
{
  // 北京时间构造（UTC+8）：周六/周日 10:00 = UTC 02:00；周一 10:00 = UTC 02:00。
  const saturdayBefore = Date.UTC(2026, 7, 22, 2, 0)   // 北京 08-22（周六）10:00
  const sundayAfter = Date.UTC(2026, 7, 23, 2, 0)      // 北京 08-23（周日）10:00
  const sundayAfterOff = Date.UTC(2026, 7, 23, 10, 0)  // 北京 08-23（周日）18:00
  const mondayAfter = Date.UTC(2026, 7, 24, 2, 0)      // 北京 08-24（周一）10:00
  const nextSaturday = Date.UTC(2026, 7, 29, 2, 0)     // 北京 08-29（周六）10:00

  // 规则生效前：周六高峰时段仍按高峰价（isPeakHour = true）。
  assert.equal(isPeakHour(saturdayBefore, DEFAULT_PEAK_HOURS), true, '生效前周六 10:00 仍是高峰')
  // 规则生效后：周日全天低谷（10:00 高峰时段也不计峰）。
  assert.equal(isPeakHour(sundayAfter, DEFAULT_PEAK_HOURS), false, '生效后周日 10:00 是低谷')
  assert.equal(isPeakHour(sundayAfterOff, DEFAULT_PEAK_HOURS), false, '生效后周日 18:00 是低谷')
  // 规则生效后：工作日高峰时段照常计峰。
  assert.equal(isPeakHour(mondayAfter, DEFAULT_PEAK_HOURS), true, '生效后周一 10:00 仍是高峰')
  // 规则生效后：下一个周六同样全天低谷。
  assert.equal(isPeakHour(nextSaturday, DEFAULT_PEAK_HOURS), false, '生效后周六 10:00 是低谷')

  // 费用口径：同样的 100 万未命中输入，生效前周六高峰 ×2 = 3.0，
  // 生效后周日 10:00 低谷 = 1.5，生效后周一 10:00 高峰 = 3.0。
  const prices = {
    'deepseek-v4-flash': { inputMiss: 1.5, inputHit: 0.05, output: 4.5 },
  }
  const mk = time => ({
    time,
    provider: 'deepseek-official',
    model: 'deepseek-v4-flash',
    buckets: { uncachedInput: 1_000_000, output: 0, cacheRead: 0, cacheWrite: 0 },
  })
  const costBefore = costOfSample(mk(saturdayBefore), prices, DEFAULT_PEAK_HOURS)
  const costSunday = costOfSample(mk(sundayAfter), prices, DEFAULT_PEAK_HOURS)
  const costMonday = costOfSample(mk(mondayAfter), prices, DEFAULT_PEAK_HOURS)
  assert.ok(costBefore !== undefined && Math.abs(costBefore - 3.0) < 1e-9, `生效前周六高峰 ${String(costBefore)}`)
  assert.ok(costSunday !== undefined && Math.abs(costSunday - 1.5) < 1e-9, `生效后周日低谷 ${String(costSunday)}`)
  assert.ok(costMonday !== undefined && Math.abs(costMonday - 3.0) < 1e-9, `生效后周一高峰 ${String(costMonday)}`)

  // 今日拆分口径：若「今天」是生效后的周日，全天消费都归 offPeak。
  const nowSunday = Date.UTC(2026, 7, 23, 8, 0) // 北京 08-23（周日）16:00，作为 nowMs
  const split = splitTodayCost(
    [mk(sundayAfter), mk(sundayAfterOff)],
    nowSunday,
    prices,
    DEFAULT_PEAK_HOURS,
  )
  assert.ok(Math.abs(split.peak - 0) < 1e-9, `周日 peak 应为 0，实际 ${String(split.peak)}`)
  assert.ok(Math.abs(split.offPeak - 3.0) < 1e-9, `周日 offPeak 3.0，实际 ${String(split.offPeak)}`)
  assert.ok(Math.abs(split.total - 3.0) < 1e-9, `周日 total 3.0，实际 ${String(split.total)}`)
  console.log('ok (j2) weekend flat pricing')
}

// ── (k) 无效时间戳：折叠时即排除，全量与图表口径一致 ────────────────────────
{
  // time <= 0 的样本在 foldSessionUsage 里被丢弃：它进不了 allTime 合计，
  // 也进不了 buildDayBuckets（图表），避免同一批数据两套口径互相矛盾。
  const fold = foldSessionUsage(header, [
    msg(0, 1, 1, { inputTokens: 999 }),
    chunk(1_700_000_000_000, 1, 2, { outputTokens: 5 }),
  ])
  assert.equal(fold.requests, 1, 'time<=0 样本不计数')
  assert.equal(fold.samples.length, 1, 'time<=0 样本不出现在样本集')
  assert.equal(fold.totals.output, 5)
  console.log('ok (k) invalid timestamps excluded at fold')
}

// ── (l) 月/年边界分桶 ────────────────────────────────────────────────────────
{
  // 窗口横跨月边界（7 月末 → 8 月初）时，桶仍按本地日历日正确归位，
  // 且零填充天数与窗口长度一致（14 个桶）。
  const monthEdge = buildDayBuckets([
    { time: new Date(2026, 6, 31, 23).getTime(), provider: 'p', model: 'm', buckets: { uncachedInput: 1, output: 0, cacheRead: 0, cacheWrite: 0 } },
    { time: new Date(2026, 7, 1, 0).getTime(), provider: 'p', model: 'm', buckets: { uncachedInput: 2, output: 0, cacheRead: 0, cacheWrite: 0 } },
  ], 14, new Date(2026, 7, 10, 12).getTime())
  assert.equal(monthEdge.length, 14, '窗口恒为 14 桶')
  const lastDay = monthEdge[monthEdge.length - 1]
  assert.equal(lastDay.date, '2026-08-10')
  assert.equal(lastDay.uncachedInput, 0)
  const jul31 = monthEdge.find(bucket => bucket.date === '2026-07-31')
  const aug1 = monthEdge.find(bucket => bucket.date === '2026-08-01')
  assert.equal(jul31?.uncachedInput, 1, '7/31 样本落在 7/31 桶')
  assert.equal(aug1?.uncachedInput, 2, '8/1 样本落在 8/1 桶（跨月不串桶）')
  console.log('ok (l) month/year boundary bucketing')
}

// ── (m) days 边界与 NaN/Infinity ─────────────────────────────────────────────
{
  const s = { time: new Date(2026, 7, 17, 9).getTime(), provider: 'p', model: 'm', buckets: { uncachedInput: 1, output: 0, cacheRead: 0, cacheWrite: 0 } }
  assert.equal(buildDayBuckets([s], 1, NOW).length, 1, 'days=1 单桶')
  assert.equal(buildDayBuckets([s], 0, NOW).length, 1, 'days=0 钳到 1')
  assert.equal(buildDayBuckets([s], 999, NOW).length, 90, 'days>90 钳到 90')
  assert.equal(buildDayBuckets([s], Number.NaN, NOW).length, 14, 'NaN days 回退默认 14')
  assert.equal(buildDayBuckets([s], Number.POSITIVE_INFINITY, NOW).length, 14, 'Infinity days 视为非法回退默认 14')
  assert.equal(buildDayBuckets([s], -5, NOW).length, 1, '负 days 钳到 1')
  console.log('ok (m) days bounds and non-finite clamping')
}

// ── (n) message-after-chunk 乱序：last-wins 按事件顺序（文档化行为）──────────
{
  // provider 契约里 message 是终端样本；若一条 chunk 在其所属 message 之后
  // 重放，last-wins 会以 chunk 为准——这是按事件顺序去重的既定语义，不是
  // 类型仲裁。断言实际行为，防止未来改动悄悄改变它。
  const fold = foldSessionUsage(header, [
    msg(1_700_000_000_000, 2, 1, { outputTokens: 100 }),
    chunk(1_700_000_000_001, 2, 1, { outputTokens: 7 }),
  ])
  assert.equal(fold.totals.output, 7, '同 (turn,step) 后到者胜')
  console.log('ok (n) last-wins by event order (documented)')
}

// ── (o) 今日消费峰谷拆分 ──────────────────────────────────────────────────────
{
  const prices = {
    'deepseek-v4-flash': { inputMiss: 1.5, inputHit: 0.05, output: 4.5 },
  }
  const mk = (time, model = 'deepseek-v4-flash') => ({
    time,
    provider: 'deepseek-official',
    model,
    buckets: { uncachedInput: 1_000_000, output: 0, cacheRead: 0, cacheWrite: 0 },
  })
  // 用 UTC 构造北京时刻，与时区无关：北京 18:00 = UTC 10:00（低谷），
  // 北京 10:00 = UTC 02:00（高峰）。NOW 为北京 08-17 23:00（UTC 15:00）。
  const todayOff = Date.UTC(2026, 7, 17, 10, 0)   // 北京 08-17 18:00，低谷
  const todayPeak = Date.UTC(2026, 7, 17, 2, 0)   // 北京 08-17 10:00，高峰
  const yesterday = Date.UTC(2026, 7, 16, 10, 0)  // 非今日，丢弃

  // 每条 100 万未命中输入：低谷 1.5，高峰 ×2 = 3.0。
  const split = splitTodayCost(
    [mk(todayOff), mk(todayPeak), mk(yesterday)],
    NOW,
    prices,
    DEFAULT_PEAK_HOURS,
  )
  assert.ok(Math.abs(split.peak - 3.0) < 1e-9, `peak share ${String(split.peak)}`)
  assert.ok(Math.abs(split.offPeak - 1.5) < 1e-9, `off-peak share ${String(split.offPeak)}`)
  assert.ok(Math.abs(split.total - 4.5) < 1e-9, `total ${String(split.total)}`)
  assert.equal(split.priced, true)

  // 无价格配置的模型 / 无价格表：priced = false，total = 0（不计费而非未知）。
  const unpriced = splitTodayCost([mk(todayOff, 'qwen3.8-max')], NOW, prices, DEFAULT_PEAK_HOURS)
  assert.equal(unpriced.priced, false)
  assert.equal(unpriced.total, 0)
  const noTable = splitTodayCost([mk(todayOff)], NOW, undefined, DEFAULT_PEAK_HOURS)
  assert.equal(noTable.priced, false)
  assert.equal(noTable.total, 0)
  console.log('ok (o) today cost peak/off-peak split')
}

console.log('usage-fold tests: all passed')
