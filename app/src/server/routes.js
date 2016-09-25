'use strict'

const fs = require('fs-promise')
const path = require('path')

const lodash = require('lodash')

const config = require('../config/config.js')
const articles = require('./articles.js')
const database = require('./database.js')
const paths = require('./paths.js')

function notFound (req, res) {
  const data = {}
  res.render('pages/404.njk', data)
}

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

function rss (req, res) {
  database.getRSS().then(databaseArticles => {
    const data = {articles: databaseArticles}
    for (let i = 0; i < data.articles.length; i++) {
      data.articles[i].pubData = new Date(data.articles.publication_date).toGMTString()
    }

    res.type('text/xml')
    res.render('special/rss.njk', data)
  })
}

function robotsTxt (req, res) {
  res.type('text/plain')
  res.render('special/robots.txt.njk')
}

function humansTxt (req, res) {
  database.getHumansTxt().then(data => {
    const templateData = {
      lastUpdate: data.lastUpdate
    }

    res.type('text/plain')
    res.render('special/humans.txt.njk', templateData)
  })
}

function apiLogException (req, res) {
  const data = {
    client: '',
    server: {
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer,
      origin: req.headers.origin,
      host: req.headers.host
    }
  }

  const fileName = new Date().toISOString().slice(0, 10) + '.log'
  fs.appendFile(
    path.join(paths.logExceptions, fileName),
    JSON.stringify(data, null, 2) + '\n\n'
  )

  res.status(204).send() // TODO check if this is a correct way to do it
}

module.exports = {
  index,
  article,
  rss,
  robotsTxt,
  humansTxt,
  apiLogException
}
