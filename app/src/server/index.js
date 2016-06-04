'use strict'

if (process.env.NODE_ENV === 'development') {
  require('./debug.js')()
}

const path = require('path')
const express = require('express')
const nunjucks = require('nunjucks')
const config = require('../config/config.js')
const paths = require('./paths.js')
const routes = require('./routes.js')

const app = express()

// express config

app.set('views', paths.templates)

nunjucks.configure(app.get('views'), {
  autoescape: true,
  express: app
})

//  Example filter setup - remote link assets
// env.addFilter('asset', function(assetpath) {
//     var asset_url = "/path/to/assets"      // can be a path, or an absolute web URL
//     return asset_url + assetpath
// });

// static files

app.use('/static', express.static(paths.static))
app.use('/static/articles', express.static(paths.articles))
if (process.env.NODE_ENV === 'development') {
  app.use('/static/node_modules', express.static(paths.nodeModules))
}

app.get('/articles/**/*.png', (req, res) => {
  res.sendFile(path.join(paths.root, req.originalUrl))
})

// pages

app.get('/', routes.index)
app.get('/rss', routes.rss)
app.get('/debug', routes.debug)
app.get('/debug/:article', routes.debugArticle)
app.get('/:article', routes.article)

// start server

app.listen(config.port, () => console.log(`server started at port ${ config.port }`))
