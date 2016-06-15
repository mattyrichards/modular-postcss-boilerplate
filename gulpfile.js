var paths = require('./paths');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var autoprefixer = require('autoprefixer');
var atImport = require('postcss-import');
var cssnano = require('cssnano');
var rename = require('gulp-rename');
var simpleVars = require('postcss-simple-vars');
var nested = require('postcss-nested');

gulp.task('stylelint', function () {
  return gulp.src('style.less')
    .pipe(postcss(
      [
        stylelint(),
        reporter({ clearMessages: true })
      ],
      {
        syntax: less
      }
    ));
});

// TODO: create "build" version with cssnano as processor for minification. Don't bother while in dev so we can check output easily
gulp.task('css', function () {
  var processors = [
    atImport,
    simpleVars,
    nested,
    autoprefixer({browsers: ['last 2 versions']})
  ];
  return gulp.src(paths.sourceCSS + '/root.css')
    .pipe(postcss(processors))
    .pipe(rename('main.css'))
    .pipe(gulp.dest(paths.buildCSS));
});
