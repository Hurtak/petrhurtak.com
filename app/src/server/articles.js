'use strict'

const fs = require('fs-promise')
const path = require('path')

const markdownIt = require('markdown-it')
const frontMatter = require('front-matter')
const htmlMinifier = require('html-minifier')
const highlight = require('highlight.js')

const paths = require('./paths.js')
const utilsArticles = require('./utils/articles.js')

function findPathToArticle (directory, articleName, searchedDepth, currentDepth = 0) {
  const list = fs.readdirSync(directory) // TODO: sync function

  for (const file of list) {
    const filePath = path.join(directory, file)
    const isDirectory = fs.statSync(filePath).isDirectory() // TODO: sync function

    if (!isDirectory) continue
    if (currentDepth === searchedDepth && file === articleName) return filePath
    if (currentDepth >= searchedDepth) continue

    const result = findPathToArticle(filePath, articleName, searchedDepth, currentDepth + 1)
    if (result) return result
  }

  return false
}

function getArticlesDirectories (directory, searchedDepth, currentDepth = 0, articlesList = []) {
  const list = fs.readdirSync(directory) // TODO: sync function

  for (const item of list) {
    const itemPath = path.join(directory, item)
    const isDirectory = fs.statSync(itemPath).isDirectory() // TODO: sync function

    if (!isDirectory) continue

    if (currentDepth === searchedDepth) {
      articlesList.push(itemPath)
    } else {
      getArticlesDirectories(itemPath, searchedDepth, currentDepth + 1, articlesList)
    }
  }

  return articlesList
}

function getArticle (articlePath, snippets) {
  const fileData = fs.readFileSync(path.join(articlePath, 'article.md'), 'utf8')
  const data = frontMatter(fileData)

  const metadata = data.attributes
  const html = data.body

  // c:\some\path\2015\1\article-dir -> 2015\1\article-dir
  const articleFolder = articlePath
    .replace(paths.articles, '')
    .split(path.sep)
    .filter(x => x)
    .join(path.sep)

  const articleUrl = articleFolder.split(path.sep).reverse()[0]

  // TODO: move to paths?
  const articleStaticFilesPath = '/static/articles/' + articleFolder

  // TODO: every time we make html transformation we take html
  //       string and pass it into cheerio and create cheerio
  //       object, then make transformations and then transform
  //       back to html string. We could pass around cheerio
  //       object so creation of cheerio object and transformation
  //       to html string will be done only once
  let articleHtml = html

  const markdown = markdownIt({
    html: true,
    highlight: (str, language) => highlight.highlight(language, str).value
  })

  articleHtml = markdown.render(articleHtml)
  articleHtml = utilsArticles.addIdsToHeadings(articleHtml)
  articleHtml = utilsArticles.relativeUrlToAbsolute(articleHtml, 'img', 'src', articleStaticFilesPath)

  // // TODO: think about merging these two together, or at least share css selector?
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

  return {
    title: metadata.title,
    url: articleUrl,
    directory: articleFolder,
    description: metadata.description,
    publicationDate: utilsArticles.isoStringToUtcDate(metadata.publication_date),
    lastUpdate: utilsArticles.isoStringToUtcDate(metadata.last_update),
    visible: metadata.visible,
    html: articleHtml
  }
}

function getSnippets (articlePath) {
  const snippetsDir = path.join(articlePath, '/snippets')
  let snippetFiles = []
  try {
    // TOOD: better way to do this than try catch?
    snippetFiles = fs.readdirSync(snippetsDir) // TODO: sync function;
  } catch (e) {
    return snippetFiles
  }

  const snippets = []
  for (const fileName of snippetFiles) {
    const snippetName = fileName.split('.')[0]
    const snippetPath = path.join(snippetsDir, fileName)
    const html = fs.readFileSync(snippetPath, 'utf8') // TODO: sync function

    const snippetData = utilsArticles.parseSnippet(html)
    snippetData.name = snippetName

    snippets.push(snippetData)
  }

  return snippets
}

function getArticleData (pathToArticle) {
  const snippets = getSnippets(pathToArticle)
  const article = getArticle(pathToArticle, snippets)

  return {
    article,
    snippets
  }
}

module.exports = {
  findPathToArticle,
  getArticlesDirectories,
  getArticleData
}
