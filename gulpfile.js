'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');
const webpack = require('webpack-stream');
const babel = require('babel-loader');
const html = require('html-loader');

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

gulp.task('images:dev', () => {
  gulp.src(__dirname + '/app/img/**/*')
    .pipe(gulp.dest(__dirname + '/build/img'));
});

gulp.task('webpack:dev', () => {
  gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      },
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/'));
  });

gulp.task('build:dev', ['webpack:dev', 'html:dev', 'css:dev', 'sass:dev', 'images:dev']);
gulp.task('default', ['build:dev', 'sass:dev']);
