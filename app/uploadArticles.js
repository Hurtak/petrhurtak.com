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

var appDir = __dirname + '/';

var paths = {
    nodeModules: '../node_modules',
    public: 'public',
    fonts: 'public/fonts',
    images: 'public/images',
    scripts: 'public/scripts',
    styles: 'public/styles',
    templates: 'templates',
    articles: 'articles'
};

for (var key in paths) {
    paths[key] = path.join(appDir, paths[key]);
}

var articlesDirectories = fs.readdirSync(paths.articles);

var articles = [];

for (var i = 0; i < articlesDirectories.length; i++) {
    articles[i] = {};
    articles[i].dir = path.join(paths.articles, articlesDirectories[i]);

    var directoryData = articlesDirectories[i].split('-');
    articles[i].id = directoryData[0].replace(/^0+/, '');

    directoryData.shift();
    articles[i].url = directoryData.join('-');

    var articleData = JSON.parse(fs.readFileSync(articles[i].dir + '/data.json', 'utf8'));
    for (key in articleData) {
        articles[i][key] = articleData[key]
    }

};

// delete articles from DB
db.query('DELETE FROM articles', function(err, result) {
    if (err) throw err;

    for (var i = 0; i < articles.length; i++) {
        db.query(
            'INSERT INTO articles (id, title, preview, url, publication_date, last_update, visible) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                articles[i].id,
                articles[i].title,
                articles[i].preview,
                articles[i].url,
                articles[i].publication_date,
                articles[i].last_update,
                articles[i].visible
            ],
            function(err, result) {
                if (err) throw err;

                console.log('article [' + result.insertId + '] succesfully inserted into db.')
            }
        );
    };

});

