/**
 * dsh-work — WorkbenchPanel：右侧停靠面板（shell.overlay）+ 三列联动。
 *
 * 重构为多实例标签页架构：
 *   - 功能注册表（features.js）声明所有可用功能
 *   - 标签系统管理功能实例（单实例 Files/Git + 多实例 Browser/Terminal）
 *   - 无激活标签时显示功能网格首页（类似浏览器新标签页）
 *   - "+" 按钮打开功能网格，点击功能卡片创建新标签
 */
import React from 'react'
import { TipButton } from './tip.js'
import { AUTO_WIDEN, PANEL_DEFAULT, PANEL_MIN, WIDTH_KEY, clampPanelWidth, cubicBezierEase, findNode, messageOf, panelActionFor, patchNode, readStored, toNode, writeStored } from './helpers.js'
import { closeIcon, IconFrame, refreshIcon } from './icons.js'
import { FilesPanel } from './files-panel.js'
import { GitPanel } from './git-panel.js'
import { BrowserView } from './browser-view.js'
import { TerminalPanel } from './terminal-panel.js'
import { TaskboardPanel } from './taskboard/panel.js'
import { FeatureGrid } from './feature-grid.js'
import { getFeature } from './features.js'
const h = React.createElement
const { useState, useEffect, useCallback, useRef } = React

// 初始标签为空：默认只显示"+"按钮，点击后展示功能网格。
const INITIAL_TABS = []

// 标签 id 单调计数器：保证多实例标签 id 全局唯一。
// 不能只用 Date.now()——同一毫秒内连开两个标签会撞 id，
// 导致 tab 栏重复 key、React 渲染抛错白屏。
let tabIdCounter = 0

// ── 终端会话：标签持久化与回收 helper ─────────────────────────────────
// 页面刷新后凭 localStorage 的 id→label 映射 + 宿主 /workbench/terminal/list
// 的存活会话重建终端标签（宿主孤儿宽限 60s 内重连即可接回同一 PTY）。
const TERMINAL_LABELS_KEY = 'dsh-work.terminal-labels'
function readTerminalLabels() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(TERMINAL_LABELS_KEY) ?? '{}')
    return parsed !== null && typeof parsed === 'object' ? parsed : {}
  } catch { return {} }
}
function writeTerminalLabels(labels) {
  try { window.localStorage.setItem(TERMINAL_LABELS_KEY, JSON.stringify(labels)) } catch { /* private mode */ }
}
function killTerminalSession(sessionId) {
  try {
    void fetch('/workbench/terminal/kill', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: sessionId }),
    }).catch(() => {})
  } catch { /* 页面正在卸载 */ }
}
/** 终端标签编号：终端、终端 2、终端 3……（关标签后可能重号，属可接受边缘）。 */
function nextTerminalLabel(list) {
  const n = list.filter((t) => t.featureId === 'terminal').length
  return n === 0 ? '终端' : `终端 ${n + 1}`
}

// ── WorkbenchPanel ───────────────────────────────────────────────────
export function WorkbenchPanel(props) {
  const useSessions = props.useSessions
  const cwd = typeof useSessions === "function"
    ? useSessions((list) => {
      if (list.current === undefined) return undefined
      const row = list.byId[list.current]
      return row === undefined ? undefined : row.cwd
    })
    : undefined
  const [open, setOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [git, setGit] = useState({ status: "idle" })
  const [initializing, setInitializing] = useState(false)
  const [mutating, setMutating] = useState(false)
  const [actionError, setActionError] = useState(undefined)
  const [commitMessage, setCommitMessage] = useState("")
  const [showIgnored, setShowIgnored] = useState(false)
  const [root, setRoot] = useState(null)

  // ── 标签系统 ──
  const [tabs, setTabs] = useState(INITIAL_TABS)
  // activeTabId = null 表示首页网格（无激活标签）。
  const [activeTabId, setActiveTabId] = useState(null)

  // Panel geometry: persisted width + live max bound.
  const [width, setWidth] = useState(() => Math.max(PANEL_MIN, readStored(WIDTH_KEY, PANEL_DEFAULT)))
  const [maxWidth, setMaxWidth] = useState(() => window.innerWidth - PANEL_MIN)
  const [resizing, setResizing] = useState(false)
  const rootRef = useRef(null)
  const resizeOrigin = useRef({ x: 0, width })

  // 工作目录 = 当前会话的 cwd（不再提供手动路径输入）。
  const path = cwd
  useEffect(() => { setCommitMessage("") }, [path])

  // ── 标签管理 ──
  // 任务看板五列需要横向空间：打开看板标签时把面板自动加宽（已够宽则不动）。
  // 闭包在渲染完成后的点击时刻执行，widthRef/animateWidthTo/maxWidthRef 均已就绪。
  const widenForTaskboard = () => {
    const desired = Math.round(Math.min(Math.max(window.innerWidth * 0.6, AUTO_WIDEN), window.innerWidth * 0.85))
    const target = clampPanelWidth(desired, maxWidthRef.current, PANEL_MIN)
    if (target > widthRef.current + 2) animateWidthTo(target, { floor: PANEL_MIN, persist: true })
  }
  // opts.sessionId：终端恢复路径——挂回一个宿主已存活的 PTY 会话（不新建）。
  const openFeature = useCallback((featureId, opts) => {
    const feat = getFeature(featureId)
    if (!feat || feat.disabled) return
    if (featureId === 'taskboard') widenForTaskboard()
    if (feat.singleInstance) {
      const existing = tabs.find((t) => t.featureId === featureId)
      if (existing) { setActiveTabId(existing.id); return }
    }
    tabIdCounter += 1
    const id = `${featureId}-${tabIdCounter}-${Date.now()}`
    const label = featureId === 'terminal' ? nextTerminalLabel(tabs) : feat.label
    // closable 元数据决定标签是否显示关闭按钮（单实例标签关闭后可从功能网格重新打开）。
    const tab = { id, featureId, label, closable: feat.closable === true }
    if (featureId === 'terminal' && opts !== undefined && typeof opts.sessionId === 'string') {
      tab.sessionId = opts.sessionId
    }
    setTabs((prev) => [...prev, tab])
    setActiveTabId(id)
  }, [tabs])

  const closeTab = useCallback((tabId) => {
    // 不在 setTabs 更新器里嵌套 setActiveTabId（更新器必须是纯函数，
    // 并发/StrictMode 下嵌套 setState 会被重复执行或告警）。
    // closeTab 依赖 tabs，拿到的永远是最新值，直接算好后提交两个纯更新。
    const tab = tabs.find((t) => t.id === tabId)
    if (!tab?.closable) return
    // 终端标签关闭 = 杀掉宿主 PTY 会话（幂等；实例卸载本身只断 WS）。
    if (tab.featureId === 'terminal' && typeof tab.sessionId === 'string') {
      killTerminalSession(tab.sessionId)
    }
    const next = tabs.filter((t) => t.id !== tabId)
    setTabs(next)
    setActiveTabId((current) => {
      if (current !== tabId) return current
      return next.length > 0 ? next[next.length - 1].id : null
    })
  }, [tabs])

  const updateTabLabel = useCallback((tabId, label) => {
    setTabs((prev) => prev.map((t) => t.id === tabId ? { ...t, label } : t))
  }, [])

  // 终端标签拿到/更新会话 id 时回写 tab（供关闭回收与刷新恢复）。
  const bindTabSession = useCallback((tabId, sessionId) => {
    setTabs((prev) => prev.map((t) => t.id === tabId && t.sessionId !== sessionId ? { ...t, sessionId } : t))
  }, [])

  // ── 终端恢复：刷新后把宿主仍存活的 PTY 会话重建为标签（挂载一次）──
  const terminalRestoredRef = useRef(false)
  useEffect(() => {
    if (terminalRestoredRef.current) return
    terminalRestoredRef.current = true
    const controller = new AbortController()
    void (async () => {
      try {
        const response = await fetch('/workbench/terminal/list', { signal: controller.signal })
        const body = await response.json()
        if (body.ok !== true || !Array.isArray(body.sessions)) return
        const running = body.sessions.filter((s) => s.running === true)
        if (running.length === 0) return
        const labels = readTerminalLabels()
        setTabs((prev) => {
          let next = prev
          for (const session of running) {
            if (next.some((t) => t.featureId === 'terminal' && t.sessionId === session.id)) continue
            tabIdCounter += 1
            next = [...next, {
              id: `terminal-${tabIdCounter}-${session.id}`,
              featureId: 'terminal',
              label: typeof labels[session.id] === 'string' && labels[session.id] !== '' ? labels[session.id] : nextTerminalLabel(next),
              closable: true,
              sessionId: session.id,
            }]
          }
          return next
        })
      } catch { /* 宿主半未注册该路由（旧版本）/ 网络：静默跳过 */ }
    })()
    return () => controller.abort()
  }, [])

  // ── 终端标签 → 会话 id 映射持久化（刷新恢复的标签名来源）──
  useEffect(() => {
    const labels = {}
    for (const t of tabs) {
      if (t.featureId === 'terminal' && typeof t.sessionId === 'string') labels[t.sessionId] = t.label
    }
    writeTerminalLabels(labels)
  }, [tabs])

  // 持久化面板宽度（钳制后）。
  const writeTimerRef = useRef(null)
  const debouncedWrite = (key, value) => {
    if (writeTimerRef.current !== null) clearTimeout(writeTimerRef.current)
    writeTimerRef.current = setTimeout(() => {
      writeTimerRef.current = null
      writeStored(key, value)
    }, 150)
  }
  const widthRef = useRef(width)
  widthRef.current = width

  // ── 宽度动画（JS 逐帧 tween，与主框架左侧栏同一曲线/时长）─────────
  const tweenRef = useRef(null)
  const tweeningRef = useRef(false)
  const stopTween = () => {
    if (tweenRef.current !== null) {
      cancelAnimationFrame(tweenRef.current)
      tweenRef.current = null
    }
    tweeningRef.current = false
  }
  const animateWidthTo = (target, options = {}) => {
    const { floor = PANEL_MIN, duration = 300, persist = false, onEnd } = options
    stopTween()
    tweeningRef.current = true
    if (window.matchMedia !== undefined && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWidth(clampPanelWidth(target, maxWidthRef.current, floor))
      tweeningRef.current = false
      if (persist) writeStored(WIDTH_KEY, target)
      if (onEnd !== undefined) onEnd()
      return
    }
    const from = widthRef.current
    if (from === target) {
      tweeningRef.current = false
      if (persist) writeStored(WIDTH_KEY, target)
      if (onEnd !== undefined) onEnd()
      return
    }
    const start = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = cubicBezierEase(t)
      const next = clampPanelWidth(from + (target - from) * eased, maxWidthRef.current, floor)
      if (next !== widthRef.current) setWidth(next)
      if (t < 1) {
        tweenRef.current = requestAnimationFrame(step)
      } else {
        tweenRef.current = null
        tweeningRef.current = false
        if (persist) writeStored(WIDTH_KEY, target)
        if (onEnd !== undefined) onEnd()
      }
    }
    tweenRef.current = requestAnimationFrame(step)
  }

  // ── 两段式收起 ──
  const hidePanel = () => {
    animateWidthTo(0, {
      floor: 0,
      persist: false,
      onEnd: () => {
        setWidth(PANEL_MIN)
        writeStored(WIDTH_KEY, PANEL_MIN)
        setOpen(false)
      },
    })
  }
  const collapseOrHide = () => {
    if (panelActionFor(widthRef.current) === "shrink") {
      animateWidthTo(PANEL_MIN, { floor: PANEL_MIN, persist: true })
    } else {
      hidePanel()
    }
  }
  const openPanel = () => {
    tweeningRef.current = true
    const target = clampPanelWidth(readStored(WIDTH_KEY, PANEL_DEFAULT), maxWidthRef.current)
    setOpen(true)
    setWidth(0)
    requestAnimationFrame(() => {
      animateWidthTo(target, { floor: 0, persist: false })
    })
  }
  useEffect(() => { if (!tweeningRef.current) debouncedWrite(WIDTH_KEY, width) }, [width])
  useEffect(() => () => {
    if (writeTimerRef.current !== null) clearTimeout(writeTimerRef.current)
    stopTween()
    writeStored(WIDTH_KEY, widthRef.current)
  }, [])

  // Live max bound = frame width − sidebar's rendered width.
  useEffect(() => {
    const measure = () => {
      const el = rootRef.current
      if (el === null) return
      const layer = el.offsetParent
      const frame = layer !== null ? layer.parentElement : null
      const sidebar = frame !== null && frame.firstElementChild !== null ? frame.firstElementChild : null
      const sidebarWidth = sidebar !== null ? sidebar.getBoundingClientRect().width : 0
      const frameWidth = frame !== null ? frame.getBoundingClientRect().width : window.innerWidth
      setMaxWidth(Math.max(PANEL_MIN, Math.round(frameWidth - sidebarWidth)))
    }
    measure()
    window.addEventListener("resize", measure)
    let observer = null
    const el = rootRef.current
    const layer = el !== null ? el.offsetParent : null
    const frame = layer !== null ? layer.parentElement : null
    const sidebar = frame !== null && frame.firstElementChild !== null ? frame.firstElementChild : null
    if (sidebar !== null) {
      observer = new ResizeObserver(measure)
      observer.observe(sidebar)
    }
    return () => {
      window.removeEventListener("resize", measure)
      if (observer !== null) observer.disconnect()
    }
  }, [open])

  const maxWidthRef = useRef(maxWidth)
  useEffect(() => {
    const previous = maxWidthRef.current
    maxWidthRef.current = maxWidth
    if (maxWidth === previous) return
    if (tweeningRef.current) return
    setWidth((current) => {
      if (current >= previous - 2) return clampPanelWidth(maxWidth, maxWidth)
      return clampPanelWidth(current, maxWidth)
    })
  }, [maxWidth])

  // ── panel resize drag (left edge) ────────────────────────────────
  const resizeDragMoved = useRef(false)
  const onResizePointerDown = (event) => {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    const tweening = tweenRef.current !== null
    stopTween()
    const base = tweening ? clampPanelWidth(widthRef.current, maxWidthRef.current) : width
    if (tweening && base !== widthRef.current) setWidth(base)
    resizeOrigin.current = { x: event.clientX, width: base }
    resizeDragMoved.current = false
    setResizing(true)
  }
  const onResizePointerMove = (event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    const dx = event.clientX - resizeOrigin.current.x
    if (Math.abs(dx) > 4) resizeDragMoved.current = true
    setWidth(clampPanelWidth(resizeOrigin.current.width - dx, maxWidth))
  }
  const onResizePointerUp = (event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    event.currentTarget.releasePointerCapture(event.pointerId)
    setResizing(false)
    if (resizeDragMoved.current) { resizeDragMoved.current = false; return }
    collapseOrHide()
  }
  const onResizeDoubleClick = () => {
    stopTween()
    animateWidthTo(clampPanelWidth(PANEL_DEFAULT, maxWidthRef.current), { floor: PANEL_MIN, persist: true })
  }

  // ── Git 操作 ──
  const applyGitFacts = (body) => {
    if (body.ok !== true) { setGit({ status: "error", error: body.error || "git 查询失败" }); return }
    if (body.repo === false) {
      setGit(body.error === undefined ? { status: "not-repo" } : { status: "not-repo", error: body.error })
      return
    }
    const freshIgnored = body.ignored || []
    setGit((prev) => ({
      status: "ready",
      branch: body.branch || "",
      head: body.head || "",
      graph: body.graph || [],
      changes: body.changes || [],
      ignored: freshIgnored.length > 0 || prev.status !== "ready" ? freshIgnored : prev.ignored || [],
    }))
  }

  const loadGitState = useCallback(async (target, signal, withIgnored) => {
    setGit({ status: "loading" })
    try {
      const options = signal === undefined ? {} : { signal }
      const ignoredParam = withIgnored === true ? "&ignored=1" : ""
      const response = await fetch("/workbench/git?cwd=" + encodeURIComponent(target) + ignoredParam, options)
      if (!response.ok) { setGit({ status: "error", error: "git 查询失败（HTTP " + response.status + "）" }); return }
      const body = await response.json()
      applyGitFacts(body)
    } catch (error) {
      if (signal !== undefined && error instanceof DOMException && error.name === "AbortError") return
      setGit({ status: "error", error: messageOf(error) })
    }
  }, [])

  useEffect(() => {
    if (path === undefined) { setGit({ status: "idle" }); return }
    const controller = new AbortController()
    void loadGitState(path, controller.signal, showIgnored)
    return () => controller.abort()
  }, [path, loadGitState, showIgnored])

  // ── 目录树 ──
  const listDir = useCallback(async (dirPath, signal) => {
    const options = signal === undefined ? {} : { signal }
    const response = await fetch("/workbench/dir?path=" + encodeURIComponent(dirPath), options)
    return response.json()
  }, [])

  useEffect(() => {
    if (path === undefined) { setRoot(null); return }
    const controller = new AbortController()
    const base = {
      path,
      name: path.split("/").filter((segment) => segment !== "").pop() || path,
      type: "directory",
      hidden: false,
      expanded: true,
      loading: true,
      loaded: false,
      children: [],
    }
    setRoot(base)
    listDir(path, controller.signal).then((listing) => {
      if (controller.signal.aborted) return
      if (listing.ok !== true) {
        setRoot(Object.assign({}, base, { loading: false, error: listing.error || "目录读取失败" }))
        return
      }
      const next = Object.assign({}, base, { loading: false, loaded: true, children: (listing.entries || []).map(toNode) })
      if (listing.truncated !== undefined) next.truncated = listing.truncated
      setRoot(next)
    }).catch((error) => {
      if (controller.signal.aborted) return
      setRoot(Object.assign({}, base, { loading: false, error: messageOf(error) }))
    })
    return () => controller.abort()
  }, [path, listDir])

  const initRepo = async () => {
    if (path === undefined || initializing) return
    setInitializing(true)
    try {
      const response = await fetch("/workbench/git/init?cwd=" + encodeURIComponent(path), {
        method: "POST",
        headers: { "content-type": "application/json" },
      })
      const body = await response.json()
      if (body.ok !== true) { setGit({ status: "error", error: body.error || "仓库创建失败" }); return }
      await loadGitState(path)
    } catch (error) {
      setGit({ status: "error", error: messageOf(error) })
    } finally {
      setInitializing(false)
    }
  }

  const mutateGit = async (action, payload) => {
    if (path === undefined || mutating) return false
    setMutating(true)
    setActionError(undefined)
    try {
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        ...(payload === undefined ? {} : { body: JSON.stringify(payload) }),
      }
      const response = await fetch("/workbench/git/" + action + "?cwd=" + encodeURIComponent(path), options)
      const body = await response.json()
      if (body.ok !== true) { setActionError(body.error || "git 操作失败"); return false }
      applyGitFacts(body)
      return true
    } catch (error) {
      setActionError(messageOf(error))
      return false
    } finally {
      setMutating(false)
    }
  }

  const onToggle = (dirPath) => {
    if (root === null) return
    const node = findNode(root, dirPath)
    if (node === undefined || node.loading) return
    if (node.loaded) {
      setRoot(patchNode(root, dirPath, { expanded: !node.expanded }))
      return
    }
    setRoot(patchNode(root, dirPath, { loading: true }))
    // 路径 epoch 守卫：在途列表返回时若面板已切到别的目录，根路径
    // 会变——此时 patch 会落到新树上（同名路径可能被写入过期子项）。
    // 用根 path 是否仍等于发起时的根路径来判别并丢弃。
    const rootPathAtToggle = root.path
    listDir(dirPath).then((listing) => {
      setRoot((current) => {
        if (current === null) return current
        if (current.path !== rootPathAtToggle) return current
        const patch = { loading: false, loaded: true, expanded: true }
        if (listing.ok === true) {
          if (listing.truncated !== undefined) patch.truncated = listing.truncated
          patch.children = (listing.entries || []).map(toNode)
        } else {
          patch.error = listing.error || "目录读取失败"
        }
        return patchNode(current, dirPath, patch)
      })
    }).catch((error) => {
      setRoot((current) => {
        if (current === null || current.path !== rootPathAtToggle) return current
        return patchNode(current, dirPath, { loading: false, error: messageOf(error) })
      })
    })
  }

  const refreshNode = async (node) => {
    if (!node.loaded) return
    try {
      const listing = await listDir(node.path)
      if (listing.ok === true) {
        setRoot((current) => {
          if (current === null) return current
          const patch = { children: (listing.entries || []).map((entry) => {
            const previous = node.children.find((child) => child.path === entry.path)
            return previous === undefined ? toNode(entry) : Object.assign({}, previous, { name: entry.name, hidden: entry.hidden })
          }) }
          if (listing.truncated !== undefined) patch.truncated = listing.truncated
          return patchNode(current, node.path, patch)
        })
      }
    } catch {
      // 刷新尽力而为：失败时保留旧子树。
    }
    // 已展开的子目录并行刷新（原先串行，N 层展开要多 N 个往返）。
    await Promise.all(
      node.children
        .filter((child) => child.loaded && child.expanded)
        .map((child) => refreshNode(child)),
    )
  }

  const refresh = () => {
    if (refreshing) return
    setRefreshing(true)
    const tasks = []
    if (root !== null) tasks.push(refreshNode(root))
    if (path !== undefined) tasks.push(loadGitState(path, undefined, showIgnored))
    Promise.allSettled(tasks).then(() => setRefreshing(false))
  }

  // ── 渲染 ──
  if (!open) {
    return h(TipButton, { tip: "展开工作面板", className: "dwb-openbtn", onClick: openPanel }, "工作面板")
  }

  // ── 单个标签的内容渲染（供常驻挂载的内容区逐个调用）──────────────────
  // visible = 该标签是否为激活项；组件可据此暂停轮询/动画等实时行为。
  const renderTabContent = (tab, isActive) => {
    const feat = getFeature(tab.featureId)
    if (!feat) return null
    const visible = isActive
    if (feat.id === "files") {
      return h(FilesPanel, { visible, refreshing, root, onToggle, path, width })
    }
    if (feat.id === "git") {
      return h(GitPanel, {
        visible,
        refreshing,
        state: git,
        mutating,
        actionError,
        onInit: initRepo,
        initializing,
        onStage: (p) => void mutateGit("stage", { path: p }),
        onUnstage: (p) => void mutateGit("unstage", { path: p }),
        onStageAll: () => void mutateGit("stage-all"),
        onCommit: () => {
          const message = commitMessage.trim()
          if (message === "") return
          void mutateGit("commit", { message }).then((ok) => { if (ok) setCommitMessage("") })
        },
        onIgnore: (p) => void mutateGit("ignore", { path: p }),
        onUnignore: (p) => void mutateGit("unignore", { path: p }),
        showIgnored,
        onToggleIgnored: () => setShowIgnored((prev) => !prev),
        commitMessage,
        setCommitMessage,
      })
    }
    if (feat.id === "browser") {
      return h(BrowserView, {
        visible,
        onTitleChange: (label) => updateTabLabel(tab.id, label),
      })
    }
    if (feat.id === "terminal") {
      return h(TerminalPanel, {
        visible,
        sessionId: tab.sessionId,
        path,
        onSessionReady: (sessionId) => bindTabSession(tab.id, sessionId),
      })
    }
    if (feat.id === "taskboard") {
      // sessions：dsh 客户端会话服务（props.sessions 由 client/index.js 注入），
      // 供执行历史「查看会话」跳回对应 DSH 会话；缺失时组件自动隐藏跳转。
      return h(TaskboardPanel, { visible, sessions: props.sessions })
    }
    return h(feat.component, { visible })
  }

  return h(React.Fragment, null,
    h("div", {
      className: "dwb-resize",
      "data-dragging": resizing || undefined,
      title: "拖动调整宽度（双击重置）",
      style: { right: (width - 4) + "px" },
      onPointerDown: onResizePointerDown,
      onPointerMove: onResizePointerMove,
      onPointerUp: onResizePointerUp,
      onDoubleClick: onResizeDoubleClick,
    },
      h("div", {
        className: "dwb-resize-grip",
        title: width > PANEL_MIN ? "单击缩至最窄（双击重置）" : "单击收起面板（双击重置）",
      },
        h("span", { className: "dwb-resize-arrow" }, h(IconFrame, { size: 13 }, h("path", { d: "M9 6l6 6-6 6" }))),
      ),
    ),
    h("div", {
      ref: rootRef,
      className: "dwb-root" + (resizing ? " dwb-dragging" : ""),
      style: { width: width + "px" },
    },
      h("div", { className: "dwb-header" },
        h("span", { className: "dwb-title" }, "工作面板"),
        h("span", { className: "dwb-headerspace" }),
        h(TipButton, { tip: "刷新", className: "dwb-iconbtn", onClick: refresh, disabled: refreshing },
          h("span", { className: refreshing ? "dwb-spin" : undefined }, refreshIcon())),
        h(TipButton, { tip: "收起（再次点击关闭）", className: "dwb-iconbtn", onClick: collapseOrHide }, closeIcon()),
      ),
      // 标签栏：水平排列标签 + "+" 按钮。
      h("div", { className: "dwb-tabbar" },
        h("div", { className: "dwb-tabbar-tabs" },
          tabs.map((tab) => {
            const feat = getFeature(tab.featureId)
            const isActive = tab.id === activeTabId
            return h("div", {
              key: tab.id,
              className: "dwb-tab" + (isActive ? " dwb-tab-active" : ""),
              onClick: () => setActiveTabId(tab.id),
              title: feat ? feat.label : tab.label,
            },
              feat ? h("span", { className: "dwb-tab-icon" }, feat.icon()) : null,
              h("span", { className: "dwb-tab-label" }, tab.label),
              tab.closable
                ? h("button", {
                  type: "button",
                  className: "dwb-tab-close",
                  title: "关闭",
                  "aria-label": "关闭",
                  onClick: (event) => { event.stopPropagation(); closeTab(tab.id) },
                }, closeIcon(12))
                : null,
            )
          }),
        ),
        h("button", {
          type: "button",
          className: "dwb-tabbar-plus",
          title: "打开功能",
          onClick: () => setActiveTabId(null),
        }, "+"),
      ),
      // 内容区：所有标签【常驻挂载】，非激活的用 display:none 隐藏。
      // 参照 DSH-better-sidebar——切换标签不销毁组件，浏览器的 URL/历史、
      // 文件选中、git 状态全部保留；真正的卸载只发生在标签被【关闭】时。
      // 每个标签包一层带 key 的 .dwb-pane（= 组件实例的稳定身份）。
      // activeTabId === null 时额外叠一个功能网格首页（此时所有 pane 均隐藏）。
      h("div", { className: "dwb-content" },
        tabs.map((tab) => {
          const isActive = tab.id === activeTabId
          return h("div", {
            key: tab.id,
            className: "dwb-pane" + (isActive ? "" : " dwb-pane-hidden"),
          }, renderTabContent(tab, isActive))
        }),
        activeTabId === null ? h(FeatureGrid, { onSelect: openFeature }) : null,
      ),
    ),
  )
}

// ── 三列联动：面板宽度 ↔ 中间对话列宽度 ───────────────────────────────
export const DOCK_CENTER_FLOOR = 480
export function installDockCoupling() {
  let disposed = false
  let panelObserver = null
  let frameObserver = null
  let panelResize = null
  let panelRoot = null
  let centerCol = null
  let frameEl = null
  let retryTimer = null

  const sync = () => {
    if (disposed || centerCol === null || frameEl === null || !frameEl.isConnected) return
    if (panelRoot === null || !panelRoot.isConnected) {
      centerCol.style.marginRight = ""
      return
    }
    try {
      const panelW = panelRoot.getBoundingClientRect().width
      const sidebar = frameEl.children.length > 0 ? frameEl.children[0] : null
      const sidebarW = sidebar !== null ? sidebar.getBoundingClientRect().width : 0
      const frameW = frameEl.getBoundingClientRect().width
      const detailsOpen = !frameEl.hasAttribute("data-details-collapsed")
      let effective = 0
      if (!detailsOpen) {
        const cap = Math.max(0, frameW - sidebarW - DOCK_CENTER_FLOOR)
        effective = Math.min(panelW, cap)
      }
      centerCol.style.marginRight = Math.round(effective) + "px"
    } catch { /* 任何测量失败都保持布局不动。 */ }
  }

  const findPanelRoot = (overlayLayer) => {
    const root = overlayLayer.querySelector(".dwb-root")
    return root !== null && root.isConnected ? root : null
  }

  const attach = (overlayLayer) => {
    frameEl = overlayLayer.parentElement
    if (frameEl === null) return
    const overlayIndex = Array.prototype.indexOf.call(frameEl.children, overlayLayer)
    if (overlayIndex < 2) return
    centerCol = frameEl.children[overlayIndex - 2]
    if (centerCol === undefined) return

    frameObserver = new MutationObserver(sync)
    frameObserver.observe(frameEl, { attributes: true, attributeFilter: ["data-details-collapsed"] })

    panelResize = new ResizeObserver(sync)

    panelObserver = new MutationObserver(() => {
      const root = findPanelRoot(overlayLayer)
      if (root !== panelRoot) {
        if (panelRoot !== null) panelResize.unobserve(panelRoot)
        panelRoot = root
        if (root !== null) panelResize.observe(root)
      }
      sync()
    })
    panelObserver.observe(overlayLayer, { childList: true, subtree: true })

    panelRoot = findPanelRoot(overlayLayer)
    if (panelRoot !== null) panelResize.observe(panelRoot)
    sync()
  }

  const boot = () => {
    const layer = document.querySelector("[data-shell-overlay]")
    if (layer !== null) { attach(layer); return }
    let tries = 0
    retryTimer = setInterval(() => {
      if (disposed) { clearInterval(retryTimer); return }
      tries += 1
      const found = document.querySelector("[data-shell-overlay]")
      if (found !== null) { clearInterval(retryTimer); retryTimer = null; attach(found) }
      else if (tries >= 20) { clearInterval(retryTimer); retryTimer = null }
    }, 250)
  }

  boot()
  return () => {
    disposed = true
    if (retryTimer !== null) clearInterval(retryTimer)
    if (panelObserver !== null) panelObserver.disconnect()
    if (frameObserver !== null) frameObserver.disconnect()
    if (panelResize !== null) panelResize.disconnect()
    if (centerCol !== null) centerCol.style.marginRight = ""
  }
}
