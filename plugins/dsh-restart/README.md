# dsh-restart

设置「服务」页一键重启 dsh web（官方 `settings.section` 插槽，id: service,
order: 90）：页面显示服务状态（PID / 端口 / 启动目录 / 日志尾部）和「重启
服务」按钮，两步确认后重启服务，**重启后服务仍在原终端窗口拉起**（macOS
Terminal.app，复用窗口、不新增不关闭）。

- **状态卡**：GET /service/status 显示当前 PID / 端口 / 平台 / 启动目录 / 日志
  路径 / 最近日志尾部。
- **重启按钮**：两步确认（第一次点击变红色「确认重启？」，4 秒后自动复位），
  第二次点击才真正触发。
- **重启流程**（宿主路由驱动，全程写日志到 `~/.dsh/restart.log`）：延迟约 4
  秒让 HTTP 响应先送达 → 终止 3080 上当前服务及其 pnpm 包装进程 → 等端口释放
  → 通过 osascript 把 `cd <cwd> && pnpm dsh web` 发进**同一个服务终端窗口**
  （找不到该窗口或 osascript 不可用时回退为 nohup 无终端重启，不另开新窗口）→
  curl 自检 3080 直到恢复。
- **提示**：成功/失败优先用 dsh-notify 的 `notifier` toast（特性探测，缺席时
  页面内提示，功能照常）。

## 结构

```
index.js    宿主半：GET /service/status | POST /service/restart（生成并执行
            ~/.dsh/restart-helper.sh，detached 子进程，杀进程不自杀）
client.js   客户端半：settings.section 注册（id: service, order: 90）
cordis.patch.yml  自带组合层：插入 dsh-restart 行
```

## 行配置（全部可选，默认贴合现状）

```yaml
config:
  cwd:      ~/github/deepseek-harness       # 服务启动目录（默认 process.cwd()）
  command:  pnpm dsh web                    # 重启命令
  port:     3080                            # 服务端口
  delayMs:  4000                            # 触发到杀进程的延迟
  logPath:  ~/.dsh/restart.log              # 重启日志
```

> `cwd` 支持含空格的路径（生成的助手脚本会做 shell 引号处理）。

## 构建 / 安装

纯 JS 插件无需构建。安装（已完成则跳过；插件已发布到 npm，按名安装即可）：

```sh
pnpm dsh plugin --profile web add @bit-ark/dsh-restart
```

装完后需重启一次 `dsh web` 让插件加载，之后就能用按钮了。

## 生效方式

- 宿主半改动：重启 `dsh web`（用本插件按钮即可）。
- 客户端半改动：刷新页面即可（重启更稳妥）。dev:web watcher 不覆盖树外插件。
- 平台限制：Terminal.app 控制（osascript）仅 macOS；非 macOS 点击按钮会返回
  明确错误。

## 通用性说明

- 只依赖 harness 公开约定：`webServer` 路由、`settings.section` 插槽、
  `notifier` 客户端服务（可选）。
- 安全：重启助手只杀命令匹配 `bin.ts web` / `bin.js web` 的监听者及其 pnpm
  父进程，绝不杀无关进程；端口未释放则中止。按钮两步确认 + 4 秒防抖 + 重启
  中防抖；重启触发后 90 秒看门狗：若页面仍存活（服务没真正重启）自动复位并
  提示查看日志，绝不永久卡在「重启中」。POST 路由只接受 `application/json`
  （415 围栏，防跨站简单 POST）。
- 日志：重启前后全部关键步骤写入 `~/.dsh/restart.log`，`GET /service/status`
  可查看当前 PID 与日志尾部。
