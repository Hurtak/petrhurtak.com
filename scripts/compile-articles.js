'use strict'

const fs = require('fs-promise')
const path = require('path')
const paths = require('../src/server/paths.js')

const articleItems = fs.readdirSync(paths.articles)

console.log('Starting compile script')
for (const item of articleItems) {
  const isDirectory = fs.statSync(path.join(paths.articles, item)).isDirectory()
  if (!isDirectory) continue

  const articleName = item.substr(11) // TODO move this function into src/lib/articles
  console.log(`Processing "${articleName}"`)
  const wwwArticleDirName = path.join(paths.www.articles, articleName)

  fs.ensureDir(wwwArticleDirName)
  fs.ensureDir(path.join(wwwArticleDirName, '/images'))

  const imagesFolder = path.join(paths.articles, item, '/images')
  const images = fs.readdirSync(imagesFolder)
  for (const image of images) {
    const from = path.join(imagesFolder, image)
    const to = path.join(wwwArticleDirName, '/images', image)
    fs.copySync(from, to)
  }
}

console.log('Compile script finished')

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
