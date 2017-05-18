import test from 'ava'

import * as nunjucksFilters from '../../compile/nunjucks/filters.js'

// helper functions

function getDateData (date) {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    dayOfWeek: date.getUTCDay(),
    hours: date.getUTCHours(),
    minutes: date.getUTCMinutes(),
    seconds: date.getUTCSeconds()
  }
}

function addLeadingZero (input) {
  input = String(input)
  while (input.length < 2) {
    input = '0' + input
  }
  return input
}

// prepare dates to test

const datesToTest = [
  new Date(),
  new Date(Date.UTC(2000, 0, 1, 0, 0, 0)),
  new Date(Date.UTC(2000, 11, 31, 23, 59, 59)),
  new Date(0)
]

for (let day = 1; day <= 31; day++) {
  // 1-31 days
  datesToTest.push(new Date(2016, 0, day, 0, 0, 0))
}

for (let month = 0; month <= 11; month++) {
  // 0-11 months (months start from 0)
  datesToTest.push(new Date(2016, month, 1, 0, 0, 0))
}

// tests

test('datetimeAttribute', t => {
  const fn = nunjucksFilters.datetimeAttribute

  const dateToDateTimeAttribute = givenDate => {
    const d = getDateData(givenDate)
    return `${d.year}-${addLeadingZero(d.month)}-${addLeadingZero(d.day)}T${addLeadingZero(d.hours)}:${addLeadingZero(d.minutes)}:${addLeadingZero(d.seconds)}`
  }

  for (const date of datesToTest) {
    t.deepEqual(fn(date), dateToDateTimeAttribute(date))
  }
})

test('gmt', t => {
  const fn = nunjucksFilters.gmt

  const dateToGmt = givenDate => {
    const d = getDateData(givenDate)
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'
    ]

    return `${dayNames[d.dayOfWeek]}, ${addLeadingZero(d.day)} ${monthNames[d.month - 1]} ${d.year} ${addLeadingZero(d.hours)}:${addLeadingZero(d.minutes)}:${addLeadingZero(d.seconds)} GMT`
  }

  for (const date of datesToTest) {
    t.deepEqual(fn(date), dateToGmt(date))
  }
})
