/**
 * dsh-work — 浏览器 tab：地址栏 + iframe。
 *
 * 默认不加沙箱，iframe 行为等同于普通浏览器标签——Cookie、存储、API 全通，
 * SPA（B站/QQ/GitHub 等）可完整渲染。顶部提供「安全模式」开关，开启后
 * 对页面施加 sandbox 隔离（不透明源，无存储/Cookie/API），用于浏览不可信站点。
 *
 * 地址栏仅接受 http/https，拒绝危险协议和回环地址。每次导航探测目标站点
 * 的 X-Frame-Options / CSP frame-ancestors，被拒绝时提示并提供外部打开。
 */
import React from 'react'
import { TipButton } from './tip.js'
import { backIcon, forwardIcon, refreshIcon } from './icons.js'
const h = React.createElement
const { useState, useEffect, useCallback, useRef } = React

/** 安全模式下的 iframe 沙箱令牌。 */
const BROWSER_SANDBOX =
  'allow-scripts allow-forms allow-popups allow-downloads allow-modals allow-popups-to-escape-sandbox'
/** 历史记录上限。 */
const MAX_HISTORY = 50

/** 危险协议黑名单。 */
const FORBIDDEN_SCHEMES = new Set([
  'javascript', 'data', 'file', 'about', 'vbscript', 'blob',
  'mailto', 'tel', 'ftp', 'ftps', 'ws', 'wss', 'sftp', 'ssh',
  'chrome', 'chrome-extension', 'moz-extension', 'edge', 'opera', 'resource', 'view-source',
])

/** 回环主机名检测。 */
function isLoopbackHostname(hostname) {
  const host = hostname.replace(/^\[|\]$/g, '').toLowerCase()
  if (host === 'localhost' || host === '::1' || host === '0.0.0.0') return true
  const parts = host.split('.')
  return parts.length === 4 && parts[0] === '127' &&
    parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255)
}

/** 地址栏输入 → 标准化 URL 或拒绝原因。 */
function normalizeBrowserUrl(input, selfOrigin) {
  const trimmed = input.trim()
  if (trimmed === '') return { kind: 'invalid' }
  const schemeMatch = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(trimmed)
  let withScheme
  if (schemeMatch === null) {
    withScheme = 'https://' + trimmed
  } else {
    const scheme = schemeMatch[1].toLowerCase()
    if (scheme === 'http' || scheme === 'https') withScheme = trimmed
    else if (FORBIDDEN_SCHEMES.has(scheme)) return { kind: 'blocked', reason: 'scheme' }
    else withScheme = 'https://' + trimmed
  }
  let url
  try {
    url = new URL(withScheme)
  } catch {
    return { kind: 'invalid' }
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return { kind: 'blocked', reason: 'scheme' }
  try {
    if (url.origin === new URL(selfOrigin).origin) return { kind: 'ok', url: url.href }
  } catch { /* fall through */ }
  if (isLoopbackHostname(url.hostname)) return { kind: 'blocked', reason: 'loopback' }
  return { kind: 'ok', url: url.href }
}

/** 判断探测结果是否拒绝嵌入。 */
function isEmbedBlocked(probe) {
  if (probe.reachable !== true) return false
  const xfo = (probe.xFrameOptions || '').trim().toUpperCase()
  if (xfo === 'DENY' || xfo === 'SAMEORIGIN') return true
  if (Array.isArray(probe.frameAncestors) && !probe.frameAncestors.some((s) => s === '*')) return true
  return false
}

export function BrowserView(props) {
  const [url, setUrl] = useState(undefined)
  const [input, setInput] = useState('')
  const [message, setMessage] = useState(null)
  const [history, setHistory] = useState([])
  const [cursor, setCursor] = useState(-1)
  const [reloadKey, setReloadKey] = useState(0)
  const [safeMode, setSafeMode] = useState(false)
  const [embedBlocked, setEmbedBlocked] = useState(null)
  const [forceEmbed, setForceEmbed] = useState(false)
  const [loading, setLoading] = useState(false)

  const selfOrigin = typeof window !== 'undefined' ? window.location.origin : ''
  const iframeRef = useRef(null)
  // visible = 该标签是否为激活项（常驻挂载下非激活标签仍留在 DOM，只是隐藏）。
  // 非激活时跳过探测等实时行为，避免后台标签白白发请求。
  const visible = props.visible !== false

  // ── 导航探测：目标站点是否拒绝嵌入 ──────────────────────────────────────
  useEffect(() => {
    if (url === undefined || !visible) return
    let cancelled = false
    setEmbedBlocked(null)
    setForceEmbed(false)
    setLoading(true)
    fetch('/workbench/browser-probe?url=' + encodeURIComponent(url))
      .then((r) => r.json())
      .then((probe) => {
        if (cancelled) return
        if (isEmbedBlocked(probe)) setEmbedBlocked(url)
      })
      .catch(() => { /* 不可达：保留普通 iframe */ })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [url, visible])

  // ── 导航 ─────────────────────────────────────────────────────────────────
  const navigateTo = useCallback((raw) => {
    const result = normalizeBrowserUrl(raw, selfOrigin)
    if (result.kind === 'ok') {
      const next = result.url
      setUrl(next)
      setInput(next)
      setMessage(null)
      setHistory((prev) => {
        const base = prev.slice(0, cursor + 1)
        base.push(next)
        if (base.length > MAX_HISTORY) base.splice(0, base.length - MAX_HISTORY)
        return base
      })
      setCursor((prev) => Math.min(prev + 1, MAX_HISTORY - 1))
      setReloadKey((k) => k + 1)
      if (typeof props.onTitleChange === 'function') {
        try { props.onTitleChange(new URL(next).hostname) } catch { /* ignore */ }
      }
      return
    }
    setMessage(
      result.kind === 'invalid' ? '无效的 URL'
      : result.reason === 'scheme' ? '不支持的协议'
      : '禁止访问回环地址',
    )
  }, [cursor, selfOrigin, props])

  const goBack = useCallback(() => {
    if (cursor <= 0) return
    const next = history[cursor - 1]
    setCursor(cursor - 1)
    setUrl(next)
    setInput(next)
    setReloadKey((k) => k + 1)
  }, [cursor, history])

  const goForward = useCallback(() => {
    if (cursor >= history.length - 1) return
    const next = history[cursor + 1]
    setCursor(cursor + 1)
    setUrl(next)
    setInput(next)
    setReloadKey((k) => k + 1)
  }, [cursor, history])

  const reload = useCallback(() => {
    setReloadKey((k) => k + 1)
  }, [])

  // ── 渲染 ──────────────────────────────────────────────────────────────────
  return h("div", { className: "dwb-browser" },
    // 导航栏。
    h("div", { className: "dwb-browser-bar" },
      h(TipButton, { tip: "后退", className: "dwb-browser-navbtn", onClick: goBack, disabled: cursor <= 0 }, backIcon()),
      h(TipButton, { tip: "前进", className: "dwb-browser-navbtn", onClick: goForward, disabled: cursor >= history.length - 1 }, forwardIcon()),
      h(TipButton, { tip: "刷新", className: "dwb-browser-navbtn", onClick: reload, disabled: url === undefined },
        h("span", { className: loading ? "dwb-spin" : undefined }, refreshIcon())),
      h("input", {
        className: "dwb-browser-urlinput",
        value: input,
        placeholder: "输入网址，例如 bilibili.com",
        spellCheck: false,
        onChange: (event) => setInput(event.target.value),
        onKeyDown: (event) => {
          if (event.key === 'Enter') { navigateTo(input); event.currentTarget.blur() }
        },
      }),
      // 安全模式开关。
      h(TipButton, {
        tip: safeMode ? "安全模式：开（沙箱隔离中）" : "安全模式：关（完整功能）",
        className: "dwb-browser-navbtn" + (safeMode ? " dwb-browser-safe-on" : ""),
        onClick: () => setSafeMode((v) => !v),
        disabled: url === undefined,
      }, safeMode ? "🛡️" : "🔓"),
    ),
    // 错误/拒绝提示。
    message !== null
      ? h("div", { className: "dwb-browser-message" }, message)
      : null,
    // 安全模式提示条。
    safeMode
      ? h("div", { className: "dwb-browser-warn" },
          "🛡️ 安全模式 — 页面运行在沙箱中，无 Cookie/存储/API 访问权限",
          h("button", { className: "dwb-browser-warn-btn", onClick: () => setSafeMode(false) }, "关闭"),
        )
      : null,
    // 空状态。
    url === undefined
      ? h("div", { className: "dwb-browser-empty" },
          h("div", { className: "dwb-browser-emptyicon" }, "🌐"),
          h("div", { className: "dwb-browser-emptytitle" }, "浏览器"),
          h("div", { className: "dwb-browser-emptyhint" },
            "在上方输入网址浏览。默认完整功能，SPA 可正常渲染。",
            h("br"),
            "🔓 = 完整功能  🛡️ = 安全沙箱（隔离不可信站点）",
          ),
        )
      : null,
    // 嵌入被拒绝提示。
    embedBlocked !== null && !forceEmbed
      ? h("div", { className: "dwb-browser-error" },
          h("div", { className: "dwb-browser-error-title" }, "此站点拒绝被嵌入"),
          h("div", { className: "dwb-browser-error-msg" },
            "该站点设置了 X-Frame-Options / CSP frame-ancestors 禁止在 iframe 中显示。",
          ),
          h("div", { className: "dwb-browser-error-actions" },
            h("button", { className: "dwb-browser-error-btn",
              onClick: () => { if (embedBlocked !== null) window.open(embedBlocked, '_blank', 'noopener') } },
              "在浏览器中打开"
            ),
            h("button", { className: "dwb-browser-error-btn",
              onClick: () => setForceEmbed(true) },
              "强制加载"
            ),
          ),
        )
      : null,
    // iframe。
    url !== undefined && (embedBlocked === null || forceEmbed)
      ? h("iframe", {
          ref: iframeRef,
          key: `${reloadKey}:${safeMode ? 'safe' : 'full'}`,
          className: "dwb-browser-frame",
          src: url,
          sandbox: safeMode ? BROWSER_SANDBOX : undefined,
          referrerPolicy: "no-referrer",
          title: url,
        })
      : null,
  )
}
