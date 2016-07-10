import test from 'ava'

import * as utilsArticles from '../../server/utils/articles.js'

test('addIdsToHeadings', t => {
  const fn = utilsArticles.addIdsToHeadings

  t.deepEqual(fn(''), '')

  // only h2 & h3 which are not in <code> block will be transformed
  t.deepEqual(fn('<p>hello</p>'), '<p>hello</p>')
  t.deepEqual(fn('<h1>hello</h1>'), '<h1>hello</h1>')
  t.deepEqual(fn('<code><h1>hello</h1></code>'), '<code><h1>hello</h1></code>')
  t.deepEqual(fn('<code><h2>hello</h2></code>'), '<code><h2>hello</h2></code>')
  t.deepEqual(fn('<code><h3>hello</h3></code>'), '<code><h3>hello</h3></code>')
  t.deepEqual(fn('<h2>hello</h2>'), '<h2 id="hello">hello</h2>')
  t.deepEqual(fn('<h3>hello</h3>'), '<h3 id="hello">hello</h3>')

  t.deepEqual(fn('<h2> hello </h2>'), '<h2 id="hello"> hello </h2>')
  t.deepEqual(fn('<h2>HELLO</h2>'), '<h2 id="hello">HELLO</h2>')
  t.deepEqual(fn('<h2>longer heading</h2>'), '<h2 id="longer-heading">longer heading</h2>')
  t.deepEqual(fn('<h2>foo\'s</h2>'), '<h2 id="foos">foo&apos;s</h2>')
  t.deepEqual(fn('<h2>foo&bar</h2>'), '<h2 id="foo-bar">foo&amp;bar</h2>')
  t.deepEqual(fn('<h2>a "foo"</h2>'), '<h2 id="a-foo">a &quot;foo&quot;</h2>')
  t.deepEqual(fn('<h2>Node.js</h2>'), '<h2 id="node-js">Node.js</h2>')
  t.deepEqual(fn('<h2>foo 1.0.0</h2>'), '<h2 id="foo-1-0-0">foo 1.0.0</h2>')
  t.deepEqual(fn('<h2>foo 1.0.0</h2>'), '<h2 id="foo-1-0-0">foo 1.0.0</h2>')
  t.deepEqual(fn('<h2>www.google.com</h2>'), '<h2 id="www-google-com">www.google.com</h2>')
  t.deepEqual(fn('<h2>some underscore_case</h2>'), '<h2 id="some-underscore-case">some underscore_case</h2>')
  t.deepEqual(fn('<h2>a snake-case</h2>'), '<h2 id="a-snake-case">a snake-case</h2>')
})

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
