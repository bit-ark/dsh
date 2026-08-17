/**
 * dsh-restart — 宿主半（Node，macOS 专用）。
 *
 * 提供"重启 dsh web 服务"的 JSON 路由，供侧边栏「重启服务」按钮驱动：
 *
 *   GET  /service/status   → { ok, pid, cwd, port, platform, logPath, lastLog }
 *   POST /service/restart  → { ok, message }（4 秒内重复触发被拒绝）
 *
 * 重启语义（与终端协同，保持终端归属）：
 *  - 写入重启助手脚本 ~/.dsh/restart-helper.sh，用 detached 子进程执行并立即
 *    返回（脚本 sleep delayMs 让 HTTP 响应先送达浏览器，再杀当前进程）。
 *  - 脚本终止 3080 上命令匹配 `bin.ts web` 的进程及其 pnpm 包装父进程，等端口
 *    释放后，通过 osascript 把 `cd <cwd> && <command>` 发进**同一个服务终端
 *    窗口**（标题匹配 pnpm dsh web / node ◂）；窗口已关则开新窗口；osascript
 *    不可用（权限被拒）则回退为 nohup 无终端重启，保证服务一定能回来。
 *  - 全程写日志到 config.logPath（默认 ~/.dsh/restart.log），结尾 curl 自检。
 *
 * 平台限制：Terminal.app 控制（osascript）仅 macOS；非 darwin 平台 POST 直接
 * 返回错误。参数全部来自插件 config，默认值贴合现状。
 */
import { spawn } from 'node:child_process'
import { homedir } from 'node:os'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

export const name = 'dsh-restart'

/** 路由注册在 web 表面的路由表上（cordis reflect guard 要求声明）。 */
export const inject = ['webServer']

/** DSH 数据根目录：$DSH_HOME > ~/.dsh。 */
function dshHome() {
  const configured = process.env.DSH_HOME
  return typeof configured === 'string' && configured.trim().length > 0
    ? resolve(configured.trim())
    : join(homedir(), '.dsh')
}

/** 合并插件配置与默认值。 */
function resolveConfig(config) {
  return {
    cwd: typeof config?.cwd === 'string' && config.cwd.length > 0 ? config.cwd : process.cwd(),
    command: typeof config?.command === 'string' && config.command.length > 0 ? config.command : 'pnpm dsh web',
    port: Number.isInteger(config?.port) ? config.port : 3080,
    delayMs: Number.isInteger(config?.delayMs) && config.delayMs > 0 ? config.delayMs : 4000,
    logPath: typeof config?.logPath === 'string' && config.logPath.length > 0
      ? config.logPath
      : join(dshHome(), 'restart.log'),
    helperPath: typeof config?.helperPath === 'string' && config.helperPath.length > 0
      ? config.helperPath
      : join(dshHome(), 'restart-helper.sh'),
  }
}

/**
 * 生成重启助手脚本（bash）。逻辑与手动验证过的重启流程一致：
 * 延迟 → 定位服务终端窗口 → 停服务 → 同窗口拉起（或新窗口 / nohup 回退）→ 自检。
 * 导出供测试（bash -n 校验生成结果）。
 */
export function buildHelperScript(cfg) {
  const delaySec = Math.max(1, Math.round(cfg.delayMs / 1000))
  // cwd 以单引号包裹后嵌入 osascript 的 do script 字符串：路径含空格也能
  // 正确 cd；路径本身含单引号时按 shell 规则 '\'' 转义。cwd 来自插件配置
  // （管理员可信输入），这里只是防御路径含空格的常见场景。
  const quotedCwd = "'" + String(cfg.cwd).replace(/'/g, `'\\''`) + "'"
  return `#!/bin/bash
# dsh-restart helper（由 dsh-restart 插件生成，${new Date().toISOString()}）
LOG="${cfg.logPath}"
exec >> "$LOG" 2>&1
echo "=== dsh-restart trigger $(date '+%F %T') ==="

sleep ${delaySec}

# 1) 定位服务终端窗口（标题含 pnpm dsh web / node ◂ 的窗口），稍后复用
TARGET_ID=""
for wid in $(osascript -e 'tell application "Terminal" to get id of every window' 2>/dev/null | tr -d ','); do
  nm=$(osascript -e "tell application \\"Terminal\\" to get name of window id $wid" 2>/dev/null)
  case "$nm" in
    *"pnpm dsh web"*|*"bin.ts web"*|*"bin.js web"*|*"node ◂"*) TARGET_ID="$wid"; echo "target window $wid: $nm" ;;
  esac
done

# 2) 停服务：监听者（bin.ts / bin.js web）+ 其 pnpm 包装父进程，等端口释放
SERVERS=$(lsof -t -nP -iTCP:${cfg.port} -sTCP:LISTEN 2>/dev/null)
echo "server(s) before kill: \${SERVERS:-none}"
for pid in $SERVERS; do
  cmd=$(ps -p "$pid" -o command= 2>/dev/null)
  case "$cmd" in
    *"bin.ts web"*|*"bin.js web"*)
      ppid=$(ps -p "$pid" -o ppid= 2>/dev/null | tr -d ' ')
      kill -TERM "$pid" 2>/dev/null && echo "TERM server $pid"
      if [ -n "$ppid" ] && ps -p "$ppid" >/dev/null 2>&1; then
        pcmd=$(ps -p "$ppid" -o command= 2>/dev/null)
        case "$pcmd" in
          *pnpm*) kill -TERM "$ppid" 2>/dev/null && echo "TERM pnpm wrapper $ppid" ;;
        esac
      fi
      ;;
  esac
done
for i in $(seq 1 20); do
  if ! lsof -nP -iTCP:${cfg.port} -sTCP:LISTEN >/dev/null 2>&1; then break; fi
  sleep 1
done
sleep 1
if lsof -nP -iTCP:${cfg.port} -sTCP:LISTEN >/dev/null 2>&1; then
  echo "FAIL: port ${cfg.port} still held; abort"
  exit 1
fi

# 3) 拉起：优先同终端窗口，其次新窗口，最后 nohup 无终端回退
RESTARTED=0
if [ -n "$TARGET_ID" ] && osascript -e "tell application \\"Terminal\\" to get name of window id $TARGET_ID" >/dev/null 2>&1; then
  osascript -e "tell application \\"Terminal\\" to do script \\"cd ${quotedCwd} && ${cfg.command}\\" in window id $TARGET_ID" 2>&1
  echo "do script in window $TARGET_ID exit=$?"
  RESTARTED=1
fi
if [ "$RESTARTED" != 1 ]; then
  echo "terminal relaunch unavailable; falling back to detached restart"
  cd "${cfg.cwd}" || exit 1
  nohup ${cfg.command} >> "$LOG" 2>&1 &
fi

# 4) 自检
for i in $(seq 1 60); do
  code=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:${cfg.port}/ 2>/dev/null)
  if [ -n "$code" ] && [ "$code" != "000" ]; then
    echo "UP after \${i}s: HTTP $code"
    exit 0
  fi
  sleep 1
done
echo "FAIL: timed out waiting for ${cfg.port}"
exit 1
`
}

/** 读取日志尾部（供状态页/调试展示）。 */
function logTail(cfg, lines = 10) {
  if (!existsSync(cfg.logPath)) return null
  try {
    const text = readFileSync(cfg.logPath, 'utf8')
    const parts = text.trim().split('\n')
    return parts.slice(-lines).join('\n')
  } catch {
    return null
  }
}

export function apply(ctx, config) {
  const cfg = resolveConfig(config)

  /** 防抖：上次触发时间（ms）。4 秒窗口内重复触发被拒绝。 */
  let lastTrigger = 0

  const sendJson = (res, code, payload) => {
    res.writeHead(code, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    })
    res.end(JSON.stringify(payload))
  }

  const readJsonBody = (req) => new Promise((resolveBody, reject) => {
    let data = ''
    let settled = false
    const fail = (error) => {
      if (!settled) {
        settled = true
        reject(error)
      }
    }
    req.setEncoding('utf8')
    req.on('data', (chunk) => {
      if (settled) return
      data += chunk
      if (data.length > 64 * 1024) {
        fail(new Error('请求体过大'))
        return
      }
    })
    req.on('end', () => {
      if (settled) return
      settled = true
      try {
        resolveBody(data.length === 0 ? {} : JSON.parse(data))
      } catch {
        reject(new Error('请求体不是有效 JSON'))
      }
    })
    req.on('error', fail)
  })

  ctx.effect(() => {
    const disposers = [
      ctx.webServer.register({
        kind: 'exact',
        path: '/service/status',
        handler: (req, res) => {
          if (req.method !== 'GET') {
            sendJson(res, 405, { ok: false, error: 'method not allowed' })
            return
          }
          sendJson(res, 200, {
            ok: true,
            pid: process.pid,
            cwd: process.cwd(),
            port: cfg.port,
            platform: process.platform,
            logPath: cfg.logPath,
            lastLog: logTail(cfg),
          })
        },
      }),
      ctx.webServer.register({
        kind: 'exact',
        path: '/service/restart',
        handler: async (req, res) => {
          if (req.method !== 'POST') {
            sendJson(res, 405, { ok: false, error: 'method not allowed' })
            return
          }
          // CSRF 围栏：与 harness /api 面同款约定——只收 application/json。
          // 否则恶意页面可用「简单请求」跨站盲发重启，把本地服务反复拉起
          // 再掐断（DoS）；重启还会写 ~/.dsh/restart.log，同样不该被跨站触发。
          const mediaType = (req.headers['content-type'] ?? '').split(';', 1)[0]?.trim().toLowerCase()
          if (mediaType !== 'application/json') {
            sendJson(res, 415, { ok: false, error: 'content type must be application/json' })
            return
          }
          try {
            await readJsonBody(req)
          } catch (error) {
            sendJson(res, 200, { ok: false, error: error instanceof Error ? error.message : String(error) })
            return
          }
          if (process.platform !== 'darwin') {
            sendJson(res, 200, { ok: false, error: '重启服务功能仅支持 macOS（需控制 Terminal.app）' })
            return
          }
          const now = Date.now()
          if (now - lastTrigger < cfg.delayMs + 1000) {
            sendJson(res, 200, { ok: false, error: '服务正在重启中，请稍候再试' })
            return
          }
          lastTrigger = now
          try {
            mkdirSync(dshHome(), { recursive: true })
            writeFileSync(cfg.helperPath, buildHelperScript(cfg), { mode: 0o755 })
            // detached: true → 独立进程组/会话，宿主被杀后脚本继续执行；unref 不阻塞事件循环。
            spawn('bash', [cfg.helperPath], { detached: true, stdio: 'ignore' }).unref()
          } catch (error) {
            sendJson(res, 200, { ok: false, error: `重启助手启动失败：${error instanceof Error ? error.message : String(error)}` })
            return
          }
          sendJson(res, 200, {
            ok: true,
            message: `重启已触发，约 ${Math.round(cfg.delayMs / 1000)} 秒后生效；服务将在终端窗口重新拉起，页面会短暂离线`,
          })
        },
      }),
    ]
    return () => {
      for (const dispose of disposers) dispose()
    }
  })
}
