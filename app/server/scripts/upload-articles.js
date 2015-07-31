import path from 'path';
import url from 'url';
import fs from 'fs';

import markdownIt  from 'markdown-it';
const markdown = markdownIt();
import frontMatter from 'front-matter';

import paths from '../paths.js';
import * as articles from '../articles.js';
import * as database from '../database.js';

export default async function uploadArticles() {
    let urls = [];

    const articlesDirectories = articles.getArticlesDirectories(paths.articles, 2);

    for (let article of articlesDirectories) {
        let articleName = article.split(path.sep).reverse()[0];

        let data = fs.readFileSync(path.join(article, 'article.md'), 'utf-8');
        data = frontMatter(data);

        const metadata = data.attributes;
        let articleContent = data.body;

        let publicationDate = new Date(metadata.publication_date);
        let publicationYear = publicationDate.getFullYear();
        let publicationMonth = publicationDate.getMonth() + 1;

        let directoryDate = article.split(path.sep);
        let directoryYear = directoryDate[directoryDate.length - 3];
        let directoryMonth = directoryDate[directoryDate.length - 2];

        if (publicationYear != directoryYear || publicationMonth != directoryMonth) {
            throw new Error('publication_date in article.md yaml header is dirrerent from year or month directory ' + metadataFilePath);
        }

        urls.push(articleName);

        let dbData = [
            metadata.title,
            metadata.description,
            articleName,
            directoryYear + '/' +  directoryMonth,
            metadata.publication_date,
            metadata.last_update,
            metadata.visible
        ];

        await database.saveArticles(dbData);

        console.log('article "' + articleName + '" metadata succesfully inserted into db.');

        let articlePath = article
            .replace(paths.appDirectory, '')
            .split(path.sep).join('/');
        articlePath += '/';

        articleContent = articleContent.replace(
            /(^.*!\[.*?\]\()(\.\/.*?)(\).*$)/gm,
            function(whole, first, second, third) {
                return first + url.resolve(articlePath, second) + third;
            }
        );

        dbData = [
            result.insertId,
            articleContent
        ];

        await database.saveArticleContent(dbData);

        console.log('article "' + articleName + '" content succesfully inserted into db.');

    };

    var urlsJoin = urls.join('\', \'');

    await database.deleteArticles(urlsJoin);

    console.log('articles not in FS deleted from db.');
}

uploadArticles();
