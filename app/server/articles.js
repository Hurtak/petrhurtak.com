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

        if (currentDepth + 1 > searchedDepth) continue;

        var result = findPathToArticleDirectoryByArticleName(filePath, articleName, searchedDepth, currentDepth + 1);
        if (result) return result;
    }

    return false;
}

var getArticlesMetadata = function(directory, filename, gatheredMetadata) {
    gatheredMetadata = gatheredMetadata || [];

    var list = fs.readdirSync(directory);
    for (var i = 0; i < list.length; i++) {
        var filePath = path.join(directory, list[i]);
        var isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
            gatheredMetadata = getArticlesMetadata(filePath, filename, gatheredMetadata);
        } else if (list[i] === filename) {
            gatheredMetadata.push(JSON.parse(fs.readFileSync(filePath, 'utf8')));
        }
    }

    return gatheredMetadata;
};

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

module.exports = {
    findPathToArticleDirectoryByArticleName: findPathToArticleDirectoryByArticleName,
    getArticlesMetadata: getArticlesMetadata,
    sortObjectBy: sortObjectBy
};
