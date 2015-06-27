/* eslint-disable strict */
'use strict';

var path = require('path');
var fs = require('fs');

var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    database: 'hurtak_blog',
    user: 'root',
    password: ''
});

var paths = require('../paths.js');
var articles = require(path.join(paths.app.server, 'articles.js'));

var articlesDirectories = articles.getArticlesDirectories(paths.app.articles, 2);

var urls = [];

for (var i = 0; i < articlesDirectories.length; i++) {
    (function(i) {
        var articleName = articlesDirectories[i].split(path.sep).reverse()[0];
        var metadataFilePath = path.join(articlesDirectories[i], 'metadata.json');

        fs.readFile(metadataFilePath, 'utf-8', function(err, data) {
            if (err) throw err;

            data = JSON.parse(data);

            var publicationDate = new Date(data.publication_date);
            var publicationYear = publicationDate.getFullYear();
            var publicationMonth = publicationDate.getMonth() + 1;

            var directoryDate = articlesDirectories[i].split(path.sep);
            var directoryYear = directoryDate[directoryDate.length - 3];
            var directoryMonth = directoryDate[directoryDate.length - 2];

            if (publicationYear != directoryYear || publicationMonth != directoryMonth) {
                throw new Error('publication_date in metadata.json is dirrefent from year or month directory ' + metadataFilePath);
            }

            var query = [
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

            var url = [directoryYear, directoryMonth, articleName].join('/');
            urls.push(url);

            var dbData = [
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
                    var deleteQuery = [
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
