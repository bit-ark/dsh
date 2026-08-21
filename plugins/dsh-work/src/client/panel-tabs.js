/**
 * dsh-work — 面板标签系统 hook（客户端半）。
 *
 * 管理标签列表与激活标签：打开/关闭/改名、终端会话回写、刷新后凭
 * localStorage 映射 + 宿主存活会话重建终端标签。标签 id 用模块级计数器
 * 保证多实例全局唯一（同一毫秒连开两个标签不会撞 id）。
 */
import React from 'react'
import { getFeature } from './features.js'

const { useState, useEffect, useCallback, useRef } = React

// 初始标签为空：默认只显示"+"按钮，点击后展示功能网格。
const INITIAL_TABS = []

// 标签 id 单调计数器：不能只用 Date.now()——同一毫秒内连开两个标签会撞 id，
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

/**
 * 标签系统：列表 + 激活标签 + 打开/关闭/改名/会话回写。
 *
 * @param {{ widenForTaskboard: () => void }} options 打开任务看板标签前的
 *        自动加宽回调（由面板几何 hook 提供，五列看板需要横向空间）
 * @returns {{ tabs: Array, activeTabId: string|null, setActiveTabId: (id: string|null) => void,
 *            openFeature: (featureId: string, opts?: object) => void,
 *            closeTab: (tabId: string) => void, updateTabLabel: (tabId: string, label: string) => void,
 *            bindTabSession: (tabId: string, sessionId: string) => void }}
 */
export function usePanelTabs({ widenForTaskboard }) {
  const [tabs, setTabs] = useState(INITIAL_TABS)
  // activeTabId = null 表示首页网格（无激活标签）。
  const [activeTabId, setActiveTabId] = useState(null)

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
  }, [tabs, widenForTaskboard])

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

  return { tabs, activeTabId, setActiveTabId, openFeature, closeTab, updateTabLabel, bindTabSession }
}
