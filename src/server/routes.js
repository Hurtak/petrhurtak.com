'use strict'

const lodash = require('lodash')

const articles = require('./articles.js')
const paths = require('./paths.js')

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
  res.render('humans.txt.njk', data)
}

// Export

module.exports = {
  humansTxt
}
