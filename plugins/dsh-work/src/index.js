/**
 * dsh-work — node half (host plane) 入口。路由装配见 ./routes.js，纯逻辑按域
 * 拆分：./git.js（git 事实与操作）、./files.js（目录/文件/分类）、
 * ./validate.js（入参校验与请求体读取）。
 *
 * 对外契约（与拆分前一致）：
 *
 *   GET   /workbench/git?cwd=<abs-path>[&ignored=1] → {
 *     ok: true, repo: false, cwd, error?            (not a repository)
 *     ok: true, repo: true, cwd, branch, head, graph, changes, ignored
 *     ok: false, cwd?, error                         (bad request / failure)
 *   }
 *   GET   /workbench/dir?path=<abs-path> → {
 *     ok: true, path, entries: [{ name, path, type, size?, hidden }], truncated
 *   }
 *   GET   /workbench/file?path=<abs-path> → {
 *     ok: true, path, kind: 'text'|'binary', size, content?, truncated?
 *   }                                      (text preview; binary has no content)
 *   GET   /workbench/asset?path=<abs-path> → raw bytes with a content-type by
 *     extension, single-range 206 support for media seeking (no JSON envelope)
 *   POST  /workbench/write                → atomic save            (body: {path, content})
 *   POST  /workbench/open                 → open in VS Code        (body: {path})
 *   POST  /workbench/git/init?cwd=…       → git init (bare, host default branch)
 *   POST  /workbench/git/stage?cwd=…      → git add -- <path>        (body: {path})
 *   POST  /workbench/git/unstage?cwd=…    → git restore --staged -- <path>（无 HEAD 的新仓库回退 git rm --cached）  (body: {path})
 *   POST  /workbench/git/stage-all?cwd=…  → git add -A
 *   POST  /workbench/git/commit?cwd=…     → git commit -m <message>  (body: {message})
 *   POST  /workbench/git/ignore?cwd=…     → append to .gitignore      (body: {path})
 *   POST  /workbench/git/unignore?cwd=…   → remove from .gitignore    (body: {path})
 *   GET   /workbench/browser?url=<abs-url> → 沙箱浏览器代理：抓取 http(s) HTML、
 *     注入 <base> + 重写 <a href> 回本代理，供 sandbox iframe 渲染；非 HTML
 *     拒绝并返回友好错误页。不走 JSON 信封，直接输出 text/html。
 *   POST  /workbench/terminal/create        → 新建 PTY 会话 (body: {cwd, cols?, rows?})
 *     成功 { ok:true, id, pid, shell, cwd, cols, rows, running:true }；上限/后端
 *     不可用回 { ok:false, error }。shell 固定为宿主 $SHELL（缺省平台缺省），
 *     不支持任意命令；env 剔除凭据形与 DSH_* 变量。
 *   GET   /workbench/terminal/list          → { ok:true, sessions:[{id, pid, shell,
 *     cwd, cols, rows, running, exitCode?, exitSignal?, subscribers, createdAt}] }
 *   POST  /workbench/terminal/kill          → 杀会话（幂等）(body: {id}) → { ok:true }
 *   WS    /workbench/terminal/ws?id=<session> → 每会话双向流：客户端
 *     {t:'i',d} 输入 / {t:'b',d} base64 二进制输入 / {t:'r',cols,rows} 缩放；
 *     服务端 {t:'o',d} 输出（attach 时先回放最近 ~256KB 环形缓冲）/
 *     {t:'exit',code,signal}。异源 Origin 拒绝（403），未知会话 404。
 *
 *   任务看板（taskboard，Host 权威账本，移植自 dsh-web-ui/dsh-task-board）：
 *   GET   /workbench/taskboard/state   → 完整 revision snapshot
 *   POST  /workbench/taskboard/action  → 幂等动作（JSON ≤64KiB），返回新 snapshot
 *   GET   /workbench/taskboard/options → 执行目标选项（workspaces/presets/permissions）
 *
 * Mutations return the FRESH GET payload on success ({ok:true, repo:true, …})
 * or {ok:false, error} on failure, so the panel re-renders from one round trip.
 *
 * Fact commands run with a FIXED argv (no shell): repo detection via
 * `rev-parse --git-dir`, branch via `rev-parse --abbrev-ref HEAD` with a
 * `symbolic-ref --short HEAD` fallback (an unborn branch on a fresh repo has
 * no revision yet), the commit graph via
 * `log --graph --all -n 60 --pretty=tformat:%x1e…` (fields include the
 * commit's unix timestamp `%at`; the \x1e
 * sentinel separates the graph column from the commit fields; lines without a
 * sentinel are pure graph continuation rows), and
 * `--no-optional-locks status --porcelain=v1 [--ignored]`
 * (GIT_OPTIONAL_LOCKS=0 so even the status probe never touches the index;
 * `--ignored` adds `!!` rows into a separate `ignored` list). All writes are
 * user-triggered and strictly scoped to the caller's path.
 */
import { registerRoutes } from './routes.js'
import { TaskboardHostService } from './taskboard/service.js'
import { registerTaskboardRoutes } from './taskboard/routes.js'

export const name = 'dsh-work'

/**
 * Hard dependencies: routes register on the web surface's route table, and the
 * task board drives real session execution through the host apiProxy. Both are
 * core dsh-web services; declaring them here makes Cordis wait (fiber inject)
 * until they exist instead of the task board disabling itself on a too-early
 * ctx.get(). agents/commands stay soft (read at execution time) — they are only
 * needed when a task pins a /permission preset.
 */
export const inject = ['webServer', 'apiProxy']

export function apply(ctx) {
  ctx.effect(() => registerRoutes(ctx), 'dsh-work-git: routes')
  // 任务看板（Host 权威账本 + 真实会话执行 + cron 调度）。
  ctx.effect(() => {
    const api = ctx.apiProxy
    if (api === undefined) {
      console.warn('[dsh-work] taskboard disabled: apiProxy service unavailable')
      return
    }
    let service
    try {
      service = new TaskboardHostService(api, {
        commandDispatcher: {
          async execute(sessionId, line, signal) {
            const agents = ctx.get('agents')
            const commands = ctx.get('commands')
            if (agents === undefined || commands === undefined) {
              throw new Error('permission command services are unavailable')
            }
            const agent = agents.get(sessionId)
            if (agent === undefined) throw new Error(`execution session ${sessionId} is not available`)
            return (await commands.execute(agent, line, [], signal))?.result
          },
        },
      })
    } catch (error) {
      // 账本目录锁被另一个 Host 持有等情形：看板失败关闭，面板其余功能保留。
      console.error('[dsh-work] taskboard disabled: ledger unavailable', error)
      return
    }
    service.start()
    const disposeRoutes = registerTaskboardRoutes(ctx, service)
    return () => {
      disposeRoutes()
      service.dispose()
    }
  }, 'dsh-work: taskboard')
}

// 纯函数 re-export：node 测试套件（test/classify.test.mjs）与拆分前一样从入口导入。
export {
  classifyFile,
  contentTypeFor,
  extensionOf,
  looksText,
  validatedWriteContent,
  writeFileAtomic,
} from './files.js'
// git 事实与操作 re-export：test/host.test.mjs 从入口导入断言（中文路径回归）。
export { addIgnore, failureReason, initRepo, inspect, removeIgnore, runGit, unstagePath } from './git.js'
// 请求体读取 re-export：test/host.test.mjs 用假 req 断言中止兜底与超限行为。
export { readJsonBody, readWriteJsonBody } from './validate.js'
// 终端纯逻辑 re-export：test/terminal.test.mjs 从入口导入断言。
export {
  clampedTermSize,
  createOutputRing,
  defaultShell,
  loginShellArgs,
  scrubbedEnv,
  MAX_TERMINAL_SESSIONS,
  TERMINAL_RING_BYTES,
} from './terminal.js'
// 任务看板纯逻辑 re-export：test/taskboard.test.mjs 从入口导入断言。
export { parseCron, isValidCron, nextRunAtMs } from './taskboard/schedule.js'
export {
  ALL_STATUSES, ARCHIVABLE_STATUSES, COLUMNS, MANUAL_STATUSES, TASK_PERMISSIONS,
  applyArchiveTask, applyCreateTask, applyDeleteTask, applyRestoreTask,
  applyScheduleNextRun, applySetSchedule, applyUpdateTask,
  canMoveManually, createTask, isTaskPermission, isTaskStatus,
  settleExecution, startExecution, withSchedule, withStatus,
} from './taskboard/domain.js'
export { parseLedger } from './taskboard/parse.js'
export { parseActionEnvelope } from './taskboard/protocol.js'
export { TaskboardLedger } from './taskboard/ledger.js'
export { TaskboardRunner, SessionLaunchError } from './taskboard/runner.js'
