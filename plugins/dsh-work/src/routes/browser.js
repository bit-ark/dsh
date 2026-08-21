/**
 * dsh-work — 浏览器路由模块（宿主半）。
 *
 * 注册 /workbench/browser（抓取 + 重写 + iframe 的沙箱代理兜底）与
 * /workbench/browser-probe（HEAD 探测目标站点的 X-Frame-Options /
 * CSP frame-ancestors，供面板判断能否被 iframe 嵌入）。
 */
import { proxyBrowser } from '../browser.js'
import { sendJson, sendHtml, escapeHtml } from './shared.js'

/**
 * 注册全部浏览器路由。
 *
 * @param {object} ctx 插件上下文（webServer 挂载点）
 * @returns {(() => void)[]} 卸载函数数组（由装配层统一调用）
 */
export function registerBrowserRoutes(ctx) {
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
  return [offBrowser, offBrowserProbe]
}
