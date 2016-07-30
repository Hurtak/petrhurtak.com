window.App.Log = (function () {
  'use strict'

  const config = {
    apiErrorUrl: '/api/log/exception'
  }

  function init () {
    logExceptions()

    // setTimeout(() => throwError, 1000)
  }

  function error (message) {
    console.error(message)
  }

  function logExceptions () {
    window.addEventListener('error', (e) => {
      const data = {
        columnNumber: e.colno,
        lineNumber: e.lineno,
        fileName: e.filename,
        message: e.message,
        error: {
          message: e.error.message, // Chrome FF IE Edge
          stack: e.error.stack, // Chrome FF IE Edge
          columnNumber: e.error.columnNumber, // FF
          lineNumber: e.error.lineNumber, // FF
          fileName: e.error.fileName, // FF
          description: e.error.description, // IE Edge
          number: e.error.number, // IE Edge - TODO: what is this?
          name: e.error.name // IE Edge
        },
        timestamp: e.timeStamp,
        // extra fields
        date: Date.now()
      }

      window.fetch(config.apiErrorUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new window.Headers({ 'Content-Type': 'application/json' }) // TODO: double check
      })
    })
  }

  return {
    init,
    error
  }
}())
