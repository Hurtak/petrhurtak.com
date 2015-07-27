import path from 'path';
import url from 'url';
import fs from 'fs';

import mysql from 'mysql';
const db = mysql.createConnection({
    host: 'localhost',
    database: 'hurtak_blog',
    user: 'root',
    password: ''
});

import paths from '../paths.js';
const articles = require(path.join(paths.app.server, 'articles.js'));

import markdownIt  from 'markdown-it';
const markdown = markdownIt();
import frontMatter from 'front-matter';

const articlesDirectories = articles.getArticlesDirectories(paths.app.articles, 2);

let urls = [];

for (let i = 0; i < articlesDirectories.length; i++) {
    (function(i) {
        let articleName = articlesDirectories[i].split(path.sep).reverse()[0];
        let metadataFilePath = path.join(articlesDirectories[i], 'article.md');

        fs.readFile(metadataFilePath, 'utf-8', function(err, data) {
            if (err) throw err;

            data = frontMatter(data);
            const metadata = data.attributes;
            let articleContent = data.body;

            let publicationDate = new Date(metadata.publication_date);
            let publicationYear = publicationDate.getFullYear();
            let publicationMonth = publicationDate.getMonth() + 1;

            let directoryDate = articlesDirectories[i].split(path.sep);
            let directoryYear = directoryDate[directoryDate.length - 3];
            let directoryMonth = directoryDate[directoryDate.length - 2];

            if (publicationYear != directoryYear || publicationMonth != directoryMonth) {
                throw new Error('publication_date in article.md yaml header is dirrerent from year or month directory ' + metadataFilePath);
            }

            const query = `
                INSERT INTO articles
                    (title, description, url, directory, publication_date, last_update, visible)
                VALUES
                    (?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    title = VALUES(title),
                    description = VALUES(description),
                    url = VALUES(url),
                    directory = VALUES(directory),
                    publication_date = VALUES(publication_date),
                    last_update = VALUES(last_update),
                    visible = VALUES(visible)`;

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

            db.query(query, dbData, function(err, result) {
                if (err) throw err;
                console.log('article "' + articleName + '" metadata succesfully inserted into db.');

                let query = `
                    INSERT INTO articles_content
                        (article_id, content)
                    VALUES
                        (?, ?)
                    ON DUPLICATE KEY UPDATE
                        article_id = VALUES(article_id),
                        content = VALUES(content)`;

                let articlePath = articlesDirectories[i]
                    .replace(paths.appDirectory, '')
                    .split(path.sep).join('/');
                articlePath += '/';

                articleContent = articleContent.replace(
                    /(^.*!\[.*?\]\()(\.\/.*?)(\).*$)/gm,
                    function(whole, first, second, third) {
                        return first + url.resolve(articlePath, second) + third;
                    }
                );

                let dbData = [
                    result.insertId,
                    articleContent
                ];
                console.log('dbData ' , dbData);

                db.query(query, dbData, function(err, result) {
                    if (err) throw err;
                    console.log('article "' + articleName + '" content succesfully inserted into db.');

                    if (i === articlesDirectories.length - 1) {
                        var urlsJoin = urls.join('\', \'');
                        console.log('urlsJoin ' , urlsJoin);
                        let deleteQuery = `
                            DELETE FROM articles
                            WHERE url NOT IN ('${ urlsJoin }')`;

                        db.query(deleteQuery, function(err, result) {
                            if (err) throw err;
                            console.log('article "' + articleName + '" deleted from db.');
                        });
                    }
                });
            });
        });
    })(i);
}
