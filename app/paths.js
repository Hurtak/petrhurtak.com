var path = require('path');

var appDirectory = __dirname;
var distDirectory = path.join(__dirname, '../dist');

function joinPathsInObject(object, joinDirectory) {
    for (var key in object) {
        object[key] = path.join(joinDirectory, object[key]);
    }
}

var paths = {
    appDirectory: appDirectory,
    distDirectory: distDirectory,

    app: {
        articles: 'articles',
        public: 'public',
            fonts: 'public/fonts',
            icons: 'public/icons',
            images: 'public/images',
            scripts: 'public/scripts',
            styles: 'public/styles',
        templates: 'templates',
        server: '*.js'
    },
    dist: {
        articles: 'articles',
        public: 'public',
            fonts: 'public/fonts',
            icons: 'public/icons',
            images: 'public/images',
            scripts: 'public/scripts',
            styles: 'public/styles',
        templates: 'templates'
    },

    nodeModules: '../node_modules',
    gulpfile: '../gulpfile.js'
};

for (var key in paths) {
    if (key === 'app') {
        joinPathsInObject(paths[key], appDirectory);
    } else if (key === 'dist') {
        joinPathsInObject(paths[key], distDirectory);
    } else {
        paths[key] = path.join(appDirectory, paths[key]);
    }
}

module.exports = paths;
