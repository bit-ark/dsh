/**
 * dsh-work — CodeMirror 6 编辑器组装：语言映射/主题/扩展，惰性加载 vendor。
 */
import { cmApi } from './vendor/codemirror.js'
import { assetUrl } from './helpers.js'
export { cmApi }

		// ── editor: CodeMirror 语言映射 / 主题 / 扩展组装 ───────────────────
		// 语言映射是纯逻辑(可测);主题把语法色映射到壳的 --shiki-token-*
		// 调色板与 --dsw-alias-* token,深浅主题自动适配。

		export const CM_LANG_BY_EXT = {
			js: "javascript", mjs: "javascript", cjs: "javascript", jsx: "javascript",
			ts: "typescript", mts: "typescript", cts: "typescript", tsx: "typescript",
			css: "css", scss: "css", less: "css",
			html: "html", htm: "html",
			md: "markdown", markdown: "markdown", mdx: "markdown",
		};

		/** Editor language key by extension; undefined = 纯文本(无高亮但可编辑)。 */
		export function editorLanguageFor(ext) {
			return CM_LANG_BY_EXT[ext] ?? undefined;
		}

		/** CodeMirror 语言扩展组:按扩展名返回 @codemirror/lang-* 的扩展数组。 */
		export function cmLanguage(ext) {
			const cm = cmApi();
			const key = editorLanguageFor(ext);
			if (key === "typescript") return [cm.javascript({ typescript: true, jsx: true })];
			if (key === "javascript") return [cm.javascript({ jsx: true })];
			if (key === "css") return [cm.css()];
			if (key === "html") return [cm.html()];
			if (key === "markdown") return [cm.markdown()];
			return [];
		}

		/** 编辑器主题:语法高亮色走 shiki token,底/边/光标走 dsw alias token。 */
		export function cmTheme() {
			const cm = cmApi();
			return [
				cm.syntaxHighlighting(cm.HighlightStyle.define([
					{ tag: cm.tags.keyword, color: "var(--shiki-token-keyword)" },
					{ tag: cm.tags.string, color: "var(--shiki-token-string)" },
					{ tag: cm.tags.comment, color: "var(--shiki-token-comment)" },
					{ tag: cm.tags.number, color: "var(--shiki-token-constant)" },
					{ tag: cm.tags.bool, color: "var(--shiki-token-constant)" },
					{ tag: cm.tags.function(cm.tags.variableName), color: "var(--shiki-token-function)" },
					{ tag: cm.tags.definition(cm.tags.variableName), color: "var(--shiki-token-function)" },
					{ tag: cm.tags.operator, color: "var(--shiki-token-punctuation)" },
					{ tag: cm.tags.punctuation, color: "var(--shiki-token-punctuation)" },
					{ tag: cm.tags.typeName, color: "var(--shiki-token-parameter)" },
					{ tag: cm.tags.propertyName, color: "var(--shiki-token-parameter)" },
					{ tag: cm.tags.attributeName, color: "var(--shiki-token-parameter)" },
					{ tag: cm.tags.link, color: "var(--shiki-token-link)" },
					{ tag: cm.tags.url, color: "var(--shiki-token-link)" },
				])),
				cm.EditorView.theme({
					"&": { height: "100%", fontSize: "12px", color: "var(--dsw-alias-label-primary)", backgroundColor: "transparent" },
					".cm-content": { fontFamily: "var(--ds-font-family-code)", lineHeight: "1.6", padding: "8px 0" },
					".cm-line": { padding: "0 10px" },
					".cm-gutters": { backgroundColor: "transparent", color: "var(--dsw-alias-label-tertiary)", border: "none", fontSize: "11px" },
					".cm-activeLine": { backgroundColor: "var(--dsw-alias-interactive-bg-hover)" },
					".cm-activeLineGutter": { backgroundColor: "transparent" },
					".cm-cursor": { borderLeftColor: "var(--dsw-alias-label-primary)" },
					".cm-selectionBackground": { backgroundColor: "var(--dsw-alias-markdown-code-segment-selected)" },
					"&.cm-focused": { outline: "none" },
				}),
			];
		}

		/** 编辑器扩展组:基础能力(行号/撤销/括号匹配/缩进/历史键位)+ 语言 + 主题。 */
		export function cmSetup(ext, readOnly) {
			const cm = cmApi();
			return [
				cm.lineNumbers(),
				cm.highlightActiveLine(),
				cm.highlightActiveLineGutter(),
				cm.history(),
				cm.bracketMatching(),
				cm.indentOnInput(),
				cm.keymap.of([...cm.defaultKeymap, ...cm.historyKeymap, cm.indentWithTab]),
				readOnly ? cm.EditorState.readOnly.of(true) : [],
				readOnly ? cm.EditorView.editable.of(false) : [],
				...cmLanguage(ext),
				...cmTheme(),
			];
		}

		/** 编辑器内容上限:与宿主的 full=1 读取上限一致(超出只读)。 */
		export const MAX_TEXT_EDIT = 1024 * 1024;

		export function htmlPreviewSrc(text, dir) {
			return text.replace(/(\b(?:src|href)\s*=\s*)(["'])([^"']*)\2/gi, (all, prefix, quote, value) => {
				if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(value) || value.includes("..")) return all;
				return prefix + quote + assetUrl(dir === "" ? value : dir + "/" + value) + quote;
			});
		}

