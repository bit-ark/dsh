/**
 * dsh-work taskboard — 时间格式化 helper。
 *
 * Ported from zhu1090093659/dsh-web-ui packages/dsh-task-board
 * src/client/board/TaskCard.tsx (formatHostTimestamp/formatTime, Apache-2.0)。
 */

/** 完整时间戳（Host 时区）。 */
export function formatHostTimestamp(ms, timeZone) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'medium',
      ...(timeZone === undefined ? {} : { timeZone }),
    }).format(new Date(ms))
  } catch {
    return new Date(ms).toISOString()
  }
}

/** 紧凑相对/绝对时间。 */
export function formatTime(ms, timeZone) {
  const date = new Date(ms)
  const now = Date.now()
  // 未来时间戳（如 nextRunAt）直接显示绝对时间：否则负分钟会误落"刚刚"。
  if (ms > now) return formatHostTimestamp(ms, timeZone)
  const minutes = Math.floor((now - ms) / 60000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes} 分钟前`
  if (minutes < 60 * 24) return `${Math.floor(minutes / 60)} 小时前`
  if (timeZone !== undefined) return formatHostTimestamp(ms, timeZone)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
