# dsh-workbench

为 DeepSeek Harness Web GUI 增加右侧停靠的「工作面板」：目录树 + Git 提交图与基本
Git 操作，并支持点击文件在面板内预览内容。

- **面板**：右侧停靠（`shell.overlay` 插槽，id: workbench），可收起为右侧边缘按钮；
  顶部路径框可手动指定工作目录（缺省跟随当前会话 cwd）。
- **目录 tab**：文件/目录树（目录可展开收起，文件行显示大小）。**点击文件在面板内
  预览内容**——文本/代码文件只读回显内容（超 512KB 截断提示），图片内嵌显示，
  音频/视频用浏览器播放器播放，未知二进制显示名称 + 大小 + 无法预览提示。
- **Git tab**：分支、提交图（HEAD 标记）、工作区变更（暂存/取消暂存/全部暂存/
  忽略/取消忽略）、提交框与一键 init（非仓库时）。

预览为只读：文本内容仅回显，无写路径。结构上文本内容保留在客户端状态中，后续可
将 `<pre>` 替换为编辑器并新增写路由（本期不做）。

## 结构

```
index.js    宿主半：GET /workbench/dir | /workbench/file | /workbench/asset
            GET /workbench/git   POST /workbench/git/{init,stage,unstage,
            stage-all,commit,ignore,unignore}
client.js   客户端半：shell.overlay 注册（id: workbench）+ 目录树/Git/预览 UI
cordis.patch.yml  自带组合层：插入 dsh-workbench 行
test/classify.test.mjs  纯逻辑断言（文件分类 / MIME 映射 / 文本判定）
```

## 路由

- `GET /workbench/dir?path=<abs>` → 列一个目录（文件 + 目录，目录在前、名称排序，
  隐藏项标记，最多 500 条带截断标记）。
- `GET /workbench/file?path=<abs>` → 读一个文本文件：`{ ok, path, kind: 'text'|'binary',
  size, content?, truncated? }`。按前 8KB 是否含 NUL 判定二进制；文本上限 512KB，
  超出回 `truncated: true`。二进制不回传内容（走 asset 路由）。
- `GET /workbench/asset?path=<abs>` → 按扩展名输出原始字节（图片/音频/视频/pdf 等
  Content-Type），支持单区间 Range（206），供 `<img>/<audio>/<video>` 直连。
- `GET /workbench/git?cwd=<abs>[&ignored=1]` → 仓库事实（分支/HEAD/提交图/变更/忽略）。
- `POST /workbench/git/{init,stage,unstage,stage-all,commit,ignore,unignore}?cwd=<abs>`
  → 变更操作，成功返回最新仓库事实（与 GET 同构）。

## 安装（已完成则跳过）

在 deepseek-harness checkout 目录执行：

```sh
pnpm dsh plugin --profile web add /Users/dl/DL/github/dsh/plugins/dsh-workbench
```

该命令把包以 `link:` 形式挂进 `~/.dsh/profiles/web`（依赖与 `dsh.profile.bundles`
由 `dsh plugin` 自动维护）。**重要**：本插件自带 bundle 层（cordis.patch.yml 插入
workbench 行），挂进 bundles 后须把 profile 自己 `cordis.patch.yml` 里旧的 workbench
手工 `insert` 删除，避免重复行 id。

## 生效方式

- 宿主半改动：重启 `pnpm dsh web`（路由在进程启动时注册）。
- 客户端半改动：直接刷新页面即可（bundle 按需从磁盘读取，no-cache）。
  dev:web watcher 不覆盖树外插件，属预期行为。

## 测试

```sh
pnpm test   # 纯逻辑断言：文件分类 / MIME 映射 / 文本-二进制判定
```

## 已知边界

- 文本预览按 UTF-8 解码；非 UTF-8 编码的内容可能显示乱码。
- 媒体直接走 `/workbench/asset` URL，不做 base64；超大视频依赖浏览器自身的
  流式播放与单区间 Range。
- 路径信任级别与 `/workbench/dir` 一致：绝对路径 + NUL 校验，跟随符号链接。
