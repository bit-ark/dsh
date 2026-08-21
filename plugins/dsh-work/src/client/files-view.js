/** dsh-work — 目录 tab：文件/目录树渲染。 */
import React from 'react'
import { chevronIcon, fileIconFor, folderClosedIcon, folderOpenIcon } from './icons.js'
import { formatSize } from './helpers.js'
const h = React.createElement

		// ── Files tab ────────────────────────────────────────────────────────
		export function FilesView(props) {
			if (props.root === null) {
				return h("div", { className: "dwb-scroll" }, h("div", { className: "dwb-note" }, "无工作目录（未选择会话）"));
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
