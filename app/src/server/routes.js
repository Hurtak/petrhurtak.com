'use strict'

const path = require('path')
const fs = require('fs')

const lodash = require('lodash')

const articles = require('./articles.js')
const database = require('./database.js')
const paths = require('./paths.js')

const addCommonData = data => {
  const commonData = {
    currentYear: new Date().getFullYear(),
    siteUrl: 'https://hurtak.cc',
    siteDomain: 'hurtak.cc',
    siteProtocol: 'https://',
    debug: false
  }

  return Object.assign({}, commonData, data)
}

const notFound = (req, res) => {
  const data = addCommonData({})
  res.render('pages/404.njk', data)
}

const index = (req, res) => {
  database.getAtricles().then(databaseArticles => {
    const data = addCommonData({
      articles: databaseArticles
    })

    res.render('pages/index.njk', data)
  })
}

const article = (req, res) => {
  database.getAtricle(req.params.article).then(article => {
    if (article) {
      const data = addCommonData({
        title: article.title,
        date: article.publication_date,
        article: article.html
      })

      res.render('pages/article.njk', data)
    } else {
      notFound(req, res)
    }
  })
}

const debug = (req, res) => {
  // get all metadata from article.md files
  let metadata = articles.getArticlesMetadata(paths.articles, 'article.md')

  // sort articles by publication_date descendant
  metadata = lodash.sortBy(metadata, 'last_update')
  metadata = lodash.reverse(metadata)

  const data = addCommonData({
    articles: metadata,
    debugUrlPrefix: 'debug/',
    debug: true
  })

  res.render('pages/index.njk', data)
}

const debugArticle = (req, res) => {
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
    article: fsArticle.html,
    debug: true
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
  })
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
  })
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
