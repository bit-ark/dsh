/**
 * dsh-archive 构建脚本。
 *
 * 两个产物：
 *  - lib/index.js   — 宿主半（纯 ESM / Node；@deepseek-ai/* 保持 external，
 *                     加载时通过 profile 的模块链解析）。
 *  - lib/client.js  — 客户端半，浏览器工厂 bundle，经 /plugins/dsh-archive/
 *                     client.js 提供。格式与 harness 自带客户端 bundle 一致
 *                     （packages/client/tsdown.client.ts）：CJS 主体包在
 *                     window.__ModuleLoader__.load({id, factory}) 里，external
 *                     通过注入的 require（模块表）解析。
 */
import { build } from 'esbuild'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(fileURLToPath(import.meta.url))
// 客户端模块 id：必须等于包名（client-modules 契约），与行 id 保持一致。
const PACKAGE_ID = 'dsh-archive'

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

/** harness 预设文档化的运行时豁免（snapshot-store 引擎）。 */
const RUNTIME_STORE_EXEMPTION = '@deepseek-ai/dsh-client-runtime/client'

// ── 宿主半 ───────────────────────────────────────────────────────────────────
await build({
  entryPoints: [join(root, 'src/index.ts')],
  outfile: join(root, 'lib/index.js'),
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'es2022',
  sourcemap: true,
  // 所有 @deepseek-ai/* 在运行时从 profile 模块链解析。
  external: ['@deepseek-ai/*'],
  logLevel: 'info',
})

// ── 客户端半 ─────────────────────────────────────────────────────────────────
await build({
  entryPoints: [join(root, 'src/client/index.tsx')],
  outfile: join(root, 'lib/client.js'),
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  sourcemap: true,
  external: [...PLATFORM_MODULES, RUNTIME_STORE_EXEMPTION],
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

console.log('dsh-archive: build complete (lib/index.js, lib/client.js)')
