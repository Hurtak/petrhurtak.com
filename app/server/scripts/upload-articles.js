import path from 'path';
import url from 'url';
import fs from 'fs';

import markdownIt  from 'markdown-it';
const markdown = markdownIt();
import frontMatter from 'front-matter';

import paths from '../paths.js';
import * as articles from '../articles.js';
import * as database from '../database.js';

function isDirrectoryNameCorrect(metadataDate, directoryName, metadataFilePath) {
    let publicationDate = new Date(metadataDate);
    let publicationYear = publicationDate.getFullYear();
    let publicationMonth = publicationDate.getMonth() + 1;

    let directoryDate = directoryName.split(path.sep);
    let directoryYear = directoryDate[directoryDate.length - 3];
    let directoryMonth = directoryDate[directoryDate.length - 2];

    if (publicationYear != directoryYear || publicationMonth != directoryMonth) {
        console.error(`publication_date in article.md yaml header is dirrerent from year or month directory ${ metadataFilePath }`);
        return false;
    }

    return true;
};

export default async function uploadArticles() {
    let urls = [];

    const articlesDirectories = articles.getArticlesDirectories(paths.articles, 2);

    for (let article of articlesDirectories) {
        let articleName = article.split(path.sep).reverse()[0];

        const metadataFilePath = path.join(article, 'article.md');
        let data = fs.readFileSync(metadataFilePath, 'utf-8');
        data = frontMatter(data);

        const metadata = data.attributes;
        let articleContent = data.body;

        if (!isDirrectoryNameCorrect(metadata.publication_date, article, metadataFilePath)) return;

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
