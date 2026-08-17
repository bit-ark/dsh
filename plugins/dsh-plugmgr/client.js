/**
 * dsh-plugmgr — client half (browser plane).
 *
 * 在 设置 → 插件 区块注册「本地插件」tab（settings.plugins.tab 官方插槽，
 * order 20，排在「可配置插件」「插件清单」之后）。tab 内：
 *  - 列出当前 profile 的本地插件，用中文展示核心信息（名称/说明/版本/路径/
 *    启用状态）；
 *  - 添加：内置目录浏览器（官方 browse 能力 ctx.workspaces.listDirectory，
 *    逐级浏览 + 面包屑 + 选择此目录）或手动输入路径；
 *  - 移除（两步确认）/ 禁用 / 启用。
 * 所有写操作走宿主路由（fetch /local-plugins/*），宿主才是数据权威；
 * 本半只做展示与交互。增删/启停修改的是 profile 文件，重启 dsh web 生效，
 * 界面会给出提示。
 *
 * 主题：全部使用系统主题 token（--dsw-alias-*），按钮与产品一致
 * （--dsw-alias-button-primary-fill + --dsw-alias-label-primary-foreground），
 * 深浅主题切换时自动适配，不会出现白底白字。
 *
 * 目录选择：当前 profile 组合的是 browse 能力的选择器（无 native pick），
 * 因此不使用 workspaces.pickDirectory（会报 host.pickDirectory needs the
 * native capability），而是用 browse 能力的 listDirectory 内置浏览。
 */
window.__ModuleLoader__.load({
	id: "dsh-plugmgr",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");
		const h = React.createElement;
		const { useState, useEffect, useCallback, useRef } = React;

		// ── 已知本地插件的中文信息（未收录的插件回退到包名、不显示说明） ──
		const KNOWN_PLUGINS = {
			"dsh-plugmgr": {
				label: "本地插件管理器",
				desc: "在「设置-插件」提供「本地插件」页，管理通过本地目录安装的插件（添加 / 移除 / 启用 / 禁用）。",
			},
			"dsh-archive": {
				label: "归档",
				desc: "侧边栏「归档」入口：管理当前项目的归档会话（恢复 / 删除）。",
			},
			"dsh-update": {
				label: "版本更新提醒",
				desc: "侧边栏版本徽标：只读检查远端是否有新版本，不做自动更新。",
			},
			"dsh-balance": {
				label: "余额与用量",
				desc: "设置页展示 DeepSeek 账户余额，以及按天统计的 Token 消耗图表。",
			},
		};

		// ── 样式：一张带标记的样式表（与 dsh-update 同法），全部用主题 token ──
		const CSS = `
.lpm-wrap { display: flex; flex-direction: column; gap: 12px; color: var(--dsw-alias-label-primary); }
.lpm-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.lpm-btn {
	padding: 6px 14px; border-radius: 8px; font-size: 13px; line-height: 20px; cursor: pointer;
	border: 1px solid var(--dsw-alias-border-l2);
	background: transparent;
	color: var(--dsw-alias-label-primary);
	font-family: inherit;
}
.lpm-btn:hover { background: var(--dsw-alias-interactive-bg-hover, color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent)); }
.lpm-btn:disabled { opacity: .55; cursor: default; background: transparent; }
.lpm-btn-primary {
	border-color: transparent;
	background: var(--dsw-alias-button-primary-fill);
	color: var(--dsw-alias-label-primary-foreground);
}
.lpm-btn-primary:hover { background: var(--dsw-alias-button-primary-hover); }
.lpm-btn-primary:disabled { background: var(--dsw-alias-button-primary-fill); }
.lpm-btn-danger {
	color: var(--dsw-alias-state-error-primary);
	border-color: var(--dsw-alias-border-l2);
}
.lpm-btn-danger:hover {
	background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent);
}
.lpm-input {
	flex: 1; min-width: 200px; padding: 6px 10px; font-size: 13px; line-height: 20px;
	border-radius: 8px; border: 1px solid var(--dsw-alias-border-l2);
	background: var(--dsw-alias-bg-layer-1);
	color: var(--dsw-alias-label-primary);
	font-family: inherit;
}
.lpm-input:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }
.lpm-input::placeholder { color: var(--dsw-alias-label-tertiary); }
.lpm-list { display: flex; flex-direction: column; gap: 8px; }
.lpm-row {
	display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px;
	border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px;
	background: var(--dsw-alias-bg-layer-1);
}
.lpm-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
.lpm-name { font-size: 13px; line-height: 20px; font-weight: 600; color: var(--dsw-alias-label-primary); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.lpm-desc { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary); }
.lpm-meta { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary); }
.lpm-path { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-tertiary); word-break: break-all; }
.lpm-ops { display: flex; gap: 6px; flex: none; }
.lpm-badge { font-size: 11px; line-height: 16px; padding: 0 8px; border-radius: 999px; border: 1px solid var(--dsw-alias-border-l2); color: var(--dsw-alias-label-tertiary); white-space: nowrap; }
.lpm-badge-on { color: var(--dsw-alias-state-success-primary); border-color: currentColor; }
.lpm-notice { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary); }
.lpm-error { font-size: 12px; line-height: 18px; color: var(--dsw-alias-state-error-primary); white-space: pre-wrap; }
.lpm-empty { font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-secondary); }
.lpm-hint { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-tertiary); }
.lpm-browse {
	display: flex; flex-direction: column; gap: 8px;
	border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px;
	background: var(--dsw-alias-bg-layer-1); padding: 10px 12px;
}
.lpm-browse-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.lpm-browse-title { font-size: 13px; line-height: 20px; font-weight: 600; color: var(--dsw-alias-label-primary); }
.lpm-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 2px; font-size: 12px; color: var(--dsw-alias-label-secondary); }
.lpm-crumb {
	background: none; border: none; cursor: pointer; font-family: inherit; font-size: 12px;
	padding: 2px 4px; border-radius: 6px; color: var(--dsw-alias-label-secondary); line-height: 18px;
}
.lpm-crumb:hover { background: var(--dsw-alias-interactive-bg-hover, color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent)); color: var(--dsw-alias-label-primary); }
.lpm-crumb-sep { color: var(--dsw-alias-label-tertiary); user-select: none; }
.lpm-browse-path { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-tertiary); word-break: break-all; }
.lpm-browse-entries { max-height: 260px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }
.lpm-entry {
	display: flex; align-items: center; gap: 8px; width: 100%;
	padding: 4px 8px; border: none; border-radius: 6px; cursor: pointer;
	background: none; font-family: inherit; text-align: left;
	font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-primary);
}
.lpm-entry:hover { background: var(--dsw-alias-interactive-bg-hover, color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent)); }
.lpm-entry-hidden { color: var(--dsw-alias-label-tertiary); }
.lpm-entry-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.lpm-entry-go { flex: none; font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary); }
.lpm-browse-ops { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
`;
		if (typeof document !== "undefined" && document.getElementById("lpm-style") === null) {
			const styleEl = document.createElement("style");
			styleEl.id = "lpm-style";
			styleEl.setAttribute("data-plugin", "dsh-plugmgr");
			styleEl.textContent = CSS;
			document.head.appendChild(styleEl);
		}

		// ── Host 调用：GET 无体、POST 带 JSON 体，统一收 { ok, ... } ───────
		async function callJson(path, body) {
			const response = await fetch(path, {
				method: body === undefined ? "GET" : "POST",
				headers: body === undefined ? undefined : { "content-type": "application/json" },
				body: body === undefined ? undefined : JSON.stringify(body),
			});
			let payload;
			try {
				payload = await response.json();
			} catch {
				payload = undefined;
			}
			if (!response.ok || payload === undefined || typeof payload !== "object" || payload.ok !== true) {
				throw new Error(payload !== undefined && typeof payload.error === "string"
					? payload.error
					: `请求失败（HTTP ${String(response.status)}）`);
			}
			return payload;
		}

		exports.name = "dsh-plugmgr";
		exports.inject = ["slots", "workspaces"];
		exports.apply = function apply(ctx) {
			function LocalPluginsTab() {
				const [plugins, setPlugins] = useState(null);
				const [error, setError] = useState(null);
				const [notice, setNotice] = useState(null);
				const [busy, setBusy] = useState(false);
				const [confirmRemove, setConfirmRemove] = useState(null);
				const [pathInput, setPathInput] = useState("");

				// 内置目录浏览器状态（browse 能力）。
				const [browseOpen, setBrowseOpen] = useState(false);
				const [browseListing, setBrowseListing] = useState(null);
				const [browseLoading, setBrowseLoading] = useState(false);
				const [browseError, setBrowseError] = useState(null);
				const browseSeq = useRef(0);

				const load = useCallback(() => {
					setError(null);
					callJson("/local-plugins/list")
						.then((payload) => { setPlugins(payload.plugins || []); })
						.catch((err) => { setError(err.message); });
				}, []);

				useEffect(() => { load(); }, [load]);

				const loadListing = useCallback((path) => {
					const seq = browseSeq.current + 1;
					browseSeq.current = seq;
					setBrowseLoading(true);
					setBrowseError(null);
					ctx.workspaces.listDirectory(path)
						.then((listing) => {
							if (browseSeq.current !== seq) return;
							setBrowseListing(listing);
							setBrowseLoading(false);
						})
						.catch((err) => {
							if (browseSeq.current !== seq) return;
							setBrowseError(err !== undefined && err !== null && typeof err.message === "string"
								? err.message
								: String(err));
							setBrowseLoading(false);
						});
				}, []);

				const openBrowse = useCallback(() => {
					setBrowseOpen(true);
					setBrowseListing(null);
					loadListing(undefined); // 无路径 = 宿主 home 目录
				}, [loadListing]);

				const closeBrowse = useCallback(() => {
					browseSeq.current += 1; // 作废在途扫描
					setBrowseOpen(false);
					setBrowseListing(null);
					setBrowseError(null);
				}, []);

				const runOp = useCallback((fn, okMessage) => {
					setBusy(true);
					setError(null);
					setNotice(null);
					fn()
						.then((payload) => {
							setPlugins(payload.plugins || []);
							if (okMessage !== undefined && okMessage !== null) setNotice(okMessage);
						})
						.catch((err) => { setError(err.message); })
						.finally(() => { setBusy(false); });
				}, []);

				const confirmBrowse = useCallback(() => {
					const dir = browseListing !== null ? browseListing.path : "";
					if (dir.length === 0) return;
					runOp(() => callJson("/local-plugins/add", { dir }), `已添加 ${dir} —— 重启 dsh web 后生效`);
					closeBrowse();
				}, [browseListing, runOp, closeBrowse]);

				const addByInput = useCallback(() => {
					const dir = pathInput.trim();
					if (dir.length === 0) {
						setError("请输入插件目录的绝对路径");
						return;
					}
					runOp(() => callJson("/local-plugins/add", { dir }), `已添加 ${dir} —— 重启 dsh web 后生效`);
				}, [pathInput, runOp]);

				const toggle = useCallback((plugin) => {
					runOp(
						() => callJson("/local-plugins/set-enabled", { name: plugin.name, enabled: !plugin.enabled }),
						plugin.enabled
							? `已禁用 ${plugin.name} —— 重启 dsh web 后生效`
							: `已启用 ${plugin.name} —— 重启 dsh web 后生效`,
					);
				}, [runOp]);

				const remove = useCallback((plugin) => {
					if (confirmRemove !== plugin.name) {
						setConfirmRemove(plugin.name);
						return;
					}
					setConfirmRemove(null);
					runOp(
						() => callJson("/local-plugins/remove", { name: plugin.name }),
						`已移除 ${plugin.name}（目录文件保留）—— 重启 dsh web 后生效`,
					);
				}, [confirmRemove, runOp]);

				// 中文信息卡：已知插件给中文名+中文说明；未知插件只显示包名。
				const rowOf = (plugin) => {
					const known = KNOWN_PLUGINS[plugin.name];
					const title = known !== undefined ? known.label : plugin.name;
					const desc = known !== undefined ? known.desc : null;
					const versionText = plugin.version !== null && plugin.version !== undefined
						? `版本 v${plugin.version}`
						: "版本 未知";
					return h("div", { key: plugin.name, className: "lpm-row" },
						h("div", { className: "lpm-main" },
							h("div", { className: "lpm-name" },
								title,
								plugin.name !== title ? h("span", { className: "lpm-badge" }, plugin.name) : null,
								h("span", {
									className: plugin.enabled ? "lpm-badge lpm-badge-on" : "lpm-badge",
								}, plugin.enabled ? "已启用" : "已禁用"),
								plugin.isBundle ? null
									: h("span", { className: "lpm-badge" }, "非 bundle"),
							),
							desc !== null ? h("div", { className: "lpm-desc" }, desc) : null,
							h("div", { className: "lpm-meta" }, versionText),
							h("div", { className: "lpm-path" }, `路径 ${plugin.path}`),
						),
						h("div", { className: "lpm-ops" },
							plugin.isBundle
								? h("button", {
									type: "button",
									className: "lpm-btn",
									disabled: busy,
									onClick: () => toggle(plugin),
								}, plugin.enabled ? "禁用" : "启用")
								: null,
							h("button", {
								type: "button",
								className: "lpm-btn lpm-btn-danger",
								disabled: busy,
								onClick: () => remove(plugin),
							}, confirmRemove === plugin.name ? "确认移除？" : "移除"),
						),
					);
				};

				// 目录浏览器：面包屑 + 子目录列表 + 选择此目录。
				const browsePanel = () => {
					const crumbs = browseListing !== null ? browseListing.crumbs : [];
					const entries = browseListing !== null ? browseListing.entries : [];
					const currentPath = browseListing !== null ? browseListing.path : "";
					const crumbsNodes = [];
					crumbs.forEach((crumb, index) => {
						if (index > 0) {
							crumbsNodes.push(h("span", { key: `sep${index}`, className: "lpm-crumb-sep" }, "/"));
						}
						crumbsNodes.push(h("button", {
							key: crumb.path,
							type: "button",
							className: "lpm-crumb",
							disabled: browseLoading || index === crumbs.length - 1,
							title: crumb.path,
							onClick: () => loadListing(crumb.path),
						}, index === 0 ? "根" : crumb.name));
					});
					return h("div", { className: "lpm-browse" },
						h("div", { className: "lpm-browse-head" },
							h("div", { className: "lpm-browse-title" }, "选择插件目录"),
							h("div", { className: "lpm-crumbs" }, crumbsNodes),
						),
						h("div", { className: "lpm-browse-path" }, currentPath),
						browseError !== null ? h("div", { className: "lpm-error" }, browseError) : null,
						browseLoading
							? h("div", { className: "lpm-empty" }, "加载中…")
							: h("div", { className: "lpm-browse-entries" },
								entries.map((entry) => h("button", {
									key: entry.path,
									type: "button",
									className: entry.hidden ? "lpm-entry lpm-entry-hidden" : "lpm-entry",
									title: entry.path,
									onClick: () => loadListing(entry.path),
								},
									h("span", { className: "lpm-entry-name" }, entry.name),
									h("span", { className: "lpm-entry-go" }, "进入"),
								)),
							),
						h("div", { className: "lpm-browse-ops" },
							h("button", {
								type: "button",
								className: "lpm-btn lpm-btn-primary",
								disabled: busy || browseLoading || currentPath.length === 0,
								onClick: confirmBrowse,
							}, "选择此目录"),
							h("button", {
								type: "button",
								className: "lpm-btn",
								disabled: browseLoading || crumbs.length < 2,
								onClick: () => loadListing(crumbs[crumbs.length - 2].path),
							}, "上级"),
							h("button", {
								type: "button",
								className: "lpm-btn",
								disabled: busy,
								onClick: closeBrowse,
							}, "取消"),
						),
					);
				};

				return h("div", { className: "lpm-wrap" },
					h("div", { className: "lpm-actions" },
						h("button", {
							type: "button",
							className: "lpm-btn lpm-btn-primary",
							disabled: busy,
							onClick: openBrowse,
						}, "添加本地插件…"),
						h("input", {
							className: "lpm-input",
							type: "text",
							value: pathInput,
							disabled: busy,
							placeholder: "或直接输入插件目录的绝对路径",
							onChange: (event) => setPathInput(event.target.value),
							onKeyDown: (event) => { if (event.key === "Enter") addByInput(); },
						}),
						h("button", {
							type: "button",
							className: "lpm-btn",
							disabled: busy || pathInput.trim().length === 0,
							onClick: addByInput,
						}, "添加"),
						h("button", {
							type: "button",
							className: "lpm-btn",
							disabled: busy,
							onClick: load,
						}, "刷新"),
					),
					browseOpen ? browsePanel() : null,
					error !== null ? h("div", { className: "lpm-error" }, error) : null,
					notice !== null ? h("div", { className: "lpm-notice" }, notice) : null,
					h("div", { className: "lpm-hint" },
						"本地插件 = 通过本地目录安装（link:/file:）的 bundle。增删/启停修改 profile 文件，重启 dsh web 后生效。",
					),
					plugins === null
						? h("div", { className: "lpm-empty" }, "加载中…")
						: plugins.length === 0
							? h("div", { className: "lpm-empty" },
								"暂无本地插件。点击「添加本地插件…」选择一个插件目录。")
							: h("div", { className: "lpm-list" }, plugins.map(rowOf)),
				);
			}

			ctx.effect(
				() => ctx.slots.register({
					name: "settings.plugins.tab",
					id: "local-plugins",
					order: 20,
					label: "本地插件",
				}, LocalPluginsTab),
				"dsh-plugmgr: tab registration",
			);
		};
		return module.exports;
	},
});
