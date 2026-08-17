/**
 * dsh-restart — client half (browser plane).
 *
 * 设置「服务」页（settings.section 官方插槽，id: service, order: 90）：
 *  - 服务状态卡：GET /service/status → 当前 PID / 端口 / 启动目录 / 平台 /
 *    日志路径 / 最近日志尾部；
 *  - 「重启服务」按钮：两步确认（第一次点击变「确认重启？」、4 秒自动复位），
 *    第二次点击 POST /service/restart（宿主写入重启助手并立即返回），页面约
 *    4 秒后随服务重启短暂离线，服务会在原终端窗口重新拉起；
 *  - 成功/失败提示优先用 dsh-notify 的 notifier 客户端服务（ctx.get 特性探测，
 *    notifier 缺席时页面内 notice 自描述，功能照常）。
 *
 * 全部使用官方插槽与服务，不触碰 harness 内部实现。样式使用系统主题 token
 * （--dsw-alias-*），深浅主题自动适配。
 */
window.__ModuleLoader__.load({
	id: "dsh-restart",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");
		const h = React.createElement;
		const { useState, useCallback, useEffect, useRef } = React;

		const CSS = `
.dsr-page { display: flex; flex-direction: column; gap: 14px; color: var(--dsw-alias-label-primary); }
.dsr-desc { font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-secondary); }
.dsr-card {
	display: flex; flex-direction: column; gap: 6px; padding: 12px 14px;
	border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px;
	background: var(--dsw-alias-bg-layer-1);
}
.dsr-kv { display: flex; gap: 8px; font-size: 12px; line-height: 18px; }
.dsr-kv-label { flex: none; color: var(--dsw-alias-label-tertiary); min-width: 72px; }
.dsr-kv-value { color: var(--dsw-alias-label-primary); word-break: break-all; }
.dsr-code {
	margin: 0; font-size: 11px; line-height: 16px; color: var(--dsw-alias-label-tertiary);
	white-space: pre-wrap; word-break: break-all; max-height: 180px; overflow-y: auto;
	background: var(--dsw-alias-bg-layer-2, color-mix(in srgb, var(--dsw-alias-label-primary) 4%, transparent));
	border-radius: 8px; padding: 8px 10px;
}
.dsr-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.dsr-btn {
	padding: 6px 14px; border-radius: 8px; font-size: 13px; line-height: 20px; cursor: pointer;
	border: 1px solid var(--dsw-alias-border-l2); background: transparent;
	color: var(--dsw-alias-label-primary); font-family: inherit;
}
.dsr-btn:hover { background: var(--dsw-alias-interactive-bg-hover, color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent)); }
.dsr-btn:disabled { opacity: .55; cursor: default; background: transparent; }
.dsr-btn-confirm { color: var(--dsw-alias-state-error-primary); border-color: var(--dsw-alias-state-error-primary); }
.dsr-btn-confirm:hover { background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent); }
.dsr-notice { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary); }
.dsr-error { font-size: 12px; line-height: 18px; color: var(--dsw-alias-state-error-primary); white-space: pre-wrap; }
.dsr-hint { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-tertiary); }
`;
		if (typeof document !== "undefined" && document.getElementById("dsr-style") === null) {
			const styleEl = document.createElement("style");
			styleEl.id = "dsr-style";
			styleEl.setAttribute("data-plugin", "dsh-restart");
			styleEl.textContent = CSS;
			document.head.appendChild(styleEl);
		}

		exports.name = "dsh-restart";
		exports.inject = ["slots"];
		exports.apply = function apply(ctx) {
			function ServiceSection() {
				const [status, setStatus] = useState(null);
				const [statusError, setStatusError] = useState(null);
				const [confirm, setConfirm] = useState(false);
				const [busy, setBusy] = useState(false);
				const [notice, setNotice] = useState(null);
				const resetTimer = useRef(null);
				// 重启看门狗：重启成功返回后，若页面在预期窗口内仍存活（说明
				// 助手脚本悄悄失败、服务没真正重启），复位 busy 并提示，避免
				// 按钮永远卡在「重启中…」。
				const watchdogTimer = useRef(null);
				const getNotifier = useCallback(() => ctx.get("notifier"), []);

				// 加载服务状态 + 卸载时清理复位/看门狗定时器。
				useEffect(() => {
					fetch("/service/status")
						.then((response) => response.json())
						.then((payload) => {
							if (payload !== null && typeof payload === "object" && payload.ok === true) {
								setStatus(payload);
							} else {
								setStatusError(payload !== null && typeof payload === "object" && typeof payload.error === "string"
									? payload.error
									: "服务状态读取失败");
							}
						})
						.catch((err) => {
							setStatusError(err !== undefined && err !== null && typeof err.message === "string"
								? err.message
								: String(err));
						});
					return () => {
						if (resetTimer.current !== null) clearTimeout(resetTimer.current);
						if (watchdogTimer.current !== null) clearTimeout(watchdogTimer.current);
					};
				}, []);

				const notify = useCallback((input) => {
					const notifier = getNotifier();
					if (notifier !== undefined && typeof notifier.notify === "function") {
						notifier.notify(input);
					}
				}, [getNotifier]);

				const trigger = useCallback(() => {
					if (busy) return;
					if (!confirm) {
						setConfirm(true);
						if (resetTimer.current !== null) clearTimeout(resetTimer.current);
						resetTimer.current = setTimeout(() => setConfirm(false), 4000);
						return;
					}
					if (resetTimer.current !== null) clearTimeout(resetTimer.current);
					setConfirm(false);
					setBusy(true);
					setNotice(null);
					fetch("/service/restart", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: "{}",
					})
						.then((response) => response.json())
						.then((payload) => {
							if (payload !== null && typeof payload === "object" && payload.ok === true) {
								const message = typeof payload.message === "string"
									? payload.message
									: "重启已触发，页面将短暂离线";
								setNotice(message);
								notify({ id: "dsh-restart", title: message, tone: "info" });
								// 保持 busy：页面即将随服务重启离线。
								// 但若助手脚本静默失败（osascript 被拒 / 端口未
								// 释放等），页面不会离线——90s 看门狗到期后若
								// 本页仍在运行就复位并提示，绝不永久卡死。
								if (watchdogTimer.current !== null) clearTimeout(watchdogTimer.current);
								watchdogTimer.current = setTimeout(() => {
									watchdogTimer.current = null;
									setBusy(false);
									setStatusError("重启似乎未生效：服务可能仍在运行或重启脚本失败，请查看 ~/.dsh/restart.log");
									notify({ id: "dsh-restart-error", title: "重启未生效，请查看日志", tone: "error" });
								}, 90000);
							} else {
								const error = payload !== null && typeof payload === "object" && typeof payload.error === "string"
									? payload.error
									: "重启请求失败";
								setStatusError(error);
								notify({ id: "dsh-restart-error", title: error, tone: "error" });
								setBusy(false);
							}
						})
						.catch((err) => {
							const message = `重启请求失败：${err !== undefined && err !== null && typeof err.message === "string" ? err.message : String(err)}`;
							setStatusError(message);
							notify({ id: "dsh-restart-error", title: message, tone: "error" });
							setBusy(false);
						});
				}, [busy, confirm, notify]);

				const statusCard = () => {
					if (statusError !== null && status === null) {
						return h("div", { className: "dsr-card" },
							h("div", { className: "dsr-error" }, `无法读取服务状态：${statusError}`),
						);
					}
					if (status === null) {
						return h("div", { className: "dsr-card" },
							h("div", { className: "dsr-hint" }, "正在读取服务状态…"),
						);
					}
					const kv = (label, value) => h("div", { className: "dsr-kv" },
						h("span", { className: "dsr-kv-label" }, label),
						h("span", { className: "dsr-kv-value" }, value),
					);
					return h("div", { className: "dsr-card" },
						kv("状态", "运行中"),
						kv("PID", String(status.pid)),
						kv("端口", String(status.port)),
						kv("平台", String(status.platform)),
						kv("启动目录", String(status.cwd)),
						kv("日志", String(status.logPath)),
						typeof status.lastLog === "string" && status.lastLog.length > 0
							? h("pre", { className: "dsr-code" }, status.lastLog)
							: null,
					);
				};

				return h("div", { className: "dsr-page" },
					h("div", { className: "dsr-desc" },
						"管理当前 dsh web 服务。修改插件或配置后，点击下方按钮重启服务即可生效。",
					),
					statusCard(),
					h("div", { className: "dsr-actions" },
						h("button", {
							type: "button",
							className: confirm ? "dsr-btn dsr-btn-confirm" : "dsr-btn",
							disabled: busy,
							onClick: trigger,
						}, busy ? "重启中…" : confirm ? "确认重启？" : "重启服务"),
						busy || confirm ? h("span", { className: "dsr-notice" },
							busy ? "重启已触发，页面约 4 秒后离线…" : "再次点击确认，4 秒后自动取消") : null,
					),
					notice !== null ? h("div", { className: "dsr-notice" }, notice) : null,
					statusError !== null && status !== null ? h("div", { className: "dsr-error" }, statusError) : null,
					h("div", { className: "dsr-hint" },
						"重启会中断当前会话数秒：服务将在原终端窗口重新拉起，之后刷新页面即可恢复会话；" +
						"全程日志见上方「日志」路径（默认 ~/.dsh/restart.log）。",
					),
				);
			}

			// 注册到设置导航（settings.section 官方插槽）。
			ctx.slots.inject("settings.section", () => ctx.slots.register(
				{
					name: "settings.section",
					id: "service",
					order: 90,
					label: "服务",
				},
				ServiceSection,
			));
		};
		return module.exports;
	},
});
