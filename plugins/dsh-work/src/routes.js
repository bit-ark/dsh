/**
 * dsh-work — /workbench/* 路由装配（宿主半）。
 *
 * 只负责把各功能路由模块（git / files / browser / terminal）注册到
 * ctx.webServer 并聚合卸载逻辑；具体 handler 见 src/routes/ 子模块。
 * 任务看板路由由 taskboard/routes.js 在宿主 apply 时单独注册。
 */
import { registerGitRoutes } from './routes/git.js'
import { registerFileRoutes } from './routes/files.js'
import { registerBrowserRoutes } from './routes/browser.js'
import { registerTerminalRoutes } from './routes/terminal.js'

/**
 * 注册全部 /workbench/* 路由。
 *
 * @param {object} ctx 插件上下文（webServer 挂载点）
 */
export function registerRoutes(ctx) {
  ctx.effect(() => {
    const cleanups = [
      ...registerGitRoutes(ctx),
      ...registerFileRoutes(ctx),
      ...registerBrowserRoutes(ctx),
      registerTerminalRoutes(ctx),
    ]
    return () => {
      for (const dispose of cleanups) {
        try { dispose() } catch { /* 单个路由卸载失败不影响其余 */ }
      }
    }
  }, 'dsh-work: routes')
}
