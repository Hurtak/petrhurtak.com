'use strict'

const path = require('path')
const fs = require('fs-promise')

const gulp = require('gulp')
const execa = require('execa')
const lodash = require('lodash')
const request = require('request')
const archiver = require('archiver')

const postCss = require('postcss')
const postCssNext = require('postcss-cssnext')
const postCssImport = require('postcss-import')
const cssnano = require('cssnano')
const revHash = require('rev-hash')
const uglifyJS = require('uglify-js')
const babelCore = require('babel-core')
const scriptTags = require('script-tags')
const prettyBytes = require('pretty-bytes')
const browserSync = require('browser-sync').create()
const htmlMinifier = require('html-minifier')
const minifyHtml = html => htmlMinifier.minify(html, {
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

const productionBuild = process.env.BUILD_ENV === 'production'
const nunjucks = nunjucksEnv(productionBuild)
const articlesData = (function () {
  let allArticles = articles.getArticles(paths.articles, paths.articlesDrafts, nunjucks)
  allArticles = lodash.sortBy(allArticles, 'metadata.dateLastUpdate')
  allArticles = allArticles.reverse()

  let publishedArticles = lodash.filter(allArticles, article => article.metadata.published === true)
  publishedArticles = lodash.filter(publishedArticles, article => article.metadata.dateLastUpdate <= new Date())

  return {
    all: allArticles,
    published: publishedArticles
  }
}())

console.log(`production build: ${productionBuild}`)

//
//
// Site compilation
//
//

function prepareDirs (done) {
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
}

function compileStyles (done, productionBuild) {
  if (!productionBuild) {
    fs.remove(paths.distStyles)
      .then(() => fs.symlink(paths.styles, paths.distStyles))
      .then(() => done())
    return
  }

  const from = path.join(paths.styles, 'styles.css')

  postCss([
    postCssImport(),
    postCssNext({ browsers: config.supportedBrowsers }),
    cssnano({ autoprefixer: false })
  ])
    .process(fs.readFileSync(from, 'utf8'), {
      from: from,
      map: {
        inline: false,
        annotation: 'styles.map.css'
      }
    })
    .then(function (result) {
      const hashCss = revHash(Buffer.from(result.css))
      nunjucks.addGlobal('hashCss', hashCss)

      fs.writeFileSync(path.join(paths.distStyles, `styles-${hashCss}.css`), result.css)
      fs.writeFileSync(path.join(paths.distStyles, 'styles.map.css'), result.map)

      done()
    })
}

function compileScripts (done, productionBuild) {
  if (!productionBuild) {
    fs.remove(paths.distScripts)
      .then(() => fs.symlink(paths.scripts, paths.distScripts))
      .then(() => done())
    return
  }

  const baseTemplate = fs.readFileSync(path.join(paths.templates, '/extends/base.njk'), 'utf8')

  let code = scriptTags(baseTemplate)
  code = lodash.filter(code, script => script.attrs.src)
  code = lodash.filter(code, script => 'data-dev' in script.attrs)
  code = lodash.map(code, script => script.attrs.src)
  code = lodash.map(code, src => path.join(paths.src, src))
  code = lodash.map(code, path => fs.readFileSync(path, 'utf8'))
  code = lodash.join(code, ';\n')
  code = babelCore.transform(code, {
    presets: [
      ['env', {
        targets: { browsers: config.supportedBrowsers },
        loose: true
      }]
    ]
  }).code
  code = uglifyJS.minify(code, { fromString: true }).code

  const hashJs = revHash(Buffer.from(code))
  nunjucks.addGlobal('hashJs', hashJs)

  fs.writeFileSync(path.join(paths.distScripts, `scripts-${hashJs}.js`), code)

  done()
}

function processImages (done, productionBuild) {
  if (productionBuild) {
    fs.copy(paths.images, paths.distImages)
      .then(() => done())
  } else {
    fs.remove(paths.distImages)
      .then(() => fs.symlink(paths.images, paths.distImages))
      .then(() => done())
  }
}

function linkNodeModules (done) {
  fs.symlink(paths.nodeModules, paths.distNodeModules)
    .then(() => done())
}

function compilePages (done) {
  const pages = [
    { from: '404.njk', to: '404.html', data: null },
    { from: 'robots.txt.njk', to: 'robots.txt', data: null },
    { from: 'index.njk',
      to: 'index.html',
      data: {articles: lodash.slice(articlesData.published, 0, config.articles.perPage)}
    },
    { from: 'rss.njk',
      to: 'rss.xml',
      data: {articles: lodash.slice(articlesData.published, 0, config.articles.perRssFeed)}
    },
    { from: 'humans.txt.njk',
      to: 'humans.txt',
      data: {lastUpdate: articlesData.published[0].metadata.dateLastUpdate}
    }
  ]

  for (const page of pages) {
    let html = nunjucks.render(page.from, page.data)
    const isHtml = path.extname(page.to) === '.html'
    if (isHtml && productionBuild) {
      html = minifyHtml(html)
    }

    fs.writeFileSync(path.join(paths.dist, page.to), html)
  }

  done()
}

function compileArticles (done, productionBuild) {
  for (const article of articlesData.all) {
    // article directory
    const folder = path.join(
      article.metadata.published ? paths.dist : paths.distDrafts,
      article.metadata.url
    )

    fs.mkdirSync(folder)

    // article html
    let htmlArticle = nunjucks.render('article.njk', article)
    if (productionBuild) {
      htmlArticle = minifyHtml(htmlArticle)
    }

    fs.writeFileSync(path.join(folder, 'index.html'), htmlArticle)
    if (productionBuild) {
      const imagesPath = path.join(article.fs.path, paths.articleImages)
      if (fs.existsSync(imagesPath)) {
        fs.copySync(imagesPath, path.join(folder, paths.articleImages))
      }

      const snippetsPath = path.join(article.fs.path, paths.articleSnippets)
      if (fs.existsSync(snippetsPath)) {
        fs.copySync(snippetsPath, path.join(folder, paths.articleSnippets))
      }
    } else {
      fs.symlinkSync(
        path.join(article.fs.path, paths.articleImages),
        path.join(folder, paths.articleImages)
      )
      fs.symlinkSync(
        path.join(article.fs.path, paths.articleSnippets),
        path.join(folder, paths.articleSnippets)
      )
    }
  }

  done()
}

function logArchiveSize (archive) {
  console.log('archive size:', prettyBytes(archive.pointer()))
}

function deploy (done, productionBuild) {
  const archive = archiver('zip')

  archive.on('error', err => {
    console.error(err)
    done()
  })

  archive.directory(paths.dist, '/')
  archive.finalize()

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
        logArchiveSize(archive)
        if (error) {
          console.error('upload failed:', error)
        } else {
          console.log('upload successful, server responded with:', body)
        }
        done()
      })
    )
  } else {
    const writeStream = fs.createWriteStream(path.join(paths.root, 'site.zip'))
    writeStream.on('close', () => {
      logArchiveSize(archive)
      done()
    })
    archive.pipe(writeStream)
  }
}

//
//
// Browser sync
//
//

function browserSyncStart (done) {
  browserSync.init({
    server: './dist',
    port: 8000,
    https: true,
    reloadOnRestart: true
  }, done)
}

function browserSyncReloadBrowser (done) {
  browserSync.reload('*.html')
  done()
}

function browserSyncInjectCss (done) {
  browserSync.reload('*.css')
  done()
}

//
//
// Tests
//
//

function testUnit (done) {
  execa.shell('ava src/test/**/*.js')
    .then(() => done())
    .catch((res) => {
      console.log(res.stderr)
      done()
    })
}

function testLint (done) {
  execa.shell('standard --verbose "scripts/**/*.js" "src/**/*.js"')
    .then(() => done())
    .catch((res) => {
      console.log(res.stdout)
      done()
    })
}

function testCoverage (done) {
  execa.shell('nyc --all --include="src" --exclude="src/test" ava src/test/**/*.js')
    .then(() => done())
    .catch((res) => {
      console.log(res.stderr)
      done()
    })
}

function testCoverageReport (done) {
  execa.shell('nyc report --reporter=lcov')
    .then(() => done())
}

function testCoveralls (done) {
  execa.shell('nyc report --reporter=text-lcov | coveralls')
    .then(() => done())
}

//
//
// Tasks
//
//

gulp.task('site:prepare-dirs', done => prepareDirs(done))
gulp.task('site:styles', done => compileStyles(done, false))
gulp.task('site:styles:production', done => compileStyles(done, true))
gulp.task('site:scripts', done => compileScripts(done, false))
gulp.task('site:scripts:production', done => compileScripts(done, true))
gulp.task('site:images', done => processImages(done, false))
gulp.task('site:images:production', done => processImages(done, true))
gulp.task('site:node-modules', done => linkNodeModules(done))
gulp.task('site:pages', done => compilePages(done))
gulp.task('site:articles', done => compileArticles(done, false))
gulp.task('site:articles:production', done => compileArticles(done, true))
gulp.task('site:deploy', done => deploy(done, false))
gulp.task('site:deploy:production', done => deploy(done, true))

gulp.task('site:compile', gulp.series(
  'site:prepare-dirs',
  gulp.parallel(
    'site:styles',
    'site:scripts',
    'site:images',
    'site:node-modules',
    'site:pages',
    'site:articles'
  )
))

gulp.task('site:compile:production', gulp.series(
  'site:prepare-dirs',
  gulp.parallel(
    gulp.series(
      gulp.parallel('site:styles:production', 'site:scripts:production'),
      gulp.parallel('site:pages', 'site:articles:production')
    ),
    'site:images:production'
  )
))

gulp.task('browser-sync:server', done => browserSyncStart(done))
gulp.task('browser-sync:reload-browser', done => browserSyncReloadBrowser(done))
gulp.task('browser-sync:inject-css', done => browserSyncInjectCss(done))

gulp.task('test:unit', done => testUnit(done))
gulp.task('test:lint', done => testLint(done))
gulp.task('test:coverage', done => testCoverage(done))
gulp.task('test:coverage-report', done => testCoverageReport(done))
gulp.task('test:coveralls', done => testCoveralls(done))

gulp.task('test:all', gulp.parallel(
  'test:lint',
  gulp.series('test:unit', 'test:coverage', 'test:coverage-report')
))

// TODO: try it without () =>
gulp.task('watch:articles', () =>
  gulp.watch(['./articles/**/*', './src/templates/**/*'],
  gulp.series('site:compile', 'browser-sync:reload-browser'))
)
gulp.task('watch:test', () => gulp.watch(['./src/**/*.js'], gulp.series('test:all')))
gulp.task('watch:styles', () => gulp.watch(['./src/**/*.css'], gulp.series('browser-sync:inject-css')))

//
//
// Main tasks
//
//

gulp.task('dev', gulp.parallel(
  gulp.series('site:compile', 'browser-sync:server'),
  'test:all',
  'watch:articles',
  'watch:styles',
  'watch:test'
))

gulp.task('default', gulp.series('dev'))

gulp.task('ci:test', gulp.series(
  'test:unit',
  'site:compile',
  'site:compile:production'
))

gulp.task('ci:deploy', gulp.series(
  'test:coverage',
  'site:compile:production',
  'site:deploy:production',
  'test:coveralls'
))
