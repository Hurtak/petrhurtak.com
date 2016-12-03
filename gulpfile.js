'use strict'

const gulp = require('gulp')
const path = require('path')
const fs = require('fs-promise')
const lodash = require('lodash')
const browserSync = require('browser-sync').create()
// const htmlMinifier = require('html-minifier')

const debug = require('./src/compile/debug.js')
const paths = require('./src/compile/paths.js')
const config = require('./src/compile/config.js')
const articles = require('./src/compile/articles.js')
const nunjucks = require('./src/compile/nunjucks/env.js')

debug()

// tasks

gulp.task('prepare-dirs', function (done) {
  fs.remove(paths.dist)
    .then(() => {
      return fs.mkdir(paths.dist)
    })
    .then(() => {
      return Promise.all([
        fs.mkdir(paths.distDrafts),
        fs.mkdir(paths.distStatic)
      ])
    })
    .then(() => done())
})

gulp.task('404', function (done) {
  const html404 = nunjucks.render('404.njk')

  fs.writeFile(path.join(paths.dist, '404.html'), html404)
    .then(done)
})

gulp.task('robots.txt', function (done) {
  const htmlRobotsTxt = nunjucks.render('robots.txt.njk')

  fs.writeFile(path.join(paths.dist, 'robots.txt'), htmlRobotsTxt)
    .then(done)
})

gulp.task('static', function (done) {
  Promise.all([
    fs.symlink(paths.styles, paths.distStyles),
    fs.symlink(paths.scripts, paths.distScripts),
    fs.symlink(paths.images, paths.distImages),
    fs.symlink(paths.nodeModules, paths.distNodeModules)
  ]).then(() => done())
})

gulp.task('articles', function (done) {
  // gather articles data

  let articlesData = articles.getArticles(paths.articles, paths.articlesDrafts)
  articlesData = lodash.sortBy(articlesData, 'metadata.dateLastUpdate')
  articlesData = articlesData.reverse()

  let articlesPublishedData = lodash.filter(articlesData, article => article.metadata.published === true)
  articlesPublishedData = lodash.filter(articlesPublishedData, article => article.metadata.dateLastUpdate <= new Date())

  // index page
  const indexArticles = lodash.slice(articlesPublishedData, 0, config.articles.perPage)
  const htmlIndex = nunjucks.render('index.njk', {articles: indexArticles})
  fs.writeFileSync(path.join(paths.dist, 'index.html'), htmlIndex)

  // articles
  const articlePromises = []
  for (const article of articlesData) {
    // article directory
    const folder = path.join(
      article.metadata.published ? paths.dist : paths.distDrafts,
      article.metadata.url
    )

    const promise = fs.mkdir(folder)
      .then(() => {
        // article html
        const htmlArticle = nunjucks.render('article.njk', article)

        const indexHtml = fs.writeFile(path.join(folder, 'index.html'), htmlArticle)
        const images = fs.symlink(
          path.join(article.fs.path, paths.articleImages),
          path.join(folder, paths.articleImages)
        )
        const snippets = fs.symlink(
          path.join(article.fs.path, paths.articleSnippets),
          path.join(folder, paths.articleSnippets)
        )

        return Promise.all([
          indexHtml,
          images,
          snippets
        ])
      })

    articlePromises.push(promise)
  }

  const rssPromise = Promise.resolve()
    .then(() => {
      const rssArticles = lodash.slice(articlesData, 0, config.articles.perRssFeed)

      const rssFeed = nunjucks.render('rss.njk', {articles: rssArticles})

      return fs.writeFile(path.join(paths.dist, 'rss.xml'), rssFeed)
    })

  const humansTxtPromise = Promise.resolve()
    .then(() => {
      const lastUpdate = articlesPublishedData[0].metadata.dateLastUpdate
      const humansTxt = nunjucks.render('humans.txt.njk', {lastUpdate: lastUpdate})

      return fs.writeFileSync(path.join(paths.dist, 'humans.txt'), humansTxt)
    })

  Promise.all([
    articlePromises,
    rssPromise,
    humansTxtPromise
  ]).then(() => done())
})

gulp.task('server:start', function (done) {
  browserSync.init({
    server: './dist',
    port: 8000,
    open: false,
    https: true,
    reloadOnRestart: true
  }, done)
})

gulp.task('server:reload', function (done) {
  browserSync.reload()
  done()
})

// main tasks

gulp.task('watch', function () {
  return gulp.watch(['./articles/**/*', './src/**/*'], gulp.series('prepare-dirs', 'compile', 'server:reload'))
})

gulp.task('compile', gulp.parallel(
  '404',
  'robots.txt',
  'static',
  'articles'
))

gulp.task('dev', gulp.series(
  'prepare-dirs',
  gulp.parallel(
    'compile',
    'watch',
    'server:start'
  )
))

gulp.task('default', gulp.series('dev'))

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
