'use strict'

const fs = require('fs-promise')
const path = require('path')
const lodash = require('lodash')

const config = require('./config.js')
const articles = require('./articles.js')
const paths = require('./paths.js')

// Main routes

function index (req, res) {
  console.time(1)
  const articleDirectories = articles.getArticlesDirectories(paths.articles)
  console.timeEnd(1)

  let relevantArticles = articleDirectories
  relevantArticles = lodash.sortBy(relevantArticles)
  relevantArticles = lodash.slice(relevantArticles, 0, config.articles.articlesPerPage)

  // database.getArticles().then(databaseArticles => {
  //   const data = {
  //     articles: databaseArticles
  //   }

  //   res.render('pages/index.njk', data)
  // })
}

function article (req, res) {
  const articleName = req.params.article

  const articlePath = articles.debugGetPathByArticleName(paths.articles, articleName)
  if (!articlePath) {
    notFound(req, res)
    return
  }

  const data = articles.getArticleData(articlePath)
  res.render('pages/article.njk', data)
}

function articleStaticFiles (req, res) {
  const articlePath = articles.debugGetPathByArticleName(paths.articles, req.params.article)
  const imagePath = path.join(articlePath, '/', req.params.folder, req.params.fileName)
  res.sendFile(imagePath)
}

// Special pages

// function rss (req, res) {
//   database.getRSS().then(databaseArticles => {
//     const data = {articles: databaseArticles}
//     for (let i = 0; i < data.articles.length; i++) {
//       data.articles[i].pubData = new Date(data.articles.publication_date).toGMTString()
//     }

//     res.type('text/xml')
//     res.render('pages/rss.njk', data)
//   })
// }

function robotsTxt (req, res) {
  res.type('text/plain')
  res.render('pages/robots.txt.njk')
}

// function humansTxt (req, res) {
//   database.getHumansTxt().then(data => {
//     const templateData = {
//       lastUpdate: data.lastUpdate
//     }

//     res.type('text/plain')
//     res.render('pages/humans.txt.njk', templateData)
//   })
// }

// Error pages

function notFound (req, res) {
  const data = {}
  res.render('pages/404.njk', data)
}

function error (err, req, res) {
  if (!err) return

  // TODO: add generic error handler
  if (err.status === 404) {
    notFound(req, res)
  } else {
    res.status(err.status).end()
  }
}

// Export

module.exports = {
  index,
  article,
  articleStaticFiles,

  // rss,
  robotsTxt,
  // humansTxt,

  notFound
}
