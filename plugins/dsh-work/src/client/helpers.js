/**
 * dsh-work — 客户端纯工具：消息/尺寸、面板几何、树结构、git 状态码、
 * 文件分类、资产 URL。
 */

		// ── helpers ──────────────────────────────────────────────────────────
		export function messageOf(error) {
			return error instanceof Error ? error.message : String(error);
		}
		export function formatSize(bytes) {
			if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + " MB";
			if (bytes >= 1024) return (bytes / 1024).toFixed(1) + " KB";
			return bytes + " B";
		}
		// ── panel geometry: widths, clamps, persistence ──────────────────────
		export const PANEL_MIN = 280;
		// 两栏常驻：只要选中了文件就分栏（不再受宽度门槛限制，窄面板由树
		// 自动让位、内容区保底）；窄面板点文件自动加宽到能放下两栏。
		export const TREE_MIN = 120;      // 目录树 pane 的最小宽度
		export const CONTENT_MIN = 240;   // 内容 pane 的最小宽度（窄面板时树让位保它）
		export const AUTO_WIDEN = 720;
		export const PANEL_DEFAULT = 344;
		export const TREE_DEFAULT = 240;
		export const WIDTH_KEY = "dsh-work.width";
		export const SPLIT_KEY = "dsh-work.split";
		export function readStored(key, fallback) {
			try {
				const raw = window.localStorage.getItem(key);
				const value = raw === null ? NaN : Number(raw);
				return Number.isFinite(value) && value > 0 ? value : fallback;
			} catch {
				return fallback;
			}
		}
		export function writeStored(key, value) {
			try { window.localStorage.setItem(key, String(Math.round(value))); } catch { /* private mode: session-only */ }
		}
		export function clampPanelWidth(width, maxWidth, min = PANEL_MIN) {
			return Math.min(maxWidth, Math.max(min, Math.round(width)));
		}
		// ── 宽度动画：与主框架左侧栏同一曲线/时长的 JS 逐帧 tween ─────────────
		// cubic-bezier(0.4, 0, 0.2, 1) = ui-theme 的 --ds-ease-in-out（AppFrame
		// 网格轨道过渡用它）。面板宽度用逐帧 setWidth 驱动（而非 CSS transition）：
		// 树分栏钳制与三列联动都跟随 width 状态，逐帧驱动才能同步滑动。
		export function cubicBezierEase(t, x1 = 0.4, y1 = 0, x2 = 0.2, y2 = 1) {
			// 解 cubic-bezier x(t)=u 得参数 t，再求 y(t)。牛顿迭代 + 二分兜底。
			const cx = 3 * x1;
			const bx = 3 * (x2 - x1) - cx;
			const ax = 1 - cx - bx;
			const cy = 3 * y1;
			const by = 3 * (y2 - y1) - cy;
			const ay = 1 - cy - by;
			const sampleX = (tt) => ((ax * tt + bx) * tt + cx) * tt;
			const sampleY = (tt) => ((ay * tt + by) * tt + cy) * tt;
			const sampleDX = (tt) => (3 * ax * tt + 2 * bx) * tt + cx;
			const u = Math.max(0, Math.min(1, t));
			if (u === 0 || u === 1) return u;
			let tt = u;
			for (let i = 0; i < 8; i++) {
				const err = sampleX(tt) - u;
				if (Math.abs(err) < 1e-6) break;
				const d = sampleDX(tt);
				if (Math.abs(d) < 1e-6) break;
				tt -= err / d;
			}
			let lo = 0;
			let hi = 1;
			tt = Math.max(0, Math.min(1, tt));
			for (let i = 0; i < 12; i++) {
				const x = sampleX(tt);
				if (Math.abs(x - u) < 1e-6) break;
				if (x < u) lo = tt; else hi = tt;
				tt = (lo + hi) / 2;
			}
			return sampleY(tt);
		}
		/** 两段式收起的动作决策：宽于最小显示宽度 → "shrink"（收窄），否则 → "hide"（收起）。 */
		export function panelActionFor(width, min = PANEL_MIN) {
			return width > min ? "shrink" : "hide";
		}
		export function clampTreeWidth(width, panelWidth) {
			// 自由拖动：树宽区间 [TREE_MIN, 面板宽 − CONTENT_MIN]，内容区保底；
			// 面板极窄（< TREE_MIN+CONTENT_MIN）时树让位、下限退到 0。
			const upper = Math.max(0, Math.round(panelWidth - CONTENT_MIN));
			const lower = Math.min(TREE_MIN, upper);
			return Math.min(upper, Math.max(lower, Math.round(width)));
		}
		/** 目录树节点构造：把宿主 /workbench/dir 的一行条目转成可展开的树节点。 */
		export function toNode(entry) {
			const node = {
				path: entry.path,
				name: entry.name,
				type: entry.type,
				hidden: entry.hidden,
				expanded: false,
				loading: false,
				loaded: false,
				children: [],
			};
			if (entry.size !== undefined) node.size = entry.size;
			return node;
		}
		/** 按绝对路径在树里找节点（深度优先，找不到返回 undefined）。 */
		export function findNode(node, path) {
			if (node.path === path) return node;
			for (let i = 0; i < node.children.length; i++) {
				const found = findNode(node.children[i], path);
				if (found !== undefined) return found;
			}
			return undefined;
		}
		/** 不可变更新：返回一棵沿 path 分支替换过的新树（未命中路径则原样返回）。 */
		export function patchNode(root, path, patch) {
			if (root.path === path) return Object.assign({}, root, patch);
			return Object.assign({}, root, { children: root.children.map((child) => patchNode(child, path, patch)) });
		}
		/** 变更徽标：porcelain 前两位的状态码 → 单字符徽标（? = 未跟踪）。 */
		export function badgeKind(code) {
			const trimmed = code.trim();
			if (trimmed === "" || trimmed === "??") return "?";
			return trimmed.charAt(0);
		}
		/**
		 * porcelain=v1 的 XY 状态：第一位是暂存区（index），第二位是工作区
		 * （worktree）。`X` 非空格且非 `?` 表示有已暂存变更（`??` 未跟踪、
		 * ` M` 仅工作区改动都算未暂存）。注意 UU（双方冲突）会被归入"已暂存"，
		 * 点 unstage 会失败——这是低影响边缘情况，未单独处理。
		 */
		export function stagedOf(code) {
			const first = code.charAt(0);
			return first !== " " && first !== "?";
		}
		// Preview kind mirrors the host's classifyFile: text/image/audio/video/other.
		export const TEXT_EXTENSIONS = new Set([
			"md", "mdx", "txt", "text", "ts", "tsx", "js", "jsx", "mjs", "cjs", "mts", "cts",
			"json", "jsonc", "yml", "yaml", "toml", "html", "htm", "xml", "css", "scss",
			"less", "py", "rb", "go", "rs", "java", "c", "h", "cpp", "hpp", "cs", "php",
			"sh", "bash", "zsh", "fish", "bat", "ps1", "sql", "graphql", "ini", "conf",
			"env", "gitignore", "dockerfile", "lock", "log", "csv", "vue", "svelte",
			"astro", "prisma", "proto", "webmanifest",
		]);
		export const IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "gif", "webp", "bmp", "ico", "avif", "svg"]);
		export const AUDIO_EXTENSIONS = new Set(["mp3", "wav", "ogg", "oga", "m4a", "aac", "flac", "opus", "weba"]);
		export const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov", "m4v", "avi", "mkv", "ogv", "ts", "m2ts"]);
		export function classifyFile(name) {
			const dot = name.lastIndexOf(".");
			const ext = dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
			if (ext === "") return "other";
			if (TEXT_EXTENSIONS.has(ext)) return "text";
			if (IMAGE_EXTENSIONS.has(ext)) return "image";
			if (AUDIO_EXTENSIONS.has(ext)) return "audio";
			if (VIDEO_EXTENSIONS.has(ext)) return "video";
			return "other";
		}
		export function assetUrl(path) {
			return "/workbench/asset?path=" + encodeURIComponent(path);
		}
