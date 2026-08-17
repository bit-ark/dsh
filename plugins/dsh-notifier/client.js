/**
 * dsh-notifier — 客户端半（Browser）：通用应用内通知。
 *
 * 本插件是「服务 + UI」库：
 *  - 提供 `notifier` 客户端服务（{ notify(input), dismiss(id) }），任何已装载的
 *    客户端插件都可以通过 `ctx.get('notifier')` 可选地消费（特性探测，本插件
 *    缺席时消费方行为不变）。
 *  - UI：顶部 toast（一次性、自动消失）+ 会话头铃铛（conversation.session.
 *    header.utilities 插槽，带未读计数与托盘）。toast 宿主挂在 body 上，
 *    不依赖任何会话即可工作；铃铛是 session 作用域的（需要打开会话才可见）。
 *
 * 业务闭环示例：dsh-updater 在检测到新版本时调用 notifier.notify(...) 弹 toast，
 * 点击直达更新详情弹窗。本插件自身不产生任何示例通知（无自检桩）。
 *
 * 宿主半（index.js）是占位：Loader 在启动时导入包主入口，真实功能全在浏览器半。
 */
window.__ModuleLoader__.load({
	id: "dsh-notifier",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");
		const ReactDOM = require("react-dom");
		const ReactDOMClient = require("react-dom/client");
		const h = React.createElement;
		const { useState, useEffect } = React;

		// ── 样式：一张带标记的样式表，卸载时由 loader 认领清理 ────────────
		const CSS = `
.dshu-toast {
	position: fixed; top: 14px; left: 50%; transform: translateX(-50%);
	display: flex; align-items: center; gap: 10px;
	max-width: 480px; padding: 10px 16px;
	border-radius: 10px; border: 1px solid var(--dsw-alias-border-l1);
	background: var(--dsw-alias-bg-overlay); color: var(--dsw-alias-label-primary);
	box-shadow: 0 8px 30px rgba(0, 0, 0, .25);
	font: inherit; font-size: 13px; cursor: pointer; z-index: 1002;
	animation: dshu-toast-in .25s ease-out;
}
.dshu-toast-leave { opacity: 0; transition: opacity 1s ease; }
@keyframes dshu-toast-in {
	from { opacity: 0; transform: translate(-50%, -8px); }
	to { opacity: 1; transform: translate(-50%, 0); }
}
.dshu-toast-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dshu-dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.dshu-dot-green { background: var(--dsw-alias-state-success-primary); }
.dshu-dot-red { background: var(--dsw-alias-state-error-primary); }
.dshu-dot-gray { background: var(--dsw-alias-border-l2); }
.dshu-dot-breathe {
	background: var(--dsw-alias-state-success-primary);
	animation: dshu-breathe 1.8s ease-in-out infinite;
}
@keyframes dshu-breathe {
	0%, 100% { opacity: 1; box-shadow: 0 0 0 0 color-mix(in srgb, var(--dsw-alias-state-success-primary) 45%, transparent); }
	50% { opacity: .4; box-shadow: 0 0 0 5px transparent; }
}
.dshu-bell {
	display: inline-flex; align-items: center; justify-content: center;
	position: relative; width: 28px; height: 28px; padding: 0;
	border: none; border-radius: 8px; background: transparent; cursor: pointer;
	color: var(--dsw-alias-label-secondary);
}
.dshu-bell:hover { background: color-mix(in srgb, var(--dsw-alias-label-secondary) 10%, transparent); }
.dshu-bell-badge {
	position: absolute; top: -2px; right: -4px; min-width: 14px; height: 14px;
	padding: 0 3px; border-radius: 7px;
	background: var(--dsw-alias-state-error-primary); color: #fff;
	font-size: 10px; line-height: 14px; text-align: center;
}
.dshu-tray-backdrop { position: fixed; inset: 0; z-index: 999; }
.dshu-tray {
	position: fixed; z-index: 1000; min-width: 240px; max-width: 320px;
	padding: 6px; border-radius: 12px; border: 1px solid var(--dsw-alias-border-l1);
	background: var(--dsw-alias-bg-overlay); color: var(--dsw-alias-label-primary);
	box-shadow: 0 12px 40px rgba(0, 0, 0, .25);
}
.dshu-tray-empty { padding: 14px 10px; font-size: 12px; color: var(--dsw-alias-label-secondary); text-align: center; }
.dshu-tray-item { display: flex; align-items: center; gap: 8px; padding: 8px 6px; border-radius: 8px; }
.dshu-tray-item:hover { background: color-mix(in srgb, var(--dsw-alias-label-secondary) 8%, transparent); }
.dshu-tray-item-main {
	flex: 1; display: flex; align-items: center; gap: 8px; min-width: 0;
	border: none; background: none; padding: 0; cursor: pointer;
	font: inherit; font-size: 13px; color: var(--dsw-alias-label-primary); text-align: left;
}
.dshu-tray-item-dismiss {
	flex: none; border: none; background: none; cursor: pointer; padding: 2px 6px;
	font-size: 11px; color: var(--dsw-alias-label-secondary); border-radius: 6px;
}
.dshu-tray-item-dismiss:hover { color: var(--dsw-alias-label-primary); background: color-mix(in srgb, var(--dsw-alias-label-secondary) 10%, transparent); }
.dshu-tray-item-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;
		// 守卫防止重复挂载重复插标签（loader 卸载时会认领 data-plugin 样式）。
		if (typeof document !== "undefined" && document.getElementById("dsh-notifier-style") === null) {
			const styleEl = document.createElement("style");
			styleEl.id = "dsh-notifier-style";
			styleEl.setAttribute("data-plugin", "dsh-notifier");
			styleEl.textContent = CSS;
			document.head.appendChild(styleEl);
		}

		// ── store：活跃通知 + 瞬时 toast（模块级，跨组件共享）──────────────
		let notifications = [];
		let toast = null;
		let toastSeq = 0;
		const listeners = new Set();

		/** 订阅 store 变化；返回退订函数。 */
		function subscribe(listener) {
			listeners.add(listener);
			return () => { listeners.delete(listener); };
		}
		/** 通知所有订阅者（有变化才调用）。 */
		function emit() { for (const listener of listeners) listener(); }
		/** 当前活跃通知列表（铃铛 / 托盘用）。 */
		function getNotifications() { return notifications; }
		/** 当前 toast（瞬时，null 表示无）。 */
		function getToast() { return toast; }
		/** 设置 toast 状态并广播。 */
		function setToastState(next) { toast = next; emit(); }
		/** 清空 toast（供 ToastItem 超时 / 点击回调）。 */
		function clearToast() { if (toast !== null) setToastState(null); }

		/**
		 * 同一 id 的通知在本次浏览器会话里只 toast 一次（sessionStorage 记忆）。
		 * 防抖：铃铛托盘里重复出现的状态类通知不会反复打断用户。
		 */
		function showToastOnce(entry) {
			const KEY = "dsh-notifier-toast-seen";
			let seen = {};
			try { seen = JSON.parse(sessionStorage.getItem(KEY) || "{}") || {}; } catch { seen = {}; }
			if (seen[entry.id]) return;
			try { seen[entry.id] = 1; sessionStorage.setItem(KEY, JSON.stringify(seen)); } catch { /* storage 不可用时忽略 */ }
			toastSeq += 1;
			setToastState({ ...entry, seq: toastSeq });
		}

		/**
		 * 服务入口：发布一条通知（toast + 铃铛/托盘）。
		 * input 形如 { id, title, body?, tone?, onClick? }；id 必填非空，其余容错。
		 * 同 id 重复发布 = 更新该条（去重后置顶）。
		 */
		function notify(input) {
			const entry = input || {};
			if (typeof entry.id !== "string" || entry.id === "") return;
			const item = {
				id: entry.id,
				title: typeof entry.title === "string" ? entry.title : "",
				body: typeof entry.body === "string" ? entry.body : null,
				tone: entry.tone || "info",
				onClick: typeof entry.onClick === "function" ? entry.onClick : null,
			};
			notifications = notifications.filter(n => n.id !== item.id);
			notifications = [...notifications, item];
			emit();
			showToastOnce(item);
		}

		/** 服务入口：从铃铛/托盘移除一条通知（有变化才广播）。 */
		function dismiss(id) {
			const before = notifications.length;
			notifications = notifications.filter(n => n.id !== id);
			if (notifications.length !== before) emit();
		}

		const notifierApi = { notify, dismiss };

		// ── tone → 圆点样式类 ───────────────────────────────────────────────
		function toneClass(tone) {
			return tone === "update" ? "dshu-dot dshu-dot-breathe"
				: tone === "error" ? "dshu-dot dshu-dot-red"
				: "dshu-dot dshu-dot-green";
		}

		// ── toast（常驻宿主，无会话也能工作）────────────────────────────────
		/** 单条 toast：3s 后进入淡出，4s 后回调 onDone 清除。 */
		function ToastItem({ toast: entry, onDone }) {
			const [leaving, setLeaving] = useState(false);
			useEffect(() => {
				const hold = setTimeout(() => setLeaving(true), 3000);
				const fade = setTimeout(onDone, 4000);
				return () => { clearTimeout(hold); clearTimeout(fade); };
			}, [onDone]);
			return ReactDOM.createPortal(
				h("button", {
					type: "button",
					className: leaving ? "dshu-toast dshu-toast-leave" : "dshu-toast",
					role: "alert",
					onClick: () => {
						if (entry.onClick !== null) entry.onClick();
						onDone();
					},
				},
					h("span", { className: toneClass(entry.tone) }),
					h("span", { className: "dshu-toast-text" }, entry.title),
				),
				document.body,
			);
		}

		/** toast 常驻宿主：订阅 store，当前无 toast 时渲染 null。 */
		function ToastHost() {
			const [current, setCurrent] = useState(getToast());
			useEffect(() => subscribe(() => setCurrent(getToast())), []);
			if (current === null) return null;
			return h(ToastItem, { key: current.seq, toast: current, onDone: clearToast });
		}

		// ── 铃铛 + 托盘（会话头工具区）──────────────────────────────────────
		/** 内联铃铛图标。 */
		function bellIcon() {
			return h("svg", {
				width: 16, height: 16, viewBox: "0 0 16 16", fill: "none",
				stroke: "currentColor", strokeWidth: "1.4",
				strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
			},
				h("path", { d: "M8 2a4.5 4.5 0 0 0-4.5 4.5c0 3-1 4-1 4h11s-1-1-1-4A4.5 4.5 0 0 0 8 2Z" }),
				h("path", { d: "M6.6 12.5a1.5 1.5 0 0 0 2.8 0" }),
			);
		}

		/** 托盘：锚定铃铛下方展开的通知列表（Portal 到 body，带遮罩）。 */
		function Tray({ anchor, items, onClose, onDismiss, onPick }) {
			const [pos, setPos] = useState(null);
			useEffect(() => {
				if (anchor === null || anchor === undefined) return;
				const rect = anchor.getBoundingClientRect();
				setPos({
					top: rect.bottom + 6,
					right: Math.max(8, window.innerWidth - rect.right),
				});
			}, [anchor]);
			return ReactDOM.createPortal(
				h(React.Fragment, null,
					h("div", { className: "dshu-tray-backdrop", onClick: onClose }),
					h("div", { className: "dshu-tray", style: pos === null ? { visibility: "hidden" } : pos, role: "menu" },
						items.length === 0
							? h("div", { className: "dshu-tray-empty" }, "暂无通知")
							: items.map(item => h("div", { key: item.id, className: "dshu-tray-item" },
								h("button", {
									type: "button",
									className: "dshu-tray-item-main",
									onClick: () => onPick(item),
								},
									h("span", { className: toneClass(item.tone) }),
									h("span", { className: "dshu-tray-item-text" }, item.title),
								),
								h("button", {
									type: "button",
									className: "dshu-tray-item-dismiss",
									onClick: () => onDismiss(item.id),
								}, "知道了"),
							)),
					),
				),
				document.body,
			);
		}

		/** 会话头铃铛：未读计数徽标 + 点击展开托盘。 */
		function NotifyBell() {
			const [items, setItems] = useState(getNotifications());
			const [open, setOpen] = useState(false);
			const anchorRef = React.useRef(null);
			useEffect(() => subscribe(() => setItems(getNotifications())), []);
			const count = items.length;
			return h(React.Fragment, null,
				h("button", {
					ref: anchorRef,
					type: "button",
					className: "dshu-bell",
					"aria-label": count > 0 ? `通知（${count} 条）` : "通知",
					onClick: () => setOpen(v => !v),
				},
					bellIcon(),
					count > 0 ? h("span", { className: "dshu-bell-badge" }, count) : null,
				),
				open ? h(Tray, {
					anchor: anchorRef.current,
					items,
					onClose: () => setOpen(false),
					onDismiss: dismiss,
					onPick: (item) => { setOpen(false); if (item.onClick !== null) item.onClick(); },
				}) : null,
			);
		}

		// ── 插件导出 ─────────────────────────────────────────────────────────
		exports.name = "dsh-notifier";
		exports.inject = ["slots"];
		exports.apply = function apply(ctx) {
			// 提供 notifier 客户端服务：消费方用 ctx.get('notifier')（可选）。
			ctx.provide("notifier", notifierApi);
			ctx.effect(() => {
				// toast 常驻宿主：挂在 body 上的独立 React root，无会话也工作。
				const host = document.createElement("div");
				host.id = "dsh-notifier-toast-host";
				document.body.appendChild(host);
				const root = ReactDOMClient.createRoot(host);
				root.render(h(ToastHost));
				// 铃铛注册到会话头工具区（order 0 排最前）。
				const offBell = ctx.slots.inject("conversation.session.header.utilities", () => ctx.slots.register({
					name: "conversation.session.header.utilities",
					id: "notifier-bell",
					order: 0,
					label: "通知",
				}, NotifyBell));
				// 卸载清理：摘除插槽、卸载 React root、移除宿主节点。
				return () => {
					if (typeof offBell === "function") offBell();
					root.unmount();
					host.remove();
				};
			}, "dsh-notifier: toast host + bell registration");
		};
		return module.exports;
	},
});
