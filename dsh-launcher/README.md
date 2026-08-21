# dsh 一键启动（DeepSeek Harness Launcher）

macOS 桌面一键启动工具：双击图标即可检查分支、检查更新、构建并启动
DeepSeek Harness 的 Web UI，并自动用 **Chrome 无痕模式**打开。

## 目录

| 文件 | 说明 |
| --- | --- |
| `dispatch.sh` | 双击入口调度器：探测已有 launcher，决定原地重启还是新开窗口 |
| `start-dsh.sh` | 启动器主脚本（核心逻辑，含同终端重启循环） |
| `build-icon.sh` | 从项目 favicon.svg 生成 macOS 应用图标 |
| `install.sh` | 组装并安装桌面图标（Finder 替身）`~/Desktop/dsh 一键启动` |
| `README.md` | 本说明 |

## 实现原理

`install.sh` 用 `osacompile` 生成**原生 applet 应用**（Mach-O 二进制，
macOS 26 拒绝纯脚本可执行文件的 bundle）。双击时 applet 不直接开终端，
而是调用 `dispatch.sh`（applet 只跑 `do shell script`，不发送 Apple
Events，无需自动化/辅助功能权限）：

- **已有 launcher 在运行** → 只写一个 `restart.trigger` 信号文件并激活
  旧窗口（`open -a Terminal` 对已运行的应用只激活、不新开窗口），由旧
  launcher 在**同一终端内**重启服务。
- **没有 launcher 在运行**（首次启动，或旧窗口被手动关闭）→
  `open -a Terminal` 新开一个窗口运行 `start-dsh.sh`。

`start-dsh.sh` 启动服务后进入**驻留循环**，轮询 `restart.trigger`：收到
信号就 `stop_server → 重启服务 → 刷新 Chrome`，全程同一个终端。因此**永远
只有一个终端窗口**，无需关闭窗口、无需 System Events、无需辅助功能权限。

## 安装

```bash
bash /Users/dl/DL/github/dsh/dsh-launcher/install.sh
```

安装后桌面出现 **dsh 一键启动** 图标（项目鲸鱼 logo）。

## 使用

双击桌面 `dsh 一键启动` 图标，会自动弹出终端窗口并依次执行：

1. **单终端调度** — `dispatch.sh` 先探测：已有终端则原地重启服务（不新开窗口），否则新开窗口
2. **分支检查** — 确保源码在 `dev` 分支；不在则自动切换
   （工作区有未提交修改时会跳过切换，避免破坏源码）
3. **更新检查** — **默认屏蔽**（`CHECK_UPDATE=0`，启动更快不联网）；
   如需启用改 `start-dsh.sh` 顶部 `CHECK_UPDATE=1`，启用后策略：
   - 先直连 `git fetch`（10 秒限时 + git 低速超时保护）
   - 直连失败 → 自动切换代理 `127.0.0.1:7897`（12 秒限时）
   - 两者都失败 → **跳过更新检查**，用现有代码继续启动（不阻塞）
   - 更新使用 `git pull --ff-only` **fast-forward 安全模式**
     （远程无 `dev` 分支时跟踪 `origin/master`，有则优先 `dev`）
   - 若存在本地提交/未提交修改导致无法快进 → 保留现有代码继续启动，绝不强制重置
4. **构建** — 仅当「刚更新过 / 构建记录与当前提交不一致 / 产物缺失」时才执行
   `pnpm install && pnpm run build`（更新后必须重新构建）
5. **启动服务** — `pnpm dsh web --no-open`（后台运行，默认 `http://127.0.0.1:3080`）
6. **打开浏览器** — 自动打开 Chrome 无痕窗口访问 Web UI

> **服务已在运行时再次双击图标**：**不会再新开终端窗口**，而是激活旧窗口
> 并在**同一终端内**关闭旧服务、重启、刷新 Chrome。即：**双击 = 启动，
> 再双击 = 同终端重启**。若手动关掉了启动器窗口（服务因 `nohup` 仍在后台
> 运行），再双击会新开一个窗口并检测到旧服务在跑，自动重启。

## 常用命令

```bash
# 启动（效果同双击图标，可在终端看到进度）
bash /Users/dl/DL/github/dsh/dsh-launcher/start-dsh.sh

# 停止服务
pkill -f 'apps/cli/src/bin.ts web'

# 查看启动日志
tail -f "$HOME/Library/Logs/dsh-launcher/launcher.log"

# 修改配置后重新安装桌面图标
bash /Users/dl/DL/github/dsh/dsh-launcher/install.sh
```

## 修改配置

编辑 `start-dsh.sh` 顶部的配置区（仓库路径 `REPO`、分支 `BRANCH_REQUIRED`、
端口 `WEB_PORT`、代理地址等），然后重新运行 `install.sh` 即可。

## 调试环境变量

| 变量 | 作用 |
| --- | --- |
| `DSH_LAUNCHED_IN_TERMINAL=1` | 跳过自动打开 Terminal（已在终端中运行） |
| `DSH_WEB_PORT=3081` | 使用其他端口 |
| `DSH_DRY_RUN=1` | 启动服务后不打开浏览器、不挂起（自动化测试用） |
| `DSH_PROXY_HTTP=...` | 覆盖代理 http 地址（默认 `http://127.0.0.1:7897`） |
| `DSH_PROXY_SOCKS=...` | 覆盖代理 socks 地址（默认 `socks5://127.0.0.1:7897`） |
| `DSH_FETCH_ARGS=...` | 附加 git fetch 参数（测试用） |

## 安全设计

- 更新一律使用 `git pull --ff-only`，**绝不** `reset --hard` 或强制推送
- 分支切换仅在工作区干净时执行
- 重复点击有互斥锁保护（带 PID 自愈，残留锁自动清理），配合 `dispatch.sh`
  的运行前探测，保证同一时刻只有一个终端窗口、一个服务
- dev 分支与 master 的差异（你的自定义修改）永远不会被自动更新覆盖
- 更新检查全程限时，网络不可达时自动跳过，不影响正常启动
