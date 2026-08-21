/**
 * dsh-work — git 路由模块（宿主半）。
 *
 * 注册 /workbench/git（状态查询）与 /workbench/git/{init,stage,unstage,
 * stage-all,commit,ignore,unignore}（变更操作）。变更操作共用 mutation
 * 包装：校验 JSON 请求体 → 校验工作目录 → 执行 git 或直调函数 →
 * 返回最新 inspect 快照。
 */
import { failureReason, initRepo, addIgnore, removeIgnore, runGit, inspect, unstagePath } from '../git.js'
import { readJsonBody, validatedCwd, validatedRelPath, validatedMessage } from '../validate.js'
import { sendJson, isJsonRequest, errorMessage } from './shared.js'

/**
 * 构造 git 变更操作 handler。
 *
 * @param {(body: unknown) => ({ error?: string } | { direct: (cwd: string) => Promise<unknown> } | { args: string[], fallback: string })} mutate
 *        请求体 → 操作描述（args = runGit 参数；direct = 直调函数；error = 校验失败）
 * @param {boolean} showIgnoredAfter 操作成功后 inspect 是否携带 ignored 列表
 * @returns {import('node:http').RequestListener} 路由 handler
 */
function mutation(mutate, showIgnoredAfter = false) {
  return async (req, res) => {
    if (req.method !== 'POST') {
      sendJson(res, 405, { ok: false, error: 'method not allowed' })
      return
    }
    if (!isJsonRequest(req)) {
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
      sendJson(res, 200, { ok: false, cwd: validated.cwd, error: errorMessage(error) })
    }
  }
}

/**
 * 注册全部 git 路由。
 *
 * @param {object} ctx 插件上下文（webServer 挂载点）
 * @returns {(() => void)[]} 卸载函数数组（由装配层统一调用）
 */
export function registerGitRoutes(ctx) {
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
        sendJson(res, 200, { ok: false, cwd: validated.cwd, error: errorMessage(error) })
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
      // 无提交的新仓库没有 HEAD，`restore --staged` 会 fatal；
      // unstagePath 内部回退 `rm --cached`（见 git.js）。
      return { direct: (cwd) => unstagePath(cwd, path.path) }
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
  return [offGit, offInit, offStage, offUnstage, offStageAll, offCommit, offIgnore, offUnignore]
}
