/**
 * dsh-updater — 宿主半（Node）。只读的版本 + 更新检查端点：
 *
 *   GET  /updater/status   → { version, sha, branch, state, remoteSha,
 *                              remoteVersion, checkedAt }   （60s 缓存）
 *   POST /updater/recheck  → 同形状，绕过缓存强制重查
 *
 * state：'current'（本地 HEAD == 远端分支头）、'update'（不一致）、
 * 'unreachable'（git ls-remote 失败 / 超时 / 分支不存在）。
 * remoteVersion 尽力从 raw.githubusercontent.com 读取远端 package.json，
 * 失败时为 null。
 *
 * 本半只读：不 spawn 任何会改状态的命令，不写文件。更新动作（git pull 等）
 * 由用户在检查信息里手动执行——本插件只提醒不自动更新。
 */
import { spawn } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

export const name = 'dsh-updater'

/** 硬依赖：路由注册在 web 表面的路由表上（cordis reflect guard 要求声明）。 */
export const inject = ['webServer']

/** 单条 git 命令超时（ls-remote 与 raw 拉取共用该预算）。 */
const TIMEOUT_MS = 8_000
/** 把该窗口内的并发页面加载合并成一次远端检查。 */
const CACHE_TTL_MS = 60_000
const RAW_BASE = 'https://raw.githubusercontent.com'

/**
 * 定位 harness checkout 根目录：CLI 入口（process.argv[1]）在源码与安装两种
 * 形态下都位于 <root>/apps/cli/{src,lib}/bin.{ts,js}，向上三级即根目录；
 * 找不到就回退服务器 cwd。
 */
function resolveRepoRoot() {
  const candidates = []
  const entry = process.argv[1]
  if (typeof entry === 'string' && entry.length > 0) {
    candidates.push(resolve(dirname(entry), '../../..'))
    candidates.push(resolve(dirname(entry), '../..'))
  }
  candidates.push(process.cwd())
  for (const dir of candidates) {
    if (existsSync(resolve(dir, 'package.json')) && existsSync(resolve(dir, '.git'))) return dir
  }
  return candidates[0]
}

/**
 * 运行一条只读 git 命令；绝不抛错，settle { ok, stdout }。
 * 超时 SIGKILL 子进程并记失败；stdout 按字节累积。
 */
function runGit(root, args, timeoutMs = TIMEOUT_MS) {
  return new Promise((settle) => {
    let stdout = ''
    let done = false
    const finish = (ok) => {
      if (done) return
      done = true
      settle({ ok, stdout })
    }
    let child
    try {
      child = spawn('git', args, { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] })
    } catch {
      finish(false)
      return
    }
    const timer = setTimeout(() => {
      try { child.kill('SIGKILL') } catch { /* 进程已退出 */ }
      finish(false)
    }, timeoutMs)
    child.stdout.on('data', (chunk) => { stdout += String(chunk) })
    child.on('error', () => { clearTimeout(timer); finish(false) })
    child.on('close', (code) => { clearTimeout(timer); finish(code === 0) })
  })
}

/** 从 github 远端 URL（https 或 ssh 形式）提取 "owner/repo"。 */
function repoSlugOf(remoteUrl) {
  const match = remoteUrl.trim().match(/github\.com[:/]([^/\s]+\/[^/\s]+?)(?:\.git)?\s*$/)
  return match ? match[1] : null
}

/**
 * 尽力读取远端 package.json 的 version；任何失败返回 null。
 * 注意：fetch 抛错时也要清理超时定时器（finally），避免定时器泄漏。
 */
async function fetchRemoteVersion(root, remote, branch) {
  const url = await runGit(root, ['remote', 'get-url', remote])
  if (!url.ok) return null
  const slug = repoSlugOf(url.stdout)
  if (slug === null) return null
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${RAW_BASE}/${slug}/${branch}/package.json`, { signal: ctrl.signal })
    if (!res.ok) return null
    const pkg = await res.json()
    return typeof pkg?.version === 'string' ? pkg.version : null
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

/** 一次完整检查；绝不抛错，结果字段见文件头。 */
async function runCheck(root, remote, branch) {
  const result = {
    version: null,
    sha: null,
    remote,
    branch,
    state: 'unreachable',
    remoteSha: null,
    remoteVersion: null,
    checkedAt: new Date().toISOString(),
  }
  try {
    const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
    if (typeof pkg.version === 'string') result.version = pkg.version
  } catch { /* manifest 读不了则 version 保持 null */ }

  const head = await runGit(root, ['rev-parse', 'HEAD'])
  if (head.ok) {
    const sha = head.stdout.trim()
    if (sha.length > 0) result.sha = sha
  }

  const ls = await runGit(root, ['ls-remote', remote, `refs/heads/${branch}`])
  if (!ls.ok) return result
  const line = ls.stdout
    .split('\n')
    .map((text) => text.trim())
    .find((text) => text.endsWith(`refs/heads/${branch}`))
  const remoteSha = line === undefined ? null : line.split(/\s+/)[0]
  if (remoteSha === null || remoteSha.length === 0 || result.sha === null) return result
  result.remoteSha = remoteSha
  if (remoteSha === result.sha) {
    result.state = 'current'
    return result
  }
  result.state = 'update'
  result.remoteVersion = await fetchRemoteVersion(root, remote, branch)
  return result
}

export function apply(ctx, config) {
  const remote = typeof config?.remote === 'string' && config.remote.length > 0 ? config.remote : 'origin'
  const branch = typeof config?.branch === 'string' && config.branch.length > 0 ? config.branch : 'master'
  const root = resolveRepoRoot()

  // 缓存 + 在途去重：同一窗口内的并发页面加载只触发一次远端检查。
  let cache = null
  let inflight = null
  const getStatus = (force) => {
    if (!force && cache !== null && Date.now() - cache.at < CACHE_TTL_MS) {
      return Promise.resolve(cache.result)
    }
    if (inflight === null) {
      inflight = runCheck(root, remote, branch).then((result) => {
        cache = { at: Date.now(), result }
        inflight = null
        return result
      })
    }
    return inflight
  }

  const sendJson = (res, code, payload) => {
    res.writeHead(code, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    })
    res.end(JSON.stringify(payload))
  }

  // 两个路由都注册为 exact；effect 保证卸载时一并摘除。
  ctx.effect(() => {
    const offStatus = ctx.webServer.register({
      kind: 'exact',
      path: '/updater/status',
      handler: async (req, res) => {
        if (req.method !== 'GET') {
          sendJson(res, 405, { error: 'method not allowed' })
          return
        }
        sendJson(res, 200, await getStatus(false))
      },
    })
    const offRecheck = ctx.webServer.register({
      kind: 'exact',
      path: '/updater/recheck',
      handler: async (req, res) => {
        if (req.method !== 'POST') {
          sendJson(res, 405, { error: 'method not allowed' })
          return
        }
        sendJson(res, 200, await getStatus(true))
      },
    })
    return () => {
      offStatus()
      offRecheck()
    }
  })
}
