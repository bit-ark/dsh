/**
 * dsh-work taskboard — 任务领域模型：生命周期状态、任务记录形状、纯状态转移。
 *
 * Ported from zhu1090093659/dsh-web-ui packages/dsh-task-board
 * src/core/tasks.ts (Apache-2.0).
 *
 * 框架无关（无 cordis、无运行时导入），状态机可独立单测。
 */
import { isValidCron, nextRunAtMs } from './schedule.js'

/** 可归档的已结算状态。 */
export const ARCHIVABLE_STATUSES = ['done', 'failed']

/** 任务可钉住的权限预设（/permission <id> 的 id）。 */
export const TASK_PERMISSIONS = ['read-only', 'workspace-write', 'danger-full-access']

/**
 * @param {unknown} value
 * @returns {value is 'read-only' | 'workspace-write' | 'danger-full-access'}
 */
export function isTaskPermission(value) {
  return typeof value === 'string' && TASK_PERMISSIONS.includes(value)
}

/** 五列看板，按显示顺序。 */
export const COLUMNS = [
  { status: 'backlog', label: '待规划' },
  { status: 'todo', label: '待办' },
  { status: 'running', label: '进行中' },
  { status: 'done', label: '已完成' },
  { status: 'failed', label: '已失败' },
]

/** 用户可手动移动卡片到的状态（执行态归运行器所有）。 */
export const MANUAL_STATUSES = ['backlog', 'todo']

/** 全部合法状态（封闭并集守卫）。 */
export const ALL_STATUSES = ['backlog', 'todo', 'running', 'done', 'failed']

/** 未知字符串是否为状态。 */
export function isTaskStatus(value) {
  return typeof value === 'string' && ALL_STATUSES.includes(value)
}

/** 从给定状态出发是否允许手动移动到目标列。 */
export function canMoveManually(from, to) {
  return from !== 'running' && MANUAL_STATUSES.includes(to)
}

/** 归一化一个可选执行目标字符串：trim；空白收敛为 undefined。 */
export function normalizeTargetId(value) {
  const trimmed = value?.trim()
  return trimmed === undefined || trimmed === '' ? undefined : trimmed
}

/**
 * 由用户输入创建任务。
 * @param {{ title: string, description: string, prompt: string, workspaceId?: string, mode?: string, permission?: string, schedule?: { enabled: boolean, cron: string } }} input
 * @param {number} now 毫秒纪元。
 * @param {string} id 任务 id。
 */
export function createTask(input, now, id) {
  return {
    id,
    title: input.title.trim(),
    description: input.description.trim(),
    prompt: input.prompt.trim(),
    status: 'todo',
    createdAt: now,
    updatedAt: now,
    executions: [],
    workspaceId: normalizeTargetId(input.workspaceId),
    mode: normalizeTargetId(input.mode),
    permission: isTaskPermission(input.permission) ? input.permission : undefined,
  }
}

/** 克隆任务并更新状态与 updatedAt。 */
export function withStatus(task, status, now) {
  return { ...task, status, updatedAt: now }
}

/**
 * 把调度补丁合并进任务的调度规则（不存在则创建），并刷新 updatedAt。
 * 补丁中出现的键覆盖当前值——包括显式 undefined（用于解除 nextRunAt）；
 * 未出现的键保持当前值。
 */
export function withSchedule(task, patch, now) {
  const current = task.schedule
  const schedule = {
    enabled: current?.enabled ?? false,
    cron: current?.cron ?? '',
    nextRunAt: current?.nextRunAt,
    lastTriggeredAt: current?.lastTriggeredAt,
  }
  if ('enabled' in patch) schedule.enabled = patch.enabled ?? false
  if ('cron' in patch) schedule.cron = patch.cron ?? ''
  if ('nextRunAt' in patch) schedule.nextRunAt = patch.nextRunAt
  if ('lastTriggeredAt' in patch) schedule.lastTriggeredAt = patch.lastTriggeredAt
  return { ...task, updatedAt: now, schedule }
}

/**
 * 在任务上开启一次新执行：移入 'running' 并追加运行中执行记录。
 * @returns {{ task: object, execution: object }}
 */
export function startExecution(task, now, executionId) {
  const execution = {
    id: executionId,
    sessionId: undefined,
    startedAt: now,
    endedAt: undefined,
    result: undefined,
    error: undefined,
  }
  return {
    task: { ...task, status: 'running', updatedAt: now, executions: [...task.executions, execution] },
    execution,
  }
}

/**
 * 结算一次运行中的执行：记录结果并把任务移入对应列。执行不是任务最新一条
 * 或已结算时为 no-op（原样返回输入任务）。
 * @param {'succeeded' | 'failed' | 'cancelled'} outcome
 */
export function settleExecution(task, executionId, outcome, now, error) {
  const index = task.executions.findIndex(execution => execution.id === executionId)
  if (index === -1) return task
  const execution = task.executions[index]
  if (execution.endedAt !== undefined) return task
  const settled = { ...execution, endedAt: now, result: outcome, error }
  const executions = [...task.executions]
  executions[index] = settled
  const status = outcome === 'succeeded' ? 'done'
    : outcome === 'failed' ? 'failed'
      : task.status === 'running' ? 'todo' : task.status
  return { ...task, status, updatedAt: now, executions }
}

/** 结算执行摘要（详情视图用）。 */
export function executionLabel(execution) {
  if (execution.result === 'succeeded') return 'succeeded'
  if (execution.result === 'failed') return 'failed'
  if (execution.result === 'cancelled') return 'cancelled'
  return 'running'
}

// ── 用例（上游 src/core/use-cases/*，均为纯账本转移） ──────────────────────

/** 创建任务：空白标题拒绝；合法启用的调度立即武装。 */
export function applyCreateTask(tasks, input, now, id) {
  if (input.title.trim() === '') return { task: undefined, tasks }
  let task = createTask(input, now, id)
  const requested = input.schedule
  if (requested?.enabled === true && requested.cron.trim() !== '' && isValidCron(requested.cron)) {
    const cron = requested.cron.trim()
    task = withSchedule(task, { enabled: true, cron, nextRunAt: nextRunAtMs(cron, now) }, now)
  }
  return { task, tasks: [...tasks, task] }
}

/** 更新任务可编辑字段补丁；显式 undefined 清除字段。 */
export function applyUpdateTask(tasks, id, patch, now) {
  return tasks.map(task => {
    if (task.id !== id) return task
    const workspaceId = 'workspaceId' in patch ? normalizeTargetId(patch.workspaceId) : undefined
    const mode = 'mode' in patch ? normalizeTargetId(patch.mode) : undefined
    const permission = 'permission' in patch ? normalizePermission(task.permission, patch.permission) : undefined
    const next = { ...task, ...patch, updatedAt: now }
    if (workspaceId !== undefined || 'workspaceId' in patch) next.workspaceId = workspaceId
    if (mode !== undefined || 'mode' in patch) next.mode = mode
    if (permission !== undefined || 'permission' in patch) next.permission = permission
    return next
  })
}

/**
 * 未知权限字符串不得入账本；空串/空白表达清除（与 normalizeTargetId 一致，
 * JSON 传不了显式 undefined，客户端用 '' 表达清除意图）。
 */
function normalizePermission(current, value) {
  if (value === undefined) return undefined
  if (typeof value === 'string' && value.trim() === '') return undefined
  return isTaskPermission(value) ? value : current
}

/** 删除任务。 */
export function applyDeleteTask(tasks, id) {
  return tasks.filter(task => task.id !== id)
}

/** 归档：仅已结算状态（done/failed）；归档解除调度武装。 */
export function applyArchiveTask(tasks, id, now) {
  let applied = false
  const next = tasks.map(task => {
    if (task.id !== id || task.archivedAt !== undefined) return task
    if (!ARCHIVABLE_STATUSES.includes(task.status)) return task
    applied = true
    const schedule = task.schedule === undefined
      ? undefined
      : { ...task.schedule, enabled: false, nextRunAt: undefined }
    return {
      ...task,
      ...(schedule === undefined ? {} : { schedule }),
      archivedAt: now,
      updatedAt: now,
    }
  })
  return { tasks: next, archived: applied }
}

/** 恢复归档任务回主看板。 */
export function applyRestoreTask(tasks, id, now) {
  let applied = false
  const next = tasks.map(task => {
    if (task.id !== id || task.archivedAt === undefined) return task
    applied = true
    const { archivedAt: _archived, ...rest } = task
    return { ...rest, updatedAt: now }
  })
  return { tasks: next, archived: applied }
}

/**
 * 设置在看任务的调度规则：空白/非法 cron、已归档任务一律拒绝（状态不变）；
 * 启用规则立即计算下次触发，禁用规则不携带 nextRunAt。
 */
export function applySetSchedule(tasks, id, patch, now) {
  const task = tasks.find(candidate => candidate.id === id)
  if (task === undefined || task.archivedAt !== undefined) return { tasks, applied: false }
  const current = task.schedule
  const cron = (patch.cron ?? current?.cron ?? '').trim()
  if (cron === '' || !isValidCron(cron)) return { tasks, applied: false }
  const enabled = patch.enabled ?? current?.enabled ?? false
  const nextRunAt = enabled ? nextRunAtMs(cron, now) : undefined
  if (enabled && nextRunAt === undefined) return { tasks, applied: false }
  return {
    tasks: tasks.map(candidate =>
      candidate.id === id ? withSchedule(candidate, { enabled, cron, nextRunAt }, now) : candidate),
    applied: true,
  }
}

/** 滚动任务调度规则：持久化下一次触发时刻与本次触发时刻。 */
export function applyScheduleNextRun(tasks, id, nextRunAt, lastTriggeredAt, now) {
  return tasks.map(task =>
    task.id === id && task.archivedAt === undefined && task.schedule !== undefined
      ? withSchedule(task, { nextRunAt, lastTriggeredAt }, now)
      : task)
}

