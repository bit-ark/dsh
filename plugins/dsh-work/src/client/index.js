/**
 * dsh-work — 客户端半入口。构建产物为 lib/client.js 单文件 bundle：
 * build.mjs 用 esbuild 打包 src/client/（含 vendor 内联），并以
 * banner/footer 包成 window.__ModuleLoader__.load({ id, factory }) 工厂。
 */
import cssText from './styles.css'
import React from 'react'
import { WorkbenchPanel, installDockCoupling } from './panel.js'

/** 插件行 id（client-modules 契约，必须与 build.mjs 的 PACKAGE_ID 一致）。 */
export const name = 'dsh-work'
/** 依赖注入：shell 插槽（overlay）+ 会话服务（任务看板「查看会话」跳转用）。 */
export const inject = ['slots', 'sessions']

/**
 * 客户端半入口：注册 shell.overlay 工作面板 + 三列联动，并注入会话服务。
 */
export function apply(ctx) {
  // sessions 服务透传给工作面板：任务看板执行历史「查看会话」用其 open() 跳回
  // 对应 DSH 会话。用包装组件注入，避免改动 WorkbenchPanel 的标准 props 面。
  const sessions = ctx.get('sessions')
  const WorkbenchPanelWithSessions = (props) =>
    React.createElement(WorkbenchPanel, { ...props, sessions })
  ctx.effect(
    () => ctx.slots.inject('shell.overlay', () => ctx.slots.register({
      name: 'shell.overlay',
      id: 'workbench',
      order: 100,
      label: 'Workbench',
    }, WorkbenchPanelWithSessions)),
    'dsh-work: overlay registration',
  );
  // 三列联动（面板宽度 ↔ 对话列宽度），卸载时自动还原。
  ctx.effect(() => installDockCoupling(), 'dsh-work: dock coupling');
}

// 样式注入（与拆分前一致）：守卫防重复、loader 卸载时认领清理。
if (typeof document !== 'undefined' && document.getElementById('dsh-work-style') === null) {
  const styleEl = document.createElement('style');
  styleEl.id = 'dsh-work-style';
  styleEl.setAttribute('data-plugin', 'dsh-work');
  styleEl.textContent = cssText;
  document.head.appendChild(styleEl);
}

// 纯预览/渲染 helper 导出，供 node 测试套件（test/preview.test.mjs）引用；
// loader 只消费 name/inject/apply，其余导出在运行期保持惰性。
export { escapeHtml, highlightCode, HL_LANG_BY_EXT } from './highlight.js'
export { renderMarkdown, mdLinkHref, mdImageHref } from './markdown.js'
export { htmlPreviewSrc, editorLanguageFor } from './editor.js'
export { fitTipGeometry } from './tip.js'
export { cubicBezierEase, panelActionFor } from './helpers.js'
export { PREVIEW_KIND } from './preview.js'
