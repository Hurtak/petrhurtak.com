import express from 'express';
const app = express();

import path from 'path';
import url from 'url';
import fs from 'fs';

import swig from 'swig';

import markdownIt from 'markdown-it';
import frontMatter from 'front-matter';

import * as paths from './paths.js';
import * as articles from './articles.js';
import * as database from './database.js';

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
    let metadata = articles.getArticlesMetadata(paths.articles, 'article.md');

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

    let articlePath = articles.findPathToArticleDirectoryByArticleName(paths.articles, articleName, 2);
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

        const markdown = markdownIt();
        const result = markdown.render(articleContent);

        res.render(path.join(paths.app.templates, 'article.html'), {
            title: metadata.title,
            date: metadata.publication_date,
            article: result
        });
    }
});

// main page
app.get('/', async function(req, res) {
    let articles = await database.getAtricles();

    res.render(
        path.join(paths.app.templates, 'index.html'),
        {articles: articles}
    );
});

// article
app.get('/:article', async function(req, res) {
    let article = await database.getAtricle(req.params.article);

    if (article) {
        res.render(path.join(paths.app.templates, 'article.html'), {
            title: article.title,
            date: article.publication_date,
            article: article.content
        });
    } else {
        // TODO: function for displaying 404
        res.render(path.join(paths.app.templates, '404.html'));
    }
});

const server = app.listen(8000, function() {});
