import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    database: 'hurtak_blog',
    user: 'root',
    password: ''
});

function dbPromiseFactory(queryString, parameters) {
    parameters = Array.isArray(parameters) ? parameters : [parameters];

    return new Promise(function(resolve, reject) {
        db.query(queryString, parameters, function(err, rows) {
            if (err) { reject(err); }

            var result = rows.length > 1 ? rows : rows[0];
            resolve(result);
        });
    });
}

export function getAtricles() {
    const query = `
        SELECT *
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

    return dbPromiseFactory(query, article);
}
