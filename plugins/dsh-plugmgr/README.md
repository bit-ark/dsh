# dsh-plugmgr

已安装插件管理器：在「设置 → 插件」提供「插件管理」tab，管理当前 profile 里**全部已安装插件**——本地目录（`link:`/`file:`/绝对路径依赖）、npm 注册表（版本号）、Git（`github:` 等）来源均可，安装模型与
`dsh plugin --profile <name> add|remove|update` CLI 完全一致，本插件把它变成浏览器里的可视化界面。

- **列表**：当前 profile 的全部依赖插件——名称 / 说明 / 版本 / 来源（徽标：本地 / npm / Git / 其他）/ 是否 bundle / 启用状态。
- **添加（本地目录）**：内置目录浏览器（官方 browse 能力 `ctx.workspaces.listDirectory`，逐级浏览 + 面包屑 + 选择此目录）或手动输入绝对路径。
- **按名称安装**：输入包名 / `name@version` / git spec（如 `whale-girl`、`@scope/name@1.2.0`、`github:user/repo#main`），在 profile 目录跑 `pnpm add`。
- **更新**：对任意已安装插件跑 `pnpm update`（按声明范围解析；git spec 重取 ref；精确版本无新版本时是 no-op）。
- **移除**：两步确认后 `pnpm remove`（只卸载，**本地目录插件的源码文件绝不删除**）。
- **启用/禁用**：只改 `dsh.profile.bundles` 层列表，依赖保留安装。
- 所有写操作走宿主路由（`/local-plugins/*`），宿主是数据权威；增删/启停修改的是 profile 文件，**重启 `dsh web` 后生效**，界面会给出提示。

## 术语

| 叫法 | 含义 | profile 依赖的写法 |
|---|---|---|
| 已安装插件（统称） | profile 依赖里声明了 `dsh.bundle.patch` 的包，即加载层（bundle） | — |
| 本地插件 | 本地目录安装 | `link:/路径`、`file:/路径`、绝对路径 |
| npm 插件 | npm 注册表按名称安装 | 版本号 / 范围（`3.18.2`、`^1.0.0`）、`npm:` 别名 |
| Git 插件 | Git 仓库安装 | `github:user/repo#ref`、`git+…` |

> 是否算"插件"（能否成为加载层）取决于包是否声明 `dsh.bundle.patch`，与来源无关；没声明的注册表包只是普通依赖（列表标「非 bundle」）。

## 命令行对应

本插件的操作与 CLI 一一对应，命令行同样可用：

```sh
pnpm dsh plugin --profile web add <spec>       # 添加（目录 / 包名 / git spec）
pnpm dsh plugin --profile web remove <包名>     # 卸载（如 whale-girl）
pnpm dsh plugin --profile web update <包名>     # 更新
```

## 结构

```
index.js    宿主半：/local-plugins/list | add | add-named | remove | update | set-enabled
client.js   客户端半：settings.plugins.tab 注册（id: local-plugins, order: 20）
tests/      specKind 分类纯逻辑测试（node --test）
cordis.patch.yml  自带组合层：插入 dsh-plugmgr 行
```

## 行配置（全部可选）

```yaml
config:
  profile: web   # 管理哪个 profile 的插件（默认：web）
```

## 构建 / 安装 / 测试

纯 JS 插件无需构建。安装（已完成则跳过）：

```sh
pnpm dsh plugin --profile web add <仓库克隆路径>/plugins/dsh-plugmgr
pnpm test   # 在插件目录跑 specKind 分类断言
```

## 生效方式

- 宿主半改动：重启 `pnpm dsh web`。
- 客户端半改动：刷新页面即可（重启更稳妥）。dev:web watcher 不覆盖树外插件。
- 本插件增删/启停别的插件：改的是 profile manifest，同样需要重启 `dsh web`。

## 通用性说明

- 只依赖 harness 公开约定：`dsh.profile.bundles` 层模型、`dsh.bundle.patch`
  声明、`dsh plugin` 的 reconcile 语义（宿主半复刻该逻辑，与 CLI 行为一致）。
- 性能与并发：pnpm 以异步 execFile 执行（不阻塞事件循环），add/add-named/
  remove/update/set-enabled 用互斥链串行化，防止并发请求交错写坏 profile manifest。
- 请求体解析错误与业务错误统一以 `200 + { ok:false, error }` 返回，客户端
  `callJson` 契约一致。
