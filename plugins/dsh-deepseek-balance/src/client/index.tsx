/**
 * dsh-deepseek-balance — 客户端半（Browser）。
 *
 * 在 `settings.section` 列表插槽注册一个条目（官方可追加位 = 设置左侧导航菜单
 * 项 + 整页内容区；General/Models/Plugins 用的也是这个插槽）。页面含三块：
 *
 *  - 余额卡：GET /dsh-deepseek-balance/balance —— 各币种总额 / 赠送 / 充值、
 *    可用性徽标、刷新。业务失败以 `ok:false` + code（'missing-key' |
 *    'auth-failed' | 'upstream' | 'network'）返回，渲染友好指引而非异常。
 *  - 消耗图：GET /dsh-deepseek-balance/usage —— provider 上报的每日 token
 *    用量堆叠柱状图（未缓存输入 / 缓存读 / 缓存写 / 输出），附窗口合计、
 *    历史总计与绕过宿主缓存的「重新统计」。
 *  - Top 会话：按历史总计最重的 5 个会话。
 *
 * 数据全部来自本插件自己的宿主路由，不读其他 store。图表是纯 CSS 实现
 * （冻结的浏览器模块表里没有第三方图表库可用），颜色用主题 token，深浅色自动
 * 适配。
 */
import { useCallback, useEffect, useRef, useState } from 'react'

export const inject = ['slots']

/** 线上数据形状（宿主路由的纯 JSON 投影）。 */
interface BalanceEntry {
  currency: string
  total: string
  granted: string
  toppedUp: string
}
type BalancePayload =
  | { ok: true; available: boolean; balances: BalanceEntry[]; fetchedAt: string }
  | { ok: false; code: string; message: string }

interface DayRow {
  date: string
  label: string
  uncachedInput: number
  output: number
  cacheRead: number
  cacheWrite: number
  total: number
  requests: number
}
interface TopSessionRow {
  sessionId: string
  cwdLabel: string
  total: number
}
type UsagePayload =
  | {
      ok: true
      days: DayRow[]
      totals: { uncachedInput: number; output: number; cacheRead: number; cacheWrite: number; total: number }
      allTimeTotal: number
      allTimeRequests: number
      topSessions: TopSessionRow[]
      sessionsScanned: number
      skipped: number
      windowDays: number
      generatedAt: string
      cached: boolean
    }
  | { ok: false; code: string; message: string }

const CHART_HEIGHT = 150

/**
 * 官方充值页：直达扫码支付落地页。DeepSeek 没有公开的充值下单 API
 * （私有订单端点只认浏览器登录态，API key 无法鉴权），一键直达官方页是
 * 唯一稳定路径。
 */
const TOP_UP_URL = 'https://platform.deepseek.com/top_up'

/** 焦点刷新节流：从充值页切回时刷新一次，普通焦点抖动保持安静。 */
const FOCUS_REFRESH_MIN_GAP_MS = 10_000

/** 堆叠柱的四个分桶：字段名 → 中文标签 + 主题色。 */
const SEGMENTS = [
  { field: 'uncachedInput' as const, label: '未缓存输入', color: 'var(--dsw-alias-brand-primary)' },
  { field: 'cacheRead' as const, label: '缓存读', color: 'var(--dsw-alias-state-warn-primary)' },
  { field: 'cacheWrite' as const, label: '缓存写', color: 'var(--dsw-alias-label-tertiary)' },
  { field: 'output' as const, label: '输出', color: 'var(--dsw-alias-state-success-primary)' },
]

/** 拉取 JSON；网络错误 / 非 2xx / 空响应统一抛可读错误。 */
async function fetchJson(path: string): Promise<any> {
  let response: Response
  try {
    response = await fetch(path, { headers: { accept: 'application/json' } })
  } catch (error) {
    throw new Error(`网络错误：${error instanceof Error ? error.message : String(error)}`)
  }
  let payload: any
  try {
    payload = await response.json()
  } catch {
    payload = undefined
  }
  if (!response.ok || payload === undefined) {
    throw new Error(`请求失败（HTTP ${String(response.status)}）`)
  }
  return payload
}

/** token 数格式化（千分位，非法值显示 0）。 */
function formatTokens(value: number): string {
  if (!Number.isFinite(value)) return '0'
  return Math.round(value).toLocaleString('en-US')
}

/** ISO 时间戳 → 本地可读时间（非法输入返回空串）。 */
function formatTime(iso: string): string {
  const ms = Date.parse(iso)
  if (Number.isNaN(ms)) return ''
  try {
    return new Date(ms).toLocaleString()
  } catch {
    return ''
  }
}

/** 币种符号（已知币种给符号，未知给「币种 + 空格」）。 */
function currencySymbol(currency: string): string {
  if (currency === 'CNY') return '¥'
  if (currency === 'USD') return '$'
  return `${currency} `
}

const styles = {
  root: {
    height: '100%',
    overflowY: 'auto',
    padding: '16px 20px',
    boxSizing: 'border-box',
    color: 'var(--dsw-alias-label-primary)',
    fontSize: 'var(--dsw-font-xs-13, 13px)',
    fontFamily: 'var(--dsw-font-family, inherit)',
  },
  pageHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginBottom: '4px',
  },
  title: {
    fontSize: 'var(--dsw-font-xs-strong-13, 13px)',
    fontWeight: 600,
  },
  hint: {
    color: 'var(--dsw-alias-label-secondary)',
    fontSize: 'var(--dsw-font-xxs-12, 12px)',
    marginBottom: '12px',
  },
  card: {
    padding: '12px 14px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid var(--dsw-alias-border-l2)',
    background: 'var(--dsw-alias-bg-layer-1)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    marginBottom: '10px',
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: 'var(--dsw-font-xs-13, 13px)',
  },
  cardTag: {
    color: 'var(--dsw-alias-label-tertiary)',
    fontSize: 'var(--dsw-font-xxs-12, 12px)',
    fontWeight: 400,
    marginLeft: '6px',
  },
  button: {
    flex: 'none',
    padding: '3px 10px',
    borderRadius: '6px',
    fontSize: 'var(--dsw-font-xxs-12, 12px)',
    cursor: 'pointer',
    background: 'transparent',
    border: '1px solid var(--dsw-alias-border-l2)',
    color: 'var(--dsw-alias-label-primary)',
  },
  topupButton: {
    flex: 'none',
    padding: '3px 10px',
    borderRadius: '6px',
    fontSize: 'var(--dsw-font-xxs-12, 12px)',
    cursor: 'pointer',
    background: 'transparent',
    border: '1px solid var(--dsw-alias-brand-primary)',
    color: 'var(--dsw-alias-brand-primary)',
  },
  buttonRow: {
    display: 'flex',
    gap: '6px',
  },
  error: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--dsw-alias-state-error-primary)',
    color: 'var(--dsw-alias-state-error-primary)',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
  notice: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--dsw-alias-border-l2)',
    color: 'var(--dsw-alias-label-secondary)',
    whiteSpace: 'pre-wrap',
  },
  loading: {
    color: 'var(--dsw-alias-label-tertiary)',
    padding: '6px 0',
  },
  bigFigure: {
    fontSize: '22px',
    fontWeight: 650,
    lineHeight: 1.2,
  },
  subFigure: {
    color: 'var(--dsw-alias-label-secondary)',
    fontSize: 'var(--dsw-font-xxs-12, 12px)',
    marginTop: '2px',
  },
  badge: (ok: boolean): Record<string, string> => ({
    display: 'inline-block',
    marginTop: '8px',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: 'var(--dsw-font-xxs-12, 12px)',
    color: ok ? 'var(--dsw-alias-state-success-primary)' : 'var(--dsw-alias-state-warn-primary)',
    border: `1px solid ${ok ? 'var(--dsw-alias-state-success-primary)' : 'var(--dsw-alias-state-warn-primary)'}`,
  }),
  tiny: {
    color: 'var(--dsw-alias-label-tertiary)',
    fontSize: 'var(--dsw-font-xxs-12, 12px)',
    marginTop: '8px',
  },
  legend: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '10px',
    color: 'var(--dsw-alias-label-secondary)',
    fontSize: 'var(--dsw-font-xxs-12, 12px)',
  },
  legendSwatch: (color: string): Record<string, string | number> => ({
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '2px',
    background: color,
    marginRight: '4px',
  }),
  dayLabel: {
    textAlign: 'center',
    color: 'var(--dsw-alias-label-tertiary)',
    fontSize: '10px',
    marginTop: '4px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  totalsRow: {
    marginTop: '10px',
    color: 'var(--dsw-alias-label-secondary)',
    fontSize: 'var(--dsw-font-xxs-12, 12px)',
    lineHeight: 1.6,
  },
  sessionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 0',
    borderBottom: '1px solid var(--dsw-alias-border-l1)',
  },
  sessionName: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  sessionId: {
    color: 'var(--dsw-alias-label-tertiary)',
    fontSize: 'var(--dsw-font-xxs-12, 12px)',
  },
  empty: {
    padding: '16px 0',
    textAlign: 'center',
    color: 'var(--dsw-alias-label-tertiary)',
  },
} as const

/**
 * 堆叠柱状图：每根柱高按当日总量比例映射到 CHART_HEIGHT，柱内四个分桶按各自
 * 占比堆叠；柱顶 title 展示完整明细；日期标签按天数稀疏显示。
 */
function UsageChart({ days }: { days: DayRow[] }): any {
  const max = Math.max(...days.map(day => day.total), 1)
  const labelEvery = days.length > 16 ? 3 : days.length > 9 ? 2 : 1
  return (
    <div>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'stretch' }}>
        {days.map((day, index) => {
          const barPx = day.total > 0 ? Math.max(3, (day.total / max) * CHART_HEIGHT) : 0
          const segmentPx = (value: number): number =>
            day.total > 0 && value > 0 ? (value / day.total) * barPx : 0
          const tooltip = `${day.date}\n`
            + `未缓存输入 ${formatTokens(day.uncachedInput)} · 缓存读 ${formatTokens(day.cacheRead)}`
            + ` · 缓存写 ${formatTokens(day.cacheWrite)} · 输出 ${formatTokens(day.output)}\n`
            + `共 ${formatTokens(day.total)} tokens · ${String(day.requests)} 次请求`
          const showLabel = index % labelEvery === 0 || index === days.length - 1
          return (
            <div key={day.date} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <div
                title={tooltip}
                style={{
                  height: `${String(CHART_HEIGHT)}px`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  borderBottom: '1px solid var(--dsw-alias-border-l1)',
                }}
              >
                {barPx > 0
                  ? (
                      <div style={{ borderRadius: '3px 3px 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        {SEGMENTS.map(segment => (
                          <div
                            key={segment.field}
                            style={{ height: `${String(segmentPx(day[segment.field]))}px`, background: segment.color }}
                          />
                        ))}
                      </div>
                    )
                  : null}
              </div>
              <div style={{ ...styles.dayLabel, visibility: showLabel ? 'visible' : 'hidden' } as any}>
                {day.label}
              </div>
            </div>
          )
        })}
      </div>
      <div style={styles.legend}>
        {SEGMENTS.map(segment => (
          <span key={segment.field}>
            <span style={styles.legendSwatch(segment.color)} />
            {segment.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function BalanceSection(_props: { close?: () => void }): any {
  const [balance, setBalance] = useState<BalancePayload | null>(null)
  const [balanceError, setBalanceError] = useState<string | null>(null)
  const [balanceLoading, setBalanceLoading] = useState(true)
  const [usage, setUsage] = useState<UsagePayload | null>(null)
  const [usageError, setUsageError] = useState<string | null>(null)
  const [usageLoading, setUsageLoading] = useState(true)
  const lastBalanceFetchAt = useRef(0)
  // 卸载保护：设置页关闭时忽略在途请求的过期 setState（避免写已卸载组件）。
  const aliveRef = useRef(true)
  useEffect(() => () => { aliveRef.current = false }, [])

  const loadBalance = useCallback(async (): Promise<void> => {
    setBalanceLoading(true)
    setBalanceError(null)
    try {
      const payload = await fetchJson('/dsh-deepseek-balance/balance') as BalancePayload
      if (aliveRef.current) setBalance(payload)
    } catch (error) {
      if (!aliveRef.current) return
      setBalance(null)
      setBalanceError(error instanceof Error ? error.message : String(error))
    } finally {
      lastBalanceFetchAt.current = Date.now()
      if (aliveRef.current) setBalanceLoading(false)
    }
  }, [])

  const openTopUp = useCallback((): void => {
    window.open(TOP_UP_URL, '_blank', 'noopener')
  }, [])

  // 从官方充值页切回时应显示最新余额：window focus 触发，带节流
  // （普通焦点抖动不触发请求）。
  useEffect(() => {
    const onFocus = (): void => {
      if (Date.now() - lastBalanceFetchAt.current < FOCUS_REFRESH_MIN_GAP_MS) return
      void loadBalance()
    }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [loadBalance])

  const loadUsage = useCallback(async (refresh: boolean): Promise<void> => {
    setUsageLoading(true)
    setUsageError(null)
    try {
      const path = refresh ? '/dsh-deepseek-balance/usage?refresh=1' : '/dsh-deepseek-balance/usage'
      const payload = await fetchJson(path) as UsagePayload
      if (aliveRef.current) setUsage(payload)
    } catch (error) {
      if (!aliveRef.current) return
      setUsage(null)
      setUsageError(error instanceof Error ? error.message : String(error))
    } finally {
      if (aliveRef.current) setUsageLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadBalance()
    void loadUsage(false)
  }, [loadBalance, loadUsage])

  const children: any[] = []

  children.push(
    <div key="page-header" style={styles.pageHeader}>
      <span style={styles.title}>DeepSeek 账户</span>
    </div>,
    <div key="page-hint" style={styles.hint}>
      余额来自 DeepSeek 官方接口；消耗统计自本机持久化会话日志（provider 上报的实际 token 用量）。充值直达官方扫码页，返回本页后余额自动刷新。
    </div>,
  )

  // ── 余额卡 ──────────────────────────────────────────────────────────────
  const balanceBody: any[] = []
  if (balanceLoading) {
    balanceBody.push(<div key="b-loading" style={styles.loading}>正在获取余额…</div>)
  } else if (balanceError !== null) {
    balanceBody.push(<div key="b-error" style={styles.error}>{balanceError}</div>)
  } else if (balance !== null && balance.ok === false) {
    if (balance.code === 'missing-key') {
      // 缺 key 是配置问题：给指引而非错误 + 重试。
      balanceBody.push(<div key="b-missing" style={styles.notice}>{balance.message}</div>)
    } else {
      balanceBody.push(
        <div key="b-fail" style={styles.error}>{balance.message}</div>,
        <button key="b-retry" type="button" style={{ ...styles.button, marginTop: '8px' }} onClick={() => void loadBalance()}>
          重试
        </button>,
      )
    }
  } else if (balance !== null && balance.ok === true) {
    if (balance.balances.length === 0) {
      balanceBody.push(<div key="b-empty" style={styles.loading}>接口未返回余额信息</div>)
    }
    for (const entry of balance.balances) {
      balanceBody.push(
        <div key={`b-${entry.currency}`}>
          <div style={styles.bigFigure}>{currencySymbol(entry.currency)}{entry.total}</div>
          <div style={styles.subFigure}>
            赠送 {currencySymbol(entry.currency)}{entry.granted}
            {' · '}
            充值 {currencySymbol(entry.currency)}{entry.toppedUp}
          </div>
        </div>,
      )
    }
    balanceBody.push(
      <div key="b-badge">
        <span style={styles.badge(balance.available)}>
          {balance.available ? '可用于 API 调用' : '余额不足，API 调用可能失败'}
        </span>
      </div>,
      <div key="b-time" style={styles.tiny}>获取于 {formatTime(balance.fetchedAt)}</div>,
    )
  }
  children.push(
    <div key="balance-card" style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.cardTitle}>账户余额</span>
        <span style={styles.buttonRow}>
          <button
            type="button"
            style={styles.topupButton}
            title="在新标签页打开 DeepSeek 官方充值页（扫码支付）"
            onClick={openTopUp}
          >
            充值
          </button>
          <button type="button" style={styles.button} disabled={balanceLoading} onClick={() => void loadBalance()}>
            {balanceLoading ? '获取中…' : '刷新'}
          </button>
        </span>
      </div>
      {balanceBody}
    </div>,
  )

  // ── 消耗卡 ──────────────────────────────────────────────────────────────
  const usageBody: any[] = []
  if (usageLoading) {
    usageBody.push(<div key="u-loading" style={styles.loading}>正在统计会话日志…</div>)
  } else if (usageError !== null) {
    usageBody.push(
      <div key="u-error" style={styles.error}>{usageError}</div>,
      <button key="u-retry" type="button" style={{ ...styles.button, marginTop: '8px' }} onClick={() => void loadUsage(false)}>
        重试
      </button>,
    )
  } else if (usage !== null && usage.ok === false) {
    usageBody.push(<div key="u-fail" style={styles.error}>{usage.message}</div>)
  } else if (usage !== null && usage.ok === true) {
    const windowEmpty = usage.totals.total === 0
    if (windowEmpty) {
      usageBody.push(<div key="u-empty" style={styles.empty}>最近 {String(usage.windowDays)} 天没有消耗记录</div>)
    } else {
      usageBody.push(<UsageChart key="u-chart" days={usage.days} />)
      usageBody.push(
        <div key="u-totals" style={styles.totalsRow}>
          <div>
            近 {String(usage.windowDays)} 天合计：{formatTokens(usage.totals.total)} tokens · {String(usage.days.reduce((sum, day) => sum + day.requests, 0))} 次请求
          </div>
          <div>
            未缓存输入 {formatTokens(usage.totals.uncachedInput)} · 缓存读 {formatTokens(usage.totals.cacheRead)}
            {' · '}
            缓存写 {formatTokens(usage.totals.cacheWrite)} · 输出 {formatTokens(usage.totals.output)}
          </div>
          <div>
            历史总计：{formatTokens(usage.allTimeTotal)} tokens · {String(usage.allTimeRequests)} 次请求
            （扫描 {String(usage.sessionsScanned)} 个会话{usage.skipped > 0 ? `，跳过 ${String(usage.skipped)} 个` : ''}）
          </div>
        </div>,
      )
    }
  }
  children.push(
    <div key="usage-card" style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.cardTitle}>
          Token 消耗
          <span style={styles.cardTag}>
            {usage !== null && usage.ok === true ? `近 ${String(usage.windowDays)} 天` : '按天'}
            {usage !== null && usage.ok === true && usage.cached ? ' · 缓存' : ''}
          </span>
        </span>
        <button type="button" style={styles.button} disabled={usageLoading} onClick={() => void loadUsage(true)}>
          {usageLoading ? '统计中…' : '重新统计'}
        </button>
      </div>
      {usageBody}
    </div>,
  )

  // ── Top 会话卡 ──────────────────────────────────────────────────────────
  if (!usageLoading && usage !== null && usage.ok === true && usage.topSessions.length > 0) {
    const rows: any[] = []
    for (const session of usage.topSessions) {
      const shortId = session.sessionId.replace(/^session-/, '').slice(0, 8)
      rows.push(
        <div key={session.sessionId} style={styles.sessionRow}>
          <span style={styles.sessionName} title={session.sessionId}>{session.cwdLabel}</span>
          <span style={styles.sessionId}>{shortId}</span>
          <span>{formatTokens(session.total)}</span>
        </div>,
      )
    }
    children.push(
      <div key="top-card" style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardTitle}>
            消耗最多的会话
            <span style={styles.cardTag}>历史总计 Top {String(usage.topSessions.length)}</span>
          </span>
        </div>
        {rows}
      </div>,
    )
  }

  children.push(
    <div key="footnote" style={styles.tiny}>
      注：统计只含已落盘的会话日志，进行中的会话未落盘事件暂不计入；fork / 子代理会话已去除继承的父会话部分。
    </div>,
  )

  return <div style={styles.root}>{children}</div>
}

export function apply(ctx: any): void {
  // 注册到设置页 section 列表（id 与插件名保持一致：dsh-deepseek-balance）。
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'dsh-deepseek-balance',
    order: 30,
    label: () => 'DeepSeek 账户',
  }, BalanceSection))
}
