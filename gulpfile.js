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
    discardComments = require('postcss-discard-comments'),
    calc = require('postcss-calc'),
    customMedia = require('postcss-custom-media'),
    simpleVars = require('postcss-simple-vars'),
    styleGuide = require('postcss-style-guide');

gulp.task('import-fonts', function() {
  gulp.src(paths.sourceFonts + '/*')
    .pipe(gulp.dest(paths.buildFonts));
});

gulp.task('stylelint', function () {
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
    calc({mediaQueries: true}),
    discardComments,
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano
  ];
  return gulp.src(paths.sourceCSS + '/root.css')
    .pipe(postcss(processors))
    .pipe(rename('main.css'))
    .pipe(gulp.dest(paths.buildCSS));
});

gulp.task('build-prod', ['import-fonts', 'build-css-prod']);

gulp.task('default', ['import-fonts', 'stylelint', 'build-css-dev'], function() {
  gulp.watch(paths.sourceCSS + '/**/*.css', ['stylelint', 'build-css-dev']);
});
