'use strict'

const hardRejection = require('hard-rejection')
const config = require('../config/config.js')

module.exports = function () {
  if (config.devel) {
    const PrettyError = require('pretty-error')

    const error = new PrettyError()
    error.skipNodeFiles()
    error.skipPackage(
      'express',
      'mysql',
      'nunjucks'
    )
    error.start()
  }

  hardRejection()
}
