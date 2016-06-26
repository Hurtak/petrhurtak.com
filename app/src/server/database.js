'use strict'

const mysql = require('mysql')
const config = require('../config/config.js')

const db = mysql.createConnection(config.database)

// factory function

function dbPromiseFactory (queryString, params = [], returnOneResults = false) {
  params = Array.isArray(params) ? params : [params]

  return new Promise((resolve, reject) => {
    db.query(queryString, params, (err, rows) => {
      if (err) {
        console.log('err ', err)
        reject(err)
      }

      if (returnOneResults) {
        resolve(rows.length ? rows[0] : null)
      }

      resolve(rows)
    })
  })
}

// articles functions

function getAtricles () {
  const query = `
    SELECT url,
      title,
      description,
      directory,
      last_update
    FROM articles
    WHERE visible = 1
    ORDER BY publication_date
    DESC LIMIT 10
  `

  return dbPromiseFactory(query)
}

function getAtricle (articleUrl) {
  const query = `
    SELECT id,
      title,
      publication_date,
      url,
      content
    FROM articles
    LEFT JOIN articles_content
      ON articles.id = articles_content.article_id
    WHERE visible = 1
    AND url = ?
  `

  return dbPromiseFactory(query, articleUrl, true)
}

// upload articles script

function getIdByArticleUrl (articleUrl) {
  const query = `
    SELECT id
    FROM articles
    WHERE url = ?
  `
  return dbPromiseFactory(query, articleUrl, true)
}

function insertArticleMetadata (params) {
  const query = `
    INSERT INTO articles
      (title, description, url, directory, publication_date, last_update, visible)
    VALUES
      (?, ?, ?, ?, ?, ?, ?)
  `

  return dbPromiseFactory(query, params)
}

function insertArticleContent (params) {
  const query = `
    INSERT INTO articles_content
      (article_id, content)
    VALUES
      (?, ?)
  `

  return dbPromiseFactory(query, params)
}

function updateArticleMetadata (params) {
  const query = `
    UPDATE articles
    SET title = ?,
      description = ?,
      url = ?,
      directory = ?,
      publication_date = ?,
      last_update = ?,
      visible = ?
    WHERE id = ?
  `

  return dbPromiseFactory(query, params)
}

function updateArticleContent (params) {
  const query = `
    UPDATE articles_content
    SET content = ?
    WHERE article_id = ?
  `

  return dbPromiseFactory(query, params)
}

function deleteArticles (urls) {
  urls = urls.join('", "')
  const query = `
    DELETE FROM articles
    WHERE url NOT IN ("${urls}")
  ` // TODO: fix SQL injection

  return dbPromiseFactory(query)
}

function getRSS () {
  const query = `
    SELECT url,
      title,
      description,
      directory,
      publication_date
    FROM articles
    WHERE visible = 1
    ORDER BY publication_date
    DESC LIMIT 10
  `

  return dbPromiseFactory(query)
}

function getHumansTxt () {
  const query = `
    SELECT last_update
    FROM articles
    WHERE visible = 1
    ORDER BY last_update
    DESC LIMIT 1
  `

  return dbPromiseFactory(query, [], true)
}

const closeConnection = () => {
  db.end()
}

module.exports = {
  getAtricles,
  getAtricle,
  getIdByArticleUrl,
  insertArticleMetadata,
  insertArticleContent,
  updateArticleMetadata,
  updateArticleContent,
  deleteArticles,
  getRSS,
  getHumansTxt,
  closeConnection
}
