import path from 'path';

import paths from '../server/paths.js';
import * as articles from '../server/articles.js';
import * as database from '../server/database.js';

function getDirectoryDate(directoryPath) {
    return directoryPath
        .split(path.sep)
        .filter(dir => dir && dir == Number(dir))
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
    let allArticlesUrls = [];
    const articlesDirectories = articles.getArticlesDirectories(paths.articles, 2);
    articlesDirectories.reverse();

    for (let articleDirectory of articlesDirectories) {
        const articleUrl = articleDirectory.split(path.sep).reverse()[0];

        const data = articles.parseArticle(path.join(articleDirectory, 'article.md'));
        const metadata = data.metadata;
        const articleContent = data.html;

        if (!isDirectoryNameCorrect(metadata.publication_date, articleDirectory)) {
            return;
        }

        allArticlesUrls.push(articleUrl);

        let directoryNameDb = getDirectoryDate(articleDirectory).join('/');

        let dbData = [
            metadata.title,
            metadata.description,
            articleUrl,
            directoryNameDb,
            metadata.publication_date,
            metadata.last_update,
            metadata.visible
        ];

        const articleId = await database.getIdByArticleUrl(articleUrl);

        if (articleId === null) { // new article which is not in db
            let dbResponse = await database.insertArticleMetadata(dbData);
            await database.insertArticleContent([dbResponse.insertId, articleContent]);
            console.log(`${ metadata.publication_date.toLocaleDateString('cs') } article ${ articleUrl } INSERTED.`);
        } else {
            await database.updateArticleMetadata(dbData.concat(articleId.id));
            await database.updateArticleContent([articleContent, articleId.id]);
            console.log(`${ metadata.publication_date.toLocaleDateString('cs') } article ${ articleUrl } updated.`);
        }
    };

    // delete all articles except the ones in article directory
    var deletedArticles = await database.deleteArticles(allArticlesUrls);

    if (deletedArticles.affectedRows > 0) {
        console.log(`${ deleteArticles.affectedRows } articles, which were not in articles directory, deleted from db.`);
    };

    process.exit();
}
