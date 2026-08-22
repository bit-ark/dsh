/**
 * dsh-work — 文件路由模块（宿主半）。
 *
 * 注册 /workbench/{dir,file,write,open,asset}：目录树、文件预览、
 * 原子写入、编辑器打开、带 Range 的静态资源流（视频拖动必需）。
 */
import { createReadStream, statSync } from 'node:fs'
import { contentTypeFor, filePreview, listDir, openInEditor, validatedWriteContent, writeFileAtomic } from '../files.js'
import { readJsonBody, readWriteJsonBody, validatedCwd, validatedFilePath, validatedFilePathValue } from '../validate.js'
import { sendJson, isJsonRequest, errorMessage } from './shared.js'

/** 请求体路径里是否含 `..` 段（二次防线，正常路径校验后仍可能有拼接路径）。 */
function hasTraversal(path) {
  return path.split('/').some((segment) => segment === '..')
}

/**
 * 注册全部文件路由。
 *
 * @param {object} ctx 插件上下文（webServer 挂载点）
 * @returns {(() => void)[]} 卸载函数数组（由装配层统一调用）
 */
export function registerFileRoutes(ctx) {
  const offDir = ctx.webServer.register({
    kind: 'exact',
    path: '/workbench/dir',
    handler: async (req, res) => {
      if (req.method !== 'GET') {
        sendJson(res, 405, { ok: false, error: 'method not allowed' })
        return
      }
      const url = new URL(req.url ?? '/', 'http://localhost')
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
        sendJson(res, 200, await filePreview(validated.path, url.searchParams.get('full') === '1'))
      } catch (error) {
        sendJson(res, 200, { ok: false, path: validated.path, error: errorMessage(error) })
      }
    },
  })
  const offWrite = ctx.webServer.register({
    kind: 'exact',
    path: '/workbench/write',
    handler: async (req, res) => {
      if (req.method !== 'POST') {
        sendJson(res, 405, { ok: false, error: 'method not allowed' })
        return
      }
      if (!isJsonRequest(req)) {
        sendJson(res, 415, { ok: false, error: 'content type must be application/json' })
        return
      }
      const body = await readWriteJsonBody(req)
      if (body === null) {
        sendJson(res, 200, { ok: false, path: null, error: '内容超过 1MB 上限' })
        return
      }
      const validated = validatedFilePathValue(body?.path)
      if (validated.error !== undefined) {
        sendJson(res, validated.error === 'not a file' ? 200 : 400, { ok: false, path: validated.path, error: validated.error })
        return
      }
      if (hasTraversal(validated.path)) {
        sendJson(res, 200, { ok: false, path: validated.path, error: 'invalid path' })
        return
      }
      const checked = validatedWriteContent(body?.content)
      if (checked.error !== undefined) {
        sendJson(res, 200, { ok: false, path: validated.path, error: checked.error })
        return
      }
      try {
        sendJson(res, 200, await writeFileAtomic(validated.path, checked.content))
      } catch (error) {
        sendJson(res, 200, { ok: false, path: validated.path, error: errorMessage(error) })
      }
    },
  })
  const offOpen = ctx.webServer.register({
    kind: 'exact',
    path: '/workbench/open',
    handler: async (req, res) => {
      if (req.method !== 'POST') {
        sendJson(res, 405, { ok: false, error: 'method not allowed' })
        return
      }
      if (!isJsonRequest(req)) {
        sendJson(res, 415, { ok: false, error: 'content type must be application/json' })
        return
      }
      const body = await readJsonBody(req)
      const validated = validatedFilePathValue(body?.path)
      if (validated.error !== undefined) {
        sendJson(res, validated.error === 'not a file' ? 200 : 400, { ok: false, path: validated.path, error: validated.error })
        return
      }
      if (hasTraversal(validated.path)) {
        sendJson(res, 200, { ok: false, path: validated.path, error: 'invalid path' })
        return
      }
      try {
        sendJson(res, 200, await openInEditor(validated.path))
      } catch (error) {
        sendJson(res, 200, { ok: false, path: validated.path, error: errorMessage(error) })
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
      let stat
      try {
        stat = statSync(validated.path)
      } catch (error) {
        sendJson(res, 200, { ok: false, path: validated.path, error: `无法读取文件：${errorMessage(error)}` })
        return
      }
      const contentType = contentTypeFor(validated.path)
      const range = req.headers.range
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
          const rangeStream = createReadStream(validated.path, { start, end })
          // 客户端中止（视频拖动换 range 很常见）：裸 pipe 不会连带销毁源流，
          // 不回收会把剩余文件读完，泄漏 FD 与磁盘带宽。正常结束时 destroy
          // 已完成的流是 no-op。
          req.on('close', () => rangeStream.destroy())
          rangeStream
            .on('error', () => { res.destroy() })
            .pipe(res)
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
      const fullStream = createReadStream(validated.path)
      // 同 206 分支：客户端中止时回收源读流。
      req.on('close', () => fullStream.destroy())
      fullStream
        .on('error', () => { res.destroy() })
        .pipe(res)
    },
  })
  return [offDir, offFile, offWrite, offOpen, offAsset]
}
