'use strict'

const lodash = require('lodash')

const articles = require('./articles.js')
const paths = require('./paths.js')

// Main routes

function article (req, res) {
  const articleName = req.params.article

  const articlePath = articles.getPathByArticleName(paths.articles, articleName)
  if (!articlePath) {
    notFound(req, res)
    return
  }

  const data = articles.getArticleData(articlePath)
  res.render('pages/article.njk', data)
}

// Special pages

function rss (req, res) {
  const articleDirectories = articles.getArticlesDirectories(paths.articles)

  let relevantArticles = articleDirectories
  relevantArticles = lodash.sortBy(relevantArticles)

  const articlesData = []
  for (const articlePath of relevantArticles) {
    // TODO: once async/await lands, make this concurrent
    articlesData.push(articles.getArticleData(articlePath))
  }

  const data = {
    articles: articlesData
  }
  // TODO: pubData - what happens if we update article and it gets moved to the top? is there something like last update?

  res.type('text/xml')
  res.render('pages/rss.njk', data)
}

function humansTxt (req, res) {
  const articleDirectories = articles.getArticlesDirectories(paths.articles)

  let relevantArticle = articleDirectories
  relevantArticle = lodash.sortBy(relevantArticle)
  relevantArticle = relevantArticle[0]
  relevantArticle = articles.getArticleData(relevantArticle)

  const data = {
    lastUpdate: relevantArticle.metadata.dateLastUpdate
  }

  res.type('text/plain')
  res.render('pages/humans.txt.njk', data)
}


// Export

module.exports = {
  article,
  rss,
  humansTxt
}
