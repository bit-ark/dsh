/**
 * dsh-work taskboard — 5 段 cron 解析与下一次触发计算（纯函数）。
 *
 * Ported from zhu1090093659/dsh-web-ui packages/dsh-task-board
 * src/core/schedule.ts (Apache-2.0).
 *
 * 文法：空白分隔 5 段，分 时 日 月 周。每段支持通配符、步长（通配或范围 + "/n"）、
 * 单值、闭区间 a-b、以及任意混合的逗号列表。范围：分 0-59、时 0-23、日 1-31、
 * 月 1-12、周 0-7（0 与 7 均为周日）。日与周字段同时受限时按标准 cron 的 OR 语义。
 * 非法表达式解析为 null。
 */

/** 每个字段的闭区间，按 cron 顺序。 */
const FIELD_RANGES = [
  [0, 59], // minutes
  [0, 23], // hours
  [1, 31], // days
  [1, 12], // months
  [0, 7], // weekdays (7 = Sunday, normalized below)
]

/**
 * 解析 5 段 cron 表达式。
 * @param {string} expr cron 表达式。
 * @returns {{ minutes: Set<number>, hours: Set<number>, days: Set<number>, months: Set<number>, weekdays: Set<number>, dayWildcard: boolean, weekdayWildcard: boolean } | null}
 */
export function parseCron(expr) {
  if (typeof expr !== 'string') return null
  const fields = expr.trim().split(/\s+/)
  if (fields.length !== 5) return null
  const sets = []
  for (let index = 0; index < 5; index++) {
    const [min, max] = FIELD_RANGES[index]
    const set = new Set()
    if (!parseField(fields[index], min, max, set)) return null
    sets.push(set)
  }
  const weekdays = new Set()
  for (const day of sets[4]) weekdays.add(day === 7 ? 0 : day)
  return {
    minutes: sets[0],
    hours: sets[1],
    days: sets[2],
    months: sets[3],
    weekdays,
    // 只有字面 '*' 才算不受限字段：'1-31' 这类完全枚举仍是受限字段，
    // 必须参与 日/周 OR 语义。
    dayWildcard: fields[2] === '*',
    weekdayWildcard: fields[4] === '*',
  }
}

/** 表达式是否可解析。 */
export function isValidCron(expr) {
  return parseCron(expr) !== null
}

/**
 * 计算 fromMs（毫秒纪元）之后严格大于它的下一个匹配时刻（本地时区、分钟粒度）。
 * 返回匹配分钟起点的毫秒纪元；日历约束永不可能匹配（如 `0 0 30 2 *`）时返回 undefined。
 * 五年窗口覆盖完整闰年周期。沿解析出的字段集合直走候选 年/月/日/时/分，
 * 不逐分钟扫描；墙上时钟构造 + 最终 matches 复核保持与旧逐分钟扫描一致的
 * DST 语义（春季缺失分钟向前归一，秋季重复小时不会二次访问）。
 * @param {string} expr cron 表达式。
 * @param {number} fromMs 基准时刻（毫秒纪元）。
 * @returns {number | undefined}
 */
export function nextRunAtMs(expr, fromMs) {
  const schedule = parseCron(expr)
  if (schedule === null) return undefined
  if (!hasPossibleCalendarDay(schedule)) return undefined
  const from = new Date(fromMs)
  // 五年窗口（5×366 天，与参考实现同值）：覆盖完整闰年周期。
  // 注意：即便如此，`0 0 29 2 *` 这类表达式在世纪闰年间隙（如 2097–2103）
  // 窗口内仍可能无匹配而返回 undefined；调用方据此解除武装并记录 scheduler.error。
  const limitMs = fromMs + 5 * 366 * 24 * 60 * 60 * 1000

  const sortedMinutes = [...schedule.minutes].sort((a, b) => a - b)
  const sortedHours = [...schedule.hours].sort((a, b) => a - b)
  const sortedMonths = [...schedule.months].sort((a, b) => a - b)

  let year = from.getFullYear()
  let month = from.getMonth() + 1
  let day = from.getDate()
  let hour = from.getHours()
  // 严格晚于 fromMs：从下一分钟开始。
  let minute = from.getMinutes() + 1

  while (new Date(year, month - 1, 1, 0, 0, 0, 0).getTime() <= limitMs) {
    for (const candidateMonth of sortedMonths) {
      if (candidateMonth < month) continue
      const daysInMonth = new Date(year, candidateMonth, 0).getDate()
      const dayStart = candidateMonth === month ? day : 1
      for (let candidateDay = dayStart; candidateDay <= daysInMonth; candidateDay += 1) {
        const dayProbe = new Date(year, candidateMonth - 1, candidateDay, 0, 0, 0, 0)
        if (!dayCandidate(schedule, dayProbe)) continue
        const hourStart = candidateMonth === month && candidateDay === day ? hour : 0
        for (const candidateHour of sortedHours) {
          if (candidateHour < hourStart) continue
          const minuteStart = candidateMonth === month && candidateDay === day && candidateHour === hour ? minute : 0
          for (const candidateMinute of sortedMinutes) {
            if (candidateMinute < minuteStart) continue
            const candidate = new Date(year, candidateMonth - 1, candidateDay, candidateHour, candidateMinute, 0, 0)
            const time = candidate.getTime()
            if (time <= fromMs) continue
            if (time > limitMs) return undefined
            if (matches(schedule, candidate)) return time
          }
        }
      }
    }
    year += 1
    month = 1
    day = 1
    hour = 0
    minute = 0
  }
  return undefined
}

/** 日/周 OR 门：matches 与候选扫描共用。 */
function dayCandidate(schedule, date) {
  const dayMatches = schedule.days.has(date.getDate())
  const weekdayMatches = schedule.weekdays.has(date.getDay())
  if (schedule.dayWildcard) return weekdayMatches
  if (schedule.weekdayWildcard) return dayMatches
  return dayMatches || weekdayMatches
}

/** 拒绝不可能的月/日组合，避免多年扫描。 */
function hasPossibleCalendarDay(schedule) {
  if (schedule.dayWildcard || !schedule.weekdayWildcard) return true
  const maximumDay = new Map([
    [1, 31], [2, 29], [3, 31], [4, 30], [5, 31], [6, 30],
    [7, 31], [8, 31], [9, 30], [10, 31], [11, 30], [12, 31],
  ])
  for (const month of schedule.months) {
    const maximum = maximumDay.get(month) ?? 0
    if ([...schedule.days].some(day => day <= maximum)) return true
  }
  return false
}

/** 解析单个逗号列表字段进匹配集合。 */
function parseField(field, min, max, out) {
  if (field === '*') {
    for (let value = min; value <= max; value++) out.add(value)
    return true
  }
  for (const part of field.split(',')) {
    if (part === '') return false
    // 宽容解析（与参考实现行为一致，有意不收紧）：解构忽略多余段，
    // `5/2/7` 按 `5/2` 处理、`1-5-9` 按 `1-5` 处理。
    const [range, stepRaw] = part.split('/')
    let low
    let high
    if (range === '*') {
      low = min
      high = max
    } else if (range.includes('-')) {
      const [a, b] = range.split('-')
      if (a === '' || b === '' || !isDigits(a) || !isDigits(b)) return false
      low = Number(a)
      high = Number(b)
    } else if (isDigits(range)) {
      low = Number(range)
      high = Number(range)
    } else {
      return false
    }
    if (low < min || high > max || low > high) return false
    const step = stepRaw === undefined ? 1 : isDigits(stepRaw) ? Number(stepRaw) : NaN
    if (!Number.isInteger(step) || step < 1) return false
    for (let value = low; value <= high; value += step) out.add(value)
  }
  return true
}

/** 日/周 OR 语义：受限日字段单独即可放行，反之亦然。 */
function matches(schedule, date) {
  if (!schedule.minutes.has(date.getMinutes())) return false
  if (!schedule.hours.has(date.getHours())) return false
  if (!schedule.months.has(date.getMonth() + 1)) return false
  return dayCandidate(schedule, date)
}

function isDigits(value) {
  return /^\d+$/.test(value)
}
