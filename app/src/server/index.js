'use strict'

if (process.env.NODE_ENV === 'development') {
  require('./debug.js')()
}

const path = require('path')
const fs = require('fs')

const express = require('express')
const expressMorgan = require('morgan')
const expressResponseTime = require('response-time')
const expressCompression = require('compression')
const nunjucks = require('nunjucks')

const config = require('../config/config.js')
const paths = require('./paths.js')
const routes = require('./routes.js')
const nunjucksFilters = require('./nunjucks-filters.js')

const app = express()

// middlewares

const logWriteStream = fs.createWriteStream(
  path.join(paths.log, new Date().toISOString().slice(0, 10)),
  { flags: 'a' }
)

app.use(expressMorgan('short', { stream: logWriteStream }))
app.use(expressResponseTime())
app.use(expressCompression())

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
app.use('/static/articles', express.static(paths.articles))
app.use('/static/node_modules', express.static(paths.nodeModules))

app.get('/articles/**/*.png', (req, res) => {
  res.sendFile(path.join(paths.root, req.originalUrl))
})

// pages

app.get('/', routes.index)
app.get('/rss', routes.rss)
app.get('/robots.txt', routes.robotsTxt)
app.get('/humans.txt', routes.humansTxt)
app.get('/debug', routes.debug)
app.get('/debug/:article', routes.debugArticle)
app.get('/:article', routes.article)

// start server

app.listen(config.port)
