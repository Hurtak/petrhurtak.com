/* eslint-disable strict, global-strict */
'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var del = require('del');

// Paths
var appPath = 'app';
var distPath = 'dist';

var paths = {
    app: {
        public: appPath + '/public/**/*',
        templates: appPath + '/**/*.{html,htm}',
        scripts: appPath + '/public/scripts/**/*.js',
        styles: appPath + '/public/styles/**/*.css',
        images: appPath + '/public/img/**/*',
        fonts: appPath + '/public/fonts/*.{eot,svg,ttf,woff}',
        icons: appPath + '/public/icons/*',
        audio: appPath + '/public/audio/*'
    },
    dist: {
        fonts: distPath + '/fonts',
        icons: distPath + '/icons',
        audio: distPath + '/audio',
        imgages: distPath + '/img'
    }
};

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
    return gulp.src('app/**/*.js')
        .pipe($.eslint())
        .pipe($.eslint.format());
});

// clean

gulp.task('clean', function() {
    del([
        distPath + '/*'
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
        .pipe(gulp.dest(distPath));
});

gulp.task('img', function() {
    return gulp.src(paths.app.img)
            // .pipe($.imagemin(options.imagemin))
            .pipe(gulp.dest(paths.dist.img));
});

gulp.task('fonts', function() {
    return gulp.src(paths.app.fonts)
        // .pipe($.flatten())
        .pipe(gulp.dest(paths.dist.fonts));
});

gulp.task('icons', function() {
    return gulp.src(paths.app.icons)
        .pipe(gulp.dest(paths.dist.icons));
});

// Browser sync

gulp.task('browser-sync', function() {
    return browserSync({
        server: {
            baseDir: distPath,
            index: 'index.html'
        },
        browser: 'chrome'
    });
});

gulp.task('browser-sync-dev', function() {
    return browserSync({
        server: {
            baseDir: appPath,
            index: 'index.js'
        },
        browser: 'chrome'
    });
});

// run server
gulp.task('server:start', function() {
    $.developServer.listen({path: 'app/index.js'});
});

// restart server
gulp.task('server:restart', function() {
    $.developServer.restart();
});

// Main gulp tasks

// builds all files and runs from dist directory
gulp.task('default', ['lintjs', 'compile', 'img', 'fonts', 'icons', 'audio', 'browser-sync']);

// skips building phase and runs from dist directory
gulp.task('run', ['browser-sync']);

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
            clicks: true,
            forms: true,
            scroll: true
        },
        notify: false, // The small pop-over notifications in the browser are not always needed/wanted.
        open: false // Decide which URL to open automatically when Browsersync starts. Defaults to "local" if none set. Can be true, local, external, ui, ui-external, tunnel or false
    });

    // watch for changes

    // gulp.watch(paths.app.scripts, ['lint', browserSync.reload]);
    gulp.watch(paths.app.public, browserSync.reload);
    // gulp.watch('app/*.js', browserSync.reload);

});
