/**
 * dsh-work taskboard — 任务详情模态：内容/Prompt/执行历史，唯一可触发执行处。
 *
 * UI 结构移植自 zhu1090093659/dsh-web-ui packages/dsh-task-board
 * src/client/board/TaskDetail.tsx (Apache-2.0)；cron 校验与 Host 共用
 * src/taskboard/schedule.js（esbuild 打进客户端 bundle，纯函数无 node 依赖）。
 */
import React from 'react'
import { closeIcon } from '../icons.js'
import { isValidCron, nextRunAtMs } from '../../taskboard/schedule.js'
import { formatHostTimestamp, formatTime } from './format.js'
import { ConfirmDialog } from './new-task.js'
import { SCHEDULE_PRESETS } from './presets.js'
import { TASK_PERMISSIONS, PERMISSION_LABEL } from './shared.js'
const h = React.createElement
const { useEffect, useState } = React

/** 手动可移入的列。 */
const MANUAL_STATUSES = ['backlog', 'todo']

const RESULT_LABEL = {
  succeeded: '成功',
  failed: '失败',
  cancelled: '已取消',
}

/** 单条执行历史行。 */
function ExecutionRow(props) {
  const { execution, timeZone, canOpenSession, onOpen } = props
  const result = execution.result
  return h('li', { className: 'dwb-tb-exec-row', 'data-result': result },
    h('span', { className: 'dwb-tb-exec-badge', 'data-result': result },
      result === undefined ? '运行中' : RESULT_LABEL[result],
    ),
    h('span', { className: 'dwb-tb-exec-times' },
      `开始 ${formatTime(execution.startedAt, timeZone)}`,
      execution.endedAt !== undefined ? ` · 结束 ${formatTime(execution.endedAt, timeZone)}` : '',
    ),
    execution.sessionId !== undefined && canOpenSession
      ? h('button', {
        type: 'button',
        className: 'dwb-tb-linkbtn',
        onClick: () => onOpen(execution.sessionId),
        title: execution.sessionId,
      }, '查看会话 ⌁')
      : null,
    execution.error !== undefined && execution.error !== ''
      ? h('span', { className: 'dwb-tb-exec-error' }, execution.error)
      : null,
  )
}

/** 执行目标编辑器：工作区 / agent 预设 / 权限。 */
function ExecutionSettingsSection(props) {
  const { task, pending, options, act } = props
  const workspaceId = task.workspaceId ?? ''
  const mode = task.mode ?? ''
  const permission = task.permission ?? ''
  // 钉住的目标可能已从运行时消失（工作区被删、预设被移除）：保留为陈旧行，
  // 让用户看到任务将请求什么，而不是静默丢弃。
  const workspaceKnown = workspaceId === '' || options.workspaces.some((item) => item.workspaceId === workspaceId)
  const modeKnown = mode === '' || options.presets.some((item) => item.id === mode)
  return h('section', { className: 'dwb-tb-section' },
    h('h4', null, '执行目标'),
    h('p', { className: 'dwb-tb-text' }, '执行时新建独立 DSH 会话；未选择时使用运行时缺省。'),
    h('label', { className: 'dwb-tb-field' },
      h('span', { className: 'dwb-tb-field-label' }, '工作区'),
      h('select', {
        className: 'dwb-tb-select',
        value: workspaceId,
        disabled: pending,
        onChange: (event) => void act({ kind: 'update', taskId: task.id, patch: { workspaceId: event.target.value } }, task.id),
      },
        h('option', { value: '' }, '最近工作区'),
        !workspaceKnown ? h('option', { value: workspaceId }, `${workspaceId}（已不存在）`) : null,
        options.workspaces.map((workspace) =>
          h('option', { key: workspace.workspaceId, value: workspace.workspaceId }, workspace.title)),
      ),
    ),
    h('label', { className: 'dwb-tb-field' },
      h('span', { className: 'dwb-tb-field-label' }, 'Agent 预设'),
      h('select', {
        className: 'dwb-tb-select',
        value: mode,
        disabled: pending,
        onChange: (event) => void act({ kind: 'update', taskId: task.id, patch: { mode: event.target.value } }, task.id),
      },
        h('option', { value: '' }, '部署默认预设'),
        !modeKnown ? h('option', { value: mode }, `${mode}（已不存在）`) : null,
        options.presets.map((preset) =>
          h('option', { key: preset.id, value: preset.id, disabled: preset.broken !== undefined },
            (preset.name ?? preset.id)
            + (preset.isDefault === true ? '（默认）' : '')
            + (preset.broken !== undefined ? '（不可用）' : ''))),
      ),
    ),
    h('label', { className: 'dwb-tb-field' },
      h('span', { className: 'dwb-tb-field-label' }, '权限预设'),
      h('select', {
        className: 'dwb-tb-select',
        value: permission,
        disabled: pending,
        // 空串表达清除意图：JSON 传不了显式 undefined，服务端 normalizePermission
        // 把 ''/空白归一为 undefined（与 workspaceId/mode 的清除方式一致）。
        onChange: (event) => void act({ kind: 'update', taskId: task.id, patch: { permission: event.target.value } }, task.id),
      },
        h('option', { value: '' }, '会话默认'),
        TASK_PERMISSIONS.map((id) => h('option', { key: id, value: id }, PERMISSION_LABEL[id])),
      ),
    ),
  )
}

/** 定时执行编辑器：启用开关、cron 输入 + 预设、下次触发信息。 */
function ScheduleSection(props) {
  const { task, pending, timeZone, act } = props
  const schedule = task.schedule
  const [cron, setCron] = useState(schedule?.cron ?? '0 9 * * *')
  const [enabled, setEnabled] = useState(schedule?.enabled ?? false)
  const [errorText, setErrorText] = useState(undefined)

  // 任务切换或调度规则本身（cron/启用）变化时重置编辑器。
  // 不依赖 nextRunAt/lastTriggeredAt：调度触发滚动它们时若重置，
  // 会清掉用户正在编辑的 cron 草稿。
  useEffect(() => {
    setCron(schedule?.cron ?? '0 9 * * *')
    setEnabled(schedule?.enabled ?? false)
    setErrorText(undefined)
  }, [task.id, schedule?.enabled, schedule?.cron])

  /** 校验并持久当前 cron 文本（Enter 或失焦）。 */
  const saveCron = (value) => {
    const trimmed = value.trim()
    setCron(trimmed)
    if (trimmed === '' || !isValidCron(trimmed)) {
      setErrorText('无效的 cron 表达式（5 段：分 时 日 月 周）')
      return
    }
    // 规则若处于武装状态，Host 会用新 cron 重算下次触发；
    // 5 年窗口内无匹配时刻的表达式会被拒绝，先在前端拦下。
    if (nextRunAtMs(trimmed, Date.now()) === undefined) {
      setErrorText('该 cron 在未来 5 年内没有匹配时刻，无法武装')
      return
    }
    setErrorText(undefined)
    void act({ kind: 'set-schedule', taskId: task.id, patch: { cron: trimmed } }, task.id)
  }

  /** 武装/解除调度（武装时先持久编辑过的 cron）。 */
  const toggleEnabled = (next) => {
    const trimmed = cron.trim()
    if (next && (trimmed === '' || !isValidCron(trimmed))) {
      setErrorText('无效的 cron 表达式（5 段：分 时 日 月 周）')
      return
    }
    if (next && nextRunAtMs(trimmed, Date.now()) === undefined) {
      setErrorText('该 cron 在未来 5 年内没有匹配时刻，无法武装')
      return
    }
    setErrorText(undefined)
    void act({
      kind: 'set-schedule',
      taskId: task.id,
      patch: { enabled: next, ...(next && trimmed !== schedule?.cron ? { cron: trimmed } : {}) },
    }, task.id)
  }

  const applyPreset = (preset) => {
    if (preset === '') return
    setCron(preset)
    setErrorText(undefined)
    void act({ kind: 'set-schedule', taskId: task.id, patch: { cron: preset } }, task.id)
  }

  const nextRunAt = schedule?.nextRunAt
  const lastTriggeredAt = schedule?.lastTriggeredAt
  const nextLabel = enabled !== true || nextRunAt === undefined
    ? '未调度'
    : nextRunAt <= Date.now() ? '即将触发' : formatHostTimestamp(nextRunAt, timeZone)
  const lastLabel = lastTriggeredAt === undefined ? '—' : formatHostTimestamp(lastTriggeredAt, timeZone)

  return h('section', { className: 'dwb-tb-section' },
    h('h4', null, '定时执行'),
    h('label', { className: 'dwb-tb-schedule-toggle' },
      h('input', {
        type: 'checkbox',
        checked: enabled,
        disabled: pending,
        onChange: (event) => toggleEnabled(event.target.checked),
      }),
      h('span', null, '启用 Host 定时执行（关闭浏览器仍会触发）'),
    ),
    h('div', { className: 'dwb-tb-schedule-row' },
      h('input', {
        className: 'dwb-tb-input dwb-tb-schedule-input' + (errorText !== undefined ? ' dwb-tb-schedule-invalid' : ''),
        value: cron,
        disabled: pending,
        placeholder: '0 9 * * *',
        spellCheck: false,
        'aria-label': 'cron 表达式',
        onChange: (event) => { setCron(event.target.value); setErrorText(undefined) },
        onBlur: () => saveCron(cron),
        onKeyDown: (event) => { if (event.key === 'Enter') saveCron(cron) },
      }),
      h('select', {
        className: 'dwb-tb-schedule-preset',
        value: '',
        disabled: pending,
        'aria-label': '定时预设',
        onChange: (event) => applyPreset(event.target.value),
      },
        h('option', { value: '' }, '预设…'),
        SCHEDULE_PRESETS.map((preset) => h('option', { key: preset.cron, value: preset.cron }, preset.label)),
      ),
    ),
    errorText !== undefined ? h('p', { className: 'dwb-tb-form-error' }, errorText) : null,
    h('p', { className: 'dwb-tb-schedule-meta' },
      `下次触发 ${nextLabel} · 上次触发 ${lastLabel}`,
    ),
  )
}

/** 任务详情模态。 */
export function TaskDetail(props) {
  const {
    task, pending, error, options, timeZone, sessions, statusLabel,
    onClose, act, onRetry, openSession, onDeleted,
  } = props
  const [confirmDelete, setConfirmDelete] = useState(false)

  const running = task.status === 'running'
  const archived = task.archivedAt !== undefined
  const canOpenSession = sessions !== undefined && typeof sessions.open === 'function'

  return h('div', {
    className: 'dwb-tb-backdrop',
    onMouseDown: (event) => { if (event.target === event.currentTarget) onClose() },
  },
    h('div', { className: 'dwb-tb-detail', role: 'dialog', 'aria-label': '任务详情' },
      h('header', { className: 'dwb-tb-detail-header' },
        h('h2', { className: 'dwb-tb-detail-title' }, task.title),
        h('span', { className: 'dwb-tb-status-badge', 'data-status': archived ? 'archived' : task.status },
          archived ? '已归档' : statusLabel[task.status],
        ),
        h('button', { type: 'button', className: 'dwb-tb-iconbtn', title: '关闭', 'aria-label': '关闭', onClick: onClose }, closeIcon()),
      ),

      h('div', { className: 'dwb-tb-detail-body' },
        error !== undefined
          ? h('div', { className: 'dwb-tb-form-error' },
            // 错误既可能是传输故障，也可能是 Host 业务拒绝（如删除运行中任务），
            // 统一用中性文案，不误导为连接问题。
            `操作失败：${error} `,
            h('button', { type: 'button', className: 'dwb-tb-linkbtn', onClick: onRetry }, '重试'),
          )
          : null,
        h('section', { className: 'dwb-tb-section' },
          h('h4', null, '描述'),
          h('p', { className: 'dwb-tb-text' }, task.description !== '' ? task.description : '—'),
        ),
        h('section', { className: 'dwb-tb-section' },
          h('h4', null, '执行 Prompt'),
          h('pre', { className: 'dwb-tb-prompt' }, task.prompt !== '' ? task.prompt : task.title),
        ),
        !archived ? h(ExecutionSettingsSection, { task, pending, options, act }) : null,
        !archived ? h(ScheduleSection, { task, pending, timeZone, act }) : null,
        h('section', { className: 'dwb-tb-section' },
          h('h4', null, '执行历史'),
          task.executions.length === 0
            ? h('p', { className: 'dwb-tb-text' }, '尚未执行过')
            : h('ul', { className: 'dwb-tb-exec-list' },
              [...task.executions].reverse().map((execution) =>
                h(ExecutionRow, { key: execution.id, execution, timeZone, canOpenSession, onOpen: openSession }))),
        ),
        !archived
          ? h('section', { className: 'dwb-tb-section' },
            h('h4', null, '移动任务'),
            h('div', { className: 'dwb-tb-move-row' },
              MANUAL_STATUSES.map((status) =>
                h('button', {
                  key: status,
                  type: 'button',
                  className: 'dwb-tb-btn',
                  disabled: task.status === status || running || pending,
                  onClick: () => void act({ kind: 'move', taskId: task.id, status }, task.id),
                }, `移到「${statusLabel[status]}」`)),
            ),
          )
          : null,
      ),

      h('footer', { className: 'dwb-tb-detail-footer' },
        !archived && pending ? h('span', { className: 'dwb-tb-meta' }, '提交中…') : null,
        !archived
          ? h('button', {
            type: 'button',
            className: 'dwb-tb-btn dwb-tb-btn-primary',
            disabled: running || pending,
            onClick: () => { void act({ kind: 'rerun', taskId: task.id }, task.id) },
          }, task.executions.length === 0 ? '执行' : '重新执行')
          : null,
        archived
          ? h('button', {
            type: 'button',
            className: 'dwb-tb-btn dwb-tb-btn-primary',
            disabled: pending,
            onClick: () => void act({ kind: 'restore', taskId: task.id }, task.id),
          }, '恢复')
          : (task.status === 'done' || task.status === 'failed')
            ? h('button', {
              type: 'button',
              className: 'dwb-tb-btn',
              disabled: pending,
              onClick: () => void act({ kind: 'archive', taskId: task.id }, task.id),
            }, '归档')
            : null,
        h('button', {
          type: 'button',
          className: 'dwb-tb-btn dwb-tb-btn-danger',
          // 与重新执行一致：运行中任务的删除会被 Host 拒绝，前端先禁用。
          disabled: running || pending,
          onClick: () => setConfirmDelete(true),
        }, '删除'),
        h('span', { className: 'dwb-tb-meta' },
          `创建于 ${formatTime(task.createdAt, timeZone)}`,
          archived ? ` · 归档于 ${formatTime(task.archivedAt, timeZone)}` : '',
        ),
      ),
    ),

    confirmDelete
      ? h(ConfirmDialog, {
        title: '删除任务',
        message: `确定删除任务「${task.title}」吗？执行历史将一并删除，此操作不可撤销。`,
        confirmLabel: '删除',
        danger: true,
        onCancel: () => setConfirmDelete(false),
        onConfirm: async () => {
          setConfirmDelete(false)
          const result = await act({ kind: 'delete', taskId: task.id }, task.id)
          if (result.error === undefined) onDeleted()
        },
      })
      : null,
  )
}
