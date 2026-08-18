/**
 * dsh-work — 无依赖语法高亮（轻量正则 tokenizer）。
 * Token 颜色走壳的 --shiki-token-* 调色板；未知语言回退通用模式；
 * 超大文本跳过 token 只做纯文本。纯逻辑，可被 node 测试直接引用。
 */

		// ── preview rendering: dependency-free syntax highlighting ────────────
		// Token colors resolve through the shell's global --shiki-token-* palette
		// so the panel matches the app's fenced code blocks. Everything is
		// HTML-escaped before token spans wrap it. Unknown languages fall back to
		// a generic mode (strings, numbers); very large files skip token spans to
		// keep the panel responsive.

		export function escapeHtml(text) {
			return text
				.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
		}

		export const HL_LANG_BY_EXT = {
			ts: "javascript", tsx: "javascript", js: "javascript", jsx: "javascript",
			mjs: "javascript", cjs: "javascript", mts: "javascript", cts: "javascript",
			json: "json", jsonc: "json", yml: "yaml", yaml: "yaml", toml: "toml",
			ini: "ini", conf: "ini", env: "ini", gitignore: "ini",
			py: "python", rb: "ruby", go: "go", rs: "rust", java: "java",
			c: "cpp", h: "cpp", cpp: "cpp", hpp: "cpp", cs: "csharp", php: "php",
			sh: "shell", bash: "shell", zsh: "shell", fish: "shell",
			sql: "sql", css: "css", scss: "css", less: "css",
			html: "markup", htm: "markup", xml: "markup",
			md: "markdown", mdx: "markdown",
		};

		export const HL_KEYWORDS = {
			javascript: ["const","let","var","function","return","if","else","for","while","do","switch","case","default","break","continue","new","class","extends","super","this","typeof","instanceof","in","of","import","export","from","async","await","try","catch","finally","throw","yield","delete","void","null","undefined","true","false","interface","type","enum","implements","public","private","protected","readonly","static","abstract","as","keyof","namespace","declare","get","set","require"],
			json: ["true","false","null"],
			python: ["def","class","return","if","elif","else","for","while","try","except","finally","with","as","import","from","lambda","yield","pass","break","continue","raise","global","nonlocal","del","assert","async","await","True","False","None","not","and","or","in","is","self","print"],
			ruby: ["def","class","module","return","if","elsif","else","unless","case","when","while","until","for","do","end","begin","rescue","ensure","raise","yield","require","include","extend","attr_accessor","attr_reader","attr_writer","true","false","nil","and","or","not","new","puts"],
			go: ["func","package","import","return","if","else","for","range","switch","case","default","break","continue","goto","defer","go","chan","select","struct","interface","map","type","var","const","true","false","nil","fallthrough"],
			rust: ["fn","let","mut","const","static","struct","enum","trait","impl","mod","use","pub","crate","self","Self","return","if","else","match","for","while","loop","break","continue","move","ref","as","where","dyn","async","await","true","false","unsafe","type"],
			java: ["public","private","protected","class","interface","enum","extends","implements","import","package","return","if","else","for","while","do","switch","case","default","break","continue","new","try","catch","finally","throw","throws","static","final","void","this","super","abstract","synchronized","volatile","transient","instanceof","true","false","null","record","var"],
			cpp: ["public","private","protected","class","struct","union","enum","namespace","using","template","typename","return","if","else","for","while","do","switch","case","default","break","continue","new","delete","try","catch","throw","static","const","constexpr","inline","virtual","override","final","this","true","false","nullptr","sizeof","typedef","extern","register","volatile","mutable","friend","operator","goto"],
			csharp: ["public","private","protected","internal","class","struct","interface","enum","namespace","using","return","if","else","for","foreach","while","do","switch","case","default","break","continue","new","try","catch","finally","throw","static","const","readonly","virtual","override","sealed","abstract","async","await","var","true","false","null","this","base","out","ref","in","is","as","typeof","delegate","event","get","set","value","record"],
			php: ["function","class","interface","trait","namespace","use","return","if","else","elseif","for","foreach","while","do","switch","case","default","break","continue","new","try","catch","finally","throw","static","public","private","protected","const","echo","print","true","false","null","isset","empty","array","require","include","require_once","include_once","abstract","final","extends","implements","instanceof","and","or","xor","list","global"],
			swift: ["func","class","struct","enum","protocol","extension","import","return","if","else","guard","for","while","repeat","switch","case","default","break","continue","fallthrough","new","try","catch","throw","throws","static","let","var","inout","where","deinit","init","self","true","false","nil","as","is","typealias","open","public","internal","fileprivate","private","lazy","mutating","nonmutating","override","required","convenience","associatedtype"],
			kotlin: ["fun","class","object","interface","enum","data","sealed","abstract","open","override","final","val","var","const","return","if","else","when","for","while","do","try","catch","finally","throw","import","package","this","super","true","false","null","is","in","as","by","companion","init","constructor","internal","public","private","protected","inline","suspend","infix","operator","lateinit","typealias","get","set"],
			shell: ["if","then","else","elif","fi","for","while","do","done","case","esac","function","in","return","exit","export","local","readonly","set","unset","shift","select","until","break","continue","source","echo","printf","cd","ls","mkdir","rm","cp","mv","cat","grep","sed","awk","curl","wget","git","npm","pnpm","node","true","false"],
			sql: ["select","from","where","insert","into","values","update","set","delete","create","table","alter","drop","index","view","join","inner","left","right","full","outer","on","group","by","order","having","limit","offset","distinct","as","and","or","not","null","is","in","between","like","exists","union","all","primary","key","foreign","references","constraint","default","unique","check","case","when","then","else","end","count","sum","avg","min","max","begin","commit","rollback","transaction"],
			toml: ["true","false"],
		};

		export const HL_TYPES = {
			javascript: ["Number","String","Boolean","Object","Array","Promise","Map","Set","WeakMap","WeakSet","Error","Date","RegExp","JSON","Math","Function","Symbol","BigInt","console","window","document","globalThis","process","Buffer","HTMLElement"],
			go: ["int","int8","int16","int32","int64","uint","uint8","uint16","uint32","uint64","uintptr","float32","float64","complex64","complex128","byte","rune","string","bool","error","any","chan","func","map","slice"],
			rust: ["i8","i16","i32","i64","i128","isize","u8","u16","u32","u64","u128","usize","f32","f64","bool","char","str","String","Vec","Option","Result","Box","Rc","Arc","HashMap","HashSet","BTreeMap","BTreeSet","Iterator","Sized"],
			java: ["String","Integer","Long","Double","Float","Boolean","Object","Class","List","Map","Set","ArrayList","HashMap","HashSet","Collection","Optional","Exception","RuntimeException","Error","Thread","Runnable","System","Math","int","long","double","float","boolean","char","byte","short","void"],
			cpp: ["int","long","short","char","bool","float","double","void","size_t","std","string","vector","map","set","unordered_map","unique_ptr","shared_ptr","auto","uint8_t","int32_t","int64_t","uint32_t","uint64_t","FILE","cout","cin","endl"],
			csharp: ["string","int","long","double","float","bool","char","byte","short","uint","ulong","decimal","object","void","var","dynamic","List","Dictionary","HashSet","IEnumerable","Task","Action","Func","Exception","Console","Math","String","DateTime","Guid","Nullable"],
			python: ["int","float","str","bytes","bool","list","tuple","dict","set","frozenset","None","object","type","Exception","ValueError","TypeError","KeyError","IndexError","RuntimeError","FileNotFoundError","self","cls"],
			ruby: ["String","Integer","Float","Symbol","Array","Hash","Range","Proc","Lambda","Module","Class","Object","Exception","StandardError","nil","true","false"],
			swift: ["Int","Double","Float","Bool","String","Character","Array","Dictionary","Set","Optional","Any","AnyObject","Self","Void","Never","Error","Result","URL","Date","Data","CGFloat","NSObject","UIView","UIViewController"],
			kotlin: ["Int","Long","Double","Float","Boolean","String","Char","Byte","Short","Unit","Any","Nothing","List","MutableList","Map","MutableMap","Set","MutableSet","Array","Sequence","Pair","Triple","Exception","Error","Result","Unit"],
			php: ["int","float","string","bool","array","object","mixed","void","null","false","true","callable","iterable","self","static","parent","Exception","Error","stdClass"],
		};

		export const ESCAPE_RE = /[.*+?^${}()|[\]\\]/g;
		export function escapeRe(text) {
			return text.replace(ESCAPE_RE, "\\$&");
		}

		export const HL_CACHE = new Map();
		/** Build (or fetch) the master token regex for one language id. */
		export function hlRegex(lang) {
			const cached = HL_CACHE.get(lang);
			if (cached !== undefined) return cached;
			const cfg = {
				line: null, block: null, keywords: null, types: null, quotes: ['"', "'", "`"],
				extra: null, calls: false,
			};
			// per-language config lives on HL_LANGS; a language without one is generic.
			const known = HL_LANGS[lang];
			if (known !== undefined) Object.assign(cfg, known);
			const parts = [];
			const kinds = [];
			const add = (pattern, kind) => { parts.push("(" + pattern + ")"); kinds.push(kind); };
			if (cfg.block !== null) add(cfg.block, "comment");
			if (cfg.line !== null) add(cfg.line, "comment");
			for (const q of cfg.quotes) {
				if (q.length > 1) add(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[\\s\\S]*?" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "string");
				else add(q + "(?:\\\\.|[^" + q + "\\\\\\n])*" + q, "string");
			}
			add("\\b\\d(?:_?\\d)*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b", "number");
			if (cfg.keywords !== null && cfg.keywords.length > 0) {
				add("\\b(?:" + cfg.keywords.map(escapeRe).sort((a, b) => b.length - a.length).join("|") + ")\\b", "keyword");
			}
			if (cfg.types !== null && cfg.types.length > 0) {
				add("\\b(?:" + cfg.types.map(escapeRe).sort((a, b) => b.length - a.length).join("|") + ")\\b", "type");
			}
			if (cfg.extra !== null) add(cfg.extra, "number");
			if (cfg.calls) add("\\b[A-Za-z_$][\\w$]*(?=\\s*\\()", "call");
			const re = new RegExp(parts.join("|"), "g");
			const built = { re, kinds };
			HL_CACHE.set(lang, built);
			return built;
		}

		export const HL_LANGS = {
			javascript: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.javascript, types: HL_TYPES.javascript, calls: true },
			json: { line: null, block: null, keywords: HL_KEYWORDS.json, types: null, quotes: ['"'] },
			python: { line: "#[^\\n]*", block: null, keywords: HL_KEYWORDS.python, types: HL_TYPES.python, quotes: ["'''", '"""', "'", '"'], calls: true },
			ruby: { line: "#[^\\n]*", block: null, keywords: HL_KEYWORDS.ruby, types: HL_TYPES.ruby, quotes: ['"', "'"], calls: true, extra: ":[A-Za-z_][\\w]*" },
			go: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.go, types: HL_TYPES.go, quotes: ['"', "`"], calls: true },
			rust: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.rust, types: HL_TYPES.rust, quotes: ['"', "'"] },
			java: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.java, types: HL_TYPES.java, quotes: ['"', "'"] },
			cpp: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.cpp, types: HL_TYPES.cpp, quotes: ['"', "'"] },
			csharp: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.csharp, types: HL_TYPES.csharp, quotes: ['"', "'"] },
			php: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.php, types: HL_TYPES.php, quotes: ['"', "'"], extra: "\\$[A-Za-z_][\\w]*" },
			swift: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.swift, types: HL_TYPES.swift, quotes: ['"'] },
			kotlin: { line: "\\/\\/[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.kotlin, types: HL_TYPES.kotlin, quotes: ['"', "'"] },
			shell: { line: "#[^\\n]*", block: null, keywords: HL_KEYWORDS.shell, types: null, quotes: ['"', "'"], extra: "\\$\\{?[A-Za-z_][\\w]*\\}?" },
			sql: { line: "--[^\\n]*", block: "\\/\\*[\\s\\S]*?\\*\\/", keywords: HL_KEYWORDS.sql, types: null, quotes: ["'", '"'] },
			toml: { line: "#[^\\n]*", block: null, keywords: HL_KEYWORDS.toml, types: null, quotes: ['"""', '"', "'"] },
			ini: { line: "[;#][^\\n]*", block: null, keywords: [], types: null, quotes: ['"', "'"] },
		};

		/** The largest text that still gets token spans; beyond it the preview stays plain (escaped). */
		export const HL_MAX = 300000;

		/** Highlight one source text into escaped HTML with token spans. */
		export function highlightCode(text, lang) {
			if (lang === "markup") return highlightMarkup(text);
			if (lang === "markdown") return highlightMarkdownSource(text);
			if (lang === "css") return highlightCss(text);
			if (lang === "yaml") return highlightYaml(text);
			if (lang === "ini") return highlightIni(text);
			if (text.length > HL_MAX) return escapeHtml(text);
			const { re, kinds } = hlRegex(lang);
			re.lastIndex = 0;
			let out = "";
			let last = 0;
			let match;
			while ((match = re.exec(text)) !== null) {
				if (match.index > last) out += escapeHtml(text.slice(last, match.index));
				let kind = "plain";
				for (let i = 1; i < match.length; i++) {
					if (match[i] !== undefined) { kind = kinds[i - 1]; break; }
				}
				out += '<span class="dwb-tok ' + kind + '">' + escapeHtml(match[0]) + "</span>";
				last = match.index + match[0].length;
			}
			if (last < text.length) out += escapeHtml(text.slice(last));
			return out;
		}

		/** Wrap already-escaped text with the given token class, or leave plain. */
		export function tokSpan(escaped, kind) {
			return kind === null ? escaped : '<span class="dwb-tok ' + kind + '">' + escaped + "</span>";
		}

		/** Markup (html/xml): tags, attribute names, quoted values, comments. */
		export function highlightMarkup(text) {
			if (text.length > HL_MAX) return escapeHtml(text);
			let out = "";
			let last = 0;
			const re = /<!--[\s\S]*?-->|<[^>]*>|[^<]+/g;
			let match;
			while ((match = re.exec(text)) !== null) {
				const piece = match[0];
				if (piece.charCodeAt(0) === 60) { // '<'
					if (piece.startsWith("<!--")) {
						out += '<span class="dwb-tok comment">' + escapeHtml(piece) + "</span>";
					} else {
						out += highlightTag(piece);
					}
				} else {
					out += escapeHtml(piece);
				}
				last = match.index + piece.length;
			}
			if (last < text.length) out += escapeHtml(text.slice(last));
			return out;
		}

		/** 高亮单个 HTML 标签（markup 语言专用扫描）：属性名/等号/字符串值着色。 */
		export function highlightTag(tag) {
			let out = "";
			let last = 0;
			const re = /([A-Za-z_][\w-]*)(\s*=\s*)("(?:[^"]*)"|'(?:[^']*)')|[A-Za-z_][\w-]*|\s+/g;
			let match;
			while ((match = re.exec(tag)) !== null) {
				const piece = match[0];
				if (match[1] !== undefined) {
					out += escapeHtml(tag.slice(last, match.index));
					out += '<span class="dwb-tok param">' + escapeHtml(match[1]) + "</span>";
					out += '<span class="dwb-tok punct">' + escapeHtml(match[2]) + "</span>";
					out += '<span class="dwb-tok string">' + escapeHtml(match[3]) + "</span>";
				} else {
					const name = /[A-Za-z_][\w-]*/.exec(piece);
					if (name !== null && name.index === 0 && /^[A-Za-z]/.test(piece)) {
						out += '<span class="dwb-tok ' + (piece.charAt(1) === "/" ? "punct" : "type") + '">' + escapeHtml(piece) + "</span>";
					} else {
						out += escapeHtml(piece);
					}
				}
				last = match.index + piece.length;
			}
			if (last < tag.length) out += escapeHtml(tag.slice(last));
			return out;
		}

		/** CSS: comments, at-rules, selectors, properties, values, numbers. */
		export function highlightCss(text) {
			if (text.length > HL_MAX) return escapeHtml(text);
			let out = "";
			let last = 0;
			const re = /\/\*[\s\S]*?\*\/|@[\w-]+|\b\d[\w.%]*\b|([^{};]+)(?=\s*\{)|([\w-]+)(?=\s*:)|[{};:]/g;
			let match;
			while ((match = re.exec(text)) !== null) {
				const piece = match[0];
				let kind = null;
				if (piece.startsWith("/*")) kind = "comment";
				else if (piece.charAt(0) === "@") kind = "keyword";
				else if (/^\d/.test(piece)) kind = "number";
				else if (match[1] !== undefined) kind = "type";
				else if (match[2] !== undefined) kind = "param";
				else if (/[{};:]/.test(piece)) kind = "punct";
				if (match.index > last) out += escapeHtml(text.slice(last, match.index));
				out += tokSpan(escapeHtml(piece), kind);
				last = match.index + piece.length;
			}
			if (last < text.length) out += escapeHtml(text.slice(last));
			return out;
		}

		/** YAML: comments, `key:` mappings, bullets, strings, numbers, booleans. */
		export function highlightYaml(text) {
			if (text.length > HL_MAX) return escapeHtml(text);
			let out = "";
			let last = 0;
			const re = /#[^\n]*|"[^"]*"|'[^']*'|\b\d[\w.]*\b|\b(?:true|false|null|yes|no)\b|^\s*[-*]\s+|^(\s*)([\w.][\w .-]*)(?=\s*:)|:/gm;
			let match;
			while ((match = re.exec(text)) !== null) {
				const piece = match[0];
				let kind = null;
				if (piece.charAt(0) === "#") kind = "comment";
				else if (piece.charAt(0) === '"' || piece.charAt(0) === "'") kind = "string";
				else if (/^\d/.test(piece)) kind = "number";
				else if (/^(?:true|false|null|yes|no)$/.test(piece.trim())) kind = "keyword";
				else if (/^\s*[-*]\s+$/.test(piece)) kind = "punct";
				else if (match[2] !== undefined) kind = "prop";
				else if (piece === ":") kind = "punct";
				if (match.index > last) out += escapeHtml(text.slice(last, match.index));
				out += tokSpan(escapeHtml(piece), kind);
				last = match.index + piece.length;
			}
			if (last < text.length) out += escapeHtml(text.slice(last));
			return out;
		}

		/** INI: comments, `key = value` mappings, strings. */
		export function highlightIni(text) {
			if (text.length > HL_MAX) return escapeHtml(text);
			let out = "";
			let last = 0;
			const re = /[;#][^\n]*|"[^"]*"|'[^']*'|\b\d[\w.]*\b|^(\s*)([\w.-]+)(?=\s*=)|[=\[\]]/gm;
			let match;
			while ((match = re.exec(text)) !== null) {
				const piece = match[0];
				let kind = null;
				if (piece.charAt(0) === ";" || piece.charAt(0) === "#") kind = "comment";
				else if (piece.charAt(0) === '"' || piece.charAt(0) === "'") kind = "string";
				else if (/^\d/.test(piece)) kind = "number";
				else if (match[2] !== undefined) kind = "prop";
				else if (/[=\[\]]/.test(piece)) kind = "punct";
				if (match.index > last) out += escapeHtml(text.slice(last, match.index));
				out += tokSpan(escapeHtml(piece), kind);
				last = match.index + piece.length;
			}
			if (last < text.length) out += escapeHtml(text.slice(last));
			return out;
		}

		/** Markdown source view: headings, emphasis, links, inline code, lists, hr. */
		export function highlightMarkdownSource(text) {
			if (text.length > HL_MAX) return escapeHtml(text);
			let out = "";
			let last = 0;
			const re = /^#{1,6}\s.*$|^>.*$|^\s*[-*+]\s+.*$|^\s*\d+[.)]\s+.*$|^\s*(?:---+|\*\*\*+)\s*$|`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|~~[^~]+~~|\[[^\]]+\]\([^)]*\)|!\[[^\]]*\]\([^)]*\)/gm;
			let match;
			while ((match = re.exec(text)) !== null) {
				const piece = match[0];
				let kind = null;
				if (/^#{1,6}\s/.test(piece)) kind = "keyword";
				else if (/^>/.test(piece)) kind = "comment";
				else if (/^\s*[-*+]\s|\s*\d+[.)]\s/.test(piece)) kind = "punct";
				else if (/^(?:---+|\*\*\*+)$/.test(piece.trim())) kind = "punct";
				else if (piece.charAt(0) === "`" || /^\*\*/.test(piece) || /^\*/.test(piece) || /^~~/.test(piece)) kind = "string";
				else if (piece.charAt(0) === "[" || piece.charAt(0) === "!") kind = "constant";
				if (match.index > last) out += escapeHtml(text.slice(last, match.index));
				out += tokSpan(escapeHtml(piece), kind);
				last = match.index + piece.length;
			}
			if (last < text.length) out += escapeHtml(text.slice(last));
			return out;
		}
