/**
 * dsh-work 宿主回归断言（跑在构建产物上）：
 *  1. 非 ASCII（中文）文件名回归——仓库强制 core.quotepath=true（git 缺省
 *     行为）时，inspect 仍须输出原始 UTF-8 路径，且对该路径的
 *     stage/unstage/ignore/unignore 往返全部成功（修复前 `git add --
 *     "\346…"` 报 pathspec did not match）。
 *  2. 请求体读取——客户端中途断开（'aborted'，无 'end'）时 readJsonBody /
 *     readWriteJsonBody 必须兜底 resolve，不得永远挂起；超 CAP 的写入体
 *     resolve null。
 *  3. writeFileAtomic——内容落盘正确、权限位保留、无残留临时文件。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { EventEmitter } from 'node:events'
import { mkdtempSync, rmSync, writeFileSync, readFileSync, readdirSync, chmodSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const {
  inspect,
  runGit,
  addIgnore,
  removeIgnore,
  unstagePath,
  readJsonBody,
  readWriteJsonBody,
  writeFileAtomic,
} = await import('../lib/index.js')

/** 带超时的 await：修复回归（Promise 挂起）时给出明确失败而非卡死套件。 */
function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} 超时未 resolve（挂起回归）`)), ms).unref()),
  ])
}

function makeRepo() {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-work-host-'))
  return dir
}

// ── 1. 中文文件名：quotepath 回归 ─────────────────────────────────────
test('inspect：quotepath=true 仓库仍输出原始 UTF-8 中文路径', async () => {
  const dir = makeRepo()
  try {
    assert.equal((await runGit(dir, ['init'])).ok, true)
    assert.equal((await runGit(dir, ['config', 'user.name', '测试用户'])).ok, true)
    assert.equal((await runGit(dir, ['config', 'user.email', 'test@example.com'])).ok, true)
    // 强制 git 缺省行为：非 ASCII 路径在输出里转义为八进制引号形式。
    // 修复前本测试在此失败（inspect 返回 "\346\226\207\346\241\243.txt"）。
    assert.equal((await runGit(dir, ['config', 'core.quotepath', 'true'])).ok, true)
    writeFileSync(join(dir, '文档.txt'), '中文内容\n')
    writeFileSync(join(dir, 'plain.txt'), 'ascii\n')

    const facts = await inspect(dir)
    assert.equal(facts.ok, true)
    assert.equal(facts.repo, true)
    const paths = facts.changes.map((change) => change.path)
    assert.ok(paths.includes('文档.txt'), `changes 应含原始 UTF-8 路径，实际：${JSON.stringify(paths)}`)
    assert.ok(paths.includes('plain.txt'))
    assert.ok(!paths.some((path) => path.includes('\\3') || path.startsWith('"')), '不得出现八进制转义路径')

    // 未跟踪 → 暂存 → 取消暂存：全部用原始 UTF-8 路径往返。
    assert.equal((await runGit(dir, ['add', '--', '文档.txt'])).ok, true)
    const staged = await inspect(dir)
    const stagedEntry = staged.changes.find((change) => change.path === '文档.txt')
    assert.ok(stagedEntry !== undefined && stagedEntry.code.startsWith('A'), '中文文件应已暂存')
    // 此刻仓库尚无任何提交（unborn HEAD）：`git restore --staged` 会
    // `fatal: could not resolve HEAD`，unstagePath 必须回退 `rm --cached`。
    assert.equal((await unstagePath(dir, '文档.txt')).ok, true)
    const unstaged = await inspect(dir)
    assert.equal(unstaged.changes.find((change) => change.path === '文档.txt')?.code, '??')
    // 有提交之后走常规 `restore --staged` 分支，同样往返成功。
    assert.equal((await runGit(dir, ['add', '--', '文档.txt', 'plain.txt'])).ok, true)
    assert.equal((await runGit(dir, ['commit', '-m', 'init'])).ok, true)
    writeFileSync(join(dir, '文档.txt'), '改动\n')
    assert.equal((await runGit(dir, ['add', '--', '文档.txt'])).ok, true)
    assert.equal((await unstagePath(dir, '文档.txt')).ok, true)
    const afterSecondUnstage = await inspect(dir)
    assert.equal(afterSecondUnstage.changes.find((change) => change.path === '文档.txt')?.code, ' M')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('addIgnore/removeIgnore：中文路径往返写入原始 UTF-8', async () => {
  const dir = makeRepo()
  try {
    assert.equal((await runGit(dir, ['init'])).ok, true)
    assert.equal((await runGit(dir, ['config', 'core.quotepath', 'true'])).ok, true)
    writeFileSync(join(dir, '文档.txt'), 'x\n')

    assert.equal((await addIgnore(dir, '文档.txt')).ok, true)
    assert.ok(readFileSync(join(dir, '.gitignore'), 'utf8').includes('文档.txt'), '.gitignore 应为原始 UTF-8 条目')
    const withIgnored = await inspect(dir, true)
    assert.ok(withIgnored.ignored.includes('文档.txt'), `ignored 应含中文路径，实际：${JSON.stringify(withIgnored.ignored)}`)
    // 重复添加为 no-op，不得追加重复行。
    assert.equal((await addIgnore(dir, '文档.txt')).ok, true)
    assert.equal(readFileSync(join(dir, '.gitignore'), 'utf8').split('\n').filter((line) => line === '文档.txt').length, 1)

    assert.equal((await removeIgnore(dir, '文档.txt')).ok, true)
    assert.ok(!readFileSync(join(dir, '.gitignore'), 'utf8').includes('文档.txt'))
    const afterRemove = await inspect(dir, true)
    assert.ok(!afterRemove.ignored.includes('文档.txt'))
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

// ── 2. 请求体读取：中止兜底与超限 ────────────────────────────────────
test('readJsonBody：客户端中止（无 end）兜底 resolve，不挂起', async () => {
  const req = new EventEmitter()
  const pending = readJsonBody(req)
  req.emit('data', Buffer.from('{"cwd": "/tmp'))
  req.emit('aborted')
  assert.deepEqual(await withTimeout(pending, 1000, 'readJsonBody'), {})
})

test('readJsonBody：close 兜底与正常 end 路径不受影响', async () => {
  const aborted = new EventEmitter()
  const viaClose = readJsonBody(aborted)
  aborted.emit('close')
  assert.deepEqual(await withTimeout(viaClose, 1000, 'readJsonBody(close)'), {})

  const normal = new EventEmitter()
  const parsed = readJsonBody(normal)
  normal.emit('data', Buffer.from('{"a":1}'))
  normal.emit('end')
  normal.emit('close') // 正常结束后的 close 不得覆盖已解析结果
  assert.deepEqual(await withTimeout(parsed, 1000, 'readJsonBody(end)'), { a: 1 })
})

test('readWriteJsonBody：中止兜底 resolve {}；超 CAP resolve null', async () => {
  const req = new EventEmitter()
  const pending = readWriteJsonBody(req)
  req.emit('data', Buffer.from('{"path":"/x","content":"yy'))
  req.emit('aborted')
  assert.deepEqual(await withTimeout(pending, 1000, 'readWriteJsonBody'), {})

  const big = new EventEmitter()
  const oversized = readWriteJsonBody(big)
  const chunk = Buffer.alloc(64 * 1024, 0x61) // 'a'
  // CAP = MAX_TEXT_EDIT * 6 + 16KB ≈ 6.02MB：灌 6.4MB 触发超限。
  for (let i = 0; i < 100; i += 1) big.emit('data', chunk)
  big.emit('end')
  assert.equal(await withTimeout(oversized, 2000, 'readWriteJsonBody(oversized)'), null)
})

// ── 3. writeFileAtomic：内容与权限位 ─────────────────────────────────
test('writeFileAtomic：内容正确、权限位保留、无残留临时文件', async () => {
  const dir = makeRepo()
  try {
    const target = join(dir, 'script.sh')
    writeFileSync(target, '#!/bin/sh\necho old\n')
    chmodSync(target, 0o755)

    const result = await writeFileAtomic(target, '#!/bin/sh\necho new\n')
    assert.equal(result.ok, true)
    assert.equal(readFileSync(target, 'utf8'), '#!/bin/sh\necho new\n')
    assert.equal(statSync(target).mode & 0o777, 0o755, 'rename 换 inode 不得丢可执行位')
    assert.deepEqual(readdirSync(dir), ['script.sh'], '不得残留临时文件')

    // 不存在的文件拒绝写入。
    const missing = await writeFileAtomic(join(dir, 'nope.txt'), 'x')
    assert.equal(missing.ok, false)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
