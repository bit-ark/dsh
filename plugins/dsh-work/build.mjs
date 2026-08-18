/**
 * dsh-work 构建脚本。
 *
 * 两个产物：
 *  - lib/index.js   — 宿主半（纯 ESM / Node；@deepseek-ai/* 保持 external，
 *                     加载时通过 profile 的模块链解析）。
 *  - lib/client.js  — 客户端半，浏览器工厂 bundle，经 /plugins/dsh-work/
 *                     client.js 提供。格式与 harness 自带客户端 bundle 一致
 *                     （packages/client/tsdown.client.ts）：CJS 主体包在
 *                     window.__ModuleLoader__.load({id, factory}) 里，
 *                     external 通过注入的 require（模块表）解析。
 *
 * 源码拆分（src/，见 README「结构」）：
 *   src/index.js + src/git.js + src/files.js + src/validate.js + src/routes.js
 *     — 宿主半按域拆分（ESM，Node 原生解析）。
 *   src/client/*.js — 客户端半按功能拆分（渲染组件 / 高亮 / markdown / 编辑器）。
 *   src/client/vendor/ — 第三方构建产物（marked v18 UMD、CodeMirror 6 esbuild
 *     bundle），字节原样内联；src/client/styles.css 经 text loader 引入。
 */
import { build } from 'esbuild'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir, rm } from 'node:fs/promises'

const root = dirname(fileURLToPath(import.meta.url))
// 客户端模块 id：必须等于插件行 id（client-modules 契约）。
const PACKAGE_ID = 'dsh-work'

// 构建前清空 lib/ 再重建：入口改名/删除后旧 .js/.map 若残留会被误发布
// （link: 安装直接消费 lib/，陈旧产物会导致行为与源码不一致）。
await rm(join(root, 'lib'), { recursive: true, force: true })
await mkdir(join(root, 'lib'), { recursive: true })

/** web shell 共享进冻结浏览器模块表的模块说明符（external 白名单）。 */
const PLATFORM_MODULES = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-web-react',
  '@deepseek-ai/dsh-client-ui-primitives',
  '@deepseek-ai/dsh-client-ui-attachment',
  '@deepseek-ai/dsh-client-schema-form',
]

// ── 宿主半 ───────────────────────────────────────────────────────────────────
await build({
  entryPoints: [join(root, 'src/index.js')],
  outfile: join(root, 'lib/index.js'),
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'es2022',
  sourcemap: true,
  // 产物内相对路径（模块头注释/sourcemap 引用）一律相对包根解析，与调用
  // cwd 无关——从仓库根目录或插件目录构建都得到逐字节一致的 lib/。
  absWorkingDir: root,
  // 所有 @deepseek-ai/* 在运行时从 profile 模块链解析。
  external: ['@deepseek-ai/*'],
  logLevel: 'info',
})

// ── 客户端半 ─────────────────────────────────────────────────────────────────
await build({
  entryPoints: [join(root, 'src/client/index.js')],
  outfile: join(root, 'lib/client.js'),
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2020',
  sourcemap: true,
  absWorkingDir: root,
  external: [...PLATFORM_MODULES],
  // styles.css 按文本内联（注入 <style> 用），不产出独立 CSS 文件。
  loader: { '.css': 'text' },
  banner: {
    js:
      `window.__ModuleLoader__.load({ id: ${JSON.stringify(PACKAGE_ID)}, factory: (require) => {\n`
      + 'var module = { exports: {} }; var exports = module.exports;',
  },
  footer: {
    js: '\nreturn module.exports; } });',
  },
  logLevel: 'info',
})

console.log('dsh-work: build complete (lib/index.js, lib/client.js)')
