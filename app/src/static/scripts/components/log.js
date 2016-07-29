window.App.Log = (function () {
  'use strict'

  const config = {
    url: '/api/log/error'
  }

  function init () {
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
      console.log(data)
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
