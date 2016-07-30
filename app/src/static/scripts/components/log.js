window.App.Log = (function () {
  'use strict'

  const config = {
    apiLogExceptionUrl: '/api/log/exception',
    apiLogAppMessageUrl: '/api/log/app-message'
  }

  function init () {
    window.addEventListener('error', logException)

    // setTimeout(() => throwError, 1000) // debug
  }

  function error (message, additionalData) {
    console.error(message)

    const data = {
      message: message,
      additionalData: additionalData,
      logType: 'error'
    }

    window.fetch(config.apiLogAppMessageUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new window.Headers({ 'Content-Type': 'application/json' }) // TODO: double check
    })
  }

  function logException (e) {
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
      date: new Date().toUTCString()
    }

    window.fetch(config.apiLogExceptionUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new window.Headers({ 'Content-Type': 'application/json' }) // TODO: double check
    })
  }

  return {
    init,
    error
  }
}())
