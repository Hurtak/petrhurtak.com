'use strict'

const path = require('path')
const fs = require('fs-promise')

const gulp = require('gulp')
const execa = require('execa')
const lodash = require('lodash')
const request = require('request')
const archiver = require('archiver')
const browserSync = require('browser-sync').create()
// const htmlMinifier = require('html-minifier')

const debug = require('./src/compile/debug.js')
const paths = require('./src/compile/paths.js')
const config = require('./src/compile/config.js')
const articles = require('./src/compile/articles.js')
const nunjucks = require('./src/compile/nunjucks/env.js')

console.log(process.env.CI)
console.log(typeof process.env.CI)
if (!process.env.CI) {
  debug()
}

//
//
// Articles compilation
//
//

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

//
//
// Server
//
//

gulp.task('server', function (done) {
  browserSync.init({
    server: './dist',
    port: 8000,
    open: false,
    https: true,
    reloadOnRestart: true
  }, done)
})

gulp.task('browser-reload', function (done) {
  browserSync.reload()
  done()
})

//
//
// Tests
//
//

gulp.task('test:unit', function (done) {
  execa.shell('ava src/test/**/*.js')
    .then(() => done())
    .catch((res) => {
      console.log(res.stderr)
      done()
    })
})

gulp.task('test:lint', function (done) {
  execa.shell('standard --verbose "scripts/**/*.js" "src/**/*.js"')
    .then(() => done())
    .catch((res) => {
      console.log(res.stdout)
      done()
    })
})

gulp.task('test:coverage', function (done) {
  execa.shell('nyc --all --include="src" --exclude="src/test" ava src/test/**/*.js')
    .then(() => done())
    .catch((res) => {
      console.log(res.stderr)
      done()
    })
})

gulp.task('test:coverage-report', function (done) {
  execa.shell('nyc report --reporter=lcov')
    .then(() => done())
})

gulp.task('test:coveralls', function (done) {
  execa.shell('nyc report --reporter=text-lcov | coveralls')
    .then(() => done())
})

//
//
// Deploy
//
//

gulp.task('deploy', function (done) {
  const archive = archiver('zip')

  archive.on('error', err => {
    console.error(err)
    done()
  })

  archive.pipe(
    request({
      method: 'POST',
      url: 'https://api.netlify.com/api/v1/sites/hurtak.netlify.com/deploys',
      headers: {
        'Content-Type': 'application/zip',
        Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`
      }
    }, function (error, response, body) {
      if (error) {
        console.error('upload failed:', error)
      } else {
        console.log('Upload successful!  Server responded with:', body)
      }
      done()
    })
  )

  archive.directory(paths.dist)
  archive.finalize()
})

//
//
// Watches
//
//

gulp.task('watch:articles', function () {
  return gulp.watch(['./articles/**/*', './src/**/*'], gulp.series('prepare-dirs', 'compile', 'browser-reload'))
})

gulp.task('watch:test', function () {
  return gulp.watch(['./src/**/*.js'], gulp.series('test'))
})

//
//
// Task collections
//
//

gulp.task('test', gulp.parallel(
  'test:lint',
  gulp.series('test:unit', 'test:coverage', 'test:coverage-report')
))

gulp.task('compile', gulp.parallel(
  '404',
  'robots.txt',
  'static',
  'articles'
))

//
//
// Main tasks
//
//

gulp.task('dev',
  gulp.parallel(
    'watch:articles',
    'watch:test',
    'server',
    'test',
    gulp.series('prepare-dirs', 'compile')
  )
)

//
//
// Continuous integration tasks
//
//

gulp.task('ci:test',
  gulp.series(
    'test:unit',
    'prepare-dirs',
    'compile'
  )
)

gulp.task('ci:deploy',
  gulp.series(
    'test:coverage',
    'prepare-dirs',
    'compile',
    'deploy',
    'test:coveralls'
  )
)

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
