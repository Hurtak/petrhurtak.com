'use strict'

const spell = (singular, plural, count) => {
  return count === 1 ? singular : plural
}

const spellDay = (count) => spell('day', 'days', count)
const spellYear = (count) => spell('year', 'years', count)

module.exports = {
  spellDay,
  spellYear
}
