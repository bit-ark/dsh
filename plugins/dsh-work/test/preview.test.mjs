/**
 * dsh-work 预览渲染纯逻辑断言：语法高亮 / markdown 渲染 / html 预览重写。
 * client.js 是浏览器模块（window.__ModuleLoader__ 包裹），这里 stub 掉加载器，
 * 让 factory 运行一次并抓取导出的纯函数——组件体不执行，React 钩子只在渲染时调用。
 * 与 classify.test.mjs 同模式：node:test + assert，无依赖。
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
            return { useState: undefined, useEffect: undefined, useCallback: undefined, useRef: undefined, createElement: undefined }
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
await import('../client.js')
const {
  escapeHtml,
  highlightCode,
  renderMarkdown,
  htmlPreviewSrc,
  mdLinkHref,
  mdImageHref,
  HL_LANG_BY_EXT,
  PREVIEW_KIND,
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
  assert.match(html, /<blockquote>引用<\/blockquote>/)
  assert.match(html, /<hr>/)
  assert.match(html, /<ol>\s*<li>one<\/li>\s*<\/ol>/)
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
  const link = renderMarkdown('[x](https://a.com/"><img src=x onerror=alert(1)>)', '/w/app')
  assert.ok(!link.includes('href="https://a.com/"><img'), '注入的 <img> 不得逃逸出 href 属性')
  assert.ok(link.includes('&quot;&gt;&lt;img'), '引号/尖括号必须以实体形式留在属性值里')
  const image = renderMarkdown('![a](https://a.com/"><img src=x onerror=alert(1)>)', '/w/app')
  assert.ok(!image.includes('src="https://a.com/"><img'), 'img src 同样不得被逃逸')
  // 正常链接不受影响（& 转义后浏览器解码回原值）。
  const normal = renderMarkdown('[x](https://a.com/?a=1&b=2)', '/w/app')
  assert.match(normal, /href="https:\/\/a\.com\/\?a=1&amp;b=2"/)
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
