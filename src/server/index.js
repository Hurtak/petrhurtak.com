'use strict'

const path = require('path')
const fs = require('fs-promise')
const chokidar = require('chokidar')

// const path = require('path')
// const config = require('./config.js')
const nunjucks = require('./nunjucks/env.js')
const paths = require('./paths.js')
const debug = require('./debug.js')
// const routes = require('./routes.js')

debug()

// compilation

console.log('Starting compile script')
const start = Date.now()

// prepare dirs
fs.removeSync(paths.dist)
fs.mkdirSync(paths.dist)
fs.mkdirSync(paths.distStatic)

// 404
const html404 = nunjucks.render('pages/404.njk')
fs.writeFileSync(path.join(paths.dist, '404.html'), html404)

// robots txt
const htmlRobotsTxt = nunjucks.render('pages/robots.txt.njk')
fs.writeFileSync(path.join(paths.dist, 'robots.txt'), htmlRobotsTxt)

// styles
fs.symlinkSync(paths.styles, paths.distStyles)

// scripts
fs.symlinkSync(paths.scripts, paths.distScripts)

// images
fs.symlinkSync(paths.images, paths.distImages)

// watch()

const took = Date.now() - start
console.log(`Compile script finished in ${took}ms`)


// function watch () {
//   const watcher = chokidar.watch(paths.static, {
//   })

//   watcher.on('change', (path, b) => {
//     console.log(path)
//     console.log(b)
//   })
// }

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

