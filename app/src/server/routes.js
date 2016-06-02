'use strict'

const path = require('path')

const articles = require('./articles.js')
const database = require('./database.js')
const paths = require('./paths.js')

const addCommonData = data => {
  const commonData = {
    currentYear: new Date().getFullYear()
  }

  return Object.assign(commonData, data)
}

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
      const data = addCommonData({
        title: article.title,
        date: article.publication_date,
        article: article.content
      })

      res.render(path.join(paths.templates, 'article.html'), data)
    } else {
      // TODO: function for displaying 404
      res.render(path.join(paths.templates, '404.html'))
    }
  }).catch(e => console.log(e))
}

function debug (req, res) {
  // get all metadata from article.md files
  let metadata = articles.getArticlesMetadata(paths.articles, 'article.md')

  // sort articles by publication_date descendant
  articles.sortObjectBy(metadata, 'publication_date')

  const data = addCommonData({
    articles: metadata,
    debugUrlPrefix: 'debug/'
  })

  res.render(path.join(paths.templates, 'index.html'), data)
}

function debugArticle (req, res) {
  let articleName = req.params.article

  let articlePath = articles.findPathToArticle(paths.articles, articleName, 2)
  if (!articlePath) {
    res.render(path.join(paths.templates, '404.html'))
  } else {
    const fsArticle = articles.parseArticle(path.join(articlePath, 'article.md'))
    const data = addCommonData({
      title: fsArticle.metadata.title,
      date: fsArticle.metadata.publication_date,
      article: fsArticle.html
    })

    res.render(path.join(paths.templates, 'article.html'), data)
  }
}

const rss = (req, res) => {
  database.getRSS().then(databaseArticles => {
    const data = {articles: databaseArticles}
    for (let i = 0; i < data.articles.length; i++) {
      data.articles[i].pubData = new Date(data.articles.publication_date).toGMTString()
    }

    res.type('text/xml')
    res.render('other/rss.xml', data)
  }).catch(e => console.log(e))
}

module.exports = {
  index,
  article,
  debug,
  debugArticle,
  rss
}
