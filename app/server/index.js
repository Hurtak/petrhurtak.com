'use strict';

var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

var basePath = '../'
var paths = {
    templ: path.join(__dirname, basePath, 'templ'),
    js: path.join(__dirname, basePath, 'js'),
    css: path.join(__dirname, basePath, 'css')
};

app.use('/js', express.static(paths.js));
app.use('/css', express.static(paths.css));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/another', function (req, res) {
    res.sendFile(path.join(paths.templ, 'index.html'));
});

var server = app.listen(8000, function () {
    console.log('Server started.');
});
