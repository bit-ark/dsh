/**
 * dsh-work taskboard — TaskboardPanel：功能区标签内的五列任务看板。
 *
 * UI 结构与交互移植自 zhu1090093659/dsh-web-ui packages/dsh-task-board
 * 的客户端半（Apache-2.0）：五列看板 + 搜索 + 任务详情 + 归档视图 + 新建任务。
 * 差异：不做中央列接管与侧边栏注入（那是外壳级技巧），本组件是 dsh-work
 * 标签系统里的普通功能标签；不做 SSE，标签可见时 5s 轮询 + 动作后即时刷新。
 *
 * Host 权威：浏览器动作只有经 Host 确认（action 返回的 snapshot）才成为 UI 状态。
 */
import React from 'react'
import { fetchOptions, fetchState, sendAction } from './api.js'
import { formatHostTimestamp, formatTime } from './format.js'
import { TaskDetail } from './detail.js'
import { NewTaskModal, ConfirmDialog } from './new-task.js'
const h = React.createElement
const { useCallback, useEffect, useMemo, useRef, useState } = React

const POLL_MS = 5_000

/** 五列看板，按显示顺序（与 Host domain.js COLUMNS 一致）。 */
export const COLUMNS = [
  { status: 'backlog', label: '待规划' },
  { status: 'todo', label: '待办' },
  { status: 'running', label: '进行中' },
  { status: 'done', label: '已完成' },
  { status: 'failed', label: '已失败' },
]

const STATUS_LABEL = Object.fromEntries(COLUMNS.map((column) => [column.status, column.label]))

/** 大小写不敏感的标题/描述过滤。 */
function matchesFilter(task, filter) {
  if (filter.trim() === '') return true
  const needle = filter.trim().toLowerCase()
  return task.title.toLowerCase().includes(needle) || task.description.toLowerCase().includes(needle)
}

function executionLabel(execution) {
  if (execution.result === 'succeeded') return '成功'
  if (execution.result === 'failed') return '失败'
  if (execution.result === 'cancelled') return '已取消'
  return '运行中'
}

/** 单张任务卡片：点击打开详情，绝不直接执行（执行按钮在详情里）。 */
function TaskCard(props) {
  const { task, pending, timeZone, onOpen } = props
  const latest = task.executions[task.executions.length - 1]
  const runs = task.executions.length
  const archived = task.archivedAt !== undefined
  return h('button', {
    type: 'button',
    className: 'dwb-tb-card',
    'data-status': archived ? 'archived' : task.status,
    onClick: () => onOpen(task.id),
    title: task.description !== '' ? task.description : task.title,
  },
    h('span', { className: 'dwb-tb-card-title' }, task.title),
    task.description !== '' ? h('span', { className: 'dwb-tb-card-excerpt' }, task.description) : null,
    h('span', { className: 'dwb-tb-card-meta' },
      h('span', { className: 'dwb-tb-card-time' }, formatTime(task.updatedAt, timeZone)),
      !archived && task.schedule?.enabled === true
        ? h('span', {
          className: 'dwb-tb-card-schedule',
          // nextRunAt 总是未来时刻：用绝对时间显示（formatTime 对未来时间会误显"刚刚"）。
          title: '定时任务' + (task.schedule.nextRunAt !== undefined ? ` · 下次 ${formatHostTimestamp(task.schedule.nextRunAt, timeZone)}` : ''),
        }, '⏰')
        : null,
      latest !== undefined ? h('span', { className: 'dwb-tb-card-run', 'data-result': archived ? undefined : latest.result }, `${runs} 次执行`) : null,
      latest?.sessionId !== undefined ? h('span', { className: 'dwb-tb-card-session', title: latest.sessionId }, '⌁') : null,
      !archived && (task.status === 'running' || pending) ? h('span', { className: 'dwb-tb-spinner', 'aria-hidden': true }) : null,
    ),
    !archived && pending ? h('span', { className: 'dwb-tb-card-running' }, '提交中…') : null,
    !archived && latest !== undefined && executionLabel(latest) === '运行中'
      ? h('span', { className: 'dwb-tb-card-running' }, '执行中…')
      : null,
  )
}

/**
 * 任务看板标签组件。
 * props:
 *  - visible: 是否激活标签（隐藏时暂停轮询）。
 *  - sessions: dsh 客户端 sessions 服务（跳回执行会话；缺失时隐藏跳转）。
 */
export function TaskboardPanel(props) {
  const { visible, sessions } = props
  const [snapshot, setSnapshot] = useState(undefined)
  const [options, setOptions] = useState({ workspaces: [], presets: [], permissions: [] })
  const [error, setError] = useState(undefined)
  // taskId → 在途动作计数：同一任务并发两个动作时，第一个完成不应解除 pending。
  const [pendingIds, setPendingIds] = useState(() => new Map())
  const [filter, setFilter] = useState('')
  const [selectedId, setSelectedId] = useState(undefined)
  const [showNew, setShowNew] = useState(false)
  const [archiveView, setArchiveView] = useState(false)
  // 已接受的最大 revision：轮询与动作响应可能乱序到达，低 revision 的
  // 旧快照必须丢弃，防止卡片回跳/已删任务闪现（参考实现 controller 同款防护）。
  const maxRevisionRef = useRef(0)
  // refresh 在途守卫：避免并发轮询叠加乱序。
  const refreshInFlightRef = useRef(false)

  /** 接受 Host 快照：仅 revision 不低于已接受的才允许覆盖状态。 */
  const acceptSnapshot = useCallback((next) => {
    if (next.revision < maxRevisionRef.current) return
    maxRevisionRef.current = next.revision
    setSnapshot(next)
    setError(undefined)
  }, [])

  const refresh = useCallback(async () => {
    if (refreshInFlightRef.current) return
    refreshInFlightRef.current = true
    try {
      const state = await fetchState()
      acceptSnapshot(state)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      refreshInFlightRef.current = false
    }
  }, [acceptSnapshot])

  // 首次挂载：拉 snapshot 与执行目标选项。
  useEffect(() => {
    void refresh()
    fetchOptions().then(setOptions).catch(() => { /* 选项失败保持空列表 */ })
  }, [refresh])

  // 激活时 5s 轮询 + 页面恢复可见时补拉；隐藏时暂停。
  useEffect(() => {
    if (visible !== true) return undefined
    // 页面切到后台时跳过轮询（visibilitychange 回前台会补拉一次）。
    const timer = setInterval(() => { if (document.visibilityState === 'visible') void refresh() }, POLL_MS)
    const onVisible = () => { if (document.visibilityState === 'visible') void refresh() }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [visible, refresh])

  /**
   * 提交动作：Host 返回的 snapshot 是唯一已确认状态。
   * @returns {Promise<{ snapshot?: object, error?: string }>}
   *   成功携带 snapshot；失败携带错误消息（供模态等调用方直接展示）。
   */
  const act = useCallback(async (action, taskId) => {
    if (taskId !== undefined) {
      setPendingIds((prev) => {
        const copy = new Map(prev)
        copy.set(taskId, (copy.get(taskId) ?? 0) + 1)
        return copy
      })
    }
    try {
      const next = await sendAction(action)
      acceptSnapshot(next)
      return { snapshot: next }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      return { error: message }
    } finally {
      if (taskId !== undefined) {
        setPendingIds((prev) => {
          const copy = new Map(prev)
          const count = (copy.get(taskId) ?? 0) - 1
          if (count <= 0) copy.delete(taskId)
          else copy.set(taskId, count)
          return copy
        })
      }
    }
  }, [acceptSnapshot])

  const openSession = useCallback((sessionId) => {
    if (sessions === undefined || typeof sessions.open !== 'function') return
    try {
      sessions.open(sessionId)
    } catch (err) {
      setError(`无法打开会话：${err instanceof Error ? err.message : String(err)}`)
    }
  }, [sessions])

  const tasks = snapshot?.tasks ?? []
  const timeZone = snapshot?.scheduler.timeZone
  // Host 侧调度器告警（账本损坏隔离、坏 cron 解除武装等），需上屏让用户
  // 知道"定时任务为什么不跑"。
  const schedulerError = snapshot?.scheduler.error
  // 归档任务离开列；归档视图单独展示。
  const boardTasks = useMemo(
    () => tasks
      .filter((task) => (archiveView ? task.archivedAt !== undefined : task.archivedAt === undefined) && matchesFilter(task, filter))
      // 最近更新的任务浮在列首（ledger 插入序不会随更新重排）。
      .sort((a, b) => b.updatedAt - a.updatedAt),
    [tasks, archiveView, filter],
  )
  const selected = selectedId !== undefined ? tasks.find((task) => task.id === selectedId) : undefined
  const archivedCount = tasks.filter((task) => task.archivedAt !== undefined).length

  return h('div', { className: 'dwb-tb' },
    h('header', { className: 'dwb-tb-header' },
      h('h3', { className: 'dwb-tb-title' }, '任务看板'),
      snapshot !== undefined
        ? h('span', { className: 'dwb-tb-meta' }, `rev ${snapshot.revision} · ${timeZone ?? ''}`)
        : null,
      h('input', {
        className: 'dwb-tb-search',
        type: 'search',
        placeholder: '搜索任务…',
        value: filter,
        onChange: (event) => setFilter(event.target.value),
        'aria-label': '搜索任务',
      }),
      h('button', {
        type: 'button',
        className: archiveView ? 'dwb-tb-btn dwb-tb-btn-primary' : 'dwb-tb-btn',
        onClick: () => setArchiveView((prev) => !prev),
      }, archiveView ? '返回看板' : `归档 (${archivedCount})`),
      h('button', {
        type: 'button',
        className: 'dwb-tb-btn dwb-tb-btn-primary',
        onClick: () => {
          setShowNew(true)
          // 工作区/预设可能在挂载后变化：每次打开模态都重拉选项。
          fetchOptions().then(setOptions).catch(() => { /* 失败保持已有选项 */ })
        },
      }, '+ 新建任务'),
    ),

    error !== undefined
      ? h('div', { className: 'dwb-tb-error' },
        // 错误既可能是传输故障，也可能是 Host 业务拒绝，用中性文案。
        `操作失败：${error} `,
        h('button', { type: 'button', className: 'dwb-tb-linkbtn', onClick: () => void refresh() }, '重试'),
      )
      : null,

    schedulerError !== undefined && schedulerError !== ''
      ? h('div', { className: 'dwb-tb-error' }, `调度器异常：${schedulerError}`)
      : null,

    snapshot === undefined && error === undefined
      ? h('div', { className: 'dwb-tb-columns' },
        h('section', { className: 'dwb-tb-column' },
          h('div', { className: 'dwb-tb-column-empty' }, '正在加载任务看板…')))
      : h('div', { className: 'dwb-tb-columns' },
      archiveView
        ? h('section', { className: 'dwb-tb-column', 'data-status': 'archived' },
          h('header', { className: 'dwb-tb-column-header' },
            h('h4', { className: 'dwb-tb-column-title' }, '归档'),
            h('span', { className: 'dwb-tb-column-count' }, String(boardTasks.length)),
          ),
          h('div', { className: 'dwb-tb-cards' },
            boardTasks.map((task) => h(TaskCard, {
              key: task.id,
              task,
              pending: pendingIds.has(task.id),
              timeZone,
              onOpen: setSelectedId,
            })),
            boardTasks.length === 0 ? h('div', { className: 'dwb-tb-column-empty' }, '没有归档任务') : null,
          ),
        )
        : COLUMNS.map((column) => {
          const columnTasks = boardTasks.filter((task) => task.status === column.status)
          return h('section', { key: column.status, className: 'dwb-tb-column', 'data-status': column.status },
            h('header', { className: 'dwb-tb-column-header' },
              h('span', { className: 'dwb-tb-statusdot', 'data-status': column.status, 'aria-hidden': true }),
              h('h4', { className: 'dwb-tb-column-title' }, column.label),
              h('span', { className: 'dwb-tb-column-count' }, String(columnTasks.length)),
            ),
            h('div', { className: 'dwb-tb-cards' },
              columnTasks.map((task) => h(TaskCard, {
                key: task.id,
                task,
                pending: pendingIds.has(task.id),
                timeZone,
                onOpen: setSelectedId,
              })),
              columnTasks.length === 0 ? h('div', { className: 'dwb-tb-column-empty' }, '空') : null,
            ),
          )
        })),

    selected !== undefined
      ? h(TaskDetail, {
        task: selected,
        pending: pendingIds.has(selected.id),
        error,
        options,
        timeZone,
        sessions,
        statusLabel: STATUS_LABEL,
        onClose: () => setSelectedId(undefined),
        act,
        onRetry: () => void refresh(),
        openSession,
        onDeleted: () => setSelectedId(undefined),
      })
      : null,
    showNew
      ? h(NewTaskModal, {
        options,
        timeZone,
        onClose: () => setShowNew(false),
        act,
      })
      : null,
  )
}

export { ConfirmDialog }
