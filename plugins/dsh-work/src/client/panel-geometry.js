/**
 * dsh-work — 面板几何 hook（客户端半）。
 *
 * 面板宽度/最大宽度/展开状态 + JS 逐帧宽度动画（与主框架左侧栏同曲线）、
 * 两段式收起、左缘拖拽调宽、宽度持久化、实时最大宽度测量。任务看板
 * 打开前的自动加宽也在这里（五列需要横向空间）。
 */
import React from 'react'
import { AUTO_WIDEN, PANEL_DEFAULT, PANEL_MIN, WIDTH_KEY, clampPanelWidth, cubicBezierEase, panelActionFor, readStored, writeStored } from './helpers.js'

const { useState, useEffect, useRef } = React

/**
 * 面板几何状态与交互。
 *
 * @returns {{ open: boolean, setOpen: (open: boolean) => void, width: number,
 *            maxWidth: number, resizing: boolean, rootRef: import('react').RefObject,
 *            widenForTaskboard: () => void, animateWidthTo: (target: number, options?: object) => void,
 *            collapseOrHide: () => void, openPanel: () => void,
 *            onResizePointerDown: (event: object) => void, onResizePointerMove: (event: object) => void,
 *            onResizePointerUp: (event: object) => void, onResizeDoubleClick: () => void }}
 */
export function usePanelGeometry() {
  const [open, setOpen] = useState(false)
  // Panel geometry: persisted width + live max bound.
  const [width, setWidth] = useState(() => Math.max(PANEL_MIN, readStored(WIDTH_KEY, PANEL_DEFAULT)))
  const [maxWidth, setMaxWidth] = useState(() => window.innerWidth - PANEL_MIN)
  const [resizing, setResizing] = useState(false)
  const rootRef = useRef(null)
  const resizeOrigin = useRef({ x: 0, width })

  // ── 任务看板自动加宽 ──
  // 打开看板标签时把面板自动加宽（已够宽则不动）。闭包在渲染完成后的点击
  // 时刻执行，widthRef/animateWidthTo/maxWidthRef 均已就绪。
  const widenForTaskboard = () => {
    const desired = Math.round(Math.min(Math.max(window.innerWidth * 0.6, AUTO_WIDEN), window.innerWidth * 0.85))
    const target = clampPanelWidth(desired, maxWidthRef.current, PANEL_MIN)
    if (target > widthRef.current + 2) animateWidthTo(target, { floor: PANEL_MIN, persist: true })
  }

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

  return {
    open, setOpen, width, maxWidth, resizing, rootRef,
    widenForTaskboard, animateWidthTo, collapseOrHide, openPanel,
    onResizePointerDown, onResizePointerMove, onResizePointerUp, onResizeDoubleClick,
  }
}
