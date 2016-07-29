'use strict'

const mysql = require('mysql')
const lodash = require('lodash')

const config = require('../config/config.js')

const db = mysql.createConnection(config.database)

// factory function

function dbPromiseFactory (queryString, params = []) {
  params = Array.isArray(params) ? params : [params]

  return new Promise((resolve, reject) => {
    db.query(queryString, params, (err, rows) => {
      if (err) {
        console.log(err)
        reject(err)
      }

      resolve(rows)
    })
  })
}

function returnOneResult (result) {
  return new Promise((resolve, reject) => {
    resolve(result.length > 0 ? result[0] : null)
  })
}

function mapToCamelCase (items) {
  return new Promise((resolve, reject) => {
    resolve(items.map(underscoreCaseObjectToCamelCase))
  })
}

function underscoreCaseObjectToCamelCase (underscoreCaseObj) {
  const camelCaseObj = {}

  for (const underscoreCasekey in underscoreCaseObj) {
    const camelCaseKey = lodash.camelCase(underscoreCasekey)
    camelCaseObj[camelCaseKey] = underscoreCaseObj[underscoreCasekey]
  }

  return camelCaseObj
}

// articles functions

function getArticles () {
  const query = `
    SELECT
      url,
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
    .then(mapToCamelCase)
}

function getArticle (articleUrl) {
  const query = `
    SELECT
      articles.id,
      title,
      publication_date,
      url,
      html
    FROM articles
    LEFT JOIN articles_html ON articles.id = articles_html.id_article
    WHERE visible = 1
    AND url = ?
  `

  return dbPromiseFactory(query, articleUrl)
    .then(mapToCamelCase)
    .then(returnOneResult)
}

function getArticleSnippets (articleId) {
  const query = `
    SELECT
      name,
      head,
      body,
      css,
      js
    FROM snippets
    WHERE id_article = ?
  `

  return dbPromiseFactory(query, articleId)
    .then(mapToCamelCase)
}

// upload articles script

function getIdByArticleUrl (articleUrl) {
  const query = `
    SELECT id
    FROM articles
    WHERE url = ?
  `
  return dbPromiseFactory(query, articleUrl)
    .then(returnOneResult)
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

function insertArticleHtml (params) {
  const query = `
    INSERT INTO articles_html
      (id_article, html)
    VALUES
      (?, ?)
  `

  return dbPromiseFactory(query, params)
}

function updateArticleHtml (params) {
  const query = `
    UPDATE articles_html
    SET html = ?
    WHERE id = ?
  `

  return dbPromiseFactory(query, params)
}

function deleteSnippets () {
  const query = `
    DELETE FROM snippets
  `

  return dbPromiseFactory(query)
}

function insertSnippet (params) {
  const query = `
    INSERT INTO snippets
      (id_article, name, head, body, css, js)
    VALUES
      (?, ?, ?, ?, ?, ?)
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
    .then(mapToCamelCase)
}

function getHumansTxt () {
  const query = `
    SELECT last_update
    FROM articles
    WHERE visible = 1
    ORDER BY last_update
    DESC LIMIT 1
  `

  return dbPromiseFactory(query, [])
    .then(mapToCamelCase)
    .then(returnOneResult)
}

const closeConnection = () => {
  db.end()
}

module.exports = {
  getArticles,
  getArticle,
  getArticleSnippets,
  getIdByArticleUrl,
  insertArticleMetadata,
  updateArticleMetadata,
  insertArticleHtml,
  updateArticleHtml,
  deleteSnippets,
  insertSnippet,
  deleteArticles,
  getRSS,
  getHumansTxt,
  closeConnection
}
