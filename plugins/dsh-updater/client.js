/**
 * dsh-updater — 客户端半（Browser）。
 *
 * 在设置页「版本与更新」行（settings.general.item 插槽，order 100）显示：
 * 标题 + 版本徽标（状态点 + 版本号）。点击弹出详情弹窗：
 *  - state 'current' → 「已是最新版本」；
 *  - state 'update'  → 「发现新版本」，展示远端/当前版本与手动更新指引
 *    （本插件只提醒，不自动更新：git pull && pnpm install && pnpm run build）；
 *  - state 'unreachable' → 网络不可达，提供「重试」。
 *
 * 另外消费 notifier 客户端服务（可选）：检查发现新版本时弹顶部 toast，点击
 * toast 直达详情弹窗——这是 dsh-notifier 的业务闭环示例。notifier 缺席时
 * 本插件功能不受影响。
 */
window.__ModuleLoader__.load({
	id: "dsh-updater",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");
		const ReactDOM = require("react-dom");
		const h = React.createElement;
		const { useState, useEffect, useCallback } = React;

		// ── 样式：一张带标记的样式表，卸载时由 loader 认领清理 ────────────
		const CSS = `
.dshu-row {
	display: flex; align-items: center; justify-content: space-between; gap: 12px;
	width: 100%; min-height: 36px;
}
.dshu-row-title { font-size: 13px; color: var(--dsw-alias-label-primary); }
.dshu-pill {
	display: inline-flex; align-items: center; gap: 8px;
	padding: 4px 10px; border-radius: 8px; cursor: pointer;
	border: 1px solid var(--dsw-alias-border-l2);
	background: none; font: inherit;
	color: var(--dsw-alias-label-secondary);
}
.dshu-pill:hover { border-color: var(--dsw-alias-brand-primary); }
.dshu-dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.dshu-green { background: var(--dsw-alias-state-success-primary); }
.dshu-gray { background: var(--dsw-alias-border-l2); }
.dshu-breathe { animation: dshu-breathe 1.8s ease-in-out infinite; }
@keyframes dshu-breathe {
	0%, 100% { opacity: 1; box-shadow: 0 0 0 0 color-mix(in srgb, var(--dsw-alias-state-success-primary) 45%, transparent); }
	50% { opacity: .4; box-shadow: 0 0 0 5px transparent; }
}
.dshu-version { font-size: 12px; line-height: 1; white-space: nowrap; }
.dshu-overlay {
	position: fixed; inset: 0; z-index: 1000;
	display: flex; align-items: center; justify-content: center;
	background: rgba(0, 0, 0, .35);
}
.dshu-modal {
	min-width: 320px; max-width: 500px; padding: 18px 20px;
	border-radius: 12px; border: 1px solid var(--dsw-alias-border-l1);
	background: var(--dsw-alias-bg-overlay); color: var(--dsw-alias-label-primary);
	box-shadow: 0 12px 40px rgba(0, 0, 0, .25);
}
.dshu-modal-title { font-size: 14px; font-weight: 600; margin-bottom: 10px; }
.dshu-line { font-size: 13px; line-height: 1.8; }
.dshu-code {
	font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px;
	padding: 6px 8px; margin: 3px 0; border-radius: 6px;
	background: var(--dsw-alias-bg-layer-2);
}
.dshu-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 14px; }
.dshu-btn {
	padding: 5px 14px; border-radius: 8px; font-size: 13px; cursor: pointer;
	border: 1px solid var(--dsw-alias-border-l2);
	background: none; color: var(--dsw-alias-label-primary);
}
.dshu-btn-primary {
	background: var(--dsw-alias-brand-primary); border-color: transparent; color: #fff;
}
`;
		// 守卫防止重复挂载重复插标签（loader 卸载时会认领 data-plugin 样式）。
		if (typeof document !== "undefined" && document.getElementById("dsh-updater-style") === null) {
			const styleEl = document.createElement("style");
			styleEl.id = "dsh-updater-style";
			styleEl.setAttribute("data-plugin", "dsh-updater");
			styleEl.textContent = CSS;
			document.head.appendChild(styleEl);
		}

		// ── 辅助函数 ────────────────────────────────────────────────────────
		/** 缩短 sha 为 7 位（非法输入回退 '?'）。 */
		function shortSha(sha) {
			return typeof sha === "string" && sha.length >= 7 ? sha.slice(0, 7) : sha || "?";
		}

		/** 拉取状态（force=true 走 recheck，绕过宿主 60s 缓存）。 */
		function statusFetch(force) {
			const path = force ? "/updater/recheck" : "/updater/status";
			const init = force ? { method: "POST" } : undefined;
			return fetch(path, init).then((res) => {
				if (!res.ok) throw new Error("http " + res.status);
				return res.json();
			});
		}

		/** state → 状态点样式类（update 用呼吸绿点吸引注意）。 */
		function dotClassOf(state) {
			return state === "current"
				? "dshu-dot dshu-green"
				: state === "update"
					? "dshu-dot dshu-green dshu-breathe"
					: "dshu-dot dshu-gray";
		}

		// ── 详情弹窗（Portal 到 body，设置页几何不会裁剪它）────────────────
		/**
		 * @param props.status   最近一次检查结果（检查中保留旧值，不显示伪造状态）
		 * @param props.checking 是否正在检查（重试按钮禁用并显示「检查中…」）
		 */
		function Modal(props) {
			const status = props.status || {};
			const state = status.state || "unreachable";
			let title;
			const lines = [];
			if (state === "current") {
				title = "已是最新版本";
				lines.push(`当前版本 v${status.version || "?"}（${shortSha(status.sha)}），无需更新。`);
			} else if (state === "update") {
				title = "发现新版本";
				const latest = status.remoteVersion
					? `v${status.remoteVersion}（${shortSha(status.remoteSha)}）`
					: `远端 ${shortSha(status.remoteSha)}`;
				lines.push(`最新版本：${latest}`);
				lines.push(`当前版本：v${status.version || "?"}（${shortSha(status.sha)}）`);
				lines.push("");
				lines.push("本插件只做提醒，不执行自动更新。如需更新，请在 harness checkout 目录手动执行：");
				lines.push("git pull && pnpm install && pnpm run build");
				lines.push("完成后重启服务（pnpm dsh web）即可生效。");
			} else {
				title = props.checking ? "正在检查更新…" : "无法连接更新服务器";
				lines.push(props.checking
					? "正在与远端仓库通信，请稍候…"
					: "更新检查失败：网络不可达或请求超时。请检查网络后重试。");
			}
			return ReactDOM.createPortal(
				h("div", { className: "dshu-overlay", onClick: props.onClose },
					h("div", {
						className: "dshu-modal",
						role: "dialog",
						"aria-modal": "true",
						onClick: (event) => event.stopPropagation(),
					},
						h("div", { className: "dshu-modal-title" }, title),
						lines.map((text, index) => h("div", {
							key: index,
							className: text.indexOf("git pull") === 0 ? "dshu-code" : "dshu-line",
						}, text === "" ? "\u00A0" : text)),
						h("div", { className: "dshu-actions" },
							state === "unreachable"
								? h("button", {
									type: "button",
									className: "dshu-btn dshu-btn-primary",
									disabled: props.checking,
									onClick: props.onRetry,
								}, props.checking ? "检查中…" : "重试")
								: null,
							h("button", { type: "button", className: "dshu-btn", onClick: props.onClose }, "关闭"),
						),
					),
				),
				document.body,
			);
		}

		// ── 设置 → General 行：标题 + 版本徽标 ──────────────────────────────
		/**
		 * @param props.getNotifier 惰性取 notifier 服务的函数（apply 注入；
		 *                          可选服务，缺席返回 undefined）
		 */
		function VersionSettingsRow(props) {
			const [status, setStatus] = useState(null);
			const [open, setOpen] = useState(false);
			const [checking, setChecking] = useState(false);

			const load = useCallback((force) => {
				setChecking(true);
				statusFetch(force)
					.then((data) => {
						setStatus(data);
						setChecking(false);
						// 发现新版本 → 通知中心 toast（可选服务；同一远端 sha
						// 只通知一次——notifier 端按 id 去重，这里以 sha 为 id）。
						if (data.state === "update" && typeof props.getNotifier === "function") {
							const notifier = props.getNotifier();
							if (notifier !== undefined && typeof notifier.notify === "function") {
								notifier.notify({
									id: `dsh-updater-${data.remoteSha || "unknown"}`,
									title: "发现新版本",
									body: data.remoteVersion ? `v${data.remoteVersion} 可更新` : "远端有新版本可更新",
									tone: "update",
									onClick: () => setOpen(true),
								});
							}
						}
					})
					.catch(() => { setStatus({ state: "unreachable" }); setChecking(false); });
			}, [props.getNotifier]);

			useEffect(() => { load(false); }, [load]);

			const state = status === null ? "loading" : (status.state || "unreachable");
			const hint = state === "current"
				? "已是最新版本"
				: state === "update"
					? "发现新版本，点击查看详情"
					: state === "loading"
						? "正在检查更新…"
						: "无法连接更新服务器，点击查看详情";
			const version = status !== null && status.version ? status.version : "";
			const pillLabel = version === "" ? "…" : `v${version}`;

			return h(React.Fragment, null,
				h("div", { className: "dshu-row" },
					h("div", { className: "dshu-row-title" }, "版本与更新"),
					h("button", {
						type: "button",
						className: "dshu-pill",
						title: hint,
						"aria-label": hint,
						onClick: () => setOpen(true),
					},
						h("span", { className: dotClassOf(state) }),
						h("span", { className: "dshu-version" }, pillLabel),
					),
				),
				open
					? h(Modal, {
						status, // 保留最近一次结果，检查中不再显示伪造的「无法连接」
						checking,
						onClose: () => setOpen(false),
						onRetry: () => { load(true); },
					})
					: null,
			);
		}

		// ── 插件导出 ─────────────────────────────────────────────────────────
		exports.name = "dsh-updater";
		exports.inject = ["slots"];
		exports.apply = function apply(ctx) {
			// 惰性读取 notifier：在行组件需要时才取当前服务（可选依赖，
			// 不写进 inject，notifier 缺席时本插件照常工作）。
			const getNotifier = () => ctx.get("notifier");
			ctx.effect(
				() => ctx.slots.inject("settings.general.item", () => ctx.slots.register({
					name: "settings.general.item",
					id: "updater-version",
					order: 100,
					label: "版本与更新",
				}, (slotProps) => h(VersionSettingsRow, { ...slotProps, getNotifier }))),
				"dsh-updater: settings row registration",
			);
		};
		return module.exports;
	},
});
