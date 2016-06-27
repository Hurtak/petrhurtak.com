import test from 'ava'

import * as nunjucksFilters from '../server/nunjucks-filters.js'

test('dateHowLongBefore', t => {
  const fn = nunjucksFilters.dateHowLongBefore

  t.deepEqual(fn(new Date()), 'just now')
})

test('datetimeAttribute', t => {
  const fn = nunjucksFilters.datetimeAttribute

  const addLeadingZero = input => {
    input = String(input)
    while (input.length < 2) {
      input = '0' + input
    }
    return input
  }

  const dateToDateTimeAttribute = givenDate => {
    const timezoneOffset = givenDate.getTimezoneOffset()
    // remove timezone offset
    const date = new Date(givenDate.getTime() + timezoneOffset * 1000 * 60)

    const year = date.getFullYear()
    const month = addLeadingZero(date.getMonth() + 1)
    const day = addLeadingZero(date.getDate())
    const hours = addLeadingZero(date.getHours())
    const minutes = addLeadingZero(date.getMinutes())
    const seconds = addLeadingZero(date.getSeconds())

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
  }

  const date1 = new Date()
  t.deepEqual(fn(date1), dateToDateTimeAttribute(date1))

  const date2 = new Date(2016, 1, 2, 3, 4, 5)
  t.deepEqual(fn(date2), dateToDateTimeAttribute(date2))

  const date3 = new Date(2000, 1, 1, 0, 0, 0)
  t.deepEqual(fn(date3), dateToDateTimeAttribute(date3))

  const date4 = new Date(2000, 12, 31, 23, 59, 59)
  t.deepEqual(fn(date4), dateToDateTimeAttribute(date4))

  const date5 = new Date(0)
  t.deepEqual(fn(date5), dateToDateTimeAttribute(date5))
})
