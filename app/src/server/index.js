'use strict'

require('./debug.js')()

const express = require('express')
const expressStatusMonitor = require('express-status-monitor')
const helmet = require('helmet') // TODO: article about all header this provides
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const compression = require('compression')
const nunjucks = require('nunjucks')

const config = require('../config/config.js')
const nunjucksFilters = require('./utils/nunjucks-filters.js')
const paths = require('./paths.js')
const routes = require('./routes.js')
const api = require('./api.js')

// app

const app = express()

// middlewares

app.use(expressStatusMonitor())
app.use(helmet())
app.use(bodyParser.json())
app.use(responseTime())
app.use(compression())

// template config

app.set('views', paths.templates)

const nunjucksEnv = nunjucks.configure(app.get('views'), {
  autoescape: true,
  express: app
})

for (const filterName in nunjucksFilters) { // add custom filters
  nunjucksEnv.addFilter(filterName, nunjucksFilters[filterName])
}

// static files

app.use('/static', express.static(paths.static))
app.use('/static/articles', express.static(paths.articles)) // TODO: make only avaliable in debug
app.use('/static/node_modules', express.static(paths.nodeModules)) // TODO: make only avaliable in debug

// pages

app.get('/', routes.index)

app.get('/rss', routes.rss)
app.get('/robots.txt', routes.robotsTxt)
app.get('/humans.txt', routes.humansTxt)

app.post('/api/log/app-message', api.logAppMessage)
app.post('/api/log/exception', api.logException)

app.get('/debug', routes.debug)
app.get('/debug/:article', routes.debugArticle)
app.get('/:article', routes.article)

// start server

app.listen(config.port, () => console.log('server started at port ' + config.port))
