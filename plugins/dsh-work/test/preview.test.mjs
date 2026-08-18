/**
 * dsh-work 预览渲染纯逻辑断言：语法高亮 / markdown 渲染 / html 预览重写。
 * lib/client.js 是浏览器模块（window.__ModuleLoader__ 包裹），这里 stub 掉加载器，
 * 让 factory 运行一次并抓取导出的纯函数——组件体不执行，React 钩子只在渲染时调用。
 * 与 classify.test.mjs 同模式：node:test + assert，无依赖。
 * 跑在构建产物上：pnpm build && node test/preview.test.mjs（或直接 pnpm test）。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'

/** Capture the plugin's module exports from a fake browser loader. */
function loadClientModule() {
  let captured = null
  globalThis.window = {
    __ModuleLoader__: {
      load({ factory }) {
        // The factory body destructures React at the top; components never run
        // during definition, so an empty-ish react stub suffices.
        const requireStub = (id) => {
          if (id === 'react') {
            return { useState: undefined, useEffect: undefined, useCallback: undefined, useRef: undefined, useLayoutEffect: undefined, createElement: undefined }
          }
          throw new Error('unexpected require: ' + id)
        }
        captured = factory(requireStub)
      },
    },
  }
  return {
    get exports() {
      if (captured === null) throw new Error('client module did not register')
      return captured
    },
  }
}

const holder = loadClientModule()
await import('../lib/client.js')
const {
  escapeHtml,
  highlightCode,
  renderMarkdown,
  htmlPreviewSrc,
  mdLinkHref,
  mdImageHref,
  fitTipGeometry,
  HL_LANG_BY_EXT,
  PREVIEW_KIND,
  editorLanguageFor,
} = holder.exports

test('escapeHtml 转义 HTML 特殊字符', () => {
  assert.equal(escapeHtml('a<b>&"\'c'), 'a&lt;b&gt;&amp;&quot;&#39;c')
  assert.equal(escapeHtml('plain text'), 'plain text')
})

test('highlightCode 给 javascript 关键字/字符串/注释上 token', () => {
  const html = highlightCode('const x = "a"; // c', 'javascript')
  assert.match(html, /<span class="dwb-tok keyword">const<\/span>/)
  // Content inside a token span is escaped like everything else.
  assert.match(html, /<span class="dwb-tok string">&quot;a&quot;<\/span>/)
  assert.match(html, /<span class="dwb-tok comment">\/\/ c<\/span>/)
})

test('highlightCode 先转义再包 span，绝不输出未转义内容', () => {
  const html = highlightCode('const s = "<b>&";', 'javascript')
  assert.ok(!html.includes('"<b>"'), 'raw <b> must not survive')
  assert.match(html, /&lt;b&gt;/)
})

test('highlightCode 未知语言回退为纯转义文本', () => {
  assert.equal(highlightCode('a < b && c', undefined), 'a &lt; b &amp;&amp; c')
})

test('highlightCode 覆盖 markup / markdown / yaml 专用扫描', () => {
  const markup = highlightCode('<div class="x">hi</div>', 'markup')
  assert.match(markup, /<span class="dwb-tok type">div<\/span>/)
  assert.match(markup, /<span class="dwb-tok param">class<\/span>/)
  assert.match(markup, /<span class="dwb-tok string">&quot;x&quot;<\/span>/)
  const md = highlightCode('# 标题', 'markdown')
  assert.match(md, /<span class="dwb-tok keyword"># 标题<\/span>/)
  const yaml = highlightCode('name: value # 注释', 'yaml')
  assert.match(yaml, /<span class="dwb-tok prop">name<\/span>/)
  assert.match(yaml, /<span class="dwb-tok comment"># 注释<\/span>/)
})

test('renderMarkdown 渲染标题、代码围栏并高亮代码', () => {
  const html = renderMarkdown('# 标题\n\n```js\nconst a = 1\n```', '/w/app')
  assert.match(html, /<h1>标题<\/h1>/)
  assert.match(html, /<pre class="dwb-md-pre"><code>/)
  assert.match(html, /<span class="dwb-tok keyword">const<\/span>/)
})

test('renderMarkdown 段落、列表、引用、hr', () => {
  const html = renderMarkdown('第一段\n\n- a\n- b\n\n> 引用\n\n---\n\n1. one', '/w/app')
  assert.match(html, /<p>第一段<\/p>/)
  assert.match(html, /<ul>\s*<li>a<\/li>\s*<li>b<\/li>\s*<\/ul>/)
  // marked(第三方) 的标准输出:引用内段落带 <p>。
  assert.match(html, /<blockquote>\s*<p>引用<\/p>\s*<\/blockquote>/)
  assert.match(html, /<hr>/)
  assert.match(html, /<ol>\s*<li>one<\/li>\s*<\/ol>/)
})

test('renderMarkdown 渲染 GFM 表格:表头/行/转义竖线/对齐', () => {
  const html = renderMarkdown(
    '| 插件 | 版本 | 功能 |\n| :--- | ---: | :---: |\n| dsh-archive | 0.1.0 | 归档会话 |\n| `dsh-work` | 1.0.0 | REST /workbench \\| /asset |',
    '/w/app',
  )
  assert.match(html, /<table>/)
  assert.match(html, /<thead>\s*<tr>\s*<th align="left">插件<\/th>\s*<th align="right">版本<\/th>\s*<th align="center">功能<\/th>/)
  assert.match(html, /<tbody><tr>\s*<td align="left">dsh-archive<\/td>/)
  // 单元格内的 \| 转义竖线渲染为字面 |，不拆出新列。
  assert.match(html, /REST \/workbench \| \/asset/)
  // 单元格内的行内代码仍带样式。
  assert.match(html, /<code class="dwb-md-code">dsh-work<\/code>/)
})

test('renderMarkdown 表格单元格内的原始 HTML 被转义,不进入 DOM', () => {
  const html = renderMarkdown('| a | b |\n| --- | --- |\n| <script>alert(1)</script> | x |', '/w/app')
  assert.ok(!html.includes('<script>alert'), 'raw script must not survive')
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/)
})

test('renderMarkdown 链接只放行 http(s)/mailto，其余原样转义', () => {
  const safe = renderMarkdown('[x](https://example.com) [m](mailto:a@b.c)', '/w/app')
  assert.match(safe, /<a href="https:\/\/example\.com" target="_blank" rel="noopener noreferrer">x<\/a>/)
  assert.match(safe, /<a href="mailto:a@b\.c"/)
  const unsafe = renderMarkdown('[x](javascript:alert(1))', '/w/app')
  assert.ok(!unsafe.includes('<a href="javascript:'), 'javascript: must not become a link')
  assert.ok(unsafe.includes('javascript:alert(1)'), 'unsafe link stays as escaped literal text')
})

test('renderMarkdown 属性注入被转义：href/src 里的引号逃逸不得产生新元素（XSS 回归）', () => {
  // 白名单放行 https: 后，URL 里仍可带 `">` 逃逸属性——这是存储型 XSS
  // 的注入点（在应用同源 DOM 生成 <img onerror>）。属性值必须再经转义，
  // 使整段 URL 停留在 href 属性内，浏览器读属性时再把 &quot; 解码回引号。
  // marked 的 lexer 会在引号处截断链接目的地,后半段成为 html token——
  // 与属性值一样被整体转义,同样不会产生新元素。
  const link = renderMarkdown('[x](https://a.com/"><img src=x onerror=alert(1)>)', '/w/app')
  assert.ok(!link.includes('href="https://a.com/"><img'), '注入的 <img> 不得逃逸出 href 属性')
  assert.ok(link.includes('&quot;&gt;'), '属性值内的引号/尖括号必须以实体形式存在')
  assert.ok(link.includes('&lt;img'), '链接外泄的 <img> 文本必须以实体形式存在')
  const image = renderMarkdown('![a](https://a.com/"><img src=x onerror=alert(1)>)', '/w/app')
  assert.ok(!image.includes('src="https://a.com/"><img'), 'img src 同样不得被逃逸')
  assert.ok(image.includes('&lt;img'), 'img 外泄的 <img> 文本必须以实体形式存在')
  // 正常链接不受影响（& 转义后浏览器解码回原值）。
  const normal = renderMarkdown('[x](https://a.com/?a=1&b=2)', '/w/app')
  assert.match(normal, /href="https:\/\/a\.com\/\?a=1&amp;b=2"/)
})

test('renderMarkdown 链接文本内的原始 HTML 被转义,不进入 DOM（XSS 回归）', () => {
  // token.text 是链接文本的源文本原文——[<img onerror>](url) 里的标签必须
  // 整体转义,否则恶意 md 文件可在面板同源 DOM 注入任意元素（面板宿主
  // 路由可读写本地文件,属提权路径）。
  const link = renderMarkdown('[<img src=x onerror=alert(1)>](https://example.com)', '/w/app')
  assert.ok(!link.includes('<img src=x onerror=alert(1)>'), '链接文本内的 <img> 不得原样进入 DOM')
  assert.match(link, /&lt;img src=x onerror=alert\(1\)&gt;/)
  const script = renderMarkdown('[<script>alert(1)</script>](https://example.com)', '/w/app')
  assert.ok(!script.includes('<script>alert(1)</script>'), '链接文本内的 <script> 不得原样进入 DOM')
  // 链接文本内的行内 markdown 允许保留（纯文本转义后仍显示原文）。
  const plain = renderMarkdown('[**bold**](https://example.com)', '/w/app')
  assert.match(plain, /<a href="https:\/\/example\.com" target="_blank" rel="noopener noreferrer">\*\*bold\*\*<\/a>/)
})

test('renderMarkdown 图片：http(s) 直连、同树相对路径走 asset 路由、父目录拒绝', () => {
  const direct = renderMarkdown('![a](https://example.com/i.png)', '/w/app')
  assert.match(direct, /<img src="https:\/\/example\.com\/i\.png" alt="a">/)
  const relative = renderMarkdown('![a](img/x.png)', '/w/app')
  assert.match(relative, /<img src="\/workbench\/asset\?path=%2Fw%2Fapp%2Fimg%2Fx\.png"/)
  const escape = renderMarkdown('![a](../secret.png)', '/w/app')
  assert.ok(!escape.includes('<img'), 'parent traversal image must not render')
})

test('mdLinkHref / mdImageHref 白名单', () => {
  assert.equal(mdLinkHref('https://x'), 'https://x')
  assert.equal(mdLinkHref('mailto:a@b.c'), 'mailto:a@b.c')
  assert.equal(mdLinkHref('javascript:alert(1)'), null)
  assert.equal(mdLinkHref('data:text/html,x'), null)
  assert.equal(mdImageHref('https://x/i.png', '/w/app'), 'https://x/i.png')
  assert.equal(mdImageHref('img/a.png', '/w/app'), '/workbench/asset?path=%2Fw%2Fapp%2Fimg%2Fa.png')
  assert.equal(mdImageHref('../a.png', '/w/app'), null)
  assert.equal(mdImageHref('#frag', '/w/app'), null)
})

test('htmlPreviewSrc 重写相对 src/href 到 asset 路由，保留其余', () => {
  const dir = '/w/app'
  const html = '<link rel="stylesheet" href="style.css">\n<img src="img/a.png">\n<script src="/root.js"></script>\n<img src="https://x/i.png">\n<a href="#sec">s</a>'
  const out = htmlPreviewSrc(html, dir)
  assert.ok(out.includes('href="/workbench/asset?path=%2Fw%2Fapp%2Fstyle.css"'))
  assert.ok(out.includes('src="/workbench/asset?path=%2Fw%2Fapp%2Fimg%2Fa.png"'))
  assert.ok(out.includes('src="/root.js"'), 'root-absolute stays')
  assert.ok(out.includes('src="https://x/i.png"'), 'http stays')
  assert.ok(out.includes('href="#sec"'), 'anchor stays')
})

test('htmlPreviewSrc 拒绝父目录相对路径', () => {
  const out = htmlPreviewSrc('<img src="../up.png">', '/w/app')
  assert.ok(out.includes('src="../up.png"'))
})

test('语言与预览类型映射', () => {
  assert.equal(HL_LANG_BY_EXT.md, 'markdown')
  assert.equal(HL_LANG_BY_EXT.html, 'markup')
  assert.equal(HL_LANG_BY_EXT.py, 'python')
  assert.equal(HL_LANG_BY_EXT.unknown, undefined)
  assert.equal(PREVIEW_KIND.md, 'markdown')
  assert.equal(PREVIEW_KIND.html, 'html')
  assert.equal(PREVIEW_KIND.txt, undefined)
})

test('editorLanguageFor 映射编辑语言,未知扩展名回退纯文本', () => {
  assert.equal(editorLanguageFor('js'), 'javascript')
  assert.equal(editorLanguageFor('tsx'), 'typescript')
  assert.equal(editorLanguageFor('css'), 'css')
  assert.equal(editorLanguageFor('html'), 'html')
  assert.equal(editorLanguageFor('md'), 'markdown')
  assert.equal(editorLanguageFor('txt'), undefined)
  assert.equal(editorLanguageFor('py'), undefined)
  assert.equal(editorLanguageFor(''), undefined)
})

test('fitTipGeometry 头部图标顶部无空间时翻转到锚点下方', () => {
  // 面板头部「刷新/收起」按钮贴窗口顶(anchor.top=14),气泡高 25 → 上方只剩 -17px,
  // 必须翻到下方(anchor.bottom + 6),不再被视口顶边裁掉。
  assert.deepEqual(fitTipGeometry(
    { left: 1348, top: 14, bottom: 42, width: 28 },
    { width: 38, height: 25 },
    { width: 1440, height: 900 },
  ), { x: 1362, y: 48, below: true })
})

test('fitTipGeometry 右缘图标水平夹回视口内', () => {
  // 右缘「展开工作面板」按钮(anchor.right=1440):居中 x=1424.5 时气泡右缘越出
  // 视口 39px,应左移到 1385,保持 12px 边距;上方空间足够,仍停在锚点上方。
  assert.deepEqual(fitTipGeometry(
    { left: 1409, top: 417, bottom: 483, width: 31 },
    { width: 86, height: 25 },
    { width: 1440, height: 900 },
  ), { x: 1385, y: 411, below: false })
})

test('fitTipGeometry 中部图标保持居中于锚点上方', () => {
  assert.deepEqual(fitTipGeometry(
    { left: 600, top: 400, bottom: 422, width: 28 },
    { width: 40, height: 25 },
    { width: 1440, height: 900 },
  ), { x: 614, y: 394, below: false })
})

test('fitTipGeometry 上下都放不下时保持上方放置不来回翻转', () => {
  // 视口高 100:上方放不下(-56),下方也放不下(106 > 88) → 保持请求的上方放置,
  // 与壳 Tooltip 的策略一致,避免两个方向都不行时振荡。
  assert.deepEqual(fitTipGeometry(
    { left: 100, top: 10, bottom: 40, width: 20 },
    { width: 200, height: 60 },
    { width: 1440, height: 100 },
  ), { x: 112, y: 4, below: false })
})

test('fitTipGeometry 左缘图标水平夹回视口内', () => {
  // 锚点贴窗口左缘:居中 x=10 时气泡左缘越出 10px,应右移到 32,保持 12px 边距。
  assert.deepEqual(fitTipGeometry(
    { left: 0, top: 100, bottom: 122, width: 20 },
    { width: 40, height: 25 },
    { width: 1440, height: 900 },
  ), { x: 32, y: 94, below: false })
})
