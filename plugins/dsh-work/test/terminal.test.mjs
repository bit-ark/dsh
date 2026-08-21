/**
 * dsh-work 终端断言：
 *  1. 纯逻辑——环形输出缓冲 / 尺寸钳制 / env 剔除 / 登录 shell 参数（lib/index.js 导出）。
 *  2. 集成——把 lib/index.js 的 apply() 挂到临时 node:http 服务器（fake ctx），
 *     走真实 node-pty + ws：创建会话 → WebSocket 收发 → 回放（第二个连接）→
 *     resize → kill → 退出帧；另验证异源 Origin 拒绝。
 * 跑在构建产物上：pnpm build && node test/terminal.test.mjs（或直接 pnpm test）。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import WebSocket from 'ws'

const {
  apply,
  createOutputRing,
  clampedTermSize,
  scrubbedEnv,
  loginShellArgs,
} = await import('../lib/index.js')

// ── 纯逻辑 ─────────────────────────────────────────────────────────────
test('createOutputRing：保留最近 maxBytes，最新块始终保留', () => {
  const ring = createOutputRing(16)
  ring.push('aaaaaaaa') // 8 bytes
  ring.push('bbbbbbbb') // 8 bytes → 16，不超限
  assert.equal(ring.text(), 'aaaaaaaabbbbbbbb')
  ring.push('cccc') // 20 > 16 → 丢最旧块
  assert.equal(ring.text(), 'bbbbbbbbcccc')
  // 单块超限也保留最新块本身。
  ring.push('x'.repeat(64))
  assert.equal(ring.text(), 'x'.repeat(64))
  ring.clear()
  assert.equal(ring.text(), '')
  assert.equal(ring.size, 0)
})

test('clampedTermSize：整数化 + 区间钳制 + 非法回退', () => {
  assert.deepEqual(clampedTermSize(80, 24), { cols: 80, rows: 24 })
  assert.deepEqual(clampedTermSize(1, 1), { cols: 2, rows: 2 })
  assert.deepEqual(clampedTermSize(10000, 10000), { cols: 500, rows: 300 })
  assert.deepEqual(clampedTermSize(80.6, 24.4), { cols: 81, rows: 24 })
  assert.deepEqual(clampedTermSize(undefined, undefined), { cols: 80, rows: 24 })
  assert.deepEqual(clampedTermSize('wide', NaN), { cols: 80, rows: 24 })
})

test('scrubbedEnv：剔除凭据形与 DSH_*，保留常规变量，叠加 extra', () => {
  const env = scrubbedEnv({ TERM: 'xterm-256color' }, {
    PATH: '/usr/bin',
    HOME: '/Users/x',
    DEEPSEEK_API_KEY: 'secret',
    MY_TOKEN: 't',
    db_password: 'p',
    DSH_SESSION_ID: 's',
    dsh_lower: 's',
    NORMAL: 'ok',
  })
  assert.equal(env.PATH, '/usr/bin')
  assert.equal(env.HOME, '/Users/x')
  assert.equal(env.NORMAL, 'ok')
  assert.equal(env.TERM, 'xterm-256color')
  assert.equal(env.DEEPSEEK_API_KEY, undefined)
  assert.equal(env.MY_TOKEN, undefined)
  assert.equal(env.db_password, undefined)
  assert.equal(env.DSH_SESSION_ID, undefined)
  assert.equal(env.dsh_lower, undefined)
})

test('loginShellArgs：zsh/bash/fish 登录参数，其余无参数', () => {
  assert.deepEqual(loginShellArgs('/bin/zsh'), ['-l'])
  assert.deepEqual(loginShellArgs('/usr/local/bin/bash'), ['-l'])
  assert.deepEqual(loginShellArgs('/opt/homebrew/bin/fish'), ['-l'])
  assert.deepEqual(loginShellArgs('/bin/sh'), [])
  assert.deepEqual(loginShellArgs('/usr/bin/python3'), [])
})

// ── 集成：fake ctx + 临时 HTTP 服务器 + 真 PTY/WS ──────────────────────
/** 把插件宿主半挂到一个最小 node:http 服务器（exact 路由 + upgrade）。 */
async function bootWorkbenchServer() {
  const exact = new Map()
  const upgrades = new Map()
  const disposers = []
  const ctx = {
    webServer: {
      register(route) {
        assert.equal(route.kind, 'exact')
        exact.set(route.path, route.handler)
        return () => exact.delete(route.path)
      },
      registerUpgrade(route) {
        upgrades.set(route.path, route.handler)
        return () => upgrades.delete(route.path)
      },
    },
    effect(fn) {
      const disposer = fn()
      if (typeof disposer === 'function') disposers.push(disposer)
    },
    // 软依赖服务（apiProxy/agents/commands 等）：缺失 → 任务看板优雅禁用（设计行为）。
    get() { return undefined },
  }
  apply(ctx)
  const server = createServer((req, res) => {
    const pathname = new URL(req.url, 'http://x').pathname
    const handler = exact.get(pathname)
    if (handler === undefined) {
      res.writeHead(404)
      res.end()
      return
    }
    void Promise.resolve(handler(req, res)).catch(() => { if (!res.headersSent) res.writeHead(500); res.end() })
  })
  server.on('upgrade', (req, socket, head) => {
    const handler = upgrades.get(new URL(req.url, 'http://x').pathname)
    if (handler === undefined) { socket.destroy(); return }
    void Promise.resolve(handler(req, socket, head)).catch(() => socket.destroy())
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const port = server.address().port
  return {
    port,
    origin: `http://127.0.0.1:${port}`,
    async dispose() {
      for (const disposer of disposers.splice(0).reverse()) disposer()
      await new Promise((resolve) => server.close(resolve))
    },
  }
}

const postJson = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  return response.json()
}

/** 收集一个 WebSocket 的终端帧；返回受控的 promise 工具。 */
function collectFrames(ws) {
  const frames = []
  const waiters = []
  ws.on('message', (raw) => {
    let frame
    try { frame = JSON.parse(raw.toString()) } catch { return }
    frames.push(frame)
    for (const waiter of waiters.splice(0)) waiter()
  })
  return {
    frames,
    output() { return frames.filter((f) => f.t === 'o').map((f) => f.d).join('') },
    async waitFor(predicate, timeoutMs = 8000) {
      const deadline = Date.now() + timeoutMs
      while (Date.now() < deadline) {
        if (frames.some(predicate)) return frames.find(predicate)
        await new Promise((resolve) => {
          const timer = setTimeout(resolve, 250)
          waiters.push(() => { clearTimeout(timer); resolve() })
        })
      }
      assert.fail(`等待帧超时：${predicate}`)
    },
  }
}

test('集成：创建 → 收发 → 回放 → resize → kill → 退出帧', async () => {
  const bench = await bootWorkbenchServer()
  const marker = `DWB_TERM_${Date.now().toString(36)}`
  try {
    // 1) 创建会话。
    const created = await postJson(`${bench.origin}/workbench/terminal/create`, {
      cwd: tmpdir(), cols: 80, rows: 24,
    })
    assert.equal(created.ok, true, JSON.stringify(created))
    assert.equal(typeof created.id, 'string')
    assert.equal(created.running, true)
    assert.equal(created.cwd, tmpdir())

    // cwd 非法 → 拒绝。
    const bad = await postJson(`${bench.origin}/workbench/terminal/create`, { cwd: '/no/such/dir-xyz' })
    assert.equal(bad.ok, false)

    // 2) 第一个 WS：发命令、等输出。
    const ws1 = new WebSocket(`${bench.origin.replace('http', 'ws')}/workbench/terminal/ws?id=${created.id}`, {
      headers: { Origin: bench.origin },
    })
    const c1 = collectFrames(ws1)
    await new Promise((resolve, reject) => { ws1.on('open', resolve); ws1.on('error', reject) })
    ws1.send(JSON.stringify({ t: 'i', d: `echo ${marker}\r` }))
    await c1.waitFor((f) => f.t === 'o' && f.d.includes(marker))

    // 3) 第二个 WS：环形缓冲回放（同一会话多订阅/重连路径）。
    const ws2 = new WebSocket(`${bench.origin.replace('http', 'ws')}/workbench/terminal/ws?id=${created.id}`, {
      headers: { Origin: bench.origin },
    })
    const c2 = collectFrames(ws2)
    await new Promise((resolve, reject) => { ws2.on('open', resolve); ws2.on('error', reject) })
    await c2.waitFor((f) => f.t === 'o' && f.d.includes(marker))

    // 4) resize 同步到会话事实。
    ws1.send(JSON.stringify({ t: 'r', cols: 100, rows: 30 }))
    let resized = false
    for (let i = 0; i < 40 && !resized; i += 1) {
      const list = await (await fetch(`${bench.origin}/workbench/terminal/list`)).json()
      const session = list.sessions.find((s) => s.id === created.id)
      resized = session !== undefined && session.cols === 100 && session.rows === 30
      if (!resized) await new Promise((resolve) => setTimeout(resolve, 100))
    }
    assert.ok(resized, 'resize 未同步到会话')

    // 5) kill → 双端收到退出帧，list 标记非 running。
    const killed = await postJson(`${bench.origin}/workbench/terminal/kill`, { id: created.id })
    assert.equal(killed.ok, true)
    await c1.waitFor((f) => f.t === 'exit')
    await c2.waitFor((f) => f.t === 'exit')
    const after = await (await fetch(`${bench.origin}/workbench/terminal/list`)).json()
    const dead = after.sessions.find((s) => s.id === created.id)
    assert.ok(dead === undefined || dead.running === false, '会话应已退出')

    ws1.close()
    ws2.close()
  } finally {
    await bench.dispose()
  }
})

test('集成：异源 Origin 拒绝 + 未知会话 404', async () => {
  const bench = await bootWorkbenchServer()
  try {
    // 异源 Origin：握手被拒（403），ws 收到 unexpected response。
    const forbidden = new WebSocket(`${bench.origin.replace('http', 'ws')}/workbench/terminal/ws?id=whatever`, {
      headers: { Origin: 'http://evil.example' },
    })
    const forbiddenError = await new Promise((resolve) => {
      forbidden.on('error', resolve)
      forbidden.on('open', () => resolve(null))
      setTimeout(() => resolve(new Error('timeout')), 4000)
    })
    assert.ok(forbiddenError !== null && forbiddenError instanceof Error, '异源握手应失败')

    // 未知会话 id：404 拒绝。
    const missing = new WebSocket(`${bench.origin.replace('http', 'ws')}/workbench/terminal/ws?id=0000000000000000`, {
      headers: { Origin: bench.origin },
    })
    const missingError = await new Promise((resolve) => {
      missing.on('error', resolve)
      missing.on('open', () => resolve(null))
      setTimeout(() => resolve(new Error('timeout')), 4000)
    })
    assert.ok(missingError !== null && missingError instanceof Error, '未知会话应拒绝')
  } finally {
    await bench.dispose()
  }
})
