/**
 * dsh-work — WorkbenchPanel：右侧停靠面板（shell.overlay）+ 三列联动。
 */
import React from 'react'
import { TipButton } from './tip.js'
import { AUTO_WIDEN, CONTENT_MIN, PANEL_DEFAULT, PANEL_MIN, SPLIT_KEY, TREE_DEFAULT, TREE_MIN, WIDTH_KEY, clampPanelWidth, clampTreeWidth, findNode, messageOf, patchNode, readStored, toNode, writeStored } from './helpers.js'
import { chevronIcon, closeIcon, IconFrame, refreshIcon } from './icons.js'
import { FilesView } from './files-view.js'
import { FilePreview } from './preview.js'
import { GitView } from './git-view.js'
const h = React.createElement
const { useState, useEffect, useCallback, useRef } = React

		// ── WorkbenchPanel ───────────────────────────────────────────────────
		export function WorkbenchPanel(props) {
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
			// 两栏常驻下，面板变窄（拖窄/双击重置/窗口缩放）时树宽必须同步
			// 钳回 [TREE_MIN, 面板宽−CONTENT_MIN]，否则树会把内容区挤没。
			// 只在面板变窄时收紧；变宽时保持当前树宽（用户拖过的值不自动放宽）。
			const prevWidthRef = useRef(width);
			useEffect(() => {
				const previous = prevWidthRef.current;
				prevWidthRef.current = width;
				if (width >= previous) return;
				setTreeWidth((current) => {
					const next = clampTreeWidth(current, width);
					return next === current ? current : next;
				});
			}, [width]);
			useEffect(() => () => {
				if (writeTimerRef.current !== null) clearTimeout(writeTimerRef.current);
				if (resizeClickTimer.current !== null) clearTimeout(resizeClickTimer.current);
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
			// 单击手柄直接收起面板；拖拽调宽与双击重置宽度不受影响。
			// 手势区分：pointermove 位移 >4px 视为拖拽（click 被忽略）；
			// 单击延迟 300ms 执行收起，双击的第二击会取消它（交由
			// onDoubleClick 重置宽度）。
			const resizeDragMoved = useRef(false);
			const resizeClickTimer = useRef(null);
			const onResizePointerDown = (event) => {
				event.preventDefault();
				event.currentTarget.setPointerCapture(event.pointerId);
				resizeOrigin.current = { x: event.clientX, width };
				resizeDragMoved.current = false;
				setResizing(true);
			};
			const onResizePointerMove = (event) => {
				if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
				// Panel is docked right: dragging left (negative dx) widens it.
				const dx = event.clientX - resizeOrigin.current.x;
				if (Math.abs(dx) > 4) resizeDragMoved.current = true;
				setWidth(clampPanelWidth(resizeOrigin.current.width - dx, maxWidth));
			};
			const onResizePointerUp = (event) => {
				if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
				event.currentTarget.releasePointerCapture(event.pointerId);
				setResizing(false);
				// 单击手柄收起：pointer capture 会把后续 click 重定向到轨道
				// 元素（子手柄收不到），所以在 pointerup 直接判定——
				// 无位移视为单击，延迟 300ms 执行收起，双击第二击取消
				// （交由 onDoubleClick 重置宽度）。
				if (resizeDragMoved.current) { resizeDragMoved.current = false; return; }
				if (resizeClickTimer.current !== null) {
					clearTimeout(resizeClickTimer.current);
					resizeClickTimer.current = null;
					return;
				}
				resizeClickTimer.current = window.setTimeout(() => {
					resizeClickTimer.current = null;
					setOpen(false);
				}, 300);
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

			// Opening a file from a narrow panel widens it enough to fit both
			// panes (tree + content). 两栏常驻：选中文件即分栏。
			const onSelect = (node) => {
				if (width < TREE_MIN + CONTENT_MIN) setWidth(clampPanelWidth(AUTO_WIDEN, maxWidth));
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

			// 两栏常驻：只要选中了文件就分栏（目录树 | 内容预览），
			// 不再受面板宽度门槛限制——窄面板由 clampTreeWidth 让树让位。
			const splitMode = selected !== null;

			return h(React.Fragment, null,
				h("div", {
					className: "dwb-resize",
					"data-dragging": resizing || undefined,
					title: "拖动调整宽度（双击重置）",
					style: { right: (width - 4) + "px" },
					onPointerDown: onResizePointerDown,
					onPointerMove: onResizePointerMove,
					onPointerUp: onResizePointerUp,
					onDoubleClick: onResizeDoubleClick,
				},
					h("div", {
						className: "dwb-resize-grip",
						title: "单击收起面板",
					},
						h("span", { className: "dwb-resize-arrow" }, h(IconFrame, { size: 13 }, h("path", { d: "M9 6l6 6-6 6" }))),
					),
				),
				h("div", {
					ref: rootRef,
					className: "dwb-root" + ((resizing || splitting) ? " dwb-dragging" : ""),
					style: { width: width + "px" },
				},
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
					h("button", {
						type: "button",
						className: "dwb-tabbtn",
						"data-active": tab === "files" || undefined,
						"aria-label": "目录",
						onClick: () => setTab("files"),
					}, "目录"),
					h("button", {
						type: "button",
						className: "dwb-tabbtn",
						"data-active": tab === "git" || undefined,
						"aria-label": "Git",
						onClick: () => setTab("git"),
					}, "Git"),
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
						: h(FilesView, { refreshing, root, onToggle, selected, onSelect }))
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
				),
			);
		}

		// ── 三列联动：面板宽度 ↔ 中间对话列宽度 ───────────────────────────────
		// 面板注册在 shell.overlay（绝对定位悬浮层，脱离 AppFrame 的三列
		// grid），加宽时只会盖住对话区。这里观察面板宽度并把中间列的
		// margin-right 设为同宽，让对话区实时让位——形成「侧栏 | 对话 |
		// 工作面板」互相影响宽度的三列布局。纯 DOM 观察，不改框架源码。
		// 面板根节点位于 overlay 渲染层的包装 div 内部（非直接子节点），
		// 须用 descendant 查询；开/关切换发生在包装 div 内，childList
		// 观察须带 subtree。
		export const DOCK_CENTER_FLOOR = 480; // 对话区保底宽度（px）
		export function installDockCoupling() {
			let disposed = false;
			let panelObserver = null;
			let frameObserver = null;
			let panelResize = null;
			let panelRoot = null;
			let centerCol = null;
			let frameEl = null;
			let retryTimer = null;

			// 联动核心：面板宽度 → 中间列 margin-right。
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
					// details 列打开时联动置 0：原生细节列接管右缘，避免双挤压。
					const detailsOpen = !frameEl.hasAttribute("data-details-collapsed");
					let effective = 0;
					if (!detailsOpen) {
						const cap = Math.max(0, frameW - sidebarW - DOCK_CENTER_FLOOR);
						effective = Math.min(panelW, cap);
					}
					centerCol.style.marginRight = Math.round(effective) + "px";
				} catch (error) {
					// 任何测量失败都保持布局不动。
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
				if (centerCol === undefined) return;

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
				if (layer !== null) { attach(layer); return; }
				// 有界重试，防启动时序；找不到就静默放弃（no-op）。
				let tries = 0;
				retryTimer = setInterval(() => {
					if (disposed) { clearInterval(retryTimer); return; }
					tries += 1;
					const found = document.querySelector("[data-shell-overlay]");
					if (found !== null) { clearInterval(retryTimer); retryTimer = null; attach(found); }
					else if (tries >= 20) { clearInterval(retryTimer); retryTimer = null; }
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
