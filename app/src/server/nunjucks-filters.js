'use strict'

const datetimeAttribute = (date) => {
  return date.toISOString().substr(0, 19)
}

module.exports = {
  datetimeAttribute
}
