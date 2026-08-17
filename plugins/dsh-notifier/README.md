# dsh-notifier

通用应用内通知插件：顶部 toast + 会话头铃铛/托盘，并对外提供 `notifier`
客户端服务供其他插件消费。

- **toast**：屏幕顶部居中的瞬时通知（自动消失），点击可执行通知自带的
  `onClick`。toast 宿主挂在 body 上，不依赖任何会话即可工作。
- **铃铛/托盘**：会话头工具区（`conversation.session.header.utilities` 插槽，
  order 0）的铃铛按钮，带未读计数徽标；点击展开通知托盘，可逐条「知道了」。
- **notifier 服务**：`ctx.get('notifier')` 暴露 `{ notify(input), dismiss(id) }`。
  消费方可选（特性探测）：本插件未装载时消费方行为不变。

## 结构

```
index.js    宿主半：最小占位（无路由、无写操作）
client.js   客户端半：toast 宿主 + 铃铛/托盘 + notifier 服务
cordis.patch.yml  自带组合层：插入 dsh-notifier 行
```

## 消费方式（给插件作者）

```js
// 任意已装载的客户端插件（可选依赖，勿写进 inject）：
const notifier = ctx.get('notifier')
if (notifier !== undefined) {
  notifier.notify({
    id: 'my-event-123',          // 同一 id 本会话只 toast 一次
    title: '发现新版本',          // toast 标题（必填）
    body: 'v1.2.3 可更新',       // 可选，托盘保留（当前托盘只展示 title）
    tone: 'update',              // 'update' | 'error' | 其他（绿点）
    onClick: () => { /* 点击 toast 的行为 */ },
  })
}
```

## 安装（已完成则跳过）

在 deepseek-harness checkout 目录执行：

```sh
pnpm dsh plugin --profile web add <仓库克隆路径>/plugins/dsh-notifier
```

## 生效方式

- 本插件功能全在客户端半：改动后刷新页面即可（重启更稳妥）。dev:web watcher
  不覆盖树外插件，属预期行为。

## 通用性说明

- 纯客户端服务 + UI，不触碰 harness 私有实现；样式全部使用主题 token
  （--dsw-alias-*），深浅主题自动适配。
- 不产生任何示例通知（无自检桩）；真正的通知来自消费方（如 dsh-updater 的
  新版本提醒），保证业务闭环且共享时无噪音。
