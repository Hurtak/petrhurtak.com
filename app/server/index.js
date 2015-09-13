import path from 'path';

import express from 'express';
import swig from 'swig';

import * as paths from './paths.js';
import * as pages from './pages.js';

const app = express();

// express config

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', paths.app.templates);

// static files

app.use('/', express.static(paths.app.public));
app.use('/node_modules', express.static(paths.nodeModules));
app.get('/articles/*/*/*/images/*.png', (req, res) => // article images
    res.sendFile(path.join(paths.root, req.originalUrl))
);

// dynamic pages

app.get('/', pages.index);
app.get('/debug', pages.debug);
app.get('/debug/:article', pages.debugArticle); // display articles from file system
app.get('/:article', pages.article);  // display articles from database

// start server

app.listen(8000, () => console.log('server started at port 8000'));
