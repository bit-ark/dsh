# dsh 一键启动（DeepSeek Harness Launcher）

macOS 桌面一键启动工具：双击图标即可检查更新、构建并启动（或原地重启）
DeepSeek Harness 的 Web UI，并自动用 **Chrome 无痕模式**打开。

## 目录

| 文件 | 说明 |
| --- | --- |
| `dispatch.sh` | 双击入口调度器：探测已有 launcher，决定原地重启还是新开窗口 |
| `start-dsh.sh` | 启动器主脚本（核心逻辑：更新检查/条件构建/同终端重启循环） |
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
2. **更新检查**（仅冷启动；同终端内重启不检查）— 先**快速探测**仓库所在主机（3 秒限时，走 DNS+TCP+TLS，与 git 相同路径；不用 ping 是因为 ICMP 与 443 命运常不一致且无法探测代理）：直连不可达 → 自动经代理 `127.0.0.1:7897` 探测（3 秒）；两者都不可达则**跳过更新**（最坏仅约 6 秒），用现有代码继续启动，绝不阻塞。探测通过后才正式 `git fetch`（直连 8 秒/代理 10 秒限时兜底）。有更新时在 **`dev` 分支**上对 `origin/master` 执行 `git merge --ff-only` 快进合并（工作区有未提交修改或本地有独立提交时自动跳过，绝不强制重置）
   时才执行 `pnpm install && pnpm run build`；构建失败会自动回退到更新前
   的提交，用旧版本启动
4. **互斥与清理** — 抢互斥锁（残留锁自动清理；脱离终端的残留进程自动接管）；
   若端口上已有 dsh 服务在运行，先停止旧服务；若端口被**无关进程**占用，
   则拒绝误杀、中止启动并提示换端口
5. **启动服务** — `pnpm dsh web --no-open --port <端口>`（后台运行，默认 `http://127.0.0.1:3080`）
6. **打开浏览器** — Chrome 已有目标页面则原地刷新并激活，否则打开无痕窗口

> **服务已在运行时再次双击图标**：**不会再新开终端窗口**，而是激活旧窗口
> 并在**同一终端内**关闭旧服务、重启、刷新 Chrome（**不做更新检查**，保持
> 重启快捷）。即：**双击 = 启动，再双击 = 同终端重启**。若手动关掉了启动器
> 窗口（服务因 `nohup` 仍在后台运行），再双击会新开一个窗口并检测到旧服务
> 在跑，自动重启。

## 常用命令

```bash
# 启动（效果同双击图标，可在终端看到进度）
bash /Users/dl/DL/github/dsh/dsh-launcher/start-dsh.sh

# 停止服务
pkill -f 'apps/cli/src/bin.ts web'

# 查看启动日志（超过 1MB 自动轮转为 launcher.log.1）
tail -f "$HOME/Library/Logs/dsh-launcher/launcher.log"

# 修改配置后重新安装桌面图标
bash /Users/dl/DL/github/dsh/dsh-launcher/install.sh
```

## 修改配置

编辑 `start-dsh.sh` 顶部的配置区（仓库路径 `REPO`、端口 `WEB_PORT`、
更新目标 `UPSTREAM_REF`、探测/直连/代理限时、代理地址等），然后重新运行
`install.sh` 即可。

## 调试环境变量

| 变量 | 作用 |
| --- | --- |
| `DSH_WEB_PORT=3081` | 使用其他端口 |
| `DSH_DRY_RUN=1` | 启动服务后不打开浏览器、不挂起，且跳过更新检查（自动化测试用） |
| `DSH_SKIP_UPDATE=1` | 显式跳过更新检查（用现有代码启动） |
| `DSH_PROXY_HTTP=...` | 覆盖代理地址（默认 `http://127.0.0.1:7897`） |

## 安全设计

- 更新一律使用 `git merge --ff-only`（在 `dev` 分支上快进合并
  `origin/master`），**绝不** `reset --hard` 覆盖或强制推送；工作区有未
  提交修改、或本地有独立提交/已分叉时自动跳过更新
- 更新检查全程限时：探测 3 秒×2（直连+代理），探测通过后的 fetch 另有直连 8 秒/代理 10 秒兜底限时；网络不可达时最坏约 6 秒后
  自动跳过，不影响正常启动；代理仅以命令级环境变量传入，不修改全局配置
- 更新后构建失败时自动回退到更新前提交，保证服务仍可用旧版本启动
- 停止服务前校验进程命令行特征（`dsh web` / `bin.ts web`），**绝不误杀**
  占用同一端口的无关进程（改为中止启动并提示用 `DSH_WEB_PORT` 换端口）
- 互斥锁按「进程存活 + 命令行匹配 + 终端可见」三重校验：PID 被系统复用
  不会误判；残留锁自动清理；Terminal 异常退出后的残留进程会被自动结束并接管
- 重复点击有互斥锁保护，配合 `dispatch.sh` 的运行前探测，保证同一时刻
  只有一个终端窗口、一个服务
- 日志超过 1MB 自动轮转，保留最近一代
