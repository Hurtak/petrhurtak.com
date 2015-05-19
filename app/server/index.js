'use strict';

var express = require('express');
var app = express();
var path = require('path');

var basePath = '../';
var paths = {
    templ: path.join(__dirname, basePath, 'templ'),
    js: path.join(__dirname, basePath, 'js'),
    css: path.join(__dirname, basePath, 'css')
};

app.set('view engine', 'ejs');

app.use('/js', express.static(paths.js));
app.use('/css', express.static(paths.css));

app.get('/', function(req, res) {
    res.render(path.join(paths.templ, 'index'), { title: 'The index page!' });
});

var server = app.listen(8000, function() {
    console.log('Server started.');
});
