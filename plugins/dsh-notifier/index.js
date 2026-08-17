/**
 * dsh-notifier — 宿主半（Node）：最小占位。
 * Loader 在启动时导入本包主入口；真实功能全在浏览器半（`notifier` 客户端
 * 服务 + toast / 铃铛 / 托盘 UI，见 client.js）。宿主半无路由、无写操作。
 */
export const name = 'dsh-notifier'

export function apply() {
  // 有意为之的空操作：一切都在客户端半。
}
