'use strict';

var gulp = require('gulp');
var chalk = require('chalk');
var $ = require('gulp-load-plugins')();

var VENDOR_PATHS = [
  'js/vendor/*.js'
];

var PATHS = [
  'js/vendor/vue.js',
  'js/vendor/vuex.js',
  'js/vendor/vue-resource.js',
  'js/vendor/vue-router.js',
  'js/store.js',
  'js/app.js'
];

var DEST = 'build/assets/js';
var VENDOR_DEST = 'build/assets/js/vendor';

// Fancy error message
function onBabelError(error) {
  console.log(
    chalk.red(
      error.fileName +
      (
        error.loc ?
        '(' + error.loc.line + ',' + error.loc.column + '): ' :
        ': '
      )
    ) +
    'error Babel: ' + error.message + '\n' +
    error.codeFrame
  );
}

// Copy all vendor scripts to assets folder
gulp.task('scripts:vendor', function() {
  return gulp.src(VENDOR_PATHS)
    .pipe(gulp.dest(VENDOR_DEST));
});

// Compile javascripts for debug
gulp.task('scripts:build:debug', function() {
  return gulp.src(PATHS)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.babel()
      .on('error', onBabelError))
    .pipe($.concat('app.js'))
    .pipe($.uglify({
      outSourceMap: true,
      output: {
        beautify: true
      }
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(DEST));
});

// Compile javascripts for production
gulp.task('scripts:build:production', function() {
  return gulp.src(PATHS)
    .pipe($.plumber())
    .pipe($.babel()
      .on('error', onBabelError))
    .pipe($.concat('app.js'))
    .pipe($.uglify({
      compress: {
        warnings : true
      }
    }))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest(DEST));
});

gulp.task('scripts:production', ['scripts:vendor', 'scripts:build:production']);

gulp.task('scripts:debug', ['scripts:vendor', 'scripts:build:debug']);
