import test from 'ava'

import * as utilsArticles from '../../server/utils/articles.js'

test('replaceRelativeImageUrls', t => {
  const fn = utilsArticles.replaceRelativeImageUrls

  t.throws(() => { fn('') })
  t.throws(() => { fn('', '') })

  t.deepEqual(fn('<img src="foo.png">', 'static'), '<img src="/static/foo.png">')
  t.deepEqual(fn('<img src="foo.png">', '/static'), '<img src="/static/foo.png">')
  t.deepEqual(fn('<img src="foo.png">', '/static/'), '<img src="/static/foo.png">')
})
