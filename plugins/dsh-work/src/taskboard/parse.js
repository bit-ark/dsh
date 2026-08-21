/**
 * dsh-work taskboard — 账本文档解析与修复（结构校验 + 归一化）。
 *
 * Ported from zhu1090093659/dsh-web-ui packages/dsh-task-board
 * src/core/store.ts (parseLedger 部分, Apache-2.0)。
 */
import { isValidCron } from './schedule.js'
import { isTaskPermission, isTaskStatus, normalizeTargetId } from './domain.js'

/**
 * 结构行检查（状态字段不在此校验，见 parseLedger）。schedule 字段故意不在此检查：
 * 畸形 schedule 不应丢弃整行——normalizeSchedule 单独修复或丢弃 schedule。
 */
function isTaskRecordShape(value) {
  if (typeof value !== 'object' || value === null) return false
  const record = value
  if (typeof record.id !== 'string' || record.id === '') return false
  if (typeof record.title !== 'string') return false
  if (typeof record.description !== 'string') return false
  if (typeof record.prompt !== 'string') return false
  if (typeof record.createdAt !== 'number') return false
  if (typeof record.updatedAt !== 'number') return false
  if (record.workspaceId !== undefined && typeof record.workspaceId !== 'string') return false
  if (record.mode !== undefined && typeof record.mode !== 'string') return false
  if (record.permission !== undefined && typeof record.permission !== 'string') return false
  if (!Array.isArray(record.executions)) return false
  for (const execution of record.executions) {
    if (typeof execution !== 'object' || execution === null) return false
    const entry = execution
    if (typeof entry.id !== 'string') return false
    if (entry.sessionId !== undefined && typeof entry.sessionId !== 'string') return false
    if (typeof entry.startedAt !== 'number') return false
    if (entry.endedAt !== undefined && typeof entry.endedAt !== 'number') return false
    if (entry.result !== undefined && entry.result !== 'succeeded' && entry.result !== 'failed' && entry.result !== 'cancelled') return false
    if (entry.error !== undefined && typeof entry.error !== 'string') return false
  }
  return true
}

/** 未知持久化状态归一回封闭状态并集。 */
function normalizeStatus(status) {
  return isTaskStatus(status) ? status : 'todo'
}

/**
 * 修复持久化的调度规则：丢弃无可用 cron 的规则，强制布尔/数值，
 * 缺失的 nextRunAt/lastTriggeredAt 保持 undefined（重算或下个 tick 会修复）。
 */
function normalizeSchedule(schedule) {
  if (typeof schedule !== 'object' || schedule === null) return undefined
  const rule = schedule
  if (typeof rule.cron !== 'string') return undefined
  if (rule.cron.trim() === '' || !isValidCron(rule.cron)) return undefined
  return {
    enabled: rule.enabled === true,
    cron: rule.cron,
    nextRunAt: typeof rule.nextRunAt === 'number' ? rule.nextRunAt : undefined,
    lastTriggeredAt: typeof rule.lastTriggeredAt === 'number' ? rule.lastTriggeredAt : undefined,
  }
}

/** 解析并校验账本文档；非法行丢弃。 */
export function parseLedger(raw) {
  if (raw === null) return []
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch (error) {
    console.error('[dsh-work:taskboard] persisted task ledger is not valid JSON; starting empty', error)
    return []
  }
  if (!Array.isArray(parsed)) {
    console.error('[dsh-work:taskboard] persisted task ledger is not an array; starting empty')
    return []
  }
  const tasks = []
  for (const row of parsed) {
    if (!isTaskRecordShape(row)) {
      console.warn('[dsh-work:taskboard] dropping invalid task row from persisted ledger', row)
      continue
    }
    // 总是（重新）赋值 schedule：修复返回 undefined 时必须清除畸形规则。
    const task = { ...row, status: normalizeStatus(row.status) }
    task.schedule = normalizeSchedule(row.schedule)
    task.workspaceId = normalizeTargetId(row.workspaceId)
    task.mode = normalizeTargetId(row.mode)
    task.archivedAt = typeof row.archivedAt === 'number' && Number.isFinite(row.archivedAt) ? row.archivedAt : undefined
    task.permission = isTaskPermission(row.permission) ? row.permission : undefined
    tasks.push(task)
  }
  return tasks
}
