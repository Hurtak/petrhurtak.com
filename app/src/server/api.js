'use strict'

const fs = require('fs')
const path = require('path')

const paths = require('./paths.js')

function addCommonData (req, clientData) {
  const data = {
    client: clientData,
    server: {
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer,
      origin: req.headers.origin,
      host: req.headers.host,
      date: new Date().toUTCString()
    }
  }

  return data
}

function logException (req, res) {
  const data = addCommonData(req, {
    todo: ''
  })

  const fileName = new Date().toISOString().slice(0, 10) + '.log'
  fs.appendFile(
    path.join(paths.logExceptions, fileName),
    JSON.stringify(data, null, 2) + '\n\n'
  )

  res.status(204).send() // TODO check if this is a correct way to do it
}

module.exports = {
  logException
}
