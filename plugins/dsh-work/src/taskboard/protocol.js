/**
 * dsh-work taskboard — 动作协议：严格版本化判别联合校验。
 *
 * Ported from zhu1090093659/dsh-web-ui packages/dsh-task-board
 * src/protocol.ts (Apache-2.0)。移植裁剪：去掉 v1 import 动作。
 *
 * 浏览器不能写入 scheduler 独占时间戳或 execution 结果；动作联合里没有
 * 命令、可执行路径、shell 文本或任意参数字段。
 */
import { isTaskPermission, isTaskStatus } from './domain.js'

/** 任务看板 API 路径前缀（客户端与宿主路由共用）。 */
export const TASKBOARD_API_PREFIX = '/workbench/taskboard'

function record(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? value
    : undefined
}

function exactKeys(value, allowed) {
  return Object.keys(value).every(key => allowed.includes(key))
}

function optionalString(value) {
  return value === undefined || typeof value === 'string'
}

function createInput(value) {
  const input = record(value)
  if (input === undefined || !exactKeys(input, ['title', 'description', 'prompt', 'workspaceId', 'mode', 'permission', 'schedule'])) return false
  if (typeof input.title !== 'string' || typeof input.description !== 'string' || typeof input.prompt !== 'string') return false
  if (!optionalString(input.workspaceId) || !optionalString(input.mode)) return false
  if (input.permission !== undefined && !isTaskPermission(input.permission)) return false
  if (input.schedule !== undefined) {
    const schedule = record(input.schedule)
    if (schedule === undefined || !exactKeys(schedule, ['enabled', 'cron'])) return false
    if (typeof schedule.enabled !== 'boolean' || typeof schedule.cron !== 'string') return false
  }
  return true
}

function updatePatch(value) {
  const patch = record(value)
  if (patch === undefined || !exactKeys(patch, ['title', 'description', 'prompt', 'workspaceId', 'mode', 'permission'])) return false
  for (const key of ['title', 'description', 'prompt', 'workspaceId', 'mode']) {
    if (!optionalString(patch[key])) return false
  }
  // 权限补丁：undefined 保持原值，'' 表达清除，其余必须是合法预设。
  const permission = patch.permission
  return permission === undefined || permission === '' || isTaskPermission(permission)
}

function schedulePatch(value) {
  const patch = record(value)
  return patch !== undefined
    && exactKeys(patch, ['enabled', 'cron'])
    && (patch.enabled === undefined || typeof patch.enabled === 'boolean')
    && (patch.cron === undefined || typeof patch.cron === 'string')
}

/**
 * 解析并严格校验一个动作信封。
 * @returns {{ requestId: string, action: object } | undefined}
 */
export function parseActionEnvelope(value) {
  const envelope = record(value)
  if (envelope === undefined || !exactKeys(envelope, ['requestId', 'action'])) return undefined
  if (typeof envelope.requestId !== 'string' || envelope.requestId.trim() === '' || envelope.requestId.length > 256) return undefined
  const action = record(envelope.action)
  if (action === undefined || typeof action.kind !== 'string') return undefined
  const taskId = typeof action.taskId === 'string' && action.taskId !== '' ? action.taskId : undefined
  switch (action.kind) {
    case 'create':
      if (!exactKeys(action, ['kind', 'id', 'input'])) return undefined
      return typeof action.id === 'string' && action.id !== '' && createInput(action.input)
        ? { requestId: envelope.requestId, action: { kind: 'create', id: action.id, input: action.input } }
        : undefined
    case 'update':
      if (!exactKeys(action, ['kind', 'taskId', 'patch'])) return undefined
      return taskId !== undefined && updatePatch(action.patch)
        ? { requestId: envelope.requestId, action: { kind: 'update', taskId, patch: action.patch } }
        : undefined
    case 'set-schedule':
      if (!exactKeys(action, ['kind', 'taskId', 'patch'])) return undefined
      return taskId !== undefined && schedulePatch(action.patch)
        ? { requestId: envelope.requestId, action: { kind: 'set-schedule', taskId, patch: action.patch } }
        : undefined
    case 'move':
      if (!exactKeys(action, ['kind', 'taskId', 'status'])) return undefined
      return taskId !== undefined && isTaskStatus(action.status)
        ? { requestId: envelope.requestId, action: { kind: 'move', taskId, status: action.status } }
        : undefined
    case 'delete':
    case 'archive':
    case 'restore':
    case 'run':
    case 'rerun':
      if (!exactKeys(action, ['kind', 'taskId'])) return undefined
      return taskId === undefined ? undefined : { requestId: envelope.requestId, action: { kind: action.kind, taskId } }
    default:
      return undefined
  }
}
