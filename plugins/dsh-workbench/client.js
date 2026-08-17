window.__ModuleLoader__.load({
	id: "dsh-workbench",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");
		const h = React.createElement;
		const { useState, useEffect, useCallback } = React;

		// ── styles: one tagged sheet, claimed by the loader on unload ────────
		const CSS = `
.dwb-root { position: absolute; top: 0; right: 0; bottom: 0; width: 344px; display: flex; flex-direction: column; background: var(--dsw-alias-bg-layer-2); border-left: 1px solid var(--dsw-alias-border-l2); box-shadow: -8px 0 24px rgba(0,0,0,.08); color: var(--dsw-alias-label-primary); font-size: 13px; overflow: hidden; }
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
.dwb-openbtn { position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 28px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 8px 0 0 8px; border: 1px solid var(--dsw-alias-border-l2); border-right: none; background: var(--dsw-alias-button-floating-fill); color: var(--dsw-alias-label-secondary); cursor: pointer; box-shadow: -4px 0 12px rgba(0,0,0,.08); }
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
@media (prefers-reduced-motion: reduce) { .dwb-tip { animation: none; } }
`;
		if (typeof document !== "undefined" && document.getElementById("dsh-workbench-style") === null) {
			const styleEl = document.createElement("style");
			styleEl.id = "dsh-workbench-style";
			styleEl.setAttribute("data-plugin", "dsh-workbench");
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
		function findNode(node, path) {
			if (node.path === path) return node;
			for (let i = 0; i < node.children.length; i++) {
				const found = findNode(node.children[i], path);
				if (found !== undefined) return found;
			}
			return undefined;
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
		const panelIcon = () => h(IconFrame, { size: 16 }, h("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }), h("path", { d: "M12 4v16" }));
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

		// ── File preview ─────────────────────────────────────────────────────
		function FilePreview(props) {
			const file = props.file;
			const kind = classifyFile(file.name);
			const [state, setState] = useState({ status: "loading", content: "", truncated: false });
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
			const back = h(TipButton, { tip: "返回目录", className: "dwb-minibtn", onClick: props.onClose }, h("span", null, "←"));
			const subtitle = (file.size !== undefined ? formatSize(file.size) : "") + (kind === "other" ? " · " + file.name.split(".").pop() + " 类型" : "");
			const header = h("div", { className: "dwb-previewheader" },
				back,
				h("div", { className: "dwb-previewmeta" },
					h("div", { className: "dwb-previewname", title: file.path }, file.name),
					h("div", { className: "dwb-previewsub" }, subtitle),
				),
			);
			let body;
			if (kind === "text") {
				if (state.status === "loading") {
					body = h("div", { className: "dwb-previewnote" }, "加载中…");
				} else if (state.status === "error") {
					body = h("div", { className: "dwb-previewnote", "data-error": true }, state.error);
				} else {
					body = h("div", { className: "dwb-previewscroll" },
						h("pre", { className: "dwb-previewtext" }, state.content),
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
			const [open, setOpen] = useState(true);
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

			const path = pathOverride !== undefined ? pathOverride : cwd;
			useEffect(() => { setPathOverride(undefined); }, [cwd]);
			useEffect(() => { setCommitMessage(""); }, [path]);
			// A session/cwd switch invalidates the selected file's path.
			useEffect(() => { setSelected(null); }, [path]);

			const [pathText, setPathText] = useState(path || "");
			useEffect(() => { setPathText(path || ""); }, [path]);

			const applyPath = () => {
				const trimmed = pathText.trim();
				setPathOverride(trimmed.length > 0 && trimmed !== cwd ? trimmed : undefined);
			};

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

			const loadGitState = useCallback(async (target, signal, withIgnored) => {
				setGit({ status: "loading" });
				try {
					const options = signal === undefined ? {} : { signal };
					const ignoredParam = withIgnored === true ? "&ignored=1" : "";
					const response = await fetch("/workbench/git?cwd=" + encodeURIComponent(target) + ignoredParam, options);
					if (!response.ok) { setGit({ status: "error", error: "git 查询失败（HTTP " + response.status + "）" }); return; }
					const body = await response.json();
					if (body.ok !== true) { setGit({ status: "error", error: body.error || "git 查询失败" }); return; }
					if (body.repo === false) {
						setGit(body.error === undefined ? { status: "not-repo" } : { status: "not-repo", error: body.error });
						return;
					}
					setGit({
						status: "ready",
						branch: body.branch || "",
						head: body.head || "",
						graph: body.graph || [],
						changes: body.changes || [],
						ignored: body.ignored || [],
					});
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
					const response = await fetch("/workbench/git/init?cwd=" + encodeURIComponent(path), { method: "POST" });
					const body = await response.json();
					if (body.ok !== true) { setGit({ status: "error", error: body.error || "仓库创建失败" }); return; }
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
					const options = payload === undefined
						? { method: "POST" }
						: { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) };
					const response = await fetch("/workbench/git/" + action + "?cwd=" + encodeURIComponent(path), options);
					const body = await response.json();
					if (body.ok !== true) { setActionError(body.error || "git 操作失败"); return false; }
					await loadGitState(path, undefined, showIgnored);
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
				listDir(dirPath).then((listing) => {
					setRoot((current) => {
						if (current === null) return current;
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
					setRoot((current) => current === null ? current : patchNode(current, dirPath, { loading: false, error: messageOf(error) }));
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
				for (let i = 0; i < node.children.length; i++) {
					const child = node.children[i];
					if (child.loaded && child.expanded) await refreshNode(child);
				}
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
				return h(TipButton, { tip: "展开工作面板", className: "dwb-openbtn", onClick: () => setOpen(true) }, panelIcon());
			}

			return h("div", { className: "dwb-root" },
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
					? (selected !== null
						? h(FilePreview, { file: selected, onClose: () => setSelected(null) })
						: h(FilesView, { refreshing, root, onToggle, selected, onSelect: (node) => setSelected(node) }))
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
		exports.name = "dsh-workbench";
		exports.inject = ["slots"];
		exports.apply = function apply(ctx) {
			ctx.effect(
				() => ctx.slots.inject("shell.overlay", () => ctx.slots.register({
					name: "shell.overlay",
					id: "workbench",
					order: 100,
					label: "Workbench",
				}, WorkbenchPanel)),
				"dsh-workbench: overlay registration",
			);
		};
		return module.exports;
	},
});
