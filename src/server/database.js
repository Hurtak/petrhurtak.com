import mysql from 'mysql';
import config from '../config/config.js';

const db = mysql.createConnection(config.database);

// factory function

function dbPromiseFactory(queryString, params = [], returnOneResults = false) {
  params = Array.isArray(params) ? params : [params];

  return new Promise((resolve, reject) => {
    db.query(queryString, params, (err, rows) => {
      if (err) {
        console.log('err ', err);
        reject(err);
      }

      if (returnOneResults) {
        resolve(rows.length ? rows[0] : null);
      }

      resolve(rows);
    });
  });
}

// articles functions

export function getAtricles() {
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
  `;

  return dbPromiseFactory(query);
}

export function getAtricle(article) {
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
  `;

  return dbPromiseFactory(query, article, true);
}

// upload articles script

export function getIdByArticleUrl(articleUrl) {
  const query = `SELECT id FROM articles WHERE url = ?`;
  return dbPromiseFactory(query, articleUrl, true);
}

export function insertArticleMetadata(params) {
  const query = `
    INSERT INTO articles
      (title, description, url, directory, publication_date, last_update, visible)
    VALUES
      (?, ?, ?, ?, ?, ?, ?)
  `;

  return dbPromiseFactory(query, params);
}

export function insertArticleContent(params) {
  const query = `
    INSERT INTO articles_content
      (article_id, content)
    VALUES
      (?, ?)
  `;

  return dbPromiseFactory(query, params);
}

export function updateArticleMetadata(params) {
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
  `;

  return dbPromiseFactory(query, params);
}

export function updateArticleContent(params) {
  const query = `
    UPDATE articles_content
    SET content = ?
    WHERE article_id = ?
  `;

  return dbPromiseFactory(query, params);
}

export function deleteArticles(urls) {
  urls = urls.join('\', \'');
  const query = `
    DELETE FROM articles
    WHERE url NOT IN ('${ urls }')
  `; // TODO: fix SQL injection

  return dbPromiseFactory(query);
}
