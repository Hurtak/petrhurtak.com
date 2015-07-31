import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    database: 'hurtak_blog',
    user: 'root',
    password: ''
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

export function saveArticles(params) {
    const query = `
        INSERT INTO articles
            (title, description, url, directory, publication_date, last_update, visible)
        VALUES
            (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            description = VALUES(description),
            url = VALUES(url),
            directory = VALUES(directory),
            publication_date = VALUES(publication_date),
            last_update = VALUES(last_update),
            visible = VALUES(visible)
    `;

    return dbPromiseFactory(query, params);
}

export function saveArticleContent(params) {
    const query = `
        INSERT INTO articles_content
            (article_id, content)
        VALUES
            (?, ?)
        ON DUPLICATE KEY UPDATE
            article_id = VALUES(article_id),
            content = VALUES(content)
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
