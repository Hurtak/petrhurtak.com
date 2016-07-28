'use strict'

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

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection of Promise')
    console.error(reason)
  })
}
