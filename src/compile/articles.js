'use strict'

const fs = require('fs-promise')
const path = require('path')

const lodash = require('lodash')
const yaml = require('js-yaml')
const markdownIt = require('markdown-it')
const highlight = require('highlight.js')

const utilsArticles = require('./utils/articles.js')
const paths = require('./paths.js')

function getPathByArticleName (directory, articleUrl) {
  const directoryItems = fs.readdirSync(directory)

  for (const directoryItem of directoryItems) {
    const fullPath = path.join(directory, directoryItem)
    const isDirectory = fs.statSync(fullPath).isDirectory()

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

function getArticles (postsDirectory, draftsDirectory, nunjucks) {
  // TODO: once async/await lands, make this more concurrent

  const articlesData = []

  for (const directoryItem of fs.readdirSync(postsDirectory)) {
    const fullPath = path.join(postsDirectory, directoryItem)
    if (fullPath === draftsDirectory) continue

    const isDirectory = fs.statSync(fullPath).isDirectory()
    if (!isDirectory) continue

    articlesData.push(getArticleData(fullPath, true, nunjucks))
  }

  for (const directoryItem of fs.readdirSync(draftsDirectory)) {
    const fullPath = path.join(draftsDirectory, directoryItem)
    const isDirectory = fs.statSync(fullPath).isDirectory()
    if (!isDirectory) continue

    articlesData.push(getArticleData(fullPath, false, nunjucks))
  }

  return articlesData
}

function getArticleData (articleFolderPath, isPublished, nunjucks) {
  const metadataPath = path.join(articleFolderPath, paths.articleMetadata)
  const metadataContent = fs.readFileSync(metadataPath, 'utf8')
  const metadata = Object.assign(
    yaml.safeLoad(metadataContent),
    { published: isPublished }
  )

  const snippetsData = getSnippetsData(articleFolderPath, metadata.url, metadata.snippetsConfig)
  const snippets = enhanceSnippetsDataWithConfig(snippetsData)

  const articleHtml = getArticleHtml(articleFolderPath, snippets, nunjucks)
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

function getArticleHtml (articlePath, snippets, nunjucks) {
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
  let articleHtml = fs.readFileSync(path.join(articlePath, paths.articleMarkdown), 'utf8')
  articleHtml = markdown.render(articleHtml)
  articleHtml = utilsArticles.addIdsToHeadings(articleHtml)
  articleHtml = utilsArticles.enhanceSnippetLinks(articleHtml, snippets, nunjucks)

  return articleHtml
}

function getSnippetsData (articlePath, articleFolder, config) {
  const snippetsDir = path.join(articlePath, paths.articleSnippets)
  const snippets = []

  let snippetFiles = []
  try {
    // TOOD: better way to do this than try catch?
    snippetFiles = fs.readdirSync(snippetsDir)
  } catch (e) {
    return snippets
  }

  for (const fileName of snippetFiles) {
    const isFile = fs.statSync(path.join(snippetsDir, fileName)).isFile()
    if (!isFile) continue

    const extension = path.extname(fileName)
    if (extension !== '.html') continue

    const snippetName = lodash.trimEnd(fileName, extension)
    const snippetPath = path.join(snippetsDir, fileName)
    const html = fs.readFileSync(snippetPath, 'utf8')

    const snippet = {
      metadata: {
        name: snippetName,
        path: snippetPath,
        base: `/${articleFolder}/${paths.articleSnippets}/`,
        fileName: fileName
      },
      content: utilsArticles.parseSnippet(html),
      config: config
    }

    snippets.push(snippet)
  }

  return snippets
}

function enhanceSnippetsDataWithConfig (snippetsData) {
  const defaultConfig = {
    inlineSnippet: false
  }

  const snippets = snippetsData.map(snippet => {
    const config = Object.assign(
      {},
      defaultConfig,
      snippet.config[snippet.metadata.name]
    )
    snippet.config = config

    return snippet
  })

  return snippets
}

module.exports = {
  getArticles,
  getPathByArticleName,
  getArticleData
}
