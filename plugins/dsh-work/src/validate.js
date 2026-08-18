/**
 * dsh-work — 入参校验与请求体读取（宿主半）。
 */
import { statSync } from 'node:fs'
import { MAX_TEXT_EDIT } from './files.js'
/** Absolute file-path validation from a raw string: absolute, NUL-free, existing regular file. */
export function validatedFilePathValue(path) {
  if (typeof path !== 'string' || path.length === 0 || path[0] !== '/' || path.includes('\0')) {
    return { error: 'path must be an absolute path' }
  }
  let isFile = false
  try { isFile = statSync(path).isFile() } catch { /* absent path */ }
  if (!isFile) return { error: 'not a file' }
  return { path }
}

/** Absolute file-path validation from URL query params (GET routes). */
export function validatedFilePath(searchParams) {
  return validatedFilePathValue(searchParams.get('path'))
}

/** Shared cwd validation: absolute, NUL-free, existing directory. */
export function validatedCwd(searchParams) {
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
export function validatedRelPath(body) {
  let path
  try { path = typeof body?.path === 'string' ? body.path : null } catch { path = null }
  if (path === null || path.length === 0 || path.length > 2000 || path.includes('\0') || path.startsWith('/')) {
    return { error: 'invalid path' }
  }
  if (path.split('/').some(segment => segment === '..')) return { error: 'invalid path' }
  return { path }
}

/** Commit message validation: non-empty, bounded, no NUL. */
export function validatedMessage(body) {
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
export function readJsonBody(req) {
  return new Promise((resolve) => {
    let data = ''
    req.on('data', (chunk) => { if (data.length < 8192) data += String(chunk) })
    req.on('end', () => {
      try { resolve(JSON.parse(data === '' ? '{}' : data)) } catch { resolve({}) }
    })
    req.on('error', () => resolve({}))
  })
}

/**
 * Read a larger JSON body for the write route (content up to MAX_TEXT_EDIT
 * plus JSON envelope slack). Oversized bodies resolve `null` (the route
 * reports the size limit instead of letting the payload pile up in memory).
 */
export function readWriteJsonBody(req) {
  const CAP = MAX_TEXT_EDIT + 16 * 1024
  return new Promise((resolve) => {
    let data = ''
    let tooBig = false
    req.on('data', (chunk) => {
      if (!tooBig && data.length < CAP) data += String(chunk)
      else tooBig = true
    })
    req.on('end', () => {
      if (tooBig) { resolve(null); return }
      try { resolve(JSON.parse(data === '' ? '{}' : data)) } catch { resolve({}) }
    })
    req.on('error', () => resolve({}))
  })
}
