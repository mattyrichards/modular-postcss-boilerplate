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
    colorFunction = require('postcss-color-function'),
    browserSync = require('browser-sync').create();

// Lint the CSS
gulp.task('lint-css', function () {
  return gulp.src(paths.sourceCSS + '/**/*.css')
    .pipe(postcss(
      [
        stylelint(),
        reporter({ clearMessages: true })
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
      project: 'Modular PostCSS',
      dest: paths.buildStyleGuide + '/index.html',
      showCode: true
    })
  ];
  return gulp.src(paths.sourceCSS + '/root.css')
    .pipe(postcss(processors))
    .pipe(rename('main.css'))
    .pipe(gulp.dest(paths.buildCSS))
    .pipe(browserSync.reload({stream: true}));
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
      project: 'Modular PostCSS',
      dest: paths.buildStyleGuide + '/index.html',
      showCode: true
    }),
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano({
      zindex: false,
      autoprefixer: false,
      calc: false
    })
  ];
  return gulp.src(paths.sourceCSS + '/root.css')
    .pipe(postcss(processors))
    .pipe(rename('main.css'))
    .pipe(gulp.dest(paths.buildCSS));
});

// Run this task to build a production ready codebase
gulp.task('prod', ['build-css-prod']);

// Run this task to run a development build, start a dev server and auto-refresh on CSS changes
gulp.task('dev', ['lint-css', 'build-css-dev'], function() {
  browserSync.init({
      server: {
          baseDir: paths.build
      }
  });
  gulp.watch(paths.sourceCSS + '/**/*.css', ['lint-css', 'build-css-dev']);
});

// Watch task associated with styleguide build in order to refresh page after new styleguide generation
gulp.task('watch-css', ['lint-css', 'build-css-dev'], function() {
  browserSync.reload();
});

// Run this task to run a development styleguide build, start a dev server and auto-refresh on CSS changes
gulp.task('dev-styleguide', ['lint-css', 'build-css-dev'], function() {
  browserSync.init({
      server: {
          baseDir: paths.buildStyleGuide
      }
  });
  gulp.watch(paths.sourceCSS + '/**/*.css', ['watch-css']);
});
