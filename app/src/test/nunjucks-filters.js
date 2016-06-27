import test from 'ava'

import * as nunjucksFilters from '../server/nunjucks-filters.js'

test('dateHowLongBefore', t => {
  const fn = nunjucksFilters.dateHowLongBefore

  t.deepEqual(fn(new Date()), 'just now')
})

const datesToTest = [
  new Date(),
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 12, 31, 23, 59, 59),
  new Date(0)
]

// days
for (let day = 1; day <= 31; day++) {
  datesToTest.push(new Date(2016, 0, day, 0, 0, 0))
}

// months
for (let month = 0; month <= 11; month++) {
  datesToTest.push(new Date(2016, month, 1, 0, 0, 0))
}

test('datetimeAttribute', t => {
  const fn = nunjucksFilters.datetimeAttribute

  const dateToDateTimeAttribute = givenDate => {
    const d = removeTimeZoneOffset(givenDate)
    return `${d.year}-${d.month}-${d.day}T${d.hours}:${d.minutes}:${d.seconds}`
  }

  for (const date of datesToTest) {
    t.deepEqual(fn(date), dateToDateTimeAttribute(date))
  }
})

test('gmt', t => {
  const fn = nunjucksFilters.gmt

  const dateToGmt = givenDate => {
    const d = removeTimeZoneOffset(givenDate)
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'
    ]

    return `${dayNames[d.dayOfWeek]}, ${d.day} ${monthNames[d.month - 1]} ${d.year} ${d.hours}:${d.minutes}:${d.seconds} GMT`
  }

  for (const date of datesToTest) {
    t.deepEqual(fn(date), dateToGmt(date))
  }
})

function removeTimeZoneOffset (givenDate) {
  const timezoneOffset = givenDate.getTimezoneOffset()
  const date = new Date(givenDate.getTime() + timezoneOffset * 1000 * 60)

  function addLeadingZero (input) {
    input = String(input)
    while (input.length < 2) {
      input = '0' + input
    }
    return input
  }

  return {
    year: date.getFullYear(),
    month: addLeadingZero(date.getMonth() + 1),
    day: addLeadingZero(date.getDate()),
    dayOfWeek: date.getDay(),
    hours: addLeadingZero(date.getHours()),
    minutes: addLeadingZero(date.getMinutes()),
    seconds: addLeadingZero(date.getSeconds())
  }
}

