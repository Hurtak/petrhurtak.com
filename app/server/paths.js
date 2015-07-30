import path from 'path';

function joinPathsInObject(object, rootDirectory) {
    for (let key in object) {
        if (typeof object[key] === 'object') {
            joinPathsInObject(object[key], rootDirectory);
        } else {
            object[key] = path.join(rootDirectory, object[key]);
        }
    }
}

const rootDirectory = path.join(__dirname, '../../');

const paths = { // paths relative to root directory
    articles: './articles',
    nodeModules: './node_modules',
    gulpfile: './gulpfile.js',

    appDirectory: './app',
    app: {
        server: './app/server',
        public: './app/public',
            fonts: './app/public/fonts',
            icons: './app/public/icons',
            images: './app/public/images',
            scripts: './app/public/scripts',
            styles: './app/public/styles',
        templates: './app/templates'
    },

    distDirectory: './dist',
    dist: {
        server: './dist/server',
        public: './dist/public',
            fonts: './dist/public/fonts',
            icons: './dist/public/icons',
            images: './dist/public/images',
            scripts: './dist/public/scripts',
            styles: './dist/public/styles',
        templates: './dist/templates'
    }
};

joinPathsInObject(paths, rootDirectory);

export default paths;
