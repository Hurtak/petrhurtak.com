'use strict'

const path = require('path')
const fs = require('fs-promise')

// const path = require('path')
// const config = require('./config.js')
const nunjucks = require('./nunjucks/env.js')
const paths = require('./paths.js')
const debug = require('./debug.js')
// const routes = require('./routes.js')
// const nunjucksEnv = require('./nunjucks/env.js')


// nunjucksEnv.express(app)

console.log('Starting compile script')

debug()
prepareDirs()
compile404()

console.log('Compile script finished')

function prepareDirs () {
  fs.removeSync(paths.dist)
  fs.ensureDirSync(paths.dist)
}

function compile404 () {
  const html = nunjucks.render('pages/404.njk')
  const destination = path.join(paths.dist, '404.html')
  fs.writeFileSync(destination, html)
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

