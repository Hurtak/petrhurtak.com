import PrettyError from 'pretty-error';
var error = new PrettyError();
error.skipNodeFiles();
error.skipPackage('gulp', 'express', 'babel', 'babel-core', 'run-sequence');
error.start();

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
        path: './dist/server/index.js'
    },
    revReplace: {
        modifyReved: function(filename) {
            while (filename.startsWith('../')) { filename = '/' + filename.substr(3); }
            return filename;
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
        ['clear:dist', 'lint:js', 'enviroment:development'],
        ['compile:client', 'compile:server', 'compile:config', 'images', 'fonts'],
        ['server:start', 'livereload:listen'],
        ['watch:client', 'watch:server', 'watch:articles']
    );
});

gulp.task('production', () => {
    runSequence(
        ['clear:dist', 'enviroment:production'],
        ['compile:client', 'compile:server', 'compile:config', 'images', 'fonts']
    );
});

gulp.task('database:dev', () => {
    runSequence(
        ['clear:dist', 'enviroment:development'],
        ['compile:server', 'compile:config', 'compile:scripts'],
        ['scripts:run']
    );
});

gulp.task('database:production', () => {
    runSequence(
        ['clear:dist', 'enviroment:production'],
        ['compile:server', 'compile:config', 'compile:scripts'],
        ['scripts:run']
    );
});

gulp.task('scripts:run', () => {
    require('./dist/scripts/upload-articles.js')();
});

// Other tasks

gulp.task('compile:client', () => {
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

gulp.task('lint:js', () => {
    return gulp.src([ './app/scripts/**', './app/server/**', './gulpfile.babel.js' ])
        .pipe($.eslint())
        .pipe($.eslint.format());
        // .pipe($.eslint.failOnError());
});

gulp.task('clear:dist', () => del('./dist/**'));
gulp.task('compile:server', () => compileBabelJs('./app/server/**', './dist/server'));
gulp.task('compile:scripts', () => compileBabelJs('./app/scripts/**', './dist/scripts'));
gulp.task('compile:config', () => compileBabelJs('./app/config/**', './dist/config'));
gulp.task('images', () => copy('./app/public/images/**', './dist/public/images'));
gulp.task('fonts', () => copy('./app/public/fonts/**', './dist/public/fonts'));
gulp.task('livereload:listen', (cb) => { $.livereload.listen(); cb(); });
gulp.task('livereload:reload', (cb) => { $.livereload.reload(); cb(); });
gulp.task('watch:server', watch('./app/server/**', 'compile:server', 'server:restart'));
gulp.task('watch:client', watch(['./app/public/**', './app/templates/**'], 'compile:client'));
gulp.task('watch:articles', watch('./articles/**'));

gulp.task('server:start', (cb) => {
    $.developServer.listen(config.server, error => {
        if (error) { console.log(error); } else { cb(); }
    });
});

gulp.task('server:restart', (cb) => {
    $.developServer.restart(error => {
        if (error) { console.log(error); } else { cb(); }
    });
});

gulp.task('enviroment:production', () => { $.env({vars: { NODE_ENV: 'production' }}); });
gulp.task('enviroment:development', () => { $.env({vars: { NODE_ENV: 'development' }}); });

// Helper functions

function watch(target, ...tasks) {
    $.watch([].concat(target), () => runSequence(...tasks, 'livereload:reload'));
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
