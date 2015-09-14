import fs from 'fs';
import url from 'url';
import path from 'path';

import * as articles from './articles.js';
import * as database from './database.js';
import paths from './paths.js';

export async function index(req, res) {
    try {
        const articles = await database.getAtricles();

        res.render(
            path.join(paths.templates, 'index.html'),
            {articles: articles}
        );
    } catch(e) {
        console.log(e);
    }
}

export async function article(req, res) {
    try {
        const article = await database.getAtricle(req.params.article);

        if (article) {
            res.render(path.join(paths.templates, 'article.html'), {
                title: article.title,
                date: article.publication_date,
                article: article.content
            });
        } else {
            // TODO: function for displaying 404
            res.render(path.join(paths.templates, '404.html'));
        }
    } catch(e) {
        console.log(e);
    }
}

export function debug(req, res) {
    // get all metadata from article.md files
    let metadata = articles.getArticlesMetadata(paths.articles, 'article.md');

    // sort articles by publication_date descendant
    articles.sortObjectBy(metadata, 'publication_date');

    res.render(path.join(paths.templates, 'index.html'), {
        articles: metadata,
        debugUrlPrefix: 'debug/'
    });
}

export function debugArticle(req, res) {
    let articleName = req.params.article;

    let articlePath = articles.findPathToArticle(paths.articles, articleName, 2);
    if (!articlePath) {
        res.render(path.join(paths.templates, '404.html'));
    } else {
        const article = articles.parseArticle(path.join(articlePath, 'article.md'));

        res.render(path.join(paths.templates, 'article.html'), {
            title: article.metadata.title,
            date: article.metadata.publication_date,
            article: article.html
        });
    }
}
