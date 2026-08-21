/**
 * dsh-work — 浏览器沙箱：URL 抓取 + HTML 链接重写（宿主半）。
 *
 * 设计：
 *   - 仅抓取 text/html 页面，非 HTML（图片/PDF/纯文本等）拒绝并提示；
 *   - 抓取后注入 <base href> 让资源（CSS/JS/图片）从源站直链加载，同时把所有
 *     <a href> 重写回本代理，保持导航受控；
 *   - 沙箱 iframe 以 sandbox="allow-scripts allow-forms allow-popups" 渲染
 *     （无 allow-same-origin，脚本跑在不透明源里，碰不到面板或父页面）；
 *   - SSRF：本插件与工作台其他路由同为本地可信环境部署（见 README 部署警告），
 *     不做私有 IP 拦截；若日后部署到半信任环境，可在此加域名白名单。
 */
import { lookup } from 'node:dns/promises'

/** 单页面抓取上限：5 MB。 */
const MAX_HTML_BYTES = 5 * 1024 * 1024
/** 单次抓取超时：15 s。 */
const FETCH_TIMEOUT_MS = 15_000
/** 接受的内容类型白名单（抓取阶段仅放行 HTML）。 */
const ACCEPT_HEADER = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'

/** 从 HTML 中提取 <base href="...">，返回绝对 URL 或 null。 */
function extractBaseHref(html, fallbackUrl) {
  const match = html.match(/<base\b[^>]*\bhref\s*=\s*(["'])([^"']*)\1/i)
  if (!match) return null
  try { return new URL(match[2], fallbackUrl).href } catch { return null }
}

/**
 * 计算目标 URL 的目录级 base href。
 * 例：http://example.com/path/page.html → http://example.com/path/
 *     http://example.com/page.html     → http://example.com/
 * 用于注入 <base> 标签，让资源相对路径从源站目录解析。
 */
function directoryBaseOf(targetUrl) {
  try {
    const url = new URL(targetUrl)
    const lastSlash = url.pathname.lastIndexOf('/')
    url.pathname = (lastSlash >= 0 ? url.pathname.slice(0, lastSlash + 1) : '/')
    return url.href
  } catch {
    return targetUrl
  }
}

/**
 * 抓取并改写 HTML：
 *   1. 注入/保留 <base href>（资源从源站加载）；
 *   2. 所有 <a href> 重写回本代理（导航受控）；
 *   3. 移除 target 属性（链接在沙箱 iframe 内打开，不弹新标签）。
 *
 * @param {string} html 原始 HTML
 * @param {string} targetUrl 抓取完成后的最终 URL（跟随重定向后的 response.url）
 * @returns {string} 改写后的 HTML
 */
function rewriteHtml(html, targetUrl) {
  const baseHref = extractBaseHref(html, targetUrl) || directoryBaseOf(targetUrl)
  let result = html

  // 注入 <base> 标签到 <head> 最前面（必须在任何相对 URL 之前生效）。
  const escapedBase = baseHref.replace(/"/g, '&quot;')
  if (/<head\b/i.test(result)) {
    result = result.replace(/<head\b([^>]*)>/i, `<head$1><base href="${escapedBase}">`)
  } else if (/<html\b/i.test(result)) {
    result = result.replace(/<html\b([^>]*)>/i, `<html$1><head><base href="${escapedBase}"></head>`)
  } else {
    result = `<head><base href="${escapedBase}"></head>` + result
  }

  // 注入 Eruda 调试面板（CDN 加载，沙箱 iframe 内运行）。
  // 面板覆盖 Console / Elements / Network / Resources / Sources / Info，
  // 与 Chrome DevTools 体验接近；所有操作在 iframe 内，不触碰父页面。
  const erudaScript = [
    '<script src="https://cdn.jsdelivr.net/npm/eruda@3/eruda.min.js"></script>',
    '<script>',
    'if (typeof eruda !== "undefined") {',
    '  eruda.init({ useShadowDOM: true });',
    '  eruda.show();',
    '}',
    '</script>',
  ].join('')
  if (/<head\b/i.test(result)) {
    result = result.replace(/<head\b([^>]*)>/i, `<head$1>${erudaScript}`)
  }

  // 重写 <a href="..."> → 代理 URL；同时移除 target 属性。
  result = result.replace(/<a\b([^>]*)>/gi, (match, attrs) => {
    // 改写 href。
    const withHref = attrs.replace(/\bhref\s*=\s*(["'])([^"']*)\1/i, (hrefMatch, quote, value) => {
      // javascript: / data: / mailto: / tel: / about: / blob: → 作废。
      if (/^(?:javascript|data|mailto|tel|about|blob):/i.test(value)) return 'href="#"'
      // 纯片段（#anchor）→ 保持原样（在 base 上下文中解析）。
      if (value.startsWith('#')) return hrefMatch
      // 解析为绝对 URL。
      let absolute
      try { absolute = new URL(value, baseHref).href } catch { return hrefMatch }
      // 仅代理 http(s)。
      if (!/^https?:/i.test(absolute)) return hrefMatch
      return `href=${quote}/workbench/browser?url=${encodeURIComponent(absolute)}${quote}`
    })
    // 移除 target（含 target="_blank"），强制在沙箱 iframe 内打开。
    const cleaned = withHref.replace(/\btarget\s*=\s*(["'])[^"']*\1/i, '')
    return `<a${cleaned}>`
  })

  return result
}

/**
 * 抓取一个 URL 并返回改写后的 HTML。
 *
 * @param {string} targetUrl 目标 URL（已由调用方校验为 http/https 绝对 URL）
 * @returns {Promise<{ok: true, html: string}|{ok: false, error: string}>}
 */
export async function proxyBrowser(targetUrl) {
  // 1. 协议校验（调用方已做，这里兜底）。
  let parsed
  try {
    parsed = new URL(targetUrl)
  } catch {
    return { ok: false, error: '无效的 URL' }
  }
  if (!/^https?:$/.test(parsed.protocol)) {
    return { ok: false, error: '仅支持 http/https 协议' }
  }

  // 2. 抓取（跟随重定向、带超时）。
  let response
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    response = await fetch(targetUrl, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DSH-Workbench-Browser/1.0)',
        'Accept': ACCEPT_HEADER,
      },
    })
    clearTimeout(timer)
  } catch (error) {
    const reason = error.name === 'AbortError' ? '抓取超时（15 秒）' : `抓取失败：${error.message}`
    return { ok: false, error: reason }
  }

  // 3. 仅处理 text/html。
  const contentType = (response.headers.get('content-type') || '').split(';', 1)[0]?.trim().toLowerCase()
  if (contentType !== 'text/html' && contentType !== 'application/xhtml+xml' && contentType !== 'application/xml') {
    return {
      ok: false,
      error: `不支持的内容类型：${contentType || 'unknown'}（仅支持 HTML 页面，图片/PDF/纯文本等请使用「目录」预览）`,
    }
  }

  // 4. 按字节上限读取响应体（流式读取，避免大文件撑爆内存）。
  const reader = response.body?.getReader()
  if (!reader) {
    return { ok: false, error: '抓取失败：无法读取响应体' }
  }
  const chunks = []
  let totalSize = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      totalSize += value.length
      if (totalSize > MAX_HTML_BYTES) {
        await reader.cancel()
        return { ok: false, error: `页面超过 ${Math.round(MAX_HTML_BYTES / 1024 / 1024)}MB 上限` }
      }
      chunks.push(value)
    }
  } catch (error) {
    return { ok: false, error: `抓取失败：${error.message}` }
  }
  const raw = Buffer.concat(chunks).toString('utf8')

  // 5. 改写 HTML（response.url 是跟随重定向后的最终 URL）。
  const finalUrl = response.url || targetUrl
  const html = rewriteHtml(raw, finalUrl)

  return { ok: true, html }
}
