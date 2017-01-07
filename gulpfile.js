'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');

var path = require('path');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

var tsify = require('tsify');
var browserify = require('browserify');
var babelify = require('babelify');

var uglify = require('gulp-uglify');
var pump = require('pump');

var browserSync = require('browser-sync');

var paths = {
  sass: ['app/**/*.scss'],
  ts: ['typings/index.d.ts', 'app/**/*.ts', 'app/**/*.tsx']
};

gulp.task('default', ['build']);

gulp.task('build', ['apply-prod-env', 'sass', 'ts:prod']);

gulp.task('serve', function () {
  browserSync.init({
    server: './'
  });

  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.ts, ['ts']);
});

gulp.task('sass', function(done) {
  return gulp.src('app/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [path.join(__dirname, 'node_modules')]
    })).on('error', sass.logError)
    .pipe(cssnano())
    .pipe(autoprefixer({
      cascade: false,
      remove: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'))
    // Notify potential browserSync (inject into browsers)
    .pipe(browserSync.stream({
      match: '**/*.css'
    }));
});

gulp.task('ts', function() {
    var bundler = browserify()
      .add('./app/app.tsx')
      .plugin(tsify)
      .transform(babelify, {
        presets: ['latest', 'react'],
        extensions: ['.js', '.ts', '.tsx']
      });

    return bundler.bundle()
      .on('error', function (error) { console.error(error.toString()); })
      .pipe(source('app.js'))
      .pipe(gulp.dest('./'))
      .pipe(browserSync.stream({
        match: '**/*.js'
      }));
});

gulp.task('ts:prod', ['apply-prod-env', 'ts', 'compressjs']);

gulp.task('apply-prod-env', function() {
  process.env.NODE_ENV = 'production';
});

gulp.task('compressjs', ['ts'], function(cb) {
  pump([
      gulp.src('app.js'),
      uglify(),
      gulp.dest('./')
    ],
    cb
  );
});
