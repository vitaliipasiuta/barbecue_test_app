const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const config = require('./config/app.json');
const BUILD_DIRECTORY = 'dist';
const tsProject = ts.createProject('tsconfig.json');

gulp.task('watch', ['scripts'], function () {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('clean-scripts', function () {
  return gulp.src(BUILD_DIRECTORY, {read: false}).pipe(clean());
});

gulp.task('scripts', function () {
  const tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD_DIRECTORY));
});

gulp.task('start', function () {
  nodemon({
    script: 'dist/index.js',
    env: config
  })
});

gulp.task('build', ['scripts']);
