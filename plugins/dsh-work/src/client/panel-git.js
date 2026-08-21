/**
 * dsh-work — 面板 Git 状态 hook（客户端半）。
 *
 * 拉取/刷新 /workbench/git 快照（分支/HEAD/提交图/变更/忽略），
 * 执行 init/stage/unstage/commit/ignore 等变更操作，并在成功后
 * 用返回的最新快照刷新状态。路径或「显示忽略」开关变化时自动重查。
 */
import React from 'react'
import { messageOf } from './helpers.js'

const { useState, useEffect, useCallback } = React

/**
 * Git 状态与操作。
 *
 * @param {string|undefined} path 当前工作目录（useSessions 派生；undefined = 无会话）
 * @param {boolean} showIgnored 是否携带忽略列表
 * @returns {{ git: object, initializing: boolean, mutating: boolean, actionError: string|undefined,
 *            commitMessage: string, setCommitMessage: (message: string) => void,
 *            loadGitState: (target: string, signal?: AbortSignal, withIgnored?: boolean) => Promise<void>,
 *            initRepo: () => Promise<void>, mutateGit: (action: string, payload?: object) => Promise<boolean> }}
 */
export function usePanelGit(path, showIgnored) {
  const [git, setGit] = useState({ status: "idle" })
  const [initializing, setInitializing] = useState(false)
  const [mutating, setMutating] = useState(false)
  const [actionError, setActionError] = useState(undefined)
  const [commitMessage, setCommitMessage] = useState("")

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

  return {
    git, initializing, mutating, actionError, commitMessage, setCommitMessage,
    loadGitState, initRepo, mutateGit,
  }
}
