'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('sass', function () {
    gulp.src('./sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('js', () => {
    return gulp.src('scripts/scriptES6.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('scripts/dist'));
});

gulp.task('sass:watch', function () {
    gulp.watch(['./sass/*.scss', './sass/*/*.scss'], ['sass']);
});

gulp.task('js:watch', function () {
    gulp.watch(['./scripts/scriptES6.js'], ['js']);
});