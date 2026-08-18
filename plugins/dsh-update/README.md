# dsh-update

DSH 版本检查插件：只读地对比本地 checkout 与远端分支头，在设置页「版本与更新」
行显示状态徽标；发现新版本时通过 dsh-notify 的 toast 提醒（可选依赖）。

- **状态行**：设置 → 版本与更新。徽标 = 状态点 + 当前版本号。
  - 绿点 = 已是最新；绿色呼吸点 = 发现新版本；灰点 = 无法连接。
- **详情弹窗**：点击徽标展开——最新版本 / 当前版本 / 手动更新指引。
  本插件只提醒，**不自动更新**（不执行任何会改状态的命令）。
- **新版本 toast**：若同时装载了 dsh-notify，检查发现新版本时弹顶部通知，
  点击直达详情弹窗（同一远端 sha 只提醒一次）。
- **宿主端点**：`GET /updater/status`（60s 缓存 + 并发合并）、
  `POST /updater/recheck`（强制重查）。

## 结构

```
index.js    宿主半：/updater/status | /recheck（只读 git 检查）
client.js   客户端半：settings.general.item 行 + 详情弹窗 + toast 提醒
cordis.patch.yml  自带组合层：插入 dsh-update 行（config: remote/branch）
```

## 行配置

```yaml
config:
  remote: origin   # 对比的 git remote 名
  branch: master   # 对比的远端分支
```

## 构建 / 安装

纯 JS 插件无需构建。安装（已完成则跳过；首次先把插件仓库 clone 到本地）：

```sh
git clone https://github.com/bit-ark/dsh.git dsh-plugins   # 首次
pnpm dsh plugin --profile web add ./dsh-plugins/plugins/dsh-update
```

## 生效方式

- 宿主半改动：重启 `pnpm dsh web`。
- 客户端半改动：刷新页面即可（重启更稳妥）。dev:web watcher 不覆盖树外插件。

## 通用性说明

- 只读：宿主半仅执行 `rev-parse HEAD` / `ls-remote` / `remote get-url` /
  raw 拉取远端 package.json，绝不 spawn 会改状态的命令。
- 远端版本尽力而为：raw.githubusercontent.com 不可达时 remoteVersion 为 null，
  弹窗仍给出远端 sha 与手动指引。
- 对 dsh-notify 的消费是可选、特性探测的：notifier 缺席时仅无 toast，
  其余功能不变。
