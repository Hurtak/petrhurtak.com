'use strict'

const perfStart = Date.now()

require('./debug.js')()

const express = require('express')
// const expressStatusMonitor = require('express-status-monitor') // TODO: wait for it to be more stable
const helmet = require('helmet') // TODO: article about all header this provides
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const compression = require('compression')

const config = require('../config/config.js')
const paths = require('./paths.js')
const routes = require('./routes.js')
const nunjucksEnv = require('./nunjucks/env.js')
const api = require('./api.js')

// app

const app = express()

// middlewares

// app.use(expressStatusMonitor()) // TODO: wait for it to be more stable
app.use(helmet())
app.use(bodyParser.json())
app.use(responseTime())
app.use(compression())

// template config

nunjucksEnv.express(app)

// routes

// static files
app.use('/static', express.static(paths.static))
app.use('/static/articles', express.static(paths.articles)) // TODO: make only avaliable in debug
app.use('/static/node_modules', express.static(paths.nodeModules)) // TODO: make only avaliable in debug

// pages
app.get('/', routes.index)

// special
app.get('/rss', routes.rss)
app.get('/robots.txt', routes.robotsTxt)
app.get('/humans.txt', routes.humansTxt)

// api
app.post('/api/log/app-message', api.logAppMessage)
app.post('/api/log/exception', api.logException)

// articles
app.get('/:article', routes.article)

// start server

app.listen(config.port, () => {
  const env = config.devel ? 'DEVELOPMENT' : 'PRODUCTION'
  const perfEnd = Date.now()
  const startupTime = perfEnd - perfStart

  console.log(`server started | port ${config.port} | ${env} mode | startup time ${startupTime}ms`)
})
