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

test('fixMarkdownOrderedListIndentation', t => {
  const fn = utilsArticles.fixMarkdownOrderedListIndentation

  t.deepEqual(fn(''), '')
  t.deepEqual(fn(
    '1. hello\n' +
    '  1. nested'
    ),
    '1. hello\n' +
    '    1. nested'
  )
  t.deepEqual(fn(
    '1. hello\n' +
    '  1. nested\n' +
    '    2. nested\n' +
    '2. world'
    ),
    '1. hello\n' +
    '    1. nested\n' +
    '        2. nested\n' +
    '2. world'
  )
  t.deepEqual(fn(
    '```js' +
    '  function test () {\n' +
    '    return 1\n' +
    '  }\n' +
    '```'
    ),
    '```js' +
    '  function test () {\n' +
    '    return 1\n' +
    '  }\n' +
    '```'
  )
})
