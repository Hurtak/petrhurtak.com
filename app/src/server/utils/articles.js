'use strict'

const path = require('path')

function stripPathSeparators (string) {
  if (string[0] === path.sep) {
    string = string.substr(1)
  }
  if (string[string.length - 1] === path.sep) {
    string = string.slice(0, -1)
  }

  return string
}

module.exports = {
  stripPathSeparators
}
