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

const rootDirectory = path.join(__dirname, '../');

const paths = { // paths relative to root directory
    root: './',

    articles: '../articles',
    nodeModules: '../node_modules',

    server:    './server',
    public:    './public',
    fonts:     './public/fonts',
    icons:     './public/icons',
    images:    './public/images',
    scripts:   './public/scripts',
    styles:    './public/styles',
    templates: './templates'
};

joinPathsInObject(paths, rootDirectory);

export default paths;
