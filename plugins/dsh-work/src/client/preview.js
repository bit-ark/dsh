/** dsh-work — 文件预览：文本/代码（CodeMirror）、markdown/html、图片/音视频。 */
import React from 'react'
import { TipButton } from './tip.js'
import { assetUrl, classifyFile, formatSize } from './helpers.js'
import { HL_LANG_BY_EXT } from './highlight.js'
import { renderMarkdown } from './markdown.js'
import { cmApi, cmSetup, htmlPreviewSrc } from './editor.js'
import { checkIcon, closeIcon, codeIcon, eyeIcon, fileIconFor, refreshIcon, saveIcon, vscodeIcon } from './icons.js'
const h = React.createElement
const { useState, useEffect, useRef } = React

		// ── File preview ─────────────────────────────────────────────────────
		/** Document kinds get a 源码 | 预览 switch; everything else stays source. */
		export const PREVIEW_KIND = { md: "markdown", markdown: "markdown", mdx: "markdown", html: "html", htm: "html" };

		export function FilePreview(props) {
			const file = props.file;
			const kind = classifyFile(file.name);
			const dot = file.name.lastIndexOf(".");
			const ext = dot > 0 ? file.name.slice(dot + 1).toLowerCase() : "";
			const lang = HL_LANG_BY_EXT[ext];
			const previewKind = PREVIEW_KIND[ext] ?? null;
			const [state, setState] = useState({ status: "loading", content: "", truncated: false });
			const [view, setView] = useState(previewKind !== null ? "preview" : "source");
			// 编辑状态:脏标记 / 保存中 / 保存成功闪示 / 保存错误。
			const [dirty, setDirty] = useState(false);
			const [saving, setSaving] = useState(false);
			const [flash, setFlash] = useState(false);
			const [saveError, setSaveError] = useState(null);
			const editorHostRef = useRef(null);
			const editorViewRef = useRef(null);
			// 当前文件的路径镜像：保存/打开是异步的，期间用户可能已切到别的
			// 文件，响应回来时要按路径比对丢弃过期结果（FilePreview 实例跨
			// 文件复用，state 不会因 file.path 变化而重置）。
			const currentPathRef = useRef(file.path);
			// Document kinds open on their rendering (the point of previewing a
			// README or a page); code files open on highlighted source.
			useEffect(() => {
				if (kind !== "text") return;
				const controller = new AbortController();
				setState({ status: "loading", content: "", truncated: false });
				// full=1:编辑器需要完整内容(上限 1MB),超限只读;预览截断照旧。
				fetch("/workbench/file?path=" + encodeURIComponent(file.path) + "&full=1", { signal: controller.signal })
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
			// 编辑器挂载:内容就绪后在源码容器里创建 CodeMirror 实例;容器在
			// 预览视图下隐藏但不卸载,切回源码时编辑内容仍在。
			useEffect(() => {
				if (kind !== "text" || state.status !== "ready") return;
				const host = editorHostRef.current;
				if (host === null || editorViewRef.current !== null) return;
				const cm = cmApi();
				const readOnly = state.truncated === true;
				const view = new cm.EditorView({
					state: cm.EditorState.create({
						doc: state.content,
						extensions: [
							...cmSetup(ext, readOnly),
							cm.EditorView.updateListener.of((update) => {
								if (update.docChanged) setDirty(true);
							}),
						],
					}),
					parent: host,
				});
				editorViewRef.current = view;
				return () => {
					view.destroy();
					editorViewRef.current = null;
				};
			}, [kind, state.status, file.path, ext]);
			// 切换文件时清掉上一文件的编辑痕迹。
			useEffect(() => {
				currentPathRef.current = file.path;
				setDirty(false);
				setSaving(false);
				setFlash(false);
				setSaveError(null);
			}, [file.path]);
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
			/** 保存当前编辑内容到文件(宿主 /workbench/write,原子写)。 */
			const saveFile = () => {
				const view = editorViewRef.current;
				if (view === null || saving || !dirty) return;
				const content = view.state.doc.toString();
				const savedPath = file.path;
				setSaving(true);
				setSaveError(null);
				fetch("/workbench/write", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ path: file.path, content }),
				})
					.then((response) => response.json().catch(() => ({ ok: false, error: "保存失败（HTTP " + response.status + "）——宿主写路由未就绪？请重启 dsh web" })))
					.then((body) => {
						if (currentPathRef.current !== savedPath) return; // 保存期间已切换文件,丢弃过期响应
						setSaving(false);
						if (body.ok !== true) {
							setSaveError(body.error || "保存失败");
							return;
						}
						setDirty(false);
						setFlash(true);
						window.setTimeout(() => setFlash(false), 1500);
						// 预览与源码保持同源:保存成功后刷新内容,预览 tab 立即反映。
						setState((s) => ({ ...s, content, truncated: false, status: "ready" }));
					})
					.catch((error) => {
						if (currentPathRef.current !== savedPath) return;
						setSaving(false);
						setSaveError(error instanceof Error ? error.message : String(error));
					});
			};
			/** 在宿主的 VS Code(或系统默认编辑器)中打开文件。 */
			const openInVscode = () => {
				setSaveError(null);
				const openedPath = file.path;
				fetch("/workbench/open", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ path: file.path }),
				})
					.then((response) => response.json().catch(() => ({ ok: false, error: "打开失败（HTTP " + response.status + "）——宿主路由未就绪？请重启 dsh web" })))
					.then((body) => {
						if (currentPathRef.current !== openedPath) return; // 期间已切换文件,错误不落在新文件上
						if (body.ok !== true) setSaveError(body.error || "打开失败");
					})
					.catch((error) => {
						if (currentPathRef.current !== openedPath) return;
						setSaveError(error instanceof Error ? error.message : String(error));
					});
			};
			const editable = kind === "text" && state.status === "ready" && state.truncated !== true;
			const header = h("div", { className: "dwb-previewheader" },
				back,
				h("div", { className: "dwb-previewmeta" },
					h("div", { className: "dwb-previewname", title: file.path }, file.name),
					h("div", { className: "dwb-previewsub" }, subtitle),
				),
				kind === "text"
					? h("div", { className: "dwb-previewactions" },
						previewKind !== null
							? h("div", { className: "dwb-viewgroup" },
								h(TipButton, { tip: "源码", className: "dwb-viewgroupbtn", active: view === "source" || undefined, onClick: () => setView("source") }, codeIcon()),
								h(TipButton, { tip: "预览", className: "dwb-viewgroupbtn", active: view === "preview" || undefined, onClick: () => setView("preview") }, eyeIcon()),
							)
							: null,
						editable
							? h(TipButton, { tip: "在 VS Code 中打开", className: "dwb-minibtn", onClick: openInVscode }, vscodeIcon())
							: null,
						editable
							? h(TipButton, {
								tip: saving ? "保存中…" : flash ? "已保存" : dirty ? "保存" : "已保存",
								className: "dwb-minibtn dwb-savebtn" + (flash ? " dwb-savebtn-ok" : ""),
								disabled: saving || (!dirty && !flash) || undefined,
								onClick: saveFile,
							},
								saving
									? h("span", { className: "dwb-spin" }, refreshIcon())
									: flash ? checkIcon() : saveIcon(),
							)
							: null,
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
					// 编辑器容器始终挂载(源码视图显示,预览视图隐藏但保留编辑内容);
					// md/html 的渲染结果仅在预览视图下追加为兄弟节点。
					const inPreview = previewKind !== null && view === "preview";
					const pieces = [
						h("div", {
							key: "editor",
							ref: editorHostRef,
							className: "dwb-editor",
							"data-hidden": inPreview || undefined,
						}),
					];
					if (previewKind === "markdown" && view === "preview") {
						pieces.push(h("div", { key: "md", className: "dwb-preview-md", dangerouslySetInnerHTML: { __html: renderMarkdown(state.content, dir) } }));
					} else if (previewKind === "html" && view === "preview") {
						pieces.push(h("iframe", { key: "html", className: "dwb-preview-frame", sandbox: "allow-scripts", srcDoc: htmlPreviewSrc(state.content, dir), title: file.name }));
					}
					body = h("div", { className: "dwb-previewscroll dwb-editorscroll" },
						...pieces,
						state.truncated ? h("div", { className: "dwb-note" }, "（文件超过 1MB，仅加载开头，编辑已禁用）") : null,
						saveError !== null ? h("div", { className: "dwb-note", "data-error": true }, saveError) : null,
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
