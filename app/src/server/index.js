'use strict'

if (process.env.NODE_ENV === 'development') {
  require('./debug.js')()
}

const path = require('path')
const express = require('express')
const swig = require('swig')
const config = require('../config/config.js')
const paths = require('./paths.js')
const routes = require('./routes.js')

const app = express()

// express config

app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', paths.templates)

// static files

app.use('/static', express.static(paths.static))
app.use('/static/articles', express.static(paths.articles))
if (process.env.NODE_ENV === 'development') {
  app.use('/static/node_modules', express.static(paths.nodeModules))
}

app.get('/articles/**/*.png', (req, res) => {
  res.sendFile(path.join(paths.root, req.originalUrl))
})

// dynamic pages

app.get('/', routes.index)
app.get('/debug', routes.debug)
app.get('/debug/:article', routes.debugArticle)
app.get('/:article', routes.article)

// start server

app.listen(config.port, () => console.log(`server started at port ${ config.port }`))
