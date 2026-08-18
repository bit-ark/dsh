/**
 * dsh-work — markdown 渲染（marked v18 + 安全覆写）。
 * 渲染器只覆写安全相关节点：原始 HTML 一律按纯文本转义；链接/图片
 * 目的地走协议白名单与资产路由；代码围栏走内置高亮。
 */
import marked from './vendor/marked.js'
import { assetUrl } from './helpers.js'
import { escapeHtml, highlightCode } from './highlight.js'

		// ── preview rendering: markdown → sanitized HTML ──────────────────────
		// A compact GFM subset: headings, paragraphs, fenced code (with
		// highlighting), lists, blockquotes, hr, and inline code/emphasis/links/
		// images. All text is escaped; links allow http(s)/mailto only, images
		// allow http(s) plus same-tree relative paths (served through the
		// workbench's own asset route, parent traversal refused).

		export const MD_FENCE_ALIASES = { ts: "javascript", tsx: "javascript", js: "javascript", jsx: "javascript", py: "python", rb: "ruby", go: "go", rs: "rust", java: "java", cs: "csharp", php: "php", sh: "shell", bash: "shell", zsh: "shell", sql: "sql", yaml: "yaml", yml: "yaml", json: "json", html: "markup", xml: "markup", css: "css", md: "markdown", markdown: "markdown", ini: "ini", toml: "toml" };

		export function mdLinkHref(url) {
			if (/^https?:/i.test(url) || /^mailto:/i.test(url)) return url;
			return null;
		}

		export function mdImageHref(src, dir) {
			if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(src)) {
				return /^https?:/i.test(src) ? src : null;
			}
			if (src.includes("..")) return null;
			return assetUrl(dir === "" ? src : dir + "/" + src);
		}



		// ── markdown rendering (third-party: marked v18) ───────────────────
		// 渲染器只覆写安全相关节点:原始 HTML 一律按纯文本转义(文件内容
		// 不可信,任何标签不得进入 DOM);链接/图片目的地继续走协议白名单
		// 与资产路由,非法目的地退回转义原文;代码围栏走插件自带高亮。
		// 其余节点(标题/列表/引用/表格/任务列表/删除线等)沿用 marked
		// 的 GFM 默认输出。
		let mdCurrentDir = "";

		export const mdRenderer = {
			html(token) { return escapeHtml(token.text); },
			code(token) {
				const lang = MD_FENCE_ALIASES[token.lang] ?? (token.lang === "" ? undefined : token.lang);
				return '<pre class="dwb-md-pre"><code>' + highlightCode(token.text, lang) + "</code></pre>";
			},
			codespan(token) { return '<code class="dwb-md-code">' + escapeHtml(token.text) + "</code>"; },
			link(token) {
				const href = mdLinkHref(token.href);
				// token.text 是源文本原文（未转义），链接文本内的原始 HTML
				// （如 [<img onerror>](url)）必须整体转义，否则会原样进入 DOM。
				return href === null
					? escapeHtml(token.raw)
					: '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(token.text) + "</a>";
			},
			image(token) {
				const src = mdImageHref(token.href, mdCurrentDir);
				return src === null
					? escapeHtml(token.raw)
					: '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(token.text) + '">';
			},
		};
		marked.use({ renderer: mdRenderer, gfm: true, breaks: true });

		/** Render markdown into sanitized HTML. `dir` is the file's directory (for relative images). */
		export function renderMarkdown(text, dir) {
			mdCurrentDir = dir;
			return marked.parse(text, { async: false });
		}

