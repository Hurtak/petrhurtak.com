'use strict'

const path = require('path')
const fs = require('fs-promise')

// const path = require('path')
// const config = require('./config.js')
const nunjucks = require('./nunjucks/env.js')
const paths = require('./paths.js')
const debug = require('./debug.js')
// const routes = require('./routes.js')

// compilation

console.log('Starting compile script')
const start = Date.now()

debug()
prepareDirs()
compile404()
compileRobotsTxt()
compileStyles()
compileScripts()
compileImages()

const took = Date.now() - start
console.log(`Compile script finished in ${took}ms`)

// functions

function prepareDirs () {
  fs.removeSync(paths.dist)
  fs.ensureDirSync(paths.dist)
}

function compile404 () {
  const html = nunjucks.render('pages/404.njk')
  const destination = path.join(paths.dist, '404.html')
  fs.writeFileSync(destination, html)
}

function compileRobotsTxt () {
  const html = nunjucks.render('pages/robots.txt.njk')
  const destination = path.join(paths.dist, 'robots.txt')
  fs.writeFileSync(destination, html)
}

function compileStyles () {
  const source = path.join(paths.static, '/styles')
  const destination = path.join(paths.dist, '/static/styles')
  fs.copySync(source, destination)
}

function compileScripts () {
  const source = path.join(paths.static, '/scripts')
  const destination = path.join(paths.dist, '/static/scripts')
  fs.copySync(source, destination)
}

function compileImages () {
  const source = path.join(paths.static, '/images')
  const destination = path.join(paths.dist, '/static/images')
  fs.copySync(source, destination)
}

// const articleItems = fs.readdirSync(paths.articles)

// for (const item of articleItems) {
//   const isDirectory = fs.statSync(path.join(paths.articles, item)).isDirectory()
//   if (!isDirectory) continue

//   const articleName = item.substr(11) // TODO move this function into src/lib/articles
//   console.log(`Processing "${articleName}"`)
//   const distArticleDirName = path.join(paths.dist.articles, articleName)

//   fs.ensureDir(distArticleDirName)
//   fs.ensureDir(path.join(distArticleDirName, '/images'))

//   const imagesFolder = path.join(paths.articles, item, '/images')
//   const images = fs.readdirSync(imagesFolder)
//   for (const image of images) {
//     const from = path.join(imagesFolder, image)
//     const to = path.join(distArticleDirName, '/images', image)
//     fs.copySync(from, to)
//   }
// }




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

