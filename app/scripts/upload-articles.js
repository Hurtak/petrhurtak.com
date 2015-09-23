import path from 'path';
import url from 'url';
import fs from 'fs';

import markdownIt  from 'markdown-it';
const markdown = markdownIt();
import frontMatter from 'front-matter';

import paths from '../server/paths.js';
import * as articles from '../server/articles.js';
import * as database from '../server/database.js';

function getDirectoryDate(directoryPath) {
    return directoryPath
        .split(path.sep)
        .filter(dir => dir == Number(dir))
}

function isDirectoryNameCorrect(metadataDate, directoryName) {
    const publicationDate = new Date(metadataDate);
    const publicationYear = publicationDate.getFullYear();
    const publicationMonth = publicationDate.getMonth() + 1;

    const directoryDate = getDirectoryDate(directoryName);
    const directoryYear = directoryDate[0];
    const directoryMonth = directoryDate[1];

    if (publicationYear != directoryYear || publicationMonth != directoryMonth) {
        console.error(`publication_date in article.md yaml header is different from year or month directory ${ directoryName }`);
        return false;
    }

    return true;
}

export default async function uploadArticles() {
    let urls = [];
    const articlesDirectories = articles.getArticlesDirectories(paths.articles, 2);

    for (let articleDirectory of articlesDirectories) {
        const articleUrl = articleDirectory.split(path.sep).reverse()[0];

        const data = articles.parseArticle(path.join(articleDirectory, 'article.md'));
        const metadata = data.metadata;
        const articleContent = data.html;

        if (!isDirectoryNameCorrect(metadata.publication_date, articleDirectory)) {
            return;
        }

        urls.push(articleUrl);

        let directoryNameDb = getDirectoryDate(articleDirectory).join('/');

        try {
            var articleId = await database.getIdByArticleUrl(articleUrl);
            if (articleId === null) {
                let dbData = [
                    metadata.title,
                    metadata.description,
                    articleUrl,
                    directoryNameDb,
                    metadata.publication_date,
                    metadata.last_update,
                    metadata.visible,
                    articleContent
                ];
                await database.insertArticle(dbData);
                console.log('article "' + articleUrl + '" succesfully inserted into db.');
            } else {
                let dbData = [
                    metadata.title,
                    metadata.description,
                    articleUrl,
                    directoryNameDb,
                    metadata.publication_date,
                    metadata.last_update,
                    metadata.visible,
                    articleId.id,
                    articleContent,
                    articleId.id
                ];
                console.log('dbData ' , dbData);

                await database.updateArticle(articleUrl);
                console.log('article "' + articleUrl + '" succesfully updated in db.');
            }
        } catch (e) {
            console.log('e ' , e);
        }

    };

    const urlsJoin = urls.join('\', \'');

    var deleteArticles = await database.deleteArticles(urlsJoin);
    if (deleteArticles.affectedRows > 0) {
        console.log(`${ deleteArticles.affectedRows } articles, which were not in articles directory, deleted from db.`);
    };

    process.exit();
}
