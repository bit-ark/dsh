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
		export function clampPanelWidth(width, maxWidth) {
			return Math.min(maxWidth, Math.max(PANEL_MIN, Math.round(width)));
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
