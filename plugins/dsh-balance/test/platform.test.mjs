/**
 * Standalone assertions for the DeepSeek platform private-usage parsing, run
 * against the built host bundle: `pnpm build && node test/platform.test.mjs`.
 * Only the pure functions are tested (no network); the fetch wrapper itself
 * is exercised end-to-end in the running service.
 */
import assert from 'node:assert/strict'
import { beijingDateKey, beijingMonthKey, parsePlatformCostToday } from '../lib/index.js'

// 固定时间：北京 2026-08-21 12:00 = UTC 2026-08-21 04:00
const NOW_MS = Date.UTC(2026, 7, 21, 4, 0)

// ── (a) 北京日期/月份键 ─────────────────────────────────────────────────────
{
  // 用固定 UTC 时刻断言北京归日/归月（与机器时区无关）：
  // 2026-08-20 16:30 UTC = 北京 2026-08-21 00:30（跨日）。
  const ms = Date.UTC(2026, 7, 20, 16, 30)
  assert.equal(beijingDateKey(ms), '2026-08-21', '北京跨日归到次日')
  assert.deepEqual(beijingMonthKey(ms), { year: 2026, month: 8 }, '北京月份键')
  // 北京当天 23:00 = UTC 15:00，不跨日。
  assert.equal(beijingDateKey(Date.UTC(2026, 7, 20, 15, 0)), '2026-08-20')
  console.log('ok (a) beijing date/month keys')
}

// ── (b) 解析 cost 响应：今日合计 + 币种 ─────────────────────────────────────
{
  const body = {
    code: 0,
    data: {
      biz_code: 0,
      biz_data: [
        {
          currency: 'CNY',
          days: [
            {
              date: '2026-08-20',
              data: [
                {
                  model: 'deepseek-v4-flash',
                  usage: [
                    { type: 'PROMPT_CACHE_HIT_TOKEN', amount: 1.14 },
                    { type: 'PROMPT_CACHE_MISS_TOKEN', amount: 0.2 },
                    { type: 'RESPONSE_TOKEN', amount: 0.63 },
                  ],
                },
              ],
            },
            {
              date: '2026-08-19',
              data: [
                { model: 'deepseek-v4-flash', usage: [{ type: 'RESPONSE_TOKEN', amount: 99 }] },
              ],
            },
          ],
          total: [{ type: 'RESPONSE_TOKEN', amount: 99.77 }],
        },
      ],
    },
  }
  // 北京 2026-08-20 当天。
  const nowMs = Date.UTC(2026, 7, 20, 8, 0)
  const result = parsePlatformCostToday(body, nowMs)
  assert.ok(result.ok === true, '解析成功')
  assert.ok(Math.abs(result.todayCost - (1.14 + 0.2 + 0.63)) < 1e-9, `今日合计 ${String(result.todayCost)}`)
  assert.equal(result.currency, 'CNY', '币种来自条目')
  console.log('ok (b) cost parse today total')
}

// ── (c) REQUEST 项跳过、多币种选有数据的条目、首选币种决选、空月 ────────────
{
  const body = {
    code: 0,
    data: {
      biz_code: 0,
      biz_data: [
        { currency: 'USD', days: [] },
        {
          currency: 'CNY',
          days: [{
            date: '2026-08-20',
            data: [
              { model: 'm', usage: [
                { type: 'REQUEST', amount: 5 },          // 非金额，跳过
                { type: 'RESPONSE_TOKEN', amount: 2.5 },
              ] },
            ],
          }],
        },
      ],
    },
  }
  const nowMs = Date.UTC(2026, 7, 20, 4, 0)
  // 无首选币种：选有今日数据的条目（CNY），REQUEST 不计入金额。
  const noPref = parsePlatformCostToday(body, nowMs)
  assert.ok(noPref.ok === true)
  assert.ok(Math.abs(noPref.todayCost - 2.5) < 1e-9, 'REQUEST 不计入金额')
  assert.equal(noPref.currency, 'CNY', '取有今日数据的条目币种')
  // 首选币种命中有数据条目 → CNY；首选 USD 但 USD 无数据 → 仍取 CNY。
  const prefCny = parsePlatformCostToday(body, nowMs, 'CNY')
  assert.equal(prefCny.currency, 'CNY')
  const prefUsd = parsePlatformCostToday(body, nowMs, 'USD')
  assert.equal(prefUsd.currency, 'CNY', '首选币种无数据时回退到有数据的条目')
  console.log('ok (c) REQUEST skipped, data-bearing currency wins')
}

// ── (d) 会话失效 / 坏形状 ────────────────────────────────────────────────────
{
  assert.equal(parsePlatformCostToday({ code: 40003, msg: 'x', data: null }, 1).ok, false, 'code 40003 → 失效')
  const biz = parsePlatformCostToday({ code: 0, data: { biz_code: 40002, biz_data: null } }, 1)
  assert.equal(biz.ok, false, 'biz_code 40002 → 失效')
  assert.equal(parsePlatformCostToday({ code: 0, data: { biz_code: 0, biz_data: null } }, 1).ok, false)
  assert.equal(parsePlatformCostToday(null, 1).ok, false)
  assert.equal(parsePlatformCostToday({ code: 500 }, 1).ok, false)
  console.log('ok (d) auth errors and malformed shapes')
}

// ── (e) 空消费月（biz_data 为 { total: [], days: [] }）→ 今日 0 元 ──────────
{
  const result = parsePlatformCostToday({
    code: 0,
    data: { biz_code: 0, biz_data: [{ currency: 'CNY', days: [], total: [] }] },
  }, Date.UTC(2026, 7, 20, 4, 0))
  assert.ok(result.ok === true, '空月也算成功')
  assert.equal(result.todayCost, 0, '今日无消费 → 0 元')
  console.log('ok (e) empty month → today 0')
}

// ── (f) 新格式：按小时桶时间序列（成本字段）──────────────────────────────────
{
  // 2026-08-21 00:00 北京时间 = 1787241600
  const body = {
    code: 0,
    data: {
      biz_code: 0,
      biz_data: {
        start: 1787241600,
        end: 1787328000,
        bucket: 3600,
        models: ['deepseek-v4-pro', 'deepseek-v4-flash', 'deepseek-chat & deepseek-reasoner'],
        data: [
          {
            currency: 'CNY',
            series: [
              {
                api_key: { tracking_id: 'x', name: 'm-dsh', sensitive_id: 'sk-x', valid: true },
                model: 'deepseek-v4-flash',
                buckets: [
                  { time: 1787241600, cost: '0.9048238000000000' },
                  { time: 1787245200, cost: '0' },
                  { time: 1787248800, cost: '0' },
                ],
              },
              {
                api_key: { tracking_id: 'x', name: 'm-dsh', sensitive_id: 'sk-x', valid: true },
                model: 'deepseek-v4-pro',
                buckets: [
                  { time: 1787241600, cost: '0.1234' },
                  { time: 1787245200, cost: '0' },
                ],
              },
            ],
          },
        ],
      },
    },
  }
  const result = parsePlatformCostToday(body, NOW_MS)
  assert.ok(result.ok === true, '新格式解析成功')
  const expected = 0.9048238000000000 + 0.1234
  assert.ok(Math.abs(result.todayCost - expected) < 1e-9, `新格式合计 ${String(result.todayCost)}，期望 ${expected}`)
  assert.equal(result.currency, 'CNY', '新格式币种')
  console.log('ok (f) new time-series cost format')
}

// ── (g) 新格式：多币种选有数据的条目 ─────────────────────────────────────────
{
  const body = {
    code: 0,
    data: {
      biz_code: 0,
      biz_data: {
        start: 1787241600,
        end: 1787328000,
        bucket: 3600,
        models: ['deepseek-v4-pro'],
        data: [
          {
            currency: 'USD',
            series: [{
              api_key: { tracking_id: 'x', name: 'k', sensitive_id: 'sk-x', valid: true },
              model: 'deepseek-v4-pro',
              buckets: [{ time: 1787241600, cost: '0' }],
            }],
          },
          {
            currency: 'CNY',
            series: [{
              api_key: { tracking_id: 'x', name: 'k', sensitive_id: 'sk-x', valid: true },
              model: 'deepseek-v4-pro',
              buckets: [{ time: 1787241600, cost: '5.5' }],
            }],
          },
        ],
      },
    },
  }
  const noPref = parsePlatformCostToday(body, NOW_MS)
  assert.ok(noPref.ok === true)
  assert.equal(noPref.currency, 'CNY', '多币种选有数据的 CNY')
  assert.ok(Math.abs(noPref.todayCost - 5.5) < 1e-9)
  // 首选 USD 但 USD 无数据 → 回退到有数据的 CNY
  const prefUsd = parsePlatformCostToday(body, NOW_MS, 'USD')
  assert.equal(prefUsd.currency, 'CNY', '首选币种无数据时回退')
  console.log('ok (g) new format multi-currency pick data-bearing entry')
}

// ── (h) 新格式：空数据 ──────────────────────────────────────────────────────────
{
  const result = parsePlatformCostToday({
    code: 0,
    data: { biz_code: 0, biz_data: { start: 1, end: 2, bucket: 3600, models: [], data: [] } },
  }, NOW_MS)
  assert.equal(result.ok, false, '新格式空 data 数组 → 失败')
  console.log('ok (h) new format empty data array → error')
}

console.log('platform tests: all passed')
