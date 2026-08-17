# dsh-plugmgr

本地插件管理器：在「设置 → 插件」提供「本地插件」tab，管理通过本地目录
（`link:`/`file:`/绝对路径依赖）安装进 dsh profile 的 bundle。安装模型与
`dsh plugin --profile <name> add|remove` CLI 完全一致，本插件把它变成浏览器
里的可视化界面。

- **列表**：当前 profile 的全部本地目录依赖——名称 / 中文说明 / 版本 / 路径 /
  是否 bundle / 启用状态。
- **添加**：内置目录浏览器（官方 browse 能力 `ctx.workspaces.listDirectory`，
  逐级浏览 + 面包屑 + 选择此目录）或手动输入绝对路径。
- **移除**：两步确认后 `pnpm remove`（只卸载，**绝不删除插件目录文件**）。
- **启用/禁用**：只改 `dsh.profile.bundles` 层列表，依赖保留安装。
- 所有写操作走宿主路由（`/local-plugins/*`），宿主是数据权威；增删/启停修改
  的是 profile 文件，**重启 `dsh web` 后生效**，界面会给出提示。

## 结构

```
index.js    宿主半：/local-plugins/list | add | remove | set-enabled
client.js   客户端半：settings.plugins.tab 注册（id: local-plugins, order: 20）
cordis.patch.yml  自带组合层：插入 dsh-plugmgr 行
```

## 行配置（全部可选）

```yaml
config:
  profile: web   # 管理哪个 profile 的本地插件（默认：web）
```

## 构建 / 安装

纯 JS 插件无需构建。安装（已完成则跳过）：

```sh
pnpm dsh plugin --profile web add <仓库克隆路径>/plugins/dsh-plugmgr
```

## 生效方式

- 宿主半改动：重启 `pnpm dsh web`。
- 客户端半改动：刷新页面即可（重启更稳妥）。dev:web watcher 不覆盖树外插件。
- 本插件增删/启停别的插件：改的是 profile manifest，同样需要重启 `dsh web`。

## 通用性说明

- 只依赖 harness 公开约定：`dsh.profile.bundles` 层模型、`dsh.bundle.patch`
  声明、`dsh plugin` 的 reconcile 语义（宿主半复刻该逻辑，与 CLI 行为一致）。
- 性能与并发：pnpm 以异步 execFile 执行（不阻塞事件循环），add/remove/
  set-enabled 用互斥链串行化，防止并发请求交错写坏 profile manifest。
- 请求体解析错误与业务错误统一以 `200 + { ok:false, error }` 返回，客户端
  `callJson` 契约一致。
