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

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', paths.app.templates);

app.use('/node_modules', express.static(paths.nodeModules));
app.use('/', express.static(paths.app.public));

// article images
app.get('/articles/*/*/*/images/*.png', function(req, res) {
    res.sendFile(path.join(paths.appDirectory, req.originalUrl));
});

var findPathToArticleDirectoryByArticleName = function(directory, articleName, searchedDepth, currentDepth) {
    currentDepth = currentDepth || 0;

    var list = fs.readdirSync(directory);

    for (var i = 0; i < list.length; i++) {
        var filePath = path.join(directory, list[i]);
        var isDirectory = fs.statSync(filePath).isDirectory();

        if (!isDirectory) continue;

        if (currentDepth === searchedDepth && list[i] === articleName) {
            return filePath;
        }

        if (currentDepth + 1 > searchedDepth) continue;

        var result = findPathToArticleDirectoryByArticleName(filePath, articleName, searchedDepth, currentDepth + 1);
        if (result) return result;
    }

    return false;
};

var getArticlesMetadata = function(directory, filename, gatheredMetadata) {
    gatheredMetadata = gatheredMetadata || [];

    var list = fs.readdirSync(directory);
    for (var i = 0; i < list.length; i++) {
        var filePath = path.join(directory, list[i]);
        var isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
            gatheredMetadata = getArticlesMetadata(filePath, filename, gatheredMetadata);
        } else if (list[i] === filename) {
            gatheredMetadata.push(JSON.parse(fs.readFileSync(filePath, 'utf8')));
        }
    }

    return gatheredMetadata;
};

var sortObjectBy = function(object, sortBy, ascendant) {
    object.sort(function(a, b) {
        if (a[sortBy] < b[sortBy]) {
            return ascendant ? -1 : 1;
        } else if (a[sortBy] > b[sortBy]) {
            return ascendant ? 1 : -1;
        }
        return 0;
    });
};

app.get('/debug', function(req, res) {
    // get all metadata.json files
    var metadata = getArticlesMetadata(paths.app.articles, 'metadata.json');

    // remove articles with visibility == 0
    for (var article in metadata) {
        if (!metadata[article].visible) {
            delete metadata[article];
        }
    }

    // sort articles by publication_date descendant
    sortObjectBy(metadata, 'publication_date');

    res.render(path.join(paths.app.templates, 'index.html'), {
        articles: metadata
    });
});

// display article from file system instead from database
app.get('/debug/:article', function(req, res) {
    var articleName = req.params.article;

    var articlePath = findPathToArticleDirectoryByArticleName(paths.app.articles, articleName, 2);
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
        'SELECT articles.id, title, publication_date, content',
        'FROM articles',
        'LEFT JOIN articles_content',
        'ON articles.id = articles_content.article_id',
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
                article: rows[0].content
            };

            res.render(path.join(paths.app.templates, 'article.html'), template);
        }
    });

});

var port = 8000;
var server = app.listen(port, function() {

});
