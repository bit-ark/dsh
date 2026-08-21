# dsh-balance

为 DeepSeek Harness Web GUI 的侧边栏 footer 增加「DeepSeek 账户」小部件
（`sidebar.footer.action` 官方插槽的一个 list 条目 = 设置按钮上方的常驻动作位）：
一个横向进度条，刻意保持精简、不渲染任何文本：

- **进度条 = 今日总余额 vs 今日消费（官方账单）**：整条代表今日总余额（余额接口
  的当前总额），其中的「消费部分」= 今日消费金额（**官方平台账单**，
  `/dsh-balance/online`，非本机估算）占总余额的比例；未消费部分为中性底色。
- **消费部分颜色标识当前时段**：低谷时段 = 成功绿
  （`--dsw-alias-state-success-primary`），高峰时段 = 警示琥珀
  （`--dsw-alias-state-warn-primary`）。峰谷判定按**北京时间**（与宿主
  `DEFAULT_PEAK_HOURS` 一致：每日**北京时间** 09:00–12:00、14:00–18:00 为高峰，
  小时 ∈ {9..11, 14..17}，其余为低谷；峰谷按北京时间计时、全球统一适用；每分钟
  tick 一次，峰谷边界到点自动变色。官方 usage 接口只按「缓存命中/未命中/输出」
  归类的每日合计、**不提供高峰/低谷拆分**，故消费段为当前时段单色（不再有本地
  估算的双色段）；「高峰 ×2 / 低谷约五折」的说明放在 title 里。
- **title 悬停说明**：因空间有限不显示文本，悬停 title 给出简要说明——今日总余额
  （充值 + 赠送拆分）、今日消费（官方账单金额）、当前时段（高峰 ×2 / 低谷约五折）、
  余额不足警告（`is_available: false` 时）。

**今日消费为什么用官方平台接口**：DeepSeek 没有面向 API key 的用量查询接口
（api.deepseek.com 上所有候选路由实测 404），精确的每日消费只在官网控制台背后的
私有接口里（`platform.deepseek.com/api/v0/usage/*`），需要浏览器登录会话的
`userToken`（localStorage 里的值，非 API key）。配置方式见下「平台 Token」。

数据来自本插件宿主路由 `GET /dsh-balance/balance`（官方余额）与
`GET /dsh-balance/online`（平台私有用量接口的今日消费）。拉取时机：挂载 /
窗口 focus（10s 节流）/ 每 5 分钟兜底刷新。今日消费不可用（未配置或失效的
userToken、网络异常）时：进度条只剩余额中性底色，title 给出原因与修复指引——
余额数字本身始终是官方准确的。原「设置 → DeepSeek 账户」整页（余额卡 + Token
消耗图 + Top API Key）随迁移移除；宿主 `/usage` 端点保留（只读 API，供其他
消费方使用），客户端页面不再引用。

## 结构

```
src/index.ts          宿主半：GET /dsh-balance/balance | /usage | /online（只读）
src/platform.ts       平台私有用量客户端：北京归日 + usage/cost 解析（可独立测试）
src/usage-fold.ts     纯函数：usage 折叠 / 按天分桶（可独立测试）
src/client/index.tsx  客户端半：sidebar.footer.action 注册（id: dsh-balance, order: 10）
build.mjs             esbuild 构建（lib/index.js + lib/client.js 工厂包装）
cordis.patch.yml      自带组合层：插入 dsh-balance 行
test/usage-fold.test.mjs  纯折叠逻辑断言
test/platform.test.mjs    平台用量解析断言
```

## 宿主半端点

- `GET /dsh-balance/balance`
  key 解析顺序：`ctx.credentials.resolve(apiKeyEnv)`（与 Models 页写入的同一凭据，
  默认引用 `DEEPSEEK_API_KEY`）→ 进程环境变量回退。余额查询固定走官方
  `https://api.deepseek.com`（即使聊天经代理转发），可用行配置覆盖。业务失败
  返回 `200 + { ok:false, code }`，code ∈ `missing-key | auth-failed | upstream |
  network`；key 本身绝不回显。
- `GET /dsh-balance/usage?days=N&refresh=1`
  `sessionPersistence.list()/load()` 全量扫描会话日志（zstd 解码在后端内部），
  每个 `(turn, step)` 取最后一个 usage 样本（message 终值替换 chunk 早期值，
  与 harness 自带 token-meter 语义一致），fork/子代理跳过 `seedLength` 继承前缀
  避免双算。聚合分三趟但同一样本集内存常驻（O(n) 遍历）：分桶 + 全量费用 +
  按 key 聚合；全量历史总计在折叠时增量累加，窗口合计由日桶直接求和。
  结果内存缓存 5 分钟（`cacheTtlMs`），`refresh=1` 强制重算，在途计算按
  `(days, refresh)` 键控去重；days 上限 90，并发 4，单会话读取失败计数跳过。
  响应含 `todayCost`（**今日消费峰谷拆分**，元：`{ peak, offPeak, total, priced }`——
  高峰时段的样本按 ×2 计，priced = 今日是否有可计价样本），供其他消费方使用；
  另含 `topKeys`（按 API key 分组的全量消耗 Top 5）：
  usage 样本经最近的 `request/header` 归属到 provider 路由，再经 `keyNameByProvider`
  映射成凭据引用名（同名 key 的多个 provider 合并）。每项（key / 模型 / 日桶 /
  合计）还带**估算费用** `cost`：按模型单价表 × token 数折算，落在高峰时段（默认
  北京时间 09:00–12:00、14:00–18:00 为高峰）的请求 ×2（即空闲价为高峰一半）；
  未配置价格的模型为 `null`（不计费，显示 —）。
- `GET /dsh-balance/online`
  **官方平台账单的今日消费**（侧边栏小部件用的就是这个，替代本机估算）。
  优先调 `https://platform.deepseek.com/api/v0/usage/by_api_key/cost?start=&end=&tz=28800`
  （按 API key 维度，返回小时桶时间序列，数据最实时），失败时回退到月度查询
  `https://platform.deepseek.com/api/v0/usage/cost?month=&year=`（按天汇总）。
  两种格式均由解析器自动识别处理。`tz=28800` 为北京时区偏移（8h × 3600s），
  确保平台按北京时间归日。
  返回 `{ ok, todayCost, currency, fetchedAt }`。
  业务失败以 `200 + { ok:false, code }` 返回，code ∈
  `missing-token | platform-auth | upstream | network`；
  `missing-token` = 未配置 userToken，`platform-auth` = token 失效/过期
  （40002/40003）。结果内存缓存 5 分钟；凭证失效类错误不缓存（更新 token 后
  立即生效）。token 只在请求头使用，绝不回显 / 记日志。

## 平台 Token（userToken）

DeepSeek 没有面向 API key 的用量接口，精确消费只能调平台私有接口，需要浏览器
登录会话的 `userToken`（**非 API key**）。获取方式：

1. 浏览器打开 https://platform.deepseek.com 并登录；
2. F12 → Application → Local Storage → `https://platform.deepseek.com` → 找到
   `userToken` → 复制其值；
3. 配置给插件（任选其一，优先级从高到低）：
   - 行配置 `platformToken`（见下）；
   - `~/.dsh/.credentials.yaml` 里加 `DEEPSEEK_PLATFORM_TOKEN: <token>`（与
     `DEEPSEEK_API_KEY` 同机制）；
   - 环境变量 `DEEPSEEK_PLATFORM_TOKEN`。
4. 重启 `pnpm dsh web` 生效。

注意：userToken 是账号会话凭证，会过期；过期后小部件 title 会提示
「平台 Token 无效或已过期」，重新登录并更新即可（凭证失效错误不缓存，无需等
5 分钟缓存）。

## 行配置（全部可选）

```yaml
config:
  apiKeyEnv: DEEPSEEK_API_KEY        # 凭据引用（环境变量名）
  balanceBaseURL: https://api.deepseek.com
  usageDays: 14                      # 默认图表窗口（1..90）
  cacheTtlMs: 300000                 # 消耗聚合缓存
  costCurrency: CNY                  # 费用显示币种（CNY → ¥，USD → $）
  # 平台会话 userToken（非 API key）——官方今日消费（/online）必需，
  # 见上「平台 Token」；也可用 DEEPSEEK_PLATFORM_TOKEN 凭据/环境变量
  # platformToken: <userToken>
  # 高峰时段（北京时间小时 0..23），命中者按单价 ×2（空闲价为高峰一半）；
  # 默认北京时间 09:00–12:00 与 14:00–18:00
  peakHours: [9, 10, 11, 14, 15, 16, 17]
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

在 deepseek-harness checkout 目录执行（插件已发布到 npm，按名安装即可）：

```sh
pnpm dsh plugin --profile web add @bit-ark/dsh-balance
```

该命令从 npm 拉取包并挂进 `~/.dsh/profiles/web`（依赖与 `dsh.profile.bundles`
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
