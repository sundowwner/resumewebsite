var gulp = require("gulp");
var sass = require("gulp-ruby-sass");
var autoprefixer = require("gulp-autoprefixer");
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var concat = require("gulp-concat");
var livereload = require("gulp-livereload");
var cssnano = require('gulp-cssnano')
var uglify = require("gulp-uglify");
var beautify = require('gulp-beautify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var htmlMin = require('gulp-htmlmin');
var flatten = require('gulp-flatten');
gulp.task('images', function() {
  return gulp.src('./src/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('./dist/images'));
});
gulp.task('styles', function() {
  return sass('./src/sass/', {
      style: 'expanded'
    })
    .pipe(autoprefixer("last 2 versions"))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify({
      message: "SCSS Compiled"
    }));
});
gulp.task('scripts', function() {
  return gulp.src("./src/**/*.js")
    .pipe(concat('jsBundle.js'))
    .pipe(beautify({
      indentSize: 4,
      indentChar: ' '
    }))
    .pipe(gulp.dest("./dist/js/"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(notify({
      message: "Minified JS, And Bundled."
    }));
});
gulp.task('lint', function() {
  return gulp.src(['./src/**/*.js', './server.js', './routes/**/*.js', './models/**/*.js', './api/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('minify-html', function() {
  return gulp.src("./src/**/*.html")
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(flatten())
    .pipe(gulp.dest('./dist/templates/'))
    .pipe(notify({
      message: "Minified HTML files."
    }));
});
gulp.task('watch', function() {
  livereload.listen({
    start: true
  });
  gulp.watch(['./views/**/*.html', './dist/**/*.js']).on('change', livereload.changed);
  gulp.watch('./src/**/*.html', ['minify-html']);
  gulp.watch('./src/**/*.scss', ['styles']);
  gulp.watch('./src/**/*.js', ['scripts']);
});
gulp.task('default', ['scripts', 'styles', 'minify-html'])
