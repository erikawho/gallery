'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const minifycss = require('gulp-minify-css');
const webpack = require('webpack-stream');
const babel = require('babel-loader');
const html = require('html-loader');

// const scripts = ['**/.js', '!node_modules/**'];

gulp.task('test', () => {
  return gulp.src('test/*.js')
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('sass:dev', () => {
  gulp.src(__dirname + '/app/**/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(maps.write('./'))
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('css:dev', () => {
  gulp.src(__dirname + '/app/**/*.css')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/*.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/'));
});

gulp.task('lint', () => {
  return gulp.src(__dirname + '/app/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build:dev', ['webpack:dev', 'html:dev', 'css:dev', 'sass:dev']);
gulp.task('default', ['build:dev', 'sass:dev', 'lint']);
