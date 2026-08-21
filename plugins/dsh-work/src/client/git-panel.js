/**
 * dsh-work — GitPanel：Git 面板包装。
 *
 * 单实例功能，所有状态由 WorkbenchPanel 管理并作为 props 透传给 GitView。
 */
import React from 'react'
import { GitView } from './git-view.js'
const h = React.createElement

/** Git 面板：纯 props 透传包装（状态全部由 WorkbenchPanel 管理）。 */
export function GitPanel(props) {
  return h(GitView, props)
}
