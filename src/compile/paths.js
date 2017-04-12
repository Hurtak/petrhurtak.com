'use strict'

const path = require('path')

function absolutePath (relativePath) {
  return path.join(__dirname, '../../', relativePath)
}

// paths relative to the repository root directory
const paths = {
  root: absolutePath('.'),
  src: absolutePath('./src'),
  server: absolutePath('./src/server'),
  templates: absolutePath('./src/templates'),

  static: absolutePath('./src/static'),
  styles: absolutePath('./src/static/styles'),
  scripts: absolutePath('./src/static/scripts'),
  images: absolutePath('./src/static/images'),
  favicons: absolutePath('./src/static/favicons'),

  dist: absolutePath('./dist'),
  distDrafts: absolutePath('./dist/_drafts'),
  distStatic: absolutePath('./dist/static'),
  distStyles: absolutePath('./dist/static/styles'),
  distScripts: absolutePath('./dist/static/scripts'),
  distImages: absolutePath('./dist/static/images'),
  distFavicons: absolutePath('./dist/static/favicons'),
  distNodeModules: absolutePath('./dist/node_modules'),

  articles: absolutePath('./articles'),
  articlesDrafts: absolutePath('./articles/_drafts'),
  articleMarkdown: 'article.md',
  articleMetadata: 'metadata.yaml',
  articleImages: 'images',
  articleSnippets: 'snippets',
  articleVideos: 'videos',

  nodeModules: absolutePath('./node_modules')
}

module.exports = paths
