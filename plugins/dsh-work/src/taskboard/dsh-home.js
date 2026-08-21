/**
 * dsh-work taskboard — DSH_HOME 解析。
 *
 * Ported from zhu1090093659/dsh-web-ui shared/host/dsh-home.ts (Apache-2.0)。
 * 环境变量 DSH_HOME 优先，平台 home 兜底。
 */
import { homedir } from 'node:os'
import { isAbsolute, join } from 'node:path'

/** 展开路径开头的 ~（或 ~user），平台风格。 */
export function expandHome(path, home = homedir()) {
  if (path === '~') return home
  if (path.startsWith('~/') || path.startsWith('~\\')) return join(home, path.slice(2))
  return path
}

/**
 * 解析 DSH home 目录。
 * @param {NodeJS.ProcessEnv} env 读取 DSH_HOME 的环境。
 * @param {string} home 平台 home 兜底（测试缝）。
 * @returns {string} 绝对路径。
 */
export function resolveDshHome(env = process.env, home = homedir()) {
  const raw = env.DSH_HOME
  if (raw !== undefined && raw.trim() !== '') {
    const expanded = expandHome(raw.trim(), home)
    return isAbsolute(expanded) ? expanded : join(process.cwd(), expanded)
  }
  return join(home, '.dsh')
}

/** 从当前环境解析 DSH home 目录。 */
export function dshHome() {
  return resolveDshHome()
}
