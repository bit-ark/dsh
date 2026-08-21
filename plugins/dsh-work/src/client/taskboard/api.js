/**
 * dsh-work taskboard — 客户端 Host API 封装。
 *
 * 浏览器只是异步视图：state 拉全量 snapshot；action 幂等提交并以 Host 返回的
 * snapshot 为唯一已确认状态。requestId 用 crypto.randomUUID 现取。
 */
import { uuid } from './shared.js'

const PREFIX = '/workbench/taskboard'
const REQUEST_TIMEOUT_MS = 15_000

async function readJson(response) {
  // 先取文本再解析：非 JSON/空体（如 404 空响应）给出可读错误，而不是
  // 抛 "Unexpected end of JSON input"。
  const text = await response.text()
  let body
  try {
    body = text === '' ? undefined : JSON.parse(text)
  } catch {
    throw new Error(`taskboard request failed: HTTP ${response.status} returned a non-JSON response`)
  }
  if (!response.ok) {
    throw new Error((body && body.error) || `taskboard request failed: ${response.status}`)
  }
  if (body === undefined) {
    throw new Error(`taskboard request failed: HTTP ${response.status} returned an empty body`)
  }
  return body
}

async function request(url, init) {
  const controller = new AbortController()
  const timeout = globalThis.setTimeout(() => { controller.abort() }, REQUEST_TIMEOUT_MS)
  try {
    return await readJson(await fetch(url, { ...init, signal: controller.signal }))
  } catch (error) {
    if (controller.signal.aborted) throw new Error(`taskboard Host request timed out after ${REQUEST_TIMEOUT_MS / 1000}s`)
    throw error
  } finally {
    globalThis.clearTimeout(timeout)
  }
}

/** 拉取完整 snapshot。 */
export function fetchState() {
  return request(`${PREFIX}/state`, { cache: 'no-store' })
}

/** 拉取执行目标选项（workspaces/presets/permissions）。 */
export function fetchOptions() {
  return request(`${PREFIX}/options`, { cache: 'no-store' })
}

/** 提交一个幂等动作，返回应用后的完整 snapshot。 */
export function sendAction(action) {
  return request(`${PREFIX}/action`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ requestId: uuid(), action }),
  })
}
