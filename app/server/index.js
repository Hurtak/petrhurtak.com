import path from 'path';

import express from 'express';
import swig from 'swig';

import paths from './paths.js';
import * as routes from './routes.js';

const app = express();

// express config

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', paths.templates);

// static files

app.use('/public', express.static(paths.public));
app.get('/articles/*/*/*/images/*.png', (req, res) => {
	res.sendFile(path.join(paths.root, req.originalUrl));
});

// dynamic pages

app.get('/', routes.index);
app.get('/debug', routes.debug);
app.get('/debug/:article', routes.debugArticle);
app.get('/:article', routes.article);

// start server

app.listen(8000, () => console.log('server started at port 8000'));
