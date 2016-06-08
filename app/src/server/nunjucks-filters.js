'use strict'

const spelling = require('./spelling.js')

const datetimeAttribute = (date) => {
  return date.toISOString().substr(0, 19)
}

const dateHowLongBefore = (date) => {
  const nowTimestamp = Date.now()
  const dateTimestamp = date.getTime()

  const differenceSeconds = Math.round((nowTimestamp - dateTimestamp) / 1000)
  const differenceMinutes = differenceSeconds / 60
  const differenceHours = differenceSeconds / (60 * 60)
  const differenceDays = differenceSeconds / (60 * 60 * 24)
  const differenceMonths = differenceSeconds / (60 * 60 * 24 * 30)
  const differenceYears = differenceSeconds / (60 * 60 * 24 * 30 * 12)

  if (differenceMinutes <= 10) {
    return 'right now'
  } else if (differenceMinutes <= 60) {
    return `before ${ differenceMinutes } minutes`
  } else if (differenceHours <= 6) {
    return `${ differenceHours } hours ago`
  } else if (differenceHours <= 24) {
    return `today`
  } else if (differenceDays <= 30) {
    return `${ differenceDays } days ago`
  } else if (differenceMonths <= 12) {
    return `${ differenceMonths } months ago`
  } else {
    return `${ Math.round(differenceYears) } ${ spelling.spellYear(Math.round(differenceYears)) } ago`
  }
}

module.exports = {
  datetimeAttribute,
  dateHowLongBefore
}
