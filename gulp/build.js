var gulp = require('gulp'),
    minifyCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('./rename'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint')

var stylePath = 'server/stats/style.json';
var jsPath = 'server/stats/js.json';

// 压缩js, css
gulp.task('minifyCss', function() {
    return gulp.src('server/public/css/*')
        .pipe(minifyCss({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            separator: '-',
            size: 8,
            outMap: stylePath
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('minifyJs', function() {
    return gulp.src('server/public/js/*')
        .pipe(uglify())
        .pipe(rename({
            separator: '-',
            size: 8,
            outMap: jsPath
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('devConfig', function() {
    return gulp.src('config/apiconfig/config-dev.js')
        .pipe(concat('config-now.js'))
        .pipe(gulp.dest('config/apiconfig/'));
});

gulp.task('prodConfig', function() {
    return gulp.src('config/apiconfig/config-prod.js')
        .pipe(concat('config-now.js'))
        .pipe(gulp.dest('config/apiconfig/'));
});

gulp.task('package', ['minifyCss', 'minifyJs'], function() {
    console.log('build success');
});


// lint
const lintDirs = [
    'app/**/*.jsx',
    'app/**/*.js',
    'ui/**/*.jsx',
    'ui/**/*.js',
    'ui-doc/**/*.jsx',
    'ui-doc/**/*.js'
];

gulp.task('lint', () => {
    return gulp.src(lintDirs)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('lintWatch',['lint'], () => {
    gulp.watch(lintDirs, function(event) {
        return gulp.src(event.path)
            .pipe(eslint())
            .pipe(eslint.format());
    });
});
