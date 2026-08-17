# dsh 本地插件集（plugins/）

一组可直接共享、独立安装的 DeepSeek Harness Web GUI 插件。每个子目录是一个
独立 npm 包（`dsh.bundle.patch` 自带组合层），通过本地目录安装进 profile。

## 插件一览

| 目录 / 包名 | 功能 | 宿主半 | 客户端半 |
|---|---|---|---|
| `dsh-archive-tab` | 侧边栏「归档」：管理当前项目的归档会话（恢复 / 硬删除 / 日志 ZIP 下载） | POST /dsh-archive-tab/restore \| /delete | sidebar.footer.action（归档面板） |
| `dsh-deepseek-balance` | 设置「DeepSeek 账户」：余额 + 按天 Token 消耗图 + Top 会话 | GET /dsh-deepseek-balance/balance \| /usage（只读） | settings.section（DeepSeek 账户页） |
| `dsh-notifier` | 通用应用内通知：顶部 toast + 会话头铃铛/托盘，提供 `notifier` 客户端服务 | 占位（无路由） | toast 宿主 + conversation.session.header.utilities（铃铛） |
| `dsh-updater` | 版本与更新检查（只读）：设置页徽标 + 新版本 toast 提醒 | GET /updater/status \| POST /updater/recheck | settings.general.item（版本与更新行） |
| `dsh-local-plugin-manager` | 本地插件管理器：设置-插件「本地插件」tab（列出 / 添加 / 移除 / 启用 / 禁用） | /local-plugins/list \| add \| remove \| set-enabled | settings.plugins.tab（本地插件页） |

## 命名约定

统一为 `dsh-*` 前缀：文件夹名 == package.json `name` == 宿主半导出 `name` ==
组合行 id（cordis.patch.yml）== 客户端模块 id。修改任何一处时须同步其余各处。

## 安装

在 deepseek-harness checkout 目录执行（每个插件一次）：

```sh
pnpm dsh plugin --profile web add /Users/dl/DL/github/dsh/plugins/dsh-<插件名>
```

该命令把包以 `link:` 形式挂进 `~/.dsh/profiles/web`（依赖与
`dsh.profile.bundles` 由 `dsh plugin` 自动维护）；之后每次 `pnpm dsh web`
启动都会加载。也可用 dsh-local-plugin-manager 的「本地插件」页在浏览器里添加。

## 构建与测试

- TypeScript 插件（dsh-archive-tab、dsh-deepseek-balance）：`pnpm install`
  后 `pnpm build` 生成 `lib/`（已随仓库提交，link: 安装开箱即用）；
  deepseek-balance 另可 `pnpm test` 跑纯折叠断言。
- 纯 JS 插件（dsh-notifier、dsh-updater、dsh-local-plugin-manager）：无需构建。

## 生效方式

- 宿主半改动：重建后重启 `pnpm dsh web`（路由在进程启动时注册）。
- 客户端半改动：`pnpm build`（TS 插件）后刷新页面即可（重启更稳妥）。
  dev:web watcher 不覆盖树外插件，属预期行为。

## 通用性约定（共享要求）

- 插件彼此独立，互不依赖源码；唯一跨插件协作是 dsh-updater 可选消费
  dsh-notifier 的 `notifier` 客户端服务（`ctx.get('notifier')` 特性探测，
  notifier 缺席时功能降级而非报错）。
- 只消费 harness 公开服务 / 插槽 / store；唯一对 harness 私有实现的触碰点是
  dsh-archive-tab 的「恢复」写链（特性探测 + 503 安全失败，见其 README）。
- 样式一律使用主题 token（--dsw-alias-*），深浅主题自动适配。
- 请求体均限流（64KB / 1MB），错误统一以 `{ ok:false, error }` 信封返回。
