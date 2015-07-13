// TODO: its already called in gulp file, why do i need to call it twice??
const pe = require('pretty-error').start();
pe.skipNodeFiles(); // this will skip events.js and http.js and similar core node files
pe.skipPackage('express'); // this will skip all the trace lines about express` core and sub-

const express = require('express');
const app = express();

const path = require('path');
const url = require('url');
const fs = require('fs');

const swig = require('swig');

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    database: 'hurtak_blog',
    user: 'root',
    password: ''
});

import * as paths from './paths.js';
import * as articles from './articles.js';

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
    let metadata = articles.getArticlesMetadata(paths.app.articles, 'metadata.json');

    // remove articles with visibility == 0
    for (let article in metadata) {
        if (!metadata[article].visible) {
            delete metadata[article];
        }
    }

    // sort articles by publication_date descendant
    articles.sortObjectBy(metadata, 'publication_date');

    res.render(path.join(paths.app.templates, 'index.html'), {
        articles: metadata,
        debugUrlPrefix: 'debug/'
    });
});

// display article from file system instead from database
app.get('/debug/:article', function(req, res) {
    let articleName = req.params.article;

    let articlePath = articles.findPathToArticleDirectoryByArticleName(paths.app.articles, articleName, 2);
    if (!articlePath) {
        res.render(path.join(paths.app.templates, '404.html'));
    } else {
        let data = JSON.parse(fs.readFileSync(articlePath + '/metadata.json', 'utf8'));

        let articleContent = fs.readFileSync(path.join(articlePath, 'article.md'), 'utf8');

        articlePath = articlePath
            .replace(paths.appDirectory, '')
            .split(path.sep).join('/');
        articlePath += '/';

        articleContent = articleContent.replace(
            /(^.*!\[.*?\]\()(\.\/.*?)(\).*$)/gm,
            function(whole, first, second, third) {
                return first + url.resolve(articlePath, second) + third;
            }
        );

        let md = require('markdown-it')();
        let result = md.render(articleContent);

        res.render(path.join(paths.app.templates, 'article.html'), {
            title: data.title,
            date: data.publication_date,
            article: result
        });
    }
});

// main page
app.get('/', function(req, res) {
    db.query('SELECT * FROM articles WHERE visible = 1 ORDER BY publication_date DESC LIMIT 10',
    function(err, rows) {
        if (err) throw err;

        res.render(
            path.join(paths.app.templates, 'index.html'),
            {
                articles: rows
            }
        );
    });
});

// article
app.get('/:article', function(req, res) {
    let query = `
        SELECT id,
            title,
            publication_date,
            url,
            YEAR(publication_date) AS year,
            LPAD(MONTH(publication_date), 2, 0) AS month
        FROM articles
        WHERE visible = 1
        AND url = ?`;

    db.query(query, [req.params.article], function(err, rows, fields) {
        if (err) throw err;

        if (!rows.length) {
            // TODO: function for displaying 404
            res.render(path.join(paths.app.templates, '404.html'));
        } else {
            let articlePath = path.join(
                paths.app.articles,
                String(rows[0].year),
                String(rows[0].month),
                rows[0].url
            );

            fs.readFile(path.join(articlePath, 'article.md'), function(err, data) {
                if (err) {
                    // TODO: this should not happen, make a log
                    res.render(path.join(paths.app.templates, '404.html'));
                    return;
                }

                let article = swig.compileFile(path.join(articlePath, 'article.md'));

                articlePath = articlePath
                    .replace(paths.appDirectory, '')
                    .split(path.sep).join('/');
                article = article({articlePath: articlePath + '/'});

                res.render(path.join(paths.app.templates, 'article.html'), {
                    title: rows[0].title,
                    date: rows[0].publication_date,
                    article: article
                });
            });
        }
    });
});

let port = 8000;
let server = app.listen(port, function() {

});
