/* eslint-disable strict */
'use strict';

var express = require('express');
var app = express();

var path = require('path');
var fs = require('fs');

var swig = require('swig');

var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    database: 'hurtak_blog',
    user: 'root',
    password: ''
});

var appDir = __dirname;

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

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', paths.templates);

app.use('/node_modules', express.static(paths.nodeModules));
app.use('/', express.static(paths.public));

app.get('/test', function(req, res) {
    var data = JSON.parse(fs.readFileSync('app/article/metadata.json', 'utf8'));
    var article = fs.readFileSync('app/article/article.html', 'utf8');

    res.render(path.join(paths.templates, 'article.html'), {
        title: data.title,
        date: data.publication_date,
        article: article
    });

});

app.get('/', function(req, res) {

    db.query('SELECT * FROM articles WHERE visible = 1 ORDER BY publication_date DESC LIMIT 10',
    function(err, rows, fields) {
        if (err) throw err;

        var template = {
            title: 'Všechny články',
            articles: rows
        };

        for (var i = 0; i < template.articles.length; i++) {
            var article = template.articles;
            var id = String(article[i].id);
            while (id.length < 4) {
                id = '0' + id;
            }
            article[i].includePath = path.join(paths.articles, id + '-' + article[i].url, 'article.html');
        }

        res.render(path.join(paths.templates, 'index.html'), template);

    });

});

var server = app.listen(8000, function() {
    console.log('Server started.');
});
