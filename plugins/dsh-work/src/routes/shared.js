/**
 * dsh-work — /workbench/* 路由共享 helper（宿主半）。
 *
 * 各功能路由模块（git / files / browser / terminal）共用这里的响应
 * 写入与请求类型判断，避免每个 handler 重复拼 writeHead/end。
 */

/** 发送 JSON 响应（带 no-store，防面板数据被缓存）。 */
export function sendJson(res, code, payload) {
  res.writeHead(code, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(JSON.stringify(payload))
}

/** 发送 HTML 响应（带 no-store / no-referrer，供浏览器沙箱代理等使用）。 */
export function sendHtml(res, code, html) {
  res.writeHead(code, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store',
    'referrer-policy': 'no-referrer',
  })
  res.end(html)
}

/** HTML 转义（沙箱代理把远端错误信息拼进页面时防注入）。 */
export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

/** 请求是否携带 application/json 内容类型（POST 类路由的统一 415 围栏）。 */
export function isJsonRequest(req) {
  const mediaType = (req.headers['content-type'] ?? '').split(';', 1)[0]?.trim().toLowerCase()
  return mediaType === 'application/json'
}

/** 统一的错误提取：Error 实例取 message，其余转字符串。 */
export function errorMessage(error) {
  return error instanceof Error ? error.message : String(error)
}
