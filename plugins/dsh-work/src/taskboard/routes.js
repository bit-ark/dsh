/**
 * dsh-work taskboard — /workbench/taskboard/* 同源路由。
 *
 * 契约（与 dsh-work 现有 /workbench/* 同一访问姿态，依赖 dsh web 自身绑定边界）：
 *
 *   GET  /workbench/taskboard/state    → 完整 revision snapshot
 *   POST /workbench/taskboard/action   → 幂等动作（JSON，普通动作 ≤64KiB），
 *                                        返回应用后的完整 snapshot
 *   GET  /workbench/taskboard/options  → 执行目标选项：workspaces + agentPresets + permissions
 *
 * 动作载荷走 protocol.js 的严格判别联合校验；浏览器不能写入 scheduler
 * 独占时间戳或 execution 结果。
 *
 * Ported (routes shape) from zhu1090093659/dsh-web-ui packages/dsh-task-board
 * src/host-routes.ts (Apache-2.0)。移植裁剪：去掉 SSE（客户端轮询）与
 * 受信反代 token；访问姿态与 dsh-work 既有路由保持一致。
 */
import { TASKBOARD_API_PREFIX, parseActionEnvelope } from './protocol.js'
import { TASK_PERMISSIONS } from './domain.js'

const ACTION_LIMIT = 64 * 1024

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  res.end(JSON.stringify(body))
}

async function readBody(req) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > ACTION_LIMIT) throw new Error('body-too-large')
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  return { raw, value: JSON.parse(raw) }
}

function rpc(payload) {
  return { rpcId: `dsh-work-taskboard-${crypto.randomUUID()}`, payload }
}

/**
 * 注册 taskboard 路由。
 * @param {object} ctx 插件上下文（webServer + apiProxy）。
 * @param {import('./service.js').TaskboardHostService} service
 * @returns {() => void} disposer 注销全部路由。
 */
export function registerTaskboardRoutes(ctx, service) {
  const state = ctx.webServer.register({
    kind: 'exact',
    path: `${TASKBOARD_API_PREFIX}/state`,
    handler: (req, res) => {
      if (req.method !== 'GET') return json(res, 405, { ok: false, error: 'method-not-allowed' })
      json(res, 200, service.snapshot())
    },
  })
  const action = ctx.webServer.register({
    kind: 'exact',
    path: `${TASKBOARD_API_PREFIX}/action`,
    handler: async (req, res) => {
      if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'method-not-allowed' })
      if (!(req.headers['content-type'] ?? '').toLowerCase().startsWith('application/json')) {
        return json(res, 415, { ok: false, error: 'json-required' })
      }
      try {
        const body = await readBody(req)
        const parsed = parseActionEnvelope(body.value)
        if (parsed === undefined) return json(res, 400, { ok: false, error: 'invalid-action' })
        json(res, 200, service.apply(parsed.requestId, parsed.action))
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        json(res, message === 'body-too-large' ? 413 : 400, { ok: false, error: message })
      }
    },
  })
  const options = ctx.webServer.register({
    kind: 'exact',
    path: `${TASKBOARD_API_PREFIX}/options`,
    handler: async (req, res) => {
      if (req.method !== 'GET') return json(res, 405, { ok: false, error: 'method-not-allowed' })
      const payload = { permissions: TASK_PERMISSIONS, workspaces: [], presets: [] }
      try {
        const workspaces = await ctx.apiProxy.workspace.list(rpc({}))
        if (workspaces.result.ok) {
          payload.workspaces = workspaces.result.value.items.map(item => ({
            workspaceId: item.workspaceId,
            title: item.title !== '' ? item.title : item.path,
          }))
        }
      } catch { /* 选项读取失败保持空列表，选择器仍可用 */ }
      try {
        const presets = await ctx.apiProxy.agentPresets.list(rpc({}))
        if (presets.result.ok) {
          payload.presets = presets.result.value.presets.map(preset => ({
            id: preset.id,
            name: preset.name,
            description: preset.description,
            broken: preset.broken,
            isDefault: preset.isDefault,
          }))
        }
      } catch { /* 同上 */ }
      json(res, 200, payload)
    },
  })
  return () => {
    state()
    action()
    options()
  }
}
