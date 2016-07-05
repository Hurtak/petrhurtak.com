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
