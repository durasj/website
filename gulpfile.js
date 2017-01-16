'use strict';

const gulp = require('gulp');
const source = require('vinyl-source-stream');

const path = require('path');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

const tsify = require('tsify');
const browserify = require('browserify');
const babelify = require('babelify');

const uglify = require('gulp-uglify');
const pump = require('pump');

const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback')

const paths = {
  sass: ['app/**/*.scss'],
  ts: ['typings/index.d.ts', 'app/**/*.ts', 'app/**/*.tsx'],
};

gulp.task('default', ['build']);

gulp.task('build', ['apply-prod-env', 'sass', 'ts:prod']);

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './',
      middleware: [ historyApiFallback() ],
    },
  });

  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.ts, ['ts']);
});

gulp.task('sass', function(done) {
  return gulp.src('app/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [path.join(__dirname, 'node_modules')],
    })).on('error', sass.logError)
    .pipe(cssnano())
    .pipe(autoprefixer({
      cascade: false,
      remove: false,
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'))
    // Notify potential browserSync (inject into browsers)
    .pipe(browserSync.stream({
      match: '**/*.css',
    }));
});

gulp.task('ts', function() {
    const bundler = browserify()
      .add('./app/app.tsx')
      .plugin(tsify)
      .transform(babelify, {
        presets: ['latest', 'react'],
        extensions: ['.js', '.ts', '.tsx'],
      });

    return bundler.bundle()
      .on('error', function (error) { console.error(error.toString()); })
      .pipe(source('app.js'))
      .pipe(gulp.dest('./'))
      .pipe(browserSync.stream({
        match: '**/*.js',
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
      gulp.dest('./'),
    ],
    cb
  );
});
