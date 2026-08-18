/**
 * dsh-work — WorkbenchPanel：右侧停靠面板（shell.overlay）+ 三列联动。
 */
import React from 'react'
import { TipButton } from './tip.js'
import { AUTO_WIDEN, CONTENT_MIN, PANEL_DEFAULT, PANEL_MIN, SPLIT_KEY, TREE_DEFAULT, TREE_MIN, WIDTH_KEY, clampPanelWidth, clampTreeWidth, cubicBezierEase, findNode, messageOf, panelActionFor, patchNode, readStored, toNode, writeStored } from './helpers.js'
import { closeIcon, IconFrame, refreshIcon } from './icons.js'
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
			const [width, setWidth] = useState(() => Math.max(PANEL_MIN, readStored(WIDTH_KEY, PANEL_DEFAULT)));
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

			// ── 宽度动画（JS 逐帧 tween，与主框架左侧栏同一曲线/时长）─────────
			// 用逐帧 setWidth 而不是 CSS transition：树分栏钳制与三列联动都
			// 跟随 width 状态，逐帧驱动才能让树栏、对话列与面板边缘同步滑动
			// （CSS 过渡只有最终状态，树栏会瞬跳）。动画期间抑制 localStorage
			// 写入（中间帧不入盘），结束时按 persist 落最终值。
			const tweenRef = useRef(null);
			const tweeningRef = useRef(false);
			const stopTween = () => {
				// 中断动画：取消 rAF 后 onEnd 不再触发（滑出/收窄以中断点为终点）。
				// 必须同时复位动画标志——否则动画中途被抓手柄打断后，tweeningRef
				// 恒为 true，后续拖拽的宽度变更会一直跳过持久化（刷新后宽度回退）。
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
				// reduced-motion：瞬时到位，不跑动画。
				if (window.matchMedia !== undefined && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
					setWidth(clampPanelWidth(target, maxWidthRef.current, floor));
					tweeningRef.current = false;
					if (persist) writeStored(WIDTH_KEY, target);
					if (onEnd !== undefined) onEnd();
					return;
				}
				const from = widthRef.current;
				// 目标与当前一致（已最窄再收窄、已默认宽再双击重置）：无需动画，
				// 直接走完成逻辑（落盘/onEnd），避免空跑 300ms。
				if (from === target) {
					tweeningRef.current = false;
					if (persist) writeStored(WIDTH_KEY, target);
					if (onEnd !== undefined) onEnd();
					return;
				}
				const start = performance.now();
				const step = (now) => {
					const t = Math.min(1, (now - start) / duration);
					const eased = cubicBezierEase(t);
					// 与当前渲染值一致时跳过 setWidth，避免无意义的重复渲染。
					const next = clampPanelWidth(from + (target - from) * eased, maxWidthRef.current, floor);
					if (next !== widthRef.current) setWidth(next);
					if (t < 1) {
						tweenRef.current = requestAnimationFrame(step);
					} else {
						tweenRef.current = null;
						tweeningRef.current = false;
						if (persist) writeStored(WIDTH_KEY, target);
						if (onEnd !== undefined) onEnd();
					}
				};
				tweenRef.current = requestAnimationFrame(step);
			};

			// ── 两段式收起：宽于最窄 → 先收窄到最窄；已最窄 → 滑出并隐藏 ────
			const hidePanel = () => {
				const savedTree = treeWidthRef.current;
				animateWidthTo(0, {
					floor: 0,
					persist: false,
					onEnd: () => {
						// 滑出经过 < PANEL_MIN 的宽度：树栏被钳到 0、width 状态为 0，
						// 结束时一并还原——重开回到"最窄面板"而非残留 0 宽度。
						setWidth(PANEL_MIN);
						setTreeWidth(clampTreeWidth(savedTree, PANEL_MIN));
						writeStored(WIDTH_KEY, PANEL_MIN);
						setOpen(false);
					},
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
				// setWidth(0) 与 setOpen(true) 同一批次：首帧即 0 宽（无闪屏），
				// 再 rAF 滑入到持久化宽度。动画中的 0 宽帧不落盘。
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
							// 滑入经过 < PANEL_MIN 的宽度时树栏被钳到 0，结束后复原。
							setTreeWidth(clampTreeWidth(savedTree, target));
						},
					});
				});
			};
			// 面板宽度持久化：动画中间帧不落盘（tweeningRef 为真时跳过），由
			// tween 结束时按 persist 显式写最终值；拖拽期间的常规变更仍走防抖。
			useEffect(() => { if (!tweeningRef.current) debouncedWrite(WIDTH_KEY, width); }, [width]);
			// 树栏宽度在滑出/滑入动画中会被短暂钳到 0——动画期间同样不落盘，
			// 由 onEnd 复原后的最终值（≥40px）持久化，避免残留 0 宽分栏。
			useEffect(() => { if (!tweeningRef.current) debouncedWrite(SPLIT_KEY, treeWidth); }, [treeWidth]);
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
				stopTween();
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
			// 动画（滑入/滑出会经过 < PANEL_MIN 的宽度）期间跳过跟随：边界由
			// tween 每帧按 maxWidthRef 钳制，避免把 0 宽中帧弹回 PANEL_MIN。
			const maxWidthRef = useRef(maxWidth);
			useEffect(() => {
				const previous = maxWidthRef.current;
				maxWidthRef.current = maxWidth;
				if (maxWidth === previous) return;
				if (tweeningRef.current) return;
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
			// 单击手柄执行两段式收起（宽于最窄→收窄，已最窄→收起），立即响应、
			// 零延迟；双击取消当前动作并重置宽度。手势区分：pointermove 位移
			// >4px 视为拖拽（pointerup 不再触发单击动作）；双击通过第二击的
			// onDoubleClick 取消/反转（重置到默认宽度），所以单击无需等待。
			const resizeDragMoved = useRef(false);
			const onResizePointerDown = (event) => {
				event.preventDefault();
				event.currentTarget.setPointerCapture(event.pointerId);
				// 动画（滑出/滑入）中途抓手柄：停掉动画；宽度若已低于 PANEL_MIN
				// （滑出途中），先吸附回最窄再以该值为拖拽原点——否则拖拽钳制
				// 会把面板弹回 280 造成跳变。
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
				// Panel is docked right: dragging left (negative dx) widens it.
				const dx = event.clientX - resizeOrigin.current.x;
				if (Math.abs(dx) > 4) resizeDragMoved.current = true;
				setWidth(clampPanelWidth(resizeOrigin.current.width - dx, maxWidth));
			};
			const onResizePointerUp = (event) => {
				if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
				event.currentTarget.releasePointerCapture(event.pointerId);
				setResizing(false);
				// 无位移视为单击：立即两段式收起（不延迟）。pointer capture 会把
				// 后续 click 重定向到轨道元素（子手柄收不到），故在 pointerup 判定。
				if (resizeDragMoved.current) { resizeDragMoved.current = false; return; }
				collapseOrHide();
			};
			const onResizeDoubleClick = () => {
				// 双击重置：取消进行中的收窄/滑出，动画回默认宽度。
				stopTween();
				animateWidthTo(clampPanelWidth(PANEL_DEFAULT, maxWidthRef.current), { floor: PANEL_MIN, persist: true });
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
				if (width < TREE_MIN + CONTENT_MIN) {
					animateWidthTo(clampPanelWidth(AUTO_WIDEN, maxWidthRef.current), { floor: PANEL_MIN, persist: true });
				}
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
				return h(TipButton, { tip: "展开工作面板", className: "dwb-openbtn", onClick: openPanel }, "工作面板");
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
						title: width > PANEL_MIN ? "单击缩至最窄（双击重置）" : "单击收起面板（双击重置）",
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
					h(TipButton, { tip: "收起（再次点击关闭）", className: "dwb-iconbtn", onClick: collapseOrHide }, closeIcon()),
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
