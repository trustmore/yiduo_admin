'use strict';

var gulp = require('gulp');
require('./gulp/build');

gulp.task('build', ['dist'], function() {
    console.log('build dist sucess');
});
