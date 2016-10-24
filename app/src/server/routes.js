'use strict'

const fs = require('fs-promise')
const path = require('path')

const config = require('../config/config.js')
const articles = require('./articles.js')
const database = require('./database.js')
const paths = require('./paths.js')

// Main routes

function index (req, res) {
  database.getArticles().then(databaseArticles => {
    const data = {
      articles: databaseArticles
    }

    res.render('pages/index.njk', data)
  })
}

function article (req, res) {
  const articleName = req.params.article

  if (config.production) {
    // TODO: merge these 2 queries into one?
    database.getArticle(articleName).then(article => {
      if (!article) {
        notFound(req, res)
        return
      }

      database.getArticleSnippets(article.id).then(snippets => {
        // TODO: consider moving this logic into database.js
        // basically this is data transformation to fit our own article object
        // type which is returned by articles.getArticleData and we need
        // to do this transformation because of how data are stored in database
        const data = {
          metadata: {
            title: article.title,
            datePublication: article.datePublication
          },
          articleHtml: article.html,
          snippets: snippets.map(snippet => ({
            name: snippet.name,
            head: snippet.head,
            html: snippet.html,
            css: snippet.css,
            js: snippet.js,
            config: {
              inlineSnippet: Boolean(snippet.inline)
            }
          }))
        }

        res.render('pages/article.njk', data)
      })
    })
  } else {
    const articlePath = articles.debugGetPathByArticleName(paths.articles, articleName)
    if (!articlePath) {
      notFound(req, res)
      return
    }

    const data = articles.getArticleData(articlePath)
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
