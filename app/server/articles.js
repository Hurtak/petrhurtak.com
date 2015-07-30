import fs from 'fs';
import url from 'url';
import path from 'path';

import frontMatter from 'front-matter';
import markdownIt from 'markdown-it';

import * as paths from './paths.js';

export function findPathToArticle(directory, articleName, searchedDepth, currentDepth = 0) {
    let list = fs.readdirSync(directory);

    for (let file of list) {
        let filePath = path.join(directory, file);
        let isDirectory = fs.statSync(filePath).isDirectory();

        if (!isDirectory) continue;

        if (currentDepth === searchedDepth && file === articleName) return filePath;

        if (currentDepth >= searchedDepth) continue;

        let result = findPathToArticle(filePath, articleName, searchedDepth, currentDepth + 1);
        if (result) return result;
    }

    return false;
}

export function getArticlesMetadata(directory, filename, gatheredMetadata = [], baseDirectory = directory) {
    const list = fs.readdirSync(directory);
    for (const file of list) {
        const filePath = path.join(directory, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
            gatheredMetadata = getArticlesMetadata(filePath, filename, gatheredMetadata, baseDirectory);
        } else if (file === filename) {
            let articleDirectory = filePath // path to article relative to baseDirectory
                .replace(filename, '')
                .replace(baseDirectory, '');

            let metadata = frontMatter(fs.readFileSync(filePath, 'utf8')).attributes;

            metadata.directory = articleDirectory;
            metadata.url = stripSlashes(articleDirectory).split(path.sep);
            metadata.url = metadata.url[metadata.url.length - 1];
            gatheredMetadata.push(metadata);
        }
    }

    return gatheredMetadata;
}

export function getArticlesDirectories(directory, searchedDepth, currentDepth = 0, articlesList = []) {
    const list = fs.readdirSync(directory);

    for (let file of list) {
        let filePath = path.join(directory, file);
        let isDirectory = fs.statSync(filePath).isDirectory();

        if (!isDirectory) continue;

        if (currentDepth === searchedDepth) {
            articlesList.push(filePath);
        } else {
            getArticlesDirectories(filePath, searchedDepth, currentDepth + 1, articlesList);
        }
    }

    return articlesList;
}

export function parseArticle(articlePath) {
    let data = fs.readFileSync(articlePath, 'utf8');
    data = frontMatter(data);

    let metadata = data.attributes;
    let article = data.body;

    const articleDirectory =
        '/'
        + articlePath
            .replace(paths.articles, '') // c:\some\path\rootdir\article.md -> rootdir\article.md
            .split(path.sep)
            .filter(value => value) // remove empty values (\some\path creates ['', 'some', 'path'])
            .filter((value, index, array) => index !== array.length - 1) // remove filename rootdir\article.md - > rootdir
            .join('/') // use '/' instead of path.sep, because that's what we are using in templates
        + '/';

    article = article.replace(
        /(^.*!\[.*?\]\()(\.\/.*?)(\).*$)/gm,
        (whole, first, second, third) => {
            return first + url.resolve(articleDirectory, second) + third;
        }
    );

    return {
        metadata: metadata,
        html: markdownIt().render(article)
    }
}

// TODO: this should not be in this file
export function sortObjectBy(object, sortBy, ascendant) {
    object.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
            return ascendant ? -1 : 1;
        } else if (a[sortBy] > b[sortBy]) {
            return ascendant ? 1 : -1;
        }
        return 0;
    });
}

// TODO: this should not be in this file
function stripSlashes(string) {
    if (string[0] === path.sep) {
        string = string.substr(1);
    }
    if (string[string.length - 1] === path.sep) {
        string = string.slice(0, -1);
    }

    return string;
}
