/**
 * dsh-work 面板纯逻辑断言：两段式收起决策 + 与主框架左侧栏一致的
 * cubic-bezier(0.4,0,0.2,1) 缓动求解器。
 * 与 preview.test.mjs 同模式：stub 浏览器加载器抓取 lib/client.js 导出的纯函数，
 * node:test + assert，无依赖。跑在构建产物上：pnpm build && node test/panel.test.mjs
 * （或直接 pnpm test）。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'

/** Capture the plugin's module exports from a fake browser loader. */
function loadClientModule() {
  let captured = null
  globalThis.window = {
    __ModuleLoader__: {
      load({ factory }) {
        // The factory body destructures React at the top; components never run
        // during definition, so an empty-ish react stub suffices.
        const requireStub = (id) => {
          if (id === 'react') {
            return { useState: undefined, useEffect: undefined, useCallback: undefined, useRef: undefined, useLayoutEffect: undefined, createElement: undefined }
          }
          throw new Error('unexpected require: ' + id)
        }
        captured = factory(requireStub)
      },
    },
  }
  return {
    get exports() {
      if (captured === null) throw new Error('client module did not register')
      return captured
    },
  }
}

const holder = loadClientModule()
await import('../lib/client.js')
const { cubicBezierEase, panelActionFor } = holder.exports

test('panelActionFor：宽于最小宽度 → shrink，等于/低于 → hide', () => {
  assert.equal(panelActionFor(344), 'shrink')
  assert.equal(panelActionFor(720), 'shrink')
  assert.equal(panelActionFor(280), 'hide')
  // 自定义最小宽度
  assert.equal(panelActionFor(280, 320), 'hide')
  assert.equal(panelActionFor(400, 320), 'shrink')
  // 默认最小宽度 = 280（PANEL_MIN）
  assert.equal(panelActionFor(279), 'hide')
})

test('cubicBezierEase 端点与参考值', () => {
  assert.equal(cubicBezierEase(0), 0)
  assert.equal(cubicBezierEase(1), 1)
  // cubic-bezier(0.4,0,0.2,1) 的采样参考值（非对称曲线，ease(0.5)≠0.5）。
  assert.ok(Math.abs(cubicBezierEase(0.5) - 0.7756) < 1e-3)
  assert.ok(Math.abs(cubicBezierEase(0.25) - 0.2366) < 1e-3)
  assert.ok(Math.abs(cubicBezierEase(0.75) - 0.9594) < 1e-3)
})

test('cubicBezierEase 单调不减', () => {
  let prev = -Infinity
  for (let i = 0; i <= 100; i++) {
    const v = cubicBezierEase(i / 100)
    assert.ok(v >= prev - 1e-9, `t=${i / 100} 处回退：${v} < ${prev}`)
    prev = v
  }
})

test('cubicBezierEase 输入越界归一化', () => {
  assert.equal(cubicBezierEase(-1), 0)
  assert.equal(cubicBezierEase(2), 1)
})

test('cubicBezierEase 输出落在 [0,1] 且中段缓动（t=0.25 慢于线性）', () => {
  const quarter = cubicBezierEase(0.25)
  assert.ok(quarter >= 0 && quarter <= 1)
  // ease-in-out 前半段加速：y(0.25) 应小于线性 0.25
  assert.ok(quarter < 0.25 - 1e-3)
})
