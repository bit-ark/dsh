/**
 * dsh-work — FilesPanel：自包含的目录树 + 文件预览面板。
 *
 * 从 WorkbenchPanel 提取，管理自己的选中状态、分栏宽度、分栏拖拽。
 * 接收 refreshing / root / onToggle / path 等 props，渲染目录树或分栏视图。
 */
import React from 'react'
import { TipButton } from './tip.js'
import { CONTENT_MIN, TREE_MIN, TREE_DEFAULT, SPLIT_KEY, clampTreeWidth, readStored, writeStored } from './helpers.js'
import { FilesView } from './files-view.js'
import { FilePreview } from './preview.js'
import { closeIcon } from './icons.js'
const h = React.createElement
const { useState, useRef, useEffect, useCallback } = React

export function FilesPanel(props) {
  const { refreshing, root, onToggle, path, width } = props
  const [selected, setSelected] = useState(null)
  const [treeWidth, setTreeWidth] = useState(() => readStored(SPLIT_KEY, TREE_DEFAULT))
  const [splitting, setSplitting] = useState(false)
  const splitOrigin = useRef({ x: 0, width: treeWidth })
  const treeWidthRef = useRef(treeWidth)
  treeWidthRef.current = treeWidth

  // 路径切换时清除选中。
  useEffect(() => { setSelected(null) }, [path])

  // 分栏宽度随面板变窄同步钳回。
  const prevWidthRef = useRef(width)
  useEffect(() => {
    const previous = prevWidthRef.current
    prevWidthRef.current = width
    if (width >= previous) return
    setTreeWidth((current) => {
      const next = clampTreeWidth(current, width)
      return next === current ? current : next
    })
  }, [width])

  // 分栏宽度持久化（防抖）。
  const writeTimerRef = useRef(null)
  useEffect(() => {
    if (writeTimerRef.current !== null) clearTimeout(writeTimerRef.current)
    writeTimerRef.current = setTimeout(() => {
      writeTimerRef.current = null
      writeStored(SPLIT_KEY, treeWidth)
    }, 150)
  }, [treeWidth])
  useEffect(() => () => {
    if (writeTimerRef.current !== null) clearTimeout(writeTimerRef.current)
    writeStored(SPLIT_KEY, treeWidthRef.current)
  }, [])

  const onSelect = useCallback((node) => {
    setSelected(node)
  }, [])

  const onClosePreview = useCallback(() => {
    setSelected(null)
  }, [])

  // 分栏拖拽。
  const onDividerPointerDown = useCallback((event) => {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    splitOrigin.current = { x: event.clientX, width: treeWidth }
    setSplitting(true)
  }, [treeWidth])

  const onDividerPointerMove = useCallback((event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    const dx = event.clientX - splitOrigin.current.x
    setTreeWidth(clampTreeWidth(splitOrigin.current.width + dx, width))
  }, [width])

  const onDividerPointerUp = useCallback((event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    event.currentTarget.releasePointerCapture(event.pointerId)
    setSplitting(false)
  }, [])

  // 两栏常驻：选中了文件即分栏。
  const splitMode = selected !== null

  if (path === undefined) {
    return h("div", { className: "dwb-scroll" }, h("div", { className: "dwb-note" }, "无工作目录（未选择会话）"))
  }

  if (splitMode) {
    return h("div", { className: "dwb-split" + (splitting ? " dwb-split-dragging" : "") },
      h("div", { className: "dwb-split-pane", style: { width: treeWidth + "px" } },
        h(FilesView, { refreshing, root, onToggle, selected, onSelect })),
      h("div", {
        className: "dwb-split-divider",
        "data-dragging": splitting || undefined,
        onPointerDown: onDividerPointerDown,
        onPointerMove: onDividerPointerMove,
        onPointerUp: onDividerPointerUp,
      }),
      h("div", { className: "dwb-split-pane", style: { flex: 1 } },
        h(FilePreview, { file: selected, back: false, onClose: onClosePreview })),
    )
  }

  return h(FilesView, { refreshing, root, onToggle, selected, onSelect })
}
