import test from 'ava'

import * as path from 'path'
import * as utilsArticles from '../../server/utils/articles.js'

test('stripPathSeparators', t => {
  const fn = utilsArticles.stripPathSeparators

  t.deepEqual(fn(''), '')
  t.deepEqual(fn('foo'), 'foo')
  t.deepEqual(fn('foo' + path.sep), 'foo')
  t.deepEqual(fn(path.sep + 'foo'), 'foo')
  t.deepEqual(fn(path.sep + 'foo' + path.sep), 'foo')
})

test('escapeCodeBlocks', t => {
  const fn = utilsArticles.escapeCodeBlocks

  t.deepEqual(fn(''), '')
  t.deepEqual(fn('<code></code>'), '<code></code>')
  t.deepEqual(fn('<code>foo</code>'), '<code>foo</code>')
  t.deepEqual(
    fn('<code><h1>foo</h1></code>'),
    '<code>&lt;h1&gt;foo&lt;/h1&gt;</code>'
  )
  t.deepEqual(
    fn('<code>function foo (bar) { return bar[0]; }</code>'),
    '<code>function foo (bar) { return bar[0]; }</code>'
  )
})

