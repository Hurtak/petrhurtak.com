window.App.Log = (function () {
  'use strict'

  const config = {
    apiErrorUrl: '/api/log/error'
  }

  function init () {
    // setTimeout(() => doesNotExist, 1000)

    window.addEventListener('error', function (e) {
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
      .then(res => {
        console.log(res)
      })
    })
  }

  function warning () {
    return true
  }

  return {
    init: init,
    warning: warning
  }
}())
