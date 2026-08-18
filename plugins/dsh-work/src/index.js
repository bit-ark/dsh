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
 *   POST  /workbench/git/unstage?cwd=…    → git restore --staged -- <path>  (body: {path})
 *   POST  /workbench/git/stage-all?cwd=…  → git add -A
 *   POST  /workbench/git/commit?cwd=…     → git commit -m <message>  (body: {message})
 *   POST  /workbench/git/ignore?cwd=…     → append to .gitignore      (body: {path})
 *   POST  /workbench/git/unignore?cwd=…   → remove from .gitignore    (body: {path})
 *
 * Mutations return the FRESH GET payload on success ({ok:true, repo:true, …})
 * or {ok:false, error} on failure, so the panel re-renders from one round trip.
 *
 * Fact commands run with a FIXED argv (no shell): repo detection via
 * `rev-parse --git-dir`, branch via `rev-parse --abbrev-ref HEAD` with a
 * `symbolic-ref --short HEAD` fallback (an unborn branch on a fresh repo has
 * no revision yet), the commit graph via
 * `log --graph --all -n 60 --date=short --pretty=tformat:%x1e…` (the \x1e
 * sentinel separates the graph column from the commit fields; lines without a
 * sentinel are pure graph continuation rows), and
 * `--no-optional-locks status --porcelain=v1 [--ignored]`
 * (GIT_OPTIONAL_LOCKS=0 so even the status probe never touches the index;
 * `--ignored` adds `!!` rows into a separate `ignored` list). All writes are
 * user-triggered and strictly scoped to the caller's path.
 */
import { registerRoutes } from './routes.js'

export const name = 'dsh-work'

/** Hard dependency: routes register on the web surface's route table. */
export const inject = ['webServer']

export function apply(ctx) {
  ctx.effect(() => registerRoutes(ctx), 'dsh-work-git: routes')
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
