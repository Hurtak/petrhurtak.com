var fs = require('fs');
var path = require('path');

var findPathToArticleDirectoryByArticleName = function(directory, articleName, searchedDepth, currentDepth) {
    currentDepth = currentDepth || 0;

    var list = fs.readdirSync(directory);

    for (var i = 0; i < list.length; i++) {
        var filePath = path.join(directory, list[i]);
        var isDirectory = fs.statSync(filePath).isDirectory();

        if (!isDirectory) continue;

        if (currentDepth === searchedDepth && list[i] === articleName) {
            return filePath;
        }

        if (currentDepth >= searchedDepth) continue;

        var result = findPathToArticleDirectoryByArticleName(filePath, articleName, searchedDepth, currentDepth + 1);
        if (result) return result;
    }

    return false;
};

var getArticlesMetadata = function(directory, filename, gatheredMetadata, baseDirectory) {
    gatheredMetadata = gatheredMetadata || [];
    baseDirectory = baseDirectory || directory;

    var list = fs.readdirSync(directory);
    for (var i = 0; i < list.length; i++) {
        var filePath = path.join(directory, list[i]);
        var isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
            gatheredMetadata = getArticlesMetadata(filePath, filename, gatheredMetadata, baseDirectory);
        } else if (list[i] === filename) {
            var articleDirectory = filePath // path to article relative to baseDirectory
                .replace(filename, '')
                .replace(baseDirectory, '')

            var metadata = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            metadata.directory = articleDirectory;
            metadata.url = stripSlashes(articleDirectory).split(path.sep);
            metadata.url = metadata.url[metadata.url.length - 1]
            gatheredMetadata.push(metadata);
        }
    }

    return gatheredMetadata;
};

var getArticlesDirectories = function(directory, searchedDepth, currentDepth, articlesList) {
    currentDepth = currentDepth || 0;
    articlesList = articlesList || [];

    var list = fs.readdirSync(directory);

    for (var i = 0; i < list.length; i++) {
        var filePath = path.join(directory, list[i]);
        var isDirectory = fs.statSync(filePath).isDirectory();

        if (!isDirectory) continue;

        if (currentDepth === searchedDepth) {
            articlesList.push(filePath);
        } else {
            getArticlesDirectories(filePath, searchedDepth, currentDepth + 1, articlesList);
        }
    }

    return articlesList;
};

// TODO: this should not be in this file
var sortObjectBy = function(object, sortBy, ascendant) {
    object.sort(function(a, b) {
        if (a[sortBy] < b[sortBy]) {
            return ascendant ? -1 : 1;
        } else if (a[sortBy] > b[sortBy]) {
            return ascendant ? 1 : -1;
        }
        return 0;
    });
};

// TODO: this should not be in this file
var stripSlashes = function(string) {
    if (string[0] === path.sep) {
        string = string.substr(1);
    }
    if (string[string.length - 1] === path.sep) {
        string = string.slice(0, -1);
    }

    return string;
};

module.exports = {
    findPathToArticleDirectoryByArticleName: findPathToArticleDirectoryByArticleName,
    getArticlesMetadata: getArticlesMetadata,
    getArticlesDirectories: getArticlesDirectories,
    sortObjectBy: sortObjectBy
};
