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

var basePath = '../';
var paths = {
    templ: path.join(__dirname, basePath, 'templ'),
    js: path.join(__dirname, basePath, 'js'),
    css: path.join(__dirname, basePath, 'css'),
    nodeModules: path.join(__dirname, basePath, '../node_modules')
};

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use('/js', express.static(paths.js));
app.use('/css', express.static(paths.css));
app.use('/node_modules', express.static(paths.nodeModules));

app.get('/', function(req, res) {

    db.query('SELECT content FROM articles LIMIT 1', function(err, rows, fields) {
        if (err) throw err;
        var article = rows[0].content;

        var template = {
            title: 'some title',
            article: article
        };

        res.render(path.join(paths.templ, 'index.html'), template);
    });

});

var server = app.listen(8000, function() {
    console.log('Server started.');
});
