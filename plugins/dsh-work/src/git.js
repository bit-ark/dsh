/**
 * dsh-work — git 事实采集与基础操作（宿主半）。
 */
import { appendFile, readFile, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { join } from 'node:path'

/** Per-command budget; a stuck git cannot hold the route. */
const TIMEOUT_MS = 8_000
/** Graph bound; matches the panel's "recent history" contract. */
const MAX_GRAPH = 60
/** stdout capture bound per command. Chunks are kept whole from the head until
 * the running byte count passes the cap; later chunks are dropped entirely
 * (no partial-chunk slicing, so captured text ends on a chunk boundary). */
const MAX_OUTPUT = 512 * 1024

/** Run one git command; never throws, settles { ok, stdout, stderr, error }. */
export function runGit(cwd, args, timeoutMs = TIMEOUT_MS) {
  return new Promise((settle) => {
    let stdout = ''
    let stderr = ''
    let outSize = 0
    let done = false
    const finish = (ok, error) => {
      if (done) return
      done = true
      settle({ ok, stdout, stderr, error })
    }
    let child
    try {
      child = spawn('git', args, {
        cwd,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...process.env, GIT_OPTIONAL_LOCKS: '0' },
      })
    } catch (error) {
      finish(false, String(error))
      return
    }
    const timer = setTimeout(() => {
      try { child.kill('SIGKILL') } catch { /* already gone */ }
      finish(false, 'timeout')
    }, timeoutMs)
    child.stdout.on('data', (chunk) => {
      outSize += chunk.length
      if (outSize <= MAX_OUTPUT) stdout += String(chunk)
    })
    child.stderr.on('data', (chunk) => {
      if (stderr.length < 2000) stderr += String(chunk)
    })
    child.on('error', (error) => { clearTimeout(timer); finish(false, error.message) })
    child.on('close', (code) => {
      clearTimeout(timer)
      finish(code === 0, code === 0 ? undefined : `exit ${code}`)
    })
  })
}

/**
 * Current branch name. On an unborn branch (fresh repo, no commit yet)
 * `rev-parse HEAD` fails; the symbolic ref still names the branch.
 */
async function currentBranch(cwd) {
  const rev = await runGit(cwd, ['rev-parse', '--abbrev-ref', 'HEAD'])
  if (rev.ok) {
    const name = rev.stdout.trim()
    if (name !== 'HEAD') return name
  }
  const symbolic = await runGit(cwd, ['symbolic-ref', '--short', 'HEAD'])
  return symbolic.ok && symbolic.stdout.trim() !== '' ? symbolic.stdout.trim() : 'HEAD'
}

/** Parse `--graph` output: sentinel-separated rows; graph-only lines kept. */
function parseGraph(stdout) {
  const rows = []
  for (const line of stdout.split('\n')) {
    if (line.length === 0) continue
    const sep = line.indexOf('\x1e')
    if (sep < 0) {
      rows.push({ graph: line.trimEnd(), hash: '', date: '', author: '', subject: '' })
      continue
    }
    const fields = line.slice(sep + 1).split('\x1f')
    rows.push({
      graph: line.slice(0, sep).trimEnd(),
      hash: fields[0] ?? '',
      date: fields[1] ?? '',
      author: fields[2] ?? '',
      subject: fields.slice(3).join('\x1f'),
    })
  }
  return rows
}

/** One directory's git facts; never throws. */
export async function inspect(cwd, showIgnored = false) {
  const gitDir = await runGit(cwd, ['rev-parse', '--git-dir'])
  if (!gitDir.ok) {
    return {
      ok: true,
      repo: false,
      cwd,
      error: gitDir.stderr.trim() !== '' ? gitDir.stderr.trim().split('\n')[0] : (gitDir.error ?? 'not a git repository'),
    }
  }
  // 仓库探测之后，分支/HEAD/提交图/状态彼此独立，并行发出（原先串行要
  // 4~6 个 git 进程的往返时间，合并后接近单次）。
  const [branchResult, headResult, graphResult, statusResult] = await Promise.all([
    currentBranch(cwd),
    runGit(cwd, ['rev-parse', '--short', 'HEAD']),
    runGit(cwd, [
      'log', '--graph', '--all', '-n', String(MAX_GRAPH),
      // %at = 提交时间 unix 秒（任何 git 版本都支持）；客户端负责本地时区
      // 格式化（当年显示 MM-DD HH:mm，跨年显示 YYYY-MM-DD）。
      '--pretty=tformat:%x1e%h%x1f%at%x1f%an%x1f%s',
    ]),
    (() => {
      // -c core.quotepath=false：默认 quotepath=true 会把非 ASCII 路径（如中文
      // 文件名）转义成 "\346\226\207…" 八进制引号形式——UI 显示转义串、再把它
      // 发回 git add/restore 时 pathspec 不匹配，中文文件的暂存/忽略全线失败。
      // 关掉后 porcelain 输出原始 UTF-8 路径。-c 是 git 全局选项，必须在子命令前。
      const statusArgs = ['-c', 'core.quotepath=false', '--no-optional-locks', 'status', '--porcelain=v1']
      if (showIgnored) statusArgs.push('--ignored')
      return runGit(cwd, statusArgs)
    })(),
  ])
  const branch = branchResult
  const head = headResult.ok ? headResult.stdout.trim() : ''
  const graph = graphResult.ok ? parseGraph(graphResult.stdout) : []
  const changes = []
  const ignored = []
  if (statusResult.ok) {
    for (const line of statusResult.stdout.split('\n')) {
      if (line.length < 4) continue
      const code = line.slice(0, 2)
      const path = line.slice(3)
      if (code === '!!') ignored.push(path)
      else changes.push({ code, path })
    }
  }
  return { ok: true, repo: true, cwd, branch, head, graph, changes, ignored }
}

/** User-triggered bare `git init`; refuses an existing repository. */
export async function initRepo(cwd) {
  const existing = await runGit(cwd, ['rev-parse', '--git-dir'])
  if (existing.ok) return { ok: false, cwd, error: '该目录已经是一个 Git 仓库' }
  const init = await runGit(cwd, ['init'])
  if (!init.ok) {
    const reason = init.stderr.trim() !== '' ? init.stderr.trim().split('\n')[0] : (init.error ?? 'git init failed')
    return { ok: false, cwd, error: reason }
  }
  return { ok: true, cwd, branch: await currentBranch(cwd) }
}

/** One .gitignore entry for a relative path: `#`/`!` prefixes are escaped. */
function ignoreEntryFor(path) {
  let entry = path
  if (entry.startsWith('#') || entry.startsWith('!')) entry = '\\' + entry
  return entry
}

/** Append one entry to .gitignore (creating it when absent); no-op when present. */
export async function addIgnore(cwd, relPath) {
  const gitIgnorePath = join(cwd, '.gitignore')
  const entry = ignoreEntryFor(relPath)
  let existing = ''
  try { existing = await readFile(gitIgnorePath, 'utf8') } catch { /* first entry */ }
  const lines = existing.split('\n').map(line => line.trimEnd())
  if (lines.some(line => line.trim() === entry || line.trim() === relPath)) {
    return { ok: true }
  }
  const prefix = existing === '' || existing.endsWith('\n') ? '' : '\n'
  await appendFile(gitIgnorePath, `${prefix}${entry}\n`, 'utf8')
  return { ok: true }
}

/** Remove one entry from .gitignore; errors when the entry is absent. */
export async function removeIgnore(cwd, relPath) {
  const gitIgnorePath = join(cwd, '.gitignore')
  let existing
  try { existing = await readFile(gitIgnorePath, 'utf8') } catch {
    return { ok: false, error: '未找到 .gitignore' }
  }
  const entry = ignoreEntryFor(relPath)
  const lines = existing.split('\n')
  const kept = lines.filter(line => line.trim() !== entry && line.trim() !== relPath)
  if (kept.length === lines.length) {
    return { ok: false, error: `未在 .gitignore 中找到 ${relPath}` }
  }
  await writeFile(gitIgnorePath, kept.join('\n').replace(/\n+$/, '') + '\n', 'utf8')
  return { ok: true }
}

/**
 * Unstage one path. Fresh repos have no HEAD yet, and there
 * `git restore --staged` dies with `fatal: could not resolve HEAD` —
 * fall back to the unborn-HEAD equivalent `git rm --cached` (same
 * strategy VS Code uses). Never throws.
 * @returns {Promise<{ok: true} | {ok: false, error: string}>}
 */
export async function unstagePath(cwd, relPath) {
  const head = await runGit(cwd, ['rev-parse', '--verify', '--quiet', 'HEAD'])
  const result = head.ok
    ? await runGit(cwd, ['restore', '--staged', '--', relPath])
    : await runGit(cwd, ['rm', '--cached', '--', relPath])
  if (!result.ok) return { ok: false, error: failureReason(result, '取消暂存失败') }
  return { ok: true }
}

/** Friendly failure for a failed git command. */
export function failureReason(result, fallback) {
  if (result.stderr.trim() !== '') {
    const stderr = result.stderr.trim()
    if (/user\.name|user\.email|Please tell me who you are/i.test(stderr)) {
      return '提交失败：尚未配置 git 用户身份。请先在终端执行：git config --global user.name "你的名字" 和 git config --global user.email "you@example.com"'
    }
    return stderr.split('\n')[0]
  }
  return result.error ?? fallback
}
