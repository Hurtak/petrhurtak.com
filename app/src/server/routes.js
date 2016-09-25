'use strict'

const fs = require('fs-promise')
const path = require('path')

const lodash = require('lodash')

const config = require('../config/config.js')
const articles = require('./articles.js')
const database = require('./database.js')
const paths = require('./paths.js')

// Main routes

function index (req, res) {
  if (config.production) {
    database.getArticles().then(databaseArticles => {
      const data = {
        articles: databaseArticles
      }

      res.render('pages/index.njk', data)
    })
  } else {
    const articleDirs = articles.getArticlesDirectories(paths.articles, 2)

    let articlesData = []
    for (const articleDir of articleDirs) {
      articlesData.push(articles.getArticleData(articleDir))
    }

    // sort articles by publication_date descendant
    articlesData = articlesData.map(x => x.article)
    articlesData = lodash.sortBy(articlesData, 'lastUpdate')
    articlesData = lodash.reverse(articlesData)

    const data = {
      articles: articlesData
    }

    res.render('pages/index.njk', data)
  }
}

function article (req, res) {
  if (config.production) {
    database.getArticle(req.params.article).then(article => {
      if (!article) {
        notFound(req, res)
        return
      }

      database.getArticleSnippets(article.id).then(snippets => {
        const data = {
          article: article,
          snippets: snippets
        }

        res.render('pages/article.njk', data)
      })
    })
  } else {
    let articleName = req.params.article

    let articlePath = articles.findPathToArticle(paths.articles, articleName, 2)
    if (!articlePath) {
      notFound(req, res)
      return
    }

    const articleData = articles.getArticleData(articlePath)
    const data = {
      article: articleData.article,
      snippets: articleData.snippets
    }

    res.render('pages/article.njk', data)
  }
}

// Special pages

function rss (req, res) {
  database.getRSS().then(databaseArticles => {
    const data = {articles: databaseArticles}
    for (let i = 0; i < data.articles.length; i++) {
      data.articles[i].pubData = new Date(data.articles.publication_date).toGMTString()
    }

    res.type('text/xml')
    res.render('pages/rss.njk', data)
  })
}

function robotsTxt (req, res) {
  res.type('text/plain')
  res.render('pages/robots.txt.njk')
}

function humansTxt (req, res) {
  database.getHumansTxt().then(data => {
    const templateData = {
      lastUpdate: data.lastUpdate
    }

    res.type('text/plain')
    res.render('pages/humans.txt.njk', templateData)
  })
}

// Error pages

function notFound (req, res) {
  const data = {}
  res.render('pages/404.njk', data)
}

// API

function addCommonApiData (req, clientData) {
  const data = {
    client: clientData,
    server: {
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer,
      origin: req.headers.origin,
      host: req.headers.host,
      remoteAddress: req.socket.remoteAddress,
      ip: req.ip,
      date: new Date().toUTCString()
    }
  }

  return data
}

function logJson (folder, data) {
  const fileName = new Date().toISOString().slice(0, 10) + '.log'

  fs.appendFile(
    path.join(folder, fileName),
    JSON.stringify(data, null, 2) + '\n\n'
  )
}

function apiLogAppMessage (req, res) {
  const data = addCommonApiData(req, req.body)
  logJson(paths.logAppMessage, data)

  res.status(204)
  res.send()
}

function apiLogException (req, res) {
  const data = addCommonApiData(req, req.body)
  logJson(paths.logExceptions, data)

  res.status(204)
  res.send()
}

// Export

module.exports = {
  index,
  article,

  rss,
  robotsTxt,
  humansTxt,

  apiLogAppMessage,
  apiLogException
}
