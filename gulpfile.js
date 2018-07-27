'use strict';

const gulp = require('gulp');
const source = require('vinyl-source-stream');

const path = require('path');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

const tsify = require('tsify');
const browserify = require('browserify');

const uglify = require('gulp-uglify');
const pump = require('pump');

const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback')

const paths = {
  sass: ['app/**/*.scss'],
  ts: [
    'app/**/*.ts',
    'app/**/*.tsx',
    'app/**/*.json',
    '!app/**/*.test.ts',
    '!app/**/*.test.tsx'
  ],
  content: 'content/**/*.*',
};

gulp.task('apply-prod-env', function(cb) {
  process.env.NODE_ENV = 'production';
  cb();
});

gulp.task('sass', function() {
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

gulp.task('content', function(cb) {
  const fs = require('fs');
  const fm = require('front-matter');
  const md = require('marked');
  const sm = require('sitemap');

  const rootDir = './';
  const contentDir = './content';
  const appDir = './app';

  const projects = fs.readdirSync(contentDir)
      .map((projectId) => {
          const rawContent = fs.readFileSync(contentDir + '/' + projectId + '/content.md', 'utf8');
          const content = fm(rawContent);

          return { projectId, content };
      })
      .map(({ projectId, content }) => {
          const meta = content.attributes;

          // Photos
          let photos = undefined;
          const photosDir = contentDir + '/' + projectId + '/photos';
          if (fs.existsSync(photosDir)) {
              photos = fs.readdirSync(photosDir)
                  .map(photoName => ({
                      src: encodeURI(photosDir + '/' + photoName).substr(1),
                      caption: photoName.split('.')[0]
                  }));
          }

          return {
              id: projectId,
              title: meta.title,
              type: meta.type || 'commercial',
              archived: meta.archived || false,
              size: meta.size,
              color: meta.color,
              description: meta.description,
              period: meta.period,
              skills: meta.skills,
              photos: photos,
              animation: meta.animation,
              link: meta.link,
              linkLabel: meta.linkLabel,
              content: md(content.body),
          };
      })
      .sort((a, b) => b.period.substr(-4) - a.period.substr(-4));

  fs.writeFileSync(appDir + '/content.json', JSON.stringify(projects));

  // Sitemap
  const sitemap = sm.createSitemap ({
      hostname: 'https://duras.me',
      urls: projects.map(project => {
          let url = { url: '#' + project.id };
          if (project.photos) url.img = project.photos.map(photo => ({
              url: photo.src,
              caption: photo.caption
          }));
          return url;
      })
  });

  fs.writeFileSync(rootDir + 'sitemap.xml', sitemap.toString());
  cb();
});

gulp.task('ts', function() {
    const bundler = browserify()
      .add('./app/app.tsx')
      .plugin(tsify);

    return bundler.bundle()
      .on('error', function (error) { console.error(error.toString()); })
      .pipe(source('app.js'))
      .pipe(gulp.dest('./'))
      .pipe(browserSync.stream({
        match: '**/*.js',
      }));
});

gulp.task('compressjs', function(cb) {
  pump([
      gulp.src('app.js'),
      uglify(),
      gulp.dest('./'),
    ],
    cb
  );
});

gulp.task('ts:prod', gulp.series('apply-prod-env', 'ts', 'compressjs'));

gulp.task('build', gulp.series('apply-prod-env', 'sass', 'content', 'ts:prod'));

gulp.task('serve', function () {
  browserSync.init({
    ui: false,
    server: {
      baseDir: './',
      middleware: [ historyApiFallback() ],
    },
    port: 3333,
    ghostMode: false,
  });

  gulp.watch(paths.sass, gulp.series('sass'));
  gulp.watch(paths.ts, gulp.series('ts'));
  gulp.watch(paths.content, gulp.series('content'));
});

gulp.task('default', gulp.series('build'));
