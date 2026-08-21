#!/bin/bash
# ============================================================================
#  build-icon.sh —— 把 dsh 项目的 favicon.svg 生成 macOS 应用图标 AppIcon.icns
#
#  用法: build-icon.sh <favicon.svg> <输出 AppIcon.icns>
#  原理: 白色圆角底 + 项目鱼 logo → Chrome 无头渲染 PNG → sips 缩放 → iconutil 打包
# ============================================================================
set -euo pipefail

SRC_SVG="${1:?用法: build-icon.sh <favicon.svg> <输出.icns>}"
OUT_ICNS="${2:?用法: build-icon.sh <favicon.svg> <输出.icns>}"
OUT_ICNS="$(cd "$(dirname "$OUT_ICNS")" && pwd)/$(basename "$OUT_ICNS")"

[ -f "$SRC_SVG" ] || { echo "错误: 源 SVG 不存在: $SRC_SVG"; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# 1. 组装图标 SVG：白色圆角底 + 鱼 logo（原图 50x50 → 放大到 4096 画布，四周留白）
FISH_PATH="$(grep -o '<path[^>]*/>' "$SRC_SVG" | head -1)"
if [ -z "$FISH_PATH" ]; then
  echo "错误: 未在 SVG 中找到 path 元素"
  exit 1
fi
{
  echo '<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="4096" viewBox="0 0 4096 4096">'
  echo '  <rect x="0" y="0" width="4096" height="4096" rx="720" fill="#ffffff"/>'
  echo '  <g transform="translate(384,384) scale(66.56)">'
  echo "    $FISH_PATH"
  echo '  </g>'
  echo '</svg>'
} > "$TMP/icon.svg"

# 2. 超采样渲染为 8192x8192 PNG（4096 画布 × 2x DPR），最大化边缘平滑度；
#    直接按小分辨率渲染会有明显像素化。失败则退回 Quick Look。
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PNG=""
if [ -x "$CHROME" ]; then
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size=4096,4096 --force-device-scale-factor=2 \
    --default-background-color=00000000 \
    --screenshot="$TMP/icon.png" "file://$TMP/icon.svg" >/dev/null 2>&1
  [ -f "$TMP/icon.png" ] && PNG="$TMP/icon.png"
fi
if [ -z "$PNG" ]; then
  qlmanage -t -s 1024 -o "$TMP" "$TMP/icon.svg" >/dev/null 2>&1
  [ -f "$TMP/icon.svg.png" ] && PNG="$TMP/icon.svg.png"
fi
[ -n "$PNG" ] || { echo "错误: SVG 渲染失败（Chrome 与 Quick Look 均不可用）"; exit 1; }

# 3. 生成 iconset（macOS 要求的全部尺寸）
#    缩放优先用 Python PIL Lanczos（高质量插值，边缘更锐利）；
#    PIL 不可用时回退到 sips。
ICONSET="$TMP/AppIcon.iconset"
mkdir -p "$ICONSET"
if python3 -c "import PIL" 2>/dev/null; then
  python3 - "$PNG" "$ICONSET" <<'PYEOF'
import sys
from PIL import Image

src, out_dir = sys.argv[1], sys.argv[2]
img = Image.open(src).convert("RGBA")
src_size = img.size[0]
for size, name in [
    (16, "icon_16x16.png"), (32, "icon_16x16@2x.png"),
    (32, "icon_32x32.png"), (64, "icon_32x32@2x.png"),
    (128, "icon_128x128.png"), (256, "icon_128x128@2x.png"),
    (256, "icon_256x256.png"), (512, "icon_256x256@2x.png"),
    (512, "icon_512x512.png"), (1024, "icon_512x512@2x.png"),
]:
    # Lanczos 高质量缩放；仅当目标尺寸恰好等于源图尺寸时直接复用
    resized = img if size == src_size else img.resize((size, size), Image.LANCZOS)
    resized.save(f"{out_dir}/{name}", format="PNG")
PYEOF
else
  for spec in \
    "16:icon_16x16.png" "32:icon_16x16@2x.png" \
    "32:icon_32x32.png" "64:icon_32x32@2x.png" \
    "128:icon_128x128.png" "256:icon_128x128@2x.png" \
    "256:icon_256x256.png" "512:icon_256x256@2x.png" \
    "512:icon_512x512.png" "1024:icon_512x512@2x.png"; do
    size="${spec%%:*}"
    name="${spec##*:}"
    sips -z "$size" "$size" "$PNG" --out "$ICONSET/$name" >/dev/null
  done
fi

# 4. 打包 .icns
iconutil -c icns "$ICONSET" -o "$OUT_ICNS"
echo "✅ 图标已生成: $OUT_ICNS"
