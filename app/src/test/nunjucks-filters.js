import test from 'ava'

import * as nunjucksFilters from '../server/nunjucks-filters.js'

test('dateHowLongBefore', t => {
  const fn = nunjucksFilters.dateHowLongBefore

  t.deepEqual(fn(new Date()), 'just now')
})
