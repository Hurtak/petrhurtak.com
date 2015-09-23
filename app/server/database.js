import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    database: 'hurtak_blog',
    user: 'root',
    password: '',
    multipleStatements: true
});

// factory function

function dbPromiseFactory(queryString, parameters = [], returnOneResults = false) {
    parameters = Array.isArray(parameters) ? parameters : [parameters];

    return new Promise((resolve, reject) => {
        db.query(queryString, parameters, (err, rows) => {
            if (err) {
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
            description
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

export function insertArticle(params) {
    const query = `
        INSERT INTO articles
            (title, description, url, directory, publication_date, last_update, visible)
        VALUES
            (?, ?, ?, ?, ?, ?, ?);

        INSERT INTO articles_content
            (article_id, content)
        VALUES
            (LAST_INSERT_ID(), ?);
    `;

    return dbPromiseFactory(query, params);
}

export function updateArticle(params) {
    const query = `
        UPDATE articles
        SET title = ?,
            description = ?,
            url = ?,
            directory = ?,
            publication_date = ?,
            last_update = ?,
            visible = ?
        WHERE id = ?;

        UPDATE articles_content
        SET content = ?
        WHERE article_id = ?;
    `;

    return dbPromiseFactory(query, params);
}

export function deleteArticles(urlsJoin) {
    const query = `
        DELETE FROM articles
        WHERE url NOT IN ('${ urlsJoin }')
    `;

    return dbPromiseFactory(query);
}
