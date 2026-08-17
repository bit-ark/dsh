/**
 * dsh-plugmgr — 宿主半（Node）。
 *
 * 管理「本地插件」：通过本地目录（`link:`/`file:`/绝对路径依赖）安装进 dsh
 * profile 的 bundle —— 即 package.json 声明了 `dsh.bundle.patch` 的包，安装
 * 模型与 `dsh plugin --profile <name> add|remove` CLI 完全一致。本半把该模型
 * 的机制实现为 JSON 路由，供设置页 UI 从浏览器驱动：
 *
 *   GET  /local-plugins/list          → { ok, profile, plugins: [...] }
 *   POST /local-plugins/add           { dir }        → 新列表
 *   POST /local-plugins/remove        { name }       → 新列表
 *   POST /local-plugins/set-enabled   { name, enabled } → 新列表
 *
 * 语义：
 *  - add/remove 在 profile 目录跑 `pnpm`，成功后把 `dsh.profile.bundles` 层
 *    列表对齐到已安装状态（复刻 CLI 的 reconcile 逻辑）。
 *  - set-enabled 只编辑 bundles 层列表：依赖保留安装，插件只是不再/恢复加载。
 *  - remove 只卸载，绝不删除插件目录（用户确认的决策）。
 *
 * 并发与性能：
 *  - pnpm 用异步 execFile 执行（不阻塞 web 服务事件循环；spawnSync 最长可
 *    卡死 120s）。
 *  - add/remove/set-enabled 都会改写 profile package.json，用一个简单的
 *    互斥链串行化，防止并发请求交错写坏 manifest。
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
    const tail = [error?.stdout, error?.stderr].filter(Boolean).join('\n').trim().split('\n').slice(-8).join('\n')
    const code = error !== null && typeof error === 'object' && typeof error.code === 'number' ? error.code : '?'
    throw new Error(`${what}失败（exit ${String(code)}）：\n${tail}`)
  }
  void result // 成功路径：stdout 仅用于诊断，当前调用方不需要
}

/* ── 业务操作 ───────────────────────────────────────────────────────── */

/** 列出 profile 中全部本地目录依赖（含安装态信息与启用状态）。 */
function listLocalPlugins(config) {
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
    if (!isLocalSpec(spec)) continue
    const pkg = resolveBundlePackageJson(dir, packageName, spec)
    plugins.push({
      name: packageName,
      spec,
      // 相对 spec（如 link:../x）以 profile 目录为基准解析，避免被
      // process.cwd() 误导显示错路径。
      path: resolve(dir, specDirOf(spec)),
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
  const input = String(dirInput ?? '').trim()
  if (input.length === 0) {
    throw new Error('请提供插件目录的绝对路径')
  }
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
  if (before.dependencies?.[pkg.name] !== undefined) {
    throw new Error(`插件 ${pkg.name} 已安装（${before.dependencies[pkg.name]}）`)
  }
  await runPnpm(profileDirPath, ['add', `link:${dir}`], `添加插件 ${pkg.name}`)
  reconcile(before, readManifest(profileDirPath), profileDirPath)
  return listLocalPlugins(config)
}

/** 移除一个本地插件：仅卸载（pnpm remove + reconcile），保留目录文件。 */
async function removePlugin(config, packageName) {
  const { dir: profileDirPath } = profileDir(config)
  const before = readManifest(profileDirPath)
  if (before.dependencies?.[packageName] === undefined) {
    throw new Error(`插件 ${packageName} 未安装`)
  }
  await runPnpm(profileDirPath, ['remove', packageName], `移除插件 ${packageName}`)
  reconcile(before, readManifest(profileDirPath), profileDirPath)
  return listLocalPlugins(config)
}

/** 启用/禁用：只改 dsh.profile.bundles 层列表，依赖保留安装（重启生效）。 */
function setEnabled(config, packageName, enabled) {
  const { dir: profileDirPath } = profileDir(config)
  const manifest = readManifest(profileDirPath)
  if (manifest.dependencies?.[packageName] === undefined) {
    throw new Error(`插件 ${packageName} 未安装`)
  }
  const current = Array.isArray(manifest.dsh?.profile?.bundles) ? [...manifest.dsh.profile.bundles] : []
  const has = current.includes(packageName)
  if (enabled && !has) current.push(packageName)
  if (!enabled && has) current.splice(current.indexOf(packageName), 1)
  if (has !== enabled) {
    manifest.dsh = { ...manifest.dsh, profile: { ...(manifest.dsh?.profile ?? {}), bundles: current } }
    writeManifest(profileDirPath, manifest)
  }
  return listLocalPlugins(config)
}

/* ── HTTP 层 ────────────────────────────────────────────────────────── */

function sendJson(res, code, payload) {
  res.writeHead(code, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(JSON.stringify(payload))
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
          void run(req, res, () => listLocalPlugins(config))
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
            body = await readJsonBody(req)
          } catch (error) {
            sendJson(res, 200, { ok: false, error: error instanceof Error ? error.message : String(error) })
            return
          }
          await run(req, res, () => serialize(() => setEnabled(config, body.name, body.enabled === true)))
        },
      }),
    ]
    return () => {
      for (const dispose of disposers) dispose()
    }
  })
}
