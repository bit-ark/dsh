# dsh-work

为 DeepSeek Harness Web GUI 增加右侧停靠的「工作面板」：目录树 + Git 提交图与基本
Git 操作，并支持点击文件在面板内预览内容。

- **面板**：右侧停靠（`shell.overlay` 插槽，id: workbench），可收起为右侧边缘按钮；
  顶部路径框可手动指定工作目录（缺省跟随当前会话 cwd）。**宽度可拖拽调整**：拖动
  面板左边缘改变整体宽度（最小 280px，最大 = 框架宽度 − 左侧栏宽度，即面板最宽盖满
  对话区但绝不遮挡左侧栏；跟随窗口缩放与 sidebar 折叠/展开自动重算），双击手柄
  重置为默认 344px；宽度持久化到 localStorage，刷新后保持。
- **目录 tab**：文件/目录树（目录可展开收起，文件行显示大小）。**点击文件在面板内
  预览内容**——文本/代码文件只读回显内容（超 512KB 截断提示），图片内嵌显示，
  音频/视频用浏览器播放器播放，未知二进制显示名称 + 大小 + 无法预览提示。
  预览为**分栏模式**：面板足够宽（≥480px）时点击文件，面板左右一分为二——左侧目录
  树保留、右侧详情区即时切换文件内容，中间分隔条可拖动调整目录/详情比例（比例
  持久化）；面板较窄时点击文件自动加宽到 720px 再分栏；手动拖窄到 480px 以下则退回
  整块预览 + 返回按钮。
- **代码样式**：文本预览带内置语法高亮（无依赖 tokenizer，覆盖 ts/js/json/yaml/
  py/go/rust/java/cpp/cs/php/ruby/swift/kotlin/shell/sql/css/html/markdown 等；
  颜色走壳的 `--shiki-token-*` 全局调色板，与代码块一致）。无扩展名的常见文本
  文件（Makefile / Dockerfile / LICENSE 等）按「未知类型」处理，显示名称 + 大小
  + 无法预览提示（不在文本预览范围）；已知文本扩展名但不在高亮语言表里的
  回退纯文本，超 300KB 跳过 token 以保流畅。
- **MD 解释器**：`.md`/`.markdown`/`.mdx` 文件打开即渲染（内置轻量 GFM 渲染器：
  标题/段落/代码围栏（带高亮）/列表/引用/分隔线/行内样式），预览头可切回「源码」。
  链接只放行 http(s)/mailto；图片允许 http(s) 直连与同树相对路径（走
  `/workbench/asset` 路由，父目录 `..` 拒绝）。
- **HTML 浏览器**：`.html`/`.htm` 文件打开即在内置浏览器预览——沙箱 iframe
  （`sandbox="allow-scripts"`，无同源权限，脚本无法触碰面板或应用），相对
  `src`/`href`（同目录与子目录）自动重写到 `/workbench/asset` 路由，同树
  css/js/图片可加载；http(s)/根路径/锚点/父目录路径不动。预览头可切回「源码」。
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
            （含无依赖语法高亮、轻量 markdown 渲染、html 沙箱预览）
cordis.patch.yml  自带组合层：插入 dsh-work 行
test/classify.test.mjs  纯逻辑断言（文件分类 / MIME 映射 / 文本判定）
test/preview.test.mjs  纯逻辑断言（高亮 token / markdown 渲染 / html 预览重写）
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
  → 变更操作，成功返回最新仓库事实（与 GET 同构），客户端直接消费该响应
  刷新面板（一次往返，不再额外重查）。POST 只接受 `application/json`
  （415 围栏，防跨站简单 POST）。

## 安装（已完成则跳过）

在 deepseek-harness checkout 目录执行：

```sh
pnpm dsh plugin --profile web add <仓库克隆路径>/plugins/dsh-work
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
pnpm test   # 纯逻辑断言：文件分类 / MIME 映射 / 文本-二进制判定 / 高亮 / markdown / html
```

## 已知边界

- 文本预览按 UTF-8 解码；非 UTF-8 编码的内容可能显示乱码。
- 媒体直接走 `/workbench/asset` URL，不做 base64；超大视频依赖浏览器自身的
  流式播放与单区间 Range。
- 路径信任级别与 `/workbench/dir` 一致：绝对路径 + NUL 校验，跟随符号链接。
  ⚠️ **部署警告**：所有 `/workbench/*` 路由按设计信任本地绝对路径、无鉴权、
  无项目根限定——任何能访问该端口的人都能读取任意文件并对任意目录执行
  git 操作。仅适合本机/可信网络环境使用，切勿把服务暴露到公网或非 loopback
  网卡（如 `host: 0.0.0.0` 且无防火墙）。
- 高亮是轻量正则 tokenizer，精度低于 shiki：字符串/注释/关键字/类型/调用等
  常规结构可靠，极端语法（嵌套模板、多行字符串变体）可能着色不完整；超 300KB
  的文本跳过 token 只做纯文本。
- markdown 渲染是 GFM 子集：不支持表格、任务列表、脚注；相对路径图片只放行
  同目录与子目录（拒绝 `..`），链接仅 http(s)/mailto。
- html 预览为沙箱 iframe：相对资源走 asset 路由可加载，但脚本运行在无同源权限的
  不透明源里（无法访问应用数据），且 `<iframe>` 嵌套页面不会重写其内部资源。
