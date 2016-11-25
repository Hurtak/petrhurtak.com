'use strict'

const path = require('path')

function absolutePath (relativePath) {
  return path.join(__dirname, '../', relativePath)
}

// paths relative to src directory
const paths = {
  server: absolutePath('./server'),
  templates: absolutePath('./templates'),

  static: absolutePath('./static'),
  styles: absolutePath('./static/styles'),
  scripts: absolutePath('./static/scripts'),
  images: absolutePath('./static/images'),

  dist: absolutePath('../dist'),
  distStatic: absolutePath('../dist/static'),
  distStyles: absolutePath('../dist/static/styles'),
  distScripts: absolutePath('../dist/static/scripts'),
  distImages: absolutePath('../dist/static/images'),

  articles: absolutePath('../articles'),
  articleImages: 'images',
  articleSnippets: 'snippets',

  nodeModules: absolutePath('../node_modules')
}

module.exports = paths
