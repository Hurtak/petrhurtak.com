require('babel/register')({
    optional: ['es7.asyncFunctions']
});

require('./upload-articles.js');
