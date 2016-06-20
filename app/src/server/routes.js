'use strict'

const path = require('path')

const articles = require('./articles.js')
const database = require('./database.js')
const paths = require('./paths.js')

const addCommonData = data => {
  const commonData = {
    currentYear: new Date().getFullYear(),
    siteUrl: 'https://hurtak.cc',
    siteDomain: 'hurtak.cc',
    siteProtocol: 'https://'
  }

  return Object.assign({}, commonData, data)
}

function index (req, res) {
  database.getAtricles().then(databaseArticles => {
    const data = addCommonData({
      articles: databaseArticles
    })

    res.render('pages/index.njk', data)
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

      res.render('pages/article.njk', data)
    } else {
      // TODO: function for displaying 404
      res.render('pages/404.njk')
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

  res.render('pages/index.njk', data)
}

function debugArticle (req, res) {
  let articleName = req.params.article

  let articlePath = articles.findPathToArticle(paths.articles, articleName, 2)
  if (!articlePath) {
    res.render('pages/404.njk')
    return
  }

  const fsArticle = articles.parseArticle(path.join(articlePath, 'article.md'))
  const data = addCommonData({
    title: fsArticle.metadata.title,
    date: fsArticle.metadata.publication_date,
    article: fsArticle.html
  })

  res.render('pages/article.njk', data)
}

const rss = (req, res) => {
  database.getRSS().then(databaseArticles => {
    const data = {articles: databaseArticles}
    for (let i = 0; i < data.articles.length; i++) {
      data.articles[i].pubData = new Date(data.articles.publication_date).toGMTString()
    }

    res.type('text/xml')
    res.render('special/rss.njk', addCommonData(data))
  }).catch(e => console.log(e))
}

const robotsTxt = (req, res) => {
  res.type('text/plain')
  res.render('special/robots.txt.njk')
}

const humansTxt = (req, res) => {
  database.getHumansTxt().then(data => {
    const templateData = addCommonData({
      lastUpdate: new Date(data.last_update).toGMTString()
    })

    res.type('text/plain')
    res.render('special/humans.txt.njk', templateData)
  }).catch(e => console.log(e))
}

module.exports = {
  index,
  article,
  debug,
  debugArticle,
  rss,
  robotsTxt,
  humansTxt
}
