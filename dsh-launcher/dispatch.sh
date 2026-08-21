#!/bin/bash
# ============================================================================
#  dispatch.sh —— dsh 一键启动的「双击入口」调度器
#
#  由桌面 applet 调用（install.sh 生成的 applet 不再直接 open 脚本，而是
#  调本脚本）。职责：决定「原地重启已有服务」还是「新开终端窗口」，并保证
#  **永远只开一个新窗口**。
#
#  逻辑：
#    - 先原子地抢「开窗决定权」锁 dispatch.lock（mkdir 原子性）：
#        · 抢到锁 → 探测 launcher：有 → 原地重启（不新开窗口）；
#          无 → 开新窗口，并让锁延迟 5 秒释放，覆盖 start-dsh.sh 被 Terminal
#          拉起的窗口期，防止两次双击在 launcher 进程尚未起来前都判定
#          「无 launcher」而各开一个窗口（竞态）。
#        · 没抢到锁 → 说明另一个 dispatch 正在开新窗口：若 launcher 已就绪
#          则发重启信号并激活，否则只激活，**绝不新开窗口**。
#    - 锁带过期自愈：占锁者正常 5 秒内释放，超过 8 秒视为残留锁自动清理，
#      避免 dispatch 被卡死、永远开不了新窗口。
#
#  好处：不再依赖窗口标题匹配、不再用 System Events、不再需要辅助功能权限，
#  也不会再出现「窗口越积越多」的问题。
#
#  用法: bash dispatch.sh（由 applet 调用，也可手动执行）
# ============================================================================
set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
STATE_DIR="$HOME/Library/Application Support/dsh-launcher"
TRIGGER="$STATE_DIR/restart.trigger"
LAUNCH_LOCK="$STATE_DIR/dispatch.lock"
mkdir -p "$STATE_DIR"

# 探测：返回一个仍在运行、且仍挂在可见终端（tty != "??"）上的 launcher 进程 PID。
# 不再用 pgrep -f（会误匹配命令行里含 "start-dsh.sh" 的无关进程，如 grep / vim /
# agent 跑的命令、甚至含该字符串的 bash -c），而是直接读 launcher.lock/pid ——
# start-dsh.sh 启动时把自己的 PID 写进锁文件（见 start-dsh.sh 第 121-133 行），
# 精确无歧义。tty 为 "??" 说明该进程已脱离终端（窗口已关但进程残留），按不存在处理。
find_launcher() {
  local pid_file="$STATE_DIR/launcher.lock/pid"
  local p tty
  [ -f "$pid_file" ] || return 1
  p="$(cat "$pid_file" 2>/dev/null | tr -d ' ')"
  [ -n "$p" ] || return 1
  # 验活：进程已退出（或 PID 被回收）则视为无 launcher
  kill -0 "$p" 2>/dev/null || return 1
  tty="$(ps -o tty= -p "$p" 2>/dev/null | tr -d ' ')"
  if [ -n "$tty" ] && [ "$tty" != "??" ]; then
    echo "$p"
    return 0
  fi
  return 1
}

notify() { osascript -e "display notification \"$1\" with title \"dsh 一键启动\"" >/dev/null 2>&1 || true; }

# 清理过期锁：占锁者正常 5 秒内释放，超过 8 秒视为残留，自动清理。
if [ -d "$LAUNCH_LOCK" ]; then
  mtime="$(stat -f %m "$LAUNCH_LOCK" 2>/dev/null || echo 0)"
  now="$(date +%s)"
  if [ $(( now - mtime )) -gt 8 ]; then
    rm -rf "$LAUNCH_LOCK"
  fi
fi

if mkdir "$LAUNCH_LOCK" 2>/dev/null; then
  # ---- 抢到锁：唯一决定「开不开新窗口」的 dispatch ----
  if pid="$(find_launcher)" && [ -n "$pid" ]; then
    # 已有运行中的 launcher：释放锁，发重启信号，激活旧窗口（不新开窗口）
    rm -rf "$LAUNCH_LOCK"
    touch "$TRIGGER"
    open -a Terminal
    notify "已请求重启 dsh 服务"
  else
    # 无运行中的 launcher：新开一个终端窗口，并让锁 5 秒后释放（覆盖
    # start-dsh.sh 被拉起的窗口期，防止紧接着的第二次双击竞态多开窗口）。
    open -a Terminal "$SCRIPT_DIR/start-dsh.sh"
    # 后台子 shell 必须重定向 stdout/stderr：否则它继承 do shell script 的管道，
    # applet 会等管道 EOF 才返回（实测卡满 5 秒），期间再次双击会被单实例 applet
    # 吞掉。重定向后 applet 立即返回，锁照常在 5 秒后释放。
    ( sleep 5; rm -rf "$LAUNCH_LOCK" 2>/dev/null ) >/dev/null 2>&1 &
  fi
else
  # ---- 没抢到锁：另一个 dispatch 正在开新窗口 ----
  # launcher 可能已就绪（发重启信号）或仍在启动（只激活）；无论哪种都不新开窗口。
  if find_launcher >/dev/null 2>&1; then
    touch "$TRIGGER"
    notify "已请求重启 dsh 服务"
  fi
  open -a Terminal
fi
