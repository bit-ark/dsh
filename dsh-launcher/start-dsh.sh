#!/bin/bash
# ============================================================================
#  dsh 一键启动  (DeepSeek Harness Launcher) — 单终端版
#
#  功能：
#   1. 互斥锁保证同一时刻只有一个 launcher 在运行
#   2. 如果服务已在运行，先关闭旧服务再重启
#   3. 启动 dsh web 服务
#   4. 服务就绪后：浏览器已有 127.0.0.1:<port> 页面则刷新，否则打开新页面
#   5. 驻留循环监听 restart.trigger 信号，收到后在同一终端内重启服务
#
#  环境变量：
#     DSH_WEB_PORT=3081            使用其他端口
#     DSH_DRY_RUN=1                启动服务后不打开浏览器、不挂起（测试用）
#
#  单终端原理（配合 dispatch.sh）：
#   - dispatch.sh 在开新窗口前先探测本脚本是否已在运行：已运行则只写
#     restart.trigger 信号文件并激活旧窗口，不新开窗口；未运行才新开。
#   - 本脚本启动服务后进入驻留循环轮询 restart.trigger，收到信号就
#     stop_server → 重启服务 → 刷新浏览器，全程同一终端。
#   - 因此无需关闭窗口、无需 System Events、无需辅助功能权限，窗口不再堆积。
# ============================================================================
set -u
set -o pipefail

# ---------- 配置 ----------
REPO="/Users/dl/DL/github/deepseek-harness"
WEB_PORT="${DSH_WEB_PORT:-3080}"
WEB_URL="http://127.0.0.1:${WEB_PORT}"
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
LOG_DIR="$HOME/Library/Logs/dsh-launcher"
STATE_DIR="$HOME/Library/Application Support/dsh-launcher"
LOCK_DIR="$STATE_DIR/launcher.lock"
RESTART_TRIGGER="$STATE_DIR/restart.trigger"
mkdir -p "$LOG_DIR" "$STATE_DIR"
LOG_FILE="$LOG_DIR/launcher.log"

# ---------- 工具函数 ----------
log() { echo "[$(date '+%F %T')] $*" | tee -a "$LOG_FILE"; }

say() { osascript -e "display notification \"$1\" with title \"dsh 一键启动\"" >/dev/null 2>&1 || true; }

server_up() {
  curl -sf -o /dev/null --max-time 2 "$WEB_URL" 2>/dev/null
}

stop_server() {
  local pids
  pids=$(lsof -tiTCP:"$WEB_PORT" -sTCP:LISTEN 2>/dev/null)
  [ -z "$pids" ] && return 0
  log "正在停止旧服务 (端口 ${WEB_PORT}，进程: $pids)..."
  kill $pids 2>/dev/null || true
  for _ in $(seq 1 10); do
    if ! lsof -tiTCP:"$WEB_PORT" -sTCP:LISTEN 2>/dev/null | grep -q .; then
      return 0
    fi
    sleep 1
  done
  log "旧服务未正常退出，强制终止"
  lsof -tiTCP:"$WEB_PORT" -sTCP:LISTEN 2>/dev/null | xargs kill -9 2>/dev/null || true
  sleep 1
}

# 检查浏览器是否已有目标页面，有则刷新激活，无则打开新页面
open_or_refresh() {
  local url="127.0.0.1:${WEB_PORT}"

  # 检查 Chrome 是否已有该页面（Chrome 未运行也不报错）
  if [ -x "$CHROME_BIN" ]; then
    local result
    result=$(osascript <<EOF 2>/dev/null
tell application "Google Chrome"
    if not running then return "not_found"
    repeat with w in windows
        set tabList to tabs of w
        repeat with i from 1 to count of tabList
            set t to item i of tabList
            if URL of t contains "${url}" then
                reload t
                set active tab index of w to i
                activate
                return "found"
            end if
        end repeat
    end repeat
end tell
return "not_found"
EOF
)
    if [ "$result" = "found" ]; then
      log "已刷新 Chrome 中已有的页面: $WEB_URL"
      return 0
    fi
  fi

  # 没有已有页面，打开新窗口
  if [ -x "$CHROME_BIN" ]; then
    open -na "Google Chrome" --args --incognito "$WEB_URL"
    log "已打开 Chrome 无痕窗口: $WEB_URL"
  else
    open "$WEB_URL"
    log "未找到 Chrome，已用默认浏览器打开: $WEB_URL"
  fi
}

# 启动服务并等待就绪（最长 2 分钟）；成功返回 0，失败返回 1
start_and_wait() {
  nohup pnpm dsh web --no-open --port "$WEB_PORT" >>"$LOG_FILE" 2>&1 &
  local pid=$!
  disown "$pid" 2>/dev/null || true
  local ready=0
  for _ in $(seq 1 120); do
    if server_up; then ready=1; break; fi
    if ! kill -0 "$pid" 2>/dev/null; then break; fi
    sleep 1
  done
  [ "$ready" = "1" ]
}

# ---------- 互斥锁：避免重复双击导致重复启动（带 PID 自愈） ----------
if mkdir "$LOCK_DIR" 2>/dev/null; then
  echo $$ >"$LOCK_DIR/pid"
else
  LOCK_HOLDER="$(cat "$LOCK_DIR/pid" 2>/dev/null || true)"
  if [ -n "$LOCK_HOLDER" ] && kill -0 "$LOCK_HOLDER" 2>/dev/null; then
    log "已有启动流程在运行，本次忽略"
    exit 0
  fi
  log "检测到残留锁，自动清理后继续"
  rm -rf "$LOCK_DIR"
  mkdir "$LOCK_DIR" && echo $$ >"$LOCK_DIR/pid"
fi
trap 'rm -rf "$LOCK_DIR"' EXIT

# 清掉上一次运行可能残留的重启信号（避免启动即误触发一次多余重启）；
# 之后（含启动过程中）新产生的重启信号由下面的驻留循环处理。
rm -f "$RESTART_TRIGGER"

# ---------- 服务已在运行 → 关闭后重启 ----------
if server_up; then
  log "检测到 dsh 服务正在运行 ($WEB_URL)，正在重启..."
  stop_server
  if server_up; then
    log "⚠ 旧服务未能完全停止，本次重启中止"
    exit 1
  fi
  log "✅ 旧服务已停止"
fi

# ---------- 进入仓库 ----------
cd "$REPO" || { log "错误: 无法进入仓库目录 $REPO"; exit 1; }

log "================ dsh 启动 ================"

# ---------- 启动服务 ----------
log "正在启动 dsh web 服务..."
if ! start_and_wait; then
  log "⚠ 服务启动失败或超时，最近日志："
  tail -30 "$LOG_FILE"
  exit 1
fi

log "✅ dsh 服务已就绪: $WEB_URL"
log "   日志文件: $LOG_FILE"
log "   停止服务: pkill -f 'apps/cli/src/bin.ts web'"

if [ "${DSH_DRY_RUN:-0}" = "1" ]; then
  log "(dry-run) 跳过打开浏览器"
  exit 0
fi

open_or_refresh
say "dsh 已启动 ✔"

# ---------- 驻留循环：监听重启信号，实现「同一终端内重启」 ----------
# 不再用 tail -f 阻塞，而是轮询 restart.trigger。dispatch.sh 在已有 launcher
# 运行时只 touch 该文件，本循环收到后在同一终端内重启服务，窗口不再堆积。
log "（双击桌面图标可在本终端内重启服务）"
while true; do
  if [ -f "$RESTART_TRIGGER" ]; then
    rm -f "$RESTART_TRIGGER"
    log "收到重启请求，正在同一终端内重启服务..."
    stop_server
    if start_and_wait; then
      log "✅ dsh 服务已就绪: $WEB_URL"
      open_or_refresh
      say "dsh 已重启 ✔"
    else
      log "⚠ 服务重启失败，最近日志："
      tail -30 "$LOG_FILE"
    fi
  fi
  sleep 1
done
