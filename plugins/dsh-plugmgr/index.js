/**
 * dsh-plugmgr — 宿主半（Node）。
 *
 * 管理 profile 的「已安装插件」：profile 依赖里声明了 `dsh.bundle.patch` 的
 * 包即为插件加载层（bundle），安装来源不限 —— 本地目录（`link:`/`file:`/绝对
 * 路径）、npm 注册表（版本号）、Git（`github:` 等）都可以，安装模型与
 * `dsh plugin --profile <name> add|remove|update` CLI 完全一致。本半把该模型
 * 的机制实现为 JSON 路由，供设置页 UI 从浏览器驱动：
 *
 *   GET  /local-plugins/list          → { ok, profile, plugins: [...] }
 *   POST /local-plugins/add           { dir }        → 新列表（本地目录）
 *   POST /local-plugins/add-named     { spec }       → 新列表（按名称/spec 安装）
 *   POST /local-plugins/remove        { name }       → 新列表
 *   POST /local-plugins/update        { name }       → 新列表
 *   POST /local-plugins/set-enabled   { name, enabled } → 新列表
 *
 * 语义：
 *  - add/add-named/remove/update 在 profile 目录跑 `pnpm`，成功后把
 *    `dsh.profile.bundles` 层列表对齐到已安装状态（复刻 CLI 的 reconcile
 *    逻辑）。
 *  - set-enabled 只编辑 bundles 层列表：依赖保留安装，插件只是不再/恢复加载。
 *  - remove 只卸载，绝不删除插件目录（用户确认的决策）。
 *
 * 并发与性能：
 *  - pnpm 用异步 execFile 执行（不阻塞 web 服务事件循环；spawnSync 最长可
 *    卡死 120s）。
 *  - add/add-named/remove/update/set-enabled 都会改写 profile package.json，
 *    用一个简单的互斥链串行化，防止并发请求交错写坏 manifest。
 *
 * 生效时机：bundle 层在启动时组合，增删/启停要重启 `dsh web` 才生效，客户端
 * 半会在界面提示用户。
 */
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'

// promisify(execFile)：reject 的错误对象带 { code, stdout, stderr, killed }。
const execFileP = promisify(execFile)

export const name = 'dsh-plugmgr'

/** 路由注册在 web 表面的路由表上（cordis reflect guard 要求声明）。 */
export const inject = ['webServer']

const PACKAGE_JSON = 'package.json'
const PNPM_TIMEOUT_MS = 120_000
/** pnpm 输出上限（正常输出远小于此，防失控刷屏占内存）。 */
const PNPM_MAX_BUFFER = 4 * 1024 * 1024

/* ── profile 解析 ───────────────────────────────────────────────────── */

/** DSH 数据根目录：$DSH_HOME > ~/.dsh。 */
function dshHome() {
  const configured = process.env.DSH_HOME
  return typeof configured === 'string' && configured.trim().length > 0
    ? resolve(configured.trim())
    : join(homedir(), '.dsh')
}

/** 被管理的 profile 目录（config.profile，默认 'web'）。 */
function profileDir(config) {
  const name = typeof config?.profile === 'string' && config.profile.length > 0 ? config.profile : 'web'
  return { name, dir: join(dshHome(), 'profiles', name) }
}

/** 读取并解析 profile manifest（必须是 JSON 对象）。 */
function readManifest(dir) {
  const path = join(dir, PACKAGE_JSON)
  if (!existsSync(path)) {
    throw new Error(`profile manifest 不存在：${path}（请先正常启动一次 dsh web / 用 dsh plugin 初始化 profile）`)
  }
  let parsed
  try {
    parsed = JSON.parse(readFileSync(path, 'utf8'))
  } catch (error) {
    throw new Error(`profile manifest ${path} 不是有效 JSON：${String(error)}`)
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`profile manifest ${path} 必须是 JSON 对象`)
  }
  return parsed
}

/** 写回 profile manifest（与官方 writeProfileManifest 相同格式：2 空格缩进 + 末尾换行）。 */
function writeManifest(dir, manifest) {
  writeFileSync(join(dir, PACKAGE_JSON), JSON.stringify(manifest, undefined, 2) + '\n')
}

/* ── bundle 判定 ────────────────────────────────────────────────────── */

/** 是否为本地目录 spec（link:/file:/绝对路径）。 */
function isLocalSpec(spec) {
  if (typeof spec !== 'string' || spec.length === 0) return false
  if (spec.startsWith('link:') || spec.startsWith('file:')) return true
  return spec.startsWith('/') || /^[A-Za-z]:[\\/]/.test(spec)
}

/**
 * 依赖 spec 的安装来源分类：本地目录 / npm 注册表 / Git / npm 别名 /
 * workspace / 远程 URL / tarball。供列表徽标与「按名称安装」的输入校验使用。
 * @param spec - profile package.json 里某依赖的值（如 `link:../x`、
 *   `3.18.2`、`github:user/repo#main`）。
 */
export function specKind(spec) {
  if (typeof spec !== 'string' || spec.length === 0) return 'registry'
  if (isLocalSpec(spec)) return 'local'
  if (/^(github|gitlab|bitbucket):/.test(spec) || /^git\+/.test(spec) || /\.git(?:#|$)/.test(spec)) {
    return 'git'
  }
  if (spec.startsWith('npm:')) return 'alias'
  if (spec.startsWith('workspace:')) return 'workspace'
  if (/^https?:\/\//.test(spec)) return 'remote'
  if (/\.(tgz|tar\.gz|tar)$/i.test(spec)) return 'tarball'
  return 'registry'
}

/** spec 指向的目录（去掉 link:/file: 前缀）。 */
function specDirOf(spec) {
  if (spec.startsWith('link:') || spec.startsWith('file:')) return spec.slice(5)
  return spec
}

/**
 * 读取某依赖包的 package.json：优先 profile 安装态（node_modules），
 * 其次 spec 目录（相对 spec 以 profile 目录为基准解析）。
 */
function resolveBundlePackageJson(profileDirPath, packageName, spec) {
  const installed = join(profileDirPath, 'node_modules', packageName, PACKAGE_JSON)
  if (existsSync(installed)) {
    try {
      return JSON.parse(readFileSync(installed, 'utf8'))
    } catch { /* 安装态损坏则回退到 spec 目录 */ }
  }
  if (isLocalSpec(spec)) {
    const path = join(resolve(profileDirPath, specDirOf(spec)), PACKAGE_JSON)
    if (existsSync(path)) {
      try {
        return JSON.parse(readFileSync(path, 'utf8'))
      } catch { /* 忽略 */ }
    }
  }
  return null
}

/** 是否声明 dsh.bundle.patch（即可作为 profile 加载层的 bundle）。 */
function isBundlePackage(pkg) {
  return pkg !== null && typeof pkg === 'object'
    && pkg.dsh !== null && typeof pkg.dsh === 'object'
    && typeof pkg.dsh?.bundle?.patch === 'string'
}

/**
 * 把 dsh.profile.bundles 对齐到已安装状态（复刻 apps/cli/src/plugin.ts 的
 * reconcilePlugins 语义）：声明 dsh.bundle 的依赖加入层列表；曾是依赖管理的
 * 层项在依赖消失（或不再声明 bundle）后移出。模板层（@deepseek-ai/dsh-base
 * 等，不是依赖）永不动。
 * @param before - pnpm 命令前的 manifest。
 * @param after  - pnpm 命令后的 manifest。
 */
function reconcile(before, after, profileDirPath) {
  const beforeDeps = new Set(Object.keys(before.dependencies ?? {}))
  const dependencies = after.dependencies ?? {}
  const plugins = Array.isArray(after.dsh?.profile?.bundles) ? [...after.dsh.profile.bundles] : []
  let changed = false

  for (const [packageName, spec] of Object.entries(dependencies)) {
    if (isBundlePackage(resolveBundlePackageJson(profileDirPath, packageName, spec))
      && !plugins.includes(packageName)) {
      plugins.push(packageName)
      changed = true
    }
  }

  const dependencySet = new Set(Object.keys(dependencies))
  for (const packageName of [...plugins]) {
    const wasDependency = beforeDeps.has(packageName) || dependencySet.has(packageName)
    const stillBundle = dependencySet.has(packageName)
      && isBundlePackage(resolveBundlePackageJson(profileDirPath, packageName, dependencies[packageName]))
    if (wasDependency && !stillBundle) {
      plugins.splice(plugins.indexOf(packageName), 1)
      changed = true
    }
  }

  if (!changed) return
  after.dsh = { ...after.dsh, profile: { ...(after.dsh?.profile ?? {}), bundles: plugins } }
  writeManifest(profileDirPath, after)
}

/**
 * 在 profile 目录异步跑一条 pnpm 命令；失败抛带输出尾部的错误。
 * 异步执行不阻塞事件循环（旧实现 spawnSync 最长可冻结整个 web 服务 120s）。
 *
 * shell 处理：仅 Windows 需要 shell 来跑 pnpm 的 .cmd shim（execFile 无法
 * 直接执行 .bat/.cmd）；其余平台 shell:false，args 按 argv 逐字传递、天然
 * 免疫命令注入。Windows 的 shell:true 会把 args 拼进命令行（Node DEP0190），
 * 因此 Windows 上的注入面依赖入参校验——spec/name/dir 都经 safeSpec 白名单
 * 过滤（见下），含 shell 元字符的输入在到达 pnpm 之前即被拒绝。
 */
async function runPnpm(profileDirPath, args, what) {
  let result
  try {
    result = await execFileP('pnpm', args, {
      cwd: profileDirPath,
      timeout: PNPM_TIMEOUT_MS,
      encoding: 'utf8',
      maxBuffer: PNPM_MAX_BUFFER,
      shell: process.platform === 'win32', // Windows 走 .cmd shim
    })
  } catch (error) {
    if (error !== null && typeof error === 'object' && error.code === 'ENOENT') {
      throw new Error(`${what}失败：未找到 pnpm，请先安装 pnpm 并确保它在 PATH 中`)
    }
    if (error !== null && typeof error === 'object' && error.killed === true) {
      throw new Error(`${what}失败：pnpm 超过 ${PNPM_TIMEOUT_MS / 1000}s 未完成`)
    }
    // maxBuffer 溢出是独立的错误码（不是超时：killed 为 undefined），单独
    // 提示，避免用户误以为是 pnpm 卡住。
    if (error !== null && typeof error === 'object' && error.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER') {
      throw new Error(`${what}失败：pnpm 输出超出 ${PNPM_MAX_BUFFER / 1024 / 1024}MB 上限（通常是有大量日志输出）`)
    }
    const tail = [error?.stdout, error?.stderr].filter(Boolean).join('\n').trim().split('\n').slice(-8).join('\n')
    const code = error !== null && typeof error === 'object' && typeof error.code === 'number' ? error.code : '?'
    throw new Error(`${what}失败（exit ${String(code)}）：\n${tail}`)
  }
  void result // 成功路径：stdout 仅用于诊断，当前调用方不需要
}

/**
 * 包名 / spec 白名单校验：只允许 npm 包名（含 scope、版本范围）与 git spec
 * 的合法字符，拒绝一切 shell 元字符与空白。npm 包名本身就不含这些字符，
 * 拒绝不会误伤合法输入；目的是在 Windows shell 透传路径上封死注入面。
 * 导出供测试。
 */
export function safeSpec(input) {
  const value = String(input ?? '')
  if (/[;&|<>`$"'()\s\\]/.test(value)) {
    throw new Error('包名 / spec 含有非法字符（不允许空格、引号与 shell 元字符）')
  }
  return value
}

/**
 * 本地目录路径校验：允许空格（POSIX argv 逐字传递；目录存在性另有校验），
 * 只拒绝 shell 元字符，兼顾 Windows shell 透传路径的注入面。
 */
function safeDir(input) {
  const value = String(input ?? '').trim()
  if (value.length === 0) {
    throw new Error('请提供插件目录的绝对路径')
  }
  if (/[;&|<>`$"'\\]/.test(value)) {
    throw new Error('目录路径含有非法字符（不允许引号与 shell 元字符）')
  }
  return value
}

/* ── 业务操作 ───────────────────────────────────────────────────────── */

/** 列出 profile 中全部依赖插件（含安装来源、安装态信息与启用状态）。 */
function listPlugins(config) {
  const { dir } = profileDir(config)
  const path = join(dir, PACKAGE_JSON)
  if (!existsSync(path)) {
    return { ok: true, profile: dir, plugins: [] }
  }
  const manifest = readManifest(dir)
  const bundles = Array.isArray(manifest.dsh?.profile?.bundles) ? manifest.dsh.profile.bundles : []
  const dependencies = manifest.dependencies ?? {}
  const plugins = []
  for (const [packageName, spec] of Object.entries(dependencies)) {
    const kind = specKind(spec)
    const pkg = resolveBundlePackageJson(dir, packageName, spec)
    plugins.push({
      name: packageName,
      spec,
      kind,
      // 仅本地目录来源有路径；相对 spec（如 link:../x）以 profile 目录为
      // 基准解析，避免被 process.cwd() 误导显示错路径。其余来源为 null。
      path: kind === 'local' ? resolve(dir, specDirOf(spec)) : null,
      version: typeof pkg?.version === 'string' ? pkg.version : null,
      description: typeof pkg?.description === 'string' ? pkg.description : null,
      isBundle: isBundlePackage(pkg),
      enabled: bundles.includes(packageName),
    })
  }
  plugins.sort((a, b) => a.name.localeCompare(b.name))
  return { ok: true, profile: dir, plugins }
}

/** 添加一个本地插件目录：校验 → pnpm add link: → reconcile。 */
async function addPlugin(config, dirInput) {
  const input = safeDir(dirInput)
  const dir = resolve(input)
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    throw new Error(`目录不存在或不是文件夹：${dir}`)
  }
  const pkgPath = join(dir, PACKAGE_JSON)
  if (!existsSync(pkgPath)) {
    throw new Error(`不是有效的 DSH 本地插件：${dir} 下没有 package.json`)
  }
  let pkg
  try {
    pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  } catch (error) {
    throw new Error(`不是有效的 DSH 本地插件：${dir}/package.json 无法解析（${String(error)}）`)
  }
  if (!isBundlePackage(pkg)) {
    throw new Error(`不是有效的 DSH 本地插件：${dir}/package.json 未声明 dsh.bundle.patch`)
  }
  const { dir: profileDirPath } = profileDir(config)
  const before = readManifest(profileDirPath)
  // 重复检查要同时覆盖 dependencies 与 devDependencies：pnpm add 也会落到
  // devDependencies（若仓库在 dev 模式），只查前者会让重复安装漏网。
  if (before.dependencies?.[pkg.name] !== undefined || before.devDependencies?.[pkg.name] !== undefined) {
    const existing = before.dependencies?.[pkg.name] ?? before.devDependencies?.[pkg.name]
    throw new Error(`插件 ${pkg.name} 已安装（${existing}）`)
  }
  await runPnpm(profileDirPath, ['add', `link:${dir}`], `添加插件 ${pkg.name}`)
  reconcile(before, readManifest(profileDirPath), profileDirPath)
  return listPlugins(config)
}

/** 移除一个已安装插件：仅卸载（pnpm remove + reconcile），保留目录文件。 */
async function removePlugin(config, packageName) {
  const name = safeSpec(packageName).trim()
  if (name.length === 0) {
    throw new Error('请提供要移除的插件包名')
  }
  const { dir: profileDirPath } = profileDir(config)
  const before = readManifest(profileDirPath)
  if (before.dependencies?.[name] === undefined) {
    throw new Error(`插件 ${name} 未安装`)
  }
  await runPnpm(profileDirPath, ['remove', name], `移除插件 ${name}`)
  reconcile(before, readManifest(profileDirPath), profileDirPath)
  return listPlugins(config)
}

/**
 * 按名称/spec 安装插件（npm 注册表包名、name@version、git spec 等）：
 * 校验 → pnpm add → reconcile。本地目录 spec 走 addPlugin 的目录流程。
 */
async function addNamedPlugin(config, specInput) {
  const spec = safeSpec(specInput).trim()
  if (spec.length === 0) {
    throw new Error('请输入要安装的包名或 spec（如 whale-girl / @scope/name@1.2.0 / github:user/repo#main）')
  }
  if (isLocalSpec(spec) || /^\.{1,2}(?:[/\\]|$)/.test(spec)) {
    throw new Error('这是本地路径 spec，请使用「添加本地插件」流程（浏览目录或输入绝对路径）')
  }
  const { dir: profileDirPath } = profileDir(config)
  const before = readManifest(profileDirPath)
  await runPnpm(profileDirPath, ['add', spec], `安装 ${spec}`)
  reconcile(before, readManifest(profileDirPath), profileDirPath)
  return listPlugins(config)
}

/** 更新一个已安装插件：pnpm update（按声明范围解析，git spec 重取 ref）。 */
async function updatePlugin(config, packageName) {
  const name = safeSpec(packageName).trim()
  if (name.length === 0) {
    throw new Error('请提供要更新的插件包名')
  }
  const { dir: profileDirPath } = profileDir(config)
  const before = readManifest(profileDirPath)
  if (before.dependencies?.[name] === undefined) {
    throw new Error(`插件 ${name} 未安装`)
  }
  await runPnpm(profileDirPath, ['update', name], `更新插件 ${name}`)
  reconcile(before, readManifest(profileDirPath), profileDirPath)
  return listPlugins(config)
}

/** 启用/禁用：只改 dsh.profile.bundles 层列表，依赖保留安装（重启生效）。 */
function setEnabled(config, packageName, enabled) {
  const name = safeSpec(packageName).trim()
  if (name.length === 0) {
    throw new Error('请提供要启用/禁用的插件包名')
  }
  const { dir: profileDirPath } = profileDir(config)
  const manifest = readManifest(profileDirPath)
  if (manifest.dependencies?.[name] === undefined) {
    throw new Error(`插件 ${name} 未安装`)
  }
  const current = Array.isArray(manifest.dsh?.profile?.bundles) ? [...manifest.dsh.profile.bundles] : []
  const has = current.includes(name)
  if (enabled && !has) current.push(name)
  if (!enabled && has) current.splice(current.indexOf(name), 1)
  if (has !== enabled) {
    manifest.dsh = { ...manifest.dsh, profile: { ...(manifest.dsh?.profile ?? {}), bundles: current } }
    writeManifest(profileDirPath, manifest)
  }
  return listPlugins(config)
}

/* ── HTTP 层 ────────────────────────────────────────────────────────── */

/** 写一个 JSON 响应（禁用缓存，避免浏览器对接口结果做快照）。 */
function sendJson(res, code, payload) {
  res.writeHead(code, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(JSON.stringify(payload))
}

/**
 * CSRF 围栏：POST 只接受 application/json（与 harness /api 面同款约定）。
 * 浏览器对 text/plain 等「简单请求」不做 CORS 预检，恶意页面可跨站盲发
 * POST——这里会触发 pnpm add（恶意包 postinstall 可 RCE），必须先按
 * 内容类型拒掉非 JSON 的跨站提交。
 */
function requireJsonMediaType(req) {
  const mediaType = (req.headers['content-type'] ?? '').split(';', 1)[0]?.trim().toLowerCase()
  if (mediaType !== 'application/json') {
    throw new Error('content type must be application/json')
  }
}

/** 读取并解析 JSON 请求体（上限 64KB）。 */
function readJsonBody(req) {
  return new Promise((resolveBody, reject) => {
    let data = ''
    let settled = false
    const fail = (error) => {
      if (!settled) {
        settled = true
        reject(error)
      }
    }
    req.setEncoding('utf8')
    req.on('data', (chunk) => {
      data += chunk
      if (data.length > 64 * 1024) {
        req.destroy()
        fail(new Error('请求体过大'))
      }
    })
    req.on('end', () => {
      if (settled) return
      settled = true
      try {
        resolveBody(data.length === 0 ? {} : JSON.parse(data))
      } catch {
        reject(new Error('请求体不是有效 JSON'))
      }
    })
    req.on('error', fail)
  })
}

export function apply(ctx, config) {
  // 统一响应：业务错误以 200 + { ok:false, error } 返回（客户端 callJson 契约）。
  const run = async (req, res, fn) => {
    try {
      sendJson(res, 200, await fn())
    } catch (error) {
      sendJson(res, 200, { ok: false, error: error instanceof Error ? error.message : String(error) })
    }
  }

  // 互斥链：所有会改写 profile manifest 的操作串行执行，防止并发交错。
  let opChain = Promise.resolve()
  const serialize = (operation) => {
    const runOp = opChain.then(operation, operation)
    opChain = runOp.then(() => undefined, () => undefined)
    return runOp
  }

  ctx.effect(() => {
    const disposers = [
      ctx.webServer.register({
        kind: 'exact',
        path: '/local-plugins/list',
        handler: (req, res) => {
          if (req.method !== 'GET') {
            sendJson(res, 405, { ok: false, error: 'method not allowed' })
            return
          }
          void run(req, res, () => listPlugins(config))
        },
      }),
      ctx.webServer.register({
        kind: 'exact',
        path: '/local-plugins/add',
        handler: async (req, res) => {
          if (req.method !== 'POST') {
            sendJson(res, 405, { ok: false, error: 'method not allowed' })
            return
          }
          let body
          try {
            requireJsonMediaType(req)
            body = await readJsonBody(req)
          } catch (error) {
            sendJson(res, 200, { ok: false, error: error instanceof Error ? error.message : String(error) })
            return
          }
          await run(req, res, () => serialize(() => addPlugin(config, body.dir)))
        },
      }),
      ctx.webServer.register({
        kind: 'exact',
        path: '/local-plugins/remove',
        handler: async (req, res) => {
          if (req.method !== 'POST') {
            sendJson(res, 405, { ok: false, error: 'method not allowed' })
            return
          }
          let body
          try {
            requireJsonMediaType(req)
            body = await readJsonBody(req)
          } catch (error) {
            sendJson(res, 200, { ok: false, error: error instanceof Error ? error.message : String(error) })
            return
          }
          await run(req, res, () => serialize(() => removePlugin(config, body.name)))
        },
      }),
      ctx.webServer.register({
        kind: 'exact',
        path: '/local-plugins/set-enabled',
        handler: async (req, res) => {
          if (req.method !== 'POST') {
            sendJson(res, 405, { ok: false, error: 'method not allowed' })
            return
          }
          let body
          try {
            requireJsonMediaType(req)
            body = await readJsonBody(req)
          } catch (error) {
            sendJson(res, 200, { ok: false, error: error instanceof Error ? error.message : String(error) })
            return
          }
          await run(req, res, () => serialize(() => setEnabled(config, body.name, body.enabled === true)))
        },
      }),
      ctx.webServer.register({
        kind: 'exact',
        path: '/local-plugins/add-named',
        handler: async (req, res) => {
          if (req.method !== 'POST') {
            sendJson(res, 405, { ok: false, error: 'method not allowed' })
            return
          }
          let body
          try {
            requireJsonMediaType(req)
            body = await readJsonBody(req)
          } catch (error) {
            sendJson(res, 200, { ok: false, error: error instanceof Error ? error.message : String(error) })
            return
          }
          await run(req, res, () => serialize(() => addNamedPlugin(config, body.spec)))
        },
      }),
      ctx.webServer.register({
        kind: 'exact',
        path: '/local-plugins/update',
        handler: async (req, res) => {
          if (req.method !== 'POST') {
            sendJson(res, 405, { ok: false, error: 'method not allowed' })
            return
          }
          let body
          try {
            requireJsonMediaType(req)
            body = await readJsonBody(req)
          } catch (error) {
            sendJson(res, 200, { ok: false, error: error instanceof Error ? error.message : String(error) })
            return
          }
          await run(req, res, () => serialize(() => updatePlugin(config, body.name)))
        },
      }),
    ]
    return () => {
      for (const dispose of disposers) dispose()
    }
  })
}
