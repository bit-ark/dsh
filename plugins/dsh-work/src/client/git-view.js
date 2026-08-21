/** dsh-work — Git tab：分支/提交图/变更操作/忽略列表/提交框。 */
import React from 'react'
import { TipButton } from './tip.js'
import { badgeKind, stagedOf } from './helpers.js'
import { banIcon, checkIcon, createIcon, eyeIcon, eyeOffIcon, minusIcon, plusIcon, refreshIcon, trayDownIcon, undoIcon } from './icons.js'
const h = React.createElement

		// ── Git tab ──────────────────────────────────────────────────────────
		export function GitView(props) {
			const state = props.state;
			if (state.status === "loading") return h("div", { className: "dwb-scroll" }, h("div", { className: "dwb-note" }, "加载中…"));
			if (state.status === "idle") return h("div", { className: "dwb-scroll" }, h("div", { className: "dwb-note" }, "无工作目录（未选择会话）"));
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
						: "切换到一个 Git 仓库内的会话，就能看到分支、提交图和工作区变更；也可以直接在此目录初始化一个仓库。"),
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
