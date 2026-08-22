#!/bin/bash
# ============================================================================
#  dsh 一键启动  (DeepSeek Harness Launcher) — 单终端版
#
#  功能：
#   1. 互斥锁保证同一时刻只有一个 launcher 在运行
#      （进程存活 + 命令行匹配 + 终端可见 三重校验，残留锁自动清理/接管）
#   2. 冷启动时检查更新（仅当前停在 dev 分支）：先快速探测仓库主机是否可达
#      （直连 3s，失败走代理探测 3s，都不可达直接跳过）；可达才 git fetch
#      （限时兜底），有更新则对 origin/master 做 --ff-only 快进合并（绝不
#      覆盖本地修改），更新后按需 pnpm install --frozen-lockfile &&
#      pnpm run build
#   3. 如果端口上已有 dsh 服务在运行，先关闭旧服务再重启；
#      若端口被无关进程占用，则拒绝误杀并中止、提示换端口
#   4. 启动 dsh web 服务
#   5. 服务就绪后：浏览器已有 127.0.0.1:<port> 页面则刷新，否则打开新页面
#   6. 驻留循环监听 restart.trigger 信号，收到后在同一终端内重启服务
#      （同终端重启不做更新检查，保持重启快捷）
#
#  环境变量：
#     DSH_WEB_PORT=3081            使用其他端口（必须为 1-65535 的数字）
#     DSH_DRY_RUN=1                启动服务后不打开浏览器、不挂起（测试用；
#                                  同时跳过更新检查）
#     DSH_SKIP_UPDATE=1            显式跳过更新检查
#     DSH_PROXY_HTTP=...           覆盖代理地址（默认 http://127.0.0.1:7897）
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
REPO="${DSH_REPO:-}"
WEB_PORT="${DSH_WEB_PORT:-3080}"
# 端口合法性校验：WEB_PORT 会被拼进 lsof/curl/osascript 等命令串，
# 必须确保是 1-65535 的纯数字，防止注入或诡异报错
case "$WEB_PORT" in
  ''|*[!0-9]*) echo "错误: DSH_WEB_PORT 必须为纯数字 (当前: '${DSH_WEB_PORT:-}')" >&2; exit 1 ;;
esac
if [ "$WEB_PORT" -lt 1 ] || [ "$WEB_PORT" -gt 65535 ]; then
  echo "错误: DSH_WEB_PORT 必须在 1-65535 之间 (当前: ${WEB_PORT})" >&2
  exit 1
fi
WEB_URL="http://127.0.0.1:${WEB_PORT}"
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
LOG_DIR="$HOME/Library/Logs/dsh-launcher"
STATE_DIR="$HOME/Library/Application Support/dsh-launcher"
LOCK_DIR="$STATE_DIR/launcher.lock"
RESTART_TRIGGER="$STATE_DIR/restart.trigger"
# 更新相关
UPSTREAM_REF="origin/master"                 # 更新目标：快进合并的远程引用
DEV_BRANCH="dev"                             # 分支守卫：自动更新仅在该分支上进行
PROBE_TIMEOUT=3                              # 网络探测限时（秒），探测走 DNS+TCP+TLS
DIRECT_TIMEOUT=8                             # 直连 fetch 限时（秒，探测通过后的兜底）
PROXY_TIMEOUT=10                             # 代理 fetch 限时（秒，探测通过后的兜底）
PROXY_URL="${DSH_PROXY_HTTP:-http://127.0.0.1:7897}"
mkdir -p "$LOG_DIR" "$STATE_DIR"
LOG_FILE="$LOG_DIR/launcher.log"

log() { echo "[$(date '+%F %T')] $*" | tee -a "$LOG_FILE"; }

# ---------- 仓库路径解析 ----------
# REPO 优先级：DSH_REPO 环境变量 > 自动探测（当前目录 → 脚本目录逐级向上，
# 找 package.json 里声明 @deepseek-ai/dsh-root 的目录）> 报错提示。
detect_repo() {
  local start_dir
  for start_dir in "$PWD" "$(cd "$(dirname "$0")" && pwd)"; do
    local dir="$start_dir"
    while [ "$dir" != "/" ]; do
      if [ -f "$dir/package.json" ] && grep -q '"name": "@deepseek-ai/dsh-root"' "$dir/package.json" 2>/dev/null; then
        echo "$dir"
        return 0
      fi
      dir="$(dirname "$dir")"
    done
  done
  return 1
}

if [ -z "$REPO" ]; then
  REPO="$(detect_repo)" || true
fi
if [ -z "$REPO" ] && [ -f "$STATE_DIR/repo.config" ]; then
  REPO="$(cat "$STATE_DIR/repo.config" | tr -d '[:space:]')"
fi
if [ -z "$REPO" ] || [ ! -d "$REPO" ]; then
  echo "错误: 无法确定 deepseek-harness 仓库路径，请设置 DSH_REPO=/path/to/deepseek-harness 后再运行" >&2
  exit 1
fi
log "使用仓库路径: $REPO"

# ---------- 工具函数 ----------
say() { osascript -e "display notification \"$1\" with title \"dsh 一键启动\"" >/dev/null 2>&1 || true; }

# 日志轮转：超过 1MB 时移到 .1（只保留最近一代，避免日志无限增长）
rotate_log() {
  local size
  size="$(stat -f %z "$LOG_FILE" 2>/dev/null || echo 0)"
  if [ "$size" -gt 1048576 ]; then
    mv -f "$LOG_FILE" "$LOG_FILE.1" 2>/dev/null || true
  fi
  return 0
}

server_up() {
  curl -sf -o /dev/null --max-time 2 "$WEB_URL" 2>/dev/null
}

# 判断某个 PID 是否为 dsh 服务进程（命令行特征匹配），防止误杀无关进程
is_dsh_process() {
  local cmd
  cmd="$(ps -o command= -p "$1" 2>/dev/null || true)"
  case "$cmd" in
    *"bin.ts web"*|*"dsh web"*) return 0 ;;
    *) return 1 ;;
  esac
}

# 停止端口上的服务。
# 返回 0 = 成功（含端口本来就没有服务）；
# 返回 1 = 失败（端口被无关进程占用而拒绝误杀，或穷尽手段仍无法停止）。
# 注意：判定端口是否空闲一律用变量捕获 lsof 输出，不用 `lsof | grep -q`
# （pipefail 下 grep 提前退出可能让 lsof 收到 SIGPIPE，管道误返回非 0）。
stop_server() {
  local pids p foreign=""
  pids="$(lsof -tiTCP:"$WEB_PORT" -sTCP:LISTEN 2>/dev/null || true)"
  [ -z "$pids" ] && return 0
  # 先验证进程身份：只杀 dsh 服务，绝不误杀占用同一端口的无关进程
  for p in $pids; do
    is_dsh_process "$p" || foreign="$foreign $p"
  done
  if [ -n "$foreign" ]; then
    log "⚠ 端口 ${WEB_PORT} 被非 dsh 进程占用，拒绝误杀 (PID:$foreign)"
    log "   如需避开该进程，请设置 DSH_WEB_PORT 改用其他端口"
    return 1
  fi
  log "正在停止旧服务 (端口 ${WEB_PORT}，进程: $pids)..."
  kill $pids 2>/dev/null || true
  for _ in $(seq 1 10); do
    pids="$(lsof -tiTCP:"$WEB_PORT" -sTCP:LISTEN 2>/dev/null || true)"
    [ -z "$pids" ] && return 0
    sleep 1
  done
  log "旧服务未正常退出，强制终止"
  kill -9 $pids 2>/dev/null || true
  sleep 1
  pids="$(lsof -tiTCP:"$WEB_PORT" -sTCP:LISTEN 2>/dev/null || true)"
  if [ -n "$pids" ]; then
    log "⚠ 端口 ${WEB_PORT} 仍被占用 (PID:$pids)，无法停止"
    return 1
  fi
  return 0
}

# 检查浏览器是否已有目标页面，有则刷新激活，无则打开新页面
open_or_refresh() {
  # 检查 Chrome 是否已有该页面（精确匹配端口边界，
  # 避免子串匹配误中 127.0.0.1:30800 这类相似端口）
  if [ -x "$CHROME_BIN" ]; then
    local result
    result=$(osascript <<EOF 2>/dev/null
tell application "Google Chrome"
    if not running then return "not_found"
    set base to "http://127.0.0.1:${WEB_PORT}"
    repeat with w in windows
        set tabList to tabs of w
        repeat with i from 1 to count of tabList
            set t to item i of tabList
            set u to URL of t
            if u is equal to base or u starts with (base & "/") then
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

# 命令行是否确为 start-dsh.sh（防止 PID 被系统复用给无关进程时误判/误杀）
is_launcher_cmd() {
  local cmd
  cmd="$(ps -o command= -p "$1" 2>/dev/null || true)"
  case "$cmd" in *"start-dsh.sh"*) return 0 ;; *) return 1 ;; esac
}

# 是否为「正在运行且挂在可见终端上」的 launcher。
# 与 dispatch.sh 的 find_launcher 判定标准完全一致：
#   进程存活 + 命令行含 start-dsh.sh + tty 可见（非 "??"）。
is_attached_launcher() {
  local tty
  kill -0 "$1" 2>/dev/null || return 1
  is_launcher_cmd "$1" || return 1
  tty="$(ps -o tty= -p "$1" 2>/dev/null | tr -d ' ')"
  [ -n "$tty" ] && [ "$tty" != "??" ]
}

# ---------- 更新检查与条件构建 ----------
# 限时执行命令（macOS 无 timeout 命令）：后台运行 + 每秒轮询，到点 kill。
# 超时返回 124；否则返回命令自身退出码。输出统一进日志文件。
run_with_timeout() {
  local limit=$1; shift
  "$@" >>"$LOG_FILE" 2>&1 &
  local pid=$! i=0
  while kill -0 "$pid" 2>/dev/null; do
    i=$((i+1))
    if [ "$i" -ge "$limit" ]; then
      kill "$pid" 2>/dev/null || true
      wait "$pid" 2>/dev/null || true
      return 124
    fi
    sleep 1
  done
  wait "$pid" 2>/dev/null
  return $?
}

# 限时 fetch 远程。$1=限时秒数。附加 git 低速超时保护作双保险。
git_fetch() {
  local limit=$1
  run_with_timeout "$limit" git -c http.lowSpeedLimit=1000 -c "http.lowSpeedTime=$limit" fetch origin
}

# 快速网络探测（比等 fetch 挂死快得多）：
#   用 curl HEAD 探测仓库 origin 所在主机，覆盖 DNS+TCP+TLS——与 git fetch
#   完全相同的网络路径（ping 走 ICMP，与 443 命运常不一致，且无法探代理，
#   故不用）。网络不可达时最多 PROBE_TIMEOUT 秒即失败。
#   仅 http(s) origin 需要探测；ssh/本地文件 origin 直接 fetch。
compute_probe_url() {
  PROBE_URL=""
  local url host
  url="$(git remote get-url origin 2>/dev/null || true)"
  case "$url" in
    http://*)  host="${url#http://}";  PROBE_URL="http://${host%%/*}" ;;
    https://*) host="${url#https://}"; PROBE_URL="https://${host%%/*}" ;;
  esac
}
probe_direct() {
  [ -n "$PROBE_URL" ] || return 0
  # 子 shell 中清掉继承的代理变量，保证真的是直连
  ( unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY
    curl -sI --max-time "$PROBE_TIMEOUT" "$PROBE_URL" >/dev/null 2>&1 )
}
probe_via_proxy() {
  [ -n "$PROBE_URL" ] || return 0
  curl -sI --max-time "$PROBE_TIMEOUT" -x "$PROXY_URL" "$PROBE_URL" >/dev/null 2>&1
}

# 检查并应用更新（仅限 dev 分支）：探测+fetch（直连 → 失败走代理）→ 都失败跳过。
# 有更新且可快进（工作区干净 + 无本地提交）则 merge --ff-only $UPSTREAM_REF；
# 成功时置 UPDATED=1 并记录 UPDATED_PREV（供构建失败时回退）。
# 本函数永不阻塞启动：一切异常都只记日志并返回 0。
check_and_apply_update() {
  UPDATED=0
  UPDATED_PREV=""
  local head upstream cur_branch
  head="$(git rev-parse HEAD 2>/dev/null)" || { log "⚠ 仓库不是有效 git 仓库，跳过更新检查"; return 0; }
  cur_branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || true)"
  # 分支守卫：仅当当前确实停在 dev 分支才允许自动合并，防止切在其他
  # 分支/旧 tag 上双击图标时被静默快进到 origin/master
  if [ "$cur_branch" != "$DEV_BRANCH" ]; then
    log "当前不在 ${DEV_BRANCH} 分支 (${cur_branch:-未知})，跳过更新检查"
    return 0
  fi
  compute_probe_url

  log "检查更新（分支: ${cur_branch}，目标: ${UPSTREAM_REF}；探测限时 ${PROBE_TIMEOUT}s，fetch 兜底直连 ${DIRECT_TIMEOUT}s/代理 ${PROXY_TIMEOUT}s）..."
  local fetch_ok=0
  if [ -n "$PROBE_URL" ] && ! probe_direct; then
    # 直连探测不可达：不再浪费 DIRECT_TIMEOUT 等 fetch 挂死，直接试代理
    log "直连探测 ${PROBE_URL} 不可达，尝试代理 ${PROXY_URL} ..."
    if probe_via_proxy; then
      log "代理可达，经代理获取远程信息..."
      if http_proxy="$PROXY_URL" https_proxy="$PROXY_URL" git_fetch "$PROXY_TIMEOUT"; then
        fetch_ok=1
      fi
    else
      log "更新检查跳过（直连与代理探测均不可达），用现有代码启动"
      return 0
    fi
  else
    # 探测可达（或 ssh/本地 origin 无需探测）：直连 fetch
    if ( unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY; git_fetch "$DIRECT_TIMEOUT" ); then
      fetch_ok=1
    else
      log "直连 fetch 失败/超时，尝试代理 ${PROXY_URL} ..."
      if http_proxy="$PROXY_URL" https_proxy="$PROXY_URL" git_fetch "$PROXY_TIMEOUT"; then
        fetch_ok=1
        log "已通过代理获取远程信息"
      fi
    fi
  fi
  if [ "$fetch_ok" != "1" ]; then
    log "更新检查跳过（无法获取远程），用现有代码启动"
    return 0
  fi

  if ! git rev-parse --verify "$UPSTREAM_REF" >/dev/null 2>&1; then
    log "远程分支 ${UPSTREAM_REF} 不存在，跳过更新"
    return 0
  fi
  upstream="$(git rev-parse "$UPSTREAM_REF" 2>/dev/null)"
  if [ "$head" = "$upstream" ]; then
    log "已是最新版本 (${head:0:12})，无需更新"
    return 0
  fi
  if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    log "⚠ 工作区有未提交修改，跳过更新（不覆盖本地修改）"
    return 0
  fi
  if ! git merge-base --is-ancestor HEAD "$UPSTREAM_REF" 2>/dev/null; then
    log "⚠ 本地分支相对 ${UPSTREAM_REF} 有独立提交/已分叉，无法快进，跳过更新"
    return 0
  fi

  UPDATED_PREV="$head"
  log "发现新版本: ${head:0:12} → ${upstream:0:12}，快进合并..."
  if git merge --ff-only "$UPSTREAM_REF" >>"$LOG_FILE" 2>&1; then
    UPDATED=1
    log "✅ 代码已更新到 ${upstream:0:12}"
    say "发现 dsh 新版本，正在重新构建"
  else
    log "⚠ 快进合并失败，跳过更新"
  fi
  return 0
}

# 构建失败处理：若本次更新过代码则回退到更新前提交（合并前工作区已验证干净，
# 回退安全），用旧代码旧产物继续启动。
on_build_failed() {
  log "⚠ 构建失败！"
  if [ "${UPDATED:-0}" = "1" ] && [ -n "${UPDATED_PREV:-}" ]; then
    log "回退到更新前提交 (${UPDATED_PREV:0:12})，用旧版本启动..."
    if git reset --hard "$UPDATED_PREV" >>"$LOG_FILE" 2>&1; then
      log "已回退，本次更新撤销"
    else
      log "⚠ 回退失败，请手动检查仓库状态！"
    fi
  fi
  log "   构建日志详见: tail -50 $LOG_FILE"
}

# 条件构建：满足任一即执行 pnpm install && pnpm run build——
#   (a) 刚更新了代码  (b) 构建记录与当前提交不一致  (c) apps/web/dist 缺失。
# 构建成功后把当前提交写入 last-built-commit。
maybe_build() {
  local just_updated=$1
  local head record need_build=0 reason=""
  head="$(git rev-parse HEAD 2>/dev/null)" || return 0
  record="$(cat "$STATE_DIR/last-built-commit" 2>/dev/null | tr -d ' ' || true)"

  if [ "$just_updated" = "1" ]; then
    need_build=1; reason="代码刚更新"
  elif [ "$record" != "$head" ]; then
    need_build=1; reason="构建记录与当前提交不一致"
  elif [ ! -d "$REPO/apps/web/dist" ]; then
    need_build=1; reason="构建产物缺失"
  fi

  if [ "$need_build" != "1" ]; then
    log "构建产物与当前提交一致 (${head:0:12})，跳过构建"
    return 0
  fi

  if ! command -v pnpm >/dev/null 2>&1; then
    log "⚠ 未找到 pnpm，无法构建"
    on_build_failed
    return 0
  fi

  log "开始构建（${reason}）：pnpm install ..."
  # --frozen-lockfile：自动构建禁止改写 lockfile（保证可复现、不弄脏仓库）；
  # lockfile 与 package.json 不一致时直接失败，交给 on_build_failed 处理
  if ! pnpm install --frozen-lockfile >>"$LOG_FILE" 2>&1; then
    on_build_failed
    return 0
  fi
  log "pnpm install 完成，开始 pnpm run build ..."
  if ! pnpm run build >>"$LOG_FILE" 2>&1; then
    on_build_failed
    return 0
  fi
  echo "$head" >"$STATE_DIR/last-built-commit"
  log "✅ 构建完成 (${head:0:12})"
}

# ---------- 日志轮转 ----------
rotate_log

# ---------- 互斥锁：避免重复启动（三重校验 + 残留锁自愈） ----------
if mkdir "$LOCK_DIR" 2>/dev/null; then
  :
else
  LOCK_HOLDER="$(cat "$LOCK_DIR/pid" 2>/dev/null | tr -d ' ' || true)"
  if [ -n "$LOCK_HOLDER" ] && is_attached_launcher "$LOCK_HOLDER"; then
    log "已有启动流程在运行，本次忽略"
    exit 0
  fi
  # 进程活着、命令行确为 start-dsh.sh、但已脱离终端（如 Terminal 异常退出
  # 后的残留进程）：先结束它再接管，避免旧驻留循环与本实例争抢重启信号。
  # 注意：若 PID 已被复用给无关进程（命令行不符），绝不 kill，只清理锁。
  if [ -n "$LOCK_HOLDER" ] && kill -0 "$LOCK_HOLDER" 2>/dev/null && is_launcher_cmd "$LOCK_HOLDER"; then
    log "检测到脱离终端的残留 launcher (PID $LOCK_HOLDER)，清理后接管..."
    kill "$LOCK_HOLDER" 2>/dev/null || true
    for _ in $(seq 1 5); do
      kill -0 "$LOCK_HOLDER" 2>/dev/null || break
      sleep 1
    done
    kill -9 "$LOCK_HOLDER" 2>/dev/null || true
    sleep 1
  fi
  log "检测到残留锁，自动清理后继续"
  rm -rf "$LOCK_DIR"
  # 抢锁失败（另一实例恰好同时接管）则直接退出，绝不无锁运行
  if ! mkdir "$LOCK_DIR" 2>/dev/null; then
    log "⚠ 无法获取互斥锁（另一实例正在启动），本次退出"
    exit 0
  fi
fi
# 在写入 pid 之前清掉历史残留的重启信号：既避免启动即误触发一次多余重启，
# 也保证 dispatch.sh 在 pid 可见之后才写入的新信号不会被误清（消除竞态）。
rm -f "$RESTART_TRIGGER"
echo $$ >"$LOCK_DIR/pid"
trap 'rm -rf "$LOCK_DIR"' EXIT

# ---------- 进入仓库 ----------
cd "$REPO" || { log "错误: 无法进入仓库目录 $REPO"; exit 1; }

log "================ dsh 启动 ================"

# ---------- 更新检查 + 条件构建（仅冷启动；同终端重启不走这里） ----------
# 放在停止旧服务之前：更新/构建期间旧服务继续运行，最小化不可用时间。
if [ "${DSH_DRY_RUN:-0}" = "1" ]; then
  log "(dry-run) 跳过更新检查"
elif [ "${DSH_SKIP_UPDATE:-0}" = "1" ]; then
  log "DSH_SKIP_UPDATE=1，跳过更新检查"
else
  check_and_apply_update
  maybe_build "${UPDATED:-0}"
fi

# ---------- 服务已在运行 → 关闭后重启 ----------
if server_up; then
  log "检测到 dsh 服务正在运行 ($WEB_URL)，正在重启..."
  if ! stop_server; then
    log "⚠ 现有服务无法停止，本次启动中止"
    exit 1
  fi
  log "✅ 旧服务已停止"
fi

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
# 注意：同终端重启不做更新检查，保持重启快捷。
log "（双击桌面图标可在本终端内重启服务）"
while true; do
  # 原子认领信号：mv 成功即独占本次请求，消除「判断存在与删除之间」
  # dispatch 恰好再次写入导致新信号被误删的竞态窗口
  if mv "$RESTART_TRIGGER" "$RESTART_TRIGGER.doing" 2>/dev/null; then
    rm -f "$RESTART_TRIGGER.doing"
    rotate_log
    log "收到重启请求，正在同一终端内重启服务..."
    if ! stop_server; then
      log "⚠ 无法停止旧服务，跳过本次重启（可稍后再次双击重试）"
    elif start_and_wait; then
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
