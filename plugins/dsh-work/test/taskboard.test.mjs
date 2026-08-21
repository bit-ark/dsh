/**
 * dsh-work 任务看板纯逻辑断言：cron 解析/下一次触发、任务状态机与用例、
 * 动作信封校验、Host 账本（持久化/幂等/锁/恢复）。
 * 与既有测试同模式：node:test + assert，无依赖；跑在构建产物上：
 * pnpm build && node test/taskboard.test.mjs（或直接 pnpm test）。
 *
 * 被测逻辑移植自 zhu1090093659/dsh-web-ui packages/dsh-task-board (Apache-2.0)。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  parseCron, isValidCron, nextRunAtMs,
  canMoveManually, createTask, startExecution, settleExecution,
  applyCreateTask, applyUpdateTask, applyArchiveTask, applyRestoreTask, applySetSchedule,
  parseActionEnvelope, parseLedger, TaskboardLedger, TaskboardRunner,
} from '../lib/index.js'

// ── cron 解析 ────────────────────────────────────────────────────────────

test('parseCron 接受通配/步长/范围/逗号列表', () => {
  assert.ok(parseCron('* * * * *'))
  assert.ok(parseCron('*/10 * * * *'))
  assert.ok(parseCron('0 9 * * 1'))
  assert.ok(parseCron('0,30 8-18 1,15 * *'))
  assert.ok(parseCron('0 0 29 2 *'))
})

test('parseCron 拒绝非法表达式', () => {
  assert.equal(parseCron(null), null)
  assert.equal(parseCron(''), null)
  assert.equal(parseCron('* * * *'), null)
  assert.equal(parseCron('60 * * * *'), null)
  assert.equal(parseCron('* 24 * * *'), null)
  assert.equal(parseCron('* * 0 * *'), null)
  assert.equal(parseCron('* * * 13 *'), null)
  assert.equal(parseCron('* * * * 8'), null)
  assert.equal(parseCron('a * * * *'), null)
  assert.equal(parseCron('1- * * * *'), null)
  assert.equal(parseCron('5-1 * * * *'), null)
  assert.equal(parseCron('*/0 * * * *'), null)
})

test('周日 0 与 7 归一', () => {
  const zero = parseCron('0 0 * * 0')
  const seven = parseCron('0 0 * * 7')
  assert.deepEqual([...zero.weekdays], [0])
  assert.deepEqual([...seven.weekdays], [0])
})

test('nextRunAtMs 基本推进', () => {
  // 2025-06-15 12:00:00（周日）之后，每天 09:00 → 次日 09:00
  const from = new Date(2025, 5, 15, 12, 0, 0).getTime()
  const next = nextRunAtMs('0 9 * * *', from)
  assert.equal(next, new Date(2025, 5, 16, 9, 0, 0).getTime())
})

test('nextRunAtMs 严格大于基准时刻', () => {
  // 恰好 09:00:00 触发 0 9 * * * → 下一天
  const from = new Date(2025, 5, 15, 9, 0, 0).getTime()
  const next = nextRunAtMs('0 9 * * *', from)
  assert.equal(next, new Date(2025, 5, 16, 9, 0, 0).getTime())
})

test('nextRunAtMs 步长字段', () => {
  const from = new Date(2025, 5, 15, 10, 3, 0).getTime()
  const next = nextRunAtMs('*/10 * * * *', from)
  assert.equal(next, new Date(2025, 5, 15, 10, 10, 0).getTime())
})

test('nextRunAtMs 日/周 OR 语义', () => {
  // 日=15 或 周一；2025-06-15 周日 12:00 之后最近的是当天 13:00（日匹配）
  const from = new Date(2025, 5, 15, 12, 0, 0).getTime()
  const next = nextRunAtMs('0 13 15 * 1', from)
  assert.equal(next, new Date(2025, 5, 15, 13, 0, 0).getTime())
})

test('nextRunAtMs 周字段通配时只看日字段', () => {
  // 日=16，周='*'（通配）→ 2025-06-16
  const from = new Date(2025, 5, 15, 12, 0, 0).getTime()
  const next = nextRunAtMs('0 9 16 * *', from)
  assert.equal(next, new Date(2025, 5, 16, 9, 0, 0).getTime())
})

test('nextRunAtMs 不可能的日历返回 undefined', () => {
  const from = new Date(2025, 5, 15, 12, 0, 0).getTime()
  assert.equal(nextRunAtMs('0 0 30 2 *', from), undefined)
  assert.equal(nextRunAtMs('0 0 31 4 *', from), undefined)
})

test('nextRunAtMs 闰年 2 月 29 可达', () => {
  // 从 2026（非闰年）出发，0 0 29 2 * 应命中 2028-02-29
  const from = new Date(2026, 0, 1, 0, 0, 0).getTime()
  const next = nextRunAtMs('0 0 29 2 *', from)
  assert.equal(next, new Date(2028, 1, 29, 0, 0, 0).getTime())
})

test('isValidCron 与 parseCron 一致', () => {
  assert.ok(isValidCron('0 23 * * *'))
  assert.ok(!isValidCron('bad'))
})

// ── 状态机与用例 ─────────────────────────────────────────────────────────

test('canMoveManually 只许移入 backlog/todo 且运行中不可移', () => {
  assert.ok(canMoveManually('todo', 'backlog'))
  assert.ok(canMoveManually('done', 'todo'))
  assert.ok(!canMoveManually('todo', 'done'))
  assert.ok(!canMoveManually('running', 'todo'))
})

test('createTask 落 todo 列并归一化目标', () => {
  const task = createTask({ title: ' t ', description: 'd', prompt: 'p', workspaceId: '  ', mode: 'm' }, 100, 'id1')
  assert.equal(task.status, 'todo')
  assert.equal(task.title, 't')
  assert.equal(task.workspaceId, undefined)
  assert.equal(task.mode, 'm')
})

test('startExecution/settleExecution 生命周期', () => {
  const base = createTask({ title: 't', description: '', prompt: 'p' }, 100, 'id1')
  const { task: running, execution } = startExecution(base, 200, 'ex1')
  assert.equal(running.status, 'running')
  assert.equal(running.executions.length, 1)
  const done = settleExecution(running, execution.id, 'succeeded', 300, undefined)
  assert.equal(done.status, 'done')
  assert.equal(done.executions[0].result, 'succeeded')
  const { task: running2 } = startExecution(createTask({ title: 't', description: '', prompt: '' }, 100, 'id2'), 200, 'ex2')
  assert.equal(settleExecution(running2, 'ex2', 'failed', 300, 'boom').status, 'failed')
  const { task: running3 } = startExecution(createTask({ title: 't', description: '', prompt: '' }, 100, 'id3'), 200, 'ex3')
  assert.equal(settleExecution(running3, 'ex3', 'cancelled', 300, 'x').status, 'todo')
})

test('applyCreateTask 拒绝空白标题并武装合法调度', () => {
  const rejected = applyCreateTask([], { title: '   ', description: '', prompt: '' }, 100, 'id1')
  assert.equal(rejected.task, undefined)
  const { task } = applyCreateTask([], { title: 't', description: '', prompt: '', schedule: { enabled: true, cron: '0 9 * * *' } }, 100, 'id2')
  assert.equal(task.schedule.enabled, true)
  assert.ok(task.schedule.nextRunAt > 100)
  const bad = applyCreateTask([], { title: 't', description: '', prompt: '', schedule: { enabled: true, cron: 'nope' } }, 100, 'id3')
  assert.equal(bad.task.schedule, undefined)
})

test('applyUpdateTask 显式 undefined 清除字段', () => {
  const task = createTask({ title: 't', description: '', prompt: '', workspaceId: 'w1', mode: 'm1' }, 100, 'id1')
  const [updated] = applyUpdateTask([task], 'id1', { workspaceId: undefined, mode: '  ' }, 200)
  assert.equal(updated.workspaceId, undefined)
  assert.equal(updated.mode, undefined)
  assert.equal(updated.updatedAt, 200)
})

test('applyArchiveTask 只接受已结算任务并解除调度', () => {
  let task = createTask({ title: 't', description: '', prompt: '' }, 100, 'id1')
  task = { ...task, status: 'done', schedule: { enabled: true, cron: '0 9 * * *', nextRunAt: 999, lastTriggeredAt: undefined } }
  const todo = { ...createTask({ title: 'x', description: '', prompt: '' }, 100, 'id2'), status: 'todo' }
  const r1 = applyArchiveTask([task, todo], 'id1', 200)
  assert.equal(r1.archived, true)
  assert.equal(r1.tasks[0].archivedAt, 200)
  assert.equal(r1.tasks[0].schedule.enabled, false)
  assert.equal(r1.tasks[0].schedule.nextRunAt, undefined)
  const r2 = applyArchiveTask([todo], 'id2', 200)
  assert.equal(r2.archived, false)
  const restored = applyRestoreTask(r1.tasks, 'id1', 300)
  assert.equal(restored.archived, true)
  assert.equal(restored.tasks[0].archivedAt, undefined)
})

test('applySetSchedule 校验与滚动', () => {
  const task = createTask({ title: 't', description: '', prompt: '' }, 100, 'id1')
  const bad = applySetSchedule([task], 'id1', { enabled: true, cron: 'x' }, 200)
  assert.equal(bad.applied, false)
  const ok = applySetSchedule([task], 'id1', { enabled: true, cron: '0 9 * * *' }, 200)
  assert.equal(ok.applied, true)
  assert.ok(ok.tasks[0].schedule.nextRunAt > 200)
  const disarm = applySetSchedule(ok.tasks, 'id1', { enabled: false }, 300)
  assert.equal(disarm.tasks[0].schedule.enabled, false)
  assert.equal(disarm.tasks[0].schedule.nextRunAt, undefined)
})

// ── 动作信封校验 ─────────────────────────────────────────────────────────

test('parseActionEnvelope 接受合法动作', () => {
  const create = parseActionEnvelope({
    requestId: 'r1',
    action: { kind: 'create', id: 't1', input: { title: 'a', description: '', prompt: 'p' } },
  })
  assert.equal(create.action.kind, 'create')
  const run = parseActionEnvelope({ requestId: 'r2', action: { kind: 'run', taskId: 't1' } })
  assert.equal(run.action.taskId, 't1')
  const move = parseActionEnvelope({ requestId: 'r3', action: { kind: 'move', taskId: 't1', status: 'backlog' } })
  assert.equal(move.action.status, 'backlog')
})

test('parseActionEnvelope 拒绝非法载荷', () => {
  assert.equal(parseActionEnvelope(null), undefined)
  assert.equal(parseActionEnvelope({}), undefined)
  assert.equal(parseActionEnvelope({ requestId: '', action: { kind: 'run', taskId: 't' } }), undefined)
  assert.equal(parseActionEnvelope({ requestId: 'r', action: { kind: 'run', taskId: 't', extra: 1 } }), undefined)
  assert.equal(parseActionEnvelope({ requestId: 'r', action: { kind: 'move', taskId: 't', status: 'nope' } }), undefined)
  assert.equal(parseActionEnvelope({ requestId: 'r', action: { kind: 'create', id: 't', input: { title: 'a', description: '', prompt: '', shell: 'rm -rf' } } }), undefined)
  assert.equal(parseActionEnvelope({ requestId: 'r', action: { kind: 'update', taskId: 't', patch: { permission: 'admin' } } }), undefined)
  assert.equal(parseActionEnvelope({ requestId: 'r', action: { kind: 'import', sourceId: 's', tasks: [] } }), undefined)
})

// ── parseLedger 修复 ─────────────────────────────────────────────────────

test('parseLedger 丢弃非法行并修复调度', () => {
  const raw = JSON.stringify([
    { id: 'ok', title: 't', description: '', prompt: '', createdAt: 1, updatedAt: 1, executions: [], schedule: { enabled: true, cron: 'bad cron' } },
    { id: '', title: 'bad id' },
  ])
  const tasks = parseLedger(raw)
  assert.equal(tasks.length, 1)
  assert.equal(tasks[0].schedule, undefined)
  assert.deepEqual(parseLedger('not json'), [])
  assert.deepEqual(parseLedger(null), [])
})

// ── Host 账本 ────────────────────────────────────────────────────────────

function tempLedger() {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-work-taskboard-'))
  return { dir, ledger: new TaskboardLedger(dir) }
}

test('账本：创建/持久化/重载', () => {
  const { dir, ledger } = tempLedger()
  try {
    const applied = ledger.applyRequest('r1', { kind: 'create', id: 't1', input: { title: '任务', description: '', prompt: 'p' } })
    assert.equal(applied.state.tasks.length, 1)
    assert.equal(applied.state.revision, 1)
    ledger.dispose()
    const reloaded = new TaskboardLedger(dir)
    try {
      const state = reloaded.state()
      assert.equal(state.tasks.length, 1)
      assert.equal(state.tasks[0].title, '任务')
      assert.equal(state.revision, 1)
    } finally { reloaded.dispose() }
  } finally { rmSync(dir, { recursive: true, force: true }) }
})

test('账本：幂等重放与 requestId 复用拒绝', () => {
  const { dir, ledger } = tempLedger()
  try {
    const action = { kind: 'create', id: 't1', input: { title: 'a', description: '', prompt: '' } }
    const first = ledger.applyRequest('r1', action)
    const replay = ledger.applyRequest('r1', action)
    assert.equal(replay.state.revision, first.state.revision)
    assert.equal(replay.state.tasks.length, 1)
    assert.throws(() => ledger.applyRequest('r1', { kind: 'delete', taskId: 't1' }), /different action/)
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

test('账本：run 返回 OpenedRun 且结算回写列', () => {
  const { dir, ledger } = tempLedger()
  try {
    ledger.applyRequest('r1', { kind: 'create', id: 't1', input: { title: 'a', description: '', prompt: 'p' } })
    const { run } = ledger.applyRequest('r2', { kind: 'run', taskId: 't1' })
    assert.ok(run !== undefined)
    assert.equal(run.task.status, 'running')
    assert.throws(() => ledger.applyRequest('r4', { kind: 'run', taskId: 't1' }), /already running/)
    ledger.attachSession('t1', run.execution.id, 'sess-1')
    ledger.settle('t1', run.execution.id, 'succeeded')
    const state = ledger.state()
    assert.equal(state.tasks[0].status, 'done')
    assert.equal(state.tasks[0].executions[0].sessionId, 'sess-1')
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

test('账本：运行中任务禁止删除/移动/改档', () => {
  const { dir, ledger } = tempLedger()
  try {
    ledger.applyRequest('r1', { kind: 'create', id: 't1', input: { title: 'a', description: '', prompt: '' } })
    ledger.applyRequest('r2', { kind: 'run', taskId: 't1' })
    assert.throws(() => ledger.applyRequest('r3', { kind: 'delete', taskId: 't1' }), /running/)
    assert.throws(() => ledger.applyRequest('r4', { kind: 'move', taskId: 't1', status: 'todo' }), /running/)
    assert.throws(() => ledger.applyRequest('r5', { kind: 'archive', taskId: 't1' }), /cannot be archived/)
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

test('账本：归档任务只读', () => {
  const { dir, ledger } = tempLedger()
  try {
    ledger.applyRequest('r1', { kind: 'create', id: 't1', input: { title: 'a', description: '', prompt: '' } })
    const { run } = ledger.applyRequest('r2', { kind: 'run', taskId: 't1' })
    ledger.settle('t1', run.execution.id, 'succeeded')
    ledger.applyRequest('r3', { kind: 'archive', taskId: 't1' })
    assert.throws(() => ledger.applyRequest('r4', { kind: 'update', taskId: 't1', patch: { title: 'b' } }), /read-only/)
    assert.throws(() => ledger.applyRequest('r5', { kind: 'run', taskId: 't1' }), /read-only/)
    ledger.applyRequest('r6', { kind: 'restore', taskId: 't1' })
    assert.ok(ledger.applyRequest('r7', { kind: 'run', taskId: 't1' }).run !== undefined)
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

test('账本：skipMissed 滚动过期触发点不补跑', () => {
  const { dir, ledger } = tempLedger()
  try {
    ledger.applyRequest('r1', {
      kind: 'create', id: 't1',
      input: { title: 'a', description: '', prompt: '', schedule: { enabled: true, cron: '*/10 * * * *' } },
    })
    const before = ledger.state().tasks[0].schedule.nextRunAt
    const now = Date.now() + 3 * 60 * 60 * 1000
    ledger.skipMissed(now)
    const after = ledger.state().tasks[0].schedule.nextRunAt
    assert.ok(after > now)
    assert.ok(after > before)
    assert.equal(ledger.state().tasks[0].status, 'todo')
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

test('账本：重启对账取消无 session 的中断执行，保留有 session 的', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-work-taskboard-'))
  const ledger = new TaskboardLedger(dir)
  try {
    ledger.applyRequest('r1', { kind: 'create', id: 't1', input: { title: 'a', description: '', prompt: '' } })
    ledger.applyRequest('r2', { kind: 'create', id: 't2', input: { title: 'b', description: '', prompt: '' } })
    const run1 = ledger.applyRequest('r3', { kind: 'run', taskId: 't1' }).run
    const run2 = ledger.applyRequest('r4', { kind: 'run', taskId: 't2' }).run
    ledger.attachSession('t2', run2.execution.id, 'sess-2')
    void run1
  } finally { ledger.dispose() }
  const reloaded = new TaskboardLedger(dir)
  try {
    const tasks = reloaded.state().tasks
    const t1 = tasks.find(t => t.id === 't1')
    const t2 = tasks.find(t => t.id === 't2')
    assert.equal(t1.status, 'todo')
    assert.equal(t1.executions[0].result, 'cancelled')
    assert.equal(t2.status, 'running')
    assert.equal(t2.executions[0].endedAt, undefined)
  } finally { reloaded.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

test('账本：openScheduled 空闲开启执行、运行中只滚动', () => {
  const { dir, ledger } = tempLedger()
  try {
    ledger.applyRequest('r1', {
      kind: 'create', id: 't1',
      input: { title: 'a', description: '', prompt: '', schedule: { enabled: true, cron: '*/10 * * * *' } },
    })
    const opened = ledger.openScheduled('t1', 9_999_999, 1_000_000)
    assert.ok(opened !== undefined)
    assert.equal(opened.task.status, 'running')
    assert.equal(ledger.state().tasks[0].schedule.nextRunAt, 9_999_999)
    assert.equal(ledger.state().tasks[0].schedule.lastTriggeredAt, 1_000_000)
    // 运行中再次到期：不开启第二次执行，只滚动 nextRunAt。
    const second = ledger.openScheduled('t1', 20_000_000, 2_000_000)
    assert.equal(second, undefined)
    assert.equal(ledger.state().tasks[0].schedule.nextRunAt, 20_000_000)
    assert.equal(ledger.state().tasks[0].executions.length, 1)
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

test('账本：目录锁阻止第二个持有者', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-work-taskboard-'))
  const first = new TaskboardLedger(dir)
  try {
    assert.throws(() => new TaskboardLedger(dir), /already owned/)
  } finally {
    first.dispose()
    // 释放后可重新持有
    const again = new TaskboardLedger(dir)
    again.dispose()
    rmSync(dir, { recursive: true, force: true })
  }
})

test('账本：损坏文件隔离不覆盖', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-work-taskboard-'))
  const ledgerFile = join(dir, 'taskboard-ledger.json')
  writeFileSync(ledgerFile, '{"schemaVersion": 2, "tasks": broken', 'utf8')
  const ledger = new TaskboardLedger(dir)
  try {
    assert.equal(ledger.state().tasks.length, 0)
    assert.match(ledger.state().scheduler.error ?? '', /corrupt ledger was quarantined/)
    // 损坏字节被改名隔离保留，绝不覆盖。
    const quarantined = readdirSync(dir).filter(name => name.includes('.corrupt-'))
    assert.equal(quarantined.length, 1)
    assert.match(readFileSync(join(dir, quarantined[0]), 'utf8'), /broken/)
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

// ── 权限清除链路（C1）────────────────────────────────────────────────────

test('updatePatch 接受空串 permission 表达清除', () => {
  const parsed = parseActionEnvelope({ requestId: 'r', action: { kind: 'update', taskId: 't', patch: { permission: '' } } })
  assert.equal(parsed.action.patch.permission, '')
})

test('applyUpdateTask 空串/空白 permission 清除，缺省保持', () => {
  const task = { ...createTask({ title: 't', description: '', prompt: '' }, 100, 'id1'), permission: 'read-only' }
  const [cleared] = applyUpdateTask([task], 'id1', { permission: '' }, 200)
  assert.equal(cleared.permission, undefined)
  const [clearedBlank] = applyUpdateTask([task], 'id1', { permission: '   ' }, 200)
  assert.equal(clearedBlank.permission, undefined)
  const [kept] = applyUpdateTask([task], 'id1', {}, 200)
  assert.equal(kept.permission, 'read-only')
  const [changed] = applyUpdateTask([task], 'id1', { permission: 'workspace-write' }, 200)
  assert.equal(changed.permission, 'workspace-write')
  // 未知权限字符串保持原值，不得入账。
  const [unchanged] = applyUpdateTask([task], 'id1', { permission: 'admin' }, 200)
  assert.equal(unchanged.permission, 'read-only')
})

test('账本：update permission 空串清除端到端', () => {
  const { dir, ledger } = tempLedger()
  try {
    ledger.applyRequest('r1', {
      kind: 'create', id: 't1',
      input: { title: 'a', description: '', prompt: '', permission: 'read-only' },
    })
    assert.equal(ledger.state().tasks[0].permission, 'read-only')
    ledger.applyRequest('r2', { kind: 'update', taskId: 't1', patch: { permission: '' } })
    assert.equal(ledger.state().tasks[0].permission, undefined)
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

// ── 标题非空（S6）────────────────────────────────────────────────────────

test('账本：update 不得清空标题', () => {
  const { dir, ledger } = tempLedger()
  try {
    ledger.applyRequest('r1', { kind: 'create', id: 't1', input: { title: 'a', description: '', prompt: '' } })
    assert.throws(() => ledger.applyRequest('r2', { kind: 'update', taskId: 't1', patch: { title: '   ' } }), /title/)
    assert.equal(ledger.state().tasks[0].title, 'a')
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

// ── undefined nextRunAt 解除武装（S4）───────────────────────────────────

test('applySetSchedule 拒绝武装不可达 cron', () => {
  const task = createTask({ title: 't', description: '', prompt: '' }, 100, 'id1')
  // '0 0 30 2 *' 语法合法但日历上永不可能匹配。
  const result = applySetSchedule([task], 'id1', { enabled: true, cron: '0 0 30 2 *' }, 200)
  assert.equal(result.applied, false)
  assert.equal(result.tasks[0].schedule, undefined)
})

test('账本：create 拒绝武装不可达调度', () => {
  const { dir, ledger } = tempLedger()
  try {
    assert.throws(() => ledger.applyRequest('r1', {
      kind: 'create', id: 't1',
      input: { title: 'a', description: '', prompt: '', schedule: { enabled: true, cron: '0 0 30 2 *' } },
    }), /invalid schedule/)
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

test('账本：openScheduled 收到 undefined nextRunAt 时解除武装并记录', () => {
  const { dir, ledger } = tempLedger()
  try {
    ledger.applyRequest('r1', {
      kind: 'create', id: 't1',
      input: { title: 'a', description: '', prompt: '', schedule: { enabled: true, cron: '*/10 * * * *' } },
    })
    // 本次触发照常开启执行，随后解除武装：不得写入 undefined 的 nextRunAt。
    const opened = ledger.openScheduled('t1', undefined, 1_000_000)
    assert.ok(opened !== undefined)
    assert.equal(opened.task.status, 'running')
    const state = ledger.state()
    assert.equal(state.tasks[0].schedule.enabled, false)
    assert.equal(state.tasks[0].schedule.nextRunAt, undefined)
    assert.match(state.scheduler.error ?? '', /no reachable next run/)
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

test('账本：skipMissed 对世纪闰年间隙的 cron 解除武装', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-work-taskboard-'))
  // 时钟缝：2096 是闰年，武装时 2096-02-29 在 5 年窗口内可达。
  let clock = new Date(2096, 0, 15).getTime()
  const ledger = new TaskboardLedger(dir, () => clock)
  try {
    ledger.applyRequest('r1', {
      kind: 'create', id: 't1',
      input: { title: 'a', description: '', prompt: '', schedule: { enabled: true, cron: '0 0 29 2 *' } },
    })
    assert.equal(ledger.state().tasks[0].schedule.nextRunAt, new Date(2096, 1, 29).getTime())
    // 宿主机沉睡到 2097 年中醒来：2097–2103 无 2 月 29 日（2100 非闰年），
    // 下个可达的 2104-02-29 已在 5 年窗口之外。恢复拍 skipMissed 必须解除
    // 武装并记录原因，而不是写入 undefined 让任务被 tick 守卫永久跳过。
    clock = new Date(2097, 5, 1).getTime()
    ledger.skipMissed(clock)
    const state = ledger.state()
    assert.equal(state.tasks[0].schedule.enabled, false)
    assert.equal(state.tasks[0].schedule.nextRunAt, undefined)
    assert.match(state.scheduler.error ?? '', /no reachable next run/)
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

// ── scheduler.error 生命周期（S7）────────────────────────────────────────

test('账本：陈旧 scheduler.error 不跨重启携带', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-work-taskboard-'))
  const ledgerFile = join(dir, 'taskboard-ledger.json')
  writeFileSync(ledgerFile, '{"schemaVersion": 2, "tasks": broken', 'utf8')
  const first = new TaskboardLedger(dir)
  try {
    assert.match(first.state().scheduler.error ?? '', /corrupt ledger was quarantined/)
  } finally { first.dispose() }
  // 二次启动：加载期修复会重新发现仍然成立的问题；已随隔离消除的陈旧错误不再上屏。
  const second = new TaskboardLedger(dir)
  try {
    assert.equal(second.state().scheduler.error, undefined)
  } finally { second.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

// ── 目录锁陈旧检测（S1/S2）──────────────────────────────────────────────

test('账本：PID 复用的陈旧锁被接管', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-work-taskboard-'))
  // 模拟崩溃残留：锁记录本进程 PID，但启动时刻明显不符——即 PID 已被复用。
  writeFileSync(
    join(dir, 'taskboard-ledger.lock'),
    JSON.stringify({ pid: process.pid, token: 'stale-token', startedAt: 1, probe: 'legacy' }),
    'utf8',
  )
  const ledger = new TaskboardLedger(dir)
  try {
    assert.equal(ledger.state().tasks.length, 0)
  } finally { ledger.dispose(); rmSync(dir, { recursive: true, force: true }) }
})

test('账本：半截不可读锁失败关闭并给出恢复提示', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-work-taskboard-'))
  writeFileSync(join(dir, 'taskboard-ledger.lock'), '{"pid": 12', 'utf8')
  try {
    assert.throws(() => new TaskboardLedger(dir), /remove it manually and retry/)
  } finally { rmSync(dir, { recursive: true, force: true }) }
})

// ── 运行器 inspect 结算（S5）─────────────────────────────────────────────

function mockApi({ items, events, hasMore = false }) {
  return {
    sessions: {
      list: async () => ({ result: { ok: true, value: { items } } }),
      history: async () => ({ result: { ok: true, value: { events, hasMore } } }),
    },
  }
}

test('运行器：会话已停止且无 turn/end 时保守结算 cancelled', async () => {
  const runner = new TaskboardRunner(mockApi({ items: [{ sessionId: 's1', running: false }], events: [] }))
  const result = await runner.inspect('s1', 0, [{ sessionId: 's1', running: false }])
  assert.equal(result.outcome, 'cancelled')
  assert.match(result.error, /turn\/end/)
})

test('运行器：正常 turn/end 结算 succeeded，错误 turn/end 结算 failed', async () => {
  const okEvents = [{ event: { type: 'turn/end', seq: 2, time: 500, data: {} } }]
  const okRunner = new TaskboardRunner(mockApi({ items: [{ sessionId: 's1', running: false }], events: okEvents }))
  assert.equal((await okRunner.inspect('s1', 100, [{ sessionId: 's1', running: false }])).outcome, 'succeeded')
  const errEvents = [{ event: { type: 'turn/end', seq: 2, time: 500, data: { reason: { kind: 'error' } } } }]
  const errRunner = new TaskboardRunner(mockApi({ items: [{ sessionId: 's1', running: false }], events: errEvents }))
  const failed = await errRunner.inspect('s1', 100, [{ sessionId: 's1', running: false }])
  assert.equal(failed.outcome, 'failed')
  assert.match(failed.error, /error/)
})

test('运行器：会话运行中或翻页未完成保持 pending', async () => {
  const runningRunner = new TaskboardRunner(mockApi({ items: [{ sessionId: 's1', running: true }], events: [] }))
  assert.equal((await runningRunner.inspect('s1', 0, [{ sessionId: 's1', running: true }])).outcome, 'pending')
  // 翻页未完成（还有更早页、尚未到执行起点、且取不到 seq 水位）：保持 pending。
  const midEvents = [{ event: { type: 'assistant/message', time: 500 } }]
  const pagingRunner = new TaskboardRunner(mockApi({ items: [{ sessionId: 's1', running: false }], events: midEvents, hasMore: true }))
  assert.equal((await pagingRunner.inspect('s1', 100, [{ sessionId: 's1', running: false }])).outcome, 'pending')
})

test('运行器：会话已不存在结算 cancelled', async () => {
  const runner = new TaskboardRunner(mockApi({ items: [], events: [] }))
  const result = await runner.inspect('missing', 0, [])
  assert.equal(result.outcome, 'cancelled')
  assert.match(result.error, /no longer exists/)
})
