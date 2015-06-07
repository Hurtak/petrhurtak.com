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

// Paths
var appPath = 'app';
var distPath = 'dist';

var paths = require('./app/server/paths.js');

// Options

var options = {
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

// builds all files and runs from dist directory
// gulp.task('default', ['lintjs', 'compile', 'img', 'fonts', 'icons', 'audio', 'browser-sync']);

// skips building phase and runs from dist directory
// gulp.task('run', ['browser-sync']);

// runs from app directory
gulp.task('dev', function() {
    $.developServer.listen({
        path: 'app/index.js',
        env: {
            NODE_ENV: 'development'
        }
    });

    browserSync.init({
        proxy: 'localhost:8000',
        port: 8080,
        https: false,
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: false
        },
        notify: false, // The small pop-over notifications in the browser are not always needed/wanted.
        open: false // Decide which URL to open automatically when Browsersync starts. Defaults to "local" if none set. Can be true, local, external, ui, ui-external, tunnel or false
    });

    // watch for changes
    gulp.watch('app/**/*.{js,html,less}', function() {
        $.developServer.restart();
        browserSync.reload();
    });

});

gulp.task('dist', function() {
    runSequence(
        ['clear', 'lint'],
        ['scripts', 'styles', 'fonts', 'icons', 'images']
     );
});
