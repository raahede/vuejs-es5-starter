'use strict';

var gulp = require('gulp');
var chalk = require('chalk');
var $ = require('gulp-load-plugins')();

var PATHS = [
  'js/main.js'
];

var VENDOR_PATHS = [
  'js/vendor/*.js',
  '!js/vendor/modernizr-custom.js'
];

var ECOM_PATHS = [
  'js/vendor/modernizr-custom.js',
  // 'js/ecom/_store.js',
  // 'js/ecom/_basket.js',
  // 'js/ecom/_product.js',
  'js/ecom.js'
];

var DEST = 'build/assets/javascripts';
var VENDOR_DEST = 'build/assets/javascripts/vendor';

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
gulp.task('scripts:ecom:debug', function() {
  return gulp.src(ECOM_PATHS)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.babel()
      .on('error', onBabelError))
    .pipe($.concat('ecom.js'))
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
gulp.task('scripts:ecom', function() {
  return gulp.src(ECOM_PATHS)
    .pipe($.plumber())
    .pipe($.babel()
      .on('error', onBabelError))
    .pipe($.concat('ecom.js'))
    .pipe($.uglify({
      compress: {
        warnings : true
      }
    }))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest(DEST));
});

gulp.task('scripts', ['scripts:vendor', 'scripts:ecom']);

gulp.task('scripts:debug', ['scripts:vendor', 'scripts:ecom:debug']);
