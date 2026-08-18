/**
 * dsh-work — 客户端半入口。构建产物为 lib/client.js 单文件 bundle：
 * build.mjs 用 esbuild 打包 src/client/（含 vendor 内联），并以
 * banner/footer 包成 window.__ModuleLoader__.load({ id, factory }) 工厂。
 */
import cssText from './styles.css'
import { WorkbenchPanel, installDockCoupling } from './panel.js'

export const name = 'dsh-work'
export const inject = ['slots']

export function apply(ctx) {
  ctx.effect(
    () => ctx.slots.inject('shell.overlay', () => ctx.slots.register({
      name: 'shell.overlay',
      id: 'workbench',
      order: 100,
      label: 'Workbench',
    }, WorkbenchPanel)),
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
export { PREVIEW_KIND } from './preview.js'
