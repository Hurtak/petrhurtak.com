import test from 'ava'

import * as utilsArticles from '../../server/utils/articles.js'

test('trimCodeBlocks', t => {
  const fn = utilsArticles.trimCodeBlocks

  t.deepEqual(fn(''), '')
  t.deepEqual(fn(
      '<code>function hello () {\n' +
      '  return 1\n' +
      '}</code>'
    ),
      '<code>function hello () {\n' +
      '  return 1\n' +
      '}</code>'
    )
  t.deepEqual(fn(
      '<code>\n' +
      'function hello () {\n' +
      '  return 1\n' +
      '}\n' +
      '</code>'
    ),
      '<code>function hello () {\n' +
      '  return 1\n' +
      '}</code>'
    )
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

test('replaceRelativeImageUrls', t => {
  const fn = utilsArticles.replaceRelativeImageUrls

  t.throws(() => { fn('') })
  t.throws(() => { fn('', '') })

  t.deepEqual(fn('<img src="foo.png">', 'static'), '<img src="/static/foo.png">')
  t.deepEqual(fn('<img src="foo.png">', '/static'), '<img src="/static/foo.png">')
  t.deepEqual(fn('<img src="foo.png">', '/static/'), '<img src="/static/foo.png">')
})
