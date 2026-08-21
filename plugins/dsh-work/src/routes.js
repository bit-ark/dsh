/**
 * dsh-work — /workbench/* 路由注册（宿主半）。
 */
import { createReadStream, statSync } from 'node:fs'
// ws 的 ESM 入口（wrapper.mjs）只暴露命名导出；WebSocketServer 不在默认导出上。
import { WebSocketServer } from 'ws'
import { failureReason, initRepo, addIgnore, removeIgnore, runGit, inspect, unstagePath } from './git.js'
import { contentTypeFor, filePreview, listDir, openInEditor, validatedWriteContent, writeFileAtomic } from './files.js'
import { readJsonBody, readWriteJsonBody, validatedCwd, validatedFilePath, validatedFilePathValue, validatedMessage, validatedRelPath } from './validate.js'
import { proxyBrowser } from './browser.js'
import { createTerminalManager } from './terminal.js'

export function registerRoutes(ctx) {
  const sendJson = (res, code, payload) => {
    res.writeHead(code, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    })
    res.end(JSON.stringify(payload))
  }
  const sendHtml = (res, code, html) => {
    res.writeHead(code, {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'referrer-policy': 'no-referrer',
    })
    res.end(html)
  }
  const escapeHtml = (text) => String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')

  const mutation = (mutate, showIgnoredAfter = false) => async (req, res) => {
    if (req.method !== 'POST') {
      sendJson(res, 405, { ok: false, error: 'method not allowed' })
      return
    }
    const mediaType = (req.headers['content-type'] ?? '').split(';', 1)[0]?.trim().toLowerCase()
    if (mediaType !== 'application/json') {
      sendJson(res, 415, { ok: false, error: 'content type must be application/json' })
      return
    }
    const url = new URL(req.url ?? '/', 'http://localhost')
    const validated = validatedCwd(url.searchParams)
    if (validated.error !== undefined) {
      sendJson(res, validated.error === 'not a directory' ? 200 : 400, { ok: false, cwd: validated.cwd, error: validated.error })
      return
    }
    const body = await readJsonBody(req)
    const prepared = mutate(body)
    if (prepared.error !== undefined) {
      sendJson(res, 200, { ok: false, cwd: validated.cwd, error: prepared.error })
      return
    }
    try {
      if (prepared.direct !== undefined) {
        const outcome = await prepared.direct(validated.cwd)
        if (outcome.ok !== true) {
          sendJson(res, 200, { ok: false, cwd: validated.cwd, error: outcome.error ?? 'git 操作失败' })
          return
        }
      } else {
        const result = await runGit(validated.cwd, prepared.args)
        if (!result.ok) {
          sendJson(res, 200, { ok: false, cwd: validated.cwd, error: failureReason(result, prepared.fallback ?? 'git 操作失败') })
          return
        }
      }
      sendJson(res, 200, await inspect(validated.cwd, showIgnoredAfter))
    } catch (error) {
      sendJson(res, 200, { ok: false, cwd: validated.cwd, error: error instanceof Error ? error.message : String(error) })
    }
  }

  ctx.effect(() => {
    const offDir = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/dir',
      handler: async (req, res) => {
        if (req.method !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const url = new URL(req.url ?? '/', 'http://localhost')
        const params = new URLSearchParams()
        params.set('cwd', url.searchParams.get('path') ?? '')
        const validated = validatedCwd(params)
        if (validated.error !== undefined) {
          sendJson(res, validated.error === 'not a directory' ? 200 : 400, { ok: false, path: validated.cwd, error: validated.error })
          return
        }
        sendJson(res, 200, listDir(validated.cwd))
      },
    })
    const offFile = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/file',
      handler: async (req, res) => {
        if (req.method !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const url = new URL(req.url ?? '/', 'http://localhost')
        const validated = validatedFilePath(url.searchParams)
        if (validated.error !== undefined) {
          sendJson(res, validated.error === 'not a file' ? 200 : 400, { ok: false, path: validated.path, error: validated.error })
          return
        }
        try {
          sendJson(res, 200, await filePreview(validated.path, url.searchParams.get('full') === '1'))
        } catch (error) {
          sendJson(res, 200, { ok: false, path: validated.path, error: error instanceof Error ? error.message : String(error) })
        }
      },
    })
    const offWrite = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/write',
      handler: async (req, res) => {
        if (req.method !== 'POST') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const mediaType = (req.headers['content-type'] ?? '').split(';', 1)[0]?.trim().toLowerCase()
        if (mediaType !== 'application/json') {
          sendJson(res, 415, { ok: false, error: 'content type must be application/json' })
          return
        }
        const body = await readWriteJsonBody(req)
        if (body === null) {
          sendJson(res, 200, { ok: false, path: null, error: '内容超过 1MB 上限' })
          return
        }
        const validated = validatedFilePathValue(body?.path)
        if (validated.error !== undefined) {
          sendJson(res, validated.error === 'not a file' ? 200 : 400, { ok: false, path: validated.path, error: validated.error })
          return
        }
        if (validated.path.split('/').some((segment) => segment === '..')) {
          sendJson(res, 200, { ok: false, path: validated.path, error: 'invalid path' })
          return
        }
        const checked = validatedWriteContent(body?.content)
        if (checked.error !== undefined) {
          sendJson(res, 200, { ok: false, path: validated.path, error: checked.error })
          return
        }
        try {
          sendJson(res, 200, await writeFileAtomic(validated.path, checked.content))
        } catch (error) {
          sendJson(res, 200, { ok: false, path: validated.path, error: error instanceof Error ? error.message : String(error) })
        }
      },
    })
    const offOpen = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/open',
      handler: async (req, res) => {
        if (req.method !== 'POST') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const mediaType = (req.headers['content-type'] ?? '').split(';', 1)[0]?.trim().toLowerCase()
        if (mediaType !== 'application/json') {
          sendJson(res, 415, { ok: false, error: 'content type must be application/json' })
          return
        }
        const body = await readJsonBody(req)
        const validated = validatedFilePathValue(body?.path)
        if (validated.error !== undefined) {
          sendJson(res, validated.error === 'not a file' ? 200 : 400, { ok: false, path: validated.path, error: validated.error })
          return
        }
        if (validated.path.split('/').some((segment) => segment === '..')) {
          sendJson(res, 200, { ok: false, path: validated.path, error: 'invalid path' })
          return
        }
        try {
          sendJson(res, 200, await openInEditor(validated.path))
        } catch (error) {
          sendJson(res, 200, { ok: false, path: validated.path, error: error instanceof Error ? error.message : String(error) })
        }
      },
    })
    const offAsset = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/asset',
      handler: async (req, res) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const url = new URL(req.url ?? '/', 'http://localhost')
        const validated = validatedFilePath(url.searchParams)
        if (validated.error !== undefined) {
          sendJson(res, validated.error === 'not a file' ? 200 : 400, { ok: false, path: validated.path, error: validated.error })
          return
        }
        let stat
        try {
          stat = statSync(validated.path)
        } catch (error) {
          sendJson(res, 200, { ok: false, path: validated.path, error: `无法读取文件：${error instanceof Error ? error.message : String(error)}` })
          return
        }
        const contentType = contentTypeFor(validated.path)
        const range = req.headers.range
        const match = typeof range === 'string' ? /^bytes=(\d*)-(\d*)$/.exec(range.trim()) : null
        if (match !== null && (match[1] !== '' || match[2] !== '')) {
          const start = match[1] === '' ? Math.max(0, stat.size - Number(match[2])) : Number(match[1])
          const end = match[2] === '' || Number(match[2]) >= stat.size ? stat.size - 1 : Number(match[2])
          if (start <= end && start < stat.size) {
            res.writeHead(206, {
              'content-type': contentType,
              'content-length': String(end - start + 1),
              'content-range': `bytes ${start}-${end}/${stat.size}`,
              'accept-ranges': 'bytes',
              'cache-control': 'no-store',
            })
            if (req.method === 'HEAD') { res.end(); return }
            const rangeStream = createReadStream(validated.path, { start, end })
            // 客户端中止（视频拖动换 range 很常见）：裸 pipe 不会连带销毁源流，
            // 不回收会把剩余文件读完，泄漏 FD 与磁盘带宽。正常结束时 destroy
            // 已完成的流是 no-op。
            req.on('close', () => rangeStream.destroy())
            rangeStream
              .on('error', () => { res.destroy() })
              .pipe(res)
            return
          }
          res.writeHead(416, {
            'content-range': `bytes */${stat.size}`,
            'content-type': 'application/json; charset=utf-8',
          })
          res.end(JSON.stringify({ ok: false, error: 'range not satisfiable' }))
          return
        }
        res.writeHead(200, {
          'content-type': contentType,
          'content-length': String(stat.size),
          'accept-ranges': 'bytes',
          'cache-control': 'no-store',
        })
        if (req.method === 'HEAD') { res.end(); return }
        const fullStream = createReadStream(validated.path)
        // 同 206 分支：客户端中止时回收源读流。
        req.on('close', () => fullStream.destroy())
        fullStream
          .on('error', () => { res.destroy() })
          .pipe(res)
      },
    })
    // 浏览器沙箱代理（旧方案：抓取 + 重写 + iframe，供 fallback 或对比用）
    const offBrowser = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/browser',
      handler: async (req, res) => {
        if (req.method !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const url = new URL(req.url ?? '/', 'http://localhost')
        const target = url.searchParams.get('url')
        if (typeof target !== 'string' || target.length === 0) {
          sendHtml(res, 400, `<!doctype html><html><body><p>缺少 url 参数</p></body></html>`)
          return
        }
        if (!/^https?:\/\//i.test(target)) {
          sendHtml(res, 400, `<!doctype html><html><body><p>仅支持 http/https 协议</p></body></html>`)
          return
        }
        const result = await proxyBrowser(target)
        if (!result.ok) {
          sendHtml(res, 200, `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:sans-serif;padding:24px;color:#666}</style></head><body><p>无法加载页面：${escapeHtml(result.error)}</p></body></html>`)
          return
        }
        sendHtml(res, 200, result.html)
      },
    })
    // 浏览器嵌入探测：检测目标站点是否拒绝被 iframe 嵌入
    const offBrowserProbe = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/browser-probe',
      handler: async (req, res) => {
        if (req.method !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const url = new URL(req.url ?? '/', 'http://localhost')
        const target = url.searchParams.get('url')
        if (typeof target !== 'string' || target.length === 0 || !/^https?:\/\//i.test(target)) {
          sendJson(res, 400, { ok: false, error: '无效的 URL' })
          return
        }
        try {
          const ctrl = new AbortController()
          const timer = setTimeout(() => ctrl.abort(), 8000)
          const response = await fetch(target, {
            method: 'HEAD',
            signal: ctrl.signal,
            redirect: 'follow',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            },
          })
          clearTimeout(timer)
          const xfo = response.headers.get('x-frame-options')
          const csp = response.headers.get('content-security-policy')
          let frameAncestors
          if (csp) {
            for (const directive of csp.split(';')) {
              const parts = directive.trim().split(/\s+/)
              if (parts[0] === 'frame-ancestors') {
                const sources = parts.slice(1).filter((s) => s !== '')
                if (sources.length > 0) frameAncestors = sources
                break
              }
            }
          }
          sendJson(res, 200, {
            reachable: true,
            status: response.status,
            url: response.url,
            xFrameOptions: xfo || undefined,
            frameAncestors,
          })
        } catch {
          sendJson(res, 200, { reachable: false })
        }
      },
    })
    // ── 终端：PTY 会话（node-pty）+ WebSocket 双向流 ──────────────────────
    // 生命周期：管理器与 WS 服务随本 effect 创建/销毁；宿主半卸载即杀全部会话。
    const terminal = createTerminalManager()
    const terminalWss = new WebSocketServer({ noServer: true })
    const offTermCreate = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/terminal/create',
      handler: async (req, res) => {
        if (req.method !== 'POST') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const mediaType = (req.headers['content-type'] ?? '').split(';', 1)[0]?.trim().toLowerCase()
        if (mediaType !== 'application/json') {
          sendJson(res, 415, { ok: false, error: 'content type must be application/json' })
          return
        }
        const body = await readJsonBody(req)
        const validated = validatedCwd(new URLSearchParams({ cwd: typeof body?.cwd === 'string' ? body.cwd : '' }))
        if (validated.error !== undefined) {
          sendJson(res, validated.error === 'not a directory' ? 200 : 400, { ok: false, cwd: validated.cwd, error: validated.error })
          return
        }
        try {
          sendJson(res, 200, { ok: true, ...(await terminal.create({ cwd: validated.cwd, cols: body?.cols, rows: body?.rows })) })
        } catch (error) {
          sendJson(res, 200, { ok: false, error: error instanceof Error ? error.message : String(error) })
        }
      },
    })
    const offTermList = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/terminal/list',
      handler: async (req, res) => {
        if (req.method !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        sendJson(res, 200, { ok: true, sessions: terminal.list() })
      },
    })
    const offTermKill = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/terminal/kill',
      handler: async (req, res) => {
        if (req.method !== 'POST') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const mediaType = (req.headers['content-type'] ?? '').split(';', 1)[0]?.trim().toLowerCase()
        if (mediaType !== 'application/json') {
          sendJson(res, 415, { ok: false, error: 'content type must be application/json' })
          return
        }
        const body = await readJsonBody(req)
        terminal.kill(typeof body?.id === 'string' ? body.id : '')
        sendJson(res, 200, { ok: true })
      },
    })
    // 每会话一条 WebSocket：客户端 → {t:'i',d} 输入 / {t:'r',cols,rows} 缩放；
    // 服务端 → {t:'o',d} 输出 / {t:'exit',code,signal} 退出。attach 时回放环形缓冲。
    const TERMINAL_INPUT_MAX = 64 * 1024
    const offTermWs = ctx.webServer.registerUpgrade({
      path: '/workbench/terminal/ws',
      handler: (req, socket, head) => {
        // Origin 围栏：拒绝异源页面发起的跨站 WebSocket（本 GUI 与路由同源）。
        const origin = req.headers.origin
        if (typeof origin === 'string' && origin !== '') {
          const host = req.headers.host
          if (origin !== `http://${host}` && origin !== `https://${host}`) {
            socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n')
            socket.destroy()
            return
          }
        }
        const url = new URL(req.url ?? '/', 'http://localhost')
        const session = terminal.get(url.searchParams.get('id'))
        if (session === undefined) {
          socket.write('HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n')
          socket.destroy()
          return
        }
        terminalWss.handleUpgrade(req, socket, head, (ws) => {
          const detach = terminal.attach(session, ws)
          ws.on('message', (raw) => {
            let message
            try { message = JSON.parse(raw.toString()) } catch { return }
            if (message === null || typeof message !== 'object') return
            if (message.t === 'i' && typeof message.d === 'string' && message.d.length <= TERMINAL_INPUT_MAX) {
              terminal.write(session.id, message.d)
            } else if (message.t === 'b' && typeof message.d === 'string' && message.d.length <= TERMINAL_INPUT_MAX) {
              try { terminal.write(session.id, Buffer.from(message.d, 'base64').toString('latin1')) } catch { /* 非法 base64 */ }
            } else if (message.t === 'r' && typeof message.cols === 'number' && typeof message.rows === 'number') {
              terminal.resize(session.id, message.cols, message.rows)
            }
          })
          ws.on('close', () => { detach() })
          ws.on('error', () => { try { ws.terminate() } catch { /* already closed */ } })
        })
      },
    })
    const offGit = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git',
      handler: async (req, res) => {
        if (req.method !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const url = new URL(req.url ?? '/', 'http://localhost')
        const validated = validatedCwd(url.searchParams)
        if (validated.error !== undefined) {
          sendJson(res, validated.error === 'not a directory' ? 200 : 400, { ok: false, cwd: validated.cwd, error: validated.error })
          return
        }
        try {
          sendJson(res, 200, await inspect(validated.cwd, url.searchParams.get('ignored') === '1'))
        } catch (error) {
          sendJson(res, 200, { ok: false, cwd: validated.cwd, error: error instanceof Error ? error.message : String(error) })
        }
      },
    })
    const offInit = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/init',
      handler: mutation(() => ({ direct: (cwd) => initRepo(cwd) })),
    })
    const offStage = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/stage',
      handler: mutation((body) => {
        const path = validatedRelPath(body)
        if (path.error !== undefined) return { error: path.error }
        return { args: ['add', '--', path.path], fallback: 'git add 失败' }
      }),
    })
    const offUnstage = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/unstage',
      handler: mutation((body) => {
        const path = validatedRelPath(body)
        if (path.error !== undefined) return { error: path.error }
        // 无提交的新仓库没有 HEAD，`restore --staged` 会 fatal；
        // unstagePath 内部回退 `rm --cached`（见 git.js）。
        return { direct: (cwd) => unstagePath(cwd, path.path) }
      }),
    })
    const offStageAll = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/stage-all',
      handler: mutation(() => ({ args: ['add', '-A'], fallback: '全部暂存失败' })),
    })
    const offCommit = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/commit',
      handler: mutation((body) => {
        const message = validatedMessage(body)
        if (message.error !== undefined) return { error: message.error }
        return { args: ['commit', '-m', message.message], fallback: '提交失败' }
      }),
    })
    const offIgnore = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/ignore',
      handler: mutation((body) => {
        const path = validatedRelPath(body)
        if (path.error !== undefined) return { error: path.error }
        return { direct: (cwd) => addIgnore(cwd, path.path) }
      }, true),
    })
    const offUnignore = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/unignore',
      handler: mutation((body) => {
        const path = validatedRelPath(body)
        if (path.error !== undefined) return { error: path.error }
        return { direct: (cwd) => removeIgnore(cwd, path.path) }
      }, true),
    })
    return () => {
      offDir()
      offFile()
      offWrite()
      offOpen()
      offAsset()
      offBrowser()
      offBrowserProbe()
      offTermCreate()
      offTermList()
      offTermKill()
      offTermWs()
      terminal.dispose()
      try { terminalWss.close() } catch { /* no open sockets */ }
      offGit()
      offInit()
      offStage()
      offUnstage()
      offStageAll()
      offCommit()
      offIgnore()
      offUnignore()
    }
  }, 'dsh-work: routes')
}
