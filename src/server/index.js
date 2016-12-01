'use strict'

const path = require('path')
const fs = require('fs-promise')
const lodash = require('lodash')
// const htmlMinifier = require('html-minifier')

const debug = require('./debug.js')
const paths = require('./paths.js')
const config = require('./config.js')
const articles = require('./articles.js')
const nunjucks = require('./nunjucks/env.js')

debug()

// 1) prepare dirs

fs.removeSync(paths.dist)
fs.mkdirSync(paths.dist)
fs.mkdirSync(paths.distDrafts)
fs.mkdirSync(paths.distStatic)

// 2) Static pages

// 2.1) 404
const html404 = nunjucks.render('404.njk')
fs.writeFileSync(path.join(paths.dist, '404.html'), html404)

// 2.2) robots.txt
const htmlRobotsTxt = nunjucks.render('robots.txt.njk')
fs.writeFileSync(path.join(paths.dist, 'robots.txt'), htmlRobotsTxt)

// 3) static files

// 3.1) styles
fs.symlinkSync(paths.styles, paths.distStyles)

// 3.2) scripts
fs.symlinkSync(paths.scripts, paths.distScripts)

// 3.3) images
fs.symlinkSync(paths.images, paths.distImages)

// 3.4) node_modules dir linked to /static/node_modules in development
fs.symlinkSync(paths.nodeModules, paths.distNodeModules)

// 4) gather articles data

let articlesData = articles.getArticles(paths.articles, paths.articlesDrafts)
articlesData = lodash.sortBy(articlesData, 'metadata.dateLastUpdate')
articlesData = articlesData.reverse()

let articlesPublishedData = lodash.filter(articlesData, article => article.metadata.published === true)
articlesPublishedData = lodash.filter(articlesPublishedData, article => article.metadata.dateLastUpdate <= new Date())

// 5) index page
const indexArticles = lodash.slice(articlesPublishedData, 0, config.articles.perPage)
const htmlIndex = nunjucks.render('index.njk', {articles: indexArticles})
fs.writeFileSync(path.join(paths.dist, 'index.html'), htmlIndex)

// 6) articles
for (const article of articlesData) {
  // TODO: once async/await lands, make this concurrent

  // 6.1) article directory
  const folder = path.join(
    article.metadata.published ? paths.dist : paths.distDrafts,
    article.metadata.url
  )
  fs.mkdirSync(folder)

  // 6.2) article html
  const htmlArticle = nunjucks.render('article.njk', article)
  fs.writeFileSync(path.join(folder, 'index.html'), htmlArticle)

  // 6.3) article images
  fs.symlinkSync(
    path.join(article.fs.path, paths.articleImages),
    path.join(folder, paths.articleImages)
  )

  // 6.4) article snippets
  fs.symlinkSync(
    path.join(article.fs.path, paths.articleSnippets),
    path.join(folder, paths.articleSnippets)
  )
}

// 7) RSS
// TODO: pubData - what happens if we update article and it gets moved to the top? is there something like last update?
const rssArticles = lodash.slice(articlesData, 0, config.articles.perRssFeed)
const rssFeed = nunjucks.render('rss.njk', {articles: rssArticles})
fs.writeFileSync(path.join(paths.dist, 'rss.xml'), rssFeed)

// 8) humans.txt
const lastUpdate = articlesPublishedData[0].metadata.dateLastUpdate
const humansTxt = nunjucks.render('humans.txt.njk', {lastUpdate: lastUpdate})
fs.writeFileSync(path.join(paths.dist, 'humans.txt'), humansTxt)

// articleHtml = htmlMinifier.minify(articleHtml, {
//   collapseWhitespace: true,
//   conservativeCollapse: true,
//   minifyCSS: true,
//   minifyJS: true,
//   removeComments: true,
//   removeRedundantAttributes: true,
//   sortAttributes: true,
//   sortClassName: true
// })
