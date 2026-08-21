/**
 * dsh-work taskboard — Host 执行运行器：真实 DSH 会话执行与结算观察。
 *
 * Ported from zhu1090093659/dsh-web-ui packages/dsh-task-board
 * src/host-runner.ts (Apache-2.0)。
 *
 * launch：校验钉住的工作区/预设存在 → sessions.create → rename →
 * 可选 /permission（commands 服务）→ sessions.prompt queue 模式。
 * inspect：会话列表 + history 翻页找 turn/end 判定结果。
 */

function request(payload) {
  return { rpcId: `dsh-work-taskboard-${crypto.randomUUID()}`, payload }
}

function failure(error) {
  return new Error(`${error.code}: ${error.message}`)
}

function isErrorTurnEnd(data) {
  if (typeof data !== 'object' || data === null) return false
  const reason = data.reason
  return typeof reason === 'object' && reason !== null && reason.kind === 'error'
}

/** create 成功之后的启动失败：仍能把会话 id 交给账本。 */
export class SessionLaunchError extends Error {
  constructor(sessionId, cause) {
    super(`execution session ${sessionId} failed during launch: ${cause instanceof Error ? cause.message : String(cause)}`, { cause })
    this.name = 'SessionLaunchError'
    this.sessionId = sessionId
  }
}

/**
 * 任务执行运行器：通过 Host apiProxy 开真实 DSH 会话，观察 turn/end
 * 事件结算 execution（会话已停止且无结果时保守结算 cancelled）。
 */
export class TaskboardRunner {
  /**
   * @param {object} api Host apiProxy 面（sessions/workspace/agentPresets）。
   * @param {{ execute(sessionId: string, line: string, signal: AbortSignal): Promise<object | undefined> }} [commands] 权限命令派发器。
   */
  constructor(api, commands) {
    this.#api = api
    this.#commands = commands
  }

  #api
  #commands

  /** 启动一次执行：新建独立会话并发送任务 Prompt。返回 sessionId。 */
  async launch(task) {
    if (task.workspaceId !== undefined) {
      const workspaces = await this.#api.workspace.list(request({}))
      if (!workspaces.result.ok) throw failure(workspaces.result.error)
      if (!workspaces.result.value.items.some(item => item.workspaceId === task.workspaceId)) {
        throw new Error(`workspace not found: ${task.workspaceId}`)
      }
    }
    if (task.mode !== undefined) {
      const presets = await this.#api.agentPresets.list(request({}))
      if (!presets.result.ok) throw failure(presets.result.error)
      const preset = presets.result.value.presets.find(item => item.id === task.mode)
      if (preset === undefined) throw new Error(`agent preset not found: ${task.mode}`)
      if (preset.broken !== undefined) throw new Error(`agent preset is unavailable: ${preset.broken}`)
    }
    const created = await this.#api.sessions.create(request({
      ...(task.workspaceId === undefined ? {} : { workspaceId: task.workspaceId }),
      ...(task.mode === undefined ? {} : { agentPreset: task.mode }),
    }))
    if (!created.result.ok) throw failure(created.result.error)
    const sessionId = created.result.value.sessionId
    try {
      const renamed = await this.#api.sessions.rename(request({ sessionId, title: task.title }))
      if (!renamed.result.ok) throw failure(renamed.result.error)
      if (task.permission !== undefined) {
        if (this.#commands === undefined) throw new Error('permission command dispatcher is unavailable')
        const command = await this.#commands.execute(sessionId, `/permission ${task.permission}`, AbortSignal.timeout(30_000))
        if (command === undefined) throw new Error('permission command was not acknowledged')
        if (command.kind !== 'success') throw new Error(command.text ?? 'permission command failed')
      }
      const prompt = await this.#api.sessions.prompt(request({
        sessionId,
        mode: 'queue',
        content: [{ type: 'text', text: task.prompt !== '' ? task.prompt : task.title }],
      }))
      if (!prompt.result.ok) throw failure(prompt.result.error)
    } catch (error) {
      throw new SessionLaunchError(sessionId, error)
    }
    return sessionId
  }

  /** 运行中会话计数与列表（失败时 known:false，电源/对账保守处理）。 */
  async listRunning() {
    try {
      const response = await this.#api.sessions.list(request({}))
      return response.result.ok
        ? { known: true, count: response.result.value.items.filter(item => item.running).length, items: response.result.value.items }
        : { known: false }
    } catch {
      return { known: false }
    }
  }

  /**
   * 判定一次执行的结果。调用方可传入本 tick 已取到的会话列表，避免 1+E 次 list RPC。
   * @returns {Promise<{ outcome: 'pending' } | { outcome: 'succeeded' } | { outcome: 'failed', error: string } | { outcome: 'cancelled', error: string }>}
   */
  async inspect(sessionId, startedAt = 0, sessions) {
    let items
    if (sessions !== undefined) {
      items = sessions
    } else {
      const response = await this.#api.sessions.list(request({}))
      if (!response.result.ok) return { outcome: 'pending' }
      items = response.result.value.items
    }
    const summary = items.find(item => item.sessionId === sessionId)
    if (summary === undefined) return { outcome: 'cancelled', error: 'execution session no longer exists' }
    if (summary.running) return { outcome: 'pending' }
    const events = []
    let beforeSeq
    let reachedExecutionBoundary = false
    for (let page = 0; page < 100; page += 1) {
      const history = await this.#api.sessions.history(request({
        sessionId: summary.sessionId,
        maxMessages: 100,
        ...(beforeSeq === undefined ? {} : { beforeSeq }),
      }))
      if (!history.result.ok) return { outcome: 'pending' }
      events.push(...history.result.value.events)
      const oldestTime = history.result.value.events.reduce((oldest, entry) => {
        const time = entry.event.time
        return typeof time !== 'number' ? oldest : oldest === undefined ? time : Math.min(oldest, time)
      }, undefined)
      if (!history.result.value.hasMore || (oldestTime !== undefined && oldestTime <= startedAt)) {
        reachedExecutionBoundary = true
        break
      }
      const oldestSeq = history.result.value.events.reduce((oldest, entry) => {
        const seq = entry.event.seq
        return typeof seq !== 'number' ? oldest : oldest === undefined ? seq : Math.min(oldest, seq)
      }, undefined)
      if (oldestSeq === undefined || oldestSeq === beforeSeq) return { outcome: 'pending' }
      beforeSeq = oldestSeq
    }
    if (!reachedExecutionBoundary) return { outcome: 'pending' }
    const turnEnd = events
      .filter(entry => entry.event.type === 'turn/end' && (
        startedAt <= 0 || (typeof entry.event.time === 'number' && entry.event.time >= startedAt)
      ))
      .sort((a, b) => (a.event.seq ?? Number.MAX_SAFE_INTEGER) - (b.event.seq ?? Number.MAX_SAFE_INTEGER))[0]
    // 会话已停止（running 分支已在上方返回）且翻页到达执行起点边界，
    // 却仍无合法 turn/end：turn 被中断（杀会话、异常退出等），
    // 按 cancelled 保守结算，而不是永远等待一个不会到来的事件。
    if (turnEnd === undefined) {
      return { outcome: 'cancelled', error: 'session stopped without a turn/end event' }
    }
    return isErrorTurnEnd(turnEnd.event.data)
      ? { outcome: 'failed', error: 'agent turn ended with an error' }
      : { outcome: 'succeeded' }
  }
}
