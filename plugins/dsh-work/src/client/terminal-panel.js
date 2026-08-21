/**
 * dsh-work — TerminalPanel：交互式终端（多实例）。
 *
 * 每个实例 = 一条到宿主的 WebSocket（/workbench/terminal/ws?id=…）+ 内嵌
 * xterm.js（esbuild 打包内联，@xterm/xterm v6 + fit addon）。行为：
 *
 *  - 无 sessionId 挂载 → POST /workbench/terminal/create（cwd 取面板工作目录）
 *    → 连接 WS；拿到 id 后经 onSessionReady 回报（供标签持久化/刷新恢复）。
 *  - 有 sessionId 挂载（页面刷新恢复）→ 直接重连同会话，服务端回放环形缓冲。
 *  - 连接中断自动指数退避重连（会话仍在宿主存活 60s 孤儿宽限内即可接回）。
 *  - 进程退出 / 会话消失 → 覆盖层提示，一键重新启动（新会话）。
 *  - 面板拖宽/窗口缩放经 ResizeObserver → fit → {t:'r'} 同步 PTY 尺寸。
 *  - 非激活标签实例由 panel.js 保持挂载（display:none），进程与滚动回看
 *    跨标签切换不丢失；激活时自动 fit + 聚焦。
 */
import React from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import xtermCss from '@xterm/xterm/css/xterm.css'
import { messageOf } from './helpers.js'
const h = React.createElement
const { useEffect, useRef, useState } = React

// xterm 样式注入（与面板样式同一守卫模式：防重复、按插件认领）。
if (typeof document !== 'undefined' && document.getElementById('dwb-xterm-style') === null) {
  const styleEl = document.createElement('style');
  styleEl.id = 'dwb-xterm-style';
  styleEl.setAttribute('data-plugin', 'dsh-work');
  styleEl.textContent = xtermCss;
  document.head.appendChild(styleEl);
}

// 回退字体栈（读不到壳的 --ds-font-family-code 时用）。
const TERM_FONT_FALLBACK = "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// ANSI 16 色：深/浅两套。底色/前景/选区跟随 DSH 主题 token 实时读取，
// ANSI 色板按主题明暗二选一，保证 ls/git/vim 彩色输出在两种主题下都清晰。
const ANSI_DARK = {  // Tokyo Night（深底霓虹冷色）
  black: '#15161e', red: '#f7768e', green: '#9ece6a', yellow: '#e0af68',
  blue: '#7aa2f7', magenta: '#bb9af7', cyan: '#7dcfff', white: '#a9b1d6',
  brightBlack: '#414868', brightRed: '#f7768e', brightGreen: '#9ece6a', brightYellow: '#e0af68',
  brightBlue: '#7aa2f7', brightMagenta: '#bb9af7', brightCyan: '#7dcfff', brightWhite: '#c0caf5',
}
const ANSI_LIGHT = { // GitHub Light 系（白底深色墨）
  black: '#24292f', red: '#cf222e', green: '#116329', yellow: '#9a6700',
  blue: '#0550ae', magenta: '#8250df', cyan: '#1b7c83', white: '#6e7781',
  brightBlack: '#57606a', brightRed: '#a40e26', brightGreen: '#1a7f37', brightYellow: '#7d4e00',
  brightBlue: '#218bff', brightMagenta: '#a475f9', brightCyan: '#3192aa', brightWhite: '#8c959f',
}

function isDarkTheme() {
  try { return document.body.hasAttribute('data-ds-dark-theme') } catch { return true }
}
function themeToken(name, fallback) {
  try {
    const value = getComputedStyle(document.body).getPropertyValue(name).trim()
    return value === '' ? fallback : value
  } catch { return fallback }
}
/** '#rgb' / '#rrggbb' → 'r,g,b'（供拼 rgba 透明度）；解析失败返回 null。 */
function hexRgb(hex) {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(typeof hex === 'string' ? hex.trim() : '')
  if (m === null) return null
  let h = m[1]
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`
}
/** 读取 DSH 主题 token，拼出与面板一致的 xterm 主题。 */
function readTermTheme() {
  const dark = isDarkTheme()
  const background = themeToken('--dsw-alias-bg-layer-2', dark ? '#1a1b26' : '#ffffff')
  const foreground = themeToken('--dsw-alias-label-primary', dark ? '#c0caf5' : '#0f1115')
  const brand = themeToken('--dsw-alias-state-business-primary', '#4176e6')
  const brandRgb = hexRgb(brand)
  return {
    background,
    foreground,
    cursor: brandRgb !== null ? brand : foreground,
    cursorAccent: background,
    selectionBackground: brandRgb !== null ? `rgba(${brandRgb}, 0.22)` : 'rgba(65, 118, 230, 0.22)',
    selectionInactiveBackground: brandRgb !== null ? `rgba(${brandRgb}, 0.12)` : 'rgba(65, 118, 230, 0.12)',
    ...(dark ? ANSI_DARK : ANSI_LIGHT),
  }
}
function readTermFont() {
  return themeToken('--ds-font-family-code', TERM_FONT_FALLBACK)
}
const RECONNECT_MAX_TRIES = 6

function terminalWsUrl(id) {
  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws'
  return proto + '://' + window.location.host + '/workbench/terminal/ws?id=' + encodeURIComponent(id)
}

/**
 * 终端标签：xterm.js + WebSocket 双向流。
 *
 * 支持刷新重连（挂回同一 PTY 会话）、断线自动重连覆盖层、
 * 退出/消失/错误状态提示。
 */
export function TerminalPanel(props) {
  const { sessionId, path, visible, onSessionReady } = props
  const containerRef = useRef(null)
  const [phase, setPhase] = useState('boot')          // boot | open | reconnecting | exited | gone | error
  const [exitInfo, setExitInfo] = useState(undefined)  // { code, signal }
  const [errorMsg, setErrorMsg] = useState(undefined)
  const [meta, setMeta] = useState(undefined)          // { cwd, shell, pid }
  const [runId, setRunId] = useState(0)

  const sessionRef = useRef(sessionId)
  const visibleRef = useRef(visible)
  const wsRef = useRef(null)
  const termRef = useRef(null)
  const fitRef = useRef(null)
  const sizeRef = useRef({ cols: 80, rows: 24 })
  visibleRef.current = visible

  const wsSend = (obj) => {
    const ws = wsRef.current
    if (ws !== null && ws.readyState === 1) {
      try { ws.send(JSON.stringify(obj)) } catch { /* 发送窗口已满/正在关闭 */ }
    }
  }

  const doFit = () => {
    const term = termRef.current
    const fit = fitRef.current
    const container = containerRef.current
    if (term === null || fit === null || container === null) return
    if (container.clientWidth < 20 || container.clientHeight < 20) return // display:none / 过窄：跳过
    try { fit.fit() } catch { return }
    const cols = term.cols
    const rows = term.rows
    if (cols !== sizeRef.current.cols || rows !== sizeRef.current.rows) {
      sizeRef.current = { cols, rows }
      wsSend({ t: 'r', cols, rows })
    }
  }

  // 激活时：重算尺寸 + 聚焦（隐藏期间跳过的 fit 在这里补上）。
  useEffect(() => {
    if (!visible) return
    const raf = requestAnimationFrame(() => {
      doFit()
      if (termRef.current !== null) { try { termRef.current.focus() } catch { /* disposed */ } }
    })
    return () => cancelAnimationFrame(raf)
  }, [visible, phase])

  // ── 主生命周期：xterm + WS（runId 变化 = 整段重来，用于「重新启动」）──
  useEffect(() => {
    const container = containerRef.current
    if (container === null) return
    let cancelled = false
    let opened = false
    let createdHere = false
    let reconnectTimer = null
    let reconnectTries = 0

    const term = new Terminal({
      theme: readTermTheme(),
      fontFamily: readTermFont(),
      fontSize: 12,
      lineHeight: 1.3,
      cursorBlink: true,
      cursorStyle: 'bar',
      scrollback: 5000,
      macOptionIsMeta: true,
      allowProposedApi: false,
    })
    const fit = new FitAddon()
    term.loadAddon(fit)
    term.open(container)
    termRef.current = term
    fitRef.current = fit
    if (visibleRef.current) { try { fit.fit(); sizeRef.current = { cols: term.cols, rows: term.rows } } catch { /* 尺寸下一帧再算 */ } }

    term.onData((data) => wsSend({ t: 'i', d: data }))
    term.onBinary((data) => {
      try { wsSend({ t: 'b', d: window.btoa(data) }) } catch { /* 非 latin1 二进制：忽略 */ }
    })

    const observer = new ResizeObserver(() => { if (visibleRef.current) doFit() })
    observer.observe(container)

    // DSH 深/浅主题切换（body[data-ds-dark-theme]）→ 实时重建 xterm 主题。
    const themeObserver = new MutationObserver(() => {
      try { term.options.theme = readTermTheme() } catch { /* 已 dispose */ }
    })
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] })

    const ensureSession = async () => {
      if (sessionRef.current !== undefined && sessionRef.current !== null) return sessionRef.current
      const response = await fetch('/workbench/terminal/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          cwd: typeof path === 'string' && path !== '' ? path : undefined,
          cols: sizeRef.current.cols,
          rows: sizeRef.current.rows,
        }),
      })
      const body = await response.json()
      if (body.ok !== true) throw new Error(body.error || '终端创建失败')
      sessionRef.current = body.id
      createdHere = true
      setMeta({ cwd: body.cwd, shell: body.shell, pid: body.pid })
      if (onSessionReady !== undefined) onSessionReady(body.id)
      return body.id
    }

    const connect = (id) => {
      if (cancelled) return
      const ws = new WebSocket(terminalWsUrl(id))
      wsRef.current = ws
      ws.onopen = () => {
        if (cancelled) { ws.close(); return }
        opened = true
        reconnectTries = 0
        setPhase('open')
        doFit()
        if (visibleRef.current) { try { term.focus() } catch { /* disposed */ } }
      }
      ws.onmessage = (event) => {
        if (cancelled) return
        let message
        try { message = JSON.parse(event.data) } catch { return }
        if (message === null || typeof message !== 'object') return
        if (message.t === 'o' && typeof message.d === 'string') {
          term.write(message.d)
        } else if (message.t === 'exit') {
          setExitInfo({ code: message.code, signal: message.signal })
          setPhase('exited')
        }
      }
      ws.onclose = () => {
        if (cancelled || wsRef.current !== ws) return
        wsRef.current = null
        if (opened) {
          // 已建立过的连接断开：会话可能仍在宿主（孤儿宽限内），退避重连。
          if (reconnectTries < RECONNECT_MAX_TRIES) {
            setPhase('reconnecting')
            const delay = Math.min(8000, 400 * 2 ** reconnectTries)
            reconnectTries += 1
            reconnectTimer = setTimeout(() => { reconnectTimer = null; connect(id) }, delay)
          } else {
            setPhase('gone')
          }
        }
        // 未 opened 的关闭由 onerror 路径处理。
      }
      ws.onerror = () => {
        if (cancelled) return
        if (!opened) {
          // 握手失败（404 会话已消失 / 403 / 网络）：不再重试，给重启入口。
          setPhase('gone')
        }
      }
    }

    setPhase('boot')
    ensureSession()
      .then((id) => { if (!cancelled) connect(id) })
      .catch((error) => {
        if (cancelled) return
        setErrorMsg(messageOf(error))
        setPhase('error')
      })

    return () => {
      cancelled = true
      if (reconnectTimer !== null) clearTimeout(reconnectTimer)
      const ws = wsRef.current
      if (ws !== null) {
        wsRef.current = null
        ws.onopen = null; ws.onmessage = null; ws.onclose = null; ws.onerror = null
        try { ws.close() } catch { /* already closed */ }
      }
      observer.disconnect()
      themeObserver.disconnect()
      try { term.dispose() } catch { /* already disposed */ }
      termRef.current = null
      fitRef.current = null
      // 本次运行创建且从未连上的会话：清理（防 StrictMode 双挂载泄漏）。
      if (createdHere && !opened && sessionRef.current !== undefined) {
        const id = sessionRef.current
        sessionRef.current = undefined
        try {
          void fetch('/workbench/terminal/kill', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id }),
          }).catch(() => {})
        } catch { /* 页面正在卸载 */ }
      }
    }
  }, [runId])

  const restart = () => {
    sessionRef.current = undefined
    setExitInfo(undefined)
    setErrorMsg(undefined)
    setMeta(undefined)
    setRunId((n) => n + 1)
  }

  const baseName = (p) => (typeof p === 'string' ? p.split('/').filter((s) => s !== '').pop() ?? '' : '')
  const shellName = meta !== undefined ? baseName(meta.shell) : ''
  const cwdName = meta !== undefined ? baseName(meta.cwd) : baseName(path)
  const titleParts = [shellName, cwdName].filter((s) => s !== '')
  const titleText = titleParts.length > 0 ? titleParts.join(' — ') : 'terminal'

  // 状态灯：run（绿，呼吸）/ warn（琥珀，快闪）/ down（红，常亮）。
  const statusKind = phase === 'open' || phase === 'boot' ? 'run' : phase === 'reconnecting' ? 'warn' : 'down'
  const statusText = phase === 'open' ? '运行中'
    : phase === 'boot' ? '启动中'
    : phase === 'reconnecting' ? '重连中'
    : phase === 'exited' ? '已退出'
    : phase === 'gone' ? '已结束'
    : '启动失败'

  const exitText = exitInfo === undefined
    ? ''
    : exitInfo.signal != null ? `信号 ${exitInfo.signal}` : `退出码 ${exitInfo.code ?? 0}`

  const metaText = titleText + (meta !== undefined && meta.pid !== undefined ? ` · pid ${meta.pid}` : '')

  // 平铺结构：终端直接占满标签内容区（与目录/Git 等功能同级），
  // 底部一条 tmux 风格状态行，无独立卡片/窗框，避免框里套框。
  return h('div', { className: 'dwb-terminal-wrap', 'data-status': statusKind },
    h('div', { className: 'dwb-term-body' },
      h('div', { ref: containerRef, className: 'dwb-terminal' }),
      phase === 'boot'
        ? h('div', { className: 'dwb-term-boot' },
          h('span', { className: 'dwb-term-bootdots' }, h('i'), h('i'), h('i')),
          h('span', null, '正在启动 shell…'),
        )
        : null,
      phase === 'exited'
        ? h('div', { className: 'dwb-term-overlay' },
          h('div', { className: 'dwb-term-overlay-title' }, '进程已退出'),
          h('div', { className: 'dwb-term-overlay-sub' }, exitText),
          h('button', { type: 'button', className: 'dwb-term-btn', onClick: restart }, '重新启动'),
        )
        : null,
      phase === 'gone'
        ? h('div', { className: 'dwb-term-overlay' },
          h('div', { className: 'dwb-term-overlay-title' }, '终端会话已结束'),
          h('div', { className: 'dwb-term-overlay-sub' }, '服务重启或会话超时回收'),
          h('button', { type: 'button', className: 'dwb-term-btn', onClick: restart }, '新建终端'),
        )
        : null,
      phase === 'error'
        ? h('div', { className: 'dwb-term-overlay' },
          h('div', { className: 'dwb-term-overlay-title' }, '终端启动失败'),
          h('div', { className: 'dwb-term-overlay-sub' }, errorMsg || ''),
          h('button', { type: 'button', className: 'dwb-term-btn', onClick: restart }, '重试'),
        )
        : null,
    ),
    h('div', { className: 'dwb-term-statusline' },
      h('span', { className: 'dwb-term-status' },
        h('i', { className: 'dwb-term-statusdot' }),
        h('span', null, statusText),
      ),
      h('span', { className: 'dwb-term-meta', title: metaText }, metaText),
    ),
  )
}
