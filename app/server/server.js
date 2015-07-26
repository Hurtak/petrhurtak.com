import express from 'express';
const app = express();

import path from 'path';
import url from 'url';
import fs from 'fs';

import swig from 'swig';

import markdownIt from 'markdown-it';
const markdown = markdownIt()
import frontMatter from 'front-matter';

import mysql from 'mysql';
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
    let metadata = articles.getArticlesMetadata(paths.app.articles, 'article.md');

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
        let data = frontMatter(fs.readFileSync(articlePath + '/article.md', 'utf8'));
        let metadata = data.attributes;

        let articleContent = data.body;

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

        let result = markdown.render(articleContent);

        res.render(path.join(paths.app.templates, 'article.html'), {
            title: metadata.title,
            date: metadata.publication_date,
            article: result
        });
    }
});

// main page
app.get('/', function(req, res) {
    db.query(`
        SELECT *
        FROM articles
        WHERE visible = 1
        ORDER BY publication_date
        DESC LIMIT 10`,
    function(err, rows) {
        if (err) throw err;

        res.render(
            path.join(paths.app.templates, 'index.html'),
            {articles: rows}
        );
    });
});

// article
app.get('/:article', function(req, res) {
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
        AND url = ?`;

    db.query(query, [req.params.article], function(err, rows, fields) {
        if (err) throw err;

        if (!rows.length) {
            // TODO: function for displaying 404
            res.render(path.join(paths.app.templates, '404.html'));
        } else {
            res.render(path.join(paths.app.templates, 'article.html'), {
                title: rows[0].title,
                date: rows[0].publication_date,
                article: rows[0].content
            });
        }
    });
});

const port = 8000;
const server = app.listen(port, function() {

});
