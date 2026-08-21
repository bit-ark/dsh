/**
 * dsh-work — WorkbenchPanel：右侧停靠面板（shell.overlay）+ 三列联动。
 *
 * 重构为多实例标签页架构：
 *   - 功能注册表（features.js）声明所有可用功能
 *   - 标签系统管理功能实例（单实例 Files/Git + 多实例 Browser/Terminal）
 *   - 无激活标签时显示功能网格首页（类似浏览器新标签页）
 *   - "+" 按钮打开功能网格，点击功能卡片创建新标签
 *
 * 本文件只做组装与渲染：宽度/展开几何、标签系统、Git 状态、目录树分别
 * 拆在 panel-geometry.js / panel-tabs.js / panel-git.js / panel-tree.js。
 */
import React from 'react'
import { TipButton } from './tip.js'
import { PANEL_MIN } from './helpers.js'
import { closeIcon, IconFrame, refreshIcon } from './icons.js'
import { FilesPanel } from './files-panel.js'
import { GitPanel } from './git-panel.js'
import { BrowserView } from './browser-view.js'
import { TerminalPanel } from './terminal-panel.js'
import { TaskboardPanel } from './taskboard/panel.js'
import { FeatureGrid } from './feature-grid.js'
import { getFeature } from './features.js'
import { usePanelGeometry } from './panel-geometry.js'
import { usePanelTabs } from './panel-tabs.js'
import { usePanelGit } from './panel-git.js'
import { useDirTree } from './panel-tree.js'
const h = React.createElement
const { useState, useEffect } = React

/**
 * 工作面板组件：右侧停靠的多实例标签面板。
 *
 * 状态由四个 hook 分管（几何/标签/Git/目录树），本组件负责把状态
 * 组装成各功能标签的 props 并渲染整个面板外壳。
 */
export function WorkbenchPanel(props) {
  const useSessions = props.useSessions
  const cwd = typeof useSessions === "function"
    ? useSessions((list) => {
      if (list.current === undefined) return undefined
      const row = list.byId[list.current]
      return row === undefined ? undefined : row.cwd
    })
    : undefined
  const [showIgnored, setShowIgnored] = useState(false)

  // 各功能 hook：几何（宽度/展开/动画）、标签、Git、目录树。
  const geometry = usePanelGeometry()
  const tabs = usePanelTabs({ widenForTaskboard: geometry.widenForTaskboard })
  const git = usePanelGit(cwd, showIgnored)
  const tree = useDirTree(cwd)

  // 工作目录 = 当前会话的 cwd（不再提供手动路径输入）。
  const path = cwd
  useEffect(() => { git.setCommitMessage("") }, [path])

  // 整面板刷新：目录树 + Git 状态并行，全部结束后解除刷新态。
  const refresh = () => {
    if (tree.refreshing) return
    tree.setRefreshing(true)
    const tasks = []
    if (tree.root !== null) tasks.push(tree.refreshNode(tree.root))
    if (path !== undefined) tasks.push(git.loadGitState(path, undefined, showIgnored))
    Promise.allSettled(tasks).then(() => tree.setRefreshing(false))
  }

  // ── 渲染 ──
  if (!geometry.open) {
    return h(TipButton, { tip: "展开工作面板", className: "dwb-openbtn", onClick: geometry.openPanel }, "工作面板")
  }

  // ── 单个标签的内容渲染（供常驻挂载的内容区逐个调用）──────────────────
  // visible = 该标签是否为激活项；组件可据此暂停轮询/动画等实时行为。
  const renderTabContent = (tab, isActive) => {
    const feat = getFeature(tab.featureId)
    if (!feat) return null
    const visible = isActive
    if (feat.id === "files") {
      return h(FilesPanel, { visible, refreshing: tree.refreshing, root: tree.root, onToggle: tree.onToggle, path, width: geometry.width })
    }
    if (feat.id === "git") {
      return h(GitPanel, {
        visible,
        refreshing: tree.refreshing,
        state: git.git,
        mutating: git.mutating,
        actionError: git.actionError,
        onInit: git.initRepo,
        initializing: git.initializing,
        onStage: (p) => void git.mutateGit("stage", { path: p }),
        onUnstage: (p) => void git.mutateGit("unstage", { path: p }),
        onStageAll: () => void git.mutateGit("stage-all"),
        onCommit: () => {
          const message = git.commitMessage.trim()
          if (message === "") return
          void git.mutateGit("commit", { message }).then((ok) => { if (ok) git.setCommitMessage("") })
        },
        onIgnore: (p) => void git.mutateGit("ignore", { path: p }),
        onUnignore: (p) => void git.mutateGit("unignore", { path: p }),
        showIgnored,
        onToggleIgnored: () => setShowIgnored((prev) => !prev),
        commitMessage: git.commitMessage,
        setCommitMessage: git.setCommitMessage,
      })
    }
    if (feat.id === "browser") {
      return h(BrowserView, {
        visible,
        onTitleChange: (label) => tabs.updateTabLabel(tab.id, label),
      })
    }
    if (feat.id === "terminal") {
      return h(TerminalPanel, {
        visible,
        sessionId: tab.sessionId,
        path,
        onSessionReady: (sessionId) => tabs.bindTabSession(tab.id, sessionId),
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
      "data-dragging": geometry.resizing || undefined,
      title: "拖动调整宽度（双击重置）",
      style: { right: (geometry.width - 4) + "px" },
      onPointerDown: geometry.onResizePointerDown,
      onPointerMove: geometry.onResizePointerMove,
      onPointerUp: geometry.onResizePointerUp,
      onDoubleClick: geometry.onResizeDoubleClick,
    },
      h("div", {
        className: "dwb-resize-grip",
        title: geometry.width > PANEL_MIN ? "单击缩至最窄（双击重置）" : "单击收起面板（双击重置）",
      },
        h("span", { className: "dwb-resize-arrow" }, h(IconFrame, { size: 13 }, h("path", { d: "M9 6l6 6-6 6" }))),
      ),
    ),
    h("div", {
      ref: geometry.rootRef,
      className: "dwb-root" + (geometry.resizing ? " dwb-dragging" : ""),
      style: { width: geometry.width + "px" },
    },
      h("div", { className: "dwb-header" },
        h("span", { className: "dwb-title" }, "工作面板"),
        h("span", { className: "dwb-headerspace" }),
        h(TipButton, { tip: "刷新", className: "dwb-iconbtn", onClick: refresh, disabled: tree.refreshing },
          h("span", { className: tree.refreshing ? "dwb-spin" : undefined }, refreshIcon())),
        h(TipButton, { tip: "收起（再次点击关闭）", className: "dwb-iconbtn", onClick: geometry.collapseOrHide }, closeIcon()),
      ),
      // 标签栏：水平排列标签 + "+" 按钮。
      h("div", { className: "dwb-tabbar" },
        h("div", { className: "dwb-tabbar-tabs" },
          tabs.tabs.map((tab) => {
            const feat = getFeature(tab.featureId)
            const isActive = tab.id === tabs.activeTabId
            return h("div", {
              key: tab.id,
              className: "dwb-tab" + (isActive ? " dwb-tab-active" : ""),
              onClick: () => tabs.setActiveTabId(tab.id),
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
                  onClick: (event) => { event.stopPropagation(); tabs.closeTab(tab.id) },
                }, closeIcon(12))
                : null,
            )
          }),
        ),
        h("button", {
          type: "button",
          className: "dwb-tabbar-plus",
          title: "打开功能",
          onClick: () => tabs.setActiveTabId(null),
        }, "+"),
      ),
      // 内容区：所有标签【常驻挂载】，非激活的用 display:none 隐藏。
      // 参照 DSH-better-sidebar——切换标签不销毁组件，浏览器的 URL/历史、
      // 文件选中、git 状态全部保留；真正的卸载只发生在标签被【关闭】时。
      // 每个标签包一层带 key 的 .dwb-pane（= 组件实例的稳定身份）。
      // activeTabId === null 时额外叠一个功能网格首页（此时所有 pane 均隐藏）。
      h("div", { className: "dwb-content" },
        tabs.tabs.map((tab) => {
          const isActive = tab.id === tabs.activeTabId
          return h("div", {
            key: tab.id,
            className: "dwb-pane" + (isActive ? "" : " dwb-pane-hidden"),
          }, renderTabContent(tab, isActive))
        }),
        tabs.activeTabId === null ? h(FeatureGrid, { onSelect: tabs.openFeature }) : null,
      ),
    ),
  )
}

/** 三列联动下中间对话列的最小保底宽度（面板过宽时对话列不再让位）。 */
export const DOCK_CENTER_FLOOR = 480
/**
 * 三列联动：面板宽度 ↔ 中间对话列宽度。
 *
 * 监听 shell overlay 树变化与面板 resize，把面板宽度折算为对话列的
 * margin-right；返回卸载函数（断开观察器并还原 margin）。
 */
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
