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
  distDrafts: absolutePath('../dist/_drafts'),
  distStatic: absolutePath('../dist/static'),
  distStyles: absolutePath('../dist/static/styles'),
  distScripts: absolutePath('../dist/static/scripts'),
  distImages: absolutePath('../dist/static/images'),
  distNodeModules: absolutePath('../dist/static/node_modules'),

  articles: absolutePath('../articles'),
  articlesDrafts: absolutePath('../articles/_drafts'),
  articleMarkdown: 'article.md',
  articleMetadata: 'metadata.yaml',
  articleImages: 'images',
  articleSnippets: 'snippets',

  nodeModules: absolutePath('../node_modules')
}

module.exports = paths
