/**
 * dsh-work — 目录/文件操作与文件分类（宿主半）。
 */
import { readdirSync, statSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { open, realpath, rename, rm, writeFile } from 'node:fs/promises'

export function listDir(absPath) {
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
/** Full-content read bound for the editor; larger files are served read-only. */
export const MAX_TEXT_EDIT = 1024 * 1024

/** Write content guard: a string, non-empty-or-empty ok, size-bounded. */
export function validatedWriteContent(content) {
  if (typeof content !== 'string') return { error: 'missing content' }
  if (Buffer.byteLength(content, 'utf8') > MAX_TEXT_EDIT) return { error: '内容超过 1MB 上限' }
  return { content }
}

/**
 * One file's preview payload: text files carry their (bounded) content;
 * binary files report kind without content — the client uses /workbench/asset.
 * `full=1` raises the read bound to MAX_TEXT_EDIT for the editor (still
 * flagged truncated beyond it, so the panel disables editing instead of
 * saving a partial file).
 */
export async function filePreview(absPath, full = false) {
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
    // fd.read 可能短读（返回的字节数少于请求量），必须按 bytesRead 裁剪，
    // 否则缓冲区尾部残留的 0 会让文本文件被误判为二进制（looksText 见 NUL）。
    const probeSize = Math.min(stat.size, 8192)
    const probe = Buffer.alloc(probeSize)
    const probeRead = await fd.read(probe, 0, probeSize, 0)
    if (!looksText(probe.subarray(0, probeRead.bytesRead))) {
      return { ok: true, path: absPath, kind: 'binary', size: stat.size, truncated: false }
    }
    const bound = full ? MAX_TEXT_EDIT : MAX_TEXT_PREVIEW
    const readSize = Math.min(stat.size, bound)
    const body = Buffer.alloc(readSize)
    const bodyRead = await fd.read(body, 0, readSize, 0)
    return {
      ok: true,
      path: absPath,
      kind: 'text',
      size: stat.size,
      content: body.subarray(0, bodyRead.bytesRead).toString('utf8'),
      truncated: stat.size > bound,
    }
  } finally {
    await fd.close()
  }
}

/**
 * Atomic file write for the editor: write a temp sibling then rename over the
 * target, so a crash never leaves a half-written file. Existing files only.
 *  - 权限位随原文件保留（rename 换 inode 会丢 mode，可执行脚本不能丢 +x）；
 *  - 符号链接先解析到真实目标，避免 rename 把链接本身替换成普通文件；
 *  - 失败时清理残留的临时文件。
 */
export async function writeFileAtomic(absPath, content) {
  let stat
  try { stat = statSync(absPath) } catch {
    return { ok: false, path: absPath, error: '文件不存在' }
  }
  if (!stat.isFile()) return { ok: false, path: absPath, error: '不是文件' }
  let target = absPath
  try { target = await realpath(absPath) } catch { /* 保持原路径 */ }
  const tmpPath = `${target}.dwb-tmp-${process.pid}-${Date.now()}`
  try {
    await writeFile(tmpPath, content, { encoding: 'utf8', mode: stat.mode & 0o777 })
    await rename(tmpPath, target)
  } catch (error) {
    try { await rm(tmpPath, { force: true }) } catch { /* 清理尽力而为 */ }
    throw error
  }
  return { ok: true, path: absPath, size: Buffer.byteLength(content, 'utf8') }
}

/**
 * Open one file in VS Code on the host: try the `code` CLI (reuse window),
 * fall back to `open -a "Visual Studio Code"`, then the system default
 * editor. Never throws; the panel shows the failure reason.
 */
export function openInEditor(absPath) {
  return new Promise((resolve) => {
    let done = false
    const finish = (ok, error) => { if (!done) { done = true; resolve({ ok, error }) } }
    const tryCode = () => {
      let child
      try { child = spawn('code', ['-r', absPath], { stdio: 'ignore' }) } catch { child = null }
      if (child === null) { fallback(); return }
      // spawn 失败（ENOENT 等）时 Node 先发 error、随后 close(code 为 null/-2)
      // 也会触发——此时结果由 fallback 负责，close 不得抢先 resolve，否则
      // 装了 VS Code 但没装 `code` CLI 的机器永远报「打开失败」。
      let spawnFailed = false
      child.on('error', () => { spawnFailed = true; fallback() })
      child.on('close', (code) => {
        if (spawnFailed) return
        finish(code === 0, code === 0 ? undefined : 'VS Code 打开失败')
      })
    }
    const fallback = () => {
      try {
        spawn('open', ['-a', 'Visual Studio Code', absPath], { stdio: 'ignore' })
          .on('error', () => finish(false, '未找到 VS Code，已尝试系统默认编辑器'))
          .on('close', (code) => finish(code === 0, code === 0 ? undefined : 'VS Code 打开失败'))
      } catch {
        try {
          spawn('open', [absPath], { stdio: 'ignore' })
            .on('error', () => finish(false, '无法打开文件'))
            .on('close', (code) => finish(code === 0, code === 0 ? undefined : '打开失败'))
        } catch { finish(false, '无法打开文件') }
      }
    }
    tryCode()
  })
}
