#!/bin/bash
# ============================================================================
#  install.sh —— 生成 dsh 一键启动应用，桌面放置快捷方式
#
#  原理：用 osacompile 生成「原生 Mach-O applet 应用」（LaunchServices 可直接
#  双击启动，脚本作可执行文件在新版 macOS 会被拒绝），applet 调用 dispatch.sh
#  决定「原地重启已有服务」还是「新开终端窗口」（无需 Apple Events 权限）。
#
#  为什么装在 ~/Library 而不是桌面：macOS 把「桌面文件夹」列为 TCC 受保护
#  目录，app 放在桌面时每次双击都会弹「想要访问桌面文件夹」权限提示（实测
#  会卡住启动）；装到非保护目录后桌面只放一个 Finder 替身（alias），双击替身
#  打开的是非保护目录里的 app，不再触发权限提示，且能正确显示鲸鱼图标。
#
#  用法: bash install.sh
#  产物: ~/Library/Application Support/dsh-launcher/dsh.app
#        桌面快捷方式: ~/Desktop/dsh 一键启动（Finder 显示名）
# ============================================================================
set -euo pipefail

SRC_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO="/Users/dl/DL/github/deepseek-harness"
DESKTOP="$HOME/Desktop"
STATE_DIR="$HOME/Library/Application Support/dsh-launcher"
APP_DIR="$STATE_DIR/dsh.app"
DESKTOP_LINK="$DESKTOP/dsh 一键启动"

echo "===== 安装 dsh 一键启动 ====="

# 清理旧的桌面 app（旧版装在桌面）与旧快捷方式
rm -rf "$DESKTOP/dsh.app" "$DESKTOP_LINK"

# 1. 生成 applet 应用（内含 AppleScript：调用 dispatch.sh 决定是原地重启已有
#    服务还是新开终端窗口；applet 只跑 do shell script，不发送 Apple Events，
#    无需自动化/辅助功能权限）
mkdir -p "$STATE_DIR"
rm -rf "$APP_DIR"
# 注意：mktemp 的产物直接作为源码文件使用（不再拼接后缀，避免残留裸临时文件）
TMP_AS="$(mktemp -t dsh-launcher)"
trap 'rm -f "$TMP_AS"' EXIT
cat > "$TMP_AS" <<'EOF'
set bundlePath to POSIX path of (path to me)
do shell script "bash " & (quoted form of (bundlePath & "Contents/Resources/dispatch.sh"))
EOF
osacompile -o "$APP_DIR" "$TMP_AS"

# 2. 放入启动器主脚本与调度脚本
cp "$SRC_DIR/start-dsh.sh" "$APP_DIR/Contents/Resources/start-dsh.sh"
cp "$SRC_DIR/dispatch.sh" "$APP_DIR/Contents/Resources/dispatch.sh"
chmod 755 "$APP_DIR/Contents/Resources/start-dsh.sh" "$APP_DIR/Contents/Resources/dispatch.sh"

# 3. 应用图标（项目页面 logo，覆盖默认 applet 图标）
"$SRC_DIR/build-icon.sh" "$REPO/apps/web/public/favicon.svg" "$APP_DIR/Contents/Resources/applet.icns"

# 3.1 删除 osacompile 生成的默认图标资产目录。macOS 26 渲染图标时优先读
#     Assets.car（里面是默认紫色 'd' 图标）而忽略 applet.icns；不删的话
#     图标会显示默认图标而不是鲸鱼 logo。
rm -f "$APP_DIR/Contents/Resources/Assets.car"

# 4. 修改应用信息（显示名 / 包名）
PLIST="$APP_DIR/Contents/Info.plist"
/usr/libexec/PlistBuddy -c "Set :CFBundleName 'dsh 一键启动'" "$PLIST" 2>/dev/null || \
  /usr/libexec/PlistBuddy -c "Add :CFBundleName string 'dsh 一键启动'" "$PLIST"
/usr/libexec/PlistBuddy -c "Set :CFBundleDisplayName 'dsh 一键启动'" "$PLIST" 2>/dev/null || \
  /usr/libexec/PlistBuddy -c "Add :CFBundleDisplayName string 'dsh 一键启动'" "$PLIST"
/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier 'com.local.dsh-launcher'" "$PLIST" 2>/dev/null || \
  /usr/libexec/PlistBuddy -c "Add :CFBundleIdentifier string 'com.local.dsh-launcher'" "$PLIST"

# 5. 种子状态文件：若仓库已有构建产物，记录当前提交为「已构建版本」，
#    避免首次启动时触发一次多余的完整构建
if [ -d "$REPO/apps/web/dist" ]; then
  if git -C "$REPO" rev-parse HEAD > "$STATE_DIR/last-built-commit" 2>/dev/null; then
    echo "已记录当前构建版本: $(cut -c1-12 "$STATE_DIR/last-built-commit")"
  fi
fi

# 6. 重新签名（osacompile 的临时签名在修改 bundle 后失效）
if ! codesign --force --deep -s - "$APP_DIR" 2>/dev/null; then
  echo "⚠ codesign 签名失败：双击启动时可能被 Gatekeeper 拦截，请检查系统日志"
fi

# 7. 桌面放 Finder 替身（alias）。普通符号链接（ln -s）在 Finder 里常显示为
#    通用空白图标；Finder 替身能正确显示 app 的鲸鱼 logo。替身仍指向非保护
#    目录里的 app，双击不会触发 TCC「访问桌面文件夹」权限提示。
#    注意：中文名必须直接写死在 AppleScript 源码里（通过 system attribute
#    传环境变量会被 osascript 按 MacRoman 解析成乱码）；ASCII 路径可走 env。
#    若 Finder 自动化不可用（用户拒绝权限等）则回退为符号链接。
if DESKTOP="$DESKTOP" APP_DIR="$APP_DIR" osascript >/dev/null 2>&1 <<'EOF'
tell application "Finder"
    set desktopPath to (system attribute "DESKTOP")
    set appPath to (system attribute "APP_DIR")
    set srcApp to POSIX file appPath as alias
    set destFolder to POSIX file desktopPath as alias
    set a to make new alias file to srcApp at destFolder
    set name of a to "dsh 一键启动"
end tell
EOF
then
  echo "   已创建桌面替身（Finder alias，正确显示鲸鱼图标）"
else
  ln -sfn "$APP_DIR" "$DESKTOP_LINK"
  echo "   Finder 替身创建失败，已回退为符号链接"
fi

# 8. 刷新 Finder
touch "$APP_DIR" "$DESKTOP_LINK" 2>/dev/null || true
killall Finder 2>/dev/null || true

echo ""
echo "✅ dsh 一键启动已安装"
echo "   应用位置: $APP_DIR"
echo "   桌面快捷方式: ${DESKTOP_LINK}（双击启动，不再提示目录权限）"
echo ""
