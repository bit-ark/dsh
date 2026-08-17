# dsh-deepseek-balance

为 DeepSeek Harness Web GUI 的设置面板增加「DeepSeek 账户」页（`settings.section`
官方插槽的一个 list 条目 = 左侧导航菜单项 + 整页内容区）：

- **账户余额**：调用 DeepSeek 官方公开接口 `GET /user/balance`（API key 鉴权），
  显示总额 / 赠送 / 充值拆分、币种（CNY/USD）、是否可用于 API 调用。
  卡片上的「充值」按钮一键直达官方充值页 `platform.deepseek.com/top_up`
  （落地即扫码支付页）；充值完切回本页时余额自动刷新（window focus 触发，10s 节流）。
  DeepSeek 没有公开的充值下单 API（私有端点只认浏览器登录态，API key 无法鉴权），
  因此不做页内二维码，一键直达官方页是唯一稳定路径。
- **Token 消耗柱状图**：按本地日历日堆叠柱状图（未缓存输入 / 缓存读 / 缓存写 /
  输出），默认最近 14 天，附窗口合计、历史总计与消耗最多的 API Key Top 5
  （凭据引用名 + 归属 provider + **模型细分** + token 数）。
  说明：模型（如 `deepseek-v4-flash`）与 provider 路由（如 `deepseek-official`，
  即"DeepSeek 官方 API"适配器）是两个维度——key 按 provider 归属，同 key 下
  多个模型（v4-flash / v4-pro）再按模型细分展示。
- 数据源说明：DeepSeek 平台**没有**面向 API key 的消耗历史公开接口
  （`platform.deepseek.com/api/v0/usage/*` 是需要浏览器登录 token 的私有接口），
  因此柱状图聚合的是**本机 harness 持久化会话日志**中 provider 上报的实际
  usage（`assistant/message` / `assistant/chunk(usage)` 事件）——即"这个 harness
  实例产生的消耗"，不是平台账号的全量账单。

## 结构

```
src/index.ts          宿主半：GET /dsh-deepseek-balance/balance | /usage（只读）
src/usage-fold.ts     纯函数：usage 折叠 / 按天分桶（可独立测试）
src/client/index.tsx  客户端半：settings.section 注册（id: dsh-deepseek-balance, order: 30）
build.mjs             esbuild 构建（lib/index.js + lib/client.js 工厂包装）
cordis.patch.yml      自带组合层：插入 dsh-deepseek-balance 行
test/usage-fold.test.mjs  纯折叠逻辑断言
```

## 宿主半端点

- `GET /dsh-deepseek-balance/balance`
  key 解析顺序：`ctx.credentials.resolve(apiKeyEnv)`（与 Models 页写入的同一凭据，
  默认引用 `DEEPSEEK_API_KEY`）→ 进程环境变量回退。余额查询固定走官方
  `https://api.deepseek.com`（即使聊天经代理转发），可用行配置覆盖。业务失败
  返回 `200 + { ok:false, code }`，code ∈ `missing-key | auth-failed | upstream |
  network`；key 本身绝不回显。
- `GET /dsh-deepseek-balance/usage?days=N&refresh=1`
  `sessionPersistence.list()/load()` 全量扫描会话日志（zstd 解码在后端内部），
  每个 `(turn, step)` 取最后一个 usage 样本（message 终值替换 chunk 早期值，
  与 harness 自带 token-meter 语义一致），fork/子代理跳过 `seedLength` 继承前缀
  避免双算。聚合为单遍：工作线程内折叠的同时增量累加历史总计，窗口合计由
  日桶直接求和（不再二次遍历全部样本）。结果内存缓存 5 分钟（`cacheTtlMs`），
  `refresh=1` 强制重算；days 上限 90，并发 4，单会话读取失败计数跳过。
  响应含 `topKeys`（按 API key 分组的全量消耗 Top 5）：usage 样本经最近的
  `request/header` 归属到 provider 路由，再经 `keyNameByProvider` 映射成凭据
  引用名（同名 key 的多个 provider 合并）。每项（key / 模型 / 日桶 / 合计）还
  带**估算费用** `cost`：按模型单价表 × token 数折算，落在高峰时段（默认
  09:00–14:00 北京）的请求 ×2；未配置价格的模型为 `null`（不计费，显示 —）。

## 行配置（全部可选）

```yaml
config:
  apiKeyEnv: DEEPSEEK_API_KEY        # 凭据引用（环境变量名）
  balanceBaseURL: https://api.deepseek.com
  usageDays: 14                      # 默认图表窗口（1..90）
  cacheTtlMs: 300000                 # 消耗聚合缓存
  costCurrency: CNY                  # 费用显示币种（CNY → ¥，USD → $）
  # 高峰时段（北京时间小时 0..23），命中者按单价 ×2；默认 09:00–14:00
  peakHours: [9, 10, 11, 12, 13]
  # 模型单价（元 / 百万 tokens，空闲时段基准），合并覆盖内置默认价
  # （deepseek-v4-flash: 命中 0.05 / 未命中 1.5 / 输出 4.5；
  #   deepseek-v4-pro:  命中 0.15 / 未命中 4.5 / 输出 13.5）。
  # 未配置价格的模型不计费；缓存写入按「未命中输入」价近似。
  pricesPerM:
    deepseek-v4-flash: { inputMiss: 1.5, inputHit: 0.05, output: 4.5 }
    deepseek-v4-pro: { inputMiss: 4.5, inputHit: 0.15, output: 13.5 }
    # 其他 provider 的模型（如 qwen3.8-max）按需补充：
    # qwen3.8-max: { inputMiss: X, inputHit: X, output: X }
  # provider 路由 → API key 名称（凭据引用）显式映射，覆盖自动探测。
  # 缺省自动读取 llm-deepseek / llm-pi-ai 设置命名空间推导：
  keyNameByProvider:
    deepseek-official: DEEPSEEK_API_KEY
    qwen-token-plan-cn: QWEN_TOKEN_PLAN_CN_API_KEY
```

## 构建

```sh
pnpm install   # 首次（仅 esbuild）
pnpm build     # 修改 src/ 后重新构建 lib/
pnpm test      # 纯折叠逻辑断言（构建后运行）
```

## 安装（已完成则跳过）

在 deepseek-harness checkout 目录执行：

```sh
pnpm dsh plugin --profile web add <仓库克隆路径>/plugins/dsh-deepseek-balance
```

该命令把包以 `link:` 形式挂进 `~/.dsh/profiles/web`（依赖与 `dsh.profile.bundles`
由 `dsh plugin` 自动维护），之后每次 `pnpm dsh web` 启动都会加载本插件。

## 生效方式

- **宿主半改动：重建后必须重启 `pnpm dsh web`**（路由在进程启动时注册）。
- 客户端半改动：`pnpm build` 后刷新页面即可（重启更稳妥）。dev:web watcher
  不覆盖树外插件，属预期行为。

## 已知边界

- 余额是平台账户级数据；消耗图是本机会话日志聚合——两者口径不同属预期
  （平台未开放 API key 维度的消耗历史接口）。
- 按 API key 的消耗归属基于会话日志中的 provider 路由（`request/header`），
  日志从不记录 key 本身（安全设计）；provider → key 名映射来自 llm 设置
  命名空间自动推导，映射不到的 provider 以其路由 id 展示。
- 费用是**估算**：按内置/行配置单价 × token 折算，历史消耗按现价近似
  （2026-08-17 前为旧统一计费，无法精确还原）；高峰时段按北京时间判定。
  以 DeepSeek 官方账单为准。
- 只统计已落盘事件：进行中会话尚未 flush 的尾部不计入；下次刷新/重算补齐。
- 压缩（compaction）不影响统计：usage 挂在 `assistant/message` 事件上，
  compaction 只替换 surface 节点，历史 usage 保留。
- 插件全程只读：不写会话 / 设置 / 磁盘，不使用定时器，无持久化状态（仅内存缓存）。
- 会话极多时首次统计（缓存未命中）会全量解压日志，可能需要几秒；页面有
  「统计中…」状态与「缓存」标记。
