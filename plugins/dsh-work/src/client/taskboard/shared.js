/**
 * dsh-work taskboard — 客户端共享常量与工具。
 *
 * 权限预设与 Host domain.js 的 TASK_PERMISSIONS 保持一致；uuid 供
 * api.js（requestId）与 new-task.js（任务 id）共用，避免多处重复实现。
 */

/** 任务可钉住的权限预设（/permission <id> 的 id，与 Host domain.js 一致）。 */
export const TASK_PERMISSIONS = ['read-only', 'workspace-write', 'danger-full-access']

/** 权限预设的中文标签。 */
export const PERMISSION_LABEL = {
  'read-only': '只读',
  'workspace-write': '工作区写入',
  'danger-full-access': '完全访问',
}

/** 生成 uuid：优先 crypto.randomUUID，不可用时退化为时间+随机数拼接。 */
export function uuid() {
  return globalThis.crypto?.randomUUID?.() ?? `browser-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}
