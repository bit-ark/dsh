/**
 * dsh-work — 面板目录树 hook（客户端半）。
 *
 * 维护以当前会话 cwd 为根的目录树：初始加载、节点展开/折叠（惰性
 * 加载子目录）、整树刷新（已展开子树并行）。路径变化时整树重建。
 */
import React from 'react'
import { findNode, messageOf, patchNode, toNode } from './helpers.js'

const { useState, useEffect, useCallback } = React

/**
 * 目录树状态与交互。
 *
 * @param {string|undefined} path 当前工作目录（undefined = 无会话）
 * @returns {{ root: object|null, refreshing: boolean, setRefreshing: (refreshing: boolean) => void,
 *            onToggle: (dirPath: string) => void, refreshNode: (node: object) => Promise<void> }}
 */
export function useDirTree(path) {
  const [root, setRoot] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

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

  return { root, refreshing, setRefreshing, onToggle, refreshNode }
}
