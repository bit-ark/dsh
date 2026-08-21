/**
 * dsh-work — Playwright 浏览器沙箱：真实渲染 + 截图流 + 坐标交互。
 *
 * 与旧版「fetch HTML → rewrite → iframe」方案的根本区别：
 *   - 这里启动一个真实的 Chromium（headless），页面在其中完整渲染（含 SPA 的
 *     JS 执行 / API 请求），前端只拿截图显示、把坐标/键盘事件传回后端执行；
 *   - SPA 不再有跨域 / 不透明源问题，因为页面跑在 Playwright 提供的真实浏览
 *     器上下文里，origin 是目标站点自身；
 *   - 脚本注入（Eruda 等）也不再需要——可以直接用 Playwright 的 evaluate 探测。
 *
 * 生命周期：
 *   - ensureBrowser() 懒启动，整个宿主进程只启动一次；
 *   - navigate() 复用同一个 Page（每次导航关闭旧 context 再开新 context，
 *     保证 Cookie / storage 隔离——类似无痕页）；
 *   - 宿主卸载时调用 closeBrowser() 释放 Chromium 进程。
 */

/** 视口宽度（px）。 */
const VIEWPORT_WIDTH = 1280
/** 视口高度（px）。 */
const VIEWPORT_HEIGHT = 800
/** 单次截图超时（ms）。 */
const SCREENSHOT_TIMEOUT = 15_000
/** 导航超时（ms）：SPA 的 API 请求链可能较长。 */
const NAVIGATE_TIMEOUT = 30_000
/** 截图质量（JPEG 0-100）：平衡画质与带宽。 */
const JPEG_QUALITY = 70

// ── 内部状态 ────────────────────────────────────────────────────────────────
let _browserPromise = null
let _page = null
let _currentUrl = null

/**
 * 懒启动 Chromium。首次调用 import('playwright') 可能较重，
 * 包在 try/catch 里让调用方可区分"playwright 未安装"和"浏览器启动失败"。
 */
async function ensureBrowser() {
  if (_browserPromise !== null) return _browserPromise
  _browserPromise = (async () => {
    try {
      const { chromium } = await import('playwright')
      return chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
      })
    } catch (error) {
      // 启动失败：清空 promise 让下次调用可重试。
      _browserPromise = null
      throw error
    }
  })()
  return _browserPromise
}

/**
 * 关闭浏览器进程（宿主卸载时调用）。
 */
export async function closeBrowser() {
  if (_browserPromise !== null) {
    try {
      const browser = await _browserPromise
      await browser.close()
    } catch {
      // 静默——卸载时进程可能已死。
    }
    _browserPromise = null
  }
  _page = null
  _currentUrl = null
}

/**
 * 导航到指定 URL，等待页面渲染完成。
 *
 * @param {string} targetUrl 目标 http/https URL
 * @returns {Promise<{ok: true, title: string, url: string}|{ok: false, error: string}>}
 */
export async function navigate(targetUrl) {
  let browser
  try {
    browser = await ensureBrowser()
  } catch (error) {
    return {
      ok: false,
      error: `Playwright 启动失败：${error instanceof Error ? error.message : String(error)}`,
    }
  }

  // 关闭旧页面 + context（隔离 Cookie/storage）。
  if (_page !== null) {
    try { await _page.context().close() } catch { /* ignore */ }
    _page = null
  }

  try {
    const context = await browser.newContext({
      viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()

    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: NAVIGATE_TIMEOUT,
    })

    // 等待网络空闲 + 额外一拍，让 SPA 的异步渲染有时间完成。
    try {
      await page.waitForLoadState('networkidle', { timeout: 10_000 })
    } catch {
      // 长轮询站点不会 networkidle——忽略超时，用下面的固定等待兜底。
    }
    // 固定等待：给最后一批 microtask / 动画帧留出时间。
    await page.waitForTimeout(800)

    const title = await page.title()
    const finalUrl = page.url()
    _page = page
    _currentUrl = finalUrl

    // 页面关闭（用户点了链接导致 context 被回收）时清理引用。
    page.on('close', () => {
      if (_page === page) {
        _page = null
        _currentUrl = null
      }
    })

    return { ok: true, title, url: finalUrl }
  } catch (error) {
    return {
      ok: false,
      error: `导航失败：${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * 截图当前页面。必须在 navigate() 成功之后调用。
 *
 * @returns {Promise<{ok: true, data: Buffer, width: number, height: number}|{ok: false, error: string}>}
 */
export async function screenshot() {
  if (_page === null) {
    return { ok: false, error: '页面尚未加载，请先导航到 URL' }
  }
  try {
    const data = await _page.screenshot({
      type: 'jpeg',
      quality: JPEG_QUALITY,
      timeout: SCREENSHOT_TIMEOUT,
    })
    return { ok: true, data, width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT }
  } catch (error) {
    return {
      ok: false,
      error: `截图失败：${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * 在当前页面内执行点击（基于截图坐标 → 实际视口坐标）。
 *
 * @param {number} x 截图上的 X 坐标（CSS 像素）
 * @param {number} y 截图上的 Y 坐标（CSS 像素）
 * @param {number} scale 截图显示尺寸与视口尺寸的比例（前端传回）
 * @returns {Promise<{ok: true}|{ok: false, error: string}>}
 */
export async function click(x, y, scale = 1) {
  if (_page === null) {
    return { ok: false, error: '页面尚未加载' }
  }
  try {
    const vx = Math.round(x / scale)
    const vy = Math.round(y / scale)
    await _page.mouse.click(vx, vy)
    // 点击后等待页面可能发生的导航或渲染。
    await _page.waitForTimeout(500)
    try {
      await _page.waitForLoadState('networkidle', { timeout: 8_000 })
    } catch { /* ignore */ }
    await _page.waitForTimeout(500)
    const finalUrl = _page.url()
    _currentUrl = finalUrl
    return { ok: true, url: finalUrl }
  } catch (error) {
    return {
      ok: false,
      error: `点击失败：${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * 在当前页面内输入文字（聚焦的元素会收到按键）。
 *
 * @param {string} text 要输入的文字
 * @returns {Promise<{ok: true}|{ok: false, error: string}>}
 */
export async function type(text) {
  if (_page === null) {
    return { ok: false, error: '页面尚未加载' }
  }
  try {
    await _page.keyboard.type(text, { delay: 20 })
    await _page.waitForTimeout(300)
    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      error: `输入失败：${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * 滚动页面。
 *
 * @param {number} deltaY 垂直滚动量（正 = 向下，负 = 向上）
 * @returns {Promise<{ok: true}|{ok: false, error: string}>}
 */
export async function scroll(deltaY) {
  if (_page === null) {
    return { ok: false, error: '页面尚未加载' }
  }
  try {
    await _page.mouse.wheel(0, deltaY)
    await _page.waitForTimeout(300)
    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      error: `滚动失败：${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * 在当前页面内执行 JS 表达式并返回结果。
 *
 * @param {string} expression JS 表达式（在页面上下文执行）
 * @returns {Promise<{ok: true, result: unknown}|{ok: false, error: string}>}
 */
export async function evaluate(expression) {
  if (_page === null) {
    return { ok: false, error: '页面尚未加载' }
  }
  try {
    const result = await _page.evaluate(expression)
    return { ok: true, result }
  } catch (error) {
    return {
      ok: false,
      error: `执行失败：${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * 获取页面的纯文本内容（用于摘要、搜索等）。
 *
 * @returns {Promise<{ok: true, text: string}|{ok: false, error: string}>}
 */
export async function getContent() {
  if (_page === null) {
    return { ok: false, error: '页面尚未加载' }
  }
  try {
    const text = await _page.evaluate(() => document.body?.innerText ?? '')
    return { ok: true, text }
  } catch (error) {
    return {
      ok: false,
      error: `获取内容失败：${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * 返回当前页面 URL（navigate 之后可用）。
 */
export function getCurrentUrl() {
  return _currentUrl
}

/**
 * 检测 Playwright 是否可用（浏览器能否启动）。
 * 路由注册前调用，决定走新路径还是旧 iframe 路径。
 *
 * @returns {Promise<boolean>}
 */
export async function isPlaywrightAvailable() {
  try {
    await ensureBrowser()
    return true
  } catch {
    return false
  }
}

// ── HTML 渲染捕获（新方案：替代截图流）──────────────────────────────────────

/**
 * 计算目标 URL 的目录级 base href。
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
 * 从 HTML 中提取 <base href="...">，返回绝对 URL 或 null。
 */
function extractBaseHref(html, fallbackUrl) {
  const match = html.match(/<base\b[^>]*\bhref\s*=\s*(["'])([^"']*)\1/i)
  if (!match) return null
  try { return new URL(match[2], fallbackUrl).href } catch { return null }
}

/**
 * 代理脚本：注入到渲染后的 HTML 中，在 iframe 内执行。
 * 它做两件事：
 *   1. 拦截所有同站 fetch/XHR 请求，通过 /workbench/proxy 转发（解决 CORS）；
 *   2. 拦截所有 <a> 点击，把目标 URL 通过 postMessage 通知父组件，由父组件
 *      决定是否走 Playwright 重新渲染。
 *
 * @param {string} proxyOrigin 当前页面的 origin（用于拼接 proxy URL）。
 * @returns {string} 注入的 <script> 内容。
 */
function buildProxyScript(proxyOrigin) {
  return `
<script>
(function(){
  var PROXY = '${proxyOrigin}/workbench/proxy?url=';
  // ── 1. 代理 fetch ──────────────────────────────────────────────────────
  if (typeof window.fetch === 'function') {
    var _origFetch = window.fetch;
    window = function(input, init) {
      var url = typeof input === 'string' ? input : (input && input.url);
      if (url && url.indexOf('http') === 0) {
        arguments[0] = PROXY + encodeURIComponent(url);
      }
      return _origFetch.apply(this, arguments);
    };
  }
  // ── 2. 代理 XMLHttpRequest ─────────────────────────────────────────────
  if (typeof window.XMLHttpRequest === 'function') {
    var _origOpen = XMLHttpRequest.prototype.open;
    var _origSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(method) {
      this._dshUrl = arguments[1];
      return _origOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function(body) {
      if (this._dshUrl && typeof this._dshUrl === 'string' && this._dshUrl.indexOf('http') === 0) {
        var proxied = PROXY + encodeURIComponent(this._dshUrl);
        this._dshUrl = proxied;
        var args = Array.prototype.slice.call(arguments);
        args[0] = body;
        // 用新 URL 重新 open
        _origOpen.call(this, this._method || 'GET', proxied, true, this._user, this._password);
        return _origSend.apply(this, args);
      }
      return _origSend.apply(this, arguments);
    };
    // 保存 method
    var _prevOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      this._method = arguments[0];
      this._url = arguments[1];
      this._user = arguments[3];
      this._password = arguments[4];
      return _prevOpen.apply(this, arguments);
    };
  }
  // ── 3. 拦截 <a> 点击 → postMessage ────────────────────────────────────
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href === '#' || href.indexOf('javascript:') === 0) return;
    e.preventDefault();
    e.stopPropagation();
    try {
      var abs = new URL(href, document.baseURI).href;
      if (abs.indexOf('http') === 0) {
        window.parent.postMessage({ type: 'dsh-browser-navigate', url: abs }, '*');
      }
    } catch(err) {}
  }, true);
})();
</script>`
}

/**
 * 渲染页面并返回完整的、可供 iframe 直接使用的 HTML。
 *
 * 与 navigate() 不同的是，这个函数会：
 *   1. 在同一个页面实例上渲染（不新建 context，保留 Cookie）；
 *   2. 等待 networkidle + 额外延迟让 SPA 完成渲染；
 *   3. 捕获 document.documentElement.outerHTML；
 *   4. 注入 <base href> + 代理脚本 + 链接重写；
 *   5. 返回最终 HTML 字符串。
 *
 * @param {string} targetUrl 目标 http/https URL
 * @param {string} proxyOrigin 当前 origin（用于拼接代理脚本中的 URL）
 * @returns {Promise<{ok: true, html: string, title: string, url: string}|{ok: false, error: string}>}
 */
export async function captureRenderedHtml(targetUrl, proxyOrigin) {
  let browser
  try {
    browser = await ensureBrowser()
  } catch (error) {
    return {
      ok: false,
      error: `Playwright 启动失败：${error instanceof Error ? error.message : String(error)}`,
    }
  }

  let page = _page
  let createdNewPage = false

  try {
    // 复用已有页面或创建新页面
    if (page === null) {
      const context = await browser.newContext({
        viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        deviceScaleFactor: 1,
      })
      page = await context.newPage()
      createdNewPage = true

      page.on('close', () => {
        if (_page === page) {
          _page = null
          _currentUrl = null
        }
      })
    }

    // 导航
    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: NAVIGATE_TIMEOUT,
    })

    // 等待 SPA 渲染完成
    try {
      await page.waitForLoadState('networkidle', { timeout: 10_000 })
    } catch { /* 长轮询站点不会 networkidle */ }
    await page.waitForTimeout(1200)

    const title = await page.title()
    const finalUrl = page.url()

    // 捕获完整 HTML
    let html = await page.content()

    // 更新内部状态
    _page = page
    _currentUrl = finalUrl

    // ── 后处理 HTML ──────────────────────────────────────────────────────
    const baseHref = extractBaseHref(html, finalUrl) || directoryBaseOf(finalUrl)

    // 注入 <base> 标签
    const escapedBase = baseHref.replace(/"/g, '&quot;')
    if (/<head\b/i.test(html)) {
      html = html.replace(/<head\b([^>]*)>/i, `<head$1><base href="${escapedBase}">`)
    } else if (/<html\b/i.test(html)) {
      html = html.replace(/<html\b([^>]*)>/i, `<html$1><head><base href="${escapedBase}"></head>`)
    } else {
      html = `<head><base href="${escapedBase}"></head>` + html
    }

    // 注入代理脚本到 <head> 最前面（必须在所有其他脚本之前）
    const proxyScript = buildProxyScript(proxyOrigin)
    if (/<head\b/i.test(html)) {
      html = html.replace(/<head\b([^>]*)>/i, `<head$1>${proxyScript}`)
    }

    // 重写 <a href> → data-original-href + 代理脚本会拦截点击
    // 但我们保留原始 href 作为 data 属性，同时把 href 设为 # 防止直接导航
    html = html.replace(/<a\b([^>]*)>/gi, (match, attrs) => {
      const withData = attrs.replace(/\bhref\s*=\s*(["'])([^"']*)\1/i, (hrefMatch, quote, value) => {
        if (/^(?:javascript|data|mailto|tel|about|blob):/i.test(value)) return hrefMatch
        if (value.startsWith('#')) return hrefMatch
        let absolute
        try { absolute = new URL(value, baseHref).href } catch { return hrefMatch }
        if (!/^https?:/i.test(absolute)) return hrefMatch
        return `href="javascript:void(0)" data-dsh-href=${quote}${absolute}${quote}`
      })
      return `<a${withData}>`
    })

    return { ok: true, html, title, url: finalUrl }
  } catch (error) {
    if (createdNewPage && page !== null) {
      try { await page.context().close() } catch { /* ignore */ }
      if (_page === page) _page = null
    }
    return {
      ok: false,
      error: `渲染失败：${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * 通过 Playwright 代理一个 HTTP 请求。
 * 用于转发 iframe 内的 fetch/XHR 请求到目标站点，解决 CORS 问题。
 *
 * @param {string} targetUrl 要代理的目标 URL
 * @param {string} method HTTP 方法
 * @param {string} body 请求体（string | undefined）
 * @param {Object} headers 要透传的请求头
 * @returns {Promise<{ok: true, status: number, headers: Object, body: string}|{ok: false, error: string}>}
 */
export async function proxyRequest(targetUrl, method = 'GET', body, headers = {}) {
  let browser
  try {
    browser = await ensureBrowser()
  } catch (error) {
    return { ok: false, error: `Playwright 启动失败：${error instanceof Error ? error.message : String(error)}` }
  }

  try {
    // 使用 request API 而不是 page，避免污染页面状态
    const context = browser.contexts()[0] || await browser.newContext()
    const response = await context.request.fetch(targetUrl, {
      method,
      data: body,
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        ...headers,
      },
    })

    const responseBody = await response.text()
    const responseHeaders = {}
    for (const [k, v] of Object.entries(response.headers())) {
      responseHeaders[k] = v
    }

    return {
      ok: true,
      status: response.status(),
      headers: responseHeaders,
      body: responseBody,
    }
  } catch (error) {
    return {
      ok: false,
      error: `代理请求失败：${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
