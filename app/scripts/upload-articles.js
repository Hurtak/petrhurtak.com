'use strict'

require('../src/server/debug.js')()
const paths = require('../src/server/paths.js')
const articles = require('../src/server/articles.js')
const database = require('../src/server/database.js')

function uploadArticles () {
  const allArticlesUrls = []

  const articleDirectories = articles.getArticlesDirectories(paths.articles)

  for (const articlePath of articleDirectories) {
    const article = articles.getArticleData(articlePath)
    allArticlesUrls.push(article.metadata.url)

    let dbData = [
      article.metadata.title,
      article.metadata.description,
      article.metadata.url,
      article.fs.directory,
      article.metadata.date.publication,
      article.metadata.date.lastUpdate,
      article.metadata.published
    ]

    database.getIdByArticleUrl(article.metadata.url).then(res => {
      const date = new Date(article.metadata.date.publication).toLocaleDateString('cs')
      let articleId = res ? res.id : null

      if (res === null) { // new article which is not in db
        database.insertArticleMetadata(dbData).then(dbResponse => {
          // inserted aticle id: dbResponse.insertId
          articleId = dbResponse.insertId

          console.log(`${date} | article ${article.metadata.url} | metadata INSERTED.`)

          // TODO: check if article html exists?
          database.insertArticleHtml([dbResponse.insertId, article.articleHtml]).then(dbResponse => {
            console.log(`${date} | article ${article.metadata.url} | html INSERTED.`)
          })
        })
      } else {
        database.updateArticleMetadata([...dbData, res.id]).then(() => {
          console.log(`${date} | article ${article.metadata.url} | metadata updated.`)

          // TODO: check if article html exists?
          database.updateArticleHtml([article.articleHtml, res.id]).then(dbResponse => {
            console.log(`${date} | article ${article.metadata.url} | html updated.`)
          })
        })
      }

      database.deleteSnippets().then(() => {
        for (const snippetName in article.snippets) {
          const snippet = article.snippets[snippetName]
          database.insertSnippet([
            articleId,
            snippetName,
            snippet.config.inlineSnippet,
            snippet.head,
            snippet.html,
            snippet.css,
            snippet.js
          ]).then(() => {
            console.log(`${date} | article ${article.metadata.url} | snippet ${snippet.name} INSERTED.`)
          })
        }
      })
    })
  }

  // delete all articles except the ones in article directory
  database.deleteArticles(allArticlesUrls).then(deletedArticles => {
    if (deletedArticles.affectedRows > 0) {
      console.log(`${deletedArticles.affectedRows} articles, which were not in articles directory, deleted from db.`)
      console.log(allArticlesUrls)
    } else {
      console.log('no articles deleted from db.')
    }
  })
}

database.openConnection()
uploadArticles()
