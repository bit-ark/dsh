window.__ModuleLoader__.load({
	id: "dsh-work",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");
		const h = React.createElement;
		const { useState, useEffect, useCallback, useRef } = React;

		// ── styles: one tagged sheet, claimed by the loader on unload ────────
		const CSS = `
.dwb-root { position: absolute; top: 0; right: 0; bottom: 0; display: flex; flex-direction: column; background: var(--dsw-alias-bg-layer-2); border-left: 1px solid var(--dsw-alias-border-l2); box-shadow: -8px 0 24px rgba(0,0,0,.08); color: var(--dsw-alias-label-primary); font-size: 13px; overflow: hidden; }
.dwb-header { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid var(--dsw-alias-border-l2); flex: none; }
.dwb-title { font-weight: 600; font-size: 13px; flex: none; }
.dwb-pathinput { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsw-alias-label-tertiary); font-size: 11px; background: transparent; border: 1px solid transparent; border-radius: 6px; padding: 3px 6px; outline: none; }
.dwb-pathinput:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dwb-pathinput:focus { background: var(--dsw-alias-bg-layer-3); border-color: var(--dsw-alias-border-l3); color: var(--dsw-alias-label-primary); }
.dwb-iconbtn { flex: none; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-3); color: var(--dsw-alias-label-secondary); cursor: pointer; border-radius: 6px; padding: 0; }
.dwb-iconbtn:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.dwb-tabs { display: flex; gap: 4px; padding: 6px 10px; border-bottom: 1px solid var(--dsw-alias-border-l2); flex: none; }
.dwb-tabbtn { border: 1px solid transparent; background: transparent; color: var(--dsw-alias-label-secondary); width: 30px; height: 26px; display: flex; align-items: center; justify-content: center; border-radius: 6px; cursor: pointer; }
.dwb-tabbtn:hover { background: var(--dsw-alias-interactive-bg-hover); border-color: var(--dsw-alias-border-l2); color: var(--dsw-alias-label-primary); }
.dwb-tabbtn[data-active] { background: var(--dsw-alias-interactive-bg-active); border-color: var(--dsw-alias-border-l2); color: var(--dsw-alias-label-primary); }
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
.dwb-resize { position: absolute; left: -4px; top: 0; bottom: 0; width: 8px; cursor: ew-resize; z-index: 3; touch-action: none; }
.dwb-resize::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 4px; height: 40px; border-radius: 4px; background: var(--dsw-alias-button-floating-fill); border: 1px solid var(--dsw-alias-border-l2-darkmode-thin); opacity: 0; transition: opacity var(--ds-transition-duration-slow) var(--ds-ease-in-out), background var(--ds-transition-duration-slow) var(--ds-ease-in-out); }
.dwb-resize:hover::after, .dwb-resize[data-dragging='true']::after { opacity: 1; }
.dwb-resize:hover::after, .dwb-resize[data-dragging='true']::after { background: var(--dsw-alias-button-floating-hover); border-color: var(--dsw-alias-border-l3); }
.dwb-split { flex: 1; min-height: 0; display: flex; }
.dwb-split-pane { min-width: 0; overflow: hidden; display: flex; flex-direction: column; }
.dwb-split-divider { flex: none; width: 5px; cursor: col-resize; touch-action: none; position: relative; }
.dwb-split-divider::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 2px; height: 40px; border-radius: 2px; background: var(--dsw-alias-border-l2); opacity: 0; transition: opacity var(--ds-transition-duration-slow) var(--ds-ease-in-out), background var(--ds-transition-duration-slow) var(--ds-ease-in-out); }
.dwb-split-divider:hover::after, .dwb-split-divider[data-dragging='true']::after { opacity: 1; background: var(--dsw-alias-border-l3); }
.dwb-dragging, .dwb-dragging * { user-select: none !important; }
@media (prefers-reduced-motion: reduce) { .dwb-tip { animation: none; } }
/* ── preview: syntax-highlight tokens (shell's global --shiki-token-* palette) ── */
.dwb-tok-comment { color: var(--shiki-token-comment); }
.dwb-tok-string { color: var(--shiki-token-string); }
.dwb-tok-number { color: var(--shiki-token-constant); }
.dwb-tok-keyword { color: var(--shiki-token-keyword); }
.dwb-tok-type { color: var(--shiki-token-function); }
.dwb-tok-call { color: var(--shiki-token-function); }
.dwb-tok-prop { color: var(--shiki-token-constant); }
.dwb-tok-param { color: var(--shiki-token-parameter); }
.dwb-tok-punct { color: var(--shiki-token-punctuation); }
/* ── preview: 源码 | 预览 view switch ── */
.dwb-switch { flex: none; display: flex; gap: 2px; padding: 2px; background: var(--dsw-alias-bg-layer-3); border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px; }
.dwb-switchbtn { border: none; background: transparent; color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 16px; padding: 1px 8px; border-radius: 4px; cursor: pointer; }
.dwb-switchbtn:hover { color: var(--dsw-alias-label-primary); }
.dwb-switchbtn[data-active] { background: var(--dsw-alias-markdown-code-segment-selected); color: var(--dsw-alias-label-primary); }
/* ── preview: rendered markdown ── */
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
/* ── preview: sandboxed html browser ── */
.dwb-preview-frame { flex: 1; min-height: 0; width: 100%; border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; background: #fff; }
`;
		if (typeof document !== "undefined" && document.getElementById("dsh-work-style") === null) {
			const styleEl = document.createElement("style");
			styleEl.id = "dsh-work-style";
			styleEl.setAttribute("data-plugin", "dsh-work");
			styleEl.textContent = CSS;
			document.head.appendChild(styleEl);
		}

		// ── helpers ──────────────────────────────────────────────────────────
		function messageOf(error) {
			return error instanceof Error ? error.message : String(error);
		}
		function formatSize(bytes) {
			if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + " MB";
			if (bytes >= 1024) return (bytes / 1024).toFixed(1) + " KB";
			return bytes + " B";
		}
		// ── panel geometry: widths, clamps, persistence ──────────────────────
		const PANEL_MIN = 280;
		const SPLIT_MIN = 480;
		const AUTO_WIDEN = 720;
		const PANEL_DEFAULT = 344;
		const TREE_DEFAULT = 240;
		const WIDTH_KEY = "dsh-work.width";
		const SPLIT_KEY = "dsh-work.split";
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
			try { window.localStorage.setItem(key, String(Math.round(value))); } catch { /* private mode: session-only */ }
		}
		function clampPanelWidth(width, maxWidth) {
			return Math.min(maxWidth, Math.max(PANEL_MIN, Math.round(width)));
		}
		function clampTreeWidth(width, panelWidth) {
			return Math.min(Math.round(panelWidth * 0.6), Math.max(160, Math.round(width)));
		}
		/** 目录树节点构造：把宿主 /workbench/dir 的一行条目转成可展开的树节点。 */
		function toNode(entry) {
			const node = {
				path: entry.path,
				name: entry.name,
				type: entry.type,
				hidden: entry.hidden,
				expanded: false,
				loading: false,
				loaded: false,
				children: [],
			};
			if (entry.size !== undefined) node.size = entry.size;
			return node;
		}
		/** 按绝对路径在树里找节点（深度优先，找不到返回 undefined）。 */
		function findNode(node, path) {
			if (node.path === path) return node;
			for (let i = 0; i < node.children.length; i++) {
				const found = findNode(node.children[i], path);
				if (found !== undefined) return found;
			}
			return undefined;
		}
		/** 不可变更新：返回一棵沿 path 分支替换过的新树（未命中路径则原样返回）。 */
		function patchNode(root, path, patch) {
			if (root.path === path) return Object.assign({}, root, patch);
			return Object.assign({}, root, { children: root.children.map((child) => patchNode(child, path, patch)) });
		}
		/** 变更徽标：porcelain 前两位的状态码 → 单字符徽标（? = 未跟踪）。 */
		function badgeKind(code) {
			const trimmed = code.trim();
			if (trimmed === "" || trimmed === "??") return "?";
			return trimmed.charAt(0);
		}
		/**
		 * porcelain=v1 的 XY 状态：第一位是暂存区（index），第二位是工作区
		 * （worktree）。`X` 非空格且非 `?` 表示有已暂存变更（`??` 未跟踪、
		 * ` M` 仅工作区改动都算未暂存）。注意 UU（双方冲突）会被归入"已暂存"，
		 * 点 unstage 会失败——这是低影响边缘情况，未单独处理。
		 */
		function stagedOf(code) {
			const first = code.charAt(0);
			return first !== " " && first !== "?";
		}
		// Preview kind mirrors the host's classifyFile: text/image/audio/video/other.
		const TEXT_EXTENSIONS = new Set([
			"md", "mdx", "txt", "text", "ts", "tsx", "js", "jsx", "mjs", "cjs", "mts", "cts",
			"json", "jsonc", "yml", "yaml", "toml", "html", "htm", "xml", "css", "scss",
			"less", "py", "rb", "go", "rs", "java", "c", "h", "cpp", "hpp", "cs", "php",
			"sh", "bash", "zsh", "fish", "bat", "ps1", "sql", "graphql", "ini", "conf",
			"env", "gitignore", "dockerfile", "lock", "log", "csv", "vue", "svelte",
			"astro", "prisma", "proto", "webmanifest",
		]);
		const IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "gif", "webp", "bmp", "ico", "avif", "svg"]);
		const AUDIO_EXTENSIONS = new Set(["mp3", "wav", "ogg", "oga", "m4a", "aac", "flac", "opus", "weba"]);
		const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov", "m4v", "avi", "mkv", "ogv", "ts", "m2ts"]);
		function classifyFile(name) {
			const dot = name.lastIndexOf(".");
			const ext = dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
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

		// ── icons ────────────────────────────────────────────────────────────
		function IconFrame(props) {
			const size = props.size || 14;
			return h("svg", {
				className: props.className,
				viewBox: "0 0 24 24",
				width: size,
				height: size,
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.6",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": true,
			}, props.children);
		}
		const folderIcon = () => h(IconFrame, { size: 15 }, h("path", { d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }));
		const branchIcon = () => h(IconFrame, { size: 15 },
			h("circle", { cx: "6", cy: "5", r: "2" }),
			h("circle", { cx: "6", cy: "19", r: "2" }),
			h("circle", { cx: "18", cy: "9", r: "2" }),
			h("path", { d: "M6 7v9.5" }),
			h("path", { d: "M18 11c0 4-6 3.4-9.4 5" }),
		);
		const refreshIcon = () => h(IconFrame, null,
			h("path", { d: "M20 12a8 8 0 1 1-2.34-5.66" }),
			h("path", { d: "M20 4v4h-4" }),
		);
		const closeIcon = () => h(IconFrame, null, h("path", { d: "M6 6l12 12M18 6L6 18" }));
		const plusIcon = () => h(IconFrame, { size: 12 }, h("path", { d: "M12 5v14M5 12h14" }));
		const minusIcon = () => h(IconFrame, { size: 12 }, h("path", { d: "M5 12h14" }));
		const trayDownIcon = () => h(IconFrame, { size: 13 }, h("path", { d: "M12 4v10M8 10l4 4 4-4M4 19h16" }));
		const undoIcon = () => h(IconFrame, { size: 13 }, h("path", { d: "M4 12a8 8 0 1 0 2.5-5.8" }), h("path", { d: "M4 4v4h4" }));
		const banIcon = () => h(IconFrame, { size: 13 }, h("circle", { cx: "12", cy: "12", r: "8" }), h("path", { d: "M5 5l14 14" }));
		const eyeIcon = () => h(IconFrame, { size: 13 },
			h("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" }),
			h("circle", { cx: "12", cy: "12", r: "3" }),
		);
		const eyeOffIcon = () => h(IconFrame, { size: 13 },
			h("path", { d: "M4 4l16 16" }),
			h("path", { d: "M9.5 5.2A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.1 6.1A17 17 0 0 0 2 12s3.5 7 10 7c1.7 0 3.2-.4 4.5-1" }),
			h("path", { d: "M10 10a3 3 0 0 0 4 4" }),
		);
		const checkIcon = () => h(IconFrame, { size: 14 }, h("path", { d: "M5 12l5 5 9-10" }));
		const createIcon = () => h(IconFrame, { size: 14 },
			h("path", { d: "M8 3h8a1 1 0 0 1 1 1v3" }),
			h("path", { d: "M3 8v8a1 1 0 0 0 1 1h3" }),
			h("path", { d: "M16 21h3a1 1 0 0 0 1-1v-3" }),
			h("path", { d: "M21 8V5a1 1 0 0 0-1-1h-3" }),
			h("path", { d: "M12 7v6M9 10h6" }),
		);
		const chevronIcon = () => h(IconFrame, { size: 10 }, h("path", { d: "M9 6l6 6-6 6" }));
		const folderClosedIcon = () => h(IconFrame, { size: 14 }, h("path", { d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }));
		const folderOpenIcon = () => h(IconFrame, { size: 14 },
			h("path", { d: "M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v1H6.4a2 2 0 0 0-1.9 1.4L3 15z" }),
			h("path", { d: "M3.2 14.8 4.7 9.6a2 2 0 0 1 1.9-1.4H21l-2 7.2a2 2 0 0 1-2 1.4H5.2a2 2 0 0 1-2-2z" }),
		);
		function fileIconFor(name) {
			const dot = name.lastIndexOf(".");
			const ext = dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
			let kind = "file";
			if (["ts", "tsx", "js", "jsx", "mjs", "cjs", "mts", "cts", "css", "scss"].indexOf(ext) !== -1) kind = "code";
			else if (["json", "yml", "yaml", "toml", "lock"].indexOf(ext) !== -1) kind = "config";
			else if (["md", "mdx", "txt"].indexOf(ext) !== -1) kind = "doc";
			return h("span", { className: "dwb-fileicon", "data-kind": kind },
				h(IconFrame, { size: 14 },
					h("path", { d: "M5 3.5h6l4 4V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" }),
					kind === "code" ? h("path", { d: "M10 11l-2 2 2 2M14 11l2 2-2 2" }) : null,
				),
			);
		}

		// ── TipButton: icon button with an instant custom tooltip ────────────
		function TipButton(props) {
			const [visible, setVisible] = useState(false);
			const [pos, setPos] = useState({ x: 0, y: 0 });
			const show = (event) => {
				const rect = event.currentTarget.getBoundingClientRect();
				setPos({ x: rect.left + rect.width / 2, y: rect.top - 6 });
				setVisible(true);
			};
			const hide = () => setVisible(false);
			return h(React.Fragment, null,
				h("button", {
					type: "button",
					className: props.className,
					"data-active": props.active || undefined,
					onClick: props.onClick,
					disabled: props.disabled,
					"aria-label": props.tip,
					onMouseEnter: show,
					onMouseLeave: hide,
					onFocus: show,
					onBlur: hide,
				}, props.children),
				visible
					? h("div", { className: "dwb-tip", style: { left: pos.x, top: pos.y }, role: "tooltip" }, props.tip)
					: null,
			);
		}

		// ── Files tab ────────────────────────────────────────────────────────
		function FilesView(props) {
			if (props.root === null) {
				return h("div", { className: "dwb-scroll" }, h("div", { className: "dwb-note" }, "无工作目录（未选择会话且未手动指定路径）"));
			}
			const rows = [];
			const walk = (node, depth) => {
				const isDir = node.type === "directory";
				const selected = !isDir && node.path === props.selected;
				rows.push(h("div", {
					key: node.path,
					className: "dwb-row",
					"data-dir": isDir || undefined,
					"data-hidden": node.hidden || undefined,
					"data-selected": selected || undefined,
					style: { paddingLeft: (6 + depth * 14) + "px" },
					onClick: isDir ? () => props.onToggle(node.path) : () => props.onSelect(node),
					title: node.path,
				},
					h("span", { className: "dwb-caret", "data-open": (isDir && node.expanded) || undefined }, isDir ? chevronIcon() : null),
					isDir
						? h("span", { className: "dwb-diricon", "data-open": node.expanded || undefined }, node.expanded ? folderOpenIcon() : folderClosedIcon())
						: fileIconFor(node.name),
					h("span", { className: "dwb-name" }, node.name),
					(!isDir && node.size !== undefined) ? h("span", { className: "dwb-size" }, formatSize(node.size)) : null,
				));
				if (!node.expanded) return;
				if (node.loading) {
					rows.push(h("div", { key: node.path + "/loading", className: "dwb-note", style: { paddingLeft: (20 + depth * 14) + "px" } }, "加载中…"));
					return;
				}
				if (node.error !== undefined) {
					rows.push(h("div", { key: node.path + "/error", className: "dwb-note", "data-error": true, style: { paddingLeft: (20 + depth * 14) + "px" } }, node.error));
					return;
				}
				if (node.loaded && node.children.length === 0) {
					rows.push(h("div", { key: node.path + "/empty", className: "dwb-note", style: { paddingLeft: (20 + depth * 14) + "px" } }, "（空目录）"));
				}
				for (let i = 0; i < node.children.length; i++) walk(node.children[i], depth + 1);
				if (node.truncated === true) {
					rows.push(h("div", { key: node.path + "/truncated", className: "dwb-note", style: { paddingLeft: (20 + depth * 14) + "px" } }, "（条目过多，列表已截断）"));
				}
			};
			walk(props.root, 0);
			return h("div", { className: props.refreshing ? "dwb-scroll dwb-busy" : "dwb-scroll" }, rows);
		}

		// ── preview rendering: dependency-free syntax highlighting ────────────
		// Token colors resolve through the shell's global --shiki-token-* palette
		// so the panel matches the app's fenced code blocks. Everything is
		// HTML-escaped before token spans wrap it. Unknown languages fall back to
		// a generic mode (strings, numbers); very large files skip token spans to
		// keep the panel responsive.

		function escapeHtml(text) {
			return text
				.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
		}

		const HL_LANG_BY_EXT = {
			ts: "javascript", tsx: "javascript", js: "javascript", jsx: "javascript",
			mjs: "javascript", cjs: "javascript", mts: "javascript", cts: "javascript",
			json: "json", jsonc: "json", yml: "yaml", yaml: "yaml", toml: "toml",
			ini: "ini", conf: "ini", env: "ini", gitignore: "ini",
			py: "python", rb: "ruby", go: "go", rs: "rust", java: "java",
			c: "cpp", h: "cpp", cpp: "cpp", hpp: "cpp", cs: "csharp", php: "php",
			sh: "shell", bash: "shell", zsh: "shell", fish: "shell",
			sql: "sql", css: "css", scss: "css", less: "css",
			html: "markup", htm: "markup", xml: "markup",
			md: "markdown", mdx: "markdown",
		};

		const HL_KEYWORDS = {
			javascript: ["const","let","var","function","return","if","else","for","while","do","switch","case","default","break","continue","new","class","extends","super","this","typeof","instanceof","in","of","import","export","from","async","await","try","catch","finally","throw","yield","delete","void","null","undefined","true","false","interface","type","enum","implements","public","private","protected","readonly","static","abstract","as","keyof","namespace","declare","get","set","require"],
			json: ["true","false","null"],
			python: ["def","class","return","if","elif","else","for","while","try","except","finally","with","as","import","from","lambda","yield","pass","break","continue","raise","global","nonlocal","del","assert","async","await","True","False","None","not","and","or","in","is","self","print"],
			ruby: ["def","class","module","return","if","elsif","else","unless","case","when","while","until","for","do","end","begin","rescue","ensure","raise","yield","require","include","extend","attr_accessor","attr_reader","attr_writer","true","false","nil","and","or","not","new","puts"],
			go: ["func","package","import","return","if","else","for","range","switch","case","default","break","continue","goto","defer","go","chan","select","struct","interface","map","type","var","const","true","false","nil","fallthrough"],
			rust: ["fn","let","mut","const","static","struct","enum","trait","impl","mod","use","pub","crate","self","Self","return","if","else","match","for","while","loop","break","continue","move","ref","as","where","dyn","async","await","true","false","unsafe","type"],
			java: ["public","private","protected","class","interface","enum","extends","implements","import","package","return","if","else","for","while","do","switch","case","default","break","continue","new","try","catch","finally","throw","throws","static","final","void","this","super","abstract","synchronized","volatile","transient","instanceof","true","false","null","record","var"],
			cpp: ["public","private","protected","class","struct","union","enum","namespace","using","template","typename","return","if","else","for","while","do","switch","case","default","break","continue","new","delete","try","catch","throw","static","const","constexpr","inline","virtual","override","final","this","true","false","nullptr","sizeof","typedef","extern","register","volatile","mutable","friend","operator","goto"],
			csharp: ["public","private","protected","internal","class","struct","interface","enum","namespace","using","return","if","else","for","foreach","while","do","switch","case","default","break","continue","new","try","catch","finally","throw","static","const","readonly","virtual","override","sealed","abstract","async","await","var","true","false","null","this","base","out","ref","in","is","as","typeof","delegate","event","get","set","value","record"],
			php: ["function","class","interface","trait","namespace","use","return","if","else","elseif","for","foreach","while","do","switch","case","default","break","continue","new","try","catch","finally","throw","static","public","private","protected","const","echo","print","true","false","null","isset","empty","array","require","include","require_once","include_once","abstract","final","extends","implements","instanceof","and","or","xor","list","global"],
			swift: ["func","class","struct","enum","protocol","extension","import","return","if","else","guard","for","while","repeat","switch","case","default","break","continue","fallthrough","new","try","catch","throw","throws","static","let","var","inout","where","deinit","init","self","true","false","nil","as","is","typealias","open","public","internal","fileprivate","private","lazy","mutating","nonmutating","override","required","convenience","associatedtype"],
			kotlin: ["fun","class","object","interface","enum","data","sealed","abstract","open","override","final","val","var","const","return","if","else","when","for","while","do","try","catch","finally","throw","import","package","this","super","true","false","null","is","in","as","by","companion","init","constructor","internal","public","private","protected","inline","suspend","infix","operator","lateinit","typealias","get","set"],
			shell: ["if","then","else","elif","fi","for","while","do","done","case","esac","function","in","return","exit","export","local","readonly","set","unset","shift","select","until","break","continue","source","echo","printf","cd","ls","mkdir","rm","cp","mv","cat","grep","sed","awk","curl","wget","git","npm","pnpm","node","true","false"],
			sql: ["select","from","where","insert","into","values","update","set","delete","create","table","alter","drop","index","view","join","inner","left","right","full","outer","on","group","by","order","having","limit","offset","distinct","as","and","or","not","null","is","in","between","like","exists","union","all","primary","key","foreign","references","constraint","default","unique","check","case","when","then","else","end","count","sum","avg","min","max","begin","commit","rollback","transaction"],
			toml: ["true","false"],
		};

		const HL_TYPES = {
			javascript: ["Number","String","Boolean","Object","Array","Promise","Map","Set","WeakMap","WeakSet","Error","Date","RegExp","JSON","Math","Function","Symbol","BigInt","console","window","document","globalThis","process","Buffer","HTMLElement"],
			go: ["int","int8","int16","int32","int64","uint","uint8","uint16","uint32","uint64","uintptr","float32","float64","complex64","complex128","byte","rune","string","bool","error","any","chan","func","map","slice"],
			rust: ["i8","i16","i32","i64","i128","isize","u8","u16","u32","u64","u128","usize","f32","f64","bool","char","str","String","Vec","Option","Result","Box","Rc","Arc","HashMap","HashSet","BTreeMap","BTreeSet","Iterator","Sized"],
			java: ["String","Integer","Long","Double","Float","Boolean","Object","Class","List","Map","Set","ArrayList","HashMap","HashSet","Collection","Optional","Exception","RuntimeException","Error","Thread","Runnable","System","Math","int","long","double","float","boolean","char","byte","short","void"],
			cpp: ["int","long","short","char","bool","float","double","void","size_t","std","string","vector","map","set","unordered_map","unique_ptr","shared_ptr","auto","uint8_t","int32_t","int64_t","uint32_t","uint64_t","FILE","cout","cin","endl"],
			csharp: ["string","int","long","double","float","bool","char","byte","short","uint","ulong","decimal","object","void","var","dynamic","List","Dictionary","HashSet","IEnumerable","Task","Action","Func","Exception","Console","Math","String","DateTime","Guid","Nullable"],
			python: ["int","float","str","bytes","bool","list","tuple","dict","set","frozenset","None","object","type","Exception","ValueError","TypeError","KeyError","IndexError","RuntimeError","FileNotFoundError","self","cls"],
			ruby: ["String","Integer","Float","Symbol","Array","Hash","Range","Proc","Lambda","Module","Class","Object","Exception","StandardError","nil","true","false"],
			swift: ["Int","Double","Float","Bool","String","Character","Array","Dictionary","Set","Optional","Any","AnyObject","Self","Void","Never","Error","Result","URL","Date","Data","CGFloat","NSObject","UIView","UIViewController"],
			kotlin: ["Int","Long","Double","Float","Boolean","String","Char","Byte","Short","Unit","Any","Nothing","List","MutableList","Map","MutableMap","Set","MutableSet","Array","Sequence","Pair","Triple","Exception","Error","Result","Unit"],
			php: ["int","float","string","bool","array","object","mixed","void","null","false","true","callable","iterable","self","static","parent","Exception","Error","stdClass"],
		};

		const ESCAPE_RE = /[.*+?^${}()|[\]\\]/g;
		function escapeRe(text) {
			return text.replace(ESCAPE_RE, "\\$&");
		}

		const HL_CACHE = new Map();
		/** Build (or fetch) the master token regex for one language id. */
		function hlRegex(lang) {
			const cached = HL_CACHE.get(lang);
			if (cached !== undefined) return cached;
			const cfg = {
				line: null, block: null, keywords: null, types: null, quotes: ['"', "'", "`"],
				extra: null, calls: false,
			};
			// per-language config lives on HL_LANGS; a language without one is generic.
			const known = HL_LANGS[lang];
			if (known !== undefined) Object.assign(cfg, known);
			const parts = [];
			const kinds = [];
			const add = (pattern, kind) => { parts.push("(" + pattern + ")"); kinds.push(kind); };
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

		const HL_LANGS = {
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
			ini: { line: "[;#][^\\n]*", block: null, keywords: [], types: null, quotes: ['"', "'"] },
		};

		/** The largest text that still gets token spans; beyond it the preview stays plain (escaped). */
		const HL_MAX = 300000;

		/** Highlight one source text into escaped HTML with token spans. */
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
					if (match[i] !== undefined) { kind = kinds[i - 1]; break; }
				}
				out += '<span class="dwb-tok ' + kind + '">' + escapeHtml(match[0]) + "</span>";
				last = match.index + match[0].length;
			}
			if (last < text.length) out += escapeHtml(text.slice(last));
			return out;
		}

		/** Wrap already-escaped text with the given token class, or leave plain. */
		function tokSpan(escaped, kind) {
			return kind === null ? escaped : '<span class="dwb-tok ' + kind + '">' + escaped + "</span>";
		}

		/** Markup (html/xml): tags, attribute names, quoted values, comments. */
		function highlightMarkup(text) {
			if (text.length > HL_MAX) return escapeHtml(text);
			let out = "";
			let last = 0;
			const re = /<!--[\s\S]*?-->|<[^>]*>|[^<]+/g;
			let match;
			while ((match = re.exec(text)) !== null) {
				const piece = match[0];
				if (piece.charCodeAt(0) === 60) { // '<'
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

		/** 高亮单个 HTML 标签（markup 语言专用扫描）：属性名/等号/字符串值着色。 */
		function highlightTag(tag) {
			let out = "";
			let last = 0;
			const re = /([A-Za-z_][\w-]*)(\s*=\s*)("(?:[^"]*)"|'(?:[^']*)')|[A-Za-z_][\w-]*|\s+/g;
			let match;
			while ((match = re.exec(tag)) !== null) {
				const piece = match[0];
				if (match[1] !== undefined) {
					out += escapeHtml(tag.slice(last, match.index));
					out += '<span class="dwb-tok param">' + escapeHtml(match[1]) + "</span>";
					out += '<span class="dwb-tok punct">' + escapeHtml(match[2]) + "</span>";
					out += '<span class="dwb-tok string">' + escapeHtml(match[3]) + "</span>";
				} else {
					const name = /[A-Za-z_][\w-]*/.exec(piece);
					if (name !== null && name.index === 0 && /^[A-Za-z]/.test(piece)) {
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

		/** CSS: comments, at-rules, selectors, properties, values, numbers. */
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
				else if (match[1] !== undefined) kind = "type";
				else if (match[2] !== undefined) kind = "param";
				else if (/[{};:]/.test(piece)) kind = "punct";
				if (match.index > last) out += escapeHtml(text.slice(last, match.index));
				out += tokSpan(escapeHtml(piece), kind);
				last = match.index + piece.length;
			}
			if (last < text.length) out += escapeHtml(text.slice(last));
			return out;
		}

		/** YAML: comments, `key:` mappings, bullets, strings, numbers, booleans. */
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
				else if (match[2] !== undefined) kind = "prop";
				else if (piece === ":") kind = "punct";
				if (match.index > last) out += escapeHtml(text.slice(last, match.index));
				out += tokSpan(escapeHtml(piece), kind);
				last = match.index + piece.length;
			}
			if (last < text.length) out += escapeHtml(text.slice(last));
			return out;
		}

		/** INI: comments, `key = value` mappings, strings. */
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
				else if (match[2] !== undefined) kind = "prop";
				else if (/[=\[\]]/.test(piece)) kind = "punct";
				if (match.index > last) out += escapeHtml(text.slice(last, match.index));
				out += tokSpan(escapeHtml(piece), kind);
				last = match.index + piece.length;
			}
			if (last < text.length) out += escapeHtml(text.slice(last));
			return out;
		}

		/** Markdown source view: headings, emphasis, links, inline code, lists, hr. */
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

		// ── preview rendering: markdown → sanitized HTML ──────────────────────
		// A compact GFM subset: headings, paragraphs, fenced code (with
		// highlighting), lists, blockquotes, hr, and inline code/emphasis/links/
		// images. All text is escaped; links allow http(s)/mailto only, images
		// allow http(s) plus same-tree relative paths (served through the
		// workbench's own asset route, parent traversal refused).

		const MD_FENCE_ALIASES = { ts: "javascript", tsx: "javascript", js: "javascript", jsx: "javascript", py: "python", rb: "ruby", go: "go", rs: "rust", java: "java", cs: "csharp", php: "php", sh: "shell", bash: "shell", zsh: "shell", sql: "sql", yaml: "yaml", yml: "yaml", json: "json", html: "markup", xml: "markup", css: "css", md: "markdown", markdown: "markdown", ini: "ini", toml: "toml" };

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

		function inlineMd(raw, dir) {
			let out = "";
			let last = 0;
			const re = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|~~[^~]+~~|!\[([^\]]*)\]\(([^)]*)\)|\[([^\]]+)\]\(([^)]*)\))/g;
			let match;
			while ((match = re.exec(raw)) !== null) {
				out += escapeHtml(raw.slice(last, match.index));
				const token = match[0];
				if (token.charAt(0) === "`") out += '<code class="dwb-md-code">' + escapeHtml(token.slice(1, -1)) + "</code>";
				else if (token.startsWith("**")) out += "<strong>" + escapeHtml(token.slice(2, -2)) + "</strong>";
				else if (token.startsWith("~~")) out += "<del>" + escapeHtml(token.slice(2, -2)) + "</del>";
				else if (token.charAt(0) === "*") out += "<em>" + escapeHtml(token.slice(1, -1)) + "</em>";
				else if (token.charAt(0) === "!") {
					const href = mdImageHref(match[3], dir);
					// href/src 是属性上下文：白名单只保证协议，值里仍可能含
					// `"><img onerror=...>` 一类的引号逃逸——必须再经 escapeHtml
					// 转义（& < > " '），否则会在应用同源 DOM 注入元素（存储型
					// XSS）。浏览器读属性时会解码 &amp; 回 &，功能不受影响。
					out += href === null
						? escapeHtml(token)
						: '<img src="' + escapeHtml(href) + '" alt="' + escapeHtml(match[2]) + '">';
				} else {
					const href = mdLinkHref(match[5]);
					out += href === null
						? escapeHtml(token)
						: '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(match[4]) + "</a>";
				}
				last = match.index + token.length;
			}
			out += escapeHtml(raw.slice(last));
			return out;
		}

		/** Render markdown into sanitized HTML. `dir` is the file's directory (for relative images). */
		function renderMarkdown(text, dir) {
			const lines = text.split("\n");
			const out = [];
			let list = null;
			let i = 0;
			const closeList = () => {
				if (list !== null) { out.push("</" + list + ">"); list = null; }
			};
			while (i < lines.length) {
				const line = lines[i];
				const fence = /^```([\w+-]*)\s*$/.exec(line);
				if (fence !== null) {
					closeList();
					const lang = MD_FENCE_ALIASES[fence[1]] ?? (fence[1] === "" ? undefined : fence[1]);
					const buf = [];
					i++;
					while (i < lines.length && !/^```\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
					i++;
					const code = buf.join("\n");
					out.push('<pre class="dwb-md-pre"><code>' + highlightCode(code, lang) + "</code></pre>");
					continue;
				}
				const heading = /^(#{1,6})\s+(.*)$/.exec(line);
				if (heading !== null) {
					closeList();
					const level = heading[1].length;
					out.push("<h" + level + ">" + inlineMd(heading[2], dir) + "</h" + level + ">");
					i++;
					continue;
				}
				if (/^\s*(?:---+|\*\*\*+|___+)\s*$/.test(line)) {
					closeList();
					out.push("<hr>");
					i++;
					continue;
				}
				const quote = /^\s*>\s?(.*)$/.exec(line);
				if (quote !== null) {
					closeList();
					const buf = [quote[1]];
					i++;
					while (i < lines.length && /^\s*>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^\s*>\s?/, "")); i++; }
					out.push("<blockquote>" + buf.map((part) => inlineMd(part, dir)).join("<br>") + "</blockquote>");
					continue;
				}
				const ul = /^\s*[-*+]\s+(.*)$/.exec(line);
				if (ul !== null) {
					if (list !== "ul") { closeList(); out.push("<ul>"); list = "ul"; }
					out.push("<li>" + inlineMd(ul[1], dir) + "</li>");
					i++;
					continue;
				}
				const ol = /^\s*\d+[.)]\s+(.*)$/.exec(line);
				if (ol !== null) {
					if (list !== "ol") { closeList(); out.push("<ol>"); list = "ol"; }
					out.push("<li>" + inlineMd(ol[1], dir) + "</li>");
					i++;
					continue;
				}
				if (line.trim() === "") {
					closeList();
					out.push("");
					i++;
					continue;
				}
				closeList();
				const buf = [line];
				i++;
				while (i < lines.length && lines[i].trim() !== "" && !/^(```|#{1,6}\s|>\s?|\s*[-*+]\s+|\s*\d+[.)]\s+)/.test(lines[i])) { buf.push(lines[i]); i++; }
				out.push("<p>" + buf.map((part) => inlineMd(part, dir)).join("<br>") + "</p>");
			}
			closeList();
			return out.join("\n");
		}

		// ── preview rendering: html → sandboxed iframe ────────────────────────
		// Relative src/href values are rewritten to the workbench's own asset
		// route so same-tree css/js/images resolve; absolute http(s), root,
		// anchor, scheme URLs and any parent traversal are left untouched.

		function htmlPreviewSrc(text, dir) {
			return text.replace(/(\b(?:src|href)\s*=\s*)(["'])([^"']*)\2/gi, (all, prefix, quote, value) => {
				if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(value) || value.includes("..")) return all;
				return prefix + quote + assetUrl(dir === "" ? value : dir + "/" + value) + quote;
			});
		}

		// ── File preview ─────────────────────────────────────────────────────
		/** Document kinds get a 源码 | 预览 switch; everything else stays source. */
		const PREVIEW_KIND = { md: "markdown", markdown: "markdown", mdx: "markdown", html: "html", htm: "html" };

		function FilePreview(props) {
			const file = props.file;
			const kind = classifyFile(file.name);
			const dot = file.name.lastIndexOf(".");
			const ext = dot > 0 ? file.name.slice(dot + 1).toLowerCase() : "";
			const lang = HL_LANG_BY_EXT[ext];
			const previewKind = PREVIEW_KIND[ext] ?? null;
			const [state, setState] = useState({ status: "loading", content: "", truncated: false });
			// Document kinds open on their rendering (the point of previewing a
			// README or a page); code files open on highlighted source.
			const [view, setView] = useState(previewKind !== null ? "preview" : "source");
			useEffect(() => {
				if (kind !== "text") return;
				const controller = new AbortController();
				setState({ status: "loading", content: "", truncated: false });
				fetch("/workbench/file?path=" + encodeURIComponent(file.path), { signal: controller.signal })
					.then((response) => response.json())
					.then((body) => {
						if (controller.signal.aborted) return;
						if (body.ok !== true) {
							setState({ status: "error", content: "", truncated: false, error: body.error || "文件读取失败" });
							return;
						}
						setState({ status: "ready", content: body.content || "", truncated: body.truncated === true });
					})
					.catch((error) => {
						if (controller.signal.aborted) return;
						setState({ status: "error", content: "", truncated: false, error: error instanceof Error ? error.message : String(error) });
					});
				return () => controller.abort();
			}, [file.path, kind]);
			// The panel reuses one FilePreview instance across file switches; the
			// view mode must follow the file, not linger from the previous one.
			useEffect(() => {
				setView(previewKind !== null ? "preview" : "source");
			}, [file.path, previewKind]);
			// Split mode hides the ← back affordance (the tree stays visible);
			// narrow full-pane mode keeps it.
			const back = props.back === false
				? null
				: h(TipButton, { tip: "返回目录", className: "dwb-minibtn", onClick: props.onClose }, h("span", null, "←"));
			const subtitle = (file.size !== undefined ? formatSize(file.size) : "") + (kind === "other" ? " · " + file.name.split(".").pop() + " 类型" : "");
			const header = h("div", { className: "dwb-previewheader" },
				back,
				h("div", { className: "dwb-previewmeta" },
					h("div", { className: "dwb-previewname", title: file.path }, file.name),
					h("div", { className: "dwb-previewsub" }, subtitle),
				),
				previewKind !== null
					? h("div", { className: "dwb-switch" },
						h("button", { type: "button", className: "dwb-switchbtn", "data-active": view === "source" || undefined, onClick: () => setView("source") }, "源码"),
						h("button", { type: "button", className: "dwb-switchbtn", "data-active": view === "preview" || undefined, onClick: () => setView("preview") }, "预览"),
					)
					: null,
				props.back !== false
					? null
					: h(TipButton, { tip: "关闭预览", className: "dwb-minibtn", onClick: props.onClose }, closeIcon()),
			);
			let body;
			if (kind === "text") {
				if (state.status === "loading") {
					body = h("div", { className: "dwb-previewnote" }, "加载中…");
				} else if (state.status === "error") {
					body = h("div", { className: "dwb-previewnote", "data-error": true }, state.error);
				} else {
					const dir = file.path.slice(0, file.path.lastIndexOf("/"));
					let inner;
					if (previewKind === "markdown" && view === "preview") {
						inner = h("div", { className: "dwb-preview-md", dangerouslySetInnerHTML: { __html: renderMarkdown(state.content, dir) } });
					} else if (previewKind === "html" && view === "preview") {
						inner = h("iframe", { className: "dwb-preview-frame", sandbox: "allow-scripts", srcDoc: htmlPreviewSrc(state.content, dir), title: file.name });
					} else {
						inner = h("pre", { className: "dwb-previewtext", dangerouslySetInnerHTML: { __html: highlightCode(state.content, lang) } });
					}
					body = h("div", { className: "dwb-previewscroll" },
						inner,
						state.truncated ? h("div", { className: "dwb-note" }, "（文件较大，仅显示前 512KB）") : null,
					);
				}
			} else if (kind === "image") {
				body = h("div", { className: "dwb-previewscroll" },
					h("div", { className: "dwb-previewmedia" }, h("img", { className: "dwb-previewimg", src: assetUrl(file.path), alt: file.name })),
				);
			} else if (kind === "audio") {
				body = h("div", { className: "dwb-previewscroll" },
					h("audio", { className: "dwb-previewaudio", controls: true, src: assetUrl(file.path) }),
				);
			} else if (kind === "video") {
				body = h("div", { className: "dwb-previewscroll" },
					h("video", { className: "dwb-previewvideo", controls: true, src: assetUrl(file.path) }),
				);
			} else {
				body = h("div", { className: "dwb-previewscroll" },
					h("div", { className: "dwb-previewnote" },
						h("div", { className: "dwb-emptyicon" }, fileIconFor(file.name)),
						h("div", null, "无法预览此文件类型"),
						file.size !== undefined ? h("div", null, formatSize(file.size)) : null,
					),
				);
			}
			return h("div", { className: "dwb-preview" }, header, body);
		}

		// ── Git tab ──────────────────────────────────────────────────────────
		function GitView(props) {
			const state = props.state;
			if (state.status === "loading") return h("div", { className: "dwb-scroll" }, h("div", { className: "dwb-note" }, "加载中…"));
			if (state.status === "idle") return h("div", { className: "dwb-scroll" }, h("div", { className: "dwb-note" }, "无工作目录（未选择会话且未手动指定路径）"));
			if (state.status === "error") {
				return h("div", { className: "dwb-scroll" }, h("div", { className: "dwb-emptygit" },
					h("div", { className: "dwb-emptytitle" }, "Git 数据加载失败"),
					h("div", { className: "dwb-emptyhint" }, state.error),
				));
			}
			if (state.status === "not-repo") {
				const noGitBinary = state.error !== undefined && state.error.indexOf("ENOENT") !== -1;
				return h("div", { className: "dwb-scroll" }, h("div", { className: "dwb-emptygit" },
					h("svg", { className: "dwb-emptyicon", viewBox: "0 0 24 24", width: "28", height: "28", fill: "none", stroke: "currentColor", strokeWidth: "1.5", "aria-hidden": true },
						h("circle", { cx: "6", cy: "5", r: "2.2" }),
						h("circle", { cx: "6", cy: "19", r: "2.2" }),
						h("circle", { cx: "18", cy: "9", r: "2.2" }),
						h("path", { d: "M6 7.2v9.6" }),
						h("path", { d: "M18 11.2c0 4-6 3.4-9.4 5" }),
					),
					h("div", { className: "dwb-emptytitle" }, noGitBinary ? "未找到 git 命令" : "这个目录不是 Git 仓库"),
					h("div", { className: "dwb-emptyhint" }, noGitBinary
						? "请先安装 git，或确认它在 PATH 中，然后点右上角刷新。"
						: "在上方路径框里输入一个 Git 仓库的路径，就能看到分支、提交图和工作区变更；也可以直接在此目录初始化一个仓库。"),
					noGitBinary
						? null
						: h(TipButton, {
							tip: "一键创建仓库（git init，默认分支随宿主机配置）",
							className: "dwb-initbtn",
							onClick: props.onInit,
							disabled: props.initializing,
						}, props.initializing ? h("span", { className: "dwb-spin" }, refreshIcon()) : createIcon()),
				));
			}
			const anyUnstaged = state.changes.some((change) => !stagedOf(change.code));
			return h("div", { className: props.refreshing ? "dwb-scroll dwb-busy" : "dwb-scroll" },
				h("div", { className: "dwb-branch" },
					h("span", { className: "dwb-branchlabel" }, "分支"),
					state.branch,
					h("span", { className: "dwb-pill" }, state.graph.length + " 条提交"),
				),
				h("div", { className: "dwb-section" }, "提交图"),
				state.graph.length === 0
					? h("div", { className: "dwb-note" }, "（无提交记录）")
					: h("div", { className: "dwb-graph" }, state.graph.map((row, index) => {
						const isHead = row.hash !== "" && row.hash === state.head;
						return h("div", {
							key: index,
							className: "dwb-graphrow",
							"data-head": isHead || undefined,
							title: row.author !== "" ? row.author + " · " + row.date : undefined,
						},
							h("span", { className: "dwb-graphcol" }, row.graph === "" ? " " : row.graph),
							row.hash !== "" ? h("span", { className: "dwb-hash" }, row.hash) : null,
							row.subject !== "" ? h("span", { className: "dwb-graphsubject" }, row.subject) : null,
							isHead ? h("span", { className: "dwb-headtag" }, "HEAD") : null,
						);
					})),
				h("div", { className: "dwb-section" },
					"工作区变更",
					anyUnstaged
						? h(TipButton, { tip: "全部暂存", className: "dwb-minibtn", onClick: props.onStageAll, disabled: props.mutating }, trayDownIcon())
						: null,
					h(TipButton, {
						tip: props.showIgnored ? "隐藏忽略文件" : "显示忽略文件",
						className: props.showIgnored ? "dwb-minibtn dwb-minibtnactive" : "dwb-minibtn",
						active: props.showIgnored,
						onClick: props.onToggleIgnored,
						disabled: props.mutating,
					}, props.showIgnored ? eyeIcon() : eyeOffIcon()),
				),
				state.changes.length === 0
					? h("div", { className: "dwb-note" }, "（工作区干净）")
					: state.changes.map((change) => {
						const staged = stagedOf(change.code);
						const untracked = change.code.trim() === "??";
						return h("div", { key: change.code + ":" + change.path, className: "dwb-change", "data-path": change.path },
							h("span", { className: "dwb-badge", "data-kind": badgeKind(change.code) }, change.code.trim() || change.code),
							h("span", { className: "dwb-changepath" }, change.path),
							untracked
								? h(TipButton, { tip: "忽略 " + change.path, className: "dwb-stagebtn", onClick: () => props.onIgnore(change.path), disabled: props.mutating }, banIcon())
								: null,
							h(TipButton, {
								tip: (staged ? "取消暂存" : "暂存") + " " + change.path,
								className: "dwb-stagebtn",
								onClick: () => (staged ? props.onUnstage : props.onStage)(change.path),
								disabled: props.mutating,
							}, staged ? minusIcon() : plusIcon()),
						);
					}),
				props.showIgnored
					? h(React.Fragment, null,
						h("div", { className: "dwb-section" }, "忽略的文件"),
						state.ignored.length === 0
							? h("div", { className: "dwb-note" }, "（无忽略文件）")
							: state.ignored.map((path) => h("div", { key: path, className: "dwb-change", "data-path": path },
								h("span", { className: "dwb-badge", "data-kind": "!" }, "!!"),
								h("span", { className: "dwb-changepath" }, path),
								h(TipButton, { tip: "取消忽略 " + path, className: "dwb-stagebtn", onClick: () => props.onUnignore(path), disabled: props.mutating }, undoIcon()),
							)),
					)
					: null,
				h("div", { className: "dwb-section" }, "提交"),
				h("div", { className: "dwb-commitrow" },
					h("input", {
						className: "dwb-commitinput",
						value: props.commitMessage,
						placeholder: "提交信息",
						spellCheck: false,
						onChange: (event) => props.setCommitMessage(event.target.value),
						onKeyDown: (event) => {
							if (event.key === "Enter" && props.commitMessage.trim() !== "" && !props.mutating) props.onCommit();
						},
					}),
					h(TipButton, {
						tip: "提交",
						className: "dwb-commitbtn",
						onClick: props.onCommit,
						disabled: props.mutating || props.commitMessage.trim() === "",
					}, props.mutating ? h("span", { className: "dwb-spin" }, refreshIcon()) : checkIcon()),
				),
				props.actionError !== undefined ? h("div", { className: "dwb-note", "data-error": true }, props.actionError) : null,
			);
		}

		// ── WorkbenchPanel ───────────────────────────────────────────────────
		function WorkbenchPanel(props) {
			const useSessions = props.useSessions;
			const cwd = typeof useSessions === "function"
				? useSessions((list) => {
					if (list.current === undefined) return undefined;
					const row = list.byId[list.current];
					return row === undefined ? undefined : row.cwd;
				})
				: undefined;
			const [open, setOpen] = useState(false);
			const [tab, setTab] = useState("files");
			const [refreshing, setRefreshing] = useState(false);
			const [root, setRoot] = useState(null);
			const [pathOverride, setPathOverride] = useState(undefined);
			const [git, setGit] = useState({ status: "idle" });
			const [initializing, setInitializing] = useState(false);
			const [mutating, setMutating] = useState(false);
			const [actionError, setActionError] = useState(undefined);
			const [commitMessage, setCommitMessage] = useState("");
			const [showIgnored, setShowIgnored] = useState(false);
			const [selected, setSelected] = useState(null);
			// Panel geometry: persisted width + tree pane width + live max bound.
			const [width, setWidth] = useState(() => readStored(WIDTH_KEY, PANEL_DEFAULT));
			const [treeWidth, setTreeWidth] = useState(() => readStored(SPLIT_KEY, TREE_DEFAULT));
			const [maxWidth, setMaxWidth] = useState(() => window.innerWidth - PANEL_MIN);
			const [resizing, setResizing] = useState(false);
			const [splitting, setSplitting] = useState(false);
			const rootRef = useRef(null);
			// Drag origins: the pointer's start x plus the value snapshot at
			// pointerdown (dx is measured against the pointer, not the value).
			const resizeOrigin = useRef({ x: 0, width });
			const splitOrigin = useRef({ x: 0, width: treeWidth });

			const path = pathOverride !== undefined ? pathOverride : cwd;
			useEffect(() => { setPathOverride(undefined); }, [cwd]);
			useEffect(() => { setCommitMessage(""); }, [path]);
			// A session/cwd switch invalidates the selected file's path.
			useEffect(() => { setSelected(null); }, [path]);

			// 持久化面板/分栏宽度（钳制后）。拖拽中 pointermove 会高频触发
			// setWidth，直接每次写 localStorage 会有写入抖动——统一走 150ms
			// trailing 防抖。定时器放 ref（函数体每次渲染重建，属性挂函数上
			// 会被新实例覆盖、卸载清理拿不到最后一个），卸载时把最后值落盘。
			const writeTimerRef = useRef(null);
			const debouncedWrite = (key, value) => {
				if (writeTimerRef.current !== null) clearTimeout(writeTimerRef.current);
				writeTimerRef.current = setTimeout(() => {
					writeTimerRef.current = null;
					writeStored(key, value);
				}, 150);
			};
			// 最新值镜像，供卸载清理时拿最终宽度落盘（闭包里的 width 会过期）。
			const widthRef = useRef(width);
			const treeWidthRef = useRef(treeWidth);
			widthRef.current = width;
			treeWidthRef.current = treeWidth;
			useEffect(() => { debouncedWrite(WIDTH_KEY, width); }, [width]);
			useEffect(() => { debouncedWrite(SPLIT_KEY, treeWidth); }, [treeWidth]);
			useEffect(() => () => {
				if (writeTimerRef.current !== null) clearTimeout(writeTimerRef.current);
				writeStored(WIDTH_KEY, widthRef.current);
				writeStored(SPLIT_KEY, treeWidthRef.current);
			}, []);

			// Live max bound = frame width − sidebar's rendered width (the panel
			// may cover everything right of the sidebar, never the sidebar).
			// The panel lives in the shell.overlay layer (positioned ancestor),
			// whose parent is the AppFrame grid; its first child is the sidebar
			// column. window resize and sidebar changes both land here.
			// Re-measured when the panel opens: while closed the root element
			// does not exist (rootRef is null), so a mount-only measure would
			// fall back to the full window width and let the panel cover the
			// sidebar.
			useEffect(() => {
				const measure = () => {
					const el = rootRef.current;
					if (el === null) return;
					const layer = el.offsetParent;
					const frame = layer !== null ? layer.parentElement : null;
					const sidebar = frame !== null && frame.firstElementChild !== null ? frame.firstElementChild : null;
					const sidebarWidth = sidebar !== null ? sidebar.getBoundingClientRect().width : 0;
					const frameWidth = frame !== null ? frame.getBoundingClientRect().width : window.innerWidth;
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

			// Keep the panel within the live bound, and FOLLOW the bound when the
			// panel was already pinned to it (sidebar collapse/expand or window
			// resize widens the right content area → a pinned panel expands too).
			const maxWidthRef = useRef(maxWidth);
			useEffect(() => {
				const previous = maxWidthRef.current;
				maxWidthRef.current = maxWidth;
				if (maxWidth === previous) return;
				setWidth((current) => {
					if (current >= previous - 2) return clampPanelWidth(maxWidth, maxWidth);
					return clampPanelWidth(current, maxWidth);
				});
			}, [maxWidth]);

			const [pathText, setPathText] = useState(path || "");
			useEffect(() => { setPathText(path || ""); }, [path]);

			// 提交路径框：去空白后若与当前会话 cwd 不同才设置 override
			//（相同则回落 undefined = 跟随会话 cwd，避免无意义的路径覆盖）。
			const applyPath = () => {
				const trimmed = pathText.trim();
				setPathOverride(trimmed.length > 0 && trimmed !== cwd ? trimmed : undefined);
			};

			// ── panel resize drag (left edge) ────────────────────────────────
			const onResizePointerDown = (event) => {
				event.preventDefault();
				event.currentTarget.setPointerCapture(event.pointerId);
				resizeOrigin.current = { x: event.clientX, width };
				setResizing(true);
			};
			const onResizePointerMove = (event) => {
				if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
				// Panel is docked right: dragging left (negative dx) widens it.
				const dx = event.clientX - resizeOrigin.current.x;
				setWidth(clampPanelWidth(resizeOrigin.current.width - dx, maxWidth));
			};
			const onResizePointerUp = (event) => {
				if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
				event.currentTarget.releasePointerCapture(event.pointerId);
				setResizing(false);
			};
			const onResizeDoubleClick = () => {
				setWidth(clampPanelWidth(PANEL_DEFAULT, maxWidth));
			};

			// ── split divider drag (tree pane width) ─────────────────────────
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

			// Opening a file from a narrow panel widens it enough to split.
			const onSelect = (node) => {
				if (width < SPLIT_MIN) setWidth(clampPanelWidth(AUTO_WIDEN, maxWidth));
				setSelected(node);
			};
			const onClosePreview = () => { setSelected(null); };

			const listDir = useCallback(async (dirPath, signal) => {
				const options = signal === undefined ? {} : { signal };
				const response = await fetch("/workbench/dir?path=" + encodeURIComponent(dirPath), options);
				return response.json();
			}, []);

			useEffect(() => {
				if (path === undefined) { setRoot(null); return; }
				const controller = new AbortController();
				const base = {
					path,
					name: path.split("/").filter((segment) => segment !== "").pop() || path,
					type: "directory",
					hidden: false,
					expanded: true,
					loading: true,
					loaded: false,
					children: [],
				};
				setRoot(base);
				listDir(path, controller.signal).then((listing) => {
					if (controller.signal.aborted) return;
					if (listing.ok !== true) {
						setRoot(Object.assign({}, base, { loading: false, error: listing.error || "目录读取失败" }));
						return;
					}
					const next = Object.assign({}, base, { loading: false, loaded: true, children: (listing.entries || []).map(toNode) });
					if (listing.truncated !== undefined) next.truncated = listing.truncated;
					setRoot(next);
				}).catch((error) => {
					if (controller.signal.aborted) return;
					setRoot(Object.assign({}, base, { loading: false, error: messageOf(error) }));
				});
				return () => controller.abort();
			}, [path, listDir]);

			// 把宿主返回的 git 事实体归一化进面板状态。GET 与每次 POST 变更都
			// 返回同构的 { ok, repo, branch, head, graph, changes, ignored }，
			// 这里统一消费——变更后直接用响应更新，省掉一次多余的全量重查
			// （每个 mutation 能省 4~6 次 git spawn）。
			// 注意：仅 ignore/unignore 变更的响应带 ignored 列表（宿主按路由
			// 决定是否跑 --ignored），其余变更响应 ignored 恒为 []——若用户正
			// 在「显示忽略项」视图里做暂存/提交，会误清空忽略列表，因此当新
			// 响应没有 ignored 数据时沿用上一次的列表。
			const applyGitFacts = (body) => {
				if (body.ok !== true) { setGit({ status: "error", error: body.error || "git 查询失败" }); return; }
				if (body.repo === false) {
					setGit(body.error === undefined ? { status: "not-repo" } : { status: "not-repo", error: body.error });
					return;
				}
				const freshIgnored = body.ignored || [];
				setGit((prev) => ({
					status: "ready",
					branch: body.branch || "",
					head: body.head || "",
					graph: body.graph || [],
					changes: body.changes || [],
					ignored: freshIgnored.length > 0 || prev.status !== "ready" ? freshIgnored : prev.ignored || [],
				}));
			};

			const loadGitState = useCallback(async (target, signal, withIgnored) => {
				setGit({ status: "loading" });
				try {
					const options = signal === undefined ? {} : { signal };
					const ignoredParam = withIgnored === true ? "&ignored=1" : "";
					const response = await fetch("/workbench/git?cwd=" + encodeURIComponent(target) + ignoredParam, options);
					if (!response.ok) { setGit({ status: "error", error: "git 查询失败（HTTP " + response.status + "）" }); return; }
					const body = await response.json();
					applyGitFacts(body);
				} catch (error) {
					if (signal !== undefined && error instanceof DOMException && error.name === "AbortError") return;
					setGit({ status: "error", error: messageOf(error) });
				}
			}, []);

			useEffect(() => {
				if (path === undefined) { setGit({ status: "idle" }); return; }
				const controller = new AbortController();
				void loadGitState(path, controller.signal, showIgnored);
				return () => controller.abort();
			}, [path, loadGitState, showIgnored]);

			const initRepo = async () => {
				if (path === undefined || initializing) return;
				setInitializing(true);
				try {
					// init 无请求体，但仍需 application/json 头（宿主 415 围栏）。
					const response = await fetch("/workbench/git/init?cwd=" + encodeURIComponent(path), {
						method: "POST",
						headers: { "content-type": "application/json" },
					});
					const body = await response.json();
					if (body.ok !== true) { setGit({ status: "error", error: body.error || "仓库创建失败" }); return; }
					// init 返回 { ok, cwd, branch }（尚无提交，无 graph/status）；
					// 走一次标准 GET 拿完整事实（含空仓库的 not-repo 归一）。
					await loadGitState(path);
				} catch (error) {
					setGit({ status: "error", error: messageOf(error) });
				} finally {
					setInitializing(false);
				}
			};

			const mutateGit = async (action, payload) => {
				if (path === undefined || mutating) return false;
				setMutating(true);
				setActionError(undefined);
				try {
					// 无请求体的变更（stage-all / commit 之外）也要带
					// application/json 头（宿主 415 围栏只认该媒体类型）。
					const options = {
						method: "POST",
						headers: { "content-type": "application/json" },
						...(payload === undefined ? {} : { body: JSON.stringify(payload) }),
					};
					const response = await fetch("/workbench/git/" + action + "?cwd=" + encodeURIComponent(path), options);
					const body = await response.json();
					if (body.ok !== true) { setActionError(body.error || "git 操作失败"); return false; }
					// 宿主在每个变更成功后都返回 FRESH 事实（与 GET 同构），
					// 直接消费即可，不再额外拉一轮（README 声称的一次往返）。
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
				if (node === undefined || node.loading) return;
				if (node.loaded) {
					setRoot(patchNode(root, dirPath, { expanded: !node.expanded }));
					return;
				}
				setRoot(patchNode(root, dirPath, { loading: true }));
				// 路径 epoch 守卫：在途列表返回时若面板已切到别的目录，根路径
				// 会变——此时 patch 会落到新树上（同名路径可能被写入过期子项）。
				// 用根 path 是否仍等于发起时的 dirPath 的祖先来判别并丢弃。
				const rootPathAtToggle = root.path;
				listDir(dirPath).then((listing) => {
					setRoot((current) => {
						if (current === null) return current;
						if (current.path !== rootPathAtToggle) return current;
						const patch = { loading: false, loaded: true, expanded: true };
						if (listing.ok === true) {
							if (listing.truncated !== undefined) patch.truncated = listing.truncated;
							patch.children = (listing.entries || []).map(toNode);
						} else {
							patch.error = listing.error || "目录读取失败";
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
								return previous === undefined ? toNode(entry) : Object.assign({}, previous, { name: entry.name, hidden: entry.hidden });
							}) };
							if (listing.truncated !== undefined) patch.truncated = listing.truncated;
							return patchNode(current, node.path, patch);
						});
					}
				} catch {
					// Keep the stale subtree visible; the refresh is best-effort.
				}
				// 已展开的子目录并行刷新（原先串行，N 层展开要多 N 个往返）。
				await Promise.all(
					node.children
						.filter((child) => child.loaded && child.expanded)
						.map((child) => refreshNode(child)),
				);
			};

			const refresh = () => {
				if (refreshing) return;
				setRefreshing(true);
				const tasks = [];
				if (root !== null) tasks.push(refreshNode(root));
				if (path !== undefined) tasks.push(loadGitState(path, undefined, showIgnored));
				Promise.allSettled(tasks).then(() => setRefreshing(false));
			};

			if (!open) {
				return h(TipButton, { tip: "展开工作面板", className: "dwb-openbtn", onClick: () => setOpen(true) }, "工作面板");
			}

			const splitMode = selected !== null && width >= SPLIT_MIN;

			return h("div", {
				ref: rootRef,
				className: "dwb-root" + ((resizing || splitting) ? " dwb-dragging" : ""),
				style: { width: width + "px" },
			},
				h("div", {
					className: "dwb-resize",
					"data-dragging": resizing || undefined,
					title: "拖动调整宽度（双击重置）",
					onPointerDown: onResizePointerDown,
					onPointerMove: onResizePointerMove,
					onPointerUp: onResizePointerUp,
					onDoubleClick: onResizeDoubleClick,
				}),
				h("div", { className: "dwb-header" },
					h("span", { className: "dwb-title" }, "工作面板"),
					h("input", {
						className: "dwb-pathinput",
						value: pathText,
						placeholder: "工作目录路径",
						title: path || "",
						spellCheck: false,
						onChange: (event) => setPathText(event.target.value),
						onBlur: applyPath,
						onKeyDown: (event) => {
							if (event.key === "Enter") { applyPath(); event.currentTarget.blur(); }
						},
					}),
					h(TipButton, { tip: "刷新", className: "dwb-iconbtn", onClick: refresh, disabled: refreshing },
						h("span", { className: refreshing ? "dwb-spin" : undefined }, refreshIcon())),
					h(TipButton, { tip: "收起", className: "dwb-iconbtn", onClick: () => setOpen(false) }, closeIcon()),
				),
				h("div", { className: "dwb-tabs" },
					h(TipButton, { tip: "目录", className: "dwb-tabbtn", active: tab === "files", onClick: () => setTab("files") }, folderIcon()),
					h(TipButton, { tip: "Git", className: "dwb-tabbtn", active: tab === "git", onClick: () => setTab("git") }, branchIcon()),
				),
				tab === "files"
					? (splitMode
						? h("div", { className: "dwb-split" },
							h("div", { className: "dwb-split-pane", style: { width: treeWidth + "px" } },
								h(FilesView, { refreshing, root, onToggle, selected, onSelect })),
							h("div", {
								className: "dwb-split-divider",
								"data-dragging": splitting || undefined,
								onPointerDown: onDividerPointerDown,
								onPointerMove: onDividerPointerMove,
								onPointerUp: onDividerPointerUp,
							}),
							h("div", { className: "dwb-split-pane", style: { flex: 1 } },
								h(FilePreview, { file: selected, back: false, onClose: onClosePreview })),
						)
						: (selected !== null
							? h(FilePreview, { file: selected, back: true, onClose: onClosePreview })
							: h(FilesView, { refreshing, root, onToggle, selected, onSelect })))
					: h(GitView, {
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
							void mutateGit("commit", { message }).then((ok) => { if (ok) setCommitMessage(""); });
						},
						onIgnore: (p) => void mutateGit("ignore", { path: p }),
						onUnignore: (p) => void mutateGit("unignore", { path: p }),
						showIgnored,
						onToggleIgnored: () => setShowIgnored((prev) => !prev),
						commitMessage,
						setCommitMessage,
					}),
				h("div", { className: "dwb-footer" }, "工作面板 · 文件与 Git"),
			);
		}

		// ── plugin exports ───────────────────────────────────────────────────
		exports.name = "dsh-work";
		exports.inject = ["slots"];
		exports.apply = function apply(ctx) {
			ctx.effect(
				() => ctx.slots.inject("shell.overlay", () => ctx.slots.register({
					name: "shell.overlay",
					id: "workbench",
					order: 100,
					label: "Workbench",
				}, WorkbenchPanel)),
				"dsh-work: overlay registration",
			);
		};
		// Pure preview helpers exported for the node test suite; the loader
		// consumes only name/inject/apply, so these stay inert at runtime.
		exports.escapeHtml = escapeHtml;
		exports.highlightCode = highlightCode;
		exports.renderMarkdown = renderMarkdown;
		exports.htmlPreviewSrc = htmlPreviewSrc;
		exports.mdLinkHref = mdLinkHref;
		exports.mdImageHref = mdImageHref;
		exports.HL_LANG_BY_EXT = HL_LANG_BY_EXT;
		exports.PREVIEW_KIND = PREVIEW_KIND;
		return module.exports;
	},
});
