'use strict'

const path = require('path')

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
    console.error(`publicationDate in article.md yaml header is different from year or month directory ${directoryName}`)
    return false
  }

  return true
}

function uploadArticles () {
  let allArticlesUrls = []

  const articlesDirectories = articles.getArticlesDirectories(paths.articles, 2)
  articlesDirectories.reverse()

  for (const articleDirectory of articlesDirectories) {
    const data = articles.getArticleData(articleDirectory)

    if (!isDirectoryNameCorrect(data.article.publicationDate, articleDirectory)) {
      return
    }

    allArticlesUrls.push(data.article.url)

    let dbData = [
      data.article.title,
      data.article.description,
      data.article.url,
      data.article.directory,
      data.article.publicationDate,
      data.article.lastUpdate,
      data.article.visible
    ]

    database.getIdByArticleUrl(data.article.url).then(res => {
      const date = new Date(data.article.publicationDate).toLocaleDateString('cs')
      let articleId = res ? res.id : null

      if (res === null) { // new article which is not in db
        database.insertArticleMetadata(dbData).then(dbResponse => {
          // inserted aticle id: dbResponse.insertId
          articleId = dbResponse.insertId

          console.log(`${date} | article ${data.article.url} | metadata INSERTED.`)

          // TODO: check if article html exists?
          database.insertArticleHtml([dbResponse.insertId, data.article.html]).then(dbResponse => {
            console.log(`${date} | article ${data.article.url} | html INSERTED.`)
          })
        })
      } else {
        database.updateArticleMetadata([...dbData, res.id]).then(() => {
          console.log(`${date} | article ${data.article.url} | metadata updated.`)

          // TODO: check if article html exists?
          database.updateArticleHtml([data.article.html, res.id]).then(dbResponse => {
            console.log(`${date} | article ${data.article.url} | html updated.`)
          })
        })
      }

      database.deleteSnippets().then((x) => {
        for (const key in data.snippets) {
          database.insertSnippet([
            articleId,
            key,
            data.snippets[key].head,
            data.snippets[key].html,
            data.snippets[key].css,
            data.snippets[key].js
          ]).then(() => {
            console.log(`${date} | article ${data.article.url} | snippet ${key} INSERTED.`)
          })
        }
      })
    })
  }

  // delete all articles except the ones in article directory
  database.deleteArticles(allArticlesUrls).then(deletedArticles => {
    if (deletedArticles.affectedRows > 0) {
      console.log(`${deletedArticles.affectedRows} articles, which were not in articles directory, deleted from db.`)
    } else {
      console.log('no articles deleted from db.')
    }
  })
}

uploadArticles()
