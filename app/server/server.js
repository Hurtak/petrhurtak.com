'use strict'; // TODO: ??

// TODO: its already called in gulp file, why do i need to call it twice??
var pe = require('pretty-error').start();
pe.skipNodeFiles(); // this will skip events.js and http.js and similar core node files
pe.skipPackage('express'); // this will skip all the trace lines about express` core and sub-

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

var paths = require('./paths.js');
var articles = require('./articles.js');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', paths.app.templates);

app.use('/node_modules', express.static(paths.nodeModules));
app.use('/', express.static(paths.app.public));

// article images
app.get('/articles/*/*/*/images/*.png', function(req, res) {
    res.sendFile(path.join(paths.appDirectory, req.originalUrl));
});

app.get('/debug', function(req, res) {
    // get all metadata.json files
    var metadata = articles.getArticlesMetadata(paths.app.articles, 'metadata.json');

    // remove articles with visibility == 0
    for (var article in metadata) {
        if (!metadata[article].visible) {
            delete metadata[article];
        }
    }

    // sort articles by publication_date descendant
    articles.sortObjectBy(metadata, 'publication_date');

    res.render(path.join(paths.app.templates, 'index.html'), {
        articles: metadata
    });
});

// display article from file system instead from database
app.get('/debug/:article', function(req, res) {
    var articleName = req.params.article;

    var articlePath = articles.findPathToArticleDirectoryByArticleName(paths.app.articles, articleName, 2);
    if (!articlePath) {
        res.render(path.join(paths.app.templates, '404.html'));
    } else {
        var data = JSON.parse(fs.readFileSync(articlePath + '/metadata.json', 'utf8'));
        var article = fs.readFileSync(articlePath + '/article.html', 'utf8');

        res.render(path.join(paths.app.templates, 'article.html'), {
            title: data.title,
            date: data.publication_date,
            article: article
        });
    }
});

// main page
app.get('/', function(req, res) {

    db.query('SELECT * FROM articles WHERE visible = 1 ORDER BY publication_date DESC LIMIT 10',
    function(err, rows, fields) {
        if (err) throw err;

        res.render(
            path.join(paths.app.templates, 'index.html'),
            {
                title: 'Všechny články',
                articles: rows
            }
        );

    });

});

// article
app.get('/:article', function(req, res) {
    var query = [
        'SELECT id, title, directory, publication_date',
        'FROM articles',
        'WHERE visible = 1',
        'AND url = ?'
    ].join(' ');
    db.query(query, [req.params.article], function(err, rows, fields) {
        if (err) throw err;

        if (!rows.length) {
            res.render(path.join(paths.app.templates, '404.html'));
        } else {
            var template = {
                title: rows[0].title,
                date: rows[0].publication_date,
                article: fs.readFileSync(path.join(paths.app.articles, rows[0].directory, 'article.html'), 'utf8')
            };

            res.render(path.join(paths.app.templates, 'article.html'), template);
        }
    });

});

var port = 8000;
var server = app.listen(port, function() {

});
