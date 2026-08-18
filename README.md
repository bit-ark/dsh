# dsh-plugins

DeepSeek Harness Web GUI 插件集 —— **一个仓库托管多个独立插件**，每个插件都是可直接共享、独立安装的 npm 包（`@bit-ark/dsh-*`，`dsh.bundle.patch` 自带组合层），通过 npm 按名安装进 profile。

## 插件一览

| 插件（目录 / npm 包名） | 版本 | 功能 | 宿主半 | 客户端半 |
|---|---|---|---|---|
| `@bit-ark/dsh-archive` | 0.1.1 | 侧边栏「归档」：管理当前项目的归档会话（恢复 / 硬删除 / 一键批量删除 / 日志 ZIP 下载） | POST /dsh-archive/restore \| /delete \| /delete-all | sidebar.footer.action（归档面板） |
| `@bit-ark/dsh-balance` | 0.1.0 | 设置「DeepSeek 账户」：余额 + 按天 Token 消耗图 + Top 会话 | GET /dsh-balance/balance \| /usage（只读） | settings.section（DeepSeek 账户页） |
| `@bit-ark/dsh-plugmgr` | 0.1.0 | 已安装插件管理器：设置-插件「插件管理」tab（列出 / 添加 / 按名称安装 / 移除 / 更新 / 启用 / 禁用，本地 / npm / Git 来源） | /local-plugins/list \| add \| add-named \| remove \| update \| set-enabled | settings.plugins.tab（插件管理页） |
| `@bit-ark/dsh-notify` | 0.1.1 | 通用应用内通知：顶部 toast + 会话头铃铛/托盘，提供 `notifier` 客户端服务 | 占位（无路由） | toast 宿主 + conversation.session.header.utilities（铃铛） |
| `@bit-ark/dsh-restart` | 0.1.0 | 设置「服务」页一键重启 dsh web：状态 + 两步确认重启，重启后服务在原终端窗口拉起（macOS） | GET /service/status \| POST /service/restart | settings.section（服务页） |
| `@bit-ark/dsh-update` | 0.1.0 | 版本与更新检查（只读）：设置页徽标 + 新版本 toast 提醒 | GET /updater/status \| POST /updater/recheck | settings.general.item（版本与更新行） |
| `@bit-ark/dsh-work` | 1.2.0 | 右侧「工作面板」：目录树 + 点击文件预览（文本/图片/音视频）+ 源码编辑与保存 + Git 提交图与基本操作 | GET /workbench/dir \| /file \| /asset \| /git，POST /workbench/write \| /open \| /workbench/git/* | shell.overlay（右停靠面板，id: workbench） |

## 目录结构

```
dsh-plugins/
├── README.md                # 本文件：插件一览与使用总览
├── LICENSE                  # MIT
└── plugins/
    ├── dsh-archive/         # TypeScript，构建产物在 lib/
    ├── dsh-balance/         # TypeScript，构建产物在 lib/，含测试
    ├── dsh-plugmgr/         # 纯 JavaScript，含测试
    ├── dsh-notify/          # 纯 JavaScript
    ├── dsh-restart/         # 纯 JavaScript
    ├── dsh-update/          # 纯 JavaScript
    └── dsh-work/            # JavaScript（src/ 构建，产物在 lib/），含测试
```

每个插件是独立的 npm 包，彼此互不依赖，各自目录下带有自己的 README。

## 安装

插件已发布到 npm（`@bit-ark/dsh-*`），在 deepseek-harness checkout 目录按名安装即可，无需 clone 本仓库：

```sh
# 安装某个插件（如 dsh-archive），每个插件执行一次
pnpm dsh plugin --profile web add @bit-ark/dsh-archive
```

该命令从 npm 拉取包并挂进 `~/.dsh/profiles/web`（依赖与 `dsh.profile.bundles` 由 `dsh plugin` 自动维护）；之后每次 `pnpm dsh web` 启动都会加载。也可安装 @bit-ark/dsh-plugmgr 后在浏览器「设置-插件-插件管理」页按名称安装其余插件。

> 想从本仓库源码安装（开发调试）：clone 后 `pnpm dsh plugin --profile web add <仓库绝对路径>/plugins/dsh-xxx`（本地目录安装，`link:` 形式）。

## 构建与测试

- 构建插件（dsh-archive、dsh-balance、dsh-work）：`pnpm install` 后 `pnpm build` 生成
  `lib/`（已随仓库提交）；dsh-balance 另可 `pnpm test` 跑纯折叠断言，dsh-work 的
  `pnpm test` 会先构建再跑纯逻辑断言（文件分类 / 预览渲染）。
- 纯 JS 插件（dsh-notify、dsh-update、dsh-plugmgr）：无需构建；dsh-plugmgr 另可
  `pnpm test` 跑纯逻辑断言（spec 分类）。

## 发布到 npm

```sh
npm login                              # 首次，需 npm 账号
cd plugins/<插件目录>
npm publish                            # 每个插件一次（scoped 公共包，自动 --access public）
```

版本号按 semver 递增（`npm version patch|minor|major` 后 `npm publish`）。发布前先跑该插件 README 里的测试。全部 7 个包名已在 npm 上注册为 `@bit-ark/*` scope（`dsh-balance`/`dsh-notify`/`dsh-restart` 的裸名被其他开发者占用，故统一走 scoped 名）。

## 生效方式

- 宿主半改动：重建后重启 `pnpm dsh web`（路由在进程启动时注册）。
- 客户端半改动：`pnpm build`（构建插件：dsh-archive、dsh-balance、dsh-work）后刷新页面即可（重启更稳妥）。dev:web watcher 不覆盖树外插件，属预期行为。

## 命名约定

- **npm 包名**：`@bit-ark/dsh-*`（scoped 公共包，`publishConfig.access: public`）。
- **内部标识**（与包名解耦，保持 `dsh-*` 短名）：文件夹名 == 宿主导出 `name` == 组合行 id（cordis.patch.yml）== 客户端模块 id。修改任何一处时须同步其余各处——与 harness 官方包模式一致（如 `@deepseek-ai/dsh-client-connection` 的包名带 scope，组合行 id 为短名 `client-connection`）。
- 发布前需在 `package.json` 去掉 `private: true` 并加 `publishConfig: { access: "public" }`（scoped 包默认私有，必须显式公开）。

> 唯一例外：dsh-work 因历史原因组合行 id 仍为 `workbench`（内部行 id，包名 / 模块 id 均为 `dsh-work`）。

## 通用性约定（共享要求）

- 插件彼此独立，互不依赖源码；唯一跨插件协作是 dsh-update 可选消费 dsh-notify 的 `notifier` 客户端服务（`ctx.get('notifier')` 特性探测，notifier 缺席时功能降级而非报错）。
- 只消费 harness 公开服务 / 插槽 / store；唯一对 harness 私有实现的触碰点是 dsh-archive 的「恢复」写链（特性探测 + 503 安全失败，见其 README）。
- 样式一律使用主题 token（`--dsw-alias-*`），深浅主题自动适配。
- 请求体均限流（64KB / 1MB），错误统一以 `{ ok:false, error }` 信封返回。
- 所有 POST 路由只接受 `application/json`（415 围栏，与 harness /api 面同款约定，防跨站简单 POST CSRF）；POST 响应统一带 `{ ok, ... }` 信封。

## 许可证

[MIT](LICENSE) © 2025 bitark
