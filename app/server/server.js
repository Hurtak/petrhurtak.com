import path from 'path';
import url from 'url';
import fs from 'fs';

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
app.get('/articles/*/*/*/images/*.png', (req, res) => {
    // article images
    res.sendFile(path.join(paths.appDirectory, req.originalUrl));
});

// dynamic pages

app.get('/', pages.index);
app.get('/:article', pages.article);

app.get('/debug', pages.debug);
// display article from file system instead from database
app.get('/debug/:article', pages.debugArticle);

// start server

const server = app.listen(8000, () => {});
