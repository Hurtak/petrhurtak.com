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

  // basic transformations
  t.deepEqual(fn('<h2> hello </h2>'), '<h2 id="hello"> hello </h2>')
  t.deepEqual(fn('<h2>HELLO</h2>'), '<h2 id="hello">HELLO</h2>')
  t.deepEqual(fn('<h2>longer heading</h2>'), '<h2 id="longer-heading">longer heading</h2>')
  t.deepEqual(fn('<h2>foo\'s</h2>'), '<h2 id="foos">foo\'s</h2>')
  t.deepEqual(fn('<h2>foo&bar</h2>'), '<h2 id="foo-bar">foo&bar</h2>')
  t.deepEqual(fn('<h2>a "foo"</h2>'), '<h2 id="a-foo">a "foo"</h2>')
  t.deepEqual(fn('<h2>Node.js</h2>'), '<h2 id="node-js">Node.js</h2>')
  t.deepEqual(fn('<h2>foo 1.0.0</h2>'), '<h2 id="foo-1-0-0">foo 1.0.0</h2>')
  t.deepEqual(fn('<h2>foo 1.0.0</h2>'), '<h2 id="foo-1-0-0">foo 1.0.0</h2>')
  t.deepEqual(fn('<h2>www.google.com</h2>'), '<h2 id="www-google-com">www.google.com</h2>')
  t.deepEqual(fn('<h2>some underscore_case</h2>'), '<h2 id="some-underscore-case">some underscore_case</h2>')
  t.deepEqual(fn('<h2>a snake-case</h2>'), '<h2 id="a-snake-case">a snake-case</h2>')

  // multiple headings
  t.deepEqual(fn(`
    <h2>foo</h2>
    <h2>bar</h2>
  `), `
    <h2 id="foo">foo</h2>
    <h2 id="bar">bar</h2>
  `)
  t.deepEqual(fn(`
    <h2>Hello there</h2>
    <h2>Hello there</h2>
    <h2>Hello there</h2>
  `), `
    <h2 id="hello-there">Hello there</h2>
    <h2 id="hello-there-2">Hello there</h2>
    <h2 id="hello-there-3">Hello there</h2>
  `)
  t.deepEqual(fn(`
    <h2>a</h2>
    <h2>a-2</h2>
    <h2>a</h2>
  `), `
    <h2 id="a">a</h2>
    <h2 id="a-2">a-2</h2>
    <h2 id="a-3">a</h2>
  `)
})

test('changeXmpToCode', t => {
  const fn = utilsArticles.changeXmpToCode

  t.deepEqual(fn(''), '')
  t.deepEqual(fn('<xmp></xmp>'), '<code></code>')
  t.deepEqual(fn('<xmp></xmp>'), '<code></code>')
  t.deepEqual(fn('<xmp data-lang="html"></xmp>'), '<code data-lang="html"></code>')
  t.deepEqual(fn(`
    <xmp xmp="xmp" code="code" blank="">
      <h1>hello</h1>
    </xmp>
  `), `
    <code xmp="xmp" code="code" blank="">
      <h1>hello</h1>
    </code>
  `)
})

test('trimCodeBlocks', t => {
  const fn = utilsArticles.trimCodeBlocks

  t.deepEqual(fn(''), '')
  t.deepEqual(fn('<code></code>'), '<code></code>')
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
  t.deepEqual(fn(
    '<code>\n' +
    '\n' +
    'function hello () {\n' +
    '  return 1\n' +
    '}\n' +
    '\n' +
    '</code>'
  ),
    '<code>function hello () {\n' +
    '  return 1\n' +
    '}</code>'
  )
  t.deepEqual(fn(
    '<code>\n' +
    '  function hello () {\n' +
    '    return 1\n' +
    '  }\n' +
    '</code>'
  ),
    '<code>  function hello () {\n' +
    '    return 1\n' +
    '  }</code>'
  )
})

test('removeIndentationInCodeBlocks', t => {
  const fn = utilsArticles.removeIndentationInCodeBlocks

  t.deepEqual(fn(''), '')
  t.deepEqual(fn('<code></code>'), '<code></code>')
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
    '<code>  function hello () {\n' +
    '    return 1\n' +
    '  }</code>'
  ),
    '<code>function hello () {\n' +
    '  return 1\n' +
    '}</code>'
  )
  t.deepEqual(fn(
    '<code>    function hello () {\n' +
    '        return 1\n' +
    '    }</code>'
  ),
    '<code>function hello () {\n' +
    '    return 1\n' +
    '}</code>'
  )
})

test('escapeAndHighlightCodeBlocks', t => {
  const fn = utilsArticles.escapeAndHighlightCodeBlocks

  // no data-lang attribute, just escape
  t.deepEqual(fn(''), '')
  t.deepEqual(fn('<code></code>'), '<code></code>')
  t.deepEqual(fn('<code>foo</code>'), '<code>foo</code>')
  t.deepEqual(
    fn('<code><h1>foo</h1></code>'),
    '<code>&lt;h1&gt;foo&lt;/h1&gt;</code>'
  )
  t.deepEqual(
    fn('<code>yaml: "foo"</code>'),
    '<code>yaml: &quot;foo&quot;</code>'
  )

  // data-lang attribute, syntax highlight + escape
  t.deepEqual(
    fn('<code data-lang="yaml">yaml: "foo"</code>'),
    '<code data-lang="yaml"><span class="hljs-attr">yaml:</span> <span class="hljs-string">"foo"</span></code>'
  )
  t.deepEqual(
    fn(`
      <code data-lang="javascript">
        function foo (bar) {
          return bar[0];
        }
      </code>
    `), `
      <code data-lang="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params">bar</span>) </span>{
          <span class="hljs-keyword">return</span> bar[<span class="hljs-number">0</span>];
        }
      </code>
    `)
})

test('replaceRelativeImageUrls', t => {
  const fn = utilsArticles.replaceRelativeImageUrls

  t.throws(() => { fn('') })
  t.throws(() => { fn('', '') })

  t.deepEqual(fn('<img src="foo.png">', 'static'), '<img src="/static/foo.png">')
  t.deepEqual(fn('<img src="foo.png">', '/static'), '<img src="/static/foo.png">')
  t.deepEqual(fn('<img src="foo.png">', '/static/'), '<img src="/static/foo.png">')
})

test('isoStringToUtcDate', t => {
  const fn = utilsArticles.isoStringToUtcDate

  t.deepEqual(fn('2000-10-5 10:20'), Date.UTC(2000, 9, 5, 10, 20))
  t.deepEqual(fn('2000-1-1 00:00'), Date.UTC(2000, 0, 1, 0, 0))
  t.deepEqual(fn('2016-12-31 23:59'), Date.UTC(2016, 11, 31, 23, 59))
})
