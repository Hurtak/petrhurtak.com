'use strict'

const path = require('path')

function joinPathsInObject (paths, rootDirectory) {
  const absolutePaths = {}
  for (const key in paths) {
    const value = paths[key]
    if (typeof value === 'string') {
      absolutePaths[key] = path.join(rootDirectory, paths[key])
    } else {
      absolutePaths[key] = joinPathsInObject(paths[key], rootDirectory)
    }
  }
  return absolutePaths
}

const appDirectory = path.join(__dirname, '../')

// paths relative to src directory
const paths = {
  root: '../',

  config: './config',
  server: './server',
  templates: './templates',
  static: './static',

  articles: '../articles',

  nodeModules: '../node_modules',

  www: {
    articles: '../www/articles',

    log: '../www/log',
    logAppMessage: '../www/log/app-message',
    logExceptions: '../www/log/exceptions'
  }
}

const absolutePaths = joinPathsInObject(paths, appDirectory)

module.exports = absolutePaths
