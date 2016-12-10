'use strict'

const path = require('path')
const fs = require('fs-promise')


const gulp = require('gulp')
const execa = require('execa')
const lodash = require('lodash')
const request = require('request')
const archiver = require('archiver')
const uglifyJS = require('uglify-js')
const babelCore = require('babel-core')
const scriptTags = require('script-tags')
const prettyBytes = require('pretty-bytes')
const browserSync = require('browser-sync').create()
const htmlMinifier = require('html-minifier')
const minify = html => htmlMinifier.minify(html, {
  collapseWhitespace: true,
  conservativeCollapse: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeRedundantAttributes: true,
  sortAttributes: true,
  sortClassName: true
})

const debug = require('./src/compile/debug.js')
const paths = require('./src/compile/paths.js')
const config = require('./src/compile/config.js')
const articles = require('./src/compile/articles.js')
const nunjucksEnv = require('./src/compile/nunjucks/env.js')

if (!process.env.CI) { // Travis adds this env variable
  debug()
}

//
//
// Local state
//
//

let nunjucks = nunjucksEnv(false)
let productionBuild = false

//
//
// Site compilation
//
//

gulp.task('site:prepare-dirs', done => {
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
    .then(() => {
      return Promise.all([
        fs.mkdir(paths.distImages),
        fs.mkdir(paths.distStyles),
        fs.mkdir(paths.distScripts)
      ])
    })
    .then(() => done())
})

gulp.task('site:static-pages', done => {
  const pages = [
    { from: '404.njk', to: '404.html' },
    { from: 'robots.txt.njk', to: 'robots.txt' }
  ]

  for (const page of pages) {
    let html = nunjucks.render(page.from)
    if (productionBuild) {
      html = minify(html)
    }

    fs.writeFile(path.join(paths.dist, page.to), html)
      .then(done)
  }
})

gulp.task('site:styles', done => {
  if (!productionBuild) {
    fs.symlink(paths.styles, paths.distStyles)
      .then(() => done())
    return
  }

  var postCss = require('postcss')
  var postCssImport = require('postcss-import')
  var postCssNext = require('postcss-cssnext')
  var cssnano = require('cssnano')

  const from = path.join(paths.styles, 'styles.css')

  postCss([
    postCssImport(),
    postCssNext({ browsers: config.supportedBrowsers }),
    cssnano({ autoprefixer: false })
  ])
    .process(fs.readFileSync(from, 'utf-8'), {
      from: from,
      map: {
        inline: false,
        annotation: 'styles.map.css'
      }
    })
    .then(function (result) {
      fs.writeFileSync(path.join(paths.distStyles, 'styles.css'), result.css)
      fs.writeFileSync(path.join(paths.distStyles, 'styles.map.css'), result.map)

      done()
    })
})

gulp.task('site:scripts', done => {
  if (!productionBuild) {
    fs.symlink(paths.scripts, paths.distScripts)
      .then(() => done())
    return
  }

  const baseTemplate = fs.readFileSync(path.join(paths.templates, '/extends/base.njk'), 'utf-8')

  let tags = scriptTags(baseTemplate)
  tags = lodash.filter(tags, script => script.attrs.src)
  tags = lodash.filter(tags, script => 'data-dev' in script.attrs)
  tags = lodash.map(tags, script => script.attrs.src)
  tags = lodash.map(tags, url => {
    const scriptPath = path.join(paths.src, url)
    return {
      src: url,
      path: scriptPath,
      content: babelCore.transform(fs.readFileSync(scriptPath, 'utf-8'), {
        sourceMaps: 'inline',
        presets: [
          ['env', { targets: { browsers: config.supportedBrowsers } }]
        ]
      }).code
    }
  })
  tags = lodash.reduce(tags, (obj, tag) => {
    obj[tag.src] = tag.content
    return obj
  }, {})

  const result = uglifyJS.minify(tags, {
    outSourceMap: 'scripts.map.js',
    fromString: true
  })

  fs.writeFileSync(path.join(paths.distScripts, 'scripts.js'), result.code)
  fs.writeFileSync(path.join(paths.distScripts, 'scripts.map.js'), result.map)

  done()
})

gulp.task('site:images', done => {
  if (productionBuild) {
    fs.copy(paths.images, paths.distImages)
      .then(() => done())
  } else {
    fs.symlink(paths.images, paths.distImages)
      .then(() => done())
  }
})

gulp.task('site:node-modules', done => {
  if (!productionBuild) {
    fs.symlink(paths.nodeModules, paths.distNodeModules)
      .then(() => done())
  } else {
    done()
  }
})

gulp.task('site:articles', done => {
  // gather articles data

  let articlesData = articles.getArticles(paths.articles, paths.articlesDrafts, nunjucks)
  articlesData = lodash.sortBy(articlesData, 'metadata.dateLastUpdate')
  articlesData = articlesData.reverse()

  let articlesPublishedData = lodash.filter(articlesData, article => article.metadata.published === true)
  articlesPublishedData = lodash.filter(articlesPublishedData, article => article.metadata.dateLastUpdate <= new Date())

  // index page
  const indexArticles = lodash.slice(articlesPublishedData, 0, config.articles.perPage)
  let htmlIndex = nunjucks.render('index.njk', {articles: indexArticles})
  if (productionBuild) {
    htmlIndex = minify(htmlIndex)
  }

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
        let htmlArticle = nunjucks.render('article.njk', article)
        if (productionBuild) {
          htmlArticle = minify(htmlArticle)
        }

        const promiseHtml = fs.writeFile(path.join(folder, 'index.html'), htmlArticle)
        let promiseImages
        let promiseSnippets
        if (productionBuild) {
          const imagesPath = path.join(article.fs.path, paths.articleImages)
          if (fs.existsSync(imagesPath)) {
            promiseImages = fs.copy(imagesPath, path.join(folder, paths.articleImages))
          }

          const snippetsPath = path.join(article.fs.path, paths.articleSnippets)
          if (fs.existsSync(snippetsPath)) {
            promiseSnippets = fs.copy(snippetsPath, path.join(folder, paths.articleSnippets))
          }
        } else {
          promiseImages = fs.symlink(
            path.join(article.fs.path, paths.articleImages),
            path.join(folder, paths.articleImages)
          )
          promiseSnippets = fs.symlink(
            path.join(article.fs.path, paths.articleSnippets),
            path.join(folder, paths.articleSnippets)
          )
        }

        return Promise.all([
          promiseHtml,
          promiseImages,
          promiseSnippets
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

gulp.task('site:deploy', done => {
  const archive = archiver('zip')

  archive.on('error', err => {
    console.error(err)
    done()
  })

  const logFileSize = archive => {
    console.log('archive size:', prettyBytes(archive.pointer()))
  }

  if (productionBuild) {
    archive.pipe(
      request({
        method: 'POST',
        url: 'https://api.netlify.com/api/v1/sites/hurtak.netlify.com/deploys',
        headers: {
          'Content-Type': 'application/zip',
          Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`
        }
      }, (error, _, body) => {
        logFileSize(archive)
        if (error) {
          console.error('upload failed:', error)
        } else {
          console.log('upload successful, server responded with:', body)
        }
        done()
      })
    )
  } else {
    const writeStream = fs.createWriteStream(path.join(paths.dist, 'site.zip'))
    writeStream.on('close', () => {
      logFileSize(archive)
      done()
    })
    archive.pipe(writeStream)
  }

  archive.directory(paths.dist, '/')
  archive.finalize()
})

gulp.task('site:collection:compile',
  gulp.series(
    'site:prepare-dirs',
    gulp.parallel(
      'site:static-pages',
      'site:styles',
      'site:scripts',
      'site:images',
      'site:node-modules',
      'site:articles'
    )
  )
)

//
//
// Browser sync
//
//

gulp.task('browser-sync:server', done => {
  browserSync.init({
    server: './dist',
    port: 8000,
    open: false,
    https: true,
    reloadOnRestart: true
  }, done)
})

gulp.task('browser-sync:reload-browser', done => {
  browserSync.reload()
  done()
})

//
//
// Tests
//
//

gulp.task('test:unit', done => {
  execa.shell('ava src/test/**/*.js')
    .then(() => done())
    .catch((res) => {
      console.log(res.stderr)
      done()
    })
})

gulp.task('test:lint', done => {
  execa.shell('standard --verbose "scripts/**/*.js" "src/**/*.js"')
    .then(() => done())
    .catch((res) => {
      console.log(res.stdout)
      done()
    })
})

gulp.task('test:coverage', done => {
  execa.shell('nyc --all --include="src" --exclude="src/test" ava src/test/**/*.js')
    .then(() => done())
    .catch((res) => {
      console.log(res.stderr)
      done()
    })
})

gulp.task('test:coverage-report', done => {
  execa.shell('nyc report --reporter=lcov')
    .then(() => done())
})

gulp.task('test:coveralls', done => {
  execa.shell('nyc report --reporter=text-lcov | coveralls')
    .then(() => done())
})

gulp.task('test:collection:all', gulp.parallel(
  'test:lint',
  gulp.series('test:unit', 'test:coverage', 'test:coverage-report')
))

//
//
// Watches
//
//

gulp.task('watch:articles', () =>
  gulp.watch(['./articles/**/*', './src/**/*'],
    gulp.series(
      'site:collection:compile',
      'browser-sync:reload-browser'
    )
))

gulp.task('watch:test', () =>
  gulp.watch(['./src/**/*.js'], gulp.series('test:collection:all')
))

//
//
// Main tasks
//
//

gulp.task('env:production', done => {
  productionBuild = true
  nunjucks = nunjucksEnv(productionBuild)
  done()
})

gulp.task('dev',
  gulp.parallel(
    gulp.series('site:collection:compile', 'browser-sync:server'),
    'test:collection:all',
    'watch:articles',
    'watch:test'
  )
)

gulp.task('dist',
  gulp.series(
    'env:production',
    gulp.parallel(
      gulp.series('site:collection:compile', 'browser-sync:server'),
      'test:collection:all',
      'watch:articles',
      'watch:test'
    )
  )
)

gulp.task('default', gulp.series('dev'))

//
//
// Continuous integration tasks
//
//

gulp.task('ci:test', gulp.series(
  'test:unit',
  'site:collection:compile'
))

gulp.task('ci:deploy', gulp.series(
  'env:production',
  'test:coverage',
  'site:collection:compile',
  'site:deploy',
  'test:coveralls'
))
