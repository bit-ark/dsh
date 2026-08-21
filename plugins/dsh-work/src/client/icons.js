/** dsh-work — 图标组件（React.createElement 手写 SVG）。 */
import React from 'react'
const h = React.createElement

		// ── icons ────────────────────────────────────────────────────────────
		export function IconFrame(props) {
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
		export const folderIcon = () => h(IconFrame, { size: 15 }, h("path", { d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }));
		export const branchIcon = () => h(IconFrame, { size: 15 },
			h("circle", { cx: "6", cy: "5", r: "2" }),
			h("circle", { cx: "6", cy: "19", r: "2" }),
			h("circle", { cx: "18", cy: "9", r: "2" }),
			h("path", { d: "M6 7v9.5" }),
			h("path", { d: "M18 11c0 4-6 3.4-9.4 5" }),
		);
		export const refreshIcon = () => h(IconFrame, null,
			h("path", { d: "M20 12a8 8 0 1 1-2.34-5.66" }),
			h("path", { d: "M20 4v4h-4" }),
		);
		export const closeIcon = () => h(IconFrame, null, h("path", { d: "M6 6l12 12M18 6L6 18" }));
		export const kanbanIcon = () => h(IconFrame, { size: 15 },
			h("rect", { x: "3", y: "4", width: "5", height: "13", rx: "1" }),
			h("rect", { x: "9.5", y: "4", width: "5", height: "16", rx: "1" }),
			h("rect", { x: "16", y: "4", width: "5", height: "9", rx: "1" }),
		);
		export const plusIcon = () => h(IconFrame, { size: 12 }, h("path", { d: "M12 5v14M5 12h14" }));
		export const minusIcon = () => h(IconFrame, { size: 12 }, h("path", { d: "M5 12h14" }));
		export const trayDownIcon = () => h(IconFrame, { size: 13 }, h("path", { d: "M12 4v10M8 10l4 4 4-4M4 19h16" }));
		export const undoIcon = () => h(IconFrame, { size: 13 }, h("path", { d: "M4 12a8 8 0 1 0 2.5-5.8" }), h("path", { d: "M4 4v4h4" }));
		export const banIcon = () => h(IconFrame, { size: 13 }, h("circle", { cx: "12", cy: "12", r: "8" }), h("path", { d: "M5 5l14 14" }));
		export const eyeIcon = () => h(IconFrame, { size: 13 },
			h("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" }),
			h("circle", { cx: "12", cy: "12", r: "3" }),
		);
		export const eyeOffIcon = () => h(IconFrame, { size: 13 },
			h("path", { d: "M4 4l16 16" }),
			h("path", { d: "M9.5 5.2A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.1 6.1A17 17 0 0 0 2 12s3.5 7 10 7c1.7 0 3.2-.4 4.5-1" }),
			h("path", { d: "M10 10a3 3 0 0 0 4 4" }),
		);
		export const checkIcon = () => h(IconFrame, { size: 14 }, h("path", { d: "M5 12l5 5 9-10" }));
		export const codeIcon = () => h(IconFrame, { size: 13 },
			h("path", { d: "M8.5 8.5 4.5 12l4 3.5" }),
			h("path", { d: "M15.5 8.5l4 3.5-4 3.5" }),
			h("path", { d: "M13.5 6.5l-3 11" }),
		);
		export const saveIcon = () => h(IconFrame, { size: 13 },
			h("path", { d: "M5 3.5h10.6L19.5 7.9V19a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5z" }),
			h("path", { d: "M8 3.5V8h6.5V3.5" }),
			h("path", { d: "M7.5 14.5h9V20h-9z" }),
		);
		// VS Code 四格 logo（单色 currentColor，与其他图标颜色一致；轮廓路径取自 devicon vscode-original，MIT）。
		export const vscodeIcon = () => h("svg", {
			viewBox: "0 0 128 128",
			width: 13,
			height: 13,
			fill: "none",
			"aria-hidden": true,
		},
			h("path", { fill: "currentColor", d: "M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z" }),
		);
		export const createIcon = () => h(IconFrame, { size: 14 },
			h("path", { d: "M8 3h8a1 1 0 0 1 1 1v3" }),
			h("path", { d: "M3 8v8a1 1 0 0 0 1 1h3" }),
			h("path", { d: "M16 21h3a1 1 0 0 0 1-1v-3" }),
			h("path", { d: "M21 8V5a1 1 0 0 0-1-1h-3" }),
			h("path", { d: "M12 7v6M9 10h6" }),
		);
		export const chevronIcon = () => h(IconFrame, { size: 10 }, h("path", { d: "M9 6l6 6-6 6" }));
export const backIcon = () => h(IconFrame, { size: 13 }, h("path", { d: "M14 4l-7 8 7 8" }), h("path", { d: "M7 12h12" }));
export const forwardIcon = () => h(IconFrame, { size: 13 }, h("path", { d: "M10 4l7 8-7 8" }), h("path", { d: "M17 12H5" }));
export const browserIcon = () => h(IconFrame, { size: 14 },
  h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
  h("path", { d: "M3 8h18" }),
  h("circle", { cx: "6", cy: "5.5", r: "0.8", fill: "currentColor" }),
);
// 终端图标：命令行提示符（>_）。
export const terminalIcon = () => h(IconFrame, { size: 14 },
  h("path", { d: "M4 5l4 4-4 4" }),
  h("path", { d: "M10 13h7" }),
);
		export const folderClosedIcon = () => h(IconFrame, { size: 14 }, h("path", { d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }));
		export const folderOpenIcon = () => h(IconFrame, { size: 14 },
			h("path", { d: "M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v1H6.4a2 2 0 0 0-1.9 1.4L3 15z" }),
			h("path", { d: "M3.2 14.8 4.7 9.6a2 2 0 0 1 1.9-1.4H21l-2 7.2a2 2 0 0 1-2 1.4H5.2a2 2 0 0 1-2-2z" }),
		);
		export function fileIconFor(name) {
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
