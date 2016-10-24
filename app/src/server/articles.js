'use strict'

const fs = require('fs-promise')
const path = require('path')

const lodash = require('lodash')
const yaml = require('js-yaml')
const markdownIt = require('markdown-it')
const htmlMinifier = require('html-minifier')
const highlight = require('highlight.js')

const utilsArticles = require('./utils/articles.js')

function debugGetPathByArticleName (directory, articleUrl) {
  const directoryItems = fs.readdirSync(directory) // TODO: sync function

  for (const directoryItem of directoryItems) {
    const fullPath = path.join(directory, directoryItem)
    const isDirectory = fs.statSync(fullPath).isDirectory() // TODO: sync function

    if (!isDirectory) continue

    // 2016-10-10-hello -> hello
    let currentArticleUrl = lodash.split(directoryItem, '-')
    currentArticleUrl = lodash.slice(currentArticleUrl, 3)
    currentArticleUrl = lodash.join(currentArticleUrl, '-')

    if (currentArticleUrl === articleUrl) {
      return fullPath
    }
  }

  return null
}

function getArticlesDirectories (directory) {
  const directoryItems = fs.readdirSync(directory) // TODO: sync function
  const articleDirectories = []

  for (const directoryItem of directoryItems) {
    const fullPath = path.join(directory, directoryItem)
    const isDirectory = fs.statSync(fullPath).isDirectory() // TODO: sync function

    if (!isDirectory) continue
    articleDirectories.push(fullPath)
  }

  return articleDirectories
}

function getArticleData (articleFolderPath) {
  const metadataPath = path.join(articleFolderPath, '/metadata.yaml')
  const metadataContent = fs.readFileSync(metadataPath, 'utf-8')
  const metadata = yaml.safeLoad(metadataContent)

  const snippetsData = getSnippetsData(articleFolderPath, metadata.snippetsConfig)
  const snippets = enhanceSnippetsDataWithConfig(snippetsData, metadata.snippetsConfig)

  const articleHtml = getArticleHtml(articleFolderPath, snippets)
  const fsData = {
    directory: lodash.last(articleFolderPath.split(path.sep)),
    path: articleFolderPath
  }

  const article = {
    fs: fsData,
    metadata: metadata,
    snippets: snippets,
    articleHtml: articleHtml
  }

  return article
}

function getArticleHtml (articlePath, snippets) {
  // TODO: move to paths?
  const articleStaticFilesPath = '/static/articles/' // TODO

  const markdown = markdownIt({
    html: true,
    highlight: (str, language) => highlight.highlight(language, str).value
  })

  // TODO: every time we make html transformation we take html
  //       string and pass it into cheerio and create cheerio
  //       object, then make transformations and then transform
  //       back to html string. We could pass around cheerio
  //       object so creation of cheerio object and transformation
  //       to html string will be done only once
  let articleHtml = fs.readFileSync(path.join(articlePath, 'article.md'), 'utf8')
  articleHtml = markdown.render(articleHtml)
  articleHtml = utilsArticles.addIdsToHeadings(articleHtml)
  articleHtml = utilsArticles.relativeUrlToAbsolute(articleHtml, 'img', 'src', articleStaticFilesPath)

  // TODO: think about merging these two together, or at least share css selector?
  articleHtml = utilsArticles.enhanceSnippetLinks(articleHtml, snippets)
  articleHtml = utilsArticles.relativeUrlToAbsolute(articleHtml, 'a[href^="./snippets/"]', 'href', articleStaticFilesPath)

  articleHtml = htmlMinifier.minify(articleHtml, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeRedundantAttributes: true,
    sortAttributes: true,
    sortClassName: true
  })

  return articleHtml
}

function getSnippetsData (articlePath) {
  const snippetsDir = path.join(articlePath, '/snippets')
  const snippets = []

  let snippetFiles = []
  try {
    // TOOD: better way to do this than try catch?
    snippetFiles = fs.readdirSync(snippetsDir) // TODO: sync function
  } catch (e) {
    return snippets
  }

  for (const fileName of snippetFiles) {
    const isFile = fs.statSync(path.join(snippetsDir, fileName)).isFile() // TODO: sync function
    if (!isFile) continue

    const extension = path.extname(fileName)
    if (extension !== '.html') continue

    const snippetName = lodash.trimEnd(fileName, extension)
    const snippetPath = path.join(snippetsDir, fileName)
    const html = fs.readFileSync(snippetPath, 'utf8') // TODO: sync function

    const snippetMetadata = {
      name: snippetName,
      path: snippetPath,
      filename: fileName
    }
    const snippetData = utilsArticles.parseSnippet(html)
    const snippet = Object.assign(
      {},
      snippetMetadata,
      snippetData
    )

    snippets.push(snippet)
  }

  return snippets
}

function enhanceSnippetsDataWithConfig (snippetsData, snippetsConfig) {
  const defaultConfig = {
    inlineSnippet: false
  }

  const snippets = snippetsData.map(snippet => {
    const config = Object.assign({}, defaultConfig, snippetsConfig[snippet.name])
    snippet.config = config

    return snippet
  })

  return snippets
}

module.exports = {
  debugGetPathByArticleName,
  getArticlesDirectories,
  getArticleData
}
