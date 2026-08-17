/**
 * Standalone assertions for the pure usage folds, run against the built host
 * bundle: `pnpm build && node test/usage-fold.test.mjs`.
 */
import assert from 'node:assert/strict'
import {
  buildDayBuckets,
  foldSessionUsage,
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
    { time: NOW, buckets: { uncachedInput: 1, output: 2, cacheRead: 3, cacheWrite: 4 } },
    { time: NOW, buckets: { uncachedInput: 10, output: 20, cacheRead: 30, cacheWrite: 40 } },
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
  assert.equal(buildDayBuckets([{ time: 0, buckets: { uncachedInput: 5, output: 0, cacheRead: 0, cacheWrite: 0 } }], 14, NOW)
    .reduce((sum, bucket) => sum + bucket.total, 0), 0, 'timeless samples are dropped')
  console.log('ok (g) clamping')
}

console.log('usage-fold tests: all passed')
