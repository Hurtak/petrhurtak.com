/* eslint-disable strict */
'use strict';

const path = require('path');
const fs = require('fs');

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    database: 'hurtak_blog',
    user: 'root',
    password: ''
});

const paths = require('../paths.js');
const articles = require(path.join(paths.app.server, 'articles.js'));

const articlesDirectories = articles.getArticlesDirectories(paths.app.articles, 2);

let urls = [];

for (let i = 0; i < articlesDirectories.length; i++) {
    (function(i) {
        let articleName = articlesDirectories[i].split(path.sep).reverse()[0];
        let metadataFilePath = path.join(articlesDirectories[i], 'metadata.json');

        fs.readFile(metadataFilePath, 'utf-8', function(err, data) {
            if (err) throw err;

            data = JSON.parse(data);

            let publicationDate = new Date(data.publication_date);
            let publicationYear = publicationDate.getFullYear();
            let publicationMonth = publicationDate.getMonth() + 1;

            let directoryDate = articlesDirectories[i].split(path.sep);
            let directoryYear = directoryDate[directoryDate.length - 3];
            let directoryMonth = directoryDate[directoryDate.length - 2];

            if (publicationYear != directoryYear || publicationMonth != directoryMonth) {
                throw new Error('publication_date in metadata.json is dirrefent from year or month directory ' + metadataFilePath);
            }

            let query = [
                'INSERT INTO articles',
                    '(title, preview, url, publication_date, last_update, visible)',
                'VALUES',
                    '(?, ?, ?, ?, ?, ?)',
                'ON DUPLICATE KEY UPDATE',
                    'title = VALUES(title),',
                    'preview = VALUES(preview),',
                    'publication_date = VALUES(publication_date),',
                    'last_update = VALUES(last_update),',
                    'visible = VALUES(visible)'
            ].join(' ');

            let url = [directoryYear, directoryMonth, articleName].join('/');
            urls.push(url);

            let dbData = [
                data.title,
                data.preview,
                url,
                data.publication_date,
                data.last_update,
                data.visible
            ];

            db.query(query, dbData, function(err, result) {
                if (err) throw err;
                console.log('article "' + articleName + '" succesfully inserted into db.');

                if (i === articlesDirectories.length - 1) {
                    let deleteQuery = [
                        'DELETE FROM articles',
                        'WHERE url NOT IN (\'' + urls.join('\', \'') + '\')'
                    ].join(' ');

                    db.query(deleteQuery, function(err, result) {
                        if (err) throw err;
                        console.log('article "' + articleName + '" succesfully inserted into db.');
                    });
                }
            });
        });
    })(i);
}
