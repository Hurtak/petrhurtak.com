'use strict'

const path = require('path')

const articles = require('./articles.js')
const database = require('./database.js')
const paths = require('./paths.js')

function index (req, res) {
  database.getAtricles().then(databaseArticles => {
    res.render(
      path.join(paths.templates, 'index.html'),
      {articles: databaseArticles}
    )
  }).catch(e => console.log(e))
}

function article (req, res) {
  database.getAtricle(req.params.article).then(article => {
    if (article) {
      res.render(path.join(paths.templates, 'article.html'), {
        title: article.title,
        date: article.publication_date,
        article: article.content
      })
    } else {
      // TODO: function for displaying 404
      res.render(path.join(paths.templates, '404.html'))
    }
  }).catch(e => console.log(e))
}

function debug(req, res) {
  // get all metadata from article.md files
  let metadata = articles.getArticlesMetadata(paths.articles, 'article.md')

  // sort articles by publication_date descendant
  articles.sortObjectBy(metadata, 'publication_date')

  res.render(path.join(paths.templates, 'index.html'), {
    articles: metadata,
    debugUrlPrefix: 'debug/'
  })
}

function debugArticle (req, res) {
  let articleName = req.params.article

  let articlePath = articles.findPathToArticle(paths.articles, articleName, 2)
  if (!articlePath) {
    res.render(path.join(paths.templates, '404.html'))
  } else {
    const fsArticle = articles.parseArticle(path.join(articlePath, 'article.md'))

    res.render(path.join(paths.templates, 'article.html'), {
      title: fsArticle.metadata.title,
      date: fsArticle.metadata.publication_date,
      article: fsArticle.html
    })
  }
}

module.exports = {
  index,
  article,
  debug,
  debugArticle
}
