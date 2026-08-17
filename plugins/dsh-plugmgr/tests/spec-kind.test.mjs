/**
 * specKind 分类断言 —— 纯逻辑测试，不触网、不动 profile。
 * 覆盖安装来源：本地目录 / npm 注册表 / Git / npm 别名 / workspace / 远程 / tarball。
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { specKind, safeSpec } from '../index.js'

test('本地目录 spec 分类为 local', () => {
  assert.equal(specKind('link:../dsh-archive'), 'local')
  assert.equal(specKind('link:/Users/x/plugins/dsh-foo'), 'local')
  assert.equal(specKind('file:/Users/x/plugins/dsh-foo'), 'local')
  assert.equal(specKind('/Users/x/plugins/dsh-foo'), 'local')
  assert.equal(specKind('C:\\plugins\\dsh-foo'), 'local')
})

test('npm 注册表 spec 分类为 registry', () => {
  assert.equal(specKind('3.18.2'), 'registry')
  assert.equal(specKind('^1.0.0'), 'registry')
  assert.equal(specKind('~0.2.3'), 'registry')
  assert.equal(specKind('latest'), 'registry')
  assert.equal(specKind('*'), 'registry')
  assert.equal(specKind('whale-girl'), 'registry')
  assert.equal(specKind('whale-girl@1.2.0'), 'registry')
  assert.equal(specKind('@scope/name'), 'registry')
  assert.equal(specKind('@scope/name@1.2.0'), 'registry')
})

test('Git spec 分类为 git', () => {
  assert.equal(specKind('github:vlln/whale-girl#main'), 'git')
  assert.equal(specKind('github:user/repo'), 'git')
  assert.equal(specKind('gitlab:user/repo#main'), 'git')
  assert.equal(specKind('bitbucket:user/repo'), 'git')
  assert.equal(specKind('git+https://github.com/x/y.git'), 'git')
  assert.equal(specKind('git+ssh://git@github.com/x/y.git#v1.0.0'), 'git')
  assert.equal(specKind('https://github.com/x/y.git'), 'git')
})

test('别名 / workspace / 远程 / tarball 分类', () => {
  assert.equal(specKind('npm:real-name@1.0.0'), 'alias')
  assert.equal(specKind('npm:@scope/real@^2'), 'alias')
  assert.equal(specKind('workspace:*'), 'workspace')
  assert.equal(specKind('https://example.com/pkg.tgz'), 'remote')
  assert.equal(specKind('https://example.com/pkg-1.0.0.tgz'), 'remote')
  assert.equal(specKind('./pkg-1.0.0.tgz'), 'tarball')
  assert.equal(specKind('pkg-1.0.0.tgz'), 'tarball')
})

test('空值回退为 registry（防御）', () => {
  assert.equal(specKind(''), 'registry')
  assert.equal(specKind(null), 'registry')
  assert.equal(specKind(undefined), 'registry')
})

test('safeSpec 放行合法包名/spec，拒绝 shell 元字符', () => {
  assert.equal(safeSpec('whale-girl'), 'whale-girl')
  assert.equal(safeSpec('@scope/name@1.2.0'), '@scope/name@1.2.0')
  assert.equal(safeSpec('github:user/repo#main'), 'github:user/repo#main')
  for (const bad of ['x; rm -rf /', 'a && b', 'a | b', '$(id)', '`id`', 'a"b', "a'b", 'a b', 'a<b', 'a>b', 'a\\b']) {
    assert.throws(() => safeSpec(bad), /非法字符/, `spec ${JSON.stringify(bad)} 必须被拒绝`)
  }
})
