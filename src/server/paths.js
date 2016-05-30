'use strict'

const path = require('path')

const joinPathsInObject = (paths, rootDirectory) => {
  const absolutePaths = {}
  for (const key in paths) {
    absolutePaths[key] = path.join(rootDirectory, paths[key])
  }
  return absolutePaths
}

const appDirectory = path.join(__dirname, '../')

// paths relative to app directory
const paths = {
  root: '../',

  articles: '../articles',
  nodeModules: '../node_modules',

  config: './config',
  server: './server',
  public: './public',
  fonts: './public/fonts',
  icons: './public/icons',
  images: './public/images',
  scripts: './public/scripts',
  styles: './public/styles',
  templates: './templates'
}

const absolutePaths = joinPathsInObject(paths, appDirectory)
console.log(absolutePaths)

module.exports = absolutePaths
