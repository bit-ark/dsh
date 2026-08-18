# dsh-archive

为 DeepSeek Harness Web GUI 增加侧边栏「归档」入口：footer 动作按钮 + 浮动面板。

归档的生命周期起点和终点都在侧边栏（右键「归档会话」→ 会话消失；恢复 → 会话回到
列表），因此管理界面也放在侧边栏，而不是会话区的 tab（会话 tab 行是 session 作用域
的视图，归档是项目级管理，作用域不匹配，且没有打开会话时不可达）。

- **入口**：侧边栏 footer 的「归档 N」按钮（宽栏显示文字 + 计数，rail 窄栏为圆形
  图标按钮）。当前项目没有归档时按钮隐藏；归档第一个会话后自动出现。
- **面板**：点击按钮在 footer 上方打开浮动面板，支持 Escape / 点击外部关闭。
  面板结构：头部（标题 + 关闭）→ 滚动列表 → footer（一键删除按钮）。面板的
  结果提示区（模块级 store，面板关闭重开不丢）显示最近一次删除的结果或错误
  明细，可手动 ✕ 清除，或被下一次操作覆盖；删除动作保留点击时的
  `window.confirm` 二次确认。
- **列表**：只显示当前项目的已归档会话——归档会话属于当前项目当且仅当它在该项目的
  workspace 记账中，或其存储 cwd 等于项目路径。当前项目解析不依赖打开的会话：
  最近活跃 workspace → 当前会话所属 workspace → 当前会话 cwd 对应的 workspace。
- **恢复**：把会话从全局归档集合移除（侧边栏「归档会话」的逆操作），会话回到侧边栏原位置。
- **删除**：硬删除——删除会话日志目录（`~/.dsh/sessions/<项目>/<会话>/`）、解除
  workspace 记账、移出归档集合，并尽力清理投影缓存行。正在运行（live）的会话
  会被拒绝（中文 409 提示）。注意：**归档不会结束会话**——「live」指会话对象
  仍挂在进程内存的 SessionStore 里，harness 没有公开的强制结束会话 API（UI 的
  停止/关闭会话都只取消当前 turn），会话会一直 live 到 `dsh web` 进程重启为止；
  因此删除被拒绝时提示「重启 dsh web 后再删除」。
- **一键删除**：面板底部 footer 区域的按钮，确认后把当前项目全部已归档会话一次性
  批量硬删除——复用单删的同一套步骤（逐会话），运行中的会话跳过、单个硬错误不中断
  整批。**总是显示完整结果提示**（已删除 / 跳过运行中 / 失败 + 明细），跳过时列出
  被跳过的会话 id 并解释「重启 dsh web 后可删除」；提示常驻面板，重开不丢。

## 结构

```
src/index.ts              宿主半：POST /dsh-archive/restore | /delete | /delete-all
src/client/index.tsx      客户端半：sidebar.footer.action slot 注册（id: archive-panel）
build.mjs                 esbuild 构建（lib/index.js + lib/client.js 工厂包装）
cordis.patch.yml          自带组合层：插入 dsh-archive 行
```

## 构建

```sh
pnpm install   # 首次（仅 esbuild）
pnpm build     # 修改 src/ 后重新构建 lib/
```

## 安装（已完成则跳过）

在 deepseek-harness checkout 目录执行（插件已发布到 npm，按名安装即可）：

```sh
pnpm dsh plugin --profile web add @bit-ark/dsh-archive
```

该命令从 npm 拉取包并挂进 `~/.dsh/profiles/web`（依赖与 `dsh.profile.bundles`
由 `dsh plugin` 自动维护），之后每次 `pnpm dsh web` 启动都会加载本插件。

## 生效方式

- 宿主半改动：重建后重启 `pnpm dsh web`。
- 客户端半改动：`pnpm build` 后刷新页面即可（重启更稳妥）。dev:web watcher
  不覆盖树外插件，属预期行为。

## 删除的步骤顺序（防脏状态）

`/delete` 与 `/delete-all` 共用同一个逐会话删除核心。步骤刻意排序为：只读校验
（live 检查、日志目录定位与目录名守卫）→ registry 域写入（unarchive → 逐个
workspace detach，单次失败收集警告不中断）→ 最后才 `rm` 删除文件目录 → 尽力
清理投影缓存。这样写链 503 或任何校验失败都会在任何破坏性操作之前中止，不会出现
「文件已删但归档集合还残留」的半删除状态。该流程并非跨域事务，仍非原子，但任何
失败都停在可恢复状态。

`/delete-all` 在单个会话上的语义与单删一致，但批量语义是「能删多少删多少」：
live 会话计入跳过（不拒绝整批，被跳过的 id 随 `skippedIds` 返回），其他硬错误
计入失败明细并继续处理剩余会话；id 列表去重保序、上限 500 个。客户端在调用前
先用 `window.confirm` 二次确认，随后总是把完整结果（已删除 / 跳过 / 失败 +
明细）写入面板提示区。

## 通用性说明

- 插件只消费 harness 的公开服务（`webServer` / `workspaceRegistry` 的公开面 /
  `sessionPersistence` / `sessions` / 客户端各 store 与 slot）。
- 「恢复」需要 registry 的运行时私有写链（harness 无公开 unarchive API）。
  成员经特性探测，若未来 harness 改名，接口返回 503 并提示，绝不猜测性写入——
  这是本插件对 harness 内部实现的唯一触碰点。
- 「下载」对接 harness 核心端点 `/api/session.export`，与 session-log-download
  插件无关；本部署未装载 session-log-download，其会话头按钮位由 notifier 铃铛占据。

## 已知边界

- 已归档但所属 workspace 已删除的"孤儿"会话（目录不存在）不属于任何项目，
  任何项目的面板都不会显示它们；重新注册原目录为 workspace 后即可管理。
- session-query-sqlite 在本部署为 `openAt: never` 的纯内存索引，无磁盘残留，
  故不处理；若部署改为持久索引，需要在此补充清理。
