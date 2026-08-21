/**
 * dsh-archive — 客户端半（Browser）。
 *
 * 在设置面板注册一个「归档」页（`settings.section` 官方插槽的 list 条目 =
 * 设置左侧导航菜单项 + 整页内容区；设置页打开时渲染该 section，切换到其他
 * section 时卸载，回到「归档」时是干净的新页面）。页面只列出「当前项目」的
 * 已归档会话——归档会话属于当前项目当且仅当：它在当前 workspace 的账目中，
 * 或其存储的 cwd 等于项目路径。每行提供三个动词：
 *
 *  - 下载：对接 harness 核心端点的自包含导出（/api/session.export）。每个
 *    会话的导出状态存在本插件自己的 store 里（模块级 downloadStates），
 *    行 UI 空闲渲染也不丢状态。
 *  - 恢复：POST /dsh-archive/restore——宿主把会话移出归档集合；随后广播
 *    的 host/archived-sessions-changed 帧会让侧边栏与页面自动刷新。
 *  - 删除：确认后 POST /dsh-archive/delete——宿主硬删除（持久化工件 +
 *    workspace 账目 + 归档集合）；成功后本页主动刷新 sessions 与 workspaces
 *    列表，让侧边栏立即消失、不残留幽灵条目。
 *  - 一键删除：页面底部按钮，确认后 POST /dsh-archive/delete-all——把当前
 *    项目全部已归档会话一次性批量硬删除（宿主侧跳过运行中的会话），成功后
 *    同样刷新两个列表；总是显示完整结果提示（已删除 / 跳过运行中 / 失败
 *    明细，含被跳过的会话 id）。结果提示随页面生命周期走：切换设置 section
 *    或关闭设置面板后清除，再进「归档」页是干净的。
 *
 * 「当前项目」不依赖任何打开的会话即可解析：最近活跃的 workspace → 持有
 * 当前会话的 workspace 账目 → 当前会话 cwd 对应的 workspace。行数据全部来自
 * 运行时既有 store（ctx.workspaces.list 提供归档集合，ctx.sessions.list 提供
 * 标题）；只有两个变更操作需要本插件自己的宿主路由。
 *
 * 放置理由：归档是项目级管理（workspace 浏览器右键「归档会话」），恢复后也
 * 回到同一列表；管理界面放在设置面板的独立页面，避免在 session 作用域的会话
 * tab 行里出现项目级操作，也让侧边栏 footer 腾给「DeepSeek 账户」小部件。
 */
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'

export const inject = ['slots', 'sessions', 'workspaces']

/** 批量删除单次请求的 id 上限（宿主硬上限 500；取 200 留余量且进度可感知）。 */
const DELETE_BATCH_SIZE = 200

/** 线上数据形状（宿主域对象的纯 JSON 投影）。 */
interface WorkspaceRow {
  workspaceId: string
  path: string
  title: string
  sessionIds: readonly string[]
}
interface WorkspaceListSnapshot {
  items: readonly WorkspaceRow[]
  archivedSessionIds: readonly string[]
  recentWorkspaceId?: string
}
interface SessionSummaryRow {
  id: string
  displayTitle: string
  cwd?: string
  updatedAt: number
}
interface SessionListSnapshot {
  byId: Record<string, SessionSummaryRow | undefined>
  current?: string
}

/** 页面里的一行归档会话。 */
interface ArchiveRow {
  id: string
  title: string
  updatedAt?: number
}

/**
 * 调用宿主端点（restore | delete | delete-all）。
 * 成功要求 HTTP 200 且 payload.ok === true，否则抛出可读错误。
 */
async function callHost(endpoint: 'restore' | 'delete' | 'delete-all', body: Record<string, unknown>): Promise<Record<string, unknown>> {
  const response = await fetch(`/dsh-archive/${endpoint}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  let payload: { ok?: boolean; error?: string } | undefined
  try {
    payload = await response.json() as { ok?: boolean; error?: string }
  } catch {
    payload = undefined
  }
  if (!response.ok || payload === undefined || payload.ok !== true) {
    throw new Error(payload?.error ?? `请求失败（HTTP ${String(response.status)}）`)
  }
  return payload as Record<string, unknown>
}

/** 时间戳 → 本地可读时间字符串（非法输入返回空串）。 */
function formatTime(value: number | undefined): string {
  if (value === undefined || Number.isNaN(value)) return ''
  try {
    return new Date(value).toLocaleString()
  } catch {
    return ''
  }
}

/** 被跳过（运行中）会话 id 列表 → 可读文本；过多时只显示前几个。 */
function formatSkippedIds(ids: readonly string[], skipped: number): string {
  const shown = ids.slice(0, 10)
  const suffix = shown.length < skipped ? `…等 ${skipped} 个` : ''
  return shown.map(id => `「${id}」`).join('、') + suffix
}

/**
 * 每个会话的日志导出状态（本插件私有 store，行 UI 空闲渲染也保留）。
 * 模块级而非组件级：页面关闭再打开、行重渲染时下载状态不丢。
 */
type DownloadStatus = 'downloading' | 'success' | 'error'
interface DownloadEntry { status: DownloadStatus; error?: string }
const downloadStates: Record<string, DownloadEntry> = {}
const downloadListeners = new Set<() => void>()
/** 在途下载的 sessionId 集合：同步拦截同一会话的重复点击（按钮禁用要等渲染）。 */
const downloadInflight = new Set<string>()

/**
 * 供 useSyncExternalStore 使用的缓存快照。包装层必须保持引用稳定：
 * useSyncExternalStore 用 Object.is 比较 getSnapshot() 的结果，若每次读取
 * 都返回新对象会造成无限重渲染（React #185）。只有 emitDownloads 在状态
 * 真正变化时才替换快照。
 */
let downloadsSnapshot: { bySession: Record<string, DownloadEntry> } = { bySession: {} }
/** 订阅下载状态变化；返回取消订阅函数（useSyncExternalStore 契约）。 */
function subscribeDownloads(listener: () => void): () => void {
  downloadListeners.add(listener)
  return () => { downloadListeners.delete(listener) }
}
/** 广播快照变更：重建快照对象并逐个通知订阅者。 */
function emitDownloads(): void {
  downloadsSnapshot = { bySession: { ...downloadStates } }
  for (const listener of downloadListeners) listener()
}
/** 当前快照（引用稳定，仅在 emitDownloads 时替换）。 */
function getDownloadsSnapshot(): { bySession: Record<string, DownloadEntry> } {
  return downloadsSnapshot
}

/** 同源 Host 基址（连接载体的 null-origin 兜底）。 */
function hostBase(): string {
  const origin = (globalThis as { location?: { origin?: string } }).location?.origin
  return origin !== undefined && origin !== 'null' ? origin : 'http://dsh.internal'
}

/** 为某个会话 id 生成安全的浏览器下载文件名。 */
function sessionLogZipFilename(sessionId: string): string {
  return `dsh-session-${String(sessionId).replace(/[^A-Za-z0-9_-]/g, '_')}.zip`
}

/** /api/session.export 的 URL —— 核心 API，与 session-log-download 无关。 */
function exportUrl(sessionId: string): string {
  const url = new URL('/api/session.export', hostBase())
  url.searchParams.set('sessionId', sessionId)
  url.searchParams.set('includeDescendants', 'true')
  return url.toString()
}

/**
 * 把一个归档会话的日志作为 ZIP 通过浏览器下载管理器导出。
 * 先 HEAD 探测可用性，再用 <a download> 触发 GET 下载；状态写入私有 store。
 * downloadInflight 做同步去重：同一会话的第二次点击（渲染禁用生效前）
 * 直接忽略，避免双发 HEAD+GET。
 *
 * 已知限制：<a download> 触发的是浏览器原生下载，无法回读 GET 结果——HEAD
 * 通过但 GET 期间失败（如会话恰在两步之间被删）时，浏览器会把错误体存成
 * .zip 且 UI 已标记成功。与 harness 自带 session-log-download 控制器同款
 * 行为（平台级限制），故不做二次校验。
 */
async function downloadSessionLog(sessionId: string): Promise<void> {
  if (downloadInflight.has(sessionId)) return
  downloadInflight.add(sessionId)
  downloadStates[sessionId] = { status: 'downloading' }
  emitDownloads()
  try {
    const response = await fetch(exportUrl(sessionId), { method: 'HEAD' })
    if (!response.ok) throw new Error(`导出失败：HTTP ${response.status}`)
    const anchor = document.createElement('a')
    anchor.href = exportUrl(sessionId)
    anchor.download = sessionLogZipFilename(sessionId)
    anchor.click()
    downloadStates[sessionId] = { status: 'success' }
  } catch (error: unknown) {
    downloadStates[sessionId] = {
      status: 'error',
      error: error instanceof Error ? error.message : String(error),
    }
  } finally {
    downloadInflight.delete(sessionId)
  }
  emitDownloads()
}

/**
 * 清理已不存在会话的下载状态：行消失（会话被删 / 移出项目）后，残留的
 * success/error 条目会在会话 id 将来复用时错误地重新出现；页面关闭时统一
 * 修剪一次（模块级 store 长驻，只靠新增覆盖会无限膨胀）。
 */
function pruneDownloads(activeIds: ReadonlySet<string>): void {
  let changed = false
  for (const id of Object.keys(downloadStates)) {
    if (!activeIds.has(id)) {
      delete downloadStates[id]
      changed = true
    }
  }
  if (changed) emitDownloads()
}

export function apply(ctx: any): void {
  // 一张带标记的样式表，补上内联样式表达不了的 hover 态。
  // 与 dsh-update 同样的约定（id + data-plugin）；守卫防止重复挂载重复插标签。
  const STYLE_ID = 'dsh-archive-style'
  if (typeof document !== 'undefined' && document.getElementById(STYLE_ID) === null) {
    const styleEl = document.createElement('style')
    styleEl.id = STYLE_ID
    styleEl.setAttribute('data-plugin', 'dsh-archive')
    styleEl.textContent = `
      .dsh-archive-row:hover {
        background: var(--dsw-alias-interactive-bg-hover);
      }
      .dsh-archive-batch:hover:not(:disabled) {
        background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);
      }
    `
    document.head.appendChild(styleEl)
  }

  const styles = {
    // 设置页根：与 dsh-balance 设置页同款——页面自己滚动，颜色走主题 token。
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
    project: {
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: 'var(--dsw-alias-label-tertiary)',
      fontSize: 'var(--dsw-font-xxs-12, 12px)',
    },
    count: {
      marginLeft: 'auto',
      flex: 'none',
      color: 'var(--dsw-alias-label-tertiary)',
      fontSize: 'var(--dsw-font-xxs-12, 12px)',
      fontVariantNumeric: 'tabular-nums',
    },
    hint: {
      color: 'var(--dsw-alias-label-secondary)',
      fontSize: 'var(--dsw-font-xxs-12, 12px)',
      lineHeight: 1.6,
      marginBottom: '12px',
    },
    error: {
      padding: '8px 12px',
      marginBottom: '8px',
      borderRadius: '8px',
      border: '1px solid var(--dsw-alias-state-error-primary)',
      color: 'var(--dsw-alias-state-error-primary)',
      fontSize: '12px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 12px',
      marginBottom: '8px',
      borderRadius: '8px',
      border: '1px solid var(--dsw-alias-border-l2)',
      background: 'var(--dsw-alias-bg-base)',
    },
    rowMain: {
      flex: 1,
      minWidth: 0,
    },
    rowTitle: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      fontSize: '13px',
      color: 'var(--dsw-alias-label-primary)',
    },
    rowMeta: {
      marginTop: '2px',
      color: 'var(--dsw-alias-label-tertiary)',
      fontSize: '12px',
    },
    buttonBase: {
      flex: 'none',
      padding: '4px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      cursor: 'pointer',
      background: 'transparent',
    },
    empty: {
      padding: '24px 0',
      textAlign: 'center',
      color: 'var(--dsw-alias-label-tertiary)',
      fontSize: '12px',
    },
    batchRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '8px',
      marginTop: '8px',
      paddingTop: '10px',
      borderTop: '1px solid var(--dsw-alias-border-l2)',
    },
    batchDelete: {
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      height: '24px',
      padding: '0 12px',
      boxSizing: 'border-box',
      borderRadius: '6px',
      border: '1px solid var(--dsw-alias-state-error-primary)',
      background: 'transparent',
      color: 'var(--dsw-alias-state-error-primary)',
      fontSize: '12px',
      lineHeight: '1',
      cursor: 'pointer',
    },
  } as const

  /** 设置面板的「归档」页（settings.section 插槽，id: dsh-archive）。 */
  function ArchiveSection(_props: { close?: () => void }): any {
    // 订阅运行时 store：workspaces（归档集合 / 项目解析）、sessions（标题）。
    const workspaces = useSyncExternalStore(
      ctx.workspaces.list.subscribe as (listener: () => void) => () => void,
      () => ctx.workspaces.list.getSnapshot() as WorkspaceListSnapshot,
    )
    const sessions = useSyncExternalStore(
      ctx.sessions.list.subscribe as (listener: () => void) => () => void,
      () => ctx.sessions.list.getSnapshot() as SessionListSnapshot,
    )
    const [busy, setBusy] = useState<{ id: string; action: 'restore' | 'delete' } | null>(null)
    const [batchBusy, setBatchBusy] = useState(false)
    const [error, setError] = useState<string | null>(null)
    // 同步在途守卫：setBusy 要等下一次渲染才禁用按钮，同一 tick 里的第二次
    // 点击会重新进入 run/deleteAll（React 18 批处理）——用 ref 在进入时
    // 立即拦截，杜绝双击双发（批量删除会双计数、下载会双发 HEAD+GET）。
    const busyRef = useRef(false)
    const batchBusyRef = useRef(false)

    // 不依赖打开会话解析当前项目：最近活跃 workspace → 持有当前会话的
    // workspace → 当前会话 cwd 对应的 workspace。
    const workspace = useMemo((): WorkspaceRow | undefined => {
      const items = workspaces?.items
      if (items === undefined || items.length === 0) return undefined
      const recent = workspaces?.recentWorkspaceId
      if (recent !== undefined) {
        const byRecent = items.find(item => item.workspaceId === recent)
        if (byRecent !== undefined) return byRecent
      }
      const current = sessions?.current
      if (current !== undefined) {
        const byMembership = items.find(item => item.sessionIds.includes(current))
        if (byMembership !== undefined) return byMembership
        const currentCwd = sessions?.byId[current]?.cwd
        if (currentCwd !== undefined) {
          const byPath = items.find(item => item.path === currentCwd)
          if (byPath !== undefined) return byPath
        }
      }
      return undefined
    }, [workspaces, sessions])

    const projectLabel = workspace?.title

    // 只取当前项目的归档：workspace 账目成员，或存储 cwd 等于项目路径。
    const rows = useMemo((): ArchiveRow[] => {
      const archived = workspaces?.archivedSessionIds
      if (archived === undefined || archived.length === 0 || workspace === undefined) return []
      const result: ArchiveRow[] = []
      for (const id of archived) {
        const summary = sessions?.byId[id]
        const inAccount = workspace.sessionIds.includes(id)
        const sameProject = summary?.cwd !== undefined && summary.cwd === workspace.path
        if (!inAccount && !sameProject) continue
        result.push({
          id,
          title: summary?.displayTitle ?? id,
          updatedAt: summary?.updatedAt,
        })
      }
      return result
    }, [workspaces, sessions, workspace])

    // 会话列表变化时修剪下载状态：已不在当前项目里的会话（被删/移出）的
    // 残留 success/error 条目清掉，避免状态无限堆积或 id 复用时误显示。
    useEffect(() => {
      pruneDownloads(new Set(rows.map(row => row.id)))
    }, [rows])

    // 每个会话的实时导出状态（私有 store），行按钮据此显示「下载中…」并禁用，
    // 出错时变成「重试」。
    const downloads = useSyncExternalStore(
      (listener: () => void) => subscribeDownloads(listener),
      () => getDownloadsSnapshot(),
    )

    /** 执行恢复 / 删除；失败把可读错误写入页面提示区（覆盖旧提示）。 */
    const run = async (action: 'restore' | 'delete', id: string): Promise<void> => {
      if (busyRef.current) return
      busyRef.current = true
      setError(null)
      setBusy({ id, action })
      try {
        await callHost(action, { sessionId: id })
        // 删除后主动刷新：sessions 列表（会话消失）+ workspaces 列表
        // （workspace 账目已解除，避免侧边栏残留幽灵条目）。
        // 恢复也刷新 workspaces：虽然宿主写链会广播 archived-sessions-changed
        // 驱动实时刷新，但那依赖 harness 内部事件，这里主动刷新兜底。
        ctx.sessions.refresh?.().catch?.(() => {})
        ctx.workspaces.refresh?.().catch?.(() => {})
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        busyRef.current = false
        setBusy(null)
      }
    }

    /** 恢复单个归档会话（回到侧边栏原位置）。 */
    const restore = (id: string): void => { void run('restore', id) }
    /** 硬删除单个归档会话（含二次确认，确认文案说明不可恢复）。 */
    const remove = (id: string, title: string): void => {
      const confirmed = window.confirm(
        `确定要永久删除会话「${title}」吗？\n\n这是硬删除：会话的所有文件都会被删除，无法恢复。`,
      )
      if (confirmed) void run('delete', id)
    }
    /**
     * 一键删除：把当前项目全部已归档会话一次性硬删除。
     * 宿主单次上限 500 个 id（超限整批 400），这里按 200/批分片串行，
     * 保证归档数 >500 的项目也能整批删完而非整批失败。
     */
    const deleteAll = (): void => {
      if (rows.length === 0) return
      const confirmed = window.confirm(
        `确定要一键删除全部 ${rows.length} 个已归档会话吗？\n\n这是硬删除：每个会话的所有文件都会被删除，无法恢复。\n运行中的会话会被跳过。`,
      )
      if (!confirmed) return
      if (batchBusyRef.current) return
      batchBusyRef.current = true
      setError(null)
      setBatchBusy(true)
      void (async () => {
        try {
          const ids = rows.map(row => row.id)
          const total = ids.length
          let deleted = 0
          let skipped = 0
          let failed = 0
          const skippedIds: string[] = []
          const failures: Array<{ sessionId: string; error: string }> = []
          for (let offset = 0; offset < ids.length; offset += DELETE_BATCH_SIZE) {
            const payload = await callHost('delete-all', { sessionIds: ids.slice(offset, offset + DELETE_BATCH_SIZE) }) as {
              total?: number
              deleted?: number
              skipped?: number
              skippedIds?: string[]
              failed?: number
              failures?: Array<{ sessionId: string; error: string }>
            }
            deleted += payload.deleted ?? 0
            skipped += payload.skipped ?? 0
            failed += payload.failed ?? 0
            const chunkSkipped = payload.skippedIds
            if (chunkSkipped !== undefined && chunkSkipped.length > 0) skippedIds.push(...chunkSkipped)
            const chunkFailures = payload.failures
            if (chunkFailures !== undefined && chunkFailures.length > 0) failures.push(...chunkFailures)
          }
          // 总是给出完整结果提示（覆盖旧提示），不再静默：
          //  - 全部成功：简单一句。
          //  - 有跳过（live 会话）：解释「会话运行到 dsh web 重启为止」，并
          //    在宿主返回 skippedIds 时列出具体被跳过的会话。
          //  - 有失败：追加逐会话失败明细。
          let message: string
          if (deleted === total) {
            message = `已删除全部 ${total} 个会话`
          } else {
            const parts: string[] = [`已删除 ${deleted} 个`]
            if (skipped > 0) {
              const skippedText = skippedIds.length > 0
                ? `：${formatSkippedIds(skippedIds, skipped)}`
                : ''
              parts.push(`跳过运行中 ${skipped} 个${skippedText}`)
            }
            if (failed > 0) parts.push(`失败 ${failed} 个`)
            message = parts.join('，')
            if (skipped > 0) {
              message += '。归档不会结束会话——会话会一直存活到 dsh web 重启为止；重启后这些会话即可删除'
            }
            if (failures.length > 0) {
              message += `。失败明细：${failures.map(item => `${item.sessionId}（${item.error}）`).join('；')}`
            }
          }
          setError(message)
          // 删除后主动刷新：sessions 列表（会话消失）+ workspaces 列表
          // （workspace 账目已解除，避免侧边栏残留幽灵条目）。
          ctx.sessions.refresh?.().catch?.(() => {})
          ctx.workspaces.refresh?.().catch?.(() => {})
        } catch (err) {
          setError(err instanceof Error ? err.message : String(err))
        } finally {
          batchBusyRef.current = false
          setBatchBusy(false)
        }
      })()
    }
    /** 打开会话（从设置页切到会话区）；失败通常是因为列表刷新中行已消失。 */
    const openSession = (id: string): void => {
      try {
        ctx.sessions.open(id)
      } catch {
        // 行在列表刷新时消失的竞态：下一次渲染自然清掉。
      }
    }

    return (
      <div style={styles.root}>
        <div style={styles.pageHeader}>
          <span style={styles.title}>已归档会话</span>
          {projectLabel !== undefined
            ? <span style={styles.project}>· {projectLabel}</span>
            : null}
          <span style={styles.count}>{rows.length}</span>
        </div>
        <div style={styles.hint}>
          管理当前项目的已归档会话。恢复会把它放回侧边栏列表；删除为硬删除（不可恢复）；
          运行中的会话无法删除，需重启 dsh web 后重试。
        </div>
        {error !== null ? <div style={styles.error}>{error}</div> : null}
        {rows.length === 0
          ? <div style={styles.empty}>当前项目没有已归档的会话</div>
          : null}
        {rows.map(row => {
          const rowBusy = busy !== null && busy.id === row.id
          const anyBusy = busy !== null || batchBusy
          const time = formatTime(row.updatedAt)
          const dlEntry = downloads?.bySession?.[row.id]
          const downloading = dlEntry?.status === 'downloading'
          const dlError = dlEntry?.status === 'error' ? (dlEntry.error ?? '导出失败') : null
          return (
            <div key={row.id} style={styles.row} className="dsh-archive-row">
              <div style={styles.rowMain}>
                <div
                  style={styles.rowTitle}
                  title={`打开会话 ${row.title}`}
                  onClick={() => { openSession(row.id) }}
                >
                  {row.title}
                </div>
                {time !== '' ? <div style={styles.rowMeta}>{time}</div> : null}
              </div>
              <button
                type="button"
                title={dlError ?? '下载会话日志 (ZIP)'}
                disabled={anyBusy || downloading}
                style={{
                  ...styles.buttonBase,
                  border: '1px solid var(--dsw-alias-border-l2)',
                  color: 'var(--dsw-alias-label-primary)',
                  opacity: anyBusy || downloading ? 0.5 : 1,
                }}
                onClick={() => { void downloadSessionLog(row.id) }}
              >
                {downloading ? '下载中…' : dlError !== null ? '重试' : '下载'}
              </button>
              <button
                type="button"
                disabled={anyBusy}
                style={{
                  ...styles.buttonBase,
                  border: '1px solid var(--dsw-alias-border-l2)',
                  color: 'var(--dsw-alias-label-primary)',
                  opacity: anyBusy && !rowBusy ? 0.5 : 1,
                }}
                onClick={() => { restore(row.id) }}
              >
                {rowBusy && busy?.action === 'restore' ? '恢复中…' : '恢复'}
              </button>
              <button
                type="button"
                disabled={anyBusy}
                style={{
                  ...styles.buttonBase,
                  border: '1px solid var(--dsw-alias-state-error-primary)',
                  color: 'var(--dsw-alias-state-error-primary)',
                  opacity: anyBusy && !rowBusy ? 0.5 : 1,
                }}
                onClick={() => { remove(row.id, row.title) }}
              >
                {rowBusy && busy?.action === 'delete' ? '删除中…' : '删除'}
              </button>
            </div>
          )
        })}
        <div style={styles.batchRow}>
          <button
            type="button"
            className="dsh-archive-batch"
            style={{
              ...styles.batchDelete,
              opacity: batchBusy || busy !== null || rows.length === 0 ? 0.5 : 1,
            }}
            disabled={batchBusy || busy !== null || rows.length === 0}
            onClick={() => { deleteAll() }}
          >
            {batchBusy ? '删除中…' : '一键删除'}
          </button>
        </div>
      </div>
    )
  }

  // 注册到设置面板 section 列表（id 与插件名保持一致：dsh-archive）。
  ctx.slots.inject('settings.section', () => ctx.slots.register(
    {
      name: 'settings.section',
      id: 'dsh-archive',
      order: 30,
      label: () => '归档',
    },
    ArchiveSection,
  ))
}
