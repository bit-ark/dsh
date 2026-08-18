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
.dwb-tabs { display: flex; align-items: flex-end; gap: 36px; margin-top: 4px; padding: 0 28px 0 8px; border-bottom: 1px solid transparent; position: relative; flex: none; }
.dwb-tabs::after { content: ''; position: absolute; right: 0; bottom: 1px; left: 0; height: 1px; background: var(--dsw-alias-border-l2); pointer-events: none; }
.dwb-tabbtn { position: relative; border: none; background: transparent; color: var(--dsw-alias-label-tertiary); padding: 0 0 11px; font-size: 13px; line-height: 16px; font-weight: 500; cursor: pointer; }
.dwb-tabbtn::after { content: ''; position: absolute; right: 0; bottom: 1px; left: 0; height: 2px; border-radius: 2px; background: transparent; }
.dwb-tabbtn:hover { color: var(--dsw-alias-label-primary); background: transparent; }
.dwb-tabbtn[data-active] { color: var(--dsw-alias-state-business-primary); }
.dwb-tabbtn[data-active]::after { background: var(--dsw-alias-state-business-primary); }
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
.dwb-footer { flex: none; padding: 6px 12px; border-top: 1px solid var(--dsw-alias-border-l2); color: var(--dsw-alias-label-tertiary); font-size: 11px; }
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
/* \u2500\u2500 code editor (CodeMirror) \u2500\u2500 */
.dwb-editorscroll { overflow: hidden; padding: 0; }
.dwb-editor { flex: 1; min-height: 0; overflow: hidden; }
.dwb-editor[data-hidden] { display: none; }
.dwb-editor .cm-editor { height: 100%; }
.dwb-editor .cm-scroller { overflow: auto; font-family: var(--ds-font-family-code); }
.dwb-editor .cm-gutters { border-right: 1px solid var(--dsw-alias-border-l2); }
`;

// src/client/panel.js
var import_react6 = __toESM(require("react"), 1);

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
    const el = bubble.current;
    if (el === null) return;
    const fit = () => setPos(fitTipGeometry(anchor.current, { width: el.offsetWidth, height: el.offsetHeight }, { width: window.innerWidth, height: window.innerHeight }));
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
function formatSize(bytes) {
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + " MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + " KB";
  return bytes + " B";
}
var PANEL_MIN = 280;
var TREE_MIN = 120;
var CONTENT_MIN = 240;
var AUTO_WIDEN = 720;
var PANEL_DEFAULT = 344;
var TREE_DEFAULT = 240;
var WIDTH_KEY = "dsh-work.width";
var SPLIT_KEY = "dsh-work.split";
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
  let lo = 0;
  let hi = 1;
  tt = Math.max(0, Math.min(1, tt));
  for (let i = 0; i < 12; i++) {
    const x = sampleX(tt);
    if (Math.abs(x - u) < 1e-6) break;
    if (x < u) lo = tt;
    else hi = tt;
    tt = (lo + hi) / 2;
  }
  return sampleY(tt);
}
function panelActionFor(width, min = PANEL_MIN) {
  return width > min ? "shrink" : "hide";
}
function clampTreeWidth(width, panelWidth) {
  const upper = Math.max(0, Math.round(panelWidth - CONTENT_MIN));
  const lower = Math.min(TREE_MIN, upper);
  return Math.min(upper, Math.max(lower, Math.round(width)));
}
function toNode(entry) {
  const node = {
    path: entry.path,
    name: entry.name,
    type: entry.type,
    hidden: entry.hidden,
    expanded: false,
    loading: false,
    loaded: false,
    children: []
  };
  if (entry.size !== void 0) node.size = entry.size;
  return node;
}
function findNode(node, path) {
  if (node.path === path) return node;
  for (let i = 0; i < node.children.length; i++) {
    const found = findNode(node.children[i], path);
    if (found !== void 0) return found;
  }
  return void 0;
}
function patchNode(root, path, patch) {
  if (root.path === path) return Object.assign({}, root, patch);
  return Object.assign({}, root, { children: root.children.map((child) => patchNode(child, path, patch)) });
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
var TEXT_EXTENSIONS = /* @__PURE__ */ new Set([
  "md",
  "mdx",
  "txt",
  "text",
  "ts",
  "tsx",
  "js",
  "jsx",
  "mjs",
  "cjs",
  "mts",
  "cts",
  "json",
  "jsonc",
  "yml",
  "yaml",
  "toml",
  "html",
  "htm",
  "xml",
  "css",
  "scss",
  "less",
  "py",
  "rb",
  "go",
  "rs",
  "java",
  "c",
  "h",
  "cpp",
  "hpp",
  "cs",
  "php",
  "sh",
  "bash",
  "zsh",
  "fish",
  "bat",
  "ps1",
  "sql",
  "graphql",
  "ini",
  "conf",
  "env",
  "gitignore",
  "dockerfile",
  "lock",
  "log",
  "csv",
  "vue",
  "svelte",
  "astro",
  "prisma",
  "proto",
  "webmanifest"
]);
var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "bmp", "ico", "avif", "svg"]);
var AUDIO_EXTENSIONS = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "aac", "flac", "opus", "weba"]);
var VIDEO_EXTENSIONS = /* @__PURE__ */ new Set(["mp4", "webm", "mov", "m4v", "avi", "mkv", "ogv", "ts", "m2ts"]);
function classifyFile(name2) {
  const dot = name2.lastIndexOf(".");
  const ext = dot > 0 ? name2.slice(dot + 1).toLowerCase() : "";
  if (ext === "") return "other";
  if (TEXT_EXTENSIONS.has(ext)) return "text";
  if (IMAGE_EXTENSIONS.has(ext)) return "image";
  if (AUDIO_EXTENSIONS.has(ext)) return "audio";
  if (VIDEO_EXTENSIONS.has(ext)) return "video";
  return "other";
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
var refreshIcon = () => h2(
  IconFrame,
  null,
  h2("path", { d: "M20 12a8 8 0 1 1-2.34-5.66" }),
  h2("path", { d: "M20 4v4h-4" })
);
var closeIcon = () => h2(IconFrame, null, h2("path", { d: "M6 6l12 12M18 6L6 18" }));
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
var codeIcon = () => h2(
  IconFrame,
  { size: 13 },
  h2("path", { d: "M8.5 8.5 4.5 12l4 3.5" }),
  h2("path", { d: "M15.5 8.5l4 3.5-4 3.5" }),
  h2("path", { d: "M13.5 6.5l-3 11" })
);
var saveIcon = () => h2(
  IconFrame,
  { size: 13 },
  h2("path", { d: "M5 3.5h10.6L19.5 7.9V19a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5z" }),
  h2("path", { d: "M8 3.5V8h6.5V3.5" }),
  h2("path", { d: "M7.5 14.5h9V20h-9z" })
);
var vscodeIcon = () => h2(
  "svg",
  {
    viewBox: "0 0 128 128",
    width: 13,
    height: 13,
    fill: "none",
    "aria-hidden": true
  },
  h2("path", { fill: "currentColor", d: "M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z" })
);
var createIcon = () => h2(
  IconFrame,
  { size: 14 },
  h2("path", { d: "M8 3h8a1 1 0 0 1 1 1v3" }),
  h2("path", { d: "M3 8v8a1 1 0 0 0 1 1h3" }),
  h2("path", { d: "M16 21h3a1 1 0 0 0 1-1v-3" }),
  h2("path", { d: "M21 8V5a1 1 0 0 0-1-1h-3" }),
  h2("path", { d: "M12 7v6M9 10h6" })
);
var chevronIcon = () => h2(IconFrame, { size: 10 }, h2("path", { d: "M9 6l6 6-6 6" }));
var folderClosedIcon = () => h2(IconFrame, { size: 14 }, h2("path", { d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }));
var folderOpenIcon = () => h2(
  IconFrame,
  { size: 14 },
  h2("path", { d: "M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v1H6.4a2 2 0 0 0-1.9 1.4L3 15z" }),
  h2("path", { d: "M3.2 14.8 4.7 9.6a2 2 0 0 1 1.9-1.4H21l-2 7.2a2 2 0 0 1-2 1.4H5.2a2 2 0 0 1-2-2z" })
);
function fileIconFor(name2) {
  const dot = name2.lastIndexOf(".");
  const ext = dot > 0 ? name2.slice(dot + 1).toLowerCase() : "";
  let kind = "file";
  if (["ts", "tsx", "js", "jsx", "mjs", "cjs", "mts", "cts", "css", "scss"].indexOf(ext) !== -1) kind = "code";
  else if (["json", "yml", "yaml", "toml", "lock"].indexOf(ext) !== -1) kind = "config";
  else if (["md", "mdx", "txt"].indexOf(ext) !== -1) kind = "doc";
  return h2(
    "span",
    { className: "dwb-fileicon", "data-kind": kind },
    h2(
      IconFrame,
      { size: 14 },
      h2("path", { d: "M5 3.5h6l4 4V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" }),
      kind === "code" ? h2("path", { d: "M10 11l-2 2 2 2M14 11l2 2-2 2" }) : null
    )
  );
}

// src/client/files-view.js
var import_react3 = __toESM(require("react"), 1);
var h3 = import_react3.default.createElement;
function FilesView(props) {
  if (props.root === null) {
    return h3("div", { className: "dwb-scroll" }, h3("div", { className: "dwb-note" }, "\u65E0\u5DE5\u4F5C\u76EE\u5F55\uFF08\u672A\u9009\u62E9\u4F1A\u8BDD\u4E14\u672A\u624B\u52A8\u6307\u5B9A\u8DEF\u5F84\uFF09"));
  }
  const rows = [];
  const walk = (node, depth) => {
    const isDir = node.type === "directory";
    const selected = !isDir && node.path === props.selected;
    rows.push(h3(
      "div",
      {
        key: node.path,
        className: "dwb-row",
        "data-dir": isDir || void 0,
        "data-hidden": node.hidden || void 0,
        "data-selected": selected || void 0,
        style: { paddingLeft: 6 + depth * 14 + "px" },
        onClick: isDir ? () => props.onToggle(node.path) : () => props.onSelect(node),
        title: node.path
      },
      h3("span", { className: "dwb-caret", "data-open": isDir && node.expanded || void 0 }, isDir ? chevronIcon() : null),
      isDir ? h3("span", { className: "dwb-diricon", "data-open": node.expanded || void 0 }, node.expanded ? folderOpenIcon() : folderClosedIcon()) : fileIconFor(node.name),
      h3("span", { className: "dwb-name" }, node.name),
      !isDir && node.size !== void 0 ? h3("span", { className: "dwb-size" }, formatSize(node.size)) : null
    ));
    if (!node.expanded) return;
    if (node.loading) {
      rows.push(h3("div", { key: node.path + "/loading", className: "dwb-note", style: { paddingLeft: 20 + depth * 14 + "px" } }, "\u52A0\u8F7D\u4E2D\u2026"));
      return;
    }
    if (node.error !== void 0) {
      rows.push(h3("div", { key: node.path + "/error", className: "dwb-note", "data-error": true, style: { paddingLeft: 20 + depth * 14 + "px" } }, node.error));
      return;
    }
    if (node.loaded && node.children.length === 0) {
      rows.push(h3("div", { key: node.path + "/empty", className: "dwb-note", style: { paddingLeft: 20 + depth * 14 + "px" } }, "\uFF08\u7A7A\u76EE\u5F55\uFF09"));
    }
    for (let i = 0; i < node.children.length; i++) walk(node.children[i], depth + 1);
    if (node.truncated === true) {
      rows.push(h3("div", { key: node.path + "/truncated", className: "dwb-note", style: { paddingLeft: 20 + depth * 14 + "px" } }, "\uFF08\u6761\u76EE\u8FC7\u591A\uFF0C\u5217\u8868\u5DF2\u622A\u65AD\uFF09"));
    }
  };
  walk(props.root, 0);
  return h3("div", { className: props.refreshing ? "dwb-scroll dwb-busy" : "dwb-scroll" }, rows);
}

// src/client/preview.js
var import_react4 = __toESM(require("react"), 1);

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
  for (const q of cfg.quotes) {
    if (q.length > 1) add(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[\\s\\S]*?" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "string");
    else add(q + "(?:\\\\.|[^" + q + "\\\\\\n])*" + q, "string");
  }
  add("\\b\\d(?:_?\\d)*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b", "number");
  if (cfg.keywords !== null && cfg.keywords.length > 0) {
    add("\\b(?:" + cfg.keywords.map(escapeRe).sort((a, b) => b.length - a.length).join("|") + ")\\b", "keyword");
  }
  if (cfg.types !== null && cfg.types.length > 0) {
    add("\\b(?:" + cfg.types.map(escapeRe).sort((a, b) => b.length - a.length).join("|") + ")\\b", "type");
  }
  if (cfg.extra !== null) add(cfg.extra, "number");
  if (cfg.calls) add("\\b[A-Za-z_$][\\w$]*(?=\\s*\\()", "call");
  const re = new RegExp(parts.join("|"), "g");
  const built = { re, kinds };
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
  const { re, kinds } = hlRegex(lang);
  re.lastIndex = 0;
  let out = "";
  let last = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
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
  const re = /<!--[\s\S]*?-->|<[^>]*>|[^<]+/g;
  let match;
  while ((match = re.exec(text)) !== null) {
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
  const re = /([A-Za-z_][\w-]*)(\s*=\s*)("(?:[^"]*)"|'(?:[^']*)')|[A-Za-z_][\w-]*|\s+/g;
  let match;
  while ((match = re.exec(tag)) !== null) {
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
  const re = /\/\*[\s\S]*?\*\/|@[\w-]+|\b\d[\w.%]*\b|([^{};]+)(?=\s*\{)|([\w-]+)(?=\s*:)|[{};:]/g;
  let match;
  while ((match = re.exec(text)) !== null) {
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
  const re = /#[^\n]*|"[^"]*"|'[^']*'|\b\d[\w.]*\b|\b(?:true|false|null|yes|no)\b|^\s*[-*]\s+|^(\s*)([\w.][\w .-]*)(?=\s*:)|:/gm;
  let match;
  while ((match = re.exec(text)) !== null) {
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
  const re = /[;#][^\n]*|"[^"]*"|'[^']*'|\b\d[\w.]*\b|^(\s*)([\w.-]+)(?=\s*=)|[=\[\]]/gm;
  let match;
  while ((match = re.exec(text)) !== null) {
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
  const re = /^#{1,6}\s.*$|^>.*$|^\s*[-*+]\s+.*$|^\s*\d+[.)]\s+.*$|^\s*(?:---+|\*\*\*+)\s*$|`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|~~[^~]+~~|\[[^\]]+\]\([^)]*\)|!\[[^\]]*\]\([^)]*\)/gm;
  let match;
  while ((match = re.exec(text)) !== null) {
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
    var _a;
    var exports2 = {};
    var __exports = exports2;
    var module3 = { exports: exports2 };
    "use strict";
    var j = Object.defineProperty;
    var we = Object.getOwnPropertyDescriptor;
    var ye = Object.getOwnPropertyNames;
    var Pe = Object.prototype.hasOwnProperty;
    var Se = (l, e) => {
      for (var t in e) j(l, t, { get: e[t], enumerable: true });
    }, _e = (l, e, t, n) => {
      if (e && typeof e == "object" || typeof e == "function") for (let s of ye(e)) !Pe.call(l, s) && s !== t && j(l, s, { get: () => e[s], enumerable: !(n = we(e, s)) || n.enumerable });
      return l;
    };
    var $e = (l) => _e(j({}, "__esModule", { value: true }), l);
    var Lt = {};
    Se(Lt, { Hooks: () => P, Lexer: () => x, Marked: () => D, Parser: () => b, Renderer: () => y, TextRenderer: () => _, Tokenizer: () => w, defaults: () => R, getDefaults: () => z, lexer: () => $t, marked: () => g, options: () => Ot, parse: () => St, parseInline: () => Pt, parser: () => _t, setOptions: () => wt, use: () => Re, walkTokens: () => yt });
    module3.exports = $e(Lt);
    function z() {
      return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
    }
    var R = z();
    function F(l) {
      R = l;
    }
    var E = { exec: () => null };
    function A(l) {
      let e = [];
      return (t) => {
        let n = Math.max(0, Math.min(3, t - 1)), s = e[n];
        return s || (s = l(n), e[n] = s), s;
      };
    }
    function k(l, e = "") {
      let t = typeof l == "string" ? l : l.source, n = { replace: (s, r) => {
        let i = typeof r == "string" ? r : r.source;
        return i = i.replace(m.caret, "$1"), t = t.replace(s, i), n;
      }, getRegex: () => new RegExp(t, e) };
      return n;
    }
    var Le = ((l = "") => {
      try {
        return !!new RegExp("(?<=1)(?<!1)" + l);
      } catch {
        return false;
      }
    })(), m = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (l) => new RegExp(`^( {0,3}${l})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: A((l) => new RegExp(`^ {0,${l}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: A((l) => new RegExp(`^ {0,${l}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)), fencesBeginRegex: A((l) => new RegExp(`^ {0,${l}}(?:\`\`\`|~~~)`)), headingBeginRegex: A((l) => new RegExp(`^ {0,${l}}#`)), htmlBeginRegex: A((l) => new RegExp(`^ {0,${l}}<(?:[a-z].*>|!--)`, "i")), blockquoteBeginRegex: A((l) => new RegExp(`^ {0,${l}}>`)) }, Me = /^(?:[ \t]*(?:\n|$))+/, ze = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Ee = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, v = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ce = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, K = / {0,3}(?:[*+-]|\d{1,9}[.)])/, ae = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, le = k(ae).replace(/bull/g, K).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Ae = k(ae).replace(/bull/g, K).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), W = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, Ie = /^[^\n]+/, X = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Be = k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", X).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), De = k(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, K).getRegex(), Q = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", J = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, qe = k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", J).replace("tag", Q).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), pe = (l) => k(W).replace("hr", v).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list", l).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Q).getRegex(), ve = pe(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), He = pe(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), Ze = k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", He).getRegex(), V = { blockquote: Ze, code: ze, def: Be, fences: Ee, heading: Ce, hr: v, html: qe, lheading: le, list: De, newline: Me, paragraph: ve, table: E, text: Ie }, ie = k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", v).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Q).getRegex(), Ge = { ...V, lheading: Ae, table: ie, paragraph: k(W).replace("hr", v).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ie).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Q).getRegex() }, Qe = { ...V, html: k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", J).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: E, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: k(W).replace("hr", v).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", le).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Ne = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, je = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, ue = /^( {2,}|\\)\n(?!\s*$)/, Fe = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, $ = /[\p{P}\p{S}]/u, I = /[\s\p{P}\p{S}]/u, H = /[^\s\p{P}\p{S}]/u, Ue = k(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, I).getRegex(), Ke = /[\p{Pi}\p{Ps}"']/u, ce = /(?!~)[\p{P}\p{S}]/u, We = /(?!~)[\s\p{P}\p{S}]/u, Xe = /(?:[^\s\p{P}\p{S}]|~)/u, Je = k(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Le ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), he = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, Ve = k(he, "u").replace(/punct/g, $).getRegex(), Ye = k(he, "u").replace(/punct/g, ce).getRegex(), et = /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, tt = k(et, "u").replace(/openQuote/g, Ke).replace(/punct/g, $).getRegex(), de = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", nt = k(de, "gu").replace(/notPunctSpace/g, H).replace(/punctSpace/g, I).replace(/punct/g, $).getRegex(), rt = k(de, "gu").replace(/notPunctSpace/g, Xe).replace(/punctSpace/g, We).replace(/punct/g, ce).getRegex(), st = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", it = k(st, "gu").replace(/notPunctSpace/g, H).replace(/punctSpace/g, I).replace(/punct/g, $).getRegex(), ot = k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, H).replace(/punctSpace/g, I).replace(/punct/g, $).getRegex(), at = "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", lt = k(at, "gu").replace(/notPunctSpace/g, H).replace(/punctSpace/g, I).replace(/punct/g, $).getRegex(), pt = k(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, $).getRegex(), ut = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", ct = k(ut, "gu").replace(/notPunctSpace/g, H).replace(/punctSpace/g, I).replace(/punct/g, $).getRegex(), ht = k(/\\(punct)/, "gu").replace(/punct/g, $).getRegex(), dt = k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), kt = k(J).replace("(?:-->|$)", "-->").getRegex(), gt = k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", kt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), G = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/, ft = k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", G).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), ke = k(/^!?\[(label)\]\[(ref)\]/).replace("label", G).replace("ref", X).getRegex(), ge = k(/^!?\[(ref)\](?:\[\])?/).replace("ref", X).getRegex(), mt = k("reflink|nolink(?!\\()", "g").replace("reflink", ke).replace("nolink", ge).getRegex(), oe = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Y = { _backpedal: E, anyPunctuation: ht, autolink: dt, blockSkip: Je, br: ue, code: je, del: E, delLDelim: E, delRDelim: E, emStrongLDelim: Ve, emStrongRDelimAst: nt, emStrongRDelimUnd: ot, escape: Ne, link: ft, nolink: ge, punctuation: Ue, reflink: ke, reflinkSearch: mt, tag: gt, text: Fe, url: E }, xt = { ...Y, emStrongLDelim: tt, emStrongRDelimAst: it, emStrongRDelimUnd: lt, link: k(/^!?\[(label)\]\((.*?)\)/).replace("label", G).getRegex(), reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", G).getRegex() }, U = { ...Y, emStrongRDelimAst: rt, emStrongLDelim: Ye, delLDelim: pt, delRDelim: ct, url: k(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", oe).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: k(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", oe).getRegex() }, bt = { ...U, br: k(ue).replace("{2,}", "*").getRegex(), text: k(U.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, Z = { normal: V, gfm: Ge, pedantic: Qe }, B = { normal: Y, gfm: U, breaks: bt, pedantic: xt };
    var Rt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, fe = (l) => Rt[l];
    function O(l, e) {
      if (e) {
        if (m.escapeTest.test(l)) return l.replace(m.escapeReplace, fe);
      } else if (m.escapeTestNoEncode.test(l)) return l.replace(m.escapeReplaceNoEncode, fe);
      return l;
    }
    function ee(l) {
      try {
        l = encodeURI(l).replace(m.percentDecode, "%");
      } catch {
        return null;
      }
      return l;
    }
    function te(l, e) {
      let t = l.replace(m.findPipe, (r, i, o) => {
        let p = false, a = i;
        for (; --a >= 0 && o[a] === "\\"; ) p = !p;
        return p ? "|" : " |";
      }), n = t.split(m.splitPipe), s = 0;
      if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
      else for (; n.length < e; ) n.push("");
      for (; s < n.length; s++) n[s] = n[s].trim().replace(m.slashPipe, "|");
      return n;
    }
    function L(l, e, t) {
      let n = l.length;
      if (n === 0) return "";
      let s = 0;
      for (; s < n; ) {
        let r = l.charAt(n - s - 1);
        if (r === e && !t) s++;
        else if (r !== e && t) s++;
        else break;
      }
      return l.slice(0, n - s);
    }
    function ne(l) {
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
    function xe(l, e = 0) {
      let t = e, n = "";
      for (let s of l) if (s === "	") {
        let r = 4 - t % 4;
        n += " ".repeat(r), t += r;
      } else n += s, t++;
      return n;
    }
    function be(l, e, t, n, s) {
      let r = e.href, i = e.title || null, o = l[1].replace(s.other.outputLinkReplace, "$1");
      n.state.inLink = true;
      let p = { type: l[0].charAt(0) === "!" ? "image" : "link", raw: t, href: r, title: i, text: o, tokens: n.inlineTokens(o) };
      return n.state.inLink = false, p;
    }
    function Tt(l, e, t) {
      let n = l.match(t.other.indentCodeCompensation);
      if (n === null) return e;
      let s = n[1];
      return e.split(`
`).map((r) => {
        let i = r.match(t.other.beginningSpace);
        if (i === null) return r;
        let [o] = i;
        return o.length >= s.length ? r.slice(s.length) : r;
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
          let n = this.options.pedantic ? t[0] : ne(t[0]), s = n.replace(this.rules.other.codeRemoveIndent, "");
          return { type: "code", raw: n, codeBlockStyle: "indented", text: s };
        }
      }
      fences(e) {
        let t = this.rules.block.fences.exec(e);
        if (t) {
          let n = t[0], s = Tt(n, t[3] || "", this.rules);
          return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: s };
        }
      }
      heading(e) {
        let t = this.rules.block.heading.exec(e);
        if (t) {
          let n = t[2].trim();
          if (this.rules.other.endingHash.test(n)) {
            let s = L(n, "#");
            (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (n = s.trim());
          }
          return { type: "heading", raw: L(t[0], `
`), depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
        }
      }
      hr(e) {
        let t = this.rules.block.hr.exec(e);
        if (t) return { type: "hr", raw: L(t[0], `
`) };
      }
      blockquote(e) {
        let t = this.rules.block.blockquote.exec(e);
        if (t) {
          let n = L(t[0], `
`).split(`
`), s = "", r = "", i = [];
          for (; n.length > 0; ) {
            let o = false, p = [], a;
            for (a = 0; a < n.length; a++) if (this.rules.other.blockquoteStart.test(n[a])) p.push(n[a]), o = true;
            else if (!o) p.push(n[a]);
            else break;
            n = n.slice(a);
            let u = p.join(`
`), c = u.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
            s = s ? `${s}
${u}` : u, r = r ? `${r}
${c}` : c;
            let h7 = this.lexer.state.top;
            if (this.lexer.state.top = true, this.lexer.blockTokens(c, i, true), this.lexer.state.top = h7, n.length === 0) break;
            let d = i.at(-1);
            if (d?.type === "code") break;
            if (d?.type === "blockquote") {
              let T = d, f = n.join(`
`), S = T.raw + `
` + f.replace(this.rules.other.blockquoteSetextReplace2, ""), M = this.blockquote(S);
              i[i.length - 1] = M, s = `${s}
${f}`, r = r.substring(0, r.length - T.text.length) + M.text;
              break;
            } else if (d?.type === "list") {
              let T = d, f = T.raw + `
` + n.join(`
`), S = this.list(f);
              i[i.length - 1] = S, s = s.substring(0, s.length - d.raw.length) + S.raw, r = r.substring(0, r.length - T.raw.length) + S.raw, n = f.substring(i.at(-1).raw.length).split(`
`);
              continue;
            }
          }
          return { type: "blockquote", raw: s, tokens: i, text: r };
        }
      }
      list(e) {
        let t = this.rules.block.list.exec(e);
        if (t) {
          let n = t[1].trim(), s = n.length > 1, r = { type: "list", raw: "", ordered: s, start: s ? +n.slice(0, -1) : "", loose: false, items: [] };
          n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = s ? n : "[*+-]");
          let i = this.rules.other.listItemRegex(n), o = false;
          for (; e; ) {
            let a = false, u = "", c = "";
            if (!(t = i.exec(e)) || this.rules.block.hr.test(e)) break;
            u = t[0], e = e.substring(u.length);
            let h7 = xe(t[2].split(`
`, 1)[0], t[1].length), d = e.split(`
`, 1)[0], T = !h7.trim(), f = 0;
            if (this.options.pedantic ? (f = 2, c = h7.trimStart()) : T ? f = t[1].length + 1 : (f = h7.search(this.rules.other.nonSpaceChar), f = f > 4 ? 1 : f, c = h7.slice(f), f += t[1].length), T && this.rules.other.blankLine.test(d) && (u += d + `
`, e = e.substring(d.length + 1), a = true), !a) {
              let S = this.rules.other.nextBulletRegex(f), M = this.rules.other.hrRegex(f), re = this.rules.other.fencesBeginRegex(f), se = this.rules.other.headingBeginRegex(f), Te = this.rules.other.htmlBeginRegex(f), Oe = this.rules.other.blockquoteBeginRegex(f);
              for (; e; ) {
                let N = e.split(`
`, 1)[0], q;
                if (d = N, this.options.pedantic ? (d = d.replace(this.rules.other.listReplaceNesting, "  "), q = d) : q = d.replace(this.rules.other.tabCharGlobal, "    "), re.test(d) || se.test(d) || Te.test(d) || Oe.test(d) || S.test(d) || M.test(d)) break;
                if (q.search(this.rules.other.nonSpaceChar) >= f || !d.trim()) c += `
` + q.slice(f);
                else {
                  if (T || h7.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || re.test(h7) || se.test(h7) || M.test(h7)) break;
                  c += `
` + d;
                }
                T = !d.trim(), u += N + `
`, e = e.substring(N.length + 1), h7 = q.slice(f);
              }
            }
            r.loose || (o ? r.loose = true : this.rules.other.doubleBlankLine.test(u) && (o = true)), r.items.push({ type: "list_item", raw: u, task: !!this.options.gfm && this.rules.other.listIsTask.test(c), loose: false, text: c, tokens: [] }), r.raw += u;
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
              for (let h7 = this.lexer.inlineQueue.length - 1; h7 >= 0; h7--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[h7].src)) {
                this.lexer.inlineQueue[h7].src = this.lexer.inlineQueue[h7].src.replace(this.rules.other.listReplaceTask, "");
                break;
              }
              let c = this.rules.other.listTaskCheckbox.exec(a.raw);
              if (c) {
                let h7 = { type: "checkbox", raw: c[0] + " ", checked: c[0] !== "[ ]" };
                a.checked = h7.checked, r.loose ? a.tokens[0] && ["paragraph", "text"].includes(a.tokens[0].type) && "tokens" in a.tokens[0] && a.tokens[0].tokens ? (a.tokens[0].raw = h7.raw + a.tokens[0].raw, a.tokens[0].text = h7.raw + a.tokens[0].text, a.tokens[0].tokens.unshift(h7)) : a.tokens.unshift({ type: "paragraph", raw: h7.raw, text: h7.raw, tokens: [h7] }) : a.tokens.unshift(h7);
              }
            } else a.task && (a.task = false);
            if (!r.loose) {
              let c = a.tokens.filter((d) => d.type === "space"), h7 = c.length > 0 && c.some((d) => this.rules.other.anyLine.test(d.raw));
              r.loose = h7;
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
          let n = ne(t[0]);
          return { type: "html", block: true, raw: n, pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: n };
        }
      }
      def(e) {
        let t = this.rules.block.def.exec(e);
        if (t) {
          let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
          return { type: "def", tag: n, raw: L(t[0], `
`), href: s, title: r };
        }
      }
      table(e) {
        let t = this.rules.block.table.exec(e);
        if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
        let n = te(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = { type: "table", raw: L(t[0], `
`), header: [], align: [], rows: [] };
        if (n.length === s.length) {
          for (let o of s) this.rules.other.tableAlignRight.test(o) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(o) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(o) ? i.align.push("left") : i.align.push(null);
          for (let o = 0; o < n.length; o++) i.header.push({ text: n[o], tokens: this.lexer.inline(n[o]), header: true, align: i.align[o] });
          for (let o of r) i.rows.push(te(o, i.header.length).map((p, a) => ({ text: p, tokens: this.lexer.inline(p), header: false, align: i.align[a] })));
          return i;
        }
      }
      lheading(e) {
        let t = this.rules.block.lheading.exec(e);
        if (t) {
          let n = t[1].trim();
          return { type: "heading", raw: L(t[0], `
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
            let i = L(n.slice(0, -1), "\\");
            if ((n.length - i.length) % 2 === 0) return;
          } else {
            let i = me(t[2], "()");
            if (i === -2) return;
            if (i > -1) {
              let p = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + i;
              t[2] = t[2].substring(0, i), t[0] = t[0].substring(0, p).trim(), t[3] = "";
            }
          }
          let s = t[2], r = "";
          if (this.options.pedantic) {
            let i = this.rules.other.pedanticHrefTitle.exec(s);
            i && (s = i[1], r = i[3]);
          } else r = t[3] ? t[3].slice(1, -1) : "";
          return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), be(t, { href: s && s.replace(this.rules.inline.anyPunctuation, "$1"), title: r && r.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
        }
      }
      reflink(e, t) {
        let n;
        if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
          let s = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), r = t[s.toLowerCase()];
          if (!r) {
            let i = n[0].charAt(0);
            return { type: "text", raw: i, text: i };
          }
          return be(n, r, n[0], this.lexer, this.rules);
        }
      }
      emStrong(e, t, n = "") {
        let s = this.rules.inline.emStrongLDelim.exec(e);
        if (!s || !s[1] && !s[2] && !s[3] && !s[4] || s[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
        if (!(s[1] || s[3] || "") || !n || this.rules.inline.punctuation.exec(n)) {
          let i = [...s[0]].length - 1, o, p, a = i, u = 0, c = s[0][0], h7 = n === c, d = c === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
          for (d.lastIndex = 0, t = t.slice(-1 * e.length + i); (s = d.exec(t)) !== null; ) {
            if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o) continue;
            if (p = [...o].length, s[3] || s[4]) {
              a += p;
              continue;
            } else if (s[5] || s[6]) {
              if (i % 3 && !((i + p) % 3)) {
                u += p;
                continue;
              }
              if (h7) break;
            }
            if (a -= p, a > 0) continue;
            p = Math.min(p, p + a + u);
            let T = [...s[0]][0].length, f = e.slice(0, i + s.index + T + p);
            if (Math.min(i, p) % 2) {
              let M = f.slice(1, -1);
              return { type: "em", raw: f, text: M, tokens: this.lexer.inlineTokens(M) };
            }
            let S = f.slice(2, -2);
            return { type: "strong", raw: f, text: S, tokens: this.lexer.inlineTokens(S) };
          }
        }
      }
      codespan(e) {
        let t = this.rules.inline.code.exec(e);
        if (t) {
          let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), s = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
          return s && r && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
        }
      }
      br(e) {
        let t = this.rules.inline.br.exec(e);
        if (t) return { type: "br", raw: t[0] };
      }
      del(e, t, n = "") {
        let s = this.rules.inline.delLDelim.exec(e);
        if (!s) return;
        if (!(s[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
          let i = [...s[0]].length - 1, o, p, a = i, u = this.rules.inline.delRDelim;
          for (u.lastIndex = 0, t = t.slice(-1 * e.length + i); (s = u.exec(t)) !== null; ) {
            if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o || (p = [...o].length, p !== i)) continue;
            if (s[3] || s[4]) {
              a += p;
              continue;
            }
            if (a -= p, a > 0) continue;
            p = Math.min(p, p + a);
            let c = [...s[0]][0].length, h7 = e.slice(0, i + s.index + c + p), d = h7.slice(i, -i);
            return { type: "del", raw: h7, text: d, tokens: this.lexer.inlineTokens(d) };
          }
        }
      }
      autolink(e) {
        let t = this.rules.inline.autolink.exec(e);
        if (t) {
          let n, s;
          return t[2] === "@" ? (n = t[1], s = "mailto:" + n) : (n = t[1], s = n), { type: "link", raw: t[0], text: n, href: s, tokens: [{ type: "text", raw: n, text: n }] };
        }
      }
      url(e) {
        let t;
        if (t = this.rules.inline.url.exec(e)) {
          let n, s;
          if (t[2] === "@") n = t[0], s = "mailto:" + n;
          else {
            let r;
            do
              r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
            while (r !== t[0]);
            n = t[0], t[1] === "www." ? s = "http://" + t[0] : s = t[0];
          }
          return { type: "link", raw: t[0], text: n, href: s, tokens: [{ type: "text", raw: n, text: n }] };
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
        let t = { other: m, block: Z.normal, inline: B.normal };
        this.options.pedantic ? (t.block = Z.pedantic, t.inline = B.pedantic) : this.options.gfm && (t.block = Z.gfm, this.options.breaks ? t.inline = B.breaks : t.inline = B.gfm), this.tokenizer.rules = t;
      }
      static get rules() {
        return { block: Z, inline: B };
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
        let s = 1 / 0;
        for (; e; ) {
          if (e.length < s) s = e.length;
          else {
            this.infiniteLoopError(e.charCodeAt(0));
            break;
          }
          let r;
          if (this.options.extensions?.block?.some((o) => (r = o.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), true) : false)) continue;
          if (r = this.tokenizer.space(e)) {
            e = e.substring(r.raw.length);
            let o = t.at(-1);
            r.raw.length === 1 && o !== void 0 ? o.raw += `
` : t.push(r);
            continue;
          }
          if (r = this.tokenizer.code(e)) {
            e = e.substring(r.raw.length);
            let o = t.at(-1);
            o?.type === "paragraph" || o?.type === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.text, this.inlineQueue.at(-1).src = o.text) : t.push(r);
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
            let o = t.at(-1);
            o?.type === "paragraph" || o?.type === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.raw, this.inlineQueue.at(-1).src = o.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = { href: r.href, title: r.title }, t.push(r));
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
            let o = 1 / 0, p = e.slice(1), a;
            this.options.extensions.startBlock.forEach((u) => {
              a = u.call({ lexer: this }, p), typeof a == "number" && a >= 0 && (o = Math.min(o, a));
            }), o < 1 / 0 && o >= 0 && (i = e.substring(0, o + 1));
          }
          if (this.state.top && (r = this.tokenizer.paragraph(i))) {
            let o = t.at(-1);
            n && o?.type === "paragraph" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : t.push(r), n = i.length !== e.length, e = e.substring(r.raw.length);
            continue;
          }
          if (r = this.tokenizer.text(e)) {
            e = e.substring(r.raw.length);
            let o = t.at(-1);
            o?.type === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : t.push(r);
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
          let o = Object.keys(this.tokens.links);
          o.length > 0 && (n = n.replace(this.tokenizer.rules.inline.reflinkSearch, (p) => o.includes(p.slice(p.lastIndexOf("[") + 1, -1)) ? "[" + "a".repeat(p.length - 2) + "]" : p));
        }
        n = n.replace(this.tokenizer.rules.inline.anyPunctuation, "++"), n = n.replace(this.tokenizer.rules.inline.blockSkip, (o, p, a) => {
          let u = a ? a.length : 0;
          return o.slice(0, u) + "[" + "a".repeat(o.length - u - 2) + "]";
        }), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
        let s = false, r = "", i = 1 / 0;
        for (; e; ) {
          if (e.length < i) i = e.length;
          else {
            this.infiniteLoopError(e.charCodeAt(0));
            break;
          }
          s || (r = ""), s = false;
          let o;
          if (this.options.extensions?.inline?.some((a) => (o = a.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), true) : false)) continue;
          if (o = this.tokenizer.escape(e)) {
            e = e.substring(o.raw.length), t.push(o);
            continue;
          }
          if (o = this.tokenizer.tag(e)) {
            e = e.substring(o.raw.length), t.push(o);
            continue;
          }
          if (o = this.tokenizer.link(e)) {
            e = e.substring(o.raw.length), t.push(o);
            continue;
          }
          if (o = this.tokenizer.reflink(e, this.tokens.links)) {
            e = e.substring(o.raw.length);
            let a = t.at(-1);
            o.type === "text" && a?.type === "text" ? (a.raw += o.raw, a.text += o.text) : t.push(o);
            continue;
          }
          if (o = this.tokenizer.emStrong(e, n, r)) {
            e = e.substring(o.raw.length), t.push(o);
            continue;
          }
          if (o = this.tokenizer.codespan(e)) {
            e = e.substring(o.raw.length), t.push(o);
            continue;
          }
          if (o = this.tokenizer.br(e)) {
            e = e.substring(o.raw.length), t.push(o);
            continue;
          }
          if (o = this.tokenizer.del(e, n, r)) {
            e = e.substring(o.raw.length), t.push(o);
            continue;
          }
          if (o = this.tokenizer.autolink(e)) {
            e = e.substring(o.raw.length), t.push(o);
            continue;
          }
          if (!this.state.inLink && (o = this.tokenizer.url(e))) {
            e = e.substring(o.raw.length), t.push(o);
            continue;
          }
          let p = e;
          if (this.options.extensions?.startInline) {
            let a = 1 / 0, u = e.slice(1), c;
            this.options.extensions.startInline.forEach((h7) => {
              c = h7.call({ lexer: this }, u), typeof c == "number" && c >= 0 && (a = Math.min(a, c));
            }), a < 1 / 0 && a >= 0 && (p = e.substring(0, a + 1));
          }
          if (o = this.tokenizer.inlineText(p)) {
            e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (r = o.raw.slice(-1)), s = true;
            let a = t.at(-1);
            a?.type === "text" ? (a.raw += o.raw, a.text += o.text) : t.push(o);
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
        let s = (t || "").match(m.notSpaceStart)?.[0], r = e.replace(m.endingNewline, "") + `
`;
        return s ? '<pre><code class="language-' + O(s) + '">' + (n ? r : O(r, true)) + `</code></pre>
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
        let t = e.ordered, n = e.start, s = "";
        for (let o = 0; o < e.items.length; o++) {
          let p = e.items[o];
          s += this.listitem(p);
        }
        let r = t ? "ol" : "ul", i = t && n !== 1 ? ' start="' + n + '"' : "";
        return "<" + r + i + `>
` + s + "</" + r + `>
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
        let s = "";
        for (let r = 0; r < e.rows.length; r++) {
          let i = e.rows[r];
          n = "";
          for (let o = 0; o < i.length; o++) n += this.tablecell(i[o]);
          s += this.tablerow({ text: n });
        }
        return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + s + `</table>
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
        let s = this.parser.parseInline(n), r = ee(e);
        if (r === null) return s;
        e = r;
        let i = '<a href="' + e + '"';
        return t && (i += ' title="' + O(t) + '"'), i += ">" + s + "</a>", i;
      }
      image({ href: e, title: t, text: n, tokens: s }) {
        s && (n = this.parser.parseInline(s, this.parser.textRenderer));
        let r = ee(e);
        if (r === null) return O(n);
        e = r;
        let i = `<img src="${e}" alt="${O(n)}"`;
        return t && (i += ` title="${O(t)}"`), i += ">", i;
      }
      text(e) {
        return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : O(e.text);
      }
    };
    var _ = class {
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
    var b = class l {
      constructor(e) {
        __publicField(this, "options");
        __publicField(this, "renderer");
        __publicField(this, "textRenderer");
        this.options = e || R, this.options.renderer = this.options.renderer || new y(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new _();
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
          let s = e[n];
          if (this.options.extensions?.renderers?.[s.type]) {
            let i = s, o = this.options.extensions.renderers[i.type].call({ parser: this }, i);
            if (o !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(i.type)) {
              t += o || "";
              continue;
            }
          }
          let r = s;
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
        for (let s = 0; s < e.length; s++) {
          let r = e[s];
          if (this.options.extensions?.renderers?.[r.type]) {
            let o = this.options.extensions.renderers[r.type].call({ parser: this }, r);
            if (o !== false || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
              n += o || "";
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
              let o = 'Token with "' + i.type + '" type was not found.';
              if (this.options.silent) return console.error(o), "";
              throw new Error(o);
            }
          }
        }
        return n;
      }
    };
    var P = (_a = class {
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
        return e ? b.parse : b.parseInline;
      }
    }, __publicField(_a, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), __publicField(_a, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), _a);
    var D = class {
      constructor(...e) {
        __publicField(this, "defaults", z());
        __publicField(this, "options", this.setOptions);
        __publicField(this, "parse", this.parseMarkdown(true));
        __publicField(this, "parseInline", this.parseMarkdown(false));
        __publicField(this, "Parser", b);
        __publicField(this, "Renderer", y);
        __publicField(this, "TextRenderer", _);
        __publicField(this, "Lexer", x);
        __publicField(this, "Tokenizer", w);
        __publicField(this, "Hooks", P);
        this.use(...e);
      }
      walkTokens(e, t) {
        let n = [];
        for (let s of e) switch (n = n.concat(t.call(this, s)), s.type) {
          case "table": {
            let r = s;
            for (let i of r.header) n = n.concat(this.walkTokens(i.tokens, t));
            for (let i of r.rows) for (let o of i) n = n.concat(this.walkTokens(o.tokens, t));
            break;
          }
          case "list": {
            let r = s;
            n = n.concat(this.walkTokens(r.items, t));
            break;
          }
          default: {
            let r = s;
            this.defaults.extensions?.childTokens?.[r.type] ? this.defaults.extensions.childTokens[r.type].forEach((i) => {
              let o = r[i].flat(1 / 0);
              n = n.concat(this.walkTokens(o, t));
            }) : r.tokens && (n = n.concat(this.walkTokens(r.tokens, t)));
          }
        }
        return n;
      }
      use(...e) {
        let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
        return e.forEach((n) => {
          let s = { ...n };
          if (s.async = this.defaults.async || s.async || false, n.extensions && (n.extensions.forEach((r) => {
            if (!r.name) throw new Error("extension name required");
            if ("renderer" in r) {
              let i = t.renderers[r.name];
              i ? t.renderers[r.name] = function(...o) {
                let p = r.renderer.apply(this, o);
                return p === false && (p = i.apply(this, o)), p;
              } : t.renderers[r.name] = r.renderer;
            }
            if ("tokenizer" in r) {
              if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
              let i = t[r.level];
              i ? i.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
            }
            "childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
          }), s.extensions = t), n.renderer) {
            let r = this.defaults.renderer || new y(this.defaults);
            for (let i in n.renderer) {
              if (!(i in r)) throw new Error(`renderer '${i}' does not exist`);
              if (["options", "parser"].includes(i)) continue;
              let o = i, p = n.renderer[o], a = r[o];
              r[o] = (...u) => {
                let c = p.apply(r, u);
                return c === false && (c = a.apply(r, u)), c || "";
              };
            }
            s.renderer = r;
          }
          if (n.tokenizer) {
            let r = this.defaults.tokenizer || new w(this.defaults);
            for (let i in n.tokenizer) {
              if (!(i in r)) throw new Error(`tokenizer '${i}' does not exist`);
              if (["options", "rules", "lexer"].includes(i)) continue;
              let o = i, p = n.tokenizer[o], a = r[o];
              r[o] = (...u) => {
                let c = p.apply(r, u);
                return c === false && (c = a.apply(r, u)), c;
              };
            }
            s.tokenizer = r;
          }
          if (n.hooks) {
            let r = this.defaults.hooks || new P();
            for (let i in n.hooks) {
              if (!(i in r)) throw new Error(`hook '${i}' does not exist`);
              if (["options", "block"].includes(i)) continue;
              let o = i, p = n.hooks[o], a = r[o];
              P.passThroughHooks.has(i) ? r[o] = (u) => {
                if (this.defaults.async && P.passThroughHooksRespectAsync.has(i)) return (async () => {
                  let h7 = await p.call(r, u);
                  return a.call(r, h7);
                })();
                let c = p.call(r, u);
                return a.call(r, c);
              } : r[o] = (...u) => {
                if (this.defaults.async) return (async () => {
                  let h7 = await p.apply(r, u);
                  return h7 === false && (h7 = await a.apply(r, u)), h7;
                })();
                let c = p.apply(r, u);
                return c === false && (c = a.apply(r, u)), c;
              };
            }
            s.hooks = r;
          }
          if (n.walkTokens) {
            let r = this.defaults.walkTokens, i = n.walkTokens;
            s.walkTokens = function(o) {
              let p = [];
              return p.push(i.call(this, o)), r && (p = p.concat(r.call(this, o))), p;
            };
          }
          this.defaults = { ...this.defaults, ...s };
        }), this;
      }
      setOptions(e) {
        return this.defaults = { ...this.defaults, ...e }, this;
      }
      lexer(e, t) {
        return x.lex(e, t ?? this.defaults);
      }
      parser(e, t) {
        return b.parse(e, t ?? this.defaults);
      }
      parseMarkdown(e) {
        return (n, s) => {
          let r = { ...s }, i = { ...this.defaults, ...r }, o = this.onError(!!i.silent, !!i.async);
          if (this.defaults.async === true && r.async === false) return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
          if (typeof n > "u" || n === null) return o(new Error("marked(): input parameter is undefined or null"));
          if (typeof n != "string") return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
          if (i.hooks && (i.hooks.options = i, i.hooks.block = e), i.async) return (async () => {
            let p = i.hooks ? await i.hooks.preprocess(n) : n, u = await (i.hooks ? await i.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(p, i), c = i.hooks ? await i.hooks.processAllTokens(u) : u;
            i.walkTokens && await Promise.all(this.walkTokens(c, i.walkTokens));
            let d = await (i.hooks ? await i.hooks.provideParser(e) : e ? b.parse : b.parseInline)(c, i);
            return i.hooks ? await i.hooks.postprocess(d) : d;
          })().catch(o);
          try {
            i.hooks && (n = i.hooks.preprocess(n));
            let a = (i.hooks ? i.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(n, i);
            i.hooks && (a = i.hooks.processAllTokens(a)), i.walkTokens && this.walkTokens(a, i.walkTokens);
            let c = (i.hooks ? i.hooks.provideParser(e) : e ? b.parse : b.parseInline)(a, i);
            return i.hooks && (c = i.hooks.postprocess(c)), c;
          } catch (p) {
            return o(p);
          }
        };
      }
      onError(e, t) {
        return (n) => {
          if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
            let s = "<p>An error occurred:</p><pre>" + O(n.message + "", true) + "</pre>";
            return t ? Promise.resolve(s) : s;
          }
          if (t) return Promise.reject(n);
          throw n;
        };
      }
    };
    var C = new D();
    function g(l, e) {
      return C.parse(l, e);
    }
    g.options = g.setOptions = function(l) {
      return C.setOptions(l), g.defaults = C.defaults, F(g.defaults), g;
    };
    g.getDefaults = z;
    g.defaults = R;
    function Re(...l) {
      return C.use(...l), g.defaults = C.defaults, F(g.defaults), g;
    }
    g.use = Re;
    g.walkTokens = function(l, e) {
      return C.walkTokens(l, e);
    };
    g.parseInline = C.parseInline;
    g.Parser = b;
    g.parser = b.parse;
    g.Renderer = y;
    g.TextRenderer = _;
    g.Lexer = x;
    g.lexer = x.lex;
    g.Tokenizer = w;
    g.Hooks = P;
    g.parse = g;
    var Ot = g.options, wt = g.setOptions, yt = g.walkTokens, Pt = g.parseInline, St = g, _t = b.parse, $t = x.lex;
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

// src/client/vendor/codemirror.js
var _cmApi = null;
function cmApi() {
  if (_cmApi === null) {
    _cmApi = (function() {
      const module2 = { exports: {} };
      const exports = module2.exports;
      var Ur = Object.defineProperty;
      var Ad = Object.getOwnPropertyDescriptor;
      var Xd = Object.getOwnPropertyNames;
      var Rd = Object.prototype.hasOwnProperty;
      var Md = (n, e) => {
        for (var t in e) Ur(n, t, { get: e[t], enumerable: true });
      }, Ld = (n, e, t, i) => {
        if (e && typeof e == "object" || typeof e == "function") for (let r of Xd(e)) !Rd.call(n, r) && r !== t && Ur(n, r, { get: () => e[r], enumerable: !(i = Ad(e, r)) || i.enumerable });
        return n;
      };
      var Ed = (n) => Ld(Ur({}, "__esModule", { value: true }), n);
      var $S = {};
      Md($S, { EditorState: () => D, EditorView: () => C, HighlightStyle: () => wi, bracketMatching: () => Mc, css: () => jr, defaultKeymap: () => $f, highlightActiveLine: () => ec, highlightActiveLineGutter: () => ic, history: () => Ic, historyKeymap: () => Fc, html: () => _r, indentOnInput: () => vc, indentWithTab: () => Pf, javascript: () => Lr, keymap: () => Gt, lineNumbers: () => tc, markdown: () => Zd, syntaxHighlighting: () => Zc, tags: () => p });
      module2.exports = Ed($S);
      var Hr = [], aa = [];
      (() => {
        let n = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((e) => e ? parseInt(e, 36) : 1);
        for (let e = 0, t = 0; e < n.length; e++) (e % 2 ? aa : Hr).push(t = t + n[e]);
      })();
      function jd(n) {
        if (n < 768) return false;
        for (let e = 0, t = Hr.length; ; ) {
          let i = e + t >> 1;
          if (n < Hr[i]) t = i;
          else if (n >= aa[i]) e = i + 1;
          else return true;
          if (e == t) return false;
        }
      }
      function sa(n) {
        return n >= 127462 && n <= 127487;
      }
      var oa = 8205;
      function ha(n, e, t = true, i = true) {
        return (t ? ca : zd)(n, e, i);
      }
      function ca(n, e, t) {
        if (e == n.length) return e;
        e && fa(n.charCodeAt(e)) && ua(n.charCodeAt(e - 1)) && e--;
        let i = Fr(n, e);
        for (e += la(i); e < n.length; ) {
          let r = Fr(n, e);
          if (i == oa || r == oa || t && jd(r)) e += la(r), i = r;
          else if (sa(r)) {
            let s = 0, o = e - 2;
            for (; o >= 0 && sa(Fr(n, o)); ) s++, o -= 2;
            if (s % 2 == 0) break;
            e += 2;
          } else break;
        }
        return e;
      }
      function zd(n, e, t) {
        for (; e > 1; ) {
          let i = ca(n, e - 2, t);
          if (i < e) return i;
          e--;
        }
        return 0;
      }
      function Fr(n, e) {
        let t = n.charCodeAt(e);
        if (!ua(t) || e + 1 == n.length) return t;
        let i = n.charCodeAt(e + 1);
        return fa(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
      }
      function fa(n) {
        return n >= 56320 && n < 57344;
      }
      function ua(n) {
        return n >= 55296 && n < 56320;
      }
      function la(n) {
        return n < 65536 ? 1 : 2;
      }
      var M = class n {
        lineAt(e) {
          if (e < 0 || e > this.length) throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);
          return this.lineInner(e, false, 1, 0);
        }
        line(e) {
          if (e < 1 || e > this.lines) throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
          return this.lineInner(e, true, 1, 0);
        }
        replace(e, t, i) {
          [e, t] = ai(this, e, t);
          let r = [];
          return this.decompose(0, e, r, 2), i.length && i.decompose(0, i.length, r, 3), this.decompose(t, this.length, r, 1), si.from(r, this.length - (t - e) + i.length);
        }
        append(e) {
          return this.replace(this.length, this.length, e);
        }
        slice(e, t = this.length) {
          [e, t] = ai(this, e, t);
          let i = [];
          return this.decompose(e, t, i, 0), si.from(i, t - e);
        }
        eq(e) {
          if (e == this) return true;
          if (e.length != this.length || e.lines != this.lines) return false;
          let t = this.scanIdentical(e, 1), i = this.length - this.scanIdentical(e, -1), r = new Yt(this), s = new Yt(e);
          for (let o = t, l = t; ; ) {
            if (r.next(o), s.next(o), o = 0, r.lineBreak != s.lineBreak || r.done != s.done || r.value != s.value) return false;
            if (l += r.value.length, r.done || l >= i) return true;
          }
        }
        iter(e = 1) {
          return new Yt(this, e);
        }
        iterRange(e, t = this.length) {
          return new An(this, e, t);
        }
        iterLines(e, t) {
          let i;
          if (e == null) i = this.iter();
          else {
            t == null && (t = this.lines + 1);
            let r = this.line(e).from;
            i = this.iterRange(r, Math.max(r, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
          }
          return new Xn(i);
        }
        toString() {
          return this.sliceString(0);
        }
        toJSON() {
          let e = [];
          return this.flatten(e), e;
        }
        constructor() {
        }
        static of(e) {
          if (e.length == 0) throw new RangeError("A document must have at least one line");
          return e.length == 1 && !e[0] ? n.empty : e.length <= 32 ? new be(e) : si.from(be.split(e, []));
        }
      }, be = class n extends M {
        constructor(e, t = Yd(e)) {
          super(), this.text = e, this.length = t;
        }
        get lines() {
          return this.text.length;
        }
        get children() {
          return null;
        }
        lineInner(e, t, i, r) {
          for (let s = 0; ; s++) {
            let o = this.text[s], l = r + o.length;
            if ((t ? i : l) >= e) return new Jr(r, l, i, o);
            r = l + 1, i++;
          }
        }
        decompose(e, t, i, r) {
          let s = e <= 0 && t >= this.length ? this : new n(da(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
          if (r & 1) {
            let o = i.pop(), l = Zn(s.text, o.text.slice(), 0, s.length);
            if (l.length <= 32) i.push(new n(l, o.length + s.length));
            else {
              let a = l.length >> 1;
              i.push(new n(l.slice(0, a)), new n(l.slice(a)));
            }
          } else i.push(s);
        }
        replace(e, t, i) {
          if (!(i instanceof n)) return super.replace(e, t, i);
          [e, t] = ai(this, e, t);
          let r = Zn(this.text, Zn(i.text, da(this.text, 0, e)), t), s = this.length + i.length - (t - e);
          return r.length <= 32 ? new n(r, s) : si.from(n.split(r, []), s);
        }
        sliceString(e, t = this.length, i = `
`) {
          [e, t] = ai(this, e, t);
          let r = "";
          for (let s = 0, o = 0; s <= t && o < this.text.length; o++) {
            let l = this.text[o], a = s + l.length;
            s > e && o && (r += i), e < a && t > s && (r += l.slice(Math.max(0, e - s), t - s)), s = a + 1;
          }
          return r;
        }
        flatten(e) {
          for (let t of this.text) e.push(t);
        }
        scanIdentical() {
          return 0;
        }
        static split(e, t) {
          let i = [], r = -1;
          for (let s of e) i.push(s), r += s.length + 1, i.length == 32 && (t.push(new n(i, r)), i = [], r = -1);
          return r > -1 && t.push(new n(i, r)), t;
        }
      }, si = class n extends M {
        constructor(e, t) {
          super(), this.children = e, this.length = t, this.lines = 0;
          for (let i of e) this.lines += i.lines;
        }
        lineInner(e, t, i, r) {
          for (let s = 0; ; s++) {
            let o = this.children[s], l = r + o.length, a = i + o.lines - 1;
            if ((t ? a : l) >= e) return o.lineInner(e, t, i, r);
            r = l + 1, i = a + 1;
          }
        }
        decompose(e, t, i, r) {
          for (let s = 0, o = 0; o <= t && s < this.children.length; s++) {
            let l = this.children[s], a = o + l.length;
            if (e <= a && t >= o) {
              let h7 = r & ((o <= e ? 1 : 0) | (a >= t ? 2 : 0));
              o >= e && a <= t && !h7 ? i.push(l) : l.decompose(e - o, t - o, i, h7);
            }
            o = a + 1;
          }
        }
        replace(e, t, i) {
          if ([e, t] = ai(this, e, t), i.lines < this.lines) for (let r = 0, s = 0; r < this.children.length; r++) {
            let o = this.children[r], l = s + o.length;
            if (e >= s && t <= l) {
              let a = o.replace(e - s, t - s, i), h7 = this.lines - o.lines + a.lines;
              if (a.lines < h7 >> 4 && a.lines > h7 >> 6) {
                let c = this.children.slice();
                return c[r] = a, new n(c, this.length - (t - e) + i.length);
              }
              return super.replace(s, l, a);
            }
            s = l + 1;
          }
          return super.replace(e, t, i);
        }
        sliceString(e, t = this.length, i = `
`) {
          [e, t] = ai(this, e, t);
          let r = "";
          for (let s = 0, o = 0; s < this.children.length && o <= t; s++) {
            let l = this.children[s], a = o + l.length;
            o > e && s && (r += i), e < a && t > o && (r += l.sliceString(e - o, t - o, i)), o = a + 1;
          }
          return r;
        }
        flatten(e) {
          for (let t of this.children) t.flatten(e);
        }
        scanIdentical(e, t) {
          if (!(e instanceof n)) return 0;
          let i = 0, [r, s, o, l] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
          for (; ; r += t, s += t) {
            if (r == o || s == l) return i;
            let a = this.children[r], h7 = e.children[s];
            if (a != h7) return i + a.scanIdentical(h7, t);
            i += a.length + 1;
          }
        }
        static from(e, t = e.reduce((i, r) => i + r.length + 1, -1)) {
          let i = 0;
          for (let d of e) i += d.lines;
          if (i < 32) {
            let d = [];
            for (let O of e) O.flatten(d);
            return new be(d, t);
          }
          let r = Math.max(32, i >> 5), s = r << 1, o = r >> 1, l = [], a = 0, h7 = -1, c = [];
          function f(d) {
            let O;
            if (d.lines > s && d instanceof n) for (let m of d.children) f(m);
            else d.lines > o && (a > o || !a) ? (u(), l.push(d)) : d instanceof be && a && (O = c[c.length - 1]) instanceof be && d.lines + O.lines <= 32 ? (a += d.lines, h7 += d.length + 1, c[c.length - 1] = new be(O.text.concat(d.text), O.length + 1 + d.length)) : (a + d.lines > r && u(), a += d.lines, h7 += d.length + 1, c.push(d));
          }
          function u() {
            a != 0 && (l.push(c.length == 1 ? c[0] : n.from(c, h7)), h7 = -1, a = c.length = 0);
          }
          for (let d of e) f(d);
          return u(), l.length == 1 ? l[0] : new n(l, t);
        }
      };
      M.empty = new be([""], 0);
      function Yd(n) {
        let e = -1;
        for (let t of n) e += t.length + 1;
        return e;
      }
      function Zn(n, e, t = 0, i = 1e9) {
        for (let r = 0, s = 0, o = true; s < n.length && r <= i; s++) {
          let l = n[s], a = r + l.length;
          a >= t && (a > i && (l = l.slice(0, i - r)), r < t && (l = l.slice(t - r)), o ? (e[e.length - 1] += l, o = false) : e.push(l)), r = a + 1;
        }
        return e;
      }
      function da(n, e, t) {
        return Zn(n, [""], e, t);
      }
      var Yt = class {
        constructor(e, t = 1) {
          this.dir = t, this.done = false, this.lineBreak = false, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof be ? e.text.length : e.children.length) << 1];
        }
        nextInner(e, t) {
          for (this.done = this.lineBreak = false; ; ) {
            let i = this.nodes.length - 1, r = this.nodes[i], s = this.offsets[i], o = s >> 1, l = r instanceof be ? r.text.length : r.children.length;
            if (o == (t > 0 ? l : 0)) {
              if (i == 0) return this.done = true, this.value = "", this;
              t > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
            } else if ((s & 1) == (t > 0 ? 0 : 1)) {
              if (this.offsets[i] += t, e == 0) return this.lineBreak = true, this.value = `
`, this;
              e--;
            } else if (r instanceof be) {
              let a = r.text[o + (t < 0 ? -1 : 0)];
              if (this.offsets[i] += t, a.length > Math.max(0, e)) return this.value = e == 0 ? a : t > 0 ? a.slice(e) : a.slice(0, a.length - e), this;
              e -= a.length;
            } else {
              let a = r.children[o + (t < 0 ? -1 : 0)];
              e > a.length ? (e -= a.length, this.offsets[i] += t) : (t < 0 && this.offsets[i]--, this.nodes.push(a), this.offsets.push(t > 0 ? 1 : (a instanceof be ? a.text.length : a.children.length) << 1));
            }
          }
        }
        next(e = 0) {
          return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
        }
      }, An = class {
        constructor(e, t, i) {
          this.value = "", this.done = false, this.cursor = new Yt(e, t > i ? -1 : 1), this.pos = t > i ? e.length : 0, this.from = Math.min(t, i), this.to = Math.max(t, i);
        }
        nextInner(e, t) {
          if (t < 0 ? this.pos <= this.from : this.pos >= this.to) return this.value = "", this.done = true, this;
          e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
          let i = t < 0 ? this.pos - this.from : this.to - this.pos;
          e > i && (e = i), i -= e;
          let { value: r } = this.cursor.next(e);
          return this.pos += (r.length + e) * t, this.value = r.length <= i ? r : t < 0 ? r.slice(r.length - i) : r.slice(0, i), this.done = !this.value, this;
        }
        next(e = 0) {
          return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
        }
        get lineBreak() {
          return this.cursor.lineBreak && this.value != "";
        }
      }, Xn = class {
        constructor(e) {
          this.inner = e, this.afterBreak = true, this.value = "", this.done = false;
        }
        next(e = 0) {
          let { done: t, lineBreak: i, value: r } = this.inner.next(e);
          return t && this.afterBreak ? (this.value = "", this.afterBreak = false) : t ? (this.done = true, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = true, this.next()) : (this.value = r, this.afterBreak = false), this;
        }
        get lineBreak() {
          return false;
        }
      };
      typeof Symbol < "u" && (M.prototype[Symbol.iterator] = function() {
        return this.iter();
      }, Yt.prototype[Symbol.iterator] = An.prototype[Symbol.iterator] = Xn.prototype[Symbol.iterator] = function() {
        return this;
      });
      var Jr = class {
        constructor(e, t, i, r) {
          this.from = e, this.to = t, this.number = i, this.text = r;
        }
        get length() {
          return this.to - this.from;
        }
      };
      function ai(n, e, t) {
        return e = Math.max(0, Math.min(n.length, e)), [e, Math.max(e, Math.min(n.length, t))];
      }
      function ie(n, e, t = true, i = true) {
        return ha(n, e, t, i);
      }
      function _d(n) {
        return n >= 56320 && n < 57344;
      }
      function Vd(n) {
        return n >= 55296 && n < 56320;
      }
      function us(n, e) {
        let t = n.charCodeAt(e);
        if (!Vd(t) || e + 1 == n.length) return t;
        let i = n.charCodeAt(e + 1);
        return _d(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
      }
      function ds(n) {
        return n < 65536 ? 1 : 2;
      }
      var es = /\r\n?|\n/, se = (function(n) {
        return n[n.Simple = 0] = "Simple", n[n.TrackDel = 1] = "TrackDel", n[n.TrackBefore = 2] = "TrackBefore", n[n.TrackAfter = 3] = "TrackAfter", n;
      })(se || (se = {})), nt = class n {
        constructor(e) {
          this.sections = e;
        }
        get length() {
          let e = 0;
          for (let t = 0; t < this.sections.length; t += 2) e += this.sections[t];
          return e;
        }
        get newLength() {
          let e = 0;
          for (let t = 0; t < this.sections.length; t += 2) {
            let i = this.sections[t + 1];
            e += i < 0 ? this.sections[t] : i;
          }
          return e;
        }
        get empty() {
          return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
        }
        iterGaps(e) {
          for (let t = 0, i = 0, r = 0; t < this.sections.length; ) {
            let s = this.sections[t++], o = this.sections[t++];
            o < 0 ? (e(i, r, s), r += s) : r += o, i += s;
          }
        }
        iterChangedRanges(e, t = false) {
          ts(this, e, t);
        }
        get invertedDesc() {
          let e = [];
          for (let t = 0; t < this.sections.length; ) {
            let i = this.sections[t++], r = this.sections[t++];
            r < 0 ? e.push(i, r) : e.push(r, i);
          }
          return new n(e);
        }
        composeDesc(e) {
          return this.empty ? e : e.empty ? this : Sa(this, e);
        }
        mapDesc(e, t = false) {
          return e.empty ? this : is(this, e, t);
        }
        mapPos(e, t = -1, i = se.Simple) {
          let r = 0, s = 0;
          for (let o = 0; o < this.sections.length; ) {
            let l = this.sections[o++], a = this.sections[o++], h7 = r + l;
            if (a < 0) {
              if (h7 > e) return s + (e - r);
              s += l;
            } else {
              if (i != se.Simple && h7 >= e && (i == se.TrackDel && r < e && h7 > e || i == se.TrackBefore && r < e || i == se.TrackAfter && h7 > e)) return null;
              if (h7 > e || h7 == e && t < 0 && !l) return e == r || t < 0 ? s : s + a;
              s += a;
            }
            r = h7;
          }
          if (e > r) throw new RangeError(`Position ${e} is out of range for changeset of length ${r}`);
          return s;
        }
        touchesRange(e, t = e) {
          for (let i = 0, r = 0; i < this.sections.length && r <= t; ) {
            let s = this.sections[i++], o = this.sections[i++], l = r + s;
            if (o >= 0 && r <= t && l >= e) return r < e && l > t ? "cover" : true;
            r = l;
          }
          return false;
        }
        toString() {
          let e = "";
          for (let t = 0; t < this.sections.length; ) {
            let i = this.sections[t++], r = this.sections[t++];
            e += (e ? " " : "") + i + (r >= 0 ? ":" + r : "");
          }
          return e;
        }
        toJSON() {
          return this.sections;
        }
        static fromJSON(e) {
          if (!Array.isArray(e) || e.length % 2 || e.some((t) => typeof t != "number")) throw new RangeError("Invalid JSON representation of ChangeDesc");
          return new n(e);
        }
        static create(e) {
          return new n(e);
        }
      }, ae = class n extends nt {
        constructor(e, t) {
          super(e), this.inserted = t;
        }
        apply(e) {
          if (this.length != e.length) throw new RangeError("Applying change set to a document with the wrong length");
          return ts(this, (t, i, r, s, o) => e = e.replace(r, r + (i - t), o), false), e;
        }
        mapDesc(e, t = false) {
          return is(this, e, t, true);
        }
        invert(e) {
          let t = this.sections.slice(), i = [];
          for (let r = 0, s = 0; r < t.length; r += 2) {
            let o = t[r], l = t[r + 1];
            if (l >= 0) {
              t[r] = l, t[r + 1] = o;
              let a = r >> 1;
              for (; i.length < a; ) i.push(M.empty);
              i.push(o ? e.slice(s, s + o) : M.empty);
            }
            s += o;
          }
          return new n(t, i);
        }
        compose(e) {
          return this.empty ? e : e.empty ? this : Sa(this, e, true);
        }
        map(e, t = false) {
          return e.empty ? this : is(this, e, t, true);
        }
        iterChanges(e, t = false) {
          ts(this, e, t);
        }
        get desc() {
          return nt.create(this.sections);
        }
        filter(e) {
          let t = [], i = [], r = [], s = new _t(this);
          e: for (let o = 0, l = 0; ; ) {
            let a = o == e.length ? 1e9 : e[o++];
            for (; l < a || l == a && s.len == 0; ) {
              if (s.done) break e;
              let c = Math.min(s.len, a - l);
              oe(r, c, -1);
              let f = s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0;
              oe(t, c, f), f > 0 && pt(i, t, s.text), s.forward(c), l += c;
            }
            let h7 = e[o++];
            for (; l < h7; ) {
              if (s.done) break e;
              let c = Math.min(s.len, h7 - l);
              oe(t, c, -1), oe(r, c, s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0), s.forward(c), l += c;
            }
          }
          return { changes: new n(t, i), filtered: nt.create(r) };
        }
        toJSON() {
          let e = [];
          for (let t = 0; t < this.sections.length; t += 2) {
            let i = this.sections[t], r = this.sections[t + 1];
            r < 0 ? e.push(i) : r == 0 ? e.push([i]) : e.push([i].concat(this.inserted[t >> 1].toJSON()));
          }
          return e;
        }
        static of(e, t, i) {
          let r = [], s = [], o = 0, l = null;
          function a(c = false) {
            if (!c && !r.length) return;
            o < t && oe(r, t - o, -1);
            let f = new n(r, s);
            l = l ? l.compose(f.map(l)) : f, r = [], s = [], o = 0;
          }
          function h7(c) {
            if (Array.isArray(c)) for (let f of c) h7(f);
            else if (c instanceof n) {
              if (c.length != t) throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);
              a(), l = l ? l.compose(c.map(l)) : c;
            } else {
              let { from: f, to: u = f, insert: d } = c;
              if (f > u || f < 0 || u > t) throw new RangeError(`Invalid change range ${f} to ${u} (in doc of length ${t})`);
              let O = d ? typeof d == "string" ? M.of(d.split(i || es)) : d : M.empty, m = O.length;
              if (f == u && m == 0) return;
              f < o && a(), f > o && oe(r, f - o, -1), oe(r, u - f, m), pt(s, r, O), o = u;
            }
          }
          return h7(e), a(!l), l;
        }
        static empty(e) {
          return new n(e ? [e, -1] : [], []);
        }
        static fromJSON(e) {
          if (!Array.isArray(e)) throw new RangeError("Invalid JSON representation of ChangeSet");
          let t = [], i = [];
          for (let r = 0; r < e.length; r++) {
            let s = e[r];
            if (typeof s == "number") t.push(s, -1);
            else {
              if (!Array.isArray(s) || typeof s[0] != "number" || s.some((o, l) => l && typeof o != "string")) throw new RangeError("Invalid JSON representation of ChangeSet");
              if (s.length == 1) t.push(s[0], 0);
              else {
                for (; i.length < r; ) i.push(M.empty);
                i[r] = M.of(s.slice(1)), t.push(s[0], i[r].length);
              }
            }
          }
          return new n(t, i);
        }
        static createSet(e, t) {
          return new n(e, t);
        }
      };
      function oe(n, e, t, i = false) {
        if (e == 0 && t <= 0) return;
        let r = n.length - 2;
        r >= 0 && t <= 0 && t == n[r + 1] ? n[r] += e : r >= 0 && e == 0 && n[r] == 0 ? n[r + 1] += t : i ? (n[r] += e, n[r + 1] += t) : n.push(e, t);
      }
      function pt(n, e, t) {
        if (t.length == 0) return;
        let i = e.length - 2 >> 1;
        if (i < n.length) n[n.length - 1] = n[n.length - 1].append(t);
        else {
          for (; n.length < i; ) n.push(M.empty);
          n.push(t);
        }
      }
      function ts(n, e, t) {
        let i = n.inserted;
        for (let r = 0, s = 0, o = 0; o < n.sections.length; ) {
          let l = n.sections[o++], a = n.sections[o++];
          if (a < 0) r += l, s += l;
          else {
            let h7 = r, c = s, f = M.empty;
            for (; h7 += l, c += a, a && i && (f = f.append(i[o - 2 >> 1])), !(t || o == n.sections.length || n.sections[o + 1] < 0); ) l = n.sections[o++], a = n.sections[o++];
            e(r, h7, s, c, f), r = h7, s = c;
          }
        }
      }
      function is(n, e, t, i = false) {
        let r = [], s = i ? [] : null, o = new _t(n), l = new _t(e);
        for (let a = -1; ; ) {
          if (o.done && l.len || l.done && o.len) throw new Error("Mismatched change set lengths");
          if (o.ins == -1 && l.ins == -1) {
            let h7 = Math.min(o.len, l.len);
            oe(r, h7, -1), o.forward(h7), l.forward(h7);
          } else if (l.ins >= 0 && (o.ins < 0 || a == o.i || o.off == 0 && (l.len < o.len || l.len == o.len && !t))) {
            let h7 = l.len;
            for (oe(r, l.ins, -1); h7; ) {
              let c = Math.min(o.len, h7);
              o.ins >= 0 && a < o.i && o.len <= c && (oe(r, 0, o.ins), s && pt(s, r, o.text), a = o.i), o.forward(c), h7 -= c;
            }
            l.next();
          } else if (o.ins >= 0) {
            let h7 = 0, c = o.len;
            for (; c; ) if (l.ins == -1) {
              let f = Math.min(c, l.len);
              h7 += f, c -= f, l.forward(f);
            } else if (l.ins == 0 && l.len < c) c -= l.len, l.next();
            else break;
            oe(r, h7, a < o.i ? o.ins : 0), s && a < o.i && pt(s, r, o.text), a = o.i, o.forward(o.len - c);
          } else {
            if (o.done && l.done) return s ? ae.createSet(r, s) : nt.create(r);
            throw new Error("Mismatched change set lengths");
          }
        }
      }
      function Sa(n, e, t = false) {
        let i = [], r = t ? [] : null, s = new _t(n), o = new _t(e);
        for (let l = false; ; ) {
          if (s.done && o.done) return r ? ae.createSet(i, r) : nt.create(i);
          if (s.ins == 0) oe(i, s.len, 0, l), s.next();
          else if (o.len == 0 && !o.done) oe(i, 0, o.ins, l), r && pt(r, i, o.text), o.next();
          else {
            if (s.done || o.done) throw new Error("Mismatched change set lengths");
            {
              let a = Math.min(s.len2, o.len), h7 = i.length;
              if (s.ins == -1) {
                let c = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
                oe(i, a, c, l), r && c && pt(r, i, o.text);
              } else o.ins == -1 ? (oe(i, s.off ? 0 : s.len, a, l), r && pt(r, i, s.textBit(a))) : (oe(i, s.off ? 0 : s.len, o.off ? 0 : o.ins, l), r && !o.off && pt(r, i, o.text));
              l = (s.ins > a || o.ins >= 0 && o.len > a) && (l || i.length > h7), s.forward2(a), o.forward(a);
            }
          }
        }
      }
      var _t = class {
        constructor(e) {
          this.set = e, this.i = 0, this.next();
        }
        next() {
          let { sections: e } = this.set;
          this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
        }
        get done() {
          return this.ins == -2;
        }
        get len2() {
          return this.ins < 0 ? this.len : this.ins;
        }
        get text() {
          let { inserted: e } = this.set, t = this.i - 2 >> 1;
          return t >= e.length ? M.empty : e[t];
        }
        textBit(e) {
          let { inserted: t } = this.set, i = this.i - 2 >> 1;
          return i >= t.length && !e ? M.empty : t[i].slice(this.off, e == null ? void 0 : this.off + e);
        }
        forward(e) {
          e == this.len ? this.next() : (this.len -= e, this.off += e);
        }
        forward2(e) {
          this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
        }
      }, Et = class n {
        constructor(e, t, i, r) {
          this.from = e, this.to = t, this.flags = i, this.goalColumn = r;
        }
        get anchor() {
          return this.flags & 32 ? this.to : this.from;
        }
        get head() {
          return this.flags & 32 ? this.from : this.to;
        }
        get empty() {
          return this.from == this.to;
        }
        get assoc() {
          return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
        }
        get undirectional() {
          return (this.flags & 64) > 0;
        }
        get bidiLevel() {
          let e = this.flags & 7;
          return e == 7 ? null : e;
        }
        map(e, t = -1) {
          let i, r;
          return this.empty ? i = r = e.mapPos(this.from, t) : (i = e.mapPos(this.from, 1), r = e.mapPos(this.to, -1)), i == this.from && r == this.to ? this : new n(i, r, this.flags, this.goalColumn);
        }
        extend(e, t = e, i = 0) {
          if (e <= this.anchor && t >= this.anchor) return b.range(e, t, void 0, void 0, i);
          let r = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
          return b.range(this.anchor, r, void 0, void 0, i);
        }
        eq(e, t = false) {
          return this.anchor == e.anchor && this.head == e.head && this.goalColumn == e.goalColumn && (!t || !this.empty || this.assoc == e.assoc);
        }
        toJSON() {
          return { anchor: this.anchor, head: this.head };
        }
        static fromJSON(e) {
          if (!e || typeof e.anchor != "number" || typeof e.head != "number") throw new RangeError("Invalid JSON representation for SelectionRange");
          return b.range(e.anchor, e.head);
        }
        static create(e, t, i, r) {
          return new n(e, t, i, r);
        }
      }, b = class n {
        constructor(e, t) {
          this.ranges = e, this.mainIndex = t;
        }
        map(e, t = -1) {
          return e.empty ? this : n.create(this.ranges.map((i) => i.map(e, t)), this.mainIndex);
        }
        eq(e, t = false) {
          if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex) return false;
          for (let i = 0; i < this.ranges.length; i++) if (!this.ranges[i].eq(e.ranges[i], t)) return false;
          return true;
        }
        get main() {
          return this.ranges[this.mainIndex];
        }
        asSingle() {
          return this.ranges.length == 1 ? this : new n([this.main], 0);
        }
        addRange(e, t = true) {
          return n.create([e].concat(this.ranges), t ? 0 : this.mainIndex + 1);
        }
        replaceRange(e, t = this.mainIndex) {
          let i = this.ranges.slice();
          return i[t] = e, n.create(i, this.mainIndex);
        }
        toJSON() {
          return { ranges: this.ranges.map((e) => e.toJSON()), main: this.mainIndex };
        }
        static fromJSON(e) {
          if (!e || !Array.isArray(e.ranges) || typeof e.main != "number" || e.main >= e.ranges.length) throw new RangeError("Invalid JSON representation for EditorSelection");
          return new n(e.ranges.map((t) => Et.fromJSON(t)), e.main);
        }
        static single(e, t = e) {
          return new n([n.range(e, t)], 0);
        }
        static create(e, t = 0) {
          if (e.length == 0) throw new RangeError("A selection needs at least one range");
          for (let i = 0, r = 0; r < e.length; r++) {
            let s = e[r];
            if (s.empty ? s.from <= i : s.from < i) return n.normalized(e.slice(), t);
            i = s.to;
          }
          return new n(e, t);
        }
        static cursor(e, t = 0, i, r) {
          return Et.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (i == null ? 7 : Math.min(6, i)), r);
        }
        static range(e, t, i, r, s) {
          let o = r == null ? 7 : Math.min(6, r);
          return !s && e != t && (s = t < e ? 1 : -1), s && (o |= s < 0 ? 8 : 16), t < e ? Et.create(t, e, o | 32, i) : Et.create(e, t, o, i);
        }
        static undirectionalRange(e, t) {
          return Et.create(e, t, 64, void 0);
        }
        static normalized(e, t = 0) {
          let i = e[t];
          e.sort((r, s) => r.from - s.from), t = e.indexOf(i);
          for (let r = 1; r < e.length; r++) {
            let s = e[r], o = e[r - 1];
            if (s.empty ? s.from <= o.to : s.from < o.to) {
              let l = o.from, a = Math.max(s.to, o.to);
              r <= t && t--, e.splice(--r, 2, s.anchor > s.head ? n.range(a, l) : n.range(l, a));
            }
          }
          return new n(e, t);
        }
      };
      function ba(n, e) {
        for (let t of n.ranges) if (t.to > e) throw new RangeError("Selection points outside of document");
      }
      var Os = 0, $ = class n {
        constructor(e, t, i, r, s) {
          this.combine = e, this.compareInput = t, this.compare = i, this.isStatic = r, this.id = Os++, this.default = e([]), this.extensions = typeof s == "function" ? s(this) : s;
        }
        get reader() {
          return this;
        }
        static define(e = {}) {
          return new n(e.combine || ((t) => t), e.compareInput || ((t, i) => t === i), e.compare || (e.combine ? (t, i) => t === i : ps), !!e.static, e.enables);
        }
        of(e) {
          return new oi([], this, 0, e);
        }
        compute(e, t) {
          if (this.isStatic) throw new Error("Can't compute a static facet");
          return new oi(e, this, 1, t);
        }
        computeN(e, t) {
          if (this.isStatic) throw new Error("Can't compute a static facet");
          return new oi(e, this, 2, t);
        }
        from(e, t) {
          return t || (t = (i) => i), this.compute([e], (i) => t(i.field(e)));
        }
      };
      function ps(n, e) {
        return n == e || n.length == e.length && n.every((t, i) => t === e[i]);
      }
      var oi = class {
        constructor(e, t, i, r) {
          this.dependencies = e, this.facet = t, this.type = i, this.value = r, this.id = Os++;
        }
        dynamicSlot(e) {
          var t;
          let i = this.value, r = this.facet.compareInput, s = this.id, o = e[s] >> 1, l = this.type == 2, a = false, h7 = false, c = [];
          for (let f of this.dependencies) f == "doc" ? a = true : f == "selection" ? h7 = true : (((t = e[f.id]) !== null && t !== void 0 ? t : 1) & 1) == 0 && c.push(e[f.id]);
          return { create(f) {
            return f.values[o] = i(f), 1;
          }, update(f, u) {
            if (a && u.docChanged || h7 && (u.docChanged || u.selection) || ns(f, c)) {
              let d = i(f);
              if (l ? !Oa(d, f.values[o], r) : !r(d, f.values[o])) return f.values[o] = d, 1;
            }
            return 0;
          }, reconfigure: (f, u) => {
            let d, O = u.config.address[s];
            if (O != null) {
              let m = En(u, O);
              if (this.dependencies.every((g) => g instanceof $ ? u.facet(g) === f.facet(g) : g instanceof ye ? u.field(g, false) == f.field(g, false) : true) || (l ? Oa(d = i(f), m, r) : r(d = i(f), m))) return f.values[o] = m, 0;
            } else d = i(f);
            return f.values[o] = d, 1;
          } };
        }
        get extension() {
          return this;
        }
      };
      function Oa(n, e, t) {
        if (n.length != e.length) return false;
        for (let i = 0; i < n.length; i++) if (!t(n[i], e[i])) return false;
        return true;
      }
      function ns(n, e) {
        let t = false;
        for (let i of e) Li(n, i) & 1 && (t = true);
        return t;
      }
      function Wd(n, e, t) {
        let i = t.map((a) => n[a.id]), r = t.map((a) => a.type), s = i.filter((a) => !(a & 1)), o = n[e.id] >> 1;
        function l(a) {
          let h7 = [];
          for (let c = 0; c < i.length; c++) {
            let f = En(a, i[c]);
            if (r[c] == 2) for (let u of f) h7.push(u);
            else h7.push(f);
          }
          return e.combine(h7);
        }
        return { create(a) {
          for (let h7 of i) Li(a, h7);
          return a.values[o] = l(a), 1;
        }, update(a, h7) {
          if (!ns(a, s)) return 0;
          let c = l(a);
          return e.compare(c, a.values[o]) ? 0 : (a.values[o] = c, 1);
        }, reconfigure(a, h7) {
          let c = ns(a, i), f = h7.config.facets[e.id], u = h7.facet(e);
          if (f && !c && ps(t, f)) return a.values[o] = u, 0;
          let d = l(a);
          return e.compare(d, u) ? (a.values[o] = u, 0) : (a.values[o] = d, 1);
        } };
      }
      var vn = $.define({ static: true }), ye = class n {
        constructor(e, t, i, r, s) {
          this.id = e, this.createF = t, this.updateF = i, this.compareF = r, this.spec = s, this.provides = void 0;
        }
        static define(e) {
          let t = new n(Os++, e.create, e.update, e.compare || ((i, r) => i === r), e);
          return e.provide && (t.provides = e.provide(t)), t;
        }
        create(e) {
          let t = e.facet(vn).find((i) => i.field == this);
          return (t?.create || this.createF)(e);
        }
        slot(e) {
          let t = e[this.id] >> 1;
          return { create: (i) => (i.values[t] = this.create(i), 1), update: (i, r) => {
            let s = i.values[t], o = this.updateF(s, r);
            return this.compareF(s, o) ? 0 : (i.values[t] = o, 1);
          }, reconfigure: (i, r) => {
            let s = i.facet(vn), o = r.facet(vn), l;
            return (l = s.find((a) => a.field == this)) && l != o.find((a) => a.field == this) ? (i.values[t] = l.create(i), 1) : r.config.address[this.id] != null ? (i.values[t] = r.field(this), 0) : (i.values[t] = this.create(i), 1);
          } };
        }
        init(e) {
          return [this, vn.of({ field: this, create: e })];
        }
        get extension() {
          return this;
        }
      }, jt = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
      function Mi(n) {
        return (e) => new Rn(e, n);
      }
      var Fe = { highest: Mi(jt.highest), high: Mi(jt.high), default: Mi(jt.default), low: Mi(jt.low), lowest: Mi(jt.lowest) }, Rn = class {
        constructor(e, t) {
          this.inner = e, this.prec = t;
        }
        get extension() {
          return this;
        }
      }, Mn = class n {
        of(e) {
          return new Ei(this, e);
        }
        reconfigure(e) {
          return n.reconfigure.of({ compartment: this, extension: e });
        }
        get(e) {
          return e.config.compartments.get(this);
        }
      }, Ei = class {
        constructor(e, t) {
          this.compartment = e, this.inner = t;
        }
        get extension() {
          return this;
        }
      }, Ln = class n {
        constructor(e, t, i, r, s, o) {
          for (this.base = e, this.compartments = t, this.dynamicSlots = i, this.address = r, this.staticValues = s, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; ) this.statusTemplate.push(0);
        }
        staticFacet(e) {
          let t = this.address[e.id];
          return t == null ? e.default : this.staticValues[t >> 1];
        }
        static resolve(e, t, i) {
          let r = [], s = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
          for (let u of Dd(e, t, o)) u instanceof ye ? r.push(u) : (s[u.facet.id] || (s[u.facet.id] = [])).push(u);
          let l = /* @__PURE__ */ Object.create(null), a = [], h7 = [];
          for (let u of r) l[u.id] = h7.length << 1, h7.push((d) => u.slot(d));
          let c = i?.config.facets;
          for (let u in s) {
            let d = s[u], O = d[0].facet, m = c && c[u] || [];
            if (d.every((g) => g.type == 0)) if (l[O.id] = a.length << 1 | 1, ps(m, d)) a.push(i.facet(O));
            else {
              let g = O.combine(d.map((S) => S.value));
              a.push(i && O.compare(g, i.facet(O)) ? i.facet(O) : g);
            }
            else {
              for (let g of d) g.type == 0 ? (l[g.id] = a.length << 1 | 1, a.push(g.value)) : (l[g.id] = h7.length << 1, h7.push((S) => g.dynamicSlot(S)));
              l[O.id] = h7.length << 1, h7.push((g) => Wd(g, O, d));
            }
          }
          let f = h7.map((u) => u(l));
          return new n(e, o, f, l, a, s);
        }
      };
      function Dd(n, e, t) {
        let i = [[], [], [], [], []], r = /* @__PURE__ */ new Map();
        function s(o, l) {
          let a = r.get(o);
          if (a != null) {
            if (a <= l) return;
            let h7 = i[a].indexOf(o);
            h7 > -1 && i[a].splice(h7, 1), o instanceof Ei && t.delete(o.compartment);
          }
          if (r.set(o, l), Array.isArray(o)) for (let h7 of o) s(h7, l);
          else if (o instanceof Ei) {
            if (t.has(o.compartment)) throw new RangeError("Duplicate use of compartment in extensions");
            let h7 = e.get(o.compartment) || o.inner;
            t.set(o.compartment, h7), s(h7, l);
          } else if (o instanceof Rn) s(o.inner, o.prec);
          else if (o instanceof ye) i[l].push(o), o.provides && s(o.provides, l);
          else if (o instanceof oi) i[l].push(o), o.facet.extensions && s(o.facet.extensions, jt.default);
          else {
            let h7 = o.extension;
            if (!h7) throw new Error(`Unrecognized extension value in extension set (${o}).`);
            if (h7 == o) throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
            s(h7, l);
          }
        }
        return s(n, jt.default), i.reduce((o, l) => o.concat(l));
      }
      function Li(n, e) {
        if (e & 1) return 2;
        let t = e >> 1, i = n.status[t];
        if (i == 4) throw new Error("Cyclic dependency between fields and/or facets");
        if (i & 2) return i;
        n.status[t] = 4;
        let r = n.computeSlot(n, n.config.dynamicSlots[t]);
        return n.status[t] = 2 | r;
      }
      function En(n, e) {
        return e & 1 ? n.config.staticValues[e >> 1] : n.values[e >> 1];
      }
      var ya = $.define(), rs = $.define({ combine: (n) => n.some((e) => e), static: true }), Qa = $.define({ combine: (n) => n.length ? n[0] : void 0, static: true }), xa = $.define(), ka = $.define(), wa = $.define(), $a = $.define({ combine: (n) => n.length ? n[0] : false }), Oe = class {
        constructor(e, t) {
          this.type = e, this.value = t;
        }
        static define() {
          return new ss();
        }
      }, ss = class {
        of(e) {
          return new Oe(this, e);
        }
      }, os = class {
        constructor(e) {
          this.map = e;
        }
        of(e) {
          return new V(this, e);
        }
      }, V = class n {
        constructor(e, t) {
          this.type = e, this.value = t;
        }
        map(e) {
          let t = this.type.map(this.value, e);
          return t === void 0 ? void 0 : t == this.value ? this : new n(this.type, t);
        }
        is(e) {
          return this.type == e;
        }
        static define(e = {}) {
          return new os(e.map || ((t) => t));
        }
        static mapEffects(e, t) {
          if (!e.length) return e;
          let i = [];
          for (let r of e) {
            let s = r.map(t);
            s && i.push(s);
          }
          return i;
        }
      };
      V.reconfigure = V.define();
      V.appendConfig = V.define();
      var ee = class n {
        constructor(e, t, i, r, s, o) {
          this.startState = e, this.changes = t, this.selection = i, this.effects = r, this.annotations = s, this.scrollIntoView = o, this._doc = null, this._state = null, i && ba(i, t.newLength), s.some((l) => l.type == n.time) || (this.annotations = s.concat(n.time.of(Date.now())));
        }
        static create(e, t, i, r, s, o) {
          return new n(e, t, i, r, s, o);
        }
        get newDoc() {
          return this._doc || (this._doc = this.changes.apply(this.startState.doc));
        }
        get newSelection() {
          return this.selection || this.startState.selection.map(this.changes);
        }
        get state() {
          return this._state || this.startState.applyTransaction(this), this._state;
        }
        annotation(e) {
          for (let t of this.annotations) if (t.type == e) return t.value;
        }
        get docChanged() {
          return !this.changes.empty;
        }
        get reconfigured() {
          return this.startState.config != this.state.config;
        }
        isUserEvent(e) {
          let t = this.annotation(n.userEvent);
          return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
        }
      };
      ee.time = Oe.define();
      ee.userEvent = Oe.define();
      ee.addToHistory = Oe.define();
      ee.remote = Oe.define();
      function Bd(n, e) {
        let t = [];
        for (let i = 0, r = 0; ; ) {
          let s, o;
          if (i < n.length && (r == e.length || e[r] >= n[i])) s = n[i++], o = n[i++];
          else if (r < e.length) s = e[r++], o = e[r++];
          else return t;
          !t.length || t[t.length - 1] < s ? t.push(s, o) : t[t.length - 1] < o && (t[t.length - 1] = o);
        }
      }
      function Pa(n, e, t) {
        var i;
        let r, s, o;
        return t ? (r = e.changes, s = ae.empty(e.changes.length), o = n.changes.compose(e.changes)) : (r = e.changes.map(n.changes), s = n.changes.mapDesc(e.changes, true), o = n.changes.compose(r)), { changes: o, selection: e.selection ? e.selection.map(s) : (i = n.selection) === null || i === void 0 ? void 0 : i.map(r), effects: V.mapEffects(n.effects, r).concat(V.mapEffects(e.effects, s)), annotations: n.annotations.length ? n.annotations.concat(e.annotations) : e.annotations, scrollIntoView: n.scrollIntoView || e.scrollIntoView };
      }
      function ls(n, e, t) {
        let i = e.selection, r = li(e.annotations);
        return e.userEvent && (r = r.concat(ee.userEvent.of(e.userEvent))), { changes: e.changes instanceof ae ? e.changes : ae.of(e.changes || [], t, n.facet(Qa)), selection: i && (i instanceof b ? i : b.single(i.anchor, i.head)), effects: li(e.effects), annotations: r, scrollIntoView: !!e.scrollIntoView };
      }
      function va(n, e, t) {
        let i = ls(n, e.length ? e[0] : {}, n.doc.length);
        e.length && e[0].filter === false && (t = false);
        for (let s = 1; s < e.length; s++) {
          e[s].filter === false && (t = false);
          let o = !!e[s].sequential;
          i = Pa(i, ls(n, e[s], o ? i.changes.newLength : n.doc.length), o);
        }
        let r = ee.create(n, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
        return Id(t ? qd(r) : r);
      }
      function qd(n) {
        let e = n.startState, t = true;
        for (let r of e.facet(xa)) {
          let s = r(n);
          if (s === false) {
            t = false;
            break;
          }
          Array.isArray(s) && (t = t === true ? s : Bd(t, s));
        }
        if (t !== true) {
          let r, s;
          if (t === false) s = n.changes.invertedDesc, r = ae.empty(e.doc.length);
          else {
            let o = n.changes.filter(t);
            r = o.changes, s = o.filtered.mapDesc(o.changes).invertedDesc;
          }
          n = ee.create(e, r, n.selection && n.selection.map(s), V.mapEffects(n.effects, s), n.annotations, n.scrollIntoView);
        }
        let i = e.facet(ka);
        for (let r = i.length - 1; r >= 0; r--) {
          let s = i[r](n);
          s instanceof ee ? n = s : Array.isArray(s) && s.length == 1 && s[0] instanceof ee ? n = s[0] : n = va(e, li(s), false);
        }
        return n;
      }
      function Id(n) {
        let e = n.startState, t = e.facet(wa), i = n;
        for (let r = t.length - 1; r >= 0; r--) {
          let s = t[r](n);
          s && Object.keys(s).length && (i = Pa(i, ls(e, s, n.changes.newLength), true));
        }
        return i == n ? n : ee.create(e, n.changes, n.selection, i.effects, i.annotations, i.scrollIntoView);
      }
      var Nd = [];
      function li(n) {
        return n == null ? Nd : Array.isArray(n) ? n : [n];
      }
      var ve = (function(n) {
        return n[n.Word = 0] = "Word", n[n.Space = 1] = "Space", n[n.Other = 2] = "Other", n;
      })(ve || (ve = {})), Gd = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, as;
      try {
        as = new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
      } catch {
      }
      function Ud(n) {
        if (as) return as.test(n);
        for (let e = 0; e < n.length; e++) {
          let t = n[e];
          if (/\w/.test(t) || t > "\x80" && (t.toUpperCase() != t.toLowerCase() || Gd.test(t))) return true;
        }
        return false;
      }
      function Fd(n) {
        return (e) => {
          if (!/\S/.test(e)) return ve.Space;
          if (Ud(e)) return ve.Word;
          for (let t = 0; t < n.length; t++) if (e.indexOf(n[t]) > -1) return ve.Word;
          return ve.Other;
        };
      }
      var D = class n {
        constructor(e, t, i, r, s, o) {
          this.config = e, this.doc = t, this.selection = i, this.values = r, this.status = e.statusTemplate.slice(), this.computeSlot = s, o && (o._state = this);
          for (let l = 0; l < this.config.dynamicSlots.length; l++) Li(this, l << 1);
          this.computeSlot = null;
        }
        field(e, t = true) {
          let i = this.config.address[e.id];
          if (i == null) {
            if (t) throw new RangeError("Field is not present in this state");
            return;
          }
          return Li(this, i), En(this, i);
        }
        update(...e) {
          return va(this, e, true);
        }
        applyTransaction(e) {
          let t = this.config, { base: i, compartments: r } = t;
          for (let l of e.effects) l.is(Mn.reconfigure) ? (t && (r = /* @__PURE__ */ new Map(), t.compartments.forEach((a, h7) => r.set(h7, a)), t = null), r.set(l.value.compartment, l.value.extension)) : l.is(V.reconfigure) ? (t = null, i = l.value) : l.is(V.appendConfig) && (t = null, i = li(i).concat(l.value));
          let s;
          t ? s = e.startState.values.slice() : (t = Ln.resolve(i, r, this), s = new n(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (a, h7) => h7.reconfigure(a, this), null).values);
          let o = e.startState.facet(rs) ? e.newSelection : e.newSelection.asSingle();
          new n(t, e.newDoc, o, s, (l, a) => a.update(l, e), e);
        }
        replaceSelection(e) {
          return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({ changes: { from: t.from, to: t.to, insert: e }, range: b.cursor(t.from + e.length) }));
        }
        changeByRange(e) {
          let t = this.selection, i = e(t.ranges[0]), r = this.changes(i.changes), s = [i.range], o = li(i.effects);
          for (let l = 1; l < t.ranges.length; l++) {
            let a = e(t.ranges[l]), h7 = this.changes(a.changes), c = h7.map(r);
            for (let u = 0; u < l; u++) s[u] = s[u].map(c);
            let f = r.mapDesc(h7, true);
            s.push(a.range.map(f)), r = r.compose(c), o = V.mapEffects(o, c).concat(V.mapEffects(li(a.effects), f));
          }
          return { changes: r, selection: b.create(s, t.mainIndex), effects: o };
        }
        changes(e = []) {
          return e instanceof ae ? e : ae.of(e, this.doc.length, this.facet(n.lineSeparator));
        }
        toText(e) {
          return M.of(e.split(this.facet(n.lineSeparator) || es));
        }
        sliceDoc(e = 0, t = this.doc.length) {
          return this.doc.sliceString(e, t, this.lineBreak);
        }
        facet(e) {
          let t = this.config.address[e.id];
          return t == null ? e.default : (Li(this, t), En(this, t));
        }
        toJSON(e) {
          let t = { doc: this.sliceDoc(), selection: this.selection.toJSON() };
          if (e) for (let i in e) {
            let r = e[i];
            r instanceof ye && this.config.address[r.id] != null && (t[i] = r.spec.toJSON(this.field(e[i]), this));
          }
          return t;
        }
        static fromJSON(e, t = {}, i) {
          if (!e || typeof e.doc != "string") throw new RangeError("Invalid JSON representation for EditorState");
          let r = [];
          if (i) {
            for (let s in i) if (Object.prototype.hasOwnProperty.call(e, s)) {
              let o = i[s], l = e[s];
              r.push(o.init((a) => o.spec.fromJSON(l, a)));
            }
          }
          return n.create({ doc: e.doc, selection: b.fromJSON(e.selection), extensions: t.extensions ? r.concat([t.extensions]) : r });
        }
        static create(e = {}) {
          let t = Ln.resolve(e.extensions || [], /* @__PURE__ */ new Map()), i = e.doc instanceof M ? e.doc : M.of((e.doc || "").split(t.staticFacet(n.lineSeparator) || es)), r = e.selection ? e.selection instanceof b ? e.selection : b.single(e.selection.anchor, e.selection.head) : b.single(0);
          return ba(r, i.length), t.staticFacet(rs) || (r = r.asSingle()), new n(t, i, r, t.dynamicSlots.map(() => null), (s, o) => o.create(s), null);
        }
        get tabSize() {
          return this.facet(n.tabSize);
        }
        get lineBreak() {
          return this.facet(n.lineSeparator) || `
`;
        }
        get readOnly() {
          return this.facet($a);
        }
        phrase(e, ...t) {
          for (let i of this.facet(n.phrases)) if (Object.prototype.hasOwnProperty.call(i, e)) {
            e = i[e];
            break;
          }
          return t.length && (e = e.replace(/\$(\$|\d*)/g, (i, r) => {
            if (r == "$") return "$";
            let s = +(r || 1);
            return !s || s > t.length ? i : t[s - 1];
          })), e;
        }
        languageDataAt(e, t, i = -1) {
          let r = [];
          for (let s of this.facet(ya)) for (let o of s(this, t, i)) Object.prototype.hasOwnProperty.call(o, e) && r.push(o[e]);
          return r;
        }
        charCategorizer(e) {
          let t = this.languageDataAt("wordChars", e);
          return Fd(t.length ? t[0] : "");
        }
        wordAt(e) {
          let { text: t, from: i, length: r } = this.doc.lineAt(e), s = this.charCategorizer(e), o = e - i, l = e - i;
          for (; o > 0; ) {
            let a = ie(t, o, false);
            if (s(t.slice(a, o)) != ve.Word) break;
            o = a;
          }
          for (; l < r; ) {
            let a = ie(t, l);
            if (s(t.slice(l, a)) != ve.Word) break;
            l = a;
          }
          return o == l ? null : b.range(o + i, l + i);
        }
      };
      D.allowMultipleSelections = rs;
      D.tabSize = $.define({ combine: (n) => n.length ? n[0] : 4 });
      D.lineSeparator = Qa;
      D.readOnly = $a;
      D.phrases = $.define({ compare(n, e) {
        let t = Object.keys(n), i = Object.keys(e);
        return t.length == i.length && t.every((r) => n[r] == e[r]);
      } });
      D.languageData = ya;
      D.changeFilter = xa;
      D.transactionFilter = ka;
      D.transactionExtender = wa;
      Mn.reconfigure = V.define();
      function Wt(n, e, t = {}) {
        let i = {};
        for (let r of n) for (let s of Object.keys(r)) {
          let o = r[s], l = i[s];
          if (l === void 0) i[s] = o;
          else if (!(l === o || o === void 0)) if (Object.hasOwnProperty.call(t, s)) i[s] = t[s](l, o);
          else throw new Error("Config merge conflict for field " + s);
        }
        for (let r in e) i[r] === void 0 && (i[r] = e[r]);
        return i;
      }
      var Te = class {
        eq(e) {
          return this == e;
        }
        range(e, t = e) {
          return ji.create(e, t, this);
        }
      };
      Te.prototype.startSide = Te.prototype.endSide = 0;
      Te.prototype.point = false;
      Te.prototype.mapMode = se.TrackDel;
      function ms(n, e) {
        return n == e || n.constructor == e.constructor && n.eq(e);
      }
      var ji = class n {
        constructor(e, t, i) {
          this.from = e, this.to = t, this.value = i;
        }
        static create(e, t, i) {
          return new n(e, t, i);
        }
      };
      function hs(n, e) {
        return n.from - e.from || n.value.startSide - e.value.startSide;
      }
      var cs = class n {
        constructor(e, t, i, r) {
          this.from = e, this.to = t, this.value = i, this.maxPoint = r;
        }
        get length() {
          return this.to[this.to.length - 1];
        }
        findIndex(e, t, i, r = 0) {
          let s = i ? this.to : this.from;
          for (let o = r, l = s.length; ; ) {
            if (o == l) return o;
            let a = o + l >> 1, h7 = s[a] - e || (i ? this.value[a].endSide : this.value[a].startSide) - t;
            if (a == o) return h7 >= 0 ? o : l;
            h7 >= 0 ? l = a : o = a + 1;
          }
        }
        between(e, t, i, r) {
          for (let s = this.findIndex(t, -1e9, true), o = this.findIndex(i, 1e9, false, s); s < o; s++) if (r(this.from[s] + e, this.to[s] + e, this.value[s]) === false) return false;
        }
        map(e, t) {
          let i = [], r = [], s = [], o = -1, l = -1;
          for (let a = 0; a < this.value.length; a++) {
            let h7 = this.value[a], c = this.from[a] + e, f = this.to[a] + e, u, d;
            if (c == f) {
              let O = t.mapPos(c, h7.startSide, h7.mapMode);
              if (O == null || (u = d = O, h7.startSide != h7.endSide && (d = t.mapPos(c, h7.endSide), d < u))) continue;
            } else if (u = t.mapPos(c, h7.startSide), d = t.mapPos(f, h7.endSide), u > d || u == d && h7.startSide > 0 && h7.endSide <= 0) continue;
            (d - u || h7.endSide - h7.startSide) < 0 || (o < 0 && (o = u), h7.point && (l = Math.max(l, d - u)), i.push(h7), r.push(u - o), s.push(d - o));
          }
          return { mapped: i.length ? new n(r, s, i, l) : null, pos: o };
        }
      }, _ = class n {
        constructor(e, t, i, r) {
          this.chunkPos = e, this.chunk = t, this.nextLayer = i, this.maxPoint = r;
        }
        static create(e, t, i, r) {
          return new n(e, t, i, r);
        }
        get length() {
          let e = this.chunk.length - 1;
          return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length);
        }
        get size() {
          if (this.isEmpty) return 0;
          let e = this.nextLayer.size;
          for (let t of this.chunk) e += t.value.length;
          return e;
        }
        chunkEnd(e) {
          return this.chunkPos[e] + this.chunk[e].length;
        }
        update(e) {
          let { add: t = [], sort: i = false, filterFrom: r = 0, filterTo: s = this.length } = e, o = e.filter;
          if (t.length == 0 && !o) return this;
          if (i && (t = t.slice().sort(hs)), this.isEmpty) return t.length ? n.of(t) : this;
          let l = new jn(this, null, -1).goto(0), a = 0, h7 = [], c = new Vt();
          for (; l.value || a < t.length; ) if (a < t.length && (l.from - t[a].from || l.startSide - t[a].value.startSide) >= 0) {
            let f = t[a++];
            c.addInner(f.from, f.to, f.value) || h7.push(f);
          } else l.rangeIndex == 1 && l.chunkIndex < this.chunk.length && (a == t.length || this.chunkEnd(l.chunkIndex) < t[a].from) && (!o || r > this.chunkEnd(l.chunkIndex) || s < this.chunkPos[l.chunkIndex]) && c.addChunk(this.chunkPos[l.chunkIndex], this.chunk[l.chunkIndex]) ? l.nextChunk() : ((!o || r > l.to || s < l.from || o(l.from, l.to, l.value)) && (c.addInner(l.from, l.to, l.value) || h7.push(ji.create(l.from, l.to, l.value))), l.next());
          return c.finishInner(this.nextLayer.isEmpty && !h7.length ? n.empty : this.nextLayer.update({ add: h7, filter: o, filterFrom: r, filterTo: s }));
        }
        map(e) {
          if (e.empty || this.isEmpty) return this;
          let t = [], i = [], r = -1;
          for (let o = 0; o < this.chunk.length; o++) {
            let l = this.chunkPos[o], a = this.chunk[o], h7 = e.touchesRange(l, l + a.length);
            if (h7 === false) r = Math.max(r, a.maxPoint), t.push(a), i.push(e.mapPos(l));
            else if (h7 === true) {
              let { mapped: c, pos: f } = a.map(l, e);
              c && (r = Math.max(r, c.maxPoint), t.push(c), i.push(f));
            }
          }
          let s = this.nextLayer.map(e);
          return t.length == 0 ? s : new n(i, t, s || n.empty, r);
        }
        between(e, t, i) {
          if (!this.isEmpty) {
            for (let r = 0; r < this.chunk.length; r++) {
              let s = this.chunkPos[r], o = this.chunk[r];
              if (t >= s && e <= s + o.length && o.between(s, e - s, t - s, i) === false) return;
            }
            this.nextLayer.between(e, t, i);
          }
        }
        iter(e = 0) {
          return zi.from([this]).goto(e);
        }
        get isEmpty() {
          return this.nextLayer == this;
        }
        static iter(e, t = 0) {
          return zi.from(e).goto(t);
        }
        static compare(e, t, i, r, s = -1) {
          let o = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= s), l = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= s), a = pa(o, l, i), h7 = new zt(o, a, s), c = new zt(l, a, s);
          i.iterGaps((f, u, d) => ma(h7, f, c, u, d, r)), i.empty && i.length == 0 && ma(h7, 0, c, 0, 0, r);
        }
        static eq(e, t, i = 0, r) {
          r == null && (r = 999999999);
          let s = e.filter((c) => !c.isEmpty && t.indexOf(c) < 0), o = t.filter((c) => !c.isEmpty && e.indexOf(c) < 0);
          if (s.length != o.length) return false;
          if (!s.length) return true;
          let l = pa(s, o), a = new zt(s, l, 0).goto(i), h7 = new zt(o, l, 0).goto(i);
          for (; ; ) {
            if (a.to != h7.to || !fs(a.active, h7.active) || a.point && (!h7.point || !ms(a.point, h7.point))) return false;
            if (a.to > r) return true;
            a.next(), h7.next();
          }
        }
        static spans(e, t, i, r, s = -1) {
          let o = new zt(e, null, s).goto(t), l = t, a = o.openStart;
          for (; ; ) {
            let h7 = Math.min(o.to, i);
            if (o.point) {
              let c = o.activeForPoint(o.to), f = o.pointFrom < t ? c.length + 1 : o.point.startSide < 0 ? c.length : Math.min(c.length, a);
              r.point(l, h7, o.point, c, f, o.pointRank), a = Math.min(o.openEnd(h7), c.length);
            } else h7 > l && (r.span(l, h7, o.active, a), a = o.openEnd(h7));
            if (o.to > i) return a + (o.point && o.to > i ? 1 : 0);
            l = o.to, o.next();
          }
        }
        static of(e, t = false) {
          let i = new Vt();
          for (let r of e instanceof ji ? [e] : t ? Hd(e) : e) i.add(r.from, r.to, r.value);
          return i.finish();
        }
        static join(e) {
          if (!e.length) return n.empty;
          let t = e[e.length - 1];
          for (let i = e.length - 2; i >= 0; i--) for (let r = e[i]; r != n.empty; r = r.nextLayer) t = new n(r.chunkPos, r.chunk, t, Math.max(r.maxPoint, t.maxPoint));
          return t;
        }
      };
      _.empty = new _([], [], null, -1);
      function Hd(n) {
        if (n.length > 1) for (let e = n[0], t = 1; t < n.length; t++) {
          let i = n[t];
          if (hs(e, i) > 0) return n.slice().sort(hs);
          e = i;
        }
        return n;
      }
      _.empty.nextLayer = _.empty;
      var Vt = class n {
        finishChunk(e) {
          this.chunks.push(new cs(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
        }
        constructor() {
          this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
        }
        add(e, t, i) {
          this.addInner(e, t, i) || (this.nextLayer || (this.nextLayer = new n())).add(e, t, i);
        }
        addInner(e, t, i) {
          let r = e - this.lastTo || i.startSide - this.last.endSide;
          if (r <= 0 && (e - this.lastFrom || i.startSide - this.last.startSide) < 0) throw new Error("Ranges must be added sorted by `from` position and `startSide`");
          return r < 0 ? false : (this.from.length == 250 && this.finishChunk(true), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = i, this.lastFrom = e, this.lastTo = t, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), true);
        }
        addChunk(e, t) {
          if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0) return false;
          this.from.length && this.finishChunk(true), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
          let i = t.value.length - 1;
          return this.last = t.value[i], this.lastFrom = t.from[i] + e, this.lastTo = t.to[i] + e, true;
        }
        finish() {
          return this.finishInner(_.empty);
        }
        finishInner(e) {
          if (this.from.length && this.finishChunk(false), this.chunks.length == 0) return e;
          let t = _.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
          return this.from = null, t;
        }
      };
      function pa(n, e, t) {
        let i = /* @__PURE__ */ new Map();
        for (let s of n) for (let o = 0; o < s.chunk.length; o++) s.chunk[o].maxPoint <= 0 && i.set(s.chunk[o], s.chunkPos[o]);
        let r = /* @__PURE__ */ new Set();
        for (let s of e) for (let o = 0; o < s.chunk.length; o++) {
          let l = i.get(s.chunk[o]);
          l != null && (t ? t.mapPos(l) : l) == s.chunkPos[o] && !t?.touchesRange(l, l + s.chunk[o].length) && r.add(s.chunk[o]);
        }
        return r;
      }
      var jn = class {
        constructor(e, t, i, r = 0) {
          this.layer = e, this.skip = t, this.minPoint = i, this.rank = r;
        }
        get startSide() {
          return this.value ? this.value.startSide : 0;
        }
        get endSide() {
          return this.value ? this.value.endSide : 0;
        }
        goto(e, t = -1e9) {
          return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, false), this;
        }
        gotoInner(e, t, i) {
          for (; this.chunkIndex < this.layer.chunk.length; ) {
            let r = this.layer.chunk[this.chunkIndex];
            if (!(this.skip && this.skip.has(r) || this.layer.chunkEnd(this.chunkIndex) < e || r.maxPoint < this.minPoint)) break;
            this.chunkIndex++, i = false;
          }
          if (this.chunkIndex < this.layer.chunk.length) {
            let r = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, true);
            (!i || this.rangeIndex < r) && this.setRangeIndex(r);
          }
          this.next();
        }
        forward(e, t) {
          (this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, true);
        }
        next() {
          for (; ; ) if (this.chunkIndex == this.layer.chunk.length) {
            this.from = this.to = 1e9, this.value = null;
            break;
          } else {
            let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], i = e + t.from[this.rangeIndex];
            if (this.from = i, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint) break;
          }
        }
        setRangeIndex(e) {
          if (e == this.layer.chunk[this.chunkIndex].value.length) {
            if (this.chunkIndex++, this.skip) for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); ) this.chunkIndex++;
            this.rangeIndex = 0;
          } else this.rangeIndex = e;
        }
        nextChunk() {
          this.chunkIndex++, this.rangeIndex = 0, this.next();
        }
        compare(e) {
          return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide;
        }
      }, zi = class n {
        constructor(e) {
          this.heap = e;
        }
        static from(e, t = null, i = -1) {
          let r = [];
          for (let s = 0; s < e.length; s++) for (let o = e[s]; !o.isEmpty; o = o.nextLayer) o.maxPoint >= i && r.push(new jn(o, t, i, s));
          return r.length == 1 ? r[0] : new n(r);
        }
        get startSide() {
          return this.value ? this.value.startSide : 0;
        }
        goto(e, t = -1e9) {
          for (let i of this.heap) i.goto(e, t);
          for (let i = this.heap.length >> 1; i >= 0; i--) Kr(this.heap, i);
          return this.next(), this;
        }
        forward(e, t) {
          for (let i of this.heap) i.forward(e, t);
          for (let i = this.heap.length >> 1; i >= 0; i--) Kr(this.heap, i);
          (this.to - e || this.value.endSide - t) < 0 && this.next();
        }
        next() {
          if (this.heap.length == 0) this.from = this.to = 1e9, this.value = null, this.rank = -1;
          else {
            let e = this.heap[0];
            this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), Kr(this.heap, 0);
          }
        }
      };
      function Kr(n, e) {
        for (let t = n[e]; ; ) {
          let i = (e << 1) + 1;
          if (i >= n.length) break;
          let r = n[i];
          if (i + 1 < n.length && r.compare(n[i + 1]) >= 0 && (r = n[i + 1], i++), t.compare(r) < 0) break;
          n[i] = t, n[e] = r, e = i;
        }
      }
      var zt = class {
        constructor(e, t, i) {
          this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = zi.from(e, t, i);
        }
        goto(e, t = -1e9) {
          return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
        }
        forward(e, t) {
          for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0; ) this.removeActive(this.minActive);
          this.cursor.forward(e, t);
        }
        removeActive(e) {
          Tn(this.active, e), Tn(this.activeTo, e), Tn(this.activeRank, e), this.minActive = ga(this.active, this.activeTo);
        }
        addActive(e) {
          let t = 0, { value: i, to: r, rank: s } = this.cursor;
          for (; t < this.activeRank.length && (s - this.activeRank[t] || r - this.activeTo[t]) > 0; ) t++;
          Cn(this.active, t, i), Cn(this.activeTo, t, r), Cn(this.activeRank, t, s), e && Cn(e, t, this.cursor.from), this.minActive = ga(this.active, this.activeTo);
        }
        next() {
          let e = this.to, t = this.point;
          this.point = null;
          let i = this.openStart < 0 ? [] : null;
          for (; ; ) {
            let r = this.minActive;
            if (r > -1 && (this.activeTo[r] - this.cursor.from || this.active[r].endSide - this.cursor.startSide) < 0) {
              if (this.activeTo[r] > e) {
                this.to = this.activeTo[r], this.endSide = this.active[r].endSide;
                break;
              }
              this.removeActive(r), i && Tn(i, r);
            } else if (this.cursor.value) if (this.cursor.from > e) {
              this.to = this.cursor.from, this.endSide = this.cursor.startSide;
              break;
            } else {
              let s = this.cursor.value;
              if (!s.point) this.addActive(i), this.cursor.next();
              else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to) this.cursor.next();
              else {
                this.point = s, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = s.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
                break;
              }
            }
            else {
              this.to = this.endSide = 1e9;
              break;
            }
          }
          if (i) {
            this.openStart = 0;
            for (let r = i.length - 1; r >= 0 && i[r] < e; r--) this.openStart++;
          }
        }
        activeForPoint(e) {
          if (!this.active.length) return this.active;
          let t = [];
          for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--) (this.activeTo[i] > e || this.activeTo[i] == e && this.active[i].endSide >= this.point.endSide) && t.push(this.active[i]);
          return t.reverse();
        }
        openEnd(e) {
          let t = 0;
          for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > e; i--) t++;
          return t;
        }
      };
      function ma(n, e, t, i, r, s) {
        n.goto(e), t.goto(i);
        let o = i + r, l = i, a = i - e, h7 = !!s.boundChange;
        for (let c = false; ; ) {
          let f = n.to + a - t.to, u = f || n.endSide - t.endSide, d = u < 0 ? n.to + a : t.to, O = Math.min(d, o);
          if (n.point || t.point ? (n.point && t.point && ms(n.point, t.point) && fs(n.activeForPoint(n.to), t.activeForPoint(t.to)) || s.comparePoint(l, O, n.point, t.point), c = false) : (c && s.boundChange(l), O > l && !fs(n.active, t.active) && s.compareRange(l, O, n.active, t.active), h7 && O < o && (f || n.openEnd(d) != t.openEnd(d)) && (c = true)), d > o) break;
          l = d, u <= 0 && n.next(), u >= 0 && t.next();
        }
      }
      function fs(n, e) {
        if (n.length != e.length) return false;
        for (let t = 0; t < n.length; t++) if (n[t] != e[t] && !ms(n[t], e[t])) return false;
        return true;
      }
      function Tn(n, e) {
        for (let t = e, i = n.length - 1; t < i; t++) n[t] = n[t + 1];
        n.pop();
      }
      function Cn(n, e, t) {
        for (let i = n.length - 1; i >= e; i--) n[i + 1] = n[i];
        n[e] = t;
      }
      function ga(n, e) {
        let t = -1, i = 1e9;
        for (let r = 0; r < e.length; r++) (e[r] - i || n[r].endSide - n[t].endSide) < 0 && (t = r, i = e[r]);
        return t;
      }
      function Qe(n, e, t = n.length) {
        let i = 0;
        for (let r = 0; r < t && r < n.length; ) n.charCodeAt(r) == 9 ? (i += e - i % e, r++) : (i++, r = ie(n, r));
        return i;
      }
      function Ta(n, e, t, i) {
        for (let r = 0, s = 0; ; ) {
          if (s >= e) return r;
          if (r == n.length) break;
          s += n.charCodeAt(r) == 9 ? t - s % t : 1, r = ie(n, r);
        }
        return i === true ? -1 : n.length;
      }
      var Ca = typeof Symbol > "u" ? "__\u037C" : Symbol.for("\u037C"), gs = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), Za = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {}, Ce = class {
        constructor(e, t) {
          this.rules = [];
          let { finish: i } = t || {};
          function r(o) {
            return /^@/.test(o) ? [o] : o.split(/,\s*/);
          }
          function s(o, l, a, h7) {
            let c = [], f = /^@(\w+)\b/.exec(o[0]), u = f && f[1] == "keyframes";
            if (f && l == null) return a.push(o[0] + ";");
            for (let d in l) {
              let O = l[d];
              if (/&/.test(d)) s(d.split(/,\s*/).map((m) => o.map((g) => m.replace(/&/, g))).reduce((m, g) => m.concat(g)), O, a);
              else if (O && typeof O == "object") {
                if (!f) throw new RangeError("The value of a property (" + d + ") should be a primitive value.");
                s(r(d), O, c, u);
              } else O != null && c.push(d.replace(/_.*/, "").replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()) + ": " + O + ";");
            }
            (c.length || u) && a.push((i && !f && !h7 ? o.map(i) : o).join(", ") + " {" + c.join(" ") + "}");
          }
          for (let o in e) s(r(o), e[o], this.rules);
        }
        getRules() {
          return this.rules.join(`
`);
        }
        static newName() {
          let e = Za[Ca] || 1;
          return Za[Ca] = e + 1, "\u037C" + e.toString(36);
        }
        static mount(e, t, i) {
          let r = e[gs], s = i && i.nonce;
          r ? s && r.setNonce(s) : r = new Ss(e, s), r.mount(Array.isArray(t) ? t : [t], e);
        }
      }, Aa = /* @__PURE__ */ new Map(), Ss = class {
        constructor(e, t) {
          let i = e.ownerDocument || e, r = i.defaultView;
          if (!e.head && e.adoptedStyleSheets && r.CSSStyleSheet) {
            let s = Aa.get(i);
            if (s) return e[gs] = s;
            this.sheet = new r.CSSStyleSheet(), Aa.set(i, this);
          } else this.styleTag = i.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
          this.modules = [], e[gs] = this;
        }
        mount(e, t) {
          let i = this.sheet, r = 0, s = 0;
          for (let o = 0; o < e.length; o++) {
            let l = e[o], a = this.modules.indexOf(l);
            if (a < s && a > -1 && (this.modules.splice(a, 1), s--, a = -1), a == -1) {
              if (this.modules.splice(s++, 0, l), i) for (let h7 = 0; h7 < l.rules.length; h7++) i.insertRule(l.rules[h7], r++);
            } else {
              for (; s < a; ) r += this.modules[s++].rules.length;
              r += l.rules.length, s++;
            }
          }
          if (i) t.adoptedStyleSheets.indexOf(this.sheet) < 0 && (t.adoptedStyleSheets = [this.sheet, ...t.adoptedStyleSheets]);
          else {
            let o = "";
            for (let a = 0; a < this.modules.length; a++) o += this.modules[a].getRules() + `
`;
            this.styleTag.textContent = o;
            let l = t.head || t;
            this.styleTag.parentNode != l && l.insertBefore(this.styleTag, l.firstChild);
          }
        }
        setNonce(e) {
          this.styleTag && this.styleTag.getAttribute("nonce") != e && this.styleTag.setAttribute("nonce", e);
        }
      };
      var rt = { 8: "Backspace", 9: "Tab", 10: "Enter", 12: "NumLock", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 44: "PrintScreen", 45: "Insert", 46: "Delete", 59: ";", 61: "=", 91: "Meta", 92: "Meta", 106: "*", 107: "+", 108: ",", 109: "-", 110: ".", 111: "/", 144: "NumLock", 145: "ScrollLock", 160: "Shift", 161: "Shift", 162: "Control", 163: "Control", 164: "Alt", 165: "Alt", 173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'" }, hi = { 48: ")", 49: "!", 50: "@", 51: "#", 52: "$", 53: "%", 54: "^", 55: "&", 56: "*", 57: "(", 59: ":", 61: "+", 173: "_", 186: ":", 187: "+", 188: "<", 189: "_", 190: ">", 191: "?", 192: "~", 219: "{", 220: "|", 221: "}", 222: '"' }, Kd = typeof navigator < "u" && /Mac/.test(navigator.platform), Jd = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
      for (te = 0; te < 10; te++) rt[48 + te] = rt[96 + te] = String(te);
      var te;
      for (te = 1; te <= 24; te++) rt[te + 111] = "F" + te;
      var te;
      for (te = 65; te <= 90; te++) rt[te] = String.fromCharCode(te + 32), hi[te] = String.fromCharCode(te);
      var te;
      for (zn in rt) hi.hasOwnProperty(zn) || (hi[zn] = rt[zn]);
      var zn;
      function Xa(n) {
        var e = Kd && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || Jd && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? hi : rt)[n.keyCode] || n.key || "Unidentified";
        return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
      }
      var he = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, $s = typeof document < "u" ? document : { documentElement: { style: {} } }, Ps = /Edge\/(\d+)/.exec(he.userAgent), ah = /MSIE \d/.test(he.userAgent), vs = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(he.userAgent), fr = !!(ah || vs || Ps), Ra = !fr && /gecko\/(\d+)/i.test(he.userAgent), bs = !fr && /Chrome\/(\d+)/.exec(he.userAgent), Ma = "webkitFontSmoothing" in $s.documentElement.style, Ts = !fr && /Apple Computer/.test(he.vendor), La = Ts && (/Mobile\/\w+/.test(he.userAgent) || he.maxTouchPoints > 2), w = { mac: La || /Mac/.test(he.platform), windows: /Win/.test(he.platform), linux: /Linux|X11/.test(he.platform), ie: fr, ie_version: ah ? $s.documentMode || 6 : vs ? +vs[1] : Ps ? +Ps[1] : 0, gecko: Ra, gecko_version: Ra ? +(/Firefox\/(\d+)/.exec(he.userAgent) || [0, 0])[1] : 0, chrome: !!bs, chrome_version: bs ? +bs[1] : 0, ios: La, android: /Android\b/.test(he.userAgent), webkit: Ma, webkit_version: Ma ? +(/\bAppleWebKit\/(\d+)/.exec(he.userAgent) || [0, 0])[1] : 0, safari: Ts, safari_version: Ts ? +(/\bVersion\/(\d+(\.\d+)?)/.exec(he.userAgent) || [0, 0])[1] : 0, tabSize: $s.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size" };
      function uo(n, e) {
        for (let t in n) t == "class" && e.class ? e.class += " " + n.class : t == "style" && e.style ? e.style += ";" + n.style : e[t] = n[t];
        return e;
      }
      var Fn = /* @__PURE__ */ Object.create(null);
      function Oo(n, e, t) {
        if (n == e) return true;
        n || (n = Fn), e || (e = Fn);
        let i = Object.keys(n), r = Object.keys(e);
        if (i.length - (t && i.indexOf(t) > -1 ? 1 : 0) != r.length - (t && r.indexOf(t) > -1 ? 1 : 0)) return false;
        for (let s of i) if (s != t && (r.indexOf(s) == -1 || n[s] !== e[s])) return false;
        return true;
      }
      function eO(n, e) {
        for (let t = n.attributes.length - 1; t >= 0; t--) {
          let i = n.attributes[t].name;
          e[i] == null && n.removeAttribute(i);
        }
        for (let t in e) {
          let i = e[t];
          t == "style" ? n.style.cssText = i : n.getAttribute(t) != i && n.setAttribute(t, i);
        }
      }
      function Ea(n, e, t) {
        let i = false;
        if (e) for (let r in e) t && r in t || (i = true, r == "style" ? n.style.cssText = "" : n.removeAttribute(r));
        if (t) for (let r in t) e && e[r] == t[r] || (i = true, r == "style" ? n.style.cssText = t[r] : n.setAttribute(r, t[r]));
        return i;
      }
      function tO(n) {
        let e = /* @__PURE__ */ Object.create(null);
        for (let t = 0; t < n.attributes.length; t++) {
          let i = n.attributes[t];
          e[i.name] = i.value;
        }
        return e;
      }
      var lt = class {
        eq(e) {
          return false;
        }
        updateDOM(e, t, i) {
          return false;
        }
        compare(e) {
          return this == e || this.constructor == e.constructor && this.eq(e);
        }
        get estimatedHeight() {
          return -1;
        }
        get lineBreaks() {
          return 0;
        }
        ignoreEvent(e) {
          return true;
        }
        coordsAt(e, t, i) {
          return null;
        }
        get isHidden() {
          return false;
        }
        get editable() {
          return false;
        }
        destroy(e) {
        }
      }, me = (function(n) {
        return n[n.Text = 0] = "Text", n[n.WidgetBefore = 1] = "WidgetBefore", n[n.WidgetAfter = 2] = "WidgetAfter", n[n.WidgetRange = 3] = "WidgetRange", n;
      })(me || (me = {})), Y = class extends Te {
        constructor(e, t, i, r) {
          super(), this.startSide = e, this.endSide = t, this.widget = i, this.spec = r;
        }
        get heightRelevant() {
          return false;
        }
        static mark(e) {
          return new Ui(e);
        }
        static widget(e) {
          let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), i = !!e.block;
          return t += i && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new qt(e, t, t, i, e.widget || null, false);
        }
        static replace(e) {
          let t = !!e.block, i, r;
          if (e.isBlockGap) i = -5e8, r = 4e8;
          else {
            let { start: s, end: o } = hh(e, t);
            i = (s ? t ? -3e8 : -1 : 5e8) - 1, r = (o ? t ? 2e8 : 1 : -6e8) + 1;
          }
          return new qt(e, i, r, t, e.widget || null, true);
        }
        static line(e) {
          return new Fi(e);
        }
        static set(e, t = false) {
          return _.of(e, t);
        }
        hasHeight() {
          return this.widget ? this.widget.estimatedHeight > -1 : false;
        }
      };
      Y.none = _.empty;
      var Ui = class n extends Y {
        constructor(e) {
          let { start: t, end: i } = hh(e);
          super(t ? -1 : 5e8, i ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? uo(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || Fn;
        }
        eq(e) {
          return this == e || e instanceof n && this.tagName == e.tagName && Oo(this.attrs, e.attrs);
        }
        range(e, t = e) {
          if (e >= t) throw new RangeError("Mark decorations may not be empty");
          return super.range(e, t);
        }
      };
      Ui.prototype.point = false;
      var Fi = class n extends Y {
        constructor(e) {
          super(-2e8, -2e8, null, e);
        }
        eq(e) {
          return e instanceof n && this.spec.class == e.spec.class && Oo(this.spec.attributes, e.spec.attributes);
        }
        range(e, t = e) {
          if (t != e) throw new RangeError("Line decoration ranges must be zero-length");
          return super.range(e, t);
        }
      };
      Fi.prototype.mapMode = se.TrackBefore;
      Fi.prototype.point = true;
      var qt = class n extends Y {
        constructor(e, t, i, r, s, o) {
          super(t, i, s, e), this.block = r, this.isReplace = o, this.mapMode = r ? t <= 0 ? se.TrackBefore : se.TrackAfter : se.TrackDel;
        }
        get type() {
          return this.startSide != this.endSide ? me.WidgetRange : this.startSide <= 0 ? me.WidgetBefore : me.WidgetAfter;
        }
        get heightRelevant() {
          return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
        }
        eq(e) {
          return e instanceof n && iO(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
        }
        range(e, t = e) {
          if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0)) throw new RangeError("Invalid range for replacement decoration");
          if (!this.isReplace && t != e) throw new RangeError("Widget decorations can only have zero-length ranges");
          return super.range(e, t);
        }
      };
      qt.prototype.point = true;
      function hh(n, e = false) {
        let { inclusiveStart: t, inclusiveEnd: i } = n;
        return t == null && (t = n.inclusive), i == null && (i = n.inclusive), { start: t ?? e, end: i ?? e };
      }
      function iO(n, e) {
        return n == e || !!(n && e && n.compare(e));
      }
      function Oi(n, e, t, i = 0) {
        let r = t.length - 1;
        r >= 0 && t[r] + i >= n ? t[r] = Math.max(t[r], e) : t.push(n, e);
      }
      var Hn = class n extends Te {
        constructor(e, t, i) {
          super(), this.tagName = e, this.attributes = t, this.rank = i;
        }
        eq(e) {
          return e == this || e instanceof n && this.tagName == e.tagName && Oo(this.attributes, e.attributes);
        }
        static create(e) {
          return new n(e.tagName, e.attributes || Fn, e.rank == null ? 50 : Math.max(0, Math.min(e.rank, 100)));
        }
        static set(e, t = false) {
          return _.of(e, t);
        }
      };
      Hn.prototype.startSide = Hn.prototype.endSide = -1;
      function Hi(n) {
        let e;
        return n.nodeType == 11 ? e = n.getSelection ? n : n.ownerDocument : e = n, e.getSelection();
      }
      function Cs(n, e) {
        return e ? n == e || n.contains(e.nodeType != 1 ? e.parentNode : e) : false;
      }
      function Vi(n, e) {
        if (!e.anchorNode) return false;
        try {
          return Cs(n, e.anchorNode);
        } catch {
          return false;
        }
      }
      function In(n) {
        return n.nodeType == 3 ? Ki(n, 0, n.nodeValue.length).getClientRects() : n.nodeType == 1 ? n.getClientRects() : [];
      }
      function Wi(n, e, t, i) {
        return t ? ja(n, e, t, i, -1) || ja(n, e, t, i, 1) : false;
      }
      function St(n) {
        for (var e = 0; ; e++) if (n = n.previousSibling, !n) return e;
      }
      function Kn(n) {
        return n.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName);
      }
      function ja(n, e, t, i, r) {
        for (; ; ) {
          if (n == t && e == i) return true;
          if (e == (r < 0 ? 0 : at(n))) {
            if (n.nodeName == "DIV") return false;
            let s = n.parentNode;
            if (!s || s.nodeType != 1) return false;
            e = St(n) + (r < 0 ? 0 : 1), n = s;
          } else if (n.nodeType == 1) {
            if (n = n.childNodes[e + (r < 0 ? -1 : 0)], n.nodeType == 1 && n.contentEditable == "false") return false;
            e = r < 0 ? at(n) : 0;
          } else return false;
        }
      }
      function at(n) {
        return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
      }
      function Jn(n, e) {
        let { left: t, right: i } = n;
        if (t == i) return n;
        let r = e ? t : i;
        return { left: r, right: r, top: n.top, bottom: n.bottom };
      }
      function nO(n) {
        let e = n.visualViewport;
        return e ? { left: 0, right: e.width, top: 0, bottom: e.height } : { left: 0, right: n.innerWidth, top: 0, bottom: n.innerHeight };
      }
      function ch(n, e) {
        let t = e.width / n.offsetWidth, i = e.height / n.offsetHeight;
        return (t > 0.995 && t < 1.005 || !isFinite(t) || Math.abs(e.width - n.offsetWidth) < 1) && (t = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(e.height - n.offsetHeight) < 1) && (i = 1), { scaleX: t, scaleY: i };
      }
      function rO(n, e, t, i, r, s, o, l) {
        let a = n.ownerDocument, h7 = a.defaultView || window;
        for (let c = n, f = false; c && !f; ) if (c.nodeType == 1) {
          let u, d = c == a.body, O = 1, m = 1;
          if (d) u = nO(h7);
          else {
            if (/^(fixed|sticky)$/.test(getComputedStyle(c).position) && (f = true), c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
              c = c.assignedSlot || c.parentNode;
              continue;
            }
            let x = c.getBoundingClientRect();
            ({ scaleX: O, scaleY: m } = ch(c, x)), u = { left: x.left, right: x.left + c.clientWidth * O, top: x.top, bottom: x.top + c.clientHeight * m };
          }
          let g = 0, S = 0;
          if (r == "nearest") e.top < u.top + o ? (S = e.top - (u.top + o), t > 0 && e.bottom > u.bottom + S && (S = e.bottom - u.bottom + o)) : e.bottom > u.bottom - o && (S = e.bottom - u.bottom + o, t < 0 && e.top - S < u.top && (S = e.top - (u.top + o)));
          else {
            let x = e.bottom - e.top, y = u.bottom - u.top;
            S = (r == "center" && x <= y ? e.top + x / 2 - y / 2 : r == "start" || r == "center" && t < 0 ? e.top - o : e.bottom - y + o) - u.top;
          }
          if (i == "nearest" ? e.left < u.left + s ? (g = e.left - (u.left + s), t > 0 && e.right > u.right + g && (g = e.right - u.right + s)) : e.right > u.right - s && (g = e.right - u.right + s, t < 0 && e.left < u.left + g && (g = e.left - (u.left + s))) : g = (i == "center" ? e.left + (e.right - e.left) / 2 - (u.right - u.left) / 2 : i == "start" == l ? e.left - s : e.right - (u.right - u.left) + s) - u.left, g || S) if (d) h7.scrollBy(g, S);
          else {
            let x = 0, y = 0;
            if (S) {
              let R = c.scrollTop;
              c.scrollTop += S / m, y = (c.scrollTop - R) * m;
            }
            if (g) {
              let R = c.scrollLeft;
              c.scrollLeft += g / O, x = (c.scrollLeft - R) * O;
            }
            e = { left: e.left - x, top: e.top - y, right: e.right - x, bottom: e.bottom - y }, x && Math.abs(x - g) < 1 && (i = "nearest"), y && Math.abs(y - S) < 1 && (r = "nearest");
          }
          if (d) break;
          (e.top < u.top || e.bottom > u.bottom || e.left < u.left || e.right > u.right) && (e = { left: Math.max(e.left, u.left), right: Math.min(e.right, u.right), top: Math.max(e.top, u.top), bottom: Math.min(e.bottom, u.bottom) }), c = c.assignedSlot || c.parentNode;
        } else if (c.nodeType == 11) c = c.host;
        else break;
      }
      function fh(n, e = true) {
        let t = n.ownerDocument, i = null, r = null;
        for (let s = n.parentNode; s && !(s == t.body || (!e || i) && r); ) if (s.nodeType == 1) !r && s.scrollHeight > s.clientHeight && (r = s), e && !i && s.scrollWidth > s.clientWidth && (i = s), s = s.assignedSlot || s.parentNode;
        else if (s.nodeType == 11) s = s.host;
        else break;
        return { x: i, y: r };
      }
      var Zs = class {
        constructor() {
          this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
        }
        eq(e) {
          return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
        }
        setRange(e) {
          let { anchorNode: t, focusNode: i } = e;
          this.set(t, Math.min(e.anchorOffset, t ? at(t) : 0), i, Math.min(e.focusOffset, i ? at(i) : 0));
        }
        set(e, t, i, r) {
          this.anchorNode = e, this.anchorOffset = t, this.focusNode = i, this.focusOffset = r;
        }
      };
      function uh(n) {
        let e = [];
        for (let t = n; t; t = t.nodeType == 11 ? t.host : t.parentNode) t.nodeType == 1 && e.push({ node: t, left: t.scrollLeft, top: t.scrollTop });
        return e;
      }
      function dh(n, e = true) {
        for (let { node: t, left: i, top: r } of n) e && t.scrollTop != r && (t.scrollTop = r), t.scrollLeft != i && (t.scrollLeft = i);
      }
      var Dt = null;
      w.safari && w.safari_version >= 26 && (Dt = false);
      function Oh(n) {
        if (n.setActive) return n.setActive();
        if (Dt) return n.focus(Dt);
        let e = uh(n);
        n.focus(Dt == null ? { get preventScroll() {
          return Dt = { preventScroll: true }, true;
        } } : void 0), Dt || (Dt = false, dh(e));
      }
      var za;
      function Ki(n, e, t = e) {
        let i = za || (za = document.createRange());
        return i.setEnd(n, t), i.setStart(n, e), i;
      }
      function pi(n, e, t, i) {
        let r = { key: e, code: e, keyCode: t, which: t, cancelable: true };
        i && ({ altKey: r.altKey, ctrlKey: r.ctrlKey, shiftKey: r.shiftKey, metaKey: r.metaKey } = i);
        let s = new KeyboardEvent("keydown", r);
        s.synthetic = true, n.dispatchEvent(s);
        let o = new KeyboardEvent("keyup", r);
        return o.synthetic = true, n.dispatchEvent(o), s.defaultPrevented || o.defaultPrevented;
      }
      function sO(n) {
        for (; n; ) {
          if (n && (n.nodeType == 9 || n.nodeType == 11 && n.host)) return n;
          n = n.assignedSlot || n.parentNode;
        }
        return null;
      }
      function oO(n, e) {
        let t = e.focusNode, i = e.focusOffset;
        if (!t || e.anchorNode != t || e.anchorOffset != i) return false;
        for (i = Math.min(i, at(t)); ; ) if (i) {
          if (t.nodeType != 1) return false;
          let r = t.childNodes[i - 1];
          r.contentEditable == "false" ? i-- : (t = r, i = at(t));
        } else {
          if (t == n) return true;
          i = St(t), t = t.parentNode;
        }
      }
      function ph(n) {
        return n instanceof Window ? n.pageYOffset > Math.max(0, n.document.documentElement.scrollHeight - n.innerHeight - 4) : n.scrollTop > Math.max(1, n.scrollHeight - n.clientHeight - 4);
      }
      function mh(n, e) {
        for (let t = n, i = e; ; ) {
          if (t.nodeType == 3 && i > 0) return { node: t, offset: i };
          if (t.nodeType == 1 && i > 0) {
            if (t.contentEditable == "false") return null;
            t = t.childNodes[i - 1], i = at(t);
          } else if (t.parentNode && !Kn(t)) i = St(t), t = t.parentNode;
          else return null;
        }
      }
      function gh(n, e) {
        for (let t = n, i = e; ; ) {
          if (t.nodeType == 3 && i < t.nodeValue.length) return { node: t, offset: i };
          if (t.nodeType == 1 && i < t.childNodes.length) {
            if (t.contentEditable == "false") return null;
            t = t.childNodes[i], i = 0;
          } else if (t.parentNode && !Kn(t)) i = St(t) + 1, t = t.parentNode;
          else return null;
        }
      }
      var Ke = class n {
        constructor(e, t, i = true) {
          this.node = e, this.offset = t, this.precise = i;
        }
        static before(e, t) {
          return new n(e.parentNode, St(e), t);
        }
        static after(e, t) {
          return new n(e.parentNode, St(e) + 1, t);
        }
      }, U = (function(n) {
        return n[n.LTR = 0] = "LTR", n[n.RTL = 1] = "RTL", n;
      })(U || (U = {})), It = U.LTR, po = U.RTL;
      function Sh(n) {
        let e = [];
        for (let t = 0; t < n.length; t++) e.push(1 << +n[t]);
        return e;
      }
      var lO = Sh("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), aO = Sh("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), As = /* @__PURE__ */ Object.create(null), He = [];
      for (let n of ["()", "[]", "{}"]) {
        let e = n.charCodeAt(0), t = n.charCodeAt(1);
        As[e] = t, As[t] = -e;
      }
      function bh(n) {
        return n <= 247 ? lO[n] : 1424 <= n && n <= 1524 ? 2 : 1536 <= n && n <= 1785 ? aO[n - 1536] : 1774 <= n && n <= 2220 ? 4 : 8192 <= n && n <= 8204 ? 256 : 64336 <= n && n <= 65023 ? 4 : 1;
      }
      var hO = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/, Xe = class {
        get dir() {
          return this.level % 2 ? po : It;
        }
        constructor(e, t, i) {
          this.from = e, this.to = t, this.level = i;
        }
        side(e, t) {
          return this.dir == t == e ? this.to : this.from;
        }
        forward(e, t) {
          return e == (this.dir == t);
        }
        static find(e, t, i, r) {
          let s = -1;
          for (let o = 0; o < e.length; o++) {
            let l = e[o];
            if (l.from <= t && l.to >= t) {
              if (l.level == i) return o;
              (s < 0 || (r != 0 ? r < 0 ? l.from < t : l.to > t : e[s].level > l.level)) && (s = o);
            }
          }
          if (s < 0) throw new RangeError("Index out of range");
          return s;
        }
      };
      function yh(n, e) {
        if (n.length != e.length) return false;
        for (let t = 0; t < n.length; t++) {
          let i = n[t], r = e[t];
          if (i.from != r.from || i.to != r.to || i.direction != r.direction || !yh(i.inner, r.inner)) return false;
        }
        return true;
      }
      var B = [];
      function cO(n, e, t, i, r) {
        for (let s = 0; s <= i.length; s++) {
          let o = s ? i[s - 1].to : e, l = s < i.length ? i[s].from : t, a = s ? 256 : r;
          for (let h7 = o, c = a, f = a; h7 < l; h7++) {
            let u = bh(n.charCodeAt(h7));
            u == 512 ? u = c : u == 8 && f == 4 && (u = 16), B[h7] = u == 4 ? 2 : u, u & 7 && (f = u), c = u;
          }
          for (let h7 = o, c = a, f = a; h7 < l; h7++) {
            let u = B[h7];
            if (u == 128) h7 < l - 1 && c == B[h7 + 1] && c & 24 ? u = B[h7] = c : B[h7] = 256;
            else if (u == 64) {
              let d = h7 + 1;
              for (; d < l && B[d] == 64; ) d++;
              let O = h7 && c == 8 || d < t && B[d] == 8 ? f == 1 ? 1 : 8 : 256;
              for (let m = h7; m < d; m++) B[m] = O;
              h7 = d - 1;
            } else u == 8 && f == 1 && (B[h7] = 1);
            c = u, u & 7 && (f = u);
          }
        }
      }
      function fO(n, e, t, i, r) {
        let s = r == 1 ? 2 : 1;
        for (let o = 0, l = 0, a = 0; o <= i.length; o++) {
          let h7 = o ? i[o - 1].to : e, c = o < i.length ? i[o].from : t;
          for (let f = h7, u, d, O; f < c; f++) if (d = As[u = n.charCodeAt(f)]) if (d < 0) {
            for (let m = l - 3; m >= 0; m -= 3) if (He[m + 1] == -d) {
              let g = He[m + 2], S = g & 2 ? r : g & 4 ? g & 1 ? s : r : 0;
              S && (B[f] = B[He[m]] = S), l = m;
              break;
            }
          } else {
            if (He.length == 189) break;
            He[l++] = f, He[l++] = u, He[l++] = a;
          }
          else if ((O = B[f]) == 2 || O == 1) {
            let m = O == r;
            a = m ? 0 : 1;
            for (let g = l - 3; g >= 0; g -= 3) {
              let S = He[g + 2];
              if (S & 2) break;
              if (m) He[g + 2] |= 2;
              else {
                if (S & 4) break;
                He[g + 2] |= 4;
              }
            }
          }
        }
      }
      function uO(n, e, t, i) {
        for (let r = 0, s = i; r <= t.length; r++) {
          let o = r ? t[r - 1].to : n, l = r < t.length ? t[r].from : e;
          for (let a = o; a < l; ) {
            let h7 = B[a];
            if (h7 == 256) {
              let c = a + 1;
              for (; ; ) if (c == l) {
                if (r == t.length) break;
                c = t[r++].to, l = r < t.length ? t[r].from : e;
              } else if (B[c] == 256) c++;
              else break;
              let f = s == 1, u = (c < e ? B[c] : i) == 1, d = f == u ? f ? 1 : 2 : i;
              for (let O = c, m = r, g = m ? t[m - 1].to : n; O > a; ) O == g && (O = t[--m].from, g = m ? t[m - 1].to : n), B[--O] = d;
              a = c;
            } else s = h7, a++;
          }
        }
      }
      function Xs(n, e, t, i, r, s, o) {
        let l = i % 2 ? 2 : 1;
        if (i % 2 == r % 2) for (let a = e, h7 = 0; a < t; ) {
          let c = true, f = false;
          if (h7 == s.length || a < s[h7].from) {
            let m = B[a];
            m != l && (c = false, f = m == 16);
          }
          let u = !c && l == 1 ? [] : null, d = c ? i : i + 1, O = a;
          e: for (; ; ) if (h7 < s.length && O == s[h7].from) {
            if (f) break e;
            let m = s[h7];
            if (!c) for (let g = m.to, S = h7 + 1; ; ) {
              if (g == t) break e;
              if (S < s.length && s[S].from == g) g = s[S++].to;
              else {
                if (B[g] == l) break e;
                break;
              }
            }
            if (h7++, u) u.push(m);
            else {
              m.from > a && o.push(new Xe(a, m.from, d));
              let g = m.direction == It != !(d % 2);
              Rs(n, g ? i + 1 : i, r, m.inner, m.from, m.to, o), a = m.to;
            }
            O = m.to;
          } else {
            if (O == t || (c ? B[O] != l : B[O] == l)) break;
            O++;
          }
          u ? Xs(n, a, O, i + 1, r, u, o) : a < O && o.push(new Xe(a, O, d)), a = O;
        }
        else for (let a = t, h7 = s.length; a > e; ) {
          let c = true, f = false;
          if (!h7 || a > s[h7 - 1].to) {
            let m = B[a - 1];
            m != l && (c = false, f = m == 16);
          }
          let u = !c && l == 1 ? [] : null, d = c ? i : i + 1, O = a;
          e: for (; ; ) if (h7 && O == s[h7 - 1].to) {
            if (f) break e;
            let m = s[--h7];
            if (!c) for (let g = m.from, S = h7; ; ) {
              if (g == e) break e;
              if (S && s[S - 1].to == g) g = s[--S].from;
              else {
                if (B[g - 1] == l) break e;
                break;
              }
            }
            if (u) u.push(m);
            else {
              m.to < a && o.push(new Xe(m.to, a, d));
              let g = m.direction == It != !(d % 2);
              Rs(n, g ? i + 1 : i, r, m.inner, m.from, m.to, o), a = m.from;
            }
            O = m.from;
          } else {
            if (O == e || (c ? B[O - 1] != l : B[O - 1] == l)) break;
            O--;
          }
          u ? Xs(n, O, a, i + 1, r, u, o) : O < a && o.push(new Xe(O, a, d)), a = O;
        }
      }
      function Rs(n, e, t, i, r, s, o) {
        let l = e % 2 ? 2 : 1;
        cO(n, r, s, i, l), fO(n, r, s, i, l), uO(r, s, i, l), Xs(n, r, s, e, t, i, o);
      }
      function dO(n, e, t) {
        if (!n) return [new Xe(0, 0, e == po ? 1 : 0)];
        if (e == It && !t.length && !hO.test(n)) return Qh(n.length);
        if (t.length) for (; n.length > B.length; ) B[B.length] = 256;
        let i = [], r = e == It ? 0 : 1;
        return Rs(n, r, r, t, 0, n.length, i), i;
      }
      function Qh(n) {
        return [new Xe(0, n, 0)];
      }
      var xh = "";
      function OO(n, e, t, i, r) {
        var s;
        let o = i.head - n.from, l = Xe.find(e, o, (s = i.bidiLevel) !== null && s !== void 0 ? s : -1, i.assoc), a = e[l], h7 = a.side(r, t);
        if (o == h7) {
          let u = l += r ? 1 : -1;
          if (u < 0 || u >= e.length) return null;
          a = e[l = u], o = a.side(!r, t), h7 = a.side(r, t);
        }
        let c = ie(n.text, o, a.forward(r, t));
        (c < a.from || c > a.to) && (c = h7), xh = n.text.slice(Math.min(o, c), Math.max(o, c));
        let f = l == (r ? e.length - 1 : 0) ? null : e[l + (r ? 1 : -1)];
        return f && c == h7 && f.level + (r ? 0 : 1) < a.level ? b.cursor(f.side(!r, t) + n.from, f.forward(r, t) ? 1 : -1, f.level) : b.cursor(c + n.from, a.forward(r, t) ? -1 : 1, a.level);
      }
      function pO(n, e, t) {
        for (let i = e; i < t; i++) {
          let r = bh(n.charCodeAt(i));
          if (r == 1) return It;
          if (r == 2 || r == 4) return po;
        }
        return It;
      }
      var kh = $.define(), wh = $.define(), $h = $.define(), Ph = $.define(), Ms = $.define(), vh = $.define(), Th = $.define(), mo = $.define(), go = $.define(), Ch = $.define({ combine: (n) => n.some((e) => e) }), mO = $.define({ combine: (n) => n.some((e) => e) }), Zh = $.define(), Di = class n {
        constructor(e, t, i, r, s, o = false) {
          this.range = e, this.y = t, this.x = i, this.yMargin = r, this.xMargin = s, this.isSnapshot = o;
        }
        map(e) {
          return e.empty ? this : new n(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
        }
        clip(e) {
          return this.range.to <= e.doc.length ? this : new n(b.cursor(e.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
        }
      }, Yn = V.define({ map: (n, e) => n.map(e) }), Ah = V.define();
      function Re(n, e, t) {
        let i = n.facet(Ph);
        i.length ? i[0](e) : window.onerror && window.onerror(String(e), t, void 0, void 0, e) || (t ? console.error(t + ":", e) : console.error(e));
      }
      var st = $.define({ combine: (n) => n.length ? n[0] : true }), gO = 0, fi = $.define({ combine(n) {
        return n.filter((e, t) => {
          for (let i = 0; i < t; i++) if (n[i].plugin == e.plugin) return false;
          return true;
        });
      } }), Ye = class n {
        constructor(e, t, i, r, s) {
          this.id = e, this.create = t, this.domEventHandlers = i, this.domEventObservers = r, this.baseExtensions = s(this), this.extension = this.baseExtensions.concat(fi.of({ plugin: this, arg: void 0 }));
        }
        of(e) {
          return this.baseExtensions.concat(fi.of({ plugin: this, arg: e }));
        }
        static define(e, t) {
          let { eventHandlers: i, eventObservers: r, provide: s, decorations: o } = t || {};
          return new n(gO++, e, i, r, (l) => {
            let a = [];
            return o && a.push(ur.of((h7) => {
              let c = h7.plugin(l);
              return c ? o(c) : Y.none;
            })), s && a.push(s(l)), a;
          });
        }
        static fromClass(e, t) {
          return n.define((i, r) => new e(i, r), t);
        }
      }, Bi = class {
        constructor(e) {
          this.spec = e, this.mustUpdate = null, this.value = null;
        }
        get plugin() {
          return this.spec && this.spec.plugin;
        }
        update(e) {
          if (this.value) {
            if (this.mustUpdate) {
              let t = this.mustUpdate;
              if (this.mustUpdate = null, this.value.update) try {
                this.value.update(t);
              } catch (i) {
                if (Re(t.state, i, "CodeMirror plugin crashed"), this.value.destroy) try {
                  this.value.destroy();
                } catch {
                }
                this.deactivate();
              }
            }
          } else if (this.spec) try {
            this.value = this.spec.plugin.create(e, this.spec.arg);
          } catch (t) {
            Re(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
          }
          return this;
        }
        destroy(e) {
          var t;
          if (!((t = this.value) === null || t === void 0) && t.destroy) try {
            this.value.destroy();
          } catch (i) {
            Re(e.state, i, "CodeMirror plugin crashed");
          }
        }
        deactivate() {
          this.spec = this.value = null;
        }
      }, Xh = $.define(), So = $.define(), ur = $.define(), Rh = $.define(), bo = $.define(), Ji = $.define(), Mh = $.define();
      function Ya(n, e) {
        let t = n.state.facet(Mh);
        if (!t.length) return t;
        let i = t.map((s) => s instanceof Function ? s(n) : s), r = [];
        return _.spans(i, e.from, e.to, { point() {
        }, span(s, o, l, a) {
          let h7 = s - e.from, c = o - e.from, f = r;
          for (let u = l.length - 1; u >= 0; u--, a--) {
            let d = l[u].spec.bidiIsolate, O;
            if (d == null && (d = pO(e.text, h7, c)), a > 0 && f.length && (O = f[f.length - 1]).to == h7 && O.direction == d) O.to = c, f = O.inner;
            else {
              let m = { from: h7, to: c, direction: d, inner: [] };
              f.push(m), f = m.inner;
            }
          }
        } }), r;
      }
      var Lh = $.define();
      function Eh(n) {
        let e = 0, t = 0, i = 0, r = 0;
        for (let s of n.state.facet(Lh)) {
          let o = s(n);
          o && (o.left != null && (e = Math.max(e, o.left)), o.right != null && (t = Math.max(t, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (r = Math.max(r, o.bottom)));
        }
        return { left: e, right: t, top: i, bottom: r };
      }
      var Yi = $.define(), ze = class n {
        constructor(e, t, i, r) {
          this.fromA = e, this.toA = t, this.fromB = i, this.toB = r;
        }
        join(e) {
          return new n(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
        }
        addToSet(e) {
          let t = e.length, i = this;
          for (; t > 0; t--) {
            let r = e[t - 1];
            if (!(r.fromA > i.toA)) {
              if (r.toA < i.fromA) break;
              i = i.join(r), e.splice(t - 1, 1);
            }
          }
          return e.splice(t, 0, i), e;
        }
        static extendWithRanges(e, t) {
          if (t.length == 0) return e;
          let i = [];
          for (let r = 0, s = 0, o = 0; ; ) {
            let l = r < e.length ? e[r].fromB : 1e9, a = s < t.length ? t[s] : 1e9, h7 = Math.min(l, a);
            if (h7 == 1e9) break;
            let c = h7 + o, f = h7, u = c;
            for (; ; ) if (s < t.length && t[s] <= f) {
              let d = t[s + 1];
              s += 2, f = Math.max(f, d);
              for (let O = r; O < e.length && e[O].fromB <= f; O++) o = e[O].toA - e[O].toB;
              u = Math.max(u, d + o);
            } else if (r < e.length && e[r].fromB <= f) {
              let d = e[r++];
              f = Math.max(f, d.toB), u = Math.max(u, d.toA), o = d.toA - d.toB;
            } else break;
            i.push(new n(c, u, h7, f));
          }
          return i;
        }
      }, er = class n {
        constructor(e, t, i) {
          this.view = e, this.state = t, this.transactions = i, this.flags = 0, this.startState = e.state, this.changes = ae.empty(this.startState.doc.length);
          for (let s of i) this.changes = this.changes.compose(s.changes);
          let r = [];
          this.changes.iterChangedRanges((s, o, l, a) => r.push(new ze(s, o, l, a))), this.changedRanges = r;
        }
        static create(e, t, i) {
          return new n(e, t, i);
        }
        get viewportChanged() {
          return (this.flags & 4) > 0;
        }
        get viewportMoved() {
          return (this.flags & 8) > 0;
        }
        get heightChanged() {
          return (this.flags & 2) > 0;
        }
        get geometryChanged() {
          return this.docChanged || (this.flags & 18) > 0;
        }
        get focusChanged() {
          return (this.flags & 1) > 0;
        }
        get docChanged() {
          return !this.changes.empty;
        }
        get selectionSet() {
          return this.transactions.some((e) => e.selection);
        }
        get empty() {
          return this.flags == 0 && this.transactions.length == 0;
        }
      }, SO = [], F = class {
        constructor(e, t, i = 0) {
          this.dom = e, this.length = t, this.flags = i, this.parent = null, e.cmTile = this;
        }
        get breakAfter() {
          return this.flags & 1;
        }
        get children() {
          return SO;
        }
        isWidget() {
          return false;
        }
        get isHidden() {
          return false;
        }
        isComposite() {
          return false;
        }
        isLine() {
          return false;
        }
        isText() {
          return false;
        }
        isBlock() {
          return false;
        }
        get domAttrs() {
          return null;
        }
        sync(e) {
          if (this.flags |= 2, this.flags & 4) {
            this.flags &= -5;
            let t = this.domAttrs;
            t && eO(this.dom, t);
          }
        }
        toString() {
          return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
        }
        destroy() {
          this.parent = null;
        }
        setDOM(e) {
          this.dom = e, e.cmTile = this;
        }
        get posAtStart() {
          return this.parent ? this.parent.posBefore(this) : 0;
        }
        get posAtEnd() {
          return this.posAtStart + this.length;
        }
        posBefore(e, t = this.posAtStart) {
          let i = t;
          for (let r of this.children) {
            if (r == e) return i;
            i += r.length + r.breakAfter;
          }
          throw new RangeError("Invalid child in posBefore");
        }
        posAfter(e) {
          return this.posBefore(e) + e.length;
        }
        covers(e) {
          return true;
        }
        coordsIn(e, t, i) {
          return null;
        }
        domPosFor(e, t) {
          let i = St(this.dom), r = this.length ? e > 0 : t > 0;
          return new Ke(this.parent.dom, i + (r ? 1 : 0), e == 0 || e == this.length);
        }
        markDirty(e) {
          this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(false);
        }
        get overrideDOMText() {
          return null;
        }
        get root() {
          for (let e = this; e; e = e.parent) if (e instanceof gi) return e;
          return null;
        }
        static get(e) {
          return e.cmTile;
        }
      }, mi = class extends F {
        constructor(e) {
          super(e, 0), this._children = [];
        }
        isComposite() {
          return true;
        }
        get children() {
          return this._children;
        }
        get lastChild() {
          return this.children.length ? this.children[this.children.length - 1] : null;
        }
        append(e) {
          this.children.push(e), e.parent = this;
        }
        sync(e) {
          if (this.flags & 2) return;
          super.sync(e);
          let t = this.dom, i = null, r, s = e?.node == t ? e : null, o = 0;
          for (let l of this.children) {
            if (l.sync(e), o += l.length + l.breakAfter, r = i ? i.nextSibling : t.firstChild, s && r != l.dom && (s.written = true), l.dom.parentNode == t) for (; r && r != l.dom; ) r = _a(r);
            else t.insertBefore(l.dom, r);
            i = l.dom;
          }
          for (r = i ? i.nextSibling : t.firstChild, s && r && (s.written = true); r; ) r = _a(r);
          this.length = o;
        }
      };
      function _a(n) {
        let e = n.nextSibling;
        return n.parentNode.removeChild(n), e;
      }
      var gi = class extends mi {
        constructor(e, t) {
          super(t), this.view = e;
        }
        owns(e) {
          for (; e; e = e.parent) if (e == this) return true;
          return false;
        }
        isBlock() {
          return true;
        }
        nearest(e) {
          for (; ; ) {
            if (!e) return null;
            let t = F.get(e);
            if (t && this.owns(t)) return t;
            e = e.parentNode;
          }
        }
        blockTiles(e) {
          for (let t = [], i = this, r = 0, s = 0; ; ) if (r == i.children.length) {
            if (!t.length) return;
            i = i.parent, i.breakAfter && s++, r = t.pop();
          } else {
            let o = i.children[r++];
            if (o instanceof ot) t.push(r), i = o, r = 0;
            else {
              let l = s + o.length, a = e(o, s);
              if (a !== void 0) return a;
              s = l + o.breakAfter;
            }
          }
        }
        resolveBlock(e, t) {
          let i, r = -1, s, o = -1;
          if (this.blockTiles((l, a) => {
            let h7 = a + l.length;
            if (e >= a && e <= h7) {
              if (l.isWidget() && t >= -1 && t <= 1) {
                if (l.flags & 32) return true;
                l.flags & 16 && (i = void 0);
              }
              (a < e || e == h7 && (t < -1 ? l.length : l.covers(1))) && (!i || !l.isWidget() && i.isWidget()) && (i = l, r = e - a), (h7 > e || e == a && (t > 1 ? l.length : l.covers(-1))) && (!s || !l.isWidget() && s.isWidget()) && (s = l, o = e - a);
            }
          }), !i && !s) throw new Error("No tile at position " + e);
          return i && t < 0 || !s ? { tile: i, offset: r } : { tile: s, offset: o };
        }
      }, ot = class n extends mi {
        constructor(e, t) {
          super(e), this.wrapper = t;
        }
        isBlock() {
          return true;
        }
        covers(e) {
          return this.children.length ? e < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1) : false;
        }
        get domAttrs() {
          return this.wrapper.attributes;
        }
        static of(e, t) {
          let i = new n(t || document.createElement(e.tagName), e);
          return t || (i.flags |= 4), i;
        }
      }, Si = class n extends mi {
        constructor(e, t) {
          super(e), this.attrs = t;
        }
        isLine() {
          return true;
        }
        static start(e, t, i) {
          let r = new n(t || document.createElement("div"), e);
          return (!t || !i) && (r.flags |= 4), r;
        }
        get domAttrs() {
          return this.attrs;
        }
        resolveInline(e, t, i) {
          let r = null, s = -1, o = null, l = -1;
          function a(c, f) {
            for (let u = 0, d = 0; u < c.children.length && d <= f; u++) {
              let O = c.children[u], m = d + O.length;
              m >= f && (O.isComposite() ? a(O, f - d) : (!o || o.isHidden && (t > 0 && !(o.flags & 32) || i && yO(o, O))) && (m > f || O.flags & 32 && t <= 1) ? (o = O, l = f - d) : (d < f || O.flags & 16 && !O.isHidden && t >= -1) && (r = O, s = f - d)), d = m;
            }
          }
          a(this, e);
          let h7 = (t < 0 ? r : o) || r || o;
          return h7 ? { tile: h7, offset: h7 == r ? s : l } : null;
        }
        coordsIn(e, t, i) {
          let r = this.resolveInline(e, t, true);
          return r ? r.tile.coordsIn(Math.max(0, r.offset), t, i) : bO(this);
        }
        domIn(e, t) {
          let i = this.resolveInline(e, t);
          if (i) {
            let { tile: r, offset: s } = i;
            if (this.dom.contains(r.dom)) return r.isText() ? new Ke(r.dom, Math.min(r.dom.nodeValue.length, s)) : r.domPosFor(s, r.flags & 16 ? 1 : r.flags & 32 ? -1 : t);
            let o = i.tile.parent, l = false;
            for (let a of o.children) {
              if (l) return new Ke(a.dom, 0);
              a == i.tile && (l = true);
            }
          }
          return new Ke(this.dom, 0);
        }
      };
      function bO(n) {
        let e = n.dom.lastChild;
        if (!e) return n.dom.getBoundingClientRect();
        let t = In(e);
        return t[t.length - 1] || null;
      }
      function yO(n, e) {
        let t = n.coordsIn(0, 1), i = e.coordsIn(0, 1);
        return t && i && i.top < t.bottom;
      }
      var pe = class n extends mi {
        constructor(e, t) {
          super(e), this.mark = t;
        }
        get domAttrs() {
          return this.mark.attrs;
        }
        static of(e, t) {
          let i = new n(t || document.createElement(e.tagName), e);
          return t || (i.flags |= 4), i;
        }
      }, Bt = class n extends F {
        constructor(e, t) {
          super(e, t.length), this.text = t;
        }
        sync(e) {
          this.flags & 2 || (super.sync(e), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = true), this.dom.nodeValue = this.text));
        }
        isText() {
          return true;
        }
        toString() {
          return JSON.stringify(this.text);
        }
        coordsIn(e, t, i) {
          let r = this.dom.nodeValue.length;
          e > r && (e = r);
          let s = e, o = e, l = 0;
          e == 0 && t < 0 || e == r && t >= 0 ? w.chrome || w.gecko || (e ? (s--, l = 1) : o < r && (o++, l = -1)) : t < 0 ? s-- : o < r && o++;
          let a = Ki(this.dom, s, o).getClientRects();
          if (!a.length) return null;
          let h7 = a[(l ? l < 0 : t >= 0) ? 0 : a.length - 1];
          return w.safari && !l && h7.width == 0 && (h7 = Array.prototype.find.call(a, (c) => c.width) || h7), i == null ? h7 : Jn(h7, (l ? l > 0 : t < 0) == i);
        }
        static of(e, t) {
          let i = new n(t || document.createTextNode(e), e);
          return t || (i.flags |= 2), i;
        }
      }, Nt = class n extends F {
        constructor(e, t, i, r) {
          super(e, t, r), this.widget = i;
        }
        isWidget() {
          return true;
        }
        get isHidden() {
          return this.widget.isHidden;
        }
        covers(e) {
          return this.flags & 48 ? false : (this.flags & (e < 0 ? 64 : 128)) > 0;
        }
        coordsIn(e, t) {
          return this.coordsInWidget(e, t, false);
        }
        coordsInWidget(e, t, i) {
          let r = this.widget.coordsAt(this.dom, e, t);
          if (r) return r;
          if (i) return Jn(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
          {
            let s = this.dom.getClientRects(), o = null;
            if (!s.length) return null;
            let l = this.flags & 16 ? true : this.flags & 32 ? false : e > 0;
            for (let a = l ? s.length - 1 : 0; o = s[a], !(e > 0 ? a == 0 : a == s.length - 1 || o.top < o.bottom); a += l ? -1 : 1) ;
            return Jn(o, !l);
          }
        }
        get overrideDOMText() {
          if (!this.length) return M.empty;
          let { root: e } = this;
          if (!e) return M.empty;
          let t = this.posAtStart;
          return e.view.state.doc.slice(t, t + this.length);
        }
        destroy() {
          super.destroy(), this.widget.destroy(this.dom);
        }
        static of(e, t, i, r, s) {
          return s || (s = e.toDOM(t), e.editable || (s.contentEditable = "false")), new n(s, i, e, r);
        }
      }, bi = class extends F {
        constructor(e) {
          let t = document.createElement("img");
          t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
        }
        get isHidden() {
          return true;
        }
        get overrideDOMText() {
          return M.empty;
        }
        coordsIn(e, t, i) {
          let r = this.dom.getBoundingClientRect();
          return i == null ? r : Jn(r, t > 0 == i);
        }
      }, Ls = class {
        constructor(e) {
          this.index = 0, this.beforeBreak = false, this.parents = [], this.tile = e;
        }
        advance(e, t, i) {
          let { tile: r, index: s, beforeBreak: o, parents: l } = this;
          for (; e || t > 0; ) if (r.isComposite()) if (o) {
            if (!e) break;
            i && i.break(), e--, o = false;
          } else if (s == r.children.length) {
            if (!e && !l.length) break;
            i && i.leave(r), o = !!r.breakAfter, { tile: r, index: s } = l.pop(), s++;
          } else {
            let a = r.children[s], h7 = a.breakAfter;
            (t > 0 ? a.length <= e : a.length < e) && (!i || i.skip(a, 0, a.length) !== false || !a.isComposite) ? (o = !!h7, s++, e -= a.length) : (l.push({ tile: r, index: s }), r = a, s = 0, i && a.isComposite() && i.enter(a));
          }
          else {
            let a = r.length;
            if (s < a && e) {
              let h7 = Math.min(e, a - s);
              i && i.skip(r, s, s + h7), e -= h7, s += h7;
            }
            if (s == a) o = !!r.breakAfter, { tile: r, index: s } = l.pop(), s++;
            else if (!e) break;
          }
          return this.tile = r, this.index = s, this.beforeBreak = o, this;
        }
        get root() {
          return this.parents.length ? this.parents[0].tile : this.tile;
        }
      }, Es = class {
        constructor(e, t, i, r) {
          this.from = e, this.to = t, this.wrapper = i, this.rank = r;
        }
      }, js = class {
        constructor(e, t, i) {
          this.cache = e, this.root = t, this.blockWrappers = i, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
        }
        addText(e, t, i, r) {
          var s;
          this.flushBuffer();
          let o = this.ensureMarks(t, i), l = o.lastChild;
          if (l && l.isText() && !(l.flags & 8) && l.length + e.length < 512) {
            this.cache.reused.set(l, 2);
            let a = o.children[o.children.length - 1] = new Bt(l.dom, l.text + e);
            a.parent = o;
          } else o.append(r || Bt.of(e, (s = this.cache.find(Bt)) === null || s === void 0 ? void 0 : s.dom));
          this.pos += e.length, this.afterWidget = null;
        }
        addComposition(e, t) {
          let i = this.curLine;
          i.dom != t.line.dom && (i.setDOM(this.cache.reused.has(t.line) ? ys(t.line.dom) : t.line.dom), this.cache.reused.set(t.line, 2));
          let r = i;
          for (let l = t.marks.length - 1; l >= 0; l--) {
            let a = t.marks[l], h7 = r.lastChild;
            if (h7 instanceof pe && h7.mark.eq(a.mark)) h7.dom != a.dom && h7.setDOM(ys(a.dom)), r = h7;
            else {
              if (this.cache.reused.get(a)) {
                let f = F.get(a.dom);
                f && f.setDOM(ys(a.dom));
              }
              let c = pe.of(a.mark, a.dom);
              r.append(c), r = c;
            }
            this.cache.reused.set(a, 2);
          }
          let s = F.get(e.text);
          s && this.cache.reused.set(s, 2);
          let o = new Bt(e.text, e.text.nodeValue);
          o.flags |= 8, this.pos = e.range.toB, r.append(o);
        }
        addInlineWidget(e, t, i) {
          let r = this.afterWidget && e.flags & 48 && (this.afterWidget.flags & 48) == (e.flags & 48);
          r || this.flushBuffer();
          let s = this.ensureMarks(t, i);
          !r && !(e.flags & 16) && s.append(this.getBuffer(1)), s.append(e), this.pos += e.length, this.afterWidget = e;
        }
        addMark(e, t, i) {
          this.flushBuffer(), this.ensureMarks(t, i).append(e), this.pos += e.length, this.afterWidget = null;
        }
        addBlockWidget(e) {
          this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
        }
        continueWidget(e) {
          let t = this.afterWidget || this.lastBlock;
          t.length += e, this.pos += e;
        }
        addLineStart(e, t) {
          var i;
          e || (e = jh);
          let r = Si.start(e, t || ((i = this.cache.find(Si)) === null || i === void 0 ? void 0 : i.dom), !!t);
          this.getBlockPos().append(this.lastBlock = this.curLine = r);
        }
        addLine(e) {
          this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
        }
        addBreak() {
          this.lastBlock.flags |= 1, this.endLine(), this.pos++;
        }
        addLineStartIfNotCovered(e) {
          this.blockPosCovered() || this.addLineStart(e);
        }
        ensureLine(e) {
          this.curLine || this.addLineStart(e);
        }
        ensureMarks(e, t) {
          var i;
          let r = this.curLine;
          for (let s = e.length - 1; s >= 0; s--) {
            let o = e[s], l;
            if (t > 0 && (l = r.lastChild) && l instanceof pe && l.mark.eq(o)) r = l, t--;
            else {
              let a = pe.of(o, (i = this.cache.find(pe, (h7) => h7.mark.eq(o))) === null || i === void 0 ? void 0 : i.dom);
              r.append(a), r = a, t = 0;
            }
          }
          return r;
        }
        endLine() {
          if (this.curLine) {
            this.flushBuffer();
            let e = this.curLine.lastChild;
            (!e || !Va(this.curLine, false) || e.dom.nodeName != "BR" && e.isWidget() && !(w.ios && Va(this.curLine, true))) && this.curLine.append(this.cache.findWidget(Qs, 0, 32) || new Nt(Qs.toDOM(), 0, Qs, 32)), this.curLine = this.afterWidget = null;
          }
        }
        updateBlockWrappers() {
          this.wrapperPos > this.pos + 1e4 && (this.blockWrappers.goto(this.pos), this.wrappers.length = 0);
          for (let e = this.wrappers.length - 1; e >= 0; e--) this.wrappers[e].to < this.pos && this.wrappers.splice(e, 1);
          for (let e = this.blockWrappers; e.value && e.from <= this.pos; e.next()) if (e.to >= this.pos) {
            let t = e.rank * 102 + e.value.rank, i = new Es(e.from, e.to, e.value, t), r = this.wrappers.length;
            for (; r > 0 && (this.wrappers[r - 1].rank - i.rank || this.wrappers[r - 1].to - i.to) < 0; ) r--;
            this.wrappers.splice(r, 0, i);
          }
          this.wrapperPos = this.pos;
        }
        getBlockPos() {
          var e;
          this.updateBlockWrappers();
          let t = this.root;
          for (let i of this.wrappers) {
            let r = t.lastChild;
            if (i.from < this.pos && r instanceof ot && r.wrapper.eq(i.wrapper)) t = r;
            else {
              let s = ot.of(i.wrapper, (e = this.cache.find(ot, (o) => o.wrapper.eq(i.wrapper))) === null || e === void 0 ? void 0 : e.dom);
              t.append(s), t = s;
            }
          }
          return t;
        }
        blockPosCovered() {
          let e = this.lastBlock;
          return e != null && !e.breakAfter && (!e.isWidget() || (e.flags & 160) > 0);
        }
        getBuffer(e) {
          let t = 2 | (e < 0 ? 16 : 32), i = this.cache.find(bi, void 0, 1);
          return i && (i.flags = t), i || new bi(t);
        }
        flushBuffer() {
          this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
        }
      }, zs = class {
        constructor(e) {
          this.skipCount = 0, this.text = "", this.textOff = 0, this.cursor = e.iter();
        }
        skip(e) {
          this.textOff + e <= this.text.length ? this.textOff += e : (this.skipCount += e - (this.text.length - this.textOff), this.text = "", this.textOff = 0);
        }
        next(e) {
          if (this.textOff == this.text.length) {
            let { value: r, lineBreak: s, done: o } = this.cursor.next(this.skipCount);
            if (this.skipCount = 0, o) throw new Error("Ran out of text content when drawing inline views");
            this.text = r;
            let l = this.textOff = Math.min(e, r.length);
            return s ? null : r.slice(0, l);
          }
          let t = Math.min(this.text.length, this.textOff + e), i = this.text.slice(this.textOff, t);
          return this.textOff = t, i;
        }
      }, tr = [Nt, Si, Bt, pe, bi, ot, gi];
      for (let n = 0; n < tr.length; n++) tr[n].bucket = n;
      var Ys = class {
        constructor(e) {
          this.view = e, this.buckets = tr.map(() => []), this.index = tr.map(() => 0), this.reused = /* @__PURE__ */ new Map();
        }
        add(e) {
          let t = e.constructor.bucket, i = this.buckets[t];
          i.length < 6 ? i.push(e) : i[this.index[t] = (this.index[t] + 1) % 6] = e;
        }
        find(e, t, i = 2) {
          let r = e.bucket, s = this.buckets[r], o = this.index[r];
          for (let l = 0; l < s.length; l++) {
            let a = (l + o) % s.length, h7 = s[a];
            if ((!t || t(h7)) && !this.reused.has(h7)) return s.splice(a, 1), a < o && this.index[r]--, this.reused.set(h7, i), h7;
          }
          return null;
        }
        findWidget(e, t, i) {
          let r = this.buckets[0];
          if (r.length) for (let s = 0, o = 0; ; s++) {
            if (s == r.length) {
              if (o) return null;
              o = 1, s = 0;
            }
            let l = r[s];
            if (!this.reused.has(l) && (o == 0 ? l.widget.compare(e) : l.widget.constructor == e.constructor && e.updateDOM(l.dom, this.view, l.widget))) return r.splice(s, 1), s < this.index[0] && this.index[0]--, l.widget == e && l.length == t && (l.flags & 497) == i ? (this.reused.set(l, 1), l) : (this.reused.set(l, 2), new Nt(l.dom, t, e, l.flags & -498 | i));
          }
        }
        reuse(e) {
          return this.reused.set(e, 1), e;
        }
        maybeReuse(e, t = 2) {
          if (!this.reused.has(e)) return this.reused.set(e, t), e.dom;
        }
        clear() {
          for (let e = 0; e < this.buckets.length; e++) this.buckets[e].length = this.index[e] = 0;
        }
      }, _s = class {
        constructor(e, t, i, r, s) {
          this.view = e, this.decorations = r, this.disallowBlockEffectsFor = s, this.openWidget = false, this.openMarks = 0, this.cache = new Ys(e), this.text = new zs(e.state.doc), this.builder = new js(this.cache, new gi(e, e.contentDOM), _.iter(i)), this.cache.reused.set(t, 2), this.old = new Ls(t), this.reuseWalker = { skip: (o, l, a) => {
            if (this.cache.add(o), o.isComposite()) return false;
          }, enter: (o) => this.cache.add(o), leave: () => {
          }, break: () => {
          } };
        }
        run(e, t) {
          let i = t && this.getCompositionContext(t.text);
          for (let r = 0, s = 0, o = 0; ; ) {
            let l = o < e.length ? e[o++] : null, a = l ? l.fromA : this.old.root.length;
            if (a > r) {
              let h7 = a - r;
              this.preserve(h7, !o, !l), r = a, s += h7;
            }
            if (!l) break;
            t && l.fromA <= t.range.fromA && l.toA >= t.range.toA ? (this.forward(l.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(s, t.range.fromB), this.builder.flushBuffer(), this.cache.clear(), this.builder.addComposition(t, i), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, l.toA), this.emit(t.range.toB, l.toB)) : (this.forward(l.fromA, l.toA), this.emit(s, l.toB)), s = l.toB, r = l.toA;
          }
          return this.builder.curLine && this.builder.endLine(), this.builder.root;
        }
        preserve(e, t, i) {
          let r = kO(this.old), s = this.openMarks;
          this.old.advance(e, i ? 1 : -1, { skip: (o, l, a) => {
            if (o.isWidget()) if (this.openWidget) this.builder.continueWidget(a - l);
            else {
              let h7 = a > 0 || l < o.length ? Nt.of(o.widget, this.view, a - l, o.flags & 496, this.cache.maybeReuse(o)) : this.cache.reuse(o);
              h7.flags & 256 ? (h7.flags &= -2, this.builder.addBlockWidget(h7)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(h7, r, s), s = r.length);
            }
            else if (o.isText()) this.builder.ensureLine(null), !l && a == o.length && !this.cache.reused.has(o) ? this.builder.addText(o.text, r, s, this.cache.reuse(o)) : (this.cache.add(o), this.builder.addText(o.text.slice(l, a), r, s)), s = r.length;
            else if (o.isLine()) o.flags &= -2, this.cache.reused.set(o, 1), this.builder.addLine(o);
            else if (o instanceof bi) this.cache.add(o);
            else if (o instanceof pe) this.builder.ensureLine(null), this.builder.addMark(o, r, s), this.cache.reused.set(o, 1), s = r.length;
            else return false;
            this.openWidget = false;
          }, enter: (o) => {
            o.isLine() ? this.builder.addLineStart(o.attrs, this.cache.maybeReuse(o)) : (this.cache.add(o), o instanceof pe && r.unshift(o.mark)), this.openWidget = false;
          }, leave: (o) => {
            o.isLine() ? r.length && (r.length = s = 0) : o instanceof pe && (r.shift(), s = Math.min(s, r.length));
          }, break: () => {
            this.builder.addBreak(), this.openWidget = false;
          } }), this.text.skip(e);
        }
        emit(e, t) {
          let i = null, r = this.builder, s = -1, o = _.spans(this.decorations, e, t, { point: (l, a, h7, c, f, u) => {
            if (h7 instanceof qt) {
              if (this.disallowBlockEffectsFor[u]) {
                if (h7.block) throw new RangeError("Block decorations may not be specified via plugins");
                if (a > this.view.state.doc.lineAt(l).to) throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
              }
              if (s = c.length, f > c.length) r.continueWidget(a - l);
              else {
                let d = h7.widget || (h7.block ? bt.block : bt.inline), O = QO(h7), m = this.cache.findWidget(d, a - l, O) || Nt.of(d, this.view, a - l, O);
                h7.block ? (h7.startSide > 0 && r.addLineStartIfNotCovered(i), r.addBlockWidget(m)) : (r.ensureLine(i), r.addInlineWidget(m, c, f));
              }
              i = null;
            } else i = xO(i, h7);
            a > l && this.text.skip(a - l);
          }, span: (l, a, h7, c) => {
            for (let f = l; f < a; ) {
              let u = this.text.next(Math.min(512, a - f));
              u == null ? (r.addLineStartIfNotCovered(i), r.addBreak(), f++) : (r.ensureLine(i), r.addText(u, h7, f == l ? c : h7.length), f += u.length), i = null;
            }
            s = h7.length;
          } });
          s > -1 && (this.openWidget = o > s), this.openWidget || r.addLineStartIfNotCovered(i), this.openMarks = o;
        }
        forward(e, t, i = 1) {
          t - e <= 10 ? this.old.advance(t - e, i, this.reuseWalker) : (this.old.advance(5, -1, this.reuseWalker), this.old.advance(t - e - 10, -1), this.old.advance(5, i, this.reuseWalker));
        }
        getCompositionContext(e) {
          let t = [], i = null;
          for (let r = e.parentNode; ; r = r.parentNode) {
            let s = F.get(r);
            if (r == this.view.contentDOM) break;
            s instanceof pe ? t.push(s) : s?.isLine() ? i = s : s instanceof ot || (r.nodeName == "DIV" && !i && r != this.view.contentDOM ? i = new Si(r, jh) : i || t.push(pe.of(new Ui({ tagName: r.nodeName.toLowerCase(), attributes: tO(r) }), r)));
          }
          return { line: i, marks: t };
        }
      };
      function Va(n, e) {
        let t = (i) => {
          for (let r of i.children) if ((e ? r.isText() : r.length) || t(r)) return true;
          return false;
        };
        return t(n);
      }
      function QO(n) {
        let e = n.isReplace ? (n.startSide < 0 ? 64 : 0) | (n.endSide > 0 ? 128 : 0) : n.startSide > 0 ? 32 : 16;
        return n.block && (e |= 256), e;
      }
      var jh = { class: "cm-line" };
      function xO(n, e) {
        let t = e.spec.attributes, i = e.spec.class;
        return !t && !i || (n || (n = { class: "cm-line" }), t && uo(t, n), i && (n.class += " " + i)), n;
      }
      function kO(n) {
        let e = [];
        for (let t = n.parents.length; t > 1; t--) {
          let i = t == n.parents.length ? n.tile : n.parents[t].tile;
          i instanceof pe && e.push(i.mark);
        }
        return e;
      }
      function ys(n) {
        let e = F.get(n);
        return e && e.setDOM(n.cloneNode()), n;
      }
      var bt = class extends lt {
        constructor(e) {
          super(), this.tag = e;
        }
        eq(e) {
          return e.tag == this.tag;
        }
        toDOM() {
          return document.createElement(this.tag);
        }
        updateDOM(e) {
          return e.nodeName.toLowerCase() == this.tag;
        }
        get isHidden() {
          return true;
        }
      };
      bt.inline = new bt("span");
      bt.block = new bt("div");
      var Qs = new class extends lt {
        toDOM() {
          return document.createElement("br");
        }
        get isHidden() {
          return true;
        }
        get editable() {
          return true;
        }
      }(), ir = class {
        constructor(e) {
          this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [false], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = Y.none, this.lastCompositionAfterCursor = false, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = false, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new gi(e, e.contentDOM), this.updateInner([new ze(0, 0, 0, e.state.doc.length)], null);
        }
        update(e) {
          var t;
          let i = e.changedRanges;
          this.minWidth > 0 && i.length && (i.every(({ fromA: c, toA: f }) => f < this.minWidthFrom || c > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
          let r = -1;
          this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((t = this.domChanged) === null || t === void 0) && t.newSel ? r = this.domChanged.newSel.head : !AO(e.changes, this.hasComposition) && !e.selectionSet && (r = e.state.selection.main.head));
          let s = r > -1 ? $O(this.view, e.changes, r) : null;
          if (this.domChanged = null, this.hasComposition) {
            let { from: c, to: f } = this.hasComposition;
            i = new ze(c, f, e.changes.mapPos(c, -1), e.changes.mapPos(f, 1)).addToSet(i.slice());
          }
          this.hasComposition = s ? { from: s.range.fromB, to: s.range.toB } : null, (w.ie || w.chrome) && !s && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = true);
          let o = this.decorations, l = this.blockWrappers;
          this.updateDeco();
          let a = TO(o, this.decorations, e.changes);
          a.length && (i = ze.extendWithRanges(i, a));
          let h7 = CO(l, this.blockWrappers, e.changes);
          return h7.length && (i = ze.extendWithRanges(i, h7)), s && !i.some((c) => c.fromA <= s.range.fromA && c.toA >= s.range.toA) && (i = s.range.addToSet(i.slice())), this.tile.flags & 2 && i.length == 0 ? false : (this.updateInner(i, s), e.transactions.length && (this.lastUpdate = Date.now()), true);
        }
        updateInner(e, t) {
          this.view.viewState.mustMeasureContent = true;
          let { observer: i } = this.view;
          i.ignore(() => {
            if (t || e.length) {
              let o = this.tile, l = new _s(this.view, o, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
              t && F.get(t.text) && l.cache.reused.set(F.get(t.text), 2), this.tile = l.run(e, t), Vs(o, l.cache.reused);
            }
            this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
            let s = w.chrome || w.ios ? { node: i.selectionRange.focusNode, written: false } : void 0;
            this.tile.sync(s), s && (s.written || i.selectionRange.focusNode != s.node || !this.tile.dom.contains(s.node)) && (this.forceSelection = true), this.tile.dom.style.height = "";
          });
          let r = [];
          if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length) for (let s of this.tile.children) s.isWidget() && s.widget instanceof qi && r.push(s.dom);
          i.updateGaps(r);
        }
        updateEditContextFormatting(e) {
          this.editContextFormatting = this.editContextFormatting.map(e.changes);
          for (let t of e.transactions) for (let i of t.effects) i.is(Ah) && (this.editContextFormatting = i.value);
        }
        updateSelection(e = false, t = false) {
          (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
          let { dom: i } = this.tile, r = this.view.root.activeElement, s = r == i, o = !s && !(this.view.state.facet(st) || i.tabIndex > -1) && Vi(i, this.view.observer.selectionRange) && !(r && i.contains(r));
          if (!(s || t || o)) return;
          let l = this.forceSelection;
          this.forceSelection = false;
          let a = this.view.state.selection.main, h7, c;
          if (a.empty ? c = h7 = this.inlineDOMNearPos(a.anchor, a.assoc || 1) : (c = this.inlineDOMNearPos(a.head, a.head == a.from ? 1 : -1), h7 = this.inlineDOMNearPos(a.anchor, a.anchor == a.from ? 1 : -1)), w.gecko && a.empty && !this.hasComposition && wO(h7)) {
            let u = document.createTextNode("");
            this.view.observer.ignore(() => h7.node.insertBefore(u, h7.node.childNodes[h7.offset] || null)), h7 = c = new Ke(u, 0), l = true;
          }
          let f = this.view.observer.selectionRange;
          (l || !f.focusNode || (!Wi(h7.node, h7.offset, f.anchorNode, f.anchorOffset) || !Wi(c.node, c.offset, f.focusNode, f.focusOffset)) && !this.suppressWidgetCursorChange(f, a)) && (this.view.observer.ignore(() => {
            w.android && w.chrome && i.contains(f.focusNode) && ZO(f.focusNode, i) && (i.blur(), i.focus({ preventScroll: true }));
            let u = Hi(this.view.root);
            if (u) if (a.empty) {
              if (w.gecko) {
                let d = PO(h7.node, h7.offset);
                if (d && d != 3) {
                  let O = (d == 1 ? mh : gh)(h7.node, h7.offset);
                  O && (h7 = new Ke(O.node, O.offset));
                }
              }
              u.collapse(h7.node, h7.offset), a.bidiLevel != null && u.caretBidiLevel !== void 0 && (u.caretBidiLevel = a.bidiLevel);
            } else if (u.extend) {
              u.collapse(h7.node, h7.offset);
              try {
                u.extend(c.node, c.offset);
              } catch {
              }
            } else {
              let d = document.createRange();
              a.anchor > a.head && ([h7, c] = [c, h7]), d.setEnd(c.node, c.offset), d.setStart(h7.node, h7.offset), u.removeAllRanges(), u.addRange(d);
            }
            o && this.view.root.activeElement == i && (i.blur(), r && r.focus());
          }), this.view.observer.setSelectionRange(h7, c)), this.impreciseAnchor = h7.precise ? null : new Ke(f.anchorNode, f.anchorOffset), this.impreciseHead = c.precise ? null : new Ke(f.focusNode, f.focusOffset);
        }
        suppressWidgetCursorChange(e, t) {
          return this.hasComposition && t.empty && Wi(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
        }
        enforceCursorAssoc() {
          if (this.hasComposition) return;
          let { view: e } = this, t = e.state.selection.main, i = Hi(e.root), { anchorNode: r, anchorOffset: s } = e.observer.selectionRange;
          if (!i || !t.empty || !t.assoc || !i.modify) return;
          let o = this.lineAt(t.head, t.assoc);
          if (!o) return;
          let l = o.posAtStart;
          if (t.head == l || t.head == l + o.length) return;
          let a = this.coordsAt(t.head, -1), h7 = this.coordsAt(t.head, 1);
          if (!a || !h7 || a.bottom > h7.top) return;
          let c = this.domAtPos(t.head + t.assoc, t.assoc);
          i.collapse(c.node, c.offset), i.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
          let f = e.observer.selectionRange;
          e.docView.posFromDOM(f.anchorNode, f.anchorOffset) != t.from && i.collapse(r, s);
        }
        posFromDOM(e, t) {
          let i = this.tile.nearest(e);
          if (!i) return this.tile.dom.compareDocumentPosition(e) & 2 ? 0 : this.view.state.doc.length;
          let r = i.posAtStart;
          if (i.isComposite()) {
            let s;
            if (e == i.dom) s = i.dom.childNodes[t];
            else {
              let o = at(e) == 0 ? 0 : t == 0 ? -1 : 1;
              for (; ; ) {
                let l = e.parentNode;
                if (l == i.dom) break;
                o == 0 && l.firstChild != l.lastChild && (e == l.firstChild ? o = -1 : o = 1), e = l;
              }
              o < 0 ? s = e : s = e.nextSibling;
            }
            if (s == i.dom.firstChild) return r;
            for (; s && !F.get(s); ) s = s.nextSibling;
            if (!s) return r + i.length;
            for (let o = 0, l = r; ; o++) {
              let a = i.children[o];
              if (a.dom == s) return l;
              l += a.length + a.breakAfter;
            }
          } else return i.isText() ? e == i.dom ? r + t : r + (t ? i.length : 0) : r;
        }
        domAtPos(e, t) {
          let { tile: i, offset: r } = this.tile.resolveBlock(e, t);
          return i.isWidget() ? i.domPosFor(r, t) : i.domIn(r, t);
        }
        inlineDOMNearPos(e, t) {
          let i, r = -1, s = false, o, l = -1, a = false;
          return this.tile.blockTiles((h7, c) => {
            if (h7.isWidget()) {
              if (h7.flags & 32 && c >= e) return true;
              h7.flags & 16 && (s = true);
            } else {
              let f = c + h7.length;
              if (c <= e && (i = h7, r = e - c, s = f < e), f >= e && !o && (o = h7, l = e - c, a = c > e), c > e && o) return true;
            }
          }), !i && !o ? this.domAtPos(e, t) : (s && o ? i = null : a && i && (o = null), i && t < 0 || !o ? i.domIn(r, t) : o.domIn(l, t));
        }
        coordsAt(e, t, i) {
          let { tile: r, offset: s } = this.tile.resolveBlock(e, t);
          return r.isWidget() ? r.widget instanceof qi ? null : r.coordsInWidget(s, t, true) : r.coordsIn(s, t, i);
        }
        lineAt(e, t) {
          let { tile: i } = this.tile.resolveBlock(e, t);
          return i.isLine() ? i : null;
        }
        coordsForChar(e) {
          let { tile: t, offset: i } = this.tile.resolveBlock(e, 1);
          if (!t.isLine()) return null;
          function r(s, o) {
            if (s.isComposite()) for (let l of s.children) {
              if (l.length >= o) {
                let a = r(l, o);
                if (a) return a;
              }
              if (o -= l.length, o < 0) break;
            }
            else if (s.isText() && o < s.length) {
              let l = ie(s.text, o);
              if (l == o) return null;
              let a = Ki(s.dom, o, l).getClientRects();
              for (let h7 = 0; h7 < a.length; h7++) {
                let c = a[h7];
                if (h7 == a.length - 1 || c.top < c.bottom && c.left < c.right) return c;
              }
            }
            return null;
          }
          return r(t, i);
        }
        measureVisibleLineHeights(e) {
          let t = [], { from: i, to: r } = e, s = this.view.contentDOM.clientWidth, o = s > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, a = this.view.textDirection == U.LTR, h7 = 0, c = (f, u, d) => {
            for (let O = 0; O < f.children.length && !(u > r); O++) {
              let m = f.children[O], g = u + m.length, S = m.dom.getBoundingClientRect(), { height: x } = S;
              if (d && !O && (h7 += S.top - d.top), m instanceof ot) g > i && c(m, u, S);
              else if (u >= i && (h7 > 0 && t.push(-h7), t.push(x + h7), h7 = 0, o)) {
                let y = m.dom.lastChild, R = y ? In(y) : [];
                if (R.length) {
                  let T = R[R.length - 1], Z = a ? T.right - S.left : S.right - T.left;
                  Z > l && (l = Z, this.minWidth = s, this.minWidthFrom = u, this.minWidthTo = g);
                }
              }
              d && O == f.children.length - 1 && (h7 += d.bottom - S.bottom), u = g + m.breakAfter;
            }
          };
          return c(this.tile, 0, null), t;
        }
        textDirectionAt(e) {
          let { tile: t } = this.tile.resolveBlock(e, 1);
          return getComputedStyle(t.dom).direction == "rtl" ? U.RTL : U.LTR;
        }
        measureTextSize() {
          let e = this.tile.blockTiles((o) => {
            if (o.isLine() && o.children.length && o.length <= 20) {
              let l = 0, a;
              for (let h7 of o.children) {
                if (!h7.isText() || /[^ -~]/.test(h7.text)) return;
                let c = In(h7.dom);
                if (c.length != 1) return;
                l += c[0].width, a = c[0].height;
              }
              if (l) return { lineHeight: o.dom.getBoundingClientRect().height, charWidth: l / o.length, textHeight: a };
            }
          });
          if (e) return e;
          let t = document.createElement("div"), i, r, s;
          return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
            this.tile.dom.appendChild(t);
            let o = In(t.firstChild)[0];
            i = t.getBoundingClientRect().height, r = o && o.width ? o.width / 27 : 7, s = o && o.height ? o.height : i, t.remove();
          }), { lineHeight: i, charWidth: r, textHeight: s };
        }
        computeBlockGapDeco() {
          let e = [], t = this.view.viewState;
          for (let i = 0, r = 0; ; r++) {
            let s = r == t.viewports.length ? null : t.viewports[r], o = s ? s.from - 1 : this.view.state.doc.length;
            if (o > i) {
              let l = (t.lineBlockAt(o).bottom - t.lineBlockAt(i).top) / this.view.scaleY;
              e.push(Y.replace({ widget: new qi(l), block: true, inclusive: true, isBlockGap: true }).range(i, o));
            }
            if (!s) break;
            i = s.to + 1;
          }
          return Y.set(e);
        }
        updateDeco() {
          let e = 1, t = this.view.state.facet(ur).map((s) => (this.dynamicDecorationMap[e++] = typeof s == "function") ? s(this.view) : s), i = false, r = this.view.state.facet(bo).map((s, o) => {
            let l = typeof s == "function";
            return l && (i = true), l ? s(this.view) : s;
          });
          for (r.length && (this.dynamicDecorationMap[e++] = i, t.push(_.join(r))), this.decorations = [this.editContextFormatting, ...t, this.computeBlockGapDeco(), this.view.viewState.lineGapDeco]; e < this.decorations.length; ) this.dynamicDecorationMap[e++] = false;
          this.blockWrappers = this.view.state.facet(Rh).map((s) => typeof s == "function" ? s(this.view) : s);
        }
        scrollIntoView(e) {
          if (e.isSnapshot) {
            let h7 = this.view.viewState.lineBlockAt(e.range.head);
            this.view.scrollDOM.scrollTop = h7.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
            return;
          }
          for (let h7 of this.view.state.facet(Zh)) try {
            if (h7(this.view, e.range, e)) return true;
          } catch (c) {
            Re(this.view.state, c, "scroll handler");
          }
          let { range: t } = e, i = this.coordsAt(t.head, t.assoc || (t.head > t.anchor ? -1 : 1)), r;
          if (!i) return;
          !t.empty && (r = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (i = { left: Math.min(i.left, r.left), top: Math.min(i.top, r.top), right: Math.max(i.right, r.right), bottom: Math.max(i.bottom, r.bottom) });
          let s = Eh(this.view), o = { left: i.left - s.left, top: i.top - s.top, right: i.right + s.right, bottom: i.bottom + s.bottom }, { offsetWidth: l, offsetHeight: a } = this.view.scrollDOM;
          if (rO(this.view.scrollDOM, o, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, l), -l), Math.max(Math.min(e.yMargin, a), -a), this.view.textDirection == U.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (i.top > window.visualViewport.offsetTop + window.visualViewport.height || i.bottom < window.visualViewport.offsetTop)) {
            let h7 = this.view.docView.lineAt(t.head, 1);
            if (h7) {
              let c = uh(h7.dom);
              h7.dom.scrollIntoView({ block: "nearest" }), dh(c, false);
            }
          }
        }
        lineHasWidget(e) {
          let t = (i) => i.isWidget() || i.children.some(t);
          return t(this.tile.resolveBlock(e, 1).tile);
        }
        destroy() {
          Vs(this.tile);
        }
      };
      function Vs(n, e) {
        let t = e?.get(n);
        if (t != 1) {
          t == null && n.destroy();
          for (let i of n.children) Vs(i, e);
        }
      }
      function wO(n) {
        return n.node.nodeType == 1 && n.node.firstChild && (n.offset == 0 || n.node.childNodes[n.offset - 1].contentEditable == "false") && (n.offset == n.node.childNodes.length || n.node.childNodes[n.offset].contentEditable == "false");
      }
      function zh(n, e) {
        let t = n.observer.selectionRange;
        if (!t.focusNode) return null;
        let i = mh(t.focusNode, t.focusOffset), r = gh(t.focusNode, t.focusOffset), s = i || r;
        if (r && i && r.node != i.node) {
          let l = F.get(r.node);
          if (!l || l.isText() && l.text != r.node.nodeValue) s = r;
          else if (n.docView.lastCompositionAfterCursor) {
            let a = F.get(i.node);
            !a || a.isText() && a.text != i.node.nodeValue || (s = r);
          }
        }
        if (n.docView.lastCompositionAfterCursor = s != i, !s) return null;
        let o = e - s.offset;
        return { from: o, to: o + s.node.nodeValue.length, node: s.node };
      }
      function $O(n, e, t) {
        let i = zh(n, t);
        if (!i) return null;
        let { node: r, from: s, to: o } = i, l = r.nodeValue;
        if (/[\n\r]/.test(l) || n.state.doc.sliceString(i.from, i.to) != l) return null;
        let a = e.invertedDesc;
        return { range: new ze(a.mapPos(s), a.mapPos(o), s, o), text: r };
      }
      function PO(n, e) {
        return n.nodeType != 1 ? 0 : (e && n.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < n.childNodes.length && n.childNodes[e].contentEditable == "false" ? 2 : 0);
      }
      var vO = class {
        constructor() {
          this.changes = [];
        }
        compareRange(e, t) {
          Oi(e, t, this.changes);
        }
        comparePoint(e, t) {
          Oi(e, t, this.changes);
        }
        boundChange(e) {
          Oi(e, e, this.changes);
        }
      };
      function TO(n, e, t) {
        let i = new vO();
        return _.compare(n, e, t, i), i.changes;
      }
      var Ws = class {
        constructor() {
          this.changes = [];
        }
        compareRange(e, t) {
          Oi(e, t, this.changes);
        }
        comparePoint() {
        }
        boundChange(e) {
          Oi(e, e, this.changes);
        }
      };
      function CO(n, e, t) {
        let i = new Ws();
        return _.compare(n, e, t, i), i.changes;
      }
      function ZO(n, e) {
        for (let t = n; t && t != e; t = t.assignedSlot || t.parentNode) if (t.nodeType == 1 && t.contentEditable == "false") return true;
        return false;
      }
      function AO(n, e) {
        let t = false;
        return e && n.iterChangedRanges((i, r) => {
          i < e.to && r > e.from && (t = true);
        }), t;
      }
      var qi = class extends lt {
        constructor(e) {
          super(), this.height = e;
        }
        toDOM() {
          let e = document.createElement("div");
          return e.className = "cm-gap", this.updateDOM(e), e;
        }
        eq(e) {
          return e.height == this.height;
        }
        updateDOM(e) {
          return e.style.height = this.height + "px", true;
        }
        get editable() {
          return true;
        }
        get estimatedHeight() {
          return this.height;
        }
        ignoreEvent() {
          return false;
        }
      };
      function XO(n, e, t = 1) {
        let i = n.charCategorizer(e), r = n.doc.lineAt(e), s = e - r.from;
        if (r.length == 0) return b.cursor(e);
        s == 0 ? t = 1 : s == r.length && (t = -1);
        let o = s, l = s;
        t < 0 ? o = ie(r.text, s, false) : l = ie(r.text, s);
        let a = i(r.text.slice(o, l));
        for (; o > 0; ) {
          let h7 = ie(r.text, o, false);
          if (i(r.text.slice(h7, o)) != a) break;
          o = h7;
        }
        for (; l < r.length; ) {
          let h7 = ie(r.text, l);
          if (i(r.text.slice(l, h7)) != a) break;
          l = h7;
        }
        return b.undirectionalRange(o + r.from, l + r.from);
      }
      function RO(n, e, t, i, r) {
        let s = Math.round((i - e.left) * n.defaultCharacterWidth);
        if (n.lineWrapping && t.height > n.defaultLineHeight * 1.5) {
          let l = n.viewState.heightOracle.textHeight, a = Math.floor((r - t.top - (n.defaultLineHeight - l) * 0.5) / l);
          s += a * n.viewState.heightOracle.lineLength;
        }
        let o = n.state.sliceDoc(t.from, t.to);
        return t.from + Ta(o, s, n.state.tabSize);
      }
      function MO(n, e, t) {
        let i = n.lineBlockAt(e);
        if (Array.isArray(i.type)) {
          let r;
          for (let s of i.type) {
            if (s.from > e) break;
            if (!(s.to < e)) {
              if (s.from < e && s.to > e) return s;
              (!r || s.type == me.Text && (r.type != s.type || (t < 0 ? s.from < e : s.to > e))) && (r = s);
            }
          }
          return r || i;
        }
        return i;
      }
      function LO(n, e, t, i) {
        let r = MO(n, e.head, e.assoc || -1), s = !i || r.type != me.Text || !(n.lineWrapping || r.widgetLineBreaks) ? null : n.coordsAtPos(e.assoc < 0 && e.head > r.from ? e.head - 1 : e.head);
        if (s) {
          let o = n.dom.getBoundingClientRect(), l = n.textDirectionAt(r.from), a = n.posAtCoords({ x: t == (l == U.LTR) ? o.right - 1 : o.left + 1, y: (s.top + s.bottom) / 2 });
          if (a != null) return b.cursor(a, t ? -1 : 1);
        }
        return b.cursor(t ? r.to : r.from, t ? -1 : 1);
      }
      function Wa(n, e, t, i) {
        let r = n.state.doc.lineAt(e.head), s = n.bidiSpans(r), o = n.textDirectionAt(r.from);
        for (let l = e, a = null; ; ) {
          let h7 = OO(r, s, o, l, t), c = xh;
          if (!h7) {
            if (r.number == (t ? n.state.doc.lines : 1)) return l;
            c = `
`, r = n.state.doc.line(r.number + (t ? 1 : -1)), s = n.bidiSpans(r), h7 = n.visualLineSide(r, !t);
          }
          if (a) {
            if (!a(c)) return l;
          } else {
            if (!i) return h7;
            a = i(c);
          }
          l = h7;
        }
      }
      function EO(n, e, t) {
        let i = n.state.charCategorizer(e), r = i(t);
        return (s) => {
          let o = i(s);
          return r == ve.Space && (r = o), r == o;
        };
      }
      function jO(n, e, t, i) {
        let r = e.head, s = t ? 1 : -1;
        if (r == (t ? n.state.doc.length : 0)) return b.cursor(r, e.assoc);
        let o = e.goalColumn, l, a = n.contentDOM.getBoundingClientRect(), h7 = n.coordsAtPos(r, e.assoc || ((e.empty ? t : e.head == e.from) ? 1 : -1)), c = n.documentTop;
        if (h7) o == null && (o = h7.left - a.left), l = s < 0 ? h7.top : h7.bottom;
        else {
          let O = n.viewState.lineBlockAt(r);
          o == null && (o = Math.min(a.right - a.left, n.defaultCharacterWidth * (r - O.from))), l = (s < 0 ? O.top : O.bottom) + c;
        }
        let f = a.left + o, u = n.viewState.heightOracle.textHeight >> 1, d = i ?? u;
        for (let O = 0; ; O += u) {
          let m = l + (d + O) * s, g = Ds(n, { x: f, y: m }, false, s);
          if (t ? m > a.bottom : m < a.top) return b.cursor(g.pos, g.assoc);
          let S = n.coordsAtPos(g.pos, g.assoc), x = S ? (S.top + S.bottom) / 2 : 0;
          if (!S || (t ? x > l : x < l)) return b.cursor(g.pos, g.assoc, void 0, o);
        }
      }
      function Ii(n, e, t) {
        for (; ; ) {
          let i = 0;
          for (let r of n) r.between(e - 1, e + 1, (s, o, l) => {
            if (e > s && e < o) {
              let a = i || t || (e - s < o - e ? -1 : 1);
              e = a < 0 ? s : o, i = a;
            }
          });
          if (!i) return e;
        }
      }
      function Yh(n, e) {
        let t = null;
        for (let i = 0; i < e.ranges.length; i++) {
          let r = e.ranges[i], s = null;
          if (r.empty) {
            let o = Ii(n, r.from, 0);
            o != r.from && (s = b.cursor(o, -1));
          } else {
            let o = Ii(n, r.from, -1), l = Ii(n, r.to, 1);
            (o != r.from || l != r.to) && (r.undirectional ? s = b.undirectionalRange(r.from, r.to) : s = b.range(r.from == r.anchor ? o : l, r.from == r.head ? o : l));
          }
          s && (t || (t = e.ranges.slice()), t[i] = s);
        }
        return t ? b.create(t, e.mainIndex) : e;
      }
      function xs(n, e, t) {
        let i = Ii(n.state.facet(Ji).map((r) => r(n)), t.from, e.head > t.from ? -1 : 1);
        return i == t.from ? t : b.cursor(i, i < t.from ? 1 : -1);
      }
      var Ae = class {
        constructor(e, t) {
          this.pos = e, this.assoc = t;
        }
      };
      function Ds(n, e, t, i) {
        let r = n.contentDOM.getBoundingClientRect(), s = r.top + n.viewState.paddingTop, { x: o, y: l } = e, a = l - s, h7;
        for (; ; ) {
          if (a < 0) return new Ae(0, 1);
          if (a > n.viewState.docHeight) return new Ae(n.state.doc.length, -1);
          if (h7 = n.elementAtHeight(a), i == null) break;
          if (h7.type == me.Text) {
            if (i < 0 ? h7.to < n.viewport.from : h7.from > n.viewport.to) break;
            let u = n.docView.coordsAt(i < 0 ? h7.from : h7.to, i > 0 ? -1 : 1);
            if (u && (i < 0 ? u.top <= a + s : u.bottom >= a + s)) break;
          }
          let f = n.viewState.heightOracle.textHeight / 2;
          a = i > 0 ? h7.bottom + f : h7.top - f;
        }
        if (n.viewport.from >= h7.to || n.viewport.to <= h7.from) {
          if (t) return null;
          if (h7.type == me.Text) {
            let f = RO(n, r, h7, o, l);
            return new Ae(f, f == h7.from ? 1 : -1);
          }
        }
        if (h7.type != me.Text) return a < (h7.top + h7.bottom) / 2 ? new Ae(h7.from, 1) : new Ae(h7.to, -1);
        let c = n.docView.lineAt(h7.from, 2);
        return (!c || c.length != h7.length) && (c = n.docView.lineAt(h7.from, -2)), new Bs(n, o, l, n.textDirectionAt(h7.from)).scanTile(c, h7.from);
      }
      var Bs = class {
        constructor(e, t, i, r) {
          this.view = e, this.x = t, this.y = i, this.baseDir = r, this.line = null, this.spans = null;
        }
        bidiSpansAt(e) {
          return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
        }
        baseDirAt(e, t) {
          let { line: i, spans: r } = this.bidiSpansAt(e);
          return r[Xe.find(r, e - i.from, -1, t)].level == this.baseDir;
        }
        dirAt(e, t) {
          let { line: i, spans: r } = this.bidiSpansAt(e);
          return r[Xe.find(r, e - i.from, -1, t)].dir;
        }
        bidiIn(e, t) {
          let { spans: i, line: r } = this.bidiSpansAt(e);
          return i.length > 1 || i.length && (i[0].level != this.baseDir || i[0].to + r.from < t);
        }
        scan(e, t, i = false) {
          let r = 0, s = e.length - 1, o = /* @__PURE__ */ new Set(), l = this.bidiIn(e[0], e[s]), a, h7, c = -1, f = 1e9, u;
          e: for (; r < s; ) {
            let O = s - r, m = r + s >> 1;
            t: if (o.has(m)) {
              for (let x = 1; x < O; x++) {
                let y = m + x;
                if (y >= s && (y -= O), !o.has(y)) {
                  m = y;
                  break t;
                }
              }
              break e;
            }
            o.add(m);
            let g = t(m), S = 0;
            if (g) for (let x = 0; x < g.length; x++) {
              let y = g[x];
              if (!(y.width == 0 && g.length > 1)) if (y.bottom < this.y) (!a || a.bottom < y.bottom) && (a = y), S = 1;
              else if (y.top > this.y) (!h7 || h7.top > y.top) && (h7 = y), S = -1;
              else {
                let R = y.left > this.x ? this.x - y.left : y.right < this.x ? this.x - y.right : 0, T = Math.abs(R);
                T < f && (c = m, f = T, u = y), R && (S = R < 0 == (this.baseDir == U.LTR) ? -1 : 1);
              }
            }
            S == -1 && (!l || this.baseDirAt(e[m], 1)) ? s = m : S == 1 && (!l || this.baseDirAt(e[m + 1], -1)) && (r = m + 1);
          }
          if (!u) {
            if (!h7 && !a) return { i: e[0], after: false };
            let O = a && (!h7 || this.y - a.bottom < h7.top - this.y) ? a : h7;
            return this.y = (O.top + O.bottom) / 2, this.scan(e, t, true);
          }
          if (f && !i) {
            let { top: O, bottom: m } = u;
            if (a && a.bottom > (O + O + m) / 3) return this.y = a.bottom - 1, this.scan(e, t, true);
            if (h7 && h7.top < (O + m + m) / 3) return this.y = h7.top + 1, this.scan(e, t, true);
          }
          let d = (l ? this.dirAt(e[c], 1) : this.baseDir) == U.LTR;
          return { i: c, after: this.x > (u.left + u.right) / 2 == d };
        }
        scanText(e, t) {
          let i = [];
          for (let s = 0; s < e.length; s = ie(e.text, s)) i.push(t + s);
          i.push(t + e.length);
          let r = this.scan(i, (s) => {
            let o = i[s] - t, l = i[s + 1] - t;
            return Ki(e.dom, o, l).getClientRects();
          });
          return r.after ? new Ae(i[r.i + 1], -1) : new Ae(i[r.i], 1);
        }
        scanTile(e, t) {
          if (!e.length) return new Ae(t, 1);
          if (e.children.length == 1) {
            let l = e.children[0];
            if (l.isText()) return this.scanText(l, t);
            if (l.isComposite()) return this.scanTile(l, t);
          }
          let i = [t];
          for (let l = 0, a = t; l < e.children.length; l++) i.push(a += e.children[l].length);
          let r = this.scan(i, (l) => {
            let a = e.children[l];
            return a.flags & 48 ? null : (a.dom.nodeType == 1 ? a.dom : Ki(a.dom, 0, a.length)).getClientRects();
          }), s = e.children[r.i], o = i[r.i];
          return s.isText() ? this.scanText(s, o) : s.isComposite() ? this.scanTile(s, o) : r.after ? new Ae(i[r.i + 1], -1) : new Ae(o, 1);
        }
      }, ci = "\uFFFF", qs = class {
        constructor(e, t) {
          this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(D.lineSeparator);
        }
        append(e) {
          this.text += e;
        }
        lineBreak() {
          this.text += ci;
        }
        readRange(e, t) {
          if (!e) return this;
          let i = e.parentNode;
          for (let r = e; ; ) {
            this.findPointBefore(i, r);
            let s = this.text.length;
            this.readNode(r);
            let o = F.get(r), l = r.nextSibling;
            if (l == t) {
              o?.breakAfter && !l && i != this.view.contentDOM && this.lineBreak();
              break;
            }
            let a = F.get(l);
            (o && a ? o.breakAfter : (o ? o.breakAfter : Kn(r)) || Kn(l) && (r.nodeName != "BR" || o?.isWidget()) && this.text.length > s) && !YO(l, t) && this.lineBreak(), r = l;
          }
          return this.findPointBefore(i, t), this;
        }
        readTextNode(e) {
          let t = e.nodeValue;
          for (let i of this.points) i.node == e && (i.pos = this.text.length + Math.min(i.offset, t.length));
          for (let i = 0, r = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
            let s = -1, o = 1, l;
            if (this.lineSeparator ? (s = t.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (l = r.exec(t)) && (s = l.index, o = l[0].length), this.append(t.slice(i, s < 0 ? t.length : s)), s < 0) break;
            if (this.lineBreak(), o > 1) for (let a of this.points) a.node == e && a.pos > this.text.length && (a.pos -= o - 1);
            i = s + o;
          }
        }
        readNode(e) {
          let t = F.get(e), i = t && t.overrideDOMText;
          if (i != null) {
            this.findPointInside(e, i.length);
            for (let r = i.iter(); !r.next().done; ) r.lineBreak ? this.lineBreak() : this.append(r.value);
          } else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
        }
        findPointBefore(e, t) {
          for (let i of this.points) i.node == e && e.childNodes[i.offset] == t && (i.pos = this.text.length);
        }
        findPointInside(e, t) {
          for (let i of this.points) (e.nodeType == 3 ? i.node == e : e.contains(i.node)) && (i.pos = this.text.length + (zO(e, i.node, i.offset) ? t : 0));
        }
      };
      function zO(n, e, t) {
        for (; ; ) {
          if (!e || t < at(e)) return false;
          if (e == n) return true;
          t = St(e) + 1, e = e.parentNode;
        }
      }
      function YO(n, e) {
        let t;
        for (; !(n == e || !n); n = n.nextSibling) {
          let i = F.get(n);
          if (!i?.isWidget()) return false;
          i && (t || (t = [])).push(i);
        }
        if (t) for (let i of t) {
          let r = i.overrideDOMText;
          if (r?.length) return false;
        }
        return true;
      }
      var nr = class {
        constructor(e, t) {
          this.node = e, this.offset = t, this.pos = -1;
        }
      }, Is = class {
        constructor(e, t, i, r) {
          this.typeOver = r, this.bounds = null, this.text = "", this.domChanged = t > -1;
          let { impreciseHead: s, impreciseAnchor: o } = e.docView, l = e.state.selection;
          if (e.state.readOnly && t > -1) this.newSel = null;
          else if (t > -1 && (this.bounds = _h(e.docView.tile, t, i, 0))) {
            let a = s || o ? [] : VO(e), h7 = new qs(a, e);
            h7.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = h7.text, this.newSel = WO(a, this.bounds.from);
          } else {
            let a = e.observer.selectionRange, h7 = s && s.node == a.focusNode && s.offset == a.focusOffset || !Cs(e.contentDOM, a.focusNode) ? l.main.head : e.docView.posFromDOM(a.focusNode, a.focusOffset), c = o && o.node == a.anchorNode && o.offset == a.anchorOffset || !Cs(e.contentDOM, a.anchorNode) ? l.main.anchor : e.docView.posFromDOM(a.anchorNode, a.anchorOffset), f = e.viewport;
            if ((w.ios || w.chrome) && h7 != c && Math.min(h7, c) <= l.main.from && Math.max(h7, c) >= l.main.to && (f.from > 0 || f.to < e.state.doc.length)) {
              let u = Math.min(h7, c), d = Math.max(h7, c), O = f.from - u, m = f.to - d;
              (O == 0 || O == 1 || u == 0) && (m == 0 || m == -1 || d == e.state.doc.length) && (h7 = 0, c = e.state.doc.length);
            }
            if (e.inputState.composing > -1 && l.ranges.length > 1) this.newSel = l.replaceRange(b.range(c, h7));
            else if (e.lineWrapping && c == h7 && !(l.main.empty && l.main.head == h7) && e.inputState.lastTouchTime > Date.now() - 100) {
              let u = e.coordsAtPos(h7, -1), d = 0;
              u && (d = e.inputState.lastTouchY <= u.bottom ? -1 : 1), this.newSel = b.create([b.cursor(h7, d)]);
            } else this.newSel = b.single(c, h7);
          }
        }
      };
      function _h(n, e, t, i) {
        if (n.isComposite()) {
          let r = -1, s = -1, o = -1, l = -1;
          for (let a = 0, h7 = i, c = i; a < n.children.length; a++) {
            let f = n.children[a], u = h7 + f.length;
            if (h7 < e && u > t) return _h(f, e, t, h7);
            if (u >= e && r == -1 && (r = a, s = h7), h7 > t && f.dom.parentNode == n.dom) {
              o = a, l = c;
              break;
            }
            c = u, h7 = u + f.breakAfter;
          }
          return { from: s, to: l < 0 ? i + n.length : l, startDOM: (r ? n.children[r - 1].dom.nextSibling : null) || n.dom.firstChild, endDOM: o < n.children.length && o >= 0 ? n.children[o].dom : null };
        } else return n.isText() ? { from: i, to: i + n.length, startDOM: n.dom, endDOM: n.dom.nextSibling } : null;
      }
      function Vh(n, e) {
        let t, { newSel: i } = e, { state: r } = n, s = r.selection.main, o = n.inputState.lastKeyTime > Date.now() - 100 ? n.inputState.lastKeyCode : -1;
        if (e.bounds) {
          let { from: l, to: a } = e.bounds, h7 = s.from, c = null;
          (o === 8 || w.android && e.text.length < a - l) && (h7 = s.to, c = "end");
          let f = r.doc.sliceString(l, a, ci), u, d;
          !s.empty && s.from >= l && s.to <= a && (e.typeOver || f != e.text) && f.slice(0, s.from - l) == e.text.slice(0, s.from - l) && f.slice(s.to - l) == e.text.slice(u = e.text.length - (f.length - (s.to - l))) ? t = { from: s.from, to: s.to, insert: M.of(e.text.slice(s.from - l, u).split(ci)) } : (d = Wh(f, e.text, h7 - l, c)) && (w.chrome && o == 13 && d.toB == d.from + 2 && e.text.slice(d.from, d.toB) == ci + ci && d.toB--, t = { from: l + d.from, to: l + d.toA, insert: M.of(e.text.slice(d.from, d.toB).split(ci)) });
        } else i && (!n.hasFocus && r.facet(st) || rr(i, s)) && (i = null);
        if (!t && !i) return false;
        if ((w.mac || w.android) && t && t.from == t.to && t.from == s.head - 1 && /^\. ?$/.test(t.insert.toString()) && n.contentDOM.getAttribute("autocorrect") == "off" ? (i && t.insert.length == 2 && (i = b.single(i.main.anchor - 1, i.main.head - 1)), t = { from: t.from, to: t.to, insert: M.of([t.insert.toString().replace(".", " ")]) }) : r.doc.lineAt(s.from).to < s.to && n.docView.lineHasWidget(s.to) && n.inputState.insertingTextAt > Date.now() - 50 ? t = { from: s.from, to: s.to, insert: r.toText(n.inputState.insertingText) } : w.chrome && t && t.from == t.to && t.from == s.head && t.insert.toString() == `
 ` && n.lineWrapping && (i && (i = b.single(i.main.anchor - 1, i.main.head - 1)), t = { from: s.from, to: s.to, insert: M.of([" "]) }), t) return yo(n, t, i, o);
        if (i && !rr(i, s)) {
          let l = false, a = "select";
          return n.inputState.lastSelectionTime > Date.now() - 50 && (n.inputState.lastSelectionOrigin == "select" && (l = true), a = n.inputState.lastSelectionOrigin, a == "select.pointer" && (i = Yh(r.facet(Ji).map((h7) => h7(n)), i))), n.dispatch({ selection: i, scrollIntoView: l, userEvent: a }), true;
        } else return false;
      }
      function yo(n, e, t, i = -1) {
        if (w.ios && n.inputState.flushIOSKey(e)) return true;
        let r = n.state.selection.main;
        if (w.android && (e.to == r.to && (e.from == r.from || e.from == r.from - 1 && n.state.sliceDoc(e.from, r.from) == " ") && e.insert.length == 1 && e.insert.lines == 2 && pi(n.contentDOM, "Enter", 13) || (e.from == r.from - 1 && e.to == r.to && e.insert.length == 0 || i == 8 && e.insert.length < e.to - e.from && e.to > r.head) && pi(n.contentDOM, "Backspace", 8) || e.from == r.from && e.to == r.to + 1 && e.insert.length == 0 && pi(n.contentDOM, "Delete", 46))) return true;
        let s = e.insert.toString();
        n.inputState.composing >= 0 && n.inputState.composing++;
        let o, l = () => o || (o = _O(n, e, t));
        return n.state.facet(vh).some((a) => a(n, e.from, e.to, s, l)) || n.dispatch(l()), true;
      }
      function _O(n, e, t) {
        let i, r = n.state, s = r.selection.main, o = -1;
        if (e.from == e.to && e.from < s.from || e.from > s.to) {
          let a = e.from < s.from ? -1 : 1, h7 = a < 0 ? s.from : s.to, c = Ii(r.facet(Ji).map((f) => f(n)), h7, a);
          e.from == c && (o = c);
        }
        if (o > -1) i = { changes: e, selection: b.cursor(e.from + e.insert.length, -1) };
        else if (e.from >= s.from && e.to <= s.to && e.to - e.from >= (s.to - s.from) / 3 && (!t || t.main.empty && t.main.from == e.from + e.insert.length) && n.inputState.composing < 0) {
          let a = s.from < e.from ? r.sliceDoc(s.from, e.from) : "", h7 = s.to > e.to ? r.sliceDoc(e.to, s.to) : "";
          i = r.replaceSelection(n.state.toText(a + e.insert.sliceString(0, void 0, n.state.lineBreak) + h7));
        } else {
          let a = r.changes(e), h7 = t && t.main.to <= a.newLength ? t.main : void 0;
          if (r.selection.ranges.length > 1 && (n.inputState.composing >= 0 || n.inputState.compositionPendingChange) && e.to <= s.to + 10 && e.to >= s.to - 10) {
            let c = n.state.sliceDoc(e.from, e.to), f, u = t && zh(n, t.main.head);
            if (u) {
              let O = e.insert.length - (e.to - e.from);
              f = { from: u.from, to: u.to - O };
            } else f = n.state.doc.lineAt(s.head);
            let d = s.to - e.to;
            i = r.changeByRange((O) => {
              if (O.from == s.from && O.to == s.to) return { changes: a, range: h7 || O.map(a) };
              let m = O.to - d, g = m - c.length;
              if (n.state.sliceDoc(g, m) != c || m >= f.from && g <= f.to) return { range: O };
              let S = r.changes({ from: g, to: m, insert: e.insert }), x = O.to - s.to;
              return { changes: S, range: h7 ? b.range(Math.max(0, h7.anchor + x), Math.max(0, h7.head + x)) : O.map(S) };
            });
          } else i = { changes: a, selection: h7 && r.selection.replaceRange(h7) };
        }
        let l = "input.type";
        return (n.composing || n.inputState.compositionPendingChange && n.inputState.compositionEndedAt > Date.now() - 50) && (n.inputState.compositionPendingChange = false, l += ".compose", n.inputState.compositionFirstChange && (l += ".start", n.inputState.compositionFirstChange = false)), r.update(i, { userEvent: l, scrollIntoView: true });
      }
      function Wh(n, e, t, i) {
        let r = Math.min(n.length, e.length), s = 0;
        for (; s < r && n.charCodeAt(s) == e.charCodeAt(s); ) s++;
        if (s == r && n.length == e.length) return null;
        let o = n.length, l = e.length;
        for (; o > 0 && l > 0 && n.charCodeAt(o - 1) == e.charCodeAt(l - 1); ) o--, l--;
        if (i == "end") {
          let a = Math.max(0, s - Math.min(o, l));
          t -= o + a - s;
        }
        if (o < s && n.length < e.length) {
          let a = t <= s && t >= o ? s - t : 0;
          s -= a, l = s + (l - o), o = s;
        } else if (l < s) {
          let a = t <= s && t >= l ? s - t : 0;
          s -= a, o = s + (o - l), l = s;
        }
        return { from: s, toA: o, toB: l };
      }
      function VO(n) {
        let e = [];
        if (n.root.activeElement != n.contentDOM) return e;
        let { anchorNode: t, anchorOffset: i, focusNode: r, focusOffset: s } = n.observer.selectionRange;
        return t && (e.push(new nr(t, i)), (r != t || s != i) && e.push(new nr(r, s))), e;
      }
      function WO(n, e) {
        if (n.length == 0) return null;
        let t = n[0].pos, i = n.length == 2 ? n[1].pos : t;
        return t > -1 && i > -1 ? b.single(t + e, i + e) : null;
      }
      function rr(n, e) {
        return e.head == n.main.head && e.anchor == n.main.anchor;
      }
      var Ns = class {
        setSelectionOrigin(e) {
          this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
        }
        constructor(e) {
          this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.touchActive = false, this.lastTouchTime = 0, this.lastTouchX = 0, this.lastTouchY = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.lastWheelEvent = 0, this.pendingIOSKey = void 0, this.lastIOSMomentumScroll = 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = false, this.compositionPendingChange = false, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, w.safari && e.contentDOM.addEventListener("input", () => null), w.gecko && np(e.contentDOM.ownerDocument);
        }
        handleEvent(e) {
          !FO(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(e.type, e)) : this.runHandlers(e.type, e));
        }
        runHandlers(e, t) {
          let i = this.handlers[e];
          if (i) {
            for (let r of i.observers) r(this.view, t);
            for (let r of i.handlers) {
              if (t.defaultPrevented) break;
              if (r(this.view, t)) {
                t.preventDefault();
                break;
              }
            }
          }
        }
        ensureHandlers(e) {
          let t = BO(e), i = this.handlers, r = this.view.contentDOM;
          for (let s in t) if (s != "scroll") {
            let o = !t[s].handlers.length, l = i[s];
            l && o != !l.handlers.length && (r.removeEventListener(s, this.handleEvent), l = null), l || r.addEventListener(s, this.handleEvent, { passive: o });
          }
          for (let s in i) s != "scroll" && !t[s] && r.removeEventListener(s, this.handleEvent);
          this.handlers = t;
        }
        keydown(e) {
          if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode)) return true;
          if (this.tabFocusMode > 0 && e.keyCode != 27 && Bh.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), w.android && w.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8)) return this.view.observer.delayAndroidKey(e.key, e.keyCode), true;
          if (w.ios && !e.synthetic && !e.altKey && !e.metaKey && (Dh.some((t) => t.keyCode == e.keyCode) && !e.ctrlKey || qO.indexOf(e.key) > -1 && e.ctrlKey)) {
            let t = { ctrlKey: e.ctrlKey, altKey: e.altKey, metaKey: e.metaKey, shiftKey: e.shiftKey };
            return t.shiftKey && w.ios && !/^(off|none)$/.test(this.view.contentDOM.autocapitalize) && DO(this.view.win) && (t.shiftKey = false), this.pendingIOSKey = { key: e.key, keyCode: e.keyCode, mods: t }, setTimeout(() => this.flushIOSKey(), 250), true;
          }
          return e.keyCode != 229 && this.view.observer.forceFlush(), false;
        }
        flushIOSKey(e) {
          let t = this.pendingIOSKey;
          return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? false : (this.pendingIOSKey = void 0, pi(this.view.contentDOM, t.key, t.keyCode, t.mods));
        }
        ignoreDuringComposition(e) {
          return !/^key/.test(e.type) || e.synthetic ? false : this.composing > 0 ? true : w.safari && !w.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = false, true) : false;
        }
        startMouseSelection(e) {
          this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e;
        }
        update(e) {
          this.view.observer.update(e), this.mouseSelection && this.mouseSelection.update(e), this.draggedContent && e.docChanged && (this.draggedContent = this.draggedContent.map(e.changes)), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
        }
        destroy() {
          this.mouseSelection && this.mouseSelection.destroy();
        }
      };
      function DO(n) {
        return n.visualViewport ? n.visualViewport.height * n.visualViewport.scale / n.document.documentElement.clientHeight < 0.85 : false;
      }
      function Da(n, e) {
        return (t, i) => {
          try {
            return e.call(n, i, t);
          } catch (r) {
            Re(t.state, r);
          }
        };
      }
      function BO(n) {
        let e = /* @__PURE__ */ Object.create(null);
        function t(i) {
          return e[i] || (e[i] = { observers: [], handlers: [] });
        }
        for (let i of n) {
          let r = i.spec, s = r && r.plugin.domEventHandlers, o = r && r.plugin.domEventObservers;
          if (s) for (let l in s) {
            let a = s[l];
            a && t(l).handlers.push(Da(i.value, a));
          }
          if (o) for (let l in o) {
            let a = o[l];
            a && t(l).observers.push(Da(i.value, a));
          }
        }
        for (let i in _e) t(i).handlers.push(_e[i]);
        for (let i in ce) t(i).observers.push(ce[i]);
        return e;
      }
      var Dh = [{ key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" }, { key: "Enter", keyCode: 13, inputType: "insertParagraph" }, { key: "Enter", keyCode: 13, inputType: "insertLineBreak" }, { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }], qO = "dthko", Bh = [16, 17, 18, 20, 91, 92, 224, 225], _n = 6;
      function Vn(n) {
        return Math.max(0, n) * 0.7 + 8;
      }
      function IO(n, e) {
        return Math.max(Math.abs(n.clientX - e.clientX), Math.abs(n.clientY - e.clientY));
      }
      var Gs = class {
        constructor(e, t, i, r) {
          this.view = e, this.startEvent = t, this.style = i, this.mustSelect = r, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = t, this.scrollParents = fh(e.contentDOM), this.atoms = e.state.facet(Ji).map((o) => o(e));
          let s = e.contentDOM.ownerDocument;
          s.addEventListener("mousemove", this.move = this.move.bind(this)), s.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(D.allowMultipleSelections) && NO(e, t), this.dragging = UO(e, t) && Nh(t) == 1 ? null : false;
        }
        start(e) {
          this.dragging === false && this.select(e);
        }
        move(e) {
          if (e.buttons == 0) return this.destroy();
          if (this.dragging || this.dragging == null && IO(this.startEvent, e) < 10) return;
          this.select(this.lastEvent = e);
          let t = 0, i = 0, r = 0, s = 0, o = this.view.win.innerWidth, l = this.view.win.innerHeight;
          this.scrollParents.x && ({ left: r, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: s, bottom: l } = this.scrollParents.y.getBoundingClientRect());
          let a = Eh(this.view);
          e.clientX - a.left <= r + _n ? t = -Vn(r - e.clientX) : e.clientX + a.right >= o - _n && (t = Vn(e.clientX - o)), e.clientY - a.top <= s + _n ? i = -Vn(s - e.clientY) : e.clientY + a.bottom >= l - _n && (i = Vn(e.clientY - l)), this.setScrollSpeed(t, i);
        }
        up(e) {
          this.dragging == null && this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
        }
        destroy() {
          this.setScrollSpeed(0, 0);
          let e = this.view.contentDOM.ownerDocument;
          e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
        }
        setScrollSpeed(e, t) {
          this.scrollSpeed = { x: e, y: t }, e || t ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
        }
        scroll() {
          let { x: e, y: t } = this.scrollSpeed;
          e && this.scrollParents.x && (this.scrollParents.x.scrollLeft += e, e = 0), t && this.scrollParents.y && (this.scrollParents.y.scrollTop += t, t = 0), (e || t) && this.view.win.scrollBy(e, t), this.dragging === false && this.select(this.lastEvent);
        }
        select(e) {
          let { view: t } = this, i = Yh(this.atoms, this.style.get(e, this.extend, this.multiple));
          (this.mustSelect || !i.eq(t.state.selection, this.dragging === false)) && this.view.dispatch({ selection: i, userEvent: "select.pointer" }), this.mustSelect = false;
        }
        update(e) {
          e.transactions.some((t) => t.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
        }
      };
      function NO(n, e) {
        let t = n.state.facet(kh);
        return t.length ? t[0](e) : w.mac ? e.metaKey : e.ctrlKey;
      }
      function GO(n, e) {
        let t = n.state.facet(wh);
        return t.length ? t[0](e) : w.mac ? !e.altKey : !e.ctrlKey;
      }
      function UO(n, e) {
        let { main: t } = n.state.selection;
        if (t.empty) return false;
        let i = Hi(n.root);
        if (!i || i.rangeCount == 0) return true;
        let r = i.getRangeAt(0).getClientRects();
        for (let s = 0; s < r.length; s++) {
          let o = r[s];
          if (o.left <= e.clientX && o.right >= e.clientX && o.top <= e.clientY && o.bottom >= e.clientY) return true;
        }
        return false;
      }
      function FO(n, e) {
        if (!e.bubbles) return true;
        if (e.defaultPrevented) return false;
        for (let t = e.target, i; t != n.contentDOM; t = t.parentNode) if (!t || t.nodeType == 11 || (i = F.get(t)) && i.isWidget() && !i.isHidden && i.widget.ignoreEvent(e)) return false;
        return true;
      }
      var _e = /* @__PURE__ */ Object.create(null), ce = /* @__PURE__ */ Object.create(null), qh = w.ie && w.ie_version < 15 || w.ios && w.webkit_version < 604;
      function HO(n) {
        let e = n.dom.parentNode;
        if (!e) return;
        let t = e.appendChild(document.createElement("textarea"));
        t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
          n.focus(), t.remove(), Ih(n, t.value);
        }, 50);
      }
      function dr(n, e, t) {
        for (let i of n.facet(e)) t = i(t, n);
        return t;
      }
      function Ih(n, e) {
        e = dr(n.state, mo, e);
        let { state: t } = n, i, r = 1, s = t.toText(e), o = s.lines == t.selection.ranges.length;
        if (Us != null && t.selection.ranges.every((a) => a.empty) && Us == s.toString()) {
          let a = -1;
          i = t.changeByRange((h7) => {
            let c = t.doc.lineAt(h7.from);
            if (c.from == a) return { range: h7 };
            a = c.from;
            let f = t.toText((o ? s.line(r++).text : e) + t.lineBreak);
            return { changes: { from: c.from, insert: f }, range: b.cursor(h7.from + f.length) };
          });
        } else o ? i = t.changeByRange((a) => {
          let h7 = s.line(r++);
          return { changes: { from: a.from, to: a.to, insert: h7.text }, range: b.cursor(a.from + h7.length) };
        }) : i = t.replaceSelection(s);
        n.dispatch(i, { userEvent: "input.paste", scrollIntoView: true });
      }
      ce.scroll = (n) => {
        let e = n.inputState;
        e.lastScrollTop = n.scrollDOM.scrollTop, e.lastScrollLeft = n.scrollDOM.scrollLeft, w.ios && !e.touchActive && (e.lastIOSMomentumScroll = Date.now());
      };
      ce.wheel = ce.mousewheel = (n) => {
        n.inputState.lastWheelEvent = Date.now();
      };
      _e.keydown = (n, e) => (n.inputState.setSelectionOrigin("select"), e.keyCode == 27 && n.inputState.tabFocusMode != 0 && (n.inputState.tabFocusMode = Date.now() + 2e3), false);
      ce.touchstart = (n, e) => {
        let t = n.inputState, i = e.targetTouches[0];
        t.touchActive = true, t.lastTouchTime = Date.now(), i && (t.lastTouchX = i.clientX, t.lastTouchY = i.clientY), t.setSelectionOrigin("select.pointer");
      };
      ce.touchmove = (n) => {
        n.inputState.setSelectionOrigin("select.pointer");
      };
      ce.touchend = (n, e) => {
        n.inputState.touchActive = false;
      };
      _e.mousedown = (n, e) => {
        if (n.observer.flush(), n.inputState.lastTouchTime > Date.now() - 2e3) return false;
        let t = null;
        for (let i of n.state.facet($h)) if (t = i(n, e), t) break;
        if (!t && e.button == 0 && (t = JO(n, e)), t) {
          let i = !n.hasFocus;
          n.inputState.startMouseSelection(new Gs(n, e, t, i)), i && n.observer.ignore(() => {
            Oh(n.contentDOM);
            let s = n.root.activeElement;
            s && !s.contains(n.contentDOM) && s.blur();
          });
          let r = n.inputState.mouseSelection;
          if (r) return r.start(e), r.dragging === false;
        } else n.inputState.setSelectionOrigin("select.pointer");
        return false;
      };
      function Ba(n, e, t, i) {
        if (i == 1) return b.cursor(e, t);
        if (i == 2) return XO(n.state, e, t);
        {
          let r = n.docView.lineAt(e, t), s = n.state.doc.lineAt(r ? r.posAtEnd : e), o = r ? r.posAtStart : s.from, l = r ? r.posAtEnd : s.to;
          return l < n.state.doc.length && l == s.to && l++, b.undirectionalRange(o, l);
        }
      }
      var KO = w.ie && w.ie_version <= 11, qa = null, Ia = 0, Na = 0;
      function Nh(n) {
        if (!KO) return n.detail;
        let e = qa, t = Na;
        return qa = n, Na = Date.now(), Ia = !e || t > Date.now() - 400 && Math.abs(e.clientX - n.clientX) < 2 && Math.abs(e.clientY - n.clientY) < 2 ? (Ia + 1) % 3 : 1;
      }
      function JO(n, e) {
        let t = n.posAndSideAtCoords({ x: e.clientX, y: e.clientY }, false), i = Nh(e), r = n.state.selection;
        return { update(s) {
          s.docChanged && (t.pos = s.changes.mapPos(t.pos), r = r.map(s.changes));
        }, get(s, o, l) {
          let a = n.posAndSideAtCoords({ x: s.clientX, y: s.clientY }, false), h7, c = Ba(n, a.pos, a.assoc, i);
          if (t.pos != a.pos && !o) {
            let f = Ba(n, t.pos, t.assoc, i), u = Math.min(f.from, c.from), d = Math.max(f.to, c.to);
            c = u < c.from ? b.range(u, d, c.assoc) : b.range(d, u, c.assoc);
          }
          return o ? r.replaceRange(r.main.extend(c.from, c.to, c.assoc)) : l && i == 1 && r.ranges.length > 1 && (h7 = ep(r, a.pos)) ? h7 : l ? r.addRange(c) : b.create([c]);
        } };
      }
      function ep(n, e) {
        for (let t = 0; t < n.ranges.length; t++) {
          let { from: i, to: r } = n.ranges[t];
          if (i <= e && r >= e) return b.create(n.ranges.slice(0, t).concat(n.ranges.slice(t + 1)), n.mainIndex == t ? 0 : n.mainIndex - (n.mainIndex > t ? 1 : 0));
        }
        return null;
      }
      _e.dragstart = (n, e) => {
        let { selection: { main: t } } = n.state;
        if (e.target.draggable) {
          let r = n.docView.tile.nearest(e.target);
          if (r && r.isWidget()) {
            let s = r.posAtStart, o = s + r.length;
            (s >= t.to || o <= t.from) && (t = b.undirectionalRange(s, o));
          }
        }
        let { inputState: i } = n;
        return i.mouseSelection && (i.mouseSelection.dragging = true), i.draggedContent = t, e.dataTransfer && (e.dataTransfer.setData("Text", dr(n.state, go, n.state.sliceDoc(t.from, t.to))), e.dataTransfer.effectAllowed = "copyMove"), false;
      };
      _e.dragend = (n) => (n.inputState.draggedContent = null, false);
      function Ga(n, e, t, i) {
        if (t = dr(n.state, mo, t), !t) return;
        let r = n.posAtCoords({ x: e.clientX, y: e.clientY }, false), { draggedContent: s } = n.inputState, o = i && s && GO(n, e) ? { from: s.from, to: s.to } : null, l = { from: r, insert: t }, a = n.state.changes(o ? [o, l] : l);
        n.focus(), n.dispatch({ changes: a, selection: { anchor: a.mapPos(r, -1), head: a.mapPos(r, 1) }, userEvent: o ? "move.drop" : "input.drop" }), n.inputState.draggedContent = null;
      }
      _e.drop = (n, e) => {
        if (!e.dataTransfer) return false;
        if (n.state.readOnly) return true;
        let t = e.dataTransfer.files;
        if (t && t.length) {
          let i = Array(t.length), r = 0, s = () => {
            ++r == t.length && Ga(n, e, i.filter((o) => o != null).join(n.state.lineBreak), false);
          };
          for (let o = 0; o < t.length; o++) {
            let l = new FileReader();
            l.onerror = s, l.onload = () => {
              /[\x00-\x08\x0e-\x1f]{2}/.test(l.result) || (i[o] = l.result), s();
            }, l.readAsText(t[o]);
          }
          return true;
        } else {
          let i = e.dataTransfer.getData("Text");
          if (i) return Ga(n, e, i, true), true;
        }
        return false;
      };
      _e.paste = (n, e) => {
        if (n.state.readOnly) return true;
        n.observer.flush();
        let t = qh ? null : e.clipboardData;
        return t ? (Ih(n, t.getData("text/plain") || t.getData("text/uri-list")), true) : (HO(n), false);
      };
      function tp(n, e) {
        let t = n.dom.parentNode;
        if (!t) return;
        let i = t.appendChild(document.createElement("textarea"));
        i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = e, i.focus(), i.selectionEnd = e.length, i.selectionStart = 0, setTimeout(() => {
          i.remove(), n.focus();
        }, 50);
      }
      function ip(n) {
        let e = [], t = [], i = false;
        for (let r of n.selection.ranges) r.empty || (e.push(n.sliceDoc(r.from, r.to)), t.push(r));
        if (!e.length) {
          let r = -1;
          for (let { from: s } of n.selection.ranges) {
            let o = n.doc.lineAt(s);
            o.number > r && (e.push(o.text), t.push({ from: o.from, to: Math.min(n.doc.length, o.to + 1) })), r = o.number;
          }
          i = true;
        }
        return { text: dr(n, go, e.join(n.lineBreak)), ranges: t, linewise: i };
      }
      var Us = null;
      _e.copy = _e.cut = (n, e) => {
        if (!Vi(n.contentDOM, n.observer.selectionRange)) return false;
        let { text: t, ranges: i, linewise: r } = ip(n.state);
        if (!t && !r) return false;
        Us = r ? t : null, e.type == "cut" && !n.state.readOnly && n.dispatch({ changes: i, scrollIntoView: true, userEvent: "delete.cut" });
        let s = qh ? null : e.clipboardData;
        return s ? (s.clearData(), s.setData("text/plain", t), true) : (tp(n, t), false);
      };
      var Gh = Oe.define();
      function Uh(n, e) {
        let t = [];
        for (let i of n.facet(Th)) {
          let r = i(n, e);
          r && t.push(r);
        }
        return t.length ? n.update({ effects: t, annotations: Gh.of(true) }) : null;
      }
      function Fh(n) {
        setTimeout(() => {
          let e = n.hasFocus;
          if (e != n.inputState.notifiedFocused) {
            let t = Uh(n.state, e);
            t ? n.dispatch(t) : n.update([]);
          }
        }, 10);
      }
      ce.focus = (n) => {
        n.inputState.lastFocusTime = Date.now(), !n.scrollDOM.scrollTop && (n.inputState.lastScrollTop || n.inputState.lastScrollLeft) && (n.scrollDOM.scrollTop = n.inputState.lastScrollTop, n.scrollDOM.scrollLeft = n.inputState.lastScrollLeft), Fh(n);
      };
      ce.blur = (n) => {
        n.observer.clearSelectionRange(), Fh(n);
      };
      ce.compositionstart = ce.compositionupdate = (n) => {
        n.observer.editContext || (n.inputState.compositionFirstChange == null && (n.inputState.compositionFirstChange = true), n.inputState.composing < 0 && (n.inputState.composing = 0));
      };
      ce.compositionend = (n) => {
        n.observer.editContext || (n.inputState.composing = -1, n.inputState.compositionEndedAt = Date.now(), n.inputState.compositionPendingKey = true, n.inputState.compositionPendingChange = n.observer.pendingRecords().length > 0, n.inputState.compositionFirstChange = null, w.chrome && w.android ? n.observer.flushSoon() : n.inputState.compositionPendingChange ? Promise.resolve().then(() => n.observer.flush()) : setTimeout(() => {
          n.inputState.composing < 0 && n.docView.hasComposition && n.update([]);
        }, 50));
      };
      ce.contextmenu = (n) => {
        n.inputState.lastContextMenu = Date.now();
      };
      _e.beforeinput = (n, e) => {
        var t, i;
        if ((e.inputType == "insertText" || e.inputType == "insertCompositionText") && (n.inputState.insertingText = e.data, n.inputState.insertingTextAt = Date.now()), e.inputType == "insertReplacementText" && n.observer.editContext) {
          let s = (t = e.dataTransfer) === null || t === void 0 ? void 0 : t.getData("text/plain"), o = e.getTargetRanges();
          if (s && o.length) {
            let l = o[0], a = n.posAtDOM(l.startContainer, l.startOffset), h7 = n.posAtDOM(l.endContainer, l.endOffset);
            return yo(n, { from: a, to: h7, insert: n.state.toText(s) }, null), true;
          }
        }
        let r;
        if (w.chrome && w.android && (r = Dh.find((s) => s.inputType == e.inputType)) && (n.observer.delayAndroidKey(r.key, r.keyCode), r.key == "Backspace" || r.key == "Delete")) {
          let s = ((i = window.visualViewport) === null || i === void 0 ? void 0 : i.height) || 0;
          setTimeout(() => {
            var o;
            (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > s + 10 && n.hasFocus && (n.contentDOM.blur(), n.focus());
          }, 100);
        }
        return w.ios && e.inputType == "deleteContentForward" && n.observer.flushSoon(), w.safari && e.inputType == "insertText" && n.inputState.composing >= 0 && setTimeout(() => ce.compositionend(n, e), 20), false;
      };
      var Ua = /* @__PURE__ */ new Set();
      function np(n) {
        Ua.has(n) || (Ua.add(n), n.addEventListener("copy", () => {
        }), n.addEventListener("cut", () => {
        }));
      }
      var Fa = ["pre-wrap", "normal", "pre-line", "break-spaces"], yi = false;
      function Ha() {
        yi = false;
      }
      var Fs = class {
        constructor(e) {
          this.lineWrapping = e, this.doc = M.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
        }
        heightForGap(e, t) {
          let i = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
          return this.lineWrapping && (i += Math.max(0, Math.ceil((t - e - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
        }
        heightForLine(e) {
          return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
        }
        setDoc(e) {
          return this.doc = e, this;
        }
        mustRefreshForWrapping(e) {
          return Fa.indexOf(e) > -1 != this.lineWrapping;
        }
        mustRefreshForHeights(e) {
          let t = false;
          for (let i = 0; i < e.length; i++) {
            let r = e[i];
            r < 0 ? i++ : this.heightSamples[Math.floor(r * 10)] || (t = true, this.heightSamples[Math.floor(r * 10)] = true);
          }
          return t;
        }
        refresh(e, t, i, r, s, o) {
          let l = Fa.indexOf(e) > -1, a = Math.abs(t - this.lineHeight) > 0.3 || this.lineWrapping != l;
          if (this.lineWrapping = l, this.lineHeight = t, this.charWidth = i, this.textHeight = r, this.lineLength = s, a) {
            this.heightSamples = {};
            for (let h7 = 0; h7 < o.length; h7++) {
              let c = o[h7];
              c < 0 ? h7++ : this.heightSamples[Math.floor(c * 10)] = true;
            }
          }
          return a;
        }
      }, Hs = class {
        constructor(e, t) {
          this.from = e, this.heights = t, this.index = 0;
        }
        get more() {
          return this.index < this.heights.length;
        }
      }, je = class n {
        constructor(e, t, i, r, s) {
          this.from = e, this.length = t, this.top = i, this.height = r, this._content = s;
        }
        get type() {
          return typeof this._content == "number" ? me.Text : Array.isArray(this._content) ? this._content : this._content.type;
        }
        get to() {
          return this.from + this.length;
        }
        get bottom() {
          return this.top + this.height;
        }
        get widget() {
          return this._content instanceof qt ? this._content.widget : null;
        }
        get widgetLineBreaks() {
          return typeof this._content == "number" ? this._content : 0;
        }
        join(e) {
          let t = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(e._content) ? e._content : [e]);
          return new n(this.from, this.length + e.length, this.top, this.height + e.height, t);
        }
      }, I = (function(n) {
        return n[n.ByPos = 0] = "ByPos", n[n.ByHeight = 1] = "ByHeight", n[n.ByPosNoHeight = 2] = "ByPosNoHeight", n;
      })(I || (I = {})), Nn = 1e-3, xe = class n {
        constructor(e, t, i = 2) {
          this.length = e, this.height = t, this.flags = i;
        }
        get outdated() {
          return (this.flags & 2) > 0;
        }
        set outdated(e) {
          this.flags = (e ? 2 : 0) | this.flags & -3;
        }
        setHeight(e) {
          this.height != e && (Math.abs(this.height - e) > Nn && (yi = true), this.height = e);
        }
        replace(e, t, i) {
          return n.of(i);
        }
        decomposeLeft(e, t) {
          t.push(this);
        }
        decomposeRight(e, t) {
          t.push(this);
        }
        applyChanges(e, t, i, r) {
          let s = this, o = i.doc;
          for (let l = r.length - 1; l >= 0; l--) {
            let { fromA: a, toA: h7, fromB: c, toB: f } = r[l], u = s.lineAt(a, I.ByPosNoHeight, i.setDoc(t), 0, 0), d = u.to >= h7 ? u : s.lineAt(h7, I.ByPosNoHeight, i, 0, 0);
            for (f += d.to - h7, h7 = d.to; l > 0 && u.from <= r[l - 1].toA; ) a = r[l - 1].fromA, c = r[l - 1].fromB, l--, a < u.from && (u = s.lineAt(a, I.ByPosNoHeight, i, 0, 0));
            c += u.from - a, a = u.from;
            let O = Js.build(i.setDoc(o), e, c, f);
            s = sr(s, s.replace(a, h7, O));
          }
          return s.updateHeight(i, 0);
        }
        static empty() {
          return new Ze(0, 0, 0);
        }
        static of(e) {
          if (e.length == 1) return e[0];
          let t = 0, i = e.length, r = 0, s = 0;
          for (; ; ) if (t == i) if (r > s * 2) {
            let l = e[t - 1];
            l.break ? e.splice(--t, 1, l.left, null, l.right) : e.splice(--t, 1, l.left, l.right), i += 1 + l.break, r -= l.size;
          } else if (s > r * 2) {
            let l = e[i];
            l.break ? e.splice(i, 1, l.left, null, l.right) : e.splice(i, 1, l.left, l.right), i += 2 + l.break, s -= l.size;
          } else break;
          else if (r < s) {
            let l = e[t++];
            l && (r += l.size);
          } else {
            let l = e[--i];
            l && (s += l.size);
          }
          let o = 0;
          return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, i++), new Ks(n.of(e.slice(0, t)), o, n.of(e.slice(i)));
        }
      };
      function sr(n, e) {
        return n == e ? n : (n.constructor != e.constructor && (yi = true), e);
      }
      xe.prototype.size = 1;
      var rp = Y.replace({}), or = class extends xe {
        constructor(e, t, i) {
          super(e, t), this.deco = i, this.spaceAbove = 0;
        }
        mainBlock(e, t) {
          return new je(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
        }
        blockAt(e, t, i, r) {
          return this.spaceAbove && e < i + this.spaceAbove ? new je(r, 0, i, this.spaceAbove, rp) : this.mainBlock(i, r);
        }
        lineAt(e, t, i, r, s) {
          let o = this.mainBlock(r, s);
          return this.spaceAbove ? this.blockAt(0, i, r, s).join(o) : o;
        }
        forEachLine(e, t, i, r, s, o) {
          e <= s + this.length && t >= s && o(this.lineAt(0, I.ByPos, i, r, s));
        }
        setMeasuredHeight(e) {
          let t = e.heights[e.index++];
          t < 0 ? (this.spaceAbove = -t, t = e.heights[e.index++]) : this.spaceAbove = 0, this.setHeight(t);
        }
        updateHeight(e, t = 0, i = false, r) {
          return r && r.from <= t && r.more && this.setMeasuredHeight(r), this.outdated = false, this;
        }
        toString() {
          return `block(${this.length})`;
        }
      }, Ze = class n extends or {
        constructor(e, t, i) {
          super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = i;
        }
        mainBlock(e, t) {
          return new je(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
        }
        replace(e, t, i) {
          let r = i[0];
          return i.length == 1 && (r instanceof n || r instanceof gt && r.flags & 4) && Math.abs(this.length - r.length) < 10 ? (r instanceof gt ? r = new n(r.length, this.height, this.spaceAbove) : r.height = this.height, this.outdated || (r.outdated = false), r) : xe.of(i);
        }
        updateHeight(e, t = 0, i = false, r) {
          return r && r.from <= t && r.more ? this.setMeasuredHeight(r) : (i || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = false, this;
        }
        toString() {
          return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
        }
      }, gt = class n extends xe {
        constructor(e) {
          super(e, 0);
        }
        heightMetrics(e, t) {
          let i = e.doc.lineAt(t).number, r = e.doc.lineAt(t + this.length).number, s = r - i + 1, o, l = 0;
          if (e.lineWrapping) {
            let a = Math.min(this.height, e.lineHeight * s);
            o = a / s, this.length > s + 1 && (l = (this.height - a) / (this.length - s - 1));
          } else o = this.height / s;
          return { firstLine: i, lastLine: r, perLine: o, perChar: l };
        }
        blockAt(e, t, i, r) {
          let { firstLine: s, lastLine: o, perLine: l, perChar: a } = this.heightMetrics(t, r);
          if (t.lineWrapping) {
            let h7 = r + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - i) / this.height)) * this.length)), c = t.doc.lineAt(h7), f = l + c.length * a, u = Math.max(i, e - f / 2);
            return new je(c.from, c.length, u, f, 0);
          } else {
            let h7 = Math.max(0, Math.min(o - s, Math.floor((e - i) / l))), { from: c, length: f } = t.doc.line(s + h7);
            return new je(c, f, i + l * h7, l, 0);
          }
        }
        lineAt(e, t, i, r, s) {
          if (t == I.ByHeight) return this.blockAt(e, i, r, s);
          if (t == I.ByPosNoHeight) {
            let { from: d, to: O } = i.doc.lineAt(e);
            return new je(d, O - d, 0, 0, 0);
          }
          let { firstLine: o, perLine: l, perChar: a } = this.heightMetrics(i, s), h7 = i.doc.lineAt(e), c = l + h7.length * a, f = h7.number - o, u = r + l * f + a * (h7.from - s - f);
          return new je(h7.from, h7.length, Math.max(r, Math.min(u, r + this.height - c)), c, 0);
        }
        forEachLine(e, t, i, r, s, o) {
          e = Math.max(e, s), t = Math.min(t, s + this.length);
          let { firstLine: l, perLine: a, perChar: h7 } = this.heightMetrics(i, s);
          for (let c = e, f = r; c <= t; ) {
            let u = i.doc.lineAt(c);
            if (c == e) {
              let O = u.number - l;
              f += a * O + h7 * (e - s - O);
            }
            let d = a + h7 * u.length;
            o(new je(u.from, u.length, f, d, 0)), f += d, c = u.to + 1;
          }
        }
        replace(e, t, i) {
          let r = this.length - t;
          if (r > 0) {
            let s = i[i.length - 1];
            s instanceof n ? i[i.length - 1] = new n(s.length + r) : i.push(null, new n(r - 1));
          }
          if (e > 0) {
            let s = i[0];
            s instanceof n ? i[0] = new n(e + s.length) : i.unshift(new n(e - 1), null);
          }
          return xe.of(i);
        }
        decomposeLeft(e, t) {
          t.push(new n(e - 1), null);
        }
        decomposeRight(e, t) {
          t.push(null, new n(this.length - e - 1));
        }
        updateHeight(e, t = 0, i = false, r) {
          let s = t + this.length;
          if (r && r.from <= t + this.length && r.more) {
            let o = [], l = Math.max(t, r.from), a = -1;
            for (r.from > t && o.push(new n(r.from - t - 1).updateHeight(e, t)); l <= s && r.more; ) {
              let c = e.doc.lineAt(l).length;
              o.length && o.push(null);
              let f = r.heights[r.index++], u = 0;
              f < 0 && (u = -f, f = r.heights[r.index++]), a == -1 ? a = f : Math.abs(f - a) >= Nn && (a = -2);
              let d = new Ze(c, f, u);
              d.outdated = false, o.push(d), l += c + 1;
            }
            l <= s && o.push(null, new n(s - l).updateHeight(e, l));
            let h7 = xe.of(o);
            return (a < 0 || Math.abs(h7.height - this.height) >= Nn || Math.abs(a - this.heightMetrics(e, t).perLine) >= Nn) && (yi = true), sr(this, h7);
          } else (i || this.outdated) && (this.setHeight(e.heightForGap(t, t + this.length)), this.outdated = false);
          return this;
        }
        toString() {
          return `gap(${this.length})`;
        }
      }, Ks = class extends xe {
        constructor(e, t, i) {
          super(e.length + t + i.length, e.height + i.height, t | (e.outdated || i.outdated ? 2 : 0)), this.left = e, this.right = i, this.size = e.size + i.size;
        }
        get break() {
          return this.flags & 1;
        }
        blockAt(e, t, i, r) {
          let s = i + this.left.height;
          return e < s ? this.left.blockAt(e, t, i, r) : this.right.blockAt(e, t, s, r + this.left.length + this.break);
        }
        lineAt(e, t, i, r, s) {
          let o = r + this.left.height, l = s + this.left.length + this.break, a = t == I.ByHeight ? e < o : e < l, h7 = a ? this.left.lineAt(e, t, i, r, s) : this.right.lineAt(e, t, i, o, l);
          if (this.break || (a ? h7.to < l : h7.from > l)) return h7;
          let c = t == I.ByPosNoHeight ? I.ByPosNoHeight : I.ByPos;
          return a ? h7.join(this.right.lineAt(l, c, i, o, l)) : this.left.lineAt(l, c, i, r, s).join(h7);
        }
        forEachLine(e, t, i, r, s, o) {
          let l = r + this.left.height, a = s + this.left.length + this.break;
          if (this.break) e < a && this.left.forEachLine(e, t, i, r, s, o), t >= a && this.right.forEachLine(e, t, i, l, a, o);
          else {
            let h7 = this.lineAt(a, I.ByPos, i, r, s);
            e < h7.from && this.left.forEachLine(e, h7.from - 1, i, r, s, o), h7.to >= e && h7.from <= t && o(h7), t > h7.to && this.right.forEachLine(h7.to + 1, t, i, l, a, o);
          }
        }
        replace(e, t, i) {
          let r = this.left.length + this.break;
          if (t < r) return this.balanced(this.left.replace(e, t, i), this.right);
          if (e > this.left.length) return this.balanced(this.left, this.right.replace(e - r, t - r, i));
          let s = [];
          e > 0 && this.decomposeLeft(e, s);
          let o = s.length;
          for (let l of i) s.push(l);
          if (e > 0 && Ka(s, o - 1), t < this.length) {
            let l = s.length;
            this.decomposeRight(t, s), Ka(s, l);
          }
          return xe.of(s);
        }
        decomposeLeft(e, t) {
          let i = this.left.length;
          if (e <= i) return this.left.decomposeLeft(e, t);
          t.push(this.left), this.break && (i++, e >= i && t.push(null)), e > i && this.right.decomposeLeft(e - i, t);
        }
        decomposeRight(e, t) {
          let i = this.left.length, r = i + this.break;
          if (e >= r) return this.right.decomposeRight(e - r, t);
          e < i && this.left.decomposeRight(e, t), this.break && e < r && t.push(null), t.push(this.right);
        }
        balanced(e, t) {
          return e.size > 2 * t.size || t.size > 2 * e.size ? xe.of(this.break ? [e, null, t] : [e, t]) : (this.left = sr(this.left, e), this.right = sr(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
        }
        updateHeight(e, t = 0, i = false, r) {
          let { left: s, right: o } = this, l = t + s.length + this.break, a = null;
          return r && r.from <= t + s.length && r.more ? a = s = s.updateHeight(e, t, i, r) : s.updateHeight(e, t, i), r && r.from <= l + o.length && r.more ? a = o = o.updateHeight(e, l, i, r) : o.updateHeight(e, l, i), a ? this.balanced(s, o) : (this.height = this.left.height + this.right.height, this.outdated = false, this);
        }
        toString() {
          return this.left + (this.break ? " " : "-") + this.right;
        }
      };
      function Ka(n, e) {
        let t, i;
        n[e] == null && (t = n[e - 1]) instanceof gt && (i = n[e + 1]) instanceof gt && n.splice(e - 1, 3, new gt(t.length + 1 + i.length));
      }
      var sp = 5, Js = class n {
        constructor(e, t) {
          this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
        }
        get isCovered() {
          return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
        }
        span(e, t) {
          if (this.lineStart > -1) {
            let i = Math.min(t, this.lineEnd), r = this.nodes[this.nodes.length - 1];
            r instanceof Ze ? r.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new Ze(i - this.pos, -1, 0)), this.writtenTo = i, t > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
          }
          this.pos = t;
        }
        point(e, t, i) {
          if (e < t || i.heightRelevant) {
            let r = i.widget ? i.widget.estimatedHeight : 0, s = i.widget ? i.widget.lineBreaks : 0;
            r < 0 && (r = this.oracle.lineHeight);
            let o = t - e;
            i.block ? this.addBlock(new or(o, r, i)) : (o || s || r >= sp) && this.addLineDeco(r, s, o);
          } else t > e && this.span(e, t);
          this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
        }
        enterLine() {
          if (this.lineStart > -1) return;
          let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
          this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new Ze(this.pos - e, -1, 0)), this.writtenTo = this.pos;
        }
        blankContent(e, t) {
          let i = new gt(t - e);
          return this.oracle.doc.lineAt(e).to == t && (i.flags |= 4), i;
        }
        ensureLine() {
          this.enterLine();
          let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
          if (e instanceof Ze) return e;
          let t = new Ze(0, -1, 0);
          return this.nodes.push(t), t;
        }
        addBlock(e) {
          this.enterLine();
          let t = e.deco;
          t && t.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos = this.pos + e.length, t && t.endSide > 0 && (this.covering = e);
        }
        addLineDeco(e, t, i) {
          let r = this.ensureLine();
          r.length += i, r.collapsed += i, r.widgetHeight = Math.max(r.widgetHeight, e), r.breaks += t, this.writtenTo = this.pos = this.pos + i;
        }
        finish(e) {
          let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
          this.lineStart > -1 && !(t instanceof Ze) && !this.isCovered ? this.nodes.push(new Ze(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
          let i = e;
          for (let r of this.nodes) r instanceof Ze && r.updateHeight(this.oracle, i), i += r ? r.length : 1;
          return this.nodes;
        }
        static build(e, t, i, r) {
          let s = new n(i, e);
          return _.spans(t, i, r, s, 0), s.finish(i);
        }
      };
      function op(n, e, t) {
        let i = new eo();
        return _.compare(n, e, t, i, 0), i.changes;
      }
      var eo = class {
        constructor() {
          this.changes = [];
        }
        compareRange() {
        }
        comparePoint(e, t, i, r) {
          (e < t || i && i.heightRelevant || r && r.heightRelevant) && Oi(e, t, this.changes, 5);
        }
      };
      function lp(n, e) {
        let t = n.getBoundingClientRect(), i = n.ownerDocument, r = i.defaultView || window, s = Math.max(0, t.left), o = Math.min(r.innerWidth, t.right), l = Math.max(0, t.top), a = Math.min(r.innerHeight, t.bottom);
        for (let h7 = n.parentNode; h7 && h7 != i.body; ) if (h7.nodeType == 1) {
          let c = h7, f = window.getComputedStyle(c);
          if ((c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth) && f.overflow != "visible") {
            let u = c.getBoundingClientRect();
            s = Math.max(s, u.left), o = Math.min(o, u.right), l = Math.max(l, u.top), a = Math.min(h7 == n.parentNode ? r.innerHeight : a, u.bottom);
          }
          h7 = f.position == "absolute" || f.position == "fixed" ? c.offsetParent : c.parentNode;
        } else if (h7.nodeType == 11) h7 = h7.host;
        else break;
        return { left: s - t.left, right: Math.max(s, o) - t.left, top: l - (t.top + e), bottom: Math.max(l, a) - (t.top + e) };
      }
      function ap(n) {
        let e = n.getBoundingClientRect(), t = n.ownerDocument.defaultView || window;
        return e.left < t.innerWidth && e.right > 0 && e.top < t.innerHeight && e.bottom > 0;
      }
      function hp(n, e) {
        let t = n.getBoundingClientRect();
        return { left: 0, right: t.right - t.left, top: e, bottom: t.bottom - (t.top + e) };
      }
      var Ni = class {
        constructor(e, t, i, r) {
          this.from = e, this.to = t, this.size = i, this.displaySize = r;
        }
        static same(e, t) {
          if (e.length != t.length) return false;
          for (let i = 0; i < e.length; i++) {
            let r = e[i], s = t[i];
            if (r.from != s.from || r.to != s.to || r.size != s.size) return false;
          }
          return true;
        }
        draw(e, t) {
          return Y.replace({ widget: new to(this.displaySize * (t ? e.scaleY : e.scaleX), t) }).range(this.from, this.to);
        }
      }, to = class extends lt {
        constructor(e, t) {
          super(), this.size = e, this.vertical = t;
        }
        eq(e) {
          return e.size == this.size && e.vertical == this.vertical;
        }
        toDOM() {
          let e = document.createElement("div");
          return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e;
        }
        get estimatedHeight() {
          return this.vertical ? this.size : -1;
        }
      }, lr = class {
        constructor(e, t) {
          this.view = e, this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = true, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaleX = 1, this.scaleY = 1, this.scrollOffset = 0, this.scrolledToBottom = false, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = Ja, this.scrollTarget = null, this.printing = false, this.mustMeasureContent = true, this.defaultTextDirection = U.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = false;
          let i = t.facet(So).some((r) => typeof r != "function" && r.class == "cm-lineWrapping");
          this.heightOracle = new Fs(i), this.stateDeco = eh(t), this.heightMap = xe.empty().applyChanges(this.stateDeco, M.empty, this.heightOracle.setDoc(t.doc), [new ze(0, 0, 0, t.doc.length)]);
          for (let r = 0; r < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); r++) ;
          this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = Y.set(this.lineGaps.map((r) => r.draw(this, false))), this.scrollParent = e.scrollDOM, this.computeVisibleRanges();
        }
        updateForViewport() {
          let e = [this.viewport], { main: t } = this.state.selection;
          for (let i = 0; i <= 1; i++) {
            let r = i ? t.head : t.anchor;
            if (!e.some(({ from: s, to: o }) => r >= s && r <= o)) {
              let { from: s, to: o } = this.lineBlockAt(r);
              e.push(new ui(s, o));
            }
          }
          return this.viewports = e.sort((i, r) => i.from - r.from), this.updateScaler();
        }
        updateScaler() {
          let e = this.scaler;
          return this.scaler = this.heightMap.height <= 7e6 ? Ja : new io(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
        }
        updateViewportLines() {
          this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
            this.viewportLines.push(_i(e, this.scaler));
          });
        }
        update(e, t = null) {
          this.state = e.state;
          let i = this.stateDeco;
          this.stateDeco = eh(this.state);
          let r = e.changedRanges, s = ze.extendWithRanges(r, op(i, this.stateDeco, e ? e.changes : ae.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
          Ha(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), s), (this.heightMap.height != o || yi) && (e.flags |= 2), l ? (this.scrollAnchorPos = e.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = o);
          let a = s.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
          (t && (t.range.head < a.from || t.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, t));
          let h7 = a.from != this.viewport.from || a.to != this.viewport.to;
          this.viewport = a, e.flags |= this.updateForViewport(), (h7 || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(mO) && (this.mustEnforceCursorAssoc = true);
        }
        measure() {
          let { view: e } = this, t = e.contentDOM, i = window.getComputedStyle(t), r = this.heightOracle, s = i.whiteSpace;
          this.defaultTextDirection = i.direction == "rtl" ? U.RTL : U.LTR;
          let o = this.heightOracle.mustRefreshForWrapping(s) || this.mustMeasureContent === "refresh", l = t.getBoundingClientRect(), a = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
          this.contentDOMHeight = l.height, this.mustMeasureContent = false;
          let h7 = 0, c = 0;
          if (l.width && l.height) {
            let { scaleX: T, scaleY: Z } = ch(t, l);
            (T > 5e-3 && Math.abs(this.scaleX - T) > 5e-3 || Z > 5e-3 && Math.abs(this.scaleY - Z) > 5e-3) && (this.scaleX = T, this.scaleY = Z, h7 |= 16, o = a = true);
          }
          let f = (parseInt(i.paddingTop) || 0) * this.scaleY, u = (parseInt(i.paddingBottom) || 0) * this.scaleY;
          (this.paddingTop != f || this.paddingBottom != u) && (this.paddingTop = f, this.paddingBottom = u, h7 |= 18), this.editorWidth != e.scrollDOM.clientWidth && (r.lineWrapping && (a = true), this.editorWidth = e.scrollDOM.clientWidth, h7 |= 16);
          let d = fh(this.view.contentDOM, false).y;
          d != this.scrollParent && (this.scrollParent = d, this.scrollAnchorHeight = -1, this.scrollOffset = 0);
          let O = this.getScrollOffset();
          this.scrollOffset != O && (this.scrollAnchorHeight = -1, this.scrollOffset = O), this.scrolledToBottom = ph(this.scrollParent || e.win);
          let m = (this.printing ? hp : lp)(t, this.paddingTop), g = m.top - this.pixelViewport.top, S = m.bottom - this.pixelViewport.bottom;
          this.pixelViewport = m;
          let x = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
          if (x != this.inView && (this.inView = x, x && (a = true)), !this.inView && !this.scrollTarget && !ap(e.dom)) return 0;
          let y = l.width;
          if ((this.contentDOMWidth != y || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = e.scrollDOM.clientHeight, h7 |= 16), a) {
            let T = e.docView.measureVisibleLineHeights(this.viewport);
            if (r.mustRefreshForHeights(T) && (o = true), o || r.lineWrapping && Math.abs(y - this.contentDOMWidth) > r.charWidth) {
              let { lineHeight: Z, charWidth: P, textHeight: N } = e.docView.measureTextSize();
              o = Z > 0 && r.refresh(s, Z, P, N, Math.max(5, y / P), T), o && (e.docView.minWidth = 0, h7 |= 16);
            }
            g > 0 && S > 0 ? c = Math.max(g, S) : g < 0 && S < 0 && (c = Math.min(g, S)), Ha();
            for (let Z of this.viewports) {
              let P = Z.from == this.viewport.from ? T : e.docView.measureVisibleLineHeights(Z);
              this.heightMap = (o ? xe.empty().applyChanges(this.stateDeco, M.empty, this.heightOracle, [new ze(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(r, 0, o, new Hs(Z.from, P));
            }
            yi && (h7 |= 2);
          }
          let R = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
          return R && (h7 & 2 && (h7 |= this.updateScaler()), this.viewport = this.getViewport(c, this.scrollTarget), h7 |= this.updateForViewport()), (h7 & 2 || R) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, e)), h7 |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = false, e.docView.enforceCursorAssoc()), h7;
        }
        get visibleTop() {
          return this.scaler.fromDOM(this.pixelViewport.top);
        }
        get visibleBottom() {
          return this.scaler.fromDOM(this.pixelViewport.bottom);
        }
        getViewport(e, t) {
          let i = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), r = this.heightMap, s = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, a = new ui(r.lineAt(o - i * 1e3, I.ByHeight, s, 0, 0).from, r.lineAt(l + (1 - i) * 1e3, I.ByHeight, s, 0, 0).to);
          if (t) {
            let { head: h7 } = t.range;
            if (h7 < a.from || h7 > a.to) {
              let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = r.lineAt(h7, I.ByPos, s, 0, 0), u;
              t.y == "center" ? u = (f.top + f.bottom) / 2 - c / 2 : t.y == "start" || t.y == "nearest" && h7 < a.from ? u = f.top : u = f.bottom - c, a = new ui(r.lineAt(u - 1e3 / 2, I.ByHeight, s, 0, 0).from, r.lineAt(u + c + 1e3 / 2, I.ByHeight, s, 0, 0).to);
            }
          }
          return a;
        }
        mapViewport(e, t) {
          let i = t.mapPos(e.from, -1), r = t.mapPos(e.to, 1);
          return new ui(this.heightMap.lineAt(i, I.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(r, I.ByPos, this.heightOracle, 0, 0).to);
        }
        viewportIsAppropriate({ from: e, to: t }, i = 0) {
          if (!this.inView) return true;
          let { top: r } = this.heightMap.lineAt(e, I.ByPos, this.heightOracle, 0, 0), { bottom: s } = this.heightMap.lineAt(t, I.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
          return (e == 0 || r <= o - Math.max(10, Math.min(-i, 250))) && (t == this.state.doc.length || s >= l + Math.max(10, Math.min(i, 250))) && r > o - 2 * 1e3 && s < l + 2 * 1e3;
        }
        mapLineGaps(e, t) {
          if (!e.length || t.empty) return e;
          let i = [];
          for (let r of e) t.touchesRange(r.from, r.to) || i.push(new Ni(t.mapPos(r.from), t.mapPos(r.to), r.size, r.displaySize));
          return i;
        }
        ensureLineGaps(e, t) {
          let i = this.heightOracle.lineWrapping, r = i ? 1e4 : 2e3, s = r >> 1, o = r << 1;
          if (this.defaultTextDirection != U.LTR && !i) return [];
          let l = [], a = (c, f, u, d) => {
            if (f - c < s) return;
            let O = this.state.selection.main, m = [O.from];
            O.empty || m.push(O.to);
            for (let S of m) if (S > c && S < f) {
              a(c, S - 10, u, d), a(S + 10, f, u, d);
              return;
            }
            let g = fp(e, (S) => S.from >= u.from && S.to <= u.to && Math.abs(S.from - c) < s && Math.abs(S.to - f) < s && !m.some((x) => S.from < x && S.to > x));
            if (!g) {
              if (f < u.to && t && i && t.visibleRanges.some((y) => y.from <= f && y.to >= f)) {
                let y = t.moveToLineBoundary(b.cursor(f), false, true).head;
                y > c && (f = y);
              }
              let S = this.gapSize(u, c, f, d), x = i || S < 2e6 ? S : 2e6;
              g = new Ni(c, f, S, x);
            }
            l.push(g);
          }, h7 = (c) => {
            if (c.length < o || c.type != me.Text) return;
            let f = cp(c.from, c.to, this.stateDeco);
            if (f.total < o) return;
            let u = this.scrollTarget ? this.scrollTarget.range.head : null, d, O;
            if (i) {
              let m = r / this.heightOracle.lineLength * this.heightOracle.lineHeight, g, S;
              if (u != null) {
                let x = Dn(f, u), y = ((this.visibleBottom - this.visibleTop) / 2 + m) / c.height;
                g = x - y, S = x + y;
              } else g = (this.visibleTop - c.top - m) / c.height, S = (this.visibleBottom - c.top + m) / c.height;
              d = Wn(f, g), O = Wn(f, S);
            } else {
              let m = f.total * this.heightOracle.charWidth, g = r * this.heightOracle.charWidth, S = 0;
              if (m > 2e6) for (let Z of e) Z.from >= c.from && Z.from < c.to && Z.size != Z.displaySize && Z.from * this.heightOracle.charWidth + S < this.pixelViewport.left && (S = Z.size - Z.displaySize);
              let x = this.pixelViewport.left + S, y = this.pixelViewport.right + S, R, T;
              if (u != null) {
                let Z = Dn(f, u), P = ((y - x) / 2 + g) / m;
                R = Z - P, T = Z + P;
              } else R = (x - g) / m, T = (y + g) / m;
              d = Wn(f, R), O = Wn(f, T);
            }
            d > c.from && a(c.from, d, c, f), O < c.to && a(O, c.to, c, f);
          };
          for (let c of this.viewportLines) Array.isArray(c.type) ? c.type.forEach(h7) : h7(c);
          return l;
        }
        gapSize(e, t, i, r) {
          let s = Dn(r, i) - Dn(r, t);
          return this.heightOracle.lineWrapping ? e.height * s : r.total * this.heightOracle.charWidth * s;
        }
        updateLineGaps(e) {
          Ni.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = Y.set(e.map((t) => t.draw(this, this.heightOracle.lineWrapping))));
        }
        computeVisibleRanges(e) {
          let t = this.stateDeco;
          this.lineGaps.length && (t = t.concat(this.lineGapDeco));
          let i = [];
          _.spans(t, this.viewport.from, this.viewport.to, { span(s, o) {
            i.push({ from: s, to: o });
          }, point() {
          } }, 20);
          let r = 0;
          if (i.length != this.visibleRanges.length) r = 12;
          else for (let s = 0; s < i.length && !(r & 8); s++) {
            let o = this.visibleRanges[s], l = i[s];
            (o.from != l.from || o.to != l.to) && (r |= 4, e && e.mapPos(o.from, -1) == l.from && e.mapPos(o.to, 1) == l.to || (r |= 8));
          }
          return this.visibleRanges = i, r;
        }
        lineBlockAt(e) {
          return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || _i(this.heightMap.lineAt(e, I.ByPos, this.heightOracle, 0, 0), this.scaler);
        }
        lineBlockAtHeight(e) {
          return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || _i(this.heightMap.lineAt(this.scaler.fromDOM(e), I.ByHeight, this.heightOracle, 0, 0), this.scaler);
        }
        getScrollOffset() {
          return (this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top) * this.scaleY;
        }
        scrollAnchorAt(e) {
          let t = this.lineBlockAtHeight(e + 8);
          return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
        }
        elementAtHeight(e) {
          return _i(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
        }
        get docHeight() {
          return this.scaler.toDOM(this.heightMap.height);
        }
        get contentHeight() {
          return this.docHeight + this.paddingTop + this.paddingBottom;
        }
      }, ui = class {
        constructor(e, t) {
          this.from = e, this.to = t;
        }
      };
      function cp(n, e, t) {
        let i = [], r = n, s = 0;
        return _.spans(t, n, e, { span() {
        }, point(o, l) {
          o > r && (i.push({ from: r, to: o }), s += o - r), r = l;
        } }, 20), r < e && (i.push({ from: r, to: e }), s += e - r), { total: s, ranges: i };
      }
      function Wn({ total: n, ranges: e }, t) {
        if (t <= 0) return e[0].from;
        if (t >= 1) return e[e.length - 1].to;
        let i = Math.floor(n * t);
        for (let r = 0; ; r++) {
          let { from: s, to: o } = e[r], l = o - s;
          if (i <= l) return s + i;
          i -= l;
        }
      }
      function Dn(n, e) {
        let t = 0;
        for (let { from: i, to: r } of n.ranges) {
          if (e <= r) {
            t += e - i;
            break;
          }
          t += r - i;
        }
        return t / n.total;
      }
      function fp(n, e) {
        for (let t of n) if (e(t)) return t;
      }
      var Ja = { toDOM(n) {
        return n;
      }, fromDOM(n) {
        return n;
      }, scale: 1, eq(n) {
        return n == this;
      } };
      function eh(n) {
        let e = n.facet(ur).filter((i) => typeof i != "function"), t = n.facet(bo).filter((i) => typeof i != "function");
        return t.length && e.push(_.join(t)), e;
      }
      var io = class n {
        constructor(e, t, i) {
          let r = 0, s = 0, o = 0;
          this.viewports = i.map(({ from: l, to: a }) => {
            let h7 = t.lineAt(l, I.ByPos, e, 0, 0).top, c = t.lineAt(a, I.ByPos, e, 0, 0).bottom;
            return r += c - h7, { from: l, to: a, top: h7, bottom: c, domTop: 0, domBottom: 0 };
          }), this.scale = (7e6 - r) / (t.height - r);
          for (let l of this.viewports) l.domTop = o + (l.top - s) * this.scale, o = l.domBottom = l.domTop + (l.bottom - l.top), s = l.bottom;
        }
        toDOM(e) {
          for (let t = 0, i = 0, r = 0; ; t++) {
            let s = t < this.viewports.length ? this.viewports[t] : null;
            if (!s || e < s.top) return r + (e - i) * this.scale;
            if (e <= s.bottom) return s.domTop + (e - s.top);
            i = s.bottom, r = s.domBottom;
          }
        }
        fromDOM(e) {
          for (let t = 0, i = 0, r = 0; ; t++) {
            let s = t < this.viewports.length ? this.viewports[t] : null;
            if (!s || e < s.domTop) return i + (e - r) / this.scale;
            if (e <= s.domBottom) return s.top + (e - s.domTop);
            i = s.bottom, r = s.domBottom;
          }
        }
        eq(e) {
          return e instanceof n ? this.scale == e.scale && this.viewports.length == e.viewports.length && this.viewports.every((t, i) => t.from == e.viewports[i].from && t.to == e.viewports[i].to) : false;
        }
      };
      function _i(n, e) {
        if (e.scale == 1) return n;
        let t = e.toDOM(n.top), i = e.toDOM(n.bottom);
        return new je(n.from, n.length, t, i - t, Array.isArray(n._content) ? n._content.map((r) => _i(r, e)) : n._content);
      }
      var Bn = $.define({ combine: (n) => n.join(" ") }), no = $.define({ combine: (n) => n.indexOf(true) > -1 }), ro = Ce.newName(), Hh = Ce.newName(), Kh = Ce.newName(), Jh = { "&light": "." + Hh, "&dark": "." + Kh };
      function so(n, e, t) {
        return new Ce(e, { finish(i) {
          return /&/.test(i) ? i.replace(/&\w*/, (r) => {
            if (r == "&") return n;
            if (!t || !t[r]) throw new RangeError(`Unsupported selector: ${r}`);
            return t[r];
          }) : n + " " + i;
        } });
      }
      var up = so("." + ro, { "&": { position: "relative !important", boxSizing: "border-box", "&.cm-focused": { outline: "1px dotted #212121" }, display: "flex !important", flexDirection: "column" }, ".cm-scroller": { display: "flex !important", alignItems: "flex-start !important", fontFamily: "monospace", lineHeight: 1.4, height: "100%", overflowX: "auto", position: "relative", zIndex: 0, overflowAnchor: "none" }, ".cm-content": { margin: 0, flexGrow: 2, flexShrink: 0, display: "block", whiteSpace: "pre", wordWrap: "normal", boxSizing: "border-box", minHeight: "100%", padding: "4px 0", outline: "none", "&[contenteditable=true]": { WebkitUserModify: "read-write-plaintext-only" } }, ".cm-lineWrapping": { whiteSpace_fallback: "pre-wrap", whiteSpace: "break-spaces", wordBreak: "break-word", overflowWrap: "anywhere", flexShrink: 1 }, "&light .cm-content": { caretColor: "black" }, "&dark .cm-content": { caretColor: "white" }, ".cm-line": { display: "block", padding: "0 2px 0 6px" }, ".cm-layer": { userSelect: "none", position: "absolute", left: 0, top: 0, contain: "size style", "& > *": { position: "absolute" } }, "&light .cm-selectionBackground": { background: "#d9d9d9" }, "&dark .cm-selectionBackground": { background: "#222" }, "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": { background: "#d7d4f0" }, "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": { background: "#233" }, ".cm-cursorLayer": { pointerEvents: "none" }, "&.cm-focused > .cm-scroller > .cm-cursorLayer": { animation: "steps(1) cm-blink 1.2s infinite" }, "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} }, "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} }, ".cm-cursor, .cm-dropCursor": { borderLeft: "1.2px solid black", marginLeft: "-0.6px", pointerEvents: "none" }, ".cm-cursor": { display: "none" }, "&dark .cm-cursor": { borderLeftColor: "#ddd" }, ".cm-selectionHandle": { backgroundColor: "currentColor", width: "1.5px" }, ".cm-selectionHandle-start::before, .cm-selectionHandle-end::before": { content: '""', backgroundColor: "inherit", borderRadius: "50%", width: "8px", height: "8px", position: "absolute", left: "-3.25px" }, ".cm-selectionHandle-start::before": { top: "-8px" }, ".cm-selectionHandle-end::before": { bottom: "-8px" }, ".cm-dropCursor": { position: "absolute" }, "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": { display: "block" }, ".cm-iso": { unicodeBidi: "isolate" }, ".cm-announced": { position: "fixed", top: "-10000px" }, "@media print": { ".cm-announced": { display: "none" } }, "&light .cm-activeLine": { backgroundColor: "#cceeff44" }, "&dark .cm-activeLine": { backgroundColor: "#99eeff33" }, "&light .cm-specialChar": { color: "red" }, "&dark .cm-specialChar": { color: "#f78" }, ".cm-gutters": { flexShrink: 0, display: "flex", height: "100%", boxSizing: "border-box", zIndex: 200 }, ".cm-gutters-before": { insetInlineStart: 0 }, ".cm-gutters-after": { insetInlineEnd: 0 }, "&light .cm-gutters": { backgroundColor: "#f5f5f5", color: "#6c6c6c", border: "0px solid #ddd", "&.cm-gutters-before": { borderRightWidth: "1px" }, "&.cm-gutters-after": { borderLeftWidth: "1px" } }, "&dark .cm-gutters": { backgroundColor: "#333338", color: "#ccc" }, ".cm-gutter": { display: "flex !important", flexDirection: "column", flexShrink: 0, boxSizing: "border-box", minHeight: "100%", overflow: "hidden" }, ".cm-gutterElement": { boxSizing: "border-box" }, ".cm-lineNumbers .cm-gutterElement": { padding: "0 3px 0 5px", minWidth: "20px", textAlign: "right", whiteSpace: "nowrap" }, "&light .cm-activeLineGutter": { backgroundColor: "#e2f2ff" }, "&dark .cm-activeLineGutter": { backgroundColor: "#222227" }, ".cm-panels": { boxSizing: "border-box", position: "sticky", left: 0, right: 0, zIndex: 300 }, "&light .cm-panels": { backgroundColor: "#f5f5f5", color: "black" }, ".cm-panels-top": { top: "0" }, ".cm-panels-bottom": { bottom: "0" }, "&light .cm-panels-top": { borderBottom: "1px solid #ddd" }, "&light .cm-panels-bottom": { borderTop: "1px solid #ddd" }, "&dark .cm-panels": { backgroundColor: "#333338", color: "white" }, ".cm-dialog": { padding: "2px 19px 4px 6px", position: "relative", "& label": { fontSize: "80%" } }, ".cm-dialog-close": { position: "absolute", top: "3px", right: "4px", backgroundColor: "inherit", border: "none", font: "inherit", fontSize: "14px", padding: "0" }, ".cm-tab": { display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }, ".cm-widgetBuffer": { verticalAlign: "text-top", height: "1em", width: 0, display: "inline" }, ".cm-placeholder": { color: "#888", display: "inline-block", verticalAlign: "top", userSelect: "none" }, ".cm-highlightSpace": { backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)", backgroundPosition: "center" }, ".cm-highlightTab": { backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`, backgroundSize: "auto 100%", backgroundPosition: "right 90%", backgroundRepeat: "no-repeat" }, ".cm-trailingSpace": { backgroundColor: "#ff332255" }, ".cm-button": { verticalAlign: "middle", color: "inherit", fontSize: "70%", padding: ".2em 1em", borderRadius: "1px" }, "&light .cm-button": { backgroundImage: "linear-gradient(#eff1f5, #d9d9df)", border: "1px solid #888", "&:active": { backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)" } }, "&dark .cm-button": { backgroundImage: "linear-gradient(#393939, #111)", border: "1px solid #888", "&:active": { backgroundImage: "linear-gradient(#111, #333)" } }, ".cm-textfield": { verticalAlign: "middle", color: "inherit", fontSize: "70%", border: "1px solid silver", padding: ".2em .5em" }, "&light .cm-textfield": { backgroundColor: "white" }, "&dark .cm-textfield": { border: "1px solid #555", backgroundColor: "inherit" } }, Jh), dp = { childList: true, characterData: true, subtree: true, attributes: true, characterDataOldValue: true }, ks = w.ie && w.ie_version <= 11, oo = class {
        constructor(e) {
          this.view = e, this.active = false, this.editContext = null, this.selectionRange = new Zs(), this.selectionChanged = false, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = false, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
            for (let i of t) this.queue.push(i);
            (w.ie && w.ie_version <= 11 || w.ios && e.composing) && t.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
          }), window.EditContext && w.android && e.constructor.EDIT_CONTEXT !== false && !(w.chrome && w.chrome_version < 126) && (this.editContext = new lo(e), e.state.facet(st) && (e.contentDOM.editContext = this.editContext.editContext)), ks && (this.onCharData = (t) => {
            this.queue.push({ target: t.target, type: "characterData", oldValue: t.prevValue }), this.flushSoon();
          }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
            var t;
            ((t = this.view.docView) === null || t === void 0 ? void 0 : t.lastUpdate) < Date.now() - 75 && this.onResize();
          }), this.resizeScroll.observe(e.scrollDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((t) => {
            this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), t.length > 0 && t[t.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
          }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((t) => {
            t.length > 0 && t[t.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
          }, {})), this.listenForScroll(), this.readSelectionRange();
        }
        onScrollChanged(e) {
          this.view.inputState.runHandlers("scroll", e), this.intersecting && this.view.measure();
        }
        onScroll(e) {
          this.intersecting && this.flush(false), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(e);
        }
        onResize() {
          this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
            this.resizeTimeout = -1, this.view.requestMeasure();
          }, 50));
        }
        onPrint(e) {
          (e.type == "change" || !e.type) && !e.matches || (this.view.viewState.printing = true, this.view.measure(), setTimeout(() => {
            this.view.viewState.printing = false, this.view.requestMeasure();
          }, 500));
        }
        updateGaps(e) {
          if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, i) => t != e[i]))) {
            this.gapIntersection.disconnect();
            for (let t of e) this.gapIntersection.observe(t);
            this.gaps = e;
          }
        }
        onSelectionChange(e) {
          let t = this.selectionChanged;
          if (!this.readSelectionRange() || this.delayedAndroidKey) return;
          let { view: i } = this, r = this.selectionRange;
          if (i.state.facet(st) ? i.root.activeElement != this.dom : !Vi(this.dom, r)) return;
          let s = r.anchorNode && i.docView.tile.nearest(r.anchorNode);
          if (s && s.isWidget() && s.widget.ignoreEvent(e)) {
            t || (this.selectionChanged = false);
            return;
          }
          (w.ie && w.ie_version <= 11 || w.android && w.chrome) && !i.state.selection.main.empty && r.focusNode && Wi(r.focusNode, r.focusOffset, r.anchorNode, r.anchorOffset) ? this.flushSoon() : this.flush(false);
        }
        readSelectionRange() {
          let { view: e } = this, t = Hi(e.root);
          if (!t) return false;
          let i = w.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && Op(this.view, t) || t;
          if (!i || this.selectionRange.eq(i)) return false;
          let r = Vi(this.dom, i);
          return r && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && oO(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), false) : (this.selectionRange.setRange(i), r && (this.selectionChanged = true), true);
        }
        setSelectionRange(e, t) {
          this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = false;
        }
        clearSelectionRange() {
          this.selectionRange.set(null, 0, null, 0);
        }
        listenForScroll() {
          this.parentCheck = -1;
          let e = 0, t = null;
          for (let i = this.dom; i; ) if (i.nodeType == 1) !t && e < this.scrollTargets.length && this.scrollTargets[e] == i ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(i), i = i.assignedSlot || i.parentNode;
          else if (i.nodeType == 11) i = i.host;
          else break;
          if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
            for (let i of this.scrollTargets) i.removeEventListener("scroll", this.onScroll);
            for (let i of this.scrollTargets = t) i.addEventListener("scroll", this.onScroll);
          }
        }
        ignore(e) {
          if (!this.active) return e();
          try {
            return this.stop(), e();
          } finally {
            this.start(), this.clear();
          }
        }
        start() {
          this.active || (this.observer.observe(this.dom, dp), ks && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = true);
        }
        stop() {
          this.active && (this.active = false, this.observer.disconnect(), ks && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
        }
        clear() {
          this.processRecords(), this.queue.length = 0, this.selectionChanged = false;
        }
        delayAndroidKey(e, t) {
          var i;
          if (!this.delayedAndroidKey) {
            let r = () => {
              let s = this.delayedAndroidKey;
              s && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = s.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && s.force && pi(this.dom, s.key, s.keyCode));
            };
            this.flushingAndroidKey = this.view.win.requestAnimationFrame(r);
          }
          (!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = { key: e, keyCode: t, force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force) });
        }
        clearDelayedAndroidKey() {
          this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
        }
        flushSoon() {
          this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
            this.delayedFlush = -1, this.flush();
          }));
        }
        forceFlush() {
          this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
        }
        pendingRecords() {
          for (let e of this.observer.takeRecords()) this.queue.push(e);
          return this.queue;
        }
        processRecords() {
          let e = this.pendingRecords();
          e.length && (this.queue = []);
          let t = -1, i = -1, r = false;
          for (let s of e) {
            let o = this.readMutation(s);
            o && (o.typeOver && (r = true), t == -1 ? { from: t, to: i } = o : (t = Math.min(o.from, t), i = Math.max(o.to, i)));
          }
          return { from: t, to: i, typeOver: r };
        }
        readChange() {
          let { from: e, to: t, typeOver: i } = this.processRecords(), r = this.selectionChanged && Vi(this.dom, this.selectionRange);
          if (e < 0 && !r) return null;
          e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = false;
          let s = new Is(this.view, e, t, i);
          return this.view.docView.domChanged = { newSel: s.newSel ? s.newSel.main : null }, s;
        }
        flush(e = true) {
          if (this.delayedFlush >= 0 || this.delayedAndroidKey) return false;
          e && this.readSelectionRange();
          let t = this.readChange();
          if (!t) return this.view.requestMeasure(), false;
          let i = this.view.state, r = Vh(this.view, t);
          return this.view.state == i && (t.domChanged || t.newSel && !rr(this.view.state.selection, t.newSel.main)) && this.view.update([]), r;
        }
        readMutation(e) {
          let t = this.view.docView.tile.nearest(e.target);
          if (!t || t.isWidget()) return null;
          if (t.markDirty(e.type == "attributes"), e.type == "childList") {
            let i = th(t, e.previousSibling || e.target.previousSibling, -1), r = th(t, e.nextSibling || e.target.nextSibling, 1);
            return { from: i ? t.posAfter(i) : t.posAtStart, to: r ? t.posBefore(r) : t.posAtEnd, typeOver: false };
          } else return e.type == "characterData" ? { from: t.posAtStart, to: t.posAtEnd, typeOver: e.target.nodeValue == e.oldValue } : null;
        }
        setWindow(e) {
          e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win));
        }
        addWindowListeners(e) {
          e.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange);
        }
        removeWindowListeners(e) {
          e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange);
        }
        update(e) {
          this.editContext && (this.editContext.update(e), e.startState.facet(st) != e.state.facet(st) && (e.view.contentDOM.editContext = e.state.facet(st) ? this.editContext.editContext : null));
        }
        destroy() {
          var e, t, i;
          this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
          for (let r of this.scrollTargets) r.removeEventListener("scroll", this.onScroll);
          this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
        }
      };
      function th(n, e, t) {
        for (; e; ) {
          let i = F.get(e);
          if (i && i.parent == n) return i;
          let r = e.parentNode;
          e = r != n.dom ? r : t > 0 ? e.nextSibling : e.previousSibling;
        }
        return null;
      }
      function ih(n, e) {
        let t = e.startContainer, i = e.startOffset, r = e.endContainer, s = e.endOffset, o = n.docView.domAtPos(n.state.selection.main.anchor, 1);
        return Wi(o.node, o.offset, r, s) && ([t, i, r, s] = [r, s, t, i]), { anchorNode: t, anchorOffset: i, focusNode: r, focusOffset: s };
      }
      function Op(n, e) {
        if (e.getComposedRanges) {
          let r = e.getComposedRanges(n.root)[0];
          if (r) return ih(n, r);
        }
        let t = null;
        function i(r) {
          r.preventDefault(), r.stopImmediatePropagation(), t = r.getTargetRanges()[0];
        }
        return n.contentDOM.addEventListener("beforeinput", i, true), n.dom.ownerDocument.execCommand("indent"), n.contentDOM.removeEventListener("beforeinput", i, true), t ? ih(n, t) : null;
      }
      var lo = class {
        constructor(e) {
          this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(e.state);
          let t = this.editContext = new window.EditContext({ text: e.state.doc.sliceString(this.from, this.to), selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))), selectionEnd: this.toContextPos(e.state.selection.main.head) });
          this.handlers.textupdate = (i) => {
            let r = e.state.selection.main, { anchor: s, head: o } = r, l = this.toEditorPos(i.updateRangeStart), a = this.toEditorPos(i.updateRangeEnd);
            e.inputState.composing >= 0 && !this.composing && (this.composing = { contextBase: i.updateRangeStart, editorBase: l, drifted: false });
            let h7 = a - l > i.text.length;
            l == this.from && s < this.from ? l = s : a == this.to && s > this.to && (a = s);
            let c = Wh(e.state.sliceDoc(l, a), i.text, (h7 ? r.from : r.to) - l, h7 ? "end" : null);
            if (!c) {
              let u = b.single(this.toEditorPos(i.selectionStart), this.toEditorPos(i.selectionEnd));
              rr(u, r) || e.dispatch({ selection: u, userEvent: "select" });
              return;
            }
            let f = { from: c.from + l, to: c.toA + l, insert: M.of(i.text.slice(c.from, c.toB).split(`
`)) };
            if ((w.mac || w.android) && f.from == o - 1 && /^\. ?$/.test(i.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (f = { from: l, to: a, insert: M.of([i.text.replace(".", " ")]) }), this.pendingContextChange = f, !e.state.readOnly) {
              let u = this.to - this.from + (f.to - f.from + f.insert.length);
              yo(e, f, b.single(this.toEditorPos(i.selectionStart, u), this.toEditorPos(i.selectionEnd, u)));
            }
            this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state)), f.from < f.to && !f.insert.length && e.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0, i.updateRangeStart - 1), Math.min(t.text.length, i.updateRangeStart + 1))) && this.handlers.compositionend(i);
          }, this.handlers.characterboundsupdate = (i) => {
            let r = [], s = null;
            for (let o = this.toEditorPos(i.rangeStart), l = this.toEditorPos(i.rangeEnd); o < l; o++) {
              let a = e.coordsForChar(o);
              s = a && new DOMRect(a.left, a.top, a.right - a.left, a.bottom - a.top) || s || new DOMRect(), r.push(s);
            }
            t.updateCharacterBounds(i.rangeStart, r);
          }, this.handlers.textformatupdate = (i) => {
            let r = [];
            for (let s of i.getTextFormats()) {
              let o = s.underlineStyle, l = s.underlineThickness;
              if (!/none/i.test(o) && !/none/i.test(l)) {
                let a = this.toEditorPos(s.rangeStart), h7 = this.toEditorPos(s.rangeEnd);
                if (a < h7) {
                  let c = `text-decoration: underline ${/^[a-z]/.test(o) ? o + " " : o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${/thin/i.test(l) ? 1 : 2}px`;
                  r.push(Y.mark({ attributes: { style: c } }).range(a, h7));
                }
              }
            }
            e.dispatch({ effects: Ah.of(Y.set(r)) });
          }, this.handlers.compositionstart = () => {
            e.inputState.composing < 0 && (e.inputState.composing = 0, e.inputState.compositionFirstChange = true);
          }, this.handlers.compositionend = () => {
            if (e.inputState.composing = -1, e.inputState.compositionFirstChange = null, this.composing) {
              let { drifted: i } = this.composing;
              this.composing = null, i && this.reset(e.state);
            }
          };
          for (let i in this.handlers) t.addEventListener(i, this.handlers[i]);
          this.measureReq = { read: (i) => {
            let r = Hi(i.root);
            r && r.rangeCount && this.editContext.updateSelectionBounds(r.getRangeAt(0).getBoundingClientRect());
          } };
        }
        applyEdits(e) {
          let t = 0, i = false, r = this.pendingContextChange;
          return e.changes.iterChanges((s, o, l, a, h7) => {
            if (i) return;
            let c = h7.length - (o - s);
            if (r && o >= r.to) if (r.from == s && r.to == o && r.insert.eq(h7)) {
              r = this.pendingContextChange = null, t += c, this.to += c;
              return;
            } else r = null, this.revertPending(e.state);
            if (s += t, o += t, o <= this.from) this.from += c, this.to += c;
            else if (s < this.to) {
              if (s < this.from || o > this.to || this.to - this.from + h7.length > 3e4) {
                i = true;
                return;
              }
              this.editContext.updateText(this.toContextPos(s), this.toContextPos(o), h7.toString()), this.to += c;
            }
            t += c;
          }), r && !i && this.revertPending(e.state), !i;
        }
        update(e) {
          let t = this.pendingContextChange, i = e.startState.selection.main;
          this.composing && (this.composing.drifted || !e.changes.touchesRange(i.from, i.to) && e.transactions.some((r) => !r.isUserEvent("input.type") && r.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = true, this.composing.editorBase = e.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(e) || !this.rangeIsValid(e.state) ? (this.pendingContextChange = null, this.reset(e.state)) : (e.docChanged || e.selectionSet || t) && this.setSelection(e.state), (e.geometryChanged || e.docChanged || e.selectionSet) && e.view.requestMeasure(this.measureReq);
        }
        resetRange(e) {
          let { head: t } = e.selection.main;
          this.from = Math.max(0, t - 1e4), this.to = Math.min(e.doc.length, t + 1e4);
        }
        reset(e) {
          this.resetRange(e), this.editContext.updateText(0, this.editContext.text.length, e.doc.sliceString(this.from, this.to)), this.setSelection(e);
        }
        revertPending(e) {
          let t = this.pendingContextChange;
          this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(t.from), this.toContextPos(t.from + t.insert.length), e.doc.sliceString(t.from, t.to));
        }
        setSelection(e) {
          let { main: t } = e.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, t.anchor))), r = this.toContextPos(t.head);
          (this.editContext.selectionStart != i || this.editContext.selectionEnd != r) && this.editContext.updateSelection(i, r);
        }
        rangeIsValid(e) {
          let { head: t } = e.selection.main;
          return !(this.from > 0 && t - this.from < 500 || this.to < e.doc.length && this.to - t < 500 || this.to - this.from > 1e4 * 3);
        }
        toEditorPos(e, t = this.to - this.from) {
          e = Math.min(e, t);
          let i = this.composing;
          return i && i.drifted ? i.editorBase + (e - i.contextBase) : e + this.from;
        }
        toContextPos(e) {
          let t = this.composing;
          return t && t.drifted ? t.contextBase + (e - t.editorBase) : e - this.from;
        }
        destroy() {
          for (let e in this.handlers) this.editContext.removeEventListener(e, this.handlers[e]);
        }
      }, C = class n {
        get state() {
          return this.viewState.state;
        }
        get viewport() {
          return this.viewState.viewport;
        }
        get visibleRanges() {
          return this.viewState.visibleRanges;
        }
        get inView() {
          return this.viewState.inView;
        }
        get composing() {
          return !!this.inputState && this.inputState.composing > 0;
        }
        get compositionStarted() {
          return !!this.inputState && this.inputState.composing >= 0;
        }
        get root() {
          return this._root;
        }
        get win() {
          return this.dom.ownerDocument.defaultView || window;
        }
        constructor(e = {}) {
          var t;
          this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = false, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), e.parent && e.parent.appendChild(this.dom);
          let { dispatch: i } = e;
          this.dispatchTransactions = e.dispatchTransactions || i && ((r) => r.forEach((s) => i(s, this))) || ((r) => this.update(r)), this.dispatch = this.dispatch.bind(this), this._root = e.root || sO(e.parent) || document, this.viewState = new lr(this, e.state || D.create(e)), e.scrollTo && e.scrollTo.is(Yn) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(fi).map((r) => new Bi(r));
          for (let r of this.plugins) r.update(this);
          this.observer = new oo(this), this.inputState = new Ns(this), this.inputState.ensureHandlers(this.plugins), this.docView = new ir(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((t = document.fonts) === null || t === void 0) && t.ready && document.fonts.ready.then(() => {
            this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
          });
        }
        dispatch(...e) {
          let t = e.length == 1 && e[0] instanceof ee ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
          this.dispatchTransactions(t, this);
        }
        update(e) {
          if (this.updateState != 0) throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
          let t = false, i = false, r, s = this.state;
          for (let u of e) {
            if (u.startState != s) throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
            s = u.state;
          }
          if (this.destroyed) {
            this.viewState.state = s;
            return;
          }
          let o = this.hasFocus, l = 0, a = null;
          e.some((u) => u.annotation(Gh)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, a = Uh(s, o), a || (l = 1));
          let h7 = this.observer.delayedAndroidKey, c = null;
          if (h7 ? (this.observer.clearDelayedAndroidKey(), c = this.observer.readChange(), (c && !this.state.doc.eq(s.doc) || !this.state.selection.eq(s.selection)) && (c = null)) : this.observer.clear(), s.facet(D.phrases) != this.state.facet(D.phrases)) return this.setState(s);
          r = er.create(this, s, e), r.flags |= l;
          let f = this.viewState.scrollTarget;
          try {
            this.updateState = 2;
            for (let u of e) {
              if (f && (f = f.map(u.changes)), u.scrollIntoView) {
                let { main: d } = u.state.selection, { x: O, y: m } = this.state.facet(n.cursorScrollMargin);
                f = new Di(d.empty ? d : b.cursor(d.head, d.head > d.anchor ? -1 : 1), "nearest", "nearest", m, O);
              }
              for (let d of u.effects) d.is(Yn) && (f = d.value.clip(this.state));
            }
            this.viewState.update(r, f), this.bidiCache = ar.update(this.bidiCache, r.changes), r.empty || (this.updatePlugins(r), this.inputState.update(r)), t = this.docView.update(r), this.state.facet(Yi) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((u) => u.isUserEvent("select.pointer")));
          } finally {
            this.updateState = 0;
          }
          if (r.startState.facet(Bn) != r.state.facet(Bn) && (this.viewState.mustMeasureContent = true), (t || i || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), t && this.docViewUpdate(), !r.empty) for (let u of this.state.facet(Ms)) try {
            u(r);
          } catch (d) {
            Re(this.state, d, "update listener");
          }
          (a || c) && Promise.resolve().then(() => {
            a && this.state == a.startState && this.dispatch(a), c && !Vh(this, c) && h7.force && pi(this.contentDOM, h7.key, h7.keyCode);
          });
        }
        setState(e) {
          if (this.updateState != 0) throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
          if (this.destroyed) {
            this.viewState.state = e;
            return;
          }
          this.updateState = 2;
          let t = this.hasFocus;
          try {
            for (let i of this.plugins) i.destroy(this);
            this.viewState = new lr(this, e), this.plugins = e.facet(fi).map((i) => new Bi(i)), this.pluginMap.clear();
            for (let i of this.plugins) i.update(this);
            this.docView.destroy(), this.docView = new ir(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
          } finally {
            this.updateState = 0;
          }
          t && this.focus(), this.requestMeasure();
        }
        updatePlugins(e) {
          let t = e.startState.facet(fi), i = e.state.facet(fi);
          if (t != i) {
            let r = [];
            for (let s of i) {
              let o = t.indexOf(s);
              if (o < 0) r.push(new Bi(s));
              else {
                let l = this.plugins[o];
                l.mustUpdate = e, r.push(l);
              }
            }
            for (let s of this.plugins) s.mustUpdate != e && s.destroy(this);
            this.plugins = r, this.pluginMap.clear();
          } else for (let r of this.plugins) r.mustUpdate = e;
          for (let r = 0; r < this.plugins.length; r++) this.plugins[r].update(this);
          t != i && this.inputState.ensureHandlers(this.plugins);
        }
        docViewUpdate() {
          for (let e of this.plugins) {
            let t = e.value;
            if (t && t.docViewUpdate) try {
              t.docViewUpdate(this);
            } catch (i) {
              Re(this.state, i, "doc view update listener");
            }
          }
        }
        measure(e = true) {
          if (this.destroyed) return;
          if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
            this.measureScheduled = -1, this.requestMeasure();
            return;
          }
          this.measureScheduled = 0, e && this.observer.forceFlush();
          let t = null, i = this.viewState.scrollParent, r = this.viewState.getScrollOffset(), { scrollAnchorPos: s, scrollAnchorHeight: o } = this.viewState;
          Math.abs(r - this.viewState.scrollOffset) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
          try {
            for (let l = 0; ; l++) {
              if (o < 0) if (ph(i || this.win)) s = -1, o = this.viewState.heightMap.height;
              else {
                let d = this.viewState.scrollAnchorAt(r);
                s = d.from, o = d.top;
              }
              this.updateState = 1;
              let a = this.viewState.measure();
              if (!a && !this.measureRequests.length && this.viewState.scrollTarget == null) break;
              if (l > 5) {
                console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
                break;
              }
              let h7 = [];
              a & 4 || ([this.measureRequests, h7] = [h7, this.measureRequests]);
              let c = h7.map((d) => {
                try {
                  return d.read(this);
                } catch (O) {
                  return Re(this.state, O), nh;
                }
              }), f = er.create(this, this.state, []), u = false;
              f.flags |= a, t ? t.flags |= a : t = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), u = this.docView.update(f), u && this.docViewUpdate());
              for (let d = 0; d < h7.length; d++) if (c[d] != nh) try {
                let O = h7[d];
                O.write && O.write(c[d], this);
              } catch (O) {
                Re(this.state, O);
              }
              if (u && this.docView.updateSelection(true), !f.viewportChanged && this.measureRequests.length == 0) {
                if (this.viewState.editorHeight) if (this.viewState.scrollTarget) {
                  this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
                  continue;
                } else {
                  let O = ((s < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(s).top) - o) / this.scaleY;
                  if ((O > 1 || O < -1) && !(w.ios && this.inputState.lastIOSMomentumScroll > Date.now() - 100) && (i == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
                    r = r + O, i ? s < 0 ? i.scrollTop = i.scrollHeight : i.scrollTop += O : this.win.scrollBy(0, O), o = -1;
                    continue;
                  }
                }
                break;
              }
            }
          } finally {
            this.updateState = 0, this.measureScheduled = -1;
          }
          if (t && !t.empty) for (let l of this.state.facet(Ms)) l(t);
        }
        get themeClasses() {
          return ro + " " + (this.state.facet(no) ? Kh : Hh) + " " + this.state.facet(Bn);
        }
        updateAttrs() {
          let e = rh(this, Xh, { class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses }), t = { spellcheck: "false", autocorrect: "off", autocapitalize: "off", writingsuggestions: "false", translate: "no", contenteditable: this.state.facet(st) ? "true" : "false", class: "cm-content", style: `${w.tabSize}: ${this.state.tabSize}`, role: "textbox", "aria-multiline": "true" };
          this.state.readOnly && (t["aria-readonly"] = "true"), rh(this, So, t);
          let i = this.observer.ignore(() => {
            let r = Ea(this.contentDOM, this.contentAttrs, t), s = Ea(this.dom, this.editorAttrs, e);
            return r || s;
          });
          return this.editorAttrs = e, this.contentAttrs = t, i;
        }
        showAnnouncements(e) {
          let t = true;
          for (let i of e) for (let r of i.effects) if (r.is(n.announce)) {
            t && (this.announceDOM.textContent = ""), t = false;
            let s = this.announceDOM.appendChild(document.createElement("div"));
            s.textContent = r.value;
          }
        }
        mountStyles() {
          this.styleModules = this.state.facet(Yi);
          let e = this.state.facet(n.cspNonce);
          Ce.mount(this.root, this.styleModules.concat(up).reverse(), e ? { nonce: e } : void 0);
        }
        readMeasured() {
          if (this.updateState == 2) throw new Error("Reading the editor layout isn't allowed during an update");
          this.updateState == 0 && this.measureScheduled > -1 && this.measure(false);
        }
        requestMeasure(e) {
          if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
            if (this.measureRequests.indexOf(e) > -1) return;
            if (e.key != null) {
              for (let t = 0; t < this.measureRequests.length; t++) if (this.measureRequests[t].key === e.key) {
                this.measureRequests[t] = e;
                return;
              }
            }
            this.measureRequests.push(e);
          }
        }
        plugin(e) {
          let t = this.pluginMap.get(e);
          return (t === void 0 || t && t.plugin != e) && this.pluginMap.set(e, t = this.plugins.find((i) => i.plugin == e) || null), t && t.update(this).value;
        }
        get documentTop() {
          return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
        }
        get documentPadding() {
          return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
        }
        get scaleX() {
          return this.viewState.scaleX;
        }
        get scaleY() {
          return this.viewState.scaleY;
        }
        elementAtHeight(e) {
          return this.readMeasured(), this.viewState.elementAtHeight(e);
        }
        lineBlockAtHeight(e) {
          return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
        }
        get viewportLineBlocks() {
          return this.viewState.viewportLines;
        }
        lineBlockAt(e) {
          return this.viewState.lineBlockAt(e);
        }
        get contentHeight() {
          return this.viewState.contentHeight;
        }
        moveByChar(e, t, i) {
          return xs(this, e, Wa(this, e, t, i));
        }
        moveByGroup(e, t) {
          return xs(this, e, Wa(this, e, t, (i) => EO(this, e.head, i)));
        }
        visualLineSide(e, t) {
          let i = this.bidiSpans(e), r = this.textDirectionAt(e.from), s = i[t ? i.length - 1 : 0];
          return b.cursor(s.side(t, r) + e.from, s.forward(!t, r) ? 1 : -1);
        }
        moveToLineBoundary(e, t, i = true) {
          return LO(this, e, t, i);
        }
        moveVertically(e, t, i) {
          return xs(this, e, jO(this, e, t, i));
        }
        domAtPos(e, t = 1) {
          return this.docView.domAtPos(e, t);
        }
        posAtDOM(e, t = 0) {
          return this.docView.posFromDOM(e, t);
        }
        posAtCoords(e, t = true) {
          this.readMeasured();
          let i = Ds(this, e, t);
          return i && i.pos;
        }
        posAndSideAtCoords(e, t = true) {
          return this.readMeasured(), Ds(this, e, t);
        }
        coordsAtPos(e, t = 1) {
          this.readMeasured();
          let i = this.state.doc.lineAt(e), r = this.bidiSpans(i), s = r[Xe.find(r, e - i.from, -1, t)];
          return this.docView.coordsAt(e, t, s.dir == U.RTL);
        }
        coordsForChar(e) {
          return this.readMeasured(), this.docView.coordsForChar(e);
        }
        get defaultCharacterWidth() {
          return this.viewState.heightOracle.charWidth;
        }
        get defaultLineHeight() {
          return this.viewState.heightOracle.lineHeight;
        }
        get textDirection() {
          return this.viewState.defaultTextDirection;
        }
        textDirectionAt(e) {
          return !this.state.facet(Ch) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
        }
        get lineWrapping() {
          return this.viewState.heightOracle.lineWrapping;
        }
        bidiSpans(e) {
          if (e.length > pp) return Qh(e.length);
          let t = this.textDirectionAt(e.from), i;
          for (let s of this.bidiCache) if (s.from == e.from && s.dir == t && (s.fresh || yh(s.isolates, i = Ya(this, e)))) return s.order;
          i || (i = Ya(this, e));
          let r = dO(e.text, t, i);
          return this.bidiCache.push(new ar(e.from, e.to, t, i, true, r)), r;
        }
        get hasFocus() {
          var e;
          return (this.dom.ownerDocument.hasFocus() || w.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
        }
        focus() {
          this.observer.ignore(() => {
            Oh(this.contentDOM), this.docView.updateSelection();
          });
        }
        setRoot(e) {
          this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles());
        }
        destroy() {
          this.root.activeElement == this.contentDOM && this.contentDOM.blur();
          for (let e of this.plugins) e.destroy(this);
          this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = true;
        }
        static scrollIntoView(e, t = {}) {
          var i, r, s, o;
          return Yn.of(new Di(typeof e == "number" ? b.cursor(e) : e, (i = t.y) !== null && i !== void 0 ? i : "nearest", (r = t.x) !== null && r !== void 0 ? r : "nearest", (s = t.yMargin) !== null && s !== void 0 ? s : 5, (o = t.xMargin) !== null && o !== void 0 ? o : 5));
        }
        scrollSnapshot() {
          let { scrollTop: e, scrollLeft: t } = this.scrollDOM, i = this.viewState.scrollAnchorAt(e);
          return Yn.of(new Di(b.cursor(i.from), "start", "start", i.top - e, t, true));
        }
        setTabFocusMode(e) {
          e == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof e == "boolean" ? this.inputState.tabFocusMode = e ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + e);
        }
        static domEventHandlers(e) {
          return Ye.define(() => ({}), { eventHandlers: e });
        }
        static domEventObservers(e) {
          return Ye.define(() => ({}), { eventObservers: e });
        }
        static theme(e, t) {
          let i = Ce.newName(), r = [Bn.of(i), Yi.of(so(`.${i}`, e))];
          return t && t.dark && r.push(no.of(true)), r;
        }
        static baseTheme(e) {
          return Fe.lowest(Yi.of(so("." + ro, e, Jh)));
        }
        static findFromDOM(e) {
          var t;
          let i = e.querySelector(".cm-content"), r = i && F.get(i) || F.get(e);
          return ((t = r?.root) === null || t === void 0 ? void 0 : t.view) || null;
        }
      };
      C.styleModule = Yi;
      C.inputHandler = vh;
      C.clipboardInputFilter = mo;
      C.clipboardOutputFilter = go;
      C.scrollHandler = Zh;
      C.focusChangeEffect = Th;
      C.perLineTextDirection = Ch;
      C.exceptionSink = Ph;
      C.updateListener = Ms;
      C.editable = st;
      C.mouseSelectionStyle = $h;
      C.dragMovesSelection = wh;
      C.clickAddsSelectionRange = kh;
      C.decorations = ur;
      C.blockWrappers = Rh;
      C.outerDecorations = bo;
      C.atomicRanges = Ji;
      C.bidiIsolatedRanges = Mh;
      C.cursorScrollMargin = $.define({ combine: (n) => {
        let e = 5, t = 5;
        for (let i of n) typeof i == "number" ? e = t = i : { x: e, y: t } = i;
        return { x: e, y: t };
      } });
      C.scrollMargins = Lh;
      C.darkTheme = no;
      C.cspNonce = $.define({ combine: (n) => n.length ? n[0] : "" });
      C.contentAttributes = So;
      C.editorAttributes = Xh;
      C.lineWrapping = C.contentAttributes.of({ class: "cm-lineWrapping" });
      C.announce = V.define();
      var pp = 4096, nh = {}, ar = class n {
        constructor(e, t, i, r, s, o) {
          this.from = e, this.to = t, this.dir = i, this.isolates = r, this.fresh = s, this.order = o;
        }
        static update(e, t) {
          if (t.empty && !e.some((s) => s.fresh)) return e;
          let i = [], r = e.length ? e[e.length - 1].dir : U.LTR;
          for (let s = Math.max(0, e.length - 10); s < e.length; s++) {
            let o = e[s];
            o.dir == r && !t.touchesRange(o.from, o.to) && i.push(new n(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.isolates, false, o.order));
          }
          return i;
        }
      };
      function rh(n, e, t) {
        for (let i = n.state.facet(e), r = i.length - 1; r >= 0; r--) {
          let s = i[r], o = typeof s == "function" ? s(n) : s;
          o && uo(o, t);
        }
        return t;
      }
      var mp = w.mac ? "mac" : w.windows ? "win" : w.linux ? "linux" : "key";
      function gp(n, e) {
        let t = n.split(/-(?!$)/), i = t[t.length - 1];
        i == "Space" && (i = " ");
        let r, s, o, l;
        for (let a = 0; a < t.length - 1; ++a) {
          let h7 = t[a];
          if (/^(cmd|meta|m)$/i.test(h7)) l = true;
          else if (/^a(lt)?$/i.test(h7)) r = true;
          else if (/^(c|ctrl|control)$/i.test(h7)) s = true;
          else if (/^s(hift)?$/i.test(h7)) o = true;
          else if (/^mod$/i.test(h7)) e == "mac" ? l = true : s = true;
          else throw new Error("Unrecognized modifier name: " + h7);
        }
        return r && (i = "Alt-" + i), s && (i = "Ctrl-" + i), l && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
      }
      function qn(n, e, t) {
        return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t !== false && e.shiftKey && (n = "Shift-" + n), n;
      }
      var Sp = Fe.default(C.domEventHandlers({ keydown(n, e) {
        return xp(bp(e.state), n, e, "editor");
      } })), Gt = $.define({ enables: Sp }), sh = /* @__PURE__ */ new WeakMap();
      function bp(n) {
        let e = n.facet(Gt), t = sh.get(e);
        return t || sh.set(e, t = Qp(e.reduce((i, r) => i.concat(r), []))), t;
      }
      var mt = null, yp = 4e3;
      function Qp(n, e = mp) {
        let t = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), r = (o, l) => {
          let a = i[o];
          if (a == null) i[o] = l;
          else if (a != l) throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
        }, s = (o, l, a, h7, c) => {
          var f, u;
          let d = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), O = l.split(/ (?!$)/).map((S) => gp(S, e));
          for (let S = 1; S < O.length; S++) {
            let x = O.slice(0, S).join(" ");
            r(x, true), d[x] || (d[x] = { preventDefault: true, stopPropagation: false, run: [(y) => {
              let R = mt = { view: y, prefix: x, scope: o };
              return setTimeout(() => {
                mt == R && (mt = null);
              }, yp), true;
            }] });
          }
          let m = O.join(" ");
          r(m, false);
          let g = d[m] || (d[m] = { preventDefault: false, stopPropagation: false, run: ((u = (f = d._any) === null || f === void 0 ? void 0 : f.run) === null || u === void 0 ? void 0 : u.slice()) || [] });
          a && g.run.push(a), h7 && (g.preventDefault = true), c && (g.stopPropagation = true);
        };
        for (let o of n) {
          let l = o.scope ? o.scope.split(" ") : ["editor"];
          if (o.any) for (let h7 of l) {
            let c = t[h7] || (t[h7] = /* @__PURE__ */ Object.create(null));
            c._any || (c._any = { preventDefault: false, stopPropagation: false, run: [] });
            let { any: f } = o;
            for (let u in c) c[u].run.push((d) => f(d, ao));
          }
          let a = o[e] || o.key;
          if (a) for (let h7 of l) s(h7, a, o.run, o.preventDefault, o.stopPropagation), o.shift && s(h7, "Shift-" + a, o.shift, o.preventDefault, o.stopPropagation);
        }
        return t;
      }
      var ao = null;
      function xp(n, e, t, i) {
        ao = e;
        let r = Xa(e), s = us(r, 0), o = ds(s) == r.length && r != " ", l = "", a = false, h7 = false, c = false;
        mt && mt.view == t && mt.scope == i && (l = mt.prefix + " ", Bh.indexOf(e.keyCode) < 0 && (h7 = true, mt = null));
        let f = /* @__PURE__ */ new Set(), u = (g) => {
          if (g) {
            for (let S of g.run) if (!f.has(S) && (f.add(S), S(t))) return g.stopPropagation && (c = true), true;
            g.preventDefault && (g.stopPropagation && (c = true), h7 = true);
          }
          return false;
        }, d = n[i], O, m;
        return d && (u(d[l + qn(r, e, !o)]) ? a = true : o && (e.altKey || e.metaKey || e.ctrlKey) && !(w.windows && e.ctrlKey && e.altKey) && !(w.mac && e.altKey && !(e.ctrlKey || e.metaKey)) && (O = rt[e.keyCode]) && O != r ? (u(d[l + qn(O, e, true)]) || e.shiftKey && (m = hi[e.keyCode]) != r && m != O && u(d[l + qn(m, e, false)])) && (a = true) : o && e.shiftKey && u(d[l + qn(r, e, true)]) && (a = true), !a && u(d._any) && (a = true)), h7 && (a = true), a && c && e.stopPropagation(), ao = null, a;
      }
      var kp = w.gecko && w.gecko_version == 153 ? "#ffffff01" : "transparent", YS = Fe.highest(C.theme({ ".cm-line": { "& ::selection, &::selection": { backgroundColor: `${kp} !important` }, caretColor: "transparent !important" }, ".cm-content": { caretColor: "transparent !important", "& :focus": { caretColor: "initial !important", "&::selection, & ::selection": { backgroundColor: "Highlight !important" } } } }));
      var _S = /x/.unicode != null ? "gu" : "g";
      function ec() {
        return $p;
      }
      var wp = Y.line({ class: "cm-activeLine" }), $p = Ye.fromClass(class {
        constructor(n) {
          this.decorations = this.getDeco(n);
        }
        update(n) {
          (n.docChanged || n.selectionSet) && (this.decorations = this.getDeco(n.view));
        }
        getDeco(n) {
          let e = -1, t = [];
          for (let i of n.state.selection.ranges) {
            let r = n.lineBlockAt(i.head);
            r.from > e && (t.push(wp.range(r.from)), e = r.from);
          }
          return Y.set(t);
        }
      }, { decorations: (n) => n.decorations });
      var Ve = class extends Te {
        compare(e) {
          return this == e || this.constructor == e.constructor && this.eq(e);
        }
        eq(e) {
          return false;
        }
        destroy(e) {
        }
      };
      Ve.prototype.elementClass = "";
      Ve.prototype.toDOM = void 0;
      Ve.prototype.mapMode = se.TrackBefore;
      Ve.prototype.startSide = Ve.prototype.endSide = -1;
      Ve.prototype.point = true;
      var Gn = $.define(), Pp = $.define();
      var Un = $.define();
      var ho = $.define({ combine: (n) => n.some((e) => e) });
      function vp(n) {
        let e = [Tp];
        return n && n.fixed === false && e.push(ho.of(true)), e;
      }
      var Tp = Ye.fromClass(class {
        constructor(n) {
          this.view = n, this.domAfter = null, this.prevViewport = n.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters cm-gutters-before", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.gutters = n.state.facet(Un).map((e) => new hr(n, e)), this.fixed = !n.state.facet(ho);
          for (let e of this.gutters) e.config.side == "after" ? this.getDOMAfter().appendChild(e.dom) : this.dom.appendChild(e.dom);
          this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(false), n.scrollDOM.insertBefore(this.dom, n.contentDOM);
        }
        getDOMAfter() {
          return this.domAfter || (this.domAfter = document.createElement("div"), this.domAfter.className = "cm-gutters cm-gutters-after", this.domAfter.setAttribute("aria-hidden", "true"), this.domAfter.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.domAfter.style.position = this.fixed ? "sticky" : "", this.view.scrollDOM.appendChild(this.domAfter)), this.domAfter;
        }
        update(n) {
          if (this.updateGutters(n)) {
            let e = this.prevViewport, t = n.view.viewport, i = Math.min(e.to, t.to) - Math.max(e.from, t.from);
            this.syncGutters(i < (t.to - t.from) * 0.8);
          }
          if (n.geometryChanged) {
            let e = this.view.contentHeight / this.view.scaleY + "px";
            this.dom.style.minHeight = e, this.domAfter && (this.domAfter.style.minHeight = e);
          }
          this.view.state.facet(ho) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : "", this.domAfter && (this.domAfter.style.position = this.fixed ? "sticky" : "")), this.prevViewport = n.view.viewport;
        }
        syncGutters(n) {
          let e = this.dom.nextSibling;
          n && (this.dom.remove(), this.domAfter && this.domAfter.remove());
          let t = _.iter(this.view.state.facet(Gn), this.view.viewport.from), i = [], r = this.gutters.map((s) => new fo(s, this.view.viewport, -this.view.documentPadding.top));
          for (let s of this.view.viewportLineBlocks) if (i.length && (i = []), Array.isArray(s.type)) {
            let o = true;
            for (let l of s.type) if (l.type == me.Text && o) {
              co(t, i, l.from);
              for (let a of r) a.line(this.view, l, i);
              o = false;
            } else if (l.widget) for (let a of r) a.widget(this.view, l);
          } else if (s.type == me.Text) {
            co(t, i, s.from);
            for (let o of r) o.line(this.view, s, i);
          } else if (s.widget) for (let o of r) o.widget(this.view, s);
          for (let s of r) s.finish();
          n && (this.view.scrollDOM.insertBefore(this.dom, e), this.domAfter && this.view.scrollDOM.appendChild(this.domAfter));
        }
        updateGutters(n) {
          let e = n.startState.facet(Un), t = n.state.facet(Un), i = n.docChanged || n.heightChanged || n.viewportChanged || !_.eq(n.startState.facet(Gn), n.state.facet(Gn), n.view.viewport.from, n.view.viewport.to);
          if (e == t) for (let r of this.gutters) r.update(n) && (i = true);
          else {
            i = true;
            let r = [];
            for (let s of t) {
              let o = e.indexOf(s);
              o < 0 ? r.push(new hr(this.view, s)) : (this.gutters[o].update(n), r.push(this.gutters[o]));
            }
            for (let s of this.gutters) s.dom.remove(), r.indexOf(s) < 0 && s.destroy();
            for (let s of r) s.config.side == "after" ? this.getDOMAfter().appendChild(s.dom) : this.dom.appendChild(s.dom);
            this.gutters = r;
          }
          return i;
        }
        destroy() {
          for (let n of this.gutters) n.destroy();
          this.dom.remove(), this.domAfter && this.domAfter.remove();
        }
      }, { provide: (n) => C.scrollMargins.of((e) => {
        let t = e.plugin(n);
        if (!t || t.gutters.length == 0 || !t.fixed) return null;
        let i = t.dom.offsetWidth * e.scaleX, r = t.domAfter ? t.domAfter.offsetWidth * e.scaleX : 0;
        return e.textDirection == U.LTR ? { left: i, right: r } : { right: i, left: r };
      }) });
      function oh(n) {
        return Array.isArray(n) ? n : [n];
      }
      function co(n, e, t) {
        for (; n.value && n.from <= t; ) n.from == t && e.push(n.value), n.next();
      }
      var fo = class {
        constructor(e, t, i) {
          this.gutter = e, this.height = i, this.i = 0, this.cursor = _.iter(e.markers, t.from);
        }
        addElement(e, t, i) {
          let { gutter: r } = this, s = (t.top - this.height) / e.scaleY, o = t.height / e.scaleY;
          if (this.i == r.elements.length) {
            let l = new cr(e, o, s, i);
            r.elements.push(l), r.dom.appendChild(l.dom);
          } else r.elements[this.i].update(e, o, s, i);
          this.height = t.bottom, this.i++;
        }
        line(e, t, i) {
          let r = [];
          co(this.cursor, r, t.from), i.length && (r = r.concat(i));
          let s = this.gutter.config.lineMarker(e, t, r);
          s && r.unshift(s);
          let o = this.gutter;
          r.length == 0 && !o.config.renderEmptyElements || this.addElement(e, t, r);
        }
        widget(e, t) {
          let i = this.gutter.config.widgetMarker(e, t.widget, t), r = i ? [i] : null;
          for (let s of e.state.facet(Pp)) {
            let o = s(e, t.widget, t);
            o && (r || (r = [])).push(o);
          }
          r && this.addElement(e, t, r);
        }
        finish() {
          let e = this.gutter;
          for (; e.elements.length > this.i; ) {
            let t = e.elements.pop();
            e.dom.removeChild(t.dom), t.destroy();
          }
        }
      }, hr = class {
        constructor(e, t) {
          this.view = e, this.config = t, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
          for (let i in t.domEventHandlers) this.dom.addEventListener(i, (r) => {
            let s = r.target, o;
            if (s != this.dom && this.dom.contains(s)) {
              for (; s.parentNode != this.dom; ) s = s.parentNode;
              let a = s.getBoundingClientRect();
              o = (a.top + a.bottom) / 2;
            } else o = r.clientY;
            let l = e.lineBlockAtHeight(o - e.documentTop);
            t.domEventHandlers[i](e, l, r) && r.preventDefault();
          });
          this.markers = oh(t.markers(e)), t.initialSpacer && (this.spacer = new cr(e, 0, 0, [t.initialSpacer(e)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
        }
        update(e) {
          let t = this.markers;
          if (this.markers = oh(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
            let r = this.config.updateSpacer(this.spacer.markers[0], e);
            r != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [r]);
          }
          let i = e.view.viewport;
          return !_.eq(this.markers, t, i.from, i.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : false);
        }
        destroy() {
          for (let e of this.elements) e.destroy();
        }
      }, cr = class {
        constructor(e, t, i, r) {
          this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(e, t, i, r);
        }
        update(e, t, i, r) {
          this.height != t && (this.height = t, this.dom.style.height = t + "px"), this.above != i && (this.dom.style.marginTop = (this.above = i) ? i + "px" : ""), Cp(this.markers, r) || this.setMarkers(e, r);
        }
        setMarkers(e, t) {
          let i = "cm-gutterElement", r = this.dom.firstChild;
          for (let s = 0, o = 0; ; ) {
            let l = o, a = s < t.length ? t[s++] : null, h7 = false;
            if (a) {
              let c = a.elementClass;
              c && (i += " " + c);
              for (let f = o; f < this.markers.length; f++) if (this.markers[f].compare(a)) {
                l = f, h7 = true;
                break;
              }
            } else l = this.markers.length;
            for (; o < l; ) {
              let c = this.markers[o++];
              if (c.toDOM) {
                c.destroy(r);
                let f = r.nextSibling;
                r.remove(), r = f;
              }
            }
            if (!a) break;
            a.toDOM && (h7 ? r = r.nextSibling : this.dom.insertBefore(a.toDOM(e), r)), h7 && o++;
          }
          this.dom.className = i, this.markers = t;
        }
        destroy() {
          this.setMarkers(null, []);
        }
      };
      function Cp(n, e) {
        if (n.length != e.length) return false;
        for (let t = 0; t < n.length; t++) if (!n[t].compare(e[t])) return false;
        return true;
      }
      var Zp = $.define(), Ap = $.define(), di = $.define({ combine(n) {
        return Wt(n, { formatNumber: String, domEventHandlers: {} }, { domEventHandlers(e, t) {
          let i = Object.assign({}, e);
          for (let r in t) {
            let s = i[r], o = t[r];
            i[r] = s ? (l, a, h7) => s(l, a, h7) || o(l, a, h7) : o;
          }
          return i;
        } });
      } }), Gi = class extends Ve {
        constructor(e) {
          super(), this.number = e;
        }
        eq(e) {
          return this.number == e.number;
        }
        toDOM() {
          return document.createTextNode(this.number);
        }
      };
      function ws(n, e) {
        return n.state.facet(di).formatNumber(e, n.state);
      }
      var Xp = Un.compute([di], (n) => ({ class: "cm-lineNumbers", renderEmptyElements: false, markers(e) {
        return e.state.facet(Zp);
      }, lineMarker(e, t, i) {
        return i.some((r) => r.toDOM) ? null : new Gi(ws(e, e.state.doc.lineAt(t.from).number));
      }, widgetMarker: (e, t, i) => {
        for (let r of e.state.facet(Ap)) {
          let s = r(e, t, i);
          if (s) return s;
        }
        return null;
      }, lineMarkerChange: (e) => e.startState.facet(di) != e.state.facet(di), initialSpacer(e) {
        return new Gi(ws(e, lh(e.state.doc.lines)));
      }, updateSpacer(e, t) {
        let i = ws(t.view, lh(t.view.state.doc.lines));
        return i == e.number ? e : new Gi(i);
      }, domEventHandlers: n.facet(di).domEventHandlers, side: "before" }));
      function tc(n = {}) {
        return [di.of(n), vp(), Xp];
      }
      function lh(n) {
        let e = 9;
        for (; e < n; ) e = e * 10 + 9;
        return e;
      }
      var Rp = new class extends Ve {
        constructor() {
          super(...arguments), this.elementClass = "cm-activeLineGutter";
        }
      }(), Mp = Gn.compute(["selection"], (n) => {
        let e = [], t = -1;
        for (let i of n.selection.ranges) {
          let r = n.doc.lineAt(i.head).from;
          r > t && (t = r, e.push(Rp.range(r)));
        }
        return _.of(e);
      });
      function ic() {
        return Mp;
      }
      var Lp = 0, ge = class {
        constructor(e, t) {
          this.from = e, this.to = t;
        }
      }, A = class {
        constructor(e = {}) {
          this.id = Lp++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
            throw new Error("This node type doesn't define a deserialize function");
          }), this.combine = e.combine || null;
        }
        add(e) {
          if (this.perNode) throw new RangeError("Can't add per-node props to node types");
          return typeof e != "function" && (e = J.match(e)), (t) => {
            let i = e(t);
            return i === void 0 ? null : [this, i];
          };
        }
      };
      A.closedBy = new A({ deserialize: (n) => n.split(" ") });
      A.openedBy = new A({ deserialize: (n) => n.split(" ") });
      A.group = new A({ deserialize: (n) => n.split(" ") });
      A.isolate = new A({ deserialize: (n) => {
        if (n && n != "rtl" && n != "ltr" && n != "auto") throw new RangeError("Invalid value for isolate: " + n);
        return n || "auto";
      } });
      A.contextHash = new A({ perNode: true });
      A.lookAhead = new A({ perNode: true });
      A.mounted = new A({ perNode: true });
      var yt = class {
        constructor(e, t, i, r = false) {
          this.tree = e, this.overlay = t, this.parser = i, this.bracketed = r;
        }
        static get(e) {
          return e && e.props && e.props[A.mounted.id];
        }
      }, Ep = /* @__PURE__ */ Object.create(null), J = class n {
        constructor(e, t, i, r = 0) {
          this.name = e, this.props = t, this.id = i, this.flags = r;
        }
        static define(e) {
          let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : Ep, i = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), r = new n(e.name || "", t, e.id, i);
          if (e.props) {
            for (let s of e.props) if (Array.isArray(s) || (s = s(r)), s) {
              if (s[0].perNode) throw new RangeError("Can't store a per-node prop on a node type");
              t[s[0].id] = s[1];
            }
          }
          return r;
        }
        prop(e) {
          return this.props[e.id];
        }
        get isTop() {
          return (this.flags & 1) > 0;
        }
        get isSkipped() {
          return (this.flags & 2) > 0;
        }
        get isError() {
          return (this.flags & 4) > 0;
        }
        get isAnonymous() {
          return (this.flags & 8) > 0;
        }
        is(e) {
          if (typeof e == "string") {
            if (this.name == e) return true;
            let t = this.prop(A.group);
            return t ? t.indexOf(e) > -1 : false;
          }
          return this.id == e;
        }
        static match(e) {
          let t = /* @__PURE__ */ Object.create(null);
          for (let i in e) for (let r of i.split(" ")) t[r] = e[i];
          return (i) => {
            for (let r = i.prop(A.group), s = -1; s < (r ? r.length : 0); s++) {
              let o = t[s < 0 ? i.name : r[s]];
              if (o) return o;
            }
          };
        }
      };
      J.none = new J("", /* @__PURE__ */ Object.create(null), 0, 8);
      var Qt = class n {
        constructor(e) {
          this.types = e;
          for (let t = 0; t < e.length; t++) if (e[t].id != t) throw new RangeError("Node type ids should correspond to array positions when creating a node set");
        }
        extend(...e) {
          let t = [];
          for (let i of this.types) {
            let r = null;
            for (let s of e) {
              let o = s(i);
              if (o) {
                r || (r = Object.assign({}, i.props));
                let l = o[1], a = o[0];
                a.combine && a.id in r && (l = a.combine(r[a.id], l)), r[a.id] = l;
              }
            }
            t.push(r ? new J(i.name, r, i.id, i.flags) : i);
          }
          return new n(t);
        }
      }, Or = /* @__PURE__ */ new WeakMap(), nc = /* @__PURE__ */ new WeakMap(), E;
      (function(n) {
        n[n.ExcludeBuffers = 1] = "ExcludeBuffers", n[n.IncludeAnonymous = 2] = "IncludeAnonymous", n[n.IgnoreMounts = 4] = "IgnoreMounts", n[n.IgnoreOverlays = 8] = "IgnoreOverlays", n[n.EnterBracketed = 16] = "EnterBracketed";
      })(E || (E = {}));
      var z = class n {
        constructor(e, t, i, r, s) {
          if (this.type = e, this.children = t, this.positions = i, this.length = r, this.props = null, s && s.length) {
            this.props = /* @__PURE__ */ Object.create(null);
            for (let [o, l] of s) this.props[typeof o == "number" ? o : o.id] = l;
          }
        }
        toString() {
          let e = yt.get(this);
          if (e && !e.overlay) return e.tree.toString();
          let t = "";
          for (let i of this.children) {
            let r = i.toString();
            r && (t && (t += ","), t += r);
          }
          return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
        }
        cursor(e = 0) {
          return new Qi(this.topNode, e);
        }
        cursorAt(e, t = 0, i = 0) {
          let r = Or.get(this) || this.topNode, s = new Qi(r);
          return s.moveTo(e, t), Or.set(this, s._tree), s;
        }
        get topNode() {
          return new Se(this, 0, 0, null);
        }
        resolve(e, t = 0) {
          let i = en(Or.get(this) || this.topNode, e, t, false);
          return Or.set(this, i), i;
        }
        resolveInner(e, t = 0) {
          let i = en(nc.get(this) || this.topNode, e, t, true);
          return nc.set(this, i), i;
        }
        resolveStack(e, t = 0) {
          return jp(this, e, t);
        }
        iterate(e) {
          let { enter: t, leave: i, from: r = 0, to: s = this.length } = e, o = e.mode || 0, l = (o & E.IncludeAnonymous) > 0;
          for (let a = this.cursor(o | E.IncludeAnonymous); ; ) {
            let h7 = false;
            if (a.from <= s && a.to >= r && (!l && a.type.isAnonymous || t(a) !== false)) {
              if (a.firstChild()) continue;
              h7 = true;
            }
            for (; h7 && i && (l || !a.type.isAnonymous) && i(a), !a.nextSibling(); ) {
              if (!a.parent()) return;
              h7 = true;
            }
          }
        }
        prop(e) {
          return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
        }
        get propValues() {
          let e = [];
          if (this.props) for (let t in this.props) e.push([+t, this.props[t]]);
          return e;
        }
        balance(e = {}) {
          return this.children.length <= 8 ? this : Ao(J.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, i, r) => new n(this.type, t, i, r, this.propValues), e.makeTree || ((t, i, r) => new n(J.none, t, i, r)));
        }
        static build(e) {
          return zp(e);
        }
      };
      z.empty = new z(J.none, [], [], 0);
      var Qo = class n {
        constructor(e, t) {
          this.buffer = e, this.index = t;
        }
        get id() {
          return this.buffer[this.index - 4];
        }
        get start() {
          return this.buffer[this.index - 3];
        }
        get end() {
          return this.buffer[this.index - 2];
        }
        get size() {
          return this.buffer[this.index - 1];
        }
        get pos() {
          return this.index;
        }
        next() {
          this.index -= 4;
        }
        fork() {
          return new n(this.buffer, this.index);
        }
      }, xt = class n {
        constructor(e, t, i) {
          this.buffer = e, this.length = t, this.set = i;
        }
        get type() {
          return J.none;
        }
        toString() {
          let e = [];
          for (let t = 0; t < this.buffer.length; ) e.push(this.childString(t)), t = this.buffer[t + 3];
          return e.join(",");
        }
        childString(e) {
          let t = this.buffer[e], i = this.buffer[e + 3], r = this.set.types[t], s = r.name;
          if (/\W/.test(s) && !r.isError && (s = JSON.stringify(s)), e += 4, i == e) return s;
          let o = [];
          for (; e < i; ) o.push(this.childString(e)), e = this.buffer[e + 3];
          return s + "(" + o.join(",") + ")";
        }
        findChild(e, t, i, r, s) {
          let { buffer: o } = this, l = -1;
          for (let a = e; a != t && !(cc(s, r, o[a + 1], o[a + 2]) && (l = a, i > 0)); a = o[a + 3]) ;
          return l;
        }
        slice(e, t, i) {
          let r = this.buffer, s = new Uint16Array(t - e), o = 0;
          for (let l = e, a = 0; l < t; ) {
            s[a++] = r[l++], s[a++] = r[l++] - i;
            let h7 = s[a++] = r[l++] - i;
            s[a++] = r[l++] - e, o = Math.max(o, h7);
          }
          return new n(s, o, this.set);
        }
      };
      function cc(n, e, t, i) {
        switch (n) {
          case -2:
            return t < e;
          case -1:
            return i >= e && t < e;
          case 0:
            return t < e && i > e;
          case 1:
            return t <= e && i > e;
          case 2:
            return i > e;
          case 4:
            return true;
        }
      }
      function en(n, e, t, i) {
        for (var r; n.from == n.to || (t < 1 ? n.from >= e : n.from > e) || (t > -1 ? n.to <= e : n.to < e); ) {
          let o = !i && n instanceof Se && n.index < 0 ? null : n.parent;
          if (!o) return n;
          n = o;
        }
        let s = i ? 0 : E.IgnoreOverlays;
        if (i) for (let o = n, l = o.parent; l; o = l, l = o.parent) o instanceof Se && o.index < 0 && ((r = l.enter(e, t, s)) === null || r === void 0 ? void 0 : r.from) != o.from && (n = l);
        for (; ; ) {
          let o = n.enter(e, t, s);
          if (!o) return n;
          n = o;
        }
      }
      var mr = class {
        cursor(e = 0) {
          return new Qi(this, e);
        }
        getChild(e, t = null, i = null) {
          let r = rc(this, e, t, i);
          return r.length ? r[0] : null;
        }
        getChildren(e, t = null, i = null) {
          return rc(this, e, t, i);
        }
        resolve(e, t = 0) {
          return en(this, e, t, false);
        }
        resolveInner(e, t = 0) {
          return en(this, e, t, true);
        }
        matchContext(e) {
          return xo(this.parent, e);
        }
        enterUnfinishedNodesBefore(e) {
          let t = this.childBefore(e), i = this;
          for (; t; ) {
            let r = t.lastChild;
            if (!r || r.to != t.to) break;
            r.type.isError && r.from == r.to ? (i = t, t = r.prevSibling) : t = r;
          }
          return i;
        }
        get node() {
          return this;
        }
        get next() {
          return this.parent;
        }
      }, Se = class n extends mr {
        constructor(e, t, i, r) {
          super(), this._tree = e, this.from = t, this.index = i, this._parent = r;
        }
        get type() {
          return this._tree.type;
        }
        get name() {
          return this._tree.type.name;
        }
        get to() {
          return this.from + this._tree.length;
        }
        nextChild(e, t, i, r, s = 0) {
          for (let o = this; ; ) {
            for (let { children: l, positions: a } = o._tree, h7 = t > 0 ? l.length : -1; e != h7; e += t) {
              let c = l[e], f = a[e] + o.from, u;
              if (!(!(s & E.EnterBracketed && c instanceof z && (u = yt.get(c)) && !u.overlay && u.bracketed && i >= f && i <= f + c.length) && !cc(r, i, f, f + c.length))) {
                if (c instanceof xt) {
                  if (s & E.ExcludeBuffers) continue;
                  let d = c.findChild(0, c.buffer.length, t, i - f, r);
                  if (d > -1) return new Ut(new ko(o, c, e, f), null, d);
                } else if (s & E.IncludeAnonymous || !c.type.isAnonymous || Zo(c)) {
                  let d;
                  if (!(s & E.IgnoreMounts) && (d = yt.get(c)) && !d.overlay) return new n(d.tree, f, e, o);
                  let O = new n(c, f, e, o);
                  return s & E.IncludeAnonymous || !O.type.isAnonymous ? O : O.nextChild(t < 0 ? c.children.length - 1 : 0, t, i, r, s);
                }
              }
            }
            if (s & E.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o)) return null;
          }
        }
        get firstChild() {
          return this.nextChild(0, 1, 0, 4);
        }
        get lastChild() {
          return this.nextChild(this._tree.children.length - 1, -1, 0, 4);
        }
        childAfter(e) {
          return this.nextChild(0, 1, e, 2);
        }
        childBefore(e) {
          return this.nextChild(this._tree.children.length - 1, -1, e, -2);
        }
        prop(e) {
          return this._tree.prop(e);
        }
        enter(e, t, i = 0) {
          let r;
          if (!(i & E.IgnoreOverlays) && (r = yt.get(this._tree)) && r.overlay) {
            let s = e - this.from, o = i & E.EnterBracketed && r.bracketed;
            for (let { from: l, to: a } of r.overlay) if ((t > 0 || o ? l <= s : l < s) && (t < 0 || o ? a >= s : a > s)) return new n(r.tree, r.overlay[0].from + this.from, -1, this);
          }
          return this.nextChild(0, 1, e, t, i);
        }
        nextSignificantParent() {
          let e = this;
          for (; e.type.isAnonymous && e._parent; ) e = e._parent;
          return e;
        }
        get parent() {
          return this._parent ? this._parent.nextSignificantParent() : null;
        }
        get nextSibling() {
          return this._parent && this.index >= 0 ? this._parent.nextChild(this.index + 1, 1, 0, 4) : null;
        }
        get prevSibling() {
          return this._parent && this.index >= 0 ? this._parent.nextChild(this.index - 1, -1, 0, 4) : null;
        }
        get tree() {
          return this._tree;
        }
        toTree() {
          return this._tree;
        }
        toString() {
          return this._tree.toString();
        }
      };
      function rc(n, e, t, i) {
        let r = n.cursor(), s = [];
        if (!r.firstChild()) return s;
        if (t != null) {
          for (let o = false; !o; ) if (o = r.type.is(t), !r.nextSibling()) return s;
        }
        for (; ; ) {
          if (i != null && r.type.is(i)) return s;
          if (r.type.is(e) && s.push(r.node), !r.nextSibling()) return i == null ? s : [];
        }
      }
      function xo(n, e, t = e.length - 1) {
        for (let i = n; t >= 0; i = i.parent) {
          if (!i) return false;
          if (!i.type.isAnonymous) {
            if (e[t] && e[t] != i.name) return false;
            t--;
          }
        }
        return true;
      }
      var ko = class {
        constructor(e, t, i, r) {
          this.parent = e, this.buffer = t, this.index = i, this.start = r;
        }
      }, Ut = class n extends mr {
        get name() {
          return this.type.name;
        }
        get from() {
          return this.context.start + this.context.buffer.buffer[this.index + 1];
        }
        get to() {
          return this.context.start + this.context.buffer.buffer[this.index + 2];
        }
        constructor(e, t, i) {
          super(), this.context = e, this._parent = t, this.index = i, this.type = e.buffer.set.types[e.buffer.buffer[i]];
        }
        child(e, t, i) {
          let { buffer: r } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.context.start, i);
          return s < 0 ? null : new n(this.context, this, s);
        }
        get firstChild() {
          return this.child(1, 0, 4);
        }
        get lastChild() {
          return this.child(-1, 0, 4);
        }
        childAfter(e) {
          return this.child(1, e, 2);
        }
        childBefore(e) {
          return this.child(-1, e, -2);
        }
        prop(e) {
          return this.type.prop(e);
        }
        enter(e, t, i = 0) {
          if (i & E.ExcludeBuffers) return null;
          let { buffer: r } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
          return s < 0 ? null : new n(this.context, this, s);
        }
        get parent() {
          return this._parent || this.context.parent.nextSignificantParent();
        }
        externalSibling(e) {
          return this._parent ? null : this.context.parent.nextChild(this.context.index + e, e, 0, 4);
        }
        get nextSibling() {
          let { buffer: e } = this.context, t = e.buffer[this.index + 3];
          return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new n(this.context, this._parent, t) : this.externalSibling(1);
        }
        get prevSibling() {
          let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
          return this.index == t ? this.externalSibling(-1) : new n(this.context, this._parent, e.findChild(t, this.index, -1, 0, 4));
        }
        get tree() {
          return null;
        }
        toTree() {
          let e = [], t = [], { buffer: i } = this.context, r = this.index + 4, s = i.buffer[this.index + 3];
          if (s > r) {
            let o = i.buffer[this.index + 1];
            e.push(i.slice(r, s, o)), t.push(0);
          }
          return new z(this.type, e, t, this.to - this.from);
        }
        toString() {
          return this.context.buffer.childString(this.index);
        }
      };
      function fc(n) {
        if (!n.length) return null;
        let e = 0, t = n[0];
        for (let s = 1; s < n.length; s++) {
          let o = n[s];
          (o.from > t.from || o.to < t.to) && (t = o, e = s);
        }
        let i = t instanceof Se && t.index < 0 ? null : t.parent, r = n.slice();
        return i ? r[e] = i : r.splice(e, 1), new wo(r, t);
      }
      var wo = class {
        constructor(e, t) {
          this.heads = e, this.node = t;
        }
        get next() {
          return fc(this.heads);
        }
      };
      function jp(n, e, t) {
        let i = n.resolveInner(e, t), r = null;
        for (let s = i instanceof Se ? i : i.context.parent; s; s = s.parent) if (s.index < 0) {
          let o = s.parent;
          (r || (r = [i])).push(o.resolve(e, t)), s = o;
        } else {
          let o = yt.get(s.tree);
          if (o && o.overlay && o.overlay[0].from <= e && o.overlay[o.overlay.length - 1].to >= e) {
            let l = new Se(o.tree, o.overlay[0].from + s.from, -1, s);
            (r || (r = [i])).push(en(l, e, t, false));
          }
        }
        return r ? fc(r) : i;
      }
      var Qi = class {
        get name() {
          return this.type.name;
        }
        constructor(e, t = 0) {
          if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~E.EnterBracketed, e instanceof Se) this.yieldNode(e);
          else {
            this._tree = e.context.parent, this.buffer = e.context;
            for (let i = e._parent; i; i = i._parent) this.stack.unshift(i.index);
            this.bufferNode = e, this.yieldBuf(e.index);
          }
        }
        yieldNode(e) {
          return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, true) : false;
        }
        yieldBuf(e, t) {
          this.index = e;
          let { start: i, buffer: r } = this.buffer;
          return this.type = t || r.set.types[r.buffer[e]], this.from = i + r.buffer[e + 1], this.to = i + r.buffer[e + 2], true;
        }
        yield(e) {
          return e ? e instanceof Se ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : false;
        }
        toString() {
          return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
        }
        enterChild(e, t, i) {
          if (!this.buffer) return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, i, this.mode));
          let { buffer: r } = this.buffer, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.buffer.start, i);
          return s < 0 ? false : (this.stack.push(this.index), this.yieldBuf(s));
        }
        firstChild() {
          return this.enterChild(1, 0, 4);
        }
        lastChild() {
          return this.enterChild(-1, 0, 4);
        }
        childAfter(e) {
          return this.enterChild(1, e, 2);
        }
        childBefore(e) {
          return this.enterChild(-1, e, -2);
        }
        enter(e, t, i = this.mode) {
          return this.buffer ? i & E.ExcludeBuffers ? false : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, i));
        }
        parent() {
          if (!this.buffer) return this.yieldNode(this.mode & E.IncludeAnonymous ? this._tree._parent : this._tree.parent);
          if (this.stack.length) return this.yieldBuf(this.stack.pop());
          let e = this.mode & E.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
          return this.buffer = null, this.yieldNode(e);
        }
        sibling(e) {
          if (!this.buffer) return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : false;
          let { buffer: t } = this.buffer, i = this.stack.length - 1;
          if (e < 0) {
            let r = i < 0 ? 0 : this.stack[i] + 4;
            if (this.index != r) return this.yieldBuf(t.findChild(r, this.index, -1, 0, 4));
          } else {
            let r = t.buffer[this.index + 3];
            if (r < (i < 0 ? t.buffer.length : t.buffer[this.stack[i] + 3])) return this.yieldBuf(r);
          }
          return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : false;
        }
        nextSibling() {
          return this.sibling(1);
        }
        prevSibling() {
          return this.sibling(-1);
        }
        atLastNode(e) {
          let t, i, { buffer: r } = this;
          if (r) {
            if (e > 0) {
              if (this.index < r.buffer.buffer.length) return false;
            } else for (let s = 0; s < this.index; s++) if (r.buffer.buffer[s + 3] < this.index) return false;
            ({ index: t, parent: i } = r);
          } else ({ index: t, _parent: i } = this._tree);
          for (; i; { index: t, _parent: i } = i) if (t > -1) for (let s = t + e, o = e < 0 ? -1 : i._tree.children.length; s != o; s += e) {
            let l = i._tree.children[s];
            if (this.mode & E.IncludeAnonymous || l instanceof xt || !l.type.isAnonymous || Zo(l)) return false;
          }
          return true;
        }
        move(e, t) {
          if (t && this.enterChild(e, 0, 4)) return true;
          for (; ; ) {
            if (this.sibling(e)) return true;
            if (this.atLastNode(e) || !this.parent()) return false;
          }
        }
        next(e = true) {
          return this.move(1, e);
        }
        prev(e = true) {
          return this.move(-1, e);
        }
        moveTo(e, t = 0) {
          for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(); ) ;
          for (; this.enterChild(1, e, t); ) ;
          return this;
        }
        get node() {
          if (!this.buffer) return this._tree;
          let e = this.bufferNode, t = null, i = 0;
          if (e && e.context == this.buffer) e: for (let r = this.index, s = this.stack.length; s >= 0; ) {
            for (let o = e; o; o = o._parent) if (o.index == r) {
              if (r == this.index) return o;
              t = o, i = s + 1;
              break e;
            }
            r = this.stack[--s];
          }
          for (let r = i; r < this.stack.length; r++) t = new Ut(this.buffer, t, this.stack[r]);
          return this.bufferNode = new Ut(this.buffer, t, this.index);
        }
        get tree() {
          return this.buffer ? null : this._tree._tree;
        }
        iterate(e, t) {
          for (let i = 0; ; ) {
            let r = false;
            if (this.type.isAnonymous || e(this) !== false) {
              if (this.firstChild()) {
                i++;
                continue;
              }
              this.type.isAnonymous || (r = true);
            }
            for (; ; ) {
              if (r && t && t(this), r = this.type.isAnonymous, !i) return;
              if (this.nextSibling()) break;
              this.parent(), i--, r = true;
            }
          }
        }
        matchContext(e) {
          if (!this.buffer) return xo(this.node.parent, e);
          let { buffer: t } = this.buffer, { types: i } = t.set;
          for (let r = e.length - 1, s = this.stack.length - 1; r >= 0; s--) {
            if (s < 0) return xo(this._tree, e, r);
            let o = i[t.buffer[this.stack[s]]];
            if (!o.isAnonymous) {
              if (e[r] && e[r] != o.name) return false;
              r--;
            }
          }
          return true;
        }
      };
      function Zo(n) {
        return n.children.some((e) => e instanceof xt || !e.type.isAnonymous || Zo(e));
      }
      function zp(n) {
        var e;
        let { buffer: t, nodeSet: i, maxBufferLength: r = 1024, reused: s = [], minRepeatType: o = i.types.length } = n, l = Array.isArray(t) ? new Qo(t, t.length) : t, a = i.types, h7 = 0, c = 0;
        function f(T, Z, P, N, q, K) {
          let { id: L, start: X, end: G, size: H } = l, re = c, Ot = h7;
          if (H < 0) if (l.next(), H == -1) {
            let it = s[L];
            P.push(it), N.push(X - T);
            return;
          } else if (H == -3) {
            h7 = L;
            return;
          } else if (H == -4) {
            c = L;
            return;
          } else throw new RangeError(`Unrecognized record size: ${H}`);
          let Ri = a[L], $n, Mt, na = X - T;
          if (G - X <= r && (Mt = g(l.pos - Z, q))) {
            let it = new Uint16Array(Mt.size - Mt.skip), Pe = l.pos - Mt.size, Ue = it.length;
            for (; l.pos > Pe; ) Ue = S(Mt.start, it, Ue);
            $n = new xt(it, G - Mt.start, i), na = Mt.start - T;
          } else {
            let it = l.pos - H;
            l.next();
            let Pe = [], Ue = [], Lt = L >= o ? L : -1, ri = 0, Pn = G;
            for (; l.pos > it; ) Lt >= 0 && l.id == Lt && l.size >= 0 ? (l.end <= Pn - r && (O(Pe, Ue, X, ri, l.end, Pn, Lt, re, Ot), ri = Pe.length, Pn = l.end), l.next()) : K > 2500 ? u(X, it, Pe, Ue) : f(X, it, Pe, Ue, Lt, K + 1);
            if (Lt >= 0 && ri > 0 && ri < Pe.length && O(Pe, Ue, X, ri, X, Pn, Lt, re, Ot), Pe.reverse(), Ue.reverse(), Lt > -1 && ri > 0) {
              let ra = d(Ri, Ot);
              $n = Ao(Ri, Pe, Ue, 0, Pe.length, 0, G - X, ra, ra);
            } else $n = m(Ri, Pe, Ue, G - X, re - G, Ot);
          }
          P.push($n), N.push(na);
        }
        function u(T, Z, P, N) {
          let q = [], K = 0, L = -1;
          for (; l.pos > Z; ) {
            let { id: X, start: G, end: H, size: re } = l;
            if (re > 4) l.next();
            else {
              if (L > -1 && G < L) break;
              L < 0 && (L = H - r), q.push(X, G, H), K++, l.next();
            }
          }
          if (K) {
            let X = new Uint16Array(K * 4), G = q[q.length - 2];
            for (let H = q.length - 3, re = 0; H >= 0; H -= 3) X[re++] = q[H], X[re++] = q[H + 1] - G, X[re++] = q[H + 2] - G, X[re++] = re;
            P.push(new xt(X, q[2] - G, i)), N.push(G - T);
          }
        }
        function d(T, Z) {
          return (P, N, q) => {
            let K = 0, L = P.length - 1, X, G;
            if (L >= 0 && (X = P[L]) instanceof z) {
              if (!L && X.type == T && X.length == q) return X;
              (G = X.prop(A.lookAhead)) && (K = N[L] + X.length + G);
            }
            return m(T, P, N, q, K, Z);
          };
        }
        function O(T, Z, P, N, q, K, L, X, G) {
          let H = [], re = [];
          for (; T.length > N; ) H.push(T.pop()), re.push(Z.pop() + P - q);
          T.push(m(i.types[L], H, re, K - q, X - K, G)), Z.push(q - P);
        }
        function m(T, Z, P, N, q, K, L) {
          if (K) {
            let X = [A.contextHash, K];
            L = L ? [X].concat(L) : [X];
          }
          if (q > 25) {
            let X = [A.lookAhead, q];
            L = L ? [X].concat(L) : [X];
          }
          return new z(T, Z, P, N, L);
        }
        function g(T, Z) {
          let P = l.fork(), N = 0, q = 0, K = 0, L = P.end - r, X = { size: 0, start: 0, skip: 0 };
          e: for (let G = P.pos - T; P.pos > G; ) {
            let H = P.size;
            if (P.id == Z && H >= 0) {
              X.size = N, X.start = q, X.skip = K, K += 4, N += 4, P.next();
              continue;
            }
            let re = P.pos - H;
            if (H < 0 || re < G || P.start < L) break;
            let Ot = P.id >= o ? 4 : 0, Ri = P.start;
            for (P.next(); P.pos > re; ) {
              if (P.size < 0) if (P.size == -3 || P.size == -4) Ot += 4;
              else break e;
              else P.id >= o && (Ot += 4);
              P.next();
            }
            q = Ri, N += H, K += Ot;
          }
          return (Z < 0 || N == T) && (X.size = N, X.start = q, X.skip = K), X.size > 4 ? X : void 0;
        }
        function S(T, Z, P) {
          let { id: N, start: q, end: K, size: L } = l;
          if (l.next(), L >= 0 && N < o) {
            let X = P;
            if (L > 4) {
              let G = l.pos - (L - 4);
              for (; l.pos > G; ) P = S(T, Z, P);
            }
            Z[--P] = X, Z[--P] = K - T, Z[--P] = q - T, Z[--P] = N;
          } else L == -3 ? h7 = N : L == -4 && (c = N);
          return P;
        }
        let x = [], y = [];
        for (; l.pos > 0; ) f(n.start || 0, n.bufferStart || 0, x, y, -1, 0);
        let R = (e = n.length) !== null && e !== void 0 ? e : x.length ? y[0] + x[0].length : 0;
        return new z(a[n.topID], x.reverse(), y.reverse(), R);
      }
      var sc = /* @__PURE__ */ new WeakMap();
      function pr(n, e) {
        if (!n.isAnonymous || e instanceof xt || e.type != n) return 1;
        let t = sc.get(e);
        if (t == null) {
          t = 1;
          for (let i of e.children) {
            if (i.type != n || !(i instanceof z)) {
              t = 1;
              break;
            }
            t += pr(n, i);
          }
          sc.set(e, t);
        }
        return t;
      }
      function Ao(n, e, t, i, r, s, o, l, a) {
        let h7 = 0;
        for (let O = i; O < r; O++) h7 += pr(n, e[O]);
        let c = Math.ceil(h7 * 1.5 / 8), f = [], u = [];
        function d(O, m, g, S, x) {
          for (let y = g; y < S; ) {
            let R = y, T = m[y], Z = pr(n, O[y]);
            for (y++; y < S; y++) {
              let P = pr(n, O[y]);
              if (Z + P >= c) break;
              Z += P;
            }
            if (y == R + 1) {
              if (Z > c) {
                let P = O[R];
                d(P.children, P.positions, 0, P.children.length, m[R] + x);
                continue;
              }
              f.push(O[R]);
            } else {
              let P = m[y - 1] + O[y - 1].length - T;
              f.push(Ao(n, O, m, R, y, T, P, null, a));
            }
            u.push(T + x - s);
          }
        }
        return d(e, t, i, r, 0), (l || a)(f, u, o);
      }
      var xi = class {
        constructor() {
          this.map = /* @__PURE__ */ new WeakMap();
        }
        setBuffer(e, t, i) {
          let r = this.map.get(e);
          r || this.map.set(e, r = /* @__PURE__ */ new Map()), r.set(t, i);
        }
        getBuffer(e, t) {
          let i = this.map.get(e);
          return i && i.get(t);
        }
        set(e, t) {
          e instanceof Ut ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof Se && this.map.set(e.tree, t);
        }
        get(e) {
          return e instanceof Ut ? this.getBuffer(e.context.buffer, e.index) : e instanceof Se ? this.map.get(e.tree) : void 0;
        }
        cursorSet(e, t) {
          e.buffer ? this.setBuffer(e.buffer.buffer, e.index, t) : this.map.set(e.tree, t);
        }
        cursorGet(e) {
          return e.buffer ? this.getBuffer(e.buffer.buffer, e.index) : this.map.get(e.tree);
        }
      }, ht = class n {
        constructor(e, t, i, r, s = false, o = false) {
          this.from = e, this.to = t, this.tree = i, this.offset = r, this.open = (s ? 1 : 0) | (o ? 2 : 0);
        }
        get openStart() {
          return (this.open & 1) > 0;
        }
        get openEnd() {
          return (this.open & 2) > 0;
        }
        static addTree(e, t = [], i = false) {
          let r = [new n(0, e.length, e, 0, false, i)];
          for (let s of t) s.to > e.length && r.push(s);
          return r;
        }
        static applyChanges(e, t, i = 128) {
          if (!t.length) return e;
          let r = [], s = 1, o = e.length ? e[0] : null;
          for (let l = 0, a = 0, h7 = 0; ; l++) {
            let c = l < t.length ? t[l] : null, f = c ? c.fromA : 1e9;
            if (f - a >= i) for (; o && o.from < f; ) {
              let u = o;
              if (a >= u.from || f <= u.to || h7) {
                let d = Math.max(u.from, a) - h7, O = Math.min(u.to, f) - h7;
                u = d >= O ? null : new n(d, O, u.tree, u.offset + h7, l > 0, !!c);
              }
              if (u && r.push(u), o.to > f) break;
              o = s < e.length ? e[s++] : null;
            }
            if (!c) break;
            a = c.toA, h7 = c.toA - c.toB;
          }
          return r;
        }
      }, kt = class {
        startParse(e, t, i) {
          return typeof e == "string" && (e = new $o(e)), i = i ? i.length ? i.map((r) => new ge(r.from, r.to)) : [new ge(0, 0)] : [new ge(0, e.length)], this.createParse(e, t || [], i);
        }
        parse(e, t, i) {
          let r = this.startParse(e, t, i);
          for (; ; ) {
            let s = r.advance();
            if (s) return s;
          }
        }
      }, $o = class {
        constructor(e) {
          this.string = e;
        }
        get length() {
          return this.string.length;
        }
        chunk(e) {
          return this.string.slice(e);
        }
        get lineChunks() {
          return false;
        }
        read(e, t) {
          return this.string.slice(e, t);
        }
      };
      function br(n) {
        return (e, t, i, r) => new To(e, n, t, i, r);
      }
      var gr = class {
        constructor(e, t, i, r, s, o) {
          this.parser = e, this.parse = t, this.overlay = i, this.bracketed = r, this.target = s, this.from = o;
        }
      };
      function oc(n) {
        if (!n.length || n.some((e) => e.from >= e.to)) throw new RangeError("Invalid inner parse ranges given: " + JSON.stringify(n));
      }
      var Po = class {
        constructor(e, t, i, r, s, o, l, a) {
          this.parser = e, this.predicate = t, this.mounts = i, this.index = r, this.start = s, this.bracketed = o, this.target = l, this.prev = a, this.depth = 0, this.ranges = [];
        }
      }, vo = new A({ perNode: true }), To = class {
        constructor(e, t, i, r, s) {
          this.nest = t, this.input = i, this.fragments = r, this.ranges = s, this.inner = [], this.innerDone = 0, this.baseTree = null, this.stoppedAt = null, this.baseParse = e;
        }
        advance() {
          if (this.baseParse) {
            let i = this.baseParse.advance();
            if (!i) return null;
            if (this.baseParse = null, this.baseTree = i, this.startInner(), this.stoppedAt != null) for (let r of this.inner) r.parse.stopAt(this.stoppedAt);
          }
          if (this.innerDone == this.inner.length) {
            let i = this.baseTree;
            return this.stoppedAt != null && (i = new z(i.type, i.children, i.positions, i.length, i.propValues.concat([[vo, this.stoppedAt]]))), i;
          }
          let e = this.inner[this.innerDone], t = e.parse.advance();
          if (t) {
            this.innerDone++;
            let i = Object.assign(/* @__PURE__ */ Object.create(null), e.target.props);
            i[A.mounted.id] = new yt(t, e.overlay, e.parser, e.bracketed), e.target.props = i;
          }
          return null;
        }
        get parsedPos() {
          if (this.baseParse) return 0;
          let e = this.input.length;
          for (let t = this.innerDone; t < this.inner.length; t++) this.inner[t].from < e && (e = Math.min(e, this.inner[t].parse.parsedPos));
          return e;
        }
        stopAt(e) {
          if (this.stoppedAt = e, this.baseParse) this.baseParse.stopAt(e);
          else for (let t = this.innerDone; t < this.inner.length; t++) this.inner[t].parse.stopAt(e);
        }
        startInner() {
          let e = new Co(this.fragments), t = null, i = null, r = new Qi(new Se(this.baseTree, this.ranges[0].from, 0, null), E.IncludeAnonymous | E.IgnoreMounts);
          e: for (let s, o; ; ) {
            let l = true, a;
            if (this.stoppedAt != null && r.from >= this.stoppedAt) l = false;
            else if (e.hasNode(r)) {
              if (t) {
                let h7 = t.mounts.find((c) => c.frag.from <= r.from && c.frag.to >= r.to && c.mount.overlay);
                if (h7) for (let c of h7.mount.overlay) {
                  let f = c.from + h7.pos, u = c.to + h7.pos;
                  f >= r.from && u <= r.to && !t.ranges.some((d) => d.from < u && d.to > f) && t.ranges.push({ from: f, to: u });
                }
              }
              l = false;
            } else if (i && (o = Yp(i.ranges, r.from, r.to))) l = o != 2;
            else if (!r.type.isAnonymous && (s = this.nest(r, this.input)) && (r.from < r.to || !s.overlay)) {
              r.tree || (_p(r), t && t.depth++, i && i.depth++);
              let h7 = e.findMounts(r.from, s.parser);
              if (typeof s.overlay == "function") t = new Po(s.parser, s.overlay, h7, this.inner.length, r.from, !!s.bracketed, r.tree, t);
              else {
                let c = ac(this.ranges, s.overlay || (r.from < r.to ? [new ge(r.from, r.to)] : []));
                c.length && oc(c), (c.length || !s.overlay) && this.inner.push(new gr(s.parser, c.length ? s.parser.startParse(this.input, hc(h7, c), c) : s.parser.startParse(""), s.overlay ? s.overlay.map((f) => new ge(f.from - r.from, f.to - r.from)) : null, !!s.bracketed, r.tree, c.length ? c[0].from : r.from)), s.overlay ? c.length && (i = { ranges: c, depth: 0, prev: i }) : l = false;
              }
            } else if (t && (a = t.predicate(r)) && (a === true && (a = new ge(r.from, r.to)), a.from < a.to)) {
              let h7 = t.ranges.length - 1;
              h7 >= 0 && t.ranges[h7].to == a.from ? t.ranges[h7] = { from: t.ranges[h7].from, to: a.to } : t.ranges.push(a);
            }
            if (l && r.firstChild()) t && t.depth++, i && i.depth++;
            else for (; !r.nextSibling(); ) {
              if (!r.parent()) break e;
              if (t && !--t.depth) {
                let h7 = ac(this.ranges, t.ranges);
                h7.length && (oc(h7), this.inner.splice(t.index, 0, new gr(t.parser, t.parser.startParse(this.input, hc(t.mounts, h7), h7), t.ranges.map((c) => new ge(c.from - t.start, c.to - t.start)), t.bracketed, t.target, h7[0].from))), t = t.prev;
              }
              i && !--i.depth && (i = i.prev);
            }
          }
        }
      };
      function Yp(n, e, t) {
        for (let i of n) {
          if (i.from >= t) break;
          if (i.to > e) return i.from <= e && i.to >= t ? 2 : 1;
        }
        return 0;
      }
      function lc(n, e, t, i, r, s) {
        if (e < t) {
          let o = n.buffer[e + 1];
          i.push(n.slice(e, t, o)), r.push(o - s);
        }
      }
      function _p(n) {
        let { node: e } = n, t = [], i = e.context.buffer;
        do
          t.push(n.index), n.parent();
        while (!n.tree);
        let r = n.tree, s = r.children.indexOf(i), o = r.children[s], l = o.buffer, a = [s];
        function h7(c, f, u, d, O, m) {
          let g = t[m], S = [], x = [];
          lc(o, c, g, S, x, d);
          let y = l[g + 1], R = l[g + 2];
          a.push(S.length);
          let T = m ? h7(g + 4, l[g + 3], o.set.types[l[g]], y, R - y, m - 1) : e.toTree();
          return S.push(T), x.push(y - d), lc(o, l[g + 3], f, S, x, d), new z(u, S, x, O);
        }
        r.children[s] = h7(0, l.length, J.none, 0, o.length, t.length - 1);
        for (let c of a) {
          let f = n.tree.children[c], u = n.tree.positions[c];
          n.yield(new Se(f, u + n.from, c, n._tree));
        }
      }
      var Sr = class {
        constructor(e, t) {
          this.offset = t, this.done = false, this.cursor = e.cursor(E.IncludeAnonymous | E.IgnoreMounts);
        }
        moveTo(e) {
          let { cursor: t } = this, i = e - this.offset;
          for (; !this.done && t.from < i; ) if (!(t.to >= e && t.enter(i, 1, E.IgnoreOverlays | E.ExcludeBuffers))) if (t.to <= e) t.next(false) || (this.done = true);
          else break;
        }
        hasNode(e) {
          if (this.moveTo(e.from), !this.done && this.cursor.from + this.offset == e.from && this.cursor.tree) for (let t = this.cursor.tree; ; ) {
            if (t == e.tree) return true;
            if (t.children.length && t.positions[0] == 0 && t.children[0] instanceof z) t = t.children[0];
            else break;
          }
          return false;
        }
      }, Co = class {
        constructor(e) {
          var t;
          if (this.fragments = e, this.curTo = 0, this.fragI = 0, e.length) {
            let i = this.curFrag = e[0];
            this.curTo = (t = i.tree.prop(vo)) !== null && t !== void 0 ? t : i.to, this.inner = new Sr(i.tree, -i.offset);
          } else this.curFrag = this.inner = null;
        }
        hasNode(e) {
          for (; this.curFrag && e.from >= this.curTo; ) this.nextFrag();
          return this.curFrag && this.curFrag.from <= e.from && this.curTo >= e.to && this.inner.hasNode(e);
        }
        nextFrag() {
          var e;
          if (this.fragI++, this.fragI == this.fragments.length) this.curFrag = this.inner = null;
          else {
            let t = this.curFrag = this.fragments[this.fragI];
            this.curTo = (e = t.tree.prop(vo)) !== null && e !== void 0 ? e : t.to, this.inner = new Sr(t.tree, -t.offset);
          }
        }
        findMounts(e, t) {
          var i;
          let r = [];
          if (this.inner) {
            this.inner.cursor.moveTo(e, 1);
            for (let s = this.inner.cursor.node; s; s = s.parent) {
              let o = (i = s.tree) === null || i === void 0 ? void 0 : i.prop(A.mounted);
              if (o && o.parser == t) for (let l = this.fragI; l < this.fragments.length; l++) {
                let a = this.fragments[l];
                if (a.from >= s.to) break;
                a.tree == this.curFrag.tree && r.push({ frag: a, pos: s.from - a.offset, mount: o });
              }
            }
          }
          return r;
        }
      };
      function ac(n, e) {
        let t = null, i = e;
        for (let r = 1, s = 0; r < n.length; r++) {
          let o = n[r - 1].to, l = n[r].from;
          for (; s < i.length; s++) {
            let a = i[s];
            if (a.from >= l) break;
            a.to <= o || (t || (i = t = e.slice()), a.from < o ? (t[s] = new ge(a.from, o), a.to > l && t.splice(s + 1, 0, new ge(l, a.to))) : a.to > l ? t[s--] = new ge(l, a.to) : t.splice(s--, 1));
          }
        }
        return i;
      }
      function Vp(n, e, t, i) {
        let r = 0, s = 0, o = false, l = false, a = -1e9, h7 = [];
        for (; ; ) {
          let c = r == n.length ? 1e9 : o ? n[r].to : n[r].from, f = s == e.length ? 1e9 : l ? e[s].to : e[s].from;
          if (o != l) {
            let u = Math.max(a, t), d = Math.min(c, f, i);
            u < d && h7.push(new ge(u, d));
          }
          if (a = Math.min(c, f), a == 1e9) break;
          c == a && (o ? (o = false, r++) : o = true), f == a && (l ? (l = false, s++) : l = true);
        }
        return h7;
      }
      function hc(n, e) {
        let t = [];
        for (let { pos: i, mount: r, frag: s } of n) {
          let o = i + (r.overlay ? r.overlay[0].from : 0), l = o + r.tree.length, a = Math.max(s.from, o), h7 = Math.min(s.to, l);
          if (r.overlay) {
            let c = r.overlay.map((u) => new ge(u.from + i, u.to + i)), f = Vp(e, c, a, h7);
            for (let u = 0, d = a; ; u++) {
              let O = u == f.length, m = O ? h7 : f[u].from;
              if (m > d && t.push(new ht(d, m, r.tree, -o, s.from >= d || s.openStart, s.to <= m || s.openEnd)), O) break;
              d = f[u].to;
            }
          } else t.push(new ht(a, h7, r.tree, -o, s.from >= o || s.openStart, s.to <= l || s.openEnd));
        }
        return t;
      }
      var Wp = 0, ke = class n {
        constructor(e, t, i, r) {
          this.name = e, this.set = t, this.base = i, this.modified = r, this.id = Wp++;
        }
        toString() {
          let { name: e } = this;
          for (let t of this.modified) t.name && (e = `${t.name}(${e})`);
          return e;
        }
        static define(e, t) {
          let i = typeof e == "string" ? e : "?";
          if (e instanceof n && (t = e), t?.base) throw new Error("Can not derive from a modified tag");
          let r = new n(i, [], null, []);
          if (r.set.push(r), t) for (let s of t.set) r.set.push(s);
          return r;
        }
        static defineModifier(e) {
          let t = new kr(e);
          return (i) => i.modified.indexOf(t) > -1 ? i : kr.get(i.base || i, i.modified.concat(t).sort((r, s) => r.id - s.id));
        }
      }, Dp = 0, kr = class n {
        constructor(e) {
          this.name = e, this.instances = [], this.id = Dp++;
        }
        static get(e, t) {
          if (!t.length) return e;
          let i = t[0].instances.find((l) => l.base == e && Bp(t, l.modified));
          if (i) return i;
          let r = [], s = new ke(e.name, r, e, t);
          for (let l of t) l.instances.push(s);
          let o = qp(t);
          for (let l of e.set) if (!l.modified.length) for (let a of o) r.push(n.get(l, a));
          return s;
        }
      };
      function Bp(n, e) {
        return n.length == e.length && n.every((t, i) => t == e[i]);
      }
      function qp(n) {
        let e = [[]];
        for (let t = 0; t < n.length; t++) for (let i = 0, r = e.length; i < r; i++) e.push(e[i].concat(n[t]));
        return e.sort((t, i) => i.length - t.length);
      }
      function We(n) {
        let e = /* @__PURE__ */ Object.create(null);
        for (let t in n) {
          let i = n[t];
          Array.isArray(i) || (i = [i]);
          for (let r of t.split(" ")) if (r) {
            let s = [], o = 2, l = r;
            for (let f = 0; ; ) {
              if (l == "..." && f > 0 && f + 3 == r.length) {
                o = 1;
                break;
              }
              let u = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);
              if (!u) throw new RangeError("Invalid path: " + r);
              if (s.push(u[0] == "*" ? "" : u[0][0] == '"' ? JSON.parse(u[0]) : u[0]), f += u[0].length, f == r.length) break;
              let d = r[f++];
              if (f == r.length && d == "!") {
                o = 0;
                break;
              }
              if (d != "/") throw new RangeError("Invalid path: " + r);
              l = r.slice(f);
            }
            let a = s.length - 1, h7 = s[a];
            if (!h7) throw new RangeError("Invalid path: " + r);
            let c = new Ht(i, o, a > 0 ? s.slice(0, a) : null);
            e[h7] = c.sort(e[h7]);
          }
        }
        return Oc.add(e);
      }
      var Oc = new A({ combine(n, e) {
        let t, i, r;
        for (; n || e; ) {
          if (!n || e && n.depth >= e.depth ? (r = e, e = e.next) : (r = n, n = n.next), t && t.mode == r.mode && !r.context && !t.context) continue;
          let s = new Ht(r.tags, r.mode, r.context);
          t ? t.next = s : i = s, t = s;
        }
        return i;
      } }), Ht = class {
        constructor(e, t, i, r) {
          this.tags = e, this.mode = t, this.context = i, this.next = r;
        }
        get opaque() {
          return this.mode == 0;
        }
        get inherit() {
          return this.mode == 1;
        }
        sort(e) {
          return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
        }
        get depth() {
          return this.context ? this.context.length : 0;
        }
      };
      Ht.empty = new Ht([], 2, null);
      function Lo(n, e) {
        let t = /* @__PURE__ */ Object.create(null);
        for (let s of n) if (!Array.isArray(s.tag)) t[s.tag.id] = s.class;
        else for (let o of s.tag) t[o.id] = s.class;
        let { scope: i, all: r = null } = e || {};
        return { style: (s) => {
          let o = r;
          for (let l of s) for (let a of l.set) {
            let h7 = t[a.id];
            if (h7) {
              o = o ? o + " " + h7 : h7;
              break;
            }
          }
          return o;
        }, scope: i };
      }
      function Ip(n, e) {
        let t = null;
        for (let i of n) {
          let r = i.style(e);
          r && (t = t ? t + " " + r : r);
        }
        return t;
      }
      function pc(n, e, t, i = 0, r = n.length) {
        let s = new Ro(i, Array.isArray(e) ? e : [e], t);
        s.highlightRange(n.cursor(), i, r, "", s.highlighters), s.flush(r);
      }
      var Ro = class {
        constructor(e, t, i) {
          this.at = e, this.highlighters = t, this.span = i, this.class = "";
        }
        startSpan(e, t) {
          t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t);
        }
        flush(e) {
          e > this.at && this.class && this.span(this.at, e, this.class);
        }
        highlightRange(e, t, i, r, s) {
          let { type: o, from: l, to: a } = e;
          if (l >= i || a <= t) return;
          o.isTop && (s = this.highlighters.filter((d) => !d.scope || d.scope(o)));
          let h7 = r, c = Np(e) || Ht.empty, f = Ip(s, c.tags);
          if (f && (h7 && (h7 += " "), h7 += f, c.mode == 1 && (r += (r ? " " : "") + f)), this.startSpan(Math.max(t, l), h7), c.opaque) return;
          let u = e.tree && e.tree.prop(A.mounted);
          if (u && u.overlay) {
            let d = e.node.enter(u.overlay[0].from + l, 1), O = this.highlighters.filter((g) => !g.scope || g.scope(u.tree.type)), m = e.firstChild();
            for (let g = 0, S = l; ; g++) {
              let x = g < u.overlay.length ? u.overlay[g] : null, y = x ? x.from + l : a, R = Math.max(t, S), T = Math.min(i, y);
              if (R < T && m) for (; e.from < T && (this.highlightRange(e, R, T, r, s), this.startSpan(Math.min(T, e.to), h7), !(e.to >= y || !e.nextSibling())); ) ;
              if (!x || y > i) break;
              S = x.to + l, S > t && (this.highlightRange(d.cursor(), Math.max(t, x.from + l), Math.min(i, S), "", O), this.startSpan(Math.min(i, S), h7));
            }
            m && e.parent();
          } else if (e.firstChild()) {
            u && (r = "");
            do
              if (!(e.to <= t)) {
                if (e.from >= i) break;
                this.highlightRange(e, t, i, r, s), this.startSpan(Math.min(i, e.to), h7);
              }
            while (e.nextSibling());
            e.parent();
          }
        }
      };
      function Np(n) {
        let e = n.type.prop(Oc);
        for (; e && e.context && !n.matchContext(e.context); ) e = e.next;
        return e || null;
      }
      var k = ke.define, yr = k(), wt = k(), uc = k(wt), dc = k(wt), $t = k(), Qr = k($t), Xo = k($t), tt = k(), Ft = k(tt), Je = k(), et = k(), Mo = k(), tn = k(Mo), xr = k(), p = { comment: yr, lineComment: k(yr), blockComment: k(yr), docComment: k(yr), name: wt, variableName: k(wt), typeName: uc, tagName: k(uc), propertyName: dc, attributeName: k(dc), className: k(wt), labelName: k(wt), namespace: k(wt), macroName: k(wt), literal: $t, string: Qr, docString: k(Qr), character: k(Qr), attributeValue: k(Qr), number: Xo, integer: k(Xo), float: k(Xo), bool: k($t), regexp: k($t), escape: k($t), color: k($t), url: k($t), keyword: Je, self: k(Je), null: k(Je), atom: k(Je), unit: k(Je), modifier: k(Je), operatorKeyword: k(Je), controlKeyword: k(Je), definitionKeyword: k(Je), moduleKeyword: k(Je), operator: et, derefOperator: k(et), arithmeticOperator: k(et), logicOperator: k(et), bitwiseOperator: k(et), compareOperator: k(et), updateOperator: k(et), definitionOperator: k(et), typeOperator: k(et), controlOperator: k(et), punctuation: Mo, separator: k(Mo), bracket: tn, angleBracket: k(tn), squareBracket: k(tn), paren: k(tn), brace: k(tn), content: tt, heading: Ft, heading1: k(Ft), heading2: k(Ft), heading3: k(Ft), heading4: k(Ft), heading5: k(Ft), heading6: k(Ft), contentSeparator: k(tt), list: k(tt), quote: k(tt), emphasis: k(tt), strong: k(tt), link: k(tt), monospace: k(tt), strikethrough: k(tt), inserted: k(), deleted: k(), changed: k(), invalid: k(), meta: xr, documentMeta: k(xr), annotation: k(xr), processingInstruction: k(xr), definition: ke.defineModifier("definition"), constant: ke.defineModifier("constant"), function: ke.defineModifier("function"), standard: ke.defineModifier("standard"), local: ke.defineModifier("local"), special: ke.defineModifier("special") };
      for (let n in p) {
        let e = p[n];
        e instanceof ke && (e.name = n);
      }
      var GS = Lo([{ tag: p.link, class: "tok-link" }, { tag: p.heading, class: "tok-heading" }, { tag: p.emphasis, class: "tok-emphasis" }, { tag: p.strong, class: "tok-strong" }, { tag: p.keyword, class: "tok-keyword" }, { tag: p.atom, class: "tok-atom" }, { tag: p.bool, class: "tok-bool" }, { tag: p.url, class: "tok-url" }, { tag: p.labelName, class: "tok-labelName" }, { tag: p.inserted, class: "tok-inserted" }, { tag: p.deleted, class: "tok-deleted" }, { tag: p.literal, class: "tok-literal" }, { tag: p.string, class: "tok-string" }, { tag: p.number, class: "tok-number" }, { tag: [p.regexp, p.escape, p.special(p.string)], class: "tok-string2" }, { tag: p.variableName, class: "tok-variableName" }, { tag: p.local(p.variableName), class: "tok-variableName tok-local" }, { tag: p.definition(p.variableName), class: "tok-variableName tok-definition" }, { tag: p.special(p.variableName), class: "tok-variableName2" }, { tag: p.definition(p.propertyName), class: "tok-propertyName tok-definition" }, { tag: p.typeName, class: "tok-typeName" }, { tag: p.namespace, class: "tok-namespace" }, { tag: p.className, class: "tok-className" }, { tag: p.macroName, class: "tok-macroName" }, { tag: p.propertyName, class: "tok-propertyName" }, { tag: p.operator, class: "tok-operator" }, { tag: p.comment, class: "tok-comment" }, { tag: p.meta, class: "tok-meta" }, { tag: p.invalid, class: "tok-invalid" }, { tag: p.punctuation, class: "tok-punctuation" }]);
      var Eo, Pt = new A();
      function ln(n) {
        return $.define({ combine: n ? (e) => e.concat(n) : void 0 });
      }
      var wr = new A(), fe = class {
        constructor(e, t, i = [], r = "") {
          this.data = e, this.name = r, D.prototype.hasOwnProperty("tree") || Object.defineProperty(D.prototype, "tree", { get() {
            return W(this);
          } }), this.parser = t, this.extension = [ki.of(this), D.languageData.of((s, o, l) => {
            let a = mc(s, o, l), h7 = a.type.prop(Pt);
            if (!h7) return [];
            let c = s.facet(h7), f = a.type.prop(wr);
            if (f) {
              let u = a.resolve(o - a.from, l);
              for (let d of f) if (d.test(u, s)) {
                let O = s.facet(d.facet);
                return d.type == "replace" ? O : O.concat(c);
              }
            }
            return c;
          })].concat(i);
        }
        isActiveAt(e, t, i = -1) {
          return mc(e, t, i).type.prop(Pt) == this.data;
        }
        findRegions(e) {
          let t = e.facet(ki);
          if (t?.data == this.data) return [{ from: 0, to: e.doc.length }];
          if (!t || !t.allowsNesting) return [];
          let i = [], r = (s, o) => {
            if (s.prop(Pt) == this.data) {
              i.push({ from: o, to: o + s.length });
              return;
            }
            let l = s.prop(A.mounted);
            if (l) {
              if (l.tree.prop(Pt) == this.data) {
                if (l.overlay) for (let a of l.overlay) i.push({ from: a.from + o, to: a.to + o });
                else i.push({ from: o, to: o + s.length });
                return;
              } else if (l.overlay) {
                let a = i.length;
                if (r(l.tree, l.overlay[0].from + o), i.length > a) return;
              }
            }
            for (let a = 0; a < s.children.length; a++) {
              let h7 = s.children[a];
              h7 instanceof z && r(h7, s.positions[a] + o);
            }
          };
          return r(W(e), 0), i;
        }
        get allowsNesting() {
          return true;
        }
      };
      fe.setState = V.define();
      function mc(n, e, t) {
        let i = n.facet(ki), r = W(n).topNode;
        if (!i || i.allowsNesting) for (let s = r; s; s = s.enter(e, t, E.ExcludeBuffers | E.EnterBracketed)) s.type.isTop && (r = s);
        return r;
      }
      var vt = class n extends fe {
        constructor(e, t, i) {
          super(e, t, [], i), this.parser = t;
        }
        static define(e) {
          let t = ln(e.languageData);
          return new n(t, e.parser.configure({ props: [Pt.add((i) => i.isTop ? t : void 0)] }), e.name);
        }
        configure(e, t) {
          return new n(this.data, this.parser.configure(e), t || this.name);
        }
        get allowsNesting() {
          return this.parser.hasWrappers();
        }
      };
      function W(n) {
        let e = n.field(fe.state, false);
        return e ? e.tree : z.empty;
      }
      var _o = class {
        constructor(e) {
          this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
        }
        get length() {
          return this.doc.length;
        }
        syncTo(e) {
          return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
        }
        chunk(e) {
          return this.syncTo(e), this.string;
        }
        get lineChunks() {
          return true;
        }
        read(e, t) {
          let i = this.cursorPos - this.string.length;
          return e < i || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - i, t - i);
        }
      }, nn = null, rn = class n {
        constructor(e, t, i = [], r, s, o, l, a) {
          this.parser = e, this.state = t, this.fragments = i, this.tree = r, this.treeLen = s, this.viewport = o, this.skipped = l, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
        }
        static create(e, t, i) {
          return new n(e, t, [], z.empty, 0, i, [], null);
        }
        startParse() {
          return this.parser.startParse(new _o(this.state.doc), this.fragments);
        }
        work(e, t) {
          return t != null && t >= this.state.doc.length && (t = void 0), this.tree != z.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), true) : this.withContext(() => {
            var i;
            if (typeof e == "number") {
              let r = Date.now() + e;
              e = () => Date.now() > r;
            }
            for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
              let r = this.parse.advance();
              if (r) if (this.fragments = this.withoutTempSkipped(ht.addTree(r, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = r, this.parse = null, this.treeLen < (t ?? this.state.doc.length)) this.parse = this.startParse();
              else return true;
              if (e()) return false;
            }
          });
        }
        takeTree() {
          let e, t;
          this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
            for (; !(t = this.parse.advance()); ) ;
          }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(ht.addTree(this.tree, this.fragments, true)), this.parse = null);
        }
        withContext(e) {
          let t = nn;
          nn = this;
          try {
            return e();
          } finally {
            nn = t;
          }
        }
        withoutTempSkipped(e) {
          for (let t; t = this.tempSkipped.pop(); ) e = gc(e, t.from, t.to);
          return e;
        }
        changes(e, t) {
          let { fragments: i, tree: r, treeLen: s, viewport: o, skipped: l } = this;
          if (this.takeTree(), !e.empty) {
            let a = [];
            if (e.iterChangedRanges((h7, c, f, u) => a.push({ fromA: h7, toA: c, fromB: f, toB: u })), i = ht.applyChanges(i, a), r = z.empty, s = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
              l = [];
              for (let h7 of this.skipped) {
                let c = e.mapPos(h7.from, 1), f = e.mapPos(h7.to, -1);
                c < f && l.push({ from: c, to: f });
              }
            }
          }
          return new n(this.parser, t, i, r, s, o, l, this.scheduleOn);
        }
        updateViewport(e) {
          if (this.viewport.from == e.from && this.viewport.to == e.to) return false;
          this.viewport = e;
          let t = this.skipped.length;
          for (let i = 0; i < this.skipped.length; i++) {
            let { from: r, to: s } = this.skipped[i];
            r < e.to && s > e.from && (this.fragments = gc(this.fragments, r, s), this.skipped.splice(i--, 1));
          }
          return this.skipped.length >= t ? false : (this.reset(), true);
        }
        reset() {
          this.parse && (this.takeTree(), this.parse = null);
        }
        skipUntilInView(e, t) {
          this.skipped.push({ from: e, to: t });
        }
        static getSkippingParser(e) {
          return new class extends kt {
            createParse(t, i, r) {
              let s = r[0].from, o = r[r.length - 1].to;
              return { parsedPos: s, advance() {
                let a = nn;
                if (a) {
                  for (let h7 of r) a.tempSkipped.push(h7);
                  e && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, e]) : e);
                }
                return this.parsedPos = o, new z(J.none, [], [], o - s);
              }, stoppedAt: null, stopAt() {
              } };
            }
          }();
        }
        isDone(e) {
          e = Math.min(e, this.state.doc.length);
          let t = this.fragments;
          return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
        }
        static get() {
          return nn;
        }
      };
      function gc(n, e, t) {
        return ht.applyChanges(n, [{ fromA: e, toA: t, fromB: e, toB: t }]);
      }
      var sn = class n {
        constructor(e) {
          this.context = e, this.tree = e.tree;
        }
        apply(e) {
          if (!e.docChanged && this.tree == this.context.tree) return this;
          let t = this.context.changes(e.changes, e.state), i = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
          return t.work(20, i) || t.takeTree(), new n(t);
        }
        static init(e) {
          let t = Math.min(3e3, e.doc.length), i = rn.create(e.facet(ki).parser, e, { from: 0, to: t });
          return i.work(20, t) || i.takeTree(), new n(i);
        }
      };
      fe.state = ye.define({ create: sn.init, update(n, e) {
        for (let t of e.effects) if (t.is(fe.setState)) return t.value;
        return e.startState.facet(ki) != e.state.facet(ki) ? sn.init(e.state) : n.apply(e);
      } });
      var xc = (n) => {
        let e = setTimeout(() => n(), 500);
        return () => clearTimeout(e);
      };
      typeof requestIdleCallback < "u" && (xc = (n) => {
        let e = -1, t = setTimeout(() => {
          e = requestIdleCallback(n, { timeout: 400 });
        }, 100);
        return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
      });
      var jo = typeof navigator < "u" && (!((Eo = navigator.scheduling) === null || Eo === void 0) && Eo.isInputPending) ? () => navigator.scheduling.isInputPending() : null, Gp = Ye.fromClass(class {
        constructor(e) {
          this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
        }
        update(e) {
          let t = this.view.state.field(fe.state).context;
          (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
        }
        scheduleWork() {
          if (this.working) return;
          let { state: e } = this.view, t = e.field(fe.state);
          (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = xc(this.work));
        }
        work(e) {
          this.working = null;
          let t = Date.now();
          if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0) return;
          let { state: i, viewport: { to: r } } = this.view, s = i.field(fe.state);
          if (s.tree == s.context.tree && s.context.isDone(r + 1e5)) return;
          let o = Date.now() + Math.min(this.chunkBudget, 100, e && !jo ? Math.max(25, e.timeRemaining() - 5) : 1e9), l = s.context.treeLen < r && i.doc.length > r + 1e3, a = s.context.work(() => jo && jo() || Date.now() > o, r + (l ? 0 : 1e5));
          this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (s.context.takeTree(), this.view.dispatch({ effects: fe.setState.of(new sn(s.context)) })), this.chunkBudget > 0 && !(a && !l) && this.scheduleWork(), this.checkAsyncSchedule(s.context);
        }
        checkAsyncSchedule(e) {
          e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => Re(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
        }
        destroy() {
          this.working && this.working();
        }
        isWorking() {
          return !!(this.working || this.workScheduled > 0);
        }
      }, { eventHandlers: { focus() {
        this.scheduleWork();
      } } }), ki = $.define({ combine(n) {
        return n.length ? n[0] : null;
      }, enables: (n) => [fe.state, Gp, C.contentAttributes.compute([n], (e) => {
        let t = e.facet(n);
        return t && t.name ? { "data-language": t.name } : {};
      })] }), Be = class {
        constructor(e, t = []) {
          this.language = e, this.support = t, this.extension = [e, t];
        }
      }, on = class n {
        constructor(e, t, i, r, s, o = void 0) {
          this.name = e, this.alias = t, this.extensions = i, this.filename = r, this.loadFunc = s, this.support = o, this.loading = null;
        }
        load() {
          return this.loading || (this.loading = this.loadFunc().then((e) => this.support = e, (e) => {
            throw this.loading = null, e;
          }));
        }
        static of(e) {
          let { load: t, support: i } = e;
          if (!t) {
            if (!i) throw new RangeError("Must pass either 'load' or 'support' to LanguageDescription.of");
            t = () => Promise.resolve(i);
          }
          return new n(e.name, (e.alias || []).concat(e.name).map((r) => r.toLowerCase()), e.extensions || [], e.filename, t, i);
        }
        static matchFilename(e, t) {
          for (let r of e) if (r.filename && r.filename.test(t)) return r;
          let i = /\.([^.]+)$/.exec(t);
          if (i) {
            for (let r of e) if (r.extensions.indexOf(i[1]) > -1) return r;
          }
          return null;
        }
        static matchLanguageName(e, t, i = true) {
          t = t.toLowerCase();
          for (let r of e) if (r.alias.some((s) => s == t)) return r;
          if (i) for (let r of e) for (let s of r.alias) {
            let o = t.indexOf(s);
            if (o > -1 && (s.length > 2 || !/\w/.test(t[o - 1]) && !/\w/.test(t[o + s.length]))) return r;
          }
          return null;
        }
      }, Up = $.define(), Tt = $.define({ combine: (n) => {
        if (!n.length) return "  ";
        let e = n[0];
        if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0])) throw new Error("Invalid indent unit: " + JSON.stringify(n[0]));
        return e;
      } });
      function an(n) {
        let e = n.facet(Tt);
        return e.charCodeAt(0) == 9 ? n.tabSize * e.length : e.length;
      }
      function $i(n, e) {
        let t = "", i = n.tabSize, r = n.facet(Tt)[0];
        if (r == "	") {
          for (; e >= i; ) t += "	", e -= i;
          r = " ";
        }
        for (let s = 0; s < e; s++) t += r;
        return t;
      }
      function $r(n, e) {
        n instanceof D && (n = new Kt(n));
        for (let i of n.state.facet(Up)) {
          let r = i(n, e);
          if (r !== void 0) return r;
        }
        let t = W(n.state);
        return t.length >= e ? Fp(n, t, e) : null;
      }
      var Kt = class {
        constructor(e, t = {}) {
          this.state = e, this.options = t, this.unit = an(e);
        }
        lineAt(e, t = 1) {
          let i = this.state.doc.lineAt(e), { simulateBreak: r, simulateDoubleBreak: s } = this.options;
          return r != null && r >= i.from && r <= i.to ? s && r == e ? { text: "", from: e } : (t < 0 ? r < e : r <= e) ? { text: i.text.slice(r - i.from), from: r } : { text: i.text.slice(0, r - i.from), from: i.from } : i;
        }
        textAfterPos(e, t = 1) {
          if (this.options.simulateDoubleBreak && e == this.options.simulateBreak) return "";
          let { text: i, from: r } = this.lineAt(e, t);
          return i.slice(e - r, Math.min(i.length, e + 100 - r));
        }
        column(e, t = 1) {
          let { text: i, from: r } = this.lineAt(e, t), s = this.countColumn(i, e - r), o = this.options.overrideIndentation ? this.options.overrideIndentation(r) : -1;
          return o > -1 && (s += o - this.countColumn(i, i.search(/\S|$/))), s;
        }
        countColumn(e, t = e.length) {
          return Qe(e, this.state.tabSize, t);
        }
        lineIndent(e, t = 1) {
          let { text: i, from: r } = this.lineAt(e, t), s = this.options.overrideIndentation;
          if (s) {
            let o = s(r);
            if (o > -1) return o;
          }
          return this.countColumn(i, i.search(/\S|$/));
        }
        get simulatedBreak() {
          return this.options.simulateBreak || null;
        }
      }, ct = new A();
      function Fp(n, e, t) {
        let i = e.resolveStack(t), r = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
        if (r != i.node) {
          let s = [];
          for (let o = r; o && !(o.from < i.node.from || o.to > i.node.to || o.from == i.node.from && o.type == i.node.type); o = o.parent) s.push(o);
          for (let o = s.length - 1; o >= 0; o--) i = { node: s[o], next: i };
        }
        return kc(i, n, t);
      }
      function kc(n, e, t) {
        for (let i = n; i; i = i.next) {
          let r = Kp(i.node);
          if (r) return r(Vo.create(e, t, i));
        }
        return 0;
      }
      function Hp(n) {
        return n.pos == n.options.simulateBreak && n.options.simulateDoubleBreak;
      }
      function Kp(n) {
        let e = n.type.prop(ct);
        if (e) return e;
        let t = n.firstChild, i;
        if (t && (i = t.type.prop(A.closedBy))) {
          let r = n.lastChild, s = r && i.indexOf(r.name) > -1;
          return (o) => $c(o, true, 1, void 0, s && !Hp(o) ? r.from : void 0);
        }
        return n.parent == null ? Jp : null;
      }
      function Jp() {
        return 0;
      }
      var Vo = class n extends Kt {
        constructor(e, t, i) {
          super(e.state, e.options), this.base = e, this.pos = t, this.context = i;
        }
        get node() {
          return this.context.node;
        }
        static create(e, t, i) {
          return new n(e, t, i);
        }
        get textAfter() {
          return this.textAfterPos(this.pos);
        }
        get baseIndent() {
          return this.baseIndentFor(this.node);
        }
        baseIndentFor(e) {
          let t = this.state.doc.lineAt(e.from);
          for (; ; ) {
            let i = e.resolve(t.from);
            for (; i.parent && i.parent.from == i.from; ) i = i.parent;
            if (em(i, e)) break;
            t = this.state.doc.lineAt(i.from);
          }
          return this.lineIndent(t.from);
        }
        continue() {
          return kc(this.context.next, this.base, this.pos);
        }
      };
      function em(n, e) {
        for (let t = e; t; t = t.parent) if (n == t) return true;
        return false;
      }
      function tm(n) {
        let e = n.node, t = e.childAfter(e.from), i = e.lastChild;
        if (!t) return null;
        let r = n.options.simulateBreak, s = n.state.doc.lineAt(t.from), o = r == null || r <= s.from ? s.to : Math.min(s.to, r);
        for (let l = t.to; ; ) {
          let a = e.childAfter(l);
          if (!a || a == i) return null;
          if (!a.type.isSkipped) {
            if (a.from >= o) return null;
            let h7 = /^ */.exec(s.text.slice(t.to - s.from))[0].length;
            return { from: t.from, to: t.to + h7 };
          }
          l = a.to;
        }
      }
      function wc({ closing: n, align: e = true, units: t = 1 }) {
        return (i) => $c(i, e, t, n);
      }
      function $c(n, e, t, i, r) {
        let s = n.textAfter, o = s.match(/^\s*/)[0].length, l = i && s.slice(o, o + i.length) == i || r == n.pos + o, a = e ? tm(n) : null;
        return a ? l ? n.column(a.from) : n.column(a.to) : n.baseIndent + (l ? 0 : n.unit * t);
      }
      var Pc = (n) => n.baseIndent;
      function Pi({ except: n, units: e = 1 } = {}) {
        return (t) => {
          let i = n && n.test(t.textAfter);
          return t.baseIndent + (i ? 0 : e * t.unit);
        };
      }
      var im = 200;
      function vc() {
        return D.transactionFilter.of((n) => {
          if (!n.docChanged || !n.isUserEvent("input.type") && !n.isUserEvent("input.complete")) return n;
          let e = n.startState.languageDataAt("indentOnInput", n.startState.selection.main.head);
          if (!e.length) return n;
          let t = n.newDoc, { head: i } = n.newSelection.main, r = t.lineAt(i);
          if (i > r.from + im) return n;
          let s = t.sliceString(r.from, i);
          if (!e.some((h7) => h7.test(s))) return n;
          let { state: o } = n, l = -1, a = [];
          for (let { head: h7 } of o.selection.ranges) {
            let c = o.doc.lineAt(h7);
            if (c.from == l) continue;
            l = c.from;
            let f = $r(o, c.from);
            if (f == null) continue;
            let u = /^\s*/.exec(c.text)[0], d = $i(o, f);
            u != d && a.push({ from: c.from, to: c.from + u.length, insert: d });
          }
          return a.length ? [n, { changes: a, sequential: true }] : n;
        });
      }
      var Tc = $.define(), ft = new A();
      function Pr(n) {
        let e = n.firstChild, t = n.lastChild;
        return e && e.to < t.from ? { from: e.to, to: t.type.isError ? n.to : t.from } : null;
      }
      var wi = class n {
        constructor(e, t) {
          this.specs = e;
          let i;
          function r(l) {
            let a = Ce.newName();
            return (i || (i = /* @__PURE__ */ Object.create(null)))["." + a] = l, a;
          }
          let s = typeof t.all == "string" ? t.all : t.all ? r(t.all) : void 0, o = t.scope;
          this.scope = o instanceof fe ? (l) => l.prop(Pt) == o.data : o ? (l) => l == o : void 0, this.style = Lo(e.map((l) => ({ tag: l.tag, class: l.class || r(Object.assign({}, l, { tag: null })) })), { all: s }).style, this.module = i ? new Ce(i) : null, this.themeType = t.themeType;
        }
        static define(e, t) {
          return new n(e, t || {});
        }
      }, Wo = $.define(), Cc = $.define({ combine(n) {
        return n.length ? [n[0]] : null;
      } });
      function zo(n) {
        let e = n.facet(Wo);
        return e.length ? e : n.facet(Cc);
      }
      function Zc(n, e) {
        let t = [nm], i;
        return n instanceof wi && (n.module && t.push(C.styleModule.of(n.module)), i = n.themeType), e?.fallback ? t.push(Cc.of(n)) : i ? t.push(Wo.computeN([C.darkTheme], (r) => r.facet(C.darkTheme) == (i == "dark") ? [n] : [])) : t.push(Wo.of(n)), t;
      }
      var Do = class {
        constructor(e) {
          this.markCache = /* @__PURE__ */ Object.create(null), this.tree = W(e.state), this.decorations = this.buildDeco(e, zo(e.state)), this.decoratedTo = e.viewport.to;
        }
        update(e) {
          let t = W(e.state), i = zo(e.state), r = i != zo(e.startState), { viewport: s } = e.view, o = e.changes.mapPos(this.decoratedTo, 1);
          t.length < s.to && !r && t.type == this.tree.type && o >= s.to ? (this.decorations = this.decorations.map(e.changes), this.decoratedTo = o) : (t != this.tree || e.viewportChanged || r) && (this.tree = t, this.decorations = this.buildDeco(e.view, i), this.decoratedTo = s.to);
        }
        buildDeco(e, t) {
          if (!t || !this.tree.length) return Y.none;
          let i = new Vt();
          for (let { from: r, to: s } of e.visibleRanges) pc(this.tree, t, (o, l, a) => {
            i.add(o, l, this.markCache[a] || (this.markCache[a] = Y.mark({ class: a })));
          }, r, s);
          return i.finish();
        }
      }, nm = Fe.high(Ye.fromClass(Do, { decorations: (n) => n.decorations })), nb = wi.define([{ tag: p.meta, color: "#404740" }, { tag: p.link, textDecoration: "underline" }, { tag: p.heading, textDecoration: "underline", fontWeight: "bold" }, { tag: p.emphasis, fontStyle: "italic" }, { tag: p.strong, fontWeight: "bold" }, { tag: p.strikethrough, textDecoration: "line-through" }, { tag: p.keyword, color: "#708" }, { tag: [p.atom, p.bool, p.url, p.contentSeparator, p.labelName], color: "#219" }, { tag: [p.literal, p.inserted], color: "#164" }, { tag: [p.string, p.deleted], color: "#a11" }, { tag: [p.regexp, p.escape, p.special(p.string)], color: "#e40" }, { tag: p.definition(p.variableName), color: "#00f" }, { tag: p.local(p.variableName), color: "#30a" }, { tag: [p.typeName, p.namespace], color: "#085" }, { tag: p.className, color: "#167" }, { tag: [p.special(p.variableName), p.macroName], color: "#256" }, { tag: p.definition(p.propertyName), color: "#00c" }, { tag: p.comment, color: "#940" }, { tag: p.invalid, color: "#f00" }]), rm = C.baseTheme({ "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" }, "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" } }), Ac = 1e4, Xc = "()[]{}", Rc = $.define({ combine(n) {
        return Wt(n, { afterCursor: true, brackets: Xc, maxScanDistance: Ac, renderMatch: lm });
      } }), sm = Y.mark({ class: "cm-matchingBracket" }), om = Y.mark({ class: "cm-nonmatchingBracket" });
      function lm(n) {
        let e = [], t = n.matched ? sm : om;
        return e.push(t.range(n.start.from, n.start.to)), n.end && e.push(t.range(n.end.from, n.end.to)), e;
      }
      function Sc(n) {
        let e = [], t = n.facet(Rc);
        for (let i of n.selection.ranges) {
          if (!i.empty) continue;
          let r = De(n, i.head, -1, t) || i.head > 0 && De(n, i.head - 1, 1, t) || t.afterCursor && (De(n, i.head, 1, t) || i.head < n.doc.length && De(n, i.head + 1, -1, t));
          r && (e = e.concat(t.renderMatch(r, n)));
        }
        return Y.set(e, true);
      }
      var am = Ye.fromClass(class {
        constructor(n) {
          this.paused = false, this.decorations = Sc(n.state);
        }
        update(n) {
          (n.docChanged || n.selectionSet || this.paused) && (n.view.composing ? (this.decorations = this.decorations.map(n.changes), this.paused = true) : (this.decorations = Sc(n.state), this.paused = false));
        }
      }, { decorations: (n) => n.decorations }), hm = [am, rm];
      function Mc(n = {}) {
        return [Rc.of(n), hm];
      }
      var Io = new A();
      function Bo(n, e, t) {
        let i = n.prop(e < 0 ? A.openedBy : A.closedBy);
        if (i) return i;
        if (n.name.length == 1) {
          let r = t.indexOf(n.name);
          if (r > -1 && r % 2 == (e < 0 ? 1 : 0)) return [t[r + e]];
        }
        return null;
      }
      function qo(n) {
        let e = n.type.prop(Io);
        return e ? e(n.node) : n;
      }
      function De(n, e, t, i = {}) {
        let r = i.maxScanDistance || Ac, s = i.brackets || Xc, o = W(n), l = o.resolveInner(e, t);
        for (let a = l; a; a = a.parent) {
          let h7 = Bo(a.type, t, s);
          if (h7 && a.from < a.to) {
            let c = qo(a);
            if (c && (t > 0 ? e >= c.from && e < c.to : e > c.from && e <= c.to)) return cm(n, e, t, a, c, h7, s);
          }
        }
        return fm(n, e, t, o, l.type, r, s);
      }
      function cm(n, e, t, i, r, s, o) {
        let l = i.parent, a = { from: r.from, to: r.to }, h7 = 0, c = l?.cursor();
        if (c && (t < 0 ? c.childBefore(i.from) : c.childAfter(i.to))) do
          if (t < 0 ? c.to <= i.from : c.from >= i.to) {
            if (h7 == 0 && s.indexOf(c.type.name) > -1 && c.from < c.to) {
              let f = qo(c);
              return { start: a, end: f ? { from: f.from, to: f.to } : void 0, matched: true };
            } else if (Bo(c.type, t, o)) h7++;
            else if (Bo(c.type, -t, o)) {
              if (h7 == 0) {
                let f = qo(c);
                return { start: a, end: f && f.from < f.to ? { from: f.from, to: f.to } : void 0, matched: false };
              }
              h7--;
            }
          }
        while (t < 0 ? c.prevSibling() : c.nextSibling());
        return { start: a, matched: false };
      }
      function fm(n, e, t, i, r, s, o) {
        if (t < 0 ? !e : e == n.doc.length) return null;
        let l = t < 0 ? n.sliceDoc(e - 1, e) : n.sliceDoc(e, e + 1), a = o.indexOf(l);
        if (a < 0 || a % 2 == 0 != t > 0) return null;
        let h7 = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, c = n.doc.iterRange(e, t > 0 ? n.doc.length : 0), f = 0;
        for (let u = 0; !c.next().done && u <= s; ) {
          let d = c.value;
          t < 0 && (u += d.length);
          let O = e + u * t;
          for (let m = t > 0 ? 0 : d.length - 1, g = t > 0 ? d.length : -1; m != g; m += t) {
            let S = o.indexOf(d[m]);
            if (!(S < 0 || i.resolveInner(O + m, 1).type != r)) if (S % 2 == 0 == t > 0) f++;
            else {
              if (f == 1) return { start: h7, end: { from: O + m, to: O + m + 1 }, matched: S >> 1 == a >> 1 };
              f--;
            }
          }
          t > 0 && (u += d.length);
        }
        return c.done ? { start: h7, matched: false } : null;
      }
      var um = /* @__PURE__ */ Object.create(null), bc = [J.none];
      var yc = [], Qc = /* @__PURE__ */ Object.create(null), dm = /* @__PURE__ */ Object.create(null);
      for (let [n, e] of [["variable", "variableName"], ["variable-2", "variableName.special"], ["string-2", "string.special"], ["def", "variableName.definition"], ["tag", "tagName"], ["attribute", "attributeName"], ["type", "typeName"], ["builtin", "variableName.standard"], ["qualifier", "modifier"], ["error", "invalid"], ["header", "heading"], ["property", "propertyName"]]) dm[n] = Om(um, e);
      function Yo(n, e) {
        yc.indexOf(n) > -1 || (yc.push(n), console.warn(e));
      }
      function Om(n, e) {
        let t = [];
        for (let l of e.split(" ")) {
          let a = [];
          for (let h7 of l.split(".")) {
            let c = n[h7] || p[h7];
            c ? typeof c == "function" ? a.length ? a = a.map(c) : Yo(h7, `Modifier ${h7} used at start of tag`) : a.length ? Yo(h7, `Tag ${h7} used as modifier`) : a = Array.isArray(c) ? c : [c] : Yo(h7, `Unknown highlighting tag ${h7}`);
          }
          for (let h7 of a) t.push(h7);
        }
        if (!t.length) return 0;
        let i = e.replace(/ /g, "_"), r = i + " " + t.map((l) => l.id), s = Qc[r];
        if (s) return s.id;
        let o = Qc[r] = J.define({ id: bc.length, name: i, props: [We({ [i]: t })] });
        return bc.push(o), o.id;
      }
      var rb = { rtl: Y.mark({ class: "cm-iso", inclusive: true, attributes: { dir: "rtl" }, bidiIsolate: U.RTL }), ltr: Y.mark({ class: "cm-iso", inclusive: true, attributes: { dir: "ltr" }, bidiIsolate: U.LTR }), auto: Y.mark({ class: "cm-iso", inclusive: true, attributes: { dir: "auto" }, bidiIsolate: null }) };
      var pm = (n) => {
        let { state: e } = n, t = e.doc.lineAt(e.selection.main.from), i = Jo(n.state, t.from);
        return i.line ? mm(n) : i.block ? Sm(n) : false;
      };
      function Ko(n, e) {
        return ({ state: t, dispatch: i }) => {
          if (t.readOnly) return false;
          let r = n(e, t);
          return r ? (i(t.update(r)), true) : false;
        };
      }
      var mm = Ko(Qm, 0);
      var gm = Ko(Dc, 0);
      var Sm = Ko((n, e) => Dc(n, e, ym(e)), 0);
      function Jo(n, e) {
        let t = n.languageDataAt("commentTokens", e, 1);
        return t.length ? t[0] : {};
      }
      var hn = 50;
      function bm(n, { open: e, close: t }, i, r) {
        let s = n.sliceDoc(i - hn, i), o = n.sliceDoc(r, r + hn), l = /\s*$/.exec(s)[0].length, a = /^\s*/.exec(o)[0].length, h7 = s.length - l;
        if (s.slice(h7 - e.length, h7) == e && o.slice(a, a + t.length) == t) return { open: { pos: i - l, margin: l && 1 }, close: { pos: r + a, margin: a && 1 } };
        let c, f;
        r - i <= 2 * hn ? c = f = n.sliceDoc(i, r) : (c = n.sliceDoc(i, i + hn), f = n.sliceDoc(r - hn, r));
        let u = /^\s*/.exec(c)[0].length, d = /\s*$/.exec(f)[0].length, O = f.length - d - t.length;
        return c.slice(u, u + e.length) == e && f.slice(O, O + t.length) == t ? { open: { pos: i + u + e.length, margin: /\s/.test(c.charAt(u + e.length)) ? 1 : 0 }, close: { pos: r - d - t.length, margin: /\s/.test(f.charAt(O - 1)) ? 1 : 0 } } : null;
      }
      function ym(n) {
        let e = [];
        for (let t of n.selection.ranges) {
          let i = n.doc.lineAt(t.from), r = t.to <= i.to ? i : n.doc.lineAt(t.to);
          r.from > i.from && r.from == t.to && (r = t.to == i.to + 1 ? i : n.doc.lineAt(t.to - 1));
          let s = e.length - 1;
          s >= 0 && e[s].to > i.from ? e[s].to = r.to : e.push({ from: i.from + /^\s*/.exec(i.text)[0].length, to: r.to });
        }
        return e;
      }
      function Dc(n, e, t = e.selection.ranges) {
        let i = t.map((s) => Jo(e, s.from).block);
        if (!i.every((s) => s)) return null;
        let r = t.map((s, o) => bm(e, i[o], s.from, s.to));
        if (n != 2 && !r.every((s) => s)) return { changes: e.changes(t.map((s, o) => r[o] ? [] : [{ from: s.from, insert: i[o].open + " " }, { from: s.to, insert: " " + i[o].close }])) };
        if (n != 1 && r.some((s) => s)) {
          let s = [];
          for (let o = 0, l; o < r.length; o++) if (l = r[o]) {
            let a = i[o], { open: h7, close: c } = l;
            s.push({ from: h7.pos - a.open.length, to: h7.pos + h7.margin }, { from: c.pos - c.margin, to: c.pos + a.close.length });
          }
          return { changes: s };
        }
        return null;
      }
      function Qm(n, e, t = e.selection.ranges) {
        let i = [], r = -1;
        e: for (let { from: s, to: o } of t) {
          let l = i.length, a = 1e9, h7;
          for (let c = s; c <= o; ) {
            let f = e.doc.lineAt(c);
            if (h7 == null && (h7 = Jo(e, f.from).line, !h7)) continue e;
            if (f.from > r && (s == o || o > f.from)) {
              r = f.from;
              let u = /^\s*/.exec(f.text)[0].length, d = u == f.length, O = f.text.slice(u, u + h7.length) == h7 ? u : -1;
              u < f.text.length && u < a && (a = u), i.push({ line: f, comment: O, token: h7, indent: u, empty: d, single: false });
            }
            c = f.to + 1;
          }
          if (a < 1e9) for (let c = l; c < i.length; c++) i[c].indent < i[c].line.text.length && (i[c].indent = a);
          i.length == l + 1 && (i[l].single = true);
        }
        if (n != 2 && i.some((s) => s.comment < 0 && (!s.empty || s.single))) {
          let s = [];
          for (let { line: l, token: a, indent: h7, empty: c, single: f } of i) (f || !c) && s.push({ from: l.from + h7, insert: a + " " });
          let o = e.changes(s);
          return { changes: o, selection: e.selection.map(o, 1) };
        } else if (n != 1 && i.some((s) => s.comment >= 0)) {
          let s = [];
          for (let { line: o, comment: l, token: a } of i) if (l >= 0) {
            let h7 = o.from + l, c = h7 + a.length;
            o.text[c - o.from] == " " && c++, s.push({ from: h7, to: c });
          }
          return { changes: s };
        }
        return null;
      }
      var Go = Oe.define(), xm = Oe.define(), km = $.define(), Bc = $.define({ combine(n) {
        return Wt(n, { minDepth: 100, newGroupDelay: 500, joinToEvent: (e, t) => t }, { minDepth: Math.max, newGroupDelay: Math.min, joinToEvent: (e, t) => (i, r) => e(i, r) || t(i, r) });
      } }), qc = ye.define({ create() {
        return Jt.empty;
      }, update(n, e) {
        let t = e.state.facet(Bc), i = e.annotation(Go);
        if (i) {
          let a = qe.fromTransaction(e, i.selection), h7 = i.side, c = h7 == 0 ? n.undone : n.done;
          return a ? c = Tr(c, c.length, t.minDepth, a) : c = Uc(c, e.startState.selection), new Jt(h7 == 0 ? i.rest : c, h7 == 0 ? c : i.rest);
        }
        let r = e.annotation(xm);
        if ((r == "full" || r == "before") && (n = n.isolate()), e.annotation(ee.addToHistory) === false) return e.changes.empty ? n : n.addMapping(e.changes.desc);
        let s = qe.fromTransaction(e), o = e.annotation(ee.time), l = e.annotation(ee.userEvent);
        return s ? n = n.addChanges(s, o, l, t, e) : e.selection && (n = n.addSelection(e.startState.selection, o, l, t.newGroupDelay)), (r == "full" || r == "after") && (n = n.isolate()), n;
      }, toJSON(n) {
        return { done: n.done.map((e) => e.toJSON()), undone: n.undone.map((e) => e.toJSON()) };
      }, fromJSON(n) {
        return new Jt(n.done.map(qe.fromJSON), n.undone.map(qe.fromJSON));
      } });
      function Ic(n = {}) {
        return [qc, Bc.of(n), C.domEventHandlers({ beforeinput(e, t) {
          let i = e.inputType == "historyUndo" ? Nc : e.inputType == "historyRedo" ? Uo : null;
          return i ? (e.preventDefault(), i(t)) : false;
        } })];
      }
      function Cr(n, e) {
        return function({ state: t, dispatch: i }) {
          if (!e && t.readOnly) return false;
          let r = t.field(qc, false);
          if (!r) return false;
          let s = r.pop(n, t, e);
          return s ? (i(s), true) : false;
        };
      }
      var Nc = Cr(0, false), Uo = Cr(1, false), wm = Cr(0, true), $m = Cr(1, true);
      var qe = class n {
        constructor(e, t, i, r, s) {
          this.changes = e, this.effects = t, this.mapped = i, this.startSelection = r, this.selectionsAfter = s;
        }
        setSelAfter(e) {
          return new n(this.changes, this.effects, this.mapped, this.startSelection, e);
        }
        toJSON() {
          var e, t, i;
          return { changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(), mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(), startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(), selectionsAfter: this.selectionsAfter.map((r) => r.toJSON()) };
        }
        static fromJSON(e) {
          return new n(e.changes && ae.fromJSON(e.changes), [], e.mapped && nt.fromJSON(e.mapped), e.startSelection && b.fromJSON(e.startSelection), e.selectionsAfter.map(b.fromJSON));
        }
        static fromTransaction(e, t) {
          let i = Me;
          for (let r of e.startState.facet(km)) {
            let s = r(e);
            s.length && (i = i.concat(s));
          }
          return !i.length && e.changes.empty ? null : new n(e.changes.invert(e.startState.doc), i, void 0, t || e.startState.selection, Me);
        }
        static selection(e) {
          return new n(void 0, Me, void 0, void 0, e);
        }
      };
      function Tr(n, e, t, i) {
        let r = e + 1 > t + 20 ? e - t - 1 : 0, s = n.slice(r, e);
        return s.push(i), s;
      }
      function Pm(n, e) {
        let t = [], i = false;
        return n.iterChangedRanges((r, s) => t.push(r, s)), e.iterChangedRanges((r, s, o, l) => {
          for (let a = 0; a < t.length; ) {
            let h7 = t[a++], c = t[a++];
            l >= h7 && o <= c && (i = true);
          }
        }), i;
      }
      function vm(n, e) {
        return n.ranges.length == e.ranges.length && n.ranges.filter((t, i) => t.empty != e.ranges[i].empty).length === 0;
      }
      function Gc(n, e) {
        return n.length ? e.length ? n.concat(e) : n : e;
      }
      var Me = [], Tm = 200;
      function Uc(n, e) {
        if (n.length) {
          let t = n[n.length - 1], i = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - Tm));
          return i.length && i[i.length - 1].eq(e) ? n : (i.push(e), Tr(n, n.length - 1, 1e9, t.setSelAfter(i)));
        } else return [qe.selection([e])];
      }
      function Cm(n) {
        let e = n[n.length - 1], t = n.slice();
        return t[n.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
      }
      function No(n, e) {
        if (!n.length) return n;
        let t = n.length, i = Me;
        for (; t; ) {
          let r = Zm(n[t - 1], e, i);
          if (r.changes && !r.changes.empty || r.effects.length) {
            let s = n.slice(0, t);
            return s[t - 1] = r, s;
          } else e = r.mapped, t--, i = r.selectionsAfter;
        }
        return i.length ? [qe.selection(i)] : Me;
      }
      function Zm(n, e, t) {
        let i = Gc(n.selectionsAfter.length ? n.selectionsAfter.map((l) => l.map(e)) : Me, t);
        if (!n.changes) return qe.selection(i);
        let r = n.changes.map(e), s = e.mapDesc(n.changes, true), o = n.mapped ? n.mapped.composeDesc(s) : s;
        return new qe(r, V.mapEffects(n.effects, e), o, n.startSelection.map(s), i);
      }
      var Am = /^(input\.type|delete)($|\.)/, Jt = class n {
        constructor(e, t, i = 0, r = void 0) {
          this.done = e, this.undone = t, this.prevTime = i, this.prevUserEvent = r;
        }
        isolate() {
          return this.prevTime ? new n(this.done, this.undone) : this;
        }
        addChanges(e, t, i, r, s) {
          let o = this.done, l = o[o.length - 1];
          return l && l.changes && !l.changes.empty && e.changes && (!i || Am.test(i)) && (!l.selectionsAfter.length && t - this.prevTime < r.newGroupDelay && r.joinToEvent(s, Pm(l.changes, e.changes)) || i == "input.type.compose") ? o = Tr(o, o.length - 1, r.minDepth, new qe(e.changes.compose(l.changes), Gc(V.mapEffects(e.effects, l.changes), l.effects), l.mapped, l.startSelection, Me)) : o = Tr(o, o.length, r.minDepth, e), new n(o, Me, t, i);
        }
        addSelection(e, t, i, r) {
          let s = this.done.length ? this.done[this.done.length - 1].selectionsAfter : Me;
          return s.length > 0 && t - this.prevTime < r && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && vm(s[s.length - 1], e) ? this : new n(Uc(this.done, e), this.undone, t, i);
        }
        addMapping(e) {
          return new n(No(this.done, e), No(this.undone, e), this.prevTime, this.prevUserEvent);
        }
        pop(e, t, i) {
          let r = e == 0 ? this.done : this.undone;
          if (r.length == 0) return null;
          let s = r[r.length - 1], o = s.selectionsAfter[0] || (s.startSelection ? s.startSelection.map(s.changes.invertedDesc, 1) : t.selection);
          if (i && s.selectionsAfter.length) return t.update({ selection: s.selectionsAfter[s.selectionsAfter.length - 1], annotations: Go.of({ side: e, rest: Cm(r), selection: o }), userEvent: e == 0 ? "select.undo" : "select.redo", scrollIntoView: true });
          if (s.changes) {
            let l = r.length == 1 ? Me : r.slice(0, r.length - 1);
            return s.mapped && (l = No(l, s.mapped)), t.update({ changes: s.changes, selection: s.startSelection, effects: s.effects, annotations: Go.of({ side: e, rest: l, selection: o }), filter: false, userEvent: e == 0 ? "undo" : "redo", scrollIntoView: true });
          } else return null;
        }
      };
      Jt.empty = new Jt(Me, Me);
      var Fc = [{ key: "Mod-z", run: Nc, preventDefault: true }, { key: "Mod-y", mac: "Mod-Shift-z", run: Uo, preventDefault: true }, { linux: "Ctrl-Shift-z", run: Uo, preventDefault: true }, { key: "Mod-u", run: wm, preventDefault: true }, { key: "Alt-u", mac: "Mod-Shift-u", run: $m, preventDefault: true }];
      function vi(n, e) {
        return b.create(n.ranges.map(e), n.mainIndex);
      }
      function Ie(n, e) {
        return n.update({ selection: e, scrollIntoView: true, userEvent: "select" });
      }
      function Ne({ state: n, dispatch: e }, t) {
        let i = vi(n.selection, t);
        return i.eq(n.selection, true) ? false : (e(Ie(n, i)), true);
      }
      function Zr(n, e) {
        return b.cursor(e ? n.to : n.from);
      }
      function Hc(n, e) {
        return Ne(n, (t) => t.empty ? n.moveByChar(t, e) : Zr(t, e));
      }
      function le(n) {
        return n.textDirectionAt(n.state.selection.main.head) == U.LTR;
      }
      var Kc = (n) => Hc(n, !le(n)), Jc = (n) => Hc(n, le(n));
      function ef(n, e) {
        return Ne(n, (t) => t.empty ? n.moveByGroup(t, e) : Zr(t, e));
      }
      var Xm = (n) => ef(n, !le(n)), Rm = (n) => ef(n, le(n));
      var ub = typeof Intl < "u" && Intl.Segmenter ? new Intl.Segmenter(void 0, { granularity: "word" }) : null;
      function Mm(n, e, t) {
        if (e.type.prop(t)) return true;
        let i = e.to - e.from;
        return i && (i > 2 || /[^\s,.;:]/.test(n.sliceDoc(e.from, e.to))) || e.firstChild;
      }
      function Ar(n, e, t) {
        let i = W(n).resolveInner(e.head), r = t ? A.closedBy : A.openedBy;
        for (let a = e.head; ; ) {
          let h7 = t ? i.childAfter(a) : i.childBefore(a);
          if (!h7) break;
          Mm(n, h7, r) ? i = h7 : a = t ? h7.to : h7.from;
        }
        let s = i.type.prop(r), o, l;
        return s && (o = t ? De(n, i.from, 1) : De(n, i.to, -1)) && o.matched ? l = t ? o.end.to : o.end.from : l = t ? i.to : i.from, b.cursor(l, t ? -1 : 1);
      }
      var Lm = (n) => Ne(n, (e) => Ar(n.state, e, !le(n))), Em = (n) => Ne(n, (e) => Ar(n.state, e, le(n)));
      function tf(n, e) {
        return Ne(n, (t) => {
          if (!t.empty) return Zr(t, e);
          let i = n.moveVertically(t, e);
          return i.head != t.head ? i : n.moveToLineBoundary(t, e);
        });
      }
      var nf = (n) => tf(n, false), rf = (n) => tf(n, true);
      function sf(n) {
        let e = n.scrollDOM.clientHeight < n.scrollDOM.scrollHeight - 2, t = 0, i = 0, r;
        if (e) {
          for (let s of n.state.facet(C.scrollMargins)) {
            let o = s(n);
            o?.top && (t = Math.max(o?.top, t)), o?.bottom && (i = Math.max(o?.bottom, i));
          }
          r = n.scrollDOM.clientHeight - t - i;
        } else r = (n.dom.ownerDocument.defaultView || window).innerHeight;
        return { marginTop: t, marginBottom: i, selfScroll: e, height: Math.max(n.defaultLineHeight, r - 5) };
      }
      function of(n, e) {
        let t = sf(n), { state: i } = n, r = vi(i.selection, (o) => o.empty ? n.moveVertically(o, e, t.height) : Zr(o, e));
        if (r.eq(i.selection)) return false;
        let s;
        if (t.selfScroll) {
          let o = n.coordsAtPos(i.selection.main.head), l = n.scrollDOM.getBoundingClientRect(), a = l.top + t.marginTop, h7 = l.bottom - t.marginBottom;
          o && o.top > a && o.bottom < h7 && (s = C.scrollIntoView(r.main.head, { y: "start", yMargin: o.top - a }));
        }
        return n.dispatch(Ie(i, r), { effects: s }), true;
      }
      var Lc = (n) => of(n, false), Fo = (n) => of(n, true);
      function Ct(n, e, t) {
        let i = n.lineBlockAt(e.head), r = n.moveToLineBoundary(e, t);
        if (r.head == e.head && r.head != (t ? i.to : i.from) && (r = n.moveToLineBoundary(e, t, false)), !t && r.head == i.from && i.length) {
          let s = /^\s*/.exec(n.state.sliceDoc(i.from, Math.min(i.from + 100, i.to)))[0].length;
          s && e.head != i.from + s && (r = b.cursor(i.from + s));
        }
        return r;
      }
      var jm = (n) => Ne(n, (e) => Ct(n, e, true)), zm = (n) => Ne(n, (e) => Ct(n, e, false)), Ym = (n) => Ne(n, (e) => Ct(n, e, !le(n))), _m = (n) => Ne(n, (e) => Ct(n, e, le(n))), Vm = (n) => Ne(n, (e) => b.cursor(n.lineBlockAt(e.head).from, 1)), Wm = (n) => Ne(n, (e) => b.cursor(n.lineBlockAt(e.head).to, -1));
      function Dm(n, e, t) {
        let i = false, r = vi(n.selection, (s) => {
          let o = De(n, s.head, -1) || De(n, s.head, 1) || s.head > 0 && De(n, s.head - 1, 1) || s.head < n.doc.length && De(n, s.head + 1, -1);
          if (!o || !o.end) return s;
          i = true;
          let l = o.start.from == s.head ? o.end.to : o.end.from;
          return t ? b.range(s.anchor, l) : b.cursor(l);
        });
        return i ? (e(Ie(n, r)), true) : false;
      }
      var Bm = ({ state: n, dispatch: e }) => Dm(n, e, false);
      function Le(n, e, t) {
        let i = vi(n.state.selection, (r) => {
          r.undirectional && r.head >= r.anchor != e && (r = b.range(r.head, r.anchor));
          let s = t(r);
          return b.range(r.anchor, s.head, s.goalColumn, s.bidiLevel || void 0, s.assoc);
        });
        return i.eq(n.state.selection) ? false : (n.dispatch(Ie(n.state, i)), true);
      }
      function lf(n, e) {
        return Le(n, e, (t) => n.moveByChar(t, e));
      }
      var af = (n) => lf(n, !le(n)), hf = (n) => lf(n, le(n));
      function cf(n, e) {
        return Le(n, e, (t) => n.moveByGroup(t, e));
      }
      var qm = (n) => cf(n, !le(n)), Im = (n) => cf(n, le(n));
      var Nm = (n) => {
        let e = !le(n);
        return Le(n, e, (t) => Ar(n.state, t, e));
      }, Gm = (n) => {
        let e = le(n);
        return Le(n, e, (t) => Ar(n.state, t, e));
      };
      function ff(n, e) {
        return Le(n, e, (t) => n.moveVertically(t, e));
      }
      var uf = (n) => ff(n, false), df = (n) => ff(n, true);
      function Of(n, e) {
        return Le(n, e, (t) => n.moveVertically(t, e, sf(n).height));
      }
      var Ec = (n) => Of(n, false), jc = (n) => Of(n, true), Um = (n) => Le(n, true, (e) => Ct(n, e, true)), Fm = (n) => Le(n, false, (e) => Ct(n, e, false)), Hm = (n) => {
        let e = !le(n);
        return Le(n, e, (t) => Ct(n, t, e));
      }, Km = (n) => {
        let e = le(n);
        return Le(n, e, (t) => Ct(n, t, e));
      }, Jm = (n) => Le(n, false, (e) => b.cursor(n.lineBlockAt(e.head).from)), eg = (n) => Le(n, true, (e) => b.cursor(n.lineBlockAt(e.head).to)), zc = ({ state: n, dispatch: e }) => (e(Ie(n, { anchor: 0 })), true), Yc = ({ state: n, dispatch: e }) => (e(Ie(n, { anchor: n.doc.length })), true), _c = ({ state: n, dispatch: e }) => (e(Ie(n, { anchor: n.selection.main.anchor, head: 0 })), true), Vc = ({ state: n, dispatch: e }) => (e(Ie(n, { anchor: n.selection.main.anchor, head: n.doc.length })), true), tg = ({ state: n, dispatch: e }) => (e(n.update({ selection: { anchor: 0, head: n.doc.length }, userEvent: "select" })), true), ig = ({ state: n, dispatch: e }) => {
        let t = Xr(n).map(({ from: i, to: r }) => b.undirectionalRange(i, Math.min(r + 1, n.doc.length)));
        return e(n.update({ selection: b.create(t), userEvent: "select" })), true;
      }, ng = ({ state: n, dispatch: e }) => {
        let t = vi(n.selection, (i) => {
          let r = W(n), s = r.resolveStack(i.from, 1);
          if (i.empty) {
            let o = r.resolveStack(i.from, -1);
            o.node.from >= s.node.from && o.node.to <= s.node.to && (s = o);
          }
          for (let o = s; o; o = o.next) {
            let { node: l } = o;
            if ((l.from < i.from && l.to >= i.to || l.to > i.to && l.from <= i.from) && o.next) return b.undirectionalRange(l.from, l.to);
          }
          return i;
        });
        return t.eq(n.selection) ? false : (e(Ie(n, t)), true);
      };
      function pf(n, e) {
        let { state: t } = n, i = t.selection, r = t.selection.ranges.slice();
        for (let s of t.selection.ranges) {
          let o = t.doc.lineAt(s.head);
          if (e ? o.to < n.state.doc.length : o.from > 0) for (let l = s; ; ) {
            let a = n.moveVertically(l, e);
            if (a.head < o.from || a.head > o.to) {
              r.some((h7) => h7.head == a.head) || r.push(a);
              break;
            } else {
              if (a.head == l.head) break;
              l = a;
            }
          }
        }
        return r.length == i.ranges.length ? false : (n.dispatch(Ie(t, b.create(r, r.length - 1))), true);
      }
      var rg = (n) => pf(n, false), sg = (n) => pf(n, true), og = ({ state: n, dispatch: e }) => {
        let t = n.selection, i = null;
        return t.ranges.length > 1 ? i = b.create([t.main]) : t.main.empty || (i = b.create([b.cursor(t.main.head)])), i ? (e(Ie(n, i)), true) : false;
      };
      function cn(n, e) {
        if (n.state.readOnly) return false;
        let t = "delete.selection", { state: i } = n, r = i.changeByRange((s) => {
          let { from: o, to: l } = s;
          if (o == l) {
            let a = e(s);
            a < o ? (t = "delete.backward", a = vr(n, a, false)) : a > o && (t = "delete.forward", a = vr(n, a, true)), o = Math.min(o, a), l = Math.max(l, a);
          } else o = vr(n, o, false), l = vr(n, l, true);
          return o == l ? { range: s } : { changes: { from: o, to: l }, range: b.cursor(o, o < s.head ? -1 : 1) };
        });
        return r.changes.empty ? false : (n.dispatch(i.update(r, { scrollIntoView: true, userEvent: t, effects: t == "delete.selection" ? C.announce.of(i.phrase("Selection deleted")) : void 0 })), true);
      }
      function vr(n, e, t) {
        if (n instanceof C) for (let i of n.state.facet(C.atomicRanges).map((r) => r(n))) i.between(e, e, (r, s) => {
          r < e && s > e && (e = t ? s : r);
        });
        return e;
      }
      var mf = (n, e, t) => cn(n, (i) => {
        let r = i.from, { state: s } = n, o = s.doc.lineAt(r), l, a;
        if (t && !e && r > o.from && r < o.from + 200 && !/[^ \t]/.test(l = o.text.slice(0, r - o.from))) {
          if (l[l.length - 1] == "	") return r - 1;
          let h7 = Qe(l, s.tabSize), c = h7 % an(s) || an(s);
          for (let f = 0; f < c && l[l.length - 1 - f] == " "; f++) r--;
          a = r;
        } else a = ie(o.text, r - o.from, e, e) + o.from, a == r && o.number != (e ? s.doc.lines : 1) ? a += e ? 1 : -1 : !e && /[\ufe00-\ufe0f]/.test(o.text.slice(a - o.from, r - o.from)) && (a = ie(o.text, a - o.from, false, false) + o.from);
        return a;
      }), Ho = (n) => mf(n, false, true);
      var gf = (n) => mf(n, true, false), Sf = (n, e) => cn(n, (t) => {
        let i = t.head, { state: r } = n, s = r.doc.lineAt(i), o = r.charCategorizer(i);
        for (let l = null; ; ) {
          if (i == (e ? s.to : s.from)) {
            i == t.head && s.number != (e ? r.doc.lines : 1) && (i += e ? 1 : -1);
            break;
          }
          let a = ie(s.text, i - s.from, e) + s.from, h7 = s.text.slice(Math.min(i, a) - s.from, Math.max(i, a) - s.from), c = o(h7);
          if (l != null && c != l) break;
          (h7 != " " || i != t.head) && (l = c), i = a;
        }
        return i;
      }), bf = (n) => Sf(n, false), lg = (n) => Sf(n, true);
      var ag = (n) => cn(n, (e) => {
        let t = n.lineBlockAt(e.head).to;
        return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
      });
      var hg = (n) => cn(n, (e) => {
        let t = n.moveToLineBoundary(e, false).head;
        return e.head > t ? t : Math.max(0, e.head - 1);
      }), cg = (n) => cn(n, (e) => {
        let t = n.moveToLineBoundary(e, true).head;
        return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
      });
      var fg = ({ state: n, dispatch: e }) => {
        if (n.readOnly) return false;
        let t = n.changeByRange((i) => ({ changes: { from: i.from, to: i.to, insert: M.of(["", ""]) }, range: b.cursor(i.from) }));
        return e(n.update(t, { scrollIntoView: true, userEvent: "input" })), true;
      }, ug = ({ state: n, dispatch: e }) => {
        if (n.readOnly) return false;
        let t = n.changeByRange((i) => {
          if (!i.empty || i.from == 0 || i.from == n.doc.length) return { range: i };
          let r = i.from, s = n.doc.lineAt(r), o = r == s.from ? r - 1 : ie(s.text, r - s.from, false) + s.from, l = r == s.to ? r + 1 : ie(s.text, r - s.from, true) + s.from;
          return { changes: { from: o, to: l, insert: n.doc.slice(r, l).append(n.doc.slice(o, r)) }, range: b.cursor(l) };
        });
        return t.changes.empty ? false : (e(n.update(t, { scrollIntoView: true, userEvent: "move.character" })), true);
      };
      function Xr(n) {
        let e = [], t = -1;
        for (let i of n.selection.ranges) {
          let r = n.doc.lineAt(i.from), s = n.doc.lineAt(i.to);
          if (!i.empty && i.to == s.from && (s = n.doc.lineAt(i.to - 1)), t >= r.number) {
            let o = e[e.length - 1];
            o.to = s.to, o.ranges.push(i);
          } else e.push({ from: r.from, to: s.to, ranges: [i] });
          t = s.number + 1;
        }
        return e;
      }
      function yf(n, e, t) {
        if (n.readOnly) return false;
        let i = [], r = [];
        for (let s of Xr(n)) {
          if (t ? s.to == n.doc.length : s.from == 0) continue;
          let o = n.doc.lineAt(t ? s.to + 1 : s.from - 1), l = o.length + 1;
          if (t) {
            i.push({ from: s.to, to: o.to }, { from: s.from, insert: o.text + n.lineBreak });
            for (let a of s.ranges) r.push(b.range(Math.min(n.doc.length, a.anchor + l), Math.min(n.doc.length, a.head + l)));
          } else {
            i.push({ from: o.from, to: s.from }, { from: s.to, insert: n.lineBreak + o.text });
            for (let a of s.ranges) r.push(b.range(a.anchor - l, a.head - l));
          }
        }
        return i.length ? (e(n.update({ changes: i, scrollIntoView: true, selection: b.create(r, n.selection.mainIndex), userEvent: "move.line" })), true) : false;
      }
      var dg = ({ state: n, dispatch: e }) => yf(n, e, false), Og = ({ state: n, dispatch: e }) => yf(n, e, true);
      function Qf(n, e, t) {
        if (n.readOnly) return false;
        let i = [];
        for (let s of Xr(n)) t ? i.push({ from: s.from, insert: n.doc.slice(s.from, s.to) + n.lineBreak }) : i.push({ from: s.to, insert: n.lineBreak + n.doc.slice(s.from, s.to) });
        let r = n.changes(i);
        return e(n.update({ changes: r, selection: n.selection.map(r, t ? 1 : -1), scrollIntoView: true, userEvent: "input.copyline" })), true;
      }
      var pg = ({ state: n, dispatch: e }) => Qf(n, e, false), mg = ({ state: n, dispatch: e }) => Qf(n, e, true), gg = (n) => {
        if (n.state.readOnly) return false;
        let { state: e } = n, t = e.changes(Xr(e).map(({ from: r, to: s }) => (r > 0 ? r-- : s < e.doc.length && s++, { from: r, to: s }))), i = vi(e.selection, (r) => {
          let s;
          if (n.lineWrapping) {
            let o = n.lineBlockAt(r.head), l = n.coordsAtPos(r.head, r.assoc || 1);
            l && (s = o.bottom + n.documentTop - l.bottom + n.defaultLineHeight / 2);
          }
          return n.moveVertically(r, true, s);
        }).map(t);
        return n.dispatch({ changes: t, selection: i, scrollIntoView: true, userEvent: "delete.line" }), true;
      };
      function Sg(n, e) {
        if (/\(\)|\[\]|\{\}/.test(n.sliceDoc(e - 1, e + 1))) return { from: e, to: e };
        let t = W(n).resolveInner(e), i = t.childBefore(e), r = t.childAfter(e), s;
        return i && r && i.to <= e && r.from >= e && (s = i.type.prop(A.closedBy)) && s.indexOf(r.name) > -1 && n.doc.lineAt(i.to).from == n.doc.lineAt(r.from).from && !/\S/.test(n.sliceDoc(i.to, r.from)) ? { from: i.to, to: r.from } : null;
      }
      var Wc = xf(false), bg = xf(true);
      function xf(n) {
        return ({ state: e, dispatch: t }) => {
          if (e.readOnly) return false;
          let i = e.changeByRange((r) => {
            let { from: s, to: o } = r, l = e.doc.lineAt(s), a = !n && s == o && Sg(e, s);
            n && (s = o = (o <= l.to ? l : e.doc.lineAt(o)).to);
            let h7 = new Kt(e, { simulateBreak: s, simulateDoubleBreak: !!a }), c = $r(h7, s);
            for (c == null && (c = Qe(/^\s*/.exec(e.doc.lineAt(s).text)[0], e.tabSize)); o < l.to && /\s/.test(l.text[o - l.from]); ) o++;
            a ? { from: s, to: o } = a : s > l.from && s < l.from + 100 && !/\S/.test(l.text.slice(0, s)) && (s = l.from);
            let f = ["", $i(e, c)];
            return a && f.push($i(e, h7.lineIndent(l.from, -1))), { changes: { from: s, to: o, insert: M.of(f) }, range: b.cursor(s + 1 + f[1].length) };
          });
          return t(e.update(i, { scrollIntoView: true, userEvent: "input" })), true;
        };
      }
      function el(n, e) {
        let t = -1;
        return n.changeByRange((i) => {
          let r = [];
          for (let o = i.from; o <= i.to; ) {
            let l = n.doc.lineAt(o);
            l.number > t && (i.empty || i.to > l.from) && (e(l, r, i), t = l.number), o = l.to + 1;
          }
          let s = n.changes(r);
          return { changes: r, range: b.range(s.mapPos(i.anchor, 1), s.mapPos(i.head, 1)) };
        });
      }
      var yg = ({ state: n, dispatch: e }) => {
        if (n.readOnly) return false;
        let t = /* @__PURE__ */ Object.create(null), i = new Kt(n, { overrideIndentation: (s) => {
          let o = t[s];
          return o ?? -1;
        } }), r = el(n, (s, o, l) => {
          let a = $r(i, s.from);
          if (a == null) return;
          /\S/.test(s.text) || (a = 0);
          let h7 = /^\s*/.exec(s.text)[0], c = $i(n, a);
          (h7 != c || l.from < s.from + h7.length) && (t[s.from] = a, o.push({ from: s.from, to: s.from + h7.length, insert: c }));
        });
        return r.changes.empty || e(n.update(r, { userEvent: "indent" })), true;
      }, kf = ({ state: n, dispatch: e }) => n.readOnly ? false : (e(n.update(el(n, (t, i) => {
        i.push({ from: t.from, insert: n.facet(Tt) });
      }), { userEvent: "input.indent" })), true), wf = ({ state: n, dispatch: e }) => n.readOnly ? false : (e(n.update(el(n, (t, i) => {
        let r = /^\s*/.exec(t.text)[0];
        if (!r) return;
        let s = Qe(r, n.tabSize), o = 0, l = $i(n, Math.max(0, s - an(n)));
        for (; o < r.length && o < l.length && r.charCodeAt(o) == l.charCodeAt(o); ) o++;
        i.push({ from: t.from + o, to: t.from + r.length, insert: l.slice(o) });
      }), { userEvent: "delete.dedent" })), true), Qg = (n) => (n.setTabFocusMode(), true);
      var xg = [{ key: "Ctrl-b", run: Kc, shift: af, preventDefault: true }, { key: "Ctrl-f", run: Jc, shift: hf }, { key: "Ctrl-p", run: nf, shift: uf }, { key: "Ctrl-n", run: rf, shift: df }, { key: "Ctrl-a", run: Vm, shift: Jm }, { key: "Ctrl-e", run: Wm, shift: eg }, { key: "Ctrl-d", run: gf }, { key: "Ctrl-h", run: Ho }, { key: "Ctrl-k", run: ag }, { key: "Ctrl-Alt-h", run: bf }, { key: "Ctrl-o", run: fg }, { key: "Ctrl-t", run: ug }, { key: "Ctrl-v", run: Fo }], kg = [{ key: "ArrowLeft", run: Kc, shift: af, preventDefault: true }, { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: Xm, shift: qm, preventDefault: true }, { mac: "Cmd-ArrowLeft", run: Ym, shift: Hm, preventDefault: true }, { key: "ArrowRight", run: Jc, shift: hf, preventDefault: true }, { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: Rm, shift: Im, preventDefault: true }, { mac: "Cmd-ArrowRight", run: _m, shift: Km, preventDefault: true }, { key: "ArrowUp", run: nf, shift: uf, preventDefault: true }, { mac: "Cmd-ArrowUp", run: zc, shift: _c }, { mac: "Ctrl-ArrowUp", run: Lc, shift: Ec }, { key: "ArrowDown", run: rf, shift: df, preventDefault: true }, { mac: "Cmd-ArrowDown", run: Yc, shift: Vc }, { mac: "Ctrl-ArrowDown", run: Fo, shift: jc }, { key: "PageUp", run: Lc, shift: Ec }, { key: "PageDown", run: Fo, shift: jc }, { key: "Home", run: zm, shift: Fm, preventDefault: true }, { key: "Mod-Home", run: zc, shift: _c }, { key: "End", run: jm, shift: Um, preventDefault: true }, { key: "Mod-End", run: Yc, shift: Vc }, { key: "Enter", run: Wc, shift: Wc }, { key: "Mod-a", run: tg }, { key: "Backspace", run: Ho, shift: Ho, preventDefault: true }, { key: "Delete", run: gf, preventDefault: true }, { key: "Mod-Backspace", mac: "Alt-Backspace", run: bf, preventDefault: true }, { key: "Mod-Delete", mac: "Alt-Delete", run: lg, preventDefault: true }, { mac: "Mod-Backspace", run: hg, preventDefault: true }, { mac: "Mod-Delete", run: cg, preventDefault: true }].concat(xg.map((n) => ({ mac: n.key, run: n.run, shift: n.shift }))), $f = [{ key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: Lm, shift: Nm }, { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: Em, shift: Gm }, { key: "Alt-ArrowUp", run: dg }, { key: "Shift-Alt-ArrowUp", run: pg }, { key: "Alt-ArrowDown", run: Og }, { key: "Shift-Alt-ArrowDown", run: mg }, { key: "Mod-Alt-ArrowUp", run: rg }, { key: "Mod-Alt-ArrowDown", run: sg }, { key: "Escape", run: og }, { key: "Mod-Enter", run: bg }, { key: "Alt-l", mac: "Ctrl-l", run: ig }, { key: "Mod-i", run: ng, preventDefault: true }, { key: "Mod-[", run: wf }, { key: "Mod-]", run: kf }, { key: "Mod-Alt-\\", run: yg }, { key: "Shift-Mod-k", run: gg }, { key: "Shift-Mod-\\", run: Bm }, { key: "Mod-/", run: pm }, { key: "Alt-A", mac: "Ctrl-A", run: gm }, { key: "Ctrl-m", mac: "Shift-Alt-m", run: Qg }].concat(kg), Pf = { key: "Tab", run: kf, shift: wf };
      var nl = class n {
        constructor(e, t, i, r, s, o, l, a, h7, c = 0, f) {
          this.p = e, this.stack = t, this.state = i, this.reducePos = r, this.pos = s, this.score = o, this.buffer = l, this.bufferBase = a, this.curContext = h7, this.lookAhead = c, this.parent = f;
        }
        toString() {
          return `[${this.stack.filter((e, t) => t % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
        }
        static start(e, t, i = 0) {
          let r = e.parser.context;
          return new n(e, [], t, i, i, 0, [], 0, r ? new Rr(r, r.start) : null, 0, null);
        }
        get context() {
          return this.curContext ? this.curContext.context : null;
        }
        pushState(e, t) {
          this.stack.push(this.state, t, this.bufferBase + this.buffer.length), this.state = e;
        }
        reduce(e) {
          var t;
          let i = e >> 19, r = e & 65535, { parser: s } = this.p, o = this.reducePos < this.pos - 25 && this.setLookAhead(this.pos), l = s.dynamicPrecedence(r);
          if (l && (this.score += l), i == 0) {
            r < s.minRepeatTerm && this.reducePos < this.pos && (this.reducePos = this.pos), this.pushState(s.getGoto(this.state, r, true), this.reducePos), r < s.minRepeatTerm && this.storeNode(r, this.reducePos, this.reducePos, o ? 8 : 4, true), this.reduceContext(r, this.reducePos);
            return;
          }
          let a = this.stack.length - (i - 1) * 3 - (e & 262144 ? 6 : 0), h7 = a ? this.stack[a - 2] : this.p.ranges[0].from;
          r < s.minRepeatTerm && h7 == this.reducePos && this.reducePos < this.pos && (this.reducePos = this.pos);
          let c = this.reducePos - h7;
          c >= 2e3 && !(!((t = this.p.parser.nodeSet.types[r]) === null || t === void 0) && t.isAnonymous) && (h7 == this.p.lastBigReductionStart ? (this.p.bigReductionCount++, this.p.lastBigReductionSize = c) : this.p.lastBigReductionSize < c && (this.p.bigReductionCount = 1, this.p.lastBigReductionStart = h7, this.p.lastBigReductionSize = c));
          let f = a ? this.stack[a - 1] : 0, u = this.bufferBase + this.buffer.length - f;
          if (r < s.minRepeatTerm || e & 131072) {
            let d = s.stateFlag(this.state, 1) ? this.pos : this.reducePos;
            this.storeNode(r, h7, d, u + 4, true);
          }
          if (e & 262144) this.state = this.stack[a];
          else {
            let d = this.stack[a - 3];
            this.state = s.getGoto(d, r, true);
          }
          for (; this.stack.length > a; ) this.stack.pop();
          this.reduceContext(r, h7);
        }
        storeNode(e, t, i, r = 4, s = false) {
          if (e == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
            let o = this.buffer.length;
            if (o > 0 && this.buffer[o - 4] == 0 && this.buffer[o - 1] > -1) {
              if (t == i) return;
              if (this.buffer[o - 2] >= t) {
                this.buffer[o - 2] = i;
                return;
              }
            }
          }
          if (!s || this.pos == i) this.buffer.push(e, t, i, r);
          else {
            let o = this.buffer.length;
            if (o > 0 && (this.buffer[o - 4] != 0 || this.buffer[o - 1] < 0)) {
              let l = false;
              for (let a = o; a > 0 && this.buffer[a - 2] > i; a -= 4) if (this.buffer[a - 1] >= 0) {
                l = true;
                break;
              }
              if (l) for (; o > 0 && this.buffer[o - 2] > i; ) this.buffer[o] = this.buffer[o - 4], this.buffer[o + 1] = this.buffer[o - 3], this.buffer[o + 2] = this.buffer[o - 2], this.buffer[o + 3] = this.buffer[o - 1], o -= 4, r > 4 && (r -= 4);
            }
            this.buffer[o] = e, this.buffer[o + 1] = t, this.buffer[o + 2] = i, this.buffer[o + 3] = r;
          }
        }
        shift(e, t, i, r) {
          if (e & 131072) this.pushState(e & 65535, this.pos);
          else if ((e & 262144) == 0) {
            let s = e, { parser: o } = this.p;
            this.pos = r;
            let l = o.stateFlag(s, 1);
            !l && (r > i || t <= o.maxNode) && (this.reducePos = r), this.pushState(s, l ? i : Math.min(i, this.reducePos)), this.shiftContext(t, i), t <= o.maxNode && this.buffer.push(t, i, r, 4);
          } else this.pos = r, this.shiftContext(t, i), t <= this.p.parser.maxNode && this.buffer.push(t, i, r, 4);
        }
        apply(e, t, i, r) {
          e & 65536 ? this.reduce(e) : this.shift(e, t, i, r);
        }
        useNode(e, t) {
          let i = this.p.reused.length - 1;
          (i < 0 || this.p.reused[i] != e) && (this.p.reused.push(e), i++);
          let r = this.pos;
          this.reducePos = this.pos = r + e.length, this.pushState(t, r), this.buffer.push(i, r, this.reducePos, -1), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, e, this, this.p.stream.reset(this.pos - e.length)));
        }
        split() {
          let e = this, t = e.buffer.length;
          for (t && e.buffer[t - 4] == 0 && (t -= 4); t > 0 && e.buffer[t - 2] > e.reducePos; ) t -= 4;
          let i = e.buffer.slice(t), r = e.bufferBase + t;
          for (; e && r == e.bufferBase; ) e = e.parent;
          return new n(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, i, r, this.curContext, this.lookAhead, e);
        }
        recoverByDelete(e, t) {
          let i = e <= this.p.parser.maxNode;
          i && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, i ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190;
        }
        canShift(e) {
          for (let t = new rl(this); ; ) {
            let i = this.p.parser.stateSlot(t.state, 4) || this.p.parser.hasAction(t.state, e);
            if (i == 0) return false;
            if ((i & 65536) == 0) return true;
            t.reduce(i);
          }
        }
        recoverByInsert(e) {
          if (this.stack.length >= 300) return [];
          let t = this.p.parser.nextStates(this.state);
          if (t.length > 8 || this.stack.length >= 120) {
            let r = [];
            for (let s = 0, o; s < t.length; s += 2) (o = t[s + 1]) != this.state && this.p.parser.hasAction(o, e) && r.push(t[s], o);
            if (this.stack.length < 120) for (let s = 0; r.length < 8 && s < t.length; s += 2) {
              let o = t[s + 1];
              r.some((l, a) => a & 1 && l == o) || r.push(t[s], o);
            }
            t = r;
          }
          let i = [];
          for (let r = 0; r < t.length && i.length < 4; r += 2) {
            let s = t[r + 1];
            if (s == this.state) continue;
            let o = this.split();
            o.pushState(s, this.pos), o.storeNode(0, o.pos, o.pos, 4, true), o.shiftContext(t[r], this.pos), o.reducePos = this.pos, o.score -= 200, i.push(o);
          }
          return i;
        }
        forceReduce() {
          let { parser: e } = this.p, t = e.stateSlot(this.state, 5);
          if ((t & 65536) == 0) return false;
          if (!e.validAction(this.state, t)) {
            let i = t >> 19, r = t & 65535, s = this.stack.length - i * 3;
            if (s < 0 || e.getGoto(this.stack[s], r, false) < 0) {
              let o = this.findForcedReduction();
              if (o == null) return false;
              t = o;
            }
            this.storeNode(0, this.pos, this.pos, 4, true), this.score -= 100;
          }
          return this.reducePos = this.pos, this.reduce(t), true;
        }
        findForcedReduction() {
          let { parser: e } = this.p, t = [], i = (r, s) => {
            if (!t.includes(r)) return t.push(r), e.allActions(r, (o) => {
              if (!(o & 393216)) if (o & 65536) {
                let l = (o >> 19) - s;
                if (l > 1) {
                  let a = o & 65535, h7 = this.stack.length - l * 3;
                  if (h7 >= 0 && e.getGoto(this.stack[h7], a, false) >= 0) return l << 19 | 65536 | a;
                }
              } else {
                let l = i(o, s + 1);
                if (l != null) return l;
              }
            });
          };
          return i(this.state, 0);
        }
        forceAll() {
          for (; !this.p.parser.stateFlag(this.state, 2); ) if (!this.forceReduce()) {
            this.storeNode(0, this.pos, this.pos, 4, true);
            break;
          }
          return this;
        }
        get deadEnd() {
          if (this.stack.length != 3) return false;
          let { parser: e } = this.p;
          return e.data[e.stateSlot(this.state, 1)] == 65535 && !e.stateSlot(this.state, 4);
        }
        restart() {
          this.storeNode(0, this.pos, this.pos, 4, true), this.state = this.stack[0], this.stack.length = 0;
        }
        sameState(e) {
          if (this.state != e.state || this.stack.length != e.stack.length) return false;
          for (let t = 0; t < this.stack.length; t += 3) if (this.stack[t] != e.stack[t]) return false;
          return true;
        }
        get parser() {
          return this.p.parser;
        }
        dialectEnabled(e) {
          return this.p.parser.dialect.flags[e];
        }
        shiftContext(e, t) {
          this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, e, this, this.p.stream.reset(t)));
        }
        reduceContext(e, t) {
          this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, e, this, this.p.stream.reset(t)));
        }
        emitContext() {
          let e = this.buffer.length - 1;
          (e < 0 || this.buffer[e] != -3) && this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
        }
        emitLookAhead() {
          let e = this.buffer.length - 1;
          (e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
        }
        updateContext(e) {
          if (e != this.curContext.context) {
            let t = new Rr(this.curContext.tracker, e);
            t.hash != this.curContext.hash && this.emitContext(), this.curContext = t;
          }
        }
        setLookAhead(e) {
          return e <= this.lookAhead ? false : (this.emitLookAhead(), this.lookAhead = e, true);
        }
        close() {
          this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead();
        }
      }, Rr = class {
        constructor(e, t) {
          this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
        }
      }, rl = class {
        constructor(e) {
          this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
        }
        reduce(e) {
          let t = e & 65535, i = e >> 19;
          i == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (i - 1) * 3;
          let r = this.start.p.parser.getGoto(this.stack[this.base - 3], t, true);
          this.state = r;
        }
      }, sl = class n {
        constructor(e, t, i) {
          this.stack = e, this.pos = t, this.index = i, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
        }
        static create(e, t = e.bufferBase + e.buffer.length) {
          return new n(e, t, t - e.bufferBase);
        }
        maybeNext() {
          let e = this.stack.parent;
          e != null && (this.index = this.stack.bufferBase - e.bufferBase, this.stack = e, this.buffer = e.buffer);
        }
        get id() {
          return this.buffer[this.index - 4];
        }
        get start() {
          return this.buffer[this.index - 3];
        }
        get end() {
          return this.buffer[this.index - 2];
        }
        get size() {
          return this.buffer[this.index - 1];
        }
        next() {
          this.index -= 4, this.pos -= 4, this.index == 0 && this.maybeNext();
        }
        fork() {
          return new n(this.stack, this.pos, this.index);
        }
      };
      function fn(n, e = Uint16Array) {
        if (typeof n != "string") return n;
        let t = null;
        for (let i = 0, r = 0; i < n.length; ) {
          let s = 0;
          for (; ; ) {
            let o = n.charCodeAt(i++), l = false;
            if (o == 126) {
              s = 65535;
              break;
            }
            o >= 92 && o--, o >= 34 && o--;
            let a = o - 32;
            if (a >= 46 && (a -= 46, l = true), s += a, l) break;
            s *= 46;
          }
          t ? t[r++] = s : t = new e(s);
        }
        return t;
      }
      var Ti = class {
        constructor() {
          this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
        }
      }, vf = new Ti(), ol = class {
        constructor(e, t) {
          this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = vf, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
        }
        resolveOffset(e, t) {
          let i = this.range, r = this.rangeIndex, s = this.pos + e;
          for (; s < i.from; ) {
            if (!r) return null;
            let o = this.ranges[--r];
            s -= i.from - o.to, i = o;
          }
          for (; t < 0 ? s > i.to : s >= i.to; ) {
            if (r == this.ranges.length - 1) return null;
            let o = this.ranges[++r];
            s += o.from - i.to, i = o;
          }
          return s;
        }
        clipPos(e) {
          if (e >= this.range.from && e < this.range.to) return e;
          for (let t of this.ranges) if (t.to > e) return Math.max(e, t.from);
          return this.end;
        }
        peek(e) {
          let t = this.chunkOff + e, i, r;
          if (t >= 0 && t < this.chunk.length) i = this.pos + e, r = this.chunk.charCodeAt(t);
          else {
            let s = this.resolveOffset(e, 1);
            if (s == null) return -1;
            if (i = s, i >= this.chunk2Pos && i < this.chunk2Pos + this.chunk2.length) r = this.chunk2.charCodeAt(i - this.chunk2Pos);
            else {
              let o = this.rangeIndex, l = this.range;
              for (; l.to <= i; ) l = this.ranges[++o];
              this.chunk2 = this.input.chunk(this.chunk2Pos = i), i + this.chunk2.length > l.to && (this.chunk2 = this.chunk2.slice(0, l.to - i)), r = this.chunk2.charCodeAt(0);
            }
          }
          return i >= this.token.lookAhead && (this.token.lookAhead = i + 1), r;
        }
        acceptToken(e, t = 0) {
          let i = t ? this.resolveOffset(t, -1) : this.pos;
          if (i == null || i < this.token.start) throw new RangeError("Token end out of bounds");
          this.token.value = e, this.token.end = i;
        }
        acceptTokenTo(e, t) {
          this.token.value = e, this.token.end = t;
        }
        getChunk() {
          if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
            let { chunk: e, chunkPos: t } = this;
            this.chunk = this.chunk2, this.chunkPos = this.chunk2Pos, this.chunk2 = e, this.chunk2Pos = t, this.chunkOff = this.pos - this.chunkPos;
          } else {
            this.chunk2 = this.chunk, this.chunk2Pos = this.chunkPos;
            let e = this.input.chunk(this.pos), t = this.pos + e.length;
            this.chunk = t > this.range.to ? e.slice(0, this.range.to - this.pos) : e, this.chunkPos = this.pos, this.chunkOff = 0;
          }
        }
        readNext() {
          return this.chunkOff >= this.chunk.length && (this.getChunk(), this.chunkOff == this.chunk.length) ? this.next = -1 : this.next = this.chunk.charCodeAt(this.chunkOff);
        }
        advance(e = 1) {
          for (this.chunkOff += e; this.pos + e >= this.range.to; ) {
            if (this.rangeIndex == this.ranges.length - 1) return this.setDone();
            e -= this.range.to - this.pos, this.range = this.ranges[++this.rangeIndex], this.pos = this.range.from;
          }
          return this.pos += e, this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1), this.readNext();
        }
        setDone() {
          return this.pos = this.chunkPos = this.end, this.range = this.ranges[this.rangeIndex = this.ranges.length - 1], this.chunk = "", this.next = -1;
        }
        reset(e, t) {
          if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = vf, this.pos != e) {
            if (this.pos = e, e == this.end) return this.setDone(), this;
            for (; e < this.range.from; ) this.range = this.ranges[--this.rangeIndex];
            for (; e >= this.range.to; ) this.range = this.ranges[++this.rangeIndex];
            e >= this.chunkPos && e < this.chunkPos + this.chunk.length ? this.chunkOff = e - this.chunkPos : (this.chunk = "", this.chunkOff = 0), this.readNext();
          }
          return this;
        }
        read(e, t) {
          if (e >= this.chunkPos && t <= this.chunkPos + this.chunk.length) return this.chunk.slice(e - this.chunkPos, t - this.chunkPos);
          if (e >= this.chunk2Pos && t <= this.chunk2Pos + this.chunk2.length) return this.chunk2.slice(e - this.chunk2Pos, t - this.chunk2Pos);
          if (e >= this.range.from && t <= this.range.to) return this.input.read(e, t);
          let i = "";
          for (let r of this.ranges) {
            if (r.from >= t) break;
            r.to > e && (i += this.input.read(Math.max(r.from, e), Math.min(r.to, t)));
          }
          return i;
        }
      }, Zt = class {
        constructor(e, t) {
          this.data = e, this.id = t;
        }
        token(e, t) {
          let { parser: i } = t.p;
          Xf(this.data, e, t, this.id, i.data, i.tokenPrecTable);
        }
      };
      Zt.prototype.contextual = Zt.prototype.fallback = Zt.prototype.extend = false;
      var At = class {
        constructor(e, t, i) {
          this.precTable = t, this.elseToken = i, this.data = typeof e == "string" ? fn(e) : e;
        }
        token(e, t) {
          let i = e.pos, r = 0;
          for (; ; ) {
            let s = e.next < 0, o = e.resolveOffset(1, 1);
            if (Xf(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1) break;
            if (this.elseToken == null) return;
            if (s || r++, o == null) break;
            e.reset(o, e.token);
          }
          r && (e.reset(i, e.token), e.acceptToken(this.elseToken, r));
        }
      };
      At.prototype.contextual = Zt.prototype.fallback = Zt.prototype.extend = false;
      var ne = class {
        constructor(e, t = {}) {
          this.token = e, this.contextual = !!t.contextual, this.fallback = !!t.fallback, this.extend = !!t.extend;
        }
      };
      function Xf(n, e, t, i, r, s) {
        let o = 0, l = 1 << i, { dialect: a } = t.p.parser;
        e: for (; (l & n[o]) != 0; ) {
          let h7 = n[o + 1];
          for (let d = o + 3; d < h7; d += 2) if ((n[d + 1] & l) > 0) {
            let O = n[d];
            if (a.allows(O) && (e.token.value == -1 || e.token.value == O || $g(O, e.token.value, r, s))) {
              e.acceptToken(O);
              break;
            }
          }
          let c = e.next, f = 0, u = n[o + 2];
          if (e.next < 0 && u > f && n[h7 + u * 3 - 3] == 65535) {
            o = n[h7 + u * 3 - 1];
            continue e;
          }
          for (; f < u; ) {
            let d = f + u >> 1, O = h7 + d + (d << 1), m = n[O], g = n[O + 1] || 65536;
            if (c < m) u = d;
            else if (c >= g) f = d + 1;
            else {
              o = n[O + 2], e.advance();
              continue e;
            }
          }
          break;
        }
      }
      function Tf(n, e, t) {
        for (let i = e, r; (r = n[i]) != 65535; i++) if (r == t) return i - e;
        return -1;
      }
      function $g(n, e, t, i) {
        let r = Tf(t, i, e);
        return r < 0 || Tf(t, i, n) < r;
      }
      var we = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG), tl = null;
      function Cf(n, e, t) {
        let i = n.cursor(E.IncludeAnonymous);
        for (i.moveTo(e); ; ) if (!(t < 0 ? i.childBefore(e) : i.childAfter(e))) for (; ; ) {
          if ((t < 0 ? i.to < e : i.from > e) && !i.type.isError) return t < 0 ? Math.max(0, Math.min(i.to - 1, e - 25)) : Math.min(n.length, Math.max(i.from + 1, e + 25));
          if (t < 0 ? i.prevSibling() : i.nextSibling()) break;
          if (!i.parent()) return t < 0 ? 0 : n.length;
        }
      }
      var ll = class {
        constructor(e, t) {
          this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
        }
        nextFragment() {
          let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
          if (e) {
            for (this.safeFrom = e.openStart ? Cf(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? Cf(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length; ) this.trees.pop(), this.start.pop(), this.index.pop();
            this.trees.push(e.tree), this.start.push(-e.offset), this.index.push(0), this.nextStart = this.safeFrom;
          } else this.nextStart = 1e9;
        }
        nodeAt(e) {
          if (e < this.nextStart) return null;
          for (; this.fragment && this.safeTo <= e; ) this.nextFragment();
          if (!this.fragment) return null;
          for (; ; ) {
            let t = this.trees.length - 1;
            if (t < 0) return this.nextFragment(), null;
            let i = this.trees[t], r = this.index[t];
            if (r == i.children.length) {
              this.trees.pop(), this.start.pop(), this.index.pop();
              continue;
            }
            let s = i.children[r], o = this.start[t] + i.positions[r];
            if (o > e) return this.nextStart = o, null;
            if (s instanceof z) {
              if (o == e) {
                if (o < this.safeFrom) return null;
                let l = o + s.length;
                if (l <= this.safeTo) {
                  let a = s.prop(A.lookAhead);
                  if (!a || l + a < this.fragment.to) return s;
                }
              }
              this.index[t]++, o + s.length >= Math.max(this.safeFrom, e) && (this.trees.push(s), this.start.push(o), this.index.push(0));
            } else this.index[t]++, this.nextStart = o + s.length;
          }
        }
      }, al = class {
        constructor(e, t) {
          this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((i) => new Ti());
        }
        getActions(e) {
          let t = 0, i = null, { parser: r } = e.p, { tokenizers: s } = r, o = r.stateSlot(e.state, 3), l = e.curContext ? e.curContext.hash : 0, a = 0;
          for (let h7 = 0; h7 < s.length; h7++) {
            if ((1 << h7 & o) == 0) continue;
            let c = s[h7], f = this.tokens[h7];
            if (!(i && !c.fallback) && ((c.contextual || f.start != e.pos || f.mask != o || f.context != l) && (this.updateCachedToken(f, c, e), f.mask = o, f.context = l), f.lookAhead > f.end + 25 && (a = Math.max(f.lookAhead, a)), f.value != 0)) {
              let u = t;
              if (f.extended > -1 && (t = this.addActions(e, f.extended, f.end, t)), t = this.addActions(e, f.value, f.end, t), !c.extend && (i = f, t > u)) break;
            }
          }
          for (; this.actions.length > t; ) this.actions.pop();
          return a && e.setLookAhead(a), !i && e.pos == this.stream.end && (i = new Ti(), i.value = e.p.parser.eofTerm, i.start = i.end = e.pos, t = this.addActions(e, i.value, i.end, t)), this.mainToken = i, this.actions;
        }
        getMainToken(e) {
          if (this.mainToken) return this.mainToken;
          let t = new Ti(), { pos: i, p: r } = e;
          return t.start = i, t.end = Math.min(i + 1, r.stream.end), t.value = i == r.stream.end ? r.parser.eofTerm : 0, t;
        }
        updateCachedToken(e, t, i) {
          let r = this.stream.clipPos(i.pos);
          if (t.token(this.stream.reset(r, e), i), e.value > -1) {
            let { parser: s } = i.p;
            for (let o = 0; o < s.specialized.length; o++) if (s.specialized[o] == e.value) {
              let l = s.specializers[o](this.stream.read(e.start, e.end), i);
              if (l >= 0 && i.p.parser.dialect.allows(l >> 1)) {
                (l & 1) == 0 ? e.value = l >> 1 : e.extended = l >> 1;
                break;
              }
            }
          } else e.value = 0, e.end = this.stream.clipPos(r + 1);
        }
        putAction(e, t, i, r) {
          for (let s = 0; s < r; s += 3) if (this.actions[s] == e) return r;
          return this.actions[r++] = e, this.actions[r++] = t, this.actions[r++] = i, r;
        }
        addActions(e, t, i, r) {
          let { state: s } = e, { parser: o } = e.p, { data: l } = o;
          for (let a = 0; a < 2; a++) for (let h7 = o.stateSlot(s, a ? 2 : 1); ; h7 += 3) {
            if (l[h7] == 65535) if (l[h7 + 1] == 1) h7 = ut(l, h7 + 2);
            else {
              r == 0 && l[h7 + 1] == 2 && (r = this.putAction(ut(l, h7 + 2), t, i, r));
              break;
            }
            l[h7] == t && (r = this.putAction(ut(l, h7 + 1), t, i, r));
          }
          return r;
        }
      }, hl = class {
        constructor(e, t, i, r) {
          this.parser = e, this.input = t, this.ranges = r, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new ol(t, r), this.tokens = new al(e, this.stream), this.topTerm = e.top[1];
          let { from: s } = r[0];
          this.stacks = [nl.start(this, e.top[0], s)], this.fragments = i.length && this.stream.end - s > e.bufferLength * 4 ? new ll(i, e.nodeSet) : null;
        }
        get parsedPos() {
          return this.minStackPos;
        }
        advance() {
          let e = this.stacks, t = this.minStackPos, i = this.stacks = [], r, s;
          if (this.bigReductionCount > 300 && e.length == 1) {
            let [o] = e;
            for (; o.forceReduce() && o.stack.length && o.stack[o.stack.length - 2] >= this.lastBigReductionStart; ) ;
            this.bigReductionCount = this.lastBigReductionSize = 0;
          }
          for (let o = 0; o < e.length; o++) {
            let l = e[o];
            for (; ; ) {
              if (this.tokens.mainToken = null, l.pos > t) i.push(l);
              else {
                if (this.advanceStack(l, i, e)) continue;
                {
                  r || (r = [], s = []), r.push(l);
                  let a = this.tokens.getMainToken(l);
                  s.push(a.value, a.end);
                }
              }
              break;
            }
          }
          if (!i.length) {
            let o = r && Pg(r);
            if (o) return we && console.log("Finish with " + this.stackID(o)), this.stackToTree(o);
            if (this.parser.strict) throw we && r && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
            this.recovering || (this.recovering = 5);
          }
          if (this.recovering && r) {
            let o = this.stoppedAt != null && r[0].pos > this.stoppedAt ? r[0] : this.runRecovery(r, s, i);
            if (o) return we && console.log("Force-finish " + this.stackID(o)), this.stackToTree(o.forceAll());
          }
          if (this.recovering) {
            let o = this.recovering == 1 ? 1 : this.recovering * 3;
            if (i.length > o) for (i.sort((l, a) => a.score - l.score); i.length > o; ) i.pop();
            i.some((l) => l.reducePos > t) && this.recovering--;
          } else if (i.length > 1) {
            e: for (let o = 0; o < i.length - 1; o++) {
              let l = i[o];
              for (let a = o + 1; a < i.length; a++) {
                let h7 = i[a];
                if (l.sameState(h7) || l.buffer.length > 500 && h7.buffer.length > 500) if ((l.score - h7.score || l.buffer.length - h7.buffer.length) > 0) i.splice(a--, 1);
                else {
                  i.splice(o--, 1);
                  continue e;
                }
              }
            }
            i.length > 12 && (i.sort((o, l) => l.score - o.score), i.splice(12, i.length - 12));
          }
          this.minStackPos = i[0].pos;
          for (let o = 1; o < i.length; o++) i[o].pos < this.minStackPos && (this.minStackPos = i[o].pos);
          return null;
        }
        stopAt(e) {
          if (this.stoppedAt != null && this.stoppedAt < e) throw new RangeError("Can't move stoppedAt forward");
          this.stoppedAt = e;
        }
        advanceStack(e, t, i) {
          let r = e.pos, { parser: s } = this, o = we ? this.stackID(e) + " -> " : "";
          if (this.stoppedAt != null && r > this.stoppedAt) return e.forceReduce() ? e : null;
          if (this.fragments) {
            let h7 = e.curContext && e.curContext.tracker.strict, c = h7 ? e.curContext.hash : 0;
            for (let f = this.fragments.nodeAt(r); f; ) {
              let u = this.parser.nodeSet.types[f.type.id] == f.type ? s.getGoto(e.state, f.type.id) : -1;
              if (u > -1 && f.length && (!h7 || (f.prop(A.contextHash) || 0) == c)) return e.useNode(f, u), we && console.log(o + this.stackID(e) + ` (via reuse of ${s.getName(f.type.id)})`), true;
              if (!(f instanceof z) || f.children.length == 0 || f.positions[0] > 0) break;
              let d = f.children[0];
              if (d instanceof z && f.positions[0] == 0) f = d;
              else break;
            }
          }
          let l = s.stateSlot(e.state, 4);
          if (l > 0) return e.reduce(l), we && console.log(o + this.stackID(e) + ` (via always-reduce ${s.getName(l & 65535)})`), true;
          if (e.stack.length >= 8400) for (; e.stack.length > 6e3 && e.forceReduce(); ) ;
          let a = this.tokens.getActions(e);
          for (let h7 = 0; h7 < a.length; ) {
            let c = a[h7++], f = a[h7++], u = a[h7++], d = h7 == a.length || !i, O = d ? e : e.split(), m = this.tokens.mainToken;
            if (O.apply(c, f, m ? m.start : O.pos, u), we && console.log(o + this.stackID(O) + ` (via ${(c & 65536) == 0 ? "shift" : `reduce of ${s.getName(c & 65535)}`} for ${s.getName(f)} @ ${r}${O == e ? "" : ", split"})`), d) return true;
            O.pos > r ? t.push(O) : i.push(O);
          }
          return false;
        }
        advanceFully(e, t) {
          let i = e.pos;
          for (; ; ) {
            if (!this.advanceStack(e, null, null)) return false;
            if (e.pos > i) return Zf(e, t), true;
          }
        }
        runRecovery(e, t, i) {
          let r = null, s = false;
          for (let o = 0; o < e.length; o++) {
            let l = e[o], a = t[o << 1], h7 = t[(o << 1) + 1], c = we ? this.stackID(l) + " -> " : "";
            if (l.deadEnd && (s || (s = true, l.restart(), we && console.log(c + this.stackID(l) + " (restarted)"), this.advanceFully(l, i)))) continue;
            let f = l.split(), u = c;
            for (let d = 0; d < 10 && f.forceReduce() && (we && console.log(u + this.stackID(f) + " (via force-reduce)"), !this.advanceFully(f, i)); d++) we && (u = this.stackID(f) + " -> ");
            for (let d of l.recoverByInsert(a)) we && console.log(c + this.stackID(d) + " (via recover-insert)"), this.advanceFully(d, i);
            this.stream.end > l.pos ? (h7 == l.pos && (h7++, a = 0), l.recoverByDelete(a, h7), we && console.log(c + this.stackID(l) + ` (via recover-delete ${this.parser.getName(a)})`), Zf(l, i)) : (!r || r.score < f.score) && (r = f);
          }
          return r;
        }
        stackToTree(e) {
          return e.close(), z.build({ buffer: sl.create(e), nodeSet: this.parser.nodeSet, topID: this.topTerm, maxBufferLength: this.parser.bufferLength, reused: this.reused, start: this.ranges[0].from, length: e.pos - this.ranges[0].from, minRepeatType: this.parser.minRepeatTerm });
        }
        stackID(e) {
          let t = (tl || (tl = /* @__PURE__ */ new WeakMap())).get(e);
          return t || tl.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
        }
      };
      function Zf(n, e) {
        for (let t = 0; t < e.length; t++) {
          let i = e[t];
          if (i.pos == n.pos && i.sameState(n)) {
            e[t].score < n.score && (e[t] = n);
            return;
          }
        }
        e.push(n);
      }
      var cl = class {
        constructor(e, t, i) {
          this.source = e, this.flags = t, this.disabled = i;
        }
        allows(e) {
          return !this.disabled || this.disabled[e] == 0;
        }
      }, il = (n) => n, Ci = class {
        constructor(e) {
          this.start = e.start, this.shift = e.shift || il, this.reduce = e.reduce || il, this.reuse = e.reuse || il, this.hash = e.hash || (() => 0), this.strict = e.strict !== false;
        }
      }, Xt = class n extends kt {
        constructor(e) {
          if (super(), this.wrappers = [], e.version != 14) throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);
          let t = e.nodeNames.split(" ");
          this.minRepeatTerm = t.length;
          for (let l = 0; l < e.repeatNodeCount; l++) t.push("");
          let i = Object.keys(e.topRules).map((l) => e.topRules[l][1]), r = [];
          for (let l = 0; l < t.length; l++) r.push([]);
          function s(l, a, h7) {
            r[l].push([a, a.deserialize(String(h7))]);
          }
          if (e.nodeProps) for (let l of e.nodeProps) {
            let a = l[0];
            typeof a == "string" && (a = A[a]);
            for (let h7 = 1; h7 < l.length; ) {
              let c = l[h7++];
              if (c >= 0) s(c, a, l[h7++]);
              else {
                let f = l[h7 + -c];
                for (let u = -c; u > 0; u--) s(l[h7++], a, f);
                h7++;
              }
            }
          }
          this.nodeSet = new Qt(t.map((l, a) => J.define({ name: a >= this.minRepeatTerm ? void 0 : l, id: a, props: r[a], top: i.indexOf(a) > -1, error: a == 0, skipped: e.skippedNodes && e.skippedNodes.indexOf(a) > -1 }))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = false, this.bufferLength = 1024;
          let o = fn(e.tokenData);
          this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
          for (let l = 0; l < this.specializerSpecs.length; l++) this.specialized[l] = this.specializerSpecs[l].term;
          this.specializers = this.specializerSpecs.map(Af), this.states = fn(e.states, Uint32Array), this.data = fn(e.stateData), this.goto = fn(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((l) => typeof l == "number" ? new Zt(o, l) : l), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
        }
        createParse(e, t, i) {
          let r = new hl(this, e, t, i);
          for (let s of this.wrappers) r = s(r, e, t, i);
          return r;
        }
        getGoto(e, t, i = false) {
          let r = this.goto;
          if (t >= r[0]) return -1;
          for (let s = r[t + 1]; ; ) {
            let o = r[s++], l = o & 1, a = r[s++];
            if (l && i) return a;
            for (let h7 = s + (o >> 1); s < h7; s++) if (r[s] == e) return a;
            if (l) return -1;
          }
        }
        hasAction(e, t) {
          let i = this.data;
          for (let r = 0; r < 2; r++) for (let s = this.stateSlot(e, r ? 2 : 1), o; ; s += 3) {
            if ((o = i[s]) == 65535) if (i[s + 1] == 1) o = i[s = ut(i, s + 2)];
            else {
              if (i[s + 1] == 2) return ut(i, s + 2);
              break;
            }
            if (o == t || o == 0) return ut(i, s + 1);
          }
          return 0;
        }
        stateSlot(e, t) {
          return this.states[e * 6 + t];
        }
        stateFlag(e, t) {
          return (this.stateSlot(e, 0) & t) > 0;
        }
        validAction(e, t) {
          return !!this.allActions(e, (i) => i == t ? true : null);
        }
        allActions(e, t) {
          let i = this.stateSlot(e, 4), r = i ? t(i) : void 0;
          for (let s = this.stateSlot(e, 1); r == null; s += 3) {
            if (this.data[s] == 65535) if (this.data[s + 1] == 1) s = ut(this.data, s + 2);
            else break;
            r = t(ut(this.data, s + 1));
          }
          return r;
        }
        nextStates(e) {
          let t = [];
          for (let i = this.stateSlot(e, 1); ; i += 3) {
            if (this.data[i] == 65535) if (this.data[i + 1] == 1) i = ut(this.data, i + 2);
            else break;
            if ((this.data[i + 2] & 1) == 0) {
              let r = this.data[i + 1];
              t.some((s, o) => o & 1 && s == r) || t.push(this.data[i], r);
            }
          }
          return t;
        }
        configure(e) {
          let t = Object.assign(Object.create(n.prototype), this);
          if (e.props && (t.nodeSet = this.nodeSet.extend(...e.props)), e.top) {
            let i = this.topRules[e.top];
            if (!i) throw new RangeError(`Invalid top rule name ${e.top}`);
            t.top = i;
          }
          return e.tokenizers && (t.tokenizers = this.tokenizers.map((i) => {
            let r = e.tokenizers.find((s) => s.from == i);
            return r ? r.to : i;
          })), e.specializers && (t.specializers = this.specializers.slice(), t.specializerSpecs = this.specializerSpecs.map((i, r) => {
            let s = e.specializers.find((l) => l.from == i.external);
            if (!s) return i;
            let o = Object.assign(Object.assign({}, i), { external: s.to });
            return t.specializers[r] = Af(o), o;
          })), e.contextTracker && (t.context = e.contextTracker), e.dialect && (t.dialect = this.parseDialect(e.dialect)), e.strict != null && (t.strict = e.strict), e.wrap && (t.wrappers = t.wrappers.concat(e.wrap)), e.bufferLength != null && (t.bufferLength = e.bufferLength), t;
        }
        hasWrappers() {
          return this.wrappers.length > 0;
        }
        getName(e) {
          return this.termNames ? this.termNames[e] : String(e <= this.maxNode && this.nodeSet.types[e].name || e);
        }
        get eofTerm() {
          return this.maxNode + 1;
        }
        get topNode() {
          return this.nodeSet.types[this.top[1]];
        }
        dynamicPrecedence(e) {
          let t = this.dynamicPrecedences;
          return t == null ? 0 : t[e] || 0;
        }
        parseDialect(e) {
          let t = Object.keys(this.dialects), i = t.map(() => false);
          if (e) for (let s of e.split(" ")) {
            let o = t.indexOf(s);
            o >= 0 && (i[o] = true);
          }
          let r = null;
          for (let s = 0; s < t.length; s++) if (!i[s]) for (let o = this.dialects[t[s]], l; (l = this.data[o++]) != 65535; ) (r || (r = new Uint8Array(this.maxTerm + 1)))[l] = 1;
          return new cl(e, i, r);
        }
        static deserialize(e) {
          return new n(e);
        }
      };
      function ut(n, e) {
        return n[e] | n[e + 1] << 16;
      }
      function Pg(n) {
        let e = null;
        for (let t of n) {
          let i = t.p.stoppedAt;
          (t.pos == t.p.stream.end || i != null && t.pos > i) && t.p.parser.stateFlag(t.state, 2) && (!e || e.score < t.score) && (e = t);
        }
        return e;
      }
      function Af(n) {
        if (n.external) {
          let e = n.extend ? 1 : 0;
          return (t, i) => n.external(t, i) << 1 | e;
        }
        return n.get;
      }
      var vg = 316, Tg = 317, Rf = 1, Cg = 2, Zg = 3, Ag = 4, Xg = 318, Rg = 320, Mg = 321, Lg = 5, Eg = 6, jg = 0, ul = [9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288], Mf = 125, zg = 59, dl = 47, Yg = 42, _g = 43, Vg = 45, Wg = 60, Dg = 44, Bg = 63, qg = 46, Ig = 91, Ng = new Ci({ start: false, shift(n, e) {
        return e == Lg || e == Eg || e == Rg ? n : e == Mg;
      }, strict: false }), Gg = new ne((n, e) => {
        let { next: t } = n;
        (t == Mf || t == -1 || e.context) && n.acceptToken(Xg);
      }, { contextual: true, fallback: true }), Ug = new ne((n, e) => {
        let { next: t } = n, i;
        ul.indexOf(t) > -1 || t == dl && ((i = n.peek(1)) == dl || i == Yg) || t != Mf && t != zg && t != -1 && !e.context && n.acceptToken(vg);
      }, { contextual: true }), Fg = new ne((n, e) => {
        n.next == Ig && !e.context && n.acceptToken(Tg);
      }, { contextual: true }), Hg = new ne((n, e) => {
        let { next: t } = n;
        if (t == _g || t == Vg) {
          if (n.advance(), t == n.next) {
            n.advance();
            let i = !e.context && e.canShift(Rf);
            n.acceptToken(i ? Rf : Cg);
          }
        } else t == Bg && n.peek(1) == qg && (n.advance(), n.advance(), (n.next < 48 || n.next > 57) && n.acceptToken(Zg));
      }, { contextual: true });
      function fl(n, e) {
        return n >= 65 && n <= 90 || n >= 97 && n <= 122 || n == 95 || n >= 192 || !e && n >= 48 && n <= 57;
      }
      var Kg = new ne((n, e) => {
        if (n.next != Wg || !e.dialectEnabled(jg) || (n.advance(), n.next == dl)) return;
        let t = 0;
        for (; ul.indexOf(n.next) > -1; ) n.advance(), t++;
        if (fl(n.next, true)) {
          for (n.advance(), t++; fl(n.next, false); ) n.advance(), t++;
          for (; ul.indexOf(n.next) > -1; ) n.advance(), t++;
          if (n.next == Dg) return;
          for (let i = 0; ; i++) {
            if (i == 7) {
              if (!fl(n.next, true)) return;
              break;
            }
            if (n.next != "extends".charCodeAt(i)) break;
            n.advance(), t++;
          }
        }
        n.acceptToken(Ag, -t);
      }), Jg = We({ "get set async static": p.modifier, "for while do if else switch try catch finally return throw break continue default case defer": p.controlKeyword, "in of await yield void typeof delete instanceof as satisfies": p.operatorKeyword, "let var const using function class extends": p.definitionKeyword, "import export from": p.moduleKeyword, "with debugger new": p.keyword, TemplateString: p.special(p.string), super: p.atom, BooleanLiteral: p.bool, this: p.self, null: p.null, Star: p.modifier, VariableName: p.variableName, "CallExpression/VariableName TaggedTemplateExpression/VariableName": p.function(p.variableName), VariableDefinition: p.definition(p.variableName), Label: p.labelName, PropertyName: p.propertyName, PrivatePropertyName: p.special(p.propertyName), "CallExpression/MemberExpression/PropertyName": p.function(p.propertyName), "FunctionDeclaration/VariableDefinition": p.function(p.definition(p.variableName)), "ClassDeclaration/VariableDefinition": p.definition(p.className), "NewExpression/VariableName": p.className, PropertyDefinition: p.definition(p.propertyName), PrivatePropertyDefinition: p.definition(p.special(p.propertyName)), UpdateOp: p.updateOperator, "LineComment Hashbang": p.lineComment, BlockComment: p.blockComment, Number: p.number, String: p.string, Escape: p.escape, ArithOp: p.arithmeticOperator, LogicOp: p.logicOperator, BitOp: p.bitwiseOperator, CompareOp: p.compareOperator, RegExp: p.regexp, Equals: p.definitionOperator, Arrow: p.function(p.punctuation), ": Spread": p.punctuation, "( )": p.paren, "[ ]": p.squareBracket, "{ }": p.brace, "InterpolationStart InterpolationEnd": p.special(p.brace), ".": p.derefOperator, ", ;": p.separator, "@": p.meta, TypeName: p.typeName, TypeDefinition: p.definition(p.typeName), "type enum interface implements namespace module declare": p.definitionKeyword, "abstract global Privacy readonly override": p.modifier, "is keyof unique infer asserts": p.operatorKeyword, JSXAttributeValue: p.attributeValue, JSXText: p.content, "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": p.angleBracket, "JSXIdentifier JSXNameSpacedName": p.tagName, "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": p.attributeName, "JSXBuiltin/JSXIdentifier": p.standard(p.tagName) }), e0 = { __proto__: null, export: 20, as: 25, from: 33, default: 36, async: 41, function: 42, in: 52, out: 55, const: 56, extends: 60, this: 64, true: 72, false: 72, null: 84, void: 88, typeof: 92, super: 108, new: 142, delete: 154, yield: 163, await: 167, class: 172, public: 235, private: 235, protected: 235, readonly: 237, instanceof: 256, satisfies: 259, import: 292, keyof: 349, unique: 353, infer: 359, asserts: 395, is: 397, abstract: 417, implements: 419, type: 421, let: 424, var: 426, using: 429, interface: 435, enum: 439, namespace: 445, module: 447, declare: 451, global: 455, defer: 471, for: 476, of: 485, while: 488, with: 492, do: 496, if: 500, else: 502, switch: 506, case: 512, try: 518, catch: 522, finally: 526, return: 530, throw: 534, break: 538, continue: 542, debugger: 546 }, t0 = { __proto__: null, async: 129, get: 131, set: 133, declare: 195, public: 197, private: 197, protected: 197, static: 199, abstract: 201, override: 203, readonly: 209, accessor: 211, new: 401 }, i0 = { __proto__: null, "<": 193 }, Lf = Xt.deserialize({ version: 14, states: "$F|Q%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#DaO.QQlO'#DgO.bQlO'#DrO%[QlO'#DzO0fQlO'#ESOOQ!0Lf'#E['#E[O1PQ`O'#EXOOQO'#Ep'#EpOOQO'#Il'#IlO1XQ`O'#GsO1dQ`O'#EoO1iQ`O'#EoO3hQ!0MxO'#JrO6[Q!0MxO'#JsO6uQ`O'#F]O6zQ,UO'#FtOOQ!0Lf'#Ff'#FfO7VO7dO'#FfO9XQMhO'#F|O9`Q`O'#F{OOQ!0Lf'#Js'#JsOOQ!0Lb'#Jr'#JrO9eQ`O'#GwOOQ['#K_'#K_O9pQ`O'#IYO9uQ!0LrO'#IZOOQ['#J`'#J`OOQ['#I_'#I_Q`QlOOQ`QlOOO9}Q!L^O'#DvO:UQlO'#EOO:]QlO'#EQO9kQ`O'#GsO:dQMhO'#CoO:rQ`O'#EnO:}Q`O'#EyO;hQMhO'#FeO;xQ`O'#GsOOQO'#K`'#K`O;}Q`O'#K`O<]Q`O'#G{O<]Q`O'#G|O<]Q`O'#HOO9kQ`O'#HRO=SQ`O'#HUO>kQ`O'#CeO>{Q`O'#HcO?TQ`O'#HiO?TQ`O'#HkO`QlO'#HmO?TQ`O'#HoO?TQ`O'#HrO?YQ`O'#HxO?_Q!0LsO'#IOO%[QlO'#IQO?jQ!0LsO'#ISO?uQ!0LsO'#IUO9uQ!0LrO'#IWO@QQ!0MxO'#CiOASQpO'#DlQOQ`OOO%[QlO'#EQOAjQ`O'#ETO:dQMhO'#EnOAuQ`O'#EnOBQQ!bO'#FeOOQ['#Cg'#CgOOQ!0Lb'#Dq'#DqOOQ!0Lb'#Jv'#JvO%[QlO'#JvOOQO'#Jy'#JyOOQO'#Ih'#IhOCQQpO'#EgOOQ!0Lb'#Ef'#EfOOQ!0Lb'#J}'#J}OC|Q!0MSO'#EgODWQpO'#EWOOQO'#Jx'#JxODlQpO'#JyOEyQpO'#EWODWQpO'#EgPFWO&2DjO'#CbPOOO)CD})CD}OOOO'#I`'#I`OFcO#tO,59UOOQ!0Lh,59U,59UOOOO'#Ia'#IaOFqO&jO,59UOGPQ!L^O'#DcOOOO'#Ic'#IcOGWO#@ItO,59{OOQ!0Lf,59{,59{OGfQlO'#IdOGyQ`O'#JtOIxQ!fO'#JtO+}QlO'#JtOJPQ`O,5:ROJgQ`O'#EpOJtQ`O'#KTOKPQ`O'#KSOKPQ`O'#KSOKXQ`O,5;^OK^Q`O'#KROOQ!0Ln,5:^,5:^OKeQlO,5:^OMcQ!0MxO,5:fONSQ`O,5:nONmQ!0LrO'#KQONtQ`O'#KPO9eQ`O'#KPO! YQ`O'#KPO! bQ`O,5;]O! gQ`O'#KPO!#lQ!fO'#JsOOQ!0Lh'#Ci'#CiO%[QlO'#ESO!$[Q!fO,5:sOOQS'#Jz'#JzOOQO-E<j-E<jO9kQ`O,5=_O!$rQ`O,5=_O!$wQlO,5;ZO!&zQMhO'#EkO!(eQ`O,5;ZO!(jQlO'#DyO!(tQpO,5;dO!(|QpO,5;dO%[QlO,5;dOOQ['#FT'#FTOOQ['#FV'#FVO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eOOQ['#FZ'#FZO!)[QlO,5;tOOQ!0Lf,5;y,5;yOOQ!0Lf,5;z,5;zOOQ!0Lf,5;|,5;|O%[QlO'#IpO!+_Q!0LrO,5<iO%[QlO,5;eO!&zQMhO,5;eO!+|QMhO,5;eO!-nQMhO'#E^O%[QlO,5;wOOQ!0Lf,5;{,5;{O!-uQ,UO'#FjO!.rQ,UO'#KXO!.^Q,UO'#KXO!.yQ,UO'#KXOOQO'#KX'#KXO!/_Q,UO,5<SOOOW,5<`,5<`O!/pQlO'#FvOOOW'#Io'#IoO7VO7dO,5<QO!/wQ,UO'#FxOOQ!0Lf,5<Q,5<QO!0hQ$IUO'#CyOOQ!0Lh'#C}'#C}O!0{O#@ItO'#DRO!1iQMjO,5<eO!1pQ`O,5<hO!3YQ(CWO'#GXO!3jQ`O'#GYO!3oQ`O'#GYO!5_Q(CWO'#G^O!6dQpO'#GbOOQO'#Gn'#GnO!,TQMhO'#GmOOQO'#Gp'#GpO!,TQMhO'#GoO!7VQ$IUO'#JlOOQ!0Lh'#Jl'#JlO!7aQ`O'#JkO!7oQ`O'#JjO!7wQ`O'#CuOOQ!0Lh'#C{'#C{O!8YQ`O'#C}OOQ!0Lh'#DV'#DVOOQ!0Lh'#DX'#DXO!8_Q`O,5<eO1SQ`O'#DZO!,TQMhO'#GPO!,TQMhO'#GRO!8gQ`O'#GTO!8lQ`O'#GUO!3oQ`O'#G[O!,TQMhO'#GaO<]Q`O'#JkO!8qQ`O'#EqO!9`Q`O,5<gOOQ!0Lb'#Cr'#CrO!9hQ`O'#ErO!:bQpO'#EsOOQ!0Lb'#KR'#KRO!:iQ!0LrO'#KaO9uQ!0LrO,5=cO`QlO,5>tOOQ['#Jh'#JhOOQ[,5>u,5>uOOQ[-E<]-E<]O!<hQ!0MxO,5:bO!:]QpO,5:`O!?RQ!0MxO,5:jO%[QlO,5:jO!AiQ!0MxO,5:lOOQO,5@z,5@zO!BYQMhO,5=_O!BhQ!0LrO'#JiO9`Q`O'#JiO!ByQ!0LrO,59ZO!CUQpO,59ZO!C^QMhO,59ZO:dQMhO,59ZO!CiQ`O,5;ZO!CqQ`O'#HbO!DVQ`O'#KdO%[QlO,5;}O!:]QpO,5<PO!D_Q`O,5=zO!DdQ`O,5=zO!DiQ`O,5=zO!DwQ`O,5=zO9uQ!0LrO,5=zO<]Q`O,5=jOOQO'#Cy'#CyO!EOQpO,5=gO!EWQMhO,5=hO!EcQ`O,5=jO!EhQ!bO,5=mO!EpQ`O'#K`O?YQ`O'#HWO9kQ`O'#HYO!EuQ`O'#HYO:dQMhO'#H[O!EzQ`O'#H[OOQ[,5=p,5=pO!FPQ`O'#H]O!FbQ`O'#CoO!FgQ`O,59PO!FqQ`O,59PO!HvQlO,59POOQ[,59P,59PO!IWQ!0LrO,59PO%[QlO,59PO!KcQlO'#HeOOQ['#Hf'#HfOOQ['#Hg'#HgO`QlO,5=}O!KyQ`O,5=}O`QlO,5>TO`QlO,5>VO!LOQ`O,5>XO`QlO,5>ZO!LTQ`O,5>^O!LYQlO,5>dOOQ[,5>j,5>jO%[QlO,5>jO9uQ!0LrO,5>lOOQ[,5>n,5>nO#!dQ`O,5>nOOQ[,5>p,5>pO#!dQ`O,5>pOOQ[,5>r,5>rO##QQpO'#D_O%[QlO'#JvO##sQpO'#JvO##}QpO'#DmO#$`QpO'#DmO#&qQlO'#DmO#&xQ`O'#JuO#'QQ`O,5:WO#'VQ`O'#EtO#'eQ`O'#KUO#'mQ`O,5;_O#'rQpO'#DmO#(PQpO'#EVOOQ!0Lf,5:o,5:oO%[QlO,5:oO#(WQ`O,5:oO?YQ`O,5;YO!CUQpO,5;YO!C^QMhO,5;YO:dQMhO,5;YO#(`Q`O,5@bO#(eQ07dO,5:sOOQO-E<f-E<fO#)kQ!0MSO,5;RODWQpO,5:rO#)uQpO,5:rODWQpO,5;RO!ByQ!0LrO,5:rOOQ!0Lb'#Ej'#EjOOQO,5;R,5;RO%[QlO,5;RO#*SQ!0LrO,5;RO#*_Q!0LrO,5;RO!CUQpO,5:rOOQO,5;X,5;XO#*mQ!0LrO,5;RPOOO'#I^'#I^P#+RO&2DjO,58|POOO,58|,58|OOOO-E<^-E<^OOQ!0Lh1G.p1G.pOOOO-E<_-E<_OOOO,59},59}O#+^Q!bO,59}OOOO-E<a-E<aOOQ!0Lf1G/g1G/gO#+cQ!fO,5?OO+}QlO,5?OOOQO,5?U,5?UO#+mQlO'#IdOOQO-E<b-E<bO#+zQ`O,5@`O#,SQ!fO,5@`O#,ZQ`O,5@nOOQ!0Lf1G/m1G/mO%[QlO,5@oO#,cQ`O'#IjOOQO-E<h-E<hO#,ZQ`O,5@nOOQ!0Lb1G0x1G0xOOQ!0Ln1G/x1G/xOOQ!0Ln1G0Y1G0YO%[QlO,5@lO#,wQ!0LrO,5@lO#-YQ!0LrO,5@lO#-aQ`O,5@kO9eQ`O,5@kO#-iQ`O,5@kO#-wQ`O'#ImO#-aQ`O,5@kOOQ!0Lb1G0w1G0wO!(tQpO,5:uO!)PQpO,5:uOOQS,5:w,5:wO#.iQdO,5:wO#.qQMhO1G2yO9kQ`O1G2yOOQ!0Lf1G0u1G0uO#/PQ!0MxO1G0uO#0UQ!0MvO,5;VOOQ!0Lh'#GW'#GWO#0rQ!0MzO'#JlO!$wQlO1G0uO#2}Q!fO'#JwO%[QlO'#JwO#3XQ`O,5:eOOQ!0Lh'#D_'#D_OOQ!0Lf1G1O1G1OO%[QlO1G1OOOQ!0Lf1G1f1G1fO#3^Q`O1G1OO#5rQ!0MxO1G1PO#5yQ!0MxO1G1PO#8aQ!0MxO1G1PO#8hQ!0MxO1G1PO#;OQ!0MxO1G1PO#=fQ!0MxO1G1PO#=mQ!0MxO1G1PO#=tQ!0MxO1G1PO#@[Q!0MxO1G1PO#@cQ!0MxO1G1PO#BpQ?MtO'#CiO#DkQ?MtO1G1`O#DrQ?MtO'#JsO#EVQ!0MxO,5?[OOQ!0Lb-E<n-E<nO#GdQ!0MxO1G1PO#HaQ!0MzO1G1POOQ!0Lf1G1P1G1PO#IdQMjO'#J|O#InQ`O,5:xO#IsQ!0MxO1G1cO#JgQ,UO,5<WO#JoQ,UO,5<XO#JwQ,UO'#FoO#K`Q`O'#FnOOQO'#KY'#KYOOQO'#In'#InO#KeQ,UO1G1nOOQ!0Lf1G1n1G1nOOOW1G1y1G1yO#KvQ?MtO'#JrO#LQQ`O,5<bO!)[QlO,5<bOOOW-E<m-E<mOOQ!0Lf1G1l1G1lO#LVQpO'#KXOOQ!0Lf,5<d,5<dO#L_QpO,5<dO#LdQMhO'#DTOOOO'#Ib'#IbO#LkO#@ItO,59mOOQ!0Lh,59m,59mO%[QlO1G2PO!8lQ`O'#IrO#LvQ`O,5<zOOQ!0Lh,5<w,5<wO!,TQMhO'#IuO#MdQMjO,5=XO!,TQMhO'#IwO#NVQMjO,5=ZO!&zQMhO,5=]OOQO1G2S1G2SO#NaQ!dO'#CrO#NtQ(CWO'#ErO$ |QpO'#GbO$!dQ!dO,5<sO$!kQ`O'#K[O9eQ`O'#K[O$!yQ`O,5<uO$#aQ!dO'#C{O!,TQMhO,5<tO$#kQ`O'#GZO$$PQ`O,5<tO$$UQ!dO'#GWO$$cQ!dO'#K]O$$mQ`O'#K]O!&zQMhO'#K]O$$rQ`O,5<xO$$wQlO'#JvO$%RQpO'#GcO#$`QpO'#GcO$%dQ`O'#GgO!3oQ`O'#GkO$%iQ!0LrO'#ItO$%tQpO,5<|OOQ!0Lp,5<|,5<|O$%{QpO'#GcO$&YQpO'#GdO$&kQpO'#GdO$&pQMjO,5=XO$'QQMjO,5=ZOOQ!0Lh,5=^,5=^O!,TQMhO,5@VO!,TQMhO,5@VO$'bQ`O'#IyO$'vQ`O,5@UO$(OQ`O,59aOOQ!0Lh,59i,59iO$(TQ`O,5@VO$)TQ$IYO,59uOOQ!0Lh'#Jp'#JpO$)vQMjO,5<kO$*iQMjO,5<mO@zQ`O,5<oOOQ!0Lh,5<p,5<pO$*sQ`O,5<vO$*xQMjO,5<{O$+YQ`O'#KPO!$wQlO1G2RO$+_Q`O1G2RO9eQ`O'#KSO9eQ`O'#EtO%[QlO'#EtO9eQ`O'#I{O$+dQ!0LrO,5@{OOQ[1G2}1G2}OOQ[1G4`1G4`OOQ!0Lf1G/|1G/|OOQ!0Lf1G/z1G/zO$-fQ!0MxO1G0UOOQ[1G2y1G2yO!&zQMhO1G2yO%[QlO1G2yO#.tQ`O1G2yO$/jQMhO'#EkOOQ!0Lb,5@T,5@TO$/wQ!0LrO,5@TOOQ[1G.u1G.uO!ByQ!0LrO1G.uO!CUQpO1G.uO!C^QMhO1G.uO$0YQ`O1G0uO$0_Q`O'#CiO$0jQ`O'#KeO$0rQ`O,5=|O$0wQ`O'#KeO$0|Q`O'#KeO$1[Q`O'#JRO$1jQ`O,5AOO$1rQ!fO1G1iOOQ!0Lf1G1k1G1kO9kQ`O1G3fO@zQ`O1G3fO$1yQ`O1G3fO$2OQ`O1G3fO!DiQ`O1G3fO9uQ!0LrO1G3fOOQ[1G3f1G3fO!EcQ`O1G3UO!&zQMhO1G3RO$2TQ`O1G3ROOQ[1G3S1G3SO!&zQMhO1G3SO$2YQ`O1G3SO$2bQpO'#HQOOQ[1G3U1G3UO!6_QpO'#I}O!EhQ!bO1G3XOOQ[1G3X1G3XOOQ[,5=r,5=rO$2jQMhO,5=tO9kQ`O,5=tO$%dQ`O,5=vO9`Q`O,5=vO!CUQpO,5=vO!C^QMhO,5=vO:dQMhO,5=vO$2xQ`O'#KcO$3TQ`O,5=wOOQ[1G.k1G.kO$3YQ!0LrO1G.kO@zQ`O1G.kO$3eQ`O1G.kO9uQ!0LrO1G.kO$5mQ!fO,5AQO$5zQ`O,5AQO9eQ`O,5AQO$6VQlO,5>PO$6^Q`O,5>POOQ[1G3i1G3iO`QlO1G3iOOQ[1G3o1G3oOOQ[1G3q1G3qO?TQ`O1G3sO$6cQlO1G3uO$:gQlO'#HtOOQ[1G3x1G3xO$:tQ`O'#HzO?YQ`O'#H|OOQ[1G4O1G4OO$:|QlO1G4OO9uQ!0LrO1G4UOOQ[1G4W1G4WOOQ!0Lb'#G_'#G_O9uQ!0LrO1G4YO9uQ!0LrO1G4[O$?TQ`O,5@bO!)[QlO,5;`O9eQ`O,5;`O?YQ`O,5:XO!)[QlO,5:XO!CUQpO,5:XO$?YQ?MtO,5:XOOQO,5;`,5;`O$?dQpO'#IeO$?zQ`O,5@aOOQ!0Lf1G/r1G/rO$@SQpO'#IkO$@^Q`O,5@pOOQ!0Lb1G0y1G0yO#$`QpO,5:XOOQO'#Ig'#IgO$@fQpO,5:qOOQ!0Ln,5:q,5:qO#(ZQ`O1G0ZOOQ!0Lf1G0Z1G0ZO%[QlO1G0ZOOQ!0Lf1G0t1G0tO?YQ`O1G0tO!CUQpO1G0tO!C^QMhO1G0tOOQ!0Lb1G5|1G5|O!ByQ!0LrO1G0^OOQO1G0m1G0mO%[QlO1G0mO$@mQ!0LrO1G0mO$@xQ!0LrO1G0mO!CUQpO1G0^ODWQpO1G0^O$AWQ!0LrO1G0mOOQO1G0^1G0^O$AlQ!0MxO1G0mPOOO-E<[-E<[POOO1G.h1G.hOOOO1G/i1G/iO$AvQ!bO,5<iO$BOQ!fO1G4jOOQO1G4p1G4pO%[QlO,5?OO$BYQ`O1G5zO$BbQ`O1G6YO$BjQ!fO1G6ZO9eQ`O,5?UO$BtQ!0MxO1G6WO%[QlO1G6WO$CUQ!0LrO1G6WO$CgQ`O1G6VO$CgQ`O1G6VO9eQ`O1G6VO$CoQ`O,5?XO9eQ`O,5?XOOQO,5?X,5?XO$DTQ`O,5?XO$+YQ`O,5?XOOQO-E<k-E<kOOQS1G0a1G0aOOQS1G0c1G0cO#.lQ`O1G0cOOQ[7+(e7+(eO!&zQMhO7+(eO%[QlO7+(eO$DcQ`O7+(eO$DnQMhO7+(eO$D|Q!0MzO,5=XO$GXQ!0MzO,5=ZO$IdQ!0MzO,5=XO$KuQ!0MzO,5=ZO$NWQ!0MzO,59uO%!]Q!0MzO,5<kO%$hQ!0MzO,5<mO%&sQ!0MzO,5<{OOQ!0Lf7+&a7+&aO%)UQ!0MxO7+&aO%)xQlO'#IfO%*VQ`O,5@cO%*_Q!fO,5@cOOQ!0Lf1G0P1G0PO%*iQ`O7+&jOOQ!0Lf7+&j7+&jO%*nQ?MtO,5:fO%[QlO7+&zO%*xQ?MtO,5:bO%+VQ?MtO,5:jO%+aQ?MtO,5:lO%+kQMhO'#IiO%+uQ`O,5@hOOQ!0Lh1G0d1G0dOOQO1G1r1G1rOOQO1G1s1G1sO%+}Q!jO,5<ZO!)[QlO,5<YOOQO-E<l-E<lOOQ!0Lf7+'Y7+'YOOOW7+'e7+'eOOOW1G1|1G1|O%,YQ`O1G1|OOQ!0Lf1G2O1G2OOOOO,59o,59oO%,_Q!dO,59oOOOO-E<`-E<`OOQ!0Lh1G/X1G/XO%,fQ!0MxO7+'kOOQ!0Lh,5?^,5?^O%-YQMhO1G2fP%-aQ`O'#IrPOQ!0Lh-E<p-E<pO%-}QMjO,5?aOOQ!0Lh-E<s-E<sO%.pQMjO,5?cOOQ!0Lh-E<u-E<uO%.zQ!dO1G2wO%/RQ!dO'#CrO%/iQMhO'#KSO$$wQlO'#JvOOQ!0Lh1G2_1G2_O%/sQ`O'#IqO%0[Q`O,5@vO%0[Q`O,5@vO%0dQ`O,5@vO%0oQ`O,5@vOOQO1G2a1G2aO%0}QMjO1G2`O$+YQ`O'#K[O!,TQMhO1G2`O%1_Q(CWO'#IsO%1lQ`O,5@wO!&zQMhO,5@wO%1tQ!dO,5@wOOQ!0Lh1G2d1G2dO%4UQ!fO'#CiO%4`Q`O,5=POOQ!0Lb,5<},5<}O%4hQpO,5<}OOQ!0Lb,5=O,5=OOCwQ`O,5<}O%4sQpO,5<}OOQ!0Lb,5=R,5=RO$+YQ`O,5=VOOQO,5?`,5?`OOQO-E<r-E<rOOQ!0Lp1G2h1G2hO#$`QpO,5<}O$$wQlO,5=PO%5RQ`O,5=OO%5^QpO,5=OO!,TQMhO'#IuO%6WQMjO1G2sO!,TQMhO'#IwO%6yQMjO1G2uO%7TQMjO1G5qO%7_QMjO1G5qOOQO,5?e,5?eOOQO-E<w-E<wOOQO1G.{1G.{O!,TQMhO1G5qO!,TQMhO1G5qO!:]QpO,59wO%[QlO,59wOOQ!0Lh,5<j,5<jO%7lQ`O1G2ZO!,TQMhO1G2bO%7qQ!0MxO7+'mOOQ!0Lf7+'m7+'mO!$wQlO7+'mO%8eQ`O,5;`OOQ!0Lb,5?g,5?gOOQ!0Lb-E<y-E<yO%8jQ!dO'#K^O#(ZQ`O7+(eO4UQ!fO7+(eO$DfQ`O7+(eO%8tQ!0MvO'#CiO%9XQ!0MvO,5=SO%9lQ`O,5=SO%9tQ`O,5=SOOQ!0Lb1G5o1G5oOOQ[7+$a7+$aO!ByQ!0LrO7+$aO!CUQpO7+$aO!$wQlO7+&aO%9yQ`O'#JQO%:bQ`O,5APOOQO1G3h1G3hO9kQ`O,5APO%:bQ`O,5APO%:jQ`O,5APOOQO,5?m,5?mOOQO-E=P-E=POOQ!0Lf7+'T7+'TO%:oQ`O7+)QO9uQ!0LrO7+)QO9kQ`O7+)QO@zQ`O7+)QO%:tQ`O7+)QOOQ[7+)Q7+)QOOQ[7+(p7+(pO%:yQ!0MvO7+(mO!&zQMhO7+(mO!E^Q`O7+(nOOQ[7+(n7+(nO!&zQMhO7+(nO%;TQ`O'#KbO%;`Q`O,5=lOOQO,5?i,5?iOOQO-E<{-E<{OOQ[7+(s7+(sO%<rQpO'#HZOOQ[1G3`1G3`O!&zQMhO1G3`O%[QlO1G3`O%<yQ`O1G3`O%=UQMhO1G3`O9uQ!0LrO1G3bO$%dQ`O1G3bO9`Q`O1G3bO!CUQpO1G3bO!C^QMhO1G3bO%=dQ`O'#JPO%=xQ`O,5@}O%>QQpO,5@}OOQ!0Lb1G3c1G3cOOQ[7+$V7+$VO@zQ`O7+$VO9uQ!0LrO7+$VO%>]Q`O7+$VO%[QlO1G6lO%[QlO1G6mO%>bQ!0LrO1G6lO%>lQlO1G3kO%>sQ`O1G3kO%>xQlO1G3kOOQ[7+)T7+)TO9uQ!0LrO7+)_O`QlO7+)aOOQ['#Kh'#KhOOQ['#JS'#JSO%?PQlO,5>`OOQ[,5>`,5>`O%[QlO'#HuO%?^Q`O'#HwOOQ[,5>f,5>fO9eQ`O,5>fOOQ[,5>h,5>hOOQ[7+)j7+)jOOQ[7+)p7+)pOOQ[7+)t7+)tOOQ[7+)v7+)vO%?cQpO1G5|O%?}Q?MtO1G0zO%@XQ`O1G0zOOQO1G/s1G/sO%@dQ?MtO1G/sO?YQ`O1G/sO!)[QlO'#DmOOQO,5?P,5?POOQO-E<c-E<cOOQO,5?V,5?VOOQO-E<i-E<iO!CUQpO1G/sOOQO-E<e-E<eOOQ!0Ln1G0]1G0]OOQ!0Lf7+%u7+%uO#(ZQ`O7+%uOOQ!0Lf7+&`7+&`O?YQ`O7+&`O!CUQpO7+&`OOQO7+%x7+%xO$AlQ!0MxO7+&XOOQO7+&X7+&XO%[QlO7+&XO%@nQ!0LrO7+&XO!ByQ!0LrO7+%xO!CUQpO7+%xO%@yQ!0LrO7+&XO%AXQ!0MxO7++rO%[QlO7++rO%AiQ`O7++qO%AiQ`O7++qOOQO1G4s1G4sO9eQ`O1G4sO%AqQ`O1G4sOOQS7+%}7+%}O#(ZQ`O<<LPO4UQ!fO<<LPO%BPQ`O<<LPOOQ[<<LP<<LPO!&zQMhO<<LPO%[QlO<<LPO%BXQ`O<<LPO%BdQ!0MzO,5?aO%DoQ!0MzO,5?cO%FzQ!0MzO1G2`O%I]Q!0MzO1G2sO%KhQ!0MzO1G2uO%MsQ!fO,5?QO%[QlO,5?QOOQO-E<d-E<dO%M}Q`O1G5}OOQ!0Lf<<JU<<JUO%NVQ?MtO1G0uO&!^Q?MtO1G1PO&!eQ?MtO1G1PO&$fQ?MtO1G1PO&$mQ?MtO1G1PO&&nQ?MtO1G1PO&(oQ?MtO1G1PO&(vQ?MtO1G1PO&(}Q?MtO1G1PO&+OQ?MtO1G1PO&+VQ?MtO1G1PO&+^Q!0MxO<<JfO&-UQ?MtO1G1PO&.RQ?MvO1G1PO&/UQ?MvO'#JlO&1[Q?MtO1G1cO&1iQ?MtO1G0UO&1sQMjO,5?TOOQO-E<g-E<gO!)[QlO'#FqOOQO'#KZ'#KZOOQO1G1u1G1uO&1}Q`O1G1tO&2SQ?MtO,5?[OOOW7+'h7+'hOOOO1G/Z1G/ZO&2^Q!dO1G4xOOQ!0Lh7+(Q7+(QP!&zQMhO,5?^O!,TQMhO7+(cO&2eQ`O,5?]O9eQ`O,5?]O$+YQ`O,5?]OOQO-E<o-E<oO&2sQ`O1G6bO&2sQ`O1G6bO&2{Q`O1G6bO&3WQMjO7+'zO&3hQ!dO,5?_O&3rQ`O,5?_O!&zQMhO,5?_OOQO-E<q-E<qO&3wQ!dO1G6cO&4RQ`O1G6cO&4ZQ`O1G2kO!&zQMhO1G2kOOQ!0Lb1G2i1G2iOOQ!0Lb1G2j1G2jO%4hQpO1G2iO!CUQpO1G2iOCwQ`O1G2iOOQ!0Lb1G2q1G2qO&4`QpO1G2iO&4nQ`O1G2kO$+YQ`O1G2jOCwQ`O1G2jO$$wQlO1G2kO&4vQ`O1G2jO&5jQMjO,5?aOOQ!0Lh-E<t-E<tO&6]QMjO,5?cOOQ!0Lh-E<v-E<vO!,TQMhO7++]O&6gQMjO7++]O&6qQMjO7++]OOQ!0Lh1G/c1G/cO&7OQ`O1G/cOOQ!0Lh7+'u7+'uO&7TQMjO7+'|O&7eQ!0MxO<<KXOOQ!0Lf<<KX<<KXO&8XQ`O1G0zO!&zQMhO'#IzO&8^Q`O,5@xO&:`Q!fO<<LPO!&zQMhO1G2nO&:gQ!0LrO1G2nOOQ[<<G{<<G{O!ByQ!0LrO<<G{O&:xQ!0MxO<<I{OOQ!0Lf<<I{<<I{OOQO,5?l,5?lO&;lQ`O,5?lO&;qQ`O,5?lOOQO-E=O-E=OO&<PQ`O1G6kO&<PQ`O1G6kO9kQ`O1G6kO@zQ`O<<LlOOQ[<<Ll<<LlO&<XQ`O<<LlO9uQ!0LrO<<LlO9kQ`O<<LlOOQ[<<LX<<LXO%:yQ!0MvO<<LXOOQ[<<LY<<LYO!E^Q`O<<LYO&<^QpO'#I|O&<iQ`O,5@|O!)[QlO,5@|OOQ[1G3W1G3WOOQO'#JO'#JOO9uQ!0LrO'#JOO&<qQpO,5=uOOQ[,5=u,5=uO&<xQpO'#EgO&=PQpO'#GeO&=UQ`O7+(zO&=ZQ`O7+(zOOQ[7+(z7+(zO!&zQMhO7+(zO%[QlO7+(zO&=cQ`O7+(zOOQ[7+(|7+(|O9uQ!0LrO7+(|O$%dQ`O7+(|O9`Q`O7+(|O!CUQpO7+(|O&=nQ`O,5?kOOQO-E<}-E<}OOQO'#H^'#H^O&=yQ`O1G6iO9uQ!0LrO<<GqOOQ[<<Gq<<GqO@zQ`O<<GqO&>RQ`O7+,WO&>WQ`O7+,XO%[QlO7+,WO%[QlO7+,XOOQ[7+)V7+)VO&>]Q`O7+)VO&>bQlO7+)VO&>iQ`O7+)VOOQ[<<Ly<<LyOOQ[<<L{<<L{OOQ[-E=Q-E=QOOQ[1G3z1G3zO&>nQ`O,5>aOOQ[,5>c,5>cO&>sQ`O1G4QO9eQ`O7+&fO!)[QlO7+&fOOQO7+%_7+%_O&>xQ?MtO1G6ZO?YQ`O7+%_OOQ!0Lf<<Ia<<IaOOQ!0Lf<<Iz<<IzO?YQ`O<<IzOOQO<<Is<<IsO$AlQ!0MxO<<IsO%[QlO<<IsOOQO<<Id<<IdO!ByQ!0LrO<<IdO&?SQ!0LrO<<IsO&?_Q!0MxO<= ^O&?oQ`O<= ]OOQO7+*_7+*_O9eQ`O7+*_OOQ[ANAkANAkO&?wQ!fOANAkO!&zQMhOANAkO#(ZQ`OANAkO4UQ!fOANAkO&@OQ`OANAkO%[QlOANAkO&@WQ!0MzO7+'zO&BiQ!0MzO,5?aO&DtQ!0MzO,5?cO&GPQ!0MzO7+'|O&IbQ!fO1G4lO&IlQ?MtO7+&aO&KpQ?MvO,5=XO&MwQ?MvO,5=ZO&NXQ?MvO,5=XO&NiQ?MvO,5=ZO&NyQ?MvO,59uO'#PQ?MvO,5<kO'%SQ?MvO,5<mO''hQ?MvO,5<{O')^Q?MtO7+'kO')kQ?MtO7+'mO')xQ`O,5<]OOQO7+'`7+'`OOQ!0Lh7+*d7+*dO')}QMjO<<K}OOQO1G4w1G4wO'*UQ`O1G4wO'*aQ`O1G4wO'*oQ`O7++|O'*oQ`O7++|O!&zQMhO1G4yO'*wQ!dO1G4yO'+RQ`O7++}O'+ZQ`O7+(VO'+fQ!dO7+(VOOQ!0Lb7+(T7+(TOOQ!0Lb7+(U7+(UO!CUQpO7+(TOCwQ`O7+(TO'+pQ`O7+(VO!&zQMhO7+(VO$+YQ`O7+(UO'+uQ`O7+(VOCwQ`O7+(UO'+}QMjO<<NwO!,TQMhO<<NwOOQ!0Lh7+$}7+$}O',XQ!dO,5?fOOQO-E<x-E<xO',cQ!0MvO7+(YO!&zQMhO7+(YOOQ[AN=gAN=gO9kQ`O1G5WOOQO1G5W1G5WO',sQ`O1G5WO',xQ`O7+,VO',xQ`O7+,VO9uQ!0LrOANBWO@zQ`OANBWOOQ[ANBWANBWO'-QQ`OANBWOOQ[ANAsANAsOOQ[ANAtANAtO'-VQ`O,5?hOOQO-E<z-E<zO'-bQ?MtO1G6hOOQO,5?j,5?jOOQO-E<|-E<|OOQ[1G3a1G3aO'-lQ`O,5=POOQ[<<Lf<<LfO!&zQMhO<<LfO&=UQ`O<<LfO'-qQ`O<<LfO%[QlO<<LfOOQ[<<Lh<<LhO9uQ!0LrO<<LhO$%dQ`O<<LhO9`Q`O<<LhO'-yQpO1G5VO'.UQ`O7+,TOOQ[AN=]AN=]O9uQ!0LrOAN=]OOQ[<= r<= rOOQ[<= s<= sO'.^Q`O<= rO'.cQ`O<= sOOQ[<<Lq<<LqO'.hQ`O<<LqO'.mQlO<<LqOOQ[1G3{1G3{O?YQ`O7+)lO'.tQ`O<<JQO'/PQ?MtO<<JQOOQO<<Hy<<HyOOQ!0LfAN?fAN?fOOQOAN?_AN?_O$AlQ!0MxOAN?_OOQOAN?OAN?OO%[QlOAN?_OOQO<<My<<MyOOQ[G27VG27VO!&zQMhOG27VO#(ZQ`OG27VO'/ZQ!fOG27VO4UQ!fOG27VO'/bQ`OG27VO'/jQ?MtO<<JfO'/wQ?MvO1G2`O'1mQ?MvO,5?aO'3pQ?MvO,5?cO'5sQ?MvO1G2sO'7vQ?MvO1G2uO'9yQ?MtO<<KXO':WQ?MtO<<I{OOQO1G1w1G1wO!,TQMhOANAiOOQO7+*c7+*cO':eQ`O7+*cO':pQ`O<= hO':xQ!dO7+*eOOQ!0Lb<<Kq<<KqO$+YQ`O<<KqOCwQ`O<<KqO';SQ`O<<KqO!&zQMhO<<KqOOQ!0Lb<<Ko<<KoO!CUQpO<<KoO';_Q!dO<<KqOOQ!0Lb<<Kp<<KpO';iQ`O<<KqO!&zQMhO<<KqO$+YQ`O<<KpO';nQMjOANDcO';xQ!0MvO<<KtOOQO7+*r7+*rO9kQ`O7+*rO'<YQ`O<= qOOQ[G27rG27rO9uQ!0LrOG27rO@zQ`OG27rO!)[QlO1G5SO'<bQ`O7+,SO'<jQ`O1G2kO&=UQ`OANBQOOQ[ANBQANBQO!&zQMhOANBQO'<oQ`OANBQOOQ[ANBSANBSO9uQ!0LrOANBSO$%dQ`OANBSOOQO'#H_'#H_OOQO7+*q7+*qOOQ[G22wG22wOOQ[ANE^ANE^OOQ[ANE_ANE_OOQ[ANB]ANB]O'<wQ`OANB]OOQ[<<MW<<MWO!)[QlOAN?lOOQOG24yG24yO$AlQ!0MxOG24yO#(ZQ`OLD,qOOQ[LD,qLD,qO!&zQMhOLD,qO'<|Q!fOLD,qO'=TQ?MvO7+'zO'>yQ?MvO,5?aO'@|Q?MvO,5?cO'CPQ?MvO7+'|O'DuQMjOG27TOOQO<<M}<<M}OOQ!0LbANA]ANA]O$+YQ`OANA]OCwQ`OANA]O'EVQ!dOANA]OOQ!0LbANAZANAZO'E^Q`OANA]O!&zQMhOANA]O'EiQ!dOANA]OOQ!0LbANA[ANA[OOQO<<N^<<N^OOQ[LD-^LD-^O9uQ!0LrOLD-^O'EsQ?MtO7+*nOOQO'#Gf'#GfOOQ[G27lG27lO&=UQ`OG27lO!&zQMhOG27lOOQ[G27nG27nO9uQ!0LrOG27nOOQ[G27wG27wO'E}Q?MtOG25WOOQOLD*eLD*eOOQ[!$(!]!$(!]O#(ZQ`O!$(!]O!&zQMhO!$(!]O'FXQ!0MzOG27TOOQ!0LbG26wG26wO$+YQ`OG26wO'HjQ`OG26wOCwQ`OG26wO'HuQ!dOG26wO!&zQMhOG26wOOQ[!$(!x!$(!xOOQ[LD-WLD-WO&=UQ`OLD-WOOQ[LD-YLD-YOOQ[!)9Ew!)9EwO#(ZQ`O!)9EwOOQ!0LbLD,cLD,cO$+YQ`OLD,cOCwQ`OLD,cO'H|Q`OLD,cO'IXQ!dOLD,cOOQ[!$(!r!$(!rOOQ[!.K;c!.K;cO'I`Q?MvOG27TOOQ!0Lb!$( }!$( }O$+YQ`O!$( }OCwQ`O!$( }O'KUQ`O!$( }OOQ!0Lb!)9Ei!)9EiO$+YQ`O!)9EiOCwQ`O!)9EiOOQ!0Lb!.K;T!.K;TO$+YQ`O!.K;TOOQ!0Lb!4/0o!4/0oO!)[QlO'#DzO1PQ`O'#EXO'KaQ!fO'#JrO'KhQ!L^O'#DvO'KoQlO'#EOO'KvQ!fO'#CiO'N^Q!fO'#CiO!)[QlO'#EQO'NnQlO,5;ZO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO'#IpO(!qQ`O,5<iO!)[QlO,5;eO(!yQMhO,5;eO($dQMhO,5;eO!)[QlO,5;wO!&zQMhO'#GmO(!yQMhO'#GmO!&zQMhO'#GoO(!yQMhO'#GoO1SQ`O'#DZO1SQ`O'#DZO!&zQMhO'#GPO(!yQMhO'#GPO!&zQMhO'#GRO(!yQMhO'#GRO!&zQMhO'#GaO(!yQMhO'#GaO!)[QlO,5:jO($kQpO'#D_O($uQpO'#JvO!)[QlO,5@oO'NnQlO1G0uO(%PQ?MtO'#CiO!)[QlO1G2PO!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO(%ZQ!dO'#CrO!&zQMhO,5<tO(!yQMhO,5<tO'NnQlO1G2RO!)[QlO7+&zO!&zQMhO1G2`O(!yQMhO1G2`O!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO!&zQMhO1G2bO(!yQMhO1G2bO'NnQlO7+'mO'NnQlO7+&aO!&zQMhOANAiO(!yQMhOANAiO(%nQ`O'#EoO(%sQ`O'#EoO(%{Q`O'#F]O(&QQ`O'#EyO(&VQ`O'#KTO(&bQ`O'#KRO(&mQ`O,5;ZO(&rQMjO,5<eO(&yQ`O'#GYO('OQ`O'#GYO('TQ`O,5<eO(']Q`O,5<gO('eQ`O,5;ZO('mQ?MtO1G1`O('tQ`O,5<tO('yQ`O,5<tO((OQ`O,5<vO((TQ`O,5<vO((YQ`O1G2RO((_Q`O1G0uO((dQMjO<<K}O((kQMjO<<K}O((rQMhO'#F|O9`Q`O'#F{OAuQ`O'#EnO!)[QlO,5;tO!3oQ`O'#GYO!3oQ`O'#GYO!3oQ`O'#G[O!3oQ`O'#G[O!,TQMhO7+(cO!,TQMhO7+(cO%.zQ!dO1G2wO%.zQ!dO1G2wO!&zQMhO,5=]O!&zQMhO,5=]", stateData: "()x~O'|OS'}OSTOS(ORQ~OPYOQYOSfOY!VOaqOdzOeyOl!POpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!uwO!xxO!|]O$W|O$niO%h}O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO&W!WO&^!XO&`!YO&b!ZO&d![O&g!]O&m!^O&s!_O&u!`O&w!aO&y!bO&{!cO(TSO(VTO(YUO(aVO(o[O~OWtO~P`OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa!wOs!nO!S!oO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!xO#W!pO#X!pO#[!zO#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O(O!{O~OP]XR]X[]Xa]Xj]Xr]X!Q]X!S]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X'z]X(a]X(r]X(y]X(z]X~O!g%RX~P(qO_!}O(V#PO(W!}O(X#PO~O_#QO(X#PO(Y#PO(Z#QO~Ox#SO!U#TO(b#TO(c#VO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T<ZO(VTO(YUO(aVO(o[O~O![#ZO!]#WO!Y(hP!Y(vP~P+}O!^#cO~P`OPYOQYOSfOd!jOe!iOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(VTO(YUO(aVO(o[O~Op#mO![#iO!|]O#i#lO#j#iO(T<[O!k(sP~P.iO!l#oO(T#nO~O!x#sO!|]O%h#tO~O#k#uO~O!g#vO#k#uO~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!]$_O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa(fX'z(fX'w(fX!k(fX!Y(fX!_(fX%i(fX!g(fX~P1qO#S$dO#`$eO$Q$eOP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX!_(gX%i(gX~Oa(gX'z(gX'w(gX!Y(gX!k(gXv(gX!g(gX~P4UO#`$eO~O$]$hO$_$gO$f$mO~OSfO!_$nO$i$oO$k$qO~Oh%VOj%dOk%dOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T$sO(VTO(YUO(a$uO(y$}O(z%POg(^P~Ol%[O~P7eO!l%eO~O!S%hO!_%iO(T%gO~O!g%mO~Oa%nO'z%nO~O!Q%rO~P%[O(U!lO~P%[O%n%vO~P%[Oh%VO!l%eO(T%gO(U!lO~Oe%}O!l%eO(T%gO~Oj$RO~O!_&PO(T%gO(U!lO(VTO(YUO`)WP~O!Q&SO!l&RO%j&VO&T&WO~P;SO!x#sO~O%s&YO!S)SX!_)SX(T)SX~O(T&ZO~Ol!PO!u&`O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO~Od&eOe&dO!x&bO%h&cO%{&aO~P<bOd&hOeyOl!PO!_&gO!u&`O!xxO!|]O%h}O%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO~Ob&kO#`&nO%j&iO(U!lO~P=gO!l&oO!u&sO~O!l#oO~O!_XO~Oa%nO'x&{O'z%nO~Oa%nO'x'OO'z%nO~Oa%nO'x'QO'z%nO~O'w]X!Y]Xv]X!k]X&[]X!_]X%i]X!g]X~P(qO!b'_O!c'WO!d'WO(U!lO(VTO(YUO~Os'UO!S'TO!['XO(e'SO!^(iP!^(xP~P@nOn'bO!_'`O(T%gO~Oe'gO!l%eO(T%gO~O!Q&SO!l&RO~Os!nO!S!oO!|<VO#T!pO#U!pO#W!pO#X!pO(U!lO(VTO(YUO(e!mO(o!sO~O!b'mO!c'lO!d'lO#V!pO#['nO#]'nO~PBYOa%nOh%VO!g#vO!l%eO'z%nO(r'pO~O!p'tO#`'rO~PChOs!nO!S!oO(VTO(YUO(e!mO(o!sO~O!_XOs(mX!S(mX!b(mX!c(mX!d(mX!|(mX#T(mX#U(mX#V(mX#W(mX#X(mX#[(mX#](mX(U(mX(V(mX(Y(mX(e(mX(o(mX~O!c'lO!d'lO(U!lO~PDWO(P'xO(Q'xO(R'zO~O_!}O(V'|O(W!}O(X'|O~O_#QO(X'|O(Y'|O(Z#QO~Ov(OO~P%[Ox#SO!U#TO(b#TO(c(RO~O![(TO!Y'WX!Y'^X!]'WX!]'^X~P+}O!](VO!Y(hX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!](VO!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~O!Y(hX~PHRO!Y([O~O!Y(uX!](uX!g(uX!k(uX(r(uX~O#`(uX#k#dX!^(uX~PJUO#`(]O!Y(wX!](wX~O!](^O!Y(vX~O!Y(aO~O#`$eO~PJUO!^(bO~P`OR#zO!Q#yO!S#{O!l#xO(aVOP!na[!naj!nar!na!]!na!p!na#R!na#n!na#o!na#p!na#q!na#r!na#s!na#t!na#u!na#v!na#x!na#z!na#{!na(r!na(y!na(z!na~Oa!na'z!na'w!na!Y!na!k!nav!na!_!na%i!na!g!na~PKlO!k(cO~O!g#vO#`(dO(r'pO!](tXa(tX'z(tX~O!k(tX~PNXO!S%hO!_%iO!|]O#i(iO#j(hO(T%gO~O!](jO!k(sX~O!k(lO~O!S%hO!_%iO#j(hO(T%gO~OP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~O!g#vO!k(gX~P! uOR(nO!Q(mO!l#xO#S$dO!|!{a!S!{a~O!x!{a%h!{a!_!{a#i!{a#j!{a(T!{a~P!#vO!x(rO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~O#k(xO~O![(zO!k(kP~P%[O(e(|O(o[O~O!S)OO!l#xO(e(|O(o[O~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]$_Oa$qa'z$qa'w$qa!k$qa!Y$qa!_$qa%i$qa!g$qa~Ol)dO~P!&zOh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Og(pP~P!,TO!Q)iO!g)hO!_$^X$Z$^X$]$^X$_$^X$f$^X~O!g)hO!_({X$Z({X$]({X$_({X$f({X~O!Q)iO~P!.^O!Q)iO!_({X$Z({X$]({X$_({X$f({X~O!_)kO$Z)oO$])jO$_)jO$f)pO~O![)sO~P!)[O$]$hO$_$gO$f)wO~On$zX!Q$zX#S$zX'y$zX(y$zX(z$zX~OgmXg$zXnmX!]mX#`mX~P!0SOx)yO(b)zO(c)|O~On*VO!Q*OO'y*PO(y$}O(z%PO~Og)}O~P!1WOg*WO~Oh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S*YO!_*ZO!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op*`O![*^O(T*XO!k)OP~P!1uO#k*aO~O!l*bO~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T*dO(VTO(YUO(a$uO(y$}O(z%PO~O![*gO!Y)PP~P!3tOr*sOs!nO!S*iO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO(e!mO~O!^*pO~P!5iO#S$dOn(`X!Q(`X'y(`X(y(`X(z(`X!](`X#`(`X~Og(`X$O(`X~P!6kOn*xO#`*wOg(_X!](_X~O!]*yOg(^X~Oj%dOk%dOl%dO(T&ZOg(^P~Os*|O~Og)}O(T&ZO~O!l+SO~O(T(vO~Op+WO!S%hO![#iO!_%iO!|]O#i#lO#j#iO(T%gO!k(sP~O!g#vO#k+XO~O!S%hO![+ZO!](^O!_%iO(T%gO!Y(vP~Os'[O!S+]O![+[O(VTO(YUO(e(|O~O!^(xP~P!9|O!]+^Oa)TX'z)TX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa!ja!]!ja'z!ja'w!ja!Y!ja!k!jav!ja!_!ja%i!ja!g!ja~P!:tOR#zO!Q#yO!S#{O!l#xO(aVOP!ra[!raj!rar!ra!]!ra!p!ra#R!ra#n!ra#o!ra#p!ra#q!ra#r!ra#s!ra#t!ra#u!ra#v!ra#x!ra#z!ra#{!ra(r!ra(y!ra(z!ra~Oa!ra'z!ra'w!ra!Y!ra!k!rav!ra!_!ra%i!ra!g!ra~P!=[OR#zO!Q#yO!S#{O!l#xO(aVOP!ta[!taj!tar!ta!]!ta!p!ta#R!ta#n!ta#o!ta#p!ta#q!ta#r!ta#s!ta#t!ta#u!ta#v!ta#x!ta#z!ta#{!ta(r!ta(y!ta(z!ta~Oa!ta'z!ta'w!ta!Y!ta!k!tav!ta!_!ta%i!ta!g!ta~P!?rOh%VOn+gO!_'`O%i+fO~O!g+iOa(]X!_(]X'z(]X!](]X~Oa%nO!_XO'z%nO~Oh%VO!l%eO~Oh%VO!l%eO(T%gO~O!g#vO#k(xO~Ob+tO%j+uO(T+qO(VTO(YUO!^)XP~O!]+vO`)WX~O[+zO~O`+{O~O!_&PO(T%gO(U!lO`)WP~O%j,OO~P;SOh%VO#`,SO~Oh%VOn,VO!_$|O~O!_,XO~O!Q,ZO!_XO~O%n%vO~O!x,`O~Oe,eO~Ob,fO(T#nO(VTO(YUO!^)VP~Oe%}O~O%j!QO(T&ZO~P=gO[,kO`,jO~OPYOQYOSfOdzOeyOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!iuO!lZO!oYO!pYO!qYO!svO!xxO!|]O$niO%h}O(VTO(YUO(aVO(o[O~O!_!eO!u!gO$W!kO(T!dO~P!FyO`,jOa%nO'z%nO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa,pOl!OO!uwO%l!OO%m!OO%n!OO~P!IcO!l&oO~O&^,vO~O!_,xO~O&o,zO&q,{OP&laQ&laS&laY&laa&lad&lae&lal&lap&lar&las&lat&laz&la|&la!O&la!S&la!W&la!X&la!_&la!i&la!l&la!o&la!p&la!q&la!s&la!u&la!x&la!|&la$W&la$n&la%h&la%j&la%l&la%m&la%n&la%q&la%s&la%v&la%w&la%y&la&W&la&^&la&`&la&b&la&d&la&g&la&m&la&s&la&u&la&w&la&y&la&{&la'w&la(T&la(V&la(Y&la(a&la(o&la!^&la&e&lab&la&j&la~O(T-QO~Oh!eX!]!RX!^!RX!g!RX!g!eX!l!eX#`!RX~O!]!eX!^!eX~P#!iO!g-VO#`-UOh(jX!]#hX!^#hX!g(jX!l(jX~O!](jX!^(jX~P##[Oh%VO!g-XO!l%eO!]!aX!^!aX~Os!nO!S!oO(VTO(YUO(e!mO~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(VTO(YUO(aVO(o[O~O(T=QO~P#$qO!]-]O!^(iX~O!^-_O~O!g-VO#`-UO!]#hX!^#hX~O!]-`O!^(xX~O!^-bO~O!c-cO!d-cO(U!lO~P#$`O!^-fO~P'_On-iO!_'`O~O!Y-nO~Os!{a!b!{a!c!{a!d!{a#T!{a#U!{a#V!{a#W!{a#X!{a#[!{a#]!{a(U!{a(V!{a(Y!{a(e!{a(o!{a~P!#vO!p-sO#`-qO~PChO!c-uO!d-uO(U!lO~PDWOa%nO#`-qO'z%nO~Oa%nO!g#vO#`-qO'z%nO~Oa%nO!g#vO!p-sO#`-qO'z%nO(r'pO~O(P'xO(Q'xO(R-zO~Ov-{O~O!Y'Wa!]'Wa~P!:tO![.PO!Y'WX!]'WX~P%[O!](VO!Y(ha~O!Y(ha~PHRO!](^O!Y(va~O!S%hO![.TO!_%iO(T%gO!Y'^X!]'^X~O#`.VO!](ta!k(taa(ta'z(ta~O!g#vO~P#,wO!](jO!k(sa~O!S%hO!_%iO#j.ZO(T%gO~Op.`O!S%hO![.]O!_%iO!|]O#i._O#j.]O(T%gO!]'aX!k'aX~OR.dO!l#xO~Oh%VOn.gO!_'`O%i.fO~Oa#ci!]#ci'z#ci'w#ci!Y#ci!k#civ#ci!_#ci%i#ci!g#ci~P!:tOn>]O!Q*OO'y*PO(y$}O(z%PO~O#k#_aa#_a#`#_a'z#_a!]#_a!k#_a!_#_a!Y#_a~P#/sO#k(`XP(`XR(`X[(`Xa(`Xj(`Xr(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X'z(`X(a(`X(r(`X!k(`X!Y(`X'w(`Xv(`X!_(`X%i(`X!g(`X~P!6kO!].tO!k(kX~P!:tO!k.wO~O!Y.yO~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mia#mij#mir#mi!]#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#n#mi~P#3cO#n$OO~P#3cOP$[OR#zOr$aO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO[#mia#mij#mi!]#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#r#mi~P#6QO#r$QO~P#6QOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO(aVOa#mi!]#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#v#mi~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO(aVO(z#}Oa#mi!]#mi#z#mi#{#mi'z#mi(r#mi(y#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#x$UO~P#;VO#x#mi~P#;VO#v$SO~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO(aVO(y#|O(z#}Oa#mi!]#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#z#mi~P#={O#z$WO~P#={OP]XR]X[]Xj]Xr]X!Q]X!S]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X!]]X!^]X~O$O]X~P#@jOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO#z<gO#{<hO(aVO(r$YO(y#|O(z#}O~O$O.{O~P#BwO#S$dO#`<nO$Q<nO$O(gX!^(gX~P! uOa'da!]'da'z'da'w'da!k'da!Y'dav'da!_'da%i'da!g'da~P!:tO[#mia#mij#mir#mi!]#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO(y#mi(z#mi~P#EyOn>]O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P#EyO!]/POg(pX~P!1WOg/RO~Oa$Pi!]$Pi'z$Pi'w$Pi!Y$Pi!k$Piv$Pi!_$Pi%i$Pi!g$Pi~P!:tO$]/SO$_/SO~O$]/TO$_/TO~O!g)hO#`/UO!_$cX$Z$cX$]$cX$_$cX$f$cX~O![/VO~O!_)kO$Z/XO$])jO$_)jO$f/YO~O!]<iO!^(fX~P#BwO!^/ZO~O!g)hO$f({X~O$f/]O~Ov/^O~P!&zOx)yO(b)zO(c/aO~O!S/dO~O(y$}On%aa!Q%aa'y%aa(z%aa!]%aa#`%aa~Og%aa$O%aa~P#L{O(z%POn%ca!Q%ca'y%ca(y%ca!]%ca#`%ca~Og%ca$O%ca~P#MnO!]fX!gfX!kfX!k$zX(rfX~P!0SOp%WO![/mO!](^O(T/lO!Y(vP!Y)PP~P!1uOr*sO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO~Os<}O!S/nO![+[O!^*pO(e<|O!^(xP~P$ [O!k/oO~P#/sO!]/pO!g#vO(r'pO!k)OX~O!k/uO~OnoX!QoX'yoX(yoX(zoX~O!g#vO!koX~P$#OOp/wO!S%hO![*^O!_%iO(T%gO!k)OP~O#k/xO~O!Y$zX!]$zX!g%RX~P!0SO!]/yO!Y)PX~P#/sO!g/{O~O!Y/}O~OpkO(T0OO~P.iOh%VOr0TO!g#vO!l%eO(r'pO~O!g+iO~Oa%nO!]0XO'z%nO~O!^0ZO~P!5iO!c0[O!d0[O(U!lO~P#$`Os!nO!S0]O(VTO(YUO(e!mO~O#[0_O~Og%aa!]%aa#`%aa$O%aa~P!1WOg%ca!]%ca#`%ca$O%ca~P!1WOj%dOk%dOl%dO(T&ZOg'mX!]'mX~O!]*yOg(^a~Og0hO~On0jO#`0iOg(_a!](_a~OR0kO!Q0kO!S0lO#S$dOn}a'y}a(y}a(z}a!]}a#`}a~Og}a$O}a~P$(cO!Q*OO'y*POn$sa(y$sa(z$sa!]$sa#`$sa~Og$sa$O$sa~P$)_O!Q*OO'y*POn$ua(y$ua(z$ua!]$ua#`$ua~Og$ua$O$ua~P$*QO#k0oO~Og%Ta!]%Ta#`%Ta$O%Ta~P!1WO!g#vO~O#k0rO~O!]+^Oa)Ta'z)Ta~OR#zO!Q#yO!S#{O!l#xO(aVOP!ri[!rij!rir!ri!]!ri!p!ri#R!ri#n!ri#o!ri#p!ri#q!ri#r!ri#s!ri#t!ri#u!ri#v!ri#x!ri#z!ri#{!ri(r!ri(y!ri(z!ri~Oa!ri'z!ri'w!ri!Y!ri!k!riv!ri!_!ri%i!ri!g!ri~P$+oOh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op0{O%]0|O(T0zO~P$.VO!g+iOa(]a!_(]a'z(]a!](]a~O#k1SO~O[]X!]fX!^fX~O!]1TO!^)XX~O!^1VO~O[1WO~Ob1YO(T+qO(VTO(YUO~O!_&PO(T%gO`'uX!]'uX~O!]+vO`)Wa~O!k1]O~P!:tO[1`O~O`1aO~O#`1fO~On1iO!_$|O~O(e(|O!^)UP~Oh%VOn1rO!_1oO%i1qO~O[1|O!]1zO!^)VX~O!^1}O~O`2POa%nO'z%nO~O(T#nO(VTO(YUO~O#S$dO#`$eO$Q$eOP(gXR(gX[(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~Oj2SO&[2TOa(gX~P$3pOj2SO#`$eO&[2TO~Oa2VO~P%[Oa2XO~O&e2[OP&ciQ&ciS&ciY&cia&cid&cie&cil&cip&cir&cis&cit&ciz&ci|&ci!O&ci!S&ci!W&ci!X&ci!_&ci!i&ci!l&ci!o&ci!p&ci!q&ci!s&ci!u&ci!x&ci!|&ci$W&ci$n&ci%h&ci%j&ci%l&ci%m&ci%n&ci%q&ci%s&ci%v&ci%w&ci%y&ci&W&ci&^&ci&`&ci&b&ci&d&ci&g&ci&m&ci&s&ci&u&ci&w&ci&y&ci&{&ci'w&ci(T&ci(V&ci(Y&ci(a&ci(o&ci!^&cib&ci&j&ci~Ob2bO!^2`O&j2aO~P`O!_XO!l2dO~O&q,{OP&liQ&liS&liY&lia&lid&lie&lil&lip&lir&lis&lit&liz&li|&li!O&li!S&li!W&li!X&li!_&li!i&li!l&li!o&li!p&li!q&li!s&li!u&li!x&li!|&li$W&li$n&li%h&li%j&li%l&li%m&li%n&li%q&li%s&li%v&li%w&li%y&li&W&li&^&li&`&li&b&li&d&li&g&li&m&li&s&li&u&li&w&li&y&li&{&li'w&li(T&li(V&li(Y&li(a&li(o&li!^&li&e&lib&li&j&li~O!Y2jO~O!]!aa!^!aa~P#BwOs!nO!S!oO![2pO(e!mO!]'XX!^'XX~P@nO!]-]O!^(ia~O!]'_X!^'_X~P!9|O!]-`O!^(xa~O!^2wO~P'_Oa%nO#`3QO'z%nO~Oa%nO!g#vO#`3QO'z%nO~Oa%nO!g#vO!p3UO#`3QO'z%nO(r'pO~Oa%nO'z%nO~P!:tO!]$_Ov$qa~O!Y'Wi!]'Wi~P!:tO!](VO!Y(hi~O!](^O!Y(vi~O!Y(wi!](wi~P!:tO!](ti!k(tia(ti'z(ti~P!:tO#`3WO!](ti!k(tia(ti'z(ti~O!](jO!k(si~O!S%hO!_%iO!|]O#i3]O#j3[O(T%gO~O!S%hO!_%iO#j3[O(T%gO~On3dO!_'`O%i3cO~Oh%VOn3dO!_'`O%i3cO~O#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aav%aa!_%aa%i%aa!g%aa~P#L{O#k%caP%caR%ca[%caa%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%cav%ca!_%ca%i%ca!g%ca~P#MnO#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!]%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aa#`%aav%aa!_%aa%i%aa!g%aa~P#/sO#k%caP%caR%ca[%caa%caj%car%ca!S%ca!]%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%ca#`%cav%ca!_%ca%i%ca!g%ca~P#/sO#k}aP}a[}aa}aj}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a'z}a(a}a(r}a!k}a!Y}a'w}av}a!_}a%i}a!g}a~P$(cO#k$saP$saR$sa[$saa$saj$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa'z$sa(a$sa(r$sa!k$sa!Y$sa'w$sav$sa!_$sa%i$sa!g$sa~P$)_O#k$uaP$uaR$ua[$uaa$uaj$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua'z$ua(a$ua(r$ua!k$ua!Y$ua'w$uav$ua!_$ua%i$ua!g$ua~P$*QO#k%TaP%TaR%Ta[%Taa%Taj%Tar%Ta!S%Ta!]%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta'z%Ta(a%Ta(r%Ta!k%Ta!Y%Ta'w%Ta#`%Tav%Ta!_%Ta%i%Ta!g%Ta~P#/sOa#cq!]#cq'z#cq'w#cq!Y#cq!k#cqv#cq!_#cq%i#cq!g#cq~P!:tO![3lO!]'YX!k'YX~P%[O!].tO!k(ka~O!].tO!k(ka~P!:tO!Y3oO~O$O!na!^!na~PKlO$O!ja!]!ja!^!ja~P#BwO$O!ra!^!ra~P!=[O$O!ta!^!ta~P!?rOg']X!]']X~P!,TO!]/POg(pa~OSfO!_4TO$d4UO~O!^4YO~Ov4ZO~P#/sOa$mq!]$mq'z$mq'w$mq!Y$mq!k$mqv$mq!_$mq%i$mq!g$mq~P!:tO!Y4]O~P!&zO!S4^O~O!Q*OO'y*PO(z%POn'ia(y'ia!]'ia#`'ia~Og'ia$O'ia~P%-fO!Q*OO'y*POn'ka(y'ka(z'ka!]'ka#`'ka~Og'ka$O'ka~P%.XO(r$YO~P#/sO!YfX!Y$zX!]fX!]$zX!g%RX#`fX~P!0SOp%WO(T=WO~P!1uOp4bO!S%hO![4aO!_%iO(T%gO!]'eX!k'eX~O!]/pO!k)Oa~O!]/pO!g#vO!k)Oa~O!]/pO!g#vO(r'pO!k)Oa~Og$|i!]$|i#`$|i$O$|i~P!1WO![4jO!Y'gX!]'gX~P!3tO!]/yO!Y)Pa~O!]/yO!Y)Pa~P#/sOP]XR]X[]Xj]Xr]X!Q]X!S]X!Y]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~Oj%YX!g%YX~P%2OOj4oO!g#vO~Oh%VO!g#vO!l%eO~Oh%VOr4tO!l%eO(r'pO~Or4yO!g#vO(r'pO~Os!nO!S4zO(VTO(YUO(e!mO~O(y$}On%ai!Q%ai'y%ai(z%ai!]%ai#`%ai~Og%ai$O%ai~P%5oO(z%POn%ci!Q%ci'y%ci(y%ci!]%ci#`%ci~Og%ci$O%ci~P%6bOg(_i!](_i~P!1WO#`5QOg(_i!](_i~P!1WO!k5VO~Oa$oq!]$oq'z$oq'w$oq!Y$oq!k$oqv$oq!_$oq%i$oq!g$oq~P!:tO!Y5ZO~O!]5[O!_)QX~P#/sOa$zX!_$zX%^]X'z$zX!]$zX~P!0SO%^5_OaoX!_oX'zoX!]oX~P$#OOp5`O(T#nO~O%^5_O~Ob5fO%j5gO(T+qO(VTO(YUO!]'tX!^'tX~O!]1TO!^)Xa~O[5kO~O`5lO~O[5pO~Oa%nO'z%nO~P#/sO!]5uO#`5wO!^)UX~O!^5xO~Or6OOs!nO!S*iO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!pO#W!pO#X!pO#[5}O#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O!^5|O~P%;eOn6TO!_1oO%i6SO~Oh%VOn6TO!_1oO%i6SO~Ob6[O(T#nO(VTO(YUO!]'sX!^'sX~O!]1zO!^)Va~O(VTO(YUO(e6^O~O`6bO~Oj6eO&[6fO~PNXO!k6gO~P%[Oa6iO~Oa6iO~P%[Ob2bO!^6nO&j2aO~P`O!g6pO~O!g6rOh(ji!](ji!^(ji!g(ji!l(jir(ji(r(ji~O!]#hi!^#hi~P#BwO#`6sO!]#hi!^#hi~O!]!ai!^!ai~P#BwOa%nO#`6|O'z%nO~Oa%nO!g#vO#`6|O'z%nO~O!](tq!k(tqa(tq'z(tq~P!:tO!](jO!k(sq~O!S%hO!_%iO#j7TO(T%gO~O!_'`O%i7WO~On7[O!_'`O%i7WO~O#k'iaP'iaR'ia['iaa'iaj'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia'z'ia(a'ia(r'ia!k'ia!Y'ia'w'iav'ia!_'ia%i'ia!g'ia~P%-fO#k'kaP'kaR'ka['kaa'kaj'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka'z'ka(a'ka(r'ka!k'ka!Y'ka'w'kav'ka!_'ka%i'ka!g'ka~P%.XO#k$|iP$|iR$|i[$|ia$|ij$|ir$|i!S$|i!]$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i'z$|i(a$|i(r$|i!k$|i!Y$|i'w$|i#`$|iv$|i!_$|i%i$|i!g$|i~P#/sO#k%aiP%aiR%ai[%aia%aij%air%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai'z%ai(a%ai(r%ai!k%ai!Y%ai'w%aiv%ai!_%ai%i%ai!g%ai~P%5oO#k%ciP%ciR%ci[%cia%cij%cir%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci'z%ci(a%ci(r%ci!k%ci!Y%ci'w%civ%ci!_%ci%i%ci!g%ci~P%6bO!]'Ya!k'Ya~P!:tO!].tO!k(ki~O$O#ci!]#ci!^#ci~P#BwOP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mij#mir#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#n#mi~P%NdO#n<_O~P%NdOP$[OR#zOr<kO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO[#mij#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#r#mi~P&!lO#r<aO~P&!lOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO(aVO#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#v#mi~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO(aVO(z#}O#z#mi#{#mi$O#mi(r#mi(y#mi!]#mi!^#mi~O#x<eO~P&&uO#x#mi~P&&uO#v<cO~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO(aVO(y#|O(z#}O#{#mi$O#mi(r#mi!]#mi!^#mi~O#z#mi~P&)UO#z<gO~P&)UOa#|y!]#|y'z#|y'w#|y!Y#|y!k#|yv#|y!_#|y%i#|y!g#|y~P!:tO[#mij#mir#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi!]#mi!^#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO(y#mi(z#mi~P&,QOn>^O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P&,QO#S$dOP(`XR(`X[(`Xj(`Xn(`Xr(`X!Q(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X$O(`X'y(`X(a(`X(r(`X(y(`X(z(`X!](`X!^(`X~O$O$Pi!]$Pi!^$Pi~P#BwO$O!ri!^!ri~P$+oOg']a!]']a~P!1WO!^7nO~O!]'da!^'da~P#BwO!Y7oO~P#/sO!g#vO(r'pO!]'ea!k'ea~O!]/pO!k)Oi~O!]/pO!g#vO!k)Oi~Og$|q!]$|q#`$|q$O$|q~P!1WO!Y'ga!]'ga~P#/sO!g7vO~O!]/yO!Y)Pi~P#/sO!]/yO!Y)Pi~O!Y7yO~Oh%VOr8OO!l%eO(r'pO~Oj8QO!g#vO~Or8TO!g#vO(r'pO~O!Q*OO'y*PO(z%POn'ja(y'ja!]'ja#`'ja~Og'ja$O'ja~P&5RO!Q*OO'y*POn'la(y'la(z'la!]'la#`'la~Og'la$O'la~P&5tOg(_q!](_q~P!1WO#`8VOg(_q!](_q~P!1WO!Y8WO~Og%Oq!]%Oq#`%Oq$O%Oq~P!1WOa$oy!]$oy'z$oy'w$oy!Y$oy!k$oyv$oy!_$oy%i$oy!g$oy~P!:tO!g6rO~O!]5[O!_)Qa~O!_'`OP$TaR$Ta[$Taj$Tar$Ta!Q$Ta!S$Ta!]$Ta!l$Ta!p$Ta#R$Ta#n$Ta#o$Ta#p$Ta#q$Ta#r$Ta#s$Ta#t$Ta#u$Ta#v$Ta#x$Ta#z$Ta#{$Ta(a$Ta(r$Ta(y$Ta(z$Ta~O%i7WO~P&8fO%^8[Oa%[i!_%[i'z%[i!]%[i~Oa#cy!]#cy'z#cy'w#cy!Y#cy!k#cyv#cy!_#cy%i#cy!g#cy~P!:tO[8^O~Ob8`O(T+qO(VTO(YUO~O!]1TO!^)Xi~O`8dO~O(e(|O!]'pX!^'pX~O!]5uO!^)Ua~O!^8nO~P%;eO(o!sO~P$&YO#[8oO~O!_1oO~O!_1oO%i8qO~On8tO!_1oO%i8qO~O[8yO!]'sa!^'sa~O!]1zO!^)Vi~O!k8}O~O!k9OO~O!k9RO~O!k9RO~P%[Oa9TO~O!g9UO~O!k9VO~O!](wi!^(wi~P#BwOa%nO#`9_O'z%nO~O!](ty!k(tya(ty'z(ty~P!:tO!](jO!k(sy~O%i9bO~P&8fO!_'`O%i9bO~O#k$|qP$|qR$|q[$|qa$|qj$|qr$|q!S$|q!]$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q'z$|q(a$|q(r$|q!k$|q!Y$|q'w$|q#`$|qv$|q!_$|q%i$|q!g$|q~P#/sO#k'jaP'jaR'ja['jaa'jaj'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja'z'ja(a'ja(r'ja!k'ja!Y'ja'w'jav'ja!_'ja%i'ja!g'ja~P&5RO#k'laP'laR'la['laa'laj'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la'z'la(a'la(r'la!k'la!Y'la'w'lav'la!_'la%i'la!g'la~P&5tO#k%OqP%OqR%Oq[%Oqa%Oqj%Oqr%Oq!S%Oq!]%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq'z%Oq(a%Oq(r%Oq!k%Oq!Y%Oq'w%Oq#`%Oqv%Oq!_%Oq%i%Oq!g%Oq~P#/sO!]'Yi!k'Yi~P!:tO$O#cq!]#cq!^#cq~P#BwO(y$}OP%aaR%aa[%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa$O%aa(a%aa(r%aa!]%aa!^%aa~On%aa!Q%aa'y%aa(z%aa~P&IyO(z%POP%caR%ca[%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca$O%ca(a%ca(r%ca!]%ca!^%ca~On%ca!Q%ca'y%ca(y%ca~P&LQOn>^O!Q*OO'y*PO(z%PO~P&IyOn>^O!Q*OO'y*PO(y$}O~P&LQOR0kO!Q0kO!S0lO#S$dOP}a[}aj}an}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a$O}a'y}a(a}a(r}a(y}a(z}a!]}a!^}a~O!Q*OO'y*POP$saR$sa[$saj$san$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa$O$sa(a$sa(r$sa(y$sa(z$sa!]$sa!^$sa~O!Q*OO'y*POP$uaR$ua[$uaj$uan$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua$O$ua(a$ua(r$ua(y$ua(z$ua!]$ua!^$ua~On>^O!Q*OO'y*PO(y$}O(z%PO~OP%TaR%Ta[%Taj%Tar%Ta!S%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta$O%Ta(a%Ta(r%Ta!]%Ta!^%Ta~P''VO$O$mq!]$mq!^$mq~P#BwO$O$oq!]$oq!^$oq~P#BwO!^9oO~O$O9pO~P!1WO!g#vO!]'ei!k'ei~O!g#vO(r'pO!]'ei!k'ei~O!]/pO!k)Oq~O!Y'gi!]'gi~P#/sO!]/yO!Y)Pq~Or9wO!g#vO(r'pO~O[9yO!Y9xO~P#/sO!Y9xO~Oj:PO!g#vO~Og(_y!](_y~P!1WO!]'na!_'na~P#/sOa%[q!_%[q'z%[q!]%[q~P#/sO[:UO~O!]1TO!^)Xq~O`:YO~O#`:ZO!]'pa!^'pa~O!]5uO!^)Ui~P#BwO!S:]O~O!_1oO%i:`O~O(VTO(YUO(e:eO~O!]1zO!^)Vq~O!k:hO~O!k:iO~O!k:jO~O!k:jO~P%[O#`:mO!]#hy!^#hy~O!]#hy!^#hy~P#BwO%i:rO~P&8fO!_'`O%i:rO~O$O#|y!]#|y!^#|y~P#BwOP$|iR$|i[$|ij$|ir$|i!S$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i$O$|i(a$|i(r$|i!]$|i!^$|i~P''VO!Q*OO'y*PO(z%POP'iaR'ia['iaj'ian'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia$O'ia(a'ia(r'ia(y'ia!]'ia!^'ia~O!Q*OO'y*POP'kaR'ka['kaj'kan'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka$O'ka(a'ka(r'ka(y'ka(z'ka!]'ka!^'ka~O(y$}OP%aiR%ai[%aij%ain%air%ai!Q%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai$O%ai'y%ai(a%ai(r%ai(z%ai!]%ai!^%ai~O(z%POP%ciR%ci[%cij%cin%cir%ci!Q%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci$O%ci'y%ci(a%ci(r%ci(y%ci!]%ci!^%ci~O$O$oy!]$oy!^$oy~P#BwO$O#cy!]#cy!^#cy~P#BwO!g#vO!]'eq!k'eq~O!]/pO!k)Oy~O!Y'gq!]'gq~P#/sOr:|O!g#vO(r'pO~O[;QO!Y;PO~P#/sO!Y;PO~Og(_!R!](_!R~P!1WOa%[y!_%[y'z%[y!]%[y~P#/sO!]1TO!^)Xy~O!]5uO!^)Uq~O(T;XO~O!_1oO%i;[O~O!k;_O~O%i;dO~P&8fOP$|qR$|q[$|qj$|qr$|q!S$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q$O$|q(a$|q(r$|q!]$|q!^$|q~P''VO!Q*OO'y*PO(z%POP'jaR'ja['jaj'jan'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja$O'ja(a'ja(r'ja(y'ja!]'ja!^'ja~O!Q*OO'y*POP'laR'la['laj'lan'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la$O'la(a'la(r'la(y'la(z'la!]'la!^'la~OP%OqR%Oq[%Oqj%Oqr%Oq!S%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq$O%Oq(a%Oq(r%Oq!]%Oq!^%Oq~P''VOg%e!Z!]%e!Z#`%e!Z$O%e!Z~P!1WO!Y;hO~P#/sOr;iO!g#vO(r'pO~O[;kO!Y;hO~P#/sO!]'pq!^'pq~P#BwO!]#h!Z!^#h!Z~P#BwO#k%e!ZP%e!ZR%e!Z[%e!Za%e!Zj%e!Zr%e!Z!S%e!Z!]%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z'z%e!Z(a%e!Z(r%e!Z!k%e!Z!Y%e!Z'w%e!Z#`%e!Zv%e!Z!_%e!Z%i%e!Z!g%e!Z~P#/sOr;tO!g#vO(r'pO~O!Y;uO~P#/sOr;|O!g#vO(r'pO~O!Y;}O~P#/sOP%e!ZR%e!Z[%e!Zj%e!Zr%e!Z!S%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z$O%e!Z(a%e!Z(r%e!Z!]%e!Z!^%e!Z~P''VOr<QO!g#vO(r'pO~Ov(fX~P1qO!Q%rO~P!)[O(U!lO~P!)[O!YfX!]fX#`fX~P%2OOP]XR]X[]Xj]Xr]X!Q]X!S]X!]]X!]fX!l]X!p]X#R]X#S]X#`]X#`fX#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~O!gfX!k]X!kfX(rfX~P'LTOP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_XO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]<iO!^$qa~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<tO!S${O!_$|O!i>WO!l$xO#j<zO$W%`O$t<vO$v<xO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Ol)dO~P(!yOr!eX(r!eX~P#!iOr(jX(r(jX~P##[O!^]X!^fX~P'LTO!YfX!Y$zX!]fX!]$zX#`fX~P!0SO#k<^O~O!g#vO#k<^O~O#`<nO~Oj<bO~O#`=OO!](wX!^(wX~O#`<nO!](uX!^(uX~O#k=PO~Og=RO~P!1WO#k=XO~O#k=YO~Og=RO(T&ZO~O!g#vO#k=ZO~O!g#vO#k=PO~O$O=[O~P#BwO#k=]O~O#k=^O~O#k=cO~O#k=dO~O#k=eO~O#k=fO~O$O=gO~P!1WO$O=hO~P!1WOl=sO~P7eOk#S#T#U#W#X#[#i#j#u$n$t$v$y%]%^%h%i%j%q%s%v%w%y%{~(OT#o!X'|(U#ps#n#qr!Q'}$]'}(T$_(e~", goto: "$9Y)]PPPPPP)^PP)aP)rP+W/]PPPP6mPP7TPP=QPPP@tPA^PA^PPPA^PCfPA^PA^PA^PCjPCoPD^PIWPPPI[PPPPI[L_PPPLeMVPI[PI[PP! eI[PPPI[PI[P!#lI[P!'S!(X!(bP!)U!)Y!)U!,gPPPPPPP!-W!(XPP!-h!/YP!2iI[I[!2n!5z!:h!:h!>gPPP!>oI[PPPPPPPPP!BOP!C]PPI[!DnPI[PI[I[I[I[I[PI[!FQP!I[P!LbP!Lf!Lp!Lt!LtP!IXP!Lx!LxP#!OP#!SI[PI[#!Y#%_CjA^PA^PA^A^P#&lA^A^#)OA^#+vA^#.SA^A^#.r#1W#1W#1]#1f#1W#1qPP#1WPA^#2ZA^#6YA^A^6mPPP#:_PPP#:x#:xP#:xP#;`#:xPP#;fP#;]P#;]#;y#;]#<e#<k#<n)aP#<q)aP#<z#<z#<zP)aP)aP)aP)aPP)aP#=Q#=TP#=T)aP#=XP#=[P)aP)aP)aP)aP)aP)a)aPP#=b#=h#=s#=y#>P#>V#>]#>k#>q#>{#?R#?]#?c#?s#?y#@k#@}#AT#AZ#Ai#BO#Cs#DR#DY#Et#FS#Gt#HS#HY#H`#Hf#Hp#Hv#H|#IW#Ij#IpPPPPPPPPPPP#IvPPPPPPP#Jk#Mx$ b$ i$ qPPP$']P$'f$*_$0x$0{$1O$1}$2Q$2X$2aP$2g$2jP$3W$3[$4S$5b$5g$5}PP$6S$6Y$6^$6a$6e$6i$7e$7|$8e$8i$8l$8o$8y$8|$9Q$9UR!|RoqOXst!Z#d%m&r&t&u&w,s,x2[2_Y!vQ'`-e1o5{Q%tvQ%|yQ&T|Q&j!VS'W!e-]Q'f!iS'l!r!yU*k$|*Z*oQ+o%}S+|&V&WQ,d&dQ-c'_Q-m'gQ-u'mQ0[*qQ1b,OQ1y,eR<{<Y%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_S#q]<V!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU+P%]<s<tQ+t&PQ,f&gQ,m&oQ0x+gQ0}+iQ1Y+uQ2R,kQ3`.gQ5`0|Q5f1TQ6[1zQ7Y3dQ8`5gR9e7['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S!S!nQ!r!v!y!z$|'W'_'`'l'm'n*k*o*q*r-]-c-e-u0[0_1o5{5}%[$ti#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q&X|Q'U!eS'[%i-`Q+t&PQ,P&WQ,f&gQ0n+SQ1Y+uQ1_+{Q2Q,jQ2R,kQ5f1TQ5o1aQ6[1zQ6_1|Q6`2PQ8`5gQ8c5lQ8|6bQ:X8dQ:f8yQ;V:YR<}*ZrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R,h&k&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'b'r(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>R>S[#]WZ#W#Z'X(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ%wxQ%{yW&Q|&V&W,OQ&_!TQ'c!hQ'e!iQ(q#sS+n%|%}Q+r&PQ,_&bQ,c&dS-l'f'gQ.i(rQ1R+oQ1X+uQ1Z+vQ1^+zQ1t,`S1x,d,eQ2|-mQ5e1TQ5i1WQ5n1`Q6Z1yQ8_5gQ8b5kQ8f5pQ:T8^R;T:U!U$zi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y!^%yy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{Q+h%wQ,T&[Q,W&]Q,b&dQ.h(qQ1s,_U1w,c,d,eQ3e.iQ6U1tS6Y1x1yQ8x6Z#f>T#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o>U<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hW%Ti%V*y>PS&[!Q&iQ&]!RQ&^!SU*}%[%d=sR,R&Y%]%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^T)z$u){V+P%]<s<tW'[!e%i*Z-`S(}#y#zQ+c%rQ+y&SS.b(m(nQ1j,XQ5T0kR8i5u'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S$i$^c#Y#e%q%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.|.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ'Y!eR2q-]!W!nQ!e!r!v!y!z$|'W'_'`'l'm'n*Z*k*o*q*r-]-c-e-u0[0_1o5{5}R1l,ZnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&y!^Q'v!xS(s#u<^Q+l%zQ,]&_Q,^&aQ-j'dQ-w'oS.r(x=PS0q+X=ZQ1P+mQ1n,[Q2c,zQ2e,{Q2m-WQ2z-kQ2}-oS5Y0r=eQ5a1QS5d1S=fQ6t2oQ6x2{Q6}3SQ8]5bQ9Y6vQ9Z6yQ9^7OR:l9V$d$]c#Y#e%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vS(o#p'iQ)P#zS+b%q.|S.c(n(pR3^.d'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS#q]<VQ&t!XQ&u!YQ&w![Q&x!]R2Z,vQ'a!hQ+e%wQ-h'cS.e(q+hQ2x-gW3b.h.i0w0yQ6w2yW7U3_3a3e5^U9a7V7X7ZU:q9c9d9fS;b:p:sQ;p;cR;x;qU!wQ'`-eT5y1o5{!Q_OXZ`st!V!Z#d#h%e%m&i&k&r&t&u&w(j,s,x.[2[2_]!pQ!r'`-e1o5{T#q]<V%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S(}#y#zS.b(m(n!s=l$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU$fd)_,mS(p#p'iU*v%R(w4OU0m+O.n7gQ5^0xQ7V3`Q9d7YR:s9em!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}Q't!uS(f#g2US-s'k'wQ/s*]Q0R*jQ3U-vQ4f/tQ4r0TQ4s0UQ4x0^Q7r4`S7}4t4vS8R4y4{Q9r7sQ9v7yQ9{8OQ:Q8TS:{9w9xS;g:|;PS;s;h;iS;{;t;uS<P;|;}R<S<QQ#wbQ's!uS(e#g2US(g#m+WQ+Y%fQ+j%xQ+p&OU-r'k't'wQ.W(fU/r*]*`/wQ0S*jQ0V*lQ1O+kQ1u,aS3R-s-vQ3Z.`S4e/s/tQ4n0PS4q0R0^Q4u0WQ6W1vQ7P3US7q4`4bQ7u4fU7|4r4x4{Q8P4wQ8v6XS9q7r7sQ9u7yQ9}8RQ:O8SQ:c8wQ:y9rS:z9v9xQ;S:QQ;^:dS;f:{;PS;r;g;hS;z;s;uS<O;{;}Q<R<PQ<T<SQ=o=jQ={=tR=|=uV!wQ'`-e%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S#wz!j!r=i$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=o>R%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Q%fj!^%xy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{S&Oz!jQ+k%yQ,a&dW1v,b,c,d,eU6X1w1x1yS8w6Y6ZQ:d8x!r=j$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ=t>QR=u>R%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Y#bWZ#W#Z(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ,n&o!p=k$Z$n)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=n'XU']!e%i*ZR2s-`%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ,m&oQ0x+gQ3`.gQ7Y3dR9e7[!b$Tc#Y%q(S(Y(t(y)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!P<d)^)q-Z.|2k2n3p3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!f$Vc#Y%q(S(Y(t(y)W)X)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!T<f)^)q-Z.|2k2n3p3v3w3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!^$Zc#Y%q(S(Y(t(y)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<WQ4_/kz>S)^)q-Z.|2k2n3p4P4X6u7b7k7l8k9X9g9m9n;W;`=vQ>X>ZR>Y>['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS$oh$pR4U/U'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$kf$qQ$ifS)j$l)nR)v$qT$jf$qT)l$l)n'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$oh$pQ$rhR)u$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_!s>Q$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S#glOPXZst!Z!`!o#S#d#o#{$n%m&k&n&o&r&t&u&w&{'T'b)O)s*i+]+g,p,s,x-i.g/V/n0]0l1r2S2T2V2X2[2_2a3d4T4z6T6e6f6i7[8t9T!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^Q+T%aQ/c*Oo4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!U$yi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>YQ*c$zU*l$|*Z*oQ+U%bQ0W*m#f=q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n=r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hQ=w>TQ=x>UQ=y>VR=z>W!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hnoOXst!Z#d%m&r&t&u&w,s,x2[2_S*f${*YQ-R'OQ-S'QR4i/y%[%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q,U&]Q1h,WQ5s1gR8h5tV*n$|*Z*oU*n$|*Z*oT5z1o5{S0P*i/nQ4w0]T8S4z:]Q+j%xQ0V*lQ1O+kQ1u,aQ6W1vQ8v6XQ:c8wR;^:d!U%Oi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Yx*R$v)e*S*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>OS0`*t0a#f<o#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<p<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!d=S(u)c*[*e.j.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[`=T3}7c7f7j9h:t:w;yS=_.l3iT=`7e9k!U%Qi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y|*T$v)e*U*t+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>OS0b*u0c#f<q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!h=U(u)c*[*e.k.l.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[d=V3}7d7e7j9h9i:t:u:w;yS=a.m3jT=b7f9lrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q&f!UR,p&ornOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R&f!UQ,Y&^R1d,RsnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q1p,_S6R1s1tU8p6P6Q6US:_8r8sS;Y:^:aQ;m;ZR;w;nQ&m!VR,i&iR6_1|R:f8yW&Q|&V&W,OR1Z+vQ&r!WR,s&sR,y&xT2],x2_R,}&yQ,|&yR2f,}Q'y!{R-y'ySsOtQ#dXT%ps#dQ#OTR'{#OQ#RUR'}#RQ){$uR/`){Q#UVR(Q#UQ#XWU(W#X(X.QQ(X#YR.Q(YQ-^'YR2r-^Q.u(yS3m.u3nR3n.vQ-e'`R2v-eY!rQ'`-e1o5{R'j!rQ/Q)eR4S/QU#_W%h*YU(_#_(`.RQ(`#`R.R(ZQ-a']R2t-at`OXst!V!Z#d%m&i&k&r&t&u&w,s,x2[2_S#hZ%eU#r`#h.[R.[(jQ(k#jQ.X(gW.a(k.X3X7RQ3X.YR7R3YQ)n$lR/W)nQ$phR)t$pQ$`cU)a$`-|<jQ-|<WR<j)qQ/q*]W4c/q4d7t9sU4d/r/s/tS7t4e4fR9s7u$e*Q$v(u)c)e*[*e*t*u+Q+R+V.l.m.o.p.q/_/g/i/k/v/|0d0e0v1e3f3g3h3}4R4[4g4h4l4|5O5R5S5W5r7]7^7_7`7e7f7h7i7j7p7w7z8U8X8Z9h9i9j9t9|:R:S:t:u:v:w:x:};R;e;j;v;y=p=}>O>Z>[Q/z*eU4k/z4m7xQ4m/|R7x4lS*o$|*ZR0Y*ox*S$v)e*t*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>O!d.j(u)c*[*e.l.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/h*S.j7ca7c3}7e7f7j9h:t:w;yQ0a*tQ3i.lU4}0a3i9kR9k7e|*U$v)e*t*u+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>O!h.k(u)c*[*e.l.m.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/j*U.k7de7d3}7e7f7j9h9i:t:u:w;yQ0c*uQ3j.mU5P0c3j9lR9l7fQ*z%UR0g*zQ5]0vR8Y5]Q+_%kR0u+_Q5v1jS8j5v:[R:[8kQ,[&_R1m,[Q5{1oR8m5{Q1{,fS6]1{8zR8z6_Q1U+rW5h1U5j8a:VQ5j1XQ8a5iR:V8bQ+w&QR1[+wQ2_,xR6m2_YrOXst#dQ&v!ZQ+a%mQ,r&rQ,t&tQ,u&uQ,w&wQ2Y,sS2],x2_R6l2[Q%opQ&z!_Q&}!aQ'P!bQ'R!cQ'q!uQ+`%lQ+l%zQ,Q&XQ,h&mQ-P&|W-p'k's't'wQ-w'oQ0X*nQ1P+mQ1c,PS2O,i,lQ2g-OQ2h-RQ2i-SQ2}-oW3P-r-s-v-xQ5a1QQ5m1_Q5q1eQ6V1uQ6a2QQ6k2ZU6z3O3R3UQ6}3SQ8]5bQ8e5oQ8g5rQ8l5zQ8u6WQ8{6`S9[6{7PQ9^7OQ:W8cQ:b8vQ:g8|Q:n9]Q;U:XQ;]:cQ;a:oQ;l;VR;o;^Q%zyQ'd!iQ'o!uU+m%{%|%}Q-W'VU-k'e'f'gS-o'k'uQ0Q*jS1Q+n+oQ2o-YS2{-l-mQ3S-tS4p0R0UQ5b1RQ6v2uQ6y2|Q7O3TU7{4r4s4vQ9z7}R;O9{S$wi>PR*{%VU%Ui%V>PR0f*yQ$viS(u#v+iS)c$b$cQ)e$dQ*[$xS*e${*YQ*t%OQ*u%QQ+Q%^Q+R%_Q+V%cQ.l<oQ.m<qQ.o<uQ.p<wQ.q<yQ/_)yQ/g*RQ/i*TQ/k*VQ/v*aS/|*g/mQ0d*wQ0e*xl0v+f,V.f1i1q3c6S7W8q9b:`:r;[;dQ1e,SQ3f=SQ3g=UQ3h=XS3}<l<mQ4R/PS4[/d4^Q4g/xQ4h/yQ4l/{Q4|0`Q5O0bQ5R0iQ5S0jQ5W0oQ5r1fQ7]=]Q7^=_Q7_=aQ7`=cQ7e<pQ7f<rQ7h<vQ7i<xQ7j<zQ7p4_Q7w4jQ7z4oQ8U5QQ8X5[Q8Z5_Q9h=YQ9i=TQ9j=VQ9t7vQ9|8QQ:R8VQ:S8[Q:t=^Q:u=`Q:v=bQ:w=dQ:x9pQ:}9yQ;R:PQ;e=gQ;j;QQ;v;kQ;y=hQ=p>PQ=}>XQ>O>YQ>Z>]R>[>^Q+O%]Q.n<sR7g<tnpOXst!Z#d%m&r&t&u&w,s,x2[2_Q!fPS#fZ#oQ&|!`W'h!o*i0]4zQ(P#SQ)Q#{Q)r$nS,l&k&nQ,q&oQ-O&{S-T'T/nQ-g'bQ.x)OQ/[)sQ0s+]Q0y+gQ2W,pQ2y-iQ3a.gQ4W/VQ5U0lQ6Q1rQ6c2SQ6d2TQ6h2VQ6j2XQ6o2aQ7Z3dQ7m4TQ8s6TQ9P6eQ9Q6fQ9S6iQ9f7[Q:a8tR:k9T#[cOPXZst!Z!`!o#d#o#{%m&k&n&o&r&t&u&w&{'T'b)O*i+]+g,p,s,x-i.g/n0]0l1r2S2T2V2X2[2_2a3d4z6T6e6f6i7[8t9TQ#YWQ#eYQ%quQ%svS%uw!gS(S#W(VQ(Y#ZQ(t#uQ(y#xQ)R$OQ)S$PQ)T$QQ)U$RQ)V$SQ)W$TQ)X$UQ)Y$VQ)Z$WQ)[$XQ)^$ZQ)`$_Q)b$aQ)g$eW)q$n)s/V4TQ+d%tQ+x&RS-Z'X2pQ-x'rS-}(T.PQ.S(]Q.U(dQ.s(xQ.v(zQ.z<UQ.|<XQ.}<YQ/O<]Q/b)}Q0p+XQ2k-UQ2n-XQ3O-qQ3V.VQ3k.tQ3p<^Q3q<_Q3r<`Q3s<aQ3t<bQ3u<cQ3v<dQ3w<eQ3x<fQ3y<gQ3z<hQ3{.{Q3|<kQ4P<nQ4Q<{Q4X<iQ5X0rQ5c1SQ6u=OQ6{3QQ7Q3WQ7a3lQ7b=PQ7k=RQ7l=ZQ8k5wQ9X6sQ9]6|Q9g=[Q9m=eQ9n=fQ:o9_Q;W:ZQ;`:mQ<W#SR=v>SR#[WR'Z!el!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}S'V!e-]U*j$|*Z*oS-Y'W'_S0U*k*qQ0^*rQ2u-cQ4v0[R4{0_R({#xQ!fQT-d'`-e]!qQ!r'`-e1o5{Q#p]R'i<VR)f$dY!uQ'`-e1o5{Q'k!rS'u!v!yS'w!z5}S-t'l'mQ-v'nR3T-uT#kZ%eS#jZ%eS%km,oU(g#h#i#lS.Y(h(iQ.^(jQ0t+^Q3Y.ZU3Z.[.]._S7S3[3]R9`7Td#^W#W#Z%h(T(^*Y+Z.T/mr#gZm#h#i#l%e(h(i(j+^.Z.[.]._3[3]7TS*]$x*bQ/t*^Q2U,oQ2l-VQ4`/pQ6q2dQ7s4aQ9W6rT=m'X+[V#aW%h*YU#`W%h*YS(U#W(^U(Z#Z+Z/mS-['X+[T.O(T.TV'^!e%i*ZQ$lfR)x$qT)m$l)nR4V/UT*_$x*bT*h${*YQ0w+fQ1g,VQ3_.fQ5t1iQ6P1qQ7X3cQ8r6SQ9c7WQ:^8qQ:p9bQ;Z:`Q;c:rQ;n;[R;q;dnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&l!VR,h&itmOXst!U!V!Z#d%m&i&r&t&u&w,s,x2[2_R,o&oT%lm,oR1k,XR,g&gQ&U|S+}&V&WR1^,OR+s&PT&p!W&sT&q!W&sT2^,x2_", nodeNames: "\u26A0 ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList in out const TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast < ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate asserts is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration defer ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem", maxTerm: 380, context: Ng, nodeProps: [["isolate", -8, 5, 6, 14, 37, 39, 51, 53, 55, ""], ["group", -26, 9, 17, 19, 68, 207, 211, 215, 216, 218, 221, 224, 234, 237, 243, 245, 247, 249, 252, 258, 264, 266, 268, 270, 272, 274, 275, "Statement", -34, 13, 14, 32, 35, 36, 42, 51, 54, 55, 57, 62, 70, 72, 76, 80, 82, 84, 85, 110, 111, 120, 121, 136, 139, 141, 142, 143, 144, 145, 147, 148, 167, 169, 171, "Expression", -23, 31, 33, 37, 41, 43, 45, 173, 175, 177, 178, 180, 181, 182, 184, 185, 186, 188, 189, 190, 201, 203, 205, 206, "Type", -3, 88, 103, 109, "ClassItem"], ["openedBy", 23, "<", 38, "InterpolationStart", 56, "[", 60, "{", 73, "(", 160, "JSXStartCloseTag"], ["closedBy", -2, 24, 168, ">", 40, "InterpolationEnd", 50, "]", 61, "}", 74, ")", 165, "JSXEndTag"]], propSources: [Jg], skippedNodes: [0, 5, 6, 278], repeatNodeCount: 37, tokenData: "$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$i&j(Wp(Z!b'|0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(X#S$i&j'}0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$i&j(Wp(Z!b'}0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$i&j!p),Q(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(V':f$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$i&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$d`$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$d``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$d`$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ(Z!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$d`(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$i&j(Wp(Z!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$i&j(Wp(Z!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$i&j(Z!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$i&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS(Z!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$i&j(WpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(WpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Wp(Z!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$i&j(o%1l(Wp(Z!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$i&j(Wp(Z!b$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$i&j(Wp(Z!b$]#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$i&j(Wp(Z!b#p(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$i&j$Q(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva(z+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$i&j#z(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(Y';W$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$i&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$d`$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(WpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$d`(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!l/.^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!k!Lf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$i&j(Wp(Z!b(U%&f#q(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$i&j(Wp(Z!b#n(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$i&j(Wp(Z!br+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!]+Jf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$i&j(Wp(Z!b!Q.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_![!L^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$i&j(Wp(Z!b#o(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$i&j(Z!b!X7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$i&j!X7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$i&j!X7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!X7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!X7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$i&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$i&j(Z!b!X7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ(Z!b!X7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse(Z!b!X7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX(Z!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$i&j(Z!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$i&j(Wp!X7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$i&j(Wp!X7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Wp!X7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Wp!X7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(WpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$i&j(WpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$i&j(Wp(Z!b!X7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Wp(Z!b!X7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Wp(Z!b!X7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Wp(Z!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$i&j(Wp(Z!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$i&j(Wp(Z!b(O0/l!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$i&j(Wp(Z!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$i&j(Z!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$i&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW(Z!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$i&j(WpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(WpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Wp(Z!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$i&j$Q(Ch(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$Z#t$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!g$b$i&j$O)Lv(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#R-<U(Wp(Z!b$n7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$k&j(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#r(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$Q(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#s(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#`*!Y$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#k(Cl$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#s(Ch$f#|$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#s(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(r(Ct$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$i&j#{(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!|$Ip$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!S0,v$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$i&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$i&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$i&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$i&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$i&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!Y#)l$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#x(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$i&j(Wp(Z!b(a+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$i&j(Wp(Z!b(T,2j$_#t(e$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$i&j(Wp(Z!b$_#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X!_#Hb(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(y+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_!^(CdvBr$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!q7`$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$i&j(Wp(Z!b'|0/l$]#t(T,2j(e$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$i&j(Wp(Z!b'}0/l$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr", tokenizers: [Ug, Fg, Hg, Kg, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, Gg, new At("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOx~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!U~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(c~~", 141, 340), new At("j~RQYZXz{^~^O(Q~~aP!P!Qd~iO(R~~", 25, 323)], topRules: { Script: [0, 7], SingleExpression: [1, 276], SingleClassItem: [2, 277] }, dialects: { jsx: 0, ts: 15175 }, dynamicPrecedences: { 80: 1, 82: 1, 94: 1, 169: 1, 199: 1 }, specialized: [{ term: 327, get: (n) => e0[n] || -1 }, { term: 343, get: (n) => t0[n] || -1 }, { term: 95, get: (n) => i0[n] || -1 }], tokenPrec: 15201 });
      var Mr = class {
        constructor(e, t, i, r) {
          this.state = e, this.pos = t, this.explicit = i, this.view = r, this.abortListeners = [], this.abortOnDocChange = false;
        }
        tokenBefore(e) {
          let t = W(this.state).resolveInner(this.pos, -1);
          for (; t && e.indexOf(t.name) < 0; ) t = t.parent;
          return t ? { from: t.from, to: this.pos, text: this.state.sliceDoc(t.from, this.pos), type: t.type } : null;
        }
        matchBefore(e) {
          let t = this.state.doc.lineAt(this.pos), i = Math.max(t.from, this.pos - 250), r = t.text.slice(i - t.from, this.pos - t.from), s = r.search(r0(e, false));
          return s < 0 ? null : { from: i + s, to: this.pos, text: r.slice(s) };
        }
        get aborted() {
          return this.abortListeners == null;
        }
        addEventListener(e, t, i) {
          e == "abort" && this.abortListeners && (this.abortListeners.push(t), i && i.onDocChange && (this.abortOnDocChange = true));
        }
      };
      function Ef(n) {
        let e = Object.keys(n).join(""), t = /\w/.test(e);
        return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
      }
      function n0(n) {
        let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
        for (let { label: r } of n) {
          e[r[0]] = true;
          for (let s = 1; s < r.length; s++) t[r[s]] = true;
        }
        let i = Ef(e) + Ef(t) + "*$";
        return [new RegExp("^" + i), new RegExp(i)];
      }
      function zf(n) {
        let e = n.map((r) => typeof r == "string" ? { label: r } : r), [t, i] = e.every((r) => /^\w+$/.test(r.label)) ? [/\w*$/, /\w+$/] : n0(e);
        return (r) => {
          let s = r.matchBefore(i);
          return s || r.explicit ? { from: s ? s.from : r.pos, options: e, validFor: t } : null;
        };
      }
      function Yf(n, e) {
        return (t) => {
          for (let i = W(t.state).resolveInner(t.pos, -1); i; i = i.parent) {
            if (n.indexOf(i.name) > -1) return null;
            if (i.type.isTop) break;
          }
          return e(t);
        };
      }
      function r0(n, e) {
        var t;
        let { source: i } = n, r = e && i[0] != "^", s = i[i.length - 1] != "$";
        return !r && !s ? n : new RegExp(`${r ? "^" : ""}(?:${i})${s ? "$" : ""}`, (t = n.flags) !== null && t !== void 0 ? t : n.ignoreCase ? "i" : "");
      }
      var s0 = Oe.define();
      var $b = typeof navigator == "object" && /Win/.test(navigator.platform);
      var o0 = C.baseTheme({ ".cm-tooltip.cm-tooltip-autocomplete": { "& > ul": { fontFamily: "monospace", whiteSpace: "nowrap", overflow: "hidden auto", maxWidth_fallback: "700px", maxWidth: "min(700px, 95vw)", minWidth: "250px", maxHeight: "10em", height: "100%", listStyle: "none", margin: 0, padding: 0, "& > li, & > completion-section": { padding: "1px 3px", lineHeight: 1.2 }, "& > li": { overflowX: "hidden", textOverflow: "ellipsis", cursor: "pointer" }, "& > completion-section": { display: "list-item", borderBottom: "1px solid silver", paddingLeft: "0.5em", opacity: 0.7 } } }, "&light .cm-tooltip-autocomplete ul li[aria-selected]": { background: "#17c", color: "white" }, "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": { background: "#777" }, "&dark .cm-tooltip-autocomplete ul li[aria-selected]": { background: "#347", color: "white" }, "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": { background: "#444" }, ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": { content: '"\xB7\xB7\xB7"', opacity: 0.5, display: "block", textAlign: "center", cursor: "pointer" }, ".cm-tooltip.cm-completionInfo": { position: "absolute", padding: "3px 9px", width: "max-content", maxWidth: "400px", boxSizing: "border-box", whiteSpace: "pre-line" }, ".cm-completionInfo.cm-completionInfo-left": { right: "100%" }, ".cm-completionInfo.cm-completionInfo-right": { left: "100%" }, ".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" }, ".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" }, "&light .cm-snippetField": { backgroundColor: "#00000022" }, "&dark .cm-snippetField": { backgroundColor: "#ffffff22" }, ".cm-snippetFieldPosition": { verticalAlign: "text-top", width: 0, height: "1.15em", display: "inline-block", margin: "0 -0.7px -.7em", borderLeft: "1.4px dotted #888" }, ".cm-completionMatchedText": { textDecoration: "underline" }, ".cm-completionDetail": { marginLeft: "0.5em", fontStyle: "italic" }, ".cm-completionIcon": { fontSize: "90%", width: ".8em", display: "inline-block", textAlign: "center", paddingRight: ".6em", opacity: "0.6", boxSizing: "content-box" }, ".cm-completionIcon-function, .cm-completionIcon-method": { "&:after": { content: "'\u0192'" } }, ".cm-completionIcon-class": { "&:after": { content: "'\u25CB'" } }, ".cm-completionIcon-interface": { "&:after": { content: "'\u25CC'" } }, ".cm-completionIcon-variable": { "&:after": { content: "'\u{1D465}'" } }, ".cm-completionIcon-constant": { "&:after": { content: "'\u{1D436}'" } }, ".cm-completionIcon-type": { "&:after": { content: "'\u{1D461}'" } }, ".cm-completionIcon-enum": { "&:after": { content: "'\u222A'" } }, ".cm-completionIcon-property": { "&:after": { content: "'\u25A1'" } }, ".cm-completionIcon-keyword": { "&:after": { content: "'\u{1F511}\uFE0E'" } }, ".cm-completionIcon-namespace": { "&:after": { content: "'\u25A2'" } }, ".cm-completionIcon-text": { "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" } } }), Ol = class {
        constructor(e, t, i, r) {
          this.field = e, this.line = t, this.from = i, this.to = r;
        }
      }, pl = class n {
        constructor(e, t, i) {
          this.field = e, this.from = t, this.to = i;
        }
        map(e) {
          let t = e.mapPos(this.from, -1, se.TrackDel), i = e.mapPos(this.to, 1, se.TrackDel);
          return t == null || i == null ? null : new n(this.field, t, i);
        }
      }, ml = class n {
        constructor(e, t) {
          this.lines = e, this.fieldPositions = t;
        }
        instantiate(e, t) {
          let i = [], r = [t], s = e.doc.lineAt(t), o = /^\s*/.exec(s.text)[0];
          for (let a of this.lines) {
            if (i.length) {
              let h7 = o, c = /^\t*/.exec(a)[0].length;
              for (let f = 0; f < c; f++) h7 += e.facet(Tt);
              r.push(t + h7.length - c), a = h7 + a.slice(c);
            }
            i.push(a), t += a.length + 1;
          }
          let l = this.fieldPositions.map((a) => new pl(a.field, r[a.line] + a.from, r[a.line] + a.to));
          return { text: i, ranges: l };
        }
        static parse(e) {
          let t = [], i = [], r = [], s;
          for (let o of e.split(/\r\n?|\n/)) {
            for (; s = /[#$]\{(?:(\d+)(?::([^{}]*))?|((?:\\[{}]|[^{}])*))\}/.exec(o); ) {
              let l = s[1] ? +s[1] : null, a = s[2] || s[3] || "", h7 = -1;
              l === 0 && (l = 1e9);
              let c = a.replace(/\\[{}]/g, (f) => f[1]);
              for (let f = 0; f < t.length; f++) (l != null ? t[f].seq == l : c && t[f].name == c) && (h7 = f);
              if (h7 < 0) {
                let f = 0;
                for (; f < t.length && (l == null || t[f].seq != null && t[f].seq < l); ) f++;
                t.splice(f, 0, { seq: l, name: c }), h7 = f;
                for (let u of r) u.field >= h7 && u.field++;
              }
              for (let f of r) if (f.line == i.length && f.from > s.index) {
                let u = s[2] ? 3 + (s[1] || "").length : 2;
                f.from -= u, f.to -= u;
              }
              r.push(new Ol(h7, i.length, s.index, s.index + c.length)), o = o.slice(0, s.index) + a + o.slice(s.index + s[0].length);
            }
            o = o.replace(/\\([{}])/g, (l, a, h7) => {
              for (let c of r) c.line == i.length && c.from > h7 && (c.from--, c.to--);
              return a;
            }), i.push(o);
          }
          return new n(i, r);
        }
      }, l0 = Y.widget({ widget: new class extends lt {
        toDOM() {
          let n = document.createElement("span");
          return n.className = "cm-snippetFieldPosition", n;
        }
        ignoreEvent() {
          return false;
        }
      }() }), a0 = Y.mark({ class: "cm-snippetField" }), Zi = class n {
        constructor(e, t) {
          this.ranges = e, this.active = t, this.deco = Y.set(e.map((i) => (i.from == i.to ? l0 : a0).range(i.from, i.to)), true);
        }
        map(e) {
          let t = [];
          for (let i of this.ranges) {
            let r = i.map(e);
            if (!r) return null;
            t.push(r);
          }
          return new n(t, this.active);
        }
        selectionInsideField(e) {
          return e.ranges.every((t) => this.ranges.some((i) => i.field == this.active && i.from <= t.from && i.to >= t.to));
        }
      }, dn = V.define({ map(n, e) {
        return n && n.map(e);
      } }), h0 = V.define(), un = ye.define({ create() {
        return null;
      }, update(n, e) {
        for (let t of e.effects) {
          if (t.is(dn)) return t.value;
          if (t.is(h0) && n) return new Zi(n.ranges, t.value);
        }
        return n && e.docChanged && (n = n.map(e.changes)), n && e.selection && !n.selectionInsideField(e.selection) && (n = null), n;
      }, provide: (n) => C.decorations.from(n, (e) => e ? e.deco : Y.none) });
      function gl(n, e) {
        return b.create(n.filter((t) => t.field == e).map((t) => b.range(t.from, t.to)));
      }
      function c0(n) {
        let e = ml.parse(n);
        return (t, i, r, s) => {
          let { text: o, ranges: l } = e.instantiate(t.state, r), { main: a } = t.state.selection, h7 = { changes: { from: r, to: s == a.from ? a.to : s, insert: M.of(o) }, scrollIntoView: true, annotations: i ? [s0.of(i), ee.userEvent.of("input.complete")] : void 0 };
          if (l.length && (h7.selection = gl(l, 0)), l.some((c) => c.field > 0)) {
            let c = new Zi(l, 0), f = h7.effects = [dn.of(c)];
            t.state.field(un, false) === void 0 && f.push(V.appendConfig.of([un, p0, m0, o0]));
          }
          t.dispatch(t.state.update(h7));
        };
      }
      function _f(n) {
        return ({ state: e, dispatch: t }) => {
          let i = e.field(un, false);
          if (!i || n < 0 && i.active == 0) return false;
          let r = i.active + n, s = n > 0 && !i.ranges.some((o) => o.field == r + n);
          return t(e.update({ selection: gl(i.ranges, r), effects: dn.of(s ? null : new Zi(i.ranges, r)), scrollIntoView: true })), true;
        };
      }
      var f0 = ({ state: n, dispatch: e }) => n.field(un, false) ? (e(n.update({ effects: dn.of(null) })), true) : false, u0 = _f(1), d0 = _f(-1);
      var O0 = [{ key: "Tab", run: u0, shift: d0 }, { key: "Escape", run: f0 }], jf = $.define({ combine(n) {
        return n.length ? n[0] : O0;
      } }), p0 = Fe.highest(Gt.compute([jf], (n) => n.facet(jf)));
      function ue(n, e) {
        return { ...e, apply: c0(n) };
      }
      var m0 = C.domEventHandlers({ mousedown(n, e) {
        let t = e.state.field(un, false), i;
        if (!t || (i = e.posAtCoords({ x: n.clientX, y: n.clientY })) == null) return false;
        let r = t.ranges.find((s) => s.from <= i && s.to >= i);
        return !r || r.field == t.active ? false : (e.dispatch({ selection: gl(t.ranges, r.field), effects: dn.of(t.ranges.some((s) => s.field > r.field) ? new Zi(t.ranges, r.field) : null), scrollIntoView: true }), true);
      } });
      var Vf = new class extends Te {
      }();
      Vf.startSide = 1;
      Vf.endSide = -1;
      var Pb = typeof navigator == "object" && /Android\b/.test(navigator.userAgent);
      var qf = [ue("function ${name}(${params}) {\n	${}\n}", { label: "function", detail: "definition", type: "keyword" }), ue("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", { label: "for", detail: "loop", type: "keyword" }), ue("for (let ${name} of ${collection}) {\n	${}\n}", { label: "for", detail: "of loop", type: "keyword" }), ue("do {\n	${}\n} while (${})", { label: "do", detail: "loop", type: "keyword" }), ue("while (${}) {\n	${}\n}", { label: "while", detail: "loop", type: "keyword" }), ue(`try {
	\${}
} catch (\${error}) {
	\${}
}`, { label: "try", detail: "/ catch block", type: "keyword" }), ue("if (${}) {\n	${}\n}", { label: "if", detail: "block", type: "keyword" }), ue(`if (\${}) {
	\${}
} else {
	\${}
}`, { label: "if", detail: "/ else block", type: "keyword" }), ue(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, { label: "class", detail: "definition", type: "keyword" }), ue('import {${names}} from "${module}"\n${}', { label: "import", detail: "named", type: "keyword" }), ue('import ${name} from "${module}"\n${}', { label: "import", detail: "default", type: "keyword" })], g0 = qf.concat([ue("interface ${name} {\n	${}\n}", { label: "interface", detail: "definition", type: "keyword" }), ue("type ${name} = ${type}", { label: "type", detail: "definition", type: "keyword" }), ue("enum ${name} {\n	${}\n}", { label: "enum", detail: "definition", type: "keyword" })]), Wf = new xi(), If = /* @__PURE__ */ new Set(["Script", "Block", "FunctionExpression", "FunctionDeclaration", "ArrowFunction", "MethodDeclaration", "ForStatement"]);
      function On(n) {
        return (e, t) => {
          let i = e.node.getChild("VariableDefinition");
          return i && t(i, n), true;
        };
      }
      var S0 = ["FunctionDeclaration"], b0 = { FunctionDeclaration: On("function"), ClassDeclaration: On("class"), ClassExpression: () => true, EnumDeclaration: On("constant"), TypeAliasDeclaration: On("type"), NamespaceDeclaration: On("namespace"), VariableDefinition(n, e) {
        n.matchContext(S0) || e(n, "variable");
      }, TypeDefinition(n, e) {
        e(n, "type");
      }, __proto__: null };
      function Nf(n, e) {
        let t = Wf.get(e);
        if (t) return t;
        let i = [], r = true;
        function s(o, l) {
          let a = n.sliceString(o.from, o.to);
          i.push({ label: a, type: l });
        }
        return e.cursor(E.IncludeAnonymous).iterate((o) => {
          if (r) r = false;
          else if (o.name) {
            let l = b0[o.name];
            if (l && l(o, s) || If.has(o.name)) return false;
          } else if (o.to - o.from > 8192) {
            for (let l of Nf(n, o.node)) i.push(l);
            return false;
          }
        }), Wf.set(e, i), i;
      }
      var Df = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, Gf = ["TemplateString", "String", "RegExp", "LineComment", "BlockComment", "VariableDefinition", "TypeDefinition", "Label", "PropertyDefinition", "PropertyName", "PrivatePropertyDefinition", "PrivatePropertyName", "JSXText", "JSXAttributeValue", "JSXOpenTag", "JSXCloseTag", "JSXSelfClosingTag", ".", "?."];
      function y0(n) {
        let e = W(n.state).resolveInner(n.pos, -1);
        if (Gf.indexOf(e.name) > -1) return null;
        let t = e.name == "VariableName" || e.to - e.from < 20 && Df.test(n.state.sliceDoc(e.from, e.to));
        if (!t && !n.explicit) return null;
        let i = [];
        for (let r = e; r; r = r.parent) If.has(r.name) && (i = i.concat(Nf(n.state.doc, r)));
        return { options: i, from: t ? e.from : n.pos, validFor: Df };
      }
      var Ge = vt.define({ name: "javascript", parser: Lf.configure({ props: [ct.add({ IfStatement: Pi({ except: /^\s*({|else\b)/ }), TryStatement: Pi({ except: /^\s*({|catch\b|finally\b)/ }), LabeledStatement: Pc, SwitchBody: (n) => {
        let e = n.textAfter, t = /^\s*\}/.test(e), i = /^\s*(case|default)\b/.test(e);
        return n.baseIndent + (t ? 0 : i ? 1 : 2) * n.unit;
      }, Block: wc({ closing: "}" }), ArrowFunction: (n) => n.baseIndent + n.unit, "TemplateString BlockComment": () => null, "Statement Property": Pi({ except: /^\s*{/ }), JSXElement(n) {
        let e = /^\s*<\//.test(n.textAfter);
        return n.lineIndent(n.node.from) + (e ? 0 : n.unit);
      }, JSXEscape(n) {
        let e = /\s*\}/.test(n.textAfter);
        return n.lineIndent(n.node.from) + (e ? 0 : n.unit);
      }, "JSXOpenTag JSXSelfClosingTag"(n) {
        return n.column(n.node.from) + n.unit;
      } }), ft.add({ "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": Pr, BlockComment(n) {
        return { from: n.from + 2, to: n.to - 2 };
      }, JSXElement(n) {
        let e = n.firstChild;
        if (!e || e.name == "JSXSelfClosingTag") return null;
        let t = n.lastChild;
        return { from: e.to, to: t.type.isError ? n.to : t.from };
      }, "JSXSelfClosingTag JSXOpenTag"(n) {
        var e;
        let t = (e = n.firstChild) === null || e === void 0 ? void 0 : e.nextSibling, i = n.lastChild;
        return !t || t.type.isError ? null : { from: t.to, to: i.type.isError ? n.to : i.from };
      } })] }), languageData: { closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] }, commentTokens: { line: "//", block: { open: "/*", close: "*/" } }, indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/, wordChars: "$" } }), Uf = { test: (n) => /^JSX/.test(n.name), facet: ln({ commentTokens: { block: { open: "{/*", close: "*/}" } } }) }, Sl = Ge.configure({ dialect: "ts" }, "typescript"), bl = Ge.configure({ dialect: "jsx", props: [wr.add((n) => n.isTop ? [Uf] : void 0)] }), yl = Ge.configure({ dialect: "jsx ts", props: [wr.add((n) => n.isTop ? [Uf] : void 0)] }, "typescript"), Ff = (n) => ({ label: n, type: "keyword" }), Hf = "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(Ff), Q0 = Hf.concat(["declare", "implements", "private", "protected", "public"].map(Ff));
      function Lr(n = {}) {
        let e = n.jsx ? n.typescript ? yl : bl : n.typescript ? Sl : Ge, t = n.typescript ? g0.concat(Q0) : qf.concat(Hf);
        return new Be(e, [Ge.data.of({ autocomplete: Yf(Gf, zf(t)) }), Ge.data.of({ autocomplete: y0 }), n.jsx ? w0 : []]);
      }
      function x0(n) {
        for (; ; ) {
          if (n.name == "JSXOpenTag" || n.name == "JSXSelfClosingTag" || n.name == "JSXFragmentTag") return n;
          if (n.name == "JSXEscape" || !n.parent) return null;
          n = n.parent;
        }
      }
      function Bf(n, e, t = n.length) {
        for (let i = e?.firstChild; i; i = i.nextSibling) if (i.name == "JSXIdentifier" || i.name == "JSXBuiltin" || i.name == "JSXNamespacedName" || i.name == "JSXMemberExpression") return n.sliceString(i.from, Math.min(i.to, t));
        return "";
      }
      var k0 = typeof navigator == "object" && /Android\b/.test(navigator.userAgent), w0 = C.inputHandler.of((n, e, t, i, r) => {
        if ((k0 ? n.composing : n.compositionStarted) || n.state.readOnly || e != t || i != ">" && i != "/" || !Ge.isActiveAt(n.state, e, -1)) return false;
        let s = r(), { state: o } = s, l = o.changeByRange((a) => {
          var h7;
          let { head: c } = a, f = W(o).resolveInner(c - 1, -1), u;
          if (f.name == "JSXStartTag" && (f = f.parent), !(o.doc.sliceString(c - 1, c) != i || f.name == "JSXAttributeValue" && f.to > c)) {
            if (i == ">" && f.name == "JSXFragmentTag") return { range: a, changes: { from: c, insert: "</>" } };
            if (i == "/" && f.name == "JSXStartCloseTag") {
              let d = f.parent, O = d.parent;
              if (O && d.from == c - 2 && ((u = Bf(o.doc, O.firstChild, c)) || ((h7 = O.firstChild) === null || h7 === void 0 ? void 0 : h7.name) == "JSXFragmentTag")) {
                let m = `${u}>`;
                return { range: b.cursor(c + m.length, -1), changes: { from: c, insert: m } };
              }
            } else if (i == ">") {
              let d = x0(f);
              if (d && d.name == "JSXOpenTag" && !/^\/?>|^<\//.test(o.doc.sliceString(c, c + 2)) && (u = Bf(o.doc, d, c))) return { range: a, changes: { from: c, insert: `</${u}>` } };
            }
          }
          return { range: a };
        });
        return l.changes.empty ? false : (n.dispatch([s, o.update(l, { userEvent: "input.complete", scrollIntoView: true })]), true);
      });
      var $0 = 148, Kf = 1, P0 = 149, v0 = 150, eu = 2, T0 = 151, C0 = 3, Z0 = 4, tu = [9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288], A0 = 58, X0 = 40, iu = 95, R0 = 91, Er = 45, M0 = 46, L0 = 35, E0 = 37, j0 = 38, z0 = 92, Y0 = 10, _0 = 42;
      function pn(n) {
        return n >= 65 && n <= 90 || n >= 97 && n <= 122 || n >= 161;
      }
      function Ql(n) {
        return n >= 48 && n <= 57;
      }
      function Jf(n) {
        return Ql(n) || n >= 97 && n <= 102 || n >= 65 && n <= 70;
      }
      var nu = (n, e, t) => (i, r) => {
        for (let s = false, o = 0, l = 0; ; l++) {
          let { next: a } = i;
          if (pn(a) || a == Er || a == iu || s && Ql(a)) !s && (a != Er || l > 0) && (s = true), o === l && a == Er && o++, i.advance();
          else if (a == z0 && i.peek(1) != Y0) {
            if (i.advance(), Jf(i.next)) {
              do
                i.advance();
              while (Jf(i.next));
              i.next == 32 && i.advance();
            } else i.next > -1 && i.advance();
            s = true;
          } else {
            s && i.acceptToken(o == 2 && r.canShift(eu) ? e : a == X0 ? t : n);
            break;
          }
        }
      }, V0 = new ne(nu(P0, eu, v0), { contextual: true }), W0 = new ne(nu(T0, C0, Z0), { contextual: true }), D0 = new ne((n) => {
        if (tu.includes(n.peek(-1))) {
          let { next: e } = n;
          (pn(e) || e == iu || e == L0 || e == M0 || e == _0 || e == R0 || e == A0 && pn(n.peek(1)) || e == Er || e == j0) && n.acceptToken($0);
        }
      }), B0 = new ne((n) => {
        if (!tu.includes(n.peek(-1))) {
          let { next: e } = n;
          if (e == E0 && (n.advance(), n.acceptToken(Kf)), pn(e)) {
            do
              n.advance();
            while (pn(n.next) || Ql(n.next));
            n.acceptToken(Kf);
          }
        }
      }), q0 = We({ "AtKeyword import charset namespace keyframes media supports font-feature-values": p.definitionKeyword, "from to selector scope MatchFlag": p.keyword, NamespaceName: p.namespace, KeyframeName: p.labelName, KeyframeRangeName: p.operatorKeyword, TagName: p.tagName, ClassName: p.className, PseudoClassName: p.constant(p.className), IdName: p.labelName, "FeatureName PropertyName": p.propertyName, AttributeName: p.attributeName, NumberLiteral: p.number, KeywordQuery: p.keyword, UnaryQueryOp: p.operatorKeyword, "CallTag ValueName FontName": p.atom, VariableName: p.variableName, Callee: p.operatorKeyword, Unit: p.unit, "UniversalSelector NestingSelector": p.definitionOperator, "MatchOp CompareOp": p.compareOperator, "ChildOp SiblingOp, LogicOp": p.logicOperator, BinOp: p.arithmeticOperator, Important: p.modifier, Comment: p.blockComment, ColorLiteral: p.color, "ParenthesizedContent StringLiteral": p.string, ":": p.punctuation, "PseudoOp #": p.derefOperator, "; , |": p.separator, "( )": p.paren, "[ ]": p.squareBracket, "{ }": p.brace }), I0 = { __proto__: null, lang: 44, "nth-child": 44, "nth-last-child": 44, "nth-of-type": 44, "nth-last-of-type": 44, dir: 44, "host-context": 44, if: 90, url: 158, "url-prefix": 158, domain: 158, regexp: 158 }, N0 = { __proto__: null, or: 104, and: 104, not: 112, only: 112, layer: 212 }, G0 = { __proto__: null, selector: 118, style: 124, layer: 208 }, U0 = { __proto__: null, "@import": 204, "@media": 216, "@charset": 220, "@namespace": 224, "@keyframes": 230, "@supports": 242, "@scope": 246, "@font-feature-values": 252 }, F0 = { __proto__: null, to: 249 }, ru = Xt.deserialize({ version: 14, states: "MrQYQdOOO#}QdOOP$UO`OOO%OQaO'#CfOOQP'#Ce'#CeO%VQdO'#CgO%[Q`O'#CgO%aQaO'#FqO&XQdO'#CkO&xQaO'#CcO'SQdO'#CnO'_QdO'#ERO'dQdO'#ETO'oQdO'#E[O'oQdO'#E_OOQP'#Fq'#FqO)RQhO'#FQOOQS'#Fp'#FpOOQS'#FT'#FTQYQdOOO)YQdO'#EeO*iQhO'#EkO)YQdO'#EmO*pQdO'#EoO*{QdO'#ErO)}QhO'#ExO+TQdO'#EzO+`QdO'#E}O+eQaO'#CfO+lQ`O'#EbO+qQ`O'#F}O+|QdO'#F}QOQ`OOP,WO&jO'#CaPOOO)CA`)CA`OOQP'#Ci'#CiOOQP,59R,59RO%VQdO,59ROOQP'#Cm'#CmOOQP,59V,59VO&XQdO,59VO,cQdO,59YO'_QdO,5:mO'dQdO,5:oO'oQdO,5:vO'oQdO,5:xO'oQdO,5:yO'oQdO'#F[O,nQ`O,58}O,vQdO'#EaOOQS,58},58}OOQP'#Cq'#CqOOQO'#EP'#EPOOQP,59Y,59YO,}Q`O,59YO-SQ`O,59YOOQP'#ES'#ESOOQP,5:m,5:mO-XQpO'#EUO-dQdO'#EVO-iQ`O'#EVO-nQpO,5:oO.XQaO,5:vO.oQaO,5:yOOQW'#D^'#D^O/nQhO'#DgO0RQhO,5;lO)}QhO'#DeO0`Q`O'#DnO0eQhO'#D{OOQW'#Fw'#FwOOQS,5;l,5;lO0jQ`O'#DhO0oQ`O'#DkOOQS-E9R-E9ROOQ['#Cv'#CvO0tQdO'#CwO1[QdO'#C}O1rQdO'#DQO2YQ!pO'#DSO4fQ!jO,5;POOQO'#DX'#DXO-SQ`O'#DWO4vQ!nO'#FtO6|Q`O'#DYO7RQ`O'#D|OOQ['#Ft'#FtO7WQhO'#GQO7fQ`O,5;VO7kQ!bO,5;XOOQS'#Eq'#EqO7sQ`O,5;ZO7xQdO,5;ZOOQO'#Et'#EtO8QQ`O,5;^O8VQhO,5;dO'oQdO'#DjOOQS,5;f,5;fO0jQ`O,5;fO8_QdO,5;fOOQS'#Fc'#FcO8gQdO'#FPO7fQ`O,5;iO8oQdO,5:|O9PQdO'#F^O9^Q`O,5<iO9^Q`O,5<iPOOO'#FS'#FSP9iO&jO,58{POOO,58{,58{OOQP1G.m1G.mOOQP1G.q1G.qOOQP1G.t1G.tO,}Q`O1G.tO-SQ`O1G.tOOQP1G0X1G0XO9tQpO1G0ZO9|QaO1G0bO:dQaO1G0dO:zQaO1G0eO;bQaO,5;vOOQO-E9Y-E9YOOQS1G.i1G.iO;lQ`O,5:{O;qQdO'#EQO;xQdO'#CuOOQO'#EX'#EXOOQO,5:q,5:qO-dQdO,5:qOOQP1G0Z1G0ZO)YQdO1G0ZO<PQ!jO'#D^O<_Q!bO,59yO<gQhO,5:ROOQO'#Fx'#FxO<bQ!bO,59}O<oQhO'#FdO)}QhO,59{O)}QhO'#FdO=gQhO1G1WOOQS1G1W1G1WO=qQhO,5:PO>lQhO'#DoOOQW,5:Y,5:YOOQW,5:g,5:gOOQW,5:S,5:SO>vQhO,5:VO?bQ!fO'#FuOOQS'#Fu'#FuOOQS'#FV'#FVO@rQdO,59cOOQ[,59c,59cOAYQdO,59iOOQ[,59i,59iOApQdO,59lOOQ[,59l,59lOOQ[,59n,59nO)YQdO,59pOBWQhO'#EgOOQW'#Eg'#EgOBuQ`O1G0kO4oQhO1G0kOOQ[,59r,59rO)}QhO'#D[OOQ[,59t,59tOBzQ#tO,5:hOCVQhO'#F`OCdQ`O,5<lOOQS1G0q1G0qOOQS1G0s1G0sOOQS1G0u1G0uOCoQ`O1G0uOCtQdO'#EuOOQS1G0x1G0xOOQS1G1O1G1OODPQaO,5:UO7fQ`O1G1QOOQS1G1Q1G1QO0jQ`O1G1QOOQS-E9a-E9aOOQS1G1T1G1TODWQ!fO1G0hODnQ`O'#EdOOQO1G0h1G0hOOQO,5;x,5;xODsQdO,5;xOOQO-E9[-E9[OEQQ`O1G2TPOOO-E9Q-E9QPOOO1G.g1G.gOOQP7+$`7+$`OOQP7+%u7+%uO)YQdO7+%uOOQS1G0g1G0gOE]QaO'#F|OEgQ`O,5:lOElQ!fO'#FUOFjQdO'#FsOFtQ`O,59aOOQO1G0]1G0]OFyQ!bO7+%uO)YQdO1G/eOGUQhO1G/iOOQW1G/m1G/mOOQW1G/g1G/gOGgQhO,5<OOOQW-E9b-E9bOOQS7+&r7+&rOH_QhO'#D^OHmQhO'#F{OHxQ`O'#F{OH}Q`O,5:ZOISQ!bO'#D`O>vQhO'#DmOI_QhO'#DsOIgQhO'#DuOIlQ!jO'#FzOOQO'#Fz'#FzOIwQ`O'#DxOJPQ!bO'#DzOOQO'#Fy'#FyOJUQ`O1G/qOOQS-E9T-E9TOOQ[1G.}1G.}OOQ[1G/T1G/TOOQ[1G/W1G/WOOQ[1G/[1G/[OJZQdO,5;ROOQS7+&V7+&VOJ`Q`O7+&VOJeQhO'#D]OJmQ`O,59vO)}QhO,59vOOQ[1G0S1G0SOJuQ`O1G0SOJzQhO,5;zOOQO-E9^-E9^OOQS7+&a7+&aOKYQbO'#DSOOQO'#Ew'#EwOKhQ`O'#EvOOQO'#Ev'#EvOKsQ`O'#FaOK{QdO,5;aOOQS,5;a,5;aOOQ[1G/p1G/pOOQS7+&l7+&lO7fQ`O7+&lOLWQ!fO'#F]O)YQdO'#F]OM_QdO7+&SOOQO7+&S7+&SOOQO,5;O,5;OOOQO1G1d1G1dOMrQ!bO<<IaOM}QdO'#FZONXQ`O,5<hOOQP1G0W1G0WOOQS-E9S-E9SONaQdO'#FYONkQ`O,5<_OOQ]1G.{1G.{OOQP<<Ia<<IaONsQ`O<<IaONxQdO7+%POOQO'#D`'#D`O! PQ!bO7+%TO! XQhO'#FXO! fQ`O,5<gO)YQdO,5<gOOQW1G/u1G/uO! nQ`O,5:XO>vQhO'#DtOOQO,5:_,5:_O! sQhO,5:aO! {QhO,5:fO)YQdO,5:dOOQW7+%]7+%]OOQO'#Ei'#EiO!!SQ`O1G0mOOQS<<Iq<<IqO)YQdO,59wO!!vQhO1G/bOOQ[1G/b1G/bO!!}Q`O1G/bOOQW-E9U-E9UOOQ[7+%n7+%nOOQO,5;b,5;bOCwQdO'#FbOKsQ`O,5;{OOQS,5;{,5;{OOQS-E9_-E9_OOQS1G0{1G0{OOQS<<JW<<JWO!#VQ!fO,5;wOOQS-E9Z-E9ZOOQO<<In<<InOOQPAN>{AN>{O!$^Q`OAN>{O!$cQaO,5;uOOQO-E9X-E9XO!$mQdO,5;tOOQO-E9W-E9WOOQW<<Hk<<HkOOQW<<Ho<<HoO!$wQhO<<HoO!%YQhO'#D^O!%hQhO,5;sO!%sQ`O,5;sOOQO-E9V-E9VO!%xQdO1G2RO!&SQhO1G/sO!&[Q`O,5:`O>vQhO'#DwOOQO1G/{1G/{O!&aQ!bO1G0QO!&iQdO1G0OOJZQdO'#F_O!&pQ`O7+&XOOQW7+&X7+&XO!&xQ!bO1G/cOOQ[7+$|7+$|O!'TQhO7+$|P!'[Q`O'#FWOOQO,5;|,5;|OOQO-E9`-E9`OOQS1G1g1G1gOOQPG24gG24gO!'aQ`OAN>ZO)YQdO1G1_O!'fQ`O7+'mOOQO1G/z1G/zO!'nQ`O,5:cO!'sQhO7+%lOOQO,5;y,5;yOOQO-E9]-E9]OOQW<<Is<<IsOOQ[<<Hh<<HhPOQW,5;r,5;rOOQWG23uG23uO!'zQdO7+&yOOQO1G/}1G/}OOQO<<IW<<IW", stateData: "!(_~O$_OS$`QQ~OWVO^_O`WOcYOdYOl`OmZOp[O#P]O#S^O#YdO#`eO#bfO#dgO#ghO#miO#ojO#rkO$ZRO$fTO~OQmOWVO^_O`WOcYOdYOl`OmZOp[O#P]O#S^O#YdO#`eO#bfO#dgO#ghO#miO#ojO#rkO$ZlO$fTO~O$X$qP~P!jO$`qO~O`YXcYXdYXmYXpYXsYX!eYX#PYX#SYX$YYX$f[X~OgYX~P$ZO$ZsO~O$fuO~O$fuO`$eXc$eXd$eXm$eXp$eXs$eX!e$eX#P$eX#S$eX$Y$eXg$eX~O$ZvO~O`xOcyOdyOmzOp{O#P|O#S!OO$Y}O~Os!RO!e!PO~P&^Of!XO$Z!TO$[!UO~O$Z!YO~OW!^O$Z![O$f!]O~OWVO^_O`WOcYOdYOmZOp[O#P]O#S^O$ZRO$fTO~OS!fOc!gOd!gOh!cOs!RO!Y!eO!]!jO!`!kO$]!bO~On!iO~P(dOQ!uOh!nOp!oOs!pOu!xOw!xO}!vO!q!wO$Z!mO$[!sO$j!qO~OS!fOc!gOd!gOh!cO!Y!eO!]!jO!`!kO$]!bO~Os$tP~P)}Ow!}O!q!wO$Z!|O~Ow#PO$Z#PO~Oh#SOs!RO#p#UO~O$Z#WO~Oc#VX~P$ZOc#ZO~On#[O$X$qXr$qX~O$X$qXr$qX~P!jO$a#_O$b#_O$c#aO~Of#fO$Z!TO$[!UO~Os!RO!e!PO~Or$qP~P!jOh#pO~Oh#qO~Oo!xX!|!xX$f!zX~O$Z#rO~O$f#tO~Oo#uO!|#vO~O`xOcyOdyOmzOp{O~Os#Oa!e#Oa#P#Oa#S#Oa$Y#Oag#Oa~P-vOs#Ra!e#Ra#P#Ra#S#Ra$Y#Rag#Ra~P-vOS!fOc!gOd!gOh!cO!Y!eO!]!jO!`!kO~OR#zOu#zOw#zO$]#wO$j!qO~P/VOn$QO!U#}O!e$OO~P(dOh$SO~O$]$UO~Oh#SO~Oh$WO~O`$YOc$YOg$]Ol$YOm$YOn$YO~P)YO`$YOc$YOl$YOm$YOn$YOo$_O~P)YO`$YOc$YOl$YOm$YOn$YOr$aO~P)YOP$bOSvXcvXdvXhvXnvXyvX!YvX!]vX!`vX#[vX#^vX$]vX!WvXQvX`vXgvXlvXmvXpvXsvXuvXwvX}vX!qvX$ZvX$[vX$jvXovXrvX!evX$XvX$svX!}vX~Oy$cO#[$dO#^$eOn$tP~P)}Oh#qOS$hXc$hXd$hXn$hXy$hX!Y$hX!]$hX!`$hX#[$hX#^$hX$]$hXQ$hX`$hXg$hXl$hXm$hXp$hXs$hXu$hXw$hX}$hX!q$hX$Z$hX$[$hX$j$hXo$hXr$hX!e$hX$X$hX$s$hX!}$hX~Oh$iO~Oh$kO~O!U#}O!e$lOs$tXn$tX~Os!RO~On$oOy$cO~On$pO~Ow$qO!q!wO~Os$rO~Os!RO!U#}O~Os!RO#p$xO~O$Z#WOs#sX~O$s$|On#Ua$X#Uar#Ua~P)YOn$QX$X$QXr$QX~P!jOn#[O$X$qar$qa~O$a#_O$b#_O$c%TO~Oo%VO!|%WO~Os#Oi!e#Oi#P#Oi#S#Oi$Y#Oig#Oi~P-vOs#Qi!e#Qi#P#Qi#S#Qi$Y#Qig#Qi~P-vOs#Ri!e#Ri#P#Ri#S#Ri$Y#Rig#Ri~P-vOs$Oa!e$Oa~P&^Or%XO~Og$pP~P'oOg$gP~P)YOc!SXg!QX!U!QX!W!SX~Oc%aO!W%bO~Og%cO!U#}O~O!U#}OS$WXc$WXd$WXh$WXn$WXs$WX!Y$WX!]$WX!`$WX!e$WX$]$WX~On%gO!e$OO~P(dO!U#}OS!Xac!Xad!Xah!Xan!Xas!Xa!Y!Xa!]!Xa!`!Xa!e!Xa$]!Xag!Xa~O$]%hOg$oP~P/VOR#zOS!fOh%mOu#zOw#zO!Y%nO$]%lO$j!qO~Oy$cOQ$iX`$iXc$iXg$iXh$iXl$iXm$iXn$iXp$iXs$iXu$iXw$iX}$iX!q$iX$Z$iX$[$iX$j$iXo$iXr$iX~O`$YOc$YOg%wOl$YOm$YOn$YO~P)YO`$YOc$YOl$YOm$YOn$YOo%xO~P)YO`$YOc$YOl$YOm$YOn$YOr%yO~P)YOh%{OS#ZXc#ZXd#ZXn#ZX!Y#ZX!]#ZX!`#ZX$]#ZX~On%|O~Og&ROw&SO!r&SO~Os$SX!e$SXn$SX~P)}O!e$lOs$tan$ta~On&VO~Or&^O$Z&XO$j&WO~Og&_O~P&^Oy$cO!e&cO$s$|On#Ui$X#Uir#Ui~P)YO$r&fO~On$Qa$X$Qar$Qa~P!jOn#[O$X$qir$qi~O!e&iOg$pX~P&^Og&kO~Oy$cOQ#xXg#xXh#xXp#xXs#xXu#xXw#xX}#xX!e#xX!q#xX$Z#xX$[#xX$j#xX~O!e&mOg$gX~P)YOg&oO~Oo&pOy$cO!}&qO~OR#zOu#zOw#zO$]&sO$j!qO~O!U#}OS$Wac$Wad$Wah$Wan$Was$Wa!Y$Wa!]$Wa!`$Wa!e$Wa$]$Wa~Oc!dXg!QX!U!QX!e!QX~O!U#}O!e&uOg$oX~Oc&wO~Og&xO~Oc!mXg!mX!W!SX~OS!fOh&zO~O!U&|O~O!U&|O!W&}Og$nX~Oc'OOg!lX~O!W&}O~Og'PO~O$Z'QO~On'SO~Oc'TO!U#}O~Og'VOn'UO~Og'YO~O!U#}Os$Sa!e$San$Sa~OP$bOsvX!evXgvX~O$j&WOs#jX!e#jX~Os!RO!e'[O~Or'`O$Z&XO$j&WO~Oy$cOQ$PXh$PXn$PXp$PXs$PXu$PXw$PX}$PX!e$PX!q$PX$X$PX$Z$PX$[$PX$j$PX$s$PXr$PX~O!e&cO$s$|On#Uq$X#Uqr#Uq~P)YOo'eOy$cO!}'fO~Og#}X!e#}X~P'oO!e&iOg$pa~Og#|X!e#|X~P)YO!e&mOg$ga~Oo'eO~Og'kO~P)YOg'lO!W'mO~O$]'nOg#{X!e#{X~P/VO!e&uOg$oa~Og'sO~OS!fOh'uO~OS!fO~PGUO`'yOg'{O~OS#zac#zad#zah#za!Y#za!]#za!`#za$]#za~Og'}O~P!![Og'}On(OO~Oy$cOQ$Pah$Pan$Pap$Pas$Pau$Paw$Pa}$Pa!e$Pa!q$Pa$X$Pa$Z$Pa$[$Pa$j$Pa$s$Par$Pa~Oo(TO~Og#}a!e#}a~P&^Og#|a!e#|a~P)YOR#zOu#zOw#zO$]&sO$j&WO~Oc!fXg!QX!U!QX!e!QX~O!U#}Og#{a!e#{a~Oc(VO~O!e&uOg$oi~P)YOg!ai!U!ji~Og(XO~O!W(ZOg!ni~Og!li~P)YO`'yOg(^O~Oy$cOg!Pin!Pi~Og(_O~P!![On(`O~Og(aO~O!e&uOg$oq~Og(cO~OS!fO~P!$wOg#{q!e#{q~P)YO$_!r$`$j`$jy#S~", goto: "7g$uPPPPP$vP$yP%S%f%S%x&[P%SP&b%SPP&hPPP&n&x&xPPPPP&xPP&xP'hP&xP&x(k&xP)Z)^)d)d)v)dP)dP)dP)d)dP*])dP*i*o+e+hP+k*i+n*i+q+w+z,Q+z)d,WPP,|-S%S-Y%S-`-`-f-jPP%SP%S%SP-p.l.y/Q$yP/ZP/^P$yP$yP$yP/d$yP/g/j/m/t$yP$yPP$yP/y$yP/|0S0c0}1]1c1m1s1y2P2V2a2g2m2s2y3PPPPPPPPPPPP3V3`P4U4X5]P5e6_6t+z7Q7T7WPP7^RrQ_aOPco!R#[%Pq_OP]^co|}!O!P!R#S#[#p%P&iqSOP]^co|}!O!P!R#S#[#p%P&iqUOP]^co|}!O!P!R#S#[#p%P&iQtTR#buQwWR#cxQ!VYR#dyQ#d!XS$h!t!uR%U#f!Z!xdf!n!o!p#Z#q#v$[$^$`$c${%W%]%a&c&d&m&r&w'O'T'i'r'x(V(b!Y!xdf!n!o!p#Z#q#v$[$^$`$c${%W%]%a&c&d&m&r&w'O'T'i'r'x(V(bb#z!c$W%b%m&z&}'m'u(ZU&Z$r&]'[R'Z&Y!Z!tdf!n!o!p#Z#q#v$[$^$`$c${%W%]%a&c&d&m&r&w'O'T'i'r'x(V(bR$j!vQ&P$iR'W&Qq!h`ei!c!d!e!r#}$O$P$S$g$i$l&Q&uQ#x!cW%s$W%m&z'uQ&t%bQ'w&}Q(U'mR(d(ZQ#VjQ$V!jQ$v#UR&a$xX%q$W%m&z'up!h`ei!c!d!e!r#}$O$P$S$g$i$l&Q&uW%p$W%m&z'uQ&{%nQ'v&|Q'w&}R(d(ZR$T!fR%j$SR'p&uR&{%nX%o$W%m&z'uR'v&|X%t$W%m&z'uX%r$W%m&z'u!Y!xdf!n!o!p#Z#q#v$[$^$`$c${%W%]%a&c&d&m&r&w'O'T'i'r'x(V(bQ!}gR$q#OQ!WYR#eyQ#d!WR%U#eQ!ZZR#gzQ!_[R#h{T!^[{Q#s!]R%_#tQ!SXQ!i`Q#TjQ#n!QQ$Q!dQ$n!zQ$t#RQ$w#VQ$z#YQ%g$PQ&`$vQ'^&[Q'a&aR(S']SnP!RQ#^oQ%O#[R&g%PZmPo!R#[%PQ$}#ZQ&e${R'd&dR$g!rQ'R%{R(['yR#OgR#QhR$s#QS&[$r&]R(Q'[V&Y$r&]'[R#YkQ#`qR%S#`QcOSoP!RU!lco%PR%P#[Q%]#q[&l%]&r'i'r'x(bQ&r%aQ'i&mQ'r&wQ'x'OR(b(VQ$[!nQ$^!oQ$`!pV%v$[$^$`Q&Q$iR'X&QQ&v%iS'q&v(WR(W'rQ&n%]R'j&nQ&j%YR'h&jQ!QXR#m!QQ&d${R'c&dQ#]nS%Q#]%RR%R#^Q'z'RR(]'zQ$m!yR&U$mQ&]$rR'_&]Q']&[R(R']Q#XkR$y#XQ$P!dR%f$P_bOPco!R#[%P^XOPco!R#[%PQ!`]Q!a^Q#i|Q#j}Q#k!OQ#l!PQ$u#SQ%Y#pR'g&iR%^#qQ!rdQ!{f[$X!n!o!p$[$^$`Q${#Zh%[#q%]%a&m&r&w'O'i'r'x(V(bQ%`#vQ%z$cS&b${&dQ&h%WQ'b&cR'|'T]$Z!n!o!p$[$^$`Q!d`U!ye!r$gQ#RiQ#y!cS#|!d$PQ$R!eQ%d#}Q%e$OQ%i$SS&O$i&QQ&T$lR'o&uQ#{!cW%s$W%m&z'uQ&t%bQ'w&}Q(U'mR(d(ZQ%u$WQ&y%mQ't&zR(Y'uR%k$SR%Z#pQpPR#o!RQ!zeQ$f!rR%}$g", nodeNames: "\u26A0 Unit VariableName VariableName QueryCallee Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NamespacedTagSelector NamespaceName TagName NestingSelector ClassSelector . ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue AtKeyword # ; ] [ BracketedValue } { BracedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee IfExpression if ArgList IfBranch KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp ComparisonQuery CompareOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector ParenthesizedSelector StyleQuery style ParenthesedQuery CallQuery ArgList PropertyName , PropertyName UnaryQuery ParenthesedQuery BinaryQuery ParenthesedQuery ParenthesedQuery StyleFeature PropertyName StyleRange PseudoQuery CallLiteral CallTag ParenthesizedContent PseudoClassName ArgList IdSelector IdName AttributeSelector AttributeName NamespacedAttribute NamespaceName AttributeName MatchOp MatchFlag ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp Block Declaration PropertyName Important ImportStatement import Layer layer LayerName layer MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports ScopeStatement scope to FontFeatureStatement font-feature-values FontName AtRule Styles", maxTerm: 174, nodeProps: [["isolate", -2, 5, 39, ""], ["openedBy", 23, "(", 31, "[", 34, "{"], ["closedBy", 24, ")", 32, "]", 35, "}"]], propSources: [q0], skippedNodes: [0, 5, 130], repeatNodeCount: 17, tokenData: "K`~R!bOX%ZX^&R^p%Zpq&Rqr)ers)vst+jtu2Xuv%Zvw3Rwx3dxy5Ryz5dz{5i{|6S|}:u}!O;W!O!P;u!P!Q<^!Q![=V![!]>Q!]!^>|!^!_?_!_!`@Z!`!a@n!a!b%Z!b!cAo!c!k%Z!k!lC|!l!u%Z!u!vC|!v!}%Z!}#OD_#O#P%Z#P#QDp#Q#R2X#R#]%Z#]#^ER#^#g%Z#g#hC|#h#o%Z#o#pIf#p#qIw#q#rJ`#r#sJq#s#y%Z#y#z&R#z$f%Z$f$g&R$g#BY%Z#BY#BZ&R#BZ$IS%Z$IS$I_&R$I_$I|%Z$I|$JO&R$JO$JT%Z$JT$JU&R$JU$KV%Z$KV$KW&R$KW&FU%Z&FU&FV&R&FV;'S%Z;'S;=`KY<%lO%Z`%^SOy%jz;'S%j;'S;=`%{<%lO%j`%oS!r`Oy%jz;'S%j;'S;=`%{<%lO%j`&OP;=`<%l%j~&Wh$_~OX%jX^'r^p%jpq'rqy%jz#y%j#y#z'r#z$f%j$f$g'r$g#BY%j#BY#BZ'r#BZ$IS%j$IS$I_'r$I_$I|%j$I|$JO'r$JO$JT%j$JT$JU'r$JU$KV%j$KV$KW'r$KW&FU%j&FU&FV'r&FV;'S%j;'S;=`%{<%lO%j~'yh$_~!r`OX%jX^'r^p%jpq'rqy%jz#y%j#y#z'r#z$f%j$f$g'r$g#BY%j#BY#BZ'r#BZ$IS%j$IS$I_'r$I_$I|%j$I|$JO'r$JO$JT%j$JT$JU'r$JU$KV%j$KV$KW'r$KW&FU%j&FU&FV'r&FV;'S%j;'S;=`%{<%lO%jj)jS$sYOy%jz;'S%j;'S;=`%{<%lO%j~)yWOY)vZr)vrs*cs#O)v#O#P*h#P;'S)v;'S;=`+d<%lO)v~*hOw~~*kRO;'S)v;'S;=`*t;=`O)v~*wXOY)vZr)vrs*cs#O)v#O#P*h#P;'S)v;'S;=`+d;=`<%l)v<%lO)v~+gP;=`<%l)vj+oYmYOy%jz!Q%j!Q![,_![!c%j!c!i,_!i#T%j#T#Z,_#Z;'S%j;'S;=`%{<%lO%jj,dY!r`Oy%jz!Q%j!Q![-S![!c%j!c!i-S!i#T%j#T#Z-S#Z;'S%j;'S;=`%{<%lO%jj-XY!r`Oy%jz!Q%j!Q![-w![!c%j!c!i-w!i#T%j#T#Z-w#Z;'S%j;'S;=`%{<%lO%jj.OYuY!r`Oy%jz!Q%j!Q![.n![!c%j!c!i.n!i#T%j#T#Z.n#Z;'S%j;'S;=`%{<%lO%jj.uYuY!r`Oy%jz!Q%j!Q![/e![!c%j!c!i/e!i#T%j#T#Z/e#Z;'S%j;'S;=`%{<%lO%jj/jY!r`Oy%jz!Q%j!Q![0Y![!c%j!c!i0Y!i#T%j#T#Z0Y#Z;'S%j;'S;=`%{<%lO%jj0aYuY!r`Oy%jz!Q%j!Q![1P![!c%j!c!i1P!i#T%j#T#Z1P#Z;'S%j;'S;=`%{<%lO%jj1UY!r`Oy%jz!Q%j!Q![1t![!c%j!c!i1t!i#T%j#T#Z1t#Z;'S%j;'S;=`%{<%lO%jj1{SuY!r`Oy%jz;'S%j;'S;=`%{<%lO%jd2[UOy%jz!_%j!_!`2n!`;'S%j;'S;=`%{<%lO%jd2uS!|S!r`Oy%jz;'S%j;'S;=`%{<%lO%jb3WS^QOy%jz;'S%j;'S;=`%{<%lO%j~3gWOY3dZw3dwx*cx#O3d#O#P4P#P;'S3d;'S;=`4{<%lO3d~4SRO;'S3d;'S;=`4];=`O3d~4`XOY3dZw3dwx*cx#O3d#O#P4P#P;'S3d;'S;=`4{;=`<%l3d<%lO3d~5OP;=`<%l3dj5WShYOy%jz;'S%j;'S;=`%{<%lO%j~5iOg~n5pUWQyWOy%jz!_%j!_!`2n!`;'S%j;'S;=`%{<%lO%jj6ZWyW#SQOy%jz!O%j!O!P6s!P!Q%j!Q![9x![;'S%j;'S;=`%{<%lO%jj6xU!r`Oy%jz!Q%j!Q![7[![;'S%j;'S;=`%{<%lO%jj7cY!r`$jYOy%jz!Q%j!Q![7[![!g%j!g!h8R!h#X%j#X#Y8R#Y;'S%j;'S;=`%{<%lO%jj8WY!r`Oy%jz{%j{|8v|}%j}!O8v!O!Q%j!Q![9_![;'S%j;'S;=`%{<%lO%jj8{U!r`Oy%jz!Q%j!Q![9_![;'S%j;'S;=`%{<%lO%jj9fU!r`$jYOy%jz!Q%j!Q![9_![;'S%j;'S;=`%{<%lO%jj:P[!r`$jYOy%jz!O%j!O!P7[!P!Q%j!Q![9x![!g%j!g!h8R!h#X%j#X#Y8R#Y;'S%j;'S;=`%{<%lO%jj:zS!eYOy%jz;'S%j;'S;=`%{<%lO%jj;]WyWOy%jz!O%j!O!P6s!P!Q%j!Q![9x![;'S%j;'S;=`%{<%lO%jj;zU`YOy%jz!Q%j!Q![7[![;'S%j;'S;=`%{<%lO%j~<cTyWOy%jz{<r{;'S%j;'S;=`%{<%lO%j~<yS!r`$`~Oy%jz;'S%j;'S;=`%{<%lO%jj=[[$jYOy%jz!O%j!O!P7[!P!Q%j!Q![9x![!g%j!g!h8R!h#X%j#X#Y8R#Y;'S%j;'S;=`%{<%lO%jj>VUcYOy%jz![%j![!]>i!];'S%j;'S;=`%{<%lO%jj>pSdY!r`Oy%jz;'S%j;'S;=`%{<%lO%jj?RSnYOy%jz;'S%j;'S;=`%{<%lO%jh?dU!WWOy%jz!_%j!_!`?v!`;'S%j;'S;=`%{<%lO%jh?}S!WW!r`Oy%jz;'S%j;'S;=`%{<%lO%jl@bS!WW!|SOy%jz;'S%j;'S;=`%{<%lO%jj@uV#PQ!WWOy%jz!_%j!_!`?v!`!aA[!a;'S%j;'S;=`%{<%lO%jbAcS#PQ!r`Oy%jz;'S%j;'S;=`%{<%lO%jjArYOy%jz}%j}!OBb!O!c%j!c!}CP!}#T%j#T#oCP#o;'S%j;'S;=`%{<%lO%jjBgW!r`Oy%jz!c%j!c!}CP!}#T%j#T#oCP#o;'S%j;'S;=`%{<%lO%jjCW[lY!r`Oy%jz}%j}!OCP!O!Q%j!Q![CP![!c%j!c!}CP!}#T%j#T#oCP#o;'S%j;'S;=`%{<%lO%jhDRS!}WOy%jz;'S%j;'S;=`%{<%lO%jjDdSpYOy%jz;'S%j;'S;=`%{<%lO%jnDuSo^Oy%jz;'S%j;'S;=`%{<%lO%jjEWU!}WOy%jz#a%j#a#bEj#b;'S%j;'S;=`%{<%lO%jbEoU!r`Oy%jz#d%j#d#eFR#e;'S%j;'S;=`%{<%lO%jbFWU!r`Oy%jz#c%j#c#dFj#d;'S%j;'S;=`%{<%lO%jbFoU!r`Oy%jz#f%j#f#gGR#g;'S%j;'S;=`%{<%lO%jbGWU!r`Oy%jz#h%j#h#iGj#i;'S%j;'S;=`%{<%lO%jbGoU!r`Oy%jz#T%j#T#UHR#U;'S%j;'S;=`%{<%lO%jbHWU!r`Oy%jz#b%j#b#cHj#c;'S%j;'S;=`%{<%lO%jbHoU!r`Oy%jz#h%j#h#iIR#i;'S%j;'S;=`%{<%lO%jbIYS$rQ!r`Oy%jz;'S%j;'S;=`%{<%lO%jjIkSsYOy%jz;'S%j;'S;=`%{<%lO%jfI|U$fUOy%jz!_%j!_!`2n!`;'S%j;'S;=`%{<%lO%jjJeSrYOy%jz;'S%j;'S;=`%{<%lO%jfJvU#SQOy%jz!_%j!_!`2n!`;'S%j;'S;=`%{<%lO%j`K]P;=`<%l%Z", tokenizers: [D0, B0, V0, W0, 1, 2, 3, 4, new At("m~RRYZ[z{a~~g~aO$b~~dP!P!Qg~lO$c~~", 28, 155)], topRules: { StyleSheet: [0, 6], Styles: [1, 129] }, dynamicPrecedences: { 97: 1 }, specialized: [{ term: 150, get: (n) => I0[n] || -1 }, { term: 151, get: (n) => N0[n] || -1 }, { term: 4, get: (n) => G0[n] || -1 }, { term: 28, get: (n) => U0[n] || -1 }, { term: 149, get: (n) => F0[n] || -1 }], tokenPrec: 2444 });
      var xl = null;
      function kl() {
        if (!xl && typeof document == "object" && document.body) {
          let { style: n } = document.body, e = [], t = /* @__PURE__ */ new Set();
          for (let i in n) i != "cssText" && i != "cssFloat" && typeof n[i] == "string" && (/[A-Z]/.test(i) && (i = i.replace(/[A-Z]/g, (r) => "-" + r.toLowerCase())), t.has(i) || (e.push(i), t.add(i)));
          xl = e.sort().map((i) => ({ type: "property", label: i, apply: i + ": " }));
        }
        return xl || [];
      }
      var su = ["active", "after", "any-link", "autofill", "backdrop", "before", "checked", "cue", "default", "defined", "disabled", "empty", "enabled", "file-selector-button", "first", "first-child", "first-letter", "first-line", "first-of-type", "focus", "focus-visible", "focus-within", "fullscreen", "has", "host", "host-context", "hover", "in-range", "indeterminate", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "marker", "modal", "not", "nth-child", "nth-last-child", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "part", "placeholder", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "selection", "slotted", "target", "target-text", "valid", "visited", "where"].map((n) => ({ type: "class", label: n })), ou = ["above", "absolute", "activeborder", "additive", "activecaption", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "antialiased", "appworkspace", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column", "avoid-page", "avoid-region", "axis-pan", "background", "backwards", "baseline", "below", "bidi-override", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "clear", "clip", "close-quote", "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse", "compact", "condensed", "contain", "content", "contents", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "dense", "destination-atop", "destination-in", "destination-out", "destination-over", "difference", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic-abegede-gez", "ethiopic-halehame-aa-er", "ethiopic-halehame-gez", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fill-box", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes", "forwards", "from", "geometricPrecision", "graytext", "grid", "groove", "hand", "hard-light", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "horizontal", "hsl", "hsla", "hue", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "justify", "keep-all", "landscape", "large", "larger", "left", "level", "lighter", "lighten", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lowercase", "ltr", "luminosity", "manipulation", "match", "matrix", "matrix3d", "medium", "menu", "menutext", "message-box", "middle", "min-intrinsic", "mix", "monospace", "move", "multiple", "multiple_mask_images", "multiply", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "opacity", "open-quote", "optimizeLegibility", "optimizeSpeed", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "perspective", "pinch-zoom", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running", "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen", "scroll", "scrollbar", "scroll-position", "se-resize", "self-start", "self-end", "semi-condensed", "semi-expanded", "separate", "serif", "show", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square", "start", "static", "status-bar", "stretch", "stroke", "stroke-box", "sub", "subpixel-antialiased", "svg_masks", "super", "sw-resize", "symbolic", "symbols", "system-ui", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "text", "text-bottom", "text-top", "textarea", "textfield", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "to", "top", "transform", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "unidirectional-pan", "unset", "up", "upper-latin", "uppercase", "url", "var", "vertical", "vertical-text", "view-box", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor", "xx-large", "xx-small"].map((n) => ({ type: "keyword", label: n })).concat(["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"].map((n) => ({ type: "constant", label: n }))), H0 = ["a", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "figcaption", "figure", "footer", "form", "header", "hgroup", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "meter", "nav", "ol", "output", "p", "pre", "ruby", "section", "select", "small", "source", "span", "strong", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "tr", "u", "ul"].map((n) => ({ type: "type", label: n })), K0 = ["@charset", "@color-profile", "@container", "@counter-style", "@font-face", "@font-feature-values", "@font-palette-values", "@import", "@keyframes", "@layer", "@media", "@namespace", "@page", "@position-try", "@property", "@scope", "@starting-style", "@supports", "@view-transition"].map((n) => ({ type: "keyword", label: n })), dt = /^(\w[\w-]*|-\w[\w-]*|)$/, J0 = /^-(-[\w-]*)?$/;
      function e1(n, e) {
        var t;
        if ((n.name == "(" || n.type.isError) && (n = n.parent || n), n.name != "ArgList") return false;
        let i = (t = n.parent) === null || t === void 0 ? void 0 : t.firstChild;
        return i?.name != "Callee" ? false : e.sliceString(i.from, i.to) == "var";
      }
      var lu = new xi(), t1 = ["Declaration"];
      function i1(n) {
        for (let e = n; ; ) {
          if (e.type.isTop) return e;
          if (!(e = e.parent)) return n;
        }
      }
      function au(n, e, t) {
        if (e.to - e.from > 4096) {
          let i = lu.get(e);
          if (i) return i;
          let r = [], s = /* @__PURE__ */ new Set(), o = e.cursor(E.IncludeAnonymous);
          if (o.firstChild()) do
            for (let l of au(n, o.node, t)) s.has(l.label) || (s.add(l.label), r.push(l));
          while (o.nextSibling());
          return lu.set(e, r), r;
        } else {
          let i = [], r = /* @__PURE__ */ new Set();
          return e.cursor().iterate((s) => {
            var o;
            if (t(s) && s.matchContext(t1) && ((o = s.node.nextSibling) === null || o === void 0 ? void 0 : o.name) == ":") {
              let l = n.sliceString(s.from, s.to);
              r.has(l) || (r.add(l), i.push({ label: l, type: "variable" }));
            }
          }), i;
        }
      }
      var n1 = (n) => (e) => {
        let { state: t, pos: i } = e, r = W(t).resolveInner(i, -1), s = r.type.isError && r.from == r.to - 1 && t.doc.sliceString(r.from, r.to) == "-";
        if (r.name == "PropertyName" || (s || r.name == "TagName") && /^(Block|Styles)$/.test(r.resolve(r.to).name)) return { from: r.from, options: kl(), validFor: dt };
        if (r.name == "ValueName") return { from: r.from, options: ou, validFor: dt };
        if (r.name == "PseudoClassName") return { from: r.from, options: su, validFor: dt };
        if (n(r) || (e.explicit || s) && e1(r, t.doc)) return { from: n(r) || s ? r.from : i, options: au(t.doc, i1(r), n), validFor: J0 };
        if (r.name == "TagName") {
          for (let { parent: a } = r; a; a = a.parent) if (a.name == "Block") return { from: r.from, options: kl(), validFor: dt };
          return { from: r.from, options: H0, validFor: dt };
        }
        if (r.name == "AtKeyword") return { from: r.from, options: K0, validFor: dt };
        if (!e.explicit) return null;
        let o = r.resolve(i), l = o.childBefore(i);
        return l && l.name == ":" && o.name == "PseudoClassSelector" ? { from: i, options: su, validFor: dt } : l && l.name == ":" && o.name == "Declaration" || o.name == "ArgList" ? { from: i, options: ou, validFor: dt } : o.name == "Block" || o.name == "Styles" ? { from: i, options: kl(), validFor: dt } : null;
      }, r1 = n1((n) => n.name == "VariableName"), mn = vt.define({ name: "css", parser: ru.configure({ props: [ct.add({ Declaration: Pi() }), ft.add({ "Block KeyframeList": Pr })] }), languageData: { commentTokens: { block: { open: "/*", close: "*/" } }, indentOnInput: /^\s*\}$/, wordChars: "-" } });
      function jr() {
        return new Be(mn, mn.data.of({ autocomplete: r1 }));
      }
      var s1 = 55, o1 = 1, l1 = 56, a1 = 2, h1 = 57, c1 = 3, hu = 4, f1 = 5, Tl = 6, gu = 7, Su = 8, bu = 9, yu = 10, u1 = 11, d1 = 12, O1 = 13, wl = 58, p1 = 14, m1 = 15, cu = 59, Qu = 21, g1 = 23, xu = 24, S1 = 25, Pl = 27, ku = 28, b1 = 29, y1 = 32, Q1 = 35, x1 = 37, k1 = 38, w1 = 0, $1 = 1, P1 = { area: true, base: true, br: true, col: true, command: true, embed: true, frame: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true, menuitem: true }, v1 = { dd: true, li: true, optgroup: true, option: true, p: true, rp: true, rt: true, tbody: true, td: true, tfoot: true, th: true, tr: true }, fu = { dd: { dd: true, dt: true }, dt: { dd: true, dt: true }, li: { li: true }, option: { option: true, optgroup: true }, optgroup: { optgroup: true }, p: { address: true, article: true, aside: true, blockquote: true, dir: true, div: true, dl: true, fieldset: true, footer: true, form: true, h1: true, h2: true, h3: true, h4: true, h5: true, h6: true, header: true, hgroup: true, hr: true, menu: true, nav: true, ol: true, p: true, pre: true, section: true, table: true, ul: true }, rp: { rp: true, rt: true }, rt: { rp: true, rt: true }, tbody: { tbody: true, tfoot: true }, td: { td: true, th: true }, tfoot: { tbody: true }, th: { td: true, th: true }, thead: { tbody: true, tfoot: true }, tr: { tr: true } };
      function T1(n) {
        return n == 45 || n == 46 || n == 58 || n >= 65 && n <= 90 || n == 95 || n >= 97 && n <= 122 || n >= 161;
      }
      var uu = null, du = null, Ou = 0;
      function vl(n, e) {
        let t = n.pos + e;
        if (Ou == t && du == n) return uu;
        let i = n.peek(e), r = "";
        for (; T1(i); ) r += String.fromCharCode(i), i = n.peek(++e);
        return du = n, Ou = t, uu = r ? r.toLowerCase() : i == C1 || i == Z1 ? void 0 : null;
      }
      var wu = 60, zr = 62, Cl = 47, C1 = 63, Z1 = 33, A1 = 45;
      function pu(n, e) {
        this.name = n, this.parent = e;
      }
      var X1 = [Tl, yu, gu, Su, bu], R1 = new Ci({ start: null, shift(n, e, t, i) {
        return X1.indexOf(e) > -1 ? new pu(vl(i, 1) || "", n) : n;
      }, reduce(n, e) {
        return e == Qu && n ? n.parent : n;
      }, reuse(n, e, t, i) {
        let r = e.type.id;
        return r == Tl || r == x1 ? new pu(vl(i, 1) || "", n) : n;
      }, strict: false }), M1 = new ne((n, e) => {
        if (n.next != wu) {
          n.next < 0 && e.context && n.acceptToken(wl);
          return;
        }
        n.advance();
        let t = n.next == Cl;
        t && n.advance();
        let i = vl(n, 0);
        if (i === void 0) return;
        if (!i) return n.acceptToken(t ? m1 : p1);
        let r = e.context ? e.context.name : null;
        if (t) {
          if (i == r) return n.acceptToken(u1);
          if (r && v1[r]) return n.acceptToken(wl, -2);
          if (e.dialectEnabled(w1)) return n.acceptToken(d1);
          for (let s = e.context; s; s = s.parent) if (s.name == i) return;
          n.acceptToken(O1);
        } else {
          if (i == "script") return n.acceptToken(gu);
          if (i == "style") return n.acceptToken(Su);
          if (i == "textarea") return n.acceptToken(bu);
          if (P1.hasOwnProperty(i)) return n.acceptToken(yu);
          r && fu[r] && fu[r][i] ? n.acceptToken(wl, -1) : n.acceptToken(Tl);
        }
      }, { contextual: true }), L1 = new ne((n) => {
        for (let e = 0, t = 0; ; t++) {
          if (n.next < 0) {
            t && n.acceptToken(cu);
            break;
          }
          if (n.next == A1) e++;
          else if (n.next == zr && e >= 2) {
            t >= 3 && n.acceptToken(cu, -2);
            break;
          } else e = 0;
          n.advance();
        }
      });
      function E1(n) {
        for (; n; n = n.parent) if (n.name == "svg" || n.name == "math") return true;
        return false;
      }
      var j1 = new ne((n, e) => {
        if (n.next == Cl && n.peek(1) == zr) {
          let t = e.dialectEnabled($1) || E1(e.context);
          n.acceptToken(t ? f1 : hu, 2);
        } else n.next == zr && n.acceptToken(hu, 1);
      });
      function Zl(n, e, t) {
        let i = 2 + n.length;
        return new ne((r) => {
          for (let s = 0, o = 0, l = 0; ; l++) {
            if (r.next < 0) {
              l && r.acceptToken(e);
              break;
            }
            if (s == 0 && r.next == wu || s == 1 && r.next == Cl || s >= 2 && s < i && r.next == n.charCodeAt(s - 2)) s++, o++;
            else if (s == i && r.next == zr) {
              l > o ? r.acceptToken(e, -o) : r.acceptToken(t, -(o - 2));
              break;
            } else if ((r.next == 10 || r.next == 13) && l) {
              r.acceptToken(e, 1);
              break;
            } else s = o = 0;
            r.advance();
          }
        });
      }
      var z1 = Zl("script", s1, o1), Y1 = Zl("style", l1, a1), _1 = Zl("textarea", h1, c1), V1 = We({ "Text RawText IncompleteTag IncompleteCloseTag": p.content, "StartTag StartCloseTag SelfClosingEndTag EndTag": p.angleBracket, TagName: p.tagName, "MismatchedCloseTag/TagName": [p.tagName, p.invalid], AttributeName: p.attributeName, "AttributeValue UnquotedAttributeValue": p.attributeValue, Is: p.definitionOperator, "EntityReference CharacterReference": p.character, Comment: p.blockComment, ProcessingInst: p.processingInstruction, DoctypeDecl: p.documentMeta }), $u = Xt.deserialize({ version: 14, states: ",xOVO!rOOO!ZQ#tO'#CrO!`Q#tO'#C{O!eQ#tO'#DOO!jQ#tO'#DRO!oQ#tO'#DTO!tOaO'#CqO#PObO'#CqO#[OdO'#CqO$kO!rO'#CqOOO`'#Cq'#CqO$rO$fO'#DUO$zQ#tO'#DWO%PQ#tO'#DXOOO`'#Dl'#DlOOO`'#DZ'#DZQVO!rOOO%UQ&rO,59^O%aQ&rO,59gO%lQ&rO,59jO%wQ&rO,59mO&SQ&rO,59oOOOa'#D_'#D_O&_OaO'#CyO&jOaO,59]OOOb'#D`'#D`O&rObO'#C|O&}ObO,59]OOOd'#Da'#DaO'VOdO'#DPO'bOdO,59]OOO`'#Db'#DbO'jO!rO,59]O'qQ#tO'#DSOOO`,59],59]OOOp'#Dc'#DcO'vO$fO,59pOOO`,59p,59pO(OQ#|O,59rO(TQ#|O,59sOOO`-E7X-E7XO(YQ&rO'#CtOOQW'#D['#D[O(hQ&rO1G.xOOOa1G.x1G.xOOO`1G/Z1G/ZO(sQ&rO1G/ROOOb1G/R1G/RO)OQ&rO1G/UOOOd1G/U1G/UO)ZQ&rO1G/XOOO`1G/X1G/XO)fQ&rO1G/ZOOOa-E7]-E7]O)qQ#tO'#CzOOO`1G.w1G.wOOOb-E7^-E7^O)vQ#tO'#C}OOOd-E7_-E7_O){Q#tO'#DQOOO`-E7`-E7`O*QQ#|O,59nOOOp-E7a-E7aOOO`1G/[1G/[OOO`1G/^1G/^OOO`1G/_1G/_O*VQ,UO,59`OOQW-E7Y-E7YOOOa7+$d7+$dOOO`7+$u7+$uOOOb7+$m7+$mOOOd7+$p7+$pOOO`7+$s7+$sO*bQ#|O,59fO*gQ#|O,59iO*lQ#|O,59lOOO`1G/Y1G/YO*qO7[O'#CwO+SOMhO'#CwOOQW1G.z1G.zOOO`1G/Q1G/QOOO`1G/T1G/TOOO`1G/W1G/WOOOO'#D]'#D]O+eO7[O,59cOOQW,59c,59cOOOO'#D^'#D^O+vOMhO,59cOOOO-E7Z-E7ZOOQW1G.}1G.}OOOO-E7[-E7[", stateData: ",c~O!_OS~OUSOVPOWQOXROYTO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O|_O!eZO~OgaO~OgbO~OgcO~OgdO~OgeO~O!XfOPmP![mP~O!YiOQpP![pP~O!ZlORsP![sP~OUSOVPOWQOXROYTOZqO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O!eZO~O![rO~P#gO!]sO!fuO~OgvO~OgwO~OS|OT}OiyO~OS!POT}OiyO~OS!ROT}OiyO~OS!TOT}OiyO~OS}OT}OiyO~O!XfOPmX![mX~OP!WO![!XO~O!YiOQpX![pX~OQ!ZO![!XO~O!ZlORsX![sX~OR!]O![!XO~O![!XO~P#gOg!_O~O!]sO!f!aO~OS!bO~OS!cO~Oj!dOShXThXihX~OS!fOT!gOiyO~OS!hOT!gOiyO~OS!iOT!gOiyO~OS!jOT!gOiyO~OS!gOT!gOiyO~Og!kO~Og!lO~Og!mO~OS!nO~Ol!qO!a!oO!c!pO~OS!rO~OS!sO~OS!tO~Ob!uOc!uOd!uO!a!wO!b!uO~Ob!xOc!xOd!xO!c!wO!d!xO~Ob!uOc!uOd!uO!a!{O!b!uO~Ob!xOc!xOd!xO!c!{O!d!xO~OT~cbd!ey|!e~", goto: "%q!aPPPPPPPPPPPPPPPPPPPPP!b!hP!nPP!zP!}#Q#T#Z#^#a#g#j#m#s#y!bP!b!bP$P$V$m$s$y%P%V%]%cPPPPPPPP%iX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp", nodeNames: "\u26A0 StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl", maxTerm: 68, context: R1, nodeProps: [["closedBy", -10, 1, 2, 3, 7, 8, 9, 10, 11, 12, 13, "EndTag", 6, "EndTag SelfClosingEndTag", -4, 22, 31, 34, 37, "CloseTag"], ["openedBy", 4, "StartTag StartCloseTag", 5, "StartTag", -4, 30, 33, 36, 38, "OpenTag"], ["group", -10, 14, 15, 18, 19, 20, 21, 40, 41, 42, 43, "Entity", 17, "Entity TextContent", -3, 29, 32, 35, "TextContent Entity"], ["isolate", -11, 22, 30, 31, 33, 34, 36, 37, 38, 39, 42, 43, "ltr", -3, 27, 28, 40, ""]], propSources: [V1], skippedNodes: [0], repeatNodeCount: 9, tokenData: "!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|caPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bXaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UVaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pTaPOv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!dpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({WaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!b`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!b`!dpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYlWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]`aP!b`!dp!_^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebiSlWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXiSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vciSaP!b`!dpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!ahaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WiiSlWd!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zblWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOb!R!R7tP;=`<%l7S!Z8OYlWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{iiSlWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbiSlWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QciSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXiSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TalWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOc!R!RAwP;=`<%lAY!ZBRYlWc!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbiSlWc!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbiSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXiSc!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!cxaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYliSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_kiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_XaP!b`!dp!fQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZiSgQaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!b`!dpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!b`!dp!ePOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!b`!dpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!b`!dpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!b`!dpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!b`!dpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!b`!dpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!b`!dpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!b`!dpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!dpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO|PP!-nP;=`<%l!-Sq!-xS!dp|POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!b`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!b`|POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!b`!dp|POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!b`!dpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!b`!dpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!b`!dpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!b`!dpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!b`!dpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!b`!dpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!dpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOyPP!7TP;=`<%l!6Vq!7]V!dpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!dpyPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!b`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!b`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!b`yPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!b`!dpyPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXjSaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X", tokenizers: [z1, Y1, _1, j1, M1, L1, 0, 1, 2, 3, 4, 5], topRules: { Document: [0, 16] }, dialects: { noMatch: 0, selfClosing: 515 }, tokenPrec: 517 });
      function Pu(n, e) {
        let t = /* @__PURE__ */ Object.create(null);
        for (let i of n.getChildren(xu)) {
          let r = i.getChild(S1), s = i.getChild(Pl) || i.getChild(ku);
          r && (t[e.read(r.from, r.to)] = s ? s.type.id == Pl ? e.read(s.from + 1, s.to - 1) : e.read(s.from, s.to) : "");
        }
        return t;
      }
      function mu(n, e) {
        let t = n.getChild(g1);
        return t ? e.read(t.from, t.to) : " ";
      }
      function $l(n, e, t) {
        let i;
        for (let r of t) if (!r.attrs || r.attrs(i || (i = Pu(n.node.parent.firstChild, e)))) return { parser: r.parser, bracketed: true };
        return null;
      }
      function Al(n = [], e = []) {
        let t = [], i = [], r = [], s = [];
        for (let l of n) (l.tag == "script" ? t : l.tag == "style" ? i : l.tag == "textarea" ? r : s).push(l);
        let o = e.length ? /* @__PURE__ */ Object.create(null) : null;
        for (let l of e) (o[l.name] || (o[l.name] = [])).push(l);
        return br((l, a) => {
          let h7 = l.type.id;
          if (h7 == b1) return $l(l, a, t);
          if (h7 == y1) return $l(l, a, i);
          if (h7 == Q1) return $l(l, a, r);
          if (h7 == Qu && s.length) {
            let c = l.node, f = c.firstChild, u = f && mu(f, a), d;
            if (u) {
              for (let O of s) if (O.tag == u && (!O.attrs || O.attrs(d || (d = Pu(f, a))))) {
                let m = c.lastChild, g = m.type.id == k1 ? m.from : c.to;
                if (g > f.to) return { parser: O.parser, overlay: [{ from: f.to, to: g }] };
              }
            }
          }
          if (o && h7 == xu) {
            let c = l.node, f;
            if (f = c.firstChild) {
              let u = o[a.read(f.from, f.to)];
              if (u) for (let d of u) {
                if (d.tagName && d.tagName != mu(c.parent, a)) continue;
                let O = c.lastChild;
                if (O.type.id == Pl) {
                  let m = O.from + 1, g = O.lastChild, S = O.to - (g && g.isError ? 0 : 1);
                  if (S > m) return { parser: d.parser, overlay: [{ from: m, to: S }], bracketed: true };
                } else if (O.type.id == ku) return { parser: d.parser, overlay: [{ from: O.from, to: O.to }] };
              }
            }
          }
          return null;
        });
      }
      var gn = ["_blank", "_self", "_top", "_parent"], Xl = ["ascii", "utf-8", "utf-16", "latin1", "latin1"], Rl = ["get", "post", "put", "delete"], Ml = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"], $e = ["true", "false"], v = {}, W1 = { a: { attrs: { href: null, ping: null, type: null, media: null, target: gn, hreflang: null } }, abbr: v, address: v, area: { attrs: { alt: null, coords: null, href: null, target: null, ping: null, media: null, hreflang: null, type: null, shape: ["default", "rect", "circle", "poly"] } }, article: v, aside: v, audio: { attrs: { src: null, mediagroup: null, crossorigin: ["anonymous", "use-credentials"], preload: ["none", "metadata", "auto"], autoplay: ["autoplay"], loop: ["loop"], controls: ["controls"] } }, b: v, base: { attrs: { href: null, target: gn } }, bdi: v, bdo: v, blockquote: { attrs: { cite: null } }, body: v, br: v, button: { attrs: { form: null, formaction: null, name: null, value: null, autofocus: ["autofocus"], disabled: ["autofocus"], formenctype: Ml, formmethod: Rl, formnovalidate: ["novalidate"], formtarget: gn, type: ["submit", "reset", "button"] } }, canvas: { attrs: { width: null, height: null } }, caption: v, center: v, cite: v, code: v, col: { attrs: { span: null } }, colgroup: { attrs: { span: null } }, command: { attrs: { type: ["command", "checkbox", "radio"], label: null, icon: null, radiogroup: null, command: null, title: null, disabled: ["disabled"], checked: ["checked"] } }, data: { attrs: { value: null } }, datagrid: { attrs: { disabled: ["disabled"], multiple: ["multiple"] } }, datalist: { attrs: { data: null } }, dd: v, del: { attrs: { cite: null, datetime: null } }, details: { attrs: { open: ["open"] } }, dfn: v, div: v, dl: v, dt: v, em: v, embed: { attrs: { src: null, type: null, width: null, height: null } }, eventsource: { attrs: { src: null } }, fieldset: { attrs: { disabled: ["disabled"], form: null, name: null } }, figcaption: v, figure: v, footer: v, form: { attrs: { action: null, name: null, "accept-charset": Xl, autocomplete: ["on", "off"], enctype: Ml, method: Rl, novalidate: ["novalidate"], target: gn } }, h1: v, h2: v, h3: v, h4: v, h5: v, h6: v, head: { children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"] }, header: v, hgroup: v, hr: v, html: { attrs: { manifest: null } }, i: v, iframe: { attrs: { src: null, srcdoc: null, name: null, width: null, height: null, sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"], seamless: ["seamless"] } }, img: { attrs: { alt: null, src: null, ismap: null, usemap: null, width: null, height: null, crossorigin: ["anonymous", "use-credentials"] } }, input: { attrs: { alt: null, dirname: null, form: null, formaction: null, height: null, list: null, max: null, maxlength: null, min: null, name: null, pattern: null, placeholder: null, size: null, src: null, step: null, value: null, width: null, accept: ["audio/*", "video/*", "image/*"], autocomplete: ["on", "off"], autofocus: ["autofocus"], checked: ["checked"], disabled: ["disabled"], formenctype: Ml, formmethod: Rl, formnovalidate: ["novalidate"], formtarget: gn, multiple: ["multiple"], readonly: ["readonly"], required: ["required"], type: ["hidden", "text", "search", "tel", "url", "email", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio", "file", "submit", "image", "reset", "button"] } }, ins: { attrs: { cite: null, datetime: null } }, kbd: v, keygen: { attrs: { challenge: null, form: null, name: null, autofocus: ["autofocus"], disabled: ["disabled"], keytype: ["RSA"] } }, label: { attrs: { for: null, form: null } }, legend: v, li: { attrs: { value: null } }, link: { attrs: { href: null, type: null, hreflang: null, media: null, sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"] } }, map: { attrs: { name: null } }, mark: v, menu: { attrs: { label: null, type: ["list", "context", "toolbar"] } }, meta: { attrs: { content: null, charset: Xl, name: ["viewport", "application-name", "author", "description", "generator", "keywords"], "http-equiv": ["content-language", "content-type", "default-style", "refresh"] } }, meter: { attrs: { value: null, min: null, low: null, high: null, max: null, optimum: null } }, nav: v, noscript: v, object: { attrs: { data: null, type: null, name: null, usemap: null, form: null, width: null, height: null, typemustmatch: ["typemustmatch"] } }, ol: { attrs: { reversed: ["reversed"], start: null, type: ["1", "a", "A", "i", "I"] }, children: ["li", "script", "template", "ul", "ol"] }, optgroup: { attrs: { disabled: ["disabled"], label: null } }, option: { attrs: { disabled: ["disabled"], label: null, selected: ["selected"], value: null } }, output: { attrs: { for: null, form: null, name: null } }, p: v, param: { attrs: { name: null, value: null } }, pre: v, progress: { attrs: { value: null, max: null } }, q: { attrs: { cite: null } }, rp: v, rt: v, ruby: v, samp: v, script: { attrs: { type: ["text/javascript"], src: null, async: ["async"], defer: ["defer"], charset: Xl } }, section: v, select: { attrs: { form: null, name: null, size: null, autofocus: ["autofocus"], disabled: ["disabled"], multiple: ["multiple"] } }, slot: { attrs: { name: null } }, small: v, source: { attrs: { src: null, type: null, media: null } }, span: v, strong: v, style: { attrs: { type: ["text/css"], media: null, scoped: null } }, sub: v, summary: v, sup: v, table: v, tbody: v, td: { attrs: { colspan: null, rowspan: null, headers: null } }, template: v, textarea: { attrs: { dirname: null, form: null, maxlength: null, name: null, placeholder: null, rows: null, cols: null, autofocus: ["autofocus"], disabled: ["disabled"], readonly: ["readonly"], required: ["required"], wrap: ["soft", "hard"] } }, tfoot: v, th: { attrs: { colspan: null, rowspan: null, headers: null, scope: ["row", "col", "rowgroup", "colgroup"] } }, thead: v, time: { attrs: { datetime: null } }, title: v, tr: v, track: { attrs: { src: null, label: null, default: null, kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"], srclang: null } }, ul: { children: ["li", "script", "template", "ul", "ol"] }, var: v, video: { attrs: { src: null, poster: null, width: null, height: null, crossorigin: ["anonymous", "use-credentials"], preload: ["auto", "metadata", "none"], autoplay: ["autoplay"], mediagroup: ["movie"], muted: ["muted"], controls: ["controls"] } }, wbr: v }, Zu = { accesskey: null, class: null, contenteditable: $e, contextmenu: null, dir: ["ltr", "rtl", "auto"], draggable: ["true", "false", "auto"], dropzone: ["copy", "move", "link", "string:", "file:"], hidden: ["hidden"], id: null, inert: ["inert"], itemid: null, itemprop: null, itemref: null, itemscope: ["itemscope"], itemtype: null, lang: ["ar", "bn", "de", "en-GB", "en-US", "es", "fr", "hi", "id", "ja", "pa", "pt", "ru", "tr", "zh"], spellcheck: $e, autocorrect: $e, autocapitalize: $e, style: null, tabindex: null, title: null, translate: ["yes", "no"], rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"], role: "alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "), "aria-activedescendant": null, "aria-atomic": $e, "aria-autocomplete": ["inline", "list", "both", "none"], "aria-busy": $e, "aria-checked": ["true", "false", "mixed", "undefined"], "aria-controls": null, "aria-describedby": null, "aria-disabled": $e, "aria-dropeffect": null, "aria-expanded": ["true", "false", "undefined"], "aria-flowto": null, "aria-grabbed": ["true", "false", "undefined"], "aria-haspopup": $e, "aria-hidden": $e, "aria-invalid": ["true", "false", "grammar", "spelling"], "aria-label": null, "aria-labelledby": null, "aria-level": null, "aria-live": ["off", "polite", "assertive"], "aria-multiline": $e, "aria-multiselectable": $e, "aria-owns": null, "aria-posinset": null, "aria-pressed": ["true", "false", "mixed", "undefined"], "aria-readonly": $e, "aria-relevant": null, "aria-required": $e, "aria-selected": ["true", "false", "undefined"], "aria-setsize": null, "aria-sort": ["ascending", "descending", "none", "other"], "aria-valuemax": null, "aria-valuemin": null, "aria-valuenow": null, "aria-valuetext": null }, Au = "beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload".split(" ").map((n) => "on" + n);
      for (let n of Au) Zu[n] = null;
      var ei = class {
        constructor(e, t) {
          this.tags = { ...W1, ...e }, this.globalAttrs = { ...Zu, ...t }, this.allTags = Object.keys(this.tags), this.globalAttrNames = Object.keys(this.globalAttrs);
        }
      };
      ei.default = new ei();
      function ti(n, e, t = n.length) {
        if (!e) return "";
        let i = e.firstChild, r = i && i.getChild("TagName");
        return r ? n.sliceString(r.from, Math.min(r.to, t)) : "";
      }
      function Ai(n, e = false) {
        for (; n; n = n.parent) if (n.name == "Element") if (e) e = false;
        else return n;
        return null;
      }
      function Xu(n, e, t) {
        let i = t.tags[ti(n, Ai(e))];
        return i?.children || t.allTags;
      }
      function Ll(n, e) {
        let t = [];
        for (let i = Ai(e); i && !i.type.isTop; i = Ai(i.parent)) {
          let r = ti(n, i);
          if (r && i.lastChild.name == "CloseTag") break;
          r && t.indexOf(r) < 0 && (e.name == "EndTag" || e.from >= i.firstChild.to) && t.push(r);
        }
        return t;
      }
      var Ru = /^[:\-\.\w\u00b7-\uffff]*$/;
      function vu(n, e, t, i, r) {
        let s = /\s*>/.test(n.sliceDoc(r, r + 5)) ? "" : ">", o = Ai(t, t.name == "StartTag" || t.name == "TagName");
        return { from: i, to: r, options: Xu(n.doc, o, e).map((l) => ({ label: l, type: "type" })).concat(Ll(n.doc, t).map((l, a) => ({ label: "/" + l, apply: "/" + l + s, type: "type", boost: 99 - a }))), validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/ };
      }
      function Tu(n, e, t, i) {
        let r = /\s*>/.test(n.sliceDoc(i, i + 5)) ? "" : ">";
        return { from: t, to: i, options: Ll(n.doc, e).map((s, o) => ({ label: s, apply: s + r, type: "type", boost: 99 - o })), validFor: Ru };
      }
      function D1(n, e, t, i) {
        let r = [], s = 0;
        for (let o of Xu(n.doc, t, e)) r.push({ label: "<" + o, type: "type" });
        for (let o of Ll(n.doc, t)) r.push({ label: "</" + o + ">", type: "type", boost: 99 - s++ });
        return { from: i, to: i, options: r, validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/ };
      }
      function B1(n, e, t, i, r) {
        let s = Ai(t), o = s ? e.tags[ti(n.doc, s)] : null, l = o && o.attrs ? Object.keys(o.attrs) : [], a = o && o.globalAttrs === false ? l : l.length ? l.concat(e.globalAttrNames) : e.globalAttrNames;
        return { from: i, to: r, options: a.map((h7) => ({ label: h7, type: "property" })), validFor: Ru };
      }
      function q1(n, e, t, i, r) {
        var s;
        let o = (s = t.parent) === null || s === void 0 ? void 0 : s.getChild("AttributeName"), l = [], a;
        if (o) {
          let h7 = n.sliceDoc(o.from, o.to), c = e.globalAttrs[h7];
          if (!c) {
            let f = Ai(t), u = f ? e.tags[ti(n.doc, f)] : null;
            c = u?.attrs && u.attrs[h7];
          }
          if (c) {
            let f = n.sliceDoc(i, r).toLowerCase(), u = '"', d = '"';
            /^['"]/.test(f) ? (a = f[0] == '"' ? /^[^"]*$/ : /^[^']*$/, u = "", d = n.sliceDoc(r, r + 1) == f[0] ? "" : f[0], f = f.slice(1), i++) : a = /^[^\s<>='"]*$/;
            for (let O of c) l.push({ label: O, apply: u + O + d, type: "constant" });
          }
        }
        return { from: i, to: r, options: l, validFor: a };
      }
      function Mu(n, e) {
        let { state: t, pos: i } = e, r = W(t).resolveInner(i, -1), s = r.resolve(i);
        for (let o = i, l; s == r && (l = r.childBefore(o)); ) {
          let a = l.lastChild;
          if (!a || !a.type.isError || a.from < a.to) break;
          s = r = l, o = a.from;
        }
        return r.name == "TagName" ? r.parent && /CloseTag$/.test(r.parent.name) ? Tu(t, r, r.from, i) : vu(t, n, r, r.from, i) : r.name == "StartTag" || r.name == "IncompleteTag" ? vu(t, n, r, i, i) : r.name == "StartCloseTag" || r.name == "IncompleteCloseTag" ? Tu(t, r, i, i) : r.name == "OpenTag" || r.name == "SelfClosingTag" || r.name == "AttributeName" ? B1(t, n, r, r.name == "AttributeName" ? r.from : i, i) : r.name == "Is" || r.name == "AttributeValue" || r.name == "UnquotedAttributeValue" ? q1(t, n, r, r.name == "Is" ? i : r.from, i) : e.explicit && (s.name == "Element" || s.name == "Text" || s.name == "Document") ? D1(t, n, r, i) : null;
      }
      function Lu(n) {
        return Mu(ei.default, n);
      }
      function I1(n) {
        let { extraTags: e, extraGlobalAttributes: t } = n, i = t || e ? new ei(e, t) : ei.default;
        return (r) => Mu(i, r);
      }
      var N1 = Ge.parser.configure({ top: "SingleExpression" }), Eu = [{ tag: "script", attrs: (n) => n.type == "text/typescript" || n.lang == "ts", parser: Sl.parser }, { tag: "script", attrs: (n) => n.type == "text/babel" || n.type == "text/jsx", parser: bl.parser }, { tag: "script", attrs: (n) => n.type == "text/typescript-jsx", parser: yl.parser }, { tag: "script", attrs(n) {
        return /^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(n.type);
      }, parser: N1 }, { tag: "script", attrs(n) {
        return !n.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(n.type);
      }, parser: Ge.parser }, { tag: "style", attrs(n) {
        return (!n.lang || n.lang == "css") && (!n.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(n.type));
      }, parser: mn.parser }], ju = [{ name: "style", parser: mn.parser.configure({ top: "Styles" }) }].concat(Au.map((n) => ({ name: n, parser: Ge.parser }))), zu = vt.define({ name: "html", parser: $u.configure({ props: [ct.add({ Element(n) {
        let e = /^(\s*)(<\/)?/.exec(n.textAfter);
        return n.node.to <= n.pos + e[0].length ? n.continue() : n.lineIndent(n.node.from) + (e[2] ? 0 : n.unit);
      }, "OpenTag CloseTag SelfClosingTag"(n) {
        return n.column(n.node.from) + n.unit;
      }, Document(n) {
        if (n.pos + /\s*/.exec(n.textAfter)[0].length < n.node.to) return n.continue();
        let e = null, t;
        for (let i = n.node; ; ) {
          let r = i.lastChild;
          if (!r || r.name != "Element" || r.to != i.to) break;
          e = i = r;
        }
        return e && !((t = e.lastChild) && (t.name == "CloseTag" || t.name == "SelfClosingTag")) ? n.lineIndent(e.from) + n.unit : null;
      } }), ft.add({ Element(n) {
        let e = n.firstChild, t = n.lastChild;
        return !e || e.name != "OpenTag" ? null : { from: e.to, to: t.name == "CloseTag" ? t.from : n.to };
      } }), Io.add({ "OpenTag CloseTag": (n) => n.getChild("TagName") })] }), languageData: { commentTokens: { block: { open: "<!--", close: "-->" } }, indentOnInput: /^\s*<\/\w+\W$/, wordChars: "-_" } }), Yr = zu.configure({ wrap: Al(Eu, ju) });
      function _r(n = {}) {
        let e = "", t;
        n.matchClosingTags === false && (e = "noMatch"), n.selfClosingTags === true && (e = (e ? e + " " : "") + "selfClosing"), (n.nestedLanguages && n.nestedLanguages.length || n.nestedAttributes && n.nestedAttributes.length) && (t = Al((n.nestedLanguages || []).concat(Eu), (n.nestedAttributes || []).concat(ju)));
        let i = t ? zu.configure({ wrap: t, dialect: e }) : e ? Yr.configure({ dialect: e }) : Yr;
        return new Be(i, [Yr.data.of({ autocomplete: I1(n) }), n.autoCloseTags !== false ? U1 : [], Lr().support, jr().support]);
      }
      var Cu = new Set("area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "));
      function G1(n, e, t) {
        for (var i; ; ) {
          if (((i = e.lastChild) === null || i === void 0 ? void 0 : i.name) != "CloseTag") return false;
          let r = e.parent;
          if (!r || ti(n, r) != t) return true;
          e = r;
        }
      }
      var U1 = C.inputHandler.of((n, e, t, i, r) => {
        if (n.composing || n.state.readOnly || e != t || i != ">" && i != "/" || !Yr.isActiveAt(n.state, e, -1)) return false;
        let s = r(), { state: o } = s, l = o.changeByRange((a) => {
          var h7;
          let c = o.doc.sliceString(a.from - 1, a.to) == i, { head: f } = a, u = W(o).resolveInner(f, -1), d;
          if (c && i == ">" && u.name == "EndTag") {
            let O = u.parent;
            if ((d = ti(o.doc, O.parent, f)) && !Cu.has(d) && !G1(o.doc, O.parent, d)) {
              let m = f + (o.doc.sliceString(f, f + 1) === ">" ? 1 : 0), g = `</${d}>`;
              return { range: a, changes: { from: f, to: m, insert: g } };
            }
          } else if (c && i == "/" && u.name == "IncompleteCloseTag") {
            let O = u.parent;
            if (u.from == f - 2 && ((h7 = O.lastChild) === null || h7 === void 0 ? void 0 : h7.name) != "CloseTag" && (d = ti(o.doc, O, f)) && !Cu.has(d)) {
              let m = f + (o.doc.sliceString(f, f + 1) === ">" ? 1 : 0), g = `${d}>`;
              return { range: b.cursor(f + g.length, -1), changes: { from: f, to: m, insert: g } };
            }
          }
          return { range: a };
        });
        return l.changes.empty ? false : (n.dispatch([s, o.update(l, { userEvent: "input.complete", scrollIntoView: true })]), true);
      });
      var Dr = class n {
        static create(e, t, i, r, s) {
          let o = r + (r << 8) + e + (t << 4) | 0;
          return new n(e, t, i, o, s, [], []);
        }
        constructor(e, t, i, r, s, o, l) {
          this.type = e, this.value = t, this.from = i, this.hash = r, this.end = s, this.children = o, this.positions = l, this.hashProp = [[A.contextHash, r]];
        }
        addChild(e, t) {
          e.prop(A.contextHash) != this.hash && (e = new z(e.type, e.children, e.positions, e.length, this.hashProp)), this.children.push(e), this.positions.push(t);
        }
        toTree(e, t = this.end) {
          let i = this.children.length - 1;
          return i >= 0 && (t = Math.max(t, this.positions[i] + this.children[i].length + this.from)), new z(e.types[this.type], this.children, this.positions, t - this.from).balance({ makeTree: (r, s, o) => new z(J.none, r, s, o, this.hashProp) });
        }
      }, Q;
      (function(n) {
        n[n.Document = 1] = "Document", n[n.CodeBlock = 2] = "CodeBlock", n[n.FencedCode = 3] = "FencedCode", n[n.Blockquote = 4] = "Blockquote", n[n.HorizontalRule = 5] = "HorizontalRule", n[n.BulletList = 6] = "BulletList", n[n.OrderedList = 7] = "OrderedList", n[n.ListItem = 8] = "ListItem", n[n.ATXHeading1 = 9] = "ATXHeading1", n[n.ATXHeading2 = 10] = "ATXHeading2", n[n.ATXHeading3 = 11] = "ATXHeading3", n[n.ATXHeading4 = 12] = "ATXHeading4", n[n.ATXHeading5 = 13] = "ATXHeading5", n[n.ATXHeading6 = 14] = "ATXHeading6", n[n.SetextHeading1 = 15] = "SetextHeading1", n[n.SetextHeading2 = 16] = "SetextHeading2", n[n.HTMLBlock = 17] = "HTMLBlock", n[n.LinkReference = 18] = "LinkReference", n[n.Paragraph = 19] = "Paragraph", n[n.CommentBlock = 20] = "CommentBlock", n[n.ProcessingInstructionBlock = 21] = "ProcessingInstructionBlock", n[n.Escape = 22] = "Escape", n[n.Entity = 23] = "Entity", n[n.HardBreak = 24] = "HardBreak", n[n.Emphasis = 25] = "Emphasis", n[n.StrongEmphasis = 26] = "StrongEmphasis", n[n.Link = 27] = "Link", n[n.Image = 28] = "Image", n[n.InlineCode = 29] = "InlineCode", n[n.HTMLTag = 30] = "HTMLTag", n[n.Comment = 31] = "Comment", n[n.ProcessingInstruction = 32] = "ProcessingInstruction", n[n.Autolink = 33] = "Autolink", n[n.HeaderMark = 34] = "HeaderMark", n[n.QuoteMark = 35] = "QuoteMark", n[n.ListMark = 36] = "ListMark", n[n.LinkMark = 37] = "LinkMark", n[n.EmphasisMark = 38] = "EmphasisMark", n[n.CodeMark = 39] = "CodeMark", n[n.CodeText = 40] = "CodeText", n[n.CodeInfo = 41] = "CodeInfo", n[n.LinkTitle = 42] = "LinkTitle", n[n.LinkLabel = 43] = "LinkLabel", n[n.URL = 44] = "URL";
      })(Q || (Q = {}));
      var zl = class {
        constructor(e, t) {
          this.start = e, this.content = t, this.marks = [], this.parsers = [];
        }
      }, Yl = class {
        constructor() {
          this.text = "", this.baseIndent = 0, this.basePos = 0, this.depth = 0, this.markers = [], this.pos = 0, this.indent = 0, this.next = -1;
        }
        forward() {
          this.basePos > this.pos && this.forwardInner();
        }
        forwardInner() {
          let e = this.skipSpace(this.basePos);
          this.indent = this.countIndent(e, this.pos, this.indent), this.pos = e, this.next = e == this.text.length ? -1 : this.text.charCodeAt(e);
        }
        skipSpace(e) {
          return bn(this.text, e);
        }
        reset(e) {
          for (this.text = e, this.baseIndent = this.basePos = this.pos = this.indent = 0, this.forwardInner(), this.depth = 1; this.markers.length; ) this.markers.pop();
        }
        moveBase(e) {
          this.basePos = e, this.baseIndent = this.countIndent(e, this.pos, this.indent);
        }
        moveBaseColumn(e) {
          this.baseIndent = e, this.basePos = this.findColumn(e);
        }
        addMarker(e) {
          this.markers.push(e);
        }
        countIndent(e, t = 0, i = 0) {
          for (let r = t; r < e; r++) i += this.text.charCodeAt(r) == 9 ? 4 - i % 4 : 1;
          return i;
        }
        findColumn(e) {
          let t = 0;
          for (let i = 0; t < this.text.length && i < e; t++) i += this.text.charCodeAt(t) == 9 ? 4 - i % 4 : 1;
          return t;
        }
        scrub() {
          if (!this.baseIndent) return this.text;
          let e = "";
          for (let t = 0; t < this.basePos; t++) e += " ";
          return e + this.text.slice(this.basePos);
        }
      };
      function Yu(n, e, t) {
        if (t.pos == t.text.length || n != e.block && t.indent >= e.stack[t.depth + 1].value + t.baseIndent) return true;
        if (t.indent >= t.baseIndent + 4) return false;
        let i = (n.type == Q.OrderedList ? Hl : Fl)(t, e, false);
        return i > 0 && (n.type != Q.BulletList || Ul(t, e, false) < 0) && t.text.charCodeAt(t.pos + i - 1) == n.value;
      }
      var Fu = { [Q.Blockquote](n, e, t) {
        return t.next != 62 ? false : (t.markers.push(j(Q.QuoteMark, e.lineStart + t.pos, e.lineStart + t.pos + 1)), t.moveBase(t.pos + (Ee(t.text.charCodeAt(t.pos + 1)) ? 2 : 1)), n.end = e.lineStart + t.text.length, true);
      }, [Q.ListItem](n, e, t) {
        return t.indent < t.baseIndent + n.value && t.next > -1 ? false : (t.moveBaseColumn(t.baseIndent + n.value), true);
      }, [Q.OrderedList]: Yu, [Q.BulletList]: Yu, [Q.Document]() {
        return true;
      } };
      function Ee(n) {
        return n == 32 || n == 9 || n == 10 || n == 13;
      }
      function bn(n, e = 0) {
        for (; e < n.length && Ee(n.charCodeAt(e)); ) e++;
        return e;
      }
      function _u(n, e, t) {
        for (; e > t && Ee(n.charCodeAt(e - 1)); ) e--;
        return e;
      }
      function Hu(n) {
        if (n.next != 96 && n.next != 126) return -1;
        let e = n.pos + 1;
        for (; e < n.text.length && n.text.charCodeAt(e) == n.next; ) e++;
        if (e < n.pos + 3) return -1;
        if (n.next == 96) {
          for (let t = e; t < n.text.length; t++) if (n.text.charCodeAt(t) == 96) return -1;
        }
        return e;
      }
      function Ku(n) {
        return n.next != 62 ? -1 : n.text.charCodeAt(n.pos + 1) == 32 ? 2 : 1;
      }
      function Ul(n, e, t) {
        if (n.next != 42 && n.next != 45 && n.next != 95) return -1;
        let i = 1;
        for (let r = n.pos + 1; r < n.text.length; r++) {
          let s = n.text.charCodeAt(r);
          if (s == n.next) i++;
          else if (!Ee(s)) return -1;
        }
        return t && n.next == 45 && td(n) > -1 && n.depth == e.stack.length && e.parser.leafBlockParsers.indexOf(sd.SetextHeading) > -1 || i < 3 ? -1 : 1;
      }
      function Ju(n, e) {
        for (let t = n.stack.length - 1; t >= 0; t--) if (n.stack[t].type == e) return true;
        return false;
      }
      function Fl(n, e, t) {
        return (n.next == 45 || n.next == 43 || n.next == 42) && (n.pos == n.text.length - 1 || Ee(n.text.charCodeAt(n.pos + 1))) && (!t || Ju(e, Q.BulletList) || n.skipSpace(n.pos + 2) < n.text.length) ? 1 : -1;
      }
      function Hl(n, e, t) {
        let i = n.pos, r = n.next;
        for (; r >= 48 && r <= 57; ) {
          i++;
          if (i == n.text.length) return -1;
          r = n.text.charCodeAt(i);
        }
        return i == n.pos || i > n.pos + 9 || r != 46 && r != 41 || i < n.text.length - 1 && !Ee(n.text.charCodeAt(i + 1)) || t && !Ju(e, Q.OrderedList) && (n.skipSpace(i + 1) == n.text.length || i > n.pos + 1 || n.next != 49) ? -1 : i + 1 - n.pos;
      }
      function ed(n) {
        if (n.next != 35) return -1;
        let e = n.pos + 1;
        for (; e < n.text.length && n.text.charCodeAt(e) == 35; ) e++;
        if (e < n.text.length && n.text.charCodeAt(e) != 32) return -1;
        let t = e - n.pos;
        return t > 6 ? -1 : t;
      }
      function td(n) {
        if (n.next != 45 && n.next != 61 || n.indent >= n.baseIndent + 4) return -1;
        let e = n.pos + 1;
        for (; e < n.text.length && n.text.charCodeAt(e) == n.next; ) e++;
        let t = e;
        for (; e < n.text.length && Ee(n.text.charCodeAt(e)); ) e++;
        return e == n.text.length ? t : -1;
      }
      var _l = /^[ \t]*$/, id = /-->/, nd = /\?>/, Vl = [[/^<(?:script|pre|style)(?:\s|>|$)/i, /<\/(?:script|pre|style)>/i], [/^\s*<!--/, id], [/^\s*<\?/, nd], [/^\s*<![A-Z]/, />/], [/^\s*<!\[CDATA\[/, /\]\]>/], [/^\s*<\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>|$)/i, _l], [/^\s*(?:<\/[a-z][\w-]*\s*>|<[a-z][\w-]*(\s+[a-z:_][\w-.]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*>)\s*$/i, _l]];
      function rd(n, e, t) {
        if (n.next != 60) return -1;
        let i = n.text.slice(n.pos);
        for (let r = 0, s = Vl.length - (t ? 1 : 0); r < s; r++) if (Vl[r][0].test(i)) return r;
        return -1;
      }
      function Vu(n, e) {
        let t = n.countIndent(e, n.pos, n.indent), i = n.skipSpace(e), r = n.countIndent(i, e, t);
        return r >= t + 5 || i == n.text.length ? t + 1 : r;
      }
      function Rt(n, e, t) {
        let i = n.length - 1;
        i >= 0 && n[i].to == e && n[i].type == Q.CodeText ? n[i].to = t : n.push(j(Q.CodeText, e, t));
      }
      var Vr = { LinkReference: void 0, IndentedCode(n, e) {
        let t = e.baseIndent + 4;
        if (e.indent < t) return false;
        let i = e.findColumn(t), r = n.lineStart + i, s = n.lineStart + e.text.length, o = [], l = [];
        for (Rt(o, r, s); n.nextLine() && e.depth >= n.stack.length; ) if (e.pos == e.text.length) {
          Rt(l, n.lineStart - 1, n.lineStart);
          for (let a of e.markers) l.push(a);
        } else {
          if (e.indent < t) break;
          {
            if (l.length) {
              for (let h7 of l) h7.type == Q.CodeText ? Rt(o, h7.from, h7.to) : o.push(h7);
              l = [];
            }
            Rt(o, n.lineStart - 1, n.lineStart);
            for (let h7 of e.markers) o.push(h7);
            s = n.lineStart + e.text.length;
            let a = n.lineStart + e.findColumn(e.baseIndent + 4);
            a < s && Rt(o, a, s);
          }
        }
        return l.length && (l = l.filter((a) => a.type != Q.CodeText), l.length && (e.markers = l.concat(e.markers))), n.addNode(n.buffer.writeElements(o, -r).finish(Q.CodeBlock, s - r), r), true;
      }, FencedCode(n, e) {
        let t = Hu(e);
        if (t < 0) return false;
        let i = n.lineStart + e.pos, r = e.next, s = t - e.pos, o = e.skipSpace(t), l = _u(e.text, e.text.length, o), a = [j(Q.CodeMark, i, i + s)];
        o < l && a.push(j(Q.CodeInfo, n.lineStart + o, n.lineStart + l));
        for (let h7 = true, c = true, f = false; n.nextLine() && e.depth >= n.stack.length; h7 = false) {
          let u = e.pos;
          if (e.indent - e.baseIndent < 4) for (; u < e.text.length && e.text.charCodeAt(u) == r; ) u++;
          if (u - e.pos >= s && e.skipSpace(u) == e.text.length) {
            for (let d of e.markers) a.push(d);
            c && f && Rt(a, n.lineStart - 1, n.lineStart), a.push(j(Q.CodeMark, n.lineStart + e.pos, n.lineStart + u)), n.nextLine();
            break;
          } else {
            f = true, h7 || (Rt(a, n.lineStart - 1, n.lineStart), c = false);
            for (let m of e.markers) a.push(m);
            let d = n.lineStart + e.basePos, O = n.lineStart + e.text.length;
            d < O && (Rt(a, d, O), c = false);
          }
        }
        return n.addNode(n.buffer.writeElements(a, -i).finish(Q.FencedCode, n.prevLineEnd() - i), i), true;
      }, Blockquote(n, e) {
        let t = Ku(e);
        return t < 0 ? false : (n.startContext(Q.Blockquote, e.pos), n.addNode(Q.QuoteMark, n.lineStart + e.pos, n.lineStart + e.pos + 1), e.moveBase(e.pos + t), null);
      }, HorizontalRule(n, e) {
        if (Ul(e, n, false) < 0) return false;
        let t = n.lineStart + e.pos;
        return n.nextLine(), n.addNode(Q.HorizontalRule, t), true;
      }, BulletList(n, e) {
        let t = Fl(e, n, false);
        if (t < 0) return false;
        n.block.type != Q.BulletList && n.startContext(Q.BulletList, e.basePos, e.next);
        let i = Vu(e, e.pos + 1);
        return n.startContext(Q.ListItem, e.basePos, i - e.baseIndent), n.addNode(Q.ListMark, n.lineStart + e.pos, n.lineStart + e.pos + t), e.moveBaseColumn(i), null;
      }, OrderedList(n, e) {
        let t = Hl(e, n, false);
        if (t < 0) return false;
        n.block.type != Q.OrderedList && n.startContext(Q.OrderedList, e.basePos, e.text.charCodeAt(e.pos + t - 1));
        let i = Vu(e, e.pos + t);
        return n.startContext(Q.ListItem, e.basePos, i - e.baseIndent), n.addNode(Q.ListMark, n.lineStart + e.pos, n.lineStart + e.pos + t), e.moveBaseColumn(i), null;
      }, ATXHeading(n, e) {
        let t = ed(e);
        if (t < 0) return false;
        let i = e.pos, r = n.lineStart + i, s = _u(e.text, e.text.length, i), o = s;
        for (; o > i && e.text.charCodeAt(o - 1) == e.next; ) o--;
        (o == s || o == i || !Ee(e.text.charCodeAt(o - 1))) && (o = e.text.length);
        let l = n.buffer.write(Q.HeaderMark, 0, t).writeElements(n.parser.parseInline(e.text.slice(i + t + 1, o), r + t + 1), -r);
        o < e.text.length && l.write(Q.HeaderMark, o - i, s - i);
        let a = l.finish(Q.ATXHeading1 - 1 + t, e.text.length - i);
        return n.nextLine(), n.addNode(a, r), true;
      }, HTMLBlock(n, e) {
        let t = rd(e, n, false);
        if (t < 0) return false;
        let i = n.lineStart + e.pos, r = Vl[t][1], s = [], o = r != _l;
        for (; !r.test(e.text) && n.nextLine(); ) {
          if (e.depth < n.stack.length) {
            o = false;
            break;
          }
          for (let h7 of e.markers) s.push(h7);
        }
        o && n.nextLine();
        let l = r == id ? Q.CommentBlock : r == nd ? Q.ProcessingInstructionBlock : Q.HTMLBlock, a = n.prevLineEnd();
        return n.addNode(n.buffer.writeElements(s, -i).finish(l, a - i), i), true;
      }, SetextHeading: void 0 }, Wl = class {
        constructor(e) {
          this.stage = 0, this.elts = [], this.pos = 0, this.start = e.start, this.advance(e.content);
        }
        nextLine(e, t, i) {
          if (this.stage == -1) return false;
          let r = i.content + `
` + t.scrub(), s = this.advance(r);
          return s > -1 && s < r.length ? this.complete(e, i, s) : false;
        }
        finish(e, t) {
          return (this.stage == 2 || this.stage == 3) && bn(t.content, this.pos) == t.content.length ? this.complete(e, t, t.content.length) : false;
        }
        complete(e, t, i) {
          return e.addLeafElement(t, j(Q.LinkReference, this.start, this.start + i, this.elts)), true;
        }
        nextStage(e) {
          return e ? (this.pos = e.to - this.start, this.elts.push(e), this.stage++, true) : (e === false && (this.stage = -1), false);
        }
        advance(e) {
          for (; ; ) {
            if (this.stage == -1) return -1;
            if (this.stage == 0) {
              if (!this.nextStage(ud(e, this.pos, this.start, true))) return -1;
              if (e.charCodeAt(this.pos) != 58) return this.stage = -1;
              this.elts.push(j(Q.LinkMark, this.pos + this.start, this.pos + this.start + 1)), this.pos++;
            } else if (this.stage == 1) {
              if (!this.nextStage(cd(e, bn(e, this.pos), this.start))) return -1;
            } else if (this.stage == 2) {
              let t = bn(e, this.pos), i = 0;
              if (t > this.pos) {
                let r = fd(e, t, this.start);
                if (r) {
                  let s = El(e, r.to - this.start);
                  s > 0 && (this.nextStage(r), i = s);
                }
              }
              return i || (i = El(e, this.pos)), i > 0 && i < e.length ? i : -1;
            } else return El(e, this.pos);
          }
        }
      };
      function El(n, e) {
        for (; e < n.length; e++) {
          let t = n.charCodeAt(e);
          if (t == 10) break;
          if (!Ee(t)) return -1;
        }
        return e;
      }
      var Dl = class {
        nextLine(e, t, i) {
          let r = t.depth < e.stack.length ? -1 : td(t), s = t.next;
          if (r < 0) return false;
          let o = j(Q.HeaderMark, e.lineStart + t.pos, e.lineStart + r);
          return e.nextLine(), e.addLeafElement(i, j(s == 61 ? Q.SetextHeading1 : Q.SetextHeading2, i.start, e.prevLineEnd(), [...e.parser.parseInline(i.content, i.start), o])), true;
        }
        finish() {
          return false;
        }
      }, sd = { LinkReference(n, e) {
        return e.content.charCodeAt(0) == 91 ? new Wl(e) : null;
      }, SetextHeading() {
        return new Dl();
      } }, F1 = [(n, e) => ed(e) >= 0, (n, e) => Hu(e) >= 0, (n, e) => Ku(e) >= 0, (n, e) => Fl(e, n, true) >= 0, (n, e) => Hl(e, n, true) >= 0, (n, e) => Ul(e, n, true) >= 0, (n, e) => rd(e, n, true) >= 0], H1 = { text: "", end: 0 }, Bl = class {
        constructor(e, t, i, r) {
          this.parser = e, this.input = t, this.ranges = r, this.line = new Yl(), this.atEnd = false, this.reusePlaceholders = /* @__PURE__ */ new Map(), this.stoppedAt = null, this.rangeI = 0, this.to = r[r.length - 1].to, this.lineStart = this.absoluteLineStart = this.absoluteLineEnd = r[0].from, this.block = Dr.create(Q.Document, 0, this.lineStart, 0, 0), this.stack = [this.block], this.fragments = i.length ? new Nl(i, t) : null, this.readLine();
        }
        get parsedPos() {
          return this.absoluteLineStart;
        }
        advance() {
          if (this.stoppedAt != null && this.absoluteLineStart > this.stoppedAt) return this.finish();
          let { line: e } = this;
          for (; ; ) {
            for (let i = 0; ; ) {
              let r = e.depth < this.stack.length ? this.stack[this.stack.length - 1] : null;
              for (; i < e.markers.length && (!r || e.markers[i].from < r.end); ) {
                let s = e.markers[i++];
                this.addNode(s.type, s.from, s.to);
              }
              if (!r) break;
              this.finishContext();
            }
            if (e.pos < e.text.length) break;
            if (!this.nextLine()) return this.finish();
          }
          if (this.fragments && this.reuseFragment(e.basePos)) return null;
          e: for (; ; ) {
            for (let i of this.parser.blockParsers) if (i) {
              let r = i(this, e);
              if (r != false) {
                if (r == true) return null;
                e.forward();
                continue e;
              }
            }
            break;
          }
          if (e.pos == e.text.length) return this.nextLine() ? null : this.finish();
          let t = new zl(this.lineStart + e.pos, e.text.slice(e.pos));
          for (let i of this.parser.leafBlockParsers) if (i) {
            let r = i(this, t);
            r && t.parsers.push(r);
          }
          e: for (; this.nextLine() && e.pos != e.text.length; ) {
            if (e.indent < e.baseIndent + 4) {
              for (let i of this.parser.endLeafBlock) if (i(this, e, t)) break e;
            }
            for (let i of t.parsers) if (i.nextLine(this, e, t)) return null;
            t.content += `
` + e.scrub();
            for (let i of e.markers) t.marks.push(i);
          }
          return this.finishLeaf(t), null;
        }
        stopAt(e) {
          if (this.stoppedAt != null && this.stoppedAt < e) throw new RangeError("Can't move stoppedAt forward");
          this.stoppedAt = e;
        }
        reuseFragment(e) {
          if (!this.fragments.moveTo(this.absoluteLineStart + e, this.absoluteLineStart) || !this.fragments.matches(this.block.hash)) return false;
          let t = this.fragments.takeNodes(this);
          return t ? (this.absoluteLineStart += t, this.lineStart = dd(this.absoluteLineStart, this.ranges), this.moveRangeI(), this.absoluteLineStart < this.to ? (this.lineStart++, this.absoluteLineStart++, this.readLine()) : (this.atEnd = true, this.readLine()), true) : false;
        }
        get depth() {
          return this.stack.length;
        }
        parentType(e = this.depth - 1) {
          return this.parser.nodeSet.types[this.stack[e].type];
        }
        nextLine() {
          return this.lineStart += this.line.text.length, this.absoluteLineEnd >= this.to ? (this.absoluteLineStart = this.absoluteLineEnd, this.atEnd = true, this.readLine(), false) : (this.lineStart++, this.absoluteLineStart = this.absoluteLineEnd + 1, this.moveRangeI(), this.readLine(), true);
        }
        peekLine() {
          return this.scanLine(this.absoluteLineEnd + 1).text;
        }
        moveRangeI() {
          for (; this.rangeI < this.ranges.length - 1 && this.absoluteLineStart >= this.ranges[this.rangeI].to; ) this.rangeI++, this.absoluteLineStart = Math.max(this.absoluteLineStart, this.ranges[this.rangeI].from);
        }
        scanLine(e) {
          let t = H1;
          if (t.end = e, e >= this.to) t.text = "";
          else if (t.text = this.lineChunkAt(e), t.end += t.text.length, this.ranges.length > 1) {
            let i = this.absoluteLineStart, r = this.rangeI;
            for (; this.ranges[r].to < t.end; ) {
              r++;
              let s = this.ranges[r].from, o = this.lineChunkAt(s);
              t.end = s + o.length, t.text = t.text.slice(0, this.ranges[r - 1].to - i) + o, i = t.end - t.text.length;
            }
          }
          return t;
        }
        readLine() {
          let { line: e } = this, { text: t, end: i } = this.scanLine(this.absoluteLineStart);
          for (this.absoluteLineEnd = i, e.reset(t); e.depth < this.stack.length; e.depth++) {
            let r = this.stack[e.depth], s = this.parser.skipContextMarkup[r.type];
            if (!s) throw new Error("Unhandled block context " + Q[r.type]);
            let o = this.line.markers.length;
            if (!s(r, this, e)) {
              this.line.markers.length > o && (r.end = this.line.markers[this.line.markers.length - 1].to), e.forward();
              break;
            }
            e.forward();
          }
        }
        lineChunkAt(e) {
          let t = this.input.chunk(e), i;
          if (this.input.lineChunks) i = t == `
` ? "" : t;
          else {
            let r = t.indexOf(`
`);
            i = r < 0 ? t : t.slice(0, r);
          }
          return e + i.length > this.to ? i.slice(0, this.to - e) : i;
        }
        prevLineEnd() {
          return this.atEnd ? this.lineStart : this.lineStart - 1;
        }
        startContext(e, t, i = 0) {
          this.block = Dr.create(e, i, this.lineStart + t, this.block.hash, this.lineStart + this.line.text.length), this.stack.push(this.block);
        }
        startComposite(e, t, i = 0) {
          this.startContext(this.parser.getNodeType(e), t, i);
        }
        addNode(e, t, i) {
          typeof e == "number" && (e = new z(this.parser.nodeSet.types[e], Xi, Xi, (i ?? this.prevLineEnd()) - t)), this.block.addChild(e, t - this.block.from);
        }
        addElement(e) {
          this.block.addChild(e.toTree(this.parser.nodeSet), e.from - this.block.from);
        }
        addLeafElement(e, t) {
          this.addNode(this.buffer.writeElements(Il(t.children, e.marks), -t.from).finish(t.type, t.to - t.from), t.from);
        }
        finishContext() {
          let e = this.stack.pop(), t = this.stack[this.stack.length - 1];
          t.addChild(e.toTree(this.parser.nodeSet), e.from - t.from), this.block = t;
        }
        finish() {
          for (; this.stack.length > 1; ) this.finishContext();
          return this.addGaps(this.block.toTree(this.parser.nodeSet, this.lineStart));
        }
        addGaps(e) {
          return this.ranges.length > 1 ? od(this.ranges, 0, e.topNode, this.ranges[0].from, this.reusePlaceholders) : e;
        }
        finishLeaf(e) {
          for (let i of e.parsers) if (i.finish(this, e)) return;
          let t = Il(this.parser.parseInline(e.content, e.start), e.marks);
          this.addNode(this.buffer.writeElements(t, -e.start).finish(Q.Paragraph, e.content.length), e.start);
        }
        elt(e, t, i, r) {
          return typeof e == "string" ? j(this.parser.getNodeType(e), t, i, r) : new qr(e, t);
        }
        get buffer() {
          return new Br(this.parser.nodeSet);
        }
      };
      function od(n, e, t, i, r) {
        let s = n[e].to, o = [], l = [], a = t.from + i;
        function h7(c, f) {
          for (; f ? c >= s : c > s; ) {
            let u = n[e + 1].from - s;
            i += u, c += u, e++, s = n[e].to;
          }
        }
        for (let c = t.firstChild; c; c = c.nextSibling) {
          h7(c.from + i, true);
          let f = c.from + i, u, d = r.get(c.tree);
          d ? u = d : c.to + i > s ? (u = od(n, e, c, i, r), h7(c.to + i, false)) : u = c.toTree(), o.push(u), l.push(f - a);
        }
        return h7(t.to + i, false), new z(t.type, o, l, t.to + i - a, t.tree ? t.tree.propValues : void 0);
      }
      var Qn = class n extends kt {
        constructor(e, t, i, r, s, o, l, a, h7) {
          super(), this.nodeSet = e, this.blockParsers = t, this.leafBlockParsers = i, this.blockNames = r, this.endLeafBlock = s, this.skipContextMarkup = o, this.inlineParsers = l, this.inlineNames = a, this.wrappers = h7, this.nodeTypes = /* @__PURE__ */ Object.create(null);
          for (let c of e.types) this.nodeTypes[c.name] = c.id;
        }
        createParse(e, t, i) {
          let r = new Bl(this, e, t, i);
          for (let s of this.wrappers) r = s(r, e, t, i);
          return r;
        }
        configure(e) {
          let t = ql(e);
          if (!t) return this;
          let { nodeSet: i, skipContextMarkup: r } = this, s = this.blockParsers.slice(), o = this.leafBlockParsers.slice(), l = this.blockNames.slice(), a = this.inlineParsers.slice(), h7 = this.inlineNames.slice(), c = this.endLeafBlock.slice(), f = this.wrappers;
          if (Sn(t.defineNodes)) {
            r = Object.assign({}, r);
            let u = i.types.slice(), d;
            for (let O of t.defineNodes) {
              let { name: m, block: g, composite: S, style: x } = typeof O == "string" ? { name: O } : O;
              if (u.some((T) => T.name == m)) continue;
              S && (r[u.length] = (T, Z, P) => S(Z, P, T.value));
              let y = u.length, R = S ? ["Block", "BlockContext"] : g ? y >= Q.ATXHeading1 && y <= Q.SetextHeading2 ? ["Block", "LeafBlock", "Heading"] : ["Block", "LeafBlock"] : void 0;
              u.push(J.define({ id: y, name: m, props: R && [[A.group, R]] })), x && (d || (d = {}), Array.isArray(x) || x instanceof ke ? d[m] = x : Object.assign(d, x));
            }
            i = new Qt(u), d && (i = i.extend(We(d)));
          }
          if (Sn(t.props) && (i = i.extend(...t.props)), Sn(t.remove)) for (let u of t.remove) {
            let d = this.blockNames.indexOf(u), O = this.inlineNames.indexOf(u);
            d > -1 && (s[d] = o[d] = void 0), O > -1 && (a[O] = void 0);
          }
          if (Sn(t.parseBlock)) for (let u of t.parseBlock) {
            let d = l.indexOf(u.name);
            if (d > -1) s[d] = u.parse, o[d] = u.leaf;
            else {
              let O = u.before ? Wr(l, u.before) : u.after ? Wr(l, u.after) + 1 : l.length - 1;
              s.splice(O, 0, u.parse), o.splice(O, 0, u.leaf), l.splice(O, 0, u.name);
            }
            u.endLeaf && c.push(u.endLeaf);
          }
          if (Sn(t.parseInline)) for (let u of t.parseInline) {
            let d = h7.indexOf(u.name);
            if (d > -1) a[d] = u.parse;
            else {
              let O = u.before ? Wr(h7, u.before) : u.after ? Wr(h7, u.after) + 1 : h7.length - 1;
              a.splice(O, 0, u.parse), h7.splice(O, 0, u.name);
            }
          }
          return t.wrap && (f = f.concat(t.wrap)), new n(i, s, o, l, c, r, a, h7, f);
        }
        getNodeType(e) {
          let t = this.nodeTypes[e];
          if (t == null) throw new RangeError(`Unknown node type '${e}'`);
          return t;
        }
        parseInline(e, t) {
          let i = new kn(this, e, t);
          e: for (let r = t; r < i.end; ) {
            let s = i.char(r);
            for (let o of this.inlineParsers) if (o) {
              let l = o(i, s, r);
              if (l >= 0) {
                r = l;
                continue e;
              }
            }
            r++;
          }
          return i.resolveMarkers(0);
        }
      };
      function Sn(n) {
        return n != null && n.length > 0;
      }
      function ql(n) {
        if (!Array.isArray(n)) return n;
        if (n.length == 0) return null;
        let e = ql(n[0]);
        if (n.length == 1) return e;
        let t = ql(n.slice(1));
        if (!t || !e) return e || t;
        let i = (o, l) => (o || Xi).concat(l || Xi), r = e.wrap, s = t.wrap;
        return { props: i(e.props, t.props), defineNodes: i(e.defineNodes, t.defineNodes), parseBlock: i(e.parseBlock, t.parseBlock), parseInline: i(e.parseInline, t.parseInline), remove: i(e.remove, t.remove), wrap: r ? s ? (o, l, a, h7) => r(s(o, l, a, h7), l, a, h7) : r : s };
      }
      function Wr(n, e) {
        let t = n.indexOf(e);
        if (t < 0) throw new RangeError(`Position specified relative to unknown parser ${e}`);
        return t;
      }
      var ld = [J.none];
      for (let n = 1, e; e = Q[n]; n++) ld[n] = J.define({ id: n, name: e, props: n >= Q.Escape ? [] : [[A.group, n in Fu ? ["Block", "BlockContext"] : ["Block", "LeafBlock"]]], top: e == "Document" });
      var Xi = [], Br = class {
        constructor(e) {
          this.nodeSet = e, this.content = [], this.nodes = [];
        }
        write(e, t, i, r = 0) {
          return this.content.push(e, t, i, 4 + r * 4), this;
        }
        writeElements(e, t = 0) {
          for (let i of e) i.writeTo(this, t);
          return this;
        }
        finish(e, t) {
          return z.build({ buffer: this.content, nodeSet: this.nodeSet, reused: this.nodes, topID: e, length: t });
        }
      }, ni = class {
        constructor(e, t, i, r = Xi) {
          this.type = e, this.from = t, this.to = i, this.children = r;
        }
        writeTo(e, t) {
          let i = e.content.length;
          e.writeElements(this.children, t), e.content.push(this.type, this.from + t, this.to + t, e.content.length + 4 - i);
        }
        toTree(e) {
          return new Br(e).writeElements(this.children, -this.from).finish(this.type, this.to - this.from);
        }
      }, qr = class {
        constructor(e, t) {
          this.tree = e, this.from = t;
        }
        get to() {
          return this.from + this.tree.length;
        }
        get type() {
          return this.tree.type.id;
        }
        get children() {
          return Xi;
        }
        writeTo(e, t) {
          e.nodes.push(this.tree), e.content.push(e.nodes.length - 1, this.from + t, this.to + t, -1);
        }
        toTree() {
          return this.tree;
        }
      };
      function j(n, e, t, i) {
        return new ni(n, e, t, i);
      }
      var ad = { resolve: "Emphasis", mark: "EmphasisMark" }, hd = { resolve: "Emphasis", mark: "EmphasisMark" }, ii = {}, Ir = {}, de = class {
        constructor(e, t, i, r) {
          this.type = e, this.from = t, this.to = i, this.side = r;
        }
      }, Wu = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~", xn = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\u2010-\u2027]/;
      try {
        xn = new RegExp("[\\p{S}|\\p{P}]", "u");
      } catch {
      }
      var jl = { Escape(n, e, t) {
        if (e != 92 || t == n.end - 1) return -1;
        let i = n.char(t + 1);
        for (let r = 0; r < Wu.length; r++) if (Wu.charCodeAt(r) == i) return n.append(j(Q.Escape, t, t + 2));
        return -1;
      }, Entity(n, e, t) {
        if (e != 38) return -1;
        let i = /^(?:#\d+|#x[a-f\d]+|\w+);/i.exec(n.slice(t + 1, t + 31));
        return i ? n.append(j(Q.Entity, t, t + 1 + i[0].length)) : -1;
      }, InlineCode(n, e, t) {
        if (e != 96 || t && n.char(t - 1) == 96) return -1;
        let i = t + 1;
        for (; i < n.end && n.char(i) == 96; ) i++;
        let r = i - t, s = 0;
        for (; i < n.end; i++) if (n.char(i) == 96) {
          if (s++, s == r && n.char(i + 1) != 96) return n.append(j(Q.InlineCode, t, i + 1, [j(Q.CodeMark, t, t + r), j(Q.CodeMark, i + 1 - r, i + 1)]));
        } else s = 0;
        return -1;
      }, HTMLTag(n, e, t) {
        if (e != 60 || t == n.end - 1) return -1;
        let i = n.slice(t + 1, n.end), r = /^(?:[a-z][-\w+.]+:[^\s>]+|[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*)>/i.exec(i);
        if (r) return n.append(j(Q.Autolink, t, t + 1 + r[0].length, [j(Q.LinkMark, t, t + 1), j(Q.URL, t + 1, t + r[0].length), j(Q.LinkMark, t + r[0].length, t + 1 + r[0].length)]));
        let s = /^!--[^>](?:-[^-]|[^-])*?-->/i.exec(i);
        if (s) return n.append(j(Q.Comment, t, t + 1 + s[0].length));
        let o = /^\?[^]*?\?>/.exec(i);
        if (o) return n.append(j(Q.ProcessingInstruction, t, t + 1 + o[0].length));
        let l = /^(?:![A-Z][^]*?>|!\[CDATA\[[^]*?\]\]>|\/\s*[a-zA-Z][\w-]*\s*>|\s*[a-zA-Z][\w-]*(\s+[a-zA-Z:_][\w-.:]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*(\/\s*)?>)/.exec(i);
        return l ? n.append(j(Q.HTMLTag, t, t + 1 + l[0].length)) : -1;
      }, Emphasis(n, e, t) {
        if (e != 95 && e != 42) return -1;
        let i = t + 1;
        for (; n.char(i) == e; ) i++;
        let r = n.slice(t - 1, t), s = n.slice(i, i + 1), o = xn.test(r), l = xn.test(s), a = /\s|^$/.test(r), h7 = /\s|^$/.test(s), c = !h7 && (!l || a || o), f = !a && (!o || h7 || l), u = c && (e == 42 || !f || o), d = f && (e == 42 || !c || l);
        return n.append(new de(e == 95 ? ad : hd, t, i, (u ? 1 : 0) | (d ? 2 : 0)));
      }, HardBreak(n, e, t) {
        if (e == 92 && n.char(t + 1) == 10) return n.append(j(Q.HardBreak, t, t + 2));
        if (e == 32) {
          let i = t + 1;
          for (; n.char(i) == 32; ) i++;
          if (n.char(i) == 10 && i >= t + 2) return n.append(j(Q.HardBreak, t, i + 1));
        }
        return -1;
      }, Link(n, e, t) {
        return e == 91 ? n.append(new de(ii, t, t + 1, 1)) : -1;
      }, Image(n, e, t) {
        return e == 33 && n.char(t + 1) == 91 ? n.append(new de(Ir, t, t + 2, 1)) : -1;
      }, LinkEnd(n, e, t) {
        if (e != 93) return -1;
        for (let i = n.parts.length - 1; i >= 0; i--) {
          let r = n.parts[i];
          if (r instanceof de && (r.type == ii || r.type == Ir)) {
            if (!r.side || n.skipSpace(r.to) == t && !/[(\[]/.test(n.slice(t + 1, t + 2))) return n.parts[i] = null, -1;
            let s = n.takeContent(i), o = n.parts[i] = K1(n, s, r.type == ii ? Q.Link : Q.Image, r.from, t + 1);
            if (r.type == ii) for (let l = 0; l < i; l++) {
              let a = n.parts[l];
              a instanceof de && a.type == ii && (a.side = 0);
            }
            return o.to;
          }
        }
        return -1;
      } };
      function K1(n, e, t, i, r) {
        let { text: s } = n, o = n.char(r), l = r;
        if (e.unshift(j(Q.LinkMark, i, i + (t == Q.Image ? 2 : 1))), e.push(j(Q.LinkMark, r - 1, r)), o == 40) {
          let a = n.skipSpace(r + 1), h7 = cd(s, a - n.offset, n.offset), c;
          h7 && (a = n.skipSpace(h7.to), a != h7.to && (c = fd(s, a - n.offset, n.offset), c && (a = n.skipSpace(c.to)))), n.char(a) == 41 && (e.push(j(Q.LinkMark, r, r + 1)), l = a + 1, h7 && e.push(h7), c && e.push(c), e.push(j(Q.LinkMark, a, l)));
        } else if (o == 91) {
          let a = ud(s, r - n.offset, n.offset, false);
          a && (e.push(a), l = a.to);
        }
        return j(t, i, l, e);
      }
      function cd(n, e, t) {
        if (n.charCodeAt(e) == 60) {
          for (let r = e + 1; r < n.length; r++) {
            let s = n.charCodeAt(r);
            if (s == 62) return j(Q.URL, e + t, r + 1 + t);
            if (s == 60 || s == 10) return false;
          }
          return null;
        } else {
          let r = 0, s = e;
          for (let o = false; s < n.length; s++) {
            let l = n.charCodeAt(s);
            if (Ee(l)) break;
            if (o) o = false;
            else if (l == 40) r++;
            else if (l == 41) {
              if (!r) break;
              r--;
            } else l == 92 && (o = true);
          }
          return s > e ? j(Q.URL, e + t, s + t) : s == n.length ? null : false;
        }
      }
      function fd(n, e, t) {
        let i = n.charCodeAt(e);
        if (i != 39 && i != 34 && i != 40) return false;
        let r = i == 40 ? 41 : i;
        for (let s = e + 1, o = false; s < n.length; s++) {
          let l = n.charCodeAt(s);
          if (o) o = false;
          else {
            if (l == r) return j(Q.LinkTitle, e + t, s + 1 + t);
            l == 92 && (o = true);
          }
        }
        return null;
      }
      function ud(n, e, t, i) {
        for (let r = false, s = e + 1, o = Math.min(n.length, s + 999); s < o; s++) {
          let l = n.charCodeAt(s);
          if (r) r = false;
          else {
            if (l == 93) return i ? false : j(Q.LinkLabel, e + t, s + 1 + t);
            if (i && !Ee(l) && (i = false), l == 91) return false;
            l == 92 && (r = true);
          }
        }
        return null;
      }
      var kn = class {
        constructor(e, t, i) {
          this.parser = e, this.text = t, this.offset = i, this.parts = [];
        }
        char(e) {
          return e >= this.end ? -1 : this.text.charCodeAt(e - this.offset);
        }
        get end() {
          return this.offset + this.text.length;
        }
        slice(e, t) {
          return this.text.slice(e - this.offset, t - this.offset);
        }
        append(e) {
          return this.parts.push(e), e.to;
        }
        addDelimiter(e, t, i, r, s) {
          return this.append(new de(e, t, i, (r ? 1 : 0) | (s ? 2 : 0)));
        }
        get hasOpenLink() {
          for (let e = this.parts.length - 1; e >= 0; e--) {
            let t = this.parts[e];
            if (t instanceof de && (t.type == ii || t.type == Ir)) return true;
          }
          return false;
        }
        addElement(e) {
          return this.append(e);
        }
        resolveMarkers(e) {
          for (let i = e; i < this.parts.length; i++) {
            let r = this.parts[i];
            if (!(r instanceof de && r.type.resolve && r.side & 2)) continue;
            let s = r.type == ad || r.type == hd, o = r.to - r.from, l, a = i - 1;
            for (; a >= e; a--) {
              let m = this.parts[a];
              if (m instanceof de && m.side & 1 && m.type == r.type && !(s && (r.side & 1 || m.side & 2) && (m.to - m.from + o) % 3 == 0 && ((m.to - m.from) % 3 || o % 3))) {
                l = m;
                break;
              }
            }
            if (!l) continue;
            let h7 = r.type.resolve, c = [], f = l.from, u = r.to;
            if (s) {
              let m = Math.min(2, l.to - l.from, o);
              f = l.to - m, u = r.from + m, h7 = m == 1 ? "Emphasis" : "StrongEmphasis";
            }
            l.type.mark && c.push(this.elt(l.type.mark, f, l.to));
            for (let m = a + 1; m < i; m++) this.parts[m] instanceof ni && c.push(this.parts[m]), this.parts[m] = null;
            r.type.mark && c.push(this.elt(r.type.mark, r.from, u));
            let d = this.elt(h7, f, u, c);
            this.parts[a] = s && l.from != f ? new de(l.type, l.from, f, l.side) : null, (this.parts[i] = s && r.to != u ? new de(r.type, u, r.to, r.side) : null) ? this.parts.splice(i, 0, d) : this.parts[i] = d;
          }
          let t = [];
          for (let i = e; i < this.parts.length; i++) {
            let r = this.parts[i];
            r instanceof ni && t.push(r);
          }
          return t;
        }
        findOpeningDelimiter(e) {
          for (let t = this.parts.length - 1; t >= 0; t--) {
            let i = this.parts[t];
            if (i instanceof de && i.type == e && i.side & 1) return t;
          }
          return null;
        }
        takeContent(e) {
          let t = this.resolveMarkers(e);
          return this.parts.length = e, t;
        }
        getDelimiterAt(e) {
          let t = this.parts[e];
          return t instanceof de ? t : null;
        }
        skipSpace(e) {
          return bn(this.text, e - this.offset) + this.offset;
        }
        elt(e, t, i, r) {
          return typeof e == "string" ? j(this.parser.getNodeType(e), t, i, r) : new qr(e, t);
        }
      };
      kn.linkStart = ii;
      kn.imageStart = Ir;
      function Il(n, e) {
        if (!e.length) return n;
        if (!n.length) return e;
        let t = n.slice(), i = 0;
        for (let r of e) {
          for (; i < t.length && t[i].to < r.to; ) i++;
          if (i < t.length && t[i].from < r.from) {
            let s = t[i];
            s instanceof ni && (t[i] = new ni(s.type, s.from, s.to, Il(s.children, [r])));
          } else t.splice(i++, 0, r);
        }
        return t;
      }
      var J1 = [Q.CodeBlock, Q.ListItem, Q.OrderedList, Q.BulletList], Nl = class {
        constructor(e, t) {
          this.fragments = e, this.input = t, this.i = 0, this.fragment = null, this.fragmentEnd = -1, this.cursor = null, e.length && (this.fragment = e[this.i++]);
        }
        nextFragment() {
          this.fragment = this.i < this.fragments.length ? this.fragments[this.i++] : null, this.cursor = null, this.fragmentEnd = -1;
        }
        moveTo(e, t) {
          for (; this.fragment && this.fragment.to <= e; ) this.nextFragment();
          if (!this.fragment || this.fragment.from > (e ? e - 1 : 0)) return false;
          if (this.fragmentEnd < 0) {
            let s = this.fragment.to;
            for (; s > 0 && this.input.read(s - 1, s) != `
`; ) s--;
            this.fragmentEnd = s ? s - 1 : 0;
          }
          let i = this.cursor;
          i || (i = this.cursor = this.fragment.tree.cursor(), i.firstChild());
          let r = e + this.fragment.offset;
          for (; i.to <= r; ) if (!i.parent()) return false;
          for (; ; ) {
            if (i.from >= r) return this.fragment.from <= t;
            if (!i.childAfter(r)) return false;
          }
        }
        matches(e) {
          let t = this.cursor.tree;
          return t && t.prop(A.contextHash) == e;
        }
        takeNodes(e) {
          let t = this.cursor, i = this.fragment.offset, r = this.fragmentEnd - (this.fragment.openEnd ? 1 : 0), s = e.absoluteLineStart, o = s, l = e.block.children.length, a = o, h7 = l;
          for (; ; ) {
            if (t.to - i > r) {
              if (t.type.isAnonymous && t.firstChild()) continue;
              break;
            }
            let c = dd(t.from - i, e.ranges);
            if (t.to - i <= e.ranges[e.rangeI].to) e.addNode(t.tree, c);
            else {
              let f = new z(e.parser.nodeSet.types[Q.Paragraph], [], [], 0, e.block.hashProp);
              e.reusePlaceholders.set(f, t.tree), e.addNode(f, c);
            }
            if (t.type.is("Block") && (J1.indexOf(t.type.id) < 0 ? (o = t.to - i, l = e.block.children.length) : (o = a, l = h7), a = t.to - i, h7 = e.block.children.length), !t.nextSibling()) break;
          }
          for (; e.block.children.length > l; ) e.block.children.pop(), e.block.positions.pop();
          return o - s;
        }
      };
      function dd(n, e) {
        let t = n;
        for (let i = 1; i < e.length; i++) {
          let r = e[i - 1].to, s = e[i].from;
          r < n && (t -= s - r);
        }
        return t;
      }
      var eS = We({ "Blockquote/...": p.quote, HorizontalRule: p.contentSeparator, "ATXHeading1/... SetextHeading1/...": p.heading1, "ATXHeading2/... SetextHeading2/...": p.heading2, "ATXHeading3/...": p.heading3, "ATXHeading4/...": p.heading4, "ATXHeading5/...": p.heading5, "ATXHeading6/...": p.heading6, "Comment CommentBlock": p.comment, Escape: p.escape, Entity: p.character, "Emphasis/...": p.emphasis, "StrongEmphasis/...": p.strong, "Link/... Image/...": p.link, "OrderedList/... BulletList/...": p.list, "BlockQuote/...": p.quote, "InlineCode CodeText": p.monospace, "URL Autolink": p.url, "HeaderMark HardBreak QuoteMark ListMark LinkMark EmphasisMark CodeMark": p.processingInstruction, "CodeInfo LinkLabel": p.labelName, LinkTitle: p.string, Paragraph: p.content }), Od = new Qn(new Qt(ld).extend(eS), Object.keys(Vr).map((n) => Vr[n]), Object.keys(Vr).map((n) => sd[n]), Object.keys(Vr), F1, Fu, Object.keys(jl).map((n) => jl[n]), Object.keys(jl), []);
      function tS(n, e, t) {
        let i = [];
        for (let r = n.firstChild, s = e; ; r = r.nextSibling) {
          let o = r ? r.from : t;
          if (o > s && i.push({ from: s, to: o }), !r) break;
          s = r.to;
        }
        return i;
      }
      function pd(n) {
        let { codeParser: e, htmlParser: t } = n;
        return { wrap: br((r, s) => {
          let o = r.type.id;
          if (e && (o == Q.CodeBlock || o == Q.FencedCode)) {
            let l = "";
            if (o == Q.FencedCode) {
              let h7 = r.node.getChild(Q.CodeInfo);
              h7 && (l = s.read(h7.from, h7.to));
            }
            let a = e(l);
            if (a) return { parser: a, overlay: (h7) => h7.type.id == Q.CodeText, bracketed: o == Q.FencedCode };
          } else if (t && (o == Q.HTMLBlock || o == Q.HTMLTag || o == Q.CommentBlock)) return { parser: t, overlay: tS(r.node, r.from, r.to) };
          return null;
        }) };
      }
      var iS = { resolve: "Strikethrough", mark: "StrikethroughMark" }, nS = { defineNodes: [{ name: "Strikethrough", style: { "Strikethrough/...": p.strikethrough } }, { name: "StrikethroughMark", style: p.processingInstruction }], parseInline: [{ name: "Strikethrough", parse(n, e, t) {
        if (e != 126 || n.char(t + 1) != 126 || n.char(t + 2) == 126) return -1;
        let i = n.slice(t - 1, t), r = n.slice(t + 2, t + 3), s = /\s|^$/.test(i), o = /\s|^$/.test(r), l = xn.test(i), a = xn.test(r);
        return n.addDelimiter(iS, t, t + 2, !o && (!a || s || l), !s && (!l || o || a));
      }, after: "Emphasis" }] };
      function yn(n, e, t = 0, i, r = 0) {
        let s = 0, o = true, l = -1, a = -1, h7 = false, c = () => {
          i.push(n.elt("TableCell", r + l, r + a, n.parser.parseInline(e.slice(l, a), r + l)));
        };
        for (let f = t; f < e.length; f++) {
          let u = e.charCodeAt(f);
          u == 124 && !h7 ? ((!o || l > -1) && s++, o = false, i && (l > -1 && c(), i.push(n.elt("TableDelimiter", f + r, f + r + 1))), l = a = -1) : (h7 || u != 32 && u != 9) && (l < 0 && (l = f), a = f + 1), h7 = !h7 && u == 92;
        }
        return l > -1 && (s++, i && c()), s;
      }
      function Du(n, e) {
        for (let t = e; t < n.length; t++) {
          let i = n.charCodeAt(t);
          if (i == 124) return true;
          i == 92 && t++;
        }
        return false;
      }
      var md = /^[>\s]*\|?(\s*:?-+:?\s*\|)+(\s*:?-+:?\s*)?$/, Nr = class {
        constructor() {
          this.rows = null;
        }
        nextLine(e, t, i) {
          if (this.rows == null) {
            this.rows = false;
            let r;
            if ((t.next == 45 || t.next == 58 || t.next == 124) && md.test(r = t.text.slice(t.pos))) {
              let s = [];
              yn(e, i.content, 0, s, i.start) == yn(e, r, 0) && (this.rows = [e.elt("TableHeader", i.start, i.start + i.content.length, s), e.elt("TableDelimiter", e.lineStart + t.pos, e.lineStart + t.text.length)]);
            }
          } else if (this.rows) {
            let r = [];
            yn(e, t.text, t.pos, r, e.lineStart), this.rows.push(e.elt("TableRow", e.lineStart + t.pos, e.lineStart + t.text.length, r));
          }
          return false;
        }
        finish(e, t) {
          return this.rows ? (e.addLeafElement(t, e.elt("Table", t.start, t.start + t.content.length, this.rows)), true) : false;
        }
      }, rS = { defineNodes: [{ name: "Table", block: true }, { name: "TableHeader", style: { "TableHeader/...": p.heading } }, "TableRow", { name: "TableCell", style: p.content }, { name: "TableDelimiter", style: p.processingInstruction }], parseBlock: [{ name: "Table", leaf(n, e) {
        return Du(e.content, 0) ? new Nr() : null;
      }, endLeaf(n, e, t) {
        if (t.parsers.some((r) => r instanceof Nr) || !Du(e.text, e.basePos)) return false;
        let i = n.peekLine();
        return md.test(i) && yn(n, e.text, e.basePos) == yn(n, i, e.basePos);
      }, before: "SetextHeading" }] }, Gl = class {
        nextLine() {
          return false;
        }
        finish(e, t) {
          return e.addLeafElement(t, e.elt("Task", t.start, t.start + t.content.length, [e.elt("TaskMarker", t.start, t.start + 3), ...e.parser.parseInline(t.content.slice(3), t.start + 3)])), true;
        }
      }, sS = { defineNodes: [{ name: "Task", block: true, style: p.list }, { name: "TaskMarker", style: p.atom }], parseBlock: [{ name: "TaskList", leaf(n, e) {
        return /^\[[ xX]\][ \t]/.test(e.content) && n.parentType().name == "ListItem" ? new Gl() : null;
      }, after: "SetextHeading" }] }, Bu = /(www\.)|(https?:\/\/)|([\w.+-]{1,100}@)|(mailto:|xmpp:)/gy, qu = /[\w-]+(\.[\w-]+)+(:\d+)?(\/[^\s<]*)?/gy, oS = /[\w-]+\.[\w-]+($|[/:])/, Iu = /[\w.+-]+@[\w-]+(\.[\w.-]+)+/gy, Nu = /\/[a-zA-Z\d@.]+/gy;
      function Gu(n, e, t, i) {
        let r = 0;
        for (let s = e; s < t; s++) n[s] == i && r++;
        return r;
      }
      function lS(n, e) {
        qu.lastIndex = e;
        let t = qu.exec(n);
        if (!t || oS.exec(t[0])[0].indexOf("_") > -1) return -1;
        let i = e + t[0].length;
        for (; ; ) {
          let r = n[i - 1], s;
          if (/[?!.,:*_~]/.test(r) || r == ")" && Gu(n, e, i, ")") > Gu(n, e, i, "(")) i--;
          else if (r == ";" && (s = /&(?:#\d+|#x[a-f\d]+|\w+);$/.exec(n.slice(e, i)))) i = e + s.index;
          else break;
        }
        return i;
      }
      function Uu(n, e) {
        Iu.lastIndex = e;
        let t = Iu.exec(n);
        if (!t) return -1;
        let i = t[0][t[0].length - 1];
        return i == "_" || i == "-" ? -1 : e + t[0].length - (i == "." ? 1 : 0);
      }
      var aS = { parseInline: [{ name: "Autolink", parse(n, e, t) {
        let i = t - n.offset;
        if (i && /\w/.test(n.text[i - 1])) return -1;
        Bu.lastIndex = i;
        let r = Bu.exec(n.text), s = -1;
        if (!r) return -1;
        if (r[1] || r[2]) {
          if (s = lS(n.text, i + r[0].length), s > -1 && n.hasOpenLink) {
            let o = /([^\[\]]|\[[^\]]*\])*/.exec(n.text.slice(i, s));
            s = i + o[0].length;
          }
        } else r[3] ? s = Uu(n.text, i) : (s = Uu(n.text, i + r[0].length), s > -1 && r[0] == "xmpp:" && (Nu.lastIndex = s, r = Nu.exec(n.text), r && (s = r.index + r[0].length)));
        return s < 0 ? -1 : (n.addElement(n.elt("URL", t, s + n.offset)), s + n.offset);
      } }] }, gd = [rS, sS, nS, aS];
      function Sd(n, e, t) {
        return (i, r, s) => {
          if (r != n || i.char(s + 1) == n) return -1;
          let o = [i.elt(t, s, s + 1)];
          for (let l = s + 1; l < i.end; l++) {
            let a = i.char(l);
            if (a == n) return i.addElement(i.elt(e, s, l + 1, o.concat(i.elt(t, l, l + 1))));
            if (a == 92 && o.push(i.elt("Escape", l, l++ + 2)), Ee(a)) break;
          }
          return -1;
        };
      }
      var bd = { defineNodes: [{ name: "Superscript", style: p.special(p.content) }, { name: "SuperscriptMark", style: p.processingInstruction }], parseInline: [{ name: "Superscript", parse: Sd(94, "Superscript", "SuperscriptMark") }] }, yd = { defineNodes: [{ name: "Subscript", style: p.special(p.content) }, { name: "SubscriptMark", style: p.processingInstruction }], parseInline: [{ name: "Subscript", parse: Sd(126, "Subscript", "SubscriptMark") }] }, Qd = { defineNodes: [{ name: "Emoji", style: p.character }], parseInline: [{ name: "Emoji", parse(n, e, t) {
        let i;
        return e != 58 || !(i = /^[a-zA-Z_0-9]+:/.exec(n.slice(t + 1, n.end))) ? -1 : n.addElement(n.elt("Emoji", t, t + 1 + i[0].length));
      } }] };
      var wd = ln({ commentTokens: { block: { open: "<!--", close: "-->" } } }), $d = new A(), Pd = Od.configure({ props: [ft.add((n) => !n.is("Block") || n.is("Document") || ea(n) != null || hS(n) ? void 0 : (e, t) => ({ from: t.doc.lineAt(e.from).to, to: e.to })), $d.add(ea), ct.add({ Document: () => null }), Pt.add({ Document: wd })] });
      function ea(n) {
        let e = /^(?:ATX|Setext)Heading(\d)$/.exec(n.name);
        return e ? +e[1] : void 0;
      }
      function hS(n) {
        return n.name == "OrderedList" || n.name == "BulletList";
      }
      function cS(n, e) {
        let t = n;
        for (; ; ) {
          let i = t.nextSibling, r;
          if (!i || (r = ea(i.type)) != null && r <= e) break;
          t = i;
        }
        return t.to;
      }
      var fS = Tc.of((n, e, t) => {
        for (let i = W(n).resolveInner(t, -1); i && !(i.from < e); i = i.parent) {
          let r = i.type.prop($d);
          if (r == null) continue;
          let s = cS(i, r);
          if (s > t) return { from: t, to: s };
        }
        return null;
      });
      function ta(n) {
        return new fe(wd, n, [], "markdown");
      }
      var uS = ta(Pd), dS = Pd.configure([gd, yd, bd, Qd, { props: [ft.add({ Table: (n, e) => ({ from: e.doc.lineAt(n.from).to, to: n.to }) })] }]), Gr = ta(dS);
      function OS(n, e) {
        return (t) => {
          if (t && n) {
            let i = null;
            if (t = /\S*/.exec(t)[0], typeof n == "function" ? i = n(t) : i = on.matchLanguageName(n, t, true), i instanceof on) return i.support ? i.support.language.parser : rn.getSkippingParser(i.load());
            if (i) return i.parser;
          }
          return e ? e.parser : null;
        };
      }
      var wn = class {
        constructor(e, t, i, r, s, o, l) {
          this.node = e, this.from = t, this.to = i, this.spaceBefore = r, this.spaceAfter = s, this.type = o, this.item = l;
        }
        blank(e, t = true) {
          let i = this.spaceBefore + (this.node.name == "Blockquote" ? ">" : "");
          if (e != null) {
            for (; i.length < e; ) i += " ";
            return i;
          } else {
            for (let r = this.to - this.from - i.length - this.spaceAfter.length; r > 0; r--) i += " ";
            return i + (t ? this.spaceAfter : "");
          }
        }
        marker(e, t) {
          let i = this.node.name == "OrderedList" ? String(+Td(this.item, e)[2] + t) : "";
          return this.spaceBefore + i + this.type + this.spaceAfter;
        }
      };
      function vd(n, e) {
        let t = [], i = [];
        for (let r = n; r; r = r.parent) {
          if (r.name == "FencedCode") return i;
          (r.name == "ListItem" || r.name == "Blockquote") && t.push(r);
        }
        for (let r = t.length - 1; r >= 0; r--) {
          let s = t[r], o, l = e.lineAt(s.from), a = s.from - l.from;
          if (s.name == "Blockquote" && (o = /^ *>( ?)/.exec(l.text.slice(a)))) i.push(new wn(s, a, a + o[0].length, "", o[1], ">", null));
          else if (s.name == "ListItem" && s.parent.name == "OrderedList" && (o = /^( *)\d+([.)])( *)/.exec(l.text.slice(a)))) {
            let h7 = o[3], c = o[0].length;
            h7.length >= 4 && (h7 = h7.slice(0, h7.length - 4), c -= 4), i.push(new wn(s.parent, a, a + c, o[1], h7, o[2], s));
          } else if (s.name == "ListItem" && s.parent.name == "BulletList" && (o = /^( *)([-+*])( {1,4}\[[ xX]\])?( +)/.exec(l.text.slice(a)))) {
            let h7 = o[4], c = o[0].length;
            h7.length > 4 && (h7 = h7.slice(0, h7.length - 4), c -= 4);
            let f = o[2];
            o[3] && (f += o[3].replace(/[xX]/, " ")), i.push(new wn(s.parent, a, a + c, o[1], h7, f, s));
          }
        }
        return i;
      }
      function Td(n, e) {
        return /^(\s*)(\d+)(?=[.)])/.exec(e.sliceString(n.from, n.from + 10));
      }
      function Kl(n, e, t, i = 0) {
        for (let r = -1, s = n; ; ) {
          if (s.name == "ListItem") {
            let l = Td(s, e), a = +l[2];
            if (r >= 0) {
              if (a != r + 1) return;
              t.push({ from: s.from + l[1].length, to: s.from + l[0].length, insert: String(r + 2 + i) });
            }
            r = a;
          }
          let o = s.nextSibling;
          if (!o) break;
          s = o;
        }
      }
      function ia(n, e) {
        let t = /^[ \t]*/.exec(n)[0].length;
        if (!t || e.facet(Tt) != "	") return n;
        let i = Qe(n, 4, t), r = "";
        for (let s = i; s > 0; ) s >= 4 ? (r += "	", s -= 4) : (r += " ", s--);
        return r + n.slice(t);
      }
      var pS = (n = {}) => ({ state: e, dispatch: t }) => {
        let i = W(e), { doc: r } = e, s = null, o = e.changeByRange((l) => {
          if (!l.empty || !Gr.isActiveAt(e, l.from, -1) && !Gr.isActiveAt(e, l.from, 1)) return s = { range: l };
          let a = l.from, h7 = r.lineAt(a), c = vd(i.resolveInner(a, -1), r);
          for (; c.length && c[c.length - 1].from > a - h7.from; ) c.pop();
          if (!c.length) return s = { range: l };
          let f = c[c.length - 1];
          if (f.to - f.spaceAfter.length > a - h7.from) return s = { range: l };
          let u = a >= f.to - f.spaceAfter.length && !/\S/.test(h7.text.slice(f.to));
          if (f.item && u) {
            if (f.item.from < h7.from && !/^[\s>]*$/.test(h7.text.slice(0, f.to))) return s = { range: l };
            let S = f.node.firstChild, x = f.node.getChild("ListItem", "ListItem");
            if (S.to >= a || x && x.to < a || h7.from > 0 && !/[^\s>]/.test(r.lineAt(h7.from - 1).text) || n.nonTightLists === false) {
              let y = c.length > 1 ? c[c.length - 2] : null, R, T = "";
              y && y.item ? (R = h7.from + y.from, T = y.marker(r, 1)) : R = h7.from + (y ? y.to : 0);
              let Z = [{ from: R, to: a, insert: T }];
              return f.node.name == "OrderedList" && Kl(f.item, r, Z, -2), y && y.node.name == "OrderedList" && Kl(y.item, r, Z), { range: b.cursor(R + T.length), changes: Z };
            } else {
              let y = kd(c, e, h7);
              return { range: b.cursor(a + y.length + 1), changes: { from: h7.from, insert: y + e.lineBreak } };
            }
          }
          if (f.node.name == "Blockquote" && u && h7.from) {
            let S = r.lineAt(h7.from - 1), x = />\s*$/.exec(S.text);
            if (x && x.index == f.from) {
              let y = e.changes([{ from: S.from + x.index, to: S.to }, { from: h7.from + f.from, to: h7.to }]);
              return { range: l.map(y), changes: y };
            }
          }
          let d = [];
          f.node.name == "OrderedList" && Kl(f.item, r, d);
          let O = f.item && f.item.from < h7.from, m = "";
          if (!O || /^[\s\d.)\-+*>]*/.exec(h7.text)[0].length >= f.to) for (let S = 0, x = c.length - 1; S <= x; S++) m += S == x && !O ? c[S].marker(r, 1) : c[S].blank(S < x ? Qe(h7.text, 4, c[S + 1].from) - m.length : null);
          let g = a;
          for (; g > h7.from && /\s/.test(h7.text.charAt(g - h7.from - 1)); ) g--;
          return m = ia(m, e), gS(f.node, e.doc) && (m = kd(c, e, h7) + e.lineBreak + m), d.push({ from: g, to: a, insert: e.lineBreak + m }), { range: b.cursor(g + m.length + 1), changes: d };
        });
        return s ? false : (t(e.update(o, { scrollIntoView: true, userEvent: "input" })), true);
      }, mS = pS();
      function xd(n) {
        return n.name == "QuoteMark" || n.name == "ListMark";
      }
      function gS(n, e) {
        if (n.name != "OrderedList" && n.name != "BulletList") return false;
        let t = n.firstChild, i = n.getChild("ListItem", "ListItem");
        if (!i) return false;
        let r = e.lineAt(t.to), s = e.lineAt(i.from), o = /^[\s>]*$/.test(r.text);
        return r.number + (o ? 0 : 1) < s.number;
      }
      function kd(n, e, t) {
        let i = "";
        for (let r = 0, s = n.length - 2; r <= s; r++) i += n[r].blank(r < s ? Qe(t.text, 4, n[r + 1].from) - i.length : null, r < s);
        return ia(i, e);
      }
      function SS(n, e) {
        let t = n.resolveInner(e, -1), i = e;
        xd(t) && (i = t.from, t = t.parent);
        for (let r; r = t.childBefore(i); ) if (xd(r)) i = r.from;
        else if (r.name == "OrderedList" || r.name == "BulletList") t = r.lastChild, i = t.to;
        else break;
        return t;
      }
      var bS = ({ state: n, dispatch: e }) => {
        let t = W(n), i = null, r = n.changeByRange((s) => {
          let o = s.from, { doc: l } = n;
          if (s.empty && Gr.isActiveAt(n, s.from)) {
            let a = l.lineAt(o), h7 = vd(SS(t, o), l);
            if (h7.length) {
              let c = h7[h7.length - 1], f = c.to - c.spaceAfter.length + (c.spaceAfter ? 1 : 0);
              if (o - a.from > f && !/\S/.test(a.text.slice(f, o - a.from))) return { range: b.cursor(a.from + f), changes: { from: a.from + f, to: o } };
              if (o - a.from == f && (c.item && a.from <= c.item.from || /^[\s>]*$/.test(a.text.slice(0, c.to)))) {
                let u = a.from + c.from;
                if (c.item && c.node.from < c.item.from && /\S/.test(a.text.slice(c.from, c.to))) {
                  let d = c.blank(Qe(a.text, 4, c.to) - Qe(a.text, 4, c.from));
                  return u == a.from && (d = ia(d, n)), { range: b.cursor(u + d.length), changes: { from: u, to: a.from + c.to, insert: d } };
                }
                if (u < o) return { range: b.cursor(u), changes: { from: u, to: o } };
              }
            }
          }
          return i = { range: s };
        });
        return i ? false : (e(n.update(r, { scrollIntoView: true, userEvent: "delete" })), true);
      }, yS = [{ key: "Enter", run: mS }, { key: "Backspace", run: bS }], Cd = _r({ matchClosingTags: false });
      function Zd(n = {}) {
        let { codeLanguages: e, defaultCodeLanguage: t, addKeymap: i = true, base: { parser: r } = uS, completeHTMLTags: s = true, pasteURLAsLink: o = true, htmlTagLanguage: l = Cd } = n;
        if (!(r instanceof Qn)) throw new RangeError("Base parser provided to `markdown` should be a Markdown parser");
        let a = n.extensions ? [n.extensions] : [], h7 = [l.support, fS], c;
        o && h7.push(wS), t instanceof Be ? (h7.push(t.support), c = t.language) : t && (c = t);
        let f = e || c ? OS(e, c) : void 0;
        a.push(pd({ codeParser: f, htmlParser: l.language.parser })), i && h7.push(Fe.high(Gt.of(yS)));
        let u = ta(r.configure(a));
        return s && h7.push(u.data.of({ autocomplete: QS })), new Be(u, h7);
      }
      function QS(n) {
        let { state: e, pos: t } = n, i = /<[:\-\.\w\u00b7-\uffff]*$/.exec(e.sliceDoc(t - 25, t));
        if (!i) return null;
        let r = W(e).resolveInner(t, -1);
        for (; r && !r.type.isTop; ) {
          if (r.name == "CodeBlock" || r.name == "FencedCode" || r.name == "ProcessingInstructionBlock" || r.name == "CommentBlock" || r.name == "Link" || r.name == "Image") return null;
          r = r.parent;
        }
        return { from: t - i[0].length, to: t, options: xS(), validFor: /^<[:\-\.\w\u00b7-\uffff]*$/ };
      }
      var Jl = null;
      function xS() {
        if (Jl) return Jl;
        let n = Lu(new Mr(D.create({ extensions: Cd }), 0, true));
        return Jl = n ? n.options : [];
      }
      var kS = /code|horizontalrule|html|link|comment|processing|escape|entity|image|mark|url/i, wS = C.domEventHandlers({ paste: (n, e) => {
        var t;
        let { main: i } = e.state.selection;
        if (i.empty) return false;
        let r = (t = n.clipboardData) === null || t === void 0 ? void 0 : t.getData("text/plain");
        if (!r || !/^(https?:\/\/|mailto:|xmpp:|www\.)/.test(r) || (/^www\./.test(r) && (r = "https://" + r), !Gr.isActiveAt(e.state, i.from, 1))) return false;
        let s = W(e.state), o = false;
        return s.iterate({ from: i.from, to: i.to, enter: (l) => {
          (l.from > i.from || kS.test(l.name)) && (o = true);
        }, leave: (l) => {
          l.to < i.to && (o = true);
        } }), o ? false : (e.dispatch({ changes: [{ from: i.from, insert: "[" }, { from: i.to, insert: `](${r})` }], userEvent: "input.paste", scrollIntoView: true }), true);
      } });
      return module2.exports;
    })();
  }
  return _cmApi;
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
function cmLanguage(ext) {
  const cm = cmApi();
  const key = editorLanguageFor(ext);
  if (key === "typescript") return [cm.javascript({ typescript: true, jsx: true })];
  if (key === "javascript") return [cm.javascript({ jsx: true })];
  if (key === "css") return [cm.css()];
  if (key === "html") return [cm.html()];
  if (key === "markdown") return [cm.markdown()];
  return [];
}
function cmTheme() {
  const cm = cmApi();
  return [
    cm.syntaxHighlighting(cm.HighlightStyle.define([
      { tag: cm.tags.keyword, color: "var(--shiki-token-keyword)" },
      { tag: cm.tags.string, color: "var(--shiki-token-string)" },
      { tag: cm.tags.comment, color: "var(--shiki-token-comment)" },
      { tag: cm.tags.number, color: "var(--shiki-token-constant)" },
      { tag: cm.tags.bool, color: "var(--shiki-token-constant)" },
      { tag: cm.tags.function(cm.tags.variableName), color: "var(--shiki-token-function)" },
      { tag: cm.tags.definition(cm.tags.variableName), color: "var(--shiki-token-function)" },
      { tag: cm.tags.operator, color: "var(--shiki-token-punctuation)" },
      { tag: cm.tags.punctuation, color: "var(--shiki-token-punctuation)" },
      { tag: cm.tags.typeName, color: "var(--shiki-token-parameter)" },
      { tag: cm.tags.propertyName, color: "var(--shiki-token-parameter)" },
      { tag: cm.tags.attributeName, color: "var(--shiki-token-parameter)" },
      { tag: cm.tags.link, color: "var(--shiki-token-link)" },
      { tag: cm.tags.url, color: "var(--shiki-token-link)" }
    ])),
    cm.EditorView.theme({
      "&": { height: "100%", fontSize: "12px", color: "var(--dsw-alias-label-primary)", backgroundColor: "transparent" },
      ".cm-content": { fontFamily: "var(--ds-font-family-code)", lineHeight: "1.6", padding: "8px 0" },
      ".cm-line": { padding: "0 10px" },
      ".cm-gutters": { backgroundColor: "transparent", color: "var(--dsw-alias-label-tertiary)", border: "none", fontSize: "11px" },
      ".cm-activeLine": { backgroundColor: "var(--dsw-alias-interactive-bg-hover)" },
      ".cm-activeLineGutter": { backgroundColor: "transparent" },
      ".cm-cursor": { borderLeftColor: "var(--dsw-alias-label-primary)" },
      ".cm-selectionBackground": { backgroundColor: "var(--dsw-alias-markdown-code-segment-selected)" },
      "&.cm-focused": { outline: "none" }
    })
  ];
}
function cmSetup(ext, readOnly) {
  const cm = cmApi();
  return [
    cm.lineNumbers(),
    cm.highlightActiveLine(),
    cm.highlightActiveLineGutter(),
    cm.history(),
    cm.bracketMatching(),
    cm.indentOnInput(),
    cm.keymap.of([...cm.defaultKeymap, ...cm.historyKeymap, cm.indentWithTab]),
    readOnly ? cm.EditorState.readOnly.of(true) : [],
    readOnly ? cm.EditorView.editable.of(false) : [],
    ...cmLanguage(ext),
    ...cmTheme()
  ];
}
var MAX_TEXT_EDIT = 1024 * 1024;
function htmlPreviewSrc(text, dir) {
  return text.replace(/(\b(?:src|href)\s*=\s*)(["'])([^"']*)\2/gi, (all, prefix, quote, value) => {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(value) || value.includes("..")) return all;
    return prefix + quote + assetUrl(dir === "" ? value : dir + "/" + value) + quote;
  });
}

// src/client/preview.js
var h4 = import_react4.default.createElement;
var { useState: useState2, useEffect, useRef: useRef2 } = import_react4.default;
var PREVIEW_KIND = { md: "markdown", markdown: "markdown", mdx: "markdown", html: "html", htm: "html" };
function FilePreview(props) {
  const file = props.file;
  const kind = classifyFile(file.name);
  const dot = file.name.lastIndexOf(".");
  const ext = dot > 0 ? file.name.slice(dot + 1).toLowerCase() : "";
  const lang = HL_LANG_BY_EXT[ext];
  const previewKind = PREVIEW_KIND[ext] ?? null;
  const [state, setState] = useState2({ status: "loading", content: "", truncated: false });
  const [view, setView] = useState2(previewKind !== null ? "preview" : "source");
  const [dirty, setDirty] = useState2(false);
  const [saving, setSaving] = useState2(false);
  const [flash, setFlash] = useState2(false);
  const [saveError, setSaveError] = useState2(null);
  const editorHostRef = useRef2(null);
  const editorViewRef = useRef2(null);
  const currentPathRef = useRef2(file.path);
  useEffect(() => {
    if (kind !== "text") return;
    const controller = new AbortController();
    setState({ status: "loading", content: "", truncated: false });
    fetch("/workbench/file?path=" + encodeURIComponent(file.path) + "&full=1", { signal: controller.signal }).then((response) => response.json()).then((body2) => {
      if (controller.signal.aborted) return;
      if (body2.ok !== true) {
        setState({ status: "error", content: "", truncated: false, error: body2.error || "\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25" });
        return;
      }
      setState({ status: "ready", content: body2.content || "", truncated: body2.truncated === true });
    }).catch((error) => {
      if (controller.signal.aborted) return;
      setState({ status: "error", content: "", truncated: false, error: error instanceof Error ? error.message : String(error) });
    });
    return () => controller.abort();
  }, [file.path, kind]);
  useEffect(() => {
    if (kind !== "text" || state.status !== "ready") return;
    const host = editorHostRef.current;
    if (host === null || editorViewRef.current !== null) return;
    const cm = cmApi();
    const readOnly = state.truncated === true;
    const view2 = new cm.EditorView({
      state: cm.EditorState.create({
        doc: state.content,
        extensions: [
          ...cmSetup(ext, readOnly),
          cm.EditorView.updateListener.of((update) => {
            if (update.docChanged) setDirty(true);
          })
        ]
      }),
      parent: host
    });
    editorViewRef.current = view2;
    return () => {
      view2.destroy();
      editorViewRef.current = null;
    };
  }, [kind, state.status, file.path, ext]);
  useEffect(() => {
    currentPathRef.current = file.path;
    setDirty(false);
    setSaving(false);
    setFlash(false);
    setSaveError(null);
  }, [file.path]);
  useEffect(() => {
    setView(previewKind !== null ? "preview" : "source");
  }, [file.path, previewKind]);
  const back = props.back === false ? null : h4(TipButton, { tip: "\u8FD4\u56DE\u76EE\u5F55", className: "dwb-minibtn", onClick: props.onClose }, h4("span", null, "\u2190"));
  const subtitle = (file.size !== void 0 ? formatSize(file.size) : "") + (kind === "other" ? " \xB7 " + file.name.split(".").pop() + " \u7C7B\u578B" : "");
  const saveFile = () => {
    const view2 = editorViewRef.current;
    if (view2 === null || saving || !dirty) return;
    const content = view2.state.doc.toString();
    const savedPath = file.path;
    setSaving(true);
    setSaveError(null);
    fetch("/workbench/write", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: file.path, content })
    }).then((response) => response.json().catch(() => ({ ok: false, error: "\u4FDD\u5B58\u5931\u8D25\uFF08HTTP " + response.status + "\uFF09\u2014\u2014\u5BBF\u4E3B\u5199\u8DEF\u7531\u672A\u5C31\u7EEA\uFF1F\u8BF7\u91CD\u542F dsh web" }))).then((body2) => {
      if (currentPathRef.current !== savedPath) return;
      setSaving(false);
      if (body2.ok !== true) {
        setSaveError(body2.error || "\u4FDD\u5B58\u5931\u8D25");
        return;
      }
      setDirty(false);
      setFlash(true);
      window.setTimeout(() => setFlash(false), 1500);
      setState((s) => ({ ...s, content, truncated: false, status: "ready" }));
    }).catch((error) => {
      if (currentPathRef.current !== savedPath) return;
      setSaving(false);
      setSaveError(error instanceof Error ? error.message : String(error));
    });
  };
  const openInVscode = () => {
    setSaveError(null);
    const openedPath = file.path;
    fetch("/workbench/open", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: file.path })
    }).then((response) => response.json().catch(() => ({ ok: false, error: "\u6253\u5F00\u5931\u8D25\uFF08HTTP " + response.status + "\uFF09\u2014\u2014\u5BBF\u4E3B\u8DEF\u7531\u672A\u5C31\u7EEA\uFF1F\u8BF7\u91CD\u542F dsh web" }))).then((body2) => {
      if (currentPathRef.current !== openedPath) return;
      if (body2.ok !== true) setSaveError(body2.error || "\u6253\u5F00\u5931\u8D25");
    }).catch((error) => {
      if (currentPathRef.current !== openedPath) return;
      setSaveError(error instanceof Error ? error.message : String(error));
    });
  };
  const editable = kind === "text" && state.status === "ready" && state.truncated !== true;
  const header = h4(
    "div",
    { className: "dwb-previewheader" },
    back,
    h4(
      "div",
      { className: "dwb-previewmeta" },
      h4("div", { className: "dwb-previewname", title: file.path }, file.name),
      h4("div", { className: "dwb-previewsub" }, subtitle)
    ),
    kind === "text" ? h4(
      "div",
      { className: "dwb-previewactions" },
      previewKind !== null ? h4(
        "div",
        { className: "dwb-viewgroup" },
        h4(TipButton, { tip: "\u6E90\u7801", className: "dwb-viewgroupbtn", active: view === "source" || void 0, onClick: () => setView("source") }, codeIcon()),
        h4(TipButton, { tip: "\u9884\u89C8", className: "dwb-viewgroupbtn", active: view === "preview" || void 0, onClick: () => setView("preview") }, eyeIcon())
      ) : null,
      editable ? h4(TipButton, { tip: "\u5728 VS Code \u4E2D\u6253\u5F00", className: "dwb-minibtn", onClick: openInVscode }, vscodeIcon()) : null,
      editable ? h4(
        TipButton,
        {
          tip: saving ? "\u4FDD\u5B58\u4E2D\u2026" : flash ? "\u5DF2\u4FDD\u5B58" : dirty ? "\u4FDD\u5B58" : "\u5DF2\u4FDD\u5B58",
          className: "dwb-minibtn dwb-savebtn" + (flash ? " dwb-savebtn-ok" : ""),
          disabled: saving || !dirty && !flash || void 0,
          onClick: saveFile
        },
        saving ? h4("span", { className: "dwb-spin" }, refreshIcon()) : flash ? checkIcon() : saveIcon()
      ) : null
    ) : null,
    props.back !== false ? null : h4(TipButton, { tip: "\u5173\u95ED\u9884\u89C8", className: "dwb-minibtn", onClick: props.onClose }, closeIcon())
  );
  let body;
  if (kind === "text") {
    if (state.status === "loading") {
      body = h4("div", { className: "dwb-previewnote" }, "\u52A0\u8F7D\u4E2D\u2026");
    } else if (state.status === "error") {
      body = h4("div", { className: "dwb-previewnote", "data-error": true }, state.error);
    } else {
      const dir = file.path.slice(0, file.path.lastIndexOf("/"));
      const inPreview = previewKind !== null && view === "preview";
      const pieces = [
        h4("div", {
          key: "editor",
          ref: editorHostRef,
          className: "dwb-editor",
          "data-hidden": inPreview || void 0
        })
      ];
      if (previewKind === "markdown" && view === "preview") {
        pieces.push(h4("div", { key: "md", className: "dwb-preview-md", dangerouslySetInnerHTML: { __html: renderMarkdown(state.content, dir) } }));
      } else if (previewKind === "html" && view === "preview") {
        pieces.push(h4("iframe", { key: "html", className: "dwb-preview-frame", sandbox: "allow-scripts", srcDoc: htmlPreviewSrc(state.content, dir), title: file.name }));
      }
      body = h4(
        "div",
        { className: "dwb-previewscroll dwb-editorscroll" },
        ...pieces,
        state.truncated ? h4("div", { className: "dwb-note" }, "\uFF08\u6587\u4EF6\u8D85\u8FC7 1MB\uFF0C\u4EC5\u52A0\u8F7D\u5F00\u5934\uFF0C\u7F16\u8F91\u5DF2\u7981\u7528\uFF09") : null,
        saveError !== null ? h4("div", { className: "dwb-note", "data-error": true }, saveError) : null
      );
    }
  } else if (kind === "image") {
    body = h4(
      "div",
      { className: "dwb-previewscroll" },
      h4("div", { className: "dwb-previewmedia" }, h4("img", { className: "dwb-previewimg", src: assetUrl(file.path), alt: file.name }))
    );
  } else if (kind === "audio") {
    body = h4(
      "div",
      { className: "dwb-previewscroll" },
      h4("audio", { className: "dwb-previewaudio", controls: true, src: assetUrl(file.path) })
    );
  } else if (kind === "video") {
    body = h4(
      "div",
      { className: "dwb-previewscroll" },
      h4("video", { className: "dwb-previewvideo", controls: true, src: assetUrl(file.path) })
    );
  } else {
    body = h4(
      "div",
      { className: "dwb-previewscroll" },
      h4(
        "div",
        { className: "dwb-previewnote" },
        h4("div", { className: "dwb-emptyicon" }, fileIconFor(file.name)),
        h4("div", null, "\u65E0\u6CD5\u9884\u89C8\u6B64\u6587\u4EF6\u7C7B\u578B"),
        file.size !== void 0 ? h4("div", null, formatSize(file.size)) : null
      )
    );
  }
  return h4("div", { className: "dwb-preview" }, header, body);
}

// src/client/git-view.js
var import_react5 = __toESM(require("react"), 1);
var h5 = import_react5.default.createElement;
function GitView(props) {
  const state = props.state;
  if (state.status === "loading") return h5("div", { className: "dwb-scroll" }, h5("div", { className: "dwb-note" }, "\u52A0\u8F7D\u4E2D\u2026"));
  if (state.status === "idle") return h5("div", { className: "dwb-scroll" }, h5("div", { className: "dwb-note" }, "\u65E0\u5DE5\u4F5C\u76EE\u5F55\uFF08\u672A\u9009\u62E9\u4F1A\u8BDD\u4E14\u672A\u624B\u52A8\u6307\u5B9A\u8DEF\u5F84\uFF09"));
  if (state.status === "error") {
    return h5("div", { className: "dwb-scroll" }, h5(
      "div",
      { className: "dwb-emptygit" },
      h5("div", { className: "dwb-emptytitle" }, "Git \u6570\u636E\u52A0\u8F7D\u5931\u8D25"),
      h5("div", { className: "dwb-emptyhint" }, state.error)
    ));
  }
  if (state.status === "not-repo") {
    const noGitBinary = state.error !== void 0 && state.error.indexOf("ENOENT") !== -1;
    return h5("div", { className: "dwb-scroll" }, h5(
      "div",
      { className: "dwb-emptygit" },
      h5(
        "svg",
        { className: "dwb-emptyicon", viewBox: "0 0 24 24", width: "28", height: "28", fill: "none", stroke: "currentColor", strokeWidth: "1.5", "aria-hidden": true },
        h5("circle", { cx: "6", cy: "5", r: "2.2" }),
        h5("circle", { cx: "6", cy: "19", r: "2.2" }),
        h5("circle", { cx: "18", cy: "9", r: "2.2" }),
        h5("path", { d: "M6 7.2v9.6" }),
        h5("path", { d: "M18 11.2c0 4-6 3.4-9.4 5" })
      ),
      h5("div", { className: "dwb-emptytitle" }, noGitBinary ? "\u672A\u627E\u5230 git \u547D\u4EE4" : "\u8FD9\u4E2A\u76EE\u5F55\u4E0D\u662F Git \u4ED3\u5E93"),
      h5("div", { className: "dwb-emptyhint" }, noGitBinary ? "\u8BF7\u5148\u5B89\u88C5 git\uFF0C\u6216\u786E\u8BA4\u5B83\u5728 PATH \u4E2D\uFF0C\u7136\u540E\u70B9\u53F3\u4E0A\u89D2\u5237\u65B0\u3002" : "\u5728\u4E0A\u65B9\u8DEF\u5F84\u6846\u91CC\u8F93\u5165\u4E00\u4E2A Git \u4ED3\u5E93\u7684\u8DEF\u5F84\uFF0C\u5C31\u80FD\u770B\u5230\u5206\u652F\u3001\u63D0\u4EA4\u56FE\u548C\u5DE5\u4F5C\u533A\u53D8\u66F4\uFF1B\u4E5F\u53EF\u4EE5\u76F4\u63A5\u5728\u6B64\u76EE\u5F55\u521D\u59CB\u5316\u4E00\u4E2A\u4ED3\u5E93\u3002"),
      noGitBinary ? null : h5(TipButton, {
        tip: "\u4E00\u952E\u521B\u5EFA\u4ED3\u5E93\uFF08git init\uFF0C\u9ED8\u8BA4\u5206\u652F\u968F\u5BBF\u4E3B\u673A\u914D\u7F6E\uFF09",
        className: "dwb-initbtn",
        onClick: props.onInit,
        disabled: props.initializing
      }, props.initializing ? h5("span", { className: "dwb-spin" }, refreshIcon()) : createIcon())
    ));
  }
  const anyUnstaged = state.changes.some((change) => !stagedOf(change.code));
  return h5(
    "div",
    { className: props.refreshing ? "dwb-scroll dwb-busy" : "dwb-scroll" },
    h5(
      "div",
      { className: "dwb-branch" },
      h5("span", { className: "dwb-branchlabel" }, "\u5206\u652F"),
      state.branch,
      h5("span", { className: "dwb-pill" }, state.graph.length + " \u6761\u63D0\u4EA4")
    ),
    h5("div", { className: "dwb-section" }, "\u63D0\u4EA4\u56FE"),
    state.graph.length === 0 ? h5("div", { className: "dwb-note" }, "\uFF08\u65E0\u63D0\u4EA4\u8BB0\u5F55\uFF09") : h5("div", { className: "dwb-graph" }, state.graph.map((row, index) => {
      const isHead = row.hash !== "" && row.hash === state.head;
      return h5(
        "div",
        {
          key: index,
          className: "dwb-graphrow",
          "data-head": isHead || void 0,
          title: row.author !== "" ? row.author + " \xB7 " + row.date : void 0
        },
        h5("span", { className: "dwb-graphcol" }, row.graph === "" ? " " : row.graph),
        row.hash !== "" ? h5("span", { className: "dwb-hash" }, row.hash) : null,
        row.subject !== "" ? h5("span", { className: "dwb-graphsubject" }, row.subject) : null,
        isHead ? h5("span", { className: "dwb-headtag" }, "HEAD") : null
      );
    })),
    h5(
      "div",
      { className: "dwb-section" },
      "\u5DE5\u4F5C\u533A\u53D8\u66F4",
      anyUnstaged ? h5(TipButton, { tip: "\u5168\u90E8\u6682\u5B58", className: "dwb-minibtn", onClick: props.onStageAll, disabled: props.mutating }, trayDownIcon()) : null,
      h5(TipButton, {
        tip: props.showIgnored ? "\u9690\u85CF\u5FFD\u7565\u6587\u4EF6" : "\u663E\u793A\u5FFD\u7565\u6587\u4EF6",
        className: props.showIgnored ? "dwb-minibtn dwb-minibtnactive" : "dwb-minibtn",
        active: props.showIgnored,
        onClick: props.onToggleIgnored,
        disabled: props.mutating
      }, props.showIgnored ? eyeIcon() : eyeOffIcon())
    ),
    state.changes.length === 0 ? h5("div", { className: "dwb-note" }, "\uFF08\u5DE5\u4F5C\u533A\u5E72\u51C0\uFF09") : state.changes.map((change) => {
      const staged = stagedOf(change.code);
      const untracked = change.code.trim() === "??";
      return h5(
        "div",
        { key: change.code + ":" + change.path, className: "dwb-change", "data-path": change.path },
        h5("span", { className: "dwb-badge", "data-kind": badgeKind(change.code) }, change.code.trim() || change.code),
        h5("span", { className: "dwb-changepath" }, change.path),
        untracked ? h5(TipButton, { tip: "\u5FFD\u7565 " + change.path, className: "dwb-stagebtn", onClick: () => props.onIgnore(change.path), disabled: props.mutating }, banIcon()) : null,
        h5(TipButton, {
          tip: (staged ? "\u53D6\u6D88\u6682\u5B58" : "\u6682\u5B58") + " " + change.path,
          className: "dwb-stagebtn",
          onClick: () => (staged ? props.onUnstage : props.onStage)(change.path),
          disabled: props.mutating
        }, staged ? minusIcon() : plusIcon())
      );
    }),
    props.showIgnored ? h5(
      import_react5.default.Fragment,
      null,
      h5("div", { className: "dwb-section" }, "\u5FFD\u7565\u7684\u6587\u4EF6"),
      state.ignored.length === 0 ? h5("div", { className: "dwb-note" }, "\uFF08\u65E0\u5FFD\u7565\u6587\u4EF6\uFF09") : state.ignored.map((path) => h5(
        "div",
        { key: path, className: "dwb-change", "data-path": path },
        h5("span", { className: "dwb-badge", "data-kind": "!" }, "!!"),
        h5("span", { className: "dwb-changepath" }, path),
        h5(TipButton, { tip: "\u53D6\u6D88\u5FFD\u7565 " + path, className: "dwb-stagebtn", onClick: () => props.onUnignore(path), disabled: props.mutating }, undoIcon())
      ))
    ) : null,
    h5("div", { className: "dwb-section" }, "\u63D0\u4EA4"),
    h5(
      "div",
      { className: "dwb-commitrow" },
      h5("input", {
        className: "dwb-commitinput",
        value: props.commitMessage,
        placeholder: "\u63D0\u4EA4\u4FE1\u606F",
        spellCheck: false,
        onChange: (event) => props.setCommitMessage(event.target.value),
        onKeyDown: (event) => {
          if (event.key === "Enter" && props.commitMessage.trim() !== "" && !props.mutating) props.onCommit();
        }
      }),
      h5(TipButton, {
        tip: "\u63D0\u4EA4",
        className: "dwb-commitbtn",
        onClick: props.onCommit,
        disabled: props.mutating || props.commitMessage.trim() === ""
      }, props.mutating ? h5("span", { className: "dwb-spin" }, refreshIcon()) : checkIcon())
    ),
    props.actionError !== void 0 ? h5("div", { className: "dwb-note", "data-error": true }, props.actionError) : null
  );
}

// src/client/panel.js
var h6 = import_react6.default.createElement;
var { useState: useState3, useEffect: useEffect2, useCallback, useRef: useRef3 } = import_react6.default;
function WorkbenchPanel(props) {
  const useSessions = props.useSessions;
  const cwd = typeof useSessions === "function" ? useSessions((list) => {
    if (list.current === void 0) return void 0;
    const row = list.byId[list.current];
    return row === void 0 ? void 0 : row.cwd;
  }) : void 0;
  const [open, setOpen] = useState3(false);
  const [tab, setTab] = useState3("files");
  const [refreshing, setRefreshing] = useState3(false);
  const [root, setRoot] = useState3(null);
  const [pathOverride, setPathOverride] = useState3(void 0);
  const [git, setGit] = useState3({ status: "idle" });
  const [initializing, setInitializing] = useState3(false);
  const [mutating, setMutating] = useState3(false);
  const [actionError, setActionError] = useState3(void 0);
  const [commitMessage, setCommitMessage] = useState3("");
  const [showIgnored, setShowIgnored] = useState3(false);
  const [selected, setSelected] = useState3(null);
  const [width, setWidth] = useState3(() => Math.max(PANEL_MIN, readStored(WIDTH_KEY, PANEL_DEFAULT)));
  const [treeWidth, setTreeWidth] = useState3(() => readStored(SPLIT_KEY, TREE_DEFAULT));
  const [maxWidth, setMaxWidth] = useState3(() => window.innerWidth - PANEL_MIN);
  const [resizing, setResizing] = useState3(false);
  const [splitting, setSplitting] = useState3(false);
  const rootRef = useRef3(null);
  const resizeOrigin = useRef3({ x: 0, width });
  const splitOrigin = useRef3({ x: 0, width: treeWidth });
  const path = pathOverride !== void 0 ? pathOverride : cwd;
  useEffect2(() => {
    setPathOverride(void 0);
  }, [cwd]);
  useEffect2(() => {
    setCommitMessage("");
  }, [path]);
  useEffect2(() => {
    setSelected(null);
  }, [path]);
  const writeTimerRef = useRef3(null);
  const debouncedWrite = (key, value) => {
    if (writeTimerRef.current !== null) clearTimeout(writeTimerRef.current);
    writeTimerRef.current = setTimeout(() => {
      writeTimerRef.current = null;
      writeStored(key, value);
    }, 150);
  };
  const widthRef = useRef3(width);
  const treeWidthRef = useRef3(treeWidth);
  widthRef.current = width;
  treeWidthRef.current = treeWidth;
  const tweenRef = useRef3(null);
  const tweeningRef = useRef3(false);
  const stopTween = () => {
    if (tweenRef.current !== null) {
      cancelAnimationFrame(tweenRef.current);
      tweenRef.current = null;
    }
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
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = cubicBezierEase(t);
      setWidth(clampPanelWidth(from + (target - from) * eased, maxWidthRef.current, floor));
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
    const savedTree = treeWidthRef.current;
    animateWidthTo(0, {
      floor: 0,
      persist: false,
      onEnd: () => {
        setWidth(PANEL_MIN);
        setTreeWidth(clampTreeWidth(savedTree, PANEL_MIN));
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
    const savedTree = treeWidthRef.current;
    setOpen(true);
    setWidth(0);
    requestAnimationFrame(() => {
      animateWidthTo(target, {
        floor: 0,
        persist: false,
        onEnd: () => {
          setTreeWidth(clampTreeWidth(savedTree, target));
        }
      });
    });
  };
  useEffect2(() => {
    if (!tweeningRef.current) debouncedWrite(WIDTH_KEY, width);
  }, [width]);
  useEffect2(() => {
    debouncedWrite(SPLIT_KEY, treeWidth);
  }, [treeWidth]);
  const prevWidthRef = useRef3(width);
  useEffect2(() => {
    const previous = prevWidthRef.current;
    prevWidthRef.current = width;
    if (width >= previous) return;
    setTreeWidth((current) => {
      const next = clampTreeWidth(current, width);
      return next === current ? current : next;
    });
  }, [width]);
  useEffect2(() => () => {
    if (writeTimerRef.current !== null) clearTimeout(writeTimerRef.current);
    stopTween();
    writeStored(WIDTH_KEY, widthRef.current);
    writeStored(SPLIT_KEY, treeWidthRef.current);
  }, []);
  useEffect2(() => {
    const measure = () => {
      const el2 = rootRef.current;
      if (el2 === null) return;
      const layer2 = el2.offsetParent;
      const frame2 = layer2 !== null ? layer2.parentElement : null;
      const sidebar2 = frame2 !== null && frame2.firstElementChild !== null ? frame2.firstElementChild : null;
      const sidebarWidth = sidebar2 !== null ? sidebar2.getBoundingClientRect().width : 0;
      const frameWidth = frame2 !== null ? frame2.getBoundingClientRect().width : window.innerWidth;
      setMaxWidth(Math.max(PANEL_MIN, Math.round(frameWidth - sidebarWidth)));
    };
    measure();
    window.addEventListener("resize", measure);
    let observer = null;
    const el = rootRef.current;
    const layer = el !== null ? el.offsetParent : null;
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
  const maxWidthRef = useRef3(maxWidth);
  useEffect2(() => {
    const previous = maxWidthRef.current;
    maxWidthRef.current = maxWidth;
    if (maxWidth === previous) return;
    if (tweeningRef.current) return;
    setWidth((current) => {
      if (current >= previous - 2) return clampPanelWidth(maxWidth, maxWidth);
      return clampPanelWidth(current, maxWidth);
    });
  }, [maxWidth]);
  const [pathText, setPathText] = useState3(path || "");
  useEffect2(() => {
    setPathText(path || "");
  }, [path]);
  const applyPath = () => {
    const trimmed = pathText.trim();
    setPathOverride(trimmed.length > 0 && trimmed !== cwd ? trimmed : void 0);
  };
  const resizeDragMoved = useRef3(false);
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
  const onDividerPointerDown = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    splitOrigin.current = { x: event.clientX, width: treeWidth };
    setSplitting(true);
  };
  const onDividerPointerMove = (event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const dx = event.clientX - splitOrigin.current.x;
    setTreeWidth(clampTreeWidth(splitOrigin.current.width + dx, width));
  };
  const onDividerPointerUp = (event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setSplitting(false);
  };
  const onSelect = (node) => {
    if (width < TREE_MIN + CONTENT_MIN) {
      animateWidthTo(clampPanelWidth(AUTO_WIDEN, maxWidthRef.current), { floor: PANEL_MIN, persist: true });
    }
    setSelected(node);
  };
  const onClosePreview = () => {
    setSelected(null);
  };
  const listDir = useCallback(async (dirPath, signal) => {
    const options = signal === void 0 ? {} : { signal };
    const response = await fetch("/workbench/dir?path=" + encodeURIComponent(dirPath), options);
    return response.json();
  }, []);
  useEffect2(() => {
    if (path === void 0) {
      setRoot(null);
      return;
    }
    const controller = new AbortController();
    const base = {
      path,
      name: path.split("/").filter((segment) => segment !== "").pop() || path,
      type: "directory",
      hidden: false,
      expanded: true,
      loading: true,
      loaded: false,
      children: []
    };
    setRoot(base);
    listDir(path, controller.signal).then((listing) => {
      if (controller.signal.aborted) return;
      if (listing.ok !== true) {
        setRoot(Object.assign({}, base, { loading: false, error: listing.error || "\u76EE\u5F55\u8BFB\u53D6\u5931\u8D25" }));
        return;
      }
      const next = Object.assign({}, base, { loading: false, loaded: true, children: (listing.entries || []).map(toNode) });
      if (listing.truncated !== void 0) next.truncated = listing.truncated;
      setRoot(next);
    }).catch((error) => {
      if (controller.signal.aborted) return;
      setRoot(Object.assign({}, base, { loading: false, error: messageOf(error) }));
    });
    return () => controller.abort();
  }, [path, listDir]);
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
  const loadGitState = useCallback(async (target, signal, withIgnored) => {
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
  useEffect2(() => {
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
  const onToggle = (dirPath) => {
    if (root === null) return;
    const node = findNode(root, dirPath);
    if (node === void 0 || node.loading) return;
    if (node.loaded) {
      setRoot(patchNode(root, dirPath, { expanded: !node.expanded }));
      return;
    }
    setRoot(patchNode(root, dirPath, { loading: true }));
    const rootPathAtToggle = root.path;
    listDir(dirPath).then((listing) => {
      setRoot((current) => {
        if (current === null) return current;
        if (current.path !== rootPathAtToggle) return current;
        const patch = { loading: false, loaded: true, expanded: true };
        if (listing.ok === true) {
          if (listing.truncated !== void 0) patch.truncated = listing.truncated;
          patch.children = (listing.entries || []).map(toNode);
        } else {
          patch.error = listing.error || "\u76EE\u5F55\u8BFB\u53D6\u5931\u8D25";
        }
        return patchNode(current, dirPath, patch);
      });
    }).catch((error) => {
      setRoot((current) => {
        if (current === null || current.path !== rootPathAtToggle) return current;
        return patchNode(current, dirPath, { loading: false, error: messageOf(error) });
      });
    });
  };
  const refreshNode = async (node) => {
    if (!node.loaded) return;
    try {
      const listing = await listDir(node.path);
      if (listing.ok === true) {
        setRoot((current) => {
          if (current === null) return current;
          const patch = { children: (listing.entries || []).map((entry) => {
            const previous = node.children.find((child) => child.path === entry.path);
            return previous === void 0 ? toNode(entry) : Object.assign({}, previous, { name: entry.name, hidden: entry.hidden });
          }) };
          if (listing.truncated !== void 0) patch.truncated = listing.truncated;
          return patchNode(current, node.path, patch);
        });
      }
    } catch {
    }
    await Promise.all(
      node.children.filter((child) => child.loaded && child.expanded).map((child) => refreshNode(child))
    );
  };
  const refresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    const tasks = [];
    if (root !== null) tasks.push(refreshNode(root));
    if (path !== void 0) tasks.push(loadGitState(path, void 0, showIgnored));
    Promise.allSettled(tasks).then(() => setRefreshing(false));
  };
  if (!open) {
    return h6(TipButton, { tip: "\u5C55\u5F00\u5DE5\u4F5C\u9762\u677F", className: "dwb-openbtn", onClick: openPanel }, "\u5DE5\u4F5C\u9762\u677F");
  }
  const splitMode = selected !== null;
  return h6(
    import_react6.default.Fragment,
    null,
    h6(
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
      h6(
        "div",
        {
          className: "dwb-resize-grip",
          title: width > PANEL_MIN ? "\u5355\u51FB\u7F29\u81F3\u6700\u7A84\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09" : "\u5355\u51FB\u6536\u8D77\u9762\u677F\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09"
        },
        h6("span", { className: "dwb-resize-arrow" }, h6(IconFrame, { size: 13 }, h6("path", { d: "M9 6l6 6-6 6" })))
      )
    ),
    h6(
      "div",
      {
        ref: rootRef,
        className: "dwb-root" + (resizing || splitting ? " dwb-dragging" : ""),
        style: { width: width + "px" }
      },
      h6(
        "div",
        { className: "dwb-header" },
        h6("span", { className: "dwb-title" }, "\u5DE5\u4F5C\u9762\u677F"),
        h6("input", {
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
        h6(
          TipButton,
          { tip: "\u5237\u65B0", className: "dwb-iconbtn", onClick: refresh, disabled: refreshing },
          h6("span", { className: refreshing ? "dwb-spin" : void 0 }, refreshIcon())
        ),
        h6(TipButton, { tip: "\u6536\u8D77\uFF08\u518D\u6B21\u70B9\u51FB\u5173\u95ED\uFF09", className: "dwb-iconbtn", onClick: collapseOrHide }, closeIcon())
      ),
      h6(
        "div",
        { className: "dwb-tabs" },
        h6("button", {
          type: "button",
          className: "dwb-tabbtn",
          "data-active": tab === "files" || void 0,
          "aria-label": "\u76EE\u5F55",
          onClick: () => setTab("files")
        }, "\u76EE\u5F55"),
        h6("button", {
          type: "button",
          className: "dwb-tabbtn",
          "data-active": tab === "git" || void 0,
          "aria-label": "Git",
          onClick: () => setTab("git")
        }, "Git")
      ),
      tab === "files" ? splitMode ? h6(
        "div",
        { className: "dwb-split" },
        h6(
          "div",
          { className: "dwb-split-pane", style: { width: treeWidth + "px" } },
          h6(FilesView, { refreshing, root, onToggle, selected, onSelect })
        ),
        h6("div", {
          className: "dwb-split-divider",
          "data-dragging": splitting || void 0,
          onPointerDown: onDividerPointerDown,
          onPointerMove: onDividerPointerMove,
          onPointerUp: onDividerPointerUp
        }),
        h6(
          "div",
          { className: "dwb-split-pane", style: { flex: 1 } },
          h6(FilePreview, { file: selected, back: false, onClose: onClosePreview })
        )
      ) : h6(FilesView, { refreshing, root, onToggle, selected, onSelect }) : h6(GitView, {
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
      }),
      h6("div", { className: "dwb-footer" }, "\u5DE5\u4F5C\u9762\u677F \xB7 \u6587\u4EF6\u4E0E Git")
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
    } catch (error) {
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

// src/client/index.js
var name = "dsh-work";
var inject = ["slots"];
function apply(ctx) {
  ctx.effect(
    () => ctx.slots.inject("shell.overlay", () => ctx.slots.register({
      name: "shell.overlay",
      id: "workbench",
      order: 100,
      label: "Workbench"
    }, WorkbenchPanel)),
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

return module.exports; } });
//# sourceMappingURL=client.js.map
