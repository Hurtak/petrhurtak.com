'use strict'

const express = require('express')
const PrettyError = require('pretty-error')
const hardRejection = require('hard-rejection')

const config = require('../config/config.js')
const paths = require('./paths.js')
const routes = require('./routes.js')
const nunjucksEnv = require('./nunjucks/env.js')

// debug

const error = new PrettyError()
error.skipNodeFiles()
error.skipPackage(
  'express',
  'mysql',
  'nunjucks'
)
error.start()

hardRejection()

// app

const app = express()
app.enable('strict routing') // treats '/foo' and '/foo/' as different routes

// template config

nunjucksEnv.express(app)

// routes

// static files
app.use('/static', express.static(paths.static))
app.use('/static/node_modules', express.static(paths.nodeModules))

// pages
// app.get('/', routes.index)

// special
// app.get('/rss', routes.rss)
app.get('/robots.txt', routes.robotsTxt)
// app.get('/humans.txt', routes.humansTxt)

// articles
app.get('/:article', (req, res) => res.redirect(301, req.path + '/'))
app.get('/:article/', routes.article)
app.get('/:article/:folder/:fileName', routes.articleStaticFiles)

// 404 on the rest
app.get('*', routes.notFound)

// start server

app.listen(config.port, () => {
  console.log(`server started on port ${config.port}`)
})
