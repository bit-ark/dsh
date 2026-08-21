/**
 * dsh-work — 终端路由模块（宿主半）。
 *
 * 注册 /workbench/terminal/{create,list,kill,ws}：node-pty 会话创建、
 * 存活列表、主动回收，以及每会话一条的 WebSocket 双向流。终端管理器与
 * WebSocketServer 在本模块内创建/销毁，随插件卸载一并释放全部 PTY。
 */
import { WebSocketServer } from 'ws'
import { createTerminalManager } from '../terminal.js'
import { readJsonBody, validatedCwd } from '../validate.js'
import { sendJson, isJsonRequest, errorMessage } from './shared.js'

/** 单条 WS 消息最大字节数（输入/二进制都受此限，防单帧撑爆内存）。 */
const TERMINAL_INPUT_MAX = 64 * 1024

/**
 * 注册全部终端路由。
 *
 * @param {object} ctx 插件上下文（webServer 挂载点）
 * @returns {() => void} 卸载函数（注销路由 + 关闭 WS 服务 + 回收全部 PTY）
 */
export function registerTerminalRoutes(ctx) {
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
      if (!isJsonRequest(req)) {
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
        sendJson(res, 200, { ok: false, error: errorMessage(error) })
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
      if (!isJsonRequest(req)) {
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
  return () => {
    offTermCreate()
    offTermList()
    offTermKill()
    offTermWs()
    terminal.dispose()
    try { terminalWss.close() } catch { /* no open sockets */ }
  }
}
