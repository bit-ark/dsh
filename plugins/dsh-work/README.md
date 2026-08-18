# dsh-work

为 DeepSeek Harness Web GUI 增加右侧停靠的「工作面板」：目录树 + Git 提交图与基本
Git 操作，并支持点击文件在面板内预览内容。

- **面板**：右侧停靠（`shell.overlay` 插槽，id: workbench），可收起为右侧边缘按钮；
  顶部路径框可手动指定工作目录（缺省跟随当前会话 cwd）。**宽度可拖拽调整**：拖动
  面板左边缘改变整体宽度（最小 280px，最大 = 框架宽度 − 左侧栏宽度，即面板最宽盖满
  对话区但绝不遮挡左侧栏；跟随窗口缩放与 sidebar 折叠/展开自动重算）。**收起为两段式**：
  单击左缘手柄（或头部收起按钮）——面板宽于最窄时先动画收窄到 280px，已最窄时再
  单击才滑出并收起；双击手柄重置为默认 344px。**所有宽度变更（打开滑入/收窄/收起/
  双击重置/窄面板选文件自动加宽）统一走 300ms 逐帧动画，曲线与主框架左侧栏收起一致**
  （`--ds-ease-in-out`：cubic-bezier(0.4,0,0.2,1)，拖拽期间不动画）；单击**即时响应、
  零延迟**（原 300ms 为单击/双击判定延迟，已改为单击立即执行、双击取消并重置）；
  宽度持久化到 localStorage，刷新后保持（收起后重开回到最窄宽度）；系统开启「减弱
  动态效果」（`prefers-reduced-motion`）时全部动画跳过、瞬时到位。
- **三列联动**：面板展开时，面板宽度会实时映射到中间对话列的 `margin-right`——
  拖宽面板，对话区同步变窄，形成「侧栏 | 对话 | 工作面板」互相影响宽度的三列布局；
  面板收窄/收起/双击重置时对话区同步回宽。对话区有 480px 保底宽度（面板超过该上限
  时退化为覆盖式，与旧行为一致）；框架自带 details 列打开时联动暂停（原生细节列
  接管右缘，避免双挤压）。纯 DOM 观察实现，不触碰框架布局源码。
- **目录 tab**：文件/目录树（目录可展开收起，文件行显示大小）。**点击文件在面板内
  预览内容**——文本/代码文件在「源码」视图可编辑（超 1MB 只读截断提示），图片内嵌
  显示，音频/视频用浏览器播放器播放，未知二进制显示名称 + 大小 + 无法预览提示。
  预览为**两栏常驻模式**：点击任意文件，面板即左右一分为二——左侧目录树保留、
  右侧详情区即时切换文件内容，中间分隔条可**自由拖动**调整目录/详情比例（树宽区间
  [120, 面板宽 − 240]，内容区保底 240px；比例持久化）。面板宽度不再设分栏门槛：
  窄面板由树自动让位、内容区保持可用；面板较窄时点击文件自动加宽到 720px 再分栏。
- **代码样式**：文本预览带内置语法高亮（无依赖 tokenizer，覆盖 ts/js/json/yaml/
  py/go/rust/java/cpp/cs/php/ruby/swift/kotlin/shell/sql/css/html/markdown 等；
  颜色走壳的 `--shiki-token-*` 全局调色板，与代码块一致）。无扩展名的常见文本
  文件（Makefile / Dockerfile / LICENSE 等）按「未知类型」处理，显示名称 + 大小
  + 无法预览提示（不在文本预览范围）；已知文本扩展名但不在高亮语言表里的
  回退纯文本，超 300KB 跳过 token 以保流畅。
- **MD 解释器**：`.md`/`.markdown`/`.mdx` 文件打开即渲染——基于第三方解析器
  **marked v18**（MIT，内联于插件，无外部请求）：完整 GFM（**表格**/任务列表/
  删除线/自动链接）+ 标题/段落/代码围栏（走内置高亮）/列表/引用/分隔线/行内样式，
  预览头可切回「源码」。原始 HTML 一律按纯文本转义（文件内容不可信，任何标签
  不进 DOM）；链接只放行 http(s)/mailto；图片允许 http(s) 直连与同树相对路径
  （走 `/workbench/asset` 路由，父目录 `..` 拒绝）。
- **HTML 浏览器**：`.html`/`.htm` 文件打开即在内置浏览器预览——沙箱 iframe
  （`sandbox="allow-scripts"`，无同源权限，脚本无法触碰面板或应用），相对
  `src`/`href`（同目录与子目录）自动重写到 `/workbench/asset` 路由，同树
  css/js/图片可加载；http(s)/根路径/锚点/父目录路径不动。预览头可切回「源码」。
- **代码编辑器**：文本文件（js/ts/css/html/md 等）的「源码」视图是内嵌
  **CodeMirror 6** 编辑器（BSD 协议，esbuild 打包内联，惰性加载）：行号、
  语法高亮（颜色走壳的 `--shiki-token-*` 调色板）、撤销/重做、括号匹配、
  Tab 缩进。md/html 文件在「源码 | 预览」之间切换，切到预览再切回编辑内容
  不丢失。**保存**（`POST /workbench/write`，原子写：临时文件 + rename，
  仅限已存在文件，内容 ≤ 1MB，`..` 段拒绝）成功后预览立即刷新；文件超过
  1MB 只读预览、禁用编辑。头部另提供**在 VS Code 中打开**（`POST
  /workbench/open`，优先 `code -r` 复用窗口，回退系统默认编辑器）。
- **Git tab**：分支、提交图（HEAD 标记）、工作区变更（暂存/取消暂存/全部暂存/
  忽略/取消忽略）、提交框与一键 init（非仓库时）。

预览与编辑的宿主路由见下方结构；**改源码后先 `pnpm build`** 再生效：宿主半改动需重启
dsh web（路由在进程启动时注册），客户端半改动刷新页面即可。

## 结构

源码按功能拆分在 `src/`，构建产物在 `lib/`（esbuild，`pnpm build` 生成）：

```
src/index.js    宿主半入口：name/inject/apply + 路由装配，re-export 纯函数
src/routes.js   13 条 /workbench/* 路由注册（GET/POST + CSRF 415 围栏）
src/git.js      git 事实采集与操作（runGit / inspect / init / ignore / …）
src/files.js    目录/文件操作与分类（listDir / filePreview / writeFileAtomic / …）
src/validate.js 入参校验与请求体读取
src/client/     客户端半源码（按功能拆分）
  index.js       入口：shell.overlay 注册（id: workbench）+ apply + 样式注入
  panel.js       WorkbenchPanel（面板本体）+ 三列联动（dock coupling）
  preview.js     FilePreview（文本/图片/音视频/markdown/html 预览 + 编辑保存）
  git-view.js    GitView（分支 / 提交图 / 变更 / 提交框）
  files-view.js  FilesView（目录树）
  highlight.js   无依赖语法高亮（正则 tokenizer）
  markdown.js    marked 渲染 + 安全覆写
  editor.js      CodeMirror 6 编辑器组装（惰性加载 vendor）
  tip.js / icons.js / helpers.js   气泡按钮 / 图标 / 纯工具
  styles.css     面板样式（text loader 内联进 bundle）
  vendor/        marked v18（MIT）与 CodeMirror 6（BSD）构建产物，字节原样内联
lib/index.js    构建产物：宿主半（ESM bundle，node）
lib/client.js   构建产物：客户端半（__ModuleLoader__ 工厂 bundle，含内联 vendor）
cordis.patch.yml  自带组合层：插入 dsh-work 行
build.mjs       esbuild 双产物构建脚本
test/classify.test.mjs  纯逻辑断言（文件分类 / MIME 映射 / 文本判定 / 写内容校验）
test/preview.test.mjs  纯逻辑断言（高亮 token / marked 渲染 / html 预览重写 / 编辑语言映射）
```

## 路由

- `GET /workbench/dir?path=<abs>` → 列一个目录（文件 + 目录，目录在前、名称排序，
  隐藏项标记，最多 500 条带截断标记）。
- `GET /workbench/file?path=<abs>[&full=1]` → 读一个文本文件：`{ ok, path, kind: 'text'|'binary',
  size, content?, truncated? }`。按前 8KB 是否含 NUL 判定二进制；默认文本上限 512KB
  （预览截断），`full=1` 提升到 1MB（编辑器完整内容），超出回 `truncated: true`。
  二进制不回传内容（走 asset 路由）。
- `POST /workbench/write` → 原子保存（body: `{path, content}`）：临时文件 + rename，
  仅限已存在文件，内容 ≤ 1MB，`..` 段拒绝；成功返回 `{ ok, path, size }`。
- `POST /workbench/open` → 在宿主 VS Code（优先 `code -r` 复用窗口，回退系统默认
  编辑器）中打开文件（body: `{path}`），返回 `{ ok, error? }`。
- `GET /workbench/asset?path=<abs>` → 按扩展名输出原始字节（图片/音频/视频/pdf 等
  Content-Type），支持单区间 Range（206），供 `<img>/<audio>/<video>` 直连。
- `GET /workbench/git?cwd=<abs>[&ignored=1]` → 仓库事实（分支/HEAD/提交图/变更/忽略）。
- `POST /workbench/git/{init,stage,unstage,stage-all,commit,ignore,unignore}?cwd=<abs>`
  → 变更操作，成功返回最新仓库事实（与 GET 同构），客户端直接消费该响应
  刷新面板（一次往返，不再额外重查）。POST 只接受 `application/json`
  （415 围栏，防跨站简单 POST）。

## 安装（已完成则跳过）

在 deepseek-harness checkout 目录执行（插件已发布到 npm，按名安装即可）：

```sh
pnpm dsh plugin --profile web add @bit-ark/dsh-work
```

该命令从 npm 拉取包并挂进 `~/.dsh/profiles/web`（依赖与 `dsh.profile.bundles`
由 `dsh plugin` 自动维护）。**重要**：本插件自带 bundle 层（cordis.patch.yml 插入
workbench 行），挂进 bundles 后须把 profile 自己 `cordis.patch.yml` 里旧的 workbench
手工 `insert` 删除，避免重复行 id。

## 生效方式

- 改源码后先 `pnpm build`（esbuild 生成 lib/）。
- 宿主半改动：重启 `pnpm dsh web`（路由在进程启动时注册）。
- 客户端半改动：直接刷新页面即可（bundle 按需从磁盘读取，no-cache）。
  dev:web watcher 不覆盖树外插件，属预期行为。
- 发布 npm：`pnpm publish` 会经 `prepublishOnly` 钩子**自动先 build**，
  无需手动执行；`files` 只发 `lib/` + `cordis.patch.yml`。

## 测试

```sh
pnpm test   # 先构建再断言：文件分类 / MIME 映射 / 文本-二进制判定 / 高亮 / markdown / html
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
- markdown 渲染基于 marked v18 的 GFM（表格 / 任务列表 / 删除线 / 自动链接已支持，
  脚注不支持）；相对路径图片只放行同目录与子目录（拒绝 `..`），链接仅 http(s)/mailto。
- html 预览为沙箱 iframe：相对资源走 asset 路由可加载，但脚本运行在无同源权限的
  不透明源里（无法访问应用数据），且 `<iframe>` 嵌套页面不会重写其内部资源。
