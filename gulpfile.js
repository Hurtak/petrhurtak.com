/* eslint-disable strict, global-strict */
'use strict';

var pe = require('pretty-error').start();
pe.skipNodeFiles(); // this will skip events.js and http.js and similar core node files
pe.skipPackage('express', 'gulp'); // this will skip all the trace lines about express` core and sub-modules

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

var del = require('del');
var path = require('path');

var paths = require('./app/server/paths.js');

// Options

var options = {
    server: {
        path: path.join(paths.app.server, 'server.js'),
        env: {
            NODE_ENV: 'development'
        }
        // , execArgv: ['--harmony']
    },
    browserSync: {
        proxy: 'http://localhost:8000', // where server is running
        port: 3000, // where browser sync is running
        // https: false,
        // ghostMode: {
        //     clicks: false,
        //     forms: false,
        //     scroll: false
        // },
        notify: true, // The small pop-over notifications in the browser are not always needed/wanted.
        open: false // Decide which URL to open automatically when Browsersync starts. Defaults to "local" if none set. Can be true, local, external, ui, ui-external, tunnel or false
    },
    autoprefixer: {
        browsers: [
            '> 2%',
            'last 2 versions',
            'Firefox ESR',
            'ie >= 9'
        ],
        cascade: false
    },
    htmlmin: {
        removeComments: true,
        collapseWhitespace: true
    },
    imagemin: {
        progressive: true,
        svgoPlugins: [
            {removeViewBox: false}
        ],
        use: []
    }
};

// linters

gulp.task('lint', function() {
    return gulp.src([
        paths.app.scripts + '/**',
        paths.app.server + '/**',
        paths.gulpfile
    ])
        .pipe($.eslint())
        .pipe($.eslint.format());
        // .pipe($.eslint.failOnError());
});

// clear

gulp.task('clear', function() {
    return del([
        paths.distDirectory + '/*'
    ]);
});

// compile

gulp.task('compile', function() {
    var assets = $.useref.assets();

    return gulp.src(paths.app.html)
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.autoprefixer(options.autoprefixer)))
        .pipe($.if('*.css', $.csso()))
        .pipe($.rev())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe($.if('*.html', $.htmlmin(options.htmlmin)))
        .pipe(gulp.dest(paths.distDirectory));
});

gulp.task('scripts', function() {
    return gulp.src(paths.app.scripts + '/**')
        // .pipe($.imagemin(options.imagemin))
        .pipe(gulp.dest(paths.dist.scripts));
});

gulp.task('styles', function() {
    return gulp.src(paths.app.styles + '/**')
        // .pipe($.imagemin(options.imagemin))
        .pipe(gulp.dest(paths.dist.styles));
});

// Images

gulp.task('images', ['images:public', 'images:articles']);

gulp.task('images:public', function() {
    var src = [
        paths.app.images + '/**'
    ];

    return gulp.src(src)
        // .pipe($.imagemin(options.imagemin))
        .pipe(gulp.dest(paths.dist.images));
});

gulp.task('images:articles', function() {
    var src = [
        paths.app.articles + '/*/article.png',
        paths.app.articles + '/*/images/*.{png,jpg,jpeg,gif,bmp}'
    ];

    return gulp.src(src)
        // .pipe($.imagemin(options.imagemin))
        .pipe(gulp.dest(paths.dist.articles));
});

// Templates

gulp.task('templates', ['templates:server', 'templates:articles']);

gulp.task('templates:server', function() {
    var src = [
        paths.app.templates + '/**'
    ];

    return gulp.src(src)
        .pipe(gulp.dest(paths.dist.templates));
});

gulp.task('templates:articles', function() {
    var src = [
        paths.app.articles + '/*/article.{html,json}'
    ];

    return gulp.src(src)
        .pipe(gulp.dest(paths.dist.articles));
});

gulp.task('fonts', function() {
    return gulp.src(paths.app.fonts + '/**')
        // .pipe($.flatten())
        .pipe(gulp.dest(paths.dist.fonts));
});

gulp.task('icons', function() {
    return gulp.src(paths.app.icons + '/**')
        .pipe(gulp.dest(paths.dist.icons));
});

// Main gulp tasks

gulp.task('server:start', function() {
    $.developServer.listen(options.server, function(error) {
        if (error) throw error;
        browserSync(options.browserSync);
    });
});

// If server scripts change, restart the server and then browser-reload.
gulp.task('server:restart', function() {
    $.developServer.restart(function(error) {
        if (error) throw error;
        browserSync.reload();
    });
});

// runs from app directory
gulp.task('dev', ['server:start'], function() {
    $.watch([
        paths.appDirectory + '/**'
    ], function() {
        runSequence(
            ['server:restart']
        );
    });
});

gulp.task('dist', function() {
    runSequence(
        ['clear', 'lint'],
        ['scripts', 'styles', 'fonts', 'icons', 'images']
    );
});
