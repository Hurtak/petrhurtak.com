'use strict'

const path = require('path')

function joinPathsInObject (paths, rootDirectory) {
  const absolutePaths = {}
  for (const key in paths) {
    absolutePaths[key] = path.join(rootDirectory, paths[key])
  }
  return absolutePaths
}

const appDirectory = path.join(__dirname, '../')

// paths relative to src directory
const paths = {
  root: '../',

  articles: '../../articles',

  nodeModules: '../node_modules',

  www: '../www',
  wwwArticles: '../www/articles',
  log: '../www/log',
  logAppMessage: '../www/log/app-message',
  logExceptions: '../www/log/exceptions',

  config: './config',
  server: './server',
  templates: './templates',

  static: './static',
  fonts: './static/fonts',
  icons: './static/icons',
  images: './static/images',
  scripts: './static/scripts',
  styles: './static/styles'
}

const absolutePaths = joinPathsInObject(paths, appDirectory)

module.exports = absolutePaths
