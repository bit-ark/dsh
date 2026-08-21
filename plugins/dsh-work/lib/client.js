window.__ModuleLoader__.load({ id: "dsh-work", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/client/index.js
var index_exports = {};
__export(index_exports, {
  HL_LANG_BY_EXT: () => HL_LANG_BY_EXT,
  PREVIEW_KIND: () => PREVIEW_KIND,
  apply: () => apply,
  cubicBezierEase: () => cubicBezierEase,
  editorLanguageFor: () => editorLanguageFor,
  escapeHtml: () => escapeHtml,
  fitTipGeometry: () => fitTipGeometry,
  highlightCode: () => highlightCode,
  htmlPreviewSrc: () => htmlPreviewSrc,
  inject: () => inject,
  mdImageHref: () => mdImageHref,
  mdLinkHref: () => mdLinkHref,
  name: () => name,
  panelActionFor: () => panelActionFor,
  renderMarkdown: () => renderMarkdown
});
module.exports = __toCommonJS(index_exports);

// src/client/styles.css
var styles_default = `.dwb-root { position: absolute; top: 0; right: 0; bottom: 0; display: flex; flex-direction: column; background: var(--dsw-alias-bg-layer-2); border-left: 1px solid var(--dsw-alias-border-l2); box-shadow: -8px 0 24px rgba(0,0,0,.08); color: var(--dsw-alias-label-primary); font-size: 13px; overflow: hidden; }
.dwb-header { display: flex; align-items: center; gap: 8px; padding: 12px 28px 0 20px; min-height: 44px; flex: none; box-sizing: border-box; }
.dwb-title { font-weight: 500; font-size: 14px; line-height: 20px; color: var(--dsw-alias-label-primary); flex: none; }
.dwb-pathinput { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsw-alias-label-tertiary); font-size: 11px; background: transparent; border: 1px solid transparent; border-radius: 6px; padding: 3px 6px; outline: none; }
.dwb-pathinput:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dwb-pathinput:focus { background: var(--dsw-alias-bg-layer-3); border-color: var(--dsw-alias-border-l3); color: var(--dsw-alias-label-primary); }
.dwb-iconbtn { flex: none; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 8px; background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer; padding: 0; }
.dwb-iconbtn:hover { background: color-mix(in srgb, var(--dsw-alias-label-secondary) 10%, transparent); color: var(--dsw-alias-label-primary); }
/* \u6807\u7B7E\u680F\u4E0E\u53F3\u4FA7\u5DE5\u4F5C\u53F0\u7684 header \u8981\u6C34\u5E73\u5BF9\u9F50\uFF1A\u4E3B\u5BF9\u8BDD\u5217\u7684 header\uFF08\u4E24\u884C\u5F0F\u6807\u9898+\u6807\u7B7E\uFF0C
   ConversationRoot.module.css \u7684 .header/.tabs\uFF09\u5728\u81EA\u8EAB padding-box \u5E95\u90E8\u518D\u5F80\u4E0A
   1px \u5904\u753B\u5206\u9694\u7EBF\uFF08.header::after bottom:1px\uFF09\uFF0C\u56E0\u6B64\u672C\u6807\u7B7E\u680F\u540C\u6837\u7528\u300C\u900F\u660E\u8FB9\u6846 +
   ::after bottom:1px\u300D\u65B9\u6848\uFF0C\u5E76\u628A\u5185\u5BB9\u9AD8\u8BBE\u4E3A 31px\uFF0C\u4F7F dwb-header(44)+\u672C\u680F(32)=76\uFF0C
   \u5206\u9694\u7EBF\u3001\u9762\u677F header \u9AD8\u5EA6\u3001\u5185\u5BB9\u533A\u8D77\u70B9\u4E09\u8005\u90FD\u4E0E\u4E3B\u5BF9\u8BDD\u5217 header \u4E00\u81F4\u3002 */
.dwb-tabbar { display: flex; align-items: stretch; border-bottom: 1px solid transparent; position: relative; flex: none; min-height: 31px; }
.dwb-tabbar::after { content: ''; position: absolute; right: 0; bottom: 1px; left: 0; height: 1px; background: var(--dsw-alias-border-l2); pointer-events: none; }
.dwb-tabbar-tabs { display: flex; align-items: stretch; flex: 1; overflow-x: auto; scrollbar-width: none; }
.dwb-tabbar-tabs::-webkit-scrollbar { display: none; }
.dwb-tab { display: flex; align-items: center; gap: 5px; padding: 0 8px; min-width: 0; max-width: 160px; border: none; background: transparent; color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 14px; font-weight: 500; cursor: pointer; position: relative; white-space: nowrap; flex: none; }
.dwb-tab::after { content: ''; position: absolute; right: 0; bottom: 0; left: 0; height: 2px; border-radius: 2px; background: transparent; }
.dwb-tab:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-interactive-bg-hover); }
.dwb-tab-active { color: var(--dsw-alias-label-primary); }
.dwb-tab-active::after { background: var(--dsw-alias-state-business-primary); }
.dwb-tab-icon { flex: none; display: flex; align-items: center; opacity: .8; }
.dwb-tab-label { overflow: hidden; text-overflow: ellipsis; }
.dwb-tab-close { flex: none; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 4px; background: transparent; color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 1; cursor: pointer; padding: 0; margin-left: auto; }
.dwb-tab-close:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.dwb-tabbar-plus { flex: none; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: none; background: transparent; color: var(--dsw-alias-label-tertiary); font-size: 16px; line-height: 1; cursor: pointer; border-left: 1px solid transparent; }
.dwb-tabbar-plus:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.dwb-content { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; position: relative; }
/* \u2500\u2500 \u5E38\u9A7B\u6302\u8F7D\u7684\u6807\u7B7E pane\uFF1A\u6240\u6709\u6807\u7B7E\u540C\u65F6\u5B58\u5728\u4E8E DOM\uFF0C\u975E\u6FC0\u6D3B\u7684 display:none \u9690\u85CF \u2500\u2500
   \u9690\u85CF\u800C\u975E\u5378\u8F7D\u2014\u2014\u5207\u6362\u6807\u7B7E\u65F6\u7EC4\u4EF6\u5B9E\u4F8B\u4E0D\u88AB\u9500\u6BC1\uFF0C\u6D4F\u89C8\u5668 URL/\u5386\u53F2\u7B49\u72B6\u6001\u5F97\u4EE5\u4FDD\u7559\u3002 */
.dwb-pane { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; }
.dwb-pane-hidden { display: none; }
/* \u2500\u2500 feature grid (\u9996\u9875) \u2500\u2500 */
.dwb-feature-grid { flex: 1; min-height: 0; overflow: auto; padding: 20px; }
.dwb-feature-grid-inner { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 12px; max-width: 400px; margin: 0 auto; }
.dwb-feature-card { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px 8px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px; background: var(--dsw-alias-bg-layer-3); color: var(--dsw-alias-label-primary); cursor: pointer; transition: background .15s, border-color .15s; }
.dwb-feature-card:hover { background: var(--dsw-alias-interactive-bg-hover); border-color: var(--dsw-alias-border-l3); }
.dwb-feature-card-icon { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; color: var(--dsw-alias-label-secondary); }
.dwb-feature-card-label { font-size: 11px; line-height: 1.3; text-align: center; }
.dwb-feature-disabled { opacity: .4; cursor: default; }
.dwb-feature-disabled:hover { background: var(--dsw-alias-bg-layer-3); border-color: var(--dsw-alias-border-l2); }
/* \u2500\u2500 terminal (xterm.js)\uFF1A\u5E73\u94FA\u5E03\u5C40\uFF0C\u914D\u8272\u8DDF\u968F DSH \u4E3B\u9898 token \u2500\u2500 */
/* \u7EC8\u7AEF\u76F4\u63A5\u5360\u6EE1\u6807\u7B7E\u5185\u5BB9\u533A\uFF08\u4E0E\u76EE\u5F55/Git \u7B49\u5185\u5BB9\u540C\u7EA7\uFF09\uFF0C\u65E0\u5361\u7247/\u7A97\u6846\u5D4C\u5957\uFF1B
   \u5E95\u90E8\u4E00\u6761 tmux \u98CE\u683C\u72B6\u6001\u884C\u3002\u5E95\u8272\u53D6\u9762\u677F token --dsw-alias-bg-layer-2\uFF0C
   \u4E0E\u9762\u677F\u80CC\u666F\u5B8C\u5168\u4E00\u81F4\uFF08xterm \u4E3B\u9898\u5728 JS \u4FA7\u8BFB\u540C\u4E00 token\uFF0C\u65E0\u8272\u5DEE\u63A5\u7F1D\uFF09\u3002 */
.dwb-terminal-wrap { flex: 1; min-height: 0; display: flex; flex-direction: column; background: var(--dsw-alias-bg-layer-2); }
.dwb-term-body { position: relative; flex: 1; min-height: 0; display: flex; flex-direction: column; }
.dwb-terminal { flex: 1; min-height: 0; padding: 4px 4px 4px 8px; }
.dwb-terminal .xterm { height: 100%; }
.dwb-terminal .xterm-viewport { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, var(--dsw-alias-label-tertiary) 35%, transparent) transparent; }
.dwb-terminal .xterm-viewport::-webkit-scrollbar { width: 8px; }
.dwb-terminal .xterm-viewport::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--dsw-alias-label-tertiary) 35%, transparent); border-radius: 4px; }
.dwb-terminal .xterm-viewport::-webkit-scrollbar-thumb:hover { background: color-mix(in srgb, var(--dsw-alias-label-tertiary) 55%, transparent); }
.dwb-terminal .xterm-viewport::-webkit-scrollbar-track { background: transparent; }
/* \u5E95\u90E8\u72B6\u6001\u884C\uFF08tmux \u98CE\u683C\uFF09\uFF1A\u5DE6\u72B6\u6001\u70B9\uFF0C\u53F3 shell \xB7 cwd \xB7 pid\u3002 */
.dwb-term-statusline { flex: none; display: flex; align-items: center; justify-content: space-between; gap: 8px; height: 22px; padding: 0 10px; background: var(--dsw-alias-bg-layer-3); border-top: 1px solid var(--dsw-alias-border-l2); color: var(--dsw-alias-label-tertiary); font-family: var(--ds-font-family-code); font-size: 10px; line-height: 1; white-space: nowrap; }
.dwb-term-status { flex: none; display: flex; align-items: center; gap: 5px; }
.dwb-term-meta { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; text-align: right; }
.dwb-term-statusdot { width: 6px; height: 6px; border-radius: 50%; background: #3fb950; box-shadow: 0 0 5px rgba(63,185,80,.7); animation: dwb-term-pulse 2s ease-in-out infinite; }
.dwb-terminal-wrap[data-status='warn'] .dwb-term-statusdot { background: #d29922; box-shadow: 0 0 5px rgba(210,153,34,.7); animation-duration: .8s; }
.dwb-terminal-wrap[data-status='warn'] .dwb-term-status { color: #d29922; }
.dwb-terminal-wrap[data-status='down'] .dwb-term-statusdot { background: var(--dsw-alias-state-error-primary, #f85149); box-shadow: none; animation: none; }
.dwb-terminal-wrap[data-status='down'] .dwb-term-status { color: var(--dsw-alias-state-error-primary, #f85149); }
@keyframes dwb-term-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
/* \u542F\u52A8\u5E55\uFF1A\u4E09\u70B9\u5F39\u8DF3 + \u6587\u6848\u3002 */
.dwb-term-boot { position: absolute; inset: 0; z-index: 3; display: flex; align-items: center; justify-content: center; gap: 10px; color: var(--dsw-alias-label-tertiary); font-size: 12px; background: var(--dsw-alias-bg-layer-2); }
.dwb-term-bootdots { display: inline-flex; gap: 4px; }
.dwb-term-bootdots i { width: 5px; height: 5px; border-radius: 50%; background: var(--dsw-alias-state-business-primary); animation: dwb-term-bounce 1s ease-in-out infinite; }
.dwb-term-bootdots i:nth-child(2) { animation-delay: .15s; }
.dwb-term-bootdots i:nth-child(3) { animation-delay: .3s; }
@keyframes dwb-term-bounce { 0%, 100% { transform: translateY(0); opacity: .45; } 50% { transform: translateY(-4px); opacity: 1; } }
/* \u8986\u76D6\u5C42\uFF08\u9000\u51FA/\u7ED3\u675F/\u5931\u8D25\uFF09\uFF1A\u540C\u4E3B\u9898\u5E95\u8272\uFF0C\u63CF\u8FB9\u6309\u94AE\u3002 */
.dwb-term-overlay { position: absolute; inset: 0; z-index: 5; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 94%, transparent); color: var(--dsw-alias-label-secondary); text-align: center; padding: 24px; }
.dwb-term-overlay-title { font-size: 13px; font-weight: 600; color: var(--dsw-alias-label-primary); }
.dwb-term-overlay-sub { font-size: 12px; color: var(--dsw-alias-label-tertiary); max-width: 260px; line-height: 1.6; word-break: break-word; }
.dwb-term-btn { margin-top: 8px; height: 28px; padding: 0 16px; font-size: 12px; border: 1px solid var(--dsw-alias-border-l3, var(--dsw-alias-border-l2)); border-radius: 6px; background: transparent; color: var(--dsw-alias-label-primary); cursor: pointer; transition: border-color .15s, color .15s, background .15s; }
.dwb-term-btn:hover { border-color: var(--dsw-alias-state-business-primary); color: var(--dsw-alias-state-business-primary); background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 8%, transparent); }
.dwb-scroll { flex: 1; min-height: 0; overflow: auto; padding: 6px 6px 12px; }
.dwb-busy { opacity: .55; pointer-events: none; }
.dwb-row { display: flex; align-items: center; gap: 6px; padding: 3px 6px; border-radius: 6px; cursor: default; white-space: nowrap; }
.dwb-row[data-dir] { cursor: pointer; }
.dwb-row:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dwb-caret { flex: none; width: 12px; display: flex; align-items: center; justify-content: center; color: var(--dsw-alias-label-tertiary); }
.dwb-caret svg { transition: transform .15s var(--ds-ease-in-out); }
.dwb-caret[data-open] svg { transform: rotate(90deg); }
.dwb-diricon { flex: none; display: flex; align-items: center; color: var(--dsw-alias-label-secondary); }
.dwb-diricon[data-open] { color: var(--dsw-alias-brand-text); }
.dwb-fileicon { flex: none; display: flex; align-items: center; color: var(--dsw-alias-label-secondary); }
.dwb-fileicon[data-kind='code'] { color: var(--dsw-static-blue-500); }
.dwb-fileicon[data-kind='config'] { color: var(--dsw-static-amber-500); }
.dwb-fileicon[data-kind='doc'] { color: var(--dsw-static-green-500); }
.dwb-size { margin-left: auto; flex: none; color: var(--dsw-alias-label-tertiary); font-size: 11px; }
.dwb-name { overflow: hidden; text-overflow: ellipsis; }
.dwb-row[data-dir] .dwb-name { font-weight: 500; }
.dwb-row[data-hidden] { opacity: .6; }
.dwb-note { color: var(--dsw-alias-label-tertiary); font-size: 11px; padding: 2px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dwb-note[data-error] { color: var(--dsw-alias-state-error-primary); }
.dwb-branch { display: flex; align-items: center; gap: 8px; padding: 6px 8px; font-weight: 600; }
.dwb-branchlabel { color: var(--dsw-alias-label-tertiary); font-weight: 400; font-size: 12px; }
.dwb-pill { font-size: 11px; padding: 1px 8px; border-radius: 999px; background: var(--dsw-alias-bg-layer-3); color: var(--dsw-alias-label-secondary); border: 1px solid var(--dsw-alias-border-l2); font-weight: 400; margin-left: auto; }
.dwb-section { color: var(--dsw-alias-label-tertiary); font-size: 11px; letter-spacing: .04em; margin: 10px 8px 4px; display: flex; align-items: center; gap: 8px; }
.dwb-section .dwb-minibtn:first-of-type { margin-left: auto; }
.dwb-graph { overflow-x: auto; padding: 2px 0; }
.dwb-graphrow { display: flex; align-items: baseline; gap: 6px; padding: 2px 8px; border-radius: 6px; white-space: nowrap; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }
.dwb-graphrow:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dwb-graphrow[data-head] .dwb-hash { color: var(--dsw-alias-brand-text); font-weight: 700; }
.dwb-graphcol { flex: none; color: var(--dsw-alias-label-tertiary); min-width: 12px; }
.dwb-graphsubject { overflow: hidden; text-overflow: ellipsis; color: var(--dsw-alias-label-primary); }
.dwb-hash { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--dsw-alias-brand-text); font-size: 12px; flex: none; }
.dwb-headtag { flex: none; margin-left: auto; font-size: 10px; font-weight: 600; line-height: 1.6; padding: 0 6px; border-radius: 999px; background: var(--dsw-alias-brand-primary); color: var(--dsw-alias-label-primary-foreground); letter-spacing: .03em; }
.dwb-minibtn { flex: none; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-3); color: var(--dsw-alias-label-secondary); border-radius: 6px; cursor: pointer; }
.dwb-minibtn:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.dwb-minibtnactive { color: var(--dsw-alias-brand-text); border-color: var(--dsw-alias-border-l3); background: var(--dsw-alias-interactive-bg-hover); }
.dwb-minibtn:disabled { opacity: .5; cursor: default; }
.dwb-change { display: flex; gap: 8px; align-items: center; padding: 3px 8px; border-radius: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; white-space: nowrap; }
.dwb-change:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dwb-stagebtn { flex: none; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-3); color: var(--dsw-alias-label-secondary); border-radius: 6px; cursor: pointer; }
.dwb-stagebtn:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.dwb-stagebtn:disabled { opacity: .5; cursor: default; }
.dwb-badge { flex: none; width: 28px; text-align: center; border-radius: 4px; font-size: 11px; padding: 0 2px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-3); }
.dwb-badge[data-kind='M'], .dwb-badge[data-kind='R'], .dwb-badge[data-kind='C'] { color: var(--dsw-alias-state-warn-primary); background: var(--dsw-alias-state-warn-tertiary); }
.dwb-badge[data-kind='A'], .dwb-badge[data-kind='?'] { color: var(--dsw-alias-state-success-primary); background: var(--dsw-alias-state-success-tertiary); }
.dwb-badge[data-kind='D'] { color: var(--dsw-alias-state-error-primary); background: var(--dsw-alias-bg-layer-3); }
.dwb-changepath { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.dwb-commitrow { display: flex; gap: 6px; padding: 2px 8px; }
.dwb-commitinput { flex: 1; min-width: 0; border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px; background: var(--dsw-alias-bg-layer-3); color: var(--dsw-alias-label-primary); font-size: 12px; padding: 4px 8px; outline: none; }
.dwb-commitinput:focus { border-color: var(--dsw-alias-border-l3); }
.dwb-commitbtn { flex: none; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 6px; cursor: pointer; background: var(--dsw-alias-button-primary-fill); color: var(--dsw-alias-label-primary-foreground); }
.dwb-commitbtn:hover { background: var(--dsw-alias-button-primary-hover); }
.dwb-commitbtn:disabled { opacity: .55; cursor: default; }
.dwb-emptygit { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 36px 20px; text-align: center; color: var(--dsw-alias-label-tertiary); }
.dwb-emptyicon { opacity: .5; }
.dwb-emptytitle { font-size: 13px; font-weight: 500; color: var(--dsw-alias-label-secondary); }
.dwb-emptyhint { font-size: 12px; line-height: 1.6; max-width: 260px; }
.dwb-initbtn { margin-top: 8px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 8px; cursor: pointer; background: var(--dsw-alias-button-primary-fill); color: var(--dsw-alias-label-primary-foreground); }
.dwb-initbtn:hover { background: var(--dsw-alias-button-primary-hover); }
.dwb-initbtn:disabled { opacity: .55; cursor: default; }
.dwb-spin { display: inline-flex; animation: dwb-spin .9s linear infinite; }
@keyframes dwb-spin { to { transform: rotate(360deg); } }
.dwb-tip { position: fixed; z-index: 100; transform: translate(-50%, -100%); width: max-content; max-width: 50vw; padding: 3px 7px; border-radius: 8px; background: var(--dsw-alias-tooltip-bg); color: var(--dsw-static-neutral-bluish-00); font-size: 12px; line-height: 1.6; white-space: pre-line; overflow-wrap: break-word; pointer-events: none; box-shadow: 0 4px 12px rgba(0,0,0,.18); animation: dwb-tip-in 150ms var(--ds-ease-in-out); }
.dwb-tip-below { transform: translate(-50%, 0); }
@keyframes dwb-tip-in { from { opacity: 0; } }
.dwb-openbtn { position: absolute; right: 0; top: 50%; transform: translateY(-50%); height: auto; min-height: 44px; padding: 8px 6px; display: flex; align-items: center; justify-content: center; writing-mode: vertical-rl; font-size: 12px; font-weight: 500; line-height: 1.5; border-radius: 8px 0 0 8px; border: 1px solid var(--dsw-alias-border-l2); border-right: none; background: var(--dsw-alias-button-floating-fill); color: var(--dsw-alias-label-secondary); cursor: pointer; box-shadow: -4px 0 12px rgba(0,0,0,.08); }
.dwb-openbtn:hover { background: var(--dsw-alias-button-floating-hover); color: var(--dsw-alias-label-primary); }
.dwb-preview { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.dwb-previewheader { display: flex; align-items: center; gap: 6px; padding: 6px 8px; border-bottom: 1px solid var(--dsw-alias-border-l2); flex: none; min-width: 0; }
.dwb-previewmeta { flex: 1; min-width: 0; overflow: hidden; }
.dwb-previewname { font-weight: 600; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dwb-previewsub { color: var(--dsw-alias-label-tertiary); font-size: 11px; }
.dwb-previewscroll { flex: 1; min-height: 0; overflow: auto; padding: 8px; display: flex; flex-direction: column; }
.dwb-previewtext { flex: 1; margin: 0; padding: 8px 10px; background: var(--dsw-alias-bg-layer-3); border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; overflow: auto; white-space: pre-wrap; word-break: break-word; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; line-height: 1.6; color: var(--dsw-alias-label-primary); }
.dwb-previewnote { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--dsw-alias-label-tertiary); font-size: 12px; text-align: center; padding: 24px 16px; }
.dwb-previewmedia { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; }
.dwb-previewimg { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 6px; }
.dwb-previewaudio { width: 100%; }
.dwb-previewvideo { max-width: 100%; max-height: 100%; border-radius: 6px; background: #000; }
/* \u8F68\u9053\u79FB\u51FA dwb-root\uFF08root \u7684 overflow:hidden \u4F1A\u88C1\u526A\u6EA2\u51FA\u90E8\u5206\uFF09\uFF0C\u4F5C\u4E3A\u5144\u5F1F
   \u8282\u70B9\u6302\u5728 overflow:visible \u7684 overlay \u5C42\uFF0Cright \u5B9A\u4F4D\u8D34\u4F4F\u9762\u677F\u5DE6\u8FB9\u7F18\uFF1A
   right = \u9762\u677F\u5BBD\u5EA6 \u2212 4\uFF0C\u4F7F 8px \u8F68\u9053\u4E2D\u5FC3\u6B63\u597D\u843D\u5728\u9762\u677F\u5DE6\u8FB9\u7F18\u7EBF\u4E0A\u3002 */
.dwb-resize { position: absolute; top: 0; bottom: 0; width: 8px; cursor: ew-resize; z-index: 5; touch-action: none; }
/* hover \u624B\u67C4\uFF1A\u9A91\u5728\u9762\u677F\u8FB9\u7F18\u4E2D\u592E\u3001\u5DE6\u53F3\u5BF9\u79F0\u7684\u80F6\u56CA\uFF0C\u4E2D\u5FC3\u6B63\u597D\u5728\u8FB9\u7F18\u7EBF\u4E0A\uFF0C
   \u5185\u542B\u5C0F\u7BAD\u5934\uFF08\u5355\u51FB\u6536\u8D77\uFF09\u3002 */
.dwb-resize-grip { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 20px; height: 44px; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-sizing: border-box; background: var(--dsw-alias-button-floating-fill); border: 1px solid var(--dsw-alias-border-l2-darkmode-thin); cursor: pointer; opacity: 0; transition: opacity var(--ds-transition-duration-slow) var(--ds-ease-in-out), background var(--ds-transition-duration-slow) var(--ds-ease-in-out); }
.dwb-resize:hover .dwb-resize-grip, .dwb-resize[data-dragging='true'] .dwb-resize-grip { opacity: 1; }
.dwb-resize:hover .dwb-resize-grip, .dwb-resize[data-dragging='true'] .dwb-resize-grip { background: var(--dsw-alias-button-floating-hover); border-color: var(--dsw-alias-border-l3); }
.dwb-resize-arrow { display: flex; align-items: center; justify-content: center; color: var(--dsw-alias-label-secondary); }
.dwb-split { flex: 1; min-height: 0; display: flex; }
.dwb-split-pane { min-width: 0; overflow: hidden; display: flex; flex-direction: column; }
.dwb-split-divider { flex: none; width: 6px; cursor: col-resize; touch-action: none; position: relative; }
/* \u5E38\u9A7B\u7EC6\u5206\u5272\u7EBF\uFF1A\u4E24\u680F\u4E4B\u95F4\u59CB\u7EC8\u53EF\u89C1\uFF0Chover/\u62D6\u52A8\u65F6\u52A0\u4EAE\u52A0\u5BBD\u3002 */
.dwb-split-divider::after { content: ''; position: absolute; top: 0; bottom: 0; left: 50%; transform: translateX(-50%); width: 1px; background: var(--dsw-alias-border-l2); transition: width var(--ds-transition-duration-slow) var(--ds-ease-in-out), background var(--ds-transition-duration-slow) var(--ds-ease-in-out); }
.dwb-split-divider:hover::after, .dwb-split-divider[data-dragging='true']::after { width: 3px; background: var(--dsw-alias-border-l3); }
.dwb-dragging, .dwb-dragging * { user-select: none !important; }
.dwb-split-dragging, .dwb-split-dragging * { user-select: none !important; }
@media (prefers-reduced-motion: reduce) { .dwb-tip { animation: none; } }
/* \u2500\u2500 preview: syntax-highlight tokens (shell's global --shiki-token-* palette) \u2500\u2500 */
.dwb-tok-comment { color: var(--shiki-token-comment); }
.dwb-tok-string { color: var(--shiki-token-string); }
.dwb-tok-number { color: var(--shiki-token-constant); }
.dwb-tok-keyword { color: var(--shiki-token-keyword); }
.dwb-tok-type { color: var(--shiki-token-function); }
.dwb-tok-call { color: var(--shiki-token-function); }
.dwb-tok-prop { color: var(--shiki-token-constant); }
.dwb-tok-param { color: var(--shiki-token-parameter); }
.dwb-tok-punct { color: var(--shiki-token-punctuation); }
/* \u2500\u2500 preview: \u6E90\u7801 | \u9884\u89C8 view group\uFF08\u6309\u94AE\u7EC4\uFF1A\u5916\u6846 + \u56FE\u6807\uFF0C\u9AD8\u5EA6\u4E0E\u53F3\u4FA7\u6309\u94AE\u4E00\u81F4 22px\uFF09\u2500\u2500 */
.dwb-viewgroup { flex: none; height: 22px; box-sizing: border-box; display: flex; align-items: center; gap: 2px; padding: 1px; background: var(--dsw-alias-bg-layer-3); border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px; }
.dwb-viewgroupbtn { flex: none; width: 20px; height: 18px; border: none; background: transparent; color: var(--dsw-alias-label-secondary); display: flex; align-items: center; justify-content: center; padding: 0; line-height: 0; border-radius: 4px; cursor: pointer; }
.dwb-viewgroupbtn:hover { color: var(--dsw-alias-label-primary); }
.dwb-viewgroupbtn[data-active], .dwb-viewgroupbtn[data-active]:hover { background: var(--dsw-alias-state-business-primary); color: var(--dsw-static-neutral-bluish-00); }
/* \u2500\u2500 preview: rendered markdown \u2500\u2500 */
.dwb-preview-md { flex: 1; min-height: 0; overflow: auto; padding: 4px 6px; font-size: 13px; line-height: 1.7; color: var(--dsw-alias-label-primary); }
.dwb-preview-md h1 { font-size: 18px; margin: 10px 0 8px; font-weight: 700; }
.dwb-preview-md h2 { font-size: 16px; margin: 10px 0 6px; font-weight: 700; }
.dwb-preview-md h3 { font-size: 14px; margin: 8px 0 4px; font-weight: 700; }
.dwb-preview-md h4, .dwb-preview-md h5, .dwb-preview-md h6 { font-size: 13px; margin: 8px 0 4px; font-weight: 700; }
.dwb-preview-md p { margin: 6px 0; }
.dwb-preview-md ul, .dwb-preview-md ol { margin: 6px 0; padding-left: 22px; }
.dwb-preview-md li { margin: 2px 0; }
.dwb-preview-md blockquote { margin: 8px 0; padding: 4px 12px; border-left: 3px solid var(--dsw-alias-border-l3); color: var(--dsw-alias-label-secondary); }
.dwb-preview-md hr { border: none; border-top: 1px solid var(--dsw-alias-border-l2); margin: 12px 0; }
.dwb-preview-md code { background: var(--dsw-alias-bg-layer-3); border-radius: 4px; padding: 1px 5px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }
.dwb-preview-md pre { background: var(--dsw-alias-bg-layer-3); border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; padding: 10px 12px; overflow: auto; margin: 8px 0; }
.dwb-preview-md pre code { background: transparent; padding: 0; border-radius: 0; }
.dwb-preview-md a { color: var(--dsw-alias-brand-text); text-decoration: none; }
.dwb-preview-md a:hover { text-decoration: underline; }
.dwb-preview-md img { max-width: 100%; border-radius: 6px; }
/* GFM \u8868\u683C:\u8868\u5934\u6D45\u5E95 + \u7F51\u683C\u5206\u9694,\u5BBD\u5EA6\u81EA\u9002\u5E94\u5BB9\u5668(marked \u8F93\u51FA thead/tbody \u7ED3\u6784) */
.dwb-preview-md table { border-collapse: collapse; width: auto; max-width: 100%; margin: 8px 0; }
.dwb-preview-md th { text-align: left; padding: 6px 12px; border-bottom: 1px solid var(--dsw-alias-border-l3); border-right: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-markdown-inline-code); font-weight: 600; }
.dwb-preview-md td { padding: 6px 12px; border-bottom: 1px solid var(--dsw-alias-border-l2); border-right: 1px solid var(--dsw-alias-border-l2); }
.dwb-preview-md th:last-child, .dwb-preview-md td:last-child { border-right: none; }
.dwb-preview-md tbody tr:last-child td { border-bottom: none; }
.dwb-preview-md li input[type="checkbox"] { margin: 0 6px 0 0; }
/* \u2500\u2500 preview: sandboxed html browser \u2500\u2500 */
.dwb-preview-frame { flex: 1; min-height: 0; width: 100%; border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; background: #fff; }
/* \u2500\u2500 preview header actions: \u6E90\u7801/\u9884\u89C8\u5207\u6362 + \u4FDD\u5B58 + VS Code\uFF08\u7EDF\u4E00 .dwb-minibtn \u56FE\u6807\u6309\u94AE\uFF09\u2500\u2500 */
.dwb-previewactions { flex: none; display: flex; align-items: center; gap: 6px; }
.dwb-savebtn-ok { border-color: var(--dsw-alias-state-success-primary); color: var(--dsw-alias-state-success-primary); }
.dwb-savebtn-ok:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-state-success-primary); }
/* \u2500\u2500 browser sandbox \u2500\u2500 */
.dwb-browser { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.dwb-browser-bar { display: flex; align-items: center; gap: 6px; padding: 6px 8px; border-bottom: 1px solid var(--dsw-alias-border-l2); flex: none; min-width: 0; }
.dwb-browser-navbtn { flex: none; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 8px; background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer; padding: 0; }
.dwb-browser-navbtn:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.dwb-browser-navbtn:disabled { opacity: .4; cursor: default; }
.dwb-browser-urlinput { flex: 1; min-width: 0; border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px; background: var(--dsw-alias-bg-layer-3); color: var(--dsw-alias-label-primary); font-size: 12px; padding: 4px 8px; outline: none; }
.dwb-browser-urlinput:focus { border-color: var(--dsw-alias-border-l3); }
.dwb-browser-content { flex: 1; min-height: 0; position: relative; display: flex; flex-direction: column; background: var(--dsw-alias-bg-layer-1); }
.dwb-browser-frame { flex: 1; min-height: 0; width: 100%; border: none; background: #fff; }
.dwb-browser-loading { position: absolute; top: 0; left: 0; right: 0; z-index: 2; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; font-size: 12px; color: var(--dsw-alias-label-tertiary); background: var(--dsw-alias-bg-layer-2); }
.dwb-loading-icon { display: inline-flex; }
.dwb-browser-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 36px 20px; text-align: center; color: var(--dsw-alias-label-tertiary); }
.dwb-browser-emptyicon { font-size: 28px; opacity: .7; }
.dwb-browser-emptytitle { font-size: 13px; font-weight: 500; color: var(--dsw-alias-label-secondary); }
.dwb-browser-emptyhint { font-size: 12px; line-height: 1.6; max-width: 260px; }
/* \u2500\u2500 browser: Playwright screenshot mode \u2500\u2500 */
.dwb-browser-screenshot-wrap { flex: 1; min-height: 0; position: relative; overflow: auto; outline: none; cursor: crosshair; background: var(--dsw-alias-bg-layer-1); }
.dwb-browser-screenshot { display: block; max-width: 100%; height: auto; user-select: none; -webkit-user-drag: none; }
.dwb-browser-interlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1; }
.dwb-browser-error { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 36px 20px; text-align: center; color: var(--dsw-alias-label-tertiary); }
.dwb-browser-error-title { font-size: 13px; font-weight: 500; color: var(--dsw-alias-state-error-primary); }
.dwb-browser-error-msg { font-size: 12px; line-height: 1.6; max-width: 260px; word-break: break-word; }
/* \u2500\u2500 browser: safe mode button + status bar + messages \u2500\u2500 */
.dwb-browser-safe-on { color: var(--dsw-alias-state-success-primary) !important; }
.dwb-browser-safe-on:hover { background: var(--dsw-alias-state-success-tertiary) !important; }
.dwb-browser-warn { flex: none; display: flex; align-items: center; gap: 8px; padding: 5px 12px; font-size: 11px; color: var(--dsw-alias-label-tertiary); background: var(--dsw-alias-bg-layer-3); border-bottom: 1px solid var(--dsw-alias-border-l2); }
.dwb-browser-warn-btn { flex: none; height: 18px; padding: 0 8px; font-size: 10px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 4px; background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer; }
.dwb-browser-warn-btn:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.dwb-browser-message { flex: none; padding: 6px 12px; font-size: 11px; color: var(--dsw-alias-state-error-primary); background: var(--dsw-alias-state-error-tertiary); border-bottom: 1px solid var(--dsw-alias-border-l2); }
.dwb-browser-error { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 36px 20px; text-align: center; color: var(--dsw-alias-label-tertiary); }
.dwb-browser-error-title { font-size: 13px; font-weight: 500; color: var(--dsw-alias-state-error-primary); }
.dwb-browser-error-msg { font-size: 12px; line-height: 1.6; max-width: 260px; word-break: break-word; }
.dwb-browser-error-actions { display: flex; gap: 8px; margin-top: 8px; }
.dwb-browser-error-btn { height: 28px; padding: 0 14px; font-size: 12px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px; background: var(--dsw-alias-bg-layer-3); color: var(--dsw-alias-label-secondary); cursor: pointer; }
.dwb-browser-error-btn:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
/* \u2500\u2500 code editor (CodeMirror) \u2500\u2500 */
.dwb-editorscroll { overflow: hidden; padding: 0; }
.dwb-editor { flex: 1; min-height: 0; overflow: hidden; }
.dwb-editor[data-hidden] { display: none; }
.dwb-editor .cm-editor { height: 100%; }
.dwb-editor .cm-scroller { overflow: auto; font-family: var(--ds-font-family-code); }
.dwb-editor .cm-gutters { border-right: 1px solid var(--dsw-alias-border-l2); }
/* \u2500\u2500 taskboard\uFF08\u4EFB\u52A1\u770B\u677F\uFF09\uFF1A\u4E94\u5217\u770B\u677F + \u8BE6\u60C5/\u65B0\u5EFA\u6A21\u6001\uFF0C\u914D\u8272\u8DDF\u968F DSH \u4E3B\u9898 token \u2500\u2500 */
.dwb-tb { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.dwb-tb-header { flex: none; display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-bottom: 1px solid var(--dsw-alias-border-l2); flex-wrap: wrap; }
.dwb-tb-title { flex: none; margin: 0; font-size: 13px; font-weight: 600; line-height: 20px; }
.dwb-tb-meta { flex: none; font-size: 10px; color: var(--dsw-alias-label-tertiary); white-space: nowrap; }
.dwb-tb-search { flex: 1; min-width: 80px; height: 26px; padding: 0 8px; font-size: 12px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-3); border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px; outline: none; }
.dwb-tb-search:focus { border-color: var(--dsw-alias-state-business-primary); }
.dwb-tb-btn { flex: none; height: 26px; padding: 0 10px; font-size: 12px; line-height: 1; border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px; background: var(--dsw-alias-bg-layer-3); color: var(--dsw-alias-label-secondary); cursor: pointer; white-space: nowrap; transition: background .12s, border-color .12s; }
.dwb-tb-btn:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.dwb-tb-btn:disabled { opacity: .45; cursor: default; }
.dwb-tb-btn-primary { background: var(--dsw-alias-state-business-primary); border-color: var(--dsw-alias-state-business-primary); color: #fff; }
.dwb-tb-btn-primary:hover:not(:disabled) { background: var(--dsw-alias-state-business-primary); filter: brightness(1.08); color: #fff; }
.dwb-tb-btn-danger { background: var(--dsw-alias-state-error-primary); border-color: var(--dsw-alias-state-error-primary); color: #fff; }
.dwb-tb-btn-danger:hover:not(:disabled) { background: var(--dsw-alias-state-error-primary); filter: brightness(1.08); color: #fff; }
.dwb-tb-linkbtn { border: none; background: transparent; color: var(--dsw-alias-state-business-primary); font-size: inherit; cursor: pointer; padding: 0; }
.dwb-tb-linkbtn:hover { text-decoration: underline; }
.dwb-tb-iconbtn { flex: none; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 6px; background: transparent; color: var(--dsw-alias-label-secondary); font-size: 16px; line-height: 1; cursor: pointer; padding: 0; }
.dwb-tb-iconbtn:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.dwb-tb-error { flex: none; display: flex; align-items: center; gap: 6px; padding: 6px 12px; font-size: 11px; color: var(--dsw-alias-state-error-primary); background: var(--dsw-alias-state-error-tertiary); border-bottom: 1px solid var(--dsw-alias-border-l2); }
/* \u5217\u533A\uFF1A\u6A2A\u5411\u6EDA\u52A8\uFF0C\u7A84\u9762\u677F\u4E5F\u80FD\u770B\u5168\u4E94\u5217\u3002 */
.dwb-tb-columns { flex: 1; min-height: 0; display: flex; gap: 8px; padding: 10px 12px; overflow-x: auto; overflow-y: hidden; scrollbar-width: thin; }
.dwb-tb-column { flex: 1 0 180px; min-width: 180px; max-width: 320px; display: flex; flex-direction: column; min-height: 0; background: var(--dsw-alias-bg-layer-3); border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px; overflow: hidden; }
.dwb-tb-column-header { flex: none; display: flex; align-items: center; gap: 6px; padding: 8px 10px; border-bottom: 1px solid var(--dsw-alias-border-l2); }
.dwb-tb-column-title { margin: 0; font-size: 12px; font-weight: 600; line-height: 16px; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dwb-tb-column-count { flex: none; font-size: 10px; color: var(--dsw-alias-label-tertiary); background: var(--dsw-alias-bg-layer-2); border-radius: 8px; padding: 1px 6px; }
.dwb-tb-statusdot { flex: none; width: 8px; height: 8px; border-radius: 50%; }
.dwb-tb-statusdot[data-status='backlog'] { background: var(--dsw-alias-label-tertiary); }
.dwb-tb-statusdot[data-status='todo'] { background: var(--dsw-alias-state-business-primary); }
.dwb-tb-statusdot[data-status='running'] { background: #d29922; }
.dwb-tb-statusdot[data-status='done'] { background: var(--dsw-alias-state-success-primary); }
.dwb-tb-statusdot[data-status='failed'] { background: var(--dsw-alias-state-error-primary); }
.dwb-tb-statusdot[data-status='archived'] { background: var(--dsw-alias-label-tertiary); }
.dwb-tb-cards { flex: 1; min-height: 0; overflow-y: auto; padding: 8px; display: flex; flex-direction: column; gap: 8px; scrollbar-width: thin; }
.dwb-tb-column-empty { font-size: 11px; color: var(--dsw-alias-label-tertiary); text-align: center; padding: 16px 4px; }
/* \u5361\u7247\u3002 */
.dwb-tb-card { display: flex; flex-direction: column; gap: 4px; width: 100%; text-align: left; padding: 8px 10px; background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; color: var(--dsw-alias-label-primary); cursor: pointer; transition: border-color .12s, background .12s; font: inherit; }
.dwb-tb-card:hover { border-color: var(--dsw-alias-border-l3); background: var(--dsw-alias-interactive-bg-hover); }
.dwb-tb-card[data-status='running'] { border-left: 2px solid #d29922; }
.dwb-tb-card[data-status='done'] { border-left: 2px solid var(--dsw-alias-state-success-primary); }
.dwb-tb-card[data-status='failed'] { border-left: 2px solid var(--dsw-alias-state-error-primary); }
.dwb-tb-card[data-status='todo'] { border-left: 2px solid var(--dsw-alias-state-business-primary); }
.dwb-tb-card[data-status='backlog'], .dwb-tb-card[data-status='archived'] { border-left: 2px solid var(--dsw-alias-label-tertiary); }
.dwb-tb-card-title { font-size: 12px; font-weight: 600; line-height: 1.4; word-break: break-word; }
.dwb-tb-card-excerpt { font-size: 11px; color: var(--dsw-alias-label-tertiary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; }
.dwb-tb-card-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 10px; color: var(--dsw-alias-label-tertiary); }
.dwb-tb-card-run[data-result='succeeded'] { color: var(--dsw-alias-state-success-primary); }
.dwb-tb-card-run[data-result='failed'] { color: var(--dsw-alias-state-error-primary); }
.dwb-tb-card-session { color: var(--dsw-alias-state-business-primary); }
.dwb-tb-card-running { font-size: 10px; color: #d29922; }
.dwb-tb-spinner { flex: none; width: 12px; height: 12px; border: 2px solid color-mix(in srgb, var(--dsw-alias-label-tertiary) 35%, transparent); border-top-color: #d29922; border-radius: 50%; animation: dwb-tb-spin .8s linear infinite; }
@keyframes dwb-tb-spin { to { transform: rotate(360deg); } }
/* \u6A21\u6001\u906E\u7F69\uFF1A\u8986\u76D6\u6574\u4E2A\u89C6\u53E3\uFF08\u9762\u677F\u662F\u53F3\u505C\u9760\uFF0C\u6A21\u6001\u9700\u5C45\u4E2D\u4E8E\u5168\u5C4F\uFF09\u3002 */
.dwb-tb-backdrop { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,.45); backdrop-filter: blur(1px); }
.dwb-tb-modal, .dwb-tb-detail { display: flex; flex-direction: column; width: min(560px, calc(100vw - 48px)); max-height: calc(100vh - 64px); background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l3); border-radius: 12px; box-shadow: 0 16px 48px rgba(0,0,0,.32); color: var(--dsw-alias-label-primary); overflow: hidden; }
.dwb-tb-detail { width: min(680px, calc(100vw - 48px)); }
.dwb-tb-modal-title { flex: none; margin: 0; padding: 14px 18px 0; font-size: 14px; font-weight: 600; }
/* \u65B0\u5EFA\u4EFB\u52A1\u8868\u5355\u4E3B\u4F53\uFF1A\u5B57\u6BB5\u533A\u5185\u8FB9\u8DDD + \u5B57\u6BB5\u95F4\u8DDD\uFF0C\u8D85\u9AD8\u53EF\u6EDA\uFF08\u4E0E detail-body \u540C\u6B3E\u601D\u8DEF\uFF0C
   \u4FEE\u590D\u5B57\u6BB5\u8D34\u8FB9\u3001\u65E0\u95F4\u8DDD\u7684\u89C2\u611F\uFF09\u3002 */
.dwb-tb-modal-body { flex: 1; min-height: 0; overflow-y: auto; padding: 4px 18px 6px; display: flex; flex-direction: column; gap: 12px; scrollbar-width: thin; }
.dwb-tb-modal-body > .dwb-tb-section { border-bottom: none; padding: 0; }
.dwb-tb-confirm-message { padding: 12px 18px 0; font-size: 12px; line-height: 1.6; color: var(--dsw-alias-label-secondary); margin: 0; }
.dwb-tb-modal-footer { flex: none; display: flex; align-items: center; gap: 8px; justify-content: flex-end; padding: 14px 18px; }
.dwb-tb-detail-header { flex: none; display: flex; align-items: center; gap: 8px; padding: 12px 14px; border-bottom: 1px solid var(--dsw-alias-border-l2); }
.dwb-tb-detail-title { flex: 1; min-width: 0; margin: 0; font-size: 14px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dwb-tb-status-badge { flex: none; font-size: 10px; padding: 2px 8px; border-radius: 10px; background: var(--dsw-alias-bg-layer-3); color: var(--dsw-alias-label-secondary); border: 1px solid var(--dsw-alias-border-l2); }
.dwb-tb-status-badge[data-status='running'] { color: #d29922; }
.dwb-tb-status-badge[data-status='done'] { color: var(--dsw-alias-state-success-primary); }
.dwb-tb-status-badge[data-status='failed'] { color: var(--dsw-alias-state-error-primary); }
.dwb-tb-status-badge[data-status='todo'] { color: var(--dsw-alias-state-business-primary); }
.dwb-tb-detail-body { flex: 1; min-height: 0; overflow-y: auto; padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; scrollbar-width: thin; }
.dwb-tb-detail-footer { flex: none; display: flex; align-items: center; gap: 8px; padding: 12px 14px; border-top: 1px solid var(--dsw-alias-border-l2); flex-wrap: wrap; }
.dwb-tb-detail-footer .dwb-tb-meta { margin-left: auto; }
.dwb-tb-section { display: flex; flex-direction: column; gap: 8px; padding: 10px 0; border-bottom: 1px solid var(--dsw-alias-border-l2); }
.dwb-tb-section:last-child { border-bottom: none; }
.dwb-tb-section h4 { margin: 0; font-size: 12px; font-weight: 600; color: var(--dsw-alias-label-secondary); }
.dwb-tb-text { margin: 0; font-size: 12px; line-height: 1.6; color: var(--dsw-alias-label-primary); word-break: break-word; }
.dwb-tb-prompt { margin: 0; padding: 8px 10px; font-family: var(--ds-font-family-code); font-size: 11px; line-height: 1.6; background: var(--dsw-alias-bg-layer-3); border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; white-space: pre-wrap; word-break: break-word; max-height: 200px; overflow-y: auto; }
.dwb-tb-field { display: flex; flex-direction: column; gap: 4px; }
.dwb-tb-field-label { font-size: 11px; color: var(--dsw-alias-label-secondary); }
.dwb-tb-input, .dwb-tb-select { width: 100%; box-sizing: border-box; min-height: 30px; padding: 6px 8px; font-size: 12px; font-family: inherit; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-3); border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px; outline: none; }
.dwb-tb-input:focus, .dwb-tb-select:focus { border-color: var(--dsw-alias-state-business-primary); }
.dwb-tb-input:disabled, .dwb-tb-select:disabled { opacity: .55; }
textarea.dwb-tb-input { resize: vertical; line-height: 1.5; }
.dwb-tb-schedule-toggle { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--dsw-alias-label-primary); cursor: pointer; }
.dwb-tb-schedule-row { display: flex; gap: 8px; }
.dwb-tb-schedule-input { flex: 1; font-family: var(--ds-font-family-code); }
.dwb-tb-schedule-invalid { border-color: var(--dsw-alias-state-error-primary); }
.dwb-tb-schedule-preset { flex: none; width: 130px; }
.dwb-tb-schedule-meta { margin: 0; font-size: 11px; color: var(--dsw-alias-label-tertiary); }
.dwb-tb-form-error { margin: 0; font-size: 11px; color: var(--dsw-alias-state-error-primary); }
.dwb-tb-exec-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
.dwb-tb-exec-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 6px 8px; background: var(--dsw-alias-bg-layer-3); border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; }
.dwb-tb-exec-badge { flex: none; font-size: 10px; padding: 2px 8px; border-radius: 10px; background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l2); color: var(--dsw-alias-label-secondary); }
.dwb-tb-exec-badge[data-result='succeeded'] { color: var(--dsw-alias-state-success-primary); }
.dwb-tb-exec-badge[data-result='failed'] { color: var(--dsw-alias-state-error-primary); }
.dwb-tb-exec-badge[data-result='cancelled'] { color: var(--dsw-alias-label-tertiary); }
.dwb-tb-exec-times { flex: 1; min-width: 0; font-size: 11px; color: var(--dsw-alias-label-tertiary); }
.dwb-tb-exec-error { width: 100%; font-size: 11px; color: var(--dsw-alias-state-error-primary); word-break: break-word; }
.dwb-tb-move-row { display: flex; gap: 8px; flex-wrap: wrap; }
`;

// src/client/index.js
var import_react14 = __toESM(require("react"), 1);

// src/client/panel.js
var import_react12 = __toESM(require("react"), 1);

// src/client/tip.js
var import_react = __toESM(require("react"), 1);
var { useState, useRef, useLayoutEffect } = import_react.default;
var h = import_react.default.createElement;
var TIP_EDGE = 12;
function fitTipGeometry(anchor, size, viewport) {
  const half = size.width / 2;
  let x = anchor.left + anchor.width / 2;
  if (x + half > viewport.width - TIP_EDGE) x = viewport.width - TIP_EDGE - half;
  if (x - half < TIP_EDGE) x = TIP_EDGE + half;
  const fitsAbove = anchor.top - 6 - size.height >= TIP_EDGE;
  const fitsBelow = anchor.bottom + 6 + size.height <= viewport.height - TIP_EDGE;
  const below = !fitsAbove && fitsBelow;
  return { x, y: below ? anchor.bottom + 6 : anchor.top - 6, below };
}
function TipButton(props) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, below: false });
  const anchor = useRef(null);
  const bubble = useRef(null);
  const show = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    anchor.current = { left: rect.left, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
    setVisible(true);
  };
  const hide = () => setVisible(false);
  useLayoutEffect(() => {
    if (!visible || anchor.current === null) return;
    const el2 = bubble.current;
    if (el2 === null) return;
    const fit = () => setPos(fitTipGeometry(anchor.current, { width: el2.offsetWidth, height: el2.offsetHeight }, { width: window.innerWidth, height: window.innerHeight }));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [visible, props.tip]);
  return h(
    import_react.default.Fragment,
    null,
    h("button", {
      type: "button",
      className: props.className,
      "data-active": props.active || void 0,
      onClick: props.onClick,
      disabled: props.disabled,
      "aria-label": props.tip,
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide
    }, props.children),
    visible ? h("div", {
      ref: bubble,
      className: "dwb-tip" + (pos.below ? " dwb-tip-below" : ""),
      style: { left: pos.x, top: pos.y },
      role: "tooltip"
    }, props.tip) : null
  );
}

// src/client/helpers.js
function messageOf(error) {
  return error instanceof Error ? error.message : String(error);
}
var PANEL_MIN = 280;
var AUTO_WIDEN = 720;
var PANEL_DEFAULT = 344;
var WIDTH_KEY = "dsh-work.width";
function readStored(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    const value = raw === null ? NaN : Number(raw);
    return Number.isFinite(value) && value > 0 ? value : fallback;
  } catch {
    return fallback;
  }
}
function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, String(Math.round(value)));
  } catch {
  }
}
function clampPanelWidth(width, maxWidth, min = PANEL_MIN) {
  return Math.min(maxWidth, Math.max(min, Math.round(width)));
}
function cubicBezierEase(t, x1 = 0.4, y1 = 0, x2 = 0.2, y2 = 1) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (tt2) => ((ax * tt2 + bx) * tt2 + cx) * tt2;
  const sampleY = (tt2) => ((ay * tt2 + by) * tt2 + cy) * tt2;
  const sampleDX = (tt2) => (3 * ax * tt2 + 2 * bx) * tt2 + cx;
  const u = Math.max(0, Math.min(1, t));
  if (u === 0 || u === 1) return u;
  let tt = u;
  for (let i = 0; i < 8; i++) {
    const err = sampleX(tt) - u;
    if (Math.abs(err) < 1e-6) break;
    const d = sampleDX(tt);
    if (Math.abs(d) < 1e-6) break;
    tt -= err / d;
  }
  let lo2 = 0;
  let hi2 = 1;
  tt = Math.max(0, Math.min(1, tt));
  for (let i = 0; i < 12; i++) {
    const x = sampleX(tt);
    if (Math.abs(x - u) < 1e-6) break;
    if (x < u) lo2 = tt;
    else hi2 = tt;
    tt = (lo2 + hi2) / 2;
  }
  return sampleY(tt);
}
function panelActionFor(width, min = PANEL_MIN) {
  return width > min ? "shrink" : "hide";
}
function badgeKind(code) {
  const trimmed = code.trim();
  if (trimmed === "" || trimmed === "??") return "?";
  return trimmed.charAt(0);
}
function stagedOf(code) {
  const first = code.charAt(0);
  return first !== " " && first !== "?";
}
function assetUrl(path) {
  return "/workbench/asset?path=" + encodeURIComponent(path);
}

// src/client/icons.js
var import_react2 = __toESM(require("react"), 1);
var h2 = import_react2.default.createElement;
function IconFrame(props) {
  const size = props.size || 14;
  return h2("svg", {
    className: props.className,
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true
  }, props.children);
}
var branchIcon = () => h2(
  IconFrame,
  { size: 15 },
  h2("circle", { cx: "6", cy: "5", r: "2" }),
  h2("circle", { cx: "6", cy: "19", r: "2" }),
  h2("circle", { cx: "18", cy: "9", r: "2" }),
  h2("path", { d: "M6 7v9.5" }),
  h2("path", { d: "M18 11c0 4-6 3.4-9.4 5" })
);
var refreshIcon = () => h2(
  IconFrame,
  null,
  h2("path", { d: "M20 12a8 8 0 1 1-2.34-5.66" }),
  h2("path", { d: "M20 4v4h-4" })
);
var closeIcon = () => h2(IconFrame, null, h2("path", { d: "M6 6l12 12M18 6L6 18" }));
var kanbanIcon = () => h2(
  IconFrame,
  { size: 15 },
  h2("rect", { x: "3", y: "4", width: "5", height: "13", rx: "1" }),
  h2("rect", { x: "9.5", y: "4", width: "5", height: "16", rx: "1" }),
  h2("rect", { x: "16", y: "4", width: "5", height: "9", rx: "1" })
);
var plusIcon = () => h2(IconFrame, { size: 12 }, h2("path", { d: "M12 5v14M5 12h14" }));
var minusIcon = () => h2(IconFrame, { size: 12 }, h2("path", { d: "M5 12h14" }));
var trayDownIcon = () => h2(IconFrame, { size: 13 }, h2("path", { d: "M12 4v10M8 10l4 4 4-4M4 19h16" }));
var undoIcon = () => h2(IconFrame, { size: 13 }, h2("path", { d: "M4 12a8 8 0 1 0 2.5-5.8" }), h2("path", { d: "M4 4v4h4" }));
var banIcon = () => h2(IconFrame, { size: 13 }, h2("circle", { cx: "12", cy: "12", r: "8" }), h2("path", { d: "M5 5l14 14" }));
var eyeIcon = () => h2(
  IconFrame,
  { size: 13 },
  h2("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" }),
  h2("circle", { cx: "12", cy: "12", r: "3" })
);
var eyeOffIcon = () => h2(
  IconFrame,
  { size: 13 },
  h2("path", { d: "M4 4l16 16" }),
  h2("path", { d: "M9.5 5.2A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.1 6.1A17 17 0 0 0 2 12s3.5 7 10 7c1.7 0 3.2-.4 4.5-1" }),
  h2("path", { d: "M10 10a3 3 0 0 0 4 4" })
);
var checkIcon = () => h2(IconFrame, { size: 14 }, h2("path", { d: "M5 12l5 5 9-10" }));
var createIcon = () => h2(
  IconFrame,
  { size: 14 },
  h2("path", { d: "M8 3h8a1 1 0 0 1 1 1v3" }),
  h2("path", { d: "M3 8v8a1 1 0 0 0 1 1h3" }),
  h2("path", { d: "M16 21h3a1 1 0 0 0 1-1v-3" }),
  h2("path", { d: "M21 8V5a1 1 0 0 0-1-1h-3" }),
  h2("path", { d: "M12 7v6M9 10h6" })
);
var backIcon = () => h2(IconFrame, { size: 13 }, h2("path", { d: "M14 4l-7 8 7 8" }), h2("path", { d: "M7 12h12" }));
var forwardIcon = () => h2(IconFrame, { size: 13 }, h2("path", { d: "M10 4l7 8-7 8" }), h2("path", { d: "M17 12H5" }));
var browserIcon = () => h2(
  IconFrame,
  { size: 14 },
  h2("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
  h2("path", { d: "M3 8h18" }),
  h2("circle", { cx: "6", cy: "5.5", r: "0.8", fill: "currentColor" })
);
var terminalIcon = () => h2(
  IconFrame,
  { size: 14 },
  h2("path", { d: "M4 5l4 4-4 4" }),
  h2("path", { d: "M10 13h7" })
);

// src/client/git-panel.js
var import_react4 = __toESM(require("react"), 1);

// src/client/git-view.js
var import_react3 = __toESM(require("react"), 1);
var h3 = import_react3.default.createElement;
function GitView(props) {
  const state = props.state;
  if (state.status === "loading") return h3("div", { className: "dwb-scroll" }, h3("div", { className: "dwb-note" }, "\u52A0\u8F7D\u4E2D\u2026"));
  if (state.status === "idle") return h3("div", { className: "dwb-scroll" }, h3("div", { className: "dwb-note" }, "\u65E0\u5DE5\u4F5C\u76EE\u5F55\uFF08\u672A\u9009\u62E9\u4F1A\u8BDD\u4E14\u672A\u624B\u52A8\u6307\u5B9A\u8DEF\u5F84\uFF09"));
  if (state.status === "error") {
    return h3("div", { className: "dwb-scroll" }, h3(
      "div",
      { className: "dwb-emptygit" },
      h3("div", { className: "dwb-emptytitle" }, "Git \u6570\u636E\u52A0\u8F7D\u5931\u8D25"),
      h3("div", { className: "dwb-emptyhint" }, state.error)
    ));
  }
  if (state.status === "not-repo") {
    const noGitBinary = state.error !== void 0 && state.error.indexOf("ENOENT") !== -1;
    return h3("div", { className: "dwb-scroll" }, h3(
      "div",
      { className: "dwb-emptygit" },
      h3(
        "svg",
        { className: "dwb-emptyicon", viewBox: "0 0 24 24", width: "28", height: "28", fill: "none", stroke: "currentColor", strokeWidth: "1.5", "aria-hidden": true },
        h3("circle", { cx: "6", cy: "5", r: "2.2" }),
        h3("circle", { cx: "6", cy: "19", r: "2.2" }),
        h3("circle", { cx: "18", cy: "9", r: "2.2" }),
        h3("path", { d: "M6 7.2v9.6" }),
        h3("path", { d: "M18 11.2c0 4-6 3.4-9.4 5" })
      ),
      h3("div", { className: "dwb-emptytitle" }, noGitBinary ? "\u672A\u627E\u5230 git \u547D\u4EE4" : "\u8FD9\u4E2A\u76EE\u5F55\u4E0D\u662F Git \u4ED3\u5E93"),
      h3("div", { className: "dwb-emptyhint" }, noGitBinary ? "\u8BF7\u5148\u5B89\u88C5 git\uFF0C\u6216\u786E\u8BA4\u5B83\u5728 PATH \u4E2D\uFF0C\u7136\u540E\u70B9\u53F3\u4E0A\u89D2\u5237\u65B0\u3002" : "\u5728\u4E0A\u65B9\u8DEF\u5F84\u6846\u91CC\u8F93\u5165\u4E00\u4E2A Git \u4ED3\u5E93\u7684\u8DEF\u5F84\uFF0C\u5C31\u80FD\u770B\u5230\u5206\u652F\u3001\u63D0\u4EA4\u56FE\u548C\u5DE5\u4F5C\u533A\u53D8\u66F4\uFF1B\u4E5F\u53EF\u4EE5\u76F4\u63A5\u5728\u6B64\u76EE\u5F55\u521D\u59CB\u5316\u4E00\u4E2A\u4ED3\u5E93\u3002"),
      noGitBinary ? null : h3(TipButton, {
        tip: "\u4E00\u952E\u521B\u5EFA\u4ED3\u5E93\uFF08git init\uFF0C\u9ED8\u8BA4\u5206\u652F\u968F\u5BBF\u4E3B\u673A\u914D\u7F6E\uFF09",
        className: "dwb-initbtn",
        onClick: props.onInit,
        disabled: props.initializing
      }, props.initializing ? h3("span", { className: "dwb-spin" }, refreshIcon()) : createIcon())
    ));
  }
  const anyUnstaged = state.changes.some((change) => !stagedOf(change.code));
  return h3(
    "div",
    { className: props.refreshing ? "dwb-scroll dwb-busy" : "dwb-scroll" },
    h3(
      "div",
      { className: "dwb-branch" },
      h3("span", { className: "dwb-branchlabel" }, "\u5206\u652F"),
      state.branch,
      h3("span", { className: "dwb-pill" }, state.graph.length + " \u6761\u63D0\u4EA4")
    ),
    h3("div", { className: "dwb-section" }, "\u63D0\u4EA4\u56FE"),
    state.graph.length === 0 ? h3("div", { className: "dwb-note" }, "\uFF08\u65E0\u63D0\u4EA4\u8BB0\u5F55\uFF09") : h3("div", { className: "dwb-graph" }, state.graph.map((row, index) => {
      const isHead = row.hash !== "" && row.hash === state.head;
      return h3(
        "div",
        {
          key: index,
          className: "dwb-graphrow",
          "data-head": isHead || void 0,
          title: row.author !== "" ? row.author + " \xB7 " + row.date : void 0
        },
        h3("span", { className: "dwb-graphcol" }, row.graph === "" ? " " : row.graph),
        row.hash !== "" ? h3("span", { className: "dwb-hash" }, row.hash) : null,
        row.subject !== "" ? h3("span", { className: "dwb-graphsubject" }, row.subject) : null,
        isHead ? h3("span", { className: "dwb-headtag" }, "HEAD") : null
      );
    })),
    h3(
      "div",
      { className: "dwb-section" },
      "\u5DE5\u4F5C\u533A\u53D8\u66F4",
      anyUnstaged ? h3(TipButton, { tip: "\u5168\u90E8\u6682\u5B58", className: "dwb-minibtn", onClick: props.onStageAll, disabled: props.mutating }, trayDownIcon()) : null,
      h3(TipButton, {
        tip: props.showIgnored ? "\u9690\u85CF\u5FFD\u7565\u6587\u4EF6" : "\u663E\u793A\u5FFD\u7565\u6587\u4EF6",
        className: props.showIgnored ? "dwb-minibtn dwb-minibtnactive" : "dwb-minibtn",
        active: props.showIgnored,
        onClick: props.onToggleIgnored,
        disabled: props.mutating
      }, props.showIgnored ? eyeIcon() : eyeOffIcon())
    ),
    state.changes.length === 0 ? h3("div", { className: "dwb-note" }, "\uFF08\u5DE5\u4F5C\u533A\u5E72\u51C0\uFF09") : state.changes.map((change) => {
      const staged = stagedOf(change.code);
      const untracked = change.code.trim() === "??";
      return h3(
        "div",
        { key: change.code + ":" + change.path, className: "dwb-change", "data-path": change.path },
        h3("span", { className: "dwb-badge", "data-kind": badgeKind(change.code) }, change.code.trim() || change.code),
        h3("span", { className: "dwb-changepath" }, change.path),
        untracked ? h3(TipButton, { tip: "\u5FFD\u7565 " + change.path, className: "dwb-stagebtn", onClick: () => props.onIgnore(change.path), disabled: props.mutating }, banIcon()) : null,
        h3(TipButton, {
          tip: (staged ? "\u53D6\u6D88\u6682\u5B58" : "\u6682\u5B58") + " " + change.path,
          className: "dwb-stagebtn",
          onClick: () => (staged ? props.onUnstage : props.onStage)(change.path),
          disabled: props.mutating
        }, staged ? minusIcon() : plusIcon())
      );
    }),
    props.showIgnored ? h3(
      import_react3.default.Fragment,
      null,
      h3("div", { className: "dwb-section" }, "\u5FFD\u7565\u7684\u6587\u4EF6"),
      state.ignored.length === 0 ? h3("div", { className: "dwb-note" }, "\uFF08\u65E0\u5FFD\u7565\u6587\u4EF6\uFF09") : state.ignored.map((path) => h3(
        "div",
        { key: path, className: "dwb-change", "data-path": path },
        h3("span", { className: "dwb-badge", "data-kind": "!" }, "!!"),
        h3("span", { className: "dwb-changepath" }, path),
        h3(TipButton, { tip: "\u53D6\u6D88\u5FFD\u7565 " + path, className: "dwb-stagebtn", onClick: () => props.onUnignore(path), disabled: props.mutating }, undoIcon())
      ))
    ) : null,
    h3("div", { className: "dwb-section" }, "\u63D0\u4EA4"),
    h3(
      "div",
      { className: "dwb-commitrow" },
      h3("input", {
        className: "dwb-commitinput",
        value: props.commitMessage,
        placeholder: "\u63D0\u4EA4\u4FE1\u606F",
        spellCheck: false,
        onChange: (event) => props.setCommitMessage(event.target.value),
        onKeyDown: (event) => {
          if (event.key === "Enter" && props.commitMessage.trim() !== "" && !props.mutating) props.onCommit();
        }
      }),
      h3(TipButton, {
        tip: "\u63D0\u4EA4",
        className: "dwb-commitbtn",
        onClick: props.onCommit,
        disabled: props.mutating || props.commitMessage.trim() === ""
      }, props.mutating ? h3("span", { className: "dwb-spin" }, refreshIcon()) : checkIcon())
    ),
    props.actionError !== void 0 ? h3("div", { className: "dwb-note", "data-error": true }, props.actionError) : null
  );
}

// src/client/git-panel.js
var h4 = import_react4.default.createElement;
function GitPanel(props) {
  return h4(GitView, props);
}

// src/client/browser-view.js
var import_react5 = __toESM(require("react"), 1);
var h5 = import_react5.default.createElement;
var { useState: useState2, useEffect, useCallback, useRef: useRef2 } = import_react5.default;
var BROWSER_SANDBOX = "allow-scripts allow-forms allow-popups allow-downloads allow-modals allow-popups-to-escape-sandbox";
var MAX_HISTORY = 50;
var FORBIDDEN_SCHEMES = /* @__PURE__ */ new Set([
  "javascript",
  "data",
  "file",
  "about",
  "vbscript",
  "blob",
  "mailto",
  "tel",
  "ftp",
  "ftps",
  "ws",
  "wss",
  "sftp",
  "ssh",
  "chrome",
  "chrome-extension",
  "moz-extension",
  "edge",
  "opera",
  "resource",
  "view-source"
]);
function isLoopbackHostname(hostname) {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (host === "localhost" || host === "::1" || host === "0.0.0.0") return true;
  const parts = host.split(".");
  return parts.length === 4 && parts[0] === "127" && parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255);
}
function normalizeBrowserUrl(input, selfOrigin) {
  const trimmed = input.trim();
  if (trimmed === "") return { kind: "invalid" };
  const schemeMatch = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(trimmed);
  let withScheme;
  if (schemeMatch === null) {
    withScheme = "https://" + trimmed;
  } else {
    const scheme = schemeMatch[1].toLowerCase();
    if (scheme === "http" || scheme === "https") withScheme = trimmed;
    else if (FORBIDDEN_SCHEMES.has(scheme)) return { kind: "blocked", reason: "scheme" };
    else withScheme = "https://" + trimmed;
  }
  let url;
  try {
    url = new URL(withScheme);
  } catch {
    return { kind: "invalid" };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return { kind: "blocked", reason: "scheme" };
  try {
    if (url.origin === new URL(selfOrigin).origin) return { kind: "ok", url: url.href };
  } catch {
  }
  if (isLoopbackHostname(url.hostname)) return { kind: "blocked", reason: "loopback" };
  return { kind: "ok", url: url.href };
}
function isEmbedBlocked(probe) {
  if (probe.reachable !== true) return false;
  const xfo = (probe.xFrameOptions || "").trim().toUpperCase();
  if (xfo === "DENY" || xfo === "SAMEORIGIN") return true;
  if (Array.isArray(probe.frameAncestors) && !probe.frameAncestors.some((s15) => s15 === "*")) return true;
  return false;
}
function BrowserView(props) {
  const [url, setUrl] = useState2(void 0);
  const [input, setInput] = useState2("");
  const [message, setMessage] = useState2(null);
  const [history, setHistory] = useState2([]);
  const [cursor, setCursor] = useState2(-1);
  const [reloadKey, setReloadKey] = useState2(0);
  const [safeMode, setSafeMode] = useState2(false);
  const [embedBlocked, setEmbedBlocked] = useState2(null);
  const [forceEmbed, setForceEmbed] = useState2(false);
  const [loading, setLoading] = useState2(false);
  const selfOrigin = typeof window !== "undefined" ? window.location.origin : "";
  const iframeRef = useRef2(null);
  const visible = props.visible !== false;
  useEffect(() => {
    if (url === void 0 || !visible) return;
    let cancelled = false;
    setEmbedBlocked(null);
    setForceEmbed(false);
    setLoading(true);
    fetch("/workbench/browser-probe?url=" + encodeURIComponent(url)).then((r) => r.json()).then((probe) => {
      if (cancelled) return;
      if (isEmbedBlocked(probe)) setEmbedBlocked(url);
    }).catch(() => {
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [url, visible]);
  const navigateTo = useCallback((raw) => {
    const result = normalizeBrowserUrl(raw, selfOrigin);
    if (result.kind === "ok") {
      const next = result.url;
      setUrl(next);
      setInput(next);
      setMessage(null);
      setHistory((prev) => {
        const base = prev.slice(0, cursor + 1);
        base.push(next);
        if (base.length > MAX_HISTORY) base.splice(0, base.length - MAX_HISTORY);
        return base;
      });
      setCursor((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
      setReloadKey((k) => k + 1);
      if (typeof props.onTitleChange === "function") {
        try {
          props.onTitleChange(new URL(next).hostname);
        } catch {
        }
      }
      return;
    }
    setMessage(
      result.kind === "invalid" ? "\u65E0\u6548\u7684 URL" : result.reason === "scheme" ? "\u4E0D\u652F\u6301\u7684\u534F\u8BAE" : "\u7981\u6B62\u8BBF\u95EE\u56DE\u73AF\u5730\u5740"
    );
  }, [cursor, selfOrigin, props]);
  const goBack = useCallback(() => {
    if (cursor <= 0) return;
    const next = history[cursor - 1];
    setCursor(cursor - 1);
    setUrl(next);
    setInput(next);
    setReloadKey((k) => k + 1);
  }, [cursor, history]);
  const goForward = useCallback(() => {
    if (cursor >= history.length - 1) return;
    const next = history[cursor + 1];
    setCursor(cursor + 1);
    setUrl(next);
    setInput(next);
    setReloadKey((k) => k + 1);
  }, [cursor, history]);
  const reload = useCallback(() => {
    setReloadKey((k) => k + 1);
  }, []);
  return h5(
    "div",
    { className: "dwb-browser" },
    // 导航栏。
    h5(
      "div",
      { className: "dwb-browser-bar" },
      h5(TipButton, { tip: "\u540E\u9000", className: "dwb-browser-navbtn", onClick: goBack, disabled: cursor <= 0 }, backIcon()),
      h5(TipButton, { tip: "\u524D\u8FDB", className: "dwb-browser-navbtn", onClick: goForward, disabled: cursor >= history.length - 1 }, forwardIcon()),
      h5(
        TipButton,
        { tip: "\u5237\u65B0", className: "dwb-browser-navbtn", onClick: reload, disabled: url === void 0 },
        h5("span", { className: loading ? "dwb-spin" : void 0 }, refreshIcon())
      ),
      h5("input", {
        className: "dwb-browser-urlinput",
        value: input,
        placeholder: "\u8F93\u5165\u7F51\u5740\uFF0C\u4F8B\u5982 bilibili.com",
        spellCheck: false,
        onChange: (event) => setInput(event.target.value),
        onKeyDown: (event) => {
          if (event.key === "Enter") {
            navigateTo(input);
            event.currentTarget.blur();
          }
        }
      }),
      // 安全模式开关。
      h5(TipButton, {
        tip: safeMode ? "\u5B89\u5168\u6A21\u5F0F\uFF1A\u5F00\uFF08\u6C99\u7BB1\u9694\u79BB\u4E2D\uFF09" : "\u5B89\u5168\u6A21\u5F0F\uFF1A\u5173\uFF08\u5B8C\u6574\u529F\u80FD\uFF09",
        className: "dwb-browser-navbtn" + (safeMode ? " dwb-browser-safe-on" : ""),
        onClick: () => setSafeMode((v2) => !v2),
        disabled: url === void 0
      }, safeMode ? "\u{1F6E1}\uFE0F" : "\u{1F513}")
    ),
    // 错误/拒绝提示。
    message !== null ? h5("div", { className: "dwb-browser-message" }, message) : null,
    // 安全模式提示条。
    safeMode ? h5(
      "div",
      { className: "dwb-browser-warn" },
      "\u{1F6E1}\uFE0F \u5B89\u5168\u6A21\u5F0F \u2014 \u9875\u9762\u8FD0\u884C\u5728\u6C99\u7BB1\u4E2D\uFF0C\u65E0 Cookie/\u5B58\u50A8/API \u8BBF\u95EE\u6743\u9650",
      h5("button", { className: "dwb-browser-warn-btn", onClick: () => setSafeMode(false) }, "\u5173\u95ED")
    ) : null,
    // 空状态。
    url === void 0 ? h5(
      "div",
      { className: "dwb-browser-empty" },
      h5("div", { className: "dwb-browser-emptyicon" }, "\u{1F310}"),
      h5("div", { className: "dwb-browser-emptytitle" }, "\u6D4F\u89C8\u5668"),
      h5(
        "div",
        { className: "dwb-browser-emptyhint" },
        "\u5728\u4E0A\u65B9\u8F93\u5165\u7F51\u5740\u6D4F\u89C8\u3002\u9ED8\u8BA4\u5B8C\u6574\u529F\u80FD\uFF0CSPA \u53EF\u6B63\u5E38\u6E32\u67D3\u3002",
        h5("br"),
        "\u{1F513} = \u5B8C\u6574\u529F\u80FD  \u{1F6E1}\uFE0F = \u5B89\u5168\u6C99\u7BB1\uFF08\u9694\u79BB\u4E0D\u53EF\u4FE1\u7AD9\u70B9\uFF09"
      )
    ) : null,
    // 嵌入被拒绝提示。
    embedBlocked !== null && !forceEmbed ? h5(
      "div",
      { className: "dwb-browser-error" },
      h5("div", { className: "dwb-browser-error-title" }, "\u6B64\u7AD9\u70B9\u62D2\u7EDD\u88AB\u5D4C\u5165"),
      h5(
        "div",
        { className: "dwb-browser-error-msg" },
        "\u8BE5\u7AD9\u70B9\u8BBE\u7F6E\u4E86 X-Frame-Options / CSP frame-ancestors \u7981\u6B62\u5728 iframe \u4E2D\u663E\u793A\u3002"
      ),
      h5(
        "div",
        { className: "dwb-browser-error-actions" },
        h5(
          "button",
          {
            className: "dwb-browser-error-btn",
            onClick: () => {
              if (embedBlocked !== null) window.open(embedBlocked, "_blank", "noopener");
            }
          },
          "\u5728\u6D4F\u89C8\u5668\u4E2D\u6253\u5F00"
        ),
        h5(
          "button",
          {
            className: "dwb-browser-error-btn",
            onClick: () => setForceEmbed(true)
          },
          "\u5F3A\u5236\u52A0\u8F7D"
        )
      )
    ) : null,
    // iframe。
    url !== void 0 && (embedBlocked === null || forceEmbed) ? h5("iframe", {
      ref: iframeRef,
      key: `${reloadKey}:${safeMode ? "safe" : "full"}`,
      className: "dwb-browser-frame",
      src: url,
      sandbox: safeMode ? BROWSER_SANDBOX : void 0,
      referrerPolicy: "no-referrer",
      title: url
    }) : null
  );
}

// src/client/terminal-panel.js
var import_react6 = __toESM(require("react"), 1);

// node_modules/@xterm/xterm/lib/xterm.mjs
var zs = Object.defineProperty;
var Rl = Object.getOwnPropertyDescriptor;
var Ll = (s15, t) => {
  for (var e in t) zs(s15, e, { get: t[e], enumerable: true });
};
var M = (s15, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Rl(t, e) : t, n = s15.length - 1, o2; n >= 0; n--) (o2 = s15[n]) && (r = (i ? o2(t, e, r) : o2(r)) || r);
  return i && r && zs(t, e, r), r;
};
var S = (s15, t) => (e, i) => t(e, i, s15);
var Gs = "Terminal input";
var mi = { get: () => Gs, set: (s15) => Gs = s15 };
var $s = "Too much output to announce, navigate to rows manually to read";
var _i = { get: () => $s, set: (s15) => $s = s15 };
function Al(s15) {
  return s15.replace(/\r?\n/g, "\r");
}
function kl(s15, t) {
  return t ? "\x1B[200~" + s15 + "\x1B[201~" : s15;
}
function Vs(s15, t) {
  s15.clipboardData && s15.clipboardData.setData("text/plain", t.selectionText), s15.preventDefault();
}
function qs(s15, t, e, i) {
  if (s15.stopPropagation(), s15.clipboardData) {
    let r = s15.clipboardData.getData("text/plain");
    Cn(r, t, e, i);
  }
}
function Cn(s15, t, e, i) {
  s15 = Al(s15), s15 = kl(s15, e.decPrivateModes.bracketedPasteMode && i.rawOptions.ignoreBracketedPasteMode !== true), e.triggerDataEvent(s15, true), t.value = "";
}
function Mn(s15, t, e) {
  let i = e.getBoundingClientRect(), r = s15.clientX - i.left - 10, n = s15.clientY - i.top - 10;
  t.style.width = "20px", t.style.height = "20px", t.style.left = `${r}px`, t.style.top = `${n}px`, t.style.zIndex = "1000", t.focus();
}
function Pn(s15, t, e, i, r) {
  Mn(s15, t, e), r && i.rightClickSelect(s15), t.value = i.selectionText, t.select();
}
function Ce(s15) {
  return s15 > 65535 ? (s15 -= 65536, String.fromCharCode((s15 >> 10) + 55296) + String.fromCharCode(s15 % 1024 + 56320)) : String.fromCharCode(s15);
}
function It(s15, t = 0, e = s15.length) {
  let i = "";
  for (let r = t; r < e; ++r) {
    let n = s15[r];
    n > 65535 ? (n -= 65536, i += String.fromCharCode((n >> 10) + 55296) + String.fromCharCode(n % 1024 + 56320)) : i += String.fromCharCode(n);
  }
  return i;
}
var er = class {
  constructor() {
    this._interim = 0;
  }
  clear() {
    this._interim = 0;
  }
  decode(t, e) {
    let i = t.length;
    if (!i) return 0;
    let r = 0, n = 0;
    if (this._interim) {
      let o2 = t.charCodeAt(n++);
      56320 <= o2 && o2 <= 57343 ? e[r++] = (this._interim - 55296) * 1024 + o2 - 56320 + 65536 : (e[r++] = this._interim, e[r++] = o2), this._interim = 0;
    }
    for (let o2 = n; o2 < i; ++o2) {
      let l = t.charCodeAt(o2);
      if (55296 <= l && l <= 56319) {
        if (++o2 >= i) return this._interim = l, r;
        let a = t.charCodeAt(o2);
        56320 <= a && a <= 57343 ? e[r++] = (l - 55296) * 1024 + a - 56320 + 65536 : (e[r++] = l, e[r++] = a);
        continue;
      }
      l !== 65279 && (e[r++] = l);
    }
    return r;
  }
};
var tr = class {
  constructor() {
    this.interim = new Uint8Array(3);
  }
  clear() {
    this.interim.fill(0);
  }
  decode(t, e) {
    let i = t.length;
    if (!i) return 0;
    let r = 0, n, o2, l, a, u = 0, h15 = 0;
    if (this.interim[0]) {
      let _2 = false, p = this.interim[0];
      p &= (p & 224) === 192 ? 31 : (p & 240) === 224 ? 15 : 7;
      let m = 0, f;
      for (; (f = this.interim[++m] & 63) && m < 4; ) p <<= 6, p |= f;
      let A = (this.interim[0] & 224) === 192 ? 2 : (this.interim[0] & 240) === 224 ? 3 : 4, R = A - m;
      for (; h15 < R; ) {
        if (h15 >= i) return 0;
        if (f = t[h15++], (f & 192) !== 128) {
          h15--, _2 = true;
          break;
        } else this.interim[m++] = f, p <<= 6, p |= f & 63;
      }
      _2 || (A === 2 ? p < 128 ? h15-- : e[r++] = p : A === 3 ? p < 2048 || p >= 55296 && p <= 57343 || p === 65279 || (e[r++] = p) : p < 65536 || p > 1114111 || (e[r++] = p)), this.interim.fill(0);
    }
    let c = i - 4, d = h15;
    for (; d < i; ) {
      for (; d < c && !((n = t[d]) & 128) && !((o2 = t[d + 1]) & 128) && !((l = t[d + 2]) & 128) && !((a = t[d + 3]) & 128); ) e[r++] = n, e[r++] = o2, e[r++] = l, e[r++] = a, d += 4;
      if (n = t[d++], n < 128) e[r++] = n;
      else if ((n & 224) === 192) {
        if (d >= i) return this.interim[0] = n, r;
        if (o2 = t[d++], (o2 & 192) !== 128) {
          d--;
          continue;
        }
        if (u = (n & 31) << 6 | o2 & 63, u < 128) {
          d--;
          continue;
        }
        e[r++] = u;
      } else if ((n & 240) === 224) {
        if (d >= i) return this.interim[0] = n, r;
        if (o2 = t[d++], (o2 & 192) !== 128) {
          d--;
          continue;
        }
        if (d >= i) return this.interim[0] = n, this.interim[1] = o2, r;
        if (l = t[d++], (l & 192) !== 128) {
          d--;
          continue;
        }
        if (u = (n & 15) << 12 | (o2 & 63) << 6 | l & 63, u < 2048 || u >= 55296 && u <= 57343 || u === 65279) continue;
        e[r++] = u;
      } else if ((n & 248) === 240) {
        if (d >= i) return this.interim[0] = n, r;
        if (o2 = t[d++], (o2 & 192) !== 128) {
          d--;
          continue;
        }
        if (d >= i) return this.interim[0] = n, this.interim[1] = o2, r;
        if (l = t[d++], (l & 192) !== 128) {
          d--;
          continue;
        }
        if (d >= i) return this.interim[0] = n, this.interim[1] = o2, this.interim[2] = l, r;
        if (a = t[d++], (a & 192) !== 128) {
          d--;
          continue;
        }
        if (u = (n & 7) << 18 | (o2 & 63) << 12 | (l & 63) << 6 | a & 63, u < 65536 || u > 1114111) continue;
        e[r++] = u;
      }
    }
    return r;
  }
};
var ir = "";
var we = " ";
var De = class s {
  constructor() {
    this.fg = 0;
    this.bg = 0;
    this.extended = new rt();
  }
  static toColorRGB(t) {
    return [t >>> 16 & 255, t >>> 8 & 255, t & 255];
  }
  static fromColorRGB(t) {
    return (t[0] & 255) << 16 | (t[1] & 255) << 8 | t[2] & 255;
  }
  clone() {
    let t = new s();
    return t.fg = this.fg, t.bg = this.bg, t.extended = this.extended.clone(), t;
  }
  isInverse() {
    return this.fg & 67108864;
  }
  isBold() {
    return this.fg & 134217728;
  }
  isUnderline() {
    return this.hasExtendedAttrs() && this.extended.underlineStyle !== 0 ? 1 : this.fg & 268435456;
  }
  isBlink() {
    return this.fg & 536870912;
  }
  isInvisible() {
    return this.fg & 1073741824;
  }
  isItalic() {
    return this.bg & 67108864;
  }
  isDim() {
    return this.bg & 134217728;
  }
  isStrikethrough() {
    return this.fg & 2147483648;
  }
  isProtected() {
    return this.bg & 536870912;
  }
  isOverline() {
    return this.bg & 1073741824;
  }
  getFgColorMode() {
    return this.fg & 50331648;
  }
  getBgColorMode() {
    return this.bg & 50331648;
  }
  isFgRGB() {
    return (this.fg & 50331648) === 50331648;
  }
  isBgRGB() {
    return (this.bg & 50331648) === 50331648;
  }
  isFgPalette() {
    return (this.fg & 50331648) === 16777216 || (this.fg & 50331648) === 33554432;
  }
  isBgPalette() {
    return (this.bg & 50331648) === 16777216 || (this.bg & 50331648) === 33554432;
  }
  isFgDefault() {
    return (this.fg & 50331648) === 0;
  }
  isBgDefault() {
    return (this.bg & 50331648) === 0;
  }
  isAttributeDefault() {
    return this.fg === 0 && this.bg === 0;
  }
  getFgColor() {
    switch (this.fg & 50331648) {
      case 16777216:
      case 33554432:
        return this.fg & 255;
      case 50331648:
        return this.fg & 16777215;
      default:
        return -1;
    }
  }
  getBgColor() {
    switch (this.bg & 50331648) {
      case 16777216:
      case 33554432:
        return this.bg & 255;
      case 50331648:
        return this.bg & 16777215;
      default:
        return -1;
    }
  }
  hasExtendedAttrs() {
    return this.bg & 268435456;
  }
  updateExtended() {
    this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
  }
  getUnderlineColor() {
    if (this.bg & 268435456 && ~this.extended.underlineColor) switch (this.extended.underlineColor & 50331648) {
      case 16777216:
      case 33554432:
        return this.extended.underlineColor & 255;
      case 50331648:
        return this.extended.underlineColor & 16777215;
      default:
        return this.getFgColor();
    }
    return this.getFgColor();
  }
  getUnderlineColorMode() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? this.extended.underlineColor & 50331648 : this.getFgColorMode();
  }
  isUnderlineColorRGB() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 50331648 : this.isFgRGB();
  }
  isUnderlineColorPalette() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 16777216 || (this.extended.underlineColor & 50331648) === 33554432 : this.isFgPalette();
  }
  isUnderlineColorDefault() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 0 : this.isFgDefault();
  }
  getUnderlineStyle() {
    return this.fg & 268435456 ? this.bg & 268435456 ? this.extended.underlineStyle : 1 : 0;
  }
  getUnderlineVariantOffset() {
    return this.extended.underlineVariantOffset;
  }
};
var rt = class s2 {
  constructor(t = 0, e = 0) {
    this._ext = 0;
    this._urlId = 0;
    this._ext = t, this._urlId = e;
  }
  get ext() {
    return this._urlId ? this._ext & -469762049 | this.underlineStyle << 26 : this._ext;
  }
  set ext(t) {
    this._ext = t;
  }
  get underlineStyle() {
    return this._urlId ? 5 : (this._ext & 469762048) >> 26;
  }
  set underlineStyle(t) {
    this._ext &= -469762049, this._ext |= t << 26 & 469762048;
  }
  get underlineColor() {
    return this._ext & 67108863;
  }
  set underlineColor(t) {
    this._ext &= -67108864, this._ext |= t & 67108863;
  }
  get urlId() {
    return this._urlId;
  }
  set urlId(t) {
    this._urlId = t;
  }
  get underlineVariantOffset() {
    let t = (this._ext & 3758096384) >> 29;
    return t < 0 ? t ^ 4294967288 : t;
  }
  set underlineVariantOffset(t) {
    this._ext &= 536870911, this._ext |= t << 29 & 3758096384;
  }
  clone() {
    return new s2(this._ext, this._urlId);
  }
  isEmpty() {
    return this.underlineStyle === 0 && this._urlId === 0;
  }
};
var q = class s3 extends De {
  constructor() {
    super(...arguments);
    this.content = 0;
    this.fg = 0;
    this.bg = 0;
    this.extended = new rt();
    this.combinedData = "";
  }
  static fromCharData(e) {
    let i = new s3();
    return i.setFromCharData(e), i;
  }
  isCombined() {
    return this.content & 2097152;
  }
  getWidth() {
    return this.content >> 22;
  }
  getChars() {
    return this.content & 2097152 ? this.combinedData : this.content & 2097151 ? Ce(this.content & 2097151) : "";
  }
  getCode() {
    return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : this.content & 2097151;
  }
  setFromCharData(e) {
    this.fg = e[0], this.bg = 0;
    let i = false;
    if (e[1].length > 2) i = true;
    else if (e[1].length === 2) {
      let r = e[1].charCodeAt(0);
      if (55296 <= r && r <= 56319) {
        let n = e[1].charCodeAt(1);
        56320 <= n && n <= 57343 ? this.content = (r - 55296) * 1024 + n - 56320 + 65536 | e[2] << 22 : i = true;
      } else i = true;
    } else this.content = e[1].charCodeAt(0) | e[2] << 22;
    i && (this.combinedData = e[1], this.content = 2097152 | e[2] << 22);
  }
  getAsCharData() {
    return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
  }
};
var js = "di$target";
var Hn = "di$dependencies";
var Fn = /* @__PURE__ */ new Map();
function Xs(s15) {
  return s15[Hn] || [];
}
function ie(s15) {
  if (Fn.has(s15)) return Fn.get(s15);
  let t = function(e, i, r) {
    if (arguments.length !== 3) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
    Pl(t, e, r);
  };
  return t._id = s15, Fn.set(s15, t), t;
}
function Pl(s15, t, e) {
  t[js] === t ? t[Hn].push({ id: s15, index: e }) : (t[Hn] = [{ id: s15, index: e }], t[js] = t);
}
var F = ie("BufferService");
var rr = ie("CoreMouseService");
var ge = ie("CoreService");
var Zs = ie("CharsetService");
var xt = ie("InstantiationService");
var nr = ie("LogService");
var H = ie("OptionsService");
var sr = ie("OscLinkService");
var Js = ie("UnicodeService");
var Be = ie("DecorationService");
var wt = class {
  constructor(t, e, i) {
    this._bufferService = t;
    this._optionsService = e;
    this._oscLinkService = i;
  }
  provideLinks(t, e) {
    let i = this._bufferService.buffer.lines.get(t - 1);
    if (!i) {
      e(void 0);
      return;
    }
    let r = [], n = this._optionsService.rawOptions.linkHandler, o2 = new q(), l = i.getTrimmedLength(), a = -1, u = -1, h15 = false;
    for (let c = 0; c < l; c++) if (!(u === -1 && !i.hasContent(c))) {
      if (i.loadCell(c, o2), o2.hasExtendedAttrs() && o2.extended.urlId) if (u === -1) {
        u = c, a = o2.extended.urlId;
        continue;
      } else h15 = o2.extended.urlId !== a;
      else u !== -1 && (h15 = true);
      if (h15 || u !== -1 && c === l - 1) {
        let d = this._oscLinkService.getLinkData(a)?.uri;
        if (d) {
          let _2 = { start: { x: u + 1, y: t }, end: { x: c + (!h15 && c === l - 1 ? 1 : 0), y: t } }, p = false;
          if (!n?.allowNonHttpProtocols) try {
            let m = new URL(d);
            ["http:", "https:"].includes(m.protocol) || (p = true);
          } catch {
            p = true;
          }
          p || r.push({ text: d, range: _2, activate: (m, f) => n ? n.activate(m, f, _2) : Ol(m, f), hover: (m, f) => n?.hover?.(m, f, _2), leave: (m, f) => n?.leave?.(m, f, _2) });
        }
        h15 = false, o2.hasExtendedAttrs() && o2.extended.urlId ? (u = c, a = o2.extended.urlId) : (u = -1, a = -1);
      }
    }
    e(r);
  }
};
wt = M([S(0, F), S(1, H), S(2, sr)], wt);
function Ol(s15, t) {
  if (confirm(`Do you want to navigate to ${t}?

WARNING: This link could potentially be dangerous`)) {
    let i = window.open();
    if (i) {
      try {
        i.opener = null;
      } catch {
      }
      i.location.href = t;
    } else console.warn("Opening link blocked as opener could not be cleared");
  }
}
var nt = ie("CharSizeService");
var ae = ie("CoreBrowserService");
var Dt = ie("MouseService");
var ce = ie("RenderService");
var Qs = ie("SelectionService");
var or = ie("CharacterJoinerService");
var Re = ie("ThemeService");
var lr = ie("LinkProviderService");
var Wn = class {
  constructor() {
    this.listeners = [], this.unexpectedErrorHandler = function(t) {
      setTimeout(() => {
        throw t.stack ? ar.isErrorNoTelemetry(t) ? new ar(t.message + `

` + t.stack) : new Error(t.message + `

` + t.stack) : t;
      }, 0);
    };
  }
  addListener(t) {
    return this.listeners.push(t), () => {
      this._removeListener(t);
    };
  }
  emit(t) {
    this.listeners.forEach((e) => {
      e(t);
    });
  }
  _removeListener(t) {
    this.listeners.splice(this.listeners.indexOf(t), 1);
  }
  setUnexpectedErrorHandler(t) {
    this.unexpectedErrorHandler = t;
  }
  getUnexpectedErrorHandler() {
    return this.unexpectedErrorHandler;
  }
  onUnexpectedError(t) {
    this.unexpectedErrorHandler(t), this.emit(t);
  }
  onUnexpectedExternalError(t) {
    this.unexpectedErrorHandler(t);
  }
};
var Bl = new Wn();
function Lt(s15) {
  Nl(s15) || Bl.onUnexpectedError(s15);
}
var Un = "Canceled";
function Nl(s15) {
  return s15 instanceof bi ? true : s15 instanceof Error && s15.name === Un && s15.message === Un;
}
var bi = class extends Error {
  constructor() {
    super(Un), this.name = this.message;
  }
};
function eo(s15) {
  return s15 ? new Error(`Illegal argument: ${s15}`) : new Error("Illegal argument");
}
var ar = class s4 extends Error {
  constructor(t) {
    super(t), this.name = "CodeExpectedError";
  }
  static fromError(t) {
    if (t instanceof s4) return t;
    let e = new s4();
    return e.message = t.message, e.stack = t.stack, e;
  }
  static isErrorNoTelemetry(t) {
    return t.name === "CodeExpectedError";
  }
};
var Rt = class s5 extends Error {
  constructor(t) {
    super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, s5.prototype);
  }
};
function Fl(s15, t, e = 0, i = s15.length) {
  let r = e, n = i;
  for (; r < n; ) {
    let o2 = Math.floor((r + n) / 2);
    t(s15[o2]) ? r = o2 + 1 : n = o2;
  }
  return r - 1;
}
var cr = class cr2 {
  constructor(t) {
    this._array = t;
    this._findLastMonotonousLastIdx = 0;
  }
  findLastMonotonous(t) {
    if (cr2.assertInvariants) {
      if (this._prevFindLastPredicate) {
        for (let i of this._array) if (this._prevFindLastPredicate(i) && !t(i)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
      }
      this._prevFindLastPredicate = t;
    }
    let e = Fl(this._array, t, this._findLastMonotonousLastIdx);
    return this._findLastMonotonousLastIdx = e + 1, e === -1 ? void 0 : this._array[e];
  }
};
cr.assertInvariants = false;
function Se(s15, t = 0) {
  return s15[s15.length - (1 + t)];
}
var ro;
((l) => {
  function s15(a) {
    return a < 0;
  }
  l.isLessThan = s15;
  function t(a) {
    return a <= 0;
  }
  l.isLessThanOrEqual = t;
  function e(a) {
    return a > 0;
  }
  l.isGreaterThan = e;
  function i(a) {
    return a === 0;
  }
  l.isNeitherLessOrGreaterThan = i, l.greaterThan = 1, l.lessThan = -1, l.neitherLessOrGreaterThan = 0;
})(ro || (ro = {}));
function no(s15, t) {
  return (e, i) => t(s15(e), s15(i));
}
var so = (s15, t) => s15 - t;
var At = class At2 {
  constructor(t) {
    this.iterate = t;
  }
  forEach(t) {
    this.iterate((e) => (t(e), true));
  }
  toArray() {
    let t = [];
    return this.iterate((e) => (t.push(e), true)), t;
  }
  filter(t) {
    return new At2((e) => this.iterate((i) => t(i) ? e(i) : true));
  }
  map(t) {
    return new At2((e) => this.iterate((i) => e(t(i))));
  }
  some(t) {
    let e = false;
    return this.iterate((i) => (e = t(i), !e)), e;
  }
  findFirst(t) {
    let e;
    return this.iterate((i) => t(i) ? (e = i, false) : true), e;
  }
  findLast(t) {
    let e;
    return this.iterate((i) => (t(i) && (e = i), true)), e;
  }
  findLastMaxBy(t) {
    let e, i = true;
    return this.iterate((r) => ((i || ro.isGreaterThan(t(r, e))) && (i = false, e = r), true)), e;
  }
};
At.empty = new At((t) => {
});
function co(s15, t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let i of s15) {
    let r = t(i), n = e[r];
    n || (n = e[r] = []), n.push(i);
  }
  return e;
}
var lo;
var ao;
var oo = class {
  constructor(t, e) {
    this.toKey = e;
    this._map = /* @__PURE__ */ new Map();
    this[lo] = "SetWithKey";
    for (let i of t) this.add(i);
  }
  get size() {
    return this._map.size;
  }
  add(t) {
    let e = this.toKey(t);
    return this._map.set(e, t), this;
  }
  delete(t) {
    return this._map.delete(this.toKey(t));
  }
  has(t) {
    return this._map.has(this.toKey(t));
  }
  *entries() {
    for (let t of this._map.values()) yield [t, t];
  }
  keys() {
    return this.values();
  }
  *values() {
    for (let t of this._map.values()) yield t;
  }
  clear() {
    this._map.clear();
  }
  forEach(t, e) {
    this._map.forEach((i) => t.call(e, i, i, this));
  }
  [(ao = Symbol.iterator, lo = Symbol.toStringTag, ao)]() {
    return this.values();
  }
};
var ur = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(t, e) {
    let i = this.map.get(t);
    i || (i = /* @__PURE__ */ new Set(), this.map.set(t, i)), i.add(e);
  }
  delete(t, e) {
    let i = this.map.get(t);
    i && (i.delete(e), i.size === 0 && this.map.delete(t));
  }
  forEach(t, e) {
    let i = this.map.get(t);
    i && i.forEach(e);
  }
  get(t) {
    let e = this.map.get(t);
    return e || /* @__PURE__ */ new Set();
  }
};
function Kn(s15, t) {
  let e = this, i = false, r;
  return function() {
    if (i) return r;
    if (i = true, t) try {
      r = s15.apply(e, arguments);
    } finally {
      t();
    }
    else r = s15.apply(e, arguments);
    return r;
  };
}
var zn;
((O) => {
  function s15(I) {
    return I && typeof I == "object" && typeof I[Symbol.iterator] == "function";
  }
  O.is = s15;
  let t = Object.freeze([]);
  function e() {
    return t;
  }
  O.empty = e;
  function* i(I) {
    yield I;
  }
  O.single = i;
  function r(I) {
    return s15(I) ? I : i(I);
  }
  O.wrap = r;
  function n(I) {
    return I || t;
  }
  O.from = n;
  function* o2(I) {
    for (let k = I.length - 1; k >= 0; k--) yield I[k];
  }
  O.reverse = o2;
  function l(I) {
    return !I || I[Symbol.iterator]().next().done === true;
  }
  O.isEmpty = l;
  function a(I) {
    return I[Symbol.iterator]().next().value;
  }
  O.first = a;
  function u(I, k) {
    let P = 0;
    for (let oe of I) if (k(oe, P++)) return true;
    return false;
  }
  O.some = u;
  function h15(I, k) {
    for (let P of I) if (k(P)) return P;
  }
  O.find = h15;
  function* c(I, k) {
    for (let P of I) k(P) && (yield P);
  }
  O.filter = c;
  function* d(I, k) {
    let P = 0;
    for (let oe of I) yield k(oe, P++);
  }
  O.map = d;
  function* _2(I, k) {
    let P = 0;
    for (let oe of I) yield* k(oe, P++);
  }
  O.flatMap = _2;
  function* p(...I) {
    for (let k of I) yield* k;
  }
  O.concat = p;
  function m(I, k, P) {
    let oe = P;
    for (let Me of I) oe = k(oe, Me);
    return oe;
  }
  O.reduce = m;
  function* f(I, k, P = I.length) {
    for (k < 0 && (k += I.length), P < 0 ? P += I.length : P > I.length && (P = I.length); k < P; k++) yield I[k];
  }
  O.slice = f;
  function A(I, k = Number.POSITIVE_INFINITY) {
    let P = [];
    if (k === 0) return [P, I];
    let oe = I[Symbol.iterator]();
    for (let Me = 0; Me < k; Me++) {
      let Pe = oe.next();
      if (Pe.done) return [P, O.empty()];
      P.push(Pe.value);
    }
    return [P, { [Symbol.iterator]() {
      return oe;
    } }];
  }
  O.consume = A;
  async function R(I) {
    let k = [];
    for await (let P of I) k.push(P);
    return Promise.resolve(k);
  }
  O.asyncToArray = R;
})(zn || (zn = {}));
var Wl = false;
var dt = null;
var hr = class hr2 {
  constructor() {
    this.livingDisposables = /* @__PURE__ */ new Map();
  }
  getDisposableData(t) {
    let e = this.livingDisposables.get(t);
    return e || (e = { parent: null, source: null, isSingleton: false, value: t, idx: hr2.idx++ }, this.livingDisposables.set(t, e)), e;
  }
  trackDisposable(t) {
    let e = this.getDisposableData(t);
    e.source || (e.source = new Error().stack);
  }
  setParent(t, e) {
    let i = this.getDisposableData(t);
    i.parent = e;
  }
  markAsDisposed(t) {
    this.livingDisposables.delete(t);
  }
  markAsSingleton(t) {
    this.getDisposableData(t).isSingleton = true;
  }
  getRootParent(t, e) {
    let i = e.get(t);
    if (i) return i;
    let r = t.parent ? this.getRootParent(this.getDisposableData(t.parent), e) : t;
    return e.set(t, r), r;
  }
  getTrackedDisposables() {
    let t = /* @__PURE__ */ new Map();
    return [...this.livingDisposables.entries()].filter(([, i]) => i.source !== null && !this.getRootParent(i, t).isSingleton).flatMap(([i]) => i);
  }
  computeLeakingDisposables(t = 10, e) {
    let i;
    if (e) i = e;
    else {
      let a = /* @__PURE__ */ new Map(), u = [...this.livingDisposables.values()].filter((c) => c.source !== null && !this.getRootParent(c, a).isSingleton);
      if (u.length === 0) return;
      let h15 = new Set(u.map((c) => c.value));
      if (i = u.filter((c) => !(c.parent && h15.has(c.parent))), i.length === 0) throw new Error("There are cyclic diposable chains!");
    }
    if (!i) return;
    function r(a) {
      function u(c, d) {
        for (; c.length > 0 && d.some((_2) => typeof _2 == "string" ? _2 === c[0] : c[0].match(_2)); ) c.shift();
      }
      let h15 = a.source.split(`
`).map((c) => c.trim().replace("at ", "")).filter((c) => c !== "");
      return u(h15, ["Error", /^trackDisposable \(.*\)$/, /^DisposableTracker.trackDisposable \(.*\)$/]), h15.reverse();
    }
    let n = new ur();
    for (let a of i) {
      let u = r(a);
      for (let h15 = 0; h15 <= u.length; h15++) n.add(u.slice(0, h15).join(`
`), a);
    }
    i.sort(no((a) => a.idx, so));
    let o2 = "", l = 0;
    for (let a of i.slice(0, t)) {
      l++;
      let u = r(a), h15 = [];
      for (let c = 0; c < u.length; c++) {
        let d = u[c];
        d = `(shared with ${n.get(u.slice(0, c + 1).join(`
`)).size}/${i.length} leaks) at ${d}`;
        let p = n.get(u.slice(0, c).join(`
`)), m = co([...p].map((f) => r(f)[c]), (f) => f);
        delete m[u[c]];
        for (let [f, A] of Object.entries(m)) h15.unshift(`    - stacktraces of ${A.length} other leaks continue with ${f}`);
        h15.unshift(d);
      }
      o2 += `


==================== Leaking disposable ${l}/${i.length}: ${a.value.constructor.name} ====================
${h15.join(`
`)}
============================================================

`;
    }
    return i.length > t && (o2 += `


... and ${i.length - t} more leaking disposables

`), { leaks: i, details: o2 };
  }
};
hr.idx = 0;
function Ul(s15) {
  dt = s15;
}
if (Wl) {
  let s15 = "__is_disposable_tracked__";
  Ul(new class {
    trackDisposable(t) {
      let e = new Error("Potentially leaked disposable").stack;
      setTimeout(() => {
        t[s15] || console.log(e);
      }, 3e3);
    }
    setParent(t, e) {
      if (t && t !== D.None) try {
        t[s15] = true;
      } catch {
      }
    }
    markAsDisposed(t) {
      if (t && t !== D.None) try {
        t[s15] = true;
      } catch {
      }
    }
    markAsSingleton(t) {
    }
  }());
}
function fr(s15) {
  return dt?.trackDisposable(s15), s15;
}
function pr(s15) {
  dt?.markAsDisposed(s15);
}
function vi(s15, t) {
  dt?.setParent(s15, t);
}
function Kl(s15, t) {
  if (dt) for (let e of s15) dt.setParent(e, t);
}
function Gn(s15) {
  return dt?.markAsSingleton(s15), s15;
}
function Ne(s15) {
  if (zn.is(s15)) {
    let t = [];
    for (let e of s15) if (e) try {
      e.dispose();
    } catch (i) {
      t.push(i);
    }
    if (t.length === 1) throw t[0];
    if (t.length > 1) throw new AggregateError(t, "Encountered errors while disposing of store");
    return Array.isArray(s15) ? [] : s15;
  } else if (s15) return s15.dispose(), s15;
}
function ho(...s15) {
  let t = C(() => Ne(s15));
  return Kl(s15, t), t;
}
function C(s15) {
  let t = fr({ dispose: Kn(() => {
    pr(t), s15();
  }) });
  return t;
}
var dr = class dr2 {
  constructor() {
    this._toDispose = /* @__PURE__ */ new Set();
    this._isDisposed = false;
    fr(this);
  }
  dispose() {
    this._isDisposed || (pr(this), this._isDisposed = true, this.clear());
  }
  get isDisposed() {
    return this._isDisposed;
  }
  clear() {
    if (this._toDispose.size !== 0) try {
      Ne(this._toDispose);
    } finally {
      this._toDispose.clear();
    }
  }
  add(t) {
    if (!t) return t;
    if (t === this) throw new Error("Cannot register a disposable on itself!");
    return vi(t, this), this._isDisposed ? dr2.DISABLE_DISPOSED_WARNING || console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack) : this._toDispose.add(t), t;
  }
  delete(t) {
    if (t) {
      if (t === this) throw new Error("Cannot dispose a disposable on itself!");
      this._toDispose.delete(t), t.dispose();
    }
  }
  deleteAndLeak(t) {
    t && this._toDispose.has(t) && (this._toDispose.delete(t), vi(t, null));
  }
};
dr.DISABLE_DISPOSED_WARNING = false;
var Ee = dr;
var D = class {
  constructor() {
    this._store = new Ee();
    fr(this), vi(this._store, this);
  }
  dispose() {
    pr(this), this._store.dispose();
  }
  _register(t) {
    if (t === this) throw new Error("Cannot register a disposable on itself!");
    return this._store.add(t);
  }
};
D.None = Object.freeze({ dispose() {
} });
var ye = class {
  constructor() {
    this._isDisposed = false;
    fr(this);
  }
  get value() {
    return this._isDisposed ? void 0 : this._value;
  }
  set value(t) {
    this._isDisposed || t === this._value || (this._value?.dispose(), t && vi(t, this), this._value = t);
  }
  clear() {
    this.value = void 0;
  }
  dispose() {
    this._isDisposed = true, pr(this), this._value?.dispose(), this._value = void 0;
  }
  clearAndLeak() {
    let t = this._value;
    return this._value = void 0, t && vi(t, null), t;
  }
};
var fe = typeof window == "object" ? window : globalThis;
var kt = class kt2 {
  constructor(t) {
    this.element = t, this.next = kt2.Undefined, this.prev = kt2.Undefined;
  }
};
kt.Undefined = new kt(void 0);
var G = kt;
var Ct = class {
  constructor() {
    this._first = G.Undefined;
    this._last = G.Undefined;
    this._size = 0;
  }
  get size() {
    return this._size;
  }
  isEmpty() {
    return this._first === G.Undefined;
  }
  clear() {
    let t = this._first;
    for (; t !== G.Undefined; ) {
      let e = t.next;
      t.prev = G.Undefined, t.next = G.Undefined, t = e;
    }
    this._first = G.Undefined, this._last = G.Undefined, this._size = 0;
  }
  unshift(t) {
    return this._insert(t, false);
  }
  push(t) {
    return this._insert(t, true);
  }
  _insert(t, e) {
    let i = new G(t);
    if (this._first === G.Undefined) this._first = i, this._last = i;
    else if (e) {
      let n = this._last;
      this._last = i, i.prev = n, n.next = i;
    } else {
      let n = this._first;
      this._first = i, i.next = n, n.prev = i;
    }
    this._size += 1;
    let r = false;
    return () => {
      r || (r = true, this._remove(i));
    };
  }
  shift() {
    if (this._first !== G.Undefined) {
      let t = this._first.element;
      return this._remove(this._first), t;
    }
  }
  pop() {
    if (this._last !== G.Undefined) {
      let t = this._last.element;
      return this._remove(this._last), t;
    }
  }
  _remove(t) {
    if (t.prev !== G.Undefined && t.next !== G.Undefined) {
      let e = t.prev;
      e.next = t.next, t.next.prev = e;
    } else t.prev === G.Undefined && t.next === G.Undefined ? (this._first = G.Undefined, this._last = G.Undefined) : t.next === G.Undefined ? (this._last = this._last.prev, this._last.next = G.Undefined) : t.prev === G.Undefined && (this._first = this._first.next, this._first.prev = G.Undefined);
    this._size -= 1;
  }
  *[Symbol.iterator]() {
    let t = this._first;
    for (; t !== G.Undefined; ) yield t.element, t = t.next;
  }
};
var zl = globalThis.performance && typeof globalThis.performance.now == "function";
var mr = class s6 {
  static create(t) {
    return new s6(t);
  }
  constructor(t) {
    this._now = zl && t === false ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
  }
  stop() {
    this._stopTime = this._now();
  }
  reset() {
    this._startTime = this._now(), this._stopTime = -1;
  }
  elapsed() {
    return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime;
  }
};
var Gl = false;
var fo = false;
var $l = false;
var $;
((Qe) => {
  Qe.None = () => D.None;
  function t(y) {
    if ($l) {
      let { onDidAddListener: T } = y, g = gi.create(), w = 0;
      y.onDidAddListener = () => {
        ++w === 2 && (console.warn("snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here"), g.print()), T?.();
      };
    }
  }
  function e(y, T) {
    return d(y, () => {
    }, 0, void 0, true, void 0, T);
  }
  Qe.defer = e;
  function i(y) {
    return (T, g = null, w) => {
      let E = false, x;
      return x = y((N) => {
        if (!E) return x ? x.dispose() : E = true, T.call(g, N);
      }, null, w), E && x.dispose(), x;
    };
  }
  Qe.once = i;
  function r(y, T, g) {
    return h15((w, E = null, x) => y((N) => w.call(E, T(N)), null, x), g);
  }
  Qe.map = r;
  function n(y, T, g) {
    return h15((w, E = null, x) => y((N) => {
      T(N), w.call(E, N);
    }, null, x), g);
  }
  Qe.forEach = n;
  function o2(y, T, g) {
    return h15((w, E = null, x) => y((N) => T(N) && w.call(E, N), null, x), g);
  }
  Qe.filter = o2;
  function l(y) {
    return y;
  }
  Qe.signal = l;
  function a(...y) {
    return (T, g = null, w) => {
      let E = ho(...y.map((x) => x((N) => T.call(g, N))));
      return c(E, w);
    };
  }
  Qe.any = a;
  function u(y, T, g, w) {
    let E = g;
    return r(y, (x) => (E = T(E, x), E), w);
  }
  Qe.reduce = u;
  function h15(y, T) {
    let g, w = { onWillAddFirstListener() {
      g = y(E.fire, E);
    }, onDidRemoveLastListener() {
      g?.dispose();
    } };
    T || t(w);
    let E = new v(w);
    return T?.add(E), E.event;
  }
  function c(y, T) {
    return T instanceof Array ? T.push(y) : T && T.add(y), y;
  }
  function d(y, T, g = 100, w = false, E = false, x, N) {
    let Z, te, Oe, ze = 0, le, et = { leakWarningThreshold: x, onWillAddFirstListener() {
      Z = y((ht) => {
        ze++, te = T(te, ht), w && !Oe && (me.fire(te), te = void 0), le = () => {
          let fi = te;
          te = void 0, Oe = void 0, (!w || ze > 1) && me.fire(fi), ze = 0;
        }, typeof g == "number" ? (clearTimeout(Oe), Oe = setTimeout(le, g)) : Oe === void 0 && (Oe = 0, queueMicrotask(le));
      });
    }, onWillRemoveListener() {
      E && ze > 0 && le?.();
    }, onDidRemoveLastListener() {
      le = void 0, Z.dispose();
    } };
    N || t(et);
    let me = new v(et);
    return N?.add(me), me.event;
  }
  Qe.debounce = d;
  function _2(y, T = 0, g) {
    return Qe.debounce(y, (w, E) => w ? (w.push(E), w) : [E], T, void 0, true, void 0, g);
  }
  Qe.accumulate = _2;
  function p(y, T = (w, E) => w === E, g) {
    let w = true, E;
    return o2(y, (x) => {
      let N = w || !T(x, E);
      return w = false, E = x, N;
    }, g);
  }
  Qe.latch = p;
  function m(y, T, g) {
    return [Qe.filter(y, T, g), Qe.filter(y, (w) => !T(w), g)];
  }
  Qe.split = m;
  function f(y, T = false, g = [], w) {
    let E = g.slice(), x = y((te) => {
      E ? E.push(te) : Z.fire(te);
    });
    w && w.add(x);
    let N = () => {
      E?.forEach((te) => Z.fire(te)), E = null;
    }, Z = new v({ onWillAddFirstListener() {
      x || (x = y((te) => Z.fire(te)), w && w.add(x));
    }, onDidAddFirstListener() {
      E && (T ? setTimeout(N) : N());
    }, onDidRemoveLastListener() {
      x && x.dispose(), x = null;
    } });
    return w && w.add(Z), Z.event;
  }
  Qe.buffer = f;
  function A(y, T) {
    return (w, E, x) => {
      let N = T(new O());
      return y(function(Z) {
        let te = N.evaluate(Z);
        te !== R && w.call(E, te);
      }, void 0, x);
    };
  }
  Qe.chain = A;
  let R = Symbol("HaltChainable");
  class O {
    constructor() {
      this.steps = [];
    }
    map(T) {
      return this.steps.push(T), this;
    }
    forEach(T) {
      return this.steps.push((g) => (T(g), g)), this;
    }
    filter(T) {
      return this.steps.push((g) => T(g) ? g : R), this;
    }
    reduce(T, g) {
      let w = g;
      return this.steps.push((E) => (w = T(w, E), w)), this;
    }
    latch(T = (g, w) => g === w) {
      let g = true, w;
      return this.steps.push((E) => {
        let x = g || !T(E, w);
        return g = false, w = E, x ? E : R;
      }), this;
    }
    evaluate(T) {
      for (let g of this.steps) if (T = g(T), T === R) break;
      return T;
    }
  }
  function I(y, T, g = (w) => w) {
    let w = (...Z) => N.fire(g(...Z)), E = () => y.on(T, w), x = () => y.removeListener(T, w), N = new v({ onWillAddFirstListener: E, onDidRemoveLastListener: x });
    return N.event;
  }
  Qe.fromNodeEventEmitter = I;
  function k(y, T, g = (w) => w) {
    let w = (...Z) => N.fire(g(...Z)), E = () => y.addEventListener(T, w), x = () => y.removeEventListener(T, w), N = new v({ onWillAddFirstListener: E, onDidRemoveLastListener: x });
    return N.event;
  }
  Qe.fromDOMEventEmitter = k;
  function P(y) {
    return new Promise((T) => i(y)(T));
  }
  Qe.toPromise = P;
  function oe(y) {
    let T = new v();
    return y.then((g) => {
      T.fire(g);
    }, () => {
      T.fire(void 0);
    }).finally(() => {
      T.dispose();
    }), T.event;
  }
  Qe.fromPromise = oe;
  function Me(y, T) {
    return y((g) => T.fire(g));
  }
  Qe.forward = Me;
  function Pe(y, T, g) {
    return T(g), y((w) => T(w));
  }
  Qe.runAndSubscribe = Pe;
  class Ke {
    constructor(T, g) {
      this._observable = T;
      this._counter = 0;
      this._hasChanged = false;
      let w = { onWillAddFirstListener: () => {
        T.addObserver(this);
      }, onDidRemoveLastListener: () => {
        T.removeObserver(this);
      } };
      g || t(w), this.emitter = new v(w), g && g.add(this.emitter);
    }
    beginUpdate(T) {
      this._counter++;
    }
    handlePossibleChange(T) {
    }
    handleChange(T, g) {
      this._hasChanged = true;
    }
    endUpdate(T) {
      this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = false, this.emitter.fire(this._observable.get())));
    }
  }
  function di(y, T) {
    return new Ke(y, T).emitter.event;
  }
  Qe.fromObservable = di;
  function V(y) {
    return (T, g, w) => {
      let E = 0, x = false, N = { beginUpdate() {
        E++;
      }, endUpdate() {
        E--, E === 0 && (y.reportChanges(), x && (x = false, T.call(g)));
      }, handlePossibleChange() {
      }, handleChange() {
        x = true;
      } };
      y.addObserver(N), y.reportChanges();
      let Z = { dispose() {
        y.removeObserver(N);
      } };
      return w instanceof Ee ? w.add(Z) : Array.isArray(w) && w.push(Z), Z;
    };
  }
  Qe.fromObservableLight = V;
})($ || ($ = {}));
var Mt = class Mt2 {
  constructor(t) {
    this.listenerCount = 0;
    this.invocationCount = 0;
    this.elapsedOverall = 0;
    this.durations = [];
    this.name = `${t}_${Mt2._idPool++}`, Mt2.all.add(this);
  }
  start(t) {
    this._stopWatch = new mr(), this.listenerCount = t;
  }
  stop() {
    if (this._stopWatch) {
      let t = this._stopWatch.elapsed();
      this.durations.push(t), this.elapsedOverall += t, this.invocationCount += 1, this._stopWatch = void 0;
    }
  }
};
Mt.all = /* @__PURE__ */ new Set(), Mt._idPool = 0;
var $n = Mt;
var po = -1;
var br = class br2 {
  constructor(t, e, i = (br2._idPool++).toString(16).padStart(3, "0")) {
    this._errorHandler = t;
    this.threshold = e;
    this.name = i;
    this._warnCountdown = 0;
  }
  dispose() {
    this._stacks?.clear();
  }
  check(t, e) {
    let i = this.threshold;
    if (i <= 0 || e < i) return;
    this._stacks || (this._stacks = /* @__PURE__ */ new Map());
    let r = this._stacks.get(t.value) || 0;
    if (this._stacks.set(t.value, r + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
      this._warnCountdown = i * 0.5;
      let [n, o2] = this.getMostFrequentStack(), l = `[${this.name}] potential listener LEAK detected, having ${e} listeners already. MOST frequent listener (${o2}):`;
      console.warn(l), console.warn(n);
      let a = new qn(l, n);
      this._errorHandler(a);
    }
    return () => {
      let n = this._stacks.get(t.value) || 0;
      this._stacks.set(t.value, n - 1);
    };
  }
  getMostFrequentStack() {
    if (!this._stacks) return;
    let t, e = 0;
    for (let [i, r] of this._stacks) (!t || e < r) && (t = [i, r], e = r);
    return t;
  }
};
br._idPool = 1;
var Vn = br;
var gi = class s7 {
  constructor(t) {
    this.value = t;
  }
  static create() {
    let t = new Error();
    return new s7(t.stack ?? "");
  }
  print() {
    console.warn(this.value.split(`
`).slice(2).join(`
`));
  }
};
var qn = class extends Error {
  constructor(t, e) {
    super(t), this.name = "ListenerLeakError", this.stack = e;
  }
};
var Yn = class extends Error {
  constructor(t, e) {
    super(t), this.name = "ListenerRefusalError", this.stack = e;
  }
};
var Vl = 0;
var Pt = class {
  constructor(t) {
    this.value = t;
    this.id = Vl++;
  }
};
var ql = 2;
var Yl = (s15, t) => {
  if (s15 instanceof Pt) t(s15);
  else for (let e = 0; e < s15.length; e++) {
    let i = s15[e];
    i && t(i);
  }
};
var _r;
if (Gl) {
  let s15 = [];
  setInterval(() => {
    s15.length !== 0 && (console.warn("[LEAKING LISTENERS] GC'ed these listeners that were NOT yet disposed:"), console.warn(s15.join(`
`)), s15.length = 0);
  }, 3e3), _r = new FinalizationRegistry((t) => {
    typeof t == "string" && s15.push(t);
  });
}
var v = class {
  constructor(t) {
    this._size = 0;
    this._options = t, this._leakageMon = po > 0 || this._options?.leakWarningThreshold ? new Vn(t?.onListenerError ?? Lt, this._options?.leakWarningThreshold ?? po) : void 0, this._perfMon = this._options?._profName ? new $n(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
  }
  dispose() {
    if (!this._disposed) {
      if (this._disposed = true, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners) {
        if (fo) {
          let t = this._listeners;
          queueMicrotask(() => {
            Yl(t, (e) => e.stack?.print());
          });
        }
        this._listeners = void 0, this._size = 0;
      }
      this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose();
    }
  }
  get event() {
    return this._event ?? (this._event = (t, e, i) => {
      if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
        let a = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
        console.warn(a);
        let u = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], h15 = new Yn(`${a}. HINT: Stack shows most frequent listener (${u[1]}-times)`, u[0]);
        return (this._options?.onListenerError || Lt)(h15), D.None;
      }
      if (this._disposed) return D.None;
      e && (t = t.bind(e));
      let r = new Pt(t), n, o2;
      this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2) && (r.stack = gi.create(), n = this._leakageMon.check(r.stack, this._size + 1)), fo && (r.stack = o2 ?? gi.create()), this._listeners ? this._listeners instanceof Pt ? (this._deliveryQueue ?? (this._deliveryQueue = new jn()), this._listeners = [this._listeners, r]) : this._listeners.push(r) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r, this._options?.onDidAddFirstListener?.(this)), this._size++;
      let l = C(() => {
        _r?.unregister(l), n?.(), this._removeListener(r);
      });
      if (i instanceof Ee ? i.add(l) : Array.isArray(i) && i.push(l), _r) {
        let a = new Error().stack.split(`
`).slice(2, 3).join(`
`).trim(), u = /(file:|vscode-file:\/\/vscode-app)?(\/[^:]*:\d+:\d+)/.exec(a);
        _r.register(l, u?.[2] ?? a, l);
      }
      return l;
    }), this._event;
  }
  _removeListener(t) {
    if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
    if (this._size === 1) {
      this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
      return;
    }
    let e = this._listeners, i = e.indexOf(t);
    if (i === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
    this._size--, e[i] = void 0;
    let r = this._deliveryQueue.current === this;
    if (this._size * ql <= e.length) {
      let n = 0;
      for (let o2 = 0; o2 < e.length; o2++) e[o2] ? e[n++] = e[o2] : r && (this._deliveryQueue.end--, n < this._deliveryQueue.i && this._deliveryQueue.i--);
      e.length = n;
    }
  }
  _deliver(t, e) {
    if (!t) return;
    let i = this._options?.onListenerError || Lt;
    if (!i) {
      t.value(e);
      return;
    }
    try {
      t.value(e);
    } catch (r) {
      i(r);
    }
  }
  _deliverQueue(t) {
    let e = t.current._listeners;
    for (; t.i < t.end; ) this._deliver(e[t.i++], t.value);
    t.reset();
  }
  fire(t) {
    if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof Pt) this._deliver(this._listeners, t);
    else {
      let e = this._deliveryQueue;
      e.enqueue(this, t, this._listeners.length), this._deliverQueue(e);
    }
    this._perfMon?.stop();
  }
  hasListeners() {
    return this._size > 0;
  }
};
var jn = class {
  constructor() {
    this.i = -1;
    this.end = 0;
  }
  enqueue(t, e, i) {
    this.i = 0, this.end = i, this.current = t, this.value = e;
  }
  reset() {
    this.i = this.end, this.current = void 0, this.value = void 0;
  }
};
var gr = class gr2 {
  constructor() {
    this.mapWindowIdToZoomLevel = /* @__PURE__ */ new Map();
    this._onDidChangeZoomLevel = new v();
    this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event;
    this.mapWindowIdToZoomFactor = /* @__PURE__ */ new Map();
    this._onDidChangeFullscreen = new v();
    this.onDidChangeFullscreen = this._onDidChangeFullscreen.event;
    this.mapWindowIdToFullScreen = /* @__PURE__ */ new Map();
  }
  getZoomLevel(t) {
    return this.mapWindowIdToZoomLevel.get(this.getWindowId(t)) ?? 0;
  }
  setZoomLevel(t, e) {
    if (this.getZoomLevel(e) === t) return;
    let i = this.getWindowId(e);
    this.mapWindowIdToZoomLevel.set(i, t), this._onDidChangeZoomLevel.fire(i);
  }
  getZoomFactor(t) {
    return this.mapWindowIdToZoomFactor.get(this.getWindowId(t)) ?? 1;
  }
  setZoomFactor(t, e) {
    this.mapWindowIdToZoomFactor.set(this.getWindowId(e), t);
  }
  setFullscreen(t, e) {
    if (this.isFullscreen(e) === t) return;
    let i = this.getWindowId(e);
    this.mapWindowIdToFullScreen.set(i, t), this._onDidChangeFullscreen.fire(i);
  }
  isFullscreen(t) {
    return !!this.mapWindowIdToFullScreen.get(this.getWindowId(t));
  }
  getWindowId(t) {
    return t.vscodeWindowId;
  }
};
gr.INSTANCE = new gr();
var Si = gr;
function Xl(s15, t, e) {
  typeof t == "string" && (t = s15.matchMedia(t)), t.addEventListener("change", e);
}
var Eu = Si.INSTANCE.onDidChangeZoomLevel;
function mo(s15) {
  return Si.INSTANCE.getZoomFactor(s15);
}
var Tu = Si.INSTANCE.onDidChangeFullscreen;
var Ot = typeof navigator == "object" ? navigator.userAgent : "";
var Ei = Ot.indexOf("Firefox") >= 0;
var Bt = Ot.indexOf("AppleWebKit") >= 0;
var Ti = Ot.indexOf("Chrome") >= 0;
var Sr = !Ti && Ot.indexOf("Safari") >= 0;
var Iu = Ot.indexOf("Electron/") >= 0;
var yu = Ot.indexOf("Android") >= 0;
var vr = false;
if (typeof fe.matchMedia == "function") {
  let s15 = fe.matchMedia("(display-mode: standalone) or (display-mode: window-controls-overlay)"), t = fe.matchMedia("(display-mode: fullscreen)");
  vr = s15.matches, Xl(fe, s15, ({ matches: e }) => {
    vr && t.matches || (vr = e);
  });
}
function _o() {
  return vr;
}
var Nt = "en";
var yr = false;
var xr = false;
var Ii = false;
var Zl = false;
var vo = false;
var go = false;
var Jl = false;
var Ql = false;
var ea = false;
var ta = false;
var Tr;
var Ir = Nt;
var bo = Nt;
var ia;
var $e;
var Ve = globalThis;
var xe;
typeof Ve.vscode < "u" && typeof Ve.vscode.process < "u" ? xe = Ve.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (xe = process);
var So = typeof xe?.versions?.electron == "string";
var ra = So && xe?.type === "renderer";
if (typeof xe == "object") {
  yr = xe.platform === "win32", xr = xe.platform === "darwin", Ii = xe.platform === "linux", Zl = Ii && !!xe.env.SNAP && !!xe.env.SNAP_REVISION, Jl = So, ea = !!xe.env.CI || !!xe.env.BUILD_ARTIFACTSTAGINGDIRECTORY, Tr = Nt, Ir = Nt;
  let s15 = xe.env.VSCODE_NLS_CONFIG;
  if (s15) try {
    let t = JSON.parse(s15);
    Tr = t.userLocale, bo = t.osLocale, Ir = t.resolvedLanguage || Nt, ia = t.languagePack?.translationsConfigFile;
  } catch {
  }
  vo = true;
} else typeof navigator == "object" && !ra ? ($e = navigator.userAgent, yr = $e.indexOf("Windows") >= 0, xr = $e.indexOf("Macintosh") >= 0, Ql = ($e.indexOf("Macintosh") >= 0 || $e.indexOf("iPad") >= 0 || $e.indexOf("iPhone") >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0, Ii = $e.indexOf("Linux") >= 0, ta = $e?.indexOf("Mobi") >= 0, go = true, Ir = globalThis._VSCODE_NLS_LANGUAGE || Nt, Tr = navigator.language.toLowerCase(), bo = Tr) : console.error("Unable to resolve platform.");
var Xn = 0;
xr ? Xn = 1 : yr ? Xn = 3 : Ii && (Xn = 2);
var wr = yr;
var Te = xr;
var Zn = Ii;
var Dr = vo;
var na = go && typeof Ve.importScripts == "function";
var xu = na ? Ve.origin : void 0;
var Fe = $e;
var st = Ir;
var sa;
((i) => {
  function s15() {
    return st;
  }
  i.value = s15;
  function t() {
    return st.length === 2 ? st === "en" : st.length >= 3 ? st[0] === "e" && st[1] === "n" && st[2] === "-" : false;
  }
  i.isDefaultVariant = t;
  function e() {
    return st === "en";
  }
  i.isDefault = e;
})(sa || (sa = {}));
var oa = typeof Ve.postMessage == "function" && !Ve.importScripts;
var Eo = (() => {
  if (oa) {
    let s15 = [];
    Ve.addEventListener("message", (e) => {
      if (e.data && e.data.vscodeScheduleAsyncWork) for (let i = 0, r = s15.length; i < r; i++) {
        let n = s15[i];
        if (n.id === e.data.vscodeScheduleAsyncWork) {
          s15.splice(i, 1), n.callback();
          return;
        }
      }
    });
    let t = 0;
    return (e) => {
      let i = ++t;
      s15.push({ id: i, callback: e }), Ve.postMessage({ vscodeScheduleAsyncWork: i }, "*");
    };
  }
  return (s15) => setTimeout(s15);
})();
var la = !!(Fe && Fe.indexOf("Chrome") >= 0);
var wu = !!(Fe && Fe.indexOf("Firefox") >= 0);
var Du = !!(!la && Fe && Fe.indexOf("Safari") >= 0);
var Ru = !!(Fe && Fe.indexOf("Edg/") >= 0);
var Lu = !!(Fe && Fe.indexOf("Android") >= 0);
var ot = typeof navigator == "object" ? navigator : {};
var aa = { clipboard: { writeText: Dr || document.queryCommandSupported && document.queryCommandSupported("copy") || !!(ot && ot.clipboard && ot.clipboard.writeText), readText: Dr || !!(ot && ot.clipboard && ot.clipboard.readText) }, keyboard: Dr || _o() ? 0 : ot.keyboard || Sr ? 1 : 2, touch: "ontouchstart" in fe || ot.maxTouchPoints > 0, pointerEvents: fe.PointerEvent && ("ontouchstart" in fe || navigator.maxTouchPoints > 0) };
var yi = class {
  constructor() {
    this._keyCodeToStr = [], this._strToKeyCode = /* @__PURE__ */ Object.create(null);
  }
  define(t, e) {
    this._keyCodeToStr[t] = e, this._strToKeyCode[e.toLowerCase()] = t;
  }
  keyCodeToStr(t) {
    return this._keyCodeToStr[t];
  }
  strToKeyCode(t) {
    return this._strToKeyCode[t.toLowerCase()] || 0;
  }
};
var Jn = new yi();
var To = new yi();
var Io = new yi();
var yo = new Array(230);
var Qn;
((o2) => {
  function s15(l) {
    return Jn.keyCodeToStr(l);
  }
  o2.toString = s15;
  function t(l) {
    return Jn.strToKeyCode(l);
  }
  o2.fromString = t;
  function e(l) {
    return To.keyCodeToStr(l);
  }
  o2.toUserSettingsUS = e;
  function i(l) {
    return Io.keyCodeToStr(l);
  }
  o2.toUserSettingsGeneral = i;
  function r(l) {
    return To.strToKeyCode(l) || Io.strToKeyCode(l);
  }
  o2.fromUserSettings = r;
  function n(l) {
    if (l >= 98 && l <= 113) return null;
    switch (l) {
      case 16:
        return "Up";
      case 18:
        return "Down";
      case 15:
        return "Left";
      case 17:
        return "Right";
    }
    return Jn.keyCodeToStr(l);
  }
  o2.toElectronAccelerator = n;
})(Qn || (Qn = {}));
var Rr = class s8 {
  constructor(t, e, i, r, n) {
    this.ctrlKey = t;
    this.shiftKey = e;
    this.altKey = i;
    this.metaKey = r;
    this.keyCode = n;
  }
  equals(t) {
    return t instanceof s8 && this.ctrlKey === t.ctrlKey && this.shiftKey === t.shiftKey && this.altKey === t.altKey && this.metaKey === t.metaKey && this.keyCode === t.keyCode;
  }
  getHashCode() {
    let t = this.ctrlKey ? "1" : "0", e = this.shiftKey ? "1" : "0", i = this.altKey ? "1" : "0", r = this.metaKey ? "1" : "0";
    return `K${t}${e}${i}${r}${this.keyCode}`;
  }
  isModifierKey() {
    return this.keyCode === 0 || this.keyCode === 5 || this.keyCode === 57 || this.keyCode === 6 || this.keyCode === 4;
  }
  toKeybinding() {
    return new es([this]);
  }
  isDuplicateModifierCase() {
    return this.ctrlKey && this.keyCode === 5 || this.shiftKey && this.keyCode === 4 || this.altKey && this.keyCode === 6 || this.metaKey && this.keyCode === 57;
  }
};
var es = class {
  constructor(t) {
    if (t.length === 0) throw eo("chords");
    this.chords = t;
  }
  getHashCode() {
    let t = "";
    for (let e = 0, i = this.chords.length; e < i; e++) e !== 0 && (t += ";"), t += this.chords[e].getHashCode();
    return t;
  }
  equals(t) {
    if (t === null || this.chords.length !== t.chords.length) return false;
    for (let e = 0; e < this.chords.length; e++) if (!this.chords[e].equals(t.chords[e])) return false;
    return true;
  }
};
function ca(s15) {
  if (s15.charCode) {
    let e = String.fromCharCode(s15.charCode).toUpperCase();
    return Qn.fromString(e);
  }
  let t = s15.keyCode;
  if (t === 3) return 7;
  if (Ei) switch (t) {
    case 59:
      return 85;
    case 60:
      if (Zn) return 97;
      break;
    case 61:
      return 86;
    case 107:
      return 109;
    case 109:
      return 111;
    case 173:
      return 88;
    case 224:
      if (Te) return 57;
      break;
  }
  else if (Bt) {
    if (Te && t === 93) return 57;
    if (!Te && t === 92) return 57;
  }
  return yo[t] || 0;
}
var ua = Te ? 256 : 2048;
var ha = 512;
var da = 1024;
var fa = Te ? 2048 : 256;
var ft = class {
  constructor(t) {
    this._standardKeyboardEventBrand = true;
    let e = t;
    this.browserEvent = e, this.target = e.target, this.ctrlKey = e.ctrlKey, this.shiftKey = e.shiftKey, this.altKey = e.altKey, this.metaKey = e.metaKey, this.altGraphKey = e.getModifierState?.("AltGraph"), this.keyCode = ca(e), this.code = e.code, this.ctrlKey = this.ctrlKey || this.keyCode === 5, this.altKey = this.altKey || this.keyCode === 6, this.shiftKey = this.shiftKey || this.keyCode === 4, this.metaKey = this.metaKey || this.keyCode === 57, this._asKeybinding = this._computeKeybinding(), this._asKeyCodeChord = this._computeKeyCodeChord();
  }
  preventDefault() {
    this.browserEvent && this.browserEvent.preventDefault && this.browserEvent.preventDefault();
  }
  stopPropagation() {
    this.browserEvent && this.browserEvent.stopPropagation && this.browserEvent.stopPropagation();
  }
  toKeyCodeChord() {
    return this._asKeyCodeChord;
  }
  equals(t) {
    return this._asKeybinding === t;
  }
  _computeKeybinding() {
    let t = 0;
    this.keyCode !== 5 && this.keyCode !== 4 && this.keyCode !== 6 && this.keyCode !== 57 && (t = this.keyCode);
    let e = 0;
    return this.ctrlKey && (e |= ua), this.altKey && (e |= ha), this.shiftKey && (e |= da), this.metaKey && (e |= fa), e |= t, e;
  }
  _computeKeyCodeChord() {
    let t = 0;
    return this.keyCode !== 5 && this.keyCode !== 4 && this.keyCode !== 6 && this.keyCode !== 57 && (t = this.keyCode), new Rr(this.ctrlKey, this.shiftKey, this.altKey, this.metaKey, t);
  }
};
var wo = /* @__PURE__ */ new WeakMap();
function pa(s15) {
  if (!s15.parent || s15.parent === s15) return null;
  try {
    let t = s15.location, e = s15.parent.location;
    if (t.origin !== "null" && e.origin !== "null" && t.origin !== e.origin) return null;
  } catch {
    return null;
  }
  return s15.parent;
}
var Lr = class {
  static getSameOriginWindowChain(t) {
    let e = wo.get(t);
    if (!e) {
      e = [], wo.set(t, e);
      let i = t, r;
      do
        r = pa(i), r ? e.push({ window: new WeakRef(i), iframeElement: i.frameElement || null }) : e.push({ window: new WeakRef(i), iframeElement: null }), i = r;
      while (i);
    }
    return e.slice(0);
  }
  static getPositionOfChildWindowRelativeToAncestorWindow(t, e) {
    if (!e || t === e) return { top: 0, left: 0 };
    let i = 0, r = 0, n = this.getSameOriginWindowChain(t);
    for (let o2 of n) {
      let l = o2.window.deref();
      if (i += l?.scrollY ?? 0, r += l?.scrollX ?? 0, l === e || !o2.iframeElement) break;
      let a = o2.iframeElement.getBoundingClientRect();
      i += a.top, r += a.left;
    }
    return { top: i, left: r };
  }
};
var qe = class {
  constructor(t, e) {
    this.timestamp = Date.now(), this.browserEvent = e, this.leftButton = e.button === 0, this.middleButton = e.button === 1, this.rightButton = e.button === 2, this.buttons = e.buttons, this.target = e.target, this.detail = e.detail || 1, e.type === "dblclick" && (this.detail = 2), this.ctrlKey = e.ctrlKey, this.shiftKey = e.shiftKey, this.altKey = e.altKey, this.metaKey = e.metaKey, typeof e.pageX == "number" ? (this.posx = e.pageX, this.posy = e.pageY) : (this.posx = e.clientX + this.target.ownerDocument.body.scrollLeft + this.target.ownerDocument.documentElement.scrollLeft, this.posy = e.clientY + this.target.ownerDocument.body.scrollTop + this.target.ownerDocument.documentElement.scrollTop);
    let i = Lr.getPositionOfChildWindowRelativeToAncestorWindow(t, e.view);
    this.posx -= i.left, this.posy -= i.top;
  }
  preventDefault() {
    this.browserEvent.preventDefault();
  }
  stopPropagation() {
    this.browserEvent.stopPropagation();
  }
};
var xi = class {
  constructor(t, e = 0, i = 0) {
    this.browserEvent = t || null, this.target = t ? t.target || t.targetNode || t.srcElement : null, this.deltaY = i, this.deltaX = e;
    let r = false;
    if (Ti) {
      let n = navigator.userAgent.match(/Chrome\/(\d+)/);
      r = (n ? parseInt(n[1]) : 123) <= 122;
    }
    if (t) {
      let n = t, o2 = t, l = t.view?.devicePixelRatio || 1;
      if (typeof n.wheelDeltaY < "u") r ? this.deltaY = n.wheelDeltaY / (120 * l) : this.deltaY = n.wheelDeltaY / 120;
      else if (typeof o2.VERTICAL_AXIS < "u" && o2.axis === o2.VERTICAL_AXIS) this.deltaY = -o2.detail / 3;
      else if (t.type === "wheel") {
        let a = t;
        a.deltaMode === a.DOM_DELTA_LINE ? Ei && !Te ? this.deltaY = -t.deltaY / 3 : this.deltaY = -t.deltaY : this.deltaY = -t.deltaY / 40;
      }
      if (typeof n.wheelDeltaX < "u") Sr && wr ? this.deltaX = -(n.wheelDeltaX / 120) : r ? this.deltaX = n.wheelDeltaX / (120 * l) : this.deltaX = n.wheelDeltaX / 120;
      else if (typeof o2.HORIZONTAL_AXIS < "u" && o2.axis === o2.HORIZONTAL_AXIS) this.deltaX = -t.detail / 3;
      else if (t.type === "wheel") {
        let a = t;
        a.deltaMode === a.DOM_DELTA_LINE ? Ei && !Te ? this.deltaX = -t.deltaX / 3 : this.deltaX = -t.deltaX : this.deltaX = -t.deltaX / 40;
      }
      this.deltaY === 0 && this.deltaX === 0 && t.wheelDelta && (r ? this.deltaY = t.wheelDelta / (120 * l) : this.deltaY = t.wheelDelta / 120);
    }
  }
  preventDefault() {
    this.browserEvent?.preventDefault();
  }
  stopPropagation() {
    this.browserEvent?.stopPropagation();
  }
};
var Do = Object.freeze(function(s15, t) {
  let e = setTimeout(s15.bind(t), 0);
  return { dispose() {
    clearTimeout(e);
  } };
});
var ma;
((i) => {
  function s15(r) {
    return r === i.None || r === i.Cancelled || r instanceof ts ? true : !r || typeof r != "object" ? false : typeof r.isCancellationRequested == "boolean" && typeof r.onCancellationRequested == "function";
  }
  i.isCancellationToken = s15, i.None = Object.freeze({ isCancellationRequested: false, onCancellationRequested: $.None }), i.Cancelled = Object.freeze({ isCancellationRequested: true, onCancellationRequested: Do });
})(ma || (ma = {}));
var ts = class {
  constructor() {
    this._isCancelled = false;
    this._emitter = null;
  }
  cancel() {
    this._isCancelled || (this._isCancelled = true, this._emitter && (this._emitter.fire(void 0), this.dispose()));
  }
  get isCancellationRequested() {
    return this._isCancelled;
  }
  get onCancellationRequested() {
    return this._isCancelled ? Do : (this._emitter || (this._emitter = new v()), this._emitter.event);
  }
  dispose() {
    this._emitter && (this._emitter.dispose(), this._emitter = null);
  }
};
var _a = Symbol("MicrotaskDelay");
var Ye = class {
  constructor(t, e) {
    this._isDisposed = false;
    this._token = -1, typeof t == "function" && typeof e == "number" && this.setIfNotSet(t, e);
  }
  dispose() {
    this.cancel(), this._isDisposed = true;
  }
  cancel() {
    this._token !== -1 && (clearTimeout(this._token), this._token = -1);
  }
  cancelAndSet(t, e) {
    if (this._isDisposed) throw new Rt("Calling 'cancelAndSet' on a disposed TimeoutTimer");
    this.cancel(), this._token = setTimeout(() => {
      this._token = -1, t();
    }, e);
  }
  setIfNotSet(t, e) {
    if (this._isDisposed) throw new Rt("Calling 'setIfNotSet' on a disposed TimeoutTimer");
    this._token === -1 && (this._token = setTimeout(() => {
      this._token = -1, t();
    }, e));
  }
};
var kr = class {
  constructor() {
    this.disposable = void 0;
    this.isDisposed = false;
  }
  cancel() {
    this.disposable?.dispose(), this.disposable = void 0;
  }
  cancelAndSet(t, e, i = globalThis) {
    if (this.isDisposed) throw new Rt("Calling 'cancelAndSet' on a disposed IntervalTimer");
    this.cancel();
    let r = i.setInterval(() => {
      t();
    }, e);
    this.disposable = C(() => {
      i.clearInterval(r), this.disposable = void 0;
    });
  }
  dispose() {
    this.cancel(), this.isDisposed = true;
  }
};
var ba;
var Ar;
(function() {
  typeof globalThis.requestIdleCallback != "function" || typeof globalThis.cancelIdleCallback != "function" ? Ar = (s15, t) => {
    Eo(() => {
      if (e) return;
      let i = Date.now() + 15;
      t(Object.freeze({ didTimeout: true, timeRemaining() {
        return Math.max(0, i - Date.now());
      } }));
    });
    let e = false;
    return { dispose() {
      e || (e = true);
    } };
  } : Ar = (s15, t, e) => {
    let i = s15.requestIdleCallback(t, typeof e == "number" ? { timeout: e } : void 0), r = false;
    return { dispose() {
      r || (r = true, s15.cancelIdleCallback(i));
    } };
  }, ba = (s15) => Ar(globalThis, s15);
})();
var va;
((e) => {
  async function s15(i) {
    let r, n = await Promise.all(i.map((o2) => o2.then((l) => l, (l) => {
      r || (r = l);
    })));
    if (typeof r < "u") throw r;
    return n;
  }
  e.settled = s15;
  function t(i) {
    return new Promise(async (r, n) => {
      try {
        await i(r, n);
      } catch (o2) {
        n(o2);
      }
    });
  }
  e.withAsyncBody = t;
})(va || (va = {}));
var _e = class _e2 {
  static fromArray(t) {
    return new _e2((e) => {
      e.emitMany(t);
    });
  }
  static fromPromise(t) {
    return new _e2(async (e) => {
      e.emitMany(await t);
    });
  }
  static fromPromises(t) {
    return new _e2(async (e) => {
      await Promise.all(t.map(async (i) => e.emitOne(await i)));
    });
  }
  static merge(t) {
    return new _e2(async (e) => {
      await Promise.all(t.map(async (i) => {
        for await (let r of i) e.emitOne(r);
      }));
    });
  }
  constructor(t, e) {
    this._state = 0, this._results = [], this._error = null, this._onReturn = e, this._onStateChanged = new v(), queueMicrotask(async () => {
      let i = { emitOne: (r) => this.emitOne(r), emitMany: (r) => this.emitMany(r), reject: (r) => this.reject(r) };
      try {
        await Promise.resolve(t(i)), this.resolve();
      } catch (r) {
        this.reject(r);
      } finally {
        i.emitOne = void 0, i.emitMany = void 0, i.reject = void 0;
      }
    });
  }
  [Symbol.asyncIterator]() {
    let t = 0;
    return { next: async () => {
      do {
        if (this._state === 2) throw this._error;
        if (t < this._results.length) return { done: false, value: this._results[t++] };
        if (this._state === 1) return { done: true, value: void 0 };
        await $.toPromise(this._onStateChanged.event);
      } while (true);
    }, return: async () => (this._onReturn?.(), { done: true, value: void 0 }) };
  }
  static map(t, e) {
    return new _e2(async (i) => {
      for await (let r of t) i.emitOne(e(r));
    });
  }
  map(t) {
    return _e2.map(this, t);
  }
  static filter(t, e) {
    return new _e2(async (i) => {
      for await (let r of t) e(r) && i.emitOne(r);
    });
  }
  filter(t) {
    return _e2.filter(this, t);
  }
  static coalesce(t) {
    return _e2.filter(t, (e) => !!e);
  }
  coalesce() {
    return _e2.coalesce(this);
  }
  static async toPromise(t) {
    let e = [];
    for await (let i of t) e.push(i);
    return e;
  }
  toPromise() {
    return _e2.toPromise(this);
  }
  emitOne(t) {
    this._state === 0 && (this._results.push(t), this._onStateChanged.fire());
  }
  emitMany(t) {
    this._state === 0 && (this._results = this._results.concat(t), this._onStateChanged.fire());
  }
  resolve() {
    this._state === 0 && (this._state = 1, this._onStateChanged.fire());
  }
  reject(t) {
    this._state === 0 && (this._state = 2, this._error = t, this._onStateChanged.fire());
  }
};
_e.EMPTY = _e.fromArray([]);
function Lo(s15) {
  return 55296 <= s15 && s15 <= 56319;
}
function is(s15) {
  return 56320 <= s15 && s15 <= 57343;
}
function Ao(s15, t) {
  return (s15 - 55296 << 10) + (t - 56320) + 65536;
}
function Mo(s15) {
  return ns(s15, 0);
}
function ns(s15, t) {
  switch (typeof s15) {
    case "object":
      return s15 === null ? je(349, t) : Array.isArray(s15) ? Ea(s15, t) : Ta(s15, t);
    case "string":
      return Po(s15, t);
    case "boolean":
      return Sa(s15, t);
    case "number":
      return je(s15, t);
    case "undefined":
      return je(937, t);
    default:
      return je(617, t);
  }
}
function je(s15, t) {
  return (t << 5) - t + s15 | 0;
}
function Sa(s15, t) {
  return je(s15 ? 433 : 863, t);
}
function Po(s15, t) {
  t = je(149417, t);
  for (let e = 0, i = s15.length; e < i; e++) t = je(s15.charCodeAt(e), t);
  return t;
}
function Ea(s15, t) {
  return t = je(104579, t), s15.reduce((e, i) => ns(i, e), t);
}
function Ta(s15, t) {
  return t = je(181387, t), Object.keys(s15).sort().reduce((e, i) => (e = Po(i, e), ns(s15[i], e)), t);
}
function rs(s15, t, e = 32) {
  let i = e - t, r = ~((1 << i) - 1);
  return (s15 << t | (r & s15) >>> i) >>> 0;
}
function ko(s15, t = 0, e = s15.byteLength, i = 0) {
  for (let r = 0; r < e; r++) s15[t + r] = i;
}
function Ia(s15, t, e = "0") {
  for (; s15.length < t; ) s15 = e + s15;
  return s15;
}
function wi(s15, t = 32) {
  return s15 instanceof ArrayBuffer ? Array.from(new Uint8Array(s15)).map((e) => e.toString(16).padStart(2, "0")).join("") : Ia((s15 >>> 0).toString(16), t / 4);
}
var Cr = class Cr2 {
  constructor() {
    this._h0 = 1732584193;
    this._h1 = 4023233417;
    this._h2 = 2562383102;
    this._h3 = 271733878;
    this._h4 = 3285377520;
    this._buff = new Uint8Array(67), this._buffDV = new DataView(this._buff.buffer), this._buffLen = 0, this._totalLen = 0, this._leftoverHighSurrogate = 0, this._finished = false;
  }
  update(t) {
    let e = t.length;
    if (e === 0) return;
    let i = this._buff, r = this._buffLen, n = this._leftoverHighSurrogate, o2, l;
    for (n !== 0 ? (o2 = n, l = -1, n = 0) : (o2 = t.charCodeAt(0), l = 0); ; ) {
      let a = o2;
      if (Lo(o2)) if (l + 1 < e) {
        let u = t.charCodeAt(l + 1);
        is(u) ? (l++, a = Ao(o2, u)) : a = 65533;
      } else {
        n = o2;
        break;
      }
      else is(o2) && (a = 65533);
      if (r = this._push(i, r, a), l++, l < e) o2 = t.charCodeAt(l);
      else break;
    }
    this._buffLen = r, this._leftoverHighSurrogate = n;
  }
  _push(t, e, i) {
    return i < 128 ? t[e++] = i : i < 2048 ? (t[e++] = 192 | (i & 1984) >>> 6, t[e++] = 128 | (i & 63) >>> 0) : i < 65536 ? (t[e++] = 224 | (i & 61440) >>> 12, t[e++] = 128 | (i & 4032) >>> 6, t[e++] = 128 | (i & 63) >>> 0) : (t[e++] = 240 | (i & 1835008) >>> 18, t[e++] = 128 | (i & 258048) >>> 12, t[e++] = 128 | (i & 4032) >>> 6, t[e++] = 128 | (i & 63) >>> 0), e >= 64 && (this._step(), e -= 64, this._totalLen += 64, t[0] = t[64], t[1] = t[65], t[2] = t[66]), e;
  }
  digest() {
    return this._finished || (this._finished = true, this._leftoverHighSurrogate && (this._leftoverHighSurrogate = 0, this._buffLen = this._push(this._buff, this._buffLen, 65533)), this._totalLen += this._buffLen, this._wrapUp()), wi(this._h0) + wi(this._h1) + wi(this._h2) + wi(this._h3) + wi(this._h4);
  }
  _wrapUp() {
    this._buff[this._buffLen++] = 128, ko(this._buff, this._buffLen), this._buffLen > 56 && (this._step(), ko(this._buff));
    let t = 8 * this._totalLen;
    this._buffDV.setUint32(56, Math.floor(t / 4294967296), false), this._buffDV.setUint32(60, t % 4294967296, false), this._step();
  }
  _step() {
    let t = Cr2._bigBlock32, e = this._buffDV;
    for (let c = 0; c < 64; c += 4) t.setUint32(c, e.getUint32(c, false), false);
    for (let c = 64; c < 320; c += 4) t.setUint32(c, rs(t.getUint32(c - 12, false) ^ t.getUint32(c - 32, false) ^ t.getUint32(c - 56, false) ^ t.getUint32(c - 64, false), 1), false);
    let i = this._h0, r = this._h1, n = this._h2, o2 = this._h3, l = this._h4, a, u, h15;
    for (let c = 0; c < 80; c++) c < 20 ? (a = r & n | ~r & o2, u = 1518500249) : c < 40 ? (a = r ^ n ^ o2, u = 1859775393) : c < 60 ? (a = r & n | r & o2 | n & o2, u = 2400959708) : (a = r ^ n ^ o2, u = 3395469782), h15 = rs(i, 5) + a + l + u + t.getUint32(c * 4, false) & 4294967295, l = o2, o2 = n, n = rs(r, 30), r = i, i = h15;
    this._h0 = this._h0 + i & 4294967295, this._h1 = this._h1 + r & 4294967295, this._h2 = this._h2 + n & 4294967295, this._h3 = this._h3 + o2 & 4294967295, this._h4 = this._h4 + l & 4294967295;
  }
};
Cr._bigBlock32 = new DataView(new ArrayBuffer(320));
var { registerWindow: Bh, getWindow: be, getDocument: Nh, getWindows: Fh, getWindowsCount: Hh, getWindowId: Oo, getWindowById: Wh, hasWindow: Uh, onDidRegisterWindow: No, onWillUnregisterWindow: Kh, onDidUnregisterWindow: zh } = (function() {
  let s15 = /* @__PURE__ */ new Map();
  fe;
  let t = { window: fe, disposables: new Ee() };
  s15.set(fe.vscodeWindowId, t);
  let e = new v(), i = new v(), r = new v();
  function n(o2, l) {
    return (typeof o2 == "number" ? s15.get(o2) : void 0) ?? (l ? t : void 0);
  }
  return { onDidRegisterWindow: e.event, onWillUnregisterWindow: r.event, onDidUnregisterWindow: i.event, registerWindow(o2) {
    if (s15.has(o2.vscodeWindowId)) return D.None;
    let l = new Ee(), a = { window: o2, disposables: l.add(new Ee()) };
    return s15.set(o2.vscodeWindowId, a), l.add(C(() => {
      s15.delete(o2.vscodeWindowId), i.fire(o2);
    })), l.add(L(o2, Y.BEFORE_UNLOAD, () => {
      r.fire(o2);
    })), e.fire(a), l;
  }, getWindows() {
    return s15.values();
  }, getWindowsCount() {
    return s15.size;
  }, getWindowId(o2) {
    return o2.vscodeWindowId;
  }, hasWindow(o2) {
    return s15.has(o2);
  }, getWindowById: n, getWindow(o2) {
    let l = o2;
    if (l?.ownerDocument?.defaultView) return l.ownerDocument.defaultView.window;
    let a = o2;
    return a?.view ? a.view.window : fe;
  }, getDocument(o2) {
    return be(o2).document;
  } };
})();
var ss = class {
  constructor(t, e, i, r) {
    this._node = t, this._type = e, this._handler = i, this._options = r || false, this._node.addEventListener(this._type, this._handler, this._options);
  }
  dispose() {
    this._handler && (this._node.removeEventListener(this._type, this._handler, this._options), this._node = null, this._handler = null);
  }
};
function L(s15, t, e, i) {
  return new ss(s15, t, e, i);
}
function ya(s15, t) {
  return function(e) {
    return t(new qe(s15, e));
  };
}
function xa(s15) {
  return function(t) {
    return s15(new ft(t));
  };
}
var os = function(t, e, i, r) {
  let n = i;
  return e === "click" || e === "mousedown" || e === "contextmenu" ? n = ya(be(t), i) : (e === "keydown" || e === "keypress" || e === "keyup") && (n = xa(i)), L(t, e, n, r);
};
var wa;
var mt;
var Mr = class extends kr {
  constructor(t) {
    super(), this.defaultTarget = t && be(t);
  }
  cancelAndSet(t, e, i) {
    return super.cancelAndSet(t, e, i ?? this.defaultTarget);
  }
};
var Di = class {
  constructor(t, e = 0) {
    this._runner = t, this.priority = e, this._canceled = false;
  }
  dispose() {
    this._canceled = true;
  }
  execute() {
    if (!this._canceled) try {
      this._runner();
    } catch (t) {
      Lt(t);
    }
  }
  static sort(t, e) {
    return e.priority - t.priority;
  }
};
(function() {
  let s15 = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = (n) => {
    e.set(n, false);
    let o2 = s15.get(n) ?? [];
    for (t.set(n, o2), s15.set(n, []), i.set(n, true); o2.length > 0; ) o2.sort(Di.sort), o2.shift().execute();
    i.set(n, false);
  };
  mt = (n, o2, l = 0) => {
    let a = Oo(n), u = new Di(o2, l), h15 = s15.get(a);
    return h15 || (h15 = [], s15.set(a, h15)), h15.push(u), e.get(a) || (e.set(a, true), n.requestAnimationFrame(() => r(a))), u;
  }, wa = (n, o2, l) => {
    let a = Oo(n);
    if (i.get(a)) {
      let u = new Di(o2, l), h15 = t.get(a);
      return h15 || (h15 = [], t.set(a, h15)), h15.push(u), u;
    } else return mt(n, o2, l);
  };
})();
var pt = class pt2 {
  constructor(t, e) {
    this.width = t;
    this.height = e;
  }
  with(t = this.width, e = this.height) {
    return t !== this.width || e !== this.height ? new pt2(t, e) : this;
  }
  static is(t) {
    return typeof t == "object" && typeof t.height == "number" && typeof t.width == "number";
  }
  static lift(t) {
    return t instanceof pt2 ? t : new pt2(t.width, t.height);
  }
  static equals(t, e) {
    return t === e ? true : !t || !e ? false : t.width === e.width && t.height === e.height;
  }
};
pt.None = new pt(0, 0);
function Fo(s15) {
  let t = s15.getBoundingClientRect(), e = be(s15);
  return { left: t.left + e.scrollX, top: t.top + e.scrollY, width: t.width, height: t.height };
}
var Gh = new class {
  constructor() {
    this.mutationObservers = /* @__PURE__ */ new Map();
  }
  observe(s15, t, e) {
    let i = this.mutationObservers.get(s15);
    i || (i = /* @__PURE__ */ new Map(), this.mutationObservers.set(s15, i));
    let r = Mo(e), n = i.get(r);
    if (n) n.users += 1;
    else {
      let o2 = new v(), l = new MutationObserver((u) => o2.fire(u));
      l.observe(s15, e);
      let a = n = { users: 1, observer: l, onDidMutate: o2.event };
      t.add(C(() => {
        a.users -= 1, a.users === 0 && (o2.dispose(), l.disconnect(), i?.delete(r), i?.size === 0 && this.mutationObservers.delete(s15));
      })), i.set(r, n);
    }
    return n.onDidMutate;
  }
}();
var Y = { CLICK: "click", AUXCLICK: "auxclick", DBLCLICK: "dblclick", MOUSE_UP: "mouseup", MOUSE_DOWN: "mousedown", MOUSE_OVER: "mouseover", MOUSE_MOVE: "mousemove", MOUSE_OUT: "mouseout", MOUSE_ENTER: "mouseenter", MOUSE_LEAVE: "mouseleave", MOUSE_WHEEL: "wheel", POINTER_UP: "pointerup", POINTER_DOWN: "pointerdown", POINTER_MOVE: "pointermove", POINTER_LEAVE: "pointerleave", CONTEXT_MENU: "contextmenu", WHEEL: "wheel", KEY_DOWN: "keydown", KEY_PRESS: "keypress", KEY_UP: "keyup", LOAD: "load", BEFORE_UNLOAD: "beforeunload", UNLOAD: "unload", PAGE_SHOW: "pageshow", PAGE_HIDE: "pagehide", PASTE: "paste", ABORT: "abort", ERROR: "error", RESIZE: "resize", SCROLL: "scroll", FULLSCREEN_CHANGE: "fullscreenchange", WK_FULLSCREEN_CHANGE: "webkitfullscreenchange", SELECT: "select", CHANGE: "change", SUBMIT: "submit", RESET: "reset", FOCUS: "focus", FOCUS_IN: "focusin", FOCUS_OUT: "focusout", BLUR: "blur", INPUT: "input", STORAGE: "storage", DRAG_START: "dragstart", DRAG: "drag", DRAG_ENTER: "dragenter", DRAG_LEAVE: "dragleave", DRAG_OVER: "dragover", DROP: "drop", DRAG_END: "dragend", ANIMATION_START: Bt ? "webkitAnimationStart" : "animationstart", ANIMATION_END: Bt ? "webkitAnimationEnd" : "animationend", ANIMATION_ITERATION: Bt ? "webkitAnimationIteration" : "animationiteration" };
var Da = /([\w\-]+)?(#([\w\-]+))?((\.([\w\-]+))*)/;
function Ho(s15, t, e, ...i) {
  let r = Da.exec(t);
  if (!r) throw new Error("Bad use of emmet");
  let n = r[1] || "div", o2;
  return s15 !== "http://www.w3.org/1999/xhtml" ? o2 = document.createElementNS(s15, n) : o2 = document.createElement(n), r[3] && (o2.id = r[3]), r[4] && (o2.className = r[4].replace(/\./g, " ").trim()), e && Object.entries(e).forEach(([l, a]) => {
    typeof a > "u" || (/^on\w+$/.test(l) ? o2[l] = a : l === "selected" ? a && o2.setAttribute(l, "true") : o2.setAttribute(l, a));
  }), o2.append(...i), o2;
}
function Ra(s15, t, ...e) {
  return Ho("http://www.w3.org/1999/xhtml", s15, t, ...e);
}
Ra.SVG = function(s15, t, ...e) {
  return Ho("http://www.w3.org/2000/svg", s15, t, ...e);
};
var ls = class {
  constructor(t) {
    this.domNode = t;
    this._maxWidth = "";
    this._width = "";
    this._height = "";
    this._top = "";
    this._left = "";
    this._bottom = "";
    this._right = "";
    this._paddingTop = "";
    this._paddingLeft = "";
    this._paddingBottom = "";
    this._paddingRight = "";
    this._fontFamily = "";
    this._fontWeight = "";
    this._fontSize = "";
    this._fontStyle = "";
    this._fontFeatureSettings = "";
    this._fontVariationSettings = "";
    this._textDecoration = "";
    this._lineHeight = "";
    this._letterSpacing = "";
    this._className = "";
    this._display = "";
    this._position = "";
    this._visibility = "";
    this._color = "";
    this._backgroundColor = "";
    this._layerHint = false;
    this._contain = "none";
    this._boxShadow = "";
  }
  setMaxWidth(t) {
    let e = Ie(t);
    this._maxWidth !== e && (this._maxWidth = e, this.domNode.style.maxWidth = this._maxWidth);
  }
  setWidth(t) {
    let e = Ie(t);
    this._width !== e && (this._width = e, this.domNode.style.width = this._width);
  }
  setHeight(t) {
    let e = Ie(t);
    this._height !== e && (this._height = e, this.domNode.style.height = this._height);
  }
  setTop(t) {
    let e = Ie(t);
    this._top !== e && (this._top = e, this.domNode.style.top = this._top);
  }
  setLeft(t) {
    let e = Ie(t);
    this._left !== e && (this._left = e, this.domNode.style.left = this._left);
  }
  setBottom(t) {
    let e = Ie(t);
    this._bottom !== e && (this._bottom = e, this.domNode.style.bottom = this._bottom);
  }
  setRight(t) {
    let e = Ie(t);
    this._right !== e && (this._right = e, this.domNode.style.right = this._right);
  }
  setPaddingTop(t) {
    let e = Ie(t);
    this._paddingTop !== e && (this._paddingTop = e, this.domNode.style.paddingTop = this._paddingTop);
  }
  setPaddingLeft(t) {
    let e = Ie(t);
    this._paddingLeft !== e && (this._paddingLeft = e, this.domNode.style.paddingLeft = this._paddingLeft);
  }
  setPaddingBottom(t) {
    let e = Ie(t);
    this._paddingBottom !== e && (this._paddingBottom = e, this.domNode.style.paddingBottom = this._paddingBottom);
  }
  setPaddingRight(t) {
    let e = Ie(t);
    this._paddingRight !== e && (this._paddingRight = e, this.domNode.style.paddingRight = this._paddingRight);
  }
  setFontFamily(t) {
    this._fontFamily !== t && (this._fontFamily = t, this.domNode.style.fontFamily = this._fontFamily);
  }
  setFontWeight(t) {
    this._fontWeight !== t && (this._fontWeight = t, this.domNode.style.fontWeight = this._fontWeight);
  }
  setFontSize(t) {
    let e = Ie(t);
    this._fontSize !== e && (this._fontSize = e, this.domNode.style.fontSize = this._fontSize);
  }
  setFontStyle(t) {
    this._fontStyle !== t && (this._fontStyle = t, this.domNode.style.fontStyle = this._fontStyle);
  }
  setFontFeatureSettings(t) {
    this._fontFeatureSettings !== t && (this._fontFeatureSettings = t, this.domNode.style.fontFeatureSettings = this._fontFeatureSettings);
  }
  setFontVariationSettings(t) {
    this._fontVariationSettings !== t && (this._fontVariationSettings = t, this.domNode.style.fontVariationSettings = this._fontVariationSettings);
  }
  setTextDecoration(t) {
    this._textDecoration !== t && (this._textDecoration = t, this.domNode.style.textDecoration = this._textDecoration);
  }
  setLineHeight(t) {
    let e = Ie(t);
    this._lineHeight !== e && (this._lineHeight = e, this.domNode.style.lineHeight = this._lineHeight);
  }
  setLetterSpacing(t) {
    let e = Ie(t);
    this._letterSpacing !== e && (this._letterSpacing = e, this.domNode.style.letterSpacing = this._letterSpacing);
  }
  setClassName(t) {
    this._className !== t && (this._className = t, this.domNode.className = this._className);
  }
  toggleClassName(t, e) {
    this.domNode.classList.toggle(t, e), this._className = this.domNode.className;
  }
  setDisplay(t) {
    this._display !== t && (this._display = t, this.domNode.style.display = this._display);
  }
  setPosition(t) {
    this._position !== t && (this._position = t, this.domNode.style.position = this._position);
  }
  setVisibility(t) {
    this._visibility !== t && (this._visibility = t, this.domNode.style.visibility = this._visibility);
  }
  setColor(t) {
    this._color !== t && (this._color = t, this.domNode.style.color = this._color);
  }
  setBackgroundColor(t) {
    this._backgroundColor !== t && (this._backgroundColor = t, this.domNode.style.backgroundColor = this._backgroundColor);
  }
  setLayerHinting(t) {
    this._layerHint !== t && (this._layerHint = t, this.domNode.style.transform = this._layerHint ? "translate3d(0px, 0px, 0px)" : "");
  }
  setBoxShadow(t) {
    this._boxShadow !== t && (this._boxShadow = t, this.domNode.style.boxShadow = t);
  }
  setContain(t) {
    this._contain !== t && (this._contain = t, this.domNode.style.contain = this._contain);
  }
  setAttribute(t, e) {
    this.domNode.setAttribute(t, e);
  }
  removeAttribute(t) {
    this.domNode.removeAttribute(t);
  }
  appendChild(t) {
    this.domNode.appendChild(t.domNode);
  }
  removeChild(t) {
    this.domNode.removeChild(t.domNode);
  }
};
function Ie(s15) {
  return typeof s15 == "number" ? `${s15}px` : s15;
}
function _t(s15) {
  return new ls(s15);
}
var Wt = class {
  constructor() {
    this._hooks = new Ee();
    this._pointerMoveCallback = null;
    this._onStopCallback = null;
  }
  dispose() {
    this.stopMonitoring(false), this._hooks.dispose();
  }
  stopMonitoring(t, e) {
    if (!this.isMonitoring()) return;
    this._hooks.clear(), this._pointerMoveCallback = null;
    let i = this._onStopCallback;
    this._onStopCallback = null, t && i && i(e);
  }
  isMonitoring() {
    return !!this._pointerMoveCallback;
  }
  startMonitoring(t, e, i, r, n) {
    this.isMonitoring() && this.stopMonitoring(false), this._pointerMoveCallback = r, this._onStopCallback = n;
    let o2 = t;
    try {
      t.setPointerCapture(e), this._hooks.add(C(() => {
        try {
          t.releasePointerCapture(e);
        } catch {
        }
      }));
    } catch {
      o2 = be(t);
    }
    this._hooks.add(L(o2, Y.POINTER_MOVE, (l) => {
      if (l.buttons !== i) {
        this.stopMonitoring(true);
        return;
      }
      l.preventDefault(), this._pointerMoveCallback(l);
    })), this._hooks.add(L(o2, Y.POINTER_UP, (l) => this.stopMonitoring(true)));
  }
};
function Wo(s15, t, e) {
  let i = null, r = null;
  if (typeof e.value == "function" ? (i = "value", r = e.value, r.length !== 0 && console.warn("Memoize should only be used in functions with zero parameters")) : typeof e.get == "function" && (i = "get", r = e.get), !r) throw new Error("not supported");
  let n = `$memoize$${t}`;
  e[i] = function(...o2) {
    return this.hasOwnProperty(n) || Object.defineProperty(this, n, { configurable: false, enumerable: false, writable: false, value: r.apply(this, o2) }), this[n];
  };
}
var He;
((n) => (n.Tap = "-xterm-gesturetap", n.Change = "-xterm-gesturechange", n.Start = "-xterm-gesturestart", n.End = "-xterm-gesturesend", n.Contextmenu = "-xterm-gesturecontextmenu"))(He || (He = {}));
var Q = class Q2 extends D {
  constructor() {
    super();
    this.dispatched = false;
    this.targets = new Ct();
    this.ignoreTargets = new Ct();
    this.activeTouches = {}, this.handle = null, this._lastSetTapCountTime = 0, this._register($.runAndSubscribe(No, ({ window: e, disposables: i }) => {
      i.add(L(e.document, "touchstart", (r) => this.onTouchStart(r), { passive: false })), i.add(L(e.document, "touchend", (r) => this.onTouchEnd(e, r))), i.add(L(e.document, "touchmove", (r) => this.onTouchMove(r), { passive: false }));
    }, { window: fe, disposables: this._store }));
  }
  static addTarget(e) {
    if (!Q2.isTouchDevice()) return D.None;
    Q2.INSTANCE || (Q2.INSTANCE = Gn(new Q2()));
    let i = Q2.INSTANCE.targets.push(e);
    return C(i);
  }
  static ignoreTarget(e) {
    if (!Q2.isTouchDevice()) return D.None;
    Q2.INSTANCE || (Q2.INSTANCE = Gn(new Q2()));
    let i = Q2.INSTANCE.ignoreTargets.push(e);
    return C(i);
  }
  static isTouchDevice() {
    return "ontouchstart" in fe || navigator.maxTouchPoints > 0;
  }
  dispose() {
    this.handle && (this.handle.dispose(), this.handle = null), super.dispose();
  }
  onTouchStart(e) {
    let i = Date.now();
    this.handle && (this.handle.dispose(), this.handle = null);
    for (let r = 0, n = e.targetTouches.length; r < n; r++) {
      let o2 = e.targetTouches.item(r);
      this.activeTouches[o2.identifier] = { id: o2.identifier, initialTarget: o2.target, initialTimeStamp: i, initialPageX: o2.pageX, initialPageY: o2.pageY, rollingTimestamps: [i], rollingPageX: [o2.pageX], rollingPageY: [o2.pageY] };
      let l = this.newGestureEvent(He.Start, o2.target);
      l.pageX = o2.pageX, l.pageY = o2.pageY, this.dispatchEvent(l);
    }
    this.dispatched && (e.preventDefault(), e.stopPropagation(), this.dispatched = false);
  }
  onTouchEnd(e, i) {
    let r = Date.now(), n = Object.keys(this.activeTouches).length;
    for (let o2 = 0, l = i.changedTouches.length; o2 < l; o2++) {
      let a = i.changedTouches.item(o2);
      if (!this.activeTouches.hasOwnProperty(String(a.identifier))) {
        console.warn("move of an UNKNOWN touch", a);
        continue;
      }
      let u = this.activeTouches[a.identifier], h15 = Date.now() - u.initialTimeStamp;
      if (h15 < Q2.HOLD_DELAY && Math.abs(u.initialPageX - Se(u.rollingPageX)) < 30 && Math.abs(u.initialPageY - Se(u.rollingPageY)) < 30) {
        let c = this.newGestureEvent(He.Tap, u.initialTarget);
        c.pageX = Se(u.rollingPageX), c.pageY = Se(u.rollingPageY), this.dispatchEvent(c);
      } else if (h15 >= Q2.HOLD_DELAY && Math.abs(u.initialPageX - Se(u.rollingPageX)) < 30 && Math.abs(u.initialPageY - Se(u.rollingPageY)) < 30) {
        let c = this.newGestureEvent(He.Contextmenu, u.initialTarget);
        c.pageX = Se(u.rollingPageX), c.pageY = Se(u.rollingPageY), this.dispatchEvent(c);
      } else if (n === 1) {
        let c = Se(u.rollingPageX), d = Se(u.rollingPageY), _2 = Se(u.rollingTimestamps) - u.rollingTimestamps[0], p = c - u.rollingPageX[0], m = d - u.rollingPageY[0], f = [...this.targets].filter((A) => u.initialTarget instanceof Node && A.contains(u.initialTarget));
        this.inertia(e, f, r, Math.abs(p) / _2, p > 0 ? 1 : -1, c, Math.abs(m) / _2, m > 0 ? 1 : -1, d);
      }
      this.dispatchEvent(this.newGestureEvent(He.End, u.initialTarget)), delete this.activeTouches[a.identifier];
    }
    this.dispatched && (i.preventDefault(), i.stopPropagation(), this.dispatched = false);
  }
  newGestureEvent(e, i) {
    let r = document.createEvent("CustomEvent");
    return r.initEvent(e, false, true), r.initialTarget = i, r.tapCount = 0, r;
  }
  dispatchEvent(e) {
    if (e.type === He.Tap) {
      let i = (/* @__PURE__ */ new Date()).getTime(), r = 0;
      i - this._lastSetTapCountTime > Q2.CLEAR_TAP_COUNT_TIME ? r = 1 : r = 2, this._lastSetTapCountTime = i, e.tapCount = r;
    } else (e.type === He.Change || e.type === He.Contextmenu) && (this._lastSetTapCountTime = 0);
    if (e.initialTarget instanceof Node) {
      for (let r of this.ignoreTargets) if (r.contains(e.initialTarget)) return;
      let i = [];
      for (let r of this.targets) if (r.contains(e.initialTarget)) {
        let n = 0, o2 = e.initialTarget;
        for (; o2 && o2 !== r; ) n++, o2 = o2.parentElement;
        i.push([n, r]);
      }
      i.sort((r, n) => r[0] - n[0]);
      for (let [r, n] of i) n.dispatchEvent(e), this.dispatched = true;
    }
  }
  inertia(e, i, r, n, o2, l, a, u, h15) {
    this.handle = mt(e, () => {
      let c = Date.now(), d = c - r, _2 = 0, p = 0, m = true;
      n += Q2.SCROLL_FRICTION * d, a += Q2.SCROLL_FRICTION * d, n > 0 && (m = false, _2 = o2 * n * d), a > 0 && (m = false, p = u * a * d);
      let f = this.newGestureEvent(He.Change);
      f.translationX = _2, f.translationY = p, i.forEach((A) => A.dispatchEvent(f)), m || this.inertia(e, i, c, n, o2, l + _2, a, u, h15 + p);
    });
  }
  onTouchMove(e) {
    let i = Date.now();
    for (let r = 0, n = e.changedTouches.length; r < n; r++) {
      let o2 = e.changedTouches.item(r);
      if (!this.activeTouches.hasOwnProperty(String(o2.identifier))) {
        console.warn("end of an UNKNOWN touch", o2);
        continue;
      }
      let l = this.activeTouches[o2.identifier], a = this.newGestureEvent(He.Change, l.initialTarget);
      a.translationX = o2.pageX - Se(l.rollingPageX), a.translationY = o2.pageY - Se(l.rollingPageY), a.pageX = o2.pageX, a.pageY = o2.pageY, this.dispatchEvent(a), l.rollingPageX.length > 3 && (l.rollingPageX.shift(), l.rollingPageY.shift(), l.rollingTimestamps.shift()), l.rollingPageX.push(o2.pageX), l.rollingPageY.push(o2.pageY), l.rollingTimestamps.push(i);
    }
    this.dispatched && (e.preventDefault(), e.stopPropagation(), this.dispatched = false);
  }
};
Q.SCROLL_FRICTION = -5e-3, Q.HOLD_DELAY = 700, Q.CLEAR_TAP_COUNT_TIME = 400, M([Wo], Q, "isTouchDevice", 1);
var Pr = Q;
var lt = class extends D {
  onclick(t, e) {
    this._register(L(t, Y.CLICK, (i) => e(new qe(be(t), i))));
  }
  onmousedown(t, e) {
    this._register(L(t, Y.MOUSE_DOWN, (i) => e(new qe(be(t), i))));
  }
  onmouseover(t, e) {
    this._register(L(t, Y.MOUSE_OVER, (i) => e(new qe(be(t), i))));
  }
  onmouseleave(t, e) {
    this._register(L(t, Y.MOUSE_LEAVE, (i) => e(new qe(be(t), i))));
  }
  onkeydown(t, e) {
    this._register(L(t, Y.KEY_DOWN, (i) => e(new ft(i))));
  }
  onkeyup(t, e) {
    this._register(L(t, Y.KEY_UP, (i) => e(new ft(i))));
  }
  oninput(t, e) {
    this._register(L(t, Y.INPUT, e));
  }
  onblur(t, e) {
    this._register(L(t, Y.BLUR, e));
  }
  onfocus(t, e) {
    this._register(L(t, Y.FOCUS, e));
  }
  onchange(t, e) {
    this._register(L(t, Y.CHANGE, e));
  }
  ignoreGesture(t) {
    return Pr.ignoreTarget(t);
  }
};
var Uo = 11;
var Or = class extends lt {
  constructor(t) {
    super(), this._onActivate = t.onActivate, this.bgDomNode = document.createElement("div"), this.bgDomNode.className = "arrow-background", this.bgDomNode.style.position = "absolute", this.bgDomNode.style.width = t.bgWidth + "px", this.bgDomNode.style.height = t.bgHeight + "px", typeof t.top < "u" && (this.bgDomNode.style.top = "0px"), typeof t.left < "u" && (this.bgDomNode.style.left = "0px"), typeof t.bottom < "u" && (this.bgDomNode.style.bottom = "0px"), typeof t.right < "u" && (this.bgDomNode.style.right = "0px"), this.domNode = document.createElement("div"), this.domNode.className = t.className, this.domNode.style.position = "absolute", this.domNode.style.width = Uo + "px", this.domNode.style.height = Uo + "px", typeof t.top < "u" && (this.domNode.style.top = t.top + "px"), typeof t.left < "u" && (this.domNode.style.left = t.left + "px"), typeof t.bottom < "u" && (this.domNode.style.bottom = t.bottom + "px"), typeof t.right < "u" && (this.domNode.style.right = t.right + "px"), this._pointerMoveMonitor = this._register(new Wt()), this._register(os(this.bgDomNode, Y.POINTER_DOWN, (e) => this._arrowPointerDown(e))), this._register(os(this.domNode, Y.POINTER_DOWN, (e) => this._arrowPointerDown(e))), this._pointerdownRepeatTimer = this._register(new Mr()), this._pointerdownScheduleRepeatTimer = this._register(new Ye());
  }
  _arrowPointerDown(t) {
    if (!t.target || !(t.target instanceof Element)) return;
    let e = () => {
      this._pointerdownRepeatTimer.cancelAndSet(() => this._onActivate(), 1e3 / 24, be(t));
    };
    this._onActivate(), this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancelAndSet(e, 200), this._pointerMoveMonitor.startMonitoring(t.target, t.pointerId, t.buttons, (i) => {
    }, () => {
      this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancel();
    }), t.preventDefault();
  }
};
var cs = class s9 {
  constructor(t, e, i, r, n, o2, l) {
    this._forceIntegerValues = t;
    this._scrollStateBrand = void 0;
    this._forceIntegerValues && (e = e | 0, i = i | 0, r = r | 0, n = n | 0, o2 = o2 | 0, l = l | 0), this.rawScrollLeft = r, this.rawScrollTop = l, e < 0 && (e = 0), r + e > i && (r = i - e), r < 0 && (r = 0), n < 0 && (n = 0), l + n > o2 && (l = o2 - n), l < 0 && (l = 0), this.width = e, this.scrollWidth = i, this.scrollLeft = r, this.height = n, this.scrollHeight = o2, this.scrollTop = l;
  }
  equals(t) {
    return this.rawScrollLeft === t.rawScrollLeft && this.rawScrollTop === t.rawScrollTop && this.width === t.width && this.scrollWidth === t.scrollWidth && this.scrollLeft === t.scrollLeft && this.height === t.height && this.scrollHeight === t.scrollHeight && this.scrollTop === t.scrollTop;
  }
  withScrollDimensions(t, e) {
    return new s9(this._forceIntegerValues, typeof t.width < "u" ? t.width : this.width, typeof t.scrollWidth < "u" ? t.scrollWidth : this.scrollWidth, e ? this.rawScrollLeft : this.scrollLeft, typeof t.height < "u" ? t.height : this.height, typeof t.scrollHeight < "u" ? t.scrollHeight : this.scrollHeight, e ? this.rawScrollTop : this.scrollTop);
  }
  withScrollPosition(t) {
    return new s9(this._forceIntegerValues, this.width, this.scrollWidth, typeof t.scrollLeft < "u" ? t.scrollLeft : this.rawScrollLeft, this.height, this.scrollHeight, typeof t.scrollTop < "u" ? t.scrollTop : this.rawScrollTop);
  }
  createScrollEvent(t, e) {
    let i = this.width !== t.width, r = this.scrollWidth !== t.scrollWidth, n = this.scrollLeft !== t.scrollLeft, o2 = this.height !== t.height, l = this.scrollHeight !== t.scrollHeight, a = this.scrollTop !== t.scrollTop;
    return { inSmoothScrolling: e, oldWidth: t.width, oldScrollWidth: t.scrollWidth, oldScrollLeft: t.scrollLeft, width: this.width, scrollWidth: this.scrollWidth, scrollLeft: this.scrollLeft, oldHeight: t.height, oldScrollHeight: t.scrollHeight, oldScrollTop: t.scrollTop, height: this.height, scrollHeight: this.scrollHeight, scrollTop: this.scrollTop, widthChanged: i, scrollWidthChanged: r, scrollLeftChanged: n, heightChanged: o2, scrollHeightChanged: l, scrollTopChanged: a };
  }
};
var Ri = class extends D {
  constructor(e) {
    super();
    this._scrollableBrand = void 0;
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this._smoothScrollDuration = e.smoothScrollDuration, this._scheduleAtNextAnimationFrame = e.scheduleAtNextAnimationFrame, this._state = new cs(e.forceIntegerValues, 0, 0, 0, 0, 0, 0), this._smoothScrolling = null;
  }
  dispose() {
    this._smoothScrolling && (this._smoothScrolling.dispose(), this._smoothScrolling = null), super.dispose();
  }
  setSmoothScrollDuration(e) {
    this._smoothScrollDuration = e;
  }
  validateScrollPosition(e) {
    return this._state.withScrollPosition(e);
  }
  getScrollDimensions() {
    return this._state;
  }
  setScrollDimensions(e, i) {
    let r = this._state.withScrollDimensions(e, i);
    this._setState(r, !!this._smoothScrolling), this._smoothScrolling?.acceptScrollDimensions(this._state);
  }
  getFutureScrollPosition() {
    return this._smoothScrolling ? this._smoothScrolling.to : this._state;
  }
  getCurrentScrollPosition() {
    return this._state;
  }
  setScrollPositionNow(e) {
    let i = this._state.withScrollPosition(e);
    this._smoothScrolling && (this._smoothScrolling.dispose(), this._smoothScrolling = null), this._setState(i, false);
  }
  setScrollPositionSmooth(e, i) {
    if (this._smoothScrollDuration === 0) return this.setScrollPositionNow(e);
    if (this._smoothScrolling) {
      e = { scrollLeft: typeof e.scrollLeft > "u" ? this._smoothScrolling.to.scrollLeft : e.scrollLeft, scrollTop: typeof e.scrollTop > "u" ? this._smoothScrolling.to.scrollTop : e.scrollTop };
      let r = this._state.withScrollPosition(e);
      if (this._smoothScrolling.to.scrollLeft === r.scrollLeft && this._smoothScrolling.to.scrollTop === r.scrollTop) return;
      let n;
      i ? n = new Nr(this._smoothScrolling.from, r, this._smoothScrolling.startTime, this._smoothScrolling.duration) : n = this._smoothScrolling.combine(this._state, r, this._smoothScrollDuration), this._smoothScrolling.dispose(), this._smoothScrolling = n;
    } else {
      let r = this._state.withScrollPosition(e);
      this._smoothScrolling = Nr.start(this._state, r, this._smoothScrollDuration);
    }
    this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
      this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
    });
  }
  hasPendingScrollAnimation() {
    return !!this._smoothScrolling;
  }
  _performSmoothScrolling() {
    if (!this._smoothScrolling) return;
    let e = this._smoothScrolling.tick(), i = this._state.withScrollPosition(e);
    if (this._setState(i, true), !!this._smoothScrolling) {
      if (e.isDone) {
        this._smoothScrolling.dispose(), this._smoothScrolling = null;
        return;
      }
      this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
        this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
      });
    }
  }
  _setState(e, i) {
    let r = this._state;
    r.equals(e) || (this._state = e, this._onScroll.fire(this._state.createScrollEvent(r, i)));
  }
};
var Br = class {
  constructor(t, e, i) {
    this.scrollLeft = t, this.scrollTop = e, this.isDone = i;
  }
};
function as(s15, t) {
  let e = t - s15;
  return function(i) {
    return s15 + e * ka(i);
  };
}
function La(s15, t, e) {
  return function(i) {
    return i < e ? s15(i / e) : t((i - e) / (1 - e));
  };
}
var Nr = class s10 {
  constructor(t, e, i, r) {
    this.from = t, this.to = e, this.duration = r, this.startTime = i, this.animationFrameDisposable = null, this._initAnimations();
  }
  _initAnimations() {
    this.scrollLeft = this._initAnimation(this.from.scrollLeft, this.to.scrollLeft, this.to.width), this.scrollTop = this._initAnimation(this.from.scrollTop, this.to.scrollTop, this.to.height);
  }
  _initAnimation(t, e, i) {
    if (Math.abs(t - e) > 2.5 * i) {
      let n, o2;
      return t < e ? (n = t + 0.75 * i, o2 = e - 0.75 * i) : (n = t - 0.75 * i, o2 = e + 0.75 * i), La(as(t, n), as(o2, e), 0.33);
    }
    return as(t, e);
  }
  dispose() {
    this.animationFrameDisposable !== null && (this.animationFrameDisposable.dispose(), this.animationFrameDisposable = null);
  }
  acceptScrollDimensions(t) {
    this.to = t.withScrollPosition(this.to), this._initAnimations();
  }
  tick() {
    return this._tick(Date.now());
  }
  _tick(t) {
    let e = (t - this.startTime) / this.duration;
    if (e < 1) {
      let i = this.scrollLeft(e), r = this.scrollTop(e);
      return new Br(i, r, false);
    }
    return new Br(this.to.scrollLeft, this.to.scrollTop, true);
  }
  combine(t, e, i) {
    return s10.start(t, e, i);
  }
  static start(t, e, i) {
    i = i + 10;
    let r = Date.now() - 10;
    return new s10(t, e, r, i);
  }
};
function Aa(s15) {
  return Math.pow(s15, 3);
}
function ka(s15) {
  return 1 - Aa(1 - s15);
}
var Fr = class extends D {
  constructor(t, e, i) {
    super(), this._visibility = t, this._visibleClassName = e, this._invisibleClassName = i, this._domNode = null, this._isVisible = false, this._isNeeded = false, this._rawShouldBeVisible = false, this._shouldBeVisible = false, this._revealTimer = this._register(new Ye());
  }
  setVisibility(t) {
    this._visibility !== t && (this._visibility = t, this._updateShouldBeVisible());
  }
  setShouldBeVisible(t) {
    this._rawShouldBeVisible = t, this._updateShouldBeVisible();
  }
  _applyVisibilitySetting() {
    return this._visibility === 2 ? false : this._visibility === 3 ? true : this._rawShouldBeVisible;
  }
  _updateShouldBeVisible() {
    let t = this._applyVisibilitySetting();
    this._shouldBeVisible !== t && (this._shouldBeVisible = t, this.ensureVisibility());
  }
  setIsNeeded(t) {
    this._isNeeded !== t && (this._isNeeded = t, this.ensureVisibility());
  }
  setDomNode(t) {
    this._domNode = t, this._domNode.setClassName(this._invisibleClassName), this.setShouldBeVisible(false);
  }
  ensureVisibility() {
    if (!this._isNeeded) {
      this._hide(false);
      return;
    }
    this._shouldBeVisible ? this._reveal() : this._hide(true);
  }
  _reveal() {
    this._isVisible || (this._isVisible = true, this._revealTimer.setIfNotSet(() => {
      this._domNode?.setClassName(this._visibleClassName);
    }, 0));
  }
  _hide(t) {
    this._revealTimer.cancel(), this._isVisible && (this._isVisible = false, this._domNode?.setClassName(this._invisibleClassName + (t ? " fade" : "")));
  }
};
var Ca = 140;
var Ut = class extends lt {
  constructor(t) {
    super(), this._lazyRender = t.lazyRender, this._host = t.host, this._scrollable = t.scrollable, this._scrollByPage = t.scrollByPage, this._scrollbarState = t.scrollbarState, this._visibilityController = this._register(new Fr(t.visibility, "visible scrollbar " + t.extraScrollbarClassName, "invisible scrollbar " + t.extraScrollbarClassName)), this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._pointerMoveMonitor = this._register(new Wt()), this._shouldRender = true, this.domNode = _t(document.createElement("div")), this.domNode.setAttribute("role", "presentation"), this.domNode.setAttribute("aria-hidden", "true"), this._visibilityController.setDomNode(this.domNode), this.domNode.setPosition("absolute"), this._register(L(this.domNode.domNode, Y.POINTER_DOWN, (e) => this._domNodePointerDown(e)));
  }
  _createArrow(t) {
    let e = this._register(new Or(t));
    this.domNode.domNode.appendChild(e.bgDomNode), this.domNode.domNode.appendChild(e.domNode);
  }
  _createSlider(t, e, i, r) {
    this.slider = _t(document.createElement("div")), this.slider.setClassName("slider"), this.slider.setPosition("absolute"), this.slider.setTop(t), this.slider.setLeft(e), typeof i == "number" && this.slider.setWidth(i), typeof r == "number" && this.slider.setHeight(r), this.slider.setLayerHinting(true), this.slider.setContain("strict"), this.domNode.domNode.appendChild(this.slider.domNode), this._register(L(this.slider.domNode, Y.POINTER_DOWN, (n) => {
      n.button === 0 && (n.preventDefault(), this._sliderPointerDown(n));
    })), this.onclick(this.slider.domNode, (n) => {
      n.leftButton && n.stopPropagation();
    });
  }
  _onElementSize(t) {
    return this._scrollbarState.setVisibleSize(t) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  _onElementScrollSize(t) {
    return this._scrollbarState.setScrollSize(t) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  _onElementScrollPosition(t) {
    return this._scrollbarState.setScrollPosition(t) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  beginReveal() {
    this._visibilityController.setShouldBeVisible(true);
  }
  beginHide() {
    this._visibilityController.setShouldBeVisible(false);
  }
  render() {
    this._shouldRender && (this._shouldRender = false, this._renderDomNode(this._scrollbarState.getRectangleLargeSize(), this._scrollbarState.getRectangleSmallSize()), this._updateSlider(this._scrollbarState.getSliderSize(), this._scrollbarState.getArrowSize() + this._scrollbarState.getSliderPosition()));
  }
  _domNodePointerDown(t) {
    t.target === this.domNode.domNode && this._onPointerDown(t);
  }
  delegatePointerDown(t) {
    let e = this.domNode.domNode.getClientRects()[0].top, i = e + this._scrollbarState.getSliderPosition(), r = e + this._scrollbarState.getSliderPosition() + this._scrollbarState.getSliderSize(), n = this._sliderPointerPosition(t);
    i <= n && n <= r ? t.button === 0 && (t.preventDefault(), this._sliderPointerDown(t)) : this._onPointerDown(t);
  }
  _onPointerDown(t) {
    let e, i;
    if (t.target === this.domNode.domNode && typeof t.offsetX == "number" && typeof t.offsetY == "number") e = t.offsetX, i = t.offsetY;
    else {
      let n = Fo(this.domNode.domNode);
      e = t.pageX - n.left, i = t.pageY - n.top;
    }
    let r = this._pointerDownRelativePosition(e, i);
    this._setDesiredScrollPositionNow(this._scrollByPage ? this._scrollbarState.getDesiredScrollPositionFromOffsetPaged(r) : this._scrollbarState.getDesiredScrollPositionFromOffset(r)), t.button === 0 && (t.preventDefault(), this._sliderPointerDown(t));
  }
  _sliderPointerDown(t) {
    if (!t.target || !(t.target instanceof Element)) return;
    let e = this._sliderPointerPosition(t), i = this._sliderOrthogonalPointerPosition(t), r = this._scrollbarState.clone();
    this.slider.toggleClassName("active", true), this._pointerMoveMonitor.startMonitoring(t.target, t.pointerId, t.buttons, (n) => {
      let o2 = this._sliderOrthogonalPointerPosition(n), l = Math.abs(o2 - i);
      if (wr && l > Ca) {
        this._setDesiredScrollPositionNow(r.getScrollPosition());
        return;
      }
      let u = this._sliderPointerPosition(n) - e;
      this._setDesiredScrollPositionNow(r.getDesiredScrollPositionFromDelta(u));
    }, () => {
      this.slider.toggleClassName("active", false), this._host.onDragEnd();
    }), this._host.onDragStart();
  }
  _setDesiredScrollPositionNow(t) {
    let e = {};
    this.writeScrollPosition(e, t), this._scrollable.setScrollPositionNow(e);
  }
  updateScrollbarSize(t) {
    this._updateScrollbarSize(t), this._scrollbarState.setScrollbarSize(t), this._shouldRender = true, this._lazyRender || this.render();
  }
  isNeeded() {
    return this._scrollbarState.isNeeded();
  }
};
var Kt = class s11 {
  constructor(t, e, i, r, n, o2) {
    this._scrollbarSize = Math.round(e), this._oppositeScrollbarSize = Math.round(i), this._arrowSize = Math.round(t), this._visibleSize = r, this._scrollSize = n, this._scrollPosition = o2, this._computedAvailableSize = 0, this._computedIsNeeded = false, this._computedSliderSize = 0, this._computedSliderRatio = 0, this._computedSliderPosition = 0, this._refreshComputedValues();
  }
  clone() {
    return new s11(this._arrowSize, this._scrollbarSize, this._oppositeScrollbarSize, this._visibleSize, this._scrollSize, this._scrollPosition);
  }
  setVisibleSize(t) {
    let e = Math.round(t);
    return this._visibleSize !== e ? (this._visibleSize = e, this._refreshComputedValues(), true) : false;
  }
  setScrollSize(t) {
    let e = Math.round(t);
    return this._scrollSize !== e ? (this._scrollSize = e, this._refreshComputedValues(), true) : false;
  }
  setScrollPosition(t) {
    let e = Math.round(t);
    return this._scrollPosition !== e ? (this._scrollPosition = e, this._refreshComputedValues(), true) : false;
  }
  setScrollbarSize(t) {
    this._scrollbarSize = Math.round(t);
  }
  setOppositeScrollbarSize(t) {
    this._oppositeScrollbarSize = Math.round(t);
  }
  static _computeValues(t, e, i, r, n) {
    let o2 = Math.max(0, i - t), l = Math.max(0, o2 - 2 * e), a = r > 0 && r > i;
    if (!a) return { computedAvailableSize: Math.round(o2), computedIsNeeded: a, computedSliderSize: Math.round(l), computedSliderRatio: 0, computedSliderPosition: 0 };
    let u = Math.round(Math.max(20, Math.floor(i * l / r))), h15 = (l - u) / (r - i), c = n * h15;
    return { computedAvailableSize: Math.round(o2), computedIsNeeded: a, computedSliderSize: Math.round(u), computedSliderRatio: h15, computedSliderPosition: Math.round(c) };
  }
  _refreshComputedValues() {
    let t = s11._computeValues(this._oppositeScrollbarSize, this._arrowSize, this._visibleSize, this._scrollSize, this._scrollPosition);
    this._computedAvailableSize = t.computedAvailableSize, this._computedIsNeeded = t.computedIsNeeded, this._computedSliderSize = t.computedSliderSize, this._computedSliderRatio = t.computedSliderRatio, this._computedSliderPosition = t.computedSliderPosition;
  }
  getArrowSize() {
    return this._arrowSize;
  }
  getScrollPosition() {
    return this._scrollPosition;
  }
  getRectangleLargeSize() {
    return this._computedAvailableSize;
  }
  getRectangleSmallSize() {
    return this._scrollbarSize;
  }
  isNeeded() {
    return this._computedIsNeeded;
  }
  getSliderSize() {
    return this._computedSliderSize;
  }
  getSliderPosition() {
    return this._computedSliderPosition;
  }
  getDesiredScrollPositionFromOffset(t) {
    if (!this._computedIsNeeded) return 0;
    let e = t - this._arrowSize - this._computedSliderSize / 2;
    return Math.round(e / this._computedSliderRatio);
  }
  getDesiredScrollPositionFromOffsetPaged(t) {
    if (!this._computedIsNeeded) return 0;
    let e = t - this._arrowSize, i = this._scrollPosition;
    return e < this._computedSliderPosition ? i -= this._visibleSize : i += this._visibleSize, i;
  }
  getDesiredScrollPositionFromDelta(t) {
    if (!this._computedIsNeeded) return 0;
    let e = this._computedSliderPosition + t;
    return Math.round(e / this._computedSliderRatio);
  }
};
var Wr = class extends Ut {
  constructor(t, e, i) {
    let r = t.getScrollDimensions(), n = t.getCurrentScrollPosition();
    if (super({ lazyRender: e.lazyRender, host: i, scrollbarState: new Kt(e.horizontalHasArrows ? e.arrowSize : 0, e.horizontal === 2 ? 0 : e.horizontalScrollbarSize, e.vertical === 2 ? 0 : e.verticalScrollbarSize, r.width, r.scrollWidth, n.scrollLeft), visibility: e.horizontal, extraScrollbarClassName: "horizontal", scrollable: t, scrollByPage: e.scrollByPage }), e.horizontalHasArrows) throw new Error("horizontalHasArrows is not supported in xterm.js");
    this._createSlider(Math.floor((e.horizontalScrollbarSize - e.horizontalSliderSize) / 2), 0, void 0, e.horizontalSliderSize);
  }
  _updateSlider(t, e) {
    this.slider.setWidth(t), this.slider.setLeft(e);
  }
  _renderDomNode(t, e) {
    this.domNode.setWidth(t), this.domNode.setHeight(e), this.domNode.setLeft(0), this.domNode.setBottom(0);
  }
  onDidScroll(t) {
    return this._shouldRender = this._onElementScrollSize(t.scrollWidth) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(t.scrollLeft) || this._shouldRender, this._shouldRender = this._onElementSize(t.width) || this._shouldRender, this._shouldRender;
  }
  _pointerDownRelativePosition(t, e) {
    return t;
  }
  _sliderPointerPosition(t) {
    return t.pageX;
  }
  _sliderOrthogonalPointerPosition(t) {
    return t.pageY;
  }
  _updateScrollbarSize(t) {
    this.slider.setHeight(t);
  }
  writeScrollPosition(t, e) {
    t.scrollLeft = e;
  }
  updateOptions(t) {
    this.updateScrollbarSize(t.horizontal === 2 ? 0 : t.horizontalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(t.vertical === 2 ? 0 : t.verticalScrollbarSize), this._visibilityController.setVisibility(t.horizontal), this._scrollByPage = t.scrollByPage;
  }
};
var Ur = class extends Ut {
  constructor(t, e, i) {
    let r = t.getScrollDimensions(), n = t.getCurrentScrollPosition();
    if (super({ lazyRender: e.lazyRender, host: i, scrollbarState: new Kt(e.verticalHasArrows ? e.arrowSize : 0, e.vertical === 2 ? 0 : e.verticalScrollbarSize, 0, r.height, r.scrollHeight, n.scrollTop), visibility: e.vertical, extraScrollbarClassName: "vertical", scrollable: t, scrollByPage: e.scrollByPage }), e.verticalHasArrows) throw new Error("horizontalHasArrows is not supported in xterm.js");
    this._createSlider(0, Math.floor((e.verticalScrollbarSize - e.verticalSliderSize) / 2), e.verticalSliderSize, void 0);
  }
  _updateSlider(t, e) {
    this.slider.setHeight(t), this.slider.setTop(e);
  }
  _renderDomNode(t, e) {
    this.domNode.setWidth(e), this.domNode.setHeight(t), this.domNode.setRight(0), this.domNode.setTop(0);
  }
  onDidScroll(t) {
    return this._shouldRender = this._onElementScrollSize(t.scrollHeight) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(t.scrollTop) || this._shouldRender, this._shouldRender = this._onElementSize(t.height) || this._shouldRender, this._shouldRender;
  }
  _pointerDownRelativePosition(t, e) {
    return e;
  }
  _sliderPointerPosition(t) {
    return t.pageY;
  }
  _sliderOrthogonalPointerPosition(t) {
    return t.pageX;
  }
  _updateScrollbarSize(t) {
    this.slider.setWidth(t);
  }
  writeScrollPosition(t, e) {
    t.scrollTop = e;
  }
  updateOptions(t) {
    this.updateScrollbarSize(t.vertical === 2 ? 0 : t.verticalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(0), this._visibilityController.setVisibility(t.vertical), this._scrollByPage = t.scrollByPage;
  }
};
var Ma = 500;
var Ko = 50;
var zo = true;
var us = class {
  constructor(t, e, i) {
    this.timestamp = t, this.deltaX = e, this.deltaY = i, this.score = 0;
  }
};
var zr = class zr2 {
  constructor() {
    this._capacity = 5, this._memory = [], this._front = -1, this._rear = -1;
  }
  isPhysicalMouseWheel() {
    if (this._front === -1 && this._rear === -1) return false;
    let t = 1, e = 0, i = 1, r = this._rear;
    do {
      let n = r === this._front ? t : Math.pow(2, -i);
      if (t -= n, e += this._memory[r].score * n, r === this._front) break;
      r = (this._capacity + r - 1) % this._capacity, i++;
    } while (true);
    return e <= 0.5;
  }
  acceptStandardWheelEvent(t) {
    if (Ti) {
      let e = be(t.browserEvent), i = mo(e);
      this.accept(Date.now(), t.deltaX * i, t.deltaY * i);
    } else this.accept(Date.now(), t.deltaX, t.deltaY);
  }
  accept(t, e, i) {
    let r = null, n = new us(t, e, i);
    this._front === -1 && this._rear === -1 ? (this._memory[0] = n, this._front = 0, this._rear = 0) : (r = this._memory[this._rear], this._rear = (this._rear + 1) % this._capacity, this._rear === this._front && (this._front = (this._front + 1) % this._capacity), this._memory[this._rear] = n), n.score = this._computeScore(n, r);
  }
  _computeScore(t, e) {
    if (Math.abs(t.deltaX) > 0 && Math.abs(t.deltaY) > 0) return 1;
    let i = 0.5;
    if ((!this._isAlmostInt(t.deltaX) || !this._isAlmostInt(t.deltaY)) && (i += 0.25), e) {
      let r = Math.abs(t.deltaX), n = Math.abs(t.deltaY), o2 = Math.abs(e.deltaX), l = Math.abs(e.deltaY), a = Math.max(Math.min(r, o2), 1), u = Math.max(Math.min(n, l), 1), h15 = Math.max(r, o2), c = Math.max(n, l);
      h15 % a === 0 && c % u === 0 && (i -= 0.5);
    }
    return Math.min(Math.max(i, 0), 1);
  }
  _isAlmostInt(t) {
    return Math.abs(Math.round(t) - t) < 0.01;
  }
};
zr.INSTANCE = new zr();
var hs = zr;
var ds = class extends lt {
  constructor(e, i, r) {
    super();
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this._onWillScroll = this._register(new v());
    this.onWillScroll = this._onWillScroll.event;
    this._options = Pa(i), this._scrollable = r, this._register(this._scrollable.onScroll((o2) => {
      this._onWillScroll.fire(o2), this._onDidScroll(o2), this._onScroll.fire(o2);
    }));
    let n = { onMouseWheel: (o2) => this._onMouseWheel(o2), onDragStart: () => this._onDragStart(), onDragEnd: () => this._onDragEnd() };
    this._verticalScrollbar = this._register(new Ur(this._scrollable, this._options, n)), this._horizontalScrollbar = this._register(new Wr(this._scrollable, this._options, n)), this._domNode = document.createElement("div"), this._domNode.className = "xterm-scrollable-element " + this._options.className, this._domNode.setAttribute("role", "presentation"), this._domNode.style.position = "relative", this._domNode.appendChild(e), this._domNode.appendChild(this._horizontalScrollbar.domNode.domNode), this._domNode.appendChild(this._verticalScrollbar.domNode.domNode), this._options.useShadows ? (this._leftShadowDomNode = _t(document.createElement("div")), this._leftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._leftShadowDomNode.domNode), this._topShadowDomNode = _t(document.createElement("div")), this._topShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topShadowDomNode.domNode), this._topLeftShadowDomNode = _t(document.createElement("div")), this._topLeftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topLeftShadowDomNode.domNode)) : (this._leftShadowDomNode = null, this._topShadowDomNode = null, this._topLeftShadowDomNode = null), this._listenOnDomNode = this._options.listenOnDomNode || this._domNode, this._mouseWheelToDispose = [], this._setListeningToMouseWheel(this._options.handleMouseWheel), this.onmouseover(this._listenOnDomNode, (o2) => this._onMouseOver(o2)), this.onmouseleave(this._listenOnDomNode, (o2) => this._onMouseLeave(o2)), this._hideTimeout = this._register(new Ye()), this._isDragging = false, this._mouseIsOver = false, this._shouldRender = true, this._revealOnScroll = true;
  }
  get options() {
    return this._options;
  }
  dispose() {
    this._mouseWheelToDispose = Ne(this._mouseWheelToDispose), super.dispose();
  }
  getDomNode() {
    return this._domNode;
  }
  getOverviewRulerLayoutInfo() {
    return { parent: this._domNode, insertBefore: this._verticalScrollbar.domNode.domNode };
  }
  delegateVerticalScrollbarPointerDown(e) {
    this._verticalScrollbar.delegatePointerDown(e);
  }
  getScrollDimensions() {
    return this._scrollable.getScrollDimensions();
  }
  setScrollDimensions(e) {
    this._scrollable.setScrollDimensions(e, false);
  }
  updateClassName(e) {
    this._options.className = e, Te && (this._options.className += " mac"), this._domNode.className = "xterm-scrollable-element " + this._options.className;
  }
  updateOptions(e) {
    typeof e.handleMouseWheel < "u" && (this._options.handleMouseWheel = e.handleMouseWheel, this._setListeningToMouseWheel(this._options.handleMouseWheel)), typeof e.mouseWheelScrollSensitivity < "u" && (this._options.mouseWheelScrollSensitivity = e.mouseWheelScrollSensitivity), typeof e.fastScrollSensitivity < "u" && (this._options.fastScrollSensitivity = e.fastScrollSensitivity), typeof e.scrollPredominantAxis < "u" && (this._options.scrollPredominantAxis = e.scrollPredominantAxis), typeof e.horizontal < "u" && (this._options.horizontal = e.horizontal), typeof e.vertical < "u" && (this._options.vertical = e.vertical), typeof e.horizontalScrollbarSize < "u" && (this._options.horizontalScrollbarSize = e.horizontalScrollbarSize), typeof e.verticalScrollbarSize < "u" && (this._options.verticalScrollbarSize = e.verticalScrollbarSize), typeof e.scrollByPage < "u" && (this._options.scrollByPage = e.scrollByPage), this._horizontalScrollbar.updateOptions(this._options), this._verticalScrollbar.updateOptions(this._options), this._options.lazyRender || this._render();
  }
  setRevealOnScroll(e) {
    this._revealOnScroll = e;
  }
  delegateScrollFromMouseWheelEvent(e) {
    this._onMouseWheel(new xi(e));
  }
  _setListeningToMouseWheel(e) {
    if (this._mouseWheelToDispose.length > 0 !== e && (this._mouseWheelToDispose = Ne(this._mouseWheelToDispose), e)) {
      let r = (n) => {
        this._onMouseWheel(new xi(n));
      };
      this._mouseWheelToDispose.push(L(this._listenOnDomNode, Y.MOUSE_WHEEL, r, { passive: false }));
    }
  }
  _onMouseWheel(e) {
    if (e.browserEvent?.defaultPrevented) return;
    let i = hs.INSTANCE;
    zo && i.acceptStandardWheelEvent(e);
    let r = false;
    if (e.deltaY || e.deltaX) {
      let o2 = e.deltaY * this._options.mouseWheelScrollSensitivity, l = e.deltaX * this._options.mouseWheelScrollSensitivity;
      this._options.scrollPredominantAxis && (this._options.scrollYToX && l + o2 === 0 ? l = o2 = 0 : Math.abs(o2) >= Math.abs(l) ? l = 0 : o2 = 0), this._options.flipAxes && ([o2, l] = [l, o2]);
      let a = !Te && e.browserEvent && e.browserEvent.shiftKey;
      (this._options.scrollYToX || a) && !l && (l = o2, o2 = 0), e.browserEvent && e.browserEvent.altKey && (l = l * this._options.fastScrollSensitivity, o2 = o2 * this._options.fastScrollSensitivity);
      let u = this._scrollable.getFutureScrollPosition(), h15 = {};
      if (o2) {
        let c = Ko * o2, d = u.scrollTop - (c < 0 ? Math.floor(c) : Math.ceil(c));
        this._verticalScrollbar.writeScrollPosition(h15, d);
      }
      if (l) {
        let c = Ko * l, d = u.scrollLeft - (c < 0 ? Math.floor(c) : Math.ceil(c));
        this._horizontalScrollbar.writeScrollPosition(h15, d);
      }
      h15 = this._scrollable.validateScrollPosition(h15), (u.scrollLeft !== h15.scrollLeft || u.scrollTop !== h15.scrollTop) && (zo && this._options.mouseWheelSmoothScroll && i.isPhysicalMouseWheel() ? this._scrollable.setScrollPositionSmooth(h15) : this._scrollable.setScrollPositionNow(h15), r = true);
    }
    let n = r;
    !n && this._options.alwaysConsumeMouseWheel && (n = true), !n && this._options.consumeMouseWheelIfScrollbarIsNeeded && (this._verticalScrollbar.isNeeded() || this._horizontalScrollbar.isNeeded()) && (n = true), n && (e.preventDefault(), e.stopPropagation());
  }
  _onDidScroll(e) {
    this._shouldRender = this._horizontalScrollbar.onDidScroll(e) || this._shouldRender, this._shouldRender = this._verticalScrollbar.onDidScroll(e) || this._shouldRender, this._options.useShadows && (this._shouldRender = true), this._revealOnScroll && this._reveal(), this._options.lazyRender || this._render();
  }
  renderNow() {
    if (!this._options.lazyRender) throw new Error("Please use `lazyRender` together with `renderNow`!");
    this._render();
  }
  _render() {
    if (this._shouldRender && (this._shouldRender = false, this._horizontalScrollbar.render(), this._verticalScrollbar.render(), this._options.useShadows)) {
      let e = this._scrollable.getCurrentScrollPosition(), i = e.scrollTop > 0, r = e.scrollLeft > 0, n = r ? " left" : "", o2 = i ? " top" : "", l = r || i ? " top-left-corner" : "";
      this._leftShadowDomNode.setClassName(`shadow${n}`), this._topShadowDomNode.setClassName(`shadow${o2}`), this._topLeftShadowDomNode.setClassName(`shadow${l}${o2}${n}`);
    }
  }
  _onDragStart() {
    this._isDragging = true, this._reveal();
  }
  _onDragEnd() {
    this._isDragging = false, this._hide();
  }
  _onMouseLeave(e) {
    this._mouseIsOver = false, this._hide();
  }
  _onMouseOver(e) {
    this._mouseIsOver = true, this._reveal();
  }
  _reveal() {
    this._verticalScrollbar.beginReveal(), this._horizontalScrollbar.beginReveal(), this._scheduleHide();
  }
  _hide() {
    !this._mouseIsOver && !this._isDragging && (this._verticalScrollbar.beginHide(), this._horizontalScrollbar.beginHide());
  }
  _scheduleHide() {
    !this._mouseIsOver && !this._isDragging && this._hideTimeout.cancelAndSet(() => this._hide(), Ma);
  }
};
var Kr = class extends ds {
  constructor(t, e, i) {
    super(t, e, i);
  }
  setScrollPosition(t) {
    t.reuseAnimation ? this._scrollable.setScrollPositionSmooth(t, t.reuseAnimation) : this._scrollable.setScrollPositionNow(t);
  }
  getScrollPosition() {
    return this._scrollable.getCurrentScrollPosition();
  }
};
function Pa(s15) {
  let t = { lazyRender: typeof s15.lazyRender < "u" ? s15.lazyRender : false, className: typeof s15.className < "u" ? s15.className : "", useShadows: typeof s15.useShadows < "u" ? s15.useShadows : true, handleMouseWheel: typeof s15.handleMouseWheel < "u" ? s15.handleMouseWheel : true, flipAxes: typeof s15.flipAxes < "u" ? s15.flipAxes : false, consumeMouseWheelIfScrollbarIsNeeded: typeof s15.consumeMouseWheelIfScrollbarIsNeeded < "u" ? s15.consumeMouseWheelIfScrollbarIsNeeded : false, alwaysConsumeMouseWheel: typeof s15.alwaysConsumeMouseWheel < "u" ? s15.alwaysConsumeMouseWheel : false, scrollYToX: typeof s15.scrollYToX < "u" ? s15.scrollYToX : false, mouseWheelScrollSensitivity: typeof s15.mouseWheelScrollSensitivity < "u" ? s15.mouseWheelScrollSensitivity : 1, fastScrollSensitivity: typeof s15.fastScrollSensitivity < "u" ? s15.fastScrollSensitivity : 5, scrollPredominantAxis: typeof s15.scrollPredominantAxis < "u" ? s15.scrollPredominantAxis : true, mouseWheelSmoothScroll: typeof s15.mouseWheelSmoothScroll < "u" ? s15.mouseWheelSmoothScroll : true, arrowSize: typeof s15.arrowSize < "u" ? s15.arrowSize : 11, listenOnDomNode: typeof s15.listenOnDomNode < "u" ? s15.listenOnDomNode : null, horizontal: typeof s15.horizontal < "u" ? s15.horizontal : 1, horizontalScrollbarSize: typeof s15.horizontalScrollbarSize < "u" ? s15.horizontalScrollbarSize : 10, horizontalSliderSize: typeof s15.horizontalSliderSize < "u" ? s15.horizontalSliderSize : 0, horizontalHasArrows: typeof s15.horizontalHasArrows < "u" ? s15.horizontalHasArrows : false, vertical: typeof s15.vertical < "u" ? s15.vertical : 1, verticalScrollbarSize: typeof s15.verticalScrollbarSize < "u" ? s15.verticalScrollbarSize : 10, verticalHasArrows: typeof s15.verticalHasArrows < "u" ? s15.verticalHasArrows : false, verticalSliderSize: typeof s15.verticalSliderSize < "u" ? s15.verticalSliderSize : 0, scrollByPage: typeof s15.scrollByPage < "u" ? s15.scrollByPage : false };
  return t.horizontalSliderSize = typeof s15.horizontalSliderSize < "u" ? s15.horizontalSliderSize : t.horizontalScrollbarSize, t.verticalSliderSize = typeof s15.verticalSliderSize < "u" ? s15.verticalSliderSize : t.verticalScrollbarSize, Te && (t.className += " mac"), t;
}
var zt = class extends D {
  constructor(e, i, r, n, o2, l, a, u) {
    super();
    this._bufferService = r;
    this._optionsService = a;
    this._renderService = u;
    this._onRequestScrollLines = this._register(new v());
    this.onRequestScrollLines = this._onRequestScrollLines.event;
    this._isSyncing = false;
    this._isHandlingScroll = false;
    this._suppressOnScrollHandler = false;
    let h15 = this._register(new Ri({ forceIntegerValues: false, smoothScrollDuration: this._optionsService.rawOptions.smoothScrollDuration, scheduleAtNextAnimationFrame: (c) => mt(n.window, c) }));
    this._register(this._optionsService.onSpecificOptionChange("smoothScrollDuration", () => {
      h15.setSmoothScrollDuration(this._optionsService.rawOptions.smoothScrollDuration);
    })), this._scrollableElement = this._register(new Kr(i, { vertical: 1, horizontal: 2, useShadows: false, mouseWheelSmoothScroll: true, ...this._getChangeOptions() }, h15)), this._register(this._optionsService.onMultipleOptionChange(["scrollSensitivity", "fastScrollSensitivity", "overviewRuler"], () => this._scrollableElement.updateOptions(this._getChangeOptions()))), this._register(o2.onProtocolChange((c) => {
      this._scrollableElement.updateOptions({ handleMouseWheel: !(c & 16) });
    })), this._scrollableElement.setScrollDimensions({ height: 0, scrollHeight: 0 }), this._register($.runAndSubscribe(l.onChangeColors, () => {
      this._scrollableElement.getDomNode().style.backgroundColor = l.colors.background.css;
    })), e.appendChild(this._scrollableElement.getDomNode()), this._register(C(() => this._scrollableElement.getDomNode().remove())), this._styleElement = n.mainDocument.createElement("style"), i.appendChild(this._styleElement), this._register(C(() => this._styleElement.remove())), this._register($.runAndSubscribe(l.onChangeColors, () => {
      this._styleElement.textContent = [".xterm .xterm-scrollable-element > .scrollbar > .slider {", `  background: ${l.colors.scrollbarSliderBackground.css};`, "}", ".xterm .xterm-scrollable-element > .scrollbar > .slider:hover {", `  background: ${l.colors.scrollbarSliderHoverBackground.css};`, "}", ".xterm .xterm-scrollable-element > .scrollbar > .slider.active {", `  background: ${l.colors.scrollbarSliderActiveBackground.css};`, "}"].join(`
`);
    })), this._register(this._bufferService.onResize(() => this.queueSync())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._latestYDisp = void 0, this.queueSync();
    })), this._register(this._bufferService.onScroll(() => this._sync())), this._register(this._scrollableElement.onScroll((c) => this._handleScroll(c)));
  }
  scrollLines(e) {
    let i = this._scrollableElement.getScrollPosition();
    this._scrollableElement.setScrollPosition({ reuseAnimation: true, scrollTop: i.scrollTop + e * this._renderService.dimensions.css.cell.height });
  }
  scrollToLine(e, i) {
    i && (this._latestYDisp = e), this._scrollableElement.setScrollPosition({ reuseAnimation: !i, scrollTop: e * this._renderService.dimensions.css.cell.height });
  }
  _getChangeOptions() {
    return { mouseWheelScrollSensitivity: this._optionsService.rawOptions.scrollSensitivity, fastScrollSensitivity: this._optionsService.rawOptions.fastScrollSensitivity, verticalScrollbarSize: this._optionsService.rawOptions.overviewRuler?.width || 14 };
  }
  queueSync(e) {
    e !== void 0 && (this._latestYDisp = e), this._queuedAnimationFrame === void 0 && (this._queuedAnimationFrame = this._renderService.addRefreshCallback(() => {
      this._queuedAnimationFrame = void 0, this._sync(this._latestYDisp);
    }));
  }
  _sync(e = this._bufferService.buffer.ydisp) {
    !this._renderService || this._isSyncing || (this._isSyncing = true, this._suppressOnScrollHandler = true, this._scrollableElement.setScrollDimensions({ height: this._renderService.dimensions.css.canvas.height, scrollHeight: this._renderService.dimensions.css.cell.height * this._bufferService.buffer.lines.length }), this._suppressOnScrollHandler = false, e !== this._latestYDisp && this._scrollableElement.setScrollPosition({ scrollTop: e * this._renderService.dimensions.css.cell.height }), this._isSyncing = false);
  }
  _handleScroll(e) {
    if (!this._renderService || this._isHandlingScroll || this._suppressOnScrollHandler) return;
    this._isHandlingScroll = true;
    let i = Math.round(e.scrollTop / this._renderService.dimensions.css.cell.height), r = i - this._bufferService.buffer.ydisp;
    r !== 0 && (this._latestYDisp = i, this._onRequestScrollLines.fire(r)), this._isHandlingScroll = false;
  }
};
zt = M([S(2, F), S(3, ae), S(4, rr), S(5, Re), S(6, H), S(7, ce)], zt);
var Gt = class extends D {
  constructor(e, i, r, n, o2) {
    super();
    this._screenElement = e;
    this._bufferService = i;
    this._coreBrowserService = r;
    this._decorationService = n;
    this._renderService = o2;
    this._decorationElements = /* @__PURE__ */ new Map();
    this._altBufferIsActive = false;
    this._dimensionsChanged = false;
    this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this._register(this._renderService.onRenderedViewportChange(() => this._doRefreshDecorations())), this._register(this._renderService.onDimensionsChange(() => {
      this._dimensionsChanged = true, this._queueRefresh();
    })), this._register(this._coreBrowserService.onDprChange(() => this._queueRefresh())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
    })), this._register(this._decorationService.onDecorationRegistered(() => this._queueRefresh())), this._register(this._decorationService.onDecorationRemoved((l) => this._removeDecoration(l))), this._register(C(() => {
      this._container.remove(), this._decorationElements.clear();
    }));
  }
  _queueRefresh() {
    this._animationFrame === void 0 && (this._animationFrame = this._renderService.addRefreshCallback(() => {
      this._doRefreshDecorations(), this._animationFrame = void 0;
    }));
  }
  _doRefreshDecorations() {
    for (let e of this._decorationService.decorations) this._renderDecoration(e);
    this._dimensionsChanged = false;
  }
  _renderDecoration(e) {
    this._refreshStyle(e), this._dimensionsChanged && this._refreshXPosition(e);
  }
  _createElement(e) {
    let i = this._coreBrowserService.mainDocument.createElement("div");
    i.classList.add("xterm-decoration"), i.classList.toggle("xterm-decoration-top-layer", e?.options?.layer === "top"), i.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, i.style.height = `${(e.options.height || 1) * this._renderService.dimensions.css.cell.height}px`, i.style.top = `${(e.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height}px`, i.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
    let r = e.options.x ?? 0;
    return r && r > this._bufferService.cols && (i.style.display = "none"), this._refreshXPosition(e, i), i;
  }
  _refreshStyle(e) {
    let i = e.marker.line - this._bufferService.buffers.active.ydisp;
    if (i < 0 || i >= this._bufferService.rows) e.element && (e.element.style.display = "none", e.onRenderEmitter.fire(e.element));
    else {
      let r = this._decorationElements.get(e);
      r || (r = this._createElement(e), e.element = r, this._decorationElements.set(e, r), this._container.appendChild(r), e.onDispose(() => {
        this._decorationElements.delete(e), r.remove();
      })), r.style.display = this._altBufferIsActive ? "none" : "block", this._altBufferIsActive || (r.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, r.style.height = `${(e.options.height || 1) * this._renderService.dimensions.css.cell.height}px`, r.style.top = `${i * this._renderService.dimensions.css.cell.height}px`, r.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`), e.onRenderEmitter.fire(r);
    }
  }
  _refreshXPosition(e, i = e.element) {
    if (!i) return;
    let r = e.options.x ?? 0;
    (e.options.anchor || "left") === "right" ? i.style.right = r ? `${r * this._renderService.dimensions.css.cell.width}px` : "" : i.style.left = r ? `${r * this._renderService.dimensions.css.cell.width}px` : "";
  }
  _removeDecoration(e) {
    this._decorationElements.get(e)?.remove(), this._decorationElements.delete(e), e.dispose();
  }
};
Gt = M([S(1, F), S(2, ae), S(3, Be), S(4, ce)], Gt);
var Gr = class {
  constructor() {
    this._zones = [];
    this._zonePool = [];
    this._zonePoolIndex = 0;
    this._linePadding = { full: 0, left: 0, center: 0, right: 0 };
  }
  get zones() {
    return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
  }
  clear() {
    this._zones.length = 0, this._zonePoolIndex = 0;
  }
  addDecoration(t) {
    if (t.options.overviewRulerOptions) {
      for (let e of this._zones) if (e.color === t.options.overviewRulerOptions.color && e.position === t.options.overviewRulerOptions.position) {
        if (this._lineIntersectsZone(e, t.marker.line)) return;
        if (this._lineAdjacentToZone(e, t.marker.line, t.options.overviewRulerOptions.position)) {
          this._addLineToZone(e, t.marker.line);
          return;
        }
      }
      if (this._zonePoolIndex < this._zonePool.length) {
        this._zonePool[this._zonePoolIndex].color = t.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = t.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = t.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = t.marker.line, this._zones.push(this._zonePool[this._zonePoolIndex++]);
        return;
      }
      this._zones.push({ color: t.options.overviewRulerOptions.color, position: t.options.overviewRulerOptions.position, startBufferLine: t.marker.line, endBufferLine: t.marker.line }), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
    }
  }
  setPadding(t) {
    this._linePadding = t;
  }
  _lineIntersectsZone(t, e) {
    return e >= t.startBufferLine && e <= t.endBufferLine;
  }
  _lineAdjacentToZone(t, e, i) {
    return e >= t.startBufferLine - this._linePadding[i || "full"] && e <= t.endBufferLine + this._linePadding[i || "full"];
  }
  _addLineToZone(t, e) {
    t.startBufferLine = Math.min(t.startBufferLine, e), t.endBufferLine = Math.max(t.endBufferLine, e);
  }
};
var We = { full: 0, left: 0, center: 0, right: 0 };
var at = { full: 0, left: 0, center: 0, right: 0 };
var Li = { full: 0, left: 0, center: 0, right: 0 };
var bt = class extends D {
  constructor(e, i, r, n, o2, l, a, u) {
    super();
    this._viewportElement = e;
    this._screenElement = i;
    this._bufferService = r;
    this._decorationService = n;
    this._renderService = o2;
    this._optionsService = l;
    this._themeService = a;
    this._coreBrowserService = u;
    this._colorZoneStore = new Gr();
    this._shouldUpdateDimensions = true;
    this._shouldUpdateAnchor = true;
    this._lastKnownBufferLength = 0;
    this._canvas = this._coreBrowserService.mainDocument.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), this._viewportElement.parentElement?.insertBefore(this._canvas, this._viewportElement), this._register(C(() => this._canvas?.remove()));
    let h15 = this._canvas.getContext("2d");
    if (h15) this._ctx = h15;
    else throw new Error("Ctx cannot be null");
    this._register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(void 0, true))), this._register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(void 0, true))), this._register(this._renderService.onRenderedViewportChange(() => this._queueRefresh())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
    })), this._register(this._bufferService.onScroll(() => {
      this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
    })), this._register(this._renderService.onRender(() => {
      (!this._containerHeight || this._containerHeight !== this._screenElement.clientHeight) && (this._queueRefresh(true), this._containerHeight = this._screenElement.clientHeight);
    })), this._register(this._coreBrowserService.onDprChange(() => this._queueRefresh(true))), this._register(this._optionsService.onSpecificOptionChange("overviewRuler", () => this._queueRefresh(true))), this._register(this._themeService.onChangeColors(() => this._queueRefresh())), this._queueRefresh(true);
  }
  get _width() {
    return this._optionsService.options.overviewRuler?.width || 0;
  }
  _refreshDrawConstants() {
    let e = Math.floor((this._canvas.width - 1) / 3), i = Math.ceil((this._canvas.width - 1) / 3);
    at.full = this._canvas.width, at.left = e, at.center = i, at.right = e, this._refreshDrawHeightConstants(), Li.full = 1, Li.left = 1, Li.center = 1 + at.left, Li.right = 1 + at.left + at.center;
  }
  _refreshDrawHeightConstants() {
    We.full = Math.round(2 * this._coreBrowserService.dpr);
    let e = this._canvas.height / this._bufferService.buffer.lines.length, i = Math.round(Math.max(Math.min(e, 12), 6) * this._coreBrowserService.dpr);
    We.left = i, We.center = i, We.right = i;
  }
  _refreshColorZonePadding() {
    this._colorZoneStore.setPadding({ full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.full), left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.left), center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.center), right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.right) }), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
  }
  _refreshCanvasDimensions() {
    this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
  }
  _refreshDecorations() {
    this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
    for (let i of this._decorationService.decorations) this._colorZoneStore.addDecoration(i);
    this._ctx.lineWidth = 1, this._renderRulerOutline();
    let e = this._colorZoneStore.zones;
    for (let i of e) i.position !== "full" && this._renderColorZone(i);
    for (let i of e) i.position === "full" && this._renderColorZone(i);
    this._shouldUpdateDimensions = false, this._shouldUpdateAnchor = false;
  }
  _renderRulerOutline() {
    this._ctx.fillStyle = this._themeService.colors.overviewRulerBorder.css, this._ctx.fillRect(0, 0, 1, this._canvas.height), this._optionsService.rawOptions.overviewRuler.showTopBorder && this._ctx.fillRect(1, 0, this._canvas.width - 1, 1), this._optionsService.rawOptions.overviewRuler.showBottomBorder && this._ctx.fillRect(1, this._canvas.height - 1, this._canvas.width - 1, this._canvas.height);
  }
  _renderColorZone(e) {
    this._ctx.fillStyle = e.color, this._ctx.fillRect(Li[e.position || "full"], Math.round((this._canvas.height - 1) * (e.startBufferLine / this._bufferService.buffers.active.lines.length) - We[e.position || "full"] / 2), at[e.position || "full"], Math.round((this._canvas.height - 1) * ((e.endBufferLine - e.startBufferLine) / this._bufferService.buffers.active.lines.length) + We[e.position || "full"]));
  }
  _queueRefresh(e, i) {
    this._shouldUpdateDimensions = e || this._shouldUpdateDimensions, this._shouldUpdateAnchor = i || this._shouldUpdateAnchor, this._animationFrame === void 0 && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
      this._refreshDecorations(), this._animationFrame = void 0;
    }));
  }
};
bt = M([S(2, F), S(3, Be), S(4, ce), S(5, H), S(6, Re), S(7, ae)], bt);
var b;
((E) => (E.NUL = "\0", E.SOH = "", E.STX = "", E.ETX = "", E.EOT = "", E.ENQ = "", E.ACK = "", E.BEL = "\x07", E.BS = "\b", E.HT = "	", E.LF = `
`, E.VT = "\v", E.FF = "\f", E.CR = "\r", E.SO = "", E.SI = "", E.DLE = "", E.DC1 = "", E.DC2 = "", E.DC3 = "", E.DC4 = "", E.NAK = "", E.SYN = "", E.ETB = "", E.CAN = "", E.EM = "", E.SUB = "", E.ESC = "\x1B", E.FS = "", E.GS = "", E.RS = "", E.US = "", E.SP = " ", E.DEL = "\x7F"))(b || (b = {}));
var Ai;
((g) => (g.PAD = "\x80", g.HOP = "\x81", g.BPH = "\x82", g.NBH = "\x83", g.IND = "\x84", g.NEL = "\x85", g.SSA = "\x86", g.ESA = "\x87", g.HTS = "\x88", g.HTJ = "\x89", g.VTS = "\x8A", g.PLD = "\x8B", g.PLU = "\x8C", g.RI = "\x8D", g.SS2 = "\x8E", g.SS3 = "\x8F", g.DCS = "\x90", g.PU1 = "\x91", g.PU2 = "\x92", g.STS = "\x93", g.CCH = "\x94", g.MW = "\x95", g.SPA = "\x96", g.EPA = "\x97", g.SOS = "\x98", g.SGCI = "\x99", g.SCI = "\x9A", g.CSI = "\x9B", g.ST = "\x9C", g.OSC = "\x9D", g.PM = "\x9E", g.APC = "\x9F"))(Ai || (Ai = {}));
var fs;
((t) => t.ST = `${b.ESC}\\`)(fs || (fs = {}));
var $t = class {
  constructor(t, e, i, r, n, o2) {
    this._textarea = t;
    this._compositionView = e;
    this._bufferService = i;
    this._optionsService = r;
    this._coreService = n;
    this._renderService = o2;
    this._isComposing = false, this._isSendingComposition = false, this._compositionPosition = { start: 0, end: 0 }, this._dataAlreadySent = "";
  }
  get isComposing() {
    return this._isComposing;
  }
  compositionstart() {
    this._isComposing = true, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
  }
  compositionupdate(t) {
    this._compositionView.textContent = t.data, this.updateCompositionElements(), setTimeout(() => {
      this._compositionPosition.end = this._textarea.value.length;
    }, 0);
  }
  compositionend() {
    this._finalizeComposition(true);
  }
  keydown(t) {
    if (this._isComposing || this._isSendingComposition) {
      if (t.keyCode === 20 || t.keyCode === 229 || t.keyCode === 16 || t.keyCode === 17 || t.keyCode === 18) return false;
      this._finalizeComposition(false);
    }
    return t.keyCode === 229 ? (this._handleAnyTextareaChanges(), false) : true;
  }
  _finalizeComposition(t) {
    if (this._compositionView.classList.remove("active"), this._isComposing = false, t) {
      let e = { start: this._compositionPosition.start, end: this._compositionPosition.end };
      this._isSendingComposition = true, setTimeout(() => {
        if (this._isSendingComposition) {
          this._isSendingComposition = false;
          let i;
          e.start += this._dataAlreadySent.length, this._isComposing ? i = this._textarea.value.substring(e.start, this._compositionPosition.start) : i = this._textarea.value.substring(e.start), i.length > 0 && this._coreService.triggerDataEvent(i, true);
        }
      }, 0);
    } else {
      this._isSendingComposition = false;
      let e = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
      this._coreService.triggerDataEvent(e, true);
    }
  }
  _handleAnyTextareaChanges() {
    let t = this._textarea.value;
    setTimeout(() => {
      if (!this._isComposing) {
        let e = this._textarea.value, i = e.replace(t, "");
        this._dataAlreadySent = i, e.length > t.length ? this._coreService.triggerDataEvent(i, true) : e.length < t.length ? this._coreService.triggerDataEvent(`${b.DEL}`, true) : e.length === t.length && e !== t && this._coreService.triggerDataEvent(e, true);
      }
    }, 0);
  }
  updateCompositionElements(t) {
    if (this._isComposing) {
      if (this._bufferService.buffer.isCursorInViewport) {
        let e = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), i = this._renderService.dimensions.css.cell.height, r = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, n = e * this._renderService.dimensions.css.cell.width;
        this._compositionView.style.left = n + "px", this._compositionView.style.top = r + "px", this._compositionView.style.height = i + "px", this._compositionView.style.lineHeight = i + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
        let o2 = this._compositionView.getBoundingClientRect();
        this._textarea.style.left = n + "px", this._textarea.style.top = r + "px", this._textarea.style.width = Math.max(o2.width, 1) + "px", this._textarea.style.height = Math.max(o2.height, 1) + "px", this._textarea.style.lineHeight = o2.height + "px";
      }
      t || setTimeout(() => this.updateCompositionElements(true), 0);
    }
  }
};
$t = M([S(2, F), S(3, H), S(4, ge), S(5, ce)], $t);
var ue = 0;
var he = 0;
var de = 0;
var J = 0;
var ps = { css: "#00000000", rgba: 0 };
var j;
((i) => {
  function s15(r, n, o2, l) {
    return l !== void 0 ? `#${vt(r)}${vt(n)}${vt(o2)}${vt(l)}` : `#${vt(r)}${vt(n)}${vt(o2)}`;
  }
  i.toCss = s15;
  function t(r, n, o2, l = 255) {
    return (r << 24 | n << 16 | o2 << 8 | l) >>> 0;
  }
  i.toRgba = t;
  function e(r, n, o2, l) {
    return { css: i.toCss(r, n, o2, l), rgba: i.toRgba(r, n, o2, l) };
  }
  i.toColor = e;
})(j || (j = {}));
var U;
((l) => {
  function s15(a, u) {
    if (J = (u.rgba & 255) / 255, J === 1) return { css: u.css, rgba: u.rgba };
    let h15 = u.rgba >> 24 & 255, c = u.rgba >> 16 & 255, d = u.rgba >> 8 & 255, _2 = a.rgba >> 24 & 255, p = a.rgba >> 16 & 255, m = a.rgba >> 8 & 255;
    ue = _2 + Math.round((h15 - _2) * J), he = p + Math.round((c - p) * J), de = m + Math.round((d - m) * J);
    let f = j.toCss(ue, he, de), A = j.toRgba(ue, he, de);
    return { css: f, rgba: A };
  }
  l.blend = s15;
  function t(a) {
    return (a.rgba & 255) === 255;
  }
  l.isOpaque = t;
  function e(a, u, h15) {
    let c = $r.ensureContrastRatio(a.rgba, u.rgba, h15);
    if (c) return j.toColor(c >> 24 & 255, c >> 16 & 255, c >> 8 & 255);
  }
  l.ensureContrastRatio = e;
  function i(a) {
    let u = (a.rgba | 255) >>> 0;
    return [ue, he, de] = $r.toChannels(u), { css: j.toCss(ue, he, de), rgba: u };
  }
  l.opaque = i;
  function r(a, u) {
    return J = Math.round(u * 255), [ue, he, de] = $r.toChannels(a.rgba), { css: j.toCss(ue, he, de, J), rgba: j.toRgba(ue, he, de, J) };
  }
  l.opacity = r;
  function n(a, u) {
    return J = a.rgba & 255, r(a, J * u / 255);
  }
  l.multiplyOpacity = n;
  function o2(a) {
    return [a.rgba >> 24 & 255, a.rgba >> 16 & 255, a.rgba >> 8 & 255];
  }
  l.toColorRGB = o2;
})(U || (U = {}));
var z;
((i) => {
  let s15, t;
  try {
    let r = document.createElement("canvas");
    r.width = 1, r.height = 1;
    let n = r.getContext("2d", { willReadFrequently: true });
    n && (s15 = n, s15.globalCompositeOperation = "copy", t = s15.createLinearGradient(0, 0, 1, 1));
  } catch {
  }
  function e(r) {
    if (r.match(/#[\da-f]{3,8}/i)) switch (r.length) {
      case 4:
        return ue = parseInt(r.slice(1, 2).repeat(2), 16), he = parseInt(r.slice(2, 3).repeat(2), 16), de = parseInt(r.slice(3, 4).repeat(2), 16), j.toColor(ue, he, de);
      case 5:
        return ue = parseInt(r.slice(1, 2).repeat(2), 16), he = parseInt(r.slice(2, 3).repeat(2), 16), de = parseInt(r.slice(3, 4).repeat(2), 16), J = parseInt(r.slice(4, 5).repeat(2), 16), j.toColor(ue, he, de, J);
      case 7:
        return { css: r, rgba: (parseInt(r.slice(1), 16) << 8 | 255) >>> 0 };
      case 9:
        return { css: r, rgba: parseInt(r.slice(1), 16) >>> 0 };
    }
    let n = r.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
    if (n) return ue = parseInt(n[1]), he = parseInt(n[2]), de = parseInt(n[3]), J = Math.round((n[5] === void 0 ? 1 : parseFloat(n[5])) * 255), j.toColor(ue, he, de, J);
    if (!s15 || !t) throw new Error("css.toColor: Unsupported css format");
    if (s15.fillStyle = t, s15.fillStyle = r, typeof s15.fillStyle != "string") throw new Error("css.toColor: Unsupported css format");
    if (s15.fillRect(0, 0, 1, 1), [ue, he, de, J] = s15.getImageData(0, 0, 1, 1).data, J !== 255) throw new Error("css.toColor: Unsupported css format");
    return { rgba: j.toRgba(ue, he, de, J), css: r };
  }
  i.toColor = e;
})(z || (z = {}));
var ve;
((e) => {
  function s15(i) {
    return t(i >> 16 & 255, i >> 8 & 255, i & 255);
  }
  e.relativeLuminance = s15;
  function t(i, r, n) {
    let o2 = i / 255, l = r / 255, a = n / 255, u = o2 <= 0.03928 ? o2 / 12.92 : Math.pow((o2 + 0.055) / 1.055, 2.4), h15 = l <= 0.03928 ? l / 12.92 : Math.pow((l + 0.055) / 1.055, 2.4), c = a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
    return u * 0.2126 + h15 * 0.7152 + c * 0.0722;
  }
  e.relativeLuminance2 = t;
})(ve || (ve = {}));
var $r;
((n) => {
  function s15(o2, l) {
    if (J = (l & 255) / 255, J === 1) return l;
    let a = l >> 24 & 255, u = l >> 16 & 255, h15 = l >> 8 & 255, c = o2 >> 24 & 255, d = o2 >> 16 & 255, _2 = o2 >> 8 & 255;
    return ue = c + Math.round((a - c) * J), he = d + Math.round((u - d) * J), de = _2 + Math.round((h15 - _2) * J), j.toRgba(ue, he, de);
  }
  n.blend = s15;
  function t(o2, l, a) {
    let u = ve.relativeLuminance(o2 >> 8), h15 = ve.relativeLuminance(l >> 8);
    if (Xe(u, h15) < a) {
      if (h15 < u) {
        let p = e(o2, l, a), m = Xe(u, ve.relativeLuminance(p >> 8));
        if (m < a) {
          let f = i(o2, l, a), A = Xe(u, ve.relativeLuminance(f >> 8));
          return m > A ? p : f;
        }
        return p;
      }
      let d = i(o2, l, a), _2 = Xe(u, ve.relativeLuminance(d >> 8));
      if (_2 < a) {
        let p = e(o2, l, a), m = Xe(u, ve.relativeLuminance(p >> 8));
        return _2 > m ? d : p;
      }
      return d;
    }
  }
  n.ensureContrastRatio = t;
  function e(o2, l, a) {
    let u = o2 >> 24 & 255, h15 = o2 >> 16 & 255, c = o2 >> 8 & 255, d = l >> 24 & 255, _2 = l >> 16 & 255, p = l >> 8 & 255, m = Xe(ve.relativeLuminance2(d, _2, p), ve.relativeLuminance2(u, h15, c));
    for (; m < a && (d > 0 || _2 > 0 || p > 0); ) d -= Math.max(0, Math.ceil(d * 0.1)), _2 -= Math.max(0, Math.ceil(_2 * 0.1)), p -= Math.max(0, Math.ceil(p * 0.1)), m = Xe(ve.relativeLuminance2(d, _2, p), ve.relativeLuminance2(u, h15, c));
    return (d << 24 | _2 << 16 | p << 8 | 255) >>> 0;
  }
  n.reduceLuminance = e;
  function i(o2, l, a) {
    let u = o2 >> 24 & 255, h15 = o2 >> 16 & 255, c = o2 >> 8 & 255, d = l >> 24 & 255, _2 = l >> 16 & 255, p = l >> 8 & 255, m = Xe(ve.relativeLuminance2(d, _2, p), ve.relativeLuminance2(u, h15, c));
    for (; m < a && (d < 255 || _2 < 255 || p < 255); ) d = Math.min(255, d + Math.ceil((255 - d) * 0.1)), _2 = Math.min(255, _2 + Math.ceil((255 - _2) * 0.1)), p = Math.min(255, p + Math.ceil((255 - p) * 0.1)), m = Xe(ve.relativeLuminance2(d, _2, p), ve.relativeLuminance2(u, h15, c));
    return (d << 24 | _2 << 16 | p << 8 | 255) >>> 0;
  }
  n.increaseLuminance = i;
  function r(o2) {
    return [o2 >> 24 & 255, o2 >> 16 & 255, o2 >> 8 & 255, o2 & 255];
  }
  n.toChannels = r;
})($r || ($r = {}));
function vt(s15) {
  let t = s15.toString(16);
  return t.length < 2 ? "0" + t : t;
}
function Xe(s15, t) {
  return s15 < t ? (t + 0.05) / (s15 + 0.05) : (s15 + 0.05) / (t + 0.05);
}
var Vr = class extends De {
  constructor(e, i, r) {
    super();
    this.content = 0;
    this.combinedData = "";
    this.fg = e.fg, this.bg = e.bg, this.combinedData = i, this._width = r;
  }
  isCombined() {
    return 2097152;
  }
  getWidth() {
    return this._width;
  }
  getChars() {
    return this.combinedData;
  }
  getCode() {
    return 2097151;
  }
  setFromCharData(e) {
    throw new Error("not implemented");
  }
  getAsCharData() {
    return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
  }
};
var ct = class {
  constructor(t) {
    this._bufferService = t;
    this._characterJoiners = [];
    this._nextCharacterJoinerId = 0;
    this._workCell = new q();
  }
  register(t) {
    let e = { id: this._nextCharacterJoinerId++, handler: t };
    return this._characterJoiners.push(e), e.id;
  }
  deregister(t) {
    for (let e = 0; e < this._characterJoiners.length; e++) if (this._characterJoiners[e].id === t) return this._characterJoiners.splice(e, 1), true;
    return false;
  }
  getJoinedCharacters(t) {
    if (this._characterJoiners.length === 0) return [];
    let e = this._bufferService.buffer.lines.get(t);
    if (!e || e.length === 0) return [];
    let i = [], r = e.translateToString(true), n = 0, o2 = 0, l = 0, a = e.getFg(0), u = e.getBg(0);
    for (let h15 = 0; h15 < e.getTrimmedLength(); h15++) if (e.loadCell(h15, this._workCell), this._workCell.getWidth() !== 0) {
      if (this._workCell.fg !== a || this._workCell.bg !== u) {
        if (h15 - n > 1) {
          let c = this._getJoinedRanges(r, l, o2, e, n);
          for (let d = 0; d < c.length; d++) i.push(c[d]);
        }
        n = h15, l = o2, a = this._workCell.fg, u = this._workCell.bg;
      }
      o2 += this._workCell.getChars().length || we.length;
    }
    if (this._bufferService.cols - n > 1) {
      let h15 = this._getJoinedRanges(r, l, o2, e, n);
      for (let c = 0; c < h15.length; c++) i.push(h15[c]);
    }
    return i;
  }
  _getJoinedRanges(t, e, i, r, n) {
    let o2 = t.substring(e, i), l = [];
    try {
      l = this._characterJoiners[0].handler(o2);
    } catch (a) {
      console.error(a);
    }
    for (let a = 1; a < this._characterJoiners.length; a++) try {
      let u = this._characterJoiners[a].handler(o2);
      for (let h15 = 0; h15 < u.length; h15++) ct._mergeRanges(l, u[h15]);
    } catch (u) {
      console.error(u);
    }
    return this._stringRangesToCellRanges(l, r, n), l;
  }
  _stringRangesToCellRanges(t, e, i) {
    let r = 0, n = false, o2 = 0, l = t[r];
    if (l) {
      for (let a = i; a < this._bufferService.cols; a++) {
        let u = e.getWidth(a), h15 = e.getString(a).length || we.length;
        if (u !== 0) {
          if (!n && l[0] <= o2 && (l[0] = a, n = true), l[1] <= o2) {
            if (l[1] = a, l = t[++r], !l) break;
            l[0] <= o2 ? (l[0] = a, n = true) : n = false;
          }
          o2 += h15;
        }
      }
      l && (l[1] = this._bufferService.cols);
    }
  }
  static _mergeRanges(t, e) {
    let i = false;
    for (let r = 0; r < t.length; r++) {
      let n = t[r];
      if (i) {
        if (e[1] <= n[0]) return t[r - 1][1] = e[1], t;
        if (e[1] <= n[1]) return t[r - 1][1] = Math.max(e[1], n[1]), t.splice(r, 1), t;
        t.splice(r, 1), r--;
      } else {
        if (e[1] <= n[0]) return t.splice(r, 0, e), t;
        if (e[1] <= n[1]) return n[0] = Math.min(e[0], n[0]), t;
        e[0] < n[1] && (n[0] = Math.min(e[0], n[0]), i = true);
        continue;
      }
    }
    return i ? t[t.length - 1][1] = e[1] : t.push(e), t;
  }
};
ct = M([S(0, F)], ct);
function Oa(s15) {
  return 57508 <= s15 && s15 <= 57558;
}
function Ba(s15) {
  return 9472 <= s15 && s15 <= 9631;
}
function $o(s15) {
  return Oa(s15) || Ba(s15);
}
function Vo() {
  return { css: { canvas: qr(), cell: qr() }, device: { canvas: qr(), cell: qr(), char: { width: 0, height: 0, left: 0, top: 0 } } };
}
function qr() {
  return { width: 0, height: 0 };
}
var Vt = class {
  constructor(t, e, i, r, n, o2, l) {
    this._document = t;
    this._characterJoinerService = e;
    this._optionsService = i;
    this._coreBrowserService = r;
    this._coreService = n;
    this._decorationService = o2;
    this._themeService = l;
    this._workCell = new q();
    this._columnSelectMode = false;
    this.defaultSpacing = 0;
  }
  handleSelectionChanged(t, e, i) {
    this._selectionStart = t, this._selectionEnd = e, this._columnSelectMode = i;
  }
  createRow(t, e, i, r, n, o2, l, a, u, h15, c) {
    let d = [], _2 = this._characterJoinerService.getJoinedCharacters(e), p = this._themeService.colors, m = t.getNoBgTrimmedLength();
    i && m < o2 + 1 && (m = o2 + 1);
    let f, A = 0, R = "", O = 0, I = 0, k = 0, P = 0, oe = false, Me = 0, Pe = false, Ke = 0, di = 0, V = [], Qe = h15 !== -1 && c !== -1;
    for (let y = 0; y < m; y++) {
      t.loadCell(y, this._workCell);
      let T = this._workCell.getWidth();
      if (T === 0) continue;
      let g = false, w = y >= di, E = y, x = this._workCell;
      if (_2.length > 0 && y === _2[0][0] && w) {
        let W = _2.shift(), An = this._isCellInSelection(W[0], e);
        for (O = W[0] + 1; O < W[1]; O++) w && (w = An === this._isCellInSelection(O, e));
        w && (w = !i || o2 < W[0] || o2 >= W[1]), w ? (g = true, x = new Vr(this._workCell, t.translateToString(true, W[0], W[1]), W[1] - W[0]), E = W[1] - 1, T = x.getWidth()) : di = W[1];
      }
      let N = this._isCellInSelection(y, e), Z = i && y === o2, te = Qe && y >= h15 && y <= c, Oe = false;
      this._decorationService.forEachDecorationAtCell(y, e, void 0, (W) => {
        Oe = true;
      });
      let ze = x.getChars() || we;
      if (ze === " " && (x.isUnderline() || x.isOverline()) && (ze = "\xA0"), Ke = T * a - u.get(ze, x.isBold(), x.isItalic()), !f) f = this._document.createElement("span");
      else if (A && (N && Pe || !N && !Pe && x.bg === I) && (N && Pe && p.selectionForeground || x.fg === k) && x.extended.ext === P && te === oe && Ke === Me && !Z && !g && !Oe && w) {
        x.isInvisible() ? R += we : R += ze, A++;
        continue;
      } else A && (f.textContent = R), f = this._document.createElement("span"), A = 0, R = "";
      if (I = x.bg, k = x.fg, P = x.extended.ext, oe = te, Me = Ke, Pe = N, g && o2 >= y && o2 <= E && (o2 = y), !this._coreService.isCursorHidden && Z && this._coreService.isCursorInitialized) {
        if (V.push("xterm-cursor"), this._coreBrowserService.isFocused) l && V.push("xterm-cursor-blink"), V.push(r === "bar" ? "xterm-cursor-bar" : r === "underline" ? "xterm-cursor-underline" : "xterm-cursor-block");
        else if (n) switch (n) {
          case "outline":
            V.push("xterm-cursor-outline");
            break;
          case "block":
            V.push("xterm-cursor-block");
            break;
          case "bar":
            V.push("xterm-cursor-bar");
            break;
          case "underline":
            V.push("xterm-cursor-underline");
            break;
          default:
            break;
        }
      }
      if (x.isBold() && V.push("xterm-bold"), x.isItalic() && V.push("xterm-italic"), x.isDim() && V.push("xterm-dim"), x.isInvisible() ? R = we : R = x.getChars() || we, x.isUnderline() && (V.push(`xterm-underline-${x.extended.underlineStyle}`), R === " " && (R = "\xA0"), !x.isUnderlineColorDefault())) if (x.isUnderlineColorRGB()) f.style.textDecorationColor = `rgb(${De.toColorRGB(x.getUnderlineColor()).join(",")})`;
      else {
        let W = x.getUnderlineColor();
        this._optionsService.rawOptions.drawBoldTextInBrightColors && x.isBold() && W < 8 && (W += 8), f.style.textDecorationColor = p.ansi[W].css;
      }
      x.isOverline() && (V.push("xterm-overline"), R === " " && (R = "\xA0")), x.isStrikethrough() && V.push("xterm-strikethrough"), te && (f.style.textDecoration = "underline");
      let le = x.getFgColor(), et = x.getFgColorMode(), me = x.getBgColor(), ht = x.getBgColorMode(), fi = !!x.isInverse();
      if (fi) {
        let W = le;
        le = me, me = W;
        let An = et;
        et = ht, ht = An;
      }
      let tt, Qi, pi = false;
      this._decorationService.forEachDecorationAtCell(y, e, void 0, (W) => {
        W.options.layer !== "top" && pi || (W.backgroundColorRGB && (ht = 50331648, me = W.backgroundColorRGB.rgba >> 8 & 16777215, tt = W.backgroundColorRGB), W.foregroundColorRGB && (et = 50331648, le = W.foregroundColorRGB.rgba >> 8 & 16777215, Qi = W.foregroundColorRGB), pi = W.options.layer === "top");
      }), !pi && N && (tt = this._coreBrowserService.isFocused ? p.selectionBackgroundOpaque : p.selectionInactiveBackgroundOpaque, me = tt.rgba >> 8 & 16777215, ht = 50331648, pi = true, p.selectionForeground && (et = 50331648, le = p.selectionForeground.rgba >> 8 & 16777215, Qi = p.selectionForeground)), pi && V.push("xterm-decoration-top");
      let it;
      switch (ht) {
        case 16777216:
        case 33554432:
          it = p.ansi[me], V.push(`xterm-bg-${me}`);
          break;
        case 50331648:
          it = j.toColor(me >> 16, me >> 8 & 255, me & 255), this._addStyle(f, `background-color:#${qo((me >>> 0).toString(16), "0", 6)}`);
          break;
        case 0:
        default:
          fi ? (it = p.foreground, V.push(`xterm-bg-${257}`)) : it = p.background;
      }
      switch (tt || x.isDim() && (tt = U.multiplyOpacity(it, 0.5)), et) {
        case 16777216:
        case 33554432:
          x.isBold() && le < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && (le += 8), this._applyMinimumContrast(f, it, p.ansi[le], x, tt, void 0) || V.push(`xterm-fg-${le}`);
          break;
        case 50331648:
          let W = j.toColor(le >> 16 & 255, le >> 8 & 255, le & 255);
          this._applyMinimumContrast(f, it, W, x, tt, Qi) || this._addStyle(f, `color:#${qo(le.toString(16), "0", 6)}`);
          break;
        case 0:
        default:
          this._applyMinimumContrast(f, it, p.foreground, x, tt, Qi) || fi && V.push(`xterm-fg-${257}`);
      }
      V.length && (f.className = V.join(" "), V.length = 0), !Z && !g && !Oe && w ? A++ : f.textContent = R, Ke !== this.defaultSpacing && (f.style.letterSpacing = `${Ke}px`), d.push(f), y = E;
    }
    return f && A && (f.textContent = R), d;
  }
  _applyMinimumContrast(t, e, i, r, n, o2) {
    if (this._optionsService.rawOptions.minimumContrastRatio === 1 || $o(r.getCode())) return false;
    let l = this._getContrastCache(r), a;
    if (!n && !o2 && (a = l.getColor(e.rgba, i.rgba)), a === void 0) {
      let u = this._optionsService.rawOptions.minimumContrastRatio / (r.isDim() ? 2 : 1);
      a = U.ensureContrastRatio(n || e, o2 || i, u), l.setColor((n || e).rgba, (o2 || i).rgba, a ?? null);
    }
    return a ? (this._addStyle(t, `color:${a.css}`), true) : false;
  }
  _getContrastCache(t) {
    return t.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
  }
  _addStyle(t, e) {
    t.setAttribute("style", `${t.getAttribute("style") || ""}${e};`);
  }
  _isCellInSelection(t, e) {
    let i = this._selectionStart, r = this._selectionEnd;
    return !i || !r ? false : this._columnSelectMode ? i[0] <= r[0] ? t >= i[0] && e >= i[1] && t < r[0] && e <= r[1] : t < i[0] && e >= i[1] && t >= r[0] && e <= r[1] : e > i[1] && e < r[1] || i[1] === r[1] && e === i[1] && t >= i[0] && t < r[0] || i[1] < r[1] && e === r[1] && t < r[0] || i[1] < r[1] && e === i[1] && t >= i[0];
  }
};
Vt = M([S(1, or), S(2, H), S(3, ae), S(4, ge), S(5, Be), S(6, Re)], Vt);
function qo(s15, t, e) {
  for (; s15.length < e; ) s15 = t + s15;
  return s15;
}
var Yr = class {
  constructor(t, e) {
    this._flat = new Float32Array(256);
    this._font = "";
    this._fontSize = 0;
    this._weight = "normal";
    this._weightBold = "bold";
    this._measureElements = [];
    this._container = t.createElement("div"), this._container.classList.add("xterm-width-cache-measure-container"), this._container.setAttribute("aria-hidden", "true"), this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
    let i = t.createElement("span");
    i.classList.add("xterm-char-measure-element");
    let r = t.createElement("span");
    r.classList.add("xterm-char-measure-element"), r.style.fontWeight = "bold";
    let n = t.createElement("span");
    n.classList.add("xterm-char-measure-element"), n.style.fontStyle = "italic";
    let o2 = t.createElement("span");
    o2.classList.add("xterm-char-measure-element"), o2.style.fontWeight = "bold", o2.style.fontStyle = "italic", this._measureElements = [i, r, n, o2], this._container.appendChild(i), this._container.appendChild(r), this._container.appendChild(n), this._container.appendChild(o2), e.appendChild(this._container), this.clear();
  }
  dispose() {
    this._container.remove(), this._measureElements.length = 0, this._holey = void 0;
  }
  clear() {
    this._flat.fill(-9999), this._holey = /* @__PURE__ */ new Map();
  }
  setFont(t, e, i, r) {
    t === this._font && e === this._fontSize && i === this._weight && r === this._weightBold || (this._font = t, this._fontSize = e, this._weight = i, this._weightBold = r, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${i}`, this._measureElements[1].style.fontWeight = `${r}`, this._measureElements[2].style.fontWeight = `${i}`, this._measureElements[3].style.fontWeight = `${r}`, this.clear());
  }
  get(t, e, i) {
    let r = 0;
    if (!e && !i && t.length === 1 && (r = t.charCodeAt(0)) < 256) {
      if (this._flat[r] !== -9999) return this._flat[r];
      let l = this._measure(t, 0);
      return l > 0 && (this._flat[r] = l), l;
    }
    let n = t;
    e && (n += "B"), i && (n += "I");
    let o2 = this._holey.get(n);
    if (o2 === void 0) {
      let l = 0;
      e && (l |= 1), i && (l |= 2), o2 = this._measure(t, l), o2 > 0 && this._holey.set(n, o2);
    }
    return o2;
  }
  _measure(t, e) {
    let i = this._measureElements[e];
    return i.textContent = t.repeat(32), i.offsetWidth / 32;
  }
};
var ms = class {
  constructor() {
    this.clear();
  }
  clear() {
    this.hasSelection = false, this.columnSelectMode = false, this.viewportStartRow = 0, this.viewportEndRow = 0, this.viewportCappedStartRow = 0, this.viewportCappedEndRow = 0, this.startCol = 0, this.endCol = 0, this.selectionStart = void 0, this.selectionEnd = void 0;
  }
  update(t, e, i, r = false) {
    if (this.selectionStart = e, this.selectionEnd = i, !e || !i || e[0] === i[0] && e[1] === i[1]) {
      this.clear();
      return;
    }
    let n = t.buffers.active.ydisp, o2 = e[1] - n, l = i[1] - n, a = Math.max(o2, 0), u = Math.min(l, t.rows - 1);
    if (a >= t.rows || u < 0) {
      this.clear();
      return;
    }
    this.hasSelection = true, this.columnSelectMode = r, this.viewportStartRow = o2, this.viewportEndRow = l, this.viewportCappedStartRow = a, this.viewportCappedEndRow = u, this.startCol = e[0], this.endCol = i[0];
  }
  isCellSelected(t, e, i) {
    return this.hasSelection ? (i -= t.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? e >= this.startCol && i >= this.viewportCappedStartRow && e < this.endCol && i <= this.viewportCappedEndRow : e < this.startCol && i >= this.viewportCappedStartRow && e >= this.endCol && i <= this.viewportCappedEndRow : i > this.viewportStartRow && i < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && i === this.viewportStartRow && e >= this.startCol && e < this.endCol || this.viewportStartRow < this.viewportEndRow && i === this.viewportEndRow && e < this.endCol || this.viewportStartRow < this.viewportEndRow && i === this.viewportStartRow && e >= this.startCol) : false;
  }
};
function Yo() {
  return new ms();
}
var _s = "xterm-dom-renderer-owner-";
var Le = "xterm-rows";
var jr = "xterm-fg-";
var jo = "xterm-bg-";
var ki = "xterm-focus";
var Xr = "xterm-selection";
var Na = 1;
var Yt = class extends D {
  constructor(e, i, r, n, o2, l, a, u, h15, c, d, _2, p, m) {
    super();
    this._terminal = e;
    this._document = i;
    this._element = r;
    this._screenElement = n;
    this._viewportElement = o2;
    this._helperContainer = l;
    this._linkifier2 = a;
    this._charSizeService = h15;
    this._optionsService = c;
    this._bufferService = d;
    this._coreService = _2;
    this._coreBrowserService = p;
    this._themeService = m;
    this._terminalClass = Na++;
    this._rowElements = [];
    this._selectionRenderModel = Yo();
    this.onRequestRedraw = this._register(new v()).event;
    this._rowContainer = this._document.createElement("div"), this._rowContainer.classList.add(Le), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = this._document.createElement("div"), this._selectionContainer.classList.add(Xr), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = Vo(), this._updateDimensions(), this._register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this._register(this._themeService.onChangeColors((f) => this._injectCss(f))), this._injectCss(this._themeService.colors), this._rowFactory = u.createInstance(Vt, document), this._element.classList.add(_s + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this._register(this._linkifier2.onShowLinkUnderline((f) => this._handleLinkHover(f))), this._register(this._linkifier2.onHideLinkUnderline((f) => this._handleLinkLeave(f))), this._register(C(() => {
      this._element.classList.remove(_s + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
    })), this._widthCache = new Yr(this._document, this._helperContainer), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
  }
  _updateDimensions() {
    let e = this._coreBrowserService.dpr;
    this.dimensions.device.char.width = this._charSizeService.width * e, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * e), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / e), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / e), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
    for (let r of this._rowElements) r.style.width = `${this.dimensions.css.canvas.width}px`, r.style.height = `${this.dimensions.css.cell.height}px`, r.style.lineHeight = `${this.dimensions.css.cell.height}px`, r.style.overflow = "hidden";
    this._dimensionsStyleElement || (this._dimensionsStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
    let i = `${this._terminalSelector} .${Le} span { display: inline-block; height: 100%; vertical-align: top;}`;
    this._dimensionsStyleElement.textContent = i, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
  }
  _injectCss(e) {
    this._themeStyleElement || (this._themeStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
    let i = `${this._terminalSelector} .${Le} { pointer-events: none; color: ${e.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
    i += `${this._terminalSelector} .${Le} .xterm-dim { color: ${U.multiplyOpacity(e.foreground, 0.5).css};}`, i += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;
    let r = `blink_underline_${this._terminalClass}`, n = `blink_bar_${this._terminalClass}`, o2 = `blink_block_${this._terminalClass}`;
    i += `@keyframes ${r} { 50% {  border-bottom-style: hidden; }}`, i += `@keyframes ${n} { 50% {  box-shadow: none; }}`, i += `@keyframes ${o2} { 0% {  background-color: ${e.cursor.css};  color: ${e.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${e.cursor.css}; }}`, i += `${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${r} 1s step-end infinite;}${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${n} 1s step-end infinite;}${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${o2} 1s step-end infinite;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-block { background-color: ${e.cursor.css}; color: ${e.cursorAccent.css};}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${e.cursor.css} !important; color: ${e.cursorAccent.css} !important;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${e.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e.cursor.css} inset;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${e.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, i += `${this._terminalSelector} .${Xr} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${Xr} div { position: absolute; background-color: ${e.selectionBackgroundOpaque.css};}${this._terminalSelector} .${Xr} div { position: absolute; background-color: ${e.selectionInactiveBackgroundOpaque.css};}`;
    for (let [l, a] of e.ansi.entries()) i += `${this._terminalSelector} .${jr}${l} { color: ${a.css}; }${this._terminalSelector} .${jr}${l}.xterm-dim { color: ${U.multiplyOpacity(a, 0.5).css}; }${this._terminalSelector} .${jo}${l} { background-color: ${a.css}; }`;
    i += `${this._terminalSelector} .${jr}${257} { color: ${U.opaque(e.background).css}; }${this._terminalSelector} .${jr}${257}.xterm-dim { color: ${U.multiplyOpacity(U.opaque(e.background), 0.5).css}; }${this._terminalSelector} .${jo}${257} { background-color: ${e.foreground.css}; }`, this._themeStyleElement.textContent = i;
  }
  _setDefaultSpacing() {
    let e = this.dimensions.css.cell.width - this._widthCache.get("W", false, false);
    this._rowContainer.style.letterSpacing = `${e}px`, this._rowFactory.defaultSpacing = e;
  }
  handleDevicePixelRatioChange() {
    this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
  }
  _refreshRowElements(e, i) {
    for (let r = this._rowElements.length; r <= i; r++) {
      let n = this._document.createElement("div");
      this._rowContainer.appendChild(n), this._rowElements.push(n);
    }
    for (; this._rowElements.length > i; ) this._rowContainer.removeChild(this._rowElements.pop());
  }
  handleResize(e, i) {
    this._refreshRowElements(e, i), this._updateDimensions(), this.handleSelectionChanged(this._selectionRenderModel.selectionStart, this._selectionRenderModel.selectionEnd, this._selectionRenderModel.columnSelectMode);
  }
  handleCharSizeChanged() {
    this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
  }
  handleBlur() {
    this._rowContainer.classList.remove(ki), this.renderRows(0, this._bufferService.rows - 1);
  }
  handleFocus() {
    this._rowContainer.classList.add(ki), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
  }
  handleSelectionChanged(e, i, r) {
    if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(e, i, r), this.renderRows(0, this._bufferService.rows - 1), !e || !i || (this._selectionRenderModel.update(this._terminal, e, i, r), !this._selectionRenderModel.hasSelection)) return;
    let n = this._selectionRenderModel.viewportStartRow, o2 = this._selectionRenderModel.viewportEndRow, l = this._selectionRenderModel.viewportCappedStartRow, a = this._selectionRenderModel.viewportCappedEndRow, u = this._document.createDocumentFragment();
    if (r) {
      let h15 = e[0] > i[0];
      u.appendChild(this._createSelectionElement(l, h15 ? i[0] : e[0], h15 ? e[0] : i[0], a - l + 1));
    } else {
      let h15 = n === l ? e[0] : 0, c = l === o2 ? i[0] : this._bufferService.cols;
      u.appendChild(this._createSelectionElement(l, h15, c));
      let d = a - l - 1;
      if (u.appendChild(this._createSelectionElement(l + 1, 0, this._bufferService.cols, d)), l !== a) {
        let _2 = o2 === a ? i[0] : this._bufferService.cols;
        u.appendChild(this._createSelectionElement(a, 0, _2));
      }
    }
    this._selectionContainer.appendChild(u);
  }
  _createSelectionElement(e, i, r, n = 1) {
    let o2 = this._document.createElement("div"), l = i * this.dimensions.css.cell.width, a = this.dimensions.css.cell.width * (r - i);
    return l + a > this.dimensions.css.canvas.width && (a = this.dimensions.css.canvas.width - l), o2.style.height = `${n * this.dimensions.css.cell.height}px`, o2.style.top = `${e * this.dimensions.css.cell.height}px`, o2.style.left = `${l}px`, o2.style.width = `${a}px`, o2;
  }
  handleCursorMove() {
  }
  _handleOptionsChanged() {
    this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
  }
  clear() {
    for (let e of this._rowElements) e.replaceChildren();
  }
  renderRows(e, i) {
    let r = this._bufferService.buffer, n = r.ybase + r.y, o2 = Math.min(r.x, this._bufferService.cols - 1), l = this._coreService.decPrivateModes.cursorBlink ?? this._optionsService.rawOptions.cursorBlink, a = this._coreService.decPrivateModes.cursorStyle ?? this._optionsService.rawOptions.cursorStyle, u = this._optionsService.rawOptions.cursorInactiveStyle;
    for (let h15 = e; h15 <= i; h15++) {
      let c = h15 + r.ydisp, d = this._rowElements[h15], _2 = r.lines.get(c);
      if (!d || !_2) break;
      d.replaceChildren(...this._rowFactory.createRow(_2, c, c === n, a, u, o2, l, this.dimensions.css.cell.width, this._widthCache, -1, -1));
    }
  }
  get _terminalSelector() {
    return `.${_s}${this._terminalClass}`;
  }
  _handleLinkHover(e) {
    this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, true);
  }
  _handleLinkLeave(e) {
    this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, false);
  }
  _setCellUnderline(e, i, r, n, o2, l) {
    r < 0 && (e = 0), n < 0 && (i = 0);
    let a = this._bufferService.rows - 1;
    r = Math.max(Math.min(r, a), 0), n = Math.max(Math.min(n, a), 0), o2 = Math.min(o2, this._bufferService.cols);
    let u = this._bufferService.buffer, h15 = u.ybase + u.y, c = Math.min(u.x, o2 - 1), d = this._optionsService.rawOptions.cursorBlink, _2 = this._optionsService.rawOptions.cursorStyle, p = this._optionsService.rawOptions.cursorInactiveStyle;
    for (let m = r; m <= n; ++m) {
      let f = m + u.ydisp, A = this._rowElements[m], R = u.lines.get(f);
      if (!A || !R) break;
      A.replaceChildren(...this._rowFactory.createRow(R, f, f === h15, _2, p, c, d, this.dimensions.css.cell.width, this._widthCache, l ? m === r ? e : 0 : -1, l ? (m === n ? i : o2) - 1 : -1));
    }
  }
};
Yt = M([S(7, xt), S(8, nt), S(9, H), S(10, F), S(11, ge), S(12, ae), S(13, Re)], Yt);
var jt = class extends D {
  constructor(e, i, r) {
    super();
    this._optionsService = r;
    this.width = 0;
    this.height = 0;
    this._onCharSizeChange = this._register(new v());
    this.onCharSizeChange = this._onCharSizeChange.event;
    try {
      this._measureStrategy = this._register(new vs(this._optionsService));
    } catch {
      this._measureStrategy = this._register(new bs(e, i, this._optionsService));
    }
    this._register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], () => this.measure()));
  }
  get hasValidSize() {
    return this.width > 0 && this.height > 0;
  }
  measure() {
    let e = this._measureStrategy.measure();
    (e.width !== this.width || e.height !== this.height) && (this.width = e.width, this.height = e.height, this._onCharSizeChange.fire());
  }
};
jt = M([S(2, H)], jt);
var Zr = class extends D {
  constructor() {
    super(...arguments);
    this._result = { width: 0, height: 0 };
  }
  _validateAndSet(e, i) {
    e !== void 0 && e > 0 && i !== void 0 && i > 0 && (this._result.width = e, this._result.height = i);
  }
};
var bs = class extends Zr {
  constructor(e, i, r) {
    super();
    this._document = e;
    this._parentElement = i;
    this._optionsService = r;
    this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
  }
  measure() {
    return this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`, this._validateAndSet(Number(this._measureElement.offsetWidth) / 32, Number(this._measureElement.offsetHeight)), this._result;
  }
};
var vs = class extends Zr {
  constructor(e) {
    super();
    this._optionsService = e;
    this._canvas = new OffscreenCanvas(100, 100), this._ctx = this._canvas.getContext("2d");
    let i = this._ctx.measureText("W");
    if (!("width" in i && "fontBoundingBoxAscent" in i && "fontBoundingBoxDescent" in i)) throw new Error("Required font metrics not supported");
  }
  measure() {
    this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
    let e = this._ctx.measureText("W");
    return this._validateAndSet(e.width, e.fontBoundingBoxAscent + e.fontBoundingBoxDescent), this._result;
  }
};
var Jr = class extends D {
  constructor(e, i, r) {
    super();
    this._textarea = e;
    this._window = i;
    this.mainDocument = r;
    this._isFocused = false;
    this._cachedIsFocused = void 0;
    this._screenDprMonitor = this._register(new gs(this._window));
    this._onDprChange = this._register(new v());
    this.onDprChange = this._onDprChange.event;
    this._onWindowChange = this._register(new v());
    this.onWindowChange = this._onWindowChange.event;
    this._register(this.onWindowChange((n) => this._screenDprMonitor.setWindow(n))), this._register($.forward(this._screenDprMonitor.onDprChange, this._onDprChange)), this._register(L(this._textarea, "focus", () => this._isFocused = true)), this._register(L(this._textarea, "blur", () => this._isFocused = false));
  }
  get window() {
    return this._window;
  }
  set window(e) {
    this._window !== e && (this._window = e, this._onWindowChange.fire(this._window));
  }
  get dpr() {
    return this.window.devicePixelRatio;
  }
  get isFocused() {
    return this._cachedIsFocused === void 0 && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask(() => this._cachedIsFocused = void 0)), this._cachedIsFocused;
  }
};
var gs = class extends D {
  constructor(e) {
    super();
    this._parentWindow = e;
    this._windowResizeListener = this._register(new ye());
    this._onDprChange = this._register(new v());
    this.onDprChange = this._onDprChange.event;
    this._outerListener = () => this._setDprAndFireIfDiffers(), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._updateDpr(), this._setWindowResizeListener(), this._register(C(() => this.clearListener()));
  }
  setWindow(e) {
    this._parentWindow = e, this._setWindowResizeListener(), this._setDprAndFireIfDiffers();
  }
  _setWindowResizeListener() {
    this._windowResizeListener.value = L(this._parentWindow, "resize", () => this._setDprAndFireIfDiffers());
  }
  _setDprAndFireIfDiffers() {
    this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio && this._onDprChange.fire(this._parentWindow.devicePixelRatio), this._updateDpr();
  }
  _updateDpr() {
    this._outerListener && (this._resolutionMediaMatchList?.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
  }
  clearListener() {
    !this._resolutionMediaMatchList || !this._outerListener || (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._outerListener = void 0);
  }
};
var Qr = class extends D {
  constructor() {
    super();
    this.linkProviders = [];
    this._register(C(() => this.linkProviders.length = 0));
  }
  registerLinkProvider(e) {
    return this.linkProviders.push(e), { dispose: () => {
      let i = this.linkProviders.indexOf(e);
      i !== -1 && this.linkProviders.splice(i, 1);
    } };
  }
};
function Ci(s15, t, e) {
  let i = e.getBoundingClientRect(), r = s15.getComputedStyle(e), n = parseInt(r.getPropertyValue("padding-left")), o2 = parseInt(r.getPropertyValue("padding-top"));
  return [t.clientX - i.left - n, t.clientY - i.top - o2];
}
function Xo(s15, t, e, i, r, n, o2, l, a) {
  if (!n) return;
  let u = Ci(s15, t, e);
  if (u) return u[0] = Math.ceil((u[0] + (a ? o2 / 2 : 0)) / o2), u[1] = Math.ceil(u[1] / l), u[0] = Math.min(Math.max(u[0], 1), i + (a ? 1 : 0)), u[1] = Math.min(Math.max(u[1], 1), r), u;
}
var Xt = class {
  constructor(t, e) {
    this._renderService = t;
    this._charSizeService = e;
  }
  getCoords(t, e, i, r, n) {
    return Xo(window, t, e, i, r, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, n);
  }
  getMouseReportCoords(t, e) {
    let i = Ci(window, t, e);
    if (this._charSizeService.hasValidSize) return i[0] = Math.min(Math.max(i[0], 0), this._renderService.dimensions.css.canvas.width - 1), i[1] = Math.min(Math.max(i[1], 0), this._renderService.dimensions.css.canvas.height - 1), { col: Math.floor(i[0] / this._renderService.dimensions.css.cell.width), row: Math.floor(i[1] / this._renderService.dimensions.css.cell.height), x: Math.floor(i[0]), y: Math.floor(i[1]) };
  }
};
Xt = M([S(0, ce), S(1, nt)], Xt);
var en = class {
  constructor(t, e) {
    this._renderCallback = t;
    this._coreBrowserService = e;
    this._refreshCallbacks = [];
  }
  dispose() {
    this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
  }
  addRefreshCallback(t) {
    return this._refreshCallbacks.push(t), this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh())), this._animationFrame;
  }
  refresh(t, e, i) {
    this._rowCount = i, t = t !== void 0 ? t : 0, e = e !== void 0 ? e : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, t) : t, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, e) : e, !this._animationFrame && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
  }
  _innerRefresh() {
    if (this._animationFrame = void 0, this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) {
      this._runRefreshCallbacks();
      return;
    }
    let t = Math.max(this._rowStart, 0), e = Math.min(this._rowEnd, this._rowCount - 1);
    this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(t, e), this._runRefreshCallbacks();
  }
  _runRefreshCallbacks() {
    for (let t of this._refreshCallbacks) t(0);
    this._refreshCallbacks = [];
  }
};
var tn = {};
Ll(tn, { getSafariVersion: () => Ha, isChromeOS: () => Ts, isFirefox: () => Ss, isIpad: () => Wa, isIphone: () => Ua, isLegacyEdge: () => Fa, isLinux: () => Bi, isMac: () => Zt, isNode: () => Mi, isSafari: () => Zo, isWindows: () => Es });
var Mi = typeof process < "u" && "title" in process;
var Pi = Mi ? "node" : navigator.userAgent;
var Oi = Mi ? "node" : navigator.platform;
var Ss = Pi.includes("Firefox");
var Fa = Pi.includes("Edge");
var Zo = /^((?!chrome|android).)*safari/i.test(Pi);
function Ha() {
  if (!Zo) return 0;
  let s15 = Pi.match(/Version\/(\d+)/);
  return s15 === null || s15.length < 2 ? 0 : parseInt(s15[1]);
}
var Zt = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(Oi);
var Wa = Oi === "iPad";
var Ua = Oi === "iPhone";
var Es = ["Windows", "Win16", "Win32", "WinCE"].includes(Oi);
var Bi = Oi.indexOf("Linux") >= 0;
var Ts = /\bCrOS\b/.test(Pi);
var rn = class {
  constructor() {
    this._tasks = [];
    this._i = 0;
  }
  enqueue(t) {
    this._tasks.push(t), this._start();
  }
  flush() {
    for (; this._i < this._tasks.length; ) this._tasks[this._i]() || this._i++;
    this.clear();
  }
  clear() {
    this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
  }
  _start() {
    this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
  }
  _process(t) {
    this._idleCallback = void 0;
    let e = 0, i = 0, r = t.timeRemaining(), n = 0;
    for (; this._i < this._tasks.length; ) {
      if (e = performance.now(), this._tasks[this._i]() || this._i++, e = Math.max(1, performance.now() - e), i = Math.max(e, i), n = t.timeRemaining(), i * 1.5 > n) {
        r - e < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(r - e))}ms`), this._start();
        return;
      }
      r = n;
    }
    this.clear();
  }
};
var Is = class extends rn {
  _requestCallback(t) {
    return setTimeout(() => t(this._createDeadline(16)));
  }
  _cancelCallback(t) {
    clearTimeout(t);
  }
  _createDeadline(t) {
    let e = performance.now() + t;
    return { timeRemaining: () => Math.max(0, e - performance.now()) };
  }
};
var ys = class extends rn {
  _requestCallback(t) {
    return requestIdleCallback(t);
  }
  _cancelCallback(t) {
    cancelIdleCallback(t);
  }
};
var Jt = !Mi && "requestIdleCallback" in window ? ys : Is;
var nn = class {
  constructor() {
    this._queue = new Jt();
  }
  set(t) {
    this._queue.clear(), this._queue.enqueue(t);
  }
  flush() {
    this._queue.flush();
  }
};
var Qt = class extends D {
  constructor(e, i, r, n, o2, l, a, u, h15) {
    super();
    this._rowCount = e;
    this._optionsService = r;
    this._charSizeService = n;
    this._coreService = o2;
    this._coreBrowserService = u;
    this._renderer = this._register(new ye());
    this._pausedResizeTask = new nn();
    this._observerDisposable = this._register(new ye());
    this._isPaused = false;
    this._needsFullRefresh = false;
    this._isNextRenderRedrawOnly = true;
    this._needsSelectionRefresh = false;
    this._canvasWidth = 0;
    this._canvasHeight = 0;
    this._selectionState = { start: void 0, end: void 0, columnSelectMode: false };
    this._onDimensionsChange = this._register(new v());
    this.onDimensionsChange = this._onDimensionsChange.event;
    this._onRenderedViewportChange = this._register(new v());
    this.onRenderedViewportChange = this._onRenderedViewportChange.event;
    this._onRender = this._register(new v());
    this.onRender = this._onRender.event;
    this._onRefreshRequest = this._register(new v());
    this.onRefreshRequest = this._onRefreshRequest.event;
    this._renderDebouncer = new en((c, d) => this._renderRows(c, d), this._coreBrowserService), this._register(this._renderDebouncer), this._syncOutputHandler = new xs(this._coreBrowserService, this._coreService, () => this._fullRefresh()), this._register(C(() => this._syncOutputHandler.dispose())), this._register(this._coreBrowserService.onDprChange(() => this.handleDevicePixelRatioChange())), this._register(a.onResize(() => this._fullRefresh())), this._register(a.buffers.onBufferActivate(() => this._renderer.value?.clear())), this._register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this._register(this._charSizeService.onCharSizeChange(() => this.handleCharSizeChanged())), this._register(l.onDecorationRegistered(() => this._fullRefresh())), this._register(l.onDecorationRemoved(() => this._fullRefresh())), this._register(this._optionsService.onMultipleOptionChange(["customGlyphs", "drawBoldTextInBrightColors", "letterSpacing", "lineHeight", "fontFamily", "fontSize", "fontWeight", "fontWeightBold", "minimumContrastRatio", "rescaleOverlappingGlyphs"], () => {
      this.clear(), this.handleResize(a.cols, a.rows), this._fullRefresh();
    })), this._register(this._optionsService.onMultipleOptionChange(["cursorBlink", "cursorStyle"], () => this.refreshRows(a.buffer.y, a.buffer.y, true))), this._register(h15.onChangeColors(() => this._fullRefresh())), this._registerIntersectionObserver(this._coreBrowserService.window, i), this._register(this._coreBrowserService.onWindowChange((c) => this._registerIntersectionObserver(c, i)));
  }
  get dimensions() {
    return this._renderer.value.dimensions;
  }
  _registerIntersectionObserver(e, i) {
    if ("IntersectionObserver" in e) {
      let r = new e.IntersectionObserver((n) => this._handleIntersectionChange(n[n.length - 1]), { threshold: 0 });
      r.observe(i), this._observerDisposable.value = C(() => r.disconnect());
    }
  }
  _handleIntersectionChange(e) {
    this._isPaused = e.isIntersecting === void 0 ? e.intersectionRatio === 0 : !e.isIntersecting, !this._isPaused && !this._charSizeService.hasValidSize && this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = false);
  }
  refreshRows(e, i, r = false) {
    if (this._isPaused) {
      this._needsFullRefresh = true;
      return;
    }
    if (this._coreService.decPrivateModes.synchronizedOutput) {
      this._syncOutputHandler.bufferRows(e, i);
      return;
    }
    let n = this._syncOutputHandler.flush();
    n && (e = Math.min(e, n.start), i = Math.max(i, n.end)), r || (this._isNextRenderRedrawOnly = false), this._renderDebouncer.refresh(e, i, this._rowCount);
  }
  _renderRows(e, i) {
    if (this._renderer.value) {
      if (this._coreService.decPrivateModes.synchronizedOutput) {
        this._syncOutputHandler.bufferRows(e, i);
        return;
      }
      e = Math.min(e, this._rowCount - 1), i = Math.min(i, this._rowCount - 1), this._renderer.value.renderRows(e, i), this._needsSelectionRefresh && (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = false), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({ start: e, end: i }), this._onRender.fire({ start: e, end: i }), this._isNextRenderRedrawOnly = true;
    }
  }
  resize(e, i) {
    this._rowCount = i, this._fireOnCanvasResize();
  }
  _handleOptionsChanged() {
    this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
  }
  _fireOnCanvasResize() {
    this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
  }
  hasRenderer() {
    return !!this._renderer.value;
  }
  setRenderer(e) {
    this._renderer.value = e, this._renderer.value && (this._renderer.value.onRequestRedraw((i) => this.refreshRows(i.start, i.end, true)), this._needsSelectionRefresh = true, this._fullRefresh());
  }
  addRefreshCallback(e) {
    return this._renderDebouncer.addRefreshCallback(e);
  }
  _fullRefresh() {
    this._isPaused ? this._needsFullRefresh = true : this.refreshRows(0, this._rowCount - 1);
  }
  clearTextureAtlas() {
    this._renderer.value && (this._renderer.value.clearTextureAtlas?.(), this._fullRefresh());
  }
  handleDevicePixelRatioChange() {
    this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
  }
  handleResize(e, i) {
    this._renderer.value && (this._isPaused ? this._pausedResizeTask.set(() => this._renderer.value?.handleResize(e, i)) : this._renderer.value.handleResize(e, i), this._fullRefresh());
  }
  handleCharSizeChanged() {
    this._renderer.value?.handleCharSizeChanged();
  }
  handleBlur() {
    this._renderer.value?.handleBlur();
  }
  handleFocus() {
    this._renderer.value?.handleFocus();
  }
  handleSelectionChanged(e, i, r) {
    this._selectionState.start = e, this._selectionState.end = i, this._selectionState.columnSelectMode = r, this._renderer.value?.handleSelectionChanged(e, i, r);
  }
  handleCursorMove() {
    this._renderer.value?.handleCursorMove();
  }
  clear() {
    this._renderer.value?.clear();
  }
};
Qt = M([S(2, H), S(3, nt), S(4, ge), S(5, Be), S(6, F), S(7, ae), S(8, Re)], Qt);
var xs = class {
  constructor(t, e, i) {
    this._coreBrowserService = t;
    this._coreService = e;
    this._onTimeout = i;
    this._start = 0;
    this._end = 0;
    this._isBuffering = false;
  }
  bufferRows(t, e) {
    this._isBuffering ? (this._start = Math.min(this._start, t), this._end = Math.max(this._end, e)) : (this._start = t, this._end = e, this._isBuffering = true), this._timeout === void 0 && (this._timeout = this._coreBrowserService.window.setTimeout(() => {
      this._timeout = void 0, this._coreService.decPrivateModes.synchronizedOutput = false, this._onTimeout();
    }, 1e3));
  }
  flush() {
    if (this._timeout !== void 0 && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0), !this._isBuffering) return;
    let t = { start: this._start, end: this._end };
    return this._isBuffering = false, t;
  }
  dispose() {
    this._timeout !== void 0 && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0);
  }
};
function Jo(s15, t, e, i) {
  let r = e.buffer.x, n = e.buffer.y;
  if (!e.buffer.hasScrollback) return Ga(r, n, s15, t, e, i) + sn(n, t, e, i) + $a(r, n, s15, t, e, i);
  let o2;
  if (n === t) return o2 = r > s15 ? "D" : "C", Fi(Math.abs(r - s15), Ni(o2, i));
  o2 = n > t ? "D" : "C";
  let l = Math.abs(n - t), a = za(n > t ? s15 : r, e) + (l - 1) * e.cols + 1 + Ka(n > t ? r : s15, e);
  return Fi(a, Ni(o2, i));
}
function Ka(s15, t) {
  return s15 - 1;
}
function za(s15, t) {
  return t.cols - s15;
}
function Ga(s15, t, e, i, r, n) {
  return sn(t, i, r, n).length === 0 ? "" : Fi(el(s15, t, s15, t - gt(t, r), false, r).length, Ni("D", n));
}
function sn(s15, t, e, i) {
  let r = s15 - gt(s15, e), n = t - gt(t, e), o2 = Math.abs(r - n) - Va(s15, t, e);
  return Fi(o2, Ni(Qo(s15, t), i));
}
function $a(s15, t, e, i, r, n) {
  let o2;
  sn(t, i, r, n).length > 0 ? o2 = i - gt(i, r) : o2 = t;
  let l = i, a = qa(s15, t, e, i, r, n);
  return Fi(el(s15, o2, e, l, a === "C", r).length, Ni(a, n));
}
function Va(s15, t, e) {
  let i = 0, r = s15 - gt(s15, e), n = t - gt(t, e);
  for (let o2 = 0; o2 < Math.abs(r - n); o2++) {
    let l = Qo(s15, t) === "A" ? -1 : 1;
    e.buffer.lines.get(r + l * o2)?.isWrapped && i++;
  }
  return i;
}
function gt(s15, t) {
  let e = 0, i = t.buffer.lines.get(s15), r = i?.isWrapped;
  for (; r && s15 >= 0 && s15 < t.rows; ) e++, i = t.buffer.lines.get(--s15), r = i?.isWrapped;
  return e;
}
function qa(s15, t, e, i, r, n) {
  let o2;
  return sn(e, i, r, n).length > 0 ? o2 = i - gt(i, r) : o2 = t, s15 < e && o2 <= i || s15 >= e && o2 < i ? "C" : "D";
}
function Qo(s15, t) {
  return s15 > t ? "A" : "B";
}
function el(s15, t, e, i, r, n) {
  let o2 = s15, l = t, a = "";
  for (; (o2 !== e || l !== i) && l >= 0 && l < n.buffer.lines.length; ) o2 += r ? 1 : -1, r && o2 > n.cols - 1 ? (a += n.buffer.translateBufferLineToString(l, false, s15, o2), o2 = 0, s15 = 0, l++) : !r && o2 < 0 && (a += n.buffer.translateBufferLineToString(l, false, 0, s15 + 1), o2 = n.cols - 1, s15 = o2, l--);
  return a + n.buffer.translateBufferLineToString(l, false, s15, o2);
}
function Ni(s15, t) {
  let e = t ? "O" : "[";
  return b.ESC + e + s15;
}
function Fi(s15, t) {
  s15 = Math.floor(s15);
  let e = "";
  for (let i = 0; i < s15; i++) e += t;
  return e;
}
var on = class {
  constructor(t) {
    this._bufferService = t;
    this.isSelectAllActive = false;
    this.selectionStartLength = 0;
  }
  clearSelection() {
    this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = false, this.selectionStartLength = 0;
  }
  get finalSelectionStart() {
    return this.isSelectAllActive ? [0, 0] : !this.selectionEnd || !this.selectionStart ? this.selectionStart : this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
  }
  get finalSelectionEnd() {
    if (this.isSelectAllActive) return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
    if (this.selectionStart) {
      if (!this.selectionEnd || this.areSelectionValuesReversed()) {
        let t = this.selectionStart[0] + this.selectionStartLength;
        return t > this._bufferService.cols ? t % this._bufferService.cols === 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(t / this._bufferService.cols) - 1] : [t % this._bufferService.cols, this.selectionStart[1] + Math.floor(t / this._bufferService.cols)] : [t, this.selectionStart[1]];
      }
      if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
        let t = this.selectionStart[0] + this.selectionStartLength;
        return t > this._bufferService.cols ? [t % this._bufferService.cols, this.selectionStart[1] + Math.floor(t / this._bufferService.cols)] : [Math.max(t, this.selectionEnd[0]), this.selectionEnd[1]];
      }
      return this.selectionEnd;
    }
  }
  areSelectionValuesReversed() {
    let t = this.selectionStart, e = this.selectionEnd;
    return !t || !e ? false : t[1] > e[1] || t[1] === e[1] && t[0] > e[0];
  }
  handleTrim(t) {
    return this.selectionStart && (this.selectionStart[1] -= t), this.selectionEnd && (this.selectionEnd[1] -= t), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), true) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), false);
  }
};
function ws(s15, t) {
  if (s15.start.y > s15.end.y) throw new Error(`Buffer range end (${s15.end.x}, ${s15.end.y}) cannot be before start (${s15.start.x}, ${s15.start.y})`);
  return t * (s15.end.y - s15.start.y) + (s15.end.x - s15.start.x + 1);
}
var Ds = 50;
var Ya = 15;
var ja = 50;
var Xa = 500;
var Za = "\xA0";
var Ja = new RegExp(Za, "g");
var ei = class extends D {
  constructor(e, i, r, n, o2, l, a, u, h15) {
    super();
    this._element = e;
    this._screenElement = i;
    this._linkifier = r;
    this._bufferService = n;
    this._coreService = o2;
    this._mouseService = l;
    this._optionsService = a;
    this._renderService = u;
    this._coreBrowserService = h15;
    this._dragScrollAmount = 0;
    this._enabled = true;
    this._workCell = new q();
    this._mouseDownTimeStamp = 0;
    this._oldHasSelection = false;
    this._oldSelectionStart = void 0;
    this._oldSelectionEnd = void 0;
    this._onLinuxMouseSelection = this._register(new v());
    this.onLinuxMouseSelection = this._onLinuxMouseSelection.event;
    this._onRedrawRequest = this._register(new v());
    this.onRequestRedraw = this._onRedrawRequest.event;
    this._onSelectionChange = this._register(new v());
    this.onSelectionChange = this._onSelectionChange.event;
    this._onRequestScrollLines = this._register(new v());
    this.onRequestScrollLines = this._onRequestScrollLines.event;
    this._mouseMoveListener = (c) => this._handleMouseMove(c), this._mouseUpListener = (c) => this._handleMouseUp(c), this._coreService.onUserInput(() => {
      this.hasSelection && this.clearSelection();
    }), this._trimListener = this._bufferService.buffer.lines.onTrim((c) => this._handleTrim(c)), this._register(this._bufferService.buffers.onBufferActivate((c) => this._handleBufferActivate(c))), this.enable(), this._model = new on(this._bufferService), this._activeSelectionMode = 0, this._register(C(() => {
      this._removeMouseDownListeners();
    })), this._register(this._bufferService.onResize((c) => {
      c.rowsChanged && this.clearSelection();
    }));
  }
  reset() {
    this.clearSelection();
  }
  disable() {
    this.clearSelection(), this._enabled = false;
  }
  enable() {
    this._enabled = true;
  }
  get selectionStart() {
    return this._model.finalSelectionStart;
  }
  get selectionEnd() {
    return this._model.finalSelectionEnd;
  }
  get hasSelection() {
    let e = this._model.finalSelectionStart, i = this._model.finalSelectionEnd;
    return !e || !i ? false : e[0] !== i[0] || e[1] !== i[1];
  }
  get selectionText() {
    let e = this._model.finalSelectionStart, i = this._model.finalSelectionEnd;
    if (!e || !i) return "";
    let r = this._bufferService.buffer, n = [];
    if (this._activeSelectionMode === 3) {
      if (e[0] === i[0]) return "";
      let l = e[0] < i[0] ? e[0] : i[0], a = e[0] < i[0] ? i[0] : e[0];
      for (let u = e[1]; u <= i[1]; u++) {
        let h15 = r.translateBufferLineToString(u, true, l, a);
        n.push(h15);
      }
    } else {
      let l = e[1] === i[1] ? i[0] : void 0;
      n.push(r.translateBufferLineToString(e[1], true, e[0], l));
      for (let a = e[1] + 1; a <= i[1] - 1; a++) {
        let u = r.lines.get(a), h15 = r.translateBufferLineToString(a, true);
        u?.isWrapped ? n[n.length - 1] += h15 : n.push(h15);
      }
      if (e[1] !== i[1]) {
        let a = r.lines.get(i[1]), u = r.translateBufferLineToString(i[1], true, 0, i[0]);
        a && a.isWrapped ? n[n.length - 1] += u : n.push(u);
      }
    }
    return n.map((l) => l.replace(Ja, " ")).join(Es ? `\r
` : `
`);
  }
  clearSelection() {
    this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
  }
  refresh(e) {
    this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._refresh())), Bi && e && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
  }
  _refresh() {
    this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({ start: this._model.finalSelectionStart, end: this._model.finalSelectionEnd, columnSelectMode: this._activeSelectionMode === 3 });
  }
  _isClickInSelection(e) {
    let i = this._getMouseBufferCoords(e), r = this._model.finalSelectionStart, n = this._model.finalSelectionEnd;
    return !r || !n || !i ? false : this._areCoordsInSelection(i, r, n);
  }
  isCellInSelection(e, i) {
    let r = this._model.finalSelectionStart, n = this._model.finalSelectionEnd;
    return !r || !n ? false : this._areCoordsInSelection([e, i], r, n);
  }
  _areCoordsInSelection(e, i, r) {
    return e[1] > i[1] && e[1] < r[1] || i[1] === r[1] && e[1] === i[1] && e[0] >= i[0] && e[0] < r[0] || i[1] < r[1] && e[1] === r[1] && e[0] < r[0] || i[1] < r[1] && e[1] === i[1] && e[0] >= i[0];
  }
  _selectWordAtCursor(e, i) {
    let r = this._linkifier.currentLink?.link?.range;
    if (r) return this._model.selectionStart = [r.start.x - 1, r.start.y - 1], this._model.selectionStartLength = ws(r, this._bufferService.cols), this._model.selectionEnd = void 0, true;
    let n = this._getMouseBufferCoords(e);
    return n ? (this._selectWordAt(n, i), this._model.selectionEnd = void 0, true) : false;
  }
  selectAll() {
    this._model.isSelectAllActive = true, this.refresh(), this._onSelectionChange.fire();
  }
  selectLines(e, i) {
    this._model.clearSelection(), e = Math.max(e, 0), i = Math.min(i, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, e], this._model.selectionEnd = [this._bufferService.cols, i], this.refresh(), this._onSelectionChange.fire();
  }
  _handleTrim(e) {
    this._model.handleTrim(e) && this.refresh();
  }
  _getMouseBufferCoords(e) {
    let i = this._mouseService.getCoords(e, this._screenElement, this._bufferService.cols, this._bufferService.rows, true);
    if (i) return i[0]--, i[1]--, i[1] += this._bufferService.buffer.ydisp, i;
  }
  _getMouseEventScrollAmount(e) {
    let i = Ci(this._coreBrowserService.window, e, this._screenElement)[1], r = this._renderService.dimensions.css.canvas.height;
    return i >= 0 && i <= r ? 0 : (i > r && (i -= r), i = Math.min(Math.max(i, -Ds), Ds), i /= Ds, i / Math.abs(i) + Math.round(i * (Ya - 1)));
  }
  shouldForceSelection(e) {
    return Zt ? e.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e.shiftKey;
  }
  handleMouseDown(e) {
    if (this._mouseDownTimeStamp = e.timeStamp, !(e.button === 2 && this.hasSelection) && e.button === 0) {
      if (!this._enabled) {
        if (!this.shouldForceSelection(e)) return;
        e.stopPropagation();
      }
      e.preventDefault(), this._dragScrollAmount = 0, this._enabled && e.shiftKey ? this._handleIncrementalClick(e) : e.detail === 1 ? this._handleSingleClick(e) : e.detail === 2 ? this._handleDoubleClick(e) : e.detail === 3 && this._handleTripleClick(e), this._addMouseDownListeners(), this.refresh(true);
    }
  }
  _addMouseDownListeners() {
    this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(() => this._dragScroll(), ja);
  }
  _removeMouseDownListeners() {
    this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
  }
  _handleIncrementalClick(e) {
    this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e));
  }
  _handleSingleClick(e) {
    if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = false, this._activeSelectionMode = this.shouldColumnSelect(e) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e), !this._model.selectionStart) return;
    this._model.selectionEnd = void 0;
    let i = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
    i && i.length !== this._model.selectionStart[0] && i.hasWidth(this._model.selectionStart[0]) === 0 && this._model.selectionStart[0]++;
  }
  _handleDoubleClick(e) {
    this._selectWordAtCursor(e, true) && (this._activeSelectionMode = 1);
  }
  _handleTripleClick(e) {
    let i = this._getMouseBufferCoords(e);
    i && (this._activeSelectionMode = 2, this._selectLineAt(i[1]));
  }
  shouldColumnSelect(e) {
    return e.altKey && !(Zt && this._optionsService.rawOptions.macOptionClickForcesSelection);
  }
  _handleMouseMove(e) {
    if (e.stopImmediatePropagation(), !this._model.selectionStart) return;
    let i = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
    if (this._model.selectionEnd = this._getMouseBufferCoords(e), !this._model.selectionEnd) {
      this.refresh(true);
      return;
    }
    this._activeSelectionMode === 2 ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : this._activeSelectionMode === 1 && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e), this._activeSelectionMode !== 3 && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
    let r = this._bufferService.buffer;
    if (this._model.selectionEnd[1] < r.lines.length) {
      let n = r.lines.get(this._model.selectionEnd[1]);
      n && n.hasWidth(this._model.selectionEnd[0]) === 0 && this._model.selectionEnd[0] < this._bufferService.cols && this._model.selectionEnd[0]++;
    }
    (!i || i[0] !== this._model.selectionEnd[0] || i[1] !== this._model.selectionEnd[1]) && this.refresh(true);
  }
  _dragScroll() {
    if (!(!this._model.selectionEnd || !this._model.selectionStart) && this._dragScrollAmount) {
      this._onRequestScrollLines.fire({ amount: this._dragScrollAmount, suppressScrollEvent: false });
      let e = this._bufferService.buffer;
      this._dragScrollAmount > 0 ? (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e.ydisp + this._bufferService.rows, e.lines.length - 1)) : (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e.ydisp), this.refresh();
    }
  }
  _handleMouseUp(e) {
    let i = e.timeStamp - this._mouseDownTimeStamp;
    if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && i < Xa && e.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
      if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
        let r = this._mouseService.getCoords(e, this._element, this._bufferService.cols, this._bufferService.rows, false);
        if (r && r[0] !== void 0 && r[1] !== void 0) {
          let n = Jo(r[0] - 1, r[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
          this._coreService.triggerDataEvent(n, true);
        }
      }
    } else this._fireEventIfSelectionChanged();
  }
  _fireEventIfSelectionChanged() {
    let e = this._model.finalSelectionStart, i = this._model.finalSelectionEnd, r = !!e && !!i && (e[0] !== i[0] || e[1] !== i[1]);
    if (!r) {
      this._oldHasSelection && this._fireOnSelectionChange(e, i, r);
      return;
    }
    !e || !i || (!this._oldSelectionStart || !this._oldSelectionEnd || e[0] !== this._oldSelectionStart[0] || e[1] !== this._oldSelectionStart[1] || i[0] !== this._oldSelectionEnd[0] || i[1] !== this._oldSelectionEnd[1]) && this._fireOnSelectionChange(e, i, r);
  }
  _fireOnSelectionChange(e, i, r) {
    this._oldSelectionStart = e, this._oldSelectionEnd = i, this._oldHasSelection = r, this._onSelectionChange.fire();
  }
  _handleBufferActivate(e) {
    this.clearSelection(), this._trimListener.dispose(), this._trimListener = e.activeBuffer.lines.onTrim((i) => this._handleTrim(i));
  }
  _convertViewportColToCharacterIndex(e, i) {
    let r = i;
    for (let n = 0; i >= n; n++) {
      let o2 = e.loadCell(n, this._workCell).getChars().length;
      this._workCell.getWidth() === 0 ? r-- : o2 > 1 && i !== n && (r += o2 - 1);
    }
    return r;
  }
  setSelection(e, i, r) {
    this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [e, i], this._model.selectionStartLength = r, this.refresh(), this._fireEventIfSelectionChanged();
  }
  rightClickSelect(e) {
    this._isClickInSelection(e) || (this._selectWordAtCursor(e, false) && this.refresh(true), this._fireEventIfSelectionChanged());
  }
  _getWordAt(e, i, r = true, n = true) {
    if (e[0] >= this._bufferService.cols) return;
    let o2 = this._bufferService.buffer, l = o2.lines.get(e[1]);
    if (!l) return;
    let a = o2.translateBufferLineToString(e[1], false), u = this._convertViewportColToCharacterIndex(l, e[0]), h15 = u, c = e[0] - u, d = 0, _2 = 0, p = 0, m = 0;
    if (a.charAt(u) === " ") {
      for (; u > 0 && a.charAt(u - 1) === " "; ) u--;
      for (; h15 < a.length && a.charAt(h15 + 1) === " "; ) h15++;
    } else {
      let R = e[0], O = e[0];
      l.getWidth(R) === 0 && (d++, R--), l.getWidth(O) === 2 && (_2++, O++);
      let I = l.getString(O).length;
      for (I > 1 && (m += I - 1, h15 += I - 1); R > 0 && u > 0 && !this._isCharWordSeparator(l.loadCell(R - 1, this._workCell)); ) {
        l.loadCell(R - 1, this._workCell);
        let k = this._workCell.getChars().length;
        this._workCell.getWidth() === 0 ? (d++, R--) : k > 1 && (p += k - 1, u -= k - 1), u--, R--;
      }
      for (; O < l.length && h15 + 1 < a.length && !this._isCharWordSeparator(l.loadCell(O + 1, this._workCell)); ) {
        l.loadCell(O + 1, this._workCell);
        let k = this._workCell.getChars().length;
        this._workCell.getWidth() === 2 ? (_2++, O++) : k > 1 && (m += k - 1, h15 += k - 1), h15++, O++;
      }
    }
    h15++;
    let f = u + c - d + p, A = Math.min(this._bufferService.cols, h15 - u + d + _2 - p - m);
    if (!(!i && a.slice(u, h15).trim() === "")) {
      if (r && f === 0 && l.getCodePoint(0) !== 32) {
        let R = o2.lines.get(e[1] - 1);
        if (R && l.isWrapped && R.getCodePoint(this._bufferService.cols - 1) !== 32) {
          let O = this._getWordAt([this._bufferService.cols - 1, e[1] - 1], false, true, false);
          if (O) {
            let I = this._bufferService.cols - O.start;
            f -= I, A += I;
          }
        }
      }
      if (n && f + A === this._bufferService.cols && l.getCodePoint(this._bufferService.cols - 1) !== 32) {
        let R = o2.lines.get(e[1] + 1);
        if (R?.isWrapped && R.getCodePoint(0) !== 32) {
          let O = this._getWordAt([0, e[1] + 1], false, false, true);
          O && (A += O.length);
        }
      }
      return { start: f, length: A };
    }
  }
  _selectWordAt(e, i) {
    let r = this._getWordAt(e, i);
    if (r) {
      for (; r.start < 0; ) r.start += this._bufferService.cols, e[1]--;
      this._model.selectionStart = [r.start, e[1]], this._model.selectionStartLength = r.length;
    }
  }
  _selectToWordAt(e) {
    let i = this._getWordAt(e, true);
    if (i) {
      let r = e[1];
      for (; i.start < 0; ) i.start += this._bufferService.cols, r--;
      if (!this._model.areSelectionValuesReversed()) for (; i.start + i.length > this._bufferService.cols; ) i.length -= this._bufferService.cols, r++;
      this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? i.start : i.start + i.length, r];
    }
  }
  _isCharWordSeparator(e) {
    return e.getWidth() === 0 ? false : this._optionsService.rawOptions.wordSeparator.indexOf(e.getChars()) >= 0;
  }
  _selectLineAt(e) {
    let i = this._bufferService.buffer.getWrappedRangeForLine(e), r = { start: { x: 0, y: i.first }, end: { x: this._bufferService.cols - 1, y: i.last } };
    this._model.selectionStart = [0, i.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = ws(r, this._bufferService.cols);
  }
};
ei = M([S(3, F), S(4, ge), S(5, Dt), S(6, H), S(7, ce), S(8, ae)], ei);
var Hi = class {
  constructor() {
    this._data = {};
  }
  set(t, e, i) {
    this._data[t] || (this._data[t] = {}), this._data[t][e] = i;
  }
  get(t, e) {
    return this._data[t] ? this._data[t][e] : void 0;
  }
  clear() {
    this._data = {};
  }
};
var Wi = class {
  constructor() {
    this._color = new Hi();
    this._css = new Hi();
  }
  setCss(t, e, i) {
    this._css.set(t, e, i);
  }
  getCss(t, e) {
    return this._css.get(t, e);
  }
  setColor(t, e, i) {
    this._color.set(t, e, i);
  }
  getColor(t, e) {
    return this._color.get(t, e);
  }
  clear() {
    this._color.clear(), this._css.clear();
  }
};
var re = Object.freeze((() => {
  let s15 = [z.toColor("#2e3436"), z.toColor("#cc0000"), z.toColor("#4e9a06"), z.toColor("#c4a000"), z.toColor("#3465a4"), z.toColor("#75507b"), z.toColor("#06989a"), z.toColor("#d3d7cf"), z.toColor("#555753"), z.toColor("#ef2929"), z.toColor("#8ae234"), z.toColor("#fce94f"), z.toColor("#729fcf"), z.toColor("#ad7fa8"), z.toColor("#34e2e2"), z.toColor("#eeeeec")], t = [0, 95, 135, 175, 215, 255];
  for (let e = 0; e < 216; e++) {
    let i = t[e / 36 % 6 | 0], r = t[e / 6 % 6 | 0], n = t[e % 6];
    s15.push({ css: j.toCss(i, r, n), rgba: j.toRgba(i, r, n) });
  }
  for (let e = 0; e < 24; e++) {
    let i = 8 + e * 10;
    s15.push({ css: j.toCss(i, i, i), rgba: j.toRgba(i, i, i) });
  }
  return s15;
})());
var St = z.toColor("#ffffff");
var Ki = z.toColor("#000000");
var tl = z.toColor("#ffffff");
var il = Ki;
var Ui = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967117 };
var Qa = St;
var ti = class extends D {
  constructor(e) {
    super();
    this._optionsService = e;
    this._contrastCache = new Wi();
    this._halfContrastCache = new Wi();
    this._onChangeColors = this._register(new v());
    this.onChangeColors = this._onChangeColors.event;
    this._colors = { foreground: St, background: Ki, cursor: tl, cursorAccent: il, selectionForeground: void 0, selectionBackgroundTransparent: Ui, selectionBackgroundOpaque: U.blend(Ki, Ui), selectionInactiveBackgroundTransparent: Ui, selectionInactiveBackgroundOpaque: U.blend(Ki, Ui), scrollbarSliderBackground: U.opacity(St, 0.2), scrollbarSliderHoverBackground: U.opacity(St, 0.4), scrollbarSliderActiveBackground: U.opacity(St, 0.5), overviewRulerBorder: St, ansi: re.slice(), contrastCache: this._contrastCache, halfContrastCache: this._halfContrastCache }, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this._register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", () => this._contrastCache.clear())), this._register(this._optionsService.onSpecificOptionChange("theme", () => this._setTheme(this._optionsService.rawOptions.theme)));
  }
  get colors() {
    return this._colors;
  }
  _setTheme(e = {}) {
    let i = this._colors;
    if (i.foreground = K(e.foreground, St), i.background = K(e.background, Ki), i.cursor = U.blend(i.background, K(e.cursor, tl)), i.cursorAccent = U.blend(i.background, K(e.cursorAccent, il)), i.selectionBackgroundTransparent = K(e.selectionBackground, Ui), i.selectionBackgroundOpaque = U.blend(i.background, i.selectionBackgroundTransparent), i.selectionInactiveBackgroundTransparent = K(e.selectionInactiveBackground, i.selectionBackgroundTransparent), i.selectionInactiveBackgroundOpaque = U.blend(i.background, i.selectionInactiveBackgroundTransparent), i.selectionForeground = e.selectionForeground ? K(e.selectionForeground, ps) : void 0, i.selectionForeground === ps && (i.selectionForeground = void 0), U.isOpaque(i.selectionBackgroundTransparent) && (i.selectionBackgroundTransparent = U.opacity(i.selectionBackgroundTransparent, 0.3)), U.isOpaque(i.selectionInactiveBackgroundTransparent) && (i.selectionInactiveBackgroundTransparent = U.opacity(i.selectionInactiveBackgroundTransparent, 0.3)), i.scrollbarSliderBackground = K(e.scrollbarSliderBackground, U.opacity(i.foreground, 0.2)), i.scrollbarSliderHoverBackground = K(e.scrollbarSliderHoverBackground, U.opacity(i.foreground, 0.4)), i.scrollbarSliderActiveBackground = K(e.scrollbarSliderActiveBackground, U.opacity(i.foreground, 0.5)), i.overviewRulerBorder = K(e.overviewRulerBorder, Qa), i.ansi = re.slice(), i.ansi[0] = K(e.black, re[0]), i.ansi[1] = K(e.red, re[1]), i.ansi[2] = K(e.green, re[2]), i.ansi[3] = K(e.yellow, re[3]), i.ansi[4] = K(e.blue, re[4]), i.ansi[5] = K(e.magenta, re[5]), i.ansi[6] = K(e.cyan, re[6]), i.ansi[7] = K(e.white, re[7]), i.ansi[8] = K(e.brightBlack, re[8]), i.ansi[9] = K(e.brightRed, re[9]), i.ansi[10] = K(e.brightGreen, re[10]), i.ansi[11] = K(e.brightYellow, re[11]), i.ansi[12] = K(e.brightBlue, re[12]), i.ansi[13] = K(e.brightMagenta, re[13]), i.ansi[14] = K(e.brightCyan, re[14]), i.ansi[15] = K(e.brightWhite, re[15]), e.extendedAnsi) {
      let r = Math.min(i.ansi.length - 16, e.extendedAnsi.length);
      for (let n = 0; n < r; n++) i.ansi[n + 16] = K(e.extendedAnsi[n], re[n + 16]);
    }
    this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
  }
  restoreColor(e) {
    this._restoreColor(e), this._onChangeColors.fire(this.colors);
  }
  _restoreColor(e) {
    if (e === void 0) {
      for (let i = 0; i < this._restoreColors.ansi.length; ++i) this._colors.ansi[i] = this._restoreColors.ansi[i];
      return;
    }
    switch (e) {
      case 256:
        this._colors.foreground = this._restoreColors.foreground;
        break;
      case 257:
        this._colors.background = this._restoreColors.background;
        break;
      case 258:
        this._colors.cursor = this._restoreColors.cursor;
        break;
      default:
        this._colors.ansi[e] = this._restoreColors.ansi[e];
    }
  }
  modifyColors(e) {
    e(this._colors), this._onChangeColors.fire(this.colors);
  }
  _updateRestoreColors() {
    this._restoreColors = { foreground: this._colors.foreground, background: this._colors.background, cursor: this._colors.cursor, ansi: this._colors.ansi.slice() };
  }
};
ti = M([S(0, H)], ti);
function K(s15, t) {
  if (s15 !== void 0) try {
    return z.toColor(s15);
  } catch {
  }
  return t;
}
var Rs = class {
  constructor(...t) {
    this._entries = /* @__PURE__ */ new Map();
    for (let [e, i] of t) this.set(e, i);
  }
  set(t, e) {
    let i = this._entries.get(t);
    return this._entries.set(t, e), i;
  }
  forEach(t) {
    for (let [e, i] of this._entries.entries()) t(e, i);
  }
  has(t) {
    return this._entries.has(t);
  }
  get(t) {
    return this._entries.get(t);
  }
};
var ln = class {
  constructor() {
    this._services = new Rs();
    this._services.set(xt, this);
  }
  setService(t, e) {
    this._services.set(t, e);
  }
  getService(t) {
    return this._services.get(t);
  }
  createInstance(t, ...e) {
    let i = Xs(t).sort((o2, l) => o2.index - l.index), r = [];
    for (let o2 of i) {
      let l = this._services.get(o2.id);
      if (!l) throw new Error(`[createInstance] ${t.name} depends on UNKNOWN service ${o2.id._id}.`);
      r.push(l);
    }
    let n = i.length > 0 ? i[0].index : e.length;
    if (e.length !== n) throw new Error(`[createInstance] First service dependency of ${t.name} at position ${n + 1} conflicts with ${e.length} static arguments`);
    return new t(...e, ...r);
  }
};
var ec = { trace: 0, debug: 1, info: 2, warn: 3, error: 4, off: 5 };
var tc = "xterm.js: ";
var ii = class extends D {
  constructor(e) {
    super();
    this._optionsService = e;
    this._logLevel = 5;
    this._updateLogLevel(), this._register(this._optionsService.onSpecificOptionChange("logLevel", () => this._updateLogLevel())), ic = this;
  }
  get logLevel() {
    return this._logLevel;
  }
  _updateLogLevel() {
    this._logLevel = ec[this._optionsService.rawOptions.logLevel];
  }
  _evalLazyOptionalParams(e) {
    for (let i = 0; i < e.length; i++) typeof e[i] == "function" && (e[i] = e[i]());
  }
  _log(e, i, r) {
    this._evalLazyOptionalParams(r), e.call(console, (this._optionsService.options.logger ? "" : tc) + i, ...r);
  }
  trace(e, ...i) {
    this._logLevel <= 0 && this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger) ?? console.log, e, i);
  }
  debug(e, ...i) {
    this._logLevel <= 1 && this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger) ?? console.log, e, i);
  }
  info(e, ...i) {
    this._logLevel <= 2 && this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger) ?? console.info, e, i);
  }
  warn(e, ...i) {
    this._logLevel <= 3 && this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger) ?? console.warn, e, i);
  }
  error(e, ...i) {
    this._logLevel <= 4 && this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger) ?? console.error, e, i);
  }
};
ii = M([S(0, H)], ii);
var ic;
var zi = class extends D {
  constructor(e) {
    super();
    this._maxLength = e;
    this.onDeleteEmitter = this._register(new v());
    this.onDelete = this.onDeleteEmitter.event;
    this.onInsertEmitter = this._register(new v());
    this.onInsert = this.onInsertEmitter.event;
    this.onTrimEmitter = this._register(new v());
    this.onTrim = this.onTrimEmitter.event;
    this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
  }
  get maxLength() {
    return this._maxLength;
  }
  set maxLength(e) {
    if (this._maxLength === e) return;
    let i = new Array(e);
    for (let r = 0; r < Math.min(e, this.length); r++) i[r] = this._array[this._getCyclicIndex(r)];
    this._array = i, this._maxLength = e, this._startIndex = 0;
  }
  get length() {
    return this._length;
  }
  set length(e) {
    if (e > this._length) for (let i = this._length; i < e; i++) this._array[i] = void 0;
    this._length = e;
  }
  get(e) {
    return this._array[this._getCyclicIndex(e)];
  }
  set(e, i) {
    this._array[this._getCyclicIndex(e)] = i;
  }
  push(e) {
    this._array[this._getCyclicIndex(this._length)] = e, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
  }
  recycle() {
    if (this._length !== this._maxLength) throw new Error("Can only recycle when the buffer is full");
    return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
  }
  get isFull() {
    return this._length === this._maxLength;
  }
  pop() {
    return this._array[this._getCyclicIndex(this._length-- - 1)];
  }
  splice(e, i, ...r) {
    if (i) {
      for (let n = e; n < this._length - i; n++) this._array[this._getCyclicIndex(n)] = this._array[this._getCyclicIndex(n + i)];
      this._length -= i, this.onDeleteEmitter.fire({ index: e, amount: i });
    }
    for (let n = this._length - 1; n >= e; n--) this._array[this._getCyclicIndex(n + r.length)] = this._array[this._getCyclicIndex(n)];
    for (let n = 0; n < r.length; n++) this._array[this._getCyclicIndex(e + n)] = r[n];
    if (r.length && this.onInsertEmitter.fire({ index: e, amount: r.length }), this._length + r.length > this._maxLength) {
      let n = this._length + r.length - this._maxLength;
      this._startIndex += n, this._length = this._maxLength, this.onTrimEmitter.fire(n);
    } else this._length += r.length;
  }
  trimStart(e) {
    e > this._length && (e = this._length), this._startIndex += e, this._length -= e, this.onTrimEmitter.fire(e);
  }
  shiftElements(e, i, r) {
    if (!(i <= 0)) {
      if (e < 0 || e >= this._length) throw new Error("start argument out of range");
      if (e + r < 0) throw new Error("Cannot shift elements in list beyond index 0");
      if (r > 0) {
        for (let o2 = i - 1; o2 >= 0; o2--) this.set(e + o2 + r, this.get(e + o2));
        let n = e + i + r - this._length;
        if (n > 0) for (this._length += n; this._length > this._maxLength; ) this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
      } else for (let n = 0; n < i; n++) this.set(e + n + r, this.get(e + n));
    }
  }
  _getCyclicIndex(e) {
    return (this._startIndex + e) % this._maxLength;
  }
};
var B = 3;
var X = Object.freeze(new De());
var an = 0;
var Ls = 2;
var Ze = class s12 {
  constructor(t, e, i = false) {
    this.isWrapped = i;
    this._combined = {};
    this._extendedAttrs = {};
    this._data = new Uint32Array(t * B);
    let r = e || q.fromCharData([0, ir, 1, 0]);
    for (let n = 0; n < t; ++n) this.setCell(n, r);
    this.length = t;
  }
  get(t) {
    let e = this._data[t * B + 0], i = e & 2097151;
    return [this._data[t * B + 1], e & 2097152 ? this._combined[t] : i ? Ce(i) : "", e >> 22, e & 2097152 ? this._combined[t].charCodeAt(this._combined[t].length - 1) : i];
  }
  set(t, e) {
    this._data[t * B + 1] = e[0], e[1].length > 1 ? (this._combined[t] = e[1], this._data[t * B + 0] = t | 2097152 | e[2] << 22) : this._data[t * B + 0] = e[1].charCodeAt(0) | e[2] << 22;
  }
  getWidth(t) {
    return this._data[t * B + 0] >> 22;
  }
  hasWidth(t) {
    return this._data[t * B + 0] & 12582912;
  }
  getFg(t) {
    return this._data[t * B + 1];
  }
  getBg(t) {
    return this._data[t * B + 2];
  }
  hasContent(t) {
    return this._data[t * B + 0] & 4194303;
  }
  getCodePoint(t) {
    let e = this._data[t * B + 0];
    return e & 2097152 ? this._combined[t].charCodeAt(this._combined[t].length - 1) : e & 2097151;
  }
  isCombined(t) {
    return this._data[t * B + 0] & 2097152;
  }
  getString(t) {
    let e = this._data[t * B + 0];
    return e & 2097152 ? this._combined[t] : e & 2097151 ? Ce(e & 2097151) : "";
  }
  isProtected(t) {
    return this._data[t * B + 2] & 536870912;
  }
  loadCell(t, e) {
    return an = t * B, e.content = this._data[an + 0], e.fg = this._data[an + 1], e.bg = this._data[an + 2], e.content & 2097152 && (e.combinedData = this._combined[t]), e.bg & 268435456 && (e.extended = this._extendedAttrs[t]), e;
  }
  setCell(t, e) {
    e.content & 2097152 && (this._combined[t] = e.combinedData), e.bg & 268435456 && (this._extendedAttrs[t] = e.extended), this._data[t * B + 0] = e.content, this._data[t * B + 1] = e.fg, this._data[t * B + 2] = e.bg;
  }
  setCellFromCodepoint(t, e, i, r) {
    r.bg & 268435456 && (this._extendedAttrs[t] = r.extended), this._data[t * B + 0] = e | i << 22, this._data[t * B + 1] = r.fg, this._data[t * B + 2] = r.bg;
  }
  addCodepointToCell(t, e, i) {
    let r = this._data[t * B + 0];
    r & 2097152 ? this._combined[t] += Ce(e) : r & 2097151 ? (this._combined[t] = Ce(r & 2097151) + Ce(e), r &= -2097152, r |= 2097152) : r = e | 1 << 22, i && (r &= -12582913, r |= i << 22), this._data[t * B + 0] = r;
  }
  insertCells(t, e, i) {
    if (t %= this.length, t && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t - 1, 0, 1, i), e < this.length - t) {
      let r = new q();
      for (let n = this.length - t - e - 1; n >= 0; --n) this.setCell(t + e + n, this.loadCell(t + n, r));
      for (let n = 0; n < e; ++n) this.setCell(t + n, i);
    } else for (let r = t; r < this.length; ++r) this.setCell(r, i);
    this.getWidth(this.length - 1) === 2 && this.setCellFromCodepoint(this.length - 1, 0, 1, i);
  }
  deleteCells(t, e, i) {
    if (t %= this.length, e < this.length - t) {
      let r = new q();
      for (let n = 0; n < this.length - t - e; ++n) this.setCell(t + n, this.loadCell(t + e + n, r));
      for (let n = this.length - e; n < this.length; ++n) this.setCell(n, i);
    } else for (let r = t; r < this.length; ++r) this.setCell(r, i);
    t && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t - 1, 0, 1, i), this.getWidth(t) === 0 && !this.hasContent(t) && this.setCellFromCodepoint(t, 0, 1, i);
  }
  replaceCells(t, e, i, r = false) {
    if (r) {
      for (t && this.getWidth(t - 1) === 2 && !this.isProtected(t - 1) && this.setCellFromCodepoint(t - 1, 0, 1, i), e < this.length && this.getWidth(e - 1) === 2 && !this.isProtected(e) && this.setCellFromCodepoint(e, 0, 1, i); t < e && t < this.length; ) this.isProtected(t) || this.setCell(t, i), t++;
      return;
    }
    for (t && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t - 1, 0, 1, i), e < this.length && this.getWidth(e - 1) === 2 && this.setCellFromCodepoint(e, 0, 1, i); t < e && t < this.length; ) this.setCell(t++, i);
  }
  resize(t, e) {
    if (t === this.length) return this._data.length * 4 * Ls < this._data.buffer.byteLength;
    let i = t * B;
    if (t > this.length) {
      if (this._data.buffer.byteLength >= i * 4) this._data = new Uint32Array(this._data.buffer, 0, i);
      else {
        let r = new Uint32Array(i);
        r.set(this._data), this._data = r;
      }
      for (let r = this.length; r < t; ++r) this.setCell(r, e);
    } else {
      this._data = this._data.subarray(0, i);
      let r = Object.keys(this._combined);
      for (let o2 = 0; o2 < r.length; o2++) {
        let l = parseInt(r[o2], 10);
        l >= t && delete this._combined[l];
      }
      let n = Object.keys(this._extendedAttrs);
      for (let o2 = 0; o2 < n.length; o2++) {
        let l = parseInt(n[o2], 10);
        l >= t && delete this._extendedAttrs[l];
      }
    }
    return this.length = t, i * 4 * Ls < this._data.buffer.byteLength;
  }
  cleanupMemory() {
    if (this._data.length * 4 * Ls < this._data.buffer.byteLength) {
      let t = new Uint32Array(this._data.length);
      return t.set(this._data), this._data = t, 1;
    }
    return 0;
  }
  fill(t, e = false) {
    if (e) {
      for (let i = 0; i < this.length; ++i) this.isProtected(i) || this.setCell(i, t);
      return;
    }
    this._combined = {}, this._extendedAttrs = {};
    for (let i = 0; i < this.length; ++i) this.setCell(i, t);
  }
  copyFrom(t) {
    this.length !== t.length ? this._data = new Uint32Array(t._data) : this._data.set(t._data), this.length = t.length, this._combined = {};
    for (let e in t._combined) this._combined[e] = t._combined[e];
    this._extendedAttrs = {};
    for (let e in t._extendedAttrs) this._extendedAttrs[e] = t._extendedAttrs[e];
    this.isWrapped = t.isWrapped;
  }
  clone() {
    let t = new s12(0);
    t._data = new Uint32Array(this._data), t.length = this.length;
    for (let e in this._combined) t._combined[e] = this._combined[e];
    for (let e in this._extendedAttrs) t._extendedAttrs[e] = this._extendedAttrs[e];
    return t.isWrapped = this.isWrapped, t;
  }
  getTrimmedLength() {
    for (let t = this.length - 1; t >= 0; --t) if (this._data[t * B + 0] & 4194303) return t + (this._data[t * B + 0] >> 22);
    return 0;
  }
  getNoBgTrimmedLength() {
    for (let t = this.length - 1; t >= 0; --t) if (this._data[t * B + 0] & 4194303 || this._data[t * B + 2] & 50331648) return t + (this._data[t * B + 0] >> 22);
    return 0;
  }
  copyCellsFrom(t, e, i, r, n) {
    let o2 = t._data;
    if (n) for (let a = r - 1; a >= 0; a--) {
      for (let u = 0; u < B; u++) this._data[(i + a) * B + u] = o2[(e + a) * B + u];
      o2[(e + a) * B + 2] & 268435456 && (this._extendedAttrs[i + a] = t._extendedAttrs[e + a]);
    }
    else for (let a = 0; a < r; a++) {
      for (let u = 0; u < B; u++) this._data[(i + a) * B + u] = o2[(e + a) * B + u];
      o2[(e + a) * B + 2] & 268435456 && (this._extendedAttrs[i + a] = t._extendedAttrs[e + a]);
    }
    let l = Object.keys(t._combined);
    for (let a = 0; a < l.length; a++) {
      let u = parseInt(l[a], 10);
      u >= e && (this._combined[u - e + i] = t._combined[u]);
    }
  }
  translateToString(t, e, i, r) {
    e = e ?? 0, i = i ?? this.length, t && (i = Math.min(i, this.getTrimmedLength())), r && (r.length = 0);
    let n = "";
    for (; e < i; ) {
      let o2 = this._data[e * B + 0], l = o2 & 2097151, a = o2 & 2097152 ? this._combined[e] : l ? Ce(l) : we;
      if (n += a, r) for (let u = 0; u < a.length; ++u) r.push(e);
      e += o2 >> 22 || 1;
    }
    return r && r.push(e), n;
  }
};
function sl(s15, t, e, i, r, n) {
  let o2 = [];
  for (let l = 0; l < s15.length - 1; l++) {
    let a = l, u = s15.get(++a);
    if (!u.isWrapped) continue;
    let h15 = [s15.get(l)];
    for (; a < s15.length && u.isWrapped; ) h15.push(u), u = s15.get(++a);
    if (!n && i >= l && i < a) {
      l += h15.length - 1;
      continue;
    }
    let c = 0, d = ri(h15, c, t), _2 = 1, p = 0;
    for (; _2 < h15.length; ) {
      let f = ri(h15, _2, t), A = f - p, R = e - d, O = Math.min(A, R);
      h15[c].copyCellsFrom(h15[_2], p, d, O, false), d += O, d === e && (c++, d = 0), p += O, p === f && (_2++, p = 0), d === 0 && c !== 0 && h15[c - 1].getWidth(e - 1) === 2 && (h15[c].copyCellsFrom(h15[c - 1], e - 1, d++, 1, false), h15[c - 1].setCell(e - 1, r));
    }
    h15[c].replaceCells(d, e, r);
    let m = 0;
    for (let f = h15.length - 1; f > 0 && (f > c || h15[f].getTrimmedLength() === 0); f--) m++;
    m > 0 && (o2.push(l + h15.length - m), o2.push(m)), l += h15.length - 1;
  }
  return o2;
}
function ol(s15, t) {
  let e = [], i = 0, r = t[i], n = 0;
  for (let o2 = 0; o2 < s15.length; o2++) if (r === o2) {
    let l = t[++i];
    s15.onDeleteEmitter.fire({ index: o2 - n, amount: l }), o2 += l - 1, n += l, r = t[++i];
  } else e.push(o2);
  return { layout: e, countRemoved: n };
}
function ll(s15, t) {
  let e = [];
  for (let i = 0; i < t.length; i++) e.push(s15.get(t[i]));
  for (let i = 0; i < e.length; i++) s15.set(i, e[i]);
  s15.length = t.length;
}
function al(s15, t, e) {
  let i = [], r = s15.map((a, u) => ri(s15, u, t)).reduce((a, u) => a + u), n = 0, o2 = 0, l = 0;
  for (; l < r; ) {
    if (r - l < e) {
      i.push(r - l);
      break;
    }
    n += e;
    let a = ri(s15, o2, t);
    n > a && (n -= a, o2++);
    let u = s15[o2].getWidth(n - 1) === 2;
    u && n--;
    let h15 = u ? e - 1 : e;
    i.push(h15), l += h15;
  }
  return i;
}
function ri(s15, t, e) {
  if (t === s15.length - 1) return s15[t].getTrimmedLength();
  let i = !s15[t].hasContent(e - 1) && s15[t].getWidth(e - 1) === 1, r = s15[t + 1].getWidth(0) === 2;
  return i && r ? e - 1 : e;
}
var un = class un2 {
  constructor(t) {
    this.line = t;
    this.isDisposed = false;
    this._disposables = [];
    this._id = un2._nextId++;
    this._onDispose = this.register(new v());
    this.onDispose = this._onDispose.event;
  }
  get id() {
    return this._id;
  }
  dispose() {
    this.isDisposed || (this.isDisposed = true, this.line = -1, this._onDispose.fire(), Ne(this._disposables), this._disposables.length = 0);
  }
  register(t) {
    return this._disposables.push(t), t;
  }
};
un._nextId = 1;
var cn = un;
var ne = {};
var Je = ne.B;
ne[0] = { "`": "\u25C6", a: "\u2592", b: "\u2409", c: "\u240C", d: "\u240D", e: "\u240A", f: "\xB0", g: "\xB1", h: "\u2424", i: "\u240B", j: "\u2518", k: "\u2510", l: "\u250C", m: "\u2514", n: "\u253C", o: "\u23BA", p: "\u23BB", q: "\u2500", r: "\u23BC", s: "\u23BD", t: "\u251C", u: "\u2524", v: "\u2534", w: "\u252C", x: "\u2502", y: "\u2264", z: "\u2265", "{": "\u03C0", "|": "\u2260", "}": "\xA3", "~": "\xB7" };
ne.A = { "#": "\xA3" };
ne.B = void 0;
ne[4] = { "#": "\xA3", "@": "\xBE", "[": "ij", "\\": "\xBD", "]": "|", "{": "\xA8", "|": "f", "}": "\xBC", "~": "\xB4" };
ne.C = ne[5] = { "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" };
ne.R = { "#": "\xA3", "@": "\xE0", "[": "\xB0", "\\": "\xE7", "]": "\xA7", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xA8" };
ne.Q = { "@": "\xE0", "[": "\xE2", "\\": "\xE7", "]": "\xEA", "^": "\xEE", "`": "\xF4", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xFB" };
ne.K = { "@": "\xA7", "[": "\xC4", "\\": "\xD6", "]": "\xDC", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xDF" };
ne.Y = { "#": "\xA3", "@": "\xA7", "[": "\xB0", "\\": "\xE7", "]": "\xE9", "`": "\xF9", "{": "\xE0", "|": "\xF2", "}": "\xE8", "~": "\xEC" };
ne.E = ne[6] = { "@": "\xC4", "[": "\xC6", "\\": "\xD8", "]": "\xC5", "^": "\xDC", "`": "\xE4", "{": "\xE6", "|": "\xF8", "}": "\xE5", "~": "\xFC" };
ne.Z = { "#": "\xA3", "@": "\xA7", "[": "\xA1", "\\": "\xD1", "]": "\xBF", "{": "\xB0", "|": "\xF1", "}": "\xE7" };
ne.H = ne[7] = { "@": "\xC9", "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" };
ne["="] = { "#": "\xF9", "@": "\xE0", "[": "\xE9", "\\": "\xE7", "]": "\xEA", "^": "\xEE", _: "\xE8", "`": "\xF4", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xFB" };
var cl = 4294967295;
var $i = class {
  constructor(t, e, i) {
    this._hasScrollback = t;
    this._optionsService = e;
    this._bufferService = i;
    this.ydisp = 0;
    this.ybase = 0;
    this.y = 0;
    this.x = 0;
    this.tabs = {};
    this.savedY = 0;
    this.savedX = 0;
    this.savedCurAttrData = X.clone();
    this.savedCharset = Je;
    this.markers = [];
    this._nullCell = q.fromCharData([0, ir, 1, 0]);
    this._whitespaceCell = q.fromCharData([0, we, 1, 32]);
    this._isClearing = false;
    this._memoryCleanupQueue = new Jt();
    this._memoryCleanupPosition = 0;
    this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new zi(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
  }
  getNullCell(t) {
    return t ? (this._nullCell.fg = t.fg, this._nullCell.bg = t.bg, this._nullCell.extended = t.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new rt()), this._nullCell;
  }
  getWhitespaceCell(t) {
    return t ? (this._whitespaceCell.fg = t.fg, this._whitespaceCell.bg = t.bg, this._whitespaceCell.extended = t.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new rt()), this._whitespaceCell;
  }
  getBlankLine(t, e) {
    return new Ze(this._bufferService.cols, this.getNullCell(t), e);
  }
  get hasScrollback() {
    return this._hasScrollback && this.lines.maxLength > this._rows;
  }
  get isCursorInViewport() {
    let e = this.ybase + this.y - this.ydisp;
    return e >= 0 && e < this._rows;
  }
  _getCorrectBufferLength(t) {
    if (!this._hasScrollback) return t;
    let e = t + this._optionsService.rawOptions.scrollback;
    return e > cl ? cl : e;
  }
  fillViewportRows(t) {
    if (this.lines.length === 0) {
      t === void 0 && (t = X);
      let e = this._rows;
      for (; e--; ) this.lines.push(this.getBlankLine(t));
    }
  }
  clear() {
    this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new zi(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
  }
  resize(t, e) {
    let i = this.getNullCell(X), r = 0, n = this._getCorrectBufferLength(e);
    if (n > this.lines.maxLength && (this.lines.maxLength = n), this.lines.length > 0) {
      if (this._cols < t) for (let l = 0; l < this.lines.length; l++) r += +this.lines.get(l).resize(t, i);
      let o2 = 0;
      if (this._rows < e) for (let l = this._rows; l < e; l++) this.lines.length < e + this.ybase && (this._optionsService.rawOptions.windowsMode || this._optionsService.rawOptions.windowsPty.backend !== void 0 || this._optionsService.rawOptions.windowsPty.buildNumber !== void 0 ? this.lines.push(new Ze(t, i)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + o2 + 1 ? (this.ybase--, o2++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new Ze(t, i)));
      else for (let l = this._rows; l > e; l--) this.lines.length > e + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
      if (n < this.lines.maxLength) {
        let l = this.lines.length - n;
        l > 0 && (this.lines.trimStart(l), this.ybase = Math.max(this.ybase - l, 0), this.ydisp = Math.max(this.ydisp - l, 0), this.savedY = Math.max(this.savedY - l, 0)), this.lines.maxLength = n;
      }
      this.x = Math.min(this.x, t - 1), this.y = Math.min(this.y, e - 1), o2 && (this.y += o2), this.savedX = Math.min(this.savedX, t - 1), this.scrollTop = 0;
    }
    if (this.scrollBottom = e - 1, this._isReflowEnabled && (this._reflow(t, e), this._cols > t)) for (let o2 = 0; o2 < this.lines.length; o2++) r += +this.lines.get(o2).resize(t, i);
    this._cols = t, this._rows = e, this._memoryCleanupQueue.clear(), r > 0.1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue(() => this._batchedMemoryCleanup()));
  }
  _batchedMemoryCleanup() {
    let t = true;
    this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, t = false);
    let e = 0;
    for (; this._memoryCleanupPosition < this.lines.length; ) if (e += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), e > 100) return true;
    return t;
  }
  get _isReflowEnabled() {
    let t = this._optionsService.rawOptions.windowsPty;
    return t && t.buildNumber ? this._hasScrollback && t.backend === "conpty" && t.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
  }
  _reflow(t, e) {
    this._cols !== t && (t > this._cols ? this._reflowLarger(t, e) : this._reflowSmaller(t, e));
  }
  _reflowLarger(t, e) {
    let i = this._optionsService.rawOptions.reflowCursorLine, r = sl(this.lines, this._cols, t, this.ybase + this.y, this.getNullCell(X), i);
    if (r.length > 0) {
      let n = ol(this.lines, r);
      ll(this.lines, n.layout), this._reflowLargerAdjustViewport(t, e, n.countRemoved);
    }
  }
  _reflowLargerAdjustViewport(t, e, i) {
    let r = this.getNullCell(X), n = i;
    for (; n-- > 0; ) this.ybase === 0 ? (this.y > 0 && this.y--, this.lines.length < e && this.lines.push(new Ze(t, r))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
    this.savedY = Math.max(this.savedY - i, 0);
  }
  _reflowSmaller(t, e) {
    let i = this._optionsService.rawOptions.reflowCursorLine, r = this.getNullCell(X), n = [], o2 = 0;
    for (let l = this.lines.length - 1; l >= 0; l--) {
      let a = this.lines.get(l);
      if (!a || !a.isWrapped && a.getTrimmedLength() <= t) continue;
      let u = [a];
      for (; a.isWrapped && l > 0; ) a = this.lines.get(--l), u.unshift(a);
      if (!i) {
        let I = this.ybase + this.y;
        if (I >= l && I < l + u.length) continue;
      }
      let h15 = u[u.length - 1].getTrimmedLength(), c = al(u, this._cols, t), d = c.length - u.length, _2;
      this.ybase === 0 && this.y !== this.lines.length - 1 ? _2 = Math.max(0, this.y - this.lines.maxLength + d) : _2 = Math.max(0, this.lines.length - this.lines.maxLength + d);
      let p = [];
      for (let I = 0; I < d; I++) {
        let k = this.getBlankLine(X, true);
        p.push(k);
      }
      p.length > 0 && (n.push({ start: l + u.length + o2, newLines: p }), o2 += p.length), u.push(...p);
      let m = c.length - 1, f = c[m];
      f === 0 && (m--, f = c[m]);
      let A = u.length - d - 1, R = h15;
      for (; A >= 0; ) {
        let I = Math.min(R, f);
        if (u[m] === void 0) break;
        if (u[m].copyCellsFrom(u[A], R - I, f - I, I, true), f -= I, f === 0 && (m--, f = c[m]), R -= I, R === 0) {
          A--;
          let k = Math.max(A, 0);
          R = ri(u, k, this._cols);
        }
      }
      for (let I = 0; I < u.length; I++) c[I] < t && u[I].setCell(c[I], r);
      let O = d - _2;
      for (; O-- > 0; ) this.ybase === 0 ? this.y < e - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + o2) - e && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
      this.savedY = Math.min(this.savedY + d, this.ybase + e - 1);
    }
    if (n.length > 0) {
      let l = [], a = [];
      for (let f = 0; f < this.lines.length; f++) a.push(this.lines.get(f));
      let u = this.lines.length, h15 = u - 1, c = 0, d = n[c];
      this.lines.length = Math.min(this.lines.maxLength, this.lines.length + o2);
      let _2 = 0;
      for (let f = Math.min(this.lines.maxLength - 1, u + o2 - 1); f >= 0; f--) if (d && d.start > h15 + _2) {
        for (let A = d.newLines.length - 1; A >= 0; A--) this.lines.set(f--, d.newLines[A]);
        f++, l.push({ index: h15 + 1, amount: d.newLines.length }), _2 += d.newLines.length, d = n[++c];
      } else this.lines.set(f, a[h15--]);
      let p = 0;
      for (let f = l.length - 1; f >= 0; f--) l[f].index += p, this.lines.onInsertEmitter.fire(l[f]), p += l[f].amount;
      let m = Math.max(0, u + o2 - this.lines.maxLength);
      m > 0 && this.lines.onTrimEmitter.fire(m);
    }
  }
  translateBufferLineToString(t, e, i = 0, r) {
    let n = this.lines.get(t);
    return n ? n.translateToString(e, i, r) : "";
  }
  getWrappedRangeForLine(t) {
    let e = t, i = t;
    for (; e > 0 && this.lines.get(e).isWrapped; ) e--;
    for (; i + 1 < this.lines.length && this.lines.get(i + 1).isWrapped; ) i++;
    return { first: e, last: i };
  }
  setupTabStops(t) {
    for (t != null ? this.tabs[t] || (t = this.prevStop(t)) : (this.tabs = {}, t = 0); t < this._cols; t += this._optionsService.rawOptions.tabStopWidth) this.tabs[t] = true;
  }
  prevStop(t) {
    for (t == null && (t = this.x); !this.tabs[--t] && t > 0; ) ;
    return t >= this._cols ? this._cols - 1 : t < 0 ? 0 : t;
  }
  nextStop(t) {
    for (t == null && (t = this.x); !this.tabs[++t] && t < this._cols; ) ;
    return t >= this._cols ? this._cols - 1 : t < 0 ? 0 : t;
  }
  clearMarkers(t) {
    this._isClearing = true;
    for (let e = 0; e < this.markers.length; e++) this.markers[e].line === t && (this.markers[e].dispose(), this.markers.splice(e--, 1));
    this._isClearing = false;
  }
  clearAllMarkers() {
    this._isClearing = true;
    for (let t = 0; t < this.markers.length; t++) this.markers[t].dispose();
    this.markers.length = 0, this._isClearing = false;
  }
  addMarker(t) {
    let e = new cn(t);
    return this.markers.push(e), e.register(this.lines.onTrim((i) => {
      e.line -= i, e.line < 0 && e.dispose();
    })), e.register(this.lines.onInsert((i) => {
      e.line >= i.index && (e.line += i.amount);
    })), e.register(this.lines.onDelete((i) => {
      e.line >= i.index && e.line < i.index + i.amount && e.dispose(), e.line > i.index && (e.line -= i.amount);
    })), e.register(e.onDispose(() => this._removeMarker(e))), e;
  }
  _removeMarker(t) {
    this._isClearing || this.markers.splice(this.markers.indexOf(t), 1);
  }
};
var hn = class extends D {
  constructor(e, i) {
    super();
    this._optionsService = e;
    this._bufferService = i;
    this._onBufferActivate = this._register(new v());
    this.onBufferActivate = this._onBufferActivate.event;
    this.reset(), this._register(this._optionsService.onSpecificOptionChange("scrollback", () => this.resize(this._bufferService.cols, this._bufferService.rows))), this._register(this._optionsService.onSpecificOptionChange("tabStopWidth", () => this.setupTabStops()));
  }
  reset() {
    this._normal = new $i(true, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new $i(false, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }), this.setupTabStops();
  }
  get alt() {
    return this._alt;
  }
  get active() {
    return this._activeBuffer;
  }
  get normal() {
    return this._normal;
  }
  activateNormalBuffer() {
    this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }));
  }
  activateAltBuffer(e) {
    this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({ activeBuffer: this._alt, inactiveBuffer: this._normal }));
  }
  resize(e, i) {
    this._normal.resize(e, i), this._alt.resize(e, i), this.setupTabStops(e);
  }
  setupTabStops(e) {
    this._normal.setupTabStops(e), this._alt.setupTabStops(e);
  }
};
var ks = 2;
var Cs = 1;
var ni = class extends D {
  constructor(e) {
    super();
    this.isUserScrolling = false;
    this._onResize = this._register(new v());
    this.onResize = this._onResize.event;
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this.cols = Math.max(e.rawOptions.cols || 0, ks), this.rows = Math.max(e.rawOptions.rows || 0, Cs), this.buffers = this._register(new hn(e, this)), this._register(this.buffers.onBufferActivate((i) => {
      this._onScroll.fire(i.activeBuffer.ydisp);
    }));
  }
  get buffer() {
    return this.buffers.active;
  }
  resize(e, i) {
    let r = this.cols !== e, n = this.rows !== i;
    this.cols = e, this.rows = i, this.buffers.resize(e, i), this._onResize.fire({ cols: e, rows: i, colsChanged: r, rowsChanged: n });
  }
  reset() {
    this.buffers.reset(), this.isUserScrolling = false;
  }
  scroll(e, i = false) {
    let r = this.buffer, n;
    n = this._cachedBlankLine, (!n || n.length !== this.cols || n.getFg(0) !== e.fg || n.getBg(0) !== e.bg) && (n = r.getBlankLine(e, i), this._cachedBlankLine = n), n.isWrapped = i;
    let o2 = r.ybase + r.scrollTop, l = r.ybase + r.scrollBottom;
    if (r.scrollTop === 0) {
      let a = r.lines.isFull;
      l === r.lines.length - 1 ? a ? r.lines.recycle().copyFrom(n) : r.lines.push(n.clone()) : r.lines.splice(l + 1, 0, n.clone()), a ? this.isUserScrolling && (r.ydisp = Math.max(r.ydisp - 1, 0)) : (r.ybase++, this.isUserScrolling || r.ydisp++);
    } else {
      let a = l - o2 + 1;
      r.lines.shiftElements(o2 + 1, a - 1, -1), r.lines.set(l, n.clone());
    }
    this.isUserScrolling || (r.ydisp = r.ybase), this._onScroll.fire(r.ydisp);
  }
  scrollLines(e, i) {
    let r = this.buffer;
    if (e < 0) {
      if (r.ydisp === 0) return;
      this.isUserScrolling = true;
    } else e + r.ydisp >= r.ybase && (this.isUserScrolling = false);
    let n = r.ydisp;
    r.ydisp = Math.max(Math.min(r.ydisp + e, r.ybase), 0), n !== r.ydisp && (i || this._onScroll.fire(r.ydisp));
  }
};
ni = M([S(0, H)], ni);
var si = { cols: 80, rows: 24, cursorBlink: false, cursorStyle: "block", cursorWidth: 1, cursorInactiveStyle: "outline", customGlyphs: true, drawBoldTextInBrightColors: true, documentOverride: null, fastScrollModifier: "alt", fastScrollSensitivity: 5, fontFamily: "monospace", fontSize: 15, fontWeight: "normal", fontWeightBold: "bold", ignoreBracketedPasteMode: false, lineHeight: 1, letterSpacing: 0, linkHandler: null, logLevel: "info", logger: null, scrollback: 1e3, scrollOnEraseInDisplay: false, scrollOnUserInput: true, scrollSensitivity: 1, screenReaderMode: false, smoothScrollDuration: 0, macOptionIsMeta: false, macOptionClickForcesSelection: false, minimumContrastRatio: 1, disableStdin: false, allowProposedApi: false, allowTransparency: false, tabStopWidth: 8, theme: {}, reflowCursorLine: false, rescaleOverlappingGlyphs: false, rightClickSelectsWord: Zt, windowOptions: {}, windowsMode: false, windowsPty: {}, wordSeparator: " ()[]{}',\"`", altClickMovesCursor: true, convertEol: false, termName: "xterm", cancelEvents: false, overviewRuler: {} };
var nc = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
var dn = class extends D {
  constructor(e) {
    super();
    this._onOptionChange = this._register(new v());
    this.onOptionChange = this._onOptionChange.event;
    let i = { ...si };
    for (let r in e) if (r in i) try {
      let n = e[r];
      i[r] = this._sanitizeAndValidateOption(r, n);
    } catch (n) {
      console.error(n);
    }
    this.rawOptions = i, this.options = { ...i }, this._setupOptions(), this._register(C(() => {
      this.rawOptions.linkHandler = null, this.rawOptions.documentOverride = null;
    }));
  }
  onSpecificOptionChange(e, i) {
    return this.onOptionChange((r) => {
      r === e && i(this.rawOptions[e]);
    });
  }
  onMultipleOptionChange(e, i) {
    return this.onOptionChange((r) => {
      e.indexOf(r) !== -1 && i();
    });
  }
  _setupOptions() {
    let e = (r) => {
      if (!(r in si)) throw new Error(`No option with key "${r}"`);
      return this.rawOptions[r];
    }, i = (r, n) => {
      if (!(r in si)) throw new Error(`No option with key "${r}"`);
      n = this._sanitizeAndValidateOption(r, n), this.rawOptions[r] !== n && (this.rawOptions[r] = n, this._onOptionChange.fire(r));
    };
    for (let r in this.rawOptions) {
      let n = { get: e.bind(this, r), set: i.bind(this, r) };
      Object.defineProperty(this.options, r, n);
    }
  }
  _sanitizeAndValidateOption(e, i) {
    switch (e) {
      case "cursorStyle":
        if (i || (i = si[e]), !sc(i)) throw new Error(`"${i}" is not a valid value for ${e}`);
        break;
      case "wordSeparator":
        i || (i = si[e]);
        break;
      case "fontWeight":
      case "fontWeightBold":
        if (typeof i == "number" && 1 <= i && i <= 1e3) break;
        i = nc.includes(i) ? i : si[e];
        break;
      case "cursorWidth":
        i = Math.floor(i);
      case "lineHeight":
      case "tabStopWidth":
        if (i < 1) throw new Error(`${e} cannot be less than 1, value: ${i}`);
        break;
      case "minimumContrastRatio":
        i = Math.max(1, Math.min(21, Math.round(i * 10) / 10));
        break;
      case "scrollback":
        if (i = Math.min(i, 4294967295), i < 0) throw new Error(`${e} cannot be less than 0, value: ${i}`);
        break;
      case "fastScrollSensitivity":
      case "scrollSensitivity":
        if (i <= 0) throw new Error(`${e} cannot be less than or equal to 0, value: ${i}`);
        break;
      case "rows":
      case "cols":
        if (!i && i !== 0) throw new Error(`${e} must be numeric, value: ${i}`);
        break;
      case "windowsPty":
        i = i ?? {};
        break;
    }
    return i;
  }
};
function sc(s15) {
  return s15 === "block" || s15 === "underline" || s15 === "bar";
}
function oi(s15, t = 5) {
  if (typeof s15 != "object") return s15;
  let e = Array.isArray(s15) ? [] : {};
  for (let i in s15) e[i] = t <= 1 ? s15[i] : s15[i] && oi(s15[i], t - 1);
  return e;
}
var ul = Object.freeze({ insertMode: false });
var hl = Object.freeze({ applicationCursorKeys: false, applicationKeypad: false, bracketedPasteMode: false, cursorBlink: void 0, cursorStyle: void 0, origin: false, reverseWraparound: false, sendFocus: false, synchronizedOutput: false, wraparound: true });
var li = class extends D {
  constructor(e, i, r) {
    super();
    this._bufferService = e;
    this._logService = i;
    this._optionsService = r;
    this.isCursorInitialized = false;
    this.isCursorHidden = false;
    this._onData = this._register(new v());
    this.onData = this._onData.event;
    this._onUserInput = this._register(new v());
    this.onUserInput = this._onUserInput.event;
    this._onBinary = this._register(new v());
    this.onBinary = this._onBinary.event;
    this._onRequestScrollToBottom = this._register(new v());
    this.onRequestScrollToBottom = this._onRequestScrollToBottom.event;
    this.modes = oi(ul), this.decPrivateModes = oi(hl);
  }
  reset() {
    this.modes = oi(ul), this.decPrivateModes = oi(hl);
  }
  triggerDataEvent(e, i = false) {
    if (this._optionsService.rawOptions.disableStdin) return;
    let r = this._bufferService.buffer;
    i && this._optionsService.rawOptions.scrollOnUserInput && r.ybase !== r.ydisp && this._onRequestScrollToBottom.fire(), i && this._onUserInput.fire(), this._logService.debug(`sending data "${e}"`), this._logService.trace("sending data (codes)", () => e.split("").map((n) => n.charCodeAt(0))), this._onData.fire(e);
  }
  triggerBinaryEvent(e) {
    this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e}"`), this._logService.trace("sending binary (codes)", () => e.split("").map((i) => i.charCodeAt(0))), this._onBinary.fire(e));
  }
};
li = M([S(0, F), S(1, nr), S(2, H)], li);
var dl = { NONE: { events: 0, restrict: () => false }, X10: { events: 1, restrict: (s15) => s15.button === 4 || s15.action !== 1 ? false : (s15.ctrl = false, s15.alt = false, s15.shift = false, true) }, VT200: { events: 19, restrict: (s15) => s15.action !== 32 }, DRAG: { events: 23, restrict: (s15) => !(s15.action === 32 && s15.button === 3) }, ANY: { events: 31, restrict: (s15) => true } };
function Ms(s15, t) {
  let e = (s15.ctrl ? 16 : 0) | (s15.shift ? 4 : 0) | (s15.alt ? 8 : 0);
  return s15.button === 4 ? (e |= 64, e |= s15.action) : (e |= s15.button & 3, s15.button & 4 && (e |= 64), s15.button & 8 && (e |= 128), s15.action === 32 ? e |= 32 : s15.action === 0 && !t && (e |= 3)), e;
}
var Ps = String.fromCharCode;
var fl = { DEFAULT: (s15) => {
  let t = [Ms(s15, false) + 32, s15.col + 32, s15.row + 32];
  return t[0] > 255 || t[1] > 255 || t[2] > 255 ? "" : `\x1B[M${Ps(t[0])}${Ps(t[1])}${Ps(t[2])}`;
}, SGR: (s15) => {
  let t = s15.action === 0 && s15.button !== 4 ? "m" : "M";
  return `\x1B[<${Ms(s15, true)};${s15.col};${s15.row}${t}`;
}, SGR_PIXELS: (s15) => {
  let t = s15.action === 0 && s15.button !== 4 ? "m" : "M";
  return `\x1B[<${Ms(s15, true)};${s15.x};${s15.y}${t}`;
} };
var ai = class extends D {
  constructor(e, i, r) {
    super();
    this._bufferService = e;
    this._coreService = i;
    this._optionsService = r;
    this._protocols = {};
    this._encodings = {};
    this._activeProtocol = "";
    this._activeEncoding = "";
    this._lastEvent = null;
    this._wheelPartialScroll = 0;
    this._onProtocolChange = this._register(new v());
    this.onProtocolChange = this._onProtocolChange.event;
    for (let n of Object.keys(dl)) this.addProtocol(n, dl[n]);
    for (let n of Object.keys(fl)) this.addEncoding(n, fl[n]);
    this.reset();
  }
  addProtocol(e, i) {
    this._protocols[e] = i;
  }
  addEncoding(e, i) {
    this._encodings[e] = i;
  }
  get activeProtocol() {
    return this._activeProtocol;
  }
  get areMouseEventsActive() {
    return this._protocols[this._activeProtocol].events !== 0;
  }
  set activeProtocol(e) {
    if (!this._protocols[e]) throw new Error(`unknown protocol "${e}"`);
    this._activeProtocol = e, this._onProtocolChange.fire(this._protocols[e].events);
  }
  get activeEncoding() {
    return this._activeEncoding;
  }
  set activeEncoding(e) {
    if (!this._encodings[e]) throw new Error(`unknown encoding "${e}"`);
    this._activeEncoding = e;
  }
  reset() {
    this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null, this._wheelPartialScroll = 0;
  }
  consumeWheelEvent(e, i, r) {
    if (e.deltaY === 0 || e.shiftKey || i === void 0 || r === void 0) return 0;
    let n = i / r, o2 = this._applyScrollModifier(e.deltaY, e);
    return e.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (o2 /= n + 0, Math.abs(e.deltaY) < 50 && (o2 *= 0.3), this._wheelPartialScroll += o2, o2 = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e.deltaMode === WheelEvent.DOM_DELTA_PAGE && (o2 *= this._bufferService.rows), o2;
  }
  _applyScrollModifier(e, i) {
    return i.altKey || i.ctrlKey || i.shiftKey ? e * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e * this._optionsService.rawOptions.scrollSensitivity;
  }
  triggerMouseEvent(e) {
    if (e.col < 0 || e.col >= this._bufferService.cols || e.row < 0 || e.row >= this._bufferService.rows || e.button === 4 && e.action === 32 || e.button === 3 && e.action !== 32 || e.button !== 4 && (e.action === 2 || e.action === 3) || (e.col++, e.row++, e.action === 32 && this._lastEvent && this._equalEvents(this._lastEvent, e, this._activeEncoding === "SGR_PIXELS")) || !this._protocols[this._activeProtocol].restrict(e)) return false;
    let i = this._encodings[this._activeEncoding](e);
    return i && (this._activeEncoding === "DEFAULT" ? this._coreService.triggerBinaryEvent(i) : this._coreService.triggerDataEvent(i, true)), this._lastEvent = e, true;
  }
  explainEvents(e) {
    return { down: !!(e & 1), up: !!(e & 2), drag: !!(e & 4), move: !!(e & 8), wheel: !!(e & 16) };
  }
  _equalEvents(e, i, r) {
    if (r) {
      if (e.x !== i.x || e.y !== i.y) return false;
    } else if (e.col !== i.col || e.row !== i.row) return false;
    return !(e.button !== i.button || e.action !== i.action || e.ctrl !== i.ctrl || e.alt !== i.alt || e.shift !== i.shift);
  }
};
ai = M([S(0, F), S(1, ge), S(2, H)], ai);
var Os = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]];
var ac = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
var se;
function cc(s15, t) {
  let e = 0, i = t.length - 1, r;
  if (s15 < t[0][0] || s15 > t[i][1]) return false;
  for (; i >= e; ) if (r = e + i >> 1, s15 > t[r][1]) e = r + 1;
  else if (s15 < t[r][0]) i = r - 1;
  else return true;
  return false;
}
var fn = class {
  constructor() {
    this.version = "6";
    if (!se) {
      se = new Uint8Array(65536), se.fill(1), se[0] = 0, se.fill(0, 1, 32), se.fill(0, 127, 160), se.fill(2, 4352, 4448), se[9001] = 2, se[9002] = 2, se.fill(2, 11904, 42192), se[12351] = 1, se.fill(2, 44032, 55204), se.fill(2, 63744, 64256), se.fill(2, 65040, 65050), se.fill(2, 65072, 65136), se.fill(2, 65280, 65377), se.fill(2, 65504, 65511);
      for (let t = 0; t < Os.length; ++t) se.fill(0, Os[t][0], Os[t][1] + 1);
    }
  }
  wcwidth(t) {
    return t < 32 ? 0 : t < 127 ? 1 : t < 65536 ? se[t] : cc(t, ac) ? 0 : t >= 131072 && t <= 196605 || t >= 196608 && t <= 262141 ? 2 : 1;
  }
  charProperties(t, e) {
    let i = this.wcwidth(t), r = i === 0 && e !== 0;
    if (r) {
      let n = Ae.extractWidth(e);
      n === 0 ? r = false : n > i && (i = n);
    }
    return Ae.createPropertyValue(0, i, r);
  }
};
var Ae = class s13 {
  constructor() {
    this._providers = /* @__PURE__ */ Object.create(null);
    this._active = "";
    this._onChange = new v();
    this.onChange = this._onChange.event;
    let t = new fn();
    this.register(t), this._active = t.version, this._activeProvider = t;
  }
  static extractShouldJoin(t) {
    return (t & 1) !== 0;
  }
  static extractWidth(t) {
    return t >> 1 & 3;
  }
  static extractCharKind(t) {
    return t >> 3;
  }
  static createPropertyValue(t, e, i = false) {
    return (t & 16777215) << 3 | (e & 3) << 1 | (i ? 1 : 0);
  }
  dispose() {
    this._onChange.dispose();
  }
  get versions() {
    return Object.keys(this._providers);
  }
  get activeVersion() {
    return this._active;
  }
  set activeVersion(t) {
    if (!this._providers[t]) throw new Error(`unknown Unicode version "${t}"`);
    this._active = t, this._activeProvider = this._providers[t], this._onChange.fire(t);
  }
  register(t) {
    this._providers[t.version] = t;
  }
  wcwidth(t) {
    return this._activeProvider.wcwidth(t);
  }
  getStringCellWidth(t) {
    let e = 0, i = 0, r = t.length;
    for (let n = 0; n < r; ++n) {
      let o2 = t.charCodeAt(n);
      if (55296 <= o2 && o2 <= 56319) {
        if (++n >= r) return e + this.wcwidth(o2);
        let u = t.charCodeAt(n);
        56320 <= u && u <= 57343 ? o2 = (o2 - 55296) * 1024 + u - 56320 + 65536 : e += this.wcwidth(u);
      }
      let l = this.charProperties(o2, i), a = s13.extractWidth(l);
      s13.extractShouldJoin(l) && (a -= s13.extractWidth(i)), e += a, i = l;
    }
    return e;
  }
  charProperties(t, e) {
    return this._activeProvider.charProperties(t, e);
  }
};
var pn = class {
  constructor() {
    this.glevel = 0;
    this._charsets = [];
  }
  reset() {
    this.charset = void 0, this._charsets = [], this.glevel = 0;
  }
  setgLevel(t) {
    this.glevel = t, this.charset = this._charsets[t];
  }
  setgCharset(t, e) {
    this._charsets[t] = e, this.glevel === t && (this.charset = e);
  }
};
function Bs(s15) {
  let e = s15.buffer.lines.get(s15.buffer.ybase + s15.buffer.y - 1)?.get(s15.cols - 1), i = s15.buffer.lines.get(s15.buffer.ybase + s15.buffer.y);
  i && e && (i.isWrapped = e[3] !== 0 && e[3] !== 32);
}
var Vi = 2147483647;
var uc = 256;
var ci = class s14 {
  constructor(t = 32, e = 32) {
    this.maxLength = t;
    this.maxSubParamsLength = e;
    if (e > uc) throw new Error("maxSubParamsLength must not be greater than 256");
    this.params = new Int32Array(t), this.length = 0, this._subParams = new Int32Array(e), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(t), this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
  }
  static fromArray(t) {
    let e = new s14();
    if (!t.length) return e;
    for (let i = Array.isArray(t[0]) ? 1 : 0; i < t.length; ++i) {
      let r = t[i];
      if (Array.isArray(r)) for (let n = 0; n < r.length; ++n) e.addSubParam(r[n]);
      else e.addParam(r);
    }
    return e;
  }
  clone() {
    let t = new s14(this.maxLength, this.maxSubParamsLength);
    return t.params.set(this.params), t.length = this.length, t._subParams.set(this._subParams), t._subParamsLength = this._subParamsLength, t._subParamsIdx.set(this._subParamsIdx), t._rejectDigits = this._rejectDigits, t._rejectSubDigits = this._rejectSubDigits, t._digitIsSub = this._digitIsSub, t;
  }
  toArray() {
    let t = [];
    for (let e = 0; e < this.length; ++e) {
      t.push(this.params[e]);
      let i = this._subParamsIdx[e] >> 8, r = this._subParamsIdx[e] & 255;
      r - i > 0 && t.push(Array.prototype.slice.call(this._subParams, i, r));
    }
    return t;
  }
  reset() {
    this.length = 0, this._subParamsLength = 0, this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
  }
  addParam(t) {
    if (this._digitIsSub = false, this.length >= this.maxLength) {
      this._rejectDigits = true;
      return;
    }
    if (t < -1) throw new Error("values lesser than -1 are not allowed");
    this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = t > Vi ? Vi : t;
  }
  addSubParam(t) {
    if (this._digitIsSub = true, !!this.length) {
      if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) {
        this._rejectSubDigits = true;
        return;
      }
      if (t < -1) throw new Error("values lesser than -1 are not allowed");
      this._subParams[this._subParamsLength++] = t > Vi ? Vi : t, this._subParamsIdx[this.length - 1]++;
    }
  }
  hasSubParams(t) {
    return (this._subParamsIdx[t] & 255) - (this._subParamsIdx[t] >> 8) > 0;
  }
  getSubParams(t) {
    let e = this._subParamsIdx[t] >> 8, i = this._subParamsIdx[t] & 255;
    return i - e > 0 ? this._subParams.subarray(e, i) : null;
  }
  getSubParamsAll() {
    let t = {};
    for (let e = 0; e < this.length; ++e) {
      let i = this._subParamsIdx[e] >> 8, r = this._subParamsIdx[e] & 255;
      r - i > 0 && (t[e] = this._subParams.slice(i, r));
    }
    return t;
  }
  addDigit(t) {
    let e;
    if (this._rejectDigits || !(e = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) return;
    let i = this._digitIsSub ? this._subParams : this.params, r = i[e - 1];
    i[e - 1] = ~r ? Math.min(r * 10 + t, Vi) : t;
  }
};
var qi = [];
var mn = class {
  constructor() {
    this._state = 0;
    this._active = qi;
    this._id = -1;
    this._handlers = /* @__PURE__ */ Object.create(null);
    this._handlerFb = () => {
    };
    this._stack = { paused: false, loopPosition: 0, fallThrough: false };
  }
  registerHandler(t, e) {
    this._handlers[t] === void 0 && (this._handlers[t] = []);
    let i = this._handlers[t];
    return i.push(e), { dispose: () => {
      let r = i.indexOf(e);
      r !== -1 && i.splice(r, 1);
    } };
  }
  clearHandler(t) {
    this._handlers[t] && delete this._handlers[t];
  }
  setHandlerFallback(t) {
    this._handlerFb = t;
  }
  dispose() {
    this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
    }, this._active = qi;
  }
  reset() {
    if (this._state === 2) for (let t = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; t >= 0; --t) this._active[t].end(false);
    this._stack.paused = false, this._active = qi, this._id = -1, this._state = 0;
  }
  _start() {
    if (this._active = this._handlers[this._id] || qi, !this._active.length) this._handlerFb(this._id, "START");
    else for (let t = this._active.length - 1; t >= 0; t--) this._active[t].start();
  }
  _put(t, e, i) {
    if (!this._active.length) this._handlerFb(this._id, "PUT", It(t, e, i));
    else for (let r = this._active.length - 1; r >= 0; r--) this._active[r].put(t, e, i);
  }
  start() {
    this.reset(), this._state = 1;
  }
  put(t, e, i) {
    if (this._state !== 3) {
      if (this._state === 1) for (; e < i; ) {
        let r = t[e++];
        if (r === 59) {
          this._state = 2, this._start();
          break;
        }
        if (r < 48 || 57 < r) {
          this._state = 3;
          return;
        }
        this._id === -1 && (this._id = 0), this._id = this._id * 10 + r - 48;
      }
      this._state === 2 && i - e > 0 && this._put(t, e, i);
    }
  }
  end(t, e = true) {
    if (this._state !== 0) {
      if (this._state !== 3) if (this._state === 1 && this._start(), !this._active.length) this._handlerFb(this._id, "END", t);
      else {
        let i = false, r = this._active.length - 1, n = false;
        if (this._stack.paused && (r = this._stack.loopPosition - 1, i = e, n = this._stack.fallThrough, this._stack.paused = false), !n && i === false) {
          for (; r >= 0 && (i = this._active[r].end(t), i !== true); r--) if (i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r, this._stack.fallThrough = false, i;
          r--;
        }
        for (; r >= 0; r--) if (i = this._active[r].end(false), i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r, this._stack.fallThrough = true, i;
      }
      this._active = qi, this._id = -1, this._state = 0;
    }
  }
};
var pe = class {
  constructor(t) {
    this._handler = t;
    this._data = "";
    this._hitLimit = false;
  }
  start() {
    this._data = "", this._hitLimit = false;
  }
  put(t, e, i) {
    this._hitLimit || (this._data += It(t, e, i), this._data.length > 1e7 && (this._data = "", this._hitLimit = true));
  }
  end(t) {
    let e = false;
    if (this._hitLimit) e = false;
    else if (t && (e = this._handler(this._data), e instanceof Promise)) return e.then((i) => (this._data = "", this._hitLimit = false, i));
    return this._data = "", this._hitLimit = false, e;
  }
};
var Yi = [];
var _n = class {
  constructor() {
    this._handlers = /* @__PURE__ */ Object.create(null);
    this._active = Yi;
    this._ident = 0;
    this._handlerFb = () => {
    };
    this._stack = { paused: false, loopPosition: 0, fallThrough: false };
  }
  dispose() {
    this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
    }, this._active = Yi;
  }
  registerHandler(t, e) {
    this._handlers[t] === void 0 && (this._handlers[t] = []);
    let i = this._handlers[t];
    return i.push(e), { dispose: () => {
      let r = i.indexOf(e);
      r !== -1 && i.splice(r, 1);
    } };
  }
  clearHandler(t) {
    this._handlers[t] && delete this._handlers[t];
  }
  setHandlerFallback(t) {
    this._handlerFb = t;
  }
  reset() {
    if (this._active.length) for (let t = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; t >= 0; --t) this._active[t].unhook(false);
    this._stack.paused = false, this._active = Yi, this._ident = 0;
  }
  hook(t, e) {
    if (this.reset(), this._ident = t, this._active = this._handlers[t] || Yi, !this._active.length) this._handlerFb(this._ident, "HOOK", e);
    else for (let i = this._active.length - 1; i >= 0; i--) this._active[i].hook(e);
  }
  put(t, e, i) {
    if (!this._active.length) this._handlerFb(this._ident, "PUT", It(t, e, i));
    else for (let r = this._active.length - 1; r >= 0; r--) this._active[r].put(t, e, i);
  }
  unhook(t, e = true) {
    if (!this._active.length) this._handlerFb(this._ident, "UNHOOK", t);
    else {
      let i = false, r = this._active.length - 1, n = false;
      if (this._stack.paused && (r = this._stack.loopPosition - 1, i = e, n = this._stack.fallThrough, this._stack.paused = false), !n && i === false) {
        for (; r >= 0 && (i = this._active[r].unhook(t), i !== true); r--) if (i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r, this._stack.fallThrough = false, i;
        r--;
      }
      for (; r >= 0; r--) if (i = this._active[r].unhook(false), i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r, this._stack.fallThrough = true, i;
    }
    this._active = Yi, this._ident = 0;
  }
};
var ji = new ci();
ji.addParam(0);
var Xi = class {
  constructor(t) {
    this._handler = t;
    this._data = "";
    this._params = ji;
    this._hitLimit = false;
  }
  hook(t) {
    this._params = t.length > 1 || t.params[0] ? t.clone() : ji, this._data = "", this._hitLimit = false;
  }
  put(t, e, i) {
    this._hitLimit || (this._data += It(t, e, i), this._data.length > 1e7 && (this._data = "", this._hitLimit = true));
  }
  unhook(t) {
    let e = false;
    if (this._hitLimit) e = false;
    else if (t && (e = this._handler(this._data, this._params), e instanceof Promise)) return e.then((i) => (this._params = ji, this._data = "", this._hitLimit = false, i));
    return this._params = ji, this._data = "", this._hitLimit = false, e;
  }
};
var Fs = class {
  constructor(t) {
    this.table = new Uint8Array(t);
  }
  setDefault(t, e) {
    this.table.fill(t << 4 | e);
  }
  add(t, e, i, r) {
    this.table[e << 8 | t] = i << 4 | r;
  }
  addMany(t, e, i, r) {
    for (let n = 0; n < t.length; n++) this.table[e << 8 | t[n]] = i << 4 | r;
  }
};
var ke = 160;
var hc = (function() {
  let s15 = new Fs(4095), e = Array.apply(null, Array(256)).map((a, u) => u), i = (a, u) => e.slice(a, u), r = i(32, 127), n = i(0, 24);
  n.push(25), n.push.apply(n, i(28, 32));
  let o2 = i(0, 14), l;
  s15.setDefault(1, 0), s15.addMany(r, 0, 2, 0);
  for (l in o2) s15.addMany([24, 26, 153, 154], l, 3, 0), s15.addMany(i(128, 144), l, 3, 0), s15.addMany(i(144, 152), l, 3, 0), s15.add(156, l, 0, 0), s15.add(27, l, 11, 1), s15.add(157, l, 4, 8), s15.addMany([152, 158, 159], l, 0, 7), s15.add(155, l, 11, 3), s15.add(144, l, 11, 9);
  return s15.addMany(n, 0, 3, 0), s15.addMany(n, 1, 3, 1), s15.add(127, 1, 0, 1), s15.addMany(n, 8, 0, 8), s15.addMany(n, 3, 3, 3), s15.add(127, 3, 0, 3), s15.addMany(n, 4, 3, 4), s15.add(127, 4, 0, 4), s15.addMany(n, 6, 3, 6), s15.addMany(n, 5, 3, 5), s15.add(127, 5, 0, 5), s15.addMany(n, 2, 3, 2), s15.add(127, 2, 0, 2), s15.add(93, 1, 4, 8), s15.addMany(r, 8, 5, 8), s15.add(127, 8, 5, 8), s15.addMany([156, 27, 24, 26, 7], 8, 6, 0), s15.addMany(i(28, 32), 8, 0, 8), s15.addMany([88, 94, 95], 1, 0, 7), s15.addMany(r, 7, 0, 7), s15.addMany(n, 7, 0, 7), s15.add(156, 7, 0, 0), s15.add(127, 7, 0, 7), s15.add(91, 1, 11, 3), s15.addMany(i(64, 127), 3, 7, 0), s15.addMany(i(48, 60), 3, 8, 4), s15.addMany([60, 61, 62, 63], 3, 9, 4), s15.addMany(i(48, 60), 4, 8, 4), s15.addMany(i(64, 127), 4, 7, 0), s15.addMany([60, 61, 62, 63], 4, 0, 6), s15.addMany(i(32, 64), 6, 0, 6), s15.add(127, 6, 0, 6), s15.addMany(i(64, 127), 6, 0, 0), s15.addMany(i(32, 48), 3, 9, 5), s15.addMany(i(32, 48), 5, 9, 5), s15.addMany(i(48, 64), 5, 0, 6), s15.addMany(i(64, 127), 5, 7, 0), s15.addMany(i(32, 48), 4, 9, 5), s15.addMany(i(32, 48), 1, 9, 2), s15.addMany(i(32, 48), 2, 9, 2), s15.addMany(i(48, 127), 2, 10, 0), s15.addMany(i(48, 80), 1, 10, 0), s15.addMany(i(81, 88), 1, 10, 0), s15.addMany([89, 90, 92], 1, 10, 0), s15.addMany(i(96, 127), 1, 10, 0), s15.add(80, 1, 11, 9), s15.addMany(n, 9, 0, 9), s15.add(127, 9, 0, 9), s15.addMany(i(28, 32), 9, 0, 9), s15.addMany(i(32, 48), 9, 9, 12), s15.addMany(i(48, 60), 9, 8, 10), s15.addMany([60, 61, 62, 63], 9, 9, 10), s15.addMany(n, 11, 0, 11), s15.addMany(i(32, 128), 11, 0, 11), s15.addMany(i(28, 32), 11, 0, 11), s15.addMany(n, 10, 0, 10), s15.add(127, 10, 0, 10), s15.addMany(i(28, 32), 10, 0, 10), s15.addMany(i(48, 60), 10, 8, 10), s15.addMany([60, 61, 62, 63], 10, 0, 11), s15.addMany(i(32, 48), 10, 9, 12), s15.addMany(n, 12, 0, 12), s15.add(127, 12, 0, 12), s15.addMany(i(28, 32), 12, 0, 12), s15.addMany(i(32, 48), 12, 9, 12), s15.addMany(i(48, 64), 12, 0, 11), s15.addMany(i(64, 127), 12, 12, 13), s15.addMany(i(64, 127), 10, 12, 13), s15.addMany(i(64, 127), 9, 12, 13), s15.addMany(n, 13, 13, 13), s15.addMany(r, 13, 13, 13), s15.add(127, 13, 0, 13), s15.addMany([27, 156, 24, 26], 13, 14, 0), s15.add(ke, 0, 2, 0), s15.add(ke, 8, 5, 8), s15.add(ke, 6, 0, 6), s15.add(ke, 11, 0, 11), s15.add(ke, 13, 13, 13), s15;
})();
var bn = class extends D {
  constructor(e = hc) {
    super();
    this._transitions = e;
    this._parseStack = { state: 0, handlers: [], handlerPos: 0, transition: 0, chunkPos: 0 };
    this.initialState = 0, this.currentState = this.initialState, this._params = new ci(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._printHandlerFb = (i, r, n) => {
    }, this._executeHandlerFb = (i) => {
    }, this._csiHandlerFb = (i, r) => {
    }, this._escHandlerFb = (i) => {
    }, this._errorHandlerFb = (i) => i, this._printHandler = this._printHandlerFb, this._executeHandlers = /* @__PURE__ */ Object.create(null), this._csiHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null), this._register(C(() => {
      this._csiHandlers = /* @__PURE__ */ Object.create(null), this._executeHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null);
    })), this._oscParser = this._register(new mn()), this._dcsParser = this._register(new _n()), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, () => true);
  }
  _identifier(e, i = [64, 126]) {
    let r = 0;
    if (e.prefix) {
      if (e.prefix.length > 1) throw new Error("only one byte as prefix supported");
      if (r = e.prefix.charCodeAt(0), r && 60 > r || r > 63) throw new Error("prefix must be in range 0x3c .. 0x3f");
    }
    if (e.intermediates) {
      if (e.intermediates.length > 2) throw new Error("only two bytes as intermediates are supported");
      for (let o2 = 0; o2 < e.intermediates.length; ++o2) {
        let l = e.intermediates.charCodeAt(o2);
        if (32 > l || l > 47) throw new Error("intermediate must be in range 0x20 .. 0x2f");
        r <<= 8, r |= l;
      }
    }
    if (e.final.length !== 1) throw new Error("final must be a single byte");
    let n = e.final.charCodeAt(0);
    if (i[0] > n || n > i[1]) throw new Error(`final must be in range ${i[0]} .. ${i[1]}`);
    return r <<= 8, r |= n, r;
  }
  identToString(e) {
    let i = [];
    for (; e; ) i.push(String.fromCharCode(e & 255)), e >>= 8;
    return i.reverse().join("");
  }
  setPrintHandler(e) {
    this._printHandler = e;
  }
  clearPrintHandler() {
    this._printHandler = this._printHandlerFb;
  }
  registerEscHandler(e, i) {
    let r = this._identifier(e, [48, 126]);
    this._escHandlers[r] === void 0 && (this._escHandlers[r] = []);
    let n = this._escHandlers[r];
    return n.push(i), { dispose: () => {
      let o2 = n.indexOf(i);
      o2 !== -1 && n.splice(o2, 1);
    } };
  }
  clearEscHandler(e) {
    this._escHandlers[this._identifier(e, [48, 126])] && delete this._escHandlers[this._identifier(e, [48, 126])];
  }
  setEscHandlerFallback(e) {
    this._escHandlerFb = e;
  }
  setExecuteHandler(e, i) {
    this._executeHandlers[e.charCodeAt(0)] = i;
  }
  clearExecuteHandler(e) {
    this._executeHandlers[e.charCodeAt(0)] && delete this._executeHandlers[e.charCodeAt(0)];
  }
  setExecuteHandlerFallback(e) {
    this._executeHandlerFb = e;
  }
  registerCsiHandler(e, i) {
    let r = this._identifier(e);
    this._csiHandlers[r] === void 0 && (this._csiHandlers[r] = []);
    let n = this._csiHandlers[r];
    return n.push(i), { dispose: () => {
      let o2 = n.indexOf(i);
      o2 !== -1 && n.splice(o2, 1);
    } };
  }
  clearCsiHandler(e) {
    this._csiHandlers[this._identifier(e)] && delete this._csiHandlers[this._identifier(e)];
  }
  setCsiHandlerFallback(e) {
    this._csiHandlerFb = e;
  }
  registerDcsHandler(e, i) {
    return this._dcsParser.registerHandler(this._identifier(e), i);
  }
  clearDcsHandler(e) {
    this._dcsParser.clearHandler(this._identifier(e));
  }
  setDcsHandlerFallback(e) {
    this._dcsParser.setHandlerFallback(e);
  }
  registerOscHandler(e, i) {
    return this._oscParser.registerHandler(e, i);
  }
  clearOscHandler(e) {
    this._oscParser.clearHandler(e);
  }
  setOscHandlerFallback(e) {
    this._oscParser.setHandlerFallback(e);
  }
  setErrorHandler(e) {
    this._errorHandler = e;
  }
  clearErrorHandler() {
    this._errorHandler = this._errorHandlerFb;
  }
  reset() {
    this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._parseStack.state !== 0 && (this._parseStack.state = 2, this._parseStack.handlers = []);
  }
  _preserveStack(e, i, r, n, o2) {
    this._parseStack.state = e, this._parseStack.handlers = i, this._parseStack.handlerPos = r, this._parseStack.transition = n, this._parseStack.chunkPos = o2;
  }
  parse(e, i, r) {
    let n = 0, o2 = 0, l = 0, a;
    if (this._parseStack.state) if (this._parseStack.state === 2) this._parseStack.state = 0, l = this._parseStack.chunkPos + 1;
    else {
      if (r === void 0 || this._parseStack.state === 1) throw this._parseStack.state = 1, new Error("improper continuation due to previous async handler, giving up parsing");
      let u = this._parseStack.handlers, h15 = this._parseStack.handlerPos - 1;
      switch (this._parseStack.state) {
        case 3:
          if (r === false && h15 > -1) {
            for (; h15 >= 0 && (a = u[h15](this._params), a !== true); h15--) if (a instanceof Promise) return this._parseStack.handlerPos = h15, a;
          }
          this._parseStack.handlers = [];
          break;
        case 4:
          if (r === false && h15 > -1) {
            for (; h15 >= 0 && (a = u[h15](), a !== true); h15--) if (a instanceof Promise) return this._parseStack.handlerPos = h15, a;
          }
          this._parseStack.handlers = [];
          break;
        case 6:
          if (n = e[this._parseStack.chunkPos], a = this._dcsParser.unhook(n !== 24 && n !== 26, r), a) return a;
          n === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
        case 5:
          if (n = e[this._parseStack.chunkPos], a = this._oscParser.end(n !== 24 && n !== 26, r), a) return a;
          n === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
      }
      this._parseStack.state = 0, l = this._parseStack.chunkPos + 1, this.precedingJoinState = 0, this.currentState = this._parseStack.transition & 15;
    }
    for (let u = l; u < i; ++u) {
      switch (n = e[u], o2 = this._transitions.table[this.currentState << 8 | (n < 160 ? n : ke)], o2 >> 4) {
        case 2:
          for (let m = u + 1; ; ++m) {
            if (m >= i || (n = e[m]) < 32 || n > 126 && n < ke) {
              this._printHandler(e, u, m), u = m - 1;
              break;
            }
            if (++m >= i || (n = e[m]) < 32 || n > 126 && n < ke) {
              this._printHandler(e, u, m), u = m - 1;
              break;
            }
            if (++m >= i || (n = e[m]) < 32 || n > 126 && n < ke) {
              this._printHandler(e, u, m), u = m - 1;
              break;
            }
            if (++m >= i || (n = e[m]) < 32 || n > 126 && n < ke) {
              this._printHandler(e, u, m), u = m - 1;
              break;
            }
          }
          break;
        case 3:
          this._executeHandlers[n] ? this._executeHandlers[n]() : this._executeHandlerFb(n), this.precedingJoinState = 0;
          break;
        case 0:
          break;
        case 1:
          if (this._errorHandler({ position: u, code: n, currentState: this.currentState, collect: this._collect, params: this._params, abort: false }).abort) return;
          break;
        case 7:
          let c = this._csiHandlers[this._collect << 8 | n], d = c ? c.length - 1 : -1;
          for (; d >= 0 && (a = c[d](this._params), a !== true); d--) if (a instanceof Promise) return this._preserveStack(3, c, d, o2, u), a;
          d < 0 && this._csiHandlerFb(this._collect << 8 | n, this._params), this.precedingJoinState = 0;
          break;
        case 8:
          do
            switch (n) {
              case 59:
                this._params.addParam(0);
                break;
              case 58:
                this._params.addSubParam(-1);
                break;
              default:
                this._params.addDigit(n - 48);
            }
          while (++u < i && (n = e[u]) > 47 && n < 60);
          u--;
          break;
        case 9:
          this._collect <<= 8, this._collect |= n;
          break;
        case 10:
          let _2 = this._escHandlers[this._collect << 8 | n], p = _2 ? _2.length - 1 : -1;
          for (; p >= 0 && (a = _2[p](), a !== true); p--) if (a instanceof Promise) return this._preserveStack(4, _2, p, o2, u), a;
          p < 0 && this._escHandlerFb(this._collect << 8 | n), this.precedingJoinState = 0;
          break;
        case 11:
          this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
        case 12:
          this._dcsParser.hook(this._collect << 8 | n, this._params);
          break;
        case 13:
          for (let m = u + 1; ; ++m) if (m >= i || (n = e[m]) === 24 || n === 26 || n === 27 || n > 127 && n < ke) {
            this._dcsParser.put(e, u, m), u = m - 1;
            break;
          }
          break;
        case 14:
          if (a = this._dcsParser.unhook(n !== 24 && n !== 26), a) return this._preserveStack(6, [], 0, o2, u), a;
          n === 27 && (o2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
          break;
        case 4:
          this._oscParser.start();
          break;
        case 5:
          for (let m = u + 1; ; m++) if (m >= i || (n = e[m]) < 32 || n > 127 && n < ke) {
            this._oscParser.put(e, u, m), u = m - 1;
            break;
          }
          break;
        case 6:
          if (a = this._oscParser.end(n !== 24 && n !== 26), a) return this._preserveStack(5, [], 0, o2, u), a;
          n === 27 && (o2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
          break;
      }
      this.currentState = o2 & 15;
    }
  }
};
var dc = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/;
var fc = /^[\da-f]+$/;
function Ws(s15) {
  if (!s15) return;
  let t = s15.toLowerCase();
  if (t.indexOf("rgb:") === 0) {
    t = t.slice(4);
    let e = dc.exec(t);
    if (e) {
      let i = e[1] ? 15 : e[4] ? 255 : e[7] ? 4095 : 65535;
      return [Math.round(parseInt(e[1] || e[4] || e[7] || e[10], 16) / i * 255), Math.round(parseInt(e[2] || e[5] || e[8] || e[11], 16) / i * 255), Math.round(parseInt(e[3] || e[6] || e[9] || e[12], 16) / i * 255)];
    }
  } else if (t.indexOf("#") === 0 && (t = t.slice(1), fc.exec(t) && [3, 6, 9, 12].includes(t.length))) {
    let e = t.length / 3, i = [0, 0, 0];
    for (let r = 0; r < 3; ++r) {
      let n = parseInt(t.slice(e * r, e * r + e), 16);
      i[r] = e === 1 ? n << 4 : e === 2 ? n : e === 3 ? n >> 4 : n >> 8;
    }
    return i;
  }
}
function Hs(s15, t) {
  let e = s15.toString(16), i = e.length < 2 ? "0" + e : e;
  switch (t) {
    case 4:
      return e[0];
    case 8:
      return i;
    case 12:
      return (i + i).slice(0, 3);
    default:
      return i + i;
  }
}
function ml(s15, t = 16) {
  let [e, i, r] = s15;
  return `rgb:${Hs(e, t)}/${Hs(i, t)}/${Hs(r, t)}`;
}
var mc = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 };
var ut = 131072;
var _l = 10;
function bl(s15, t) {
  if (s15 > 24) return t.setWinLines || false;
  switch (s15) {
    case 1:
      return !!t.restoreWin;
    case 2:
      return !!t.minimizeWin;
    case 3:
      return !!t.setWinPosition;
    case 4:
      return !!t.setWinSizePixels;
    case 5:
      return !!t.raiseWin;
    case 6:
      return !!t.lowerWin;
    case 7:
      return !!t.refreshWin;
    case 8:
      return !!t.setWinSizeChars;
    case 9:
      return !!t.maximizeWin;
    case 10:
      return !!t.fullscreenWin;
    case 11:
      return !!t.getWinState;
    case 13:
      return !!t.getWinPosition;
    case 14:
      return !!t.getWinSizePixels;
    case 15:
      return !!t.getScreenSizePixels;
    case 16:
      return !!t.getCellSizePixels;
    case 18:
      return !!t.getWinSizeChars;
    case 19:
      return !!t.getScreenSizeChars;
    case 20:
      return !!t.getIconTitle;
    case 21:
      return !!t.getWinTitle;
    case 22:
      return !!t.pushTitle;
    case 23:
      return !!t.popTitle;
    case 24:
      return !!t.setWinLines;
  }
  return false;
}
var vl = 5e3;
var gl = 0;
var vn = class extends D {
  constructor(e, i, r, n, o2, l, a, u, h15 = new bn()) {
    super();
    this._bufferService = e;
    this._charsetService = i;
    this._coreService = r;
    this._logService = n;
    this._optionsService = o2;
    this._oscLinkService = l;
    this._coreMouseService = a;
    this._unicodeService = u;
    this._parser = h15;
    this._parseBuffer = new Uint32Array(4096);
    this._stringDecoder = new er();
    this._utf8Decoder = new tr();
    this._windowTitle = "";
    this._iconName = "";
    this._windowTitleStack = [];
    this._iconNameStack = [];
    this._curAttrData = X.clone();
    this._eraseAttrDataInternal = X.clone();
    this._onRequestBell = this._register(new v());
    this.onRequestBell = this._onRequestBell.event;
    this._onRequestRefreshRows = this._register(new v());
    this.onRequestRefreshRows = this._onRequestRefreshRows.event;
    this._onRequestReset = this._register(new v());
    this.onRequestReset = this._onRequestReset.event;
    this._onRequestSendFocus = this._register(new v());
    this.onRequestSendFocus = this._onRequestSendFocus.event;
    this._onRequestSyncScrollBar = this._register(new v());
    this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event;
    this._onRequestWindowsOptionsReport = this._register(new v());
    this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event;
    this._onA11yChar = this._register(new v());
    this.onA11yChar = this._onA11yChar.event;
    this._onA11yTab = this._register(new v());
    this.onA11yTab = this._onA11yTab.event;
    this._onCursorMove = this._register(new v());
    this.onCursorMove = this._onCursorMove.event;
    this._onLineFeed = this._register(new v());
    this.onLineFeed = this._onLineFeed.event;
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this._onTitleChange = this._register(new v());
    this.onTitleChange = this._onTitleChange.event;
    this._onColor = this._register(new v());
    this.onColor = this._onColor.event;
    this._parseStack = { paused: false, cursorStartX: 0, cursorStartY: 0, decodedLength: 0, position: 0 };
    this._specialColors = [256, 257, 258];
    this._register(this._parser), this._dirtyRowTracker = new Zi(this._bufferService), this._activeBuffer = this._bufferService.buffer, this._register(this._bufferService.buffers.onBufferActivate((c) => this._activeBuffer = c.activeBuffer)), this._parser.setCsiHandlerFallback((c, d) => {
      this._logService.debug("Unknown CSI code: ", { identifier: this._parser.identToString(c), params: d.toArray() });
    }), this._parser.setEscHandlerFallback((c) => {
      this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(c) });
    }), this._parser.setExecuteHandlerFallback((c) => {
      this._logService.debug("Unknown EXECUTE code: ", { code: c });
    }), this._parser.setOscHandlerFallback((c, d, _2) => {
      this._logService.debug("Unknown OSC code: ", { identifier: c, action: d, data: _2 });
    }), this._parser.setDcsHandlerFallback((c, d, _2) => {
      d === "HOOK" && (_2 = _2.toArray()), this._logService.debug("Unknown DCS code: ", { identifier: this._parser.identToString(c), action: d, payload: _2 });
    }), this._parser.setPrintHandler((c, d, _2) => this.print(c, d, _2)), this._parser.registerCsiHandler({ final: "@" }, (c) => this.insertChars(c)), this._parser.registerCsiHandler({ intermediates: " ", final: "@" }, (c) => this.scrollLeft(c)), this._parser.registerCsiHandler({ final: "A" }, (c) => this.cursorUp(c)), this._parser.registerCsiHandler({ intermediates: " ", final: "A" }, (c) => this.scrollRight(c)), this._parser.registerCsiHandler({ final: "B" }, (c) => this.cursorDown(c)), this._parser.registerCsiHandler({ final: "C" }, (c) => this.cursorForward(c)), this._parser.registerCsiHandler({ final: "D" }, (c) => this.cursorBackward(c)), this._parser.registerCsiHandler({ final: "E" }, (c) => this.cursorNextLine(c)), this._parser.registerCsiHandler({ final: "F" }, (c) => this.cursorPrecedingLine(c)), this._parser.registerCsiHandler({ final: "G" }, (c) => this.cursorCharAbsolute(c)), this._parser.registerCsiHandler({ final: "H" }, (c) => this.cursorPosition(c)), this._parser.registerCsiHandler({ final: "I" }, (c) => this.cursorForwardTab(c)), this._parser.registerCsiHandler({ final: "J" }, (c) => this.eraseInDisplay(c, false)), this._parser.registerCsiHandler({ prefix: "?", final: "J" }, (c) => this.eraseInDisplay(c, true)), this._parser.registerCsiHandler({ final: "K" }, (c) => this.eraseInLine(c, false)), this._parser.registerCsiHandler({ prefix: "?", final: "K" }, (c) => this.eraseInLine(c, true)), this._parser.registerCsiHandler({ final: "L" }, (c) => this.insertLines(c)), this._parser.registerCsiHandler({ final: "M" }, (c) => this.deleteLines(c)), this._parser.registerCsiHandler({ final: "P" }, (c) => this.deleteChars(c)), this._parser.registerCsiHandler({ final: "S" }, (c) => this.scrollUp(c)), this._parser.registerCsiHandler({ final: "T" }, (c) => this.scrollDown(c)), this._parser.registerCsiHandler({ final: "X" }, (c) => this.eraseChars(c)), this._parser.registerCsiHandler({ final: "Z" }, (c) => this.cursorBackwardTab(c)), this._parser.registerCsiHandler({ final: "`" }, (c) => this.charPosAbsolute(c)), this._parser.registerCsiHandler({ final: "a" }, (c) => this.hPositionRelative(c)), this._parser.registerCsiHandler({ final: "b" }, (c) => this.repeatPrecedingCharacter(c)), this._parser.registerCsiHandler({ final: "c" }, (c) => this.sendDeviceAttributesPrimary(c)), this._parser.registerCsiHandler({ prefix: ">", final: "c" }, (c) => this.sendDeviceAttributesSecondary(c)), this._parser.registerCsiHandler({ final: "d" }, (c) => this.linePosAbsolute(c)), this._parser.registerCsiHandler({ final: "e" }, (c) => this.vPositionRelative(c)), this._parser.registerCsiHandler({ final: "f" }, (c) => this.hVPosition(c)), this._parser.registerCsiHandler({ final: "g" }, (c) => this.tabClear(c)), this._parser.registerCsiHandler({ final: "h" }, (c) => this.setMode(c)), this._parser.registerCsiHandler({ prefix: "?", final: "h" }, (c) => this.setModePrivate(c)), this._parser.registerCsiHandler({ final: "l" }, (c) => this.resetMode(c)), this._parser.registerCsiHandler({ prefix: "?", final: "l" }, (c) => this.resetModePrivate(c)), this._parser.registerCsiHandler({ final: "m" }, (c) => this.charAttributes(c)), this._parser.registerCsiHandler({ final: "n" }, (c) => this.deviceStatus(c)), this._parser.registerCsiHandler({ prefix: "?", final: "n" }, (c) => this.deviceStatusPrivate(c)), this._parser.registerCsiHandler({ intermediates: "!", final: "p" }, (c) => this.softReset(c)), this._parser.registerCsiHandler({ intermediates: " ", final: "q" }, (c) => this.setCursorStyle(c)), this._parser.registerCsiHandler({ final: "r" }, (c) => this.setScrollRegion(c)), this._parser.registerCsiHandler({ final: "s" }, (c) => this.saveCursor(c)), this._parser.registerCsiHandler({ final: "t" }, (c) => this.windowOptions(c)), this._parser.registerCsiHandler({ final: "u" }, (c) => this.restoreCursor(c)), this._parser.registerCsiHandler({ intermediates: "'", final: "}" }, (c) => this.insertColumns(c)), this._parser.registerCsiHandler({ intermediates: "'", final: "~" }, (c) => this.deleteColumns(c)), this._parser.registerCsiHandler({ intermediates: '"', final: "q" }, (c) => this.selectProtected(c)), this._parser.registerCsiHandler({ intermediates: "$", final: "p" }, (c) => this.requestMode(c, true)), this._parser.registerCsiHandler({ prefix: "?", intermediates: "$", final: "p" }, (c) => this.requestMode(c, false)), this._parser.setExecuteHandler(b.BEL, () => this.bell()), this._parser.setExecuteHandler(b.LF, () => this.lineFeed()), this._parser.setExecuteHandler(b.VT, () => this.lineFeed()), this._parser.setExecuteHandler(b.FF, () => this.lineFeed()), this._parser.setExecuteHandler(b.CR, () => this.carriageReturn()), this._parser.setExecuteHandler(b.BS, () => this.backspace()), this._parser.setExecuteHandler(b.HT, () => this.tab()), this._parser.setExecuteHandler(b.SO, () => this.shiftOut()), this._parser.setExecuteHandler(b.SI, () => this.shiftIn()), this._parser.setExecuteHandler(Ai.IND, () => this.index()), this._parser.setExecuteHandler(Ai.NEL, () => this.nextLine()), this._parser.setExecuteHandler(Ai.HTS, () => this.tabSet()), this._parser.registerOscHandler(0, new pe((c) => (this.setTitle(c), this.setIconName(c), true))), this._parser.registerOscHandler(1, new pe((c) => this.setIconName(c))), this._parser.registerOscHandler(2, new pe((c) => this.setTitle(c))), this._parser.registerOscHandler(4, new pe((c) => this.setOrReportIndexedColor(c))), this._parser.registerOscHandler(8, new pe((c) => this.setHyperlink(c))), this._parser.registerOscHandler(10, new pe((c) => this.setOrReportFgColor(c))), this._parser.registerOscHandler(11, new pe((c) => this.setOrReportBgColor(c))), this._parser.registerOscHandler(12, new pe((c) => this.setOrReportCursorColor(c))), this._parser.registerOscHandler(104, new pe((c) => this.restoreIndexedColor(c))), this._parser.registerOscHandler(110, new pe((c) => this.restoreFgColor(c))), this._parser.registerOscHandler(111, new pe((c) => this.restoreBgColor(c))), this._parser.registerOscHandler(112, new pe((c) => this.restoreCursorColor(c))), this._parser.registerEscHandler({ final: "7" }, () => this.saveCursor()), this._parser.registerEscHandler({ final: "8" }, () => this.restoreCursor()), this._parser.registerEscHandler({ final: "D" }, () => this.index()), this._parser.registerEscHandler({ final: "E" }, () => this.nextLine()), this._parser.registerEscHandler({ final: "H" }, () => this.tabSet()), this._parser.registerEscHandler({ final: "M" }, () => this.reverseIndex()), this._parser.registerEscHandler({ final: "=" }, () => this.keypadApplicationMode()), this._parser.registerEscHandler({ final: ">" }, () => this.keypadNumericMode()), this._parser.registerEscHandler({ final: "c" }, () => this.fullReset()), this._parser.registerEscHandler({ final: "n" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "o" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "|" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "}" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "~" }, () => this.setgLevel(1)), this._parser.registerEscHandler({ intermediates: "%", final: "@" }, () => this.selectDefaultCharset()), this._parser.registerEscHandler({ intermediates: "%", final: "G" }, () => this.selectDefaultCharset());
    for (let c in ne) this._parser.registerEscHandler({ intermediates: "(", final: c }, () => this.selectCharset("(" + c)), this._parser.registerEscHandler({ intermediates: ")", final: c }, () => this.selectCharset(")" + c)), this._parser.registerEscHandler({ intermediates: "*", final: c }, () => this.selectCharset("*" + c)), this._parser.registerEscHandler({ intermediates: "+", final: c }, () => this.selectCharset("+" + c)), this._parser.registerEscHandler({ intermediates: "-", final: c }, () => this.selectCharset("-" + c)), this._parser.registerEscHandler({ intermediates: ".", final: c }, () => this.selectCharset("." + c)), this._parser.registerEscHandler({ intermediates: "/", final: c }, () => this.selectCharset("/" + c));
    this._parser.registerEscHandler({ intermediates: "#", final: "8" }, () => this.screenAlignmentPattern()), this._parser.setErrorHandler((c) => (this._logService.error("Parsing error: ", c), c)), this._parser.registerDcsHandler({ intermediates: "$", final: "q" }, new Xi((c, d) => this.requestStatusString(c, d)));
  }
  getAttrData() {
    return this._curAttrData;
  }
  _preserveStack(e, i, r, n) {
    this._parseStack.paused = true, this._parseStack.cursorStartX = e, this._parseStack.cursorStartY = i, this._parseStack.decodedLength = r, this._parseStack.position = n;
  }
  _logSlowResolvingAsync(e) {
    this._logService.logLevel <= 3 && Promise.race([e, new Promise((i, r) => setTimeout(() => r("#SLOW_TIMEOUT"), vl))]).catch((i) => {
      if (i !== "#SLOW_TIMEOUT") throw i;
      console.warn(`async parser handler taking longer than ${vl} ms`);
    });
  }
  _getCurrentLinkId() {
    return this._curAttrData.extended.urlId;
  }
  parse(e, i) {
    let r, n = this._activeBuffer.x, o2 = this._activeBuffer.y, l = 0, a = this._parseStack.paused;
    if (a) {
      if (r = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, i)) return this._logSlowResolvingAsync(r), r;
      n = this._parseStack.cursorStartX, o2 = this._parseStack.cursorStartY, this._parseStack.paused = false, e.length > ut && (l = this._parseStack.position + ut);
    }
    if (this._logService.logLevel <= 1 && this._logService.debug(`parsing data ${typeof e == "string" ? ` "${e}"` : ` "${Array.prototype.map.call(e, (c) => String.fromCharCode(c)).join("")}"`}`), this._logService.logLevel === 0 && this._logService.trace("parsing data (codes)", typeof e == "string" ? e.split("").map((c) => c.charCodeAt(0)) : e), this._parseBuffer.length < e.length && this._parseBuffer.length < ut && (this._parseBuffer = new Uint32Array(Math.min(e.length, ut))), a || this._dirtyRowTracker.clearRange(), e.length > ut) for (let c = l; c < e.length; c += ut) {
      let d = c + ut < e.length ? c + ut : e.length, _2 = typeof e == "string" ? this._stringDecoder.decode(e.substring(c, d), this._parseBuffer) : this._utf8Decoder.decode(e.subarray(c, d), this._parseBuffer);
      if (r = this._parser.parse(this._parseBuffer, _2)) return this._preserveStack(n, o2, _2, c), this._logSlowResolvingAsync(r), r;
    }
    else if (!a) {
      let c = typeof e == "string" ? this._stringDecoder.decode(e, this._parseBuffer) : this._utf8Decoder.decode(e, this._parseBuffer);
      if (r = this._parser.parse(this._parseBuffer, c)) return this._preserveStack(n, o2, c, 0), this._logSlowResolvingAsync(r), r;
    }
    (this._activeBuffer.x !== n || this._activeBuffer.y !== o2) && this._onCursorMove.fire();
    let u = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp), h15 = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
    h15 < this._bufferService.rows && this._onRequestRefreshRows.fire({ start: Math.min(h15, this._bufferService.rows - 1), end: Math.min(u, this._bufferService.rows - 1) });
  }
  print(e, i, r) {
    let n, o2, l = this._charsetService.charset, a = this._optionsService.rawOptions.screenReaderMode, u = this._bufferService.cols, h15 = this._coreService.decPrivateModes.wraparound, c = this._coreService.modes.insertMode, d = this._curAttrData, _2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && r - i > 0 && _2.getWidth(this._activeBuffer.x - 1) === 2 && _2.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, d);
    let p = this._parser.precedingJoinState;
    for (let m = i; m < r; ++m) {
      if (n = e[m], n < 127 && l) {
        let O = l[String.fromCharCode(n)];
        O && (n = O.charCodeAt(0));
      }
      let f = this._unicodeService.charProperties(n, p);
      o2 = Ae.extractWidth(f);
      let A = Ae.extractShouldJoin(f), R = A ? Ae.extractWidth(p) : 0;
      if (p = f, a && this._onA11yChar.fire(Ce(n)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), this._activeBuffer.x + o2 - R > u) {
        if (h15) {
          let O = _2, I = this._activeBuffer.x - R;
          for (this._activeBuffer.x = R, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), true)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = true), _2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y), R > 0 && _2 instanceof Ze && _2.copyCellsFrom(O, I, 0, R, false); I < u; ) O.setCellFromCodepoint(I++, 0, 1, d);
        } else if (this._activeBuffer.x = u - 1, o2 === 2) continue;
      }
      if (A && this._activeBuffer.x) {
        let O = _2.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
        _2.addCodepointToCell(this._activeBuffer.x - O, n, o2);
        for (let I = o2 - R; --I >= 0; ) _2.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, d);
        continue;
      }
      if (c && (_2.insertCells(this._activeBuffer.x, o2 - R, this._activeBuffer.getNullCell(d)), _2.getWidth(u - 1) === 2 && _2.setCellFromCodepoint(u - 1, 0, 1, d)), _2.setCellFromCodepoint(this._activeBuffer.x++, n, o2, d), o2 > 0) for (; --o2; ) _2.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, d);
    }
    this._parser.precedingJoinState = p, this._activeBuffer.x < u && r - i > 0 && _2.getWidth(this._activeBuffer.x) === 0 && !_2.hasContent(this._activeBuffer.x) && _2.setCellFromCodepoint(this._activeBuffer.x, 0, 1, d), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  registerCsiHandler(e, i) {
    return e.final === "t" && !e.prefix && !e.intermediates ? this._parser.registerCsiHandler(e, (r) => bl(r.params[0], this._optionsService.rawOptions.windowOptions) ? i(r) : true) : this._parser.registerCsiHandler(e, i);
  }
  registerDcsHandler(e, i) {
    return this._parser.registerDcsHandler(e, new Xi(i));
  }
  registerEscHandler(e, i) {
    return this._parser.registerEscHandler(e, i);
  }
  registerOscHandler(e, i) {
    return this._parser.registerOscHandler(e, new pe(i));
  }
  bell() {
    return this._onRequestBell.fire(), true;
  }
  lineFeed() {
    return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), true;
  }
  carriageReturn() {
    return this._activeBuffer.x = 0, true;
  }
  backspace() {
    if (!this._coreService.decPrivateModes.reverseWraparound) return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, true;
    if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0) this._activeBuffer.x--;
    else if (this._activeBuffer.x === 0 && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)?.isWrapped) {
      this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
      let e = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
      e.hasWidth(this._activeBuffer.x) && !e.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
    }
    return this._restrictCursor(), true;
  }
  tab() {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let e = this._activeBuffer.x;
    return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e), true;
  }
  shiftOut() {
    return this._charsetService.setgLevel(1), true;
  }
  shiftIn() {
    return this._charsetService.setgLevel(0), true;
  }
  _restrictCursor(e = this._bufferService.cols - 1) {
    this._activeBuffer.x = Math.min(e, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  _setCursor(e, i) {
    this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e, this._activeBuffer.y = this._activeBuffer.scrollTop + i) : (this._activeBuffer.x = e, this._activeBuffer.y = i), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  _moveCursor(e, i) {
    this._restrictCursor(), this._setCursor(this._activeBuffer.x + e, this._activeBuffer.y + i);
  }
  cursorUp(e) {
    let i = this._activeBuffer.y - this._activeBuffer.scrollTop;
    return i >= 0 ? this._moveCursor(0, -Math.min(i, e.params[0] || 1)) : this._moveCursor(0, -(e.params[0] || 1)), true;
  }
  cursorDown(e) {
    let i = this._activeBuffer.scrollBottom - this._activeBuffer.y;
    return i >= 0 ? this._moveCursor(0, Math.min(i, e.params[0] || 1)) : this._moveCursor(0, e.params[0] || 1), true;
  }
  cursorForward(e) {
    return this._moveCursor(e.params[0] || 1, 0), true;
  }
  cursorBackward(e) {
    return this._moveCursor(-(e.params[0] || 1), 0), true;
  }
  cursorNextLine(e) {
    return this.cursorDown(e), this._activeBuffer.x = 0, true;
  }
  cursorPrecedingLine(e) {
    return this.cursorUp(e), this._activeBuffer.x = 0, true;
  }
  cursorCharAbsolute(e) {
    return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), true;
  }
  cursorPosition(e) {
    return this._setCursor(e.length >= 2 ? (e.params[1] || 1) - 1 : 0, (e.params[0] || 1) - 1), true;
  }
  charPosAbsolute(e) {
    return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), true;
  }
  hPositionRelative(e) {
    return this._moveCursor(e.params[0] || 1, 0), true;
  }
  linePosAbsolute(e) {
    return this._setCursor(this._activeBuffer.x, (e.params[0] || 1) - 1), true;
  }
  vPositionRelative(e) {
    return this._moveCursor(0, e.params[0] || 1), true;
  }
  hVPosition(e) {
    return this.cursorPosition(e), true;
  }
  tabClear(e) {
    let i = e.params[0];
    return i === 0 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : i === 3 && (this._activeBuffer.tabs = {}), true;
  }
  cursorForwardTab(e) {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let i = e.params[0] || 1;
    for (; i--; ) this._activeBuffer.x = this._activeBuffer.nextStop();
    return true;
  }
  cursorBackwardTab(e) {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let i = e.params[0] || 1;
    for (; i--; ) this._activeBuffer.x = this._activeBuffer.prevStop();
    return true;
  }
  selectProtected(e) {
    let i = e.params[0];
    return i === 1 && (this._curAttrData.bg |= 536870912), (i === 2 || i === 0) && (this._curAttrData.bg &= -536870913), true;
  }
  _eraseInBufferLine(e, i, r, n = false, o2 = false) {
    let l = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
    l.replaceCells(i, r, this._activeBuffer.getNullCell(this._eraseAttrData()), o2), n && (l.isWrapped = false);
  }
  _resetBufferLine(e, i = false) {
    let r = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
    r && (r.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), i), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e), r.isWrapped = false);
  }
  eraseInDisplay(e, i = false) {
    this._restrictCursor(this._bufferService.cols);
    let r;
    switch (e.params[0]) {
      case 0:
        for (r = this._activeBuffer.y, this._dirtyRowTracker.markDirty(r), this._eraseInBufferLine(r++, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, i); r < this._bufferService.rows; r++) this._resetBufferLine(r, i);
        this._dirtyRowTracker.markDirty(r);
        break;
      case 1:
        for (r = this._activeBuffer.y, this._dirtyRowTracker.markDirty(r), this._eraseInBufferLine(r, 0, this._activeBuffer.x + 1, true, i), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(r + 1).isWrapped = false); r--; ) this._resetBufferLine(r, i);
        this._dirtyRowTracker.markDirty(0);
        break;
      case 2:
        if (this._optionsService.rawOptions.scrollOnEraseInDisplay) {
          for (r = this._bufferService.rows, this._dirtyRowTracker.markRangeDirty(0, r - 1); r-- && !this._activeBuffer.lines.get(this._activeBuffer.ybase + r)?.getTrimmedLength(); ) ;
          for (; r >= 0; r--) this._bufferService.scroll(this._eraseAttrData());
        } else {
          for (r = this._bufferService.rows, this._dirtyRowTracker.markDirty(r - 1); r--; ) this._resetBufferLine(r, i);
          this._dirtyRowTracker.markDirty(0);
        }
        break;
      case 3:
        let n = this._activeBuffer.lines.length - this._bufferService.rows;
        n > 0 && (this._activeBuffer.lines.trimStart(n), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - n, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - n, 0), this._onScroll.fire(0));
        break;
    }
    return true;
  }
  eraseInLine(e, i = false) {
    switch (this._restrictCursor(this._bufferService.cols), e.params[0]) {
      case 0:
        this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, i);
        break;
      case 1:
        this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, false, i);
        break;
      case 2:
        this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, true, i);
        break;
    }
    return this._dirtyRowTracker.markDirty(this._activeBuffer.y), true;
  }
  insertLines(e) {
    this._restrictCursor();
    let i = e.params[0] || 1;
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let r = this._activeBuffer.ybase + this._activeBuffer.y, n = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, o2 = this._bufferService.rows - 1 + this._activeBuffer.ybase - n + 1;
    for (; i--; ) this._activeBuffer.lines.splice(o2 - 1, 1), this._activeBuffer.lines.splice(r, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
  }
  deleteLines(e) {
    this._restrictCursor();
    let i = e.params[0] || 1;
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let r = this._activeBuffer.ybase + this._activeBuffer.y, n;
    for (n = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, n = this._bufferService.rows - 1 + this._activeBuffer.ybase - n; i--; ) this._activeBuffer.lines.splice(r, 1), this._activeBuffer.lines.splice(n, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
  }
  insertChars(e) {
    this._restrictCursor();
    let i = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i && (i.insertCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  deleteChars(e) {
    this._restrictCursor();
    let i = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i && (i.deleteCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  scrollUp(e) {
    let i = e.params[0] || 1;
    for (; i--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollDown(e) {
    let i = e.params[0] || 1;
    for (; i--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(X));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollLeft(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e.params[0] || 1;
    for (let r = this._activeBuffer.scrollTop; r <= this._activeBuffer.scrollBottom; ++r) {
      let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + r);
      n.deleteCells(0, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollRight(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e.params[0] || 1;
    for (let r = this._activeBuffer.scrollTop; r <= this._activeBuffer.scrollBottom; ++r) {
      let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + r);
      n.insertCells(0, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  insertColumns(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e.params[0] || 1;
    for (let r = this._activeBuffer.scrollTop; r <= this._activeBuffer.scrollBottom; ++r) {
      let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + r);
      n.insertCells(this._activeBuffer.x, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  deleteColumns(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e.params[0] || 1;
    for (let r = this._activeBuffer.scrollTop; r <= this._activeBuffer.scrollBottom; ++r) {
      let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + r);
      n.deleteCells(this._activeBuffer.x, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  eraseChars(e) {
    this._restrictCursor();
    let i = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i && (i.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  repeatPrecedingCharacter(e) {
    let i = this._parser.precedingJoinState;
    if (!i) return true;
    let r = e.params[0] || 1, n = Ae.extractWidth(i), o2 = this._activeBuffer.x - n, a = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(o2), u = new Uint32Array(a.length * r), h15 = 0;
    for (let d = 0; d < a.length; ) {
      let _2 = a.codePointAt(d) || 0;
      u[h15++] = _2, d += _2 > 65535 ? 2 : 1;
    }
    let c = h15;
    for (let d = 1; d < r; ++d) u.copyWithin(c, 0, h15), c += h15;
    return this.print(u, 0, c), true;
  }
  sendDeviceAttributesPrimary(e) {
    return e.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(b.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(b.ESC + "[?6c")), true;
  }
  sendDeviceAttributesSecondary(e) {
    return e.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(b.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(b.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(b.ESC + "[>83;40003;0c")), true;
  }
  _is(e) {
    return (this._optionsService.rawOptions.termName + "").indexOf(e) === 0;
  }
  setMode(e) {
    for (let i = 0; i < e.length; i++) switch (e.params[i]) {
      case 4:
        this._coreService.modes.insertMode = true;
        break;
      case 20:
        this._optionsService.options.convertEol = true;
        break;
    }
    return true;
  }
  setModePrivate(e) {
    for (let i = 0; i < e.length; i++) switch (e.params[i]) {
      case 1:
        this._coreService.decPrivateModes.applicationCursorKeys = true;
        break;
      case 2:
        this._charsetService.setgCharset(0, Je), this._charsetService.setgCharset(1, Je), this._charsetService.setgCharset(2, Je), this._charsetService.setgCharset(3, Je);
        break;
      case 3:
        this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
        break;
      case 6:
        this._coreService.decPrivateModes.origin = true, this._setCursor(0, 0);
        break;
      case 7:
        this._coreService.decPrivateModes.wraparound = true;
        break;
      case 12:
        this._optionsService.options.cursorBlink = true;
        break;
      case 45:
        this._coreService.decPrivateModes.reverseWraparound = true;
        break;
      case 66:
        this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire();
        break;
      case 9:
        this._coreMouseService.activeProtocol = "X10";
        break;
      case 1e3:
        this._coreMouseService.activeProtocol = "VT200";
        break;
      case 1002:
        this._coreMouseService.activeProtocol = "DRAG";
        break;
      case 1003:
        this._coreMouseService.activeProtocol = "ANY";
        break;
      case 1004:
        this._coreService.decPrivateModes.sendFocus = true, this._onRequestSendFocus.fire();
        break;
      case 1005:
        this._logService.debug("DECSET 1005 not supported (see #2507)");
        break;
      case 1006:
        this._coreMouseService.activeEncoding = "SGR";
        break;
      case 1015:
        this._logService.debug("DECSET 1015 not supported (see #2507)");
        break;
      case 1016:
        this._coreMouseService.activeEncoding = "SGR_PIXELS";
        break;
      case 25:
        this._coreService.isCursorHidden = false;
        break;
      case 1048:
        this.saveCursor();
        break;
      case 1049:
        this.saveCursor();
      case 47:
      case 1047:
        this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
        break;
      case 2004:
        this._coreService.decPrivateModes.bracketedPasteMode = true;
        break;
      case 2026:
        this._coreService.decPrivateModes.synchronizedOutput = true;
        break;
    }
    return true;
  }
  resetMode(e) {
    for (let i = 0; i < e.length; i++) switch (e.params[i]) {
      case 4:
        this._coreService.modes.insertMode = false;
        break;
      case 20:
        this._optionsService.options.convertEol = false;
        break;
    }
    return true;
  }
  resetModePrivate(e) {
    for (let i = 0; i < e.length; i++) switch (e.params[i]) {
      case 1:
        this._coreService.decPrivateModes.applicationCursorKeys = false;
        break;
      case 3:
        this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
        break;
      case 6:
        this._coreService.decPrivateModes.origin = false, this._setCursor(0, 0);
        break;
      case 7:
        this._coreService.decPrivateModes.wraparound = false;
        break;
      case 12:
        this._optionsService.options.cursorBlink = false;
        break;
      case 45:
        this._coreService.decPrivateModes.reverseWraparound = false;
        break;
      case 66:
        this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire();
        break;
      case 9:
      case 1e3:
      case 1002:
      case 1003:
        this._coreMouseService.activeProtocol = "NONE";
        break;
      case 1004:
        this._coreService.decPrivateModes.sendFocus = false;
        break;
      case 1005:
        this._logService.debug("DECRST 1005 not supported (see #2507)");
        break;
      case 1006:
        this._coreMouseService.activeEncoding = "DEFAULT";
        break;
      case 1015:
        this._logService.debug("DECRST 1015 not supported (see #2507)");
        break;
      case 1016:
        this._coreMouseService.activeEncoding = "DEFAULT";
        break;
      case 25:
        this._coreService.isCursorHidden = true;
        break;
      case 1048:
        this.restoreCursor();
        break;
      case 1049:
      case 47:
      case 1047:
        this._bufferService.buffers.activateNormalBuffer(), e.params[i] === 1049 && this.restoreCursor(), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
        break;
      case 2004:
        this._coreService.decPrivateModes.bracketedPasteMode = false;
        break;
      case 2026:
        this._coreService.decPrivateModes.synchronizedOutput = false, this._onRequestRefreshRows.fire(void 0);
        break;
    }
    return true;
  }
  requestMode(e, i) {
    let r;
    ((P) => (P[P.NOT_RECOGNIZED = 0] = "NOT_RECOGNIZED", P[P.SET = 1] = "SET", P[P.RESET = 2] = "RESET", P[P.PERMANENTLY_SET = 3] = "PERMANENTLY_SET", P[P.PERMANENTLY_RESET = 4] = "PERMANENTLY_RESET"))(r || (r = {}));
    let n = this._coreService.decPrivateModes, { activeProtocol: o2, activeEncoding: l } = this._coreMouseService, a = this._coreService, { buffers: u, cols: h15 } = this._bufferService, { active: c, alt: d } = u, _2 = this._optionsService.rawOptions, p = (A, R) => (a.triggerDataEvent(`${b.ESC}[${i ? "" : "?"}${A};${R}$y`), true), m = (A) => A ? 1 : 2, f = e.params[0];
    return i ? f === 2 ? p(f, 4) : f === 4 ? p(f, m(a.modes.insertMode)) : f === 12 ? p(f, 3) : f === 20 ? p(f, m(_2.convertEol)) : p(f, 0) : f === 1 ? p(f, m(n.applicationCursorKeys)) : f === 3 ? p(f, _2.windowOptions.setWinLines ? h15 === 80 ? 2 : h15 === 132 ? 1 : 0 : 0) : f === 6 ? p(f, m(n.origin)) : f === 7 ? p(f, m(n.wraparound)) : f === 8 ? p(f, 3) : f === 9 ? p(f, m(o2 === "X10")) : f === 12 ? p(f, m(_2.cursorBlink)) : f === 25 ? p(f, m(!a.isCursorHidden)) : f === 45 ? p(f, m(n.reverseWraparound)) : f === 66 ? p(f, m(n.applicationKeypad)) : f === 67 ? p(f, 4) : f === 1e3 ? p(f, m(o2 === "VT200")) : f === 1002 ? p(f, m(o2 === "DRAG")) : f === 1003 ? p(f, m(o2 === "ANY")) : f === 1004 ? p(f, m(n.sendFocus)) : f === 1005 ? p(f, 4) : f === 1006 ? p(f, m(l === "SGR")) : f === 1015 ? p(f, 4) : f === 1016 ? p(f, m(l === "SGR_PIXELS")) : f === 1048 ? p(f, 1) : f === 47 || f === 1047 || f === 1049 ? p(f, m(c === d)) : f === 2004 ? p(f, m(n.bracketedPasteMode)) : f === 2026 ? p(f, m(n.synchronizedOutput)) : p(f, 0);
  }
  _updateAttrColor(e, i, r, n, o2) {
    return i === 2 ? (e |= 50331648, e &= -16777216, e |= De.fromColorRGB([r, n, o2])) : i === 5 && (e &= -50331904, e |= 33554432 | r & 255), e;
  }
  _extractColor(e, i, r) {
    let n = [0, 0, -1, 0, 0, 0], o2 = 0, l = 0;
    do {
      if (n[l + o2] = e.params[i + l], e.hasSubParams(i + l)) {
        let a = e.getSubParams(i + l), u = 0;
        do
          n[1] === 5 && (o2 = 1), n[l + u + 1 + o2] = a[u];
        while (++u < a.length && u + l + 1 + o2 < n.length);
        break;
      }
      if (n[1] === 5 && l + o2 >= 2 || n[1] === 2 && l + o2 >= 5) break;
      n[1] && (o2 = 1);
    } while (++l + i < e.length && l + o2 < n.length);
    for (let a = 2; a < n.length; ++a) n[a] === -1 && (n[a] = 0);
    switch (n[0]) {
      case 38:
        r.fg = this._updateAttrColor(r.fg, n[1], n[3], n[4], n[5]);
        break;
      case 48:
        r.bg = this._updateAttrColor(r.bg, n[1], n[3], n[4], n[5]);
        break;
      case 58:
        r.extended = r.extended.clone(), r.extended.underlineColor = this._updateAttrColor(r.extended.underlineColor, n[1], n[3], n[4], n[5]);
    }
    return l;
  }
  _processUnderline(e, i) {
    i.extended = i.extended.clone(), (!~e || e > 5) && (e = 1), i.extended.underlineStyle = e, i.fg |= 268435456, e === 0 && (i.fg &= -268435457), i.updateExtended();
  }
  _processSGR0(e) {
    e.fg = X.fg, e.bg = X.bg, e.extended = e.extended.clone(), e.extended.underlineStyle = 0, e.extended.underlineColor &= -67108864, e.updateExtended();
  }
  charAttributes(e) {
    if (e.length === 1 && e.params[0] === 0) return this._processSGR0(this._curAttrData), true;
    let i = e.length, r, n = this._curAttrData;
    for (let o2 = 0; o2 < i; o2++) r = e.params[o2], r >= 30 && r <= 37 ? (n.fg &= -50331904, n.fg |= 16777216 | r - 30) : r >= 40 && r <= 47 ? (n.bg &= -50331904, n.bg |= 16777216 | r - 40) : r >= 90 && r <= 97 ? (n.fg &= -50331904, n.fg |= 16777216 | r - 90 | 8) : r >= 100 && r <= 107 ? (n.bg &= -50331904, n.bg |= 16777216 | r - 100 | 8) : r === 0 ? this._processSGR0(n) : r === 1 ? n.fg |= 134217728 : r === 3 ? n.bg |= 67108864 : r === 4 ? (n.fg |= 268435456, this._processUnderline(e.hasSubParams(o2) ? e.getSubParams(o2)[0] : 1, n)) : r === 5 ? n.fg |= 536870912 : r === 7 ? n.fg |= 67108864 : r === 8 ? n.fg |= 1073741824 : r === 9 ? n.fg |= 2147483648 : r === 2 ? n.bg |= 134217728 : r === 21 ? this._processUnderline(2, n) : r === 22 ? (n.fg &= -134217729, n.bg &= -134217729) : r === 23 ? n.bg &= -67108865 : r === 24 ? (n.fg &= -268435457, this._processUnderline(0, n)) : r === 25 ? n.fg &= -536870913 : r === 27 ? n.fg &= -67108865 : r === 28 ? n.fg &= -1073741825 : r === 29 ? n.fg &= 2147483647 : r === 39 ? (n.fg &= -67108864, n.fg |= X.fg & 16777215) : r === 49 ? (n.bg &= -67108864, n.bg |= X.bg & 16777215) : r === 38 || r === 48 || r === 58 ? o2 += this._extractColor(e, o2, n) : r === 53 ? n.bg |= 1073741824 : r === 55 ? n.bg &= -1073741825 : r === 59 ? (n.extended = n.extended.clone(), n.extended.underlineColor = -1, n.updateExtended()) : r === 100 ? (n.fg &= -67108864, n.fg |= X.fg & 16777215, n.bg &= -67108864, n.bg |= X.bg & 16777215) : this._logService.debug("Unknown SGR attribute: %d.", r);
    return true;
  }
  deviceStatus(e) {
    switch (e.params[0]) {
      case 5:
        this._coreService.triggerDataEvent(`${b.ESC}[0n`);
        break;
      case 6:
        let i = this._activeBuffer.y + 1, r = this._activeBuffer.x + 1;
        this._coreService.triggerDataEvent(`${b.ESC}[${i};${r}R`);
        break;
    }
    return true;
  }
  deviceStatusPrivate(e) {
    switch (e.params[0]) {
      case 6:
        let i = this._activeBuffer.y + 1, r = this._activeBuffer.x + 1;
        this._coreService.triggerDataEvent(`${b.ESC}[?${i};${r}R`);
        break;
      case 15:
        break;
      case 25:
        break;
      case 26:
        break;
      case 53:
        break;
    }
    return true;
  }
  softReset(e) {
    return this._coreService.isCursorHidden = false, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = X.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = false, true;
  }
  setCursorStyle(e) {
    let i = e.length === 0 ? 1 : e.params[0];
    if (i === 0) this._coreService.decPrivateModes.cursorStyle = void 0, this._coreService.decPrivateModes.cursorBlink = void 0;
    else {
      switch (i) {
        case 1:
        case 2:
          this._coreService.decPrivateModes.cursorStyle = "block";
          break;
        case 3:
        case 4:
          this._coreService.decPrivateModes.cursorStyle = "underline";
          break;
        case 5:
        case 6:
          this._coreService.decPrivateModes.cursorStyle = "bar";
          break;
      }
      let r = i % 2 === 1;
      this._coreService.decPrivateModes.cursorBlink = r;
    }
    return true;
  }
  setScrollRegion(e) {
    let i = e.params[0] || 1, r;
    return (e.length < 2 || (r = e.params[1]) > this._bufferService.rows || r === 0) && (r = this._bufferService.rows), r > i && (this._activeBuffer.scrollTop = i - 1, this._activeBuffer.scrollBottom = r - 1, this._setCursor(0, 0)), true;
  }
  windowOptions(e) {
    if (!bl(e.params[0], this._optionsService.rawOptions.windowOptions)) return true;
    let i = e.length > 1 ? e.params[1] : 0;
    switch (e.params[0]) {
      case 14:
        i !== 2 && this._onRequestWindowsOptionsReport.fire(0);
        break;
      case 16:
        this._onRequestWindowsOptionsReport.fire(1);
        break;
      case 18:
        this._bufferService && this._coreService.triggerDataEvent(`${b.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
        break;
      case 22:
        (i === 0 || i === 2) && (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > _l && this._windowTitleStack.shift()), (i === 0 || i === 1) && (this._iconNameStack.push(this._iconName), this._iconNameStack.length > _l && this._iconNameStack.shift());
        break;
      case 23:
        (i === 0 || i === 2) && this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), (i === 0 || i === 1) && this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
        break;
    }
    return true;
  }
  saveCursor(e) {
    return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, true;
  }
  restoreCursor(e) {
    return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), true;
  }
  setTitle(e) {
    return this._windowTitle = e, this._onTitleChange.fire(e), true;
  }
  setIconName(e) {
    return this._iconName = e, true;
  }
  setOrReportIndexedColor(e) {
    let i = [], r = e.split(";");
    for (; r.length > 1; ) {
      let n = r.shift(), o2 = r.shift();
      if (/^\d+$/.exec(n)) {
        let l = parseInt(n);
        if (Sl(l)) if (o2 === "?") i.push({ type: 0, index: l });
        else {
          let a = Ws(o2);
          a && i.push({ type: 1, index: l, color: a });
        }
      }
    }
    return i.length && this._onColor.fire(i), true;
  }
  setHyperlink(e) {
    let i = e.indexOf(";");
    if (i === -1) return true;
    let r = e.slice(0, i).trim(), n = e.slice(i + 1);
    return n ? this._createHyperlink(r, n) : r.trim() ? false : this._finishHyperlink();
  }
  _createHyperlink(e, i) {
    this._getCurrentLinkId() && this._finishHyperlink();
    let r = e.split(":"), n, o2 = r.findIndex((l) => l.startsWith("id="));
    return o2 !== -1 && (n = r[o2].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({ id: n, uri: i }), this._curAttrData.updateExtended(), true;
  }
  _finishHyperlink() {
    return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), true;
  }
  _setOrReportSpecialColor(e, i) {
    let r = e.split(";");
    for (let n = 0; n < r.length && !(i >= this._specialColors.length); ++n, ++i) if (r[n] === "?") this._onColor.fire([{ type: 0, index: this._specialColors[i] }]);
    else {
      let o2 = Ws(r[n]);
      o2 && this._onColor.fire([{ type: 1, index: this._specialColors[i], color: o2 }]);
    }
    return true;
  }
  setOrReportFgColor(e) {
    return this._setOrReportSpecialColor(e, 0);
  }
  setOrReportBgColor(e) {
    return this._setOrReportSpecialColor(e, 1);
  }
  setOrReportCursorColor(e) {
    return this._setOrReportSpecialColor(e, 2);
  }
  restoreIndexedColor(e) {
    if (!e) return this._onColor.fire([{ type: 2 }]), true;
    let i = [], r = e.split(";");
    for (let n = 0; n < r.length; ++n) if (/^\d+$/.exec(r[n])) {
      let o2 = parseInt(r[n]);
      Sl(o2) && i.push({ type: 2, index: o2 });
    }
    return i.length && this._onColor.fire(i), true;
  }
  restoreFgColor(e) {
    return this._onColor.fire([{ type: 2, index: 256 }]), true;
  }
  restoreBgColor(e) {
    return this._onColor.fire([{ type: 2, index: 257 }]), true;
  }
  restoreCursorColor(e) {
    return this._onColor.fire([{ type: 2, index: 258 }]), true;
  }
  nextLine() {
    return this._activeBuffer.x = 0, this.index(), true;
  }
  keypadApplicationMode() {
    return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire(), true;
  }
  keypadNumericMode() {
    return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire(), true;
  }
  selectDefaultCharset() {
    return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, Je), true;
  }
  selectCharset(e) {
    return e.length !== 2 ? (this.selectDefaultCharset(), true) : (e[0] === "/" || this._charsetService.setgCharset(mc[e[0]], ne[e[1]] || Je), true);
  }
  index() {
    return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), true;
  }
  tabSet() {
    return this._activeBuffer.tabs[this._activeBuffer.x] = true, true;
  }
  reverseIndex() {
    if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
      let e = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
      this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
    } else this._activeBuffer.y--, this._restrictCursor();
    return true;
  }
  fullReset() {
    return this._parser.reset(), this._onRequestReset.fire(), true;
  }
  reset() {
    this._curAttrData = X.clone(), this._eraseAttrDataInternal = X.clone();
  }
  _eraseAttrData() {
    return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= this._curAttrData.bg & 67108863, this._eraseAttrDataInternal;
  }
  setgLevel(e) {
    return this._charsetService.setgLevel(e), true;
  }
  screenAlignmentPattern() {
    let e = new q();
    e.content = 1 << 22 | 69, e.fg = this._curAttrData.fg, e.bg = this._curAttrData.bg, this._setCursor(0, 0);
    for (let i = 0; i < this._bufferService.rows; ++i) {
      let r = this._activeBuffer.ybase + this._activeBuffer.y + i, n = this._activeBuffer.lines.get(r);
      n && (n.fill(e), n.isWrapped = false);
    }
    return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), true;
  }
  requestStatusString(e, i) {
    let r = (a) => (this._coreService.triggerDataEvent(`${b.ESC}${a}${b.ESC}\\`), true), n = this._bufferService.buffer, o2 = this._optionsService.rawOptions, l = { block: 2, underline: 4, bar: 6 };
    return r(e === '"q' ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : e === '"p' ? 'P1$r61;1"p' : e === "r" ? `P1$r${n.scrollTop + 1};${n.scrollBottom + 1}r` : e === "m" ? "P1$r0m" : e === " q" ? `P1$r${l[o2.cursorStyle] - (o2.cursorBlink ? 1 : 0)} q` : "P0$r");
  }
  markRangeDirty(e, i) {
    this._dirtyRowTracker.markRangeDirty(e, i);
  }
};
var Zi = class {
  constructor(t) {
    this._bufferService = t;
    this.clearRange();
  }
  clearRange() {
    this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
  }
  markDirty(t) {
    t < this.start ? this.start = t : t > this.end && (this.end = t);
  }
  markRangeDirty(t, e) {
    t > e && (gl = t, t = e, e = gl), t < this.start && (this.start = t), e > this.end && (this.end = e);
  }
  markAllDirty() {
    this.markRangeDirty(0, this._bufferService.rows - 1);
  }
};
Zi = M([S(0, F)], Zi);
function Sl(s15) {
  return 0 <= s15 && s15 < 256;
}
var _c = 5e7;
var El = 12;
var bc = 50;
var gn = class extends D {
  constructor(e) {
    super();
    this._action = e;
    this._writeBuffer = [];
    this._callbacks = [];
    this._pendingData = 0;
    this._bufferOffset = 0;
    this._isSyncWriting = false;
    this._syncCalls = 0;
    this._didUserInput = false;
    this._onWriteParsed = this._register(new v());
    this.onWriteParsed = this._onWriteParsed.event;
  }
  handleUserInput() {
    this._didUserInput = true;
  }
  writeSync(e, i) {
    if (i !== void 0 && this._syncCalls > i) {
      this._syncCalls = 0;
      return;
    }
    if (this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting) return;
    this._isSyncWriting = true;
    let r;
    for (; r = this._writeBuffer.shift(); ) {
      this._action(r);
      let n = this._callbacks.shift();
      n && n();
    }
    this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = false, this._syncCalls = 0;
  }
  write(e, i) {
    if (this._pendingData > _c) throw new Error("write data discarded, use flow control to avoid losing data");
    if (!this._writeBuffer.length) {
      if (this._bufferOffset = 0, this._didUserInput) {
        this._didUserInput = false, this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(i), this._innerWrite();
        return;
      }
      setTimeout(() => this._innerWrite());
    }
    this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(i);
  }
  _innerWrite(e = 0, i = true) {
    let r = e || performance.now();
    for (; this._writeBuffer.length > this._bufferOffset; ) {
      let n = this._writeBuffer[this._bufferOffset], o2 = this._action(n, i);
      if (o2) {
        let a = (u) => performance.now() - r >= El ? setTimeout(() => this._innerWrite(0, u)) : this._innerWrite(r, u);
        o2.catch((u) => (queueMicrotask(() => {
          throw u;
        }), Promise.resolve(false))).then(a);
        return;
      }
      let l = this._callbacks[this._bufferOffset];
      if (l && l(), this._bufferOffset++, this._pendingData -= n.length, performance.now() - r >= El) break;
    }
    this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > bc && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout(() => this._innerWrite())) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
  }
};
var ui = class {
  constructor(t) {
    this._bufferService = t;
    this._nextId = 1;
    this._entriesWithId = /* @__PURE__ */ new Map();
    this._dataByLinkId = /* @__PURE__ */ new Map();
  }
  registerLink(t) {
    let e = this._bufferService.buffer;
    if (t.id === void 0) {
      let a = e.addMarker(e.ybase + e.y), u = { data: t, id: this._nextId++, lines: [a] };
      return a.onDispose(() => this._removeMarkerFromLink(u, a)), this._dataByLinkId.set(u.id, u), u.id;
    }
    let i = t, r = this._getEntryIdKey(i), n = this._entriesWithId.get(r);
    if (n) return this.addLineToLink(n.id, e.ybase + e.y), n.id;
    let o2 = e.addMarker(e.ybase + e.y), l = { id: this._nextId++, key: this._getEntryIdKey(i), data: i, lines: [o2] };
    return o2.onDispose(() => this._removeMarkerFromLink(l, o2)), this._entriesWithId.set(l.key, l), this._dataByLinkId.set(l.id, l), l.id;
  }
  addLineToLink(t, e) {
    let i = this._dataByLinkId.get(t);
    if (i && i.lines.every((r) => r.line !== e)) {
      let r = this._bufferService.buffer.addMarker(e);
      i.lines.push(r), r.onDispose(() => this._removeMarkerFromLink(i, r));
    }
  }
  getLinkData(t) {
    return this._dataByLinkId.get(t)?.data;
  }
  _getEntryIdKey(t) {
    return `${t.id};;${t.uri}`;
  }
  _removeMarkerFromLink(t, e) {
    let i = t.lines.indexOf(e);
    i !== -1 && (t.lines.splice(i, 1), t.lines.length === 0 && (t.data.id !== void 0 && this._entriesWithId.delete(t.key), this._dataByLinkId.delete(t.id)));
  }
};
ui = M([S(0, F)], ui);
var Tl = false;
var Sn = class extends D {
  constructor(e) {
    super();
    this._windowsWrappingHeuristics = this._register(new ye());
    this._onBinary = this._register(new v());
    this.onBinary = this._onBinary.event;
    this._onData = this._register(new v());
    this.onData = this._onData.event;
    this._onLineFeed = this._register(new v());
    this.onLineFeed = this._onLineFeed.event;
    this._onResize = this._register(new v());
    this.onResize = this._onResize.event;
    this._onWriteParsed = this._register(new v());
    this.onWriteParsed = this._onWriteParsed.event;
    this._onScroll = this._register(new v());
    this._instantiationService = new ln(), this.optionsService = this._register(new dn(e)), this._instantiationService.setService(H, this.optionsService), this._bufferService = this._register(this._instantiationService.createInstance(ni)), this._instantiationService.setService(F, this._bufferService), this._logService = this._register(this._instantiationService.createInstance(ii)), this._instantiationService.setService(nr, this._logService), this.coreService = this._register(this._instantiationService.createInstance(li)), this._instantiationService.setService(ge, this.coreService), this.coreMouseService = this._register(this._instantiationService.createInstance(ai)), this._instantiationService.setService(rr, this.coreMouseService), this.unicodeService = this._register(this._instantiationService.createInstance(Ae)), this._instantiationService.setService(Js, this.unicodeService), this._charsetService = this._instantiationService.createInstance(pn), this._instantiationService.setService(Zs, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(ui), this._instantiationService.setService(sr, this._oscLinkService), this._inputHandler = this._register(new vn(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this._register($.forward(this._inputHandler.onLineFeed, this._onLineFeed)), this._register(this._inputHandler), this._register($.forward(this._bufferService.onResize, this._onResize)), this._register($.forward(this.coreService.onData, this._onData)), this._register($.forward(this.coreService.onBinary, this._onBinary)), this._register(this.coreService.onRequestScrollToBottom(() => this.scrollToBottom(true))), this._register(this.coreService.onUserInput(() => this._writeBuffer.handleUserInput())), this._register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], () => this._handleWindowsPtyOptionChange())), this._register(this._bufferService.onScroll(() => {
      this._onScroll.fire({ position: this._bufferService.buffer.ydisp }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
    })), this._writeBuffer = this._register(new gn((i, r) => this._inputHandler.parse(i, r))), this._register($.forward(this._writeBuffer.onWriteParsed, this._onWriteParsed));
  }
  get onScroll() {
    return this._onScrollApi || (this._onScrollApi = this._register(new v()), this._onScroll.event((e) => {
      this._onScrollApi?.fire(e.position);
    })), this._onScrollApi.event;
  }
  get cols() {
    return this._bufferService.cols;
  }
  get rows() {
    return this._bufferService.rows;
  }
  get buffers() {
    return this._bufferService.buffers;
  }
  get options() {
    return this.optionsService.options;
  }
  set options(e) {
    for (let i in e) this.optionsService.options[i] = e[i];
  }
  write(e, i) {
    this._writeBuffer.write(e, i);
  }
  writeSync(e, i) {
    this._logService.logLevel <= 3 && !Tl && (this._logService.warn("writeSync is unreliable and will be removed soon."), Tl = true), this._writeBuffer.writeSync(e, i);
  }
  input(e, i = true) {
    this.coreService.triggerDataEvent(e, i);
  }
  resize(e, i) {
    isNaN(e) || isNaN(i) || (e = Math.max(e, ks), i = Math.max(i, Cs), this._bufferService.resize(e, i));
  }
  scroll(e, i = false) {
    this._bufferService.scroll(e, i);
  }
  scrollLines(e, i) {
    this._bufferService.scrollLines(e, i);
  }
  scrollPages(e) {
    this.scrollLines(e * (this.rows - 1));
  }
  scrollToTop() {
    this.scrollLines(-this._bufferService.buffer.ydisp);
  }
  scrollToBottom(e) {
    this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
  }
  scrollToLine(e) {
    let i = e - this._bufferService.buffer.ydisp;
    i !== 0 && this.scrollLines(i);
  }
  registerEscHandler(e, i) {
    return this._inputHandler.registerEscHandler(e, i);
  }
  registerDcsHandler(e, i) {
    return this._inputHandler.registerDcsHandler(e, i);
  }
  registerCsiHandler(e, i) {
    return this._inputHandler.registerCsiHandler(e, i);
  }
  registerOscHandler(e, i) {
    return this._inputHandler.registerOscHandler(e, i);
  }
  _setup() {
    this._handleWindowsPtyOptionChange();
  }
  reset() {
    this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
  }
  _handleWindowsPtyOptionChange() {
    let e = false, i = this.optionsService.rawOptions.windowsPty;
    i && i.buildNumber !== void 0 && i.buildNumber !== void 0 ? e = i.backend === "conpty" && i.buildNumber < 21376 : this.optionsService.rawOptions.windowsMode && (e = true), e ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
  }
  _enableWindowsWrappingHeuristics() {
    if (!this._windowsWrappingHeuristics.value) {
      let e = [];
      e.push(this.onLineFeed(Bs.bind(null, this._bufferService))), e.push(this.registerCsiHandler({ final: "H" }, () => (Bs(this._bufferService), false))), this._windowsWrappingHeuristics.value = C(() => {
        for (let i of e) i.dispose();
      });
    }
  }
};
var gc = { 48: ["0", ")"], 49: ["1", "!"], 50: ["2", "@"], 51: ["3", "#"], 52: ["4", "$"], 53: ["5", "%"], 54: ["6", "^"], 55: ["7", "&"], 56: ["8", "*"], 57: ["9", "("], 186: [";", ":"], 187: ["=", "+"], 188: [",", "<"], 189: ["-", "_"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"], 219: ["[", "{"], 220: ["\\", "|"], 221: ["]", "}"], 222: ["'", '"'] };
function Il(s15, t, e, i) {
  let r = { type: 0, cancel: false, key: void 0 }, n = (s15.shiftKey ? 1 : 0) | (s15.altKey ? 2 : 0) | (s15.ctrlKey ? 4 : 0) | (s15.metaKey ? 8 : 0);
  switch (s15.keyCode) {
    case 0:
      s15.key === "UIKeyInputUpArrow" ? t ? r.key = b.ESC + "OA" : r.key = b.ESC + "[A" : s15.key === "UIKeyInputLeftArrow" ? t ? r.key = b.ESC + "OD" : r.key = b.ESC + "[D" : s15.key === "UIKeyInputRightArrow" ? t ? r.key = b.ESC + "OC" : r.key = b.ESC + "[C" : s15.key === "UIKeyInputDownArrow" && (t ? r.key = b.ESC + "OB" : r.key = b.ESC + "[B");
      break;
    case 8:
      r.key = s15.ctrlKey ? "\b" : b.DEL, s15.altKey && (r.key = b.ESC + r.key);
      break;
    case 9:
      if (s15.shiftKey) {
        r.key = b.ESC + "[Z";
        break;
      }
      r.key = b.HT, r.cancel = true;
      break;
    case 13:
      r.key = s15.altKey ? b.ESC + b.CR : b.CR, r.cancel = true;
      break;
    case 27:
      r.key = b.ESC, s15.altKey && (r.key = b.ESC + b.ESC), r.cancel = true;
      break;
    case 37:
      if (s15.metaKey) break;
      n ? r.key = b.ESC + "[1;" + (n + 1) + "D" : t ? r.key = b.ESC + "OD" : r.key = b.ESC + "[D";
      break;
    case 39:
      if (s15.metaKey) break;
      n ? r.key = b.ESC + "[1;" + (n + 1) + "C" : t ? r.key = b.ESC + "OC" : r.key = b.ESC + "[C";
      break;
    case 38:
      if (s15.metaKey) break;
      n ? r.key = b.ESC + "[1;" + (n + 1) + "A" : t ? r.key = b.ESC + "OA" : r.key = b.ESC + "[A";
      break;
    case 40:
      if (s15.metaKey) break;
      n ? r.key = b.ESC + "[1;" + (n + 1) + "B" : t ? r.key = b.ESC + "OB" : r.key = b.ESC + "[B";
      break;
    case 45:
      !s15.shiftKey && !s15.ctrlKey && (r.key = b.ESC + "[2~");
      break;
    case 46:
      n ? r.key = b.ESC + "[3;" + (n + 1) + "~" : r.key = b.ESC + "[3~";
      break;
    case 36:
      n ? r.key = b.ESC + "[1;" + (n + 1) + "H" : t ? r.key = b.ESC + "OH" : r.key = b.ESC + "[H";
      break;
    case 35:
      n ? r.key = b.ESC + "[1;" + (n + 1) + "F" : t ? r.key = b.ESC + "OF" : r.key = b.ESC + "[F";
      break;
    case 33:
      s15.shiftKey ? r.type = 2 : s15.ctrlKey ? r.key = b.ESC + "[5;" + (n + 1) + "~" : r.key = b.ESC + "[5~";
      break;
    case 34:
      s15.shiftKey ? r.type = 3 : s15.ctrlKey ? r.key = b.ESC + "[6;" + (n + 1) + "~" : r.key = b.ESC + "[6~";
      break;
    case 112:
      n ? r.key = b.ESC + "[1;" + (n + 1) + "P" : r.key = b.ESC + "OP";
      break;
    case 113:
      n ? r.key = b.ESC + "[1;" + (n + 1) + "Q" : r.key = b.ESC + "OQ";
      break;
    case 114:
      n ? r.key = b.ESC + "[1;" + (n + 1) + "R" : r.key = b.ESC + "OR";
      break;
    case 115:
      n ? r.key = b.ESC + "[1;" + (n + 1) + "S" : r.key = b.ESC + "OS";
      break;
    case 116:
      n ? r.key = b.ESC + "[15;" + (n + 1) + "~" : r.key = b.ESC + "[15~";
      break;
    case 117:
      n ? r.key = b.ESC + "[17;" + (n + 1) + "~" : r.key = b.ESC + "[17~";
      break;
    case 118:
      n ? r.key = b.ESC + "[18;" + (n + 1) + "~" : r.key = b.ESC + "[18~";
      break;
    case 119:
      n ? r.key = b.ESC + "[19;" + (n + 1) + "~" : r.key = b.ESC + "[19~";
      break;
    case 120:
      n ? r.key = b.ESC + "[20;" + (n + 1) + "~" : r.key = b.ESC + "[20~";
      break;
    case 121:
      n ? r.key = b.ESC + "[21;" + (n + 1) + "~" : r.key = b.ESC + "[21~";
      break;
    case 122:
      n ? r.key = b.ESC + "[23;" + (n + 1) + "~" : r.key = b.ESC + "[23~";
      break;
    case 123:
      n ? r.key = b.ESC + "[24;" + (n + 1) + "~" : r.key = b.ESC + "[24~";
      break;
    default:
      if (s15.ctrlKey && !s15.shiftKey && !s15.altKey && !s15.metaKey) s15.keyCode >= 65 && s15.keyCode <= 90 ? r.key = String.fromCharCode(s15.keyCode - 64) : s15.keyCode === 32 ? r.key = b.NUL : s15.keyCode >= 51 && s15.keyCode <= 55 ? r.key = String.fromCharCode(s15.keyCode - 51 + 27) : s15.keyCode === 56 ? r.key = b.DEL : s15.keyCode === 219 ? r.key = b.ESC : s15.keyCode === 220 ? r.key = b.FS : s15.keyCode === 221 && (r.key = b.GS);
      else if ((!e || i) && s15.altKey && !s15.metaKey) {
        let l = gc[s15.keyCode]?.[s15.shiftKey ? 1 : 0];
        if (l) r.key = b.ESC + l;
        else if (s15.keyCode >= 65 && s15.keyCode <= 90) {
          let a = s15.ctrlKey ? s15.keyCode - 64 : s15.keyCode + 32, u = String.fromCharCode(a);
          s15.shiftKey && (u = u.toUpperCase()), r.key = b.ESC + u;
        } else if (s15.keyCode === 32) r.key = b.ESC + (s15.ctrlKey ? b.NUL : " ");
        else if (s15.key === "Dead" && s15.code.startsWith("Key")) {
          let a = s15.code.slice(3, 4);
          s15.shiftKey || (a = a.toLowerCase()), r.key = b.ESC + a, r.cancel = true;
        }
      } else e && !s15.altKey && !s15.ctrlKey && !s15.shiftKey && s15.metaKey ? s15.keyCode === 65 && (r.type = 1) : s15.key && !s15.ctrlKey && !s15.altKey && !s15.metaKey && s15.keyCode >= 48 && s15.key.length === 1 ? r.key = s15.key : s15.key && s15.ctrlKey && (s15.key === "_" && (r.key = b.US), s15.key === "@" && (r.key = b.NUL));
      break;
  }
  return r;
}
var ee = 0;
var En = class {
  constructor(t) {
    this._getKey = t;
    this._array = [];
    this._insertedValues = [];
    this._flushInsertedTask = new Jt();
    this._isFlushingInserted = false;
    this._deletedIndices = [];
    this._flushDeletedTask = new Jt();
    this._isFlushingDeleted = false;
  }
  clear() {
    this._array.length = 0, this._insertedValues.length = 0, this._flushInsertedTask.clear(), this._isFlushingInserted = false, this._deletedIndices.length = 0, this._flushDeletedTask.clear(), this._isFlushingDeleted = false;
  }
  insert(t) {
    this._flushCleanupDeleted(), this._insertedValues.length === 0 && this._flushInsertedTask.enqueue(() => this._flushInserted()), this._insertedValues.push(t);
  }
  _flushInserted() {
    let t = this._insertedValues.sort((n, o2) => this._getKey(n) - this._getKey(o2)), e = 0, i = 0, r = new Array(this._array.length + this._insertedValues.length);
    for (let n = 0; n < r.length; n++) i >= this._array.length || this._getKey(t[e]) <= this._getKey(this._array[i]) ? (r[n] = t[e], e++) : r[n] = this._array[i++];
    this._array = r, this._insertedValues.length = 0;
  }
  _flushCleanupInserted() {
    !this._isFlushingInserted && this._insertedValues.length > 0 && this._flushInsertedTask.flush();
  }
  delete(t) {
    if (this._flushCleanupInserted(), this._array.length === 0) return false;
    let e = this._getKey(t);
    if (e === void 0 || (ee = this._search(e), ee === -1) || this._getKey(this._array[ee]) !== e) return false;
    do
      if (this._array[ee] === t) return this._deletedIndices.length === 0 && this._flushDeletedTask.enqueue(() => this._flushDeleted()), this._deletedIndices.push(ee), true;
    while (++ee < this._array.length && this._getKey(this._array[ee]) === e);
    return false;
  }
  _flushDeleted() {
    this._isFlushingDeleted = true;
    let t = this._deletedIndices.sort((n, o2) => n - o2), e = 0, i = new Array(this._array.length - t.length), r = 0;
    for (let n = 0; n < this._array.length; n++) t[e] === n ? e++ : i[r++] = this._array[n];
    this._array = i, this._deletedIndices.length = 0, this._isFlushingDeleted = false;
  }
  _flushCleanupDeleted() {
    !this._isFlushingDeleted && this._deletedIndices.length > 0 && this._flushDeletedTask.flush();
  }
  *getKeyIterator(t) {
    if (this._flushCleanupInserted(), this._flushCleanupDeleted(), this._array.length !== 0 && (ee = this._search(t), !(ee < 0 || ee >= this._array.length) && this._getKey(this._array[ee]) === t)) do
      yield this._array[ee];
    while (++ee < this._array.length && this._getKey(this._array[ee]) === t);
  }
  forEachByKey(t, e) {
    if (this._flushCleanupInserted(), this._flushCleanupDeleted(), this._array.length !== 0 && (ee = this._search(t), !(ee < 0 || ee >= this._array.length) && this._getKey(this._array[ee]) === t)) do
      e(this._array[ee]);
    while (++ee < this._array.length && this._getKey(this._array[ee]) === t);
  }
  values() {
    return this._flushCleanupInserted(), this._flushCleanupDeleted(), [...this._array].values();
  }
  _search(t) {
    let e = 0, i = this._array.length - 1;
    for (; i >= e; ) {
      let r = e + i >> 1, n = this._getKey(this._array[r]);
      if (n > t) i = r - 1;
      else if (n < t) e = r + 1;
      else {
        for (; r > 0 && this._getKey(this._array[r - 1]) === t; ) r--;
        return r;
      }
    }
    return e;
  }
};
var Us = 0;
var yl = 0;
var Tn = class extends D {
  constructor() {
    super();
    this._decorations = new En((e) => e?.marker.line);
    this._onDecorationRegistered = this._register(new v());
    this.onDecorationRegistered = this._onDecorationRegistered.event;
    this._onDecorationRemoved = this._register(new v());
    this.onDecorationRemoved = this._onDecorationRemoved.event;
    this._register(C(() => this.reset()));
  }
  get decorations() {
    return this._decorations.values();
  }
  registerDecoration(e) {
    if (e.marker.isDisposed) return;
    let i = new Ks(e);
    if (i) {
      let r = i.marker.onDispose(() => i.dispose()), n = i.onDispose(() => {
        n.dispose(), i && (this._decorations.delete(i) && this._onDecorationRemoved.fire(i), r.dispose());
      });
      this._decorations.insert(i), this._onDecorationRegistered.fire(i);
    }
    return i;
  }
  reset() {
    for (let e of this._decorations.values()) e.dispose();
    this._decorations.clear();
  }
  *getDecorationsAtCell(e, i, r) {
    let n = 0, o2 = 0;
    for (let l of this._decorations.getKeyIterator(i)) n = l.options.x ?? 0, o2 = n + (l.options.width ?? 1), e >= n && e < o2 && (!r || (l.options.layer ?? "bottom") === r) && (yield l);
  }
  forEachDecorationAtCell(e, i, r, n) {
    this._decorations.forEachByKey(i, (o2) => {
      Us = o2.options.x ?? 0, yl = Us + (o2.options.width ?? 1), e >= Us && e < yl && (!r || (o2.options.layer ?? "bottom") === r) && n(o2);
    });
  }
};
var Ks = class extends Ee {
  constructor(e) {
    super();
    this.options = e;
    this.onRenderEmitter = this.add(new v());
    this.onRender = this.onRenderEmitter.event;
    this._onDispose = this.add(new v());
    this.onDispose = this._onDispose.event;
    this._cachedBg = null;
    this._cachedFg = null;
    this.marker = e.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
  }
  get backgroundColorRGB() {
    return this._cachedBg === null && (this.options.backgroundColor ? this._cachedBg = z.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
  }
  get foregroundColorRGB() {
    return this._cachedFg === null && (this.options.foregroundColor ? this._cachedFg = z.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
  }
  dispose() {
    this._onDispose.fire(), super.dispose();
  }
};
var Sc = 1e3;
var In = class {
  constructor(t, e = Sc) {
    this._renderCallback = t;
    this._debounceThresholdMS = e;
    this._lastRefreshMs = 0;
    this._additionalRefreshRequested = false;
  }
  dispose() {
    this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
  }
  refresh(t, e, i) {
    this._rowCount = i, t = t !== void 0 ? t : 0, e = e !== void 0 ? e : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, t) : t, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, e) : e;
    let r = performance.now();
    if (r - this._lastRefreshMs >= this._debounceThresholdMS) this._lastRefreshMs = r, this._innerRefresh();
    else if (!this._additionalRefreshRequested) {
      let n = r - this._lastRefreshMs, o2 = this._debounceThresholdMS - n;
      this._additionalRefreshRequested = true, this._refreshTimeoutID = window.setTimeout(() => {
        this._lastRefreshMs = performance.now(), this._innerRefresh(), this._additionalRefreshRequested = false, this._refreshTimeoutID = void 0;
      }, o2);
    }
  }
  _innerRefresh() {
    if (this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) return;
    let t = Math.max(this._rowStart, 0), e = Math.min(this._rowEnd, this._rowCount - 1);
    this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(t, e);
  }
};
var xl = 20;
var wl = false;
var Tt = class extends D {
  constructor(e, i, r, n) {
    super();
    this._terminal = e;
    this._coreBrowserService = r;
    this._renderService = n;
    this._rowColumns = /* @__PURE__ */ new WeakMap();
    this._liveRegionLineCount = 0;
    this._charsToConsume = [];
    this._charsToAnnounce = "";
    let o2 = this._coreBrowserService.mainDocument;
    this._accessibilityContainer = o2.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = o2.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
    for (let l = 0; l < this._terminal.rows; l++) this._rowElements[l] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[l]);
    if (this._topBoundaryFocusListener = (l) => this._handleBoundaryFocus(l, 0), this._bottomBoundaryFocusListener = (l) => this._handleBoundaryFocus(l, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = o2.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this._register(new In(this._renderRows.bind(this))), !this._terminal.element) throw new Error("Cannot enable accessibility before Terminal.open");
    wl ? (this._accessibilityContainer.classList.add("debug"), this._rowContainer.classList.add("debug"), this._debugRootContainer = o2.createElement("div"), this._debugRootContainer.classList.add("xterm"), this._debugRootContainer.appendChild(o2.createTextNode("------start a11y------")), this._debugRootContainer.appendChild(this._accessibilityContainer), this._debugRootContainer.appendChild(o2.createTextNode("------end a11y------")), this._terminal.element.insertAdjacentElement("afterend", this._debugRootContainer)) : this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this._register(this._terminal.onResize((l) => this._handleResize(l.rows))), this._register(this._terminal.onRender((l) => this._refreshRows(l.start, l.end))), this._register(this._terminal.onScroll(() => this._refreshRows())), this._register(this._terminal.onA11yChar((l) => this._handleChar(l))), this._register(this._terminal.onLineFeed(() => this._handleChar(`
`))), this._register(this._terminal.onA11yTab((l) => this._handleTab(l))), this._register(this._terminal.onKey((l) => this._handleKey(l.key))), this._register(this._terminal.onBlur(() => this._clearLiveRegion())), this._register(this._renderService.onDimensionsChange(() => this._refreshRowsDimensions())), this._register(L(o2, "selectionchange", () => this._handleSelectionChange())), this._register(this._coreBrowserService.onDprChange(() => this._refreshRowsDimensions())), this._refreshRowsDimensions(), this._refreshRows(), this._register(C(() => {
      wl ? this._debugRootContainer.remove() : this._accessibilityContainer.remove(), this._rowElements.length = 0;
    }));
  }
  _handleTab(e) {
    for (let i = 0; i < e; i++) this._handleChar(" ");
  }
  _handleChar(e) {
    this._liveRegionLineCount < xl + 1 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e && (this._charsToAnnounce += e) : this._charsToAnnounce += e, e === `
` && (this._liveRegionLineCount++, this._liveRegionLineCount === xl + 1 && (this._liveRegion.textContent += _i.get())));
  }
  _clearLiveRegion() {
    this._liveRegion.textContent = "", this._liveRegionLineCount = 0;
  }
  _handleKey(e) {
    this._clearLiveRegion(), /\p{Control}/u.test(e) || this._charsToConsume.push(e);
  }
  _refreshRows(e, i) {
    this._liveRegionDebouncer.refresh(e, i, this._terminal.rows);
  }
  _renderRows(e, i) {
    let r = this._terminal.buffer, n = r.lines.length.toString();
    for (let o2 = e; o2 <= i; o2++) {
      let l = r.lines.get(r.ydisp + o2), a = [], u = l?.translateToString(true, void 0, void 0, a) || "", h15 = (r.ydisp + o2 + 1).toString(), c = this._rowElements[o2];
      c && (u.length === 0 ? (c.textContent = "\xA0", this._rowColumns.set(c, [0, 1])) : (c.textContent = u, this._rowColumns.set(c, a)), c.setAttribute("aria-posinset", h15), c.setAttribute("aria-setsize", n), this._alignRowWidth(c));
    }
    this._announceCharacters();
  }
  _announceCharacters() {
    this._charsToAnnounce.length !== 0 && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
  }
  _handleBoundaryFocus(e, i) {
    let r = e.target, n = this._rowElements[i === 0 ? 1 : this._rowElements.length - 2], o2 = r.getAttribute("aria-posinset"), l = i === 0 ? "1" : `${this._terminal.buffer.lines.length}`;
    if (o2 === l || e.relatedTarget !== n) return;
    let a, u;
    if (i === 0 ? (a = r, u = this._rowElements.pop(), this._rowContainer.removeChild(u)) : (a = this._rowElements.shift(), u = r, this._rowContainer.removeChild(a)), a.removeEventListener("focus", this._topBoundaryFocusListener), u.removeEventListener("focus", this._bottomBoundaryFocusListener), i === 0) {
      let h15 = this._createAccessibilityTreeNode();
      this._rowElements.unshift(h15), this._rowContainer.insertAdjacentElement("afterbegin", h15);
    } else {
      let h15 = this._createAccessibilityTreeNode();
      this._rowElements.push(h15), this._rowContainer.appendChild(h15);
    }
    this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(i === 0 ? -1 : 1), this._rowElements[i === 0 ? 1 : this._rowElements.length - 2].focus(), e.preventDefault(), e.stopImmediatePropagation();
  }
  _handleSelectionChange() {
    if (this._rowElements.length === 0) return;
    let e = this._coreBrowserService.mainDocument.getSelection();
    if (!e) return;
    if (e.isCollapsed) {
      this._rowContainer.contains(e.anchorNode) && this._terminal.clearSelection();
      return;
    }
    if (!e.anchorNode || !e.focusNode) {
      console.error("anchorNode and/or focusNode are null");
      return;
    }
    let i = { node: e.anchorNode, offset: e.anchorOffset }, r = { node: e.focusNode, offset: e.focusOffset };
    if ((i.node.compareDocumentPosition(r.node) & Node.DOCUMENT_POSITION_PRECEDING || i.node === r.node && i.offset > r.offset) && ([i, r] = [r, i]), i.node.compareDocumentPosition(this._rowElements[0]) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING) && (i = { node: this._rowElements[0].childNodes[0], offset: 0 }), !this._rowContainer.contains(i.node)) return;
    let n = this._rowElements.slice(-1)[0];
    if (r.node.compareDocumentPosition(n) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_PRECEDING) && (r = { node: n, offset: n.textContent?.length ?? 0 }), !this._rowContainer.contains(r.node)) return;
    let o2 = ({ node: u, offset: h15 }) => {
      let c = u instanceof Text ? u.parentNode : u, d = parseInt(c?.getAttribute("aria-posinset"), 10) - 1;
      if (isNaN(d)) return console.warn("row is invalid. Race condition?"), null;
      let _2 = this._rowColumns.get(c);
      if (!_2) return console.warn("columns is null. Race condition?"), null;
      let p = h15 < _2.length ? _2[h15] : _2.slice(-1)[0] + 1;
      return p >= this._terminal.cols && (++d, p = 0), { row: d, column: p };
    }, l = o2(i), a = o2(r);
    if (!(!l || !a)) {
      if (l.row > a.row || l.row === a.row && l.column >= a.column) throw new Error("invalid range");
      this._terminal.select(l.column, l.row, (a.row - l.row) * this._terminal.cols - l.column + a.column);
    }
  }
  _handleResize(e) {
    this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
    for (let i = this._rowContainer.children.length; i < this._terminal.rows; i++) this._rowElements[i] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[i]);
    for (; this._rowElements.length > e; ) this._rowContainer.removeChild(this._rowElements.pop());
    this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
  }
  _createAccessibilityTreeNode() {
    let e = this._coreBrowserService.mainDocument.createElement("div");
    return e.setAttribute("role", "listitem"), e.tabIndex = -1, this._refreshRowDimensions(e), e;
  }
  _refreshRowsDimensions() {
    if (this._renderService.dimensions.css.cell.height) {
      Object.assign(this._accessibilityContainer.style, { width: `${this._renderService.dimensions.css.canvas.width}px`, fontSize: `${this._terminal.options.fontSize}px` }), this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
      for (let e = 0; e < this._terminal.rows; e++) this._refreshRowDimensions(this._rowElements[e]), this._alignRowWidth(this._rowElements[e]);
    }
  }
  _refreshRowDimensions(e) {
    e.style.height = `${this._renderService.dimensions.css.cell.height}px`;
  }
  _alignRowWidth(e) {
    e.style.transform = "";
    let i = e.getBoundingClientRect().width, r = this._rowColumns.get(e)?.slice(-1)?.[0];
    if (!r) return;
    let n = r * this._renderService.dimensions.css.cell.width;
    e.style.transform = `scaleX(${n / i})`;
  }
};
Tt = M([S(1, xt), S(2, ae), S(3, ce)], Tt);
var hi = class extends D {
  constructor(e, i, r, n, o2) {
    super();
    this._element = e;
    this._mouseService = i;
    this._renderService = r;
    this._bufferService = n;
    this._linkProviderService = o2;
    this._linkCacheDisposables = [];
    this._isMouseOut = true;
    this._wasResized = false;
    this._activeLine = -1;
    this._onShowLinkUnderline = this._register(new v());
    this.onShowLinkUnderline = this._onShowLinkUnderline.event;
    this._onHideLinkUnderline = this._register(new v());
    this.onHideLinkUnderline = this._onHideLinkUnderline.event;
    this._register(C(() => {
      Ne(this._linkCacheDisposables), this._linkCacheDisposables.length = 0, this._lastMouseEvent = void 0, this._activeProviderReplies?.clear();
    })), this._register(this._bufferService.onResize(() => {
      this._clearCurrentLink(), this._wasResized = true;
    })), this._register(L(this._element, "mouseleave", () => {
      this._isMouseOut = true, this._clearCurrentLink();
    })), this._register(L(this._element, "mousemove", this._handleMouseMove.bind(this))), this._register(L(this._element, "mousedown", this._handleMouseDown.bind(this))), this._register(L(this._element, "mouseup", this._handleMouseUp.bind(this)));
  }
  get currentLink() {
    return this._currentLink;
  }
  _handleMouseMove(e) {
    this._lastMouseEvent = e;
    let i = this._positionFromMouseEvent(e, this._element, this._mouseService);
    if (!i) return;
    this._isMouseOut = false;
    let r = e.composedPath();
    for (let n = 0; n < r.length; n++) {
      let o2 = r[n];
      if (o2.classList.contains("xterm")) break;
      if (o2.classList.contains("xterm-hover")) return;
    }
    (!this._lastBufferCell || i.x !== this._lastBufferCell.x || i.y !== this._lastBufferCell.y) && (this._handleHover(i), this._lastBufferCell = i);
  }
  _handleHover(e) {
    if (this._activeLine !== e.y || this._wasResized) {
      this._clearCurrentLink(), this._askForLink(e, false), this._wasResized = false;
      return;
    }
    this._currentLink && this._linkAtPosition(this._currentLink.link, e) || (this._clearCurrentLink(), this._askForLink(e, true));
  }
  _askForLink(e, i) {
    (!this._activeProviderReplies || !i) && (this._activeProviderReplies?.forEach((n) => {
      n?.forEach((o2) => {
        o2.link.dispose && o2.link.dispose();
      });
    }), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = e.y);
    let r = false;
    for (let [n, o2] of this._linkProviderService.linkProviders.entries()) i ? this._activeProviderReplies?.get(n) && (r = this._checkLinkProviderResult(n, e, r)) : o2.provideLinks(e.y, (l) => {
      if (this._isMouseOut) return;
      let a = l?.map((u) => ({ link: u }));
      this._activeProviderReplies?.set(n, a), r = this._checkLinkProviderResult(n, e, r), this._activeProviderReplies?.size === this._linkProviderService.linkProviders.length && this._removeIntersectingLinks(e.y, this._activeProviderReplies);
    });
  }
  _removeIntersectingLinks(e, i) {
    let r = /* @__PURE__ */ new Set();
    for (let n = 0; n < i.size; n++) {
      let o2 = i.get(n);
      if (o2) for (let l = 0; l < o2.length; l++) {
        let a = o2[l], u = a.link.range.start.y < e ? 0 : a.link.range.start.x, h15 = a.link.range.end.y > e ? this._bufferService.cols : a.link.range.end.x;
        for (let c = u; c <= h15; c++) {
          if (r.has(c)) {
            o2.splice(l--, 1);
            break;
          }
          r.add(c);
        }
      }
    }
  }
  _checkLinkProviderResult(e, i, r) {
    if (!this._activeProviderReplies) return r;
    let n = this._activeProviderReplies.get(e), o2 = false;
    for (let l = 0; l < e; l++) (!this._activeProviderReplies.has(l) || this._activeProviderReplies.get(l)) && (o2 = true);
    if (!o2 && n) {
      let l = n.find((a) => this._linkAtPosition(a.link, i));
      l && (r = true, this._handleNewLink(l));
    }
    if (this._activeProviderReplies.size === this._linkProviderService.linkProviders.length && !r) for (let l = 0; l < this._activeProviderReplies.size; l++) {
      let a = this._activeProviderReplies.get(l)?.find((u) => this._linkAtPosition(u.link, i));
      if (a) {
        r = true, this._handleNewLink(a);
        break;
      }
    }
    return r;
  }
  _handleMouseDown() {
    this._mouseDownLink = this._currentLink;
  }
  _handleMouseUp(e) {
    if (!this._currentLink) return;
    let i = this._positionFromMouseEvent(e, this._element, this._mouseService);
    i && this._mouseDownLink && Ec(this._mouseDownLink.link, this._currentLink.link) && this._linkAtPosition(this._currentLink.link, i) && this._currentLink.link.activate(e, this._currentLink.link.text);
  }
  _clearCurrentLink(e, i) {
    !this._currentLink || !this._lastMouseEvent || (!e || !i || this._currentLink.link.range.start.y >= e && this._currentLink.link.range.end.y <= i) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, Ne(this._linkCacheDisposables), this._linkCacheDisposables.length = 0);
  }
  _handleNewLink(e) {
    if (!this._lastMouseEvent) return;
    let i = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
    i && this._linkAtPosition(e.link, i) && (this._currentLink = e, this._currentLink.state = { decorations: { underline: e.link.decorations === void 0 ? true : e.link.decorations.underline, pointerCursor: e.link.decorations === void 0 ? true : e.link.decorations.pointerCursor }, isHovered: true }, this._linkHover(this._element, e.link, this._lastMouseEvent), e.link.decorations = {}, Object.defineProperties(e.link.decorations, { pointerCursor: { get: () => this._currentLink?.state?.decorations.pointerCursor, set: (r) => {
      this._currentLink?.state && this._currentLink.state.decorations.pointerCursor !== r && (this._currentLink.state.decorations.pointerCursor = r, this._currentLink.state.isHovered && this._element.classList.toggle("xterm-cursor-pointer", r));
    } }, underline: { get: () => this._currentLink?.state?.decorations.underline, set: (r) => {
      this._currentLink?.state && this._currentLink?.state?.decorations.underline !== r && (this._currentLink.state.decorations.underline = r, this._currentLink.state.isHovered && this._fireUnderlineEvent(e.link, r));
    } } }), this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((r) => {
      if (!this._currentLink) return;
      let n = r.start === 0 ? 0 : r.start + 1 + this._bufferService.buffer.ydisp, o2 = this._bufferService.buffer.ydisp + 1 + r.end;
      if (this._currentLink.link.range.start.y >= n && this._currentLink.link.range.end.y <= o2 && (this._clearCurrentLink(n, o2), this._lastMouseEvent)) {
        let l = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
        l && this._askForLink(l, false);
      }
    })));
  }
  _linkHover(e, i, r) {
    this._currentLink?.state && (this._currentLink.state.isHovered = true, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(i, true), this._currentLink.state.decorations.pointerCursor && e.classList.add("xterm-cursor-pointer")), i.hover && i.hover(r, i.text);
  }
  _fireUnderlineEvent(e, i) {
    let r = e.range, n = this._bufferService.buffer.ydisp, o2 = this._createLinkUnderlineEvent(r.start.x - 1, r.start.y - n - 1, r.end.x, r.end.y - n - 1, void 0);
    (i ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(o2);
  }
  _linkLeave(e, i, r) {
    this._currentLink?.state && (this._currentLink.state.isHovered = false, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(i, false), this._currentLink.state.decorations.pointerCursor && e.classList.remove("xterm-cursor-pointer")), i.leave && i.leave(r, i.text);
  }
  _linkAtPosition(e, i) {
    let r = e.range.start.y * this._bufferService.cols + e.range.start.x, n = e.range.end.y * this._bufferService.cols + e.range.end.x, o2 = i.y * this._bufferService.cols + i.x;
    return r <= o2 && o2 <= n;
  }
  _positionFromMouseEvent(e, i, r) {
    let n = r.getCoords(e, i, this._bufferService.cols, this._bufferService.rows);
    if (n) return { x: n[0], y: n[1] + this._bufferService.buffer.ydisp };
  }
  _createLinkUnderlineEvent(e, i, r, n, o2) {
    return { x1: e, y1: i, x2: r, y2: n, cols: this._bufferService.cols, fg: o2 };
  }
};
hi = M([S(1, Dt), S(2, ce), S(3, F), S(4, lr)], hi);
function Ec(s15, t) {
  return s15.text === t.text && s15.range.start.x === t.range.start.x && s15.range.start.y === t.range.start.y && s15.range.end.x === t.range.end.x && s15.range.end.y === t.range.end.y;
}
var yn = class extends Sn {
  constructor(e = {}) {
    super(e);
    this._linkifier = this._register(new ye());
    this.browser = tn;
    this._keyDownHandled = false;
    this._keyDownSeen = false;
    this._keyPressHandled = false;
    this._unprocessedDeadKey = false;
    this._accessibilityManager = this._register(new ye());
    this._onCursorMove = this._register(new v());
    this.onCursorMove = this._onCursorMove.event;
    this._onKey = this._register(new v());
    this.onKey = this._onKey.event;
    this._onRender = this._register(new v());
    this.onRender = this._onRender.event;
    this._onSelectionChange = this._register(new v());
    this.onSelectionChange = this._onSelectionChange.event;
    this._onTitleChange = this._register(new v());
    this.onTitleChange = this._onTitleChange.event;
    this._onBell = this._register(new v());
    this.onBell = this._onBell.event;
    this._onFocus = this._register(new v());
    this._onBlur = this._register(new v());
    this._onA11yCharEmitter = this._register(new v());
    this._onA11yTabEmitter = this._register(new v());
    this._onWillOpen = this._register(new v());
    this._setup(), this._decorationService = this._instantiationService.createInstance(Tn), this._instantiationService.setService(Be, this._decorationService), this._linkProviderService = this._instantiationService.createInstance(Qr), this._instantiationService.setService(lr, this._linkProviderService), this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(wt)), this._register(this._inputHandler.onRequestBell(() => this._onBell.fire())), this._register(this._inputHandler.onRequestRefreshRows((i) => this.refresh(i?.start ?? 0, i?.end ?? this.rows - 1))), this._register(this._inputHandler.onRequestSendFocus(() => this._reportFocus())), this._register(this._inputHandler.onRequestReset(() => this.reset())), this._register(this._inputHandler.onRequestWindowsOptionsReport((i) => this._reportWindowsOptions(i))), this._register(this._inputHandler.onColor((i) => this._handleColorEvent(i))), this._register($.forward(this._inputHandler.onCursorMove, this._onCursorMove)), this._register($.forward(this._inputHandler.onTitleChange, this._onTitleChange)), this._register($.forward(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this._register($.forward(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this._register(this._bufferService.onResize((i) => this._afterResize(i.cols, i.rows))), this._register(C(() => {
      this._customKeyEventHandler = void 0, this.element?.parentNode?.removeChild(this.element);
    }));
  }
  get linkifier() {
    return this._linkifier.value;
  }
  get onFocus() {
    return this._onFocus.event;
  }
  get onBlur() {
    return this._onBlur.event;
  }
  get onA11yChar() {
    return this._onA11yCharEmitter.event;
  }
  get onA11yTab() {
    return this._onA11yTabEmitter.event;
  }
  get onWillOpen() {
    return this._onWillOpen.event;
  }
  _handleColorEvent(e) {
    if (this._themeService) for (let i of e) {
      let r, n = "";
      switch (i.index) {
        case 256:
          r = "foreground", n = "10";
          break;
        case 257:
          r = "background", n = "11";
          break;
        case 258:
          r = "cursor", n = "12";
          break;
        default:
          r = "ansi", n = "4;" + i.index;
      }
      switch (i.type) {
        case 0:
          let o2 = U.toColorRGB(r === "ansi" ? this._themeService.colors.ansi[i.index] : this._themeService.colors[r]);
          this.coreService.triggerDataEvent(`${b.ESC}]${n};${ml(o2)}${fs.ST}`);
          break;
        case 1:
          if (r === "ansi") this._themeService.modifyColors((l) => l.ansi[i.index] = j.toColor(...i.color));
          else {
            let l = r;
            this._themeService.modifyColors((a) => a[l] = j.toColor(...i.color));
          }
          break;
        case 2:
          this._themeService.restoreColor(i.index);
          break;
      }
    }
  }
  _setup() {
    super._setup(), this._customKeyEventHandler = void 0;
  }
  get buffer() {
    return this.buffers.active;
  }
  focus() {
    this.textarea && this.textarea.focus({ preventScroll: true });
  }
  _handleScreenReaderModeOptionChange(e) {
    e ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(Tt, this)) : this._accessibilityManager.clear();
  }
  _handleTextAreaFocus(e) {
    this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(b.ESC + "[I"), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
  }
  blur() {
    return this.textarea?.blur();
  }
  _handleTextAreaBlur() {
    this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(b.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
  }
  _syncTextArea() {
    if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) return;
    let e = this.buffer.ybase + this.buffer.y, i = this.buffer.lines.get(e);
    if (!i) return;
    let r = Math.min(this.buffer.x, this.cols - 1), n = this._renderService.dimensions.css.cell.height, o2 = i.getWidth(r), l = this._renderService.dimensions.css.cell.width * o2, a = this.buffer.y * this._renderService.dimensions.css.cell.height, u = r * this._renderService.dimensions.css.cell.width;
    this.textarea.style.left = u + "px", this.textarea.style.top = a + "px", this.textarea.style.width = l + "px", this.textarea.style.height = n + "px", this.textarea.style.lineHeight = n + "px", this.textarea.style.zIndex = "-5";
  }
  _initGlobal() {
    this._bindKeys(), this._register(L(this.element, "copy", (i) => {
      this.hasSelection() && Vs(i, this._selectionService);
    }));
    let e = (i) => qs(i, this.textarea, this.coreService, this.optionsService);
    this._register(L(this.textarea, "paste", e)), this._register(L(this.element, "paste", e)), Ss ? this._register(L(this.element, "mousedown", (i) => {
      i.button === 2 && Pn(i, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
    })) : this._register(L(this.element, "contextmenu", (i) => {
      Pn(i, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
    })), Bi && this._register(L(this.element, "auxclick", (i) => {
      i.button === 1 && Mn(i, this.textarea, this.screenElement);
    }));
  }
  _bindKeys() {
    this._register(L(this.textarea, "keyup", (e) => this._keyUp(e), true)), this._register(L(this.textarea, "keydown", (e) => this._keyDown(e), true)), this._register(L(this.textarea, "keypress", (e) => this._keyPress(e), true)), this._register(L(this.textarea, "compositionstart", () => this._compositionHelper.compositionstart())), this._register(L(this.textarea, "compositionupdate", (e) => this._compositionHelper.compositionupdate(e))), this._register(L(this.textarea, "compositionend", () => this._compositionHelper.compositionend())), this._register(L(this.textarea, "input", (e) => this._inputEvent(e), true)), this._register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
  }
  open(e) {
    if (!e) throw new Error("Terminal requires a parent element.");
    if (e.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this.element?.ownerDocument.defaultView && this._coreBrowserService) {
      this.element.ownerDocument.defaultView !== this._coreBrowserService.window && (this._coreBrowserService.window = this.element.ownerDocument.defaultView);
      return;
    }
    this._document = e.ownerDocument, this.options.documentOverride && this.options.documentOverride instanceof Document && (this._document = this.optionsService.rawOptions.documentOverride), this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), e.appendChild(this.element);
    let i = this._document.createDocumentFragment();
    this._viewportElement = this._document.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), i.appendChild(this._viewportElement), this.screenElement = this._document.createElement("div"), this.screenElement.classList.add("xterm-screen"), this._register(L(this.screenElement, "mousemove", (o2) => this.updateCursorStyle(o2))), this._helperContainer = this._document.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), i.appendChild(this.screenElement);
    let r = this.textarea = this._document.createElement("textarea");
    this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", mi.get()), Ts || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._register(this.optionsService.onSpecificOptionChange("disableStdin", () => r.readOnly = this.optionsService.rawOptions.disableStdin)), this.textarea.readOnly = this.optionsService.rawOptions.disableStdin, this._coreBrowserService = this._register(this._instantiationService.createInstance(Jr, this.textarea, e.ownerDocument.defaultView ?? window, this._document ?? typeof window < "u" ? window.document : null)), this._instantiationService.setService(ae, this._coreBrowserService), this._register(L(this.textarea, "focus", (o2) => this._handleTextAreaFocus(o2))), this._register(L(this.textarea, "blur", () => this._handleTextAreaBlur())), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(jt, this._document, this._helperContainer), this._instantiationService.setService(nt, this._charSizeService), this._themeService = this._instantiationService.createInstance(ti), this._instantiationService.setService(Re, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(ct), this._instantiationService.setService(or, this._characterJoinerService), this._renderService = this._register(this._instantiationService.createInstance(Qt, this.rows, this.screenElement)), this._instantiationService.setService(ce, this._renderService), this._register(this._renderService.onRenderedViewportChange((o2) => this._onRender.fire(o2))), this.onResize((o2) => this._renderService.resize(o2.cols, o2.rows)), this._compositionView = this._document.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance($t, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this._mouseService = this._instantiationService.createInstance(Xt), this._instantiationService.setService(Dt, this._mouseService);
    let n = this._linkifier.value = this._register(this._instantiationService.createInstance(hi, this.screenElement));
    this.element.appendChild(i);
    try {
      this._onWillOpen.fire(this.element);
    } catch {
    }
    this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this._register(this.onCursorMove(() => {
      this._renderService.handleCursorMove(), this._syncTextArea();
    })), this._register(this.onResize(() => this._renderService.handleResize(this.cols, this.rows))), this._register(this.onBlur(() => this._renderService.handleBlur())), this._register(this.onFocus(() => this._renderService.handleFocus())), this._viewport = this._register(this._instantiationService.createInstance(zt, this.element, this.screenElement)), this._register(this._viewport.onRequestScrollLines((o2) => {
      super.scrollLines(o2, false), this.refresh(0, this.rows - 1);
    })), this._selectionService = this._register(this._instantiationService.createInstance(ei, this.element, this.screenElement, n)), this._instantiationService.setService(Qs, this._selectionService), this._register(this._selectionService.onRequestScrollLines((o2) => this.scrollLines(o2.amount, o2.suppressScrollEvent))), this._register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire())), this._register(this._selectionService.onRequestRedraw((o2) => this._renderService.handleSelectionChanged(o2.start, o2.end, o2.columnSelectMode))), this._register(this._selectionService.onLinuxMouseSelection((o2) => {
      this.textarea.value = o2, this.textarea.focus(), this.textarea.select();
    })), this._register($.any(this._onScroll.event, this._inputHandler.onScroll)(() => {
      this._selectionService.refresh(), this._viewport?.queueSync();
    })), this._register(this._instantiationService.createInstance(Gt, this.screenElement)), this._register(L(this.element, "mousedown", (o2) => this._selectionService.handleMouseDown(o2))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(Tt, this)), this._register(this.optionsService.onSpecificOptionChange("screenReaderMode", (o2) => this._handleScreenReaderModeOptionChange(o2))), this.options.overviewRuler.width && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(bt, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRuler", (o2) => {
      !this._overviewRulerRenderer && o2 && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(bt, this._viewportElement, this.screenElement)));
    }), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
  }
  _createRenderer() {
    return this._instantiationService.createInstance(Yt, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
  }
  bindMouse() {
    let e = this, i = this.element;
    function r(l) {
      let a = e._mouseService.getMouseReportCoords(l, e.screenElement);
      if (!a) return false;
      let u, h15;
      switch (l.overrideType || l.type) {
        case "mousemove":
          h15 = 32, l.buttons === void 0 ? (u = 3, l.button !== void 0 && (u = l.button < 3 ? l.button : 3)) : u = l.buttons & 1 ? 0 : l.buttons & 4 ? 1 : l.buttons & 2 ? 2 : 3;
          break;
        case "mouseup":
          h15 = 0, u = l.button < 3 ? l.button : 3;
          break;
        case "mousedown":
          h15 = 1, u = l.button < 3 ? l.button : 3;
          break;
        case "wheel":
          if (e._customWheelEventHandler && e._customWheelEventHandler(l) === false) return false;
          let c = l.deltaY;
          if (c === 0 || e.coreMouseService.consumeWheelEvent(l, e._renderService?.dimensions?.device?.cell?.height, e._coreBrowserService?.dpr) === 0) return false;
          h15 = c < 0 ? 0 : 1, u = 4;
          break;
        default:
          return false;
      }
      return h15 === void 0 || u === void 0 || u > 4 ? false : e.coreMouseService.triggerMouseEvent({ col: a.col, row: a.row, x: a.x, y: a.y, button: u, action: h15, ctrl: l.ctrlKey, alt: l.altKey, shift: l.shiftKey });
    }
    let n = { mouseup: null, wheel: null, mousedrag: null, mousemove: null }, o2 = { mouseup: (l) => (r(l), l.buttons || (this._document.removeEventListener("mouseup", n.mouseup), n.mousedrag && this._document.removeEventListener("mousemove", n.mousedrag)), this.cancel(l)), wheel: (l) => (r(l), this.cancel(l, true)), mousedrag: (l) => {
      l.buttons && r(l);
    }, mousemove: (l) => {
      l.buttons || r(l);
    } };
    this._register(this.coreMouseService.onProtocolChange((l) => {
      l ? (this.optionsService.rawOptions.logLevel === "debug" && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(l)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), l & 8 ? n.mousemove || (i.addEventListener("mousemove", o2.mousemove), n.mousemove = o2.mousemove) : (i.removeEventListener("mousemove", n.mousemove), n.mousemove = null), l & 16 ? n.wheel || (i.addEventListener("wheel", o2.wheel, { passive: false }), n.wheel = o2.wheel) : (i.removeEventListener("wheel", n.wheel), n.wheel = null), l & 2 ? n.mouseup || (n.mouseup = o2.mouseup) : (this._document.removeEventListener("mouseup", n.mouseup), n.mouseup = null), l & 4 ? n.mousedrag || (n.mousedrag = o2.mousedrag) : (this._document.removeEventListener("mousemove", n.mousedrag), n.mousedrag = null);
    })), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this._register(L(i, "mousedown", (l) => {
      if (l.preventDefault(), this.focus(), !(!this.coreMouseService.areMouseEventsActive || this._selectionService.shouldForceSelection(l))) return r(l), n.mouseup && this._document.addEventListener("mouseup", n.mouseup), n.mousedrag && this._document.addEventListener("mousemove", n.mousedrag), this.cancel(l);
    })), this._register(L(i, "wheel", (l) => {
      if (!n.wheel) {
        if (this._customWheelEventHandler && this._customWheelEventHandler(l) === false) return false;
        if (!this.buffer.hasScrollback) {
          if (l.deltaY === 0) return false;
          if (e.coreMouseService.consumeWheelEvent(l, e._renderService?.dimensions?.device?.cell?.height, e._coreBrowserService?.dpr) === 0) return this.cancel(l, true);
          let h15 = b.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (l.deltaY < 0 ? "A" : "B");
          return this.coreService.triggerDataEvent(h15, true), this.cancel(l, true);
        }
      }
    }, { passive: false }));
  }
  refresh(e, i) {
    this._renderService?.refreshRows(e, i);
  }
  updateCursorStyle(e) {
    this._selectionService?.shouldColumnSelect(e) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
  }
  _showCursor() {
    this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = true, this.refresh(this.buffer.y, this.buffer.y));
  }
  scrollLines(e, i) {
    this._viewport ? this._viewport.scrollLines(e) : super.scrollLines(e, i), this.refresh(0, this.rows - 1);
  }
  scrollPages(e) {
    this.scrollLines(e * (this.rows - 1));
  }
  scrollToTop() {
    this.scrollLines(-this._bufferService.buffer.ydisp);
  }
  scrollToBottom(e) {
    e && this._viewport ? this._viewport.scrollToLine(this.buffer.ybase, true) : this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
  }
  scrollToLine(e) {
    let i = e - this._bufferService.buffer.ydisp;
    i !== 0 && this.scrollLines(i);
  }
  paste(e) {
    Cn(e, this.textarea, this.coreService, this.optionsService);
  }
  attachCustomKeyEventHandler(e) {
    this._customKeyEventHandler = e;
  }
  attachCustomWheelEventHandler(e) {
    this._customWheelEventHandler = e;
  }
  registerLinkProvider(e) {
    return this._linkProviderService.registerLinkProvider(e);
  }
  registerCharacterJoiner(e) {
    if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
    let i = this._characterJoinerService.register(e);
    return this.refresh(0, this.rows - 1), i;
  }
  deregisterCharacterJoiner(e) {
    if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
    this._characterJoinerService.deregister(e) && this.refresh(0, this.rows - 1);
  }
  get markers() {
    return this.buffer.markers;
  }
  registerMarker(e) {
    return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e);
  }
  registerDecoration(e) {
    return this._decorationService.registerDecoration(e);
  }
  hasSelection() {
    return this._selectionService ? this._selectionService.hasSelection : false;
  }
  select(e, i, r) {
    this._selectionService.setSelection(e, i, r);
  }
  getSelection() {
    return this._selectionService ? this._selectionService.selectionText : "";
  }
  getSelectionPosition() {
    if (!(!this._selectionService || !this._selectionService.hasSelection)) return { start: { x: this._selectionService.selectionStart[0], y: this._selectionService.selectionStart[1] }, end: { x: this._selectionService.selectionEnd[0], y: this._selectionService.selectionEnd[1] } };
  }
  clearSelection() {
    this._selectionService?.clearSelection();
  }
  selectAll() {
    this._selectionService?.selectAll();
  }
  selectLines(e, i) {
    this._selectionService?.selectLines(e, i);
  }
  _keyDown(e) {
    if (this._keyDownHandled = false, this._keyDownSeen = true, this._customKeyEventHandler && this._customKeyEventHandler(e) === false) return false;
    let i = this.browser.isMac && this.options.macOptionIsMeta && e.altKey;
    if (!i && !this._compositionHelper.keydown(e)) return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(true), false;
    !i && (e.key === "Dead" || e.key === "AltGraph") && (this._unprocessedDeadKey = true);
    let r = Il(e, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
    if (this.updateCursorStyle(e), r.type === 3 || r.type === 2) {
      let n = this.rows - 1;
      return this.scrollLines(r.type === 2 ? -n : n), this.cancel(e, true);
    }
    if (r.type === 1 && this.selectAll(), this._isThirdLevelShift(this.browser, e) || (r.cancel && this.cancel(e, true), !r.key) || e.key && !e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1 && e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 90) return true;
    if (this._unprocessedDeadKey) return this._unprocessedDeadKey = false, true;
    if ((r.key === b.ETX || r.key === b.CR) && (this.textarea.value = ""), this._onKey.fire({ key: r.key, domEvent: e }), this._showCursor(), this.coreService.triggerDataEvent(r.key, true), !this.optionsService.rawOptions.screenReaderMode || e.altKey || e.ctrlKey) return this.cancel(e, true);
    this._keyDownHandled = true;
  }
  _isThirdLevelShift(e, i) {
    let r = e.isMac && !this.options.macOptionIsMeta && i.altKey && !i.ctrlKey && !i.metaKey || e.isWindows && i.altKey && i.ctrlKey && !i.metaKey || e.isWindows && i.getModifierState("AltGraph");
    return i.type === "keypress" ? r : r && (!i.keyCode || i.keyCode > 47);
  }
  _keyUp(e) {
    this._keyDownSeen = false, !(this._customKeyEventHandler && this._customKeyEventHandler(e) === false) && (Tc(e) || this.focus(), this.updateCursorStyle(e), this._keyPressHandled = false);
  }
  _keyPress(e) {
    let i;
    if (this._keyPressHandled = false, this._keyDownHandled || this._customKeyEventHandler && this._customKeyEventHandler(e) === false) return false;
    if (this.cancel(e), e.charCode) i = e.charCode;
    else if (e.which === null || e.which === void 0) i = e.keyCode;
    else if (e.which !== 0 && e.charCode !== 0) i = e.which;
    else return false;
    return !i || (e.altKey || e.ctrlKey || e.metaKey) && !this._isThirdLevelShift(this.browser, e) ? false : (i = String.fromCharCode(i), this._onKey.fire({ key: i, domEvent: e }), this._showCursor(), this.coreService.triggerDataEvent(i, true), this._keyPressHandled = true, this._unprocessedDeadKey = false, true);
  }
  _inputEvent(e) {
    if (e.data && e.inputType === "insertText" && (!e.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
      if (this._keyPressHandled) return false;
      this._unprocessedDeadKey = false;
      let i = e.data;
      return this.coreService.triggerDataEvent(i, true), this.cancel(e), true;
    }
    return false;
  }
  resize(e, i) {
    if (e === this.cols && i === this.rows) {
      this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
      return;
    }
    super.resize(e, i);
  }
  _afterResize(e, i) {
    this._charSizeService?.measure();
  }
  clear() {
    if (!(this.buffer.ybase === 0 && this.buffer.y === 0)) {
      this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
      for (let e = 1; e < this.rows; e++) this.buffer.lines.push(this.buffer.getBlankLine(X));
      this._onScroll.fire({ position: this.buffer.ydisp }), this.refresh(0, this.rows - 1);
    }
  }
  reset() {
    this.options.rows = this.rows, this.options.cols = this.cols;
    let e = this._customKeyEventHandler;
    this._setup(), super.reset(), this._selectionService?.reset(), this._decorationService.reset(), this._customKeyEventHandler = e, this.refresh(0, this.rows - 1);
  }
  clearTextureAtlas() {
    this._renderService?.clearTextureAtlas();
  }
  _reportFocus() {
    this.element?.classList.contains("focus") ? this.coreService.triggerDataEvent(b.ESC + "[I") : this.coreService.triggerDataEvent(b.ESC + "[O");
  }
  _reportWindowsOptions(e) {
    if (this._renderService) switch (e) {
      case 0:
        let i = this._renderService.dimensions.css.canvas.width.toFixed(0), r = this._renderService.dimensions.css.canvas.height.toFixed(0);
        this.coreService.triggerDataEvent(`${b.ESC}[4;${r};${i}t`);
        break;
      case 1:
        let n = this._renderService.dimensions.css.cell.width.toFixed(0), o2 = this._renderService.dimensions.css.cell.height.toFixed(0);
        this.coreService.triggerDataEvent(`${b.ESC}[6;${o2};${n}t`);
        break;
    }
  }
  cancel(e, i) {
    if (!(!this.options.cancelEvents && !i)) return e.preventDefault(), e.stopPropagation(), false;
  }
};
function Tc(s15) {
  return s15.keyCode === 16 || s15.keyCode === 17 || s15.keyCode === 18;
}
var xn = class {
  constructor() {
    this._addons = [];
  }
  dispose() {
    for (let t = this._addons.length - 1; t >= 0; t--) this._addons[t].instance.dispose();
  }
  loadAddon(t, e) {
    let i = { instance: e, dispose: e.dispose, isDisposed: false };
    this._addons.push(i), e.dispose = () => this._wrappedAddonDispose(i), e.activate(t);
  }
  _wrappedAddonDispose(t) {
    if (t.isDisposed) return;
    let e = -1;
    for (let i = 0; i < this._addons.length; i++) if (this._addons[i] === t) {
      e = i;
      break;
    }
    if (e === -1) throw new Error("Could not dispose an addon that has not been loaded");
    t.isDisposed = true, t.dispose.apply(t.instance), this._addons.splice(e, 1);
  }
};
var wn = class {
  constructor(t) {
    this._line = t;
  }
  get isWrapped() {
    return this._line.isWrapped;
  }
  get length() {
    return this._line.length;
  }
  getCell(t, e) {
    if (!(t < 0 || t >= this._line.length)) return e ? (this._line.loadCell(t, e), e) : this._line.loadCell(t, new q());
  }
  translateToString(t, e, i) {
    return this._line.translateToString(t, e, i);
  }
};
var Ji = class {
  constructor(t, e) {
    this._buffer = t;
    this.type = e;
  }
  init(t) {
    return this._buffer = t, this;
  }
  get cursorY() {
    return this._buffer.y;
  }
  get cursorX() {
    return this._buffer.x;
  }
  get viewportY() {
    return this._buffer.ydisp;
  }
  get baseY() {
    return this._buffer.ybase;
  }
  get length() {
    return this._buffer.lines.length;
  }
  getLine(t) {
    let e = this._buffer.lines.get(t);
    if (e) return new wn(e);
  }
  getNullCell() {
    return new q();
  }
};
var Dn = class extends D {
  constructor(e) {
    super();
    this._core = e;
    this._onBufferChange = this._register(new v());
    this.onBufferChange = this._onBufferChange.event;
    this._normal = new Ji(this._core.buffers.normal, "normal"), this._alternate = new Ji(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate(() => this._onBufferChange.fire(this.active));
  }
  get active() {
    if (this._core.buffers.active === this._core.buffers.normal) return this.normal;
    if (this._core.buffers.active === this._core.buffers.alt) return this.alternate;
    throw new Error("Active buffer is neither normal nor alternate");
  }
  get normal() {
    return this._normal.init(this._core.buffers.normal);
  }
  get alternate() {
    return this._alternate.init(this._core.buffers.alt);
  }
};
var Rn = class {
  constructor(t) {
    this._core = t;
  }
  registerCsiHandler(t, e) {
    return this._core.registerCsiHandler(t, (i) => e(i.toArray()));
  }
  addCsiHandler(t, e) {
    return this.registerCsiHandler(t, e);
  }
  registerDcsHandler(t, e) {
    return this._core.registerDcsHandler(t, (i, r) => e(i, r.toArray()));
  }
  addDcsHandler(t, e) {
    return this.registerDcsHandler(t, e);
  }
  registerEscHandler(t, e) {
    return this._core.registerEscHandler(t, e);
  }
  addEscHandler(t, e) {
    return this.registerEscHandler(t, e);
  }
  registerOscHandler(t, e) {
    return this._core.registerOscHandler(t, e);
  }
  addOscHandler(t, e) {
    return this.registerOscHandler(t, e);
  }
};
var Ln = class {
  constructor(t) {
    this._core = t;
  }
  register(t) {
    this._core.unicodeService.register(t);
  }
  get versions() {
    return this._core.unicodeService.versions;
  }
  get activeVersion() {
    return this._core.unicodeService.activeVersion;
  }
  set activeVersion(t) {
    this._core.unicodeService.activeVersion = t;
  }
};
var Ic = ["cols", "rows"];
var Ue = 0;
var Dl = class extends D {
  constructor(t) {
    super(), this._core = this._register(new yn(t)), this._addonManager = this._register(new xn()), this._publicOptions = { ...this._core.options };
    let e = (r) => this._core.options[r], i = (r, n) => {
      this._checkReadonlyOptions(r), this._core.options[r] = n;
    };
    for (let r in this._core.options) {
      let n = { get: e.bind(this, r), set: i.bind(this, r) };
      Object.defineProperty(this._publicOptions, r, n);
    }
  }
  _checkReadonlyOptions(t) {
    if (Ic.includes(t)) throw new Error(`Option "${t}" can only be set in the constructor`);
  }
  _checkProposedApi() {
    if (!this._core.optionsService.rawOptions.allowProposedApi) throw new Error("You must set the allowProposedApi option to true to use proposed API");
  }
  get onBell() {
    return this._core.onBell;
  }
  get onBinary() {
    return this._core.onBinary;
  }
  get onCursorMove() {
    return this._core.onCursorMove;
  }
  get onData() {
    return this._core.onData;
  }
  get onKey() {
    return this._core.onKey;
  }
  get onLineFeed() {
    return this._core.onLineFeed;
  }
  get onRender() {
    return this._core.onRender;
  }
  get onResize() {
    return this._core.onResize;
  }
  get onScroll() {
    return this._core.onScroll;
  }
  get onSelectionChange() {
    return this._core.onSelectionChange;
  }
  get onTitleChange() {
    return this._core.onTitleChange;
  }
  get onWriteParsed() {
    return this._core.onWriteParsed;
  }
  get element() {
    return this._core.element;
  }
  get parser() {
    return this._parser || (this._parser = new Rn(this._core)), this._parser;
  }
  get unicode() {
    return this._checkProposedApi(), new Ln(this._core);
  }
  get textarea() {
    return this._core.textarea;
  }
  get rows() {
    return this._core.rows;
  }
  get cols() {
    return this._core.cols;
  }
  get buffer() {
    return this._buffer || (this._buffer = this._register(new Dn(this._core))), this._buffer;
  }
  get markers() {
    return this._checkProposedApi(), this._core.markers;
  }
  get modes() {
    let t = this._core.coreService.decPrivateModes, e = "none";
    switch (this._core.coreMouseService.activeProtocol) {
      case "X10":
        e = "x10";
        break;
      case "VT200":
        e = "vt200";
        break;
      case "DRAG":
        e = "drag";
        break;
      case "ANY":
        e = "any";
        break;
    }
    return { applicationCursorKeysMode: t.applicationCursorKeys, applicationKeypadMode: t.applicationKeypad, bracketedPasteMode: t.bracketedPasteMode, insertMode: this._core.coreService.modes.insertMode, mouseTrackingMode: e, originMode: t.origin, reverseWraparoundMode: t.reverseWraparound, sendFocusMode: t.sendFocus, synchronizedOutputMode: t.synchronizedOutput, wraparoundMode: t.wraparound };
  }
  get options() {
    return this._publicOptions;
  }
  set options(t) {
    for (let e in t) this._publicOptions[e] = t[e];
  }
  blur() {
    this._core.blur();
  }
  focus() {
    this._core.focus();
  }
  input(t, e = true) {
    this._core.input(t, e);
  }
  resize(t, e) {
    this._verifyIntegers(t, e), this._core.resize(t, e);
  }
  open(t) {
    this._core.open(t);
  }
  attachCustomKeyEventHandler(t) {
    this._core.attachCustomKeyEventHandler(t);
  }
  attachCustomWheelEventHandler(t) {
    this._core.attachCustomWheelEventHandler(t);
  }
  registerLinkProvider(t) {
    return this._core.registerLinkProvider(t);
  }
  registerCharacterJoiner(t) {
    return this._checkProposedApi(), this._core.registerCharacterJoiner(t);
  }
  deregisterCharacterJoiner(t) {
    this._checkProposedApi(), this._core.deregisterCharacterJoiner(t);
  }
  registerMarker(t = 0) {
    return this._verifyIntegers(t), this._core.registerMarker(t);
  }
  registerDecoration(t) {
    return this._checkProposedApi(), this._verifyPositiveIntegers(t.x ?? 0, t.width ?? 0, t.height ?? 0), this._core.registerDecoration(t);
  }
  hasSelection() {
    return this._core.hasSelection();
  }
  select(t, e, i) {
    this._verifyIntegers(t, e, i), this._core.select(t, e, i);
  }
  getSelection() {
    return this._core.getSelection();
  }
  getSelectionPosition() {
    return this._core.getSelectionPosition();
  }
  clearSelection() {
    this._core.clearSelection();
  }
  selectAll() {
    this._core.selectAll();
  }
  selectLines(t, e) {
    this._verifyIntegers(t, e), this._core.selectLines(t, e);
  }
  dispose() {
    super.dispose();
  }
  scrollLines(t) {
    this._verifyIntegers(t), this._core.scrollLines(t);
  }
  scrollPages(t) {
    this._verifyIntegers(t), this._core.scrollPages(t);
  }
  scrollToTop() {
    this._core.scrollToTop();
  }
  scrollToBottom() {
    this._core.scrollToBottom();
  }
  scrollToLine(t) {
    this._verifyIntegers(t), this._core.scrollToLine(t);
  }
  clear() {
    this._core.clear();
  }
  write(t, e) {
    this._core.write(t, e);
  }
  writeln(t, e) {
    this._core.write(t), this._core.write(`\r
`, e);
  }
  paste(t) {
    this._core.paste(t);
  }
  refresh(t, e) {
    this._verifyIntegers(t, e), this._core.refresh(t, e);
  }
  reset() {
    this._core.reset();
  }
  clearTextureAtlas() {
    this._core.clearTextureAtlas();
  }
  loadAddon(t) {
    this._addonManager.loadAddon(this, t);
  }
  static get strings() {
    return { get promptLabel() {
      return mi.get();
    }, set promptLabel(t) {
      mi.set(t);
    }, get tooMuchOutput() {
      return _i.get();
    }, set tooMuchOutput(t) {
      _i.set(t);
    } };
  }
  _verifyIntegers(...t) {
    for (Ue of t) if (Ue === 1 / 0 || isNaN(Ue) || Ue % 1 !== 0) throw new Error("This API only accepts integers");
  }
  _verifyPositiveIntegers(...t) {
    for (Ue of t) if (Ue && (Ue === 1 / 0 || isNaN(Ue) || Ue % 1 !== 0 || Ue < 0)) throw new Error("This API only accepts positive integers");
  }
};

// node_modules/@xterm/addon-fit/lib/addon-fit.mjs
var h6 = 2;
var _ = 1;
var o = class {
  activate(e) {
    this._terminal = e;
  }
  dispose() {
  }
  fit() {
    let e = this.proposeDimensions();
    if (!e || !this._terminal || isNaN(e.cols) || isNaN(e.rows)) return;
    let t = this._terminal._core;
    (this._terminal.rows !== e.rows || this._terminal.cols !== e.cols) && (t._renderService.clear(), this._terminal.resize(e.cols, e.rows));
  }
  proposeDimensions() {
    if (!this._terminal || !this._terminal.element || !this._terminal.element.parentElement) return;
    let t = this._terminal._core._renderService.dimensions;
    if (t.css.cell.width === 0 || t.css.cell.height === 0) return;
    let s15 = this._terminal.options.scrollback === 0 ? 0 : this._terminal.options.overviewRuler?.width || 14, r = window.getComputedStyle(this._terminal.element.parentElement), l = parseInt(r.getPropertyValue("height")), a = Math.max(0, parseInt(r.getPropertyValue("width"))), i = window.getComputedStyle(this._terminal.element), n = { top: parseInt(i.getPropertyValue("padding-top")), bottom: parseInt(i.getPropertyValue("padding-bottom")), right: parseInt(i.getPropertyValue("padding-right")), left: parseInt(i.getPropertyValue("padding-left")) }, m = n.top + n.bottom, d = n.right + n.left, c = l - m, p = a - d - s15;
    return { cols: Math.max(h6, Math.floor(p / t.css.cell.width)), rows: Math.max(_, Math.floor(c / t.css.cell.height)) };
  }
};

// node_modules/@xterm/xterm/css/xterm.css
var xterm_default = `/**
 * Copyright (c) 2014 The xterm.js authors. All rights reserved.
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 * https://github.com/chjj/term.js
 * @license MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Originally forked from (with the author's permission):
 *   Fabrice Bellard's javascript vt100 for jslinux:
 *   http://bellard.org/jslinux/
 *   Copyright (c) 2011 Fabrice Bellard
 *   The original design remains. The terminal itself
 *   has been extended to include xterm CSI codes, among
 *   other features.
 */

/**
 *  Default styles for xterm.js
 */

.xterm {
    cursor: text;
    position: relative;
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
}

.xterm.focus,
.xterm:focus {
    outline: none;
}

.xterm .xterm-helpers {
    position: absolute;
    top: 0;
    /**
     * The z-index of the helpers must be higher than the canvases in order for
     * IMEs to appear on top.
     */
    z-index: 5;
}

.xterm .xterm-helper-textarea {
    padding: 0;
    border: 0;
    margin: 0;
    /* Move textarea out of the screen to the far left, so that the cursor is not visible */
    position: absolute;
    opacity: 0;
    left: -9999em;
    top: 0;
    width: 0;
    height: 0;
    z-index: -5;
    /** Prevent wrapping so the IME appears against the textarea at the correct position */
    white-space: nowrap;
    overflow: hidden;
    resize: none;
}

.xterm .composition-view {
    /* TODO: Composition position got messed up somewhere */
    background: #000;
    color: #FFF;
    display: none;
    position: absolute;
    white-space: nowrap;
    z-index: 1;
}

.xterm .composition-view.active {
    display: block;
}

.xterm .xterm-viewport {
    /* On OS X this is required in order for the scroll bar to appear fully opaque */
    background-color: #000;
    overflow-y: scroll;
    cursor: default;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
}

.xterm .xterm-screen {
    position: relative;
}

.xterm .xterm-screen canvas {
    position: absolute;
    left: 0;
    top: 0;
}

.xterm-char-measure-element {
    display: inline-block;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: -9999em;
    line-height: normal;
}

.xterm.enable-mouse-events {
    /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
    cursor: default;
}

.xterm.xterm-cursor-pointer,
.xterm .xterm-cursor-pointer {
    cursor: pointer;
}

.xterm.column-select.focus {
    /* Column selection mode */
    cursor: crosshair;
}

.xterm .xterm-accessibility:not(.debug),
.xterm .xterm-message {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    color: transparent;
    pointer-events: none;
}

.xterm .xterm-accessibility-tree:not(.debug) *::selection {
  color: transparent;
}

.xterm .xterm-accessibility-tree {
  font-family: monospace;
  user-select: text;
  white-space: pre;
}

.xterm .xterm-accessibility-tree > div {
  transform-origin: left;
  width: fit-content;
}

.xterm .live-region {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
}

.xterm-dim {
    /* Dim should not apply to background, so the opacity of the foreground color is applied
     * explicitly in the generated class and reset to 1 here */
    opacity: 1 !important;
}

.xterm-underline-1 { text-decoration: underline; }
.xterm-underline-2 { text-decoration: double underline; }
.xterm-underline-3 { text-decoration: wavy underline; }
.xterm-underline-4 { text-decoration: dotted underline; }
.xterm-underline-5 { text-decoration: dashed underline; }

.xterm-overline {
    text-decoration: overline;
}

.xterm-overline.xterm-underline-1 { text-decoration: overline underline; }
.xterm-overline.xterm-underline-2 { text-decoration: overline double underline; }
.xterm-overline.xterm-underline-3 { text-decoration: overline wavy underline; }
.xterm-overline.xterm-underline-4 { text-decoration: overline dotted underline; }
.xterm-overline.xterm-underline-5 { text-decoration: overline dashed underline; }

.xterm-strikethrough {
    text-decoration: line-through;
}

.xterm-screen .xterm-decoration-container .xterm-decoration {
	z-index: 6;
	position: absolute;
}

.xterm-screen .xterm-decoration-container .xterm-decoration.xterm-decoration-top-layer {
	z-index: 7;
}

.xterm-decoration-overview-ruler {
    z-index: 8;
    position: absolute;
    top: 0;
    right: 0;
    pointer-events: none;
}

.xterm-decoration-top {
    z-index: 2;
    position: relative;
}



/* Derived from vs/base/browser/ui/scrollbar/media/scrollbar.css */

/* xterm.js customization: Override xterm's cursor style */
.xterm .xterm-scrollable-element > .scrollbar {
    cursor: default;
}

/* Arrows */
.xterm .xterm-scrollable-element > .scrollbar > .scra {
	cursor: pointer;
	font-size: 11px !important;
}

.xterm .xterm-scrollable-element > .visible {
	opacity: 1;

	/* Background rule added for IE9 - to allow clicks on dom node */
	background:rgba(0,0,0,0);

	transition: opacity 100ms linear;
	/* In front of peek view */
	z-index: 11;
}
.xterm .xterm-scrollable-element > .invisible {
	opacity: 0;
	pointer-events: none;
}
.xterm .xterm-scrollable-element > .invisible.fade {
	transition: opacity 800ms linear;
}

/* Scrollable Content Inset Shadow */
.xterm .xterm-scrollable-element > .shadow {
	position: absolute;
	display: none;
}
.xterm .xterm-scrollable-element > .shadow.top {
	display: block;
	top: 0;
	left: 3px;
	height: 3px;
	width: 100%;
	box-shadow: var(--vscode-scrollbar-shadow, #000) 0 6px 6px -6px inset;
}
.xterm .xterm-scrollable-element > .shadow.left {
	display: block;
	top: 3px;
	left: 0;
	height: 100%;
	width: 3px;
	box-shadow: var(--vscode-scrollbar-shadow, #000) 6px 0 6px -6px inset;
}
.xterm .xterm-scrollable-element > .shadow.top-left-corner {
	display: block;
	top: 0;
	left: 0;
	height: 3px;
	width: 3px;
}
.xterm .xterm-scrollable-element > .shadow.top.left {
	box-shadow: var(--vscode-scrollbar-shadow, #000) 6px 0 6px -6px inset;
}
`;

// src/client/terminal-panel.js
var h7 = import_react6.default.createElement;
var { useEffect: useEffect2, useRef: useRef3, useState: useState3 } = import_react6.default;
if (typeof document !== "undefined" && document.getElementById("dwb-xterm-style") === null) {
  const styleEl = document.createElement("style");
  styleEl.id = "dwb-xterm-style";
  styleEl.setAttribute("data-plugin", "dsh-work");
  styleEl.textContent = xterm_default;
  document.head.appendChild(styleEl);
}
var TERM_FONT_FALLBACK = "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
var ANSI_DARK = {
  // Tokyo Night（深底霓虹冷色）
  black: "#15161e",
  red: "#f7768e",
  green: "#9ece6a",
  yellow: "#e0af68",
  blue: "#7aa2f7",
  magenta: "#bb9af7",
  cyan: "#7dcfff",
  white: "#a9b1d6",
  brightBlack: "#414868",
  brightRed: "#f7768e",
  brightGreen: "#9ece6a",
  brightYellow: "#e0af68",
  brightBlue: "#7aa2f7",
  brightMagenta: "#bb9af7",
  brightCyan: "#7dcfff",
  brightWhite: "#c0caf5"
};
var ANSI_LIGHT = {
  // GitHub Light 系（白底深色墨）
  black: "#24292f",
  red: "#cf222e",
  green: "#116329",
  yellow: "#9a6700",
  blue: "#0550ae",
  magenta: "#8250df",
  cyan: "#1b7c83",
  white: "#6e7781",
  brightBlack: "#57606a",
  brightRed: "#a40e26",
  brightGreen: "#1a7f37",
  brightYellow: "#7d4e00",
  brightBlue: "#218bff",
  brightMagenta: "#a475f9",
  brightCyan: "#3192aa",
  brightWhite: "#8c959f"
};
function isDarkTheme() {
  try {
    return document.body.hasAttribute("data-ds-dark-theme");
  } catch {
    return true;
  }
}
function themeToken(name2, fallback) {
  try {
    const value = getComputedStyle(document.body).getPropertyValue(name2).trim();
    return value === "" ? fallback : value;
  } catch {
    return fallback;
  }
}
function hexRgb(hex) {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(typeof hex === "string" ? hex.trim() : "");
  if (m === null) return null;
  let h15 = m[1];
  if (h15.length === 3) h15 = h15[0] + h15[0] + h15[1] + h15[1] + h15[2] + h15[2];
  return `${parseInt(h15.slice(0, 2), 16)}, ${parseInt(h15.slice(2, 4), 16)}, ${parseInt(h15.slice(4, 6), 16)}`;
}
function readTermTheme() {
  const dark = isDarkTheme();
  const background = themeToken("--dsw-alias-bg-layer-2", dark ? "#1a1b26" : "#ffffff");
  const foreground = themeToken("--dsw-alias-label-primary", dark ? "#c0caf5" : "#0f1115");
  const brand = themeToken("--dsw-alias-state-business-primary", "#4176e6");
  const brandRgb = hexRgb(brand);
  return {
    background,
    foreground,
    cursor: brandRgb !== null ? brand : foreground,
    cursorAccent: background,
    selectionBackground: brandRgb !== null ? `rgba(${brandRgb}, 0.22)` : "rgba(65, 118, 230, 0.22)",
    selectionInactiveBackground: brandRgb !== null ? `rgba(${brandRgb}, 0.12)` : "rgba(65, 118, 230, 0.12)",
    ...dark ? ANSI_DARK : ANSI_LIGHT
  };
}
function readTermFont() {
  return themeToken("--ds-font-family-code", TERM_FONT_FALLBACK);
}
var RECONNECT_MAX_TRIES = 6;
function terminalWsUrl(id) {
  const proto = window.location.protocol === "https:" ? "wss" : "ws";
  return proto + "://" + window.location.host + "/workbench/terminal/ws?id=" + encodeURIComponent(id);
}
function TerminalPanel(props) {
  const { sessionId, path, visible, onSessionReady } = props;
  const containerRef = useRef3(null);
  const [phase, setPhase] = useState3("boot");
  const [exitInfo, setExitInfo] = useState3(void 0);
  const [errorMsg, setErrorMsg] = useState3(void 0);
  const [meta, setMeta] = useState3(void 0);
  const [runId, setRunId] = useState3(0);
  const sessionRef = useRef3(sessionId);
  const visibleRef = useRef3(visible);
  const wsRef = useRef3(null);
  const termRef = useRef3(null);
  const fitRef = useRef3(null);
  const sizeRef = useRef3({ cols: 80, rows: 24 });
  visibleRef.current = visible;
  const wsSend = (obj) => {
    const ws2 = wsRef.current;
    if (ws2 !== null && ws2.readyState === 1) {
      try {
        ws2.send(JSON.stringify(obj));
      } catch {
      }
    }
  };
  const doFit = () => {
    const term = termRef.current;
    const fit = fitRef.current;
    const container = containerRef.current;
    if (term === null || fit === null || container === null) return;
    if (container.clientWidth < 20 || container.clientHeight < 20) return;
    try {
      fit.fit();
    } catch {
      return;
    }
    const cols = term.cols;
    const rows = term.rows;
    if (cols !== sizeRef.current.cols || rows !== sizeRef.current.rows) {
      sizeRef.current = { cols, rows };
      wsSend({ t: "r", cols, rows });
    }
  };
  useEffect2(() => {
    if (!visible) return;
    const raf = requestAnimationFrame(() => {
      doFit();
      if (termRef.current !== null) {
        try {
          termRef.current.focus();
        } catch {
        }
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [visible, phase]);
  useEffect2(() => {
    const container = containerRef.current;
    if (container === null) return;
    let cancelled = false;
    let opened = false;
    let createdHere = false;
    let reconnectTimer = null;
    let reconnectTries = 0;
    const term = new Dl({
      theme: readTermTheme(),
      fontFamily: readTermFont(),
      fontSize: 12,
      lineHeight: 1.3,
      cursorBlink: true,
      cursorStyle: "bar",
      scrollback: 5e3,
      macOptionIsMeta: true,
      allowProposedApi: false
    });
    const fit = new o();
    term.loadAddon(fit);
    term.open(container);
    termRef.current = term;
    fitRef.current = fit;
    if (visibleRef.current) {
      try {
        fit.fit();
        sizeRef.current = { cols: term.cols, rows: term.rows };
      } catch {
      }
    }
    term.onData((data) => wsSend({ t: "i", d: data }));
    term.onBinary((data) => {
      try {
        wsSend({ t: "b", d: window.btoa(data) });
      } catch {
      }
    });
    const observer = new ResizeObserver(() => {
      if (visibleRef.current) doFit();
    });
    observer.observe(container);
    const themeObserver = new MutationObserver(() => {
      try {
        term.options.theme = readTermTheme();
      } catch {
      }
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ["data-ds-dark-theme"] });
    const ensureSession = async () => {
      if (sessionRef.current !== void 0 && sessionRef.current !== null) return sessionRef.current;
      const response = await fetch("/workbench/terminal/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          cwd: typeof path === "string" && path !== "" ? path : void 0,
          cols: sizeRef.current.cols,
          rows: sizeRef.current.rows
        })
      });
      const body = await response.json();
      if (body.ok !== true) throw new Error(body.error || "\u7EC8\u7AEF\u521B\u5EFA\u5931\u8D25");
      sessionRef.current = body.id;
      createdHere = true;
      setMeta({ cwd: body.cwd, shell: body.shell, pid: body.pid });
      if (onSessionReady !== void 0) onSessionReady(body.id);
      return body.id;
    };
    const connect = (id) => {
      if (cancelled) return;
      const ws2 = new WebSocket(terminalWsUrl(id));
      wsRef.current = ws2;
      ws2.onopen = () => {
        if (cancelled) {
          ws2.close();
          return;
        }
        opened = true;
        reconnectTries = 0;
        setPhase("open");
        doFit();
        if (visibleRef.current) {
          try {
            term.focus();
          } catch {
          }
        }
      };
      ws2.onmessage = (event) => {
        if (cancelled) return;
        let message;
        try {
          message = JSON.parse(event.data);
        } catch {
          return;
        }
        if (message === null || typeof message !== "object") return;
        if (message.t === "o" && typeof message.d === "string") {
          term.write(message.d);
        } else if (message.t === "exit") {
          setExitInfo({ code: message.code, signal: message.signal });
          setPhase("exited");
        }
      };
      ws2.onclose = () => {
        if (cancelled || wsRef.current !== ws2) return;
        wsRef.current = null;
        if (opened) {
          if (reconnectTries < RECONNECT_MAX_TRIES) {
            setPhase("reconnecting");
            const delay = Math.min(8e3, 400 * 2 ** reconnectTries);
            reconnectTries += 1;
            reconnectTimer = setTimeout(() => {
              reconnectTimer = null;
              connect(id);
            }, delay);
          } else {
            setPhase("gone");
          }
        }
      };
      ws2.onerror = () => {
        if (cancelled) return;
        if (!opened) {
          setPhase("gone");
        }
      };
    };
    setPhase("boot");
    ensureSession().then((id) => {
      if (!cancelled) connect(id);
    }).catch((error) => {
      if (cancelled) return;
      setErrorMsg(messageOf(error));
      setPhase("error");
    });
    return () => {
      cancelled = true;
      if (reconnectTimer !== null) clearTimeout(reconnectTimer);
      const ws2 = wsRef.current;
      if (ws2 !== null) {
        wsRef.current = null;
        ws2.onopen = null;
        ws2.onmessage = null;
        ws2.onclose = null;
        ws2.onerror = null;
        try {
          ws2.close();
        } catch {
        }
      }
      observer.disconnect();
      themeObserver.disconnect();
      try {
        term.dispose();
      } catch {
      }
      termRef.current = null;
      fitRef.current = null;
      if (createdHere && !opened && sessionRef.current !== void 0) {
        const id = sessionRef.current;
        sessionRef.current = void 0;
        try {
          void fetch("/workbench/terminal/kill", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id })
          }).catch(() => {
          });
        } catch {
        }
      }
    };
  }, [runId]);
  const restart = () => {
    sessionRef.current = void 0;
    setExitInfo(void 0);
    setErrorMsg(void 0);
    setMeta(void 0);
    setRunId((n) => n + 1);
  };
  const baseName = (p) => typeof p === "string" ? p.split("/").filter((s15) => s15 !== "").pop() ?? "" : "";
  const shellName = meta !== void 0 ? baseName(meta.shell) : "";
  const cwdName = meta !== void 0 ? baseName(meta.cwd) : baseName(path);
  const titleParts = [shellName, cwdName].filter((s15) => s15 !== "");
  const titleText = titleParts.length > 0 ? titleParts.join(" \u2014 ") : "terminal";
  const statusKind = phase === "open" || phase === "boot" ? "run" : phase === "reconnecting" ? "warn" : "down";
  const statusText = phase === "open" ? "\u8FD0\u884C\u4E2D" : phase === "boot" ? "\u542F\u52A8\u4E2D" : phase === "reconnecting" ? "\u91CD\u8FDE\u4E2D" : phase === "exited" ? "\u5DF2\u9000\u51FA" : phase === "gone" ? "\u5DF2\u7ED3\u675F" : "\u542F\u52A8\u5931\u8D25";
  const exitText = exitInfo === void 0 ? "" : exitInfo.signal != null ? `\u4FE1\u53F7 ${exitInfo.signal}` : `\u9000\u51FA\u7801 ${exitInfo.code ?? 0}`;
  const metaText = titleText + (meta !== void 0 && meta.pid !== void 0 ? ` \xB7 pid ${meta.pid}` : "");
  return h7(
    "div",
    { className: "dwb-terminal-wrap", "data-status": statusKind },
    h7(
      "div",
      { className: "dwb-term-body" },
      h7("div", { ref: containerRef, className: "dwb-terminal" }),
      phase === "boot" ? h7(
        "div",
        { className: "dwb-term-boot" },
        h7("span", { className: "dwb-term-bootdots" }, h7("i"), h7("i"), h7("i")),
        h7("span", null, "\u6B63\u5728\u542F\u52A8 shell\u2026")
      ) : null,
      phase === "exited" ? h7(
        "div",
        { className: "dwb-term-overlay" },
        h7("div", { className: "dwb-term-overlay-title" }, "\u8FDB\u7A0B\u5DF2\u9000\u51FA"),
        h7("div", { className: "dwb-term-overlay-sub" }, exitText),
        h7("button", { type: "button", className: "dwb-term-btn", onClick: restart }, "\u91CD\u65B0\u542F\u52A8")
      ) : null,
      phase === "gone" ? h7(
        "div",
        { className: "dwb-term-overlay" },
        h7("div", { className: "dwb-term-overlay-title" }, "\u7EC8\u7AEF\u4F1A\u8BDD\u5DF2\u7ED3\u675F"),
        h7("div", { className: "dwb-term-overlay-sub" }, "\u670D\u52A1\u91CD\u542F\u6216\u4F1A\u8BDD\u8D85\u65F6\u56DE\u6536"),
        h7("button", { type: "button", className: "dwb-term-btn", onClick: restart }, "\u65B0\u5EFA\u7EC8\u7AEF")
      ) : null,
      phase === "error" ? h7(
        "div",
        { className: "dwb-term-overlay" },
        h7("div", { className: "dwb-term-overlay-title" }, "\u7EC8\u7AEF\u542F\u52A8\u5931\u8D25"),
        h7("div", { className: "dwb-term-overlay-sub" }, errorMsg || ""),
        h7("button", { type: "button", className: "dwb-term-btn", onClick: restart }, "\u91CD\u8BD5")
      ) : null
    ),
    h7(
      "div",
      { className: "dwb-term-statusline" },
      h7(
        "span",
        { className: "dwb-term-status" },
        h7("i", { className: "dwb-term-statusdot" }),
        h7("span", null, statusText)
      ),
      h7("span", { className: "dwb-term-meta", title: metaText }, metaText)
    )
  );
}

// src/client/taskboard/panel.js
var import_react9 = __toESM(require("react"), 1);

// src/client/taskboard/shared.js
var TASK_PERMISSIONS = ["read-only", "workspace-write", "danger-full-access"];
var PERMISSION_LABEL = {
  "read-only": "\u53EA\u8BFB",
  "workspace-write": "\u5DE5\u4F5C\u533A\u5199\u5165",
  "danger-full-access": "\u5B8C\u5168\u8BBF\u95EE"
};
function uuid() {
  return globalThis.crypto?.randomUUID?.() ?? `browser-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

// src/client/taskboard/api.js
var PREFIX = "/workbench/taskboard";
var REQUEST_TIMEOUT_MS = 15e3;
async function readJson(response) {
  const text = await response.text();
  let body;
  try {
    body = text === "" ? void 0 : JSON.parse(text);
  } catch {
    throw new Error(`taskboard request failed: HTTP ${response.status} returned a non-JSON response`);
  }
  if (!response.ok) {
    throw new Error(body && body.error || `taskboard request failed: ${response.status}`);
  }
  if (body === void 0) {
    throw new Error(`taskboard request failed: HTTP ${response.status} returned an empty body`);
  }
  return body;
}
async function request(url, init) {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);
  try {
    return await readJson(await fetch(url, { ...init, signal: controller.signal }));
  } catch (error) {
    if (controller.signal.aborted) throw new Error(`taskboard Host request timed out after ${REQUEST_TIMEOUT_MS / 1e3}s`);
    throw error;
  } finally {
    globalThis.clearTimeout(timeout);
  }
}
function fetchState() {
  return request(`${PREFIX}/state`, { cache: "no-store" });
}
function fetchOptions() {
  return request(`${PREFIX}/options`, { cache: "no-store" });
}
function sendAction(action) {
  return request(`${PREFIX}/action`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ requestId: uuid(), action })
  });
}

// src/client/taskboard/format.js
function formatHostTimestamp(ms2, timeZone) {
  try {
    return new Intl.DateTimeFormat(void 0, {
      dateStyle: "medium",
      timeStyle: "medium",
      ...timeZone === void 0 ? {} : { timeZone }
    }).format(new Date(ms2));
  } catch {
    return new Date(ms2).toISOString();
  }
}
function formatTime(ms2, timeZone) {
  const date = new Date(ms2);
  const now = Date.now();
  if (ms2 > now) return formatHostTimestamp(ms2, timeZone);
  const minutes = Math.floor((now - ms2) / 6e4);
  if (minutes < 1) return "\u521A\u521A";
  if (minutes < 60) return `${minutes} \u5206\u949F\u524D`;
  if (minutes < 60 * 24) return `${Math.floor(minutes / 60)} \u5C0F\u65F6\u524D`;
  if (timeZone !== void 0) return formatHostTimestamp(ms2, timeZone);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// src/client/taskboard/detail.js
var import_react8 = __toESM(require("react"), 1);

// src/taskboard/schedule.js
var FIELD_RANGES = [
  [0, 59],
  // minutes
  [0, 23],
  // hours
  [1, 31],
  // days
  [1, 12],
  // months
  [0, 7]
  // weekdays (7 = Sunday, normalized below)
];
function parseCron(expr) {
  if (typeof expr !== "string") return null;
  const fields = expr.trim().split(/\s+/);
  if (fields.length !== 5) return null;
  const sets = [];
  for (let index = 0; index < 5; index++) {
    const [min, max] = FIELD_RANGES[index];
    const set = /* @__PURE__ */ new Set();
    if (!parseField(fields[index], min, max, set)) return null;
    sets.push(set);
  }
  const weekdays = /* @__PURE__ */ new Set();
  for (const day of sets[4]) weekdays.add(day === 7 ? 0 : day);
  return {
    minutes: sets[0],
    hours: sets[1],
    days: sets[2],
    months: sets[3],
    weekdays,
    // 只有字面 '*' 才算不受限字段：'1-31' 这类完全枚举仍是受限字段，
    // 必须参与 日/周 OR 语义。
    dayWildcard: fields[2] === "*",
    weekdayWildcard: fields[4] === "*"
  };
}
function isValidCron(expr) {
  return parseCron(expr) !== null;
}
function nextRunAtMs(expr, fromMs) {
  const schedule = parseCron(expr);
  if (schedule === null) return void 0;
  if (!hasPossibleCalendarDay(schedule)) return void 0;
  const from = new Date(fromMs);
  const limitMs = fromMs + 5 * 366 * 24 * 60 * 60 * 1e3;
  const sortedMinutes = [...schedule.minutes].sort((a, b2) => a - b2);
  const sortedHours = [...schedule.hours].sort((a, b2) => a - b2);
  const sortedMonths = [...schedule.months].sort((a, b2) => a - b2);
  let year = from.getFullYear();
  let month = from.getMonth() + 1;
  let day = from.getDate();
  let hour = from.getHours();
  let minute = from.getMinutes() + 1;
  while (new Date(year, month - 1, 1, 0, 0, 0, 0).getTime() <= limitMs) {
    for (const candidateMonth of sortedMonths) {
      if (candidateMonth < month) continue;
      const daysInMonth = new Date(year, candidateMonth, 0).getDate();
      const dayStart = candidateMonth === month ? day : 1;
      for (let candidateDay = dayStart; candidateDay <= daysInMonth; candidateDay += 1) {
        const dayProbe = new Date(year, candidateMonth - 1, candidateDay, 0, 0, 0, 0);
        if (!dayCandidate(schedule, dayProbe)) continue;
        const hourStart = candidateMonth === month && candidateDay === day ? hour : 0;
        for (const candidateHour of sortedHours) {
          if (candidateHour < hourStart) continue;
          const minuteStart = candidateMonth === month && candidateDay === day && candidateHour === hour ? minute : 0;
          for (const candidateMinute of sortedMinutes) {
            if (candidateMinute < minuteStart) continue;
            const candidate = new Date(year, candidateMonth - 1, candidateDay, candidateHour, candidateMinute, 0, 0);
            const time = candidate.getTime();
            if (time <= fromMs) continue;
            if (time > limitMs) return void 0;
            if (matches(schedule, candidate)) return time;
          }
        }
      }
    }
    year += 1;
    month = 1;
    day = 1;
    hour = 0;
    minute = 0;
  }
  return void 0;
}
function dayCandidate(schedule, date) {
  const dayMatches = schedule.days.has(date.getDate());
  const weekdayMatches = schedule.weekdays.has(date.getDay());
  if (schedule.dayWildcard) return weekdayMatches;
  if (schedule.weekdayWildcard) return dayMatches;
  return dayMatches || weekdayMatches;
}
function hasPossibleCalendarDay(schedule) {
  if (schedule.dayWildcard || !schedule.weekdayWildcard) return true;
  const maximumDay = /* @__PURE__ */ new Map([
    [1, 31],
    [2, 29],
    [3, 31],
    [4, 30],
    [5, 31],
    [6, 30],
    [7, 31],
    [8, 31],
    [9, 30],
    [10, 31],
    [11, 30],
    [12, 31]
  ]);
  for (const month of schedule.months) {
    const maximum = maximumDay.get(month) ?? 0;
    if ([...schedule.days].some((day) => day <= maximum)) return true;
  }
  return false;
}
function parseField(field, min, max, out) {
  if (field === "*") {
    for (let value = min; value <= max; value++) out.add(value);
    return true;
  }
  for (const part of field.split(",")) {
    if (part === "") return false;
    const [range, stepRaw] = part.split("/");
    let low;
    let high;
    if (range === "*") {
      low = min;
      high = max;
    } else if (range.includes("-")) {
      const [a, b2] = range.split("-");
      if (a === "" || b2 === "" || !isDigits(a) || !isDigits(b2)) return false;
      low = Number(a);
      high = Number(b2);
    } else if (isDigits(range)) {
      low = Number(range);
      high = Number(range);
    } else {
      return false;
    }
    if (low < min || high > max || low > high) return false;
    const step = stepRaw === void 0 ? 1 : isDigits(stepRaw) ? Number(stepRaw) : NaN;
    if (!Number.isInteger(step) || step < 1) return false;
    for (let value = low; value <= high; value += step) out.add(value);
  }
  return true;
}
function matches(schedule, date) {
  if (!schedule.minutes.has(date.getMinutes())) return false;
  if (!schedule.hours.has(date.getHours())) return false;
  if (!schedule.months.has(date.getMonth() + 1)) return false;
  return dayCandidate(schedule, date);
}
function isDigits(value) {
  return /^\d+$/.test(value);
}

// src/client/taskboard/new-task.js
var import_react7 = __toESM(require("react"), 1);

// src/client/taskboard/presets.js
var SCHEDULE_PRESETS = [
  { cron: "0 9 * * *", label: "\u6BCF\u5929 09:00" },
  { cron: "0 * * * *", label: "\u6BCF\u5C0F\u65F6\u6574\u70B9" },
  { cron: "*/10 * * * *", label: "\u6BCF 10 \u5206\u949F" },
  { cron: "0 9 * * 1", label: "\u6BCF\u5468\u4E00 09:00" }
];

// src/client/taskboard/new-task.js
var h8 = import_react7.default.createElement;
var { useState: useState4 } = import_react7.default;
var MAX_INPUT_BYTES = 48 * 1024;
function NewTaskModal(props) {
  const { options, timeZone, onClose, act } = props;
  const [title, setTitle] = useState4("");
  const [description, setDescription] = useState4("");
  const [prompt, setPrompt] = useState4("");
  const [workspaceId, setWorkspaceId] = useState4("");
  const [mode, setMode] = useState4("");
  const [permission, setPermission] = useState4("");
  const [scheduleEnabled, setScheduleEnabled] = useState4(false);
  const [scheduleCron, setScheduleCron] = useState4("");
  const [scheduleError, setScheduleError] = useState4(void 0);
  const [error, setError] = useState4(void 0);
  const [pending, setPending] = useState4(false);
  const submit = async () => {
    if (pending) return;
    if (title.trim() === "") {
      setError("\u8BF7\u586B\u5199\u4EFB\u52A1\u6807\u9898");
      return;
    }
    if (new TextEncoder().encode(title + description + prompt).length > MAX_INPUT_BYTES) {
      setError(`\u5185\u5BB9\u8FC7\u957F\uFF1A\u6807\u9898\u3001\u63CF\u8FF0\u4E0E Prompt \u5408\u8BA1\u4E0D\u80FD\u8D85\u8FC7 ${Math.round(MAX_INPUT_BYTES / 1024)}KB`);
      return;
    }
    if (scheduleEnabled) {
      const cron = scheduleCron.trim();
      if (cron === "" || !isValidCron(cron)) {
        setScheduleError("\u65E0\u6548\u7684 cron \u8868\u8FBE\u5F0F\uFF085 \u6BB5\uFF1A\u5206 \u65F6 \u65E5 \u6708 \u5468\uFF09");
        return;
      }
      if (nextRunAtMs(cron, Date.now()) === void 0) {
        setScheduleError("\u8BE5 cron \u5728\u672A\u6765 5 \u5E74\u5185\u6CA1\u6709\u5339\u914D\u65F6\u523B\uFF0C\u65E0\u6CD5\u6B66\u88C5");
        return;
      }
    }
    setPending(true);
    const result = await act({
      kind: "create",
      id: uuid(),
      input: {
        title,
        description,
        prompt,
        workspaceId: workspaceId === "" ? void 0 : workspaceId,
        mode: mode === "" ? void 0 : mode,
        permission: permission === "" ? void 0 : permission,
        schedule: scheduleEnabled ? { enabled: true, cron: scheduleCron.trim() } : void 0
      }
    }, void 0);
    if (result.error !== void 0) {
      setPending(false);
      setError(result.error);
      return;
    }
    onClose();
  };
  const cronTrimmed = scheduleCron.trim();
  const cronValid = cronTrimmed !== "" && isValidCron(cronTrimmed);
  const scheduleNextRun = scheduleEnabled && cronValid ? nextRunAtMs(cronTrimmed, Date.now()) : void 0;
  return h8(
    "div",
    {
      className: "dwb-tb-backdrop",
      onMouseDown: (event) => {
        if (event.target === event.currentTarget) onClose();
      }
    },
    h8(
      "form",
      {
        className: "dwb-tb-modal",
        role: "dialog",
        "aria-label": "\u65B0\u5EFA\u4EFB\u52A1",
        onSubmit: (event) => {
          event.preventDefault();
          void submit();
        }
      },
      h8("h2", { className: "dwb-tb-modal-title" }, "\u65B0\u5EFA\u4EFB\u52A1"),
      h8(
        "div",
        { className: "dwb-tb-modal-body" },
        h8(
          "label",
          { className: "dwb-tb-field" },
          h8("span", { className: "dwb-tb-field-label" }, "\u6807\u9898"),
          h8("input", {
            className: "dwb-tb-input",
            value: title,
            autoFocus: true,
            placeholder: "\u4EFB\u52A1\u6807\u9898\uFF08\u5FC5\u586B\uFF09",
            onChange: (event) => {
              setTitle(event.target.value);
              setError(void 0);
            }
          })
        ),
        h8(
          "label",
          { className: "dwb-tb-field" },
          h8("span", { className: "dwb-tb-field-label" }, "\u63CF\u8FF0"),
          h8("textarea", {
            className: "dwb-tb-input",
            rows: 2,
            value: description,
            placeholder: "\u4EFB\u52A1\u8BF4\u660E\uFF08\u53EF\u9009\uFF09",
            onChange: (event) => setDescription(event.target.value)
          })
        ),
        h8(
          "label",
          { className: "dwb-tb-field" },
          h8("span", { className: "dwb-tb-field-label" }, "\u6267\u884C Prompt"),
          h8("textarea", {
            className: "dwb-tb-input",
            rows: 4,
            value: prompt,
            placeholder: "\u6267\u884C\u65F6\u53D1\u7ED9 DSH \u4F1A\u8BDD\u7684 Prompt\uFF1B\u7559\u7A7A\u5219\u4F7F\u7528\u6807\u9898",
            onChange: (event) => setPrompt(event.target.value)
          })
        ),
        h8(
          "label",
          { className: "dwb-tb-field" },
          h8("span", { className: "dwb-tb-field-label" }, "\u5DE5\u4F5C\u533A"),
          h8(
            "select",
            {
              className: "dwb-tb-select",
              value: workspaceId,
              onChange: (event) => setWorkspaceId(event.target.value)
            },
            h8("option", { value: "" }, "\u6700\u8FD1\u5DE5\u4F5C\u533A"),
            options.workspaces.map((workspace) => h8("option", { key: workspace.workspaceId, value: workspace.workspaceId }, workspace.title))
          )
        ),
        h8(
          "label",
          { className: "dwb-tb-field" },
          h8("span", { className: "dwb-tb-field-label" }, "Agent \u9884\u8BBE"),
          h8(
            "select",
            {
              className: "dwb-tb-select",
              value: mode,
              onChange: (event) => setMode(event.target.value)
            },
            h8("option", { value: "" }, "\u90E8\u7F72\u9ED8\u8BA4\u9884\u8BBE"),
            options.presets.map((preset) => h8(
              "option",
              { key: preset.id, value: preset.id, disabled: preset.broken !== void 0 },
              (preset.name ?? preset.id) + (preset.isDefault === true ? "\uFF08\u9ED8\u8BA4\uFF09" : "") + (preset.broken !== void 0 ? "\uFF08\u4E0D\u53EF\u7528\uFF09" : "")
            ))
          )
        ),
        h8(
          "label",
          { className: "dwb-tb-field" },
          h8("span", { className: "dwb-tb-field-label" }, "\u6743\u9650\u9884\u8BBE"),
          h8(
            "select",
            {
              className: "dwb-tb-select",
              value: permission,
              onChange: (event) => setPermission(event.target.value)
            },
            h8("option", { value: "" }, "\u4F1A\u8BDD\u9ED8\u8BA4"),
            TASK_PERMISSIONS.map((id) => h8("option", { key: id, value: id }, PERMISSION_LABEL[id]))
          )
        ),
        h8(
          "section",
          { className: "dwb-tb-section" },
          h8("h4", null, "\u5B9A\u65F6\u6267\u884C"),
          h8(
            "label",
            { className: "dwb-tb-schedule-toggle" },
            h8("input", {
              type: "checkbox",
              checked: scheduleEnabled,
              onChange: (event) => {
                setScheduleEnabled(event.target.checked);
                if (!event.target.checked) setScheduleError(void 0);
              }
            }),
            h8("span", null, "\u521B\u5EFA\u540E\u7ACB\u5373\u6B66\u88C5\u5B9A\u65F6\u6267\u884C")
          ),
          scheduleEnabled ? h8(
            import_react7.default.Fragment,
            null,
            h8(
              "div",
              { className: "dwb-tb-schedule-row" },
              h8("input", {
                className: "dwb-tb-input dwb-tb-schedule-input" + (scheduleError !== void 0 ? " dwb-tb-schedule-invalid" : ""),
                value: scheduleCron,
                placeholder: "0 9 * * *",
                spellCheck: false,
                "aria-label": "cron \u8868\u8FBE\u5F0F",
                onChange: (event) => {
                  setScheduleCron(event.target.value);
                  setScheduleError(void 0);
                }
              }),
              h8(
                "select",
                {
                  className: "dwb-tb-schedule-preset",
                  value: "",
                  "aria-label": "\u5B9A\u65F6\u9884\u8BBE",
                  onChange: (event) => {
                    if (event.target.value === "") return;
                    setScheduleCron(event.target.value);
                    setScheduleError(void 0);
                  }
                },
                h8("option", { value: "" }, "\u9884\u8BBE\u2026"),
                SCHEDULE_PRESETS.map((preset) => h8("option", { key: preset.cron, value: preset.cron }, preset.label))
              )
            ),
            scheduleError !== void 0 ? h8("p", { className: "dwb-tb-form-error" }, scheduleError) : null,
            scheduleError === void 0 && scheduleEnabled && cronValid && scheduleNextRun === void 0 ? h8("p", { className: "dwb-tb-form-error" }, "\u8BE5 cron \u5728\u672A\u6765 5 \u5E74\u5185\u6CA1\u6709\u5339\u914D\u65F6\u523B\uFF0C\u65E0\u6CD5\u6B66\u88C5") : null,
            scheduleError === void 0 && scheduleNextRun !== void 0 ? h8("p", { className: "dwb-tb-schedule-meta" }, `\u4E0B\u6B21\u89E6\u53D1 ${formatHostTimestamp(scheduleNextRun, timeZone)}`) : null
          ) : null
        ),
        error !== void 0 ? h8("p", { className: "dwb-tb-form-error" }, error) : null
      ),
      h8(
        "footer",
        { className: "dwb-tb-modal-footer" },
        h8("button", { type: "button", className: "dwb-tb-btn", onClick: onClose }, "\u53D6\u6D88"),
        h8("button", { type: "submit", className: "dwb-tb-btn dwb-tb-btn-primary", disabled: pending }, "\u521B\u5EFA")
      )
    )
  );
}
function ConfirmDialog(props) {
  const { title, message, confirmLabel, danger, onCancel, onConfirm } = props;
  return h8(
    "div",
    {
      className: "dwb-tb-backdrop",
      onMouseDown: (event) => {
        if (event.target === event.currentTarget) onCancel();
      }
    },
    h8(
      "div",
      { className: "dwb-tb-modal", role: "alertdialog", "aria-label": title },
      h8("h2", { className: "dwb-tb-modal-title" }, title),
      h8("p", { className: "dwb-tb-confirm-message" }, message),
      h8(
        "footer",
        { className: "dwb-tb-modal-footer" },
        h8("button", { type: "button", className: "dwb-tb-btn", onClick: onCancel }, "\u53D6\u6D88"),
        h8("button", {
          type: "button",
          className: danger ? "dwb-tb-btn dwb-tb-btn-danger" : "dwb-tb-btn dwb-tb-btn-primary",
          onClick: () => void onConfirm()
        }, confirmLabel)
      )
    )
  );
}

// src/client/taskboard/detail.js
var h9 = import_react8.default.createElement;
var { useEffect: useEffect3, useState: useState5 } = import_react8.default;
var MANUAL_STATUSES = ["backlog", "todo"];
var RESULT_LABEL = {
  succeeded: "\u6210\u529F",
  failed: "\u5931\u8D25",
  cancelled: "\u5DF2\u53D6\u6D88"
};
function ExecutionRow(props) {
  const { execution, timeZone, canOpenSession, onOpen } = props;
  const result = execution.result;
  return h9(
    "li",
    { className: "dwb-tb-exec-row", "data-result": result },
    h9(
      "span",
      { className: "dwb-tb-exec-badge", "data-result": result },
      result === void 0 ? "\u8FD0\u884C\u4E2D" : RESULT_LABEL[result]
    ),
    h9(
      "span",
      { className: "dwb-tb-exec-times" },
      `\u5F00\u59CB ${formatTime(execution.startedAt, timeZone)}`,
      execution.endedAt !== void 0 ? ` \xB7 \u7ED3\u675F ${formatTime(execution.endedAt, timeZone)}` : ""
    ),
    execution.sessionId !== void 0 && canOpenSession ? h9("button", {
      type: "button",
      className: "dwb-tb-linkbtn",
      onClick: () => onOpen(execution.sessionId),
      title: execution.sessionId
    }, "\u67E5\u770B\u4F1A\u8BDD \u2301") : null,
    execution.error !== void 0 && execution.error !== "" ? h9("span", { className: "dwb-tb-exec-error" }, execution.error) : null
  );
}
function ExecutionSettingsSection(props) {
  const { task, pending, options, act } = props;
  const workspaceId = task.workspaceId ?? "";
  const mode = task.mode ?? "";
  const permission = task.permission ?? "";
  const workspaceKnown = workspaceId === "" || options.workspaces.some((item) => item.workspaceId === workspaceId);
  const modeKnown = mode === "" || options.presets.some((item) => item.id === mode);
  return h9(
    "section",
    { className: "dwb-tb-section" },
    h9("h4", null, "\u6267\u884C\u76EE\u6807"),
    h9("p", { className: "dwb-tb-text" }, "\u6267\u884C\u65F6\u65B0\u5EFA\u72EC\u7ACB DSH \u4F1A\u8BDD\uFF1B\u672A\u9009\u62E9\u65F6\u4F7F\u7528\u8FD0\u884C\u65F6\u7F3A\u7701\u3002"),
    h9(
      "label",
      { className: "dwb-tb-field" },
      h9("span", { className: "dwb-tb-field-label" }, "\u5DE5\u4F5C\u533A"),
      h9(
        "select",
        {
          className: "dwb-tb-select",
          value: workspaceId,
          disabled: pending,
          onChange: (event) => void act({ kind: "update", taskId: task.id, patch: { workspaceId: event.target.value } }, task.id)
        },
        h9("option", { value: "" }, "\u6700\u8FD1\u5DE5\u4F5C\u533A"),
        !workspaceKnown ? h9("option", { value: workspaceId }, `${workspaceId}\uFF08\u5DF2\u4E0D\u5B58\u5728\uFF09`) : null,
        options.workspaces.map((workspace) => h9("option", { key: workspace.workspaceId, value: workspace.workspaceId }, workspace.title))
      )
    ),
    h9(
      "label",
      { className: "dwb-tb-field" },
      h9("span", { className: "dwb-tb-field-label" }, "Agent \u9884\u8BBE"),
      h9(
        "select",
        {
          className: "dwb-tb-select",
          value: mode,
          disabled: pending,
          onChange: (event) => void act({ kind: "update", taskId: task.id, patch: { mode: event.target.value } }, task.id)
        },
        h9("option", { value: "" }, "\u90E8\u7F72\u9ED8\u8BA4\u9884\u8BBE"),
        !modeKnown ? h9("option", { value: mode }, `${mode}\uFF08\u5DF2\u4E0D\u5B58\u5728\uFF09`) : null,
        options.presets.map((preset) => h9(
          "option",
          { key: preset.id, value: preset.id, disabled: preset.broken !== void 0 },
          (preset.name ?? preset.id) + (preset.isDefault === true ? "\uFF08\u9ED8\u8BA4\uFF09" : "") + (preset.broken !== void 0 ? "\uFF08\u4E0D\u53EF\u7528\uFF09" : "")
        ))
      )
    ),
    h9(
      "label",
      { className: "dwb-tb-field" },
      h9("span", { className: "dwb-tb-field-label" }, "\u6743\u9650\u9884\u8BBE"),
      h9(
        "select",
        {
          className: "dwb-tb-select",
          value: permission,
          disabled: pending,
          // 空串表达清除意图：JSON 传不了显式 undefined，服务端 normalizePermission
          // 把 ''/空白归一为 undefined（与 workspaceId/mode 的清除方式一致）。
          onChange: (event) => void act({ kind: "update", taskId: task.id, patch: { permission: event.target.value } }, task.id)
        },
        h9("option", { value: "" }, "\u4F1A\u8BDD\u9ED8\u8BA4"),
        TASK_PERMISSIONS.map((id) => h9("option", { key: id, value: id }, PERMISSION_LABEL[id]))
      )
    )
  );
}
function ScheduleSection(props) {
  const { task, pending, timeZone, act } = props;
  const schedule = task.schedule;
  const [cron, setCron] = useState5(schedule?.cron ?? "0 9 * * *");
  const [enabled, setEnabled] = useState5(schedule?.enabled ?? false);
  const [errorText, setErrorText] = useState5(void 0);
  useEffect3(() => {
    setCron(schedule?.cron ?? "0 9 * * *");
    setEnabled(schedule?.enabled ?? false);
    setErrorText(void 0);
  }, [task.id, schedule?.enabled, schedule?.cron]);
  const saveCron = (value) => {
    const trimmed = value.trim();
    setCron(trimmed);
    if (trimmed === "" || !isValidCron(trimmed)) {
      setErrorText("\u65E0\u6548\u7684 cron \u8868\u8FBE\u5F0F\uFF085 \u6BB5\uFF1A\u5206 \u65F6 \u65E5 \u6708 \u5468\uFF09");
      return;
    }
    if (nextRunAtMs(trimmed, Date.now()) === void 0) {
      setErrorText("\u8BE5 cron \u5728\u672A\u6765 5 \u5E74\u5185\u6CA1\u6709\u5339\u914D\u65F6\u523B\uFF0C\u65E0\u6CD5\u6B66\u88C5");
      return;
    }
    setErrorText(void 0);
    void act({ kind: "set-schedule", taskId: task.id, patch: { cron: trimmed } }, task.id);
  };
  const toggleEnabled = (next) => {
    const trimmed = cron.trim();
    if (next && (trimmed === "" || !isValidCron(trimmed))) {
      setErrorText("\u65E0\u6548\u7684 cron \u8868\u8FBE\u5F0F\uFF085 \u6BB5\uFF1A\u5206 \u65F6 \u65E5 \u6708 \u5468\uFF09");
      return;
    }
    if (next && nextRunAtMs(trimmed, Date.now()) === void 0) {
      setErrorText("\u8BE5 cron \u5728\u672A\u6765 5 \u5E74\u5185\u6CA1\u6709\u5339\u914D\u65F6\u523B\uFF0C\u65E0\u6CD5\u6B66\u88C5");
      return;
    }
    setErrorText(void 0);
    void act({
      kind: "set-schedule",
      taskId: task.id,
      patch: { enabled: next, ...next && trimmed !== schedule?.cron ? { cron: trimmed } : {} }
    }, task.id);
  };
  const applyPreset = (preset) => {
    if (preset === "") return;
    setCron(preset);
    setErrorText(void 0);
    void act({ kind: "set-schedule", taskId: task.id, patch: { cron: preset } }, task.id);
  };
  const nextRunAt = schedule?.nextRunAt;
  const lastTriggeredAt = schedule?.lastTriggeredAt;
  const nextLabel = enabled !== true || nextRunAt === void 0 ? "\u672A\u8C03\u5EA6" : nextRunAt <= Date.now() ? "\u5373\u5C06\u89E6\u53D1" : formatHostTimestamp(nextRunAt, timeZone);
  const lastLabel = lastTriggeredAt === void 0 ? "\u2014" : formatHostTimestamp(lastTriggeredAt, timeZone);
  return h9(
    "section",
    { className: "dwb-tb-section" },
    h9("h4", null, "\u5B9A\u65F6\u6267\u884C"),
    h9(
      "label",
      { className: "dwb-tb-schedule-toggle" },
      h9("input", {
        type: "checkbox",
        checked: enabled,
        disabled: pending,
        onChange: (event) => toggleEnabled(event.target.checked)
      }),
      h9("span", null, "\u542F\u7528 Host \u5B9A\u65F6\u6267\u884C\uFF08\u5173\u95ED\u6D4F\u89C8\u5668\u4ECD\u4F1A\u89E6\u53D1\uFF09")
    ),
    h9(
      "div",
      { className: "dwb-tb-schedule-row" },
      h9("input", {
        className: "dwb-tb-input dwb-tb-schedule-input" + (errorText !== void 0 ? " dwb-tb-schedule-invalid" : ""),
        value: cron,
        disabled: pending,
        placeholder: "0 9 * * *",
        spellCheck: false,
        "aria-label": "cron \u8868\u8FBE\u5F0F",
        onChange: (event) => {
          setCron(event.target.value);
          setErrorText(void 0);
        },
        onBlur: () => saveCron(cron),
        onKeyDown: (event) => {
          if (event.key === "Enter") saveCron(cron);
        }
      }),
      h9(
        "select",
        {
          className: "dwb-tb-schedule-preset",
          value: "",
          disabled: pending,
          "aria-label": "\u5B9A\u65F6\u9884\u8BBE",
          onChange: (event) => applyPreset(event.target.value)
        },
        h9("option", { value: "" }, "\u9884\u8BBE\u2026"),
        SCHEDULE_PRESETS.map((preset) => h9("option", { key: preset.cron, value: preset.cron }, preset.label))
      )
    ),
    errorText !== void 0 ? h9("p", { className: "dwb-tb-form-error" }, errorText) : null,
    h9(
      "p",
      { className: "dwb-tb-schedule-meta" },
      `\u4E0B\u6B21\u89E6\u53D1 ${nextLabel} \xB7 \u4E0A\u6B21\u89E6\u53D1 ${lastLabel}`
    )
  );
}
function TaskDetail(props) {
  const {
    task,
    pending,
    error,
    options,
    timeZone,
    sessions,
    statusLabel,
    onClose,
    act,
    onRetry,
    openSession,
    onDeleted
  } = props;
  const [confirmDelete, setConfirmDelete] = useState5(false);
  const running = task.status === "running";
  const archived = task.archivedAt !== void 0;
  const canOpenSession = sessions !== void 0 && typeof sessions.open === "function";
  return h9(
    "div",
    {
      className: "dwb-tb-backdrop",
      onMouseDown: (event) => {
        if (event.target === event.currentTarget) onClose();
      }
    },
    h9(
      "div",
      { className: "dwb-tb-detail", role: "dialog", "aria-label": "\u4EFB\u52A1\u8BE6\u60C5" },
      h9(
        "header",
        { className: "dwb-tb-detail-header" },
        h9("h2", { className: "dwb-tb-detail-title" }, task.title),
        h9(
          "span",
          { className: "dwb-tb-status-badge", "data-status": archived ? "archived" : task.status },
          archived ? "\u5DF2\u5F52\u6863" : statusLabel[task.status]
        ),
        h9("button", { type: "button", className: "dwb-tb-iconbtn", "aria-label": "\u5173\u95ED", onClick: onClose }, "\xD7")
      ),
      h9(
        "div",
        { className: "dwb-tb-detail-body" },
        error !== void 0 ? h9(
          "div",
          { className: "dwb-tb-form-error" },
          // 错误既可能是传输故障，也可能是 Host 业务拒绝（如删除运行中任务），
          // 统一用中性文案，不误导为连接问题。
          `\u64CD\u4F5C\u5931\u8D25\uFF1A${error} `,
          h9("button", { type: "button", className: "dwb-tb-linkbtn", onClick: onRetry }, "\u91CD\u8BD5")
        ) : null,
        h9(
          "section",
          { className: "dwb-tb-section" },
          h9("h4", null, "\u63CF\u8FF0"),
          h9("p", { className: "dwb-tb-text" }, task.description !== "" ? task.description : "\u2014")
        ),
        h9(
          "section",
          { className: "dwb-tb-section" },
          h9("h4", null, "\u6267\u884C Prompt"),
          h9("pre", { className: "dwb-tb-prompt" }, task.prompt !== "" ? task.prompt : task.title)
        ),
        !archived ? h9(ExecutionSettingsSection, { task, pending, options, act }) : null,
        !archived ? h9(ScheduleSection, { task, pending, timeZone, act }) : null,
        h9(
          "section",
          { className: "dwb-tb-section" },
          h9("h4", null, "\u6267\u884C\u5386\u53F2"),
          task.executions.length === 0 ? h9("p", { className: "dwb-tb-text" }, "\u5C1A\u672A\u6267\u884C\u8FC7") : h9(
            "ul",
            { className: "dwb-tb-exec-list" },
            [...task.executions].reverse().map((execution) => h9(ExecutionRow, { key: execution.id, execution, timeZone, canOpenSession, onOpen: openSession }))
          )
        ),
        !archived ? h9(
          "section",
          { className: "dwb-tb-section" },
          h9("h4", null, "\u79FB\u52A8\u4EFB\u52A1"),
          h9(
            "div",
            { className: "dwb-tb-move-row" },
            MANUAL_STATUSES.map((status) => h9("button", {
              key: status,
              type: "button",
              className: "dwb-tb-btn",
              disabled: task.status === status || running || pending,
              onClick: () => void act({ kind: "move", taskId: task.id, status }, task.id)
            }, `\u79FB\u5230\u300C${statusLabel[status]}\u300D`))
          )
        ) : null
      ),
      h9(
        "footer",
        { className: "dwb-tb-detail-footer" },
        !archived && pending ? h9("span", { className: "dwb-tb-meta" }, "\u63D0\u4EA4\u4E2D\u2026") : null,
        !archived ? h9("button", {
          type: "button",
          className: "dwb-tb-btn dwb-tb-btn-primary",
          disabled: running || pending,
          onClick: () => {
            void act({ kind: "rerun", taskId: task.id }, task.id);
          }
        }, task.executions.length === 0 ? "\u6267\u884C" : "\u91CD\u65B0\u6267\u884C") : null,
        archived ? h9("button", {
          type: "button",
          className: "dwb-tb-btn dwb-tb-btn-primary",
          disabled: pending,
          onClick: () => void act({ kind: "restore", taskId: task.id }, task.id)
        }, "\u6062\u590D") : task.status === "done" || task.status === "failed" ? h9("button", {
          type: "button",
          className: "dwb-tb-btn",
          disabled: pending,
          onClick: () => void act({ kind: "archive", taskId: task.id }, task.id)
        }, "\u5F52\u6863") : null,
        h9("button", {
          type: "button",
          className: "dwb-tb-btn dwb-tb-btn-danger",
          // 与重新执行一致：运行中任务的删除会被 Host 拒绝，前端先禁用。
          disabled: running || pending,
          onClick: () => setConfirmDelete(true)
        }, "\u5220\u9664"),
        h9(
          "span",
          { className: "dwb-tb-meta" },
          `\u521B\u5EFA\u4E8E ${formatTime(task.createdAt, timeZone)}`,
          archived ? ` \xB7 \u5F52\u6863\u4E8E ${formatTime(task.archivedAt, timeZone)}` : ""
        )
      )
    ),
    confirmDelete ? h9(ConfirmDialog, {
      title: "\u5220\u9664\u4EFB\u52A1",
      message: `\u786E\u5B9A\u5220\u9664\u4EFB\u52A1\u300C${task.title}\u300D\u5417\uFF1F\u6267\u884C\u5386\u53F2\u5C06\u4E00\u5E76\u5220\u9664\uFF0C\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,
      confirmLabel: "\u5220\u9664",
      danger: true,
      onCancel: () => setConfirmDelete(false),
      onConfirm: async () => {
        setConfirmDelete(false);
        const result = await act({ kind: "delete", taskId: task.id }, task.id);
        if (result.error === void 0) onDeleted();
      }
    }) : null
  );
}

// src/client/taskboard/panel.js
var h10 = import_react9.default.createElement;
var { useCallback: useCallback2, useEffect: useEffect4, useMemo, useRef: useRef4, useState: useState6 } = import_react9.default;
var POLL_MS = 5e3;
var COLUMNS = [
  { status: "backlog", label: "\u5F85\u89C4\u5212" },
  { status: "todo", label: "\u5F85\u529E" },
  { status: "running", label: "\u8FDB\u884C\u4E2D" },
  { status: "done", label: "\u5DF2\u5B8C\u6210" },
  { status: "failed", label: "\u5DF2\u5931\u8D25" }
];
var STATUS_LABEL = Object.fromEntries(COLUMNS.map((column) => [column.status, column.label]));
function matchesFilter(task, filter) {
  if (filter.trim() === "") return true;
  const needle = filter.trim().toLowerCase();
  return task.title.toLowerCase().includes(needle) || task.description.toLowerCase().includes(needle);
}
function executionLabel(execution) {
  if (execution.result === "succeeded") return "\u6210\u529F";
  if (execution.result === "failed") return "\u5931\u8D25";
  if (execution.result === "cancelled") return "\u5DF2\u53D6\u6D88";
  return "\u8FD0\u884C\u4E2D";
}
function TaskCard(props) {
  const { task, pending, timeZone, onOpen } = props;
  const latest = task.executions[task.executions.length - 1];
  const runs = task.executions.length;
  const archived = task.archivedAt !== void 0;
  return h10(
    "button",
    {
      type: "button",
      className: "dwb-tb-card",
      "data-status": archived ? "archived" : task.status,
      onClick: () => onOpen(task.id),
      title: task.description !== "" ? task.description : task.title
    },
    h10("span", { className: "dwb-tb-card-title" }, task.title),
    task.description !== "" ? h10("span", { className: "dwb-tb-card-excerpt" }, task.description) : null,
    h10(
      "span",
      { className: "dwb-tb-card-meta" },
      h10("span", { className: "dwb-tb-card-time" }, formatTime(task.updatedAt, timeZone)),
      !archived && task.schedule?.enabled === true ? h10("span", {
        className: "dwb-tb-card-schedule",
        // nextRunAt 总是未来时刻：用绝对时间显示（formatTime 对未来时间会误显"刚刚"）。
        title: "\u5B9A\u65F6\u4EFB\u52A1" + (task.schedule.nextRunAt !== void 0 ? ` \xB7 \u4E0B\u6B21 ${formatHostTimestamp(task.schedule.nextRunAt, timeZone)}` : "")
      }, "\u23F0") : null,
      latest !== void 0 ? h10("span", { className: "dwb-tb-card-run", "data-result": archived ? void 0 : latest.result }, `${runs} \u6B21\u6267\u884C`) : null,
      latest?.sessionId !== void 0 ? h10("span", { className: "dwb-tb-card-session", title: latest.sessionId }, "\u2301") : null,
      !archived && (task.status === "running" || pending) ? h10("span", { className: "dwb-tb-spinner", "aria-hidden": true }) : null
    ),
    !archived && pending ? h10("span", { className: "dwb-tb-card-running" }, "\u63D0\u4EA4\u4E2D\u2026") : null,
    !archived && latest !== void 0 && executionLabel(latest) === "\u8FD0\u884C\u4E2D" ? h10("span", { className: "dwb-tb-card-running" }, "\u6267\u884C\u4E2D\u2026") : null
  );
}
function TaskboardPanel(props) {
  const { visible, sessions } = props;
  const [snapshot, setSnapshot] = useState6(void 0);
  const [options, setOptions] = useState6({ workspaces: [], presets: [], permissions: [] });
  const [error, setError] = useState6(void 0);
  const [pendingIds, setPendingIds] = useState6(() => /* @__PURE__ */ new Map());
  const [filter, setFilter] = useState6("");
  const [selectedId, setSelectedId] = useState6(void 0);
  const [showNew, setShowNew] = useState6(false);
  const [archiveView, setArchiveView] = useState6(false);
  const maxRevisionRef = useRef4(0);
  const refreshInFlightRef = useRef4(false);
  const acceptSnapshot = useCallback2((next) => {
    if (next.revision < maxRevisionRef.current) return;
    maxRevisionRef.current = next.revision;
    setSnapshot(next);
    setError(void 0);
  }, []);
  const refresh = useCallback2(async () => {
    if (refreshInFlightRef.current) return;
    refreshInFlightRef.current = true;
    try {
      const state = await fetchState();
      acceptSnapshot(state);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      refreshInFlightRef.current = false;
    }
  }, [acceptSnapshot]);
  useEffect4(() => {
    void refresh();
    fetchOptions().then(setOptions).catch(() => {
    });
  }, [refresh]);
  useEffect4(() => {
    if (visible !== true) return void 0;
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [visible, refresh]);
  const act = useCallback2(async (action, taskId) => {
    if (taskId !== void 0) {
      setPendingIds((prev) => {
        const copy = new Map(prev);
        copy.set(taskId, (copy.get(taskId) ?? 0) + 1);
        return copy;
      });
    }
    try {
      const next = await sendAction(action);
      acceptSnapshot(next);
      return { snapshot: next };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      return { error: message };
    } finally {
      if (taskId !== void 0) {
        setPendingIds((prev) => {
          const copy = new Map(prev);
          const count = (copy.get(taskId) ?? 0) - 1;
          if (count <= 0) copy.delete(taskId);
          else copy.set(taskId, count);
          return copy;
        });
      }
    }
  }, [acceptSnapshot]);
  const openSession = useCallback2((sessionId) => {
    if (sessions === void 0 || typeof sessions.open !== "function") return;
    try {
      sessions.open(sessionId);
    } catch (err) {
      setError(`\u65E0\u6CD5\u6253\u5F00\u4F1A\u8BDD\uFF1A${err instanceof Error ? err.message : String(err)}`);
    }
  }, [sessions]);
  const tasks = snapshot?.tasks ?? [];
  const timeZone = snapshot?.scheduler.timeZone;
  const schedulerError = snapshot?.scheduler.error;
  const boardTasks = useMemo(
    () => tasks.filter((task) => (archiveView ? task.archivedAt !== void 0 : task.archivedAt === void 0) && matchesFilter(task, filter)).sort((a, b2) => b2.updatedAt - a.updatedAt),
    [tasks, archiveView, filter]
  );
  const selected = selectedId !== void 0 ? tasks.find((task) => task.id === selectedId) : void 0;
  const archivedCount = tasks.filter((task) => task.archivedAt !== void 0).length;
  return h10(
    "div",
    { className: "dwb-tb" },
    h10(
      "header",
      { className: "dwb-tb-header" },
      h10("h3", { className: "dwb-tb-title" }, "\u4EFB\u52A1\u770B\u677F"),
      snapshot !== void 0 ? h10("span", { className: "dwb-tb-meta" }, `rev ${snapshot.revision} \xB7 ${timeZone ?? ""}`) : null,
      h10("input", {
        className: "dwb-tb-search",
        type: "search",
        placeholder: "\u641C\u7D22\u4EFB\u52A1\u2026",
        value: filter,
        onChange: (event) => setFilter(event.target.value),
        "aria-label": "\u641C\u7D22\u4EFB\u52A1"
      }),
      h10("button", {
        type: "button",
        className: archiveView ? "dwb-tb-btn dwb-tb-btn-primary" : "dwb-tb-btn",
        onClick: () => setArchiveView((prev) => !prev)
      }, archiveView ? "\u8FD4\u56DE\u770B\u677F" : `\u5F52\u6863 (${archivedCount})`),
      h10("button", {
        type: "button",
        className: "dwb-tb-btn dwb-tb-btn-primary",
        onClick: () => {
          setShowNew(true);
          fetchOptions().then(setOptions).catch(() => {
          });
        }
      }, "+ \u65B0\u5EFA\u4EFB\u52A1")
    ),
    error !== void 0 ? h10(
      "div",
      { className: "dwb-tb-error" },
      // 错误既可能是传输故障，也可能是 Host 业务拒绝，用中性文案。
      `\u64CD\u4F5C\u5931\u8D25\uFF1A${error} `,
      h10("button", { type: "button", className: "dwb-tb-linkbtn", onClick: () => void refresh() }, "\u91CD\u8BD5")
    ) : null,
    schedulerError !== void 0 && schedulerError !== "" ? h10("div", { className: "dwb-tb-error" }, `\u8C03\u5EA6\u5668\u5F02\u5E38\uFF1A${schedulerError}`) : null,
    snapshot === void 0 && error === void 0 ? h10(
      "div",
      { className: "dwb-tb-columns" },
      h10(
        "section",
        { className: "dwb-tb-column" },
        h10("div", { className: "dwb-tb-column-empty" }, "\u6B63\u5728\u52A0\u8F7D\u4EFB\u52A1\u770B\u677F\u2026")
      )
    ) : h10(
      "div",
      { className: "dwb-tb-columns" },
      archiveView ? h10(
        "section",
        { className: "dwb-tb-column", "data-status": "archived" },
        h10(
          "header",
          { className: "dwb-tb-column-header" },
          h10("h4", { className: "dwb-tb-column-title" }, "\u5F52\u6863"),
          h10("span", { className: "dwb-tb-column-count" }, String(boardTasks.length))
        ),
        h10(
          "div",
          { className: "dwb-tb-cards" },
          boardTasks.map((task) => h10(TaskCard, {
            key: task.id,
            task,
            pending: pendingIds.has(task.id),
            timeZone,
            onOpen: setSelectedId
          })),
          boardTasks.length === 0 ? h10("div", { className: "dwb-tb-column-empty" }, "\u6CA1\u6709\u5F52\u6863\u4EFB\u52A1") : null
        )
      ) : COLUMNS.map((column) => {
        const columnTasks = boardTasks.filter((task) => task.status === column.status);
        return h10(
          "section",
          { key: column.status, className: "dwb-tb-column", "data-status": column.status },
          h10(
            "header",
            { className: "dwb-tb-column-header" },
            h10("span", { className: "dwb-tb-statusdot", "data-status": column.status, "aria-hidden": true }),
            h10("h4", { className: "dwb-tb-column-title" }, column.label),
            h10("span", { className: "dwb-tb-column-count" }, String(columnTasks.length))
          ),
          h10(
            "div",
            { className: "dwb-tb-cards" },
            columnTasks.map((task) => h10(TaskCard, {
              key: task.id,
              task,
              pending: pendingIds.has(task.id),
              timeZone,
              onOpen: setSelectedId
            })),
            columnTasks.length === 0 ? h10("div", { className: "dwb-tb-column-empty" }, "\u7A7A") : null
          )
        );
      })
    ),
    selected !== void 0 ? h10(TaskDetail, {
      task: selected,
      pending: pendingIds.has(selected.id),
      error,
      options,
      timeZone,
      sessions,
      statusLabel: STATUS_LABEL,
      onClose: () => setSelectedId(void 0),
      act,
      onRetry: () => void refresh(),
      openSession,
      onDeleted: () => setSelectedId(void 0)
    }) : null,
    showNew ? h10(NewTaskModal, {
      options,
      timeZone,
      onClose: () => setShowNew(false),
      act
    }) : null
  );
}

// src/client/feature-grid.js
var import_react11 = __toESM(require("react"), 1);

// src/client/features.js
var import_react10 = __toESM(require("react"), 1);
var h11 = import_react10.default.createElement;
var FEATURES = [
  {
    id: "git",
    label: "Git",
    description: "\u7248\u672C\u63A7\u5236",
    icon: branchIcon,
    component: GitPanel,
    singleInstance: true,
    closable: false
  },
  {
    id: "browser",
    label: "\u6D4F\u89C8\u5668",
    description: "\u6C99\u7BB1\u6D4F\u89C8\u5668",
    icon: browserIcon,
    component: BrowserView,
    singleInstance: false,
    closable: true
  },
  {
    id: "terminal",
    label: "\u7EC8\u7AEF",
    description: "\u4EA4\u4E92\u5F0F\u7EC8\u7AEF\uFF08\u53EF\u591A\u5F00\uFF09",
    icon: terminalIcon,
    component: TerminalPanel,
    singleInstance: false,
    closable: true
  },
  {
    id: "taskboard",
    label: "\u4EFB\u52A1\u770B\u677F",
    description: "\u591A\u5217\u4EFB\u52A1\u770B\u677F + \u771F\u5B9E DSH \u4F1A\u8BDD\u6267\u884C + Host \u5B9A\u65F6",
    icon: kanbanIcon,
    component: TaskboardPanel,
    singleInstance: true,
    closable: false
  }
];
var FEATURE_MAP = new Map(FEATURES.map((f) => [f.id, f]));
function getFeature(id) {
  return FEATURE_MAP.get(id);
}

// src/client/feature-grid.js
var h12 = import_react11.default.createElement;
function FeatureGrid(props) {
  const { onSelect } = props;
  return h12(
    "div",
    { className: "dwb-feature-grid" },
    h12(
      "div",
      { className: "dwb-feature-grid-inner" },
      FEATURES.map((feature) => {
        const disabled = feature.disabled === true;
        return h12(
          "button",
          {
            key: feature.id,
            type: "button",
            className: "dwb-feature-card" + (disabled ? " dwb-feature-disabled" : ""),
            disabled,
            title: feature.description,
            onClick: () => {
              if (!disabled && onSelect !== void 0) onSelect(feature.id);
            }
          },
          h12("span", { className: "dwb-feature-card-icon" }, feature.icon()),
          h12("span", { className: "dwb-feature-card-label" }, feature.label)
        );
      })
    )
  );
}

// src/client/panel.js
var h13 = import_react12.default.createElement;
var { useState: useState7, useEffect: useEffect5, useCallback: useCallback3, useRef: useRef5 } = import_react12.default;
var INITIAL_TABS = [];
var tabIdCounter = 0;
var TERMINAL_LABELS_KEY = "dsh-work.terminal-labels";
function readTerminalLabels() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(TERMINAL_LABELS_KEY) ?? "{}");
    return parsed !== null && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}
function writeTerminalLabels(labels) {
  try {
    window.localStorage.setItem(TERMINAL_LABELS_KEY, JSON.stringify(labels));
  } catch {
  }
}
function killTerminalSession(sessionId) {
  try {
    void fetch("/workbench/terminal/kill", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: sessionId })
    }).catch(() => {
    });
  } catch {
  }
}
function nextTerminalLabel(list) {
  const n = list.filter((t) => t.featureId === "terminal").length;
  return n === 0 ? "\u7EC8\u7AEF" : `\u7EC8\u7AEF ${n + 1}`;
}
function WorkbenchPanel(props) {
  const useSessions = props.useSessions;
  const cwd = typeof useSessions === "function" ? useSessions((list) => {
    if (list.current === void 0) return void 0;
    const row = list.byId[list.current];
    return row === void 0 ? void 0 : row.cwd;
  }) : void 0;
  const [open, setOpen] = useState7(false);
  const [refreshing, setRefreshing] = useState7(false);
  const [pathOverride, setPathOverride] = useState7(void 0);
  const [git, setGit] = useState7({ status: "idle" });
  const [initializing, setInitializing] = useState7(false);
  const [mutating, setMutating] = useState7(false);
  const [actionError, setActionError] = useState7(void 0);
  const [commitMessage, setCommitMessage] = useState7("");
  const [showIgnored, setShowIgnored] = useState7(false);
  const [tabs, setTabs] = useState7(INITIAL_TABS);
  const [activeTabId, setActiveTabId] = useState7(null);
  const [width, setWidth] = useState7(() => Math.max(PANEL_MIN, readStored(WIDTH_KEY, PANEL_DEFAULT)));
  const [maxWidth, setMaxWidth] = useState7(() => window.innerWidth - PANEL_MIN);
  const [resizing, setResizing] = useState7(false);
  const rootRef = useRef5(null);
  const resizeOrigin = useRef5({ x: 0, width });
  const path = pathOverride !== void 0 ? pathOverride : cwd;
  useEffect5(() => {
    setPathOverride(void 0);
  }, [cwd]);
  useEffect5(() => {
    setCommitMessage("");
  }, [path]);
  const widenForTaskboard = () => {
    const desired = Math.round(Math.min(Math.max(window.innerWidth * 0.6, AUTO_WIDEN), window.innerWidth * 0.85));
    const target = clampPanelWidth(desired, maxWidthRef.current, PANEL_MIN);
    if (target > widthRef.current + 2) animateWidthTo(target, { floor: PANEL_MIN, persist: true });
  };
  const openFeature = useCallback3((featureId, opts) => {
    const feat = getFeature(featureId);
    if (!feat || feat.disabled) return;
    if (featureId === "taskboard") widenForTaskboard();
    if (feat.singleInstance) {
      const existing = tabs.find((t) => t.featureId === featureId);
      if (existing) {
        setActiveTabId(existing.id);
        return;
      }
    }
    tabIdCounter += 1;
    const id = `${featureId}-${tabIdCounter}-${Date.now()}`;
    const label = featureId === "terminal" ? nextTerminalLabel(tabs) : feat.label;
    const tab = { id, featureId, label, closable: feat.closable === true && !feat.singleInstance };
    if (featureId === "terminal" && opts !== void 0 && typeof opts.sessionId === "string") {
      tab.sessionId = opts.sessionId;
    }
    setTabs((prev) => [...prev, tab]);
    setActiveTabId(id);
  }, [tabs]);
  const closeTab = useCallback3((tabId) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (!tab?.closable) return;
    if (tab.featureId === "terminal" && typeof tab.sessionId === "string") {
      killTerminalSession(tab.sessionId);
    }
    const next = tabs.filter((t) => t.id !== tabId);
    setTabs(next);
    setActiveTabId((current) => {
      if (current !== tabId) return current;
      return next.length > 0 ? next[next.length - 1].id : null;
    });
  }, [tabs]);
  const updateTabLabel = useCallback3((tabId, label) => {
    setTabs((prev) => prev.map((t) => t.id === tabId ? { ...t, label } : t));
  }, []);
  const bindTabSession = useCallback3((tabId, sessionId) => {
    setTabs((prev) => prev.map((t) => t.id === tabId && t.sessionId !== sessionId ? { ...t, sessionId } : t));
  }, []);
  const terminalRestoredRef = useRef5(false);
  useEffect5(() => {
    if (terminalRestoredRef.current) return;
    terminalRestoredRef.current = true;
    const controller = new AbortController();
    void (async () => {
      try {
        const response = await fetch("/workbench/terminal/list", { signal: controller.signal });
        const body = await response.json();
        if (body.ok !== true || !Array.isArray(body.sessions)) return;
        const running = body.sessions.filter((s15) => s15.running === true);
        if (running.length === 0) return;
        const labels = readTerminalLabels();
        setTabs((prev) => {
          let next = prev;
          for (const session of running) {
            if (next.some((t) => t.featureId === "terminal" && t.sessionId === session.id)) continue;
            tabIdCounter += 1;
            next = [...next, {
              id: `terminal-${tabIdCounter}-${session.id}`,
              featureId: "terminal",
              label: typeof labels[session.id] === "string" && labels[session.id] !== "" ? labels[session.id] : nextTerminalLabel(next),
              closable: true,
              sessionId: session.id
            }];
          }
          return next;
        });
      } catch {
      }
    })();
    return () => controller.abort();
  }, []);
  useEffect5(() => {
    const labels = {};
    for (const t of tabs) {
      if (t.featureId === "terminal" && typeof t.sessionId === "string") labels[t.sessionId] = t.label;
    }
    writeTerminalLabels(labels);
  }, [tabs]);
  const writeTimerRef = useRef5(null);
  const debouncedWrite = (key, value) => {
    if (writeTimerRef.current !== null) clearTimeout(writeTimerRef.current);
    writeTimerRef.current = setTimeout(() => {
      writeTimerRef.current = null;
      writeStored(key, value);
    }, 150);
  };
  const widthRef = useRef5(width);
  widthRef.current = width;
  const tweenRef = useRef5(null);
  const tweeningRef = useRef5(false);
  const stopTween = () => {
    if (tweenRef.current !== null) {
      cancelAnimationFrame(tweenRef.current);
      tweenRef.current = null;
    }
    tweeningRef.current = false;
  };
  const animateWidthTo = (target, options = {}) => {
    const { floor = PANEL_MIN, duration = 300, persist = false, onEnd } = options;
    stopTween();
    tweeningRef.current = true;
    if (window.matchMedia !== void 0 && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWidth(clampPanelWidth(target, maxWidthRef.current, floor));
      tweeningRef.current = false;
      if (persist) writeStored(WIDTH_KEY, target);
      if (onEnd !== void 0) onEnd();
      return;
    }
    const from = widthRef.current;
    if (from === target) {
      tweeningRef.current = false;
      if (persist) writeStored(WIDTH_KEY, target);
      if (onEnd !== void 0) onEnd();
      return;
    }
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = cubicBezierEase(t);
      const next = clampPanelWidth(from + (target - from) * eased, maxWidthRef.current, floor);
      if (next !== widthRef.current) setWidth(next);
      if (t < 1) {
        tweenRef.current = requestAnimationFrame(step);
      } else {
        tweenRef.current = null;
        tweeningRef.current = false;
        if (persist) writeStored(WIDTH_KEY, target);
        if (onEnd !== void 0) onEnd();
      }
    };
    tweenRef.current = requestAnimationFrame(step);
  };
  const hidePanel = () => {
    animateWidthTo(0, {
      floor: 0,
      persist: false,
      onEnd: () => {
        setWidth(PANEL_MIN);
        writeStored(WIDTH_KEY, PANEL_MIN);
        setOpen(false);
      }
    });
  };
  const collapseOrHide = () => {
    if (panelActionFor(widthRef.current) === "shrink") {
      animateWidthTo(PANEL_MIN, { floor: PANEL_MIN, persist: true });
    } else {
      hidePanel();
    }
  };
  const openPanel = () => {
    tweeningRef.current = true;
    const target = clampPanelWidth(readStored(WIDTH_KEY, PANEL_DEFAULT), maxWidthRef.current);
    setOpen(true);
    setWidth(0);
    requestAnimationFrame(() => {
      animateWidthTo(target, { floor: 0, persist: false });
    });
  };
  useEffect5(() => {
    if (!tweeningRef.current) debouncedWrite(WIDTH_KEY, width);
  }, [width]);
  useEffect5(() => () => {
    if (writeTimerRef.current !== null) clearTimeout(writeTimerRef.current);
    stopTween();
    writeStored(WIDTH_KEY, widthRef.current);
  }, []);
  useEffect5(() => {
    const measure = () => {
      const el3 = rootRef.current;
      if (el3 === null) return;
      const layer2 = el3.offsetParent;
      const frame2 = layer2 !== null ? layer2.parentElement : null;
      const sidebar2 = frame2 !== null && frame2.firstElementChild !== null ? frame2.firstElementChild : null;
      const sidebarWidth = sidebar2 !== null ? sidebar2.getBoundingClientRect().width : 0;
      const frameWidth = frame2 !== null ? frame2.getBoundingClientRect().width : window.innerWidth;
      setMaxWidth(Math.max(PANEL_MIN, Math.round(frameWidth - sidebarWidth)));
    };
    measure();
    window.addEventListener("resize", measure);
    let observer = null;
    const el2 = rootRef.current;
    const layer = el2 !== null ? el2.offsetParent : null;
    const frame = layer !== null ? layer.parentElement : null;
    const sidebar = frame !== null && frame.firstElementChild !== null ? frame.firstElementChild : null;
    if (sidebar !== null) {
      observer = new ResizeObserver(measure);
      observer.observe(sidebar);
    }
    return () => {
      window.removeEventListener("resize", measure);
      if (observer !== null) observer.disconnect();
    };
  }, [open]);
  const maxWidthRef = useRef5(maxWidth);
  useEffect5(() => {
    const previous = maxWidthRef.current;
    maxWidthRef.current = maxWidth;
    if (maxWidth === previous) return;
    if (tweeningRef.current) return;
    setWidth((current) => {
      if (current >= previous - 2) return clampPanelWidth(maxWidth, maxWidth);
      return clampPanelWidth(current, maxWidth);
    });
  }, [maxWidth]);
  const [pathText, setPathText] = useState7(path || "");
  useEffect5(() => {
    setPathText(path || "");
  }, [path]);
  const applyPath = () => {
    const trimmed = pathText.trim();
    setPathOverride(trimmed.length > 0 && trimmed !== cwd ? trimmed : void 0);
  };
  const resizeDragMoved = useRef5(false);
  const onResizePointerDown = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const tweening = tweenRef.current !== null;
    stopTween();
    const base = tweening ? clampPanelWidth(widthRef.current, maxWidthRef.current) : width;
    if (tweening && base !== widthRef.current) setWidth(base);
    resizeOrigin.current = { x: event.clientX, width: base };
    resizeDragMoved.current = false;
    setResizing(true);
  };
  const onResizePointerMove = (event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const dx = event.clientX - resizeOrigin.current.x;
    if (Math.abs(dx) > 4) resizeDragMoved.current = true;
    setWidth(clampPanelWidth(resizeOrigin.current.width - dx, maxWidth));
  };
  const onResizePointerUp = (event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setResizing(false);
    if (resizeDragMoved.current) {
      resizeDragMoved.current = false;
      return;
    }
    collapseOrHide();
  };
  const onResizeDoubleClick = () => {
    stopTween();
    animateWidthTo(clampPanelWidth(PANEL_DEFAULT, maxWidthRef.current), { floor: PANEL_MIN, persist: true });
  };
  const applyGitFacts = (body) => {
    if (body.ok !== true) {
      setGit({ status: "error", error: body.error || "git \u67E5\u8BE2\u5931\u8D25" });
      return;
    }
    if (body.repo === false) {
      setGit(body.error === void 0 ? { status: "not-repo" } : { status: "not-repo", error: body.error });
      return;
    }
    const freshIgnored = body.ignored || [];
    setGit((prev) => ({
      status: "ready",
      branch: body.branch || "",
      head: body.head || "",
      graph: body.graph || [],
      changes: body.changes || [],
      ignored: freshIgnored.length > 0 || prev.status !== "ready" ? freshIgnored : prev.ignored || []
    }));
  };
  const loadGitState = useCallback3(async (target, signal, withIgnored) => {
    setGit({ status: "loading" });
    try {
      const options = signal === void 0 ? {} : { signal };
      const ignoredParam = withIgnored === true ? "&ignored=1" : "";
      const response = await fetch("/workbench/git?cwd=" + encodeURIComponent(target) + ignoredParam, options);
      if (!response.ok) {
        setGit({ status: "error", error: "git \u67E5\u8BE2\u5931\u8D25\uFF08HTTP " + response.status + "\uFF09" });
        return;
      }
      const body = await response.json();
      applyGitFacts(body);
    } catch (error) {
      if (signal !== void 0 && error instanceof DOMException && error.name === "AbortError") return;
      setGit({ status: "error", error: messageOf(error) });
    }
  }, []);
  useEffect5(() => {
    if (path === void 0) {
      setGit({ status: "idle" });
      return;
    }
    const controller = new AbortController();
    void loadGitState(path, controller.signal, showIgnored);
    return () => controller.abort();
  }, [path, loadGitState, showIgnored]);
  const initRepo = async () => {
    if (path === void 0 || initializing) return;
    setInitializing(true);
    try {
      const response = await fetch("/workbench/git/init?cwd=" + encodeURIComponent(path), {
        method: "POST",
        headers: { "content-type": "application/json" }
      });
      const body = await response.json();
      if (body.ok !== true) {
        setGit({ status: "error", error: body.error || "\u4ED3\u5E93\u521B\u5EFA\u5931\u8D25" });
        return;
      }
      await loadGitState(path);
    } catch (error) {
      setGit({ status: "error", error: messageOf(error) });
    } finally {
      setInitializing(false);
    }
  };
  const mutateGit = async (action, payload) => {
    if (path === void 0 || mutating) return false;
    setMutating(true);
    setActionError(void 0);
    try {
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        ...payload === void 0 ? {} : { body: JSON.stringify(payload) }
      };
      const response = await fetch("/workbench/git/" + action + "?cwd=" + encodeURIComponent(path), options);
      const body = await response.json();
      if (body.ok !== true) {
        setActionError(body.error || "git \u64CD\u4F5C\u5931\u8D25");
        return false;
      }
      applyGitFacts(body);
      return true;
    } catch (error) {
      setActionError(messageOf(error));
      return false;
    } finally {
      setMutating(false);
    }
  };
  const refresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    Promise.resolve(path !== void 0 ? loadGitState(path, void 0, showIgnored) : void 0).finally(() => setRefreshing(false));
  };
  if (!open) {
    return h13(TipButton, { tip: "\u5C55\u5F00\u5DE5\u4F5C\u9762\u677F", className: "dwb-openbtn", onClick: openPanel }, "\u5DE5\u4F5C\u9762\u677F");
  }
  const renderTabContent = (tab, isActive) => {
    const feat = getFeature(tab.featureId);
    if (!feat) return null;
    const visible = isActive;
    if (feat.id === "git") {
      return h13(GitPanel, {
        visible,
        refreshing,
        state: git,
        mutating,
        actionError,
        onInit: initRepo,
        initializing,
        onStage: (p) => void mutateGit("stage", { path: p }),
        onUnstage: (p) => void mutateGit("unstage", { path: p }),
        onStageAll: () => void mutateGit("stage-all"),
        onCommit: () => {
          const message = commitMessage.trim();
          if (message === "") return;
          void mutateGit("commit", { message }).then((ok) => {
            if (ok) setCommitMessage("");
          });
        },
        onIgnore: (p) => void mutateGit("ignore", { path: p }),
        onUnignore: (p) => void mutateGit("unignore", { path: p }),
        showIgnored,
        onToggleIgnored: () => setShowIgnored((prev) => !prev),
        commitMessage,
        setCommitMessage
      });
    }
    if (feat.id === "browser") {
      return h13(BrowserView, {
        visible,
        onTitleChange: (label) => updateTabLabel(tab.id, label)
      });
    }
    if (feat.id === "terminal") {
      return h13(TerminalPanel, {
        visible,
        sessionId: tab.sessionId,
        path,
        onSessionReady: (sessionId) => bindTabSession(tab.id, sessionId)
      });
    }
    if (feat.id === "taskboard") {
      return h13(TaskboardPanel, { visible, sessions: props.sessions });
    }
    return h13(feat.component, { visible });
  };
  return h13(
    import_react12.default.Fragment,
    null,
    h13(
      "div",
      {
        className: "dwb-resize",
        "data-dragging": resizing || void 0,
        title: "\u62D6\u52A8\u8C03\u6574\u5BBD\u5EA6\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09",
        style: { right: width - 4 + "px" },
        onPointerDown: onResizePointerDown,
        onPointerMove: onResizePointerMove,
        onPointerUp: onResizePointerUp,
        onDoubleClick: onResizeDoubleClick
      },
      h13(
        "div",
        {
          className: "dwb-resize-grip",
          title: width > PANEL_MIN ? "\u5355\u51FB\u7F29\u81F3\u6700\u7A84\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09" : "\u5355\u51FB\u6536\u8D77\u9762\u677F\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09"
        },
        h13("span", { className: "dwb-resize-arrow" }, h13(IconFrame, { size: 13 }, h13("path", { d: "M9 6l6 6-6 6" })))
      )
    ),
    h13(
      "div",
      {
        ref: rootRef,
        className: "dwb-root" + (resizing ? " dwb-dragging" : ""),
        style: { width: width + "px" }
      },
      h13(
        "div",
        { className: "dwb-header" },
        h13("span", { className: "dwb-title" }, "\u5DE5\u4F5C\u9762\u677F"),
        h13("input", {
          className: "dwb-pathinput",
          value: pathText,
          placeholder: "\u5DE5\u4F5C\u76EE\u5F55\u8DEF\u5F84",
          title: path || "",
          spellCheck: false,
          onChange: (event) => setPathText(event.target.value),
          onBlur: applyPath,
          onKeyDown: (event) => {
            if (event.key === "Enter") {
              applyPath();
              event.currentTarget.blur();
            }
          }
        }),
        h13(
          TipButton,
          { tip: "\u5237\u65B0", className: "dwb-iconbtn", onClick: refresh, disabled: refreshing },
          h13("span", { className: refreshing ? "dwb-spin" : void 0 }, refreshIcon())
        ),
        h13(TipButton, { tip: "\u6536\u8D77\uFF08\u518D\u6B21\u70B9\u51FB\u5173\u95ED\uFF09", className: "dwb-iconbtn", onClick: collapseOrHide }, closeIcon())
      ),
      // 标签栏：水平排列标签 + "+" 按钮。
      h13(
        "div",
        { className: "dwb-tabbar" },
        h13(
          "div",
          { className: "dwb-tabbar-tabs" },
          tabs.map((tab) => {
            const feat = getFeature(tab.featureId);
            const isActive = tab.id === activeTabId;
            return h13(
              "div",
              {
                key: tab.id,
                className: "dwb-tab" + (isActive ? " dwb-tab-active" : ""),
                onClick: () => setActiveTabId(tab.id),
                title: feat ? feat.label : tab.label
              },
              feat ? h13("span", { className: "dwb-tab-icon" }, feat.icon()) : null,
              h13("span", { className: "dwb-tab-label" }, tab.label),
              tab.closable ? h13("button", {
                type: "button",
                className: "dwb-tab-close",
                title: "\u5173\u95ED",
                onClick: (event) => {
                  event.stopPropagation();
                  closeTab(tab.id);
                }
              }, "\xD7") : null
            );
          })
        ),
        h13("button", {
          type: "button",
          className: "dwb-tabbar-plus",
          title: "\u6253\u5F00\u529F\u80FD",
          onClick: () => setActiveTabId(null)
        }, "+")
      ),
      // 内容区：所有标签【常驻挂载】，非激活的用 display:none 隐藏。
      // 参照 DSH-better-sidebar——切换标签不销毁组件，浏览器的 URL/历史、
      // 文件选中、git 状态全部保留；真正的卸载只发生在标签被【关闭】时。
      // 每个标签包一层带 key 的 .dwb-pane（= 组件实例的稳定身份）。
      // activeTabId === null 时额外叠一个功能网格首页（此时所有 pane 均隐藏）。
      h13(
        "div",
        { className: "dwb-content" },
        tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return h13("div", {
            key: tab.id,
            className: "dwb-pane" + (isActive ? "" : " dwb-pane-hidden")
          }, renderTabContent(tab, isActive));
        }),
        activeTabId === null ? h13(FeatureGrid, { onSelect: openFeature }) : null
      )
    )
  );
}
var DOCK_CENTER_FLOOR = 480;
function installDockCoupling() {
  let disposed = false;
  let panelObserver = null;
  let frameObserver = null;
  let panelResize = null;
  let panelRoot = null;
  let centerCol = null;
  let frameEl = null;
  let retryTimer = null;
  const sync = () => {
    if (disposed || centerCol === null || frameEl === null || !frameEl.isConnected) return;
    if (panelRoot === null || !panelRoot.isConnected) {
      centerCol.style.marginRight = "";
      return;
    }
    try {
      const panelW = panelRoot.getBoundingClientRect().width;
      const sidebar = frameEl.children.length > 0 ? frameEl.children[0] : null;
      const sidebarW = sidebar !== null ? sidebar.getBoundingClientRect().width : 0;
      const frameW = frameEl.getBoundingClientRect().width;
      const detailsOpen = !frameEl.hasAttribute("data-details-collapsed");
      let effective = 0;
      if (!detailsOpen) {
        const cap = Math.max(0, frameW - sidebarW - DOCK_CENTER_FLOOR);
        effective = Math.min(panelW, cap);
      }
      centerCol.style.marginRight = Math.round(effective) + "px";
    } catch {
    }
  };
  const findPanelRoot = (overlayLayer) => {
    const root = overlayLayer.querySelector(".dwb-root");
    return root !== null && root.isConnected ? root : null;
  };
  const attach = (overlayLayer) => {
    frameEl = overlayLayer.parentElement;
    if (frameEl === null) return;
    const overlayIndex = Array.prototype.indexOf.call(frameEl.children, overlayLayer);
    if (overlayIndex < 2) return;
    centerCol = frameEl.children[overlayIndex - 2];
    if (centerCol === void 0) return;
    frameObserver = new MutationObserver(sync);
    frameObserver.observe(frameEl, { attributes: true, attributeFilter: ["data-details-collapsed"] });
    panelResize = new ResizeObserver(sync);
    panelObserver = new MutationObserver(() => {
      const root = findPanelRoot(overlayLayer);
      if (root !== panelRoot) {
        if (panelRoot !== null) panelResize.unobserve(panelRoot);
        panelRoot = root;
        if (root !== null) panelResize.observe(root);
      }
      sync();
    });
    panelObserver.observe(overlayLayer, { childList: true, subtree: true });
    panelRoot = findPanelRoot(overlayLayer);
    if (panelRoot !== null) panelResize.observe(panelRoot);
    sync();
  };
  const boot = () => {
    const layer = document.querySelector("[data-shell-overlay]");
    if (layer !== null) {
      attach(layer);
      return;
    }
    let tries = 0;
    retryTimer = setInterval(() => {
      if (disposed) {
        clearInterval(retryTimer);
        return;
      }
      tries += 1;
      const found = document.querySelector("[data-shell-overlay]");
      if (found !== null) {
        clearInterval(retryTimer);
        retryTimer = null;
        attach(found);
      } else if (tries >= 20) {
        clearInterval(retryTimer);
        retryTimer = null;
      }
    }, 250);
  };
  boot();
  return () => {
    disposed = true;
    if (retryTimer !== null) clearInterval(retryTimer);
    if (panelObserver !== null) panelObserver.disconnect();
    if (frameObserver !== null) frameObserver.disconnect();
    if (panelResize !== null) panelResize.disconnect();
    if (centerCol !== null) centerCol.style.marginRight = "";
  };
}

// src/client/highlight.js
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
var HL_LANG_BY_EXT = {
  ts: "javascript",
  tsx: "javascript",
  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  mts: "javascript",
  cts: "javascript",
  json: "json",
  jsonc: "json",
  yml: "yaml",
  yaml: "yaml",
  toml: "toml",
  ini: "ini",
  conf: "ini",
  env: "ini",
  gitignore: "ini",
  py: "python",
  rb: "ruby",
  go: "go",
  rs: "rust",
  java: "java",
  c: "cpp",
  h: "cpp",
  cpp: "cpp",
  hpp: "cpp",
  cs: "csharp",
  php: "php",
  sh: "shell",
  bash: "shell",
  zsh: "shell",
  fish: "shell",
  sql: "sql",
  css: "css",
  scss: "css",
  less: "css",
  html: "markup",
  htm: "markup",
  xml: "markup",
  md: "markdown",
  mdx: "markdown"
};
var HL_KEYWORDS = {
  javascript: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "do", "switch", "case", "default", "break", "continue", "new", "class", "extends", "super", "this", "typeof", "instanceof", "in", "of", "import", "export", "from", "async", "await", "try", "catch", "finally", "throw", "yield", "delete", "void", "null", "undefined", "true", "false", "interface", "type", "enum", "implements", "public", "private", "protected", "readonly", "static", "abstract", "as", "keyof", "namespace", "declare", "get", "set", "require"],
  json: ["true", "false", "null"],
  python: ["def", "class", "return", "if", "elif", "else", "for", "while", "try", "except", "finally", "with", "as", "import", "from", "lambda", "yield", "pass", "break", "continue", "raise", "global", "nonlocal", "del", "assert", "async", "await", "True", "False", "None", "not", "and", "or", "in", "is", "self", "print"],
  ruby: ["def", "class", "module", "return", "if", "elsif", "else", "unless", "case", "when", "while", "until", "for", "do", "end", "begin", "rescue", "ensure", "raise", "yield", "require", "include", "extend", "attr_accessor", "attr_reader", "attr_writer", "true", "false", "nil", "and", "or", "not", "new", "puts"],
  go: ["func", "package", "import", "return", "if", "else", "for", "range", "switch", "case", "default", "break", "continue", "goto", "defer", "go", "chan", "select", "struct", "interface", "map", "type", "var", "const", "true", "false", "nil", "fallthrough"],
  rust: ["fn", "let", "mut", "const", "static", "struct", "enum", "trait", "impl", "mod", "use", "pub", "crate", "self", "Self", "return", "if", "else", "match", "for", "while", "loop", "break", "continue", "move", "ref", "as", "where", "dyn", "async", "await", "true", "false", "unsafe", "type"],
  java: ["public", "private", "protected", "class", "interface", "enum", "extends", "implements", "import", "package", "return", "if", "else", "for", "while", "do", "switch", "case", "default", "break", "continue", "new", "try", "catch", "finally", "throw", "throws", "static", "final", "void", "this", "super", "abstract", "synchronized", "volatile", "transient", "instanceof", "true", "false", "null", "record", "var"],
  cpp: ["public", "private", "protected", "class", "struct", "union", "enum", "namespace", "using", "template", "typename", "return", "if", "else", "for", "while", "do", "switch", "case", "default", "break", "continue", "new", "delete", "try", "catch", "throw", "static", "const", "constexpr", "inline", "virtual", "override", "final", "this", "true", "false", "nullptr", "sizeof", "typedef", "extern", "register", "volatile", "mutable", "friend", "operator", "goto"],
  csharp: ["public", "private", "protected", "internal", "class", "struct", "interface", "enum", "namespace", "using", "return", "if", "else", "for", "foreach", "while", "do", "switch", "case", "default", "break", "continue", "new", "try", "catch", "finally", "throw", "static", "const", "readonly", "virtual", "override", "sealed", "abstract", "async", "await", "var", "true", "false", "null", "this", "base", "out", "ref", "in", "is", "as", "typeof", "delegate", "event", "get", "set", "value", "record"],
  php: ["function", "class", "interface", "trait", "namespace", "use", "return", "if", "else", "elseif", "for", "foreach", "while", "do", "switch", "case", "default", "break", "continue", "new", "try", "catch", "finally", "throw", "static", "public", "private", "protected", "const", "echo", "print", "true", "false", "null", "isset", "empty", "array", "require", "include", "require_once", "include_once", "abstract", "final", "extends", "implements", "instanceof", "and", "or", "xor", "list", "global"],
  swift: ["func", "class", "struct", "enum", "protocol", "extension", "import", "return", "if", "else", "guard", "for", "while", "repeat", "switch", "case", "default", "break", "continue", "fallthrough", "new", "try", "catch", "throw", "throws", "static", "let", "var", "inout", "where", "deinit", "init", "self", "true", "false", "nil", "as", "is", "typealias", "open", "public", "internal", "fileprivate", "private", "lazy", "mutating", "nonmutating", "override", "required", "convenience", "associatedtype"],
  kotlin: ["fun", "class", "object", "interface", "enum", "data", "sealed", "abstract", "open", "override", "final", "val", "var", "const", "return", "if", "else", "when", "for", "while", "do", "try", "catch", "finally", "throw", "import", "package", "this", "super", "true", "false", "null", "is", "in", "as", "by", "companion", "init", "constructor", "internal", "public", "private", "protected", "inline", "suspend", "infix", "operator", "lateinit", "typealias", "get", "set"],
  shell: ["if", "then", "else", "elif", "fi", "for", "while", "do", "done", "case", "esac", "function", "in", "return", "exit", "export", "local", "readonly", "set", "unset", "shift", "select", "until", "break", "continue", "source", "echo", "printf", "cd", "ls", "mkdir", "rm", "cp", "mv", "cat", "grep", "sed", "awk", "curl", "wget", "git", "npm", "pnpm", "node", "true", "false"],
  sql: ["select", "from", "where", "insert", "into", "values", "update", "set", "delete", "create", "table", "alter", "drop", "index", "view", "join", "inner", "left", "right", "full", "outer", "on", "group", "by", "order", "having", "limit", "offset", "distinct", "as", "and", "or", "not", "null", "is", "in", "between", "like", "exists", "union", "all", "primary", "key", "foreign", "references", "constraint", "default", "unique", "check", "case", "when", "then", "else", "end", "count", "sum", "avg", "min", "max", "begin", "commit", "rollback", "transaction"],
  toml: ["true", "false"]
};
var HL_TYPES = {
  javascript: ["Number", "String", "Boolean", "Object", "Array", "Promise", "Map", "Set", "WeakMap", "WeakSet", "Error", "Date", "RegExp", "JSON", "Math", "Function", "Symbol", "BigInt", "console", "window", "document", "globalThis", "process", "Buffer", "HTMLElement"],
  go: ["int", "int8", "int16", "int32", "int64", "uint", "uint8", "uint16", "uint32", "uint64", "uintptr", "float32", "float64", "complex64", "complex128", "byte", "rune", "string", "bool", "error", "any", "chan", "func", "map", "slice"],
  rust: ["i8", "i16", "i32", "i64", "i128", "isize", "u8", "u16", "u32", "u64", "u128", "usize", "f32", "f64", "bool", "char", "str", "String", "Vec", "Option", "Result", "Box", "Rc", "Arc", "HashMap", "HashSet", "BTreeMap", "BTreeSet", "Iterator", "Sized"],
  java: ["String", "Integer", "Long", "Double", "Float", "Boolean", "Object", "Class", "List", "Map", "Set", "ArrayList", "HashMap", "HashSet", "Collection", "Optional", "Exception", "RuntimeException", "Error", "Thread", "Runnable", "System", "Math", "int", "long", "double", "float", "boolean", "char", "byte", "short", "void"],
  cpp: ["int", "long", "short", "char", "bool", "float", "double", "void", "size_t", "std", "string", "vector", "map", "set", "unordered_map", "unique_ptr", "shared_ptr", "auto", "uint8_t", "int32_t", "int64_t", "uint32_t", "uint64_t", "FILE", "cout", "cin", "endl"],
  csharp: ["string", "int", "long", "double", "float", "bool", "char", "byte", "short", "uint", "ulong", "decimal", "object", "void", "var", "dynamic", "List", "Dictionary", "HashSet", "IEnumerable", "Task", "Action", "Func", "Exception", "Console", "Math", "String", "DateTime", "Guid", "Nullable"],
  python: ["int", "float", "str", "bytes", "bool", "list", "tuple", "dict", "set", "frozenset", "None", "object", "type", "Exception", "ValueError", "TypeError", "KeyError", "IndexError", "RuntimeError", "FileNotFoundError", "self", "cls"],
  ruby: ["String", "Integer", "Float", "Symbol", "Array", "Hash", "Range", "Proc", "Lambda", "Module", "Class", "Object", "Exception", "StandardError", "nil", "true", "false"],
  swift: ["Int", "Double", "Float", "Bool", "String", "Character", "Array", "Dictionary", "Set", "Optional", "Any", "AnyObject", "Self", "Void", "Never", "Error", "Result", "URL", "Date", "Data", "CGFloat", "NSObject", "UIView", "UIViewController"],
  kotlin: ["Int", "Long", "Double", "Float", "Boolean", "String", "Char", "Byte", "Short", "Unit", "Any", "Nothing", "List", "MutableList", "Map", "MutableMap", "Set", "MutableSet", "Array", "Sequence", "Pair", "Triple", "Exception", "Error", "Result", "Unit"],
  php: ["int", "float", "string", "bool", "array", "object", "mixed", "void", "null", "false", "true", "callable", "iterable", "self", "static", "parent", "Exception", "Error", "stdClass"]
};
var ESCAPE_RE = /[.*+?^${}()|[\]\\]/g;
function escapeRe(text) {
  return text.replace(ESCAPE_RE, "\\$&");
}
var HL_CACHE = /* @__PURE__ */ new Map();
function hlRegex(lang) {
  const cached = HL_CACHE.get(lang);
  if (cached !== void 0) return cached;
  const cfg = {
    line: null,
    block: null,
    keywords: null,
    types: null,
    quotes: ['"', "'", "`"],
    extra: null,
    calls: false
  };
  const known = HL_LANGS[lang];
  if (known !== void 0) Object.assign(cfg, known);
  const parts = [];
  const kinds = [];
  const add = (pattern, kind) => {
    parts.push("(" + pattern + ")");
    kinds.push(kind);
  };
  if (cfg.block !== null) add(cfg.block, "comment");
  if (cfg.line !== null) add(cfg.line, "comment");
  for (const q2 of cfg.quotes) {
    if (q2.length > 1) add(q2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[\\s\\S]*?" + q2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "string");
    else add(q2 + "(?:\\\\.|[^" + q2 + "\\\\\\n])*" + q2, "string");
  }
  add("\\b\\d(?:_?\\d)*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b", "number");
  if (cfg.keywords !== null && cfg.keywords.length > 0) {
    add("\\b(?:" + cfg.keywords.map(escapeRe).sort((a, b2) => b2.length - a.length).join("|") + ")\\b", "keyword");
  }
  if (cfg.types !== null && cfg.types.length > 0) {
    add("\\b(?:" + cfg.types.map(escapeRe).sort((a, b2) => b2.length - a.length).join("|") + ")\\b", "type");
  }
  if (cfg.extra !== null) add(cfg.extra, "number");
  if (cfg.calls) add("\\b[A-Za-z_$][\\w$]*(?=\\s*\\()", "call");
  const re2 = new RegExp(parts.join("|"), "g");
  const built = { re: re2, kinds };
  HL_CACHE.set(lang, built);
  return built;
}
var HL_LANGS = {
  javascript: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.javascript, types: HL_TYPES.javascript, calls: true },
  json: { line: null, block: null, keywords: HL_KEYWORDS.json, types: null, quotes: ['"'] },
  python: { line: "#[^\\n]*", block: null, keywords: HL_KEYWORDS.python, types: HL_TYPES.python, quotes: ["'''", '"""', "'", '"'], calls: true },
  ruby: { line: "#[^\\n]*", block: null, keywords: HL_KEYWORDS.ruby, types: HL_TYPES.ruby, quotes: ['"', "'"], calls: true, extra: ":[A-Za-z_][\\w]*" },
  go: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.go, types: HL_TYPES.go, quotes: ['"', "`"], calls: true },
  rust: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.rust, types: HL_TYPES.rust, quotes: ['"', "'"] },
  java: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.java, types: HL_TYPES.java, quotes: ['"', "'"] },
  cpp: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.cpp, types: HL_TYPES.cpp, quotes: ['"', "'"] },
  csharp: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.csharp, types: HL_TYPES.csharp, quotes: ['"', "'"] },
  php: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.php, types: HL_TYPES.php, quotes: ['"', "'"], extra: "\\$[A-Za-z_][\\w]*" },
  swift: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.swift, types: HL_TYPES.swift, quotes: ['"'] },
  kotlin: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.kotlin, types: HL_TYPES.kotlin, quotes: ['"', "'"] },
  shell: { line: "#[^\\n]*", block: null, keywords: HL_KEYWORDS.shell, types: null, quotes: ['"', "'"], extra: "\\$\\{?[A-Za-z_][\\w]*\\}?" },
  sql: { line: "--[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.sql, types: null, quotes: ["'", '"'] },
  toml: { line: "#[^\\n]*", block: null, keywords: HL_KEYWORDS.toml, types: null, quotes: ['"""', '"', "'"] },
  ini: { line: "[;#][^\\n]*", block: null, keywords: [], types: null, quotes: ['"', "'"] }
};
var HL_MAX = 3e5;
function highlightCode(text, lang) {
  if (lang === "markup") return highlightMarkup(text);
  if (lang === "markdown") return highlightMarkdownSource(text);
  if (lang === "css") return highlightCss(text);
  if (lang === "yaml") return highlightYaml(text);
  if (lang === "ini") return highlightIni(text);
  if (text.length > HL_MAX) return escapeHtml(text);
  const { re: re2, kinds } = hlRegex(lang);
  re2.lastIndex = 0;
  let out = "";
  let last = 0;
  let match;
  while ((match = re2.exec(text)) !== null) {
    if (match.index > last) out += escapeHtml(text.slice(last, match.index));
    let kind = "plain";
    for (let i = 1; i < match.length; i++) {
      if (match[i] !== void 0) {
        kind = kinds[i - 1];
        break;
      }
    }
    out += '<span class="dwb-tok ' + kind + '">' + escapeHtml(match[0]) + "</span>";
    last = match.index + match[0].length;
  }
  if (last < text.length) out += escapeHtml(text.slice(last));
  return out;
}
function tokSpan(escaped, kind) {
  return kind === null ? escaped : '<span class="dwb-tok ' + kind + '">' + escaped + "</span>";
}
function highlightMarkup(text) {
  if (text.length > HL_MAX) return escapeHtml(text);
  let out = "";
  let last = 0;
  const re2 = /<!--[\s\S]*?-->|<[^>]*>|[^<]+/g;
  let match;
  while ((match = re2.exec(text)) !== null) {
    const piece = match[0];
    if (piece.charCodeAt(0) === 60) {
      if (piece.startsWith("<!--")) {
        out += '<span class="dwb-tok comment">' + escapeHtml(piece) + "</span>";
      } else {
        out += highlightTag(piece);
      }
    } else {
      out += escapeHtml(piece);
    }
    last = match.index + piece.length;
  }
  if (last < text.length) out += escapeHtml(text.slice(last));
  return out;
}
function highlightTag(tag) {
  let out = "";
  let last = 0;
  const re2 = /([A-Za-z_][\w-]*)(\s*=\s*)("(?:[^"]*)"|'(?:[^']*)')|[A-Za-z_][\w-]*|\s+/g;
  let match;
  while ((match = re2.exec(tag)) !== null) {
    const piece = match[0];
    if (match[1] !== void 0) {
      out += escapeHtml(tag.slice(last, match.index));
      out += '<span class="dwb-tok param">' + escapeHtml(match[1]) + "</span>";
      out += '<span class="dwb-tok punct">' + escapeHtml(match[2]) + "</span>";
      out += '<span class="dwb-tok string">' + escapeHtml(match[3]) + "</span>";
    } else {
      const name2 = /[A-Za-z_][\w-]*/.exec(piece);
      if (name2 !== null && name2.index === 0 && /^[A-Za-z]/.test(piece)) {
        out += '<span class="dwb-tok ' + (piece.charAt(1) === "/" ? "punct" : "type") + '">' + escapeHtml(piece) + "</span>";
      } else {
        out += escapeHtml(piece);
      }
    }
    last = match.index + piece.length;
  }
  if (last < tag.length) out += escapeHtml(tag.slice(last));
  return out;
}
function highlightCss(text) {
  if (text.length > HL_MAX) return escapeHtml(text);
  let out = "";
  let last = 0;
  const re2 = /\/\*[\s\S]*?\*\/|@[\w-]+|\b\d[\w.%]*\b|([^{};]+)(?=\s*\{)|([\w-]+)(?=\s*:)|[{};:]/g;
  let match;
  while ((match = re2.exec(text)) !== null) {
    const piece = match[0];
    let kind = null;
    if (piece.startsWith("/*")) kind = "comment";
    else if (piece.charAt(0) === "@") kind = "keyword";
    else if (/^\d/.test(piece)) kind = "number";
    else if (match[1] !== void 0) kind = "type";
    else if (match[2] !== void 0) kind = "param";
    else if (/[{};:]/.test(piece)) kind = "punct";
    if (match.index > last) out += escapeHtml(text.slice(last, match.index));
    out += tokSpan(escapeHtml(piece), kind);
    last = match.index + piece.length;
  }
  if (last < text.length) out += escapeHtml(text.slice(last));
  return out;
}
function highlightYaml(text) {
  if (text.length > HL_MAX) return escapeHtml(text);
  let out = "";
  let last = 0;
  const re2 = /#[^\n]*|"[^"]*"|'[^']*'|\b\d[\w.]*\b|\b(?:true|false|null|yes|no)\b|^\s*[-*]\s+|^(\s*)([\w.][\w .-]*)(?=\s*:)|:/gm;
  let match;
  while ((match = re2.exec(text)) !== null) {
    const piece = match[0];
    let kind = null;
    if (piece.charAt(0) === "#") kind = "comment";
    else if (piece.charAt(0) === '"' || piece.charAt(0) === "'") kind = "string";
    else if (/^\d/.test(piece)) kind = "number";
    else if (/^(?:true|false|null|yes|no)$/.test(piece.trim())) kind = "keyword";
    else if (/^\s*[-*]\s+$/.test(piece)) kind = "punct";
    else if (match[2] !== void 0) kind = "prop";
    else if (piece === ":") kind = "punct";
    if (match.index > last) out += escapeHtml(text.slice(last, match.index));
    out += tokSpan(escapeHtml(piece), kind);
    last = match.index + piece.length;
  }
  if (last < text.length) out += escapeHtml(text.slice(last));
  return out;
}
function highlightIni(text) {
  if (text.length > HL_MAX) return escapeHtml(text);
  let out = "";
  let last = 0;
  const re2 = /[;#][^\n]*|"[^"]*"|'[^']*'|\b\d[\w.]*\b|^(\s*)([\w.-]+)(?=\s*=)|[=\[\]]/gm;
  let match;
  while ((match = re2.exec(text)) !== null) {
    const piece = match[0];
    let kind = null;
    if (piece.charAt(0) === ";" || piece.charAt(0) === "#") kind = "comment";
    else if (piece.charAt(0) === '"' || piece.charAt(0) === "'") kind = "string";
    else if (/^\d/.test(piece)) kind = "number";
    else if (match[2] !== void 0) kind = "prop";
    else if (/[=\[\]]/.test(piece)) kind = "punct";
    if (match.index > last) out += escapeHtml(text.slice(last, match.index));
    out += tokSpan(escapeHtml(piece), kind);
    last = match.index + piece.length;
  }
  if (last < text.length) out += escapeHtml(text.slice(last));
  return out;
}
function highlightMarkdownSource(text) {
  if (text.length > HL_MAX) return escapeHtml(text);
  let out = "";
  let last = 0;
  const re2 = /^#{1,6}\s.*$|^>.*$|^\s*[-*+]\s+.*$|^\s*\d+[.)]\s+.*$|^\s*(?:---+|\*\*\*+)\s*$|`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|~~[^~]+~~|\[[^\]]+\]\([^)]*\)|!\[[^\]]*\]\([^)]*\)/gm;
  let match;
  while ((match = re2.exec(text)) !== null) {
    const piece = match[0];
    let kind = null;
    if (/^#{1,6}\s/.test(piece)) kind = "keyword";
    else if (/^>/.test(piece)) kind = "comment";
    else if (/^\s*[-*+]\s|\s*\d+[.)]\s/.test(piece)) kind = "punct";
    else if (/^(?:---+|\*\*\*+)$/.test(piece.trim())) kind = "punct";
    else if (piece.charAt(0) === "`" || /^\*\*/.test(piece) || /^\*/.test(piece) || /^~~/.test(piece)) kind = "string";
    else if (piece.charAt(0) === "[" || piece.charAt(0) === "!") kind = "constant";
    if (match.index > last) out += escapeHtml(text.slice(last, match.index));
    out += tokSpan(escapeHtml(piece), kind);
    last = match.index + piece.length;
  }
  if (last < text.length) out += escapeHtml(text.slice(last));
  return out;
}

// src/client/vendor/marked.js
var marked = (function() {
  const module2 = { exports: {} };
  const exports = module2.exports;
  (function(g, f) {
    if (typeof exports == "object" && typeof module2 < "u") {
      module2.exports = f();
    } else if ("function" == typeof define && define.amd) {
      define("marked", f);
    } else {
      g["marked"] = f();
    }
  })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : this, function() {
    var _a2;
    var exports2 = {};
    var __exports = exports2;
    var module3 = { exports: exports2 };
    "use strict";
    var j2 = Object.defineProperty;
    var we2 = Object.getOwnPropertyDescriptor;
    var ye2 = Object.getOwnPropertyNames;
    var Pe = Object.prototype.hasOwnProperty;
    var Se2 = (l, e) => {
      for (var t in e) j2(l, t, { get: e[t], enumerable: true });
    }, _e3 = (l, e, t, n) => {
      if (e && typeof e == "object" || typeof e == "function") for (let s15 of ye2(e)) !Pe.call(l, s15) && s15 !== t && j2(l, s15, { get: () => e[s15], enumerable: !(n = we2(e, s15)) || n.enumerable });
      return l;
    };
    var $e2 = (l) => _e3(j2({}, "__esModule", { value: true }), l);
    var Lt2 = {};
    Se2(Lt2, { Hooks: () => P, Lexer: () => x, Marked: () => D2, Parser: () => b2, Renderer: () => y, TextRenderer: () => _2, Tokenizer: () => w, defaults: () => R, getDefaults: () => z2, lexer: () => $t2, marked: () => g, options: () => Ot2, parse: () => St2, parseInline: () => Pt2, parser: () => _t2, setOptions: () => wt2, use: () => Re2, walkTokens: () => yt });
    module3.exports = $e2(Lt2);
    function z2() {
      return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
    }
    var R = z2();
    function F2(l) {
      R = l;
    }
    var E = { exec: () => null };
    function A(l) {
      let e = [];
      return (t) => {
        let n = Math.max(0, Math.min(3, t - 1)), s15 = e[n];
        return s15 || (s15 = l(n), e[n] = s15), s15;
      };
    }
    function k(l, e = "") {
      let t = typeof l == "string" ? l : l.source, n = { replace: (s15, r) => {
        let i = typeof r == "string" ? r : r.source;
        return i = i.replace(m.caret, "$1"), t = t.replace(s15, i), n;
      }, getRegex: () => new RegExp(t, e) };
      return n;
    }
    var Le2 = ((l = "") => {
      try {
        return !!new RegExp("(?<=1)(?<!1)" + l);
      } catch {
        return false;
      }
    })(), m = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (l) => new RegExp(`^( {0,3}${l})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: A((l) => new RegExp(`^ {0,${l}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: A((l) => new RegExp(`^ {0,${l}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)), fencesBeginRegex: A((l) => new RegExp(`^ {0,${l}}(?:\`\`\`|~~~)`)), headingBeginRegex: A((l) => new RegExp(`^ {0,${l}}#`)), htmlBeginRegex: A((l) => new RegExp(`^ {0,${l}}<(?:[a-z].*>|!--)`, "i")), blockquoteBeginRegex: A((l) => new RegExp(`^ {0,${l}}>`)) }, Me = /^(?:[ \t]*(?:\n|$))+/, ze = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Ee2 = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, v2 = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ce2 = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, K2 = / {0,3}(?:[*+-]|\d{1,9}[.)])/, ae2 = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, le = k(ae2).replace(/bull/g, K2).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Ae2 = k(ae2).replace(/bull/g, K2).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), W = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, Ie2 = /^[^\n]+/, X2 = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Be2 = k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", X2).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), De2 = k(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, K2).getRegex(), Q3 = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", J2 = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, qe2 = k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", J2).replace("tag", Q3).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), pe2 = (l) => k(W).replace("hr", v2).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list", l).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Q3).getRegex(), ve2 = pe2(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), He2 = pe2(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), Ze2 = k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", He2).getRegex(), V = { blockquote: Ze2, code: ze, def: Be2, fences: Ee2, heading: Ce2, hr: v2, html: qe2, lheading: le, list: De2, newline: Me, paragraph: ve2, table: E, text: Ie2 }, ie2 = k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", v2).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Q3).getRegex(), Ge = { ...V, lheading: Ae2, table: ie2, paragraph: k(W).replace("hr", v2).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ie2).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Q3).getRegex() }, Qe = { ...V, html: k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", J2).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: E, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: k(W).replace("hr", v2).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", le).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Ne2 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, je2 = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, ue2 = /^( {2,}|\\)\n(?!\s*$)/, Fe2 = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, $2 = /[\p{P}\p{S}]/u, I = /[\s\p{P}\p{S}]/u, H2 = /[^\s\p{P}\p{S}]/u, Ue2 = k(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, I).getRegex(), Ke = /[\p{Pi}\p{Ps}"']/u, ce2 = /(?!~)[\p{P}\p{S}]/u, We2 = /(?!~)[\s\p{P}\p{S}]/u, Xe2 = /(?:[^\s\p{P}\p{S}]|~)/u, Je2 = k(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Le2 ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), he2 = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, Ve2 = k(he2, "u").replace(/punct/g, $2).getRegex(), Ye2 = k(he2, "u").replace(/punct/g, ce2).getRegex(), et = /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, tt = k(et, "u").replace(/openQuote/g, Ke).replace(/punct/g, $2).getRegex(), de2 = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", nt2 = k(de2, "gu").replace(/notPunctSpace/g, H2).replace(/punctSpace/g, I).replace(/punct/g, $2).getRegex(), rt2 = k(de2, "gu").replace(/notPunctSpace/g, Xe2).replace(/punctSpace/g, We2).replace(/punct/g, ce2).getRegex(), st2 = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", it = k(st2, "gu").replace(/notPunctSpace/g, H2).replace(/punctSpace/g, I).replace(/punct/g, $2).getRegex(), ot2 = k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, H2).replace(/punctSpace/g, I).replace(/punct/g, $2).getRegex(), at2 = "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", lt2 = k(at2, "gu").replace(/notPunctSpace/g, H2).replace(/punctSpace/g, I).replace(/punct/g, $2).getRegex(), pt3 = k(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, $2).getRegex(), ut2 = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", ct2 = k(ut2, "gu").replace(/notPunctSpace/g, H2).replace(/punctSpace/g, I).replace(/punct/g, $2).getRegex(), ht = k(/\\(punct)/, "gu").replace(/punct/g, $2).getRegex(), dt2 = k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), kt3 = k(J2).replace("(?:-->|$)", "-->").getRegex(), gt2 = k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", kt3).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), G2 = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/, ft2 = k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", G2).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), ke2 = k(/^!?\[(label)\]\[(ref)\]/).replace("label", G2).replace("ref", X2).getRegex(), ge2 = k(/^!?\[(ref)\](?:\[\])?/).replace("ref", X2).getRegex(), mt2 = k("reflink|nolink(?!\\()", "g").replace("reflink", ke2).replace("nolink", ge2).getRegex(), oe = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Y2 = { _backpedal: E, anyPunctuation: ht, autolink: dt2, blockSkip: Je2, br: ue2, code: je2, del: E, delLDelim: E, delRDelim: E, emStrongLDelim: Ve2, emStrongRDelimAst: nt2, emStrongRDelimUnd: ot2, escape: Ne2, link: ft2, nolink: ge2, punctuation: Ue2, reflink: ke2, reflinkSearch: mt2, tag: gt2, text: Fe2, url: E }, xt2 = { ...Y2, emStrongLDelim: tt, emStrongRDelimAst: it, emStrongRDelimUnd: lt2, link: k(/^!?\[(label)\]\((.*?)\)/).replace("label", G2).getRegex(), reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", G2).getRegex() }, U2 = { ...Y2, emStrongRDelimAst: rt2, emStrongLDelim: Ye2, delLDelim: pt3, delRDelim: ct2, url: k(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", oe).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: k(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", oe).getRegex() }, bt2 = { ...U2, br: k(ue2).replace("{2,}", "*").getRegex(), text: k(U2.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, Z = { normal: V, gfm: Ge, pedantic: Qe }, B2 = { normal: Y2, gfm: U2, breaks: bt2, pedantic: xt2 };
    var Rt2 = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, fe2 = (l) => Rt2[l];
    function O(l, e) {
      if (e) {
        if (m.escapeTest.test(l)) return l.replace(m.escapeReplace, fe2);
      } else if (m.escapeTestNoEncode.test(l)) return l.replace(m.escapeReplaceNoEncode, fe2);
      return l;
    }
    function ee2(l) {
      try {
        l = encodeURI(l).replace(m.percentDecode, "%");
      } catch {
        return null;
      }
      return l;
    }
    function te(l, e) {
      let t = l.replace(m.findPipe, (r, i, o2) => {
        let p = false, a = i;
        for (; --a >= 0 && o2[a] === "\\"; ) p = !p;
        return p ? "|" : " |";
      }), n = t.split(m.splitPipe), s15 = 0;
      if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
      else for (; n.length < e; ) n.push("");
      for (; s15 < n.length; s15++) n[s15] = n[s15].trim().replace(m.slashPipe, "|");
      return n;
    }
    function L2(l, e, t) {
      let n = l.length;
      if (n === 0) return "";
      let s15 = 0;
      for (; s15 < n; ) {
        let r = l.charAt(n - s15 - 1);
        if (r === e && !t) s15++;
        else if (r !== e && t) s15++;
        else break;
      }
      return l.slice(0, n - s15);
    }
    function ne2(l) {
      let e = l.split(`
`), t = e.length - 1;
      for (; t >= 0 && m.blankLine.test(e[t]); ) t--;
      return e.length - t <= 2 ? l : e.slice(0, t + 1).join(`
`);
    }
    function me(l, e) {
      if (l.indexOf(e[1]) === -1) return -1;
      let t = 0;
      for (let n = 0; n < l.length; n++) if (l[n] === "\\") n++;
      else if (l[n] === e[0]) t++;
      else if (l[n] === e[1] && (t--, t < 0)) return n;
      return t > 0 ? -2 : -1;
    }
    function xe2(l, e = 0) {
      let t = e, n = "";
      for (let s15 of l) if (s15 === "	") {
        let r = 4 - t % 4;
        n += " ".repeat(r), t += r;
      } else n += s15, t++;
      return n;
    }
    function be2(l, e, t, n, s15) {
      let r = e.href, i = e.title || null, o2 = l[1].replace(s15.other.outputLinkReplace, "$1");
      n.state.inLink = true;
      let p = { type: l[0].charAt(0) === "!" ? "image" : "link", raw: t, href: r, title: i, text: o2, tokens: n.inlineTokens(o2) };
      return n.state.inLink = false, p;
    }
    function Tt2(l, e, t) {
      let n = l.match(t.other.indentCodeCompensation);
      if (n === null) return e;
      let s15 = n[1];
      return e.split(`
`).map((r) => {
        let i = r.match(t.other.beginningSpace);
        if (i === null) return r;
        let [o2] = i;
        return o2.length >= s15.length ? r.slice(s15.length) : r;
      }).join(`
`);
    }
    var w = class {
      constructor(e) {
        __publicField(this, "options");
        __publicField(this, "rules");
        __publicField(this, "lexer");
        this.options = e || R;
      }
      space(e) {
        let t = this.rules.block.newline.exec(e);
        if (t && t[0].length > 0) return { type: "space", raw: t[0] };
      }
      code(e) {
        let t = this.rules.block.code.exec(e);
        if (t) {
          let n = this.options.pedantic ? t[0] : ne2(t[0]), s15 = n.replace(this.rules.other.codeRemoveIndent, "");
          return { type: "code", raw: n, codeBlockStyle: "indented", text: s15 };
        }
      }
      fences(e) {
        let t = this.rules.block.fences.exec(e);
        if (t) {
          let n = t[0], s15 = Tt2(n, t[3] || "", this.rules);
          return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: s15 };
        }
      }
      heading(e) {
        let t = this.rules.block.heading.exec(e);
        if (t) {
          let n = t[2].trim();
          if (this.rules.other.endingHash.test(n)) {
            let s15 = L2(n, "#");
            (this.options.pedantic || !s15 || this.rules.other.endingSpaceChar.test(s15)) && (n = s15.trim());
          }
          return { type: "heading", raw: L2(t[0], `
`), depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
        }
      }
      hr(e) {
        let t = this.rules.block.hr.exec(e);
        if (t) return { type: "hr", raw: L2(t[0], `
`) };
      }
      blockquote(e) {
        let t = this.rules.block.blockquote.exec(e);
        if (t) {
          let n = L2(t[0], `
`).split(`
`), s15 = "", r = "", i = [];
          for (; n.length > 0; ) {
            let o2 = false, p = [], a;
            for (a = 0; a < n.length; a++) if (this.rules.other.blockquoteStart.test(n[a])) p.push(n[a]), o2 = true;
            else if (!o2) p.push(n[a]);
            else break;
            n = n.slice(a);
            let u = p.join(`
`), c = u.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
            s15 = s15 ? `${s15}
${u}` : u, r = r ? `${r}
${c}` : c;
            let h15 = this.lexer.state.top;
            if (this.lexer.state.top = true, this.lexer.blockTokens(c, i, true), this.lexer.state.top = h15, n.length === 0) break;
            let d = i.at(-1);
            if (d?.type === "code") break;
            if (d?.type === "blockquote") {
              let T = d, f = n.join(`
`), S2 = T.raw + `
` + f.replace(this.rules.other.blockquoteSetextReplace2, ""), M2 = this.blockquote(S2);
              i[i.length - 1] = M2, s15 = `${s15}
${f}`, r = r.substring(0, r.length - T.text.length) + M2.text;
              break;
            } else if (d?.type === "list") {
              let T = d, f = T.raw + `
` + n.join(`
`), S2 = this.list(f);
              i[i.length - 1] = S2, s15 = s15.substring(0, s15.length - d.raw.length) + S2.raw, r = r.substring(0, r.length - T.raw.length) + S2.raw, n = f.substring(i.at(-1).raw.length).split(`
`);
              continue;
            }
          }
          return { type: "blockquote", raw: s15, tokens: i, text: r };
        }
      }
      list(e) {
        let t = this.rules.block.list.exec(e);
        if (t) {
          let n = t[1].trim(), s15 = n.length > 1, r = { type: "list", raw: "", ordered: s15, start: s15 ? +n.slice(0, -1) : "", loose: false, items: [] };
          n = s15 ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = s15 ? n : "[*+-]");
          let i = this.rules.other.listItemRegex(n), o2 = false;
          for (; e; ) {
            let a = false, u = "", c = "";
            if (!(t = i.exec(e)) || this.rules.block.hr.test(e)) break;
            u = t[0], e = e.substring(u.length);
            let h15 = xe2(t[2].split(`
`, 1)[0], t[1].length), d = e.split(`
`, 1)[0], T = !h15.trim(), f = 0;
            if (this.options.pedantic ? (f = 2, c = h15.trimStart()) : T ? f = t[1].length + 1 : (f = h15.search(this.rules.other.nonSpaceChar), f = f > 4 ? 1 : f, c = h15.slice(f), f += t[1].length), T && this.rules.other.blankLine.test(d) && (u += d + `
`, e = e.substring(d.length + 1), a = true), !a) {
              let S2 = this.rules.other.nextBulletRegex(f), M2 = this.rules.other.hrRegex(f), re2 = this.rules.other.fencesBeginRegex(f), se2 = this.rules.other.headingBeginRegex(f), Te2 = this.rules.other.htmlBeginRegex(f), Oe = this.rules.other.blockquoteBeginRegex(f);
              for (; e; ) {
                let N = e.split(`
`, 1)[0], q2;
                if (d = N, this.options.pedantic ? (d = d.replace(this.rules.other.listReplaceNesting, "  "), q2 = d) : q2 = d.replace(this.rules.other.tabCharGlobal, "    "), re2.test(d) || se2.test(d) || Te2.test(d) || Oe.test(d) || S2.test(d) || M2.test(d)) break;
                if (q2.search(this.rules.other.nonSpaceChar) >= f || !d.trim()) c += `
` + q2.slice(f);
                else {
                  if (T || h15.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || re2.test(h15) || se2.test(h15) || M2.test(h15)) break;
                  c += `
` + d;
                }
                T = !d.trim(), u += N + `
`, e = e.substring(N.length + 1), h15 = q2.slice(f);
              }
            }
            r.loose || (o2 ? r.loose = true : this.rules.other.doubleBlankLine.test(u) && (o2 = true)), r.items.push({ type: "list_item", raw: u, task: !!this.options.gfm && this.rules.other.listIsTask.test(c), loose: false, text: c, tokens: [] }), r.raw += u;
          }
          let p = r.items.at(-1);
          if (p) p.raw = p.raw.trimEnd(), p.text = p.text.trimEnd();
          else return;
          r.raw = r.raw.trimEnd();
          for (let a of r.items) {
            this.lexer.state.top = false, a.tokens = this.lexer.blockTokens(a.text, []);
            let u = a.tokens[0];
            if (a.task && (u?.type === "text" || u?.type === "paragraph")) {
              a.text = a.text.replace(this.rules.other.listReplaceTask, ""), u.raw = u.raw.replace(this.rules.other.listReplaceTask, ""), u.text = u.text.replace(this.rules.other.listReplaceTask, "");
              for (let h15 = this.lexer.inlineQueue.length - 1; h15 >= 0; h15--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[h15].src)) {
                this.lexer.inlineQueue[h15].src = this.lexer.inlineQueue[h15].src.replace(this.rules.other.listReplaceTask, "");
                break;
              }
              let c = this.rules.other.listTaskCheckbox.exec(a.raw);
              if (c) {
                let h15 = { type: "checkbox", raw: c[0] + " ", checked: c[0] !== "[ ]" };
                a.checked = h15.checked, r.loose ? a.tokens[0] && ["paragraph", "text"].includes(a.tokens[0].type) && "tokens" in a.tokens[0] && a.tokens[0].tokens ? (a.tokens[0].raw = h15.raw + a.tokens[0].raw, a.tokens[0].text = h15.raw + a.tokens[0].text, a.tokens[0].tokens.unshift(h15)) : a.tokens.unshift({ type: "paragraph", raw: h15.raw, text: h15.raw, tokens: [h15] }) : a.tokens.unshift(h15);
              }
            } else a.task && (a.task = false);
            if (!r.loose) {
              let c = a.tokens.filter((d) => d.type === "space"), h15 = c.length > 0 && c.some((d) => this.rules.other.anyLine.test(d.raw));
              r.loose = h15;
            }
          }
          if (r.loose) for (let a of r.items) {
            a.loose = true;
            for (let u of a.tokens) u.type === "text" && (u.type = "paragraph");
          }
          return r;
        }
      }
      html(e) {
        let t = this.rules.block.html.exec(e);
        if (t) {
          let n = ne2(t[0]);
          return { type: "html", block: true, raw: n, pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: n };
        }
      }
      def(e) {
        let t = this.rules.block.def.exec(e);
        if (t) {
          let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s15 = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
          return { type: "def", tag: n, raw: L2(t[0], `
`), href: s15, title: r };
        }
      }
      table(e) {
        let t = this.rules.block.table.exec(e);
        if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
        let n = te(t[1]), s15 = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = { type: "table", raw: L2(t[0], `
`), header: [], align: [], rows: [] };
        if (n.length === s15.length) {
          for (let o2 of s15) this.rules.other.tableAlignRight.test(o2) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(o2) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(o2) ? i.align.push("left") : i.align.push(null);
          for (let o2 = 0; o2 < n.length; o2++) i.header.push({ text: n[o2], tokens: this.lexer.inline(n[o2]), header: true, align: i.align[o2] });
          for (let o2 of r) i.rows.push(te(o2, i.header.length).map((p, a) => ({ text: p, tokens: this.lexer.inline(p), header: false, align: i.align[a] })));
          return i;
        }
      }
      lheading(e) {
        let t = this.rules.block.lheading.exec(e);
        if (t) {
          let n = t[1].trim();
          return { type: "heading", raw: L2(t[0], `
`), depth: t[2].charAt(0) === "=" ? 1 : 2, text: n, tokens: this.lexer.inline(n) };
        }
      }
      paragraph(e) {
        let t = this.rules.block.paragraph.exec(e);
        if (t) {
          let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
          return { type: "paragraph", raw: t[0], text: n, tokens: this.lexer.inline(n) };
        }
      }
      text(e) {
        let t = this.rules.block.text.exec(e);
        if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
      }
      escape(e) {
        let t = this.rules.inline.escape.exec(e);
        if (t) return { type: "escape", raw: t[0], text: t[1] };
      }
      tag(e) {
        let t = this.rules.inline.tag.exec(e);
        if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t[0] };
      }
      link(e) {
        let t = this.rules.inline.link.exec(e);
        if (t) {
          let n = t[2].trim();
          if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
            if (!this.rules.other.endAngleBracket.test(n)) return;
            let i = L2(n.slice(0, -1), "\\");
            if ((n.length - i.length) % 2 === 0) return;
          } else {
            let i = me(t[2], "()");
            if (i === -2) return;
            if (i > -1) {
              let p = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + i;
              t[2] = t[2].substring(0, i), t[0] = t[0].substring(0, p).trim(), t[3] = "";
            }
          }
          let s15 = t[2], r = "";
          if (this.options.pedantic) {
            let i = this.rules.other.pedanticHrefTitle.exec(s15);
            i && (s15 = i[1], r = i[3]);
          } else r = t[3] ? t[3].slice(1, -1) : "";
          return s15 = s15.trim(), this.rules.other.startAngleBracket.test(s15) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s15 = s15.slice(1) : s15 = s15.slice(1, -1)), be2(t, { href: s15 && s15.replace(this.rules.inline.anyPunctuation, "$1"), title: r && r.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
        }
      }
      reflink(e, t) {
        let n;
        if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
          let s15 = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), r = t[s15.toLowerCase()];
          if (!r) {
            let i = n[0].charAt(0);
            return { type: "text", raw: i, text: i };
          }
          return be2(n, r, n[0], this.lexer, this.rules);
        }
      }
      emStrong(e, t, n = "") {
        let s15 = this.rules.inline.emStrongLDelim.exec(e);
        if (!s15 || !s15[1] && !s15[2] && !s15[3] && !s15[4] || s15[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
        if (!(s15[1] || s15[3] || "") || !n || this.rules.inline.punctuation.exec(n)) {
          let i = [...s15[0]].length - 1, o2, p, a = i, u = 0, c = s15[0][0], h15 = n === c, d = c === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
          for (d.lastIndex = 0, t = t.slice(-1 * e.length + i); (s15 = d.exec(t)) !== null; ) {
            if (o2 = s15[1] || s15[2] || s15[3] || s15[4] || s15[5] || s15[6], !o2) continue;
            if (p = [...o2].length, s15[3] || s15[4]) {
              a += p;
              continue;
            } else if (s15[5] || s15[6]) {
              if (i % 3 && !((i + p) % 3)) {
                u += p;
                continue;
              }
              if (h15) break;
            }
            if (a -= p, a > 0) continue;
            p = Math.min(p, p + a + u);
            let T = [...s15[0]][0].length, f = e.slice(0, i + s15.index + T + p);
            if (Math.min(i, p) % 2) {
              let M2 = f.slice(1, -1);
              return { type: "em", raw: f, text: M2, tokens: this.lexer.inlineTokens(M2) };
            }
            let S2 = f.slice(2, -2);
            return { type: "strong", raw: f, text: S2, tokens: this.lexer.inlineTokens(S2) };
          }
        }
      }
      codespan(e) {
        let t = this.rules.inline.code.exec(e);
        if (t) {
          let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), s15 = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
          return s15 && r && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
        }
      }
      br(e) {
        let t = this.rules.inline.br.exec(e);
        if (t) return { type: "br", raw: t[0] };
      }
      del(e, t, n = "") {
        let s15 = this.rules.inline.delLDelim.exec(e);
        if (!s15) return;
        if (!(s15[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
          let i = [...s15[0]].length - 1, o2, p, a = i, u = this.rules.inline.delRDelim;
          for (u.lastIndex = 0, t = t.slice(-1 * e.length + i); (s15 = u.exec(t)) !== null; ) {
            if (o2 = s15[1] || s15[2] || s15[3] || s15[4] || s15[5] || s15[6], !o2 || (p = [...o2].length, p !== i)) continue;
            if (s15[3] || s15[4]) {
              a += p;
              continue;
            }
            if (a -= p, a > 0) continue;
            p = Math.min(p, p + a);
            let c = [...s15[0]][0].length, h15 = e.slice(0, i + s15.index + c + p), d = h15.slice(i, -i);
            return { type: "del", raw: h15, text: d, tokens: this.lexer.inlineTokens(d) };
          }
        }
      }
      autolink(e) {
        let t = this.rules.inline.autolink.exec(e);
        if (t) {
          let n, s15;
          return t[2] === "@" ? (n = t[1], s15 = "mailto:" + n) : (n = t[1], s15 = n), { type: "link", raw: t[0], text: n, href: s15, tokens: [{ type: "text", raw: n, text: n }] };
        }
      }
      url(e) {
        let t;
        if (t = this.rules.inline.url.exec(e)) {
          let n, s15;
          if (t[2] === "@") n = t[0], s15 = "mailto:" + n;
          else {
            let r;
            do
              r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
            while (r !== t[0]);
            n = t[0], t[1] === "www." ? s15 = "http://" + t[0] : s15 = t[0];
          }
          return { type: "link", raw: t[0], text: n, href: s15, tokens: [{ type: "text", raw: n, text: n }] };
        }
      }
      inlineText(e) {
        let t = this.rules.inline.text.exec(e);
        if (t) {
          let n = this.lexer.state.inRawBlock;
          return { type: "text", raw: t[0], text: t[0], escaped: n };
        }
      }
    };
    var x = class l {
      constructor(e) {
        __publicField(this, "tokens");
        __publicField(this, "options");
        __publicField(this, "state");
        __publicField(this, "inlineQueue");
        __publicField(this, "tokenizer");
        this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || R, this.options.tokenizer = this.options.tokenizer || new w(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
        let t = { other: m, block: Z.normal, inline: B2.normal };
        this.options.pedantic ? (t.block = Z.pedantic, t.inline = B2.pedantic) : this.options.gfm && (t.block = Z.gfm, this.options.breaks ? t.inline = B2.breaks : t.inline = B2.gfm), this.tokenizer.rules = t;
      }
      static get rules() {
        return { block: Z, inline: B2 };
      }
      static lex(e, t) {
        return new l(t).lex(e);
      }
      static lexInline(e, t) {
        return new l(t).inlineTokens(e);
      }
      lex(e) {
        e = e.replace(m.carriageReturn, `
`), this.blockTokens(e, this.tokens);
        for (let t = 0; t < this.inlineQueue.length; t++) {
          let n = this.inlineQueue[t];
          this.inlineTokens(n.src, n.tokens);
        }
        return this.inlineQueue = [], this.tokens;
      }
      blockTokens(e, t = [], n = false) {
        this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(m.tabCharGlobal, "    ").replace(m.spaceLine, ""));
        let s15 = 1 / 0;
        for (; e; ) {
          if (e.length < s15) s15 = e.length;
          else {
            this.infiniteLoopError(e.charCodeAt(0));
            break;
          }
          let r;
          if (this.options.extensions?.block?.some((o2) => (r = o2.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), true) : false)) continue;
          if (r = this.tokenizer.space(e)) {
            e = e.substring(r.raw.length);
            let o2 = t.at(-1);
            r.raw.length === 1 && o2 !== void 0 ? o2.raw += `
` : t.push(r);
            continue;
          }
          if (r = this.tokenizer.code(e)) {
            e = e.substring(r.raw.length);
            let o2 = t.at(-1);
            o2?.type === "paragraph" || o2?.type === "text" ? (o2.raw += (o2.raw.endsWith(`
`) ? "" : `
`) + r.raw, o2.text += `
` + r.text, this.inlineQueue.at(-1).src = o2.text) : t.push(r);
            continue;
          }
          if (r = this.tokenizer.fences(e)) {
            e = e.substring(r.raw.length), t.push(r);
            continue;
          }
          if (r = this.tokenizer.heading(e)) {
            e = e.substring(r.raw.length), t.push(r);
            continue;
          }
          if (r = this.tokenizer.hr(e)) {
            e = e.substring(r.raw.length), t.push(r);
            continue;
          }
          if (r = this.tokenizer.blockquote(e)) {
            e = e.substring(r.raw.length), t.push(r);
            continue;
          }
          if (r = this.tokenizer.list(e)) {
            e = e.substring(r.raw.length), t.push(r);
            continue;
          }
          if (r = this.tokenizer.html(e)) {
            e = e.substring(r.raw.length), t.push(r);
            continue;
          }
          if (r = this.tokenizer.def(e)) {
            e = e.substring(r.raw.length);
            let o2 = t.at(-1);
            o2?.type === "paragraph" || o2?.type === "text" ? (o2.raw += (o2.raw.endsWith(`
`) ? "" : `
`) + r.raw, o2.text += `
` + r.raw, this.inlineQueue.at(-1).src = o2.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = { href: r.href, title: r.title }, t.push(r));
            continue;
          }
          if (r = this.tokenizer.table(e)) {
            e = e.substring(r.raw.length), t.push(r);
            continue;
          }
          if (r = this.tokenizer.lheading(e)) {
            e = e.substring(r.raw.length), t.push(r);
            continue;
          }
          let i = e;
          if (this.options.extensions?.startBlock) {
            let o2 = 1 / 0, p = e.slice(1), a;
            this.options.extensions.startBlock.forEach((u) => {
              a = u.call({ lexer: this }, p), typeof a == "number" && a >= 0 && (o2 = Math.min(o2, a));
            }), o2 < 1 / 0 && o2 >= 0 && (i = e.substring(0, o2 + 1));
          }
          if (this.state.top && (r = this.tokenizer.paragraph(i))) {
            let o2 = t.at(-1);
            n && o2?.type === "paragraph" ? (o2.raw += (o2.raw.endsWith(`
`) ? "" : `
`) + r.raw, o2.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o2.text) : t.push(r), n = i.length !== e.length, e = e.substring(r.raw.length);
            continue;
          }
          if (r = this.tokenizer.text(e)) {
            e = e.substring(r.raw.length);
            let o2 = t.at(-1);
            o2?.type === "text" ? (o2.raw += (o2.raw.endsWith(`
`) ? "" : `
`) + r.raw, o2.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o2.text) : t.push(r);
            continue;
          }
          if (e) {
            this.infiniteLoopError(e.charCodeAt(0));
            break;
          }
        }
        return this.state.top = true, t;
      }
      inline(e, t = []) {
        return this.inlineQueue.push({ src: e, tokens: t }), t;
      }
      inlineTokens(e, t = []) {
        this.tokenizer.lexer = this;
        let n = e;
        if (this.tokens.links) {
          let o2 = Object.keys(this.tokens.links);
          o2.length > 0 && (n = n.replace(this.tokenizer.rules.inline.reflinkSearch, (p) => o2.includes(p.slice(p.lastIndexOf("[") + 1, -1)) ? "[" + "a".repeat(p.length - 2) + "]" : p));
        }
        n = n.replace(this.tokenizer.rules.inline.anyPunctuation, "++"), n = n.replace(this.tokenizer.rules.inline.blockSkip, (o2, p, a) => {
          let u = a ? a.length : 0;
          return o2.slice(0, u) + "[" + "a".repeat(o2.length - u - 2) + "]";
        }), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
        let s15 = false, r = "", i = 1 / 0;
        for (; e; ) {
          if (e.length < i) i = e.length;
          else {
            this.infiniteLoopError(e.charCodeAt(0));
            break;
          }
          s15 || (r = ""), s15 = false;
          let o2;
          if (this.options.extensions?.inline?.some((a) => (o2 = a.call({ lexer: this }, e, t)) ? (e = e.substring(o2.raw.length), t.push(o2), true) : false)) continue;
          if (o2 = this.tokenizer.escape(e)) {
            e = e.substring(o2.raw.length), t.push(o2);
            continue;
          }
          if (o2 = this.tokenizer.tag(e)) {
            e = e.substring(o2.raw.length), t.push(o2);
            continue;
          }
          if (o2 = this.tokenizer.link(e)) {
            e = e.substring(o2.raw.length), t.push(o2);
            continue;
          }
          if (o2 = this.tokenizer.reflink(e, this.tokens.links)) {
            e = e.substring(o2.raw.length);
            let a = t.at(-1);
            o2.type === "text" && a?.type === "text" ? (a.raw += o2.raw, a.text += o2.text) : t.push(o2);
            continue;
          }
          if (o2 = this.tokenizer.emStrong(e, n, r)) {
            e = e.substring(o2.raw.length), t.push(o2);
            continue;
          }
          if (o2 = this.tokenizer.codespan(e)) {
            e = e.substring(o2.raw.length), t.push(o2);
            continue;
          }
          if (o2 = this.tokenizer.br(e)) {
            e = e.substring(o2.raw.length), t.push(o2);
            continue;
          }
          if (o2 = this.tokenizer.del(e, n, r)) {
            e = e.substring(o2.raw.length), t.push(o2);
            continue;
          }
          if (o2 = this.tokenizer.autolink(e)) {
            e = e.substring(o2.raw.length), t.push(o2);
            continue;
          }
          if (!this.state.inLink && (o2 = this.tokenizer.url(e))) {
            e = e.substring(o2.raw.length), t.push(o2);
            continue;
          }
          let p = e;
          if (this.options.extensions?.startInline) {
            let a = 1 / 0, u = e.slice(1), c;
            this.options.extensions.startInline.forEach((h15) => {
              c = h15.call({ lexer: this }, u), typeof c == "number" && c >= 0 && (a = Math.min(a, c));
            }), a < 1 / 0 && a >= 0 && (p = e.substring(0, a + 1));
          }
          if (o2 = this.tokenizer.inlineText(p)) {
            e = e.substring(o2.raw.length), o2.raw.slice(-1) !== "_" && (r = o2.raw.slice(-1)), s15 = true;
            let a = t.at(-1);
            a?.type === "text" ? (a.raw += o2.raw, a.text += o2.text) : t.push(o2);
            continue;
          }
          if (e) {
            this.infiniteLoopError(e.charCodeAt(0));
            break;
          }
        }
        return t;
      }
      infiniteLoopError(e) {
        let t = "Infinite loop on byte: " + e;
        if (this.options.silent) console.error(t);
        else throw new Error(t);
      }
    };
    var y = class {
      constructor(e) {
        __publicField(this, "options");
        __publicField(this, "parser");
        this.options = e || R;
      }
      space(e) {
        return "";
      }
      code({ text: e, lang: t, escaped: n }) {
        let s15 = (t || "").match(m.notSpaceStart)?.[0], r = e.replace(m.endingNewline, "") + `
`;
        return s15 ? '<pre><code class="language-' + O(s15) + '">' + (n ? r : O(r, true)) + `</code></pre>
` : "<pre><code>" + (n ? r : O(r, true)) + `</code></pre>
`;
      }
      blockquote({ tokens: e }) {
        return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
      }
      html({ text: e }) {
        return e;
      }
      def(e) {
        return "";
      }
      heading({ tokens: e, depth: t }) {
        return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
      }
      hr(e) {
        return `<hr>
`;
      }
      list(e) {
        let t = e.ordered, n = e.start, s15 = "";
        for (let o2 = 0; o2 < e.items.length; o2++) {
          let p = e.items[o2];
          s15 += this.listitem(p);
        }
        let r = t ? "ol" : "ul", i = t && n !== 1 ? ' start="' + n + '"' : "";
        return "<" + r + i + `>
` + s15 + "</" + r + `>
`;
      }
      listitem(e) {
        return `<li>${this.parser.parse(e.tokens)}</li>
`;
      }
      checkbox({ checked: e }) {
        return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
      }
      paragraph({ tokens: e }) {
        return `<p>${this.parser.parseInline(e)}</p>
`;
      }
      table(e) {
        let t = "", n = "";
        for (let r = 0; r < e.header.length; r++) n += this.tablecell(e.header[r]);
        t += this.tablerow({ text: n });
        let s15 = "";
        for (let r = 0; r < e.rows.length; r++) {
          let i = e.rows[r];
          n = "";
          for (let o2 = 0; o2 < i.length; o2++) n += this.tablecell(i[o2]);
          s15 += this.tablerow({ text: n });
        }
        return s15 && (s15 = `<tbody>${s15}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + s15 + `</table>
`;
      }
      tablerow({ text: e }) {
        return `<tr>
${e}</tr>
`;
      }
      tablecell(e) {
        let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
        return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
      }
      strong({ tokens: e }) {
        return `<strong>${this.parser.parseInline(e)}</strong>`;
      }
      em({ tokens: e }) {
        return `<em>${this.parser.parseInline(e)}</em>`;
      }
      codespan({ text: e }) {
        return `<code>${O(e, true)}</code>`;
      }
      br(e) {
        return "<br>";
      }
      del({ tokens: e }) {
        return `<del>${this.parser.parseInline(e)}</del>`;
      }
      link({ href: e, title: t, tokens: n }) {
        let s15 = this.parser.parseInline(n), r = ee2(e);
        if (r === null) return s15;
        e = r;
        let i = '<a href="' + e + '"';
        return t && (i += ' title="' + O(t) + '"'), i += ">" + s15 + "</a>", i;
      }
      image({ href: e, title: t, text: n, tokens: s15 }) {
        s15 && (n = this.parser.parseInline(s15, this.parser.textRenderer));
        let r = ee2(e);
        if (r === null) return O(n);
        e = r;
        let i = `<img src="${e}" alt="${O(n)}"`;
        return t && (i += ` title="${O(t)}"`), i += ">", i;
      }
      text(e) {
        return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : O(e.text);
      }
    };
    var _2 = class {
      strong({ text: e }) {
        return e;
      }
      em({ text: e }) {
        return e;
      }
      codespan({ text: e }) {
        return e;
      }
      del({ text: e }) {
        return e;
      }
      html({ text: e }) {
        return e;
      }
      text({ text: e }) {
        return e;
      }
      link({ text: e }) {
        return "" + e;
      }
      image({ text: e }) {
        return "" + e;
      }
      br() {
        return "";
      }
      checkbox({ raw: e }) {
        return e;
      }
    };
    var b2 = class l {
      constructor(e) {
        __publicField(this, "options");
        __publicField(this, "renderer");
        __publicField(this, "textRenderer");
        this.options = e || R, this.options.renderer = this.options.renderer || new y(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new _2();
      }
      static parse(e, t) {
        return new l(t).parse(e);
      }
      static parseInline(e, t) {
        return new l(t).parseInline(e);
      }
      parse(e) {
        this.renderer.parser = this;
        let t = "";
        for (let n = 0; n < e.length; n++) {
          let s15 = e[n];
          if (this.options.extensions?.renderers?.[s15.type]) {
            let i = s15, o2 = this.options.extensions.renderers[i.type].call({ parser: this }, i);
            if (o2 !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(i.type)) {
              t += o2 || "";
              continue;
            }
          }
          let r = s15;
          switch (r.type) {
            case "space": {
              t += this.renderer.space(r);
              break;
            }
            case "hr": {
              t += this.renderer.hr(r);
              break;
            }
            case "heading": {
              t += this.renderer.heading(r);
              break;
            }
            case "code": {
              t += this.renderer.code(r);
              break;
            }
            case "table": {
              t += this.renderer.table(r);
              break;
            }
            case "blockquote": {
              t += this.renderer.blockquote(r);
              break;
            }
            case "list": {
              t += this.renderer.list(r);
              break;
            }
            case "checkbox": {
              t += this.renderer.checkbox(r);
              break;
            }
            case "html": {
              t += this.renderer.html(r);
              break;
            }
            case "def": {
              t += this.renderer.def(r);
              break;
            }
            case "paragraph": {
              t += this.renderer.paragraph(r);
              break;
            }
            case "text": {
              t += this.renderer.text(r);
              break;
            }
            default: {
              let i = 'Token with "' + r.type + '" type was not found.';
              if (this.options.silent) return console.error(i), "";
              throw new Error(i);
            }
          }
        }
        return t;
      }
      parseInline(e, t = this.renderer) {
        this.renderer.parser = this;
        let n = "";
        for (let s15 = 0; s15 < e.length; s15++) {
          let r = e[s15];
          if (this.options.extensions?.renderers?.[r.type]) {
            let o2 = this.options.extensions.renderers[r.type].call({ parser: this }, r);
            if (o2 !== false || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
              n += o2 || "";
              continue;
            }
          }
          let i = r;
          switch (i.type) {
            case "escape": {
              n += t.text(i);
              break;
            }
            case "html": {
              n += t.html(i);
              break;
            }
            case "link": {
              n += t.link(i);
              break;
            }
            case "image": {
              n += t.image(i);
              break;
            }
            case "checkbox": {
              n += t.checkbox(i);
              break;
            }
            case "strong": {
              n += t.strong(i);
              break;
            }
            case "em": {
              n += t.em(i);
              break;
            }
            case "codespan": {
              n += t.codespan(i);
              break;
            }
            case "br": {
              n += t.br(i);
              break;
            }
            case "del": {
              n += t.del(i);
              break;
            }
            case "text": {
              n += t.text(i);
              break;
            }
            default: {
              let o2 = 'Token with "' + i.type + '" type was not found.';
              if (this.options.silent) return console.error(o2), "";
              throw new Error(o2);
            }
          }
        }
        return n;
      }
    };
    var P = (_a2 = class {
      constructor(e) {
        __publicField(this, "options");
        __publicField(this, "block");
        this.options = e || R;
      }
      preprocess(e) {
        return e;
      }
      postprocess(e) {
        return e;
      }
      processAllTokens(e) {
        return e;
      }
      emStrongMask(e) {
        return e;
      }
      provideLexer(e = this.block) {
        return e ? x.lex : x.lexInline;
      }
      provideParser(e = this.block) {
        return e ? b2.parse : b2.parseInline;
      }
    }, __publicField(_a2, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), __publicField(_a2, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), _a2);
    var D2 = class {
      constructor(...e) {
        __publicField(this, "defaults", z2());
        __publicField(this, "options", this.setOptions);
        __publicField(this, "parse", this.parseMarkdown(true));
        __publicField(this, "parseInline", this.parseMarkdown(false));
        __publicField(this, "Parser", b2);
        __publicField(this, "Renderer", y);
        __publicField(this, "TextRenderer", _2);
        __publicField(this, "Lexer", x);
        __publicField(this, "Tokenizer", w);
        __publicField(this, "Hooks", P);
        this.use(...e);
      }
      walkTokens(e, t) {
        let n = [];
        for (let s15 of e) switch (n = n.concat(t.call(this, s15)), s15.type) {
          case "table": {
            let r = s15;
            for (let i of r.header) n = n.concat(this.walkTokens(i.tokens, t));
            for (let i of r.rows) for (let o2 of i) n = n.concat(this.walkTokens(o2.tokens, t));
            break;
          }
          case "list": {
            let r = s15;
            n = n.concat(this.walkTokens(r.items, t));
            break;
          }
          default: {
            let r = s15;
            this.defaults.extensions?.childTokens?.[r.type] ? this.defaults.extensions.childTokens[r.type].forEach((i) => {
              let o2 = r[i].flat(1 / 0);
              n = n.concat(this.walkTokens(o2, t));
            }) : r.tokens && (n = n.concat(this.walkTokens(r.tokens, t)));
          }
        }
        return n;
      }
      use(...e) {
        let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
        return e.forEach((n) => {
          let s15 = { ...n };
          if (s15.async = this.defaults.async || s15.async || false, n.extensions && (n.extensions.forEach((r) => {
            if (!r.name) throw new Error("extension name required");
            if ("renderer" in r) {
              let i = t.renderers[r.name];
              i ? t.renderers[r.name] = function(...o2) {
                let p = r.renderer.apply(this, o2);
                return p === false && (p = i.apply(this, o2)), p;
              } : t.renderers[r.name] = r.renderer;
            }
            if ("tokenizer" in r) {
              if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
              let i = t[r.level];
              i ? i.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
            }
            "childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
          }), s15.extensions = t), n.renderer) {
            let r = this.defaults.renderer || new y(this.defaults);
            for (let i in n.renderer) {
              if (!(i in r)) throw new Error(`renderer '${i}' does not exist`);
              if (["options", "parser"].includes(i)) continue;
              let o2 = i, p = n.renderer[o2], a = r[o2];
              r[o2] = (...u) => {
                let c = p.apply(r, u);
                return c === false && (c = a.apply(r, u)), c || "";
              };
            }
            s15.renderer = r;
          }
          if (n.tokenizer) {
            let r = this.defaults.tokenizer || new w(this.defaults);
            for (let i in n.tokenizer) {
              if (!(i in r)) throw new Error(`tokenizer '${i}' does not exist`);
              if (["options", "rules", "lexer"].includes(i)) continue;
              let o2 = i, p = n.tokenizer[o2], a = r[o2];
              r[o2] = (...u) => {
                let c = p.apply(r, u);
                return c === false && (c = a.apply(r, u)), c;
              };
            }
            s15.tokenizer = r;
          }
          if (n.hooks) {
            let r = this.defaults.hooks || new P();
            for (let i in n.hooks) {
              if (!(i in r)) throw new Error(`hook '${i}' does not exist`);
              if (["options", "block"].includes(i)) continue;
              let o2 = i, p = n.hooks[o2], a = r[o2];
              P.passThroughHooks.has(i) ? r[o2] = (u) => {
                if (this.defaults.async && P.passThroughHooksRespectAsync.has(i)) return (async () => {
                  let h15 = await p.call(r, u);
                  return a.call(r, h15);
                })();
                let c = p.call(r, u);
                return a.call(r, c);
              } : r[o2] = (...u) => {
                if (this.defaults.async) return (async () => {
                  let h15 = await p.apply(r, u);
                  return h15 === false && (h15 = await a.apply(r, u)), h15;
                })();
                let c = p.apply(r, u);
                return c === false && (c = a.apply(r, u)), c;
              };
            }
            s15.hooks = r;
          }
          if (n.walkTokens) {
            let r = this.defaults.walkTokens, i = n.walkTokens;
            s15.walkTokens = function(o2) {
              let p = [];
              return p.push(i.call(this, o2)), r && (p = p.concat(r.call(this, o2))), p;
            };
          }
          this.defaults = { ...this.defaults, ...s15 };
        }), this;
      }
      setOptions(e) {
        return this.defaults = { ...this.defaults, ...e }, this;
      }
      lexer(e, t) {
        return x.lex(e, t ?? this.defaults);
      }
      parser(e, t) {
        return b2.parse(e, t ?? this.defaults);
      }
      parseMarkdown(e) {
        return (n, s15) => {
          let r = { ...s15 }, i = { ...this.defaults, ...r }, o2 = this.onError(!!i.silent, !!i.async);
          if (this.defaults.async === true && r.async === false) return o2(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
          if (typeof n > "u" || n === null) return o2(new Error("marked(): input parameter is undefined or null"));
          if (typeof n != "string") return o2(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
          if (i.hooks && (i.hooks.options = i, i.hooks.block = e), i.async) return (async () => {
            let p = i.hooks ? await i.hooks.preprocess(n) : n, u = await (i.hooks ? await i.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(p, i), c = i.hooks ? await i.hooks.processAllTokens(u) : u;
            i.walkTokens && await Promise.all(this.walkTokens(c, i.walkTokens));
            let d = await (i.hooks ? await i.hooks.provideParser(e) : e ? b2.parse : b2.parseInline)(c, i);
            return i.hooks ? await i.hooks.postprocess(d) : d;
          })().catch(o2);
          try {
            i.hooks && (n = i.hooks.preprocess(n));
            let a = (i.hooks ? i.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(n, i);
            i.hooks && (a = i.hooks.processAllTokens(a)), i.walkTokens && this.walkTokens(a, i.walkTokens);
            let c = (i.hooks ? i.hooks.provideParser(e) : e ? b2.parse : b2.parseInline)(a, i);
            return i.hooks && (c = i.hooks.postprocess(c)), c;
          } catch (p) {
            return o2(p);
          }
        };
      }
      onError(e, t) {
        return (n) => {
          if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
            let s15 = "<p>An error occurred:</p><pre>" + O(n.message + "", true) + "</pre>";
            return t ? Promise.resolve(s15) : s15;
          }
          if (t) return Promise.reject(n);
          throw n;
        };
      }
    };
    var C2 = new D2();
    function g(l, e) {
      return C2.parse(l, e);
    }
    g.options = g.setOptions = function(l) {
      return C2.setOptions(l), g.defaults = C2.defaults, F2(g.defaults), g;
    };
    g.getDefaults = z2;
    g.defaults = R;
    function Re2(...l) {
      return C2.use(...l), g.defaults = C2.defaults, F2(g.defaults), g;
    }
    g.use = Re2;
    g.walkTokens = function(l, e) {
      return C2.walkTokens(l, e);
    };
    g.parseInline = C2.parseInline;
    g.Parser = b2;
    g.parser = b2.parse;
    g.Renderer = y;
    g.TextRenderer = _2;
    g.Lexer = x;
    g.lexer = x.lex;
    g.Tokenizer = w;
    g.Hooks = P;
    g.parse = g;
    var Ot2 = g.options, wt2 = g.setOptions, yt = g.walkTokens, Pt2 = g.parseInline, St2 = g, _t2 = b2.parse, $t2 = x.lex;
    if (__exports != exports2) module3.exports = exports2;
    return module3.exports;
  });
  return module2.exports;
})();
var marked_default = marked;

// src/client/markdown.js
var MD_FENCE_ALIASES = { ts: "javascript", tsx: "javascript", js: "javascript", jsx: "javascript", py: "python", rb: "ruby", go: "go", rs: "rust", java: "java", cs: "csharp", php: "php", sh: "shell", bash: "shell", zsh: "shell", sql: "sql", yaml: "yaml", yml: "yaml", json: "json", html: "markup", xml: "markup", css: "css", md: "markdown", markdown: "markdown", ini: "ini", toml: "toml" };
function mdLinkHref(url) {
  if (/^https?:/i.test(url) || /^mailto:/i.test(url)) return url;
  return null;
}
function mdImageHref(src, dir) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(src)) {
    return /^https?:/i.test(src) ? src : null;
  }
  if (src.includes("..")) return null;
  return assetUrl(dir === "" ? src : dir + "/" + src);
}
var mdCurrentDir = "";
var mdRenderer = {
  html(token) {
    return escapeHtml(token.text);
  },
  code(token) {
    const lang = MD_FENCE_ALIASES[token.lang] ?? (token.lang === "" ? void 0 : token.lang);
    return '<pre class="dwb-md-pre"><code>' + highlightCode(token.text, lang) + "</code></pre>";
  },
  codespan(token) {
    return '<code class="dwb-md-code">' + escapeHtml(token.text) + "</code>";
  },
  link(token) {
    const href = mdLinkHref(token.href);
    return href === null ? escapeHtml(token.raw) : '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(token.text) + "</a>";
  },
  image(token) {
    const src = mdImageHref(token.href, mdCurrentDir);
    return src === null ? escapeHtml(token.raw) : '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(token.text) + '">';
  }
};
marked_default.use({ renderer: mdRenderer, gfm: true, breaks: true });
function renderMarkdown(text, dir) {
  mdCurrentDir = dir;
  return marked_default.parse(text, { async: false });
}

// src/client/editor.js
var CM_LANG_BY_EXT = {
  js: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  jsx: "javascript",
  ts: "typescript",
  mts: "typescript",
  cts: "typescript",
  tsx: "typescript",
  css: "css",
  scss: "css",
  less: "css",
  html: "html",
  htm: "html",
  md: "markdown",
  markdown: "markdown",
  mdx: "markdown"
};
function editorLanguageFor(ext) {
  return CM_LANG_BY_EXT[ext] ?? void 0;
}
var MAX_TEXT_EDIT = 1024 * 1024;
function htmlPreviewSrc(text, dir) {
  return text.replace(/(\b(?:src|href)\s*=\s*)(["'])([^"']*)\2/gi, (all, prefix, quote, value) => {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(value) || value.includes("..")) return all;
    return prefix + quote + assetUrl(dir === "" ? value : dir + "/" + value) + quote;
  });
}

// src/client/preview.js
var import_react13 = __toESM(require("react"), 1);
var h14 = import_react13.default.createElement;
var { useState: useState8, useEffect: useEffect6, useRef: useRef6 } = import_react13.default;
var PREVIEW_KIND = { md: "markdown", markdown: "markdown", mdx: "markdown", html: "html", htm: "html" };

// src/client/index.js
var name = "dsh-work";
var inject = ["slots", "sessions"];
function apply(ctx) {
  const sessions = ctx.get("sessions");
  const WorkbenchPanelWithSessions = (props) => import_react14.default.createElement(WorkbenchPanel, { ...props, sessions });
  ctx.effect(
    () => ctx.slots.inject("shell.overlay", () => ctx.slots.register({
      name: "shell.overlay",
      id: "workbench",
      order: 100,
      label: "Workbench"
    }, WorkbenchPanelWithSessions)),
    "dsh-work: overlay registration"
  );
  ctx.effect(() => installDockCoupling(), "dsh-work: dock coupling");
}
if (typeof document !== "undefined" && document.getElementById("dsh-work-style") === null) {
  const styleEl = document.createElement("style");
  styleEl.id = "dsh-work-style";
  styleEl.setAttribute("data-plugin", "dsh-work");
  styleEl.textContent = styles_default;
  document.head.appendChild(styleEl);
}
/*! Bundled license information:

@xterm/xterm/lib/xterm.mjs:
@xterm/addon-fit/lib/addon-fit.mjs:
  (**
   * Copyright (c) 2014-2024 The xterm.js authors. All rights reserved.
   * @license MIT
   *
   * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
   * @license MIT
   *
   * Originally forked from (with the author's permission):
   *   Fabrice Bellard's javascript vt100 for jslinux:
   *   http://bellard.org/jslinux/
   *   Copyright (c) 2011 Fabrice Bellard
   *)
*/

return module.exports; } });
//# sourceMappingURL=client.js.map
