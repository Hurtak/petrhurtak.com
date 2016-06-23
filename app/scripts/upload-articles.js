'use strict'

const path = require('path')

const paths = require('../src/server/paths.js')
const articles = require('../src/server/articles.js')
const database = require('../src/server/database.js')

function getDirectoryDate (directoryPath) {
  return directoryPath
    .split(path.sep)
    .filter(dir => dir)
    .map(Number)
    .filter(dir => !Number.isNaN(dir))
}

function isDirectoryNameCorrect (metadataDate, directoryName) {
  const publicationDate = new Date(metadataDate)
  const publicationYear = publicationDate.getFullYear()
  const publicationMonth = publicationDate.getMonth() + 1

  const [directoryYear, directoryMonth] = getDirectoryDate(directoryName)

  if (publicationYear !== directoryYear || publicationMonth !== directoryMonth) {
    console.error(`publication_date in article.md yaml header is different from year or month directory ${ directoryName }`)
    return false
  }

  return true
}

function uploadArticles () {
  let allArticlesUrls = []

  const articlesDirectories = articles.getArticlesDirectories(paths.articles, 2)
  articlesDirectories.reverse()

  for (let articleDirectory of articlesDirectories) {
    const articleUrl = articleDirectory.split(path.sep).reverse()[0]

    const data = articles.parseArticle(path.join(articleDirectory, 'article.md'))
    const metadata = data.metadata
    const articleContent = data.html

    if (!isDirectoryNameCorrect(metadata.publication_date, articleDirectory)) {
      return
    }

    allArticlesUrls.push(articleUrl)

    let directoryNameDb = getDirectoryDate(articleDirectory).join('/')

    let dbData = [
      metadata.title,
      metadata.description,
      articleUrl,
      directoryNameDb,
      metadata.publication_date,
      metadata.last_update,
      metadata.visible
    ]

    database.getIdByArticleUrl(articleUrl).then(articleId => {
      if (articleId === null) { // new article which is not in db
        database.insertArticleMetadata(dbData).then(dbResponse => {
          database.insertArticleContent([dbResponse.insertId, articleContent]).then(() => {
            console.log(`${ metadata.publication_date.toLocaleDateString('cs') } article ${ articleUrl } INSERTED.`)
          })
        })
      } else {
        database.updateArticleMetadata([...dbData, articleId.id]).then(() => {
          database.updateArticleContent([articleContent, articleId.id]).then(() => {
            console.log(`${ metadata.publication_date.toLocaleDateString('cs') } article ${ articleUrl } updated.`)
          })
        })
      }
    })
  }

  // delete all articles except the ones in article directory
  database.deleteArticles(allArticlesUrls).then(deletedArticles => {
    if (deletedArticles.affectedRows > 0) {
      console.log(`${ deletedArticles.affectedRows } articles, which were not in articles directory, deleted from db.`)
    }
  })
}

uploadArticles()
