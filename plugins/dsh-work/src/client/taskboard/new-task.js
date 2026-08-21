/**
 * dsh-work taskboard — 新建任务模态 + 通用确认对话框。
 *
 * UI 结构移植自 zhu1090093659/dsh-web-ui packages/dsh-task-board
 * src/client/board/NewTaskModal.tsx 与 ConfirmDialog.tsx (Apache-2.0)。
 * 创建走 Host 确认：只有 action 返回 snapshot 后才关闭。
 */
import React from 'react'
import { isValidCron, nextRunAtMs } from '../../taskboard/schedule.js'
import { formatHostTimestamp } from './format.js'
import { SCHEDULE_PRESETS } from './presets.js'
import { TASK_PERMISSIONS, PERMISSION_LABEL, uuid } from './shared.js'
const h = React.createElement
const { useState } = React

/**
 * 标题/描述/Prompt 的 UTF-8 字节上限：动作体上限 64KiB（routes.js），
 * 留出信封与其他字段的开销余量。
 */
const MAX_INPUT_BYTES = 48 * 1024

/** 新建任务表单。 */
export function NewTaskModal(props) {
  const { options, timeZone, onClose, act } = props
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [prompt, setPrompt] = useState('')
  const [workspaceId, setWorkspaceId] = useState('')
  const [mode, setMode] = useState('')
  const [permission, setPermission] = useState('')
  const [scheduleEnabled, setScheduleEnabled] = useState(false)
  const [scheduleCron, setScheduleCron] = useState('')
  const [scheduleError, setScheduleError] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [pending, setPending] = useState(false)

  const submit = async () => {
    // 防重复创建：Enter 隐式提交或快速双击可再次进入 submit，
    // 每次都生成新 uuid，Host 幂等（按 requestId 指纹）防不住。
    if (pending) return
    if (title.trim() === '') {
      setError('请填写任务标题')
      return
    }
    // 动作体有 64KiB 上限（Host 413）：提交前按 UTF-8 字节先拦下，
    // 给出比"操作失败"更明确的提示。
    if (new TextEncoder().encode(title + description + prompt).length > MAX_INPUT_BYTES) {
      setError(`内容过长：标题、描述与 Prompt 合计不能超过 ${Math.round(MAX_INPUT_BYTES / 1024)}KB`)
      return
    }
    if (scheduleEnabled) {
      const cron = scheduleCron.trim()
      if (cron === '' || !isValidCron(cron)) {
        setScheduleError('无效的 cron 表达式（5 段：分 时 日 月 周）')
        return
      }
      // 语法合法但 5 年窗口内无匹配时刻（如 2 月 30 日）的表达式，
      // Host 会拒绝武装，先在前端拦下并说明原因。
      if (nextRunAtMs(cron, Date.now()) === undefined) {
        setScheduleError('该 cron 在未来 5 年内没有匹配时刻，无法武装')
        return
      }
    }
    setPending(true)
    const result = await act({
      kind: 'create',
      id: uuid(),
      input: {
        title,
        description,
        prompt,
        workspaceId: workspaceId === '' ? undefined : workspaceId,
        mode: mode === '' ? undefined : mode,
        permission: permission === '' ? undefined : permission,
        schedule: scheduleEnabled ? { enabled: true, cron: scheduleCron.trim() } : undefined,
      },
    }, undefined)
    // act 的错误消息经返回值传入：面板级错误条被模态遮罩挡住，
    // 且提交时刻捕获的 prop 拿不到刚写入的新错误。
    if (result.error !== undefined) {
      setPending(false)
      setError(result.error)
      return
    }
    onClose()
  }

  /** 武装 cron 的语法校验与下次触发预览（仅创建时）。 */
  const cronTrimmed = scheduleCron.trim()
  const cronValid = cronTrimmed !== '' && isValidCron(cronTrimmed)
  // nextRunAtMs 为 undefined：5 年窗口内无匹配时刻，Host 不会武装。
  const scheduleNextRun = scheduleEnabled && cronValid ? nextRunAtMs(cronTrimmed, Date.now()) : undefined

  return h('div', {
    className: 'dwb-tb-backdrop',
    onMouseDown: (event) => { if (event.target === event.currentTarget) onClose() },
  },
    h('form', {
      className: 'dwb-tb-modal',
      role: 'dialog',
      'aria-label': '新建任务',
      onSubmit: (event) => { event.preventDefault(); void submit() },
    },
      h('h2', { className: 'dwb-tb-modal-title' }, '新建任务'),

      h('div', { className: 'dwb-tb-modal-body' },
      h('label', { className: 'dwb-tb-field' },
        h('span', { className: 'dwb-tb-field-label' }, '标题'),
        h('input', {
          className: 'dwb-tb-input',
          value: title,
          autoFocus: true,
          placeholder: '任务标题（必填）',
          onChange: (event) => { setTitle(event.target.value); setError(undefined) },
        }),
      ),

      h('label', { className: 'dwb-tb-field' },
        h('span', { className: 'dwb-tb-field-label' }, '描述'),
        h('textarea', {
          className: 'dwb-tb-input',
          rows: 2,
          value: description,
          placeholder: '任务说明（可选）',
          onChange: (event) => setDescription(event.target.value),
        }),
      ),

      h('label', { className: 'dwb-tb-field' },
        h('span', { className: 'dwb-tb-field-label' }, '执行 Prompt'),
        h('textarea', {
          className: 'dwb-tb-input',
          rows: 4,
          value: prompt,
          placeholder: '执行时发给 DSH 会话的 Prompt；留空则使用标题',
          onChange: (event) => setPrompt(event.target.value),
        }),
      ),

      h('label', { className: 'dwb-tb-field' },
        h('span', { className: 'dwb-tb-field-label' }, '工作区'),
        h('select', {
          className: 'dwb-tb-select',
          value: workspaceId,
          onChange: (event) => setWorkspaceId(event.target.value),
        },
          h('option', { value: '' }, '最近工作区'),
          options.workspaces.map((workspace) =>
            h('option', { key: workspace.workspaceId, value: workspace.workspaceId }, workspace.title)),
        ),
      ),

      h('label', { className: 'dwb-tb-field' },
        h('span', { className: 'dwb-tb-field-label' }, 'Agent 预设'),
        h('select', {
          className: 'dwb-tb-select',
          value: mode,
          onChange: (event) => setMode(event.target.value),
        },
          h('option', { value: '' }, '部署默认预设'),
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
          onChange: (event) => setPermission(event.target.value),
        },
          h('option', { value: '' }, '会话默认'),
          TASK_PERMISSIONS.map((id) => h('option', { key: id, value: id }, PERMISSION_LABEL[id])),
        ),
      ),

      h('section', { className: 'dwb-tb-section' },
        h('h4', null, '定时执行'),
        h('label', { className: 'dwb-tb-schedule-toggle' },
          h('input', {
            type: 'checkbox',
            checked: scheduleEnabled,
            onChange: (event) => {
              setScheduleEnabled(event.target.checked)
              if (!event.target.checked) setScheduleError(undefined)
            },
          }),
          h('span', null, '创建后立即武装定时执行'),
        ),
        scheduleEnabled
          ? h(React.Fragment, null,
            h('div', { className: 'dwb-tb-schedule-row' },
              h('input', {
                className: 'dwb-tb-input dwb-tb-schedule-input' + (scheduleError !== undefined ? ' dwb-tb-schedule-invalid' : ''),
                value: scheduleCron,
                placeholder: '0 9 * * *',
                spellCheck: false,
                'aria-label': 'cron 表达式',
                onChange: (event) => { setScheduleCron(event.target.value); setScheduleError(undefined) },
              }),
              h('select', {
                className: 'dwb-tb-schedule-preset',
                value: '',
                'aria-label': '定时预设',
                onChange: (event) => {
                  if (event.target.value === '') return
                  setScheduleCron(event.target.value)
                  setScheduleError(undefined)
                },
              },
                h('option', { value: '' }, '预设…'),
                SCHEDULE_PRESETS.map((preset) => h('option', { key: preset.cron, value: preset.cron }, preset.label)),
              ),
            ),
            scheduleError !== undefined ? h('p', { className: 'dwb-tb-form-error' }, scheduleError) : null,
            scheduleError === undefined && scheduleEnabled && cronValid && scheduleNextRun === undefined
              ? h('p', { className: 'dwb-tb-form-error' }, '该 cron 在未来 5 年内没有匹配时刻，无法武装')
              : null,
            scheduleError === undefined && scheduleNextRun !== undefined
              // 预览用 Host 时区渲染：nextRunAt 按 Host 时区计算，
              // 浏览器本地时区渲染会在异时区部署时与实际触发时刻不符。
              ? h('p', { className: 'dwb-tb-schedule-meta' }, `下次触发 ${formatHostTimestamp(scheduleNextRun, timeZone)}`)
              : null,
          )
          : null,
      ),

      error !== undefined ? h('p', { className: 'dwb-tb-form-error' }, error) : null,
      ),

      h('footer', { className: 'dwb-tb-modal-footer' },
        h('button', { type: 'button', className: 'dwb-tb-btn', onClick: onClose }, '取消'),
        h('button', { type: 'submit', className: 'dwb-tb-btn dwb-tb-btn-primary', disabled: pending }, '创建'),
      ),
    ),
  )
}

/** 小型确认对话框（破坏性动作用）。 */
export function ConfirmDialog(props) {
  const { title, message, confirmLabel, danger, onCancel, onConfirm } = props
  return h('div', {
    className: 'dwb-tb-backdrop',
    onMouseDown: (event) => { if (event.target === event.currentTarget) onCancel() },
  },
    h('div', { className: 'dwb-tb-modal', role: 'alertdialog', 'aria-label': title },
      h('h2', { className: 'dwb-tb-modal-title' }, title),
      h('p', { className: 'dwb-tb-confirm-message' }, message),
      h('footer', { className: 'dwb-tb-modal-footer' },
        h('button', { type: 'button', className: 'dwb-tb-btn', onClick: onCancel }, '取消'),
        h('button', {
          type: 'button',
          className: danger ? 'dwb-tb-btn dwb-tb-btn-danger' : 'dwb-tb-btn dwb-tb-btn-primary',
          onClick: () => void onConfirm(),
        }, confirmLabel),
      ),
    ),
  )
}
