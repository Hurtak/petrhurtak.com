// directory name je url
// když nebude sedět 'publication_date' s yyyy directory a mm directory, thow error

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

var requiredFiles = ['article.html', 'metadata.json', 'thumbnail.png'];
var articlesDirectories = articles.getArticlesDirectories(paths.app.articles, 2);

for (var i = 0; i < articlesDirectories.length; i++) {
    var metadataFilePath = path.join(articlesDirectories[i], 'metadata.json');

    (function(i) {
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

            // http://stackoverflow.com/questions/15383852/sql-if-exists-update-else-insert-into

            // INSERT INTO articles
            //     (title, preview, url, publication_date, last_update, visible)
            // VALUES
            //     (?, ?, ?, ?, ?, ?)
            // ON DUPLICATE KEY UPDATE
            //     title = VALUES(title),
            //     preview = VALUES(preview),
            //     publication_date = VALUES(publication_date),
            //     last_update = VALUES(last_update),
            //     visible = VALUES(visible)


        });
    })(i);


}


// // delete articles from DB
// db.query('DELETE FROM articles', function(err, result) {
//     if (err) throw err;

//     var query = [
//         'INSERT INTO articles (id, title, preview, url, publication_date, last_update, visible)',
//         'VALUES (?, ?, ?, ?, ?, ?, ?)'
//     ].join(' ');

//     for (var i = 0; i < articles.length; i++) {
//         db.query(query, [
//             articles[i].id,
//             articles[i].title,
//             articles[i].preview,
//             articles[i].url,
//             articles[i].publication_date,
//             articles[i].last_update,
//             articles[i].visible
//         ], function(err, result) {
//             if (err) throw err;

//             console.log('article [' + result.insertId + '] succesfully inserted into db.')
//         });
//     };

// });

