import fs from 'fs';
import url from 'url';
import path from 'path';

import markdownIt from 'markdown-it';
import frontMatter from 'front-matter';

import * as articles from './articles.js';
import * as database from './database.js';
import * as paths from './paths.js';

export async function index(req, res) {
    try {
        const articles = await database.getAtricles();

        res.render(
            path.join(paths.app.templates, 'index.html'),
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
            res.render(path.join(paths.app.templates, 'article.html'), {
                title: article.title,
                date: article.publication_date,
                article: article.content
            });
        } else {
            // TODO: function for displaying 404
            res.render(path.join(paths.app.templates, '404.html'));
        }
    } catch(e) {
        console.log(e);
    }
}

export function debug(req, res) {
    // get all metadata.json files
    let metadata = articles.getArticlesMetadata(paths.articles, 'article.md');
    console.log('metadata ', metadata);

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
}

export function debugArticle(req, res) {
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
            (whole, first, second, third) => {
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
}
