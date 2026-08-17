/**
 * dsh-workbench-git — node half (host plane). Git facts + basic operations
 * for the workbench panel over the web surface:
 *
 *   GET   /workbench/git?cwd=<abs-path>[&ignored=1] → {
 *     ok: true, repo: false, cwd, error?            (not a repository)
 *     ok: true, repo: true, cwd, branch, head, graph, changes, ignored
 *     ok: false, cwd?, error                         (bad request / failure)
 *   }
 *   GET   /workbench/dir?path=<abs-path> → {
 *     ok: true, path, entries: [{ name, path, type, size?, hidden }], truncated
 *   }
 *   GET   /workbench/file?path=<abs-path> → {
 *     ok: true, path, kind: 'text'|'binary', size, content?, truncated?
 *   }                                      (text preview; binary has no content)
 *   GET   /workbench/asset?path=<abs-path> → raw bytes with a content-type by
 *     extension, single-range 206 support for media seeking (no JSON envelope)
 *   POST  /workbench/git/init?cwd=…       → git init (bare, host default branch)
 *   POST  /workbench/git/stage?cwd=…      → git add -- <path>        (body: {path})
 *   POST  /workbench/git/unstage?cwd=…    → git restore --staged -- <path>  (body: {path})
 *   POST  /workbench/git/stage-all?cwd=…  → git add -A
 *   POST  /workbench/git/commit?cwd=…     → git commit -m <message>  (body: {message})
 *   POST  /workbench/git/ignore?cwd=…     → append to .gitignore      (body: {path})
 *   POST  /workbench/git/unignore?cwd=…   → remove from .gitignore    (body: {path})
 *
 * Mutations return the FRESH GET payload on success ({ok:true, repo:true, …})
 * or {ok:false, error} on failure, so the panel re-renders from one round trip.
 *
 * Fact commands run with a FIXED argv (no shell): repo detection via
 * `rev-parse --git-dir`, branch via `rev-parse --abbrev-ref HEAD` with a
 * `symbolic-ref --short HEAD` fallback (an unborn branch on a fresh repo has
 * no revision yet), the commit graph via
 * `log --graph --all -n 60 --date=short --pretty=tformat:%x1e…` (the \x1e
 * sentinel separates the graph column from the commit fields; lines without a
 * sentinel are pure graph continuation rows), and
 * `--no-optional-locks status --porcelain=v1 [--ignored]`
 * (GIT_OPTIONAL_LOCKS=0 so even the status probe never touches the index;
 * `--ignored` adds `!!` rows into a separate `ignored` list). All writes are
 * user-triggered and strictly scoped to the caller's path.
 */
import { appendFile, open, readFile, writeFile } from 'node:fs/promises'
import { createReadStream, readdirSync, statSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { join } from 'node:path'

export const name = 'dsh-workbench'

/** Hard dependency: routes register on the web surface's route table. */
export const inject = ['webServer']

/** Per-command budget; a stuck git cannot hold the route. */
const TIMEOUT_MS = 8_000
/** Graph bound; matches the panel's "recent history" contract. */
const MAX_GRAPH = 60
/** stdout capture bound per command (tail kept by string slice at the cap). */
const MAX_OUTPUT = 512 * 1024

/** Run one git command; never throws, settles { ok, stdout, stderr, error }. */
function runGit(cwd, args, timeoutMs = TIMEOUT_MS) {
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
async function inspect(cwd, showIgnored = false) {
  const gitDir = await runGit(cwd, ['rev-parse', '--git-dir'])
  if (!gitDir.ok) {
    return {
      ok: true,
      repo: false,
      cwd,
      error: gitDir.stderr.trim() !== '' ? gitDir.stderr.trim().split('\n')[0] : (gitDir.error ?? 'not a git repository'),
    }
  }
  const branch = await currentBranch(cwd)
  const headResult = await runGit(cwd, ['rev-parse', '--short', 'HEAD'])
  const head = headResult.ok ? headResult.stdout.trim() : ''
  const graphResult = await runGit(cwd, [
    'log', '--graph', '--all', '-n', String(MAX_GRAPH), '--date=short',
    '--pretty=tformat:%x1e%h%x1f%ad%x1f%an%x1f%s',
  ])
  const graph = graphResult.ok ? parseGraph(graphResult.stdout) : []
  const statusArgs = ['--no-optional-locks', 'status', '--porcelain=v1']
  if (showIgnored) statusArgs.push('--ignored')
  const status = await runGit(cwd, statusArgs)
  const changes = []
  const ignored = []
  if (status.ok) {
    for (const line of status.stdout.split('\n')) {
      if (line.length < 4) continue
      const code = line.slice(0, 2)
      const path = line.slice(3)
      if (code === '!!') ignored.push(path)
      else changes.push({ code, path })
    }
  }
  return { ok: true, repo: true, cwd, branch, head, graph, changes, ignored }
}

/**
 * One directory level for the Files tab: files AND directories (the browse
 * capability only exposes directories), dirs first then name, hidden flagged,
 * file sizes included, bounded with a truncated flag. Read-only.
 */
function listDir(absPath) {
  let dirents
  try {
    dirents = readdirSync(absPath, { withFileTypes: true })
  } catch (error) {
    return { ok: false, path: absPath, error: error instanceof Error ? error.message : String(error) }
  }
  const MAX_ENTRIES = 500
  const truncated = dirents.length > MAX_ENTRIES
  const rows = dirents.slice(0, MAX_ENTRIES).map((dirent) => {
    const isDir = dirent.isDirectory()
    const childPath = join(absPath, dirent.name)
    let size
    if (!isDir) {
      try { size = statSync(childPath).size } catch { /* unreadable: no size */ }
    }
    return {
      name: dirent.name,
      path: childPath,
      type: isDir ? 'directory' : 'file',
      ...(size === undefined ? {} : { size }),
      hidden: dirent.name.startsWith('.'),
    }
  })
  rows.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'directory' ? -1 : 1
    return a.name.localeCompare(b.name, 'en', { numeric: true })
  })
  return { ok: true, path: absPath, entries: rows, truncated }
}

/**
 * File kind by extension — the client's preview branching and the host's
 * asset Content-Type share this one source of truth.
 */
const TEXT_EXTENSIONS = new Set([
  'md', 'mdx', 'txt', 'text', 'ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs', 'mts', 'cts',
  'json', 'jsonc', 'yml', 'yaml', 'toml', 'html', 'htm', 'xml', 'css', 'scss',
  'less', 'py', 'rb', 'go', 'rs', 'java', 'c', 'h', 'cpp', 'hpp', 'cs', 'php',
  'sh', 'bash', 'zsh', 'fish', 'bat', 'ps1', 'sql', 'graphql', 'ini', 'conf',
  'env', 'gitignore', 'dockerfile', 'lock', 'log', 'csv', 'vue', 'svelte',
  'astro', 'prisma', 'proto', 'webmanifest',
])
const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'avif', 'svg'])
const AUDIO_EXTENSIONS = new Set(['mp3', 'wav', 'ogg', 'oga', 'm4a', 'aac', 'flac', 'opus', 'weba'])
const VIDEO_EXTENSIONS = new Set(['mp4', 'webm', 'mov', 'm4v', 'avi', 'mkv', 'ogv', 'ts', 'm2ts'])

/** Extension of a file name (no dot, lowercased); '' when none. */
export function extensionOf(name) {
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : ''
}

/** Preview kind of a file: 'text' | 'image' | 'audio' | 'video' | 'other'. */
export function classifyFile(name) {
  const ext = extensionOf(name)
  if (ext === '') return 'other'
  if (TEXT_EXTENSIONS.has(ext)) return 'text'
  if (IMAGE_EXTENSIONS.has(ext)) return 'image'
  if (AUDIO_EXTENSIONS.has(ext)) return 'audio'
  if (VIDEO_EXTENSIONS.has(ext)) return 'video'
  return 'other'
}

/** Browser-friendly Content-Type for one extension ('' → octet-stream). */
export function contentTypeFor(name) {
  const ext = extensionOf(name)
  const table = {
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif',
    webp: 'image/webp', bmp: 'image/bmp', ico: 'image/x-icon', avif: 'image/avif',
    svg: 'image/svg+xml',
    mp3: 'audio/mpeg', wav: 'audio/wav', ogg: 'audio/ogg', oga: 'audio/ogg',
    m4a: 'audio/mp4', aac: 'audio/aac', flac: 'audio/flac', opus: 'audio/ogg',
    weba: 'audio/webm',
    mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime', m4v: 'video/x-m4v',
    avi: 'video/x-msvideo', mkv: 'video/x-matroska', ogv: 'video/ogg',
    ts: 'video/mp2t', m2ts: 'video/mp2t',
    pdf: 'application/pdf',
    json: 'application/json', jsonc: 'application/json', yml: 'application/yaml',
    yaml: 'application/yaml', toml: 'application/toml', xml: 'application/xml',
    html: 'text/html', htm: 'text/html', css: 'text/css', csv: 'text/csv',
  }
  return table[ext] ?? 'application/octet-stream'
}

/** Whether the first bytes look like text: no NUL in the probe window. */
export function looksText(buffer) {
  return !buffer.subarray(0, 8192).includes(0)
}

/** Text preview read bound; larger files are served truncated. */
const MAX_TEXT_PREVIEW = 512 * 1024

/**
 * One file's preview payload: text files carry their (bounded) content;
 * binary files report kind without content — the client uses /workbench/asset.
 */
async function filePreview(absPath) {
  let stat
  try { stat = statSync(absPath) } catch {
    return { ok: false, path: absPath, error: '文件不存在' }
  }
  if (!stat.isFile()) return { ok: false, path: absPath, error: '不是文件' }
  if (stat.size === 0) {
    return { ok: true, path: absPath, kind: 'text', size: 0, content: '', truncated: false }
  }
  const fd = await open(absPath, 'r')
  try {
    const probeSize = Math.min(stat.size, 8192)
    const probe = Buffer.alloc(probeSize)
    await fd.read(probe, 0, probeSize, 0)
    if (!looksText(probe)) {
      return { ok: true, path: absPath, kind: 'binary', size: stat.size, truncated: false }
    }
    const readSize = Math.min(stat.size, MAX_TEXT_PREVIEW)
    const body = Buffer.alloc(readSize)
    await fd.read(body, 0, readSize, 0)
    return {
      ok: true,
      path: absPath,
      kind: 'text',
      size: stat.size,
      content: body.toString('utf8'),
      truncated: stat.size > MAX_TEXT_PREVIEW,
    }
  } finally {
    await fd.close()
  }
}

/** Absolute file-path validation: absolute, NUL-free, existing regular file. */
function validatedFilePath(searchParams) {
  const path = searchParams.get('path')
  if (typeof path !== 'string' || path.length === 0 || path[0] !== '/' || path.includes('\0')) {
    return { error: 'path must be an absolute path' }
  }
  let isFile = false
  try { isFile = statSync(path).isFile() } catch { /* absent path */ }
  if (!isFile) return { error: 'not a file' }
  return { path }
}

/** User-triggered bare `git init`; refuses an existing repository. */
async function initRepo(cwd) {
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
async function addIgnore(cwd, relPath) {
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
async function removeIgnore(cwd, relPath) {
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

/** Shared cwd validation: absolute, NUL-free, existing directory. */
function validatedCwd(searchParams) {
  const cwd = searchParams.get('cwd')
  if (typeof cwd !== 'string' || cwd.length === 0 || cwd[0] !== '/' || cwd.includes('\0')) {
    return { error: 'cwd must be an absolute path' }
  }
  let isDir = false
  try { isDir = statSync(cwd).isDirectory() } catch { /* absent path */ }
  if (!isDir) return { error: 'not a directory' }
  return { cwd }
}

/** Relative pathspec validation: no absolute, no traversal, no NUL. */
function validatedRelPath(body) {
  let path
  try { path = typeof body?.path === 'string' ? body.path : null } catch { path = null }
  if (path === null || path.length === 0 || path.length > 2000 || path.includes('\0') || path.startsWith('/')) {
    return { error: 'invalid path' }
  }
  if (path.split('/').some(segment => segment === '..')) return { error: 'invalid path' }
  return { path }
}

/** Commit message validation: non-empty, bounded, no NUL. */
function validatedMessage(body) {
  let message
  try { message = typeof body?.message === 'string' ? body.message : null } catch { message = null }
  if (message === null) return { error: 'missing message' }
  const trimmed = message.trim()
  if (trimmed.length === 0 || trimmed.length > 5000 || trimmed.includes('\0')) {
    return { error: 'invalid commit message' }
  }
  return { message: trimmed }
}

/** Read a bounded JSON request body; unparsable/absent bodies become {}. */
function readJsonBody(req) {
  return new Promise((resolve) => {
    let data = ''
    req.on('data', (chunk) => { if (data.length < 8192) data += String(chunk) })
    req.on('end', () => {
      try { resolve(JSON.parse(data === '' ? '{}' : data)) } catch { resolve({}) }
    })
    req.on('error', () => resolve({}))
  })
}

/** Friendly failure for a failed git command. */
function failureReason(result, fallback) {
  if (result.stderr.trim() !== '') {
    const stderr = result.stderr.trim()
    if (/user\.name|user\.email|Please tell me who you are/i.test(stderr)) {
      return '提交失败：尚未配置 git 用户身份。请先在终端执行：git config --global user.name "你的名字" 和 git config --global user.email "you@example.com"'
    }
    return stderr.split('\n')[0]
  }
  return result.error ?? fallback
}

export function apply(ctx) {
  const sendJson = (res, code, payload) => {
    res.writeHead(code, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    })
    res.end(JSON.stringify(payload))
  }

  /** One POST mutation: validate cwd + repo, run the command, return fresh facts. */
  const mutation = (mutate, showIgnoredAfter = false) => async (req, res) => {
    if (req.method !== 'POST') {
      sendJson(res, 405, { ok: false, error: 'method not allowed' })
      return
    }
    const url = new URL(req.url ?? '/', 'http://localhost')
    const validated = validatedCwd(url.searchParams)
    if (validated.error !== undefined) {
      sendJson(res, validated.error === 'not a directory' ? 200 : 400, { ok: false, cwd: validated.cwd, error: validated.error })
      return
    }
    const body = await readJsonBody(req)
    const prepared = mutate(body)
    if (prepared.error !== undefined) {
      sendJson(res, 200, { ok: false, cwd: validated.cwd, error: prepared.error })
      return
    }
    try {
      if (prepared.direct !== undefined) {
        const outcome = await prepared.direct(validated.cwd)
        if (outcome.ok !== true) {
          sendJson(res, 200, { ok: false, cwd: validated.cwd, error: outcome.error ?? 'git 操作失败' })
          return
        }
      } else {
        const result = await runGit(validated.cwd, prepared.args)
        if (!result.ok) {
          sendJson(res, 200, { ok: false, cwd: validated.cwd, error: failureReason(result, prepared.fallback ?? 'git 操作失败') })
          return
        }
      }
      sendJson(res, 200, await inspect(validated.cwd, showIgnoredAfter))
    } catch (error) {
      sendJson(res, 200, { ok: false, cwd: validated.cwd, error: error instanceof Error ? error.message : String(error) })
    }
  }

  ctx.effect(() => {
    const offDir = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/dir',
      handler: async (req, res) => {
        if (req.method !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const url = new URL(req.url ?? '/', 'http://localhost')
        // Same absolute-path contract as the git routes, read from `path`.
        const params = new URLSearchParams()
        params.set('cwd', url.searchParams.get('path') ?? '')
        const validated = validatedCwd(params)
        if (validated.error !== undefined) {
          sendJson(res, validated.error === 'not a directory' ? 200 : 400, { ok: false, path: validated.cwd, error: validated.error })
          return
        }
        sendJson(res, 200, listDir(validated.cwd))
      },
    })
    const offFile = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/file',
      handler: async (req, res) => {
        if (req.method !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const url = new URL(req.url ?? '/', 'http://localhost')
        const validated = validatedFilePath(url.searchParams)
        if (validated.error !== undefined) {
          sendJson(res, validated.error === 'not a file' ? 200 : 400, { ok: false, path: validated.path, error: validated.error })
          return
        }
        try {
          sendJson(res, 200, await filePreview(validated.path))
        } catch (error) {
          sendJson(res, 200, { ok: false, path: validated.path, error: error instanceof Error ? error.message : String(error) })
        }
      },
    })
    const offAsset = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/asset',
      handler: async (req, res) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const url = new URL(req.url ?? '/', 'http://localhost')
        const validated = validatedFilePath(url.searchParams)
        if (validated.error !== undefined) {
          sendJson(res, validated.error === 'not a file' ? 200 : 400, { ok: false, path: validated.path, error: validated.error })
          return
        }
        const stat = statSync(validated.path)
        const contentType = contentTypeFor(validated.path)
        const range = req.headers.range
        // Single-range support (browsers ask for one range for media seeking).
        const match = typeof range === 'string' ? /^bytes=(\d*)-(\d*)$/.exec(range.trim()) : null
        if (match !== null && (match[1] !== '' || match[2] !== '')) {
          const start = match[1] === '' ? Math.max(0, stat.size - Number(match[2])) : Number(match[1])
          const end = match[2] === '' || Number(match[2]) >= stat.size ? stat.size - 1 : Number(match[2])
          if (start <= end && start < stat.size) {
            res.writeHead(206, {
              'content-type': contentType,
              'content-length': String(end - start + 1),
              'content-range': `bytes ${start}-${end}/${stat.size}`,
              'accept-ranges': 'bytes',
              'cache-control': 'no-store',
            })
            if (req.method === 'HEAD') { res.end(); return }
            createReadStream(validated.path, { start, end }).pipe(res)
            return
          }
          res.writeHead(416, {
            'content-range': `bytes */${stat.size}`,
            'content-type': 'application/json; charset=utf-8',
          })
          res.end(JSON.stringify({ ok: false, error: 'range not satisfiable' }))
          return
        }
        res.writeHead(200, {
          'content-type': contentType,
          'content-length': String(stat.size),
          'accept-ranges': 'bytes',
          'cache-control': 'no-store',
        })
        if (req.method === 'HEAD') { res.end(); return }
        createReadStream(validated.path).pipe(res)
      },
    })
    const offGit = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git',
      handler: async (req, res) => {
        if (req.method !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const url = new URL(req.url ?? '/', 'http://localhost')
        const validated = validatedCwd(url.searchParams)
        if (validated.error !== undefined) {
          sendJson(res, validated.error === 'not a directory' ? 200 : 400, { ok: false, cwd: validated.cwd, error: validated.error })
          return
        }
        try {
          sendJson(res, 200, await inspect(validated.cwd, url.searchParams.get('ignored') === '1'))
        } catch (error) {
          sendJson(res, 200, { ok: false, cwd: validated.cwd, error: error instanceof Error ? error.message : String(error) })
        }
      },
    })
    const offInit = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/init',
      handler: mutation(() => ({ direct: (cwd) => initRepo(cwd) })),
    })
    const offStage = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/stage',
      handler: mutation((body) => {
        const path = validatedRelPath(body)
        if (path.error !== undefined) return { error: path.error }
        return { args: ['add', '--', path.path], fallback: 'git add 失败' }
      }),
    })
    const offUnstage = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/unstage',
      handler: mutation((body) => {
        const path = validatedRelPath(body)
        if (path.error !== undefined) return { error: path.error }
        return { args: ['restore', '--staged', '--', path.path], fallback: '取消暂存失败' }
      }),
    })
    const offStageAll = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/stage-all',
      handler: mutation(() => ({ args: ['add', '-A'], fallback: '全部暂存失败' })),
    })
    const offCommit = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/commit',
      handler: mutation((body) => {
        const message = validatedMessage(body)
        if (message.error !== undefined) return { error: message.error }
        return { args: ['commit', '-m', message.message], fallback: '提交失败' }
      }),
    })
    const offIgnore = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/ignore',
      handler: mutation((body) => {
        const path = validatedRelPath(body)
        if (path.error !== undefined) return { error: path.error }
        return { direct: (cwd) => addIgnore(cwd, path.path) }
      }, true),
    })
    const offUnignore = ctx.webServer.register({
      kind: 'exact',
      path: '/workbench/git/unignore',
      handler: mutation((body) => {
        const path = validatedRelPath(body)
        if (path.error !== undefined) return { error: path.error }
        return { direct: (cwd) => removeIgnore(cwd, path.path) }
      }, true),
    })
    return () => {
      offDir()
      offFile()
      offAsset()
      offGit()
      offInit()
      offStage()
      offUnstage()
      offStageAll()
      offCommit()
      offIgnore()
      offUnignore()
    }
  }, 'dsh-workbench-git: routes')
}
