import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

import del from 'del';

// Options

const options = {
    babel: {
        optional: [
            'runtime',
            'es7.asyncFunctions'
        ]
    },
    server: {
        path: './app/server/index.js',
        env: {
            NODE_ENV: 'development'
        }
        // , execArgv: ['--harmony']
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
        collapseWhitespace: true,
        preserveLineBreaks: true
    },
    imagemin: {
        progressive: true,
        svgoPlugins: [
            {removeViewBox: false}
        ],
        use: []
    }
};

// Main tasks

gulp.task('dev', () => {
    runSequence(
        ['clear:dist', 'lint:js'],
        ['compile:client', 'compile:server', 'compile:scripts', 'images', 'fonts'],
        ['watch:js']
    );
});

gulp.task('clear:dist', () => del('./dist/**'));
gulp.task('compile:server', () => compileBabelJs('./app/server/**', './dist/server'));
gulp.task('compile:scripts', () => compileBabelJs('./app/scripts/**', './dist/scripts'));
gulp.task('images', () => copy('./app/public/images/**', './dist/public/images'));
gulp.task('fonts', () => copy('./app/public/fonts/**', './dist/public/fonts'));

gulp.task('compile:client', function() {
    let assets = $.useref.assets();
    var less = require('gulp-less'); // TODO: $.less doesn't work for some reason
    return gulp.src('./app/templates/**/*.html')
        .pipe(assets)
        .pipe($.if('*.css', less()))
        .pipe($.if('*.css', $.size({title: 'css'})))
        .pipe($.if('*.js', $.size({title: 'js'})))
        .pipe($.rev()) // adds hash to the end of filename (styles.css -> styles-971a5eb6.css)
        .pipe(assets.restore())
        .pipe($.useref())
        // .pipe($.revReplace())
        .pipe($.if('*.html', $.htmlmin(options.htmlmin)))
        .pipe($.if('*.html', $.size({title: 'html'})))
        .pipe($.size())
        .pipe(gulp.dest('./dist/templates'));
});

// linters

gulp.task('lint:js', () => {
    return gulp.src([
            './app/scripts/**',
            './app/server/**',
            './gulpfile.babel.js'
        ])
        .pipe($.eslint())
        .pipe($.eslint.format());
        // .pipe($.eslint.failOnError());
});

gulp.task('server:start', () => {
    $.developServer.listen(options.server, error => {
        if (error) return;
    });
});

gulp.task('watch', ['server:start'], () => {
    $.livereload.listen();
    const watch = [
        paths.appDirectory + '/**'
    ];

    $.watch(watch, () => {
        $.developServer.restart(error => {
            if (error) return;
            $.livereload();
        });
    });
});

function compileBabelJs(origin, destination) {
    return gulp.src([].concat(origin))
        .pipe($.sourcemaps.init())
        .pipe($.babel(options.babel))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(destination));
}

function copy(origin, destination) {
    return gulp.src([].concat(origin))
        .pipe(gulp.dest(destination));
}
