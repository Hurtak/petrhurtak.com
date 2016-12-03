'use strict'

const path = require('path')

function absolutePath (relativePath) {
  return path.join(__dirname, '../../', relativePath)
}

// paths relative to the repository root directory
const paths = {
  server: absolutePath('./src/server'),

  templates: absolutePath('./src/templates'),

  static: absolutePath('./src/static'),
  styles: absolutePath('./src/static/styles'),
  scripts: absolutePath('./src/static/scripts'),
  images: absolutePath('./src/static/images'),

  dist: absolutePath('./dist'),
  distDrafts: absolutePath('./dist/_drafts'),
  distStatic: absolutePath('./dist/static'),
  distStyles: absolutePath('./dist/static/styles'),
  distScripts: absolutePath('./dist/static/scripts'),
  distImages: absolutePath('./dist/static/images'),
  distNodeModules: absolutePath('./dist/static/node_modules'),

  articles: absolutePath('./articles'),
  articlesDrafts: absolutePath('./articles/_drafts'),
  articleMarkdown: 'article.md',
  articleMetadata: 'metadata.yaml',
  articleImages: 'images',
  articleSnippets: 'snippets',

  nodeModules: absolutePath('./node_modules')
}

module.exports = paths
