'use strict'

const fs = require('fs')
const url = require('url')
const path = require('path')

const frontMatter = require('front-matter')
const escapeHtml = require('escape-html')
const isAbsoluteUrl = require('is-absolute-url')
const cheerio = require('cheerio')

const paths = require('./paths.js')

function findPathToArticle (directory, articleName, searchedDepth, currentDepth = 0) {
  const list = fs.readdirSync(directory)

  for (const file of list) {
    const filePath = path.join(directory, file)
    const isDirectory = fs.statSync(filePath).isDirectory()

    if (!isDirectory) continue
    if (currentDepth === searchedDepth && file === articleName) return filePath
    if (currentDepth >= searchedDepth) continue

    const result = findPathToArticle(filePath, articleName, searchedDepth, currentDepth + 1)
    if (result) return result
  }

  return false
}

function getArticlesMetadata (directory, filename, gatheredMetadata = [], baseDirectory = directory) {
  const list = fs.readdirSync(directory)
  for (const file of list) {
    const filePath = path.join(directory, file)
    const isDirectory = fs.statSync(filePath).isDirectory()

    if (isDirectory) {
      gatheredMetadata = getArticlesMetadata(filePath, filename, gatheredMetadata, baseDirectory)
    } else if (file === filename) {
      // path to article relative to baseDirectory
      const articleDirectory = filePath
        .replace(filename, '')
        .replace(baseDirectory, '')

      const metadata = frontMatter(fs.readFileSync(filePath, 'utf8')).attributes

      metadata.directory = articleDirectory
      metadata.url = stripSlashes(articleDirectory).split(path.sep)
      metadata.url = metadata.url[metadata.url.length - 1]
      gatheredMetadata.push(metadata)
    }
  }

  return gatheredMetadata
}

function getArticlesDirectories (directory, searchedDepth, currentDepth = 0, articlesList = []) {
  const list = fs.readdirSync(directory)

  for (const file of list) {
    const filePath = path.join(directory, file)
    const isDirectory = fs.statSync(filePath).isDirectory()

    if (!isDirectory) continue

    if (currentDepth === searchedDepth) {
      articlesList.push(filePath)
    } else {
      getArticlesDirectories(filePath, searchedDepth, currentDepth + 1, articlesList)
    }
  }

  return articlesList
}

function parseArticle (articlePath) {
  let data = fs.readFileSync(articlePath, 'utf8')
  data = frontMatter(data)

  const metadata = data.attributes
  let article = data.body

  const articleDirectory = '/static/articles/' +
    articlePath
      // c:\some\path\rootdir\article.md -> rootdir\article.md
      .replace(paths.articles, '')
      .split(path.sep)
      // remove empty values (\some\path creates ['', 'some', 'path'])
      .filter(value => value)
      // remove filename rootdir\article.md - > rootdir
      .filter((value, index, array) => index !== array.length - 1)
      // use '/' instead of path.sep, because that's what we are using in templates
      .join('/') + '/'

  let $ = cheerio.load(article)

  // replace relative img paths with absolute paths to images
  $('img').attr('src', (_, src) => {
    if (isAbsoluteUrl(src)) {
      return src
    } else {
      return url.resolve(articleDirectory, src)
    }
  })

  // escape content of <code> blocks
  $('code').replaceWith((_, el) => {
    const html = $(el).html()
    const escapedHtml = escapeHtml(html)

    return escapedHtml
  })

  return {
    metadata,
    html: $.html()
  }
}

// TODO: this should not be in this file
function sortObjectBy (object, sortBy, ascendant) {
  object.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return ascendant ? -1 : 1
    } else if (a[sortBy] > b[sortBy]) {
      return ascendant ? 1 : -1
    }
    return 0
  })
}

// TODO: this should not be in this file
function stripSlashes (string) {
  if (string[0] === path.sep) {
    string = string.substr(1)
  }
  if (string[string.length - 1] === path.sep) {
    string = string.slice(0, -1)
  }

  return string
}

module.exports = {
  findPathToArticle,
  getArticlesMetadata,
  getArticlesDirectories,
  parseArticle,
  sortObjectBy
}
