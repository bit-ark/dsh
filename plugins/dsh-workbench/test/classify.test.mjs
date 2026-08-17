/**
 * dsh-workbench 纯逻辑断言：文件预览分类 / MIME 映射 / 文本判定。
 * 与 dsh-deepseek-balance 的纯折叠断言同模式：node:test + assert，无依赖。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  classifyFile,
  contentTypeFor,
  extensionOf,
  looksText,
} from '../index.js'

test('extensionOf 提取小写扩展名', () => {
  assert.equal(extensionOf('README.md'), 'md')
  assert.equal(extensionOf('a.b.CsS'), 'css')
  assert.equal(extensionOf('.gitignore'), '')
  assert.equal(extensionOf('noext'), '')
  assert.equal(extensionOf('archive.tar.gz'), 'gz')
})

test('classifyFile 覆盖各分类', () => {
  assert.equal(classifyFile('a.md'), 'text')
  assert.equal(classifyFile('a.txt'), 'text')
  assert.equal(classifyFile('a.tsx'), 'text')
  assert.equal(classifyFile('a.json'), 'text')
  assert.equal(classifyFile('a.png'), 'image')
  assert.equal(classifyFile('a.jpg'), 'image')
  assert.equal(classifyFile('a.SVG'), 'image')
  assert.equal(classifyFile('a.mp3'), 'audio')
  assert.equal(classifyFile('a.wav'), 'audio')
  assert.equal(classifyFile('a.mp4'), 'video')
  assert.equal(classifyFile('a.webm'), 'video')
  assert.equal(classifyFile('a.xyz'), 'other')
  assert.equal(classifyFile('Makefile'), 'other')
})

test('contentTypeFor 映射常见媒体', () => {
  assert.equal(contentTypeFor('a.png'), 'image/png')
  assert.equal(contentTypeFor('a.jpg'), 'image/jpeg')
  assert.equal(contentTypeFor('a.svg'), 'image/svg+xml')
  assert.equal(contentTypeFor('a.mp3'), 'audio/mpeg')
  assert.equal(contentTypeFor('a.wav'), 'audio/wav')
  assert.equal(contentTypeFor('a.mp4'), 'video/mp4')
  assert.equal(contentTypeFor('a.webm'), 'video/webm')
  assert.equal(contentTypeFor('a.pdf'), 'application/pdf')
  assert.equal(contentTypeFor('a.unknownext'), 'application/octet-stream')
  assert.equal(contentTypeFor('noext'), 'application/octet-stream')
})

test('looksText 按 NUL 嗅探判定', () => {
  assert.equal(looksText(Buffer.from('plain text content', 'utf8')), true)
  assert.equal(looksText(Buffer.from([0x68, 0x69])), true)
  assert.equal(looksText(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00])), false)
  assert.equal(looksText(Buffer.alloc(16)), false)
  // 探测窗口为前 8KB：窗口后的 NUL 不算。
  const lateNul = Buffer.alloc(9000)
  lateNul.fill(0x61, 0, 8192)
  lateNul[8500] = 0
  assert.equal(looksText(lateNul), true)
})
