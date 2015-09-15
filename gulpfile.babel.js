import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

import runSequence from 'run-sequence';

import del from 'del';

// Config

const config = {
    babel: {
        optional: [
            'runtime',
            'es7.asyncFunctions'
        ]
    },
    server: {
        path: './dist/server/index.js',
        // env: { NODE_ENV: 'development' }
        // , execArgv: ['--harmony']
    },
    revReplace: {
        modifyReved: function(filename) {
            while (filename.startsWith('../')) { filename = filename.substr(3); }
            return filename
        }
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
        ['server:start', 'livereload:listen'],
        ['watch:client', 'watch:server', 'watch:scripts', 'watch:articles']
    );
});

gulp.task('clear:dist', () => del('./dist/**'));
gulp.task('compile:server', () => compileBabelJs('./app/server/**', './dist/server'));
gulp.task('compile:scripts', () => compileBabelJs('./app/scripts/**', './dist/scripts'));
gulp.task('images', () => copy('./app/public/images/**', './dist/public/images'));
gulp.task('fonts', () => copy('./app/public/fonts/**', './dist/public/fonts'));

gulp.task('compile:client', function() {
    const assets = $.useref.assets();
    const less = require('gulp-less'); // TODO: $.less doesn't work for some reason

    return gulp.src('./app/templates/**/*.html')
        .pipe(assets)
        .pipe($.if('*.css', less()))
        .pipe($.if('*.css', $.size({title: 'css'})))
        .pipe($.if('*.js', $.size({title: 'js'})))
        .pipe($.rev()) // adds hash to the end of filename (styles.css -> styles-971a5eb6.css)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace(config.revReplace))
        .pipe($.if('*.html', $.htmlmin(config.htmlmin)))
        .pipe($.if('*.html', $.size({title: 'html'})))
        .pipe($.size())
        .pipe(gulp.dest('./dist/templates'));
});

gulp.task('watch:server', watch('./app/server', 'compile:server'));
gulp.task('watch:client', watch(['./app/public/**', './app/templates/**'], 'compile:client'));
gulp.task('watch:scripts', watch('./app/script/**', 'compile:scripts'));
gulp.task('watch:articles', watch('./articles/**'));

// Other tasks

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

gulp.task('server:start', (cb) => {
    $.developServer.listen(config.server, error => {
        if (error) { console.log(error); return; }
        cb();
    });
});

gulp.task('livereload:listen', (cb) => {
    $.livereload.listen();
    cb();
});

gulp.task('livereload:reload', (cb) => {
    $.livereload.reload();
    cb();
});

// Helper functions

function watch(target, tasks) {
    $.watch([].concat(target), () => runSequence(tasks, 'livereload:reload'));
}

function compileBabelJs(origin, destination) {
    return gulp.src([].concat(origin))
        .pipe($.sourcemaps.init())
        .pipe($.babel(config.babel))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(destination));
}

function copy(origin, destination) {
    return gulp.src([].concat(origin))
        .pipe(gulp.dest(destination));
}
