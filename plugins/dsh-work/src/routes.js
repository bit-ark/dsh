/**
 * dsh-work — /workbench/* 路由注册（宿主半）。registerRoutes 在 ctx.effect 内
 * 注册 13 条路由并返回组合 disposer；index.js 的 apply 以 effect 持有它。
 */
import { createReadStream, statSync } from 'node:fs'
import { failureReason, initRepo, addIgnore, removeIgnore, runGit, inspect } from './git.js'
import { contentTypeFor, filePreview, listDir, openInEditor, validatedWriteContent, writeFileAtomic } from './files.js'
import { readJsonBody, readWriteJsonBody, validatedCwd, validatedFilePath, validatedFilePathValue, validatedMessage, validatedRelPath } from './validate.js'

export function registerRoutes(ctx) {
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
    // CSRF 围栏：只接受 application/json。浏览器对 text/plain 等「简单请求」
    // 不做 CORS 预检，恶意页面可以跨站盲发 side-effect POST——harness 自身
    // /api 面就是这个约定（415），这里保持一致。
    const mediaType = (req.headers['content-type'] ?? '').split(';', 1)[0]?.trim().toLowerCase()
    if (mediaType !== 'application/json') {
      sendJson(res, 415, { ok: false, error: 'content type must be application/json' })
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
          sendJson(res, 200, await filePreview(validated.path, url.searchParams.get('full') === '1'))
        } catch (error) {
          sendJson(res, 200, { ok: false, path: validated.path, error: error instanceof Error ? error.message : String(error) })
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
        // CSRF 围栏与其他 POST 路由一致：只接受 application/json。
        const mediaType = (req.headers['content-type'] ?? '').split(';', 1)[0]?.trim().toLowerCase()
        if (mediaType !== 'application/json') {
          sendJson(res, 415, { ok: false, error: 'content type must be application/json' })
          return
        }
        // 写路由的 path 与 content 都走 POST body（与客户端约定一致）。
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
        // 与 git 相对路径同一围栏：绝对路径内不允许 `..` 段。
        if (validated.path.split('/').some((segment) => segment === '..')) {
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
          sendJson(res, 200, { ok: false, path: validated.path, error: error instanceof Error ? error.message : String(error) })
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
        const mediaType = (req.headers['content-type'] ?? '').split(';', 1)[0]?.trim().toLowerCase()
        if (mediaType !== 'application/json') {
          sendJson(res, 415, { ok: false, error: 'content type must be application/json' })
          return
        }
        const body = await readJsonBody(req)
        const validated = validatedFilePathValue(body?.path)
        if (validated.error !== undefined) {
          sendJson(res, validated.error === 'not a file' ? 200 : 400, { ok: false, path: validated.path, error: validated.error })
          return
        }
        // 与 write / git 相对路径同一围栏：绝对路径内不允许 `..` 段。
        if (validated.path.split('/').some((segment) => segment === '..')) {
          sendJson(res, 200, { ok: false, path: validated.path, error: 'invalid path' })
          return
        }
        try {
          sendJson(res, 200, await openInEditor(validated.path))
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
        // TOCTOU / EMFILE 兜底：statSync 与 createReadStream 之间文件可能被删
        // （或并发媒体请求耗尽 fd），流错误若无监听会变成 uncaughtException
        // 打崩整个宿主进程。这里把 stat 包进 try/catch、给流挂 error 监听，
        // 出错只销毁响应连接，绝不让异常冒泡到进程级。
        let stat
        try {
          stat = statSync(validated.path)
        } catch (error) {
          sendJson(res, 200, { ok: false, path: validated.path, error: `无法读取文件：${error instanceof Error ? error.message : String(error)}` })
          return
        }
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
            createReadStream(validated.path, { start, end })
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
        createReadStream(validated.path)
          .on('error', () => { res.destroy() })
          .pipe(res)
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
      offWrite()
      offOpen()
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
  }, 'dsh-work-git: routes')
}
