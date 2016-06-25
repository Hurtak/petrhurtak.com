'use strict'

if (process.env.NODE_ENV === 'development') {
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
