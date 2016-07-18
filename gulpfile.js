var paths = require('./paths'),
    gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    stylelint = require('stylelint'),
    reporter = require('postcss-reporter'),
    autoprefixer = require('autoprefixer'),
    atImport = require('postcss-import'),
    cssnano = require('cssnano'),
    rename = require('gulp-rename'),
    mixins = require('postcss-mixins'),
    nested = require('postcss-nested'),
    calc = require('postcss-calc'),
    customMedia = require('postcss-custom-media'),
    simpleVars = require('postcss-simple-vars'),
    styleGuide = require('postcss-style-guide'),
    colorFunction = require('postcss-color-function');

// Move Font Awesome fonts from node_modules to build folder
gulp.task('import-fonts', function() {
  gulp.src(paths.sourceFonts + '/*')
    .pipe(gulp.dest(paths.buildFonts));
});

// Lint the CSS
gulp.task('css-lint', function () {
  return gulp.src(paths.sourceCSS + '/**/*.css')
    .pipe(postcss(
      [
        stylelint(),
        reporter({ clearMessages: true })
      ]
    ));
});

// Build styleguide
gulp.task('styleguide', function () {
  return gulp.src(paths.sourceCSS + '/**/*.css')
    .pipe(postcss(
      [
        styleGuide({
          project: 'Project name',
          dest: paths.buildStyleGuide + '/index.html',
          showCode: true
        })
      ]
    ));
});

// Building CSS for development use
gulp.task('build-css-dev', function () {
  var processors = [
    atImport,
    mixins,
    nested,
    customMedia,
    simpleVars,
    colorFunction,
    calc({mediaQueries: true}),
    styleGuide({
      project: 'Project name',
      dest: paths.buildStyleGuide + '/index.html',
      showCode: true
    })
  ];
  return gulp.src(paths.sourceCSS + '/root.css')
    .pipe(postcss(processors))
    .pipe(rename('main.css'))
    .pipe(gulp.dest(paths.buildCSS));
});

// Building CSS for production use.
// Note inclusion of cssnano (minification/optimisation), Autoprefixer & discardComments
gulp.task('build-css-prod', function () {
  var processors = [
    atImport,
    nested,
    mixins,
    simpleVars,
    customMedia,
    colorFunction,
    calc({mediaQueries: true}),
    styleGuide({
      project: 'Project name',
      dest: paths.buildStyleGuide + '/index.html',
      showCode: true
    }),
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano({
      zindex: false
    })
  ];
  return gulp.src(paths.sourceCSS + '/root.css')
    .pipe(postcss(processors))
    .pipe(rename('main.css'))
    .pipe(gulp.dest(paths.buildCSS));
});

// Run this task to build a production ready codebase
gulp.task('prod', ['import-fonts', 'build-css-prod']);

// Run this task to run a development build and also watch for changes
gulp.task('dev', ['import-fonts', 'css-lint', 'build-css-dev'], function() {
  gulp.watch(paths.sourceCSS + '/**/*.css', ['css-lint', 'build-css-dev']);
});
