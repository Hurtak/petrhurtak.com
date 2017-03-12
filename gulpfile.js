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
const realFavicon = require('gulp-real-favicon')

const debug = require('./src/compile/debug.js')
const paths = require('./src/compile/paths.js')
const config = require('./src/compile/config.js')
const articles = require('./src/compile/articles.js')
const nunjucks = require('./src/compile/nunjucks/env.js')

if (!process.env.TRAVIS) {
  debug()
}

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

//
//
// Local state
//
//

let articlesData = null

//
//
// Site compilation
//
//

async function prepareDirs (done) {
  await fs.remove(paths.dist)
  await fs.mkdir(paths.dist)

  await Promise.all([
    fs.mkdir(paths.distDrafts),
    fs.mkdir(paths.distStatic)
  ])
  await Promise.all([
    fs.mkdir(paths.distImages),
    fs.mkdir(paths.distStyles),
    fs.mkdir(paths.distScripts)
  ])

  done()
}

async function compileStyles (done, productionBuild) {
  if (!productionBuild) {
    await fs.remove(paths.distStyles)
    await fs.symlink(paths.styles, paths.distStyles)
    done()
    return
  }

  const from = path.join(paths.styles, 'main.css')

  const result = await postCss([
    postCssImport(),
    postCssNext({ browsers: config.supportedBrowsers }),
    cssnano({ autoprefixer: false })
  ])
  .process(await fs.readFile(from, 'utf8'), {
    from: from,
    map: { inline: false, annotation: 'styles.map.css' }
  })

  const hashCss = revHash(Buffer.from(result.css))
  nunjucks.addGlobal('hashCss', hashCss)

  await Promise.all([
    fs.writeFile(path.join(paths.distStyles, `styles.${hashCss}.css`), result.css),
    fs.writeFile(path.join(paths.distStyles, 'styles.map.css'), result.map)
  ])

  done()
}

async function compileScripts (done, productionBuild) {
  if (!productionBuild) {
    await fs.remove(paths.distScripts)
    await fs.symlink(paths.scripts, paths.distScripts)
    done()
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

  await fs.writeFile(path.join(paths.distScripts, `scripts.${hashJs}.js`), code)

  done()
}

async function processImages (done, productionBuild) {
  if (productionBuild) {
    await fs.copy(paths.images, paths.distImages)
    done()
  } else {
    await fs.remove(paths.distImages)
    await fs.symlink(paths.images, paths.distImages)
    done()
  }
}

async function linkNodeModules (done) {
  await fs.symlink(paths.nodeModules, paths.distNodeModules)
  done()
}

function setProductionEnv (done) {
  nunjucks.addGlobal('production', true)
  done()
}

function gatherArticlesData (done) {
  let allArticles = articles.getArticles(paths.articles, paths.articlesDrafts, nunjucks)
  allArticles = lodash.sortBy(allArticles, 'metadata.dateLastUpdate')
  allArticles = allArticles.reverse()

  let publishedArticles = lodash.filter(allArticles, article => article.metadata.published === true)
  publishedArticles = lodash.filter(publishedArticles, article => article.metadata.dateLastUpdate <= new Date())

  articlesData = {
    all: allArticles,
    published: publishedArticles
  }
  done()
}

async function compilePages (done, productionBuild) {
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
      data: {
        lastUpdate: articlesData.published.length > 0
          ? articlesData.published[0].metadata.dateLastUpdate
          : null
      }
    }
  ]

  const pagePromises = []
  for (const page of pages) {
    let html = nunjucks.render(page.from, page.data)
    const isHtml = path.extname(page.to) === '.html'
    if (isHtml && productionBuild) {
      html = minifyHtml(html)
    }

    const pagePromise = fs.writeFile(path.join(paths.dist, page.to), html)
    pagePromises.push(pagePromise)
  }
  await Promise.all(pagePromises)

  done()
}

async function compileArticles (done, productionBuild) {
  for (const article of articlesData.all) {
    // article directory
    const folder = path.join(
      article.metadata.published ? paths.dist : paths.distDrafts,
      article.metadata.url
    )

    await fs.mkdir(folder)

    // article html
    let htmlArticle = nunjucks.render('article.njk', article)
    if (productionBuild) {
      htmlArticle = minifyHtml(htmlArticle)
    }

    await fs.writeFile(path.join(folder, 'index.html'), htmlArticle)
    if (productionBuild) {
      const imagesPath = path.join(article.fs.path, paths.articleImages)
      if (await fs.exists(imagesPath)) {
        await fs.copy(imagesPath, path.join(folder, paths.articleImages))
      }

      const snippetsPath = path.join(article.fs.path, paths.articleSnippets)
      if (await fs.exists(snippetsPath)) {
        await fs.copy(snippetsPath, path.join(folder, paths.articleSnippets))
      }
    } else {
      await Promise.all([
        fs.symlink(
          path.join(article.fs.path, paths.articleImages),
          path.join(folder, paths.articleImages)
        ),
        fs.symlink(
          path.join(article.fs.path, paths.articleSnippets),
          path.join(folder, paths.articleSnippets)
        )
      ])
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

  if (productionBuild &&
    process.env.TRAVIS === 'true' &&
    process.env.TRAVIS_BRANCH === 'master' &&
    process.env.TRAVIS_PULL_REQUEST === 'false'
  ) {
    archive.pipe(
      request({
        method: 'POST',
        url: 'https://api.netlify.com/api/v1/sites/hurtak.netlify.com/deploys',
        headers: {
          'Content-Type': 'application/zip',
          // Passed in from Travis CI only when user us member of the repo,
          // so we do not have to worry about pull requests stealing the token
          // or updating the content of the site.
          Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`
        }
      }, (error, response, body) => {
        logArchiveSize(archive)
        if (error) {
          throw error
        } else if (response.statusCode !== 200) {
          throw body
        } else {
          console.log('upload successful, server responded with:', body)
        }
        done()
      })
    )
  } else {
    console.log('Deploy skipped')
    const writeStream = fs.createWriteStream(path.join(paths.dist, 'site.zip'))
    writeStream.on('close', () => {
      logArchiveSize(archive)
      done()
    })
    archive.pipe(writeStream)
  }
}

async function generateFavicons (done, productionBuild) {
  if (!productionBuild) {
    await fs.remove(paths.distFavicons)
    await fs.symlink(paths.favicons, paths.distFavicons)
    done()
    return
  }

  await new Promise((resolve, reject) => {
    const faviconTmpDataPath = path.join(__dirname, '_faviconsData.json')

    realFavicon.generateFavicon({
      // config generated from http://realfavicongenerator.net
      masterPicture: path.join(paths.favicons, 'favicon.svg'),
      dest: paths.distFavicons,
      iconsPath: '/static/favicons/',
      design: {
        ios: {
          pictureAspect: 'backgroundAndMargin',
          backgroundColor: '#69d2e7',
          margin: '0%',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          }
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#2b5797',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          }
        },
        androidChrome: {
          pictureAspect: 'shadow',
          themeColor: '#69d2e7',
          manifest: {
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false
          }
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 80,
          themeColor: '#5bbad5'
        }
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false
      },
      markupFile: faviconTmpDataPath
    }, async function () {
      const faviconsDataRaw = await fs.readFile(faviconTmpDataPath, 'utf8')
      await fs.remove(faviconTmpDataPath)

      const faviconsData = JSON.parse(faviconsDataRaw)

      await new Promise((resolve, reject) => {
        realFavicon.checkForUpdates(faviconsData.version, err => {
          if (err) throw err
          resolve()
        })
      })
      const faviconsHtml = faviconsData.favicon.html_code
      nunjucks.addGlobal('faviconsHtml', faviconsHtml)

      resolve()
    })
  })

  done()
}

//
//
// Browser sync
//
//

function browserSyncStart (done) {
  const browserSyncConfig = Object.assign(
    { server: paths.dist },
    config.browserSync
  )

  browserSync.init(browserSyncConfig, done)
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

async function testUnit (done) {
  try {
    await execa.shell('ava src/test/**/*.js')
  } catch (e) {
    console.log(e.stderr)
  }
  done()
}

async function testLint (done) {
  try {
    await execa.shell('standard --verbose "scripts/**/*.js" "src/**/*.js"')
  } catch (e) {
    console.log(e.stdout)
  }
  done()
}

async function testCoverage (done) {
  try {
    await execa.shell('nyc --all --include="src" --exclude="src/test" ava src/test/**/*.js')
  } catch (e) {
    console.log(e.stderr)
  }
  done()
}

async function testCoverageReport (done) {
  await execa.shell('nyc report --reporter=lcov')
  done()
}

async function testCoveralls (done) {
  await execa.shell('nyc report --reporter=text-lcov | coveralls')
  done()
}

//
//
// Tasks
//
//

gulp.task('site:prepare-dirs', prepareDirs)
gulp.task('site:styles', done => compileStyles(done, false))
gulp.task('site:styles:production', done => compileStyles(done, true))
gulp.task('site:scripts', done => compileScripts(done, false))
gulp.task('site:scripts:production', done => compileScripts(done, true))
gulp.task('site:images', done => processImages(done, false))
gulp.task('site:images:production', done => processImages(done, true))
gulp.task('site:node-modules', linkNodeModules)
gulp.task('site:set-production-env', setProductionEnv)
gulp.task('site:gather-articles-data', gatherArticlesData)
gulp.task('site:pages', done => compilePages(done, false))
gulp.task('site:pages:production', done => compilePages(done, true))
gulp.task('site:articles', done => compileArticles(done, false))
gulp.task('site:articles:production', done => compileArticles(done, true))
gulp.task('site:deploy', done => deploy(done, false))
gulp.task('site:deploy:production', done => deploy(done, true))
gulp.task('site:favicons', done => generateFavicons(done, false))
gulp.task('site:favicons:production', done => generateFavicons(done, true))

gulp.task('site:compile', gulp.series(
  gulp.parallel(
    'site:prepare-dirs',
    'site:gather-articles-data'
  ),
  gulp.parallel(
    'site:styles',
    'site:scripts',
    'site:images',
    'site:favicons',
    'site:node-modules',
    'site:pages',
    'site:articles'
  )
))

gulp.task('site:compile:production', gulp.series(
  'site:prepare-dirs',
  gulp.parallel(
    gulp.series(
      gulp.parallel(
        'site:set-production-env',
        'site:gather-articles-data',
        'site:favicons:production',
        gulp.parallel('site:styles:production', 'site:scripts:production')
      ),
      gulp.parallel('site:pages:production', 'site:articles:production')
    ),
    'site:images:production'
  )
))

gulp.task('browser-sync:server', browserSyncStart)
gulp.task('browser-sync:reload-browser', browserSyncReloadBrowser)
gulp.task('browser-sync:inject-css', browserSyncInjectCss)

gulp.task('test:unit', testUnit)
gulp.task('test:lint', testLint)
gulp.task('test:coverage', testCoverage)
gulp.task('test:coverage-report', testCoverageReport)
gulp.task('test:coveralls', testCoveralls)

gulp.task('test:all', gulp.parallel(
  'test:lint',
  gulp.series('test:unit', 'test:coverage', 'test:coverage-report')
))

gulp.task('watch:articles', () => gulp.watch(
  ['./articles/**/*', './src/templates/**/*', './src/compile/**/*'],
  gulp.series('site:compile', 'browser-sync:reload-browser')
))
gulp.task('watch:test', () => gulp.watch(
  ['./src/**/*.js', './articles/**/*'],
  gulp.series('test:all')
))
gulp.task('watch:styles', () => gulp.watch(
  ['./src/**/*.css'],
  gulp.series('browser-sync:inject-css')
))

gulp.task('watch:production', () => gulp.watch(
  ['./src/**/*', './articles/**/*'],
  gulp.series(
    'site:compile:production',
    gulp.parallel('browser-sync:reload-browser', 'site:deploy')
  )
))

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

gulp.task('production', gulp.parallel(
  gulp.series(
    'site:compile:production',
    gulp.parallel('site:deploy', 'browser-sync:server')
  ),
  'test:all',
  'watch:production'
))

gulp.task('ci:test', gulp.series(
  gulp.parallel('test:lint', 'test:unit'),
  'site:compile',
  'site:compile:production'
))

gulp.task('ci:deploy', gulp.series(
  'test:all',
  'site:compile:production',
  'site:deploy:production',
  'test:coveralls'
))
