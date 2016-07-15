'use strict'

const path = require('path')
const fs = require('fs')

require('../src/server/debug.js')()
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

const checkIfDone = (promisesRunning) => {
  promisesRunning--
  if (promisesRunning <= 0) {
    database.closeConnection()
  } else {
    return promisesRunning
  }
}

function uploadArticles () {
  let allArticlesUrls = []

  const articlesDirectories = articles.getArticlesDirectories(paths.articles, 2)
  articlesDirectories.reverse()

  let promisesRunning = articlesDirectories.length + 1 // +1 for delete articles promise

  for (let articleDirectory of articlesDirectories) {
    const articleUrl = articleDirectory.split(path.sep).reverse()[0]

    const data = articles.parseArticle(path.join(articleDirectory, 'article.md'))
    const metadata = data.metadata

    if (!isDirectoryNameCorrect(metadata.publication_date, articleDirectory)) {
      return
    }

    const articleContent = data.html
    const filename = path.join(paths.articlesCache, articleUrl + '.html')
    fs.writeFile(filename, articleContent, (err) => {
      if (err) {
        console.log(err)
      }
      console.log(`${filename} cache file written`)
    })

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
      const date = new Date(metadata.publication_date).toLocaleDateString('cs')
      if (articleId === null) { // new article which is not in db
        database.insertArticleMetadata(dbData).then(dbResponse => {
          // id: dbResponse.insertId
          console.log(`${date} article ${articleUrl} INSERTED.`)
          promisesRunning = checkIfDone(promisesRunning)
        })
      } else {
        database.updateArticleMetadata([...dbData, articleId.id]).then(() => {
          console.log(`${date} article ${articleUrl} updated.`)
          promisesRunning = checkIfDone(promisesRunning)
        })
      }
    })
  }

  // delete all articles except the ones in article directory
  database.deleteArticles(allArticlesUrls).then(deletedArticles => {
    if (deletedArticles.affectedRows > 0) {
      console.log(`${deletedArticles.affectedRows} articles, which were not in articles directory, deleted from db.`)
    } else {
      console.log('no articles deleted from db.')
    }
    promisesRunning = checkIfDone(promisesRunning)
  })
}

uploadArticles()
