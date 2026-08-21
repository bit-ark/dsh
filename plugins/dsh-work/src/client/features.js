/**
 * dsh-work — 功能注册表。
 *
 * 每个功能声明元数据：id / label / icon / component / 是否单实例 / 是否可关闭 / 是否禁用。
 * 新增功能只需在此注册 + 加图标，无需改动 panel.js。
 * singleInstance：重复打开只聚焦已有标签；closable：标签是否显示关闭按钮。
 */
import React from 'react'
import { FilesPanel } from './files-panel.js'
import { GitPanel } from './git-panel.js'
import { BrowserView } from './browser-view.js'
import { TerminalPanel } from './terminal-panel.js'
import { TaskboardPanel } from './taskboard/panel.js'
import { branchIcon, browserIcon, folderIcon, terminalIcon, kanbanIcon } from './icons.js'
const h = React.createElement

/** 面板可用功能注册表：id/label/description/icon/组件/单实例/可关闭。 */
export const FEATURES = [
  {
    id: 'files',
    label: '目录',
    description: '文件目录树与预览',
    icon: folderIcon,
    component: FilesPanel,
    singleInstance: true,
    closable: true,
  },
  {
    id: 'git',
    label: 'Git',
    description: '版本控制',
    icon: branchIcon,
    component: GitPanel,
    singleInstance: true,
    closable: true,
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
    closable: true,
  },
]

const FEATURE_MAP = new Map(FEATURES.map((f) => [f.id, f]))

/** 按功能 id 查注册项（未注册返回 undefined）。 */
export function getFeature(id) {
  return FEATURE_MAP.get(id)
}
