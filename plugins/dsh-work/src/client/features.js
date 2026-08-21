/**
 * dsh-work — 功能注册表。
 *
 * 每个功能声明元数据：id / label / icon / component / 是否单实例 / 是否可关闭 / 是否禁用。
 * 新增功能只需在此注册 + 加图标，无需改动 panel.js。
 * closable 与运行时规则一致：单实例标签常驻不可关闭（见 panel.js openFeature）。
 */
import React from 'react'
import { GitPanel } from './git-panel.js'
import { BrowserView } from './browser-view.js'
import { TerminalPanel } from './terminal-panel.js'
import { TaskboardPanel } from './taskboard/panel.js'
import { branchIcon, browserIcon, terminalIcon, kanbanIcon } from './icons.js'
const h = React.createElement

export const FEATURES = [
  {
    id: 'git',
    label: 'Git',
    description: '版本控制',
    icon: branchIcon,
    component: GitPanel,
    singleInstance: true,
    closable: false,
  },
  {
    id: 'browser',
    label: '浏览器',
    description: '沙箱浏览器',
    icon: browserIcon,
    component: BrowserView,
    singleInstance: false,
    closable: true,
  },
  {
    id: 'terminal',
    label: '终端',
    description: '交互式终端（可多开）',
    icon: terminalIcon,
    component: TerminalPanel,
    singleInstance: false,
    closable: true,
  },
  {
    id: 'taskboard',
    label: '任务看板',
    description: '多列任务看板 + 真实 DSH 会话执行 + Host 定时',
    icon: kanbanIcon,
    component: TaskboardPanel,
    singleInstance: true,
    closable: false,
  },
]

const FEATURE_MAP = new Map(FEATURES.map((f) => [f.id, f]))

export function getFeature(id) {
  return FEATURE_MAP.get(id)
}
