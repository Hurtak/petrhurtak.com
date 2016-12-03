import test from 'ava'

import paths from '../compile/paths.js'

test('paths', t => {
  t.true(Object.keys(paths).length > 0)
})
