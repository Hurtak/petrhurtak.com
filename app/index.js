/* eslint-disable strict */
'use strict';

var express = require('express');
var app = express();

var path = require('path');

var ejs = require('ejs');

var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    database: 'hurtak_blog',
    user: 'root',
    password: ''
});

var appDir = __dirname + '/';

var paths = {
    nodeModules: '../node_modules',
    public: 'public',
    fonts: 'public/fonts',
    images: 'public/images',
    scripts: 'public/scripts',
    styles: 'public/styles',
    templates: 'templates',
    articles: 'articles'
};

for (var key in paths) {
    paths[key] = path.join(appDir, paths[key]);
}

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use('/js', express.static(paths.scripts));
app.use('/css', express.static(paths.styles));
app.use('/node_modules', express.static(paths.nodeModules));

app.get('/', function(req, res) {

    db.query('SELECT * FROM articles WHERE visible = 1 ORDER BY publication_date DESC LIMIT 10',
    function(err, rows, fields) {
        if (err) throw err;

        var template = {
            title: 'some title',
            articles: rows
        };

        res.render(path.join(paths.templates, 'index.html'), template);
    });

});

var server = app.listen(8000, function() {
    console.log('Server started.');
});
