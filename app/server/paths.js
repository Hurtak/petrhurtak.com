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

const appDirectory = path.join(__dirname, '../');

// paths relative to app directory
const paths = {
	root: '../',

	articles: '../articles',
	nodeModules: '../node_modules',

	config: './config',
	server: './server',
	public: './public',
	fonts: './public/fonts',
	icons: './public/icons',
	images: './public/images',
	scripts: './public/scripts',
	styles: './public/styles',
	templates: './templates'
};

joinPathsInObject(paths, appDirectory);

export default paths;
