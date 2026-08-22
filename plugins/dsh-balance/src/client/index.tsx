/**
 * dsh-balance — 客户端半（Browser）。
 *
 * 在侧边栏 footer 动作列表注册一个「DeepSeek 账户」小部件（`sidebar.footer.action`
 * 官方插槽的 list 条目，id: dsh-balance；footer 动作常驻显示，宽栏 = 完整宽度
 * 标注条，rail 窄栏 = 居中小条）。宽栏布局为「上标注 + 下进度条」：
 *
 *  - 进度条 = 今日总余额（余额接口的当前总额），其中的「消费段」= 今日消费金额
 *    （**官方平台账单**，/dsh-balance/online）占总余额的比例；剩余为中性底色。
 *  - 消费段颜色标识当前时段：低谷时段 = 成功绿（--dsw-alias-state-success-primary），
 *    高峰时段 = 警示琥珀（--dsw-alias-state-warn-primary）。官方 usage 接口只按
 *    「缓存命中/未命中/输出」归类的每日合计，**不提供高峰/低谷拆分**，因此消费段
 *    为当前时段单色。每分钟 tick 一次，峰谷边界到点自动变色。
 *  - 余额与消费数值**直接标注在图上**（不再用 title）：消费值居左、正对其色段
 *    上方，余额值居右；消费文本色 = 时段色与 label-primary 的 color-mix（两种
 *    主题下自动保证对比度），余额文本色 = label-primary，均 12px/500/tabular-nums。
 *  - 正常态不挂 title（时段区分由颜色承担）；仅「加载中 / 出错 / 未配置」等非
 *    时段信息保留 title 承载诊断与修复指引。
 *
 * 数据来自本插件宿主路由 GET /dsh-balance/balance（官方余额）与
 * GET /dsh-balance/online（平台私有用量接口的今日消费，需配置 userToken）。
 * 拉取时机：挂载、window focus（10s 节流）与每 5 分钟兜底刷新。
 *
 * 今日消费不可用（未配置 / 失效的 userToken、网络异常）时：消费标注显示「—」、
 * 进度条只剩余额中性底色，title 给出具体原因与修复指引——余额数字本身始终是
 * 官方准确的。
 *
 * 原「设置 → DeepSeek 账户」整页（余额卡 + Token 消耗图 + Top API Key）随
 * 迁移移除；宿主 /usage 端点保留（只读 API，供其他消费方使用），页面不再引用。
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

/** /dsh-balance/online：官方平台账单的今日消费。 */
type OnlinePayload =
  | { ok: true; todayCost: number; currency: string; fetchedAt: string; cached?: boolean }
  | { ok: false; code: string; message: string }

/**
 * 高峰时段（北京时间小时，0..23）——与宿主 usage-fold DEFAULT_PEAK_HOURS 一致：
 * DeepSeek V4 官方每日北京时间 09:00–12:00、14:00–18:00 为高峰（正常价），
 * 其余时间为低谷（价格约为高峰一半）。峰谷按北京时间计时，全球统一适用，
 * 与使用者所在地区无关。2026-08-23 起周末（周六、周日）全天不再区分峰谷，
 * 统一按低谷价计费（消费段固定显示低谷绿）。
 */
const PEAK_HOURS = new Set([9, 10, 11, 14, 15, 16, 17])
/** 周末统一低谷价生效时刻：北京时间 2026-08-23 00:00 = UTC 2026-08-22 16:00。 */
const WEEKEND_FLAT_START_MS = Date.UTC(2026, 7, 22, 16, 0, 0)

/** 焦点刷新节流：从充值页切回时刷新一次，普通焦点抖动保持安静。 */
const FOCUS_REFRESH_MIN_GAP_MS = 10_000
/** 兜底刷新间隔：余额/消费变化慢，5 分钟一次足够。 */
const REFRESH_STALE_MS = 300_000
/** 每分钟 tick：峰谷边界（09:00 / 14:00 北京）到点自动重算。 */
const TICK_MS = 60_000

/** 拉取 JSON；网络错误 / 非 2xx / 空响应统一抛可读错误。 */
async function fetchJson(path: string, init?: RequestInit): Promise<any> {
  let response: Response
  try {
    response = await fetch(path, { ...init, headers: { accept: 'application/json', ...(init?.headers ?? {}) } })
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

/** 币种符号（已知币种给符号，未知给「币种 + 空格」）。 */
function currencySymbol(currency: string): string {
  if (currency === 'CNY') return '¥'
  if (currency === 'USD') return '$'
  return `${currency} `
}

/** 金额格式化：符号 + 两位小数。 */
function formatMoney(currency: string, value: number): string {
  if (!Number.isFinite(value)) value = 0
  return `${currencySymbol(currency)}${value.toFixed(2)}`
}

/**
 * 取北京时区的小时（0..23）。Intl 不可用时回退本地时区（仅影响峰谷判定，
 * 不影响余额数据）。'hour12: false' 在午夜可能给出 '24'，归一化为 0。
 */
function beijingHour(date: Date): number {
  let hour = Number.NaN
  try {
    hour = Number.parseInt(new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      hour12: false,
      timeZone: 'Asia/Shanghai',
    }).format(date), 10)
  } catch {
    hour = date.getHours()
  }
  if (Number.isNaN(hour)) return -1
  return hour % 24
}

/**
 * 取北京时区的星期几（0 = 周日，6 = 周六）。Intl 不可用时回退本地时区
 * （仅影响峰谷判定，不影响余额数据）。
 */
function beijingDayOfWeek(date: Date): number {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      timeZone: 'Asia/Shanghai',
    }).formatToParts(date)
    const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
    const short = parts.find(part => part.type === 'weekday')?.value ?? ''
    return map[short] ?? date.getDay()
  } catch {
    return date.getDay()
  }
}

const styles = {
  // footer 把动作排成一行水平 flex（flex-direction: row, nowrap）。宽栏条目
  // 是占满整行的 flex 项；条的高度与设置触发按钮一致（34px、12px 圆角），
  // 内部进度条留 5px 内边距。rail 窄栏保持 36px 方形，居中放一条小进度条。
  layer: {
    flex: '1 1 auto',
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
  },
  layerRail: {
    flex: 'none',
  },
  strip: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    width: '100%',
    margin: '4px 0 4px',
    padding: '5px 8px',
    boxSizing: 'border-box',
    borderRadius: '12px',
  },
  labelsRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    lineHeight: 1,
  },
  label: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '15px',
    fontVariantNumeric: 'tabular-nums',
    fontFamily: 'var(--dsw-font-family, inherit)',
    whiteSpace: 'nowrap',
  },
  bar: {
    display: 'flex',
    height: '8px',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  segment: {
    height: '100%',
  },
  railBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    margin: '8px 0 10px',
  },
  railTrack: {
    display: 'flex',
    width: '26px',
    height: '5px',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  railFill: {
    height: '100%',
  },
} as const

/**
 * 侧边栏 footer 的 DeepSeek 账户小部件：进度条（今日官方消费 vs 今日总余额，
 * 消费段按当前时段配色），数值直接标注在图上（无 title），时段区分由颜色承担。
 */
function BalanceFooterAction(props: { wide?: boolean }): any {
  const wide = props.wide !== false
  const [balance, setBalance] = useState<BalancePayload | null>(null)
  const [balanceError, setBalanceError] = useState<string | null>(null)
  const [online, setOnline] = useState<OnlinePayload | null>(null)
  const [onlineError, setOnlineError] = useState<string | null>(null)
  // 平台 userToken 内联编辑：未配置 / 过期时把进度条换成输入框。
  const [tokenDraft, setTokenDraft] = useState('')
  const [tokenSaving, setTokenSaving] = useState(false)
  const [tokenError, setTokenError] = useState<string | null>(null)
  const [tokenInputOpen, setTokenInputOpen] = useState(false)
  // 每分钟自增触发重渲染，让峰谷配色在 09:00 / 14:00 北京到点自动切换。
  const [, setTick] = useState(0)
  const [hovered, setHovered] = useState(false)
  const lastFetchAt = useRef(0)
  // 卸载保护：组件卸载时忽略在途请求的过期 setState（避免写已卸载组件）。
  // 注意 effect 体必须先把 aliveRef 置回 true——React StrictMode 会
  // 挂载→清理→再挂载，若不重置，重挂载后所有在途结果都被丢弃。
  const aliveRef = useRef(true)
  useEffect(() => {
    aliveRef.current = true
    return () => { aliveRef.current = false }
  }, [])

  const load = useCallback(async (): Promise<void> => {
    // 余额与官方消费相互独立：一个失败不拖垮另一个（余额失败仍有消费占比
    // 可看，消费失败仍显示余额与中性条）。
    try {
      const result = await fetchJson('/dsh-balance/balance') as BalancePayload
      if (aliveRef.current) {
        setBalance(result)
        setBalanceError(null)
      }
    } catch (err) {
      if (!aliveRef.current) return
      setBalance(null)
      setBalanceError(err instanceof Error ? err.message : String(err))
    }
    try {
      const result = await fetchJson('/dsh-balance/online') as OnlinePayload
      if (aliveRef.current) {
        setOnline(result)
        setOnlineError(null)
      }
    } catch (err) {
      if (!aliveRef.current) return
      setOnline(null)
      setOnlineError(err instanceof Error ? err.message : String(err))
    }
    lastFetchAt.current = Date.now()
  }, [])

  // 把 userToken 写入 ~/.dsh/.credentials.yaml（harness credentials.set 机制，
  // 与官方设置页存 API key 同一条链路），写入后宿主无需重启即可读到。
  const saveToken = useCallback(async (raw: string): Promise<string | null> => {
    const value = raw.trim()
    if (value === '') return '请输入 userToken'
    setTokenSaving(true)
    setTokenError(null)
    try {
      const body = await fetchJson('/api/credentials.set', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'client-request',
          rpcId: `dsh-balance-token-${Date.now()}`,
          method: 'credentials.set',
          payload: { ref: 'DEEPSEEK_PLATFORM_TOKEN', value },
        }),
      })
      const result = body?.result
      if (result === undefined || result.ok !== true) {
        const error = result?.error
        // credential-rejected：只读层（环境变量）遮蔽了该引用，写入会看似成功
        // 但读取仍返回旧值——必须让用户去环境里改，而不是假装已保存。
        if (error?.code === 'credential-rejected') {
          return '当前 Token 由环境变量提供（只读），请在启动环境或 profile 配置中更新 DEEPSEEK_PLATFORM_TOKEN'
        }
        return `保存失败：${error?.message ?? '未知错误'}`
      }
      // 写入成功：立即重新拉 /online 验证新 token（凭证失效类错误不缓存，
      // 因此无需等待 5 分钟缓存）。
      const onlineResult = await fetchJson('/dsh-balance/online') as OnlinePayload
      if (onlineResult.ok === true) {
        setOnline(onlineResult)
        setOnlineError(null)
        return null
      }
      if (onlineResult.code === 'platform-auth') {
        return 'Token 无效或已过期：请确认复制的是 platform.deepseek.com 的 userToken'
      }
      if (onlineResult.code === 'missing-token') {
        return 'Token 已保存但未生效：请检查是否配置了更高优先级的 platformToken 行配置'
      }
      return `Token 已保存，但今日消费暂不可用：${onlineResult.message}`
    } catch (error) {
      return error instanceof Error ? error.message : String(error)
    } finally {
      setTokenSaving(false)
    }
  }, [])

  useEffect(() => {
    void load()
    // 从官方充值页切回时应显示最新余额：window focus 触发，带节流。
    const onFocus = (): void => {
      if (Date.now() - lastFetchAt.current < FOCUS_REFRESH_MIN_GAP_MS) return
      void load()
    }
    window.addEventListener('focus', onFocus)
    // 每分钟 tick：峰谷边界到点自动重算；余额/消费超过 5 分钟未刷新则兜底刷新。
    const timer = window.setInterval(() => {
      setTick(value => value + 1)
      if (Date.now() - lastFetchAt.current >= REFRESH_STALE_MS) void load()
    }, TICK_MS)
    return () => {
      window.removeEventListener('focus', onFocus)
      window.clearInterval(timer)
    }
  }, [load])

  // 检测到未配置 / 失效 token 时自动弹出输入框（之后用户取消则收起，
  // 页面刷新或下次错误时重新弹出）。
  useEffect(() => {
    if (online === null || online.ok === true) return
    if (online.code === 'missing-token' || online.code === 'platform-auth') {
      setTokenInputOpen(true)
    }
  }, [online])

  // 当前时段：高峰 → 琥珀（警示「贵」），低谷 → 绿（「便宜，可用」）。
  // 2026-08-23 起周末全天为低谷价：无论几点都显示低谷绿。
  const now = new Date()
  const weekendFlat = now.getTime() >= WEEKEND_FLAT_START_MS
    && (beijingDayOfWeek(now) === 0 || beijingDayOfWeek(now) === 6)
  const peakNow = !weekendFlat && PEAK_HOURS.has(beijingHour(now))

  // ── 状态推导：图上标注文本 + 进度条占比 + 配色 ────────────────────────
  // 正常态不挂 title：时段区分由颜色承担，余额/消费数值默认隐藏、悬停时显示。
  // 仅「加载中 / 出错 / 未配置」等非时段信息保留 title 承载诊断与指引。
  let tooltip: string | undefined
  let trackColor = 'color-mix(in srgb, var(--dsw-alias-label-tertiary) 25%, transparent)'
  let stripBackground = 'color-mix(in srgb, var(--dsw-alias-label-tertiary) 10%, transparent)'
  let stripBorder = '1px solid color-mix(in srgb, var(--dsw-alias-label-tertiary) 18%, transparent)'
  let segments: Array<{ pct: number; color: string }> = []
  let costValue = '—'
  let costAria = '今日消费 —'
  let costColor = 'var(--dsw-alias-label-tertiary)'
  let balanceValue = '—'
  let balanceAria = '余额 —'
  let balanceColor = 'var(--dsw-alias-label-primary)'

  // 消费段与消费文本的时段色相：高峰 → 琥珀，低谷 → 绿。
  const PEAK_COLOR = 'var(--dsw-alias-state-warn-primary)'
  const OFF_PEAK_COLOR = 'var(--dsw-alias-state-success-primary)'
  const periodHue = peakNow ? PEAK_COLOR : OFF_PEAK_COLOR
  // 消费文本色 = 时段色与 label-primary 的混合：浅色主题自动偏深、深色主题
  // 自动偏亮（label-primary 随主题翻转），保证两种主题下的文字对比度，同时
  // 与色段同色相保持整体配色协调。色段本身用纯时段色（图形元素，非文字）。
  const costHueText = `color-mix(in srgb, ${periodHue} 55%, var(--dsw-alias-label-primary))`

  if (balanceError !== null) {
    trackColor = 'color-mix(in srgb, var(--dsw-alias-state-error-primary) 25%, transparent)'
    stripBackground = 'color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent)'
    stripBorder = '1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 25%, transparent)'
    tooltip = `无法获取余额：${balanceError}`
  } else if (balance !== null && balance.ok === false) {
    trackColor = 'color-mix(in srgb, var(--dsw-alias-state-error-primary) 25%, transparent)'
    stripBackground = 'color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent)'
    stripBorder = '1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 25%, transparent)'
    tooltip = balance.message
  } else if (balance !== null && balance.ok === true) {
    if (balance.balances.length === 0) {
      tooltip = '接口未返回余额信息'
    } else {
      const primary = balance.balances.find(entry => entry.currency === 'CNY') ?? balance.balances[0]
      const symbol = currencySymbol(primary.currency)
      const total = Number.parseFloat(primary.total)
      balanceValue = `${symbol}${primary.total}`
      balanceAria = `余额 ${balanceValue}`
      balanceColor = 'var(--dsw-alias-label-primary)'

      // 今日官方消费（平台账单）。
      let todayCost: number | null = null
      if (onlineError !== null) {
        tooltip = `今日消费 获取失败：${onlineError}`
      } else if (online !== null && online.ok === false) {
        tooltip = `今日消费 不可用：${online.message}`
      } else if (online !== null && online.ok === true) {
        todayCost = online.todayCost
        costValue = formatMoney(primary.currency, todayCost)
        costAria = `今日消费 ${costValue}`
        costColor = costHueText
      } else {
        tooltip = '正在获取今日消费…'
      }

      if (todayCost !== null && todayCost > 0) {
        const consumedPct = Number.isFinite(total) && total > 0
          ? Math.max(0, Math.min(1, todayCost / total))
          : 0
        if (consumedPct > 0) {
          segments = [{ pct: consumedPct, color: periodHue }]
        }
      }
    }
  }

  const renderFill = (base: Record<string, string | number>): any[] => {
    const out: any[] = []
    for (const segment of segments) {
      out.push(
        <div
          key={segment.color}
          style={{
            ...base,
            width: `${Math.round(segment.pct * 1000) / 10}%`,
            background: segment.color,
          }}
        />,
      )
    }
    return out
  }

  if (!wide) {
    return (
      <div style={{ ...styles.layer, ...styles.layerRail }}>
        <div style={styles.railBox} title={tooltip}>
          <div style={{ ...styles.railTrack, background: trackColor }}>
            {renderFill(styles.railFill)}
          </div>
        </div>
      </div>
    )
  }

  // ── 平台 userToken 内联编辑 ─────────────────────────────────────────
  // 未配置（missing-token）或失效（platform-auth）时，把进度条换成输入框，
  // 用户直接粘贴 token 保存（写入 credentials，无需改配置、无需重启）。
  const tokenNeeded = online !== null && online.ok === false
    && (online.code === 'missing-token' || online.code === 'platform-auth')
  const showTokenInput = tokenNeeded && (tokenInputOpen || tokenError !== null || tokenSaving)

  if (showTokenInput) {
    const commit = async (): Promise<void> => {
      const failure = await saveToken(tokenDraft)
      if (failure === null) {
        setTokenDraft('')
        setTokenInputOpen(false)
        setTokenError(null)
      } else {
        setTokenError(failure)
      }
    }
    return (
      <div style={styles.layer}>
        <div
          style={{
            ...styles.strip,
            background: stripBackground,
            border: stripBorder,
            gap: '5px',
          }}
        >
          <div style={{ fontSize: '11px', lineHeight: '14px', color: 'var(--dsw-alias-label-secondary)' }}>
            {online.code === 'platform-auth' ? 'Token 已失效，请更新' : '未配置平台 Token'}
          </div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <input
              type="password"
              autoComplete="off"
              spellCheck={false}
              placeholder="粘贴 userToken…"
              value={tokenDraft}
              disabled={tokenSaving}
              onChange={(event) => { setTokenDraft(event.target.value); if (tokenError !== null) setTokenError(null) }}
              onKeyDown={(event) => { if (event.key === 'Enter') void commit() }}
              style={{
                flex: '1 1 auto',
                minWidth: 0,
                padding: '3px 6px',
                borderRadius: '6px',
                border: '1px solid color-mix(in srgb, var(--dsw-alias-label-tertiary) 40%, transparent)',
                background: 'var(--dsw-alias-bg-primary, transparent)',
                color: 'var(--dsw-alias-label-primary)',
                fontSize: '12px',
                lineHeight: '16px',
              }}
            />
            <button
              type="button"
              disabled={tokenSaving || tokenDraft.trim() === ''}
              onClick={() => void commit()}
              style={{
                padding: '3px 8px',
                borderRadius: '6px',
                border: 'none',
                background: 'var(--dsw-alias-state-success-primary)',
                color: 'var(--dsw-alias-on-state, #fff)',
                fontSize: '12px',
                lineHeight: '16px',
                cursor: tokenSaving || tokenDraft.trim() === '' ? 'default' : 'pointer',
                opacity: tokenSaving || tokenDraft.trim() === '' ? 0.6 : 1,
              }}
            >
              {tokenSaving ? '保存中…' : '保存'}
            </button>
            {!tokenSaving && (
              <button
                type="button"
                onClick={() => { setTokenInputOpen(false); setTokenError(null) }}
                style={{
                  padding: '3px 6px',
                  borderRadius: '6px',
                  border: '1px solid color-mix(in srgb, var(--dsw-alias-label-tertiary) 40%, transparent)',
                  background: 'transparent',
                  color: 'var(--dsw-alias-label-secondary)',
                  fontSize: '12px',
                  lineHeight: '16px',
                  cursor: 'pointer',
                }}
              >
                取消
              </button>
            )}
          </div>
          {tokenError !== null && (
            <div style={{ fontSize: '11px', lineHeight: '14px', color: 'var(--dsw-alias-state-error-primary)' }}>
              {tokenError}
            </div>
          )}
          <div style={{ fontSize: '11px', lineHeight: '14px', color: 'var(--dsw-alias-label-tertiary)' }}>
            获取：platform.deepseek.com → F12 → Application → Local Storage → userToken
          </div>
        </div>
      </div>
    )
  }

  // 宽栏：默认只显示进度条；鼠标悬停（或聚焦）时在上方显示「今日消费 / 余额」
  // 标注，时段区分由颜色承担。
  return (
    <div style={styles.layer}>
      <div
        style={{ ...styles.strip, background: stripBackground, border: stripBorder }}
        title={tooltip}
        onMouseEnter={() => { setHovered(true) }}
        onMouseLeave={() => { setHovered(false) }}
        onFocus={() => { setHovered(true) }}
        onBlur={() => { setHovered(false) }}
        tabIndex={0}
      >
        {hovered && (
          <div style={styles.labelsRow}>
            <span style={{ ...styles.label, color: costColor }} aria-label={costAria}>
              今日消费 {costValue}
            </span>
            <span style={{ ...styles.label, color: balanceColor }} aria-label={balanceAria}>
              余额 {balanceValue}
            </span>
          </div>
        )}
        <div style={{ ...styles.bar, background: trackColor }}>
          {renderFill(styles.segment)}
        </div>
      </div>
    </div>
  )
}

export function apply(ctx: any): void {
  // 注册到侧边栏 footer 动作列表（id 与插件名保持一致：dsh-balance）。
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register(
    {
      name: 'sidebar.footer.action',
      id: 'dsh-balance',
      order: 10,
      label: () => 'DeepSeek 账户',
    },
    BalanceFooterAction,
  ))
}
