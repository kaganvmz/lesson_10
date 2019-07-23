const gulp = require('gulp');
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

let isProd = true;

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(gulp.dest('public/'));
});

gulp.task('styles', function(){
  return gulp.src('app/css/**/*.css')
  .pipe(gulpif(isProd, autoprefixer({
    browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7']
   })))
  .pipe(gulpif(isProd, cleanCSS()))
  .pipe(gulp.dest('public/css'));
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(concat('script.js'))
  .pipe(gulpif(isProd, uglify()))
  .pipe(gulp.dest('public/js'));
});

gulp.task('libs', function(){
  return gulp.src('app/libs/jQuery/dist/jquery.min.js')
  .pipe(gulp.dest('public/libs'));
});

gulp.task('img', function(){
  return gulp.src('app/img/**')
  .pipe(gulp.dest('public/'));
});

gulp.task('clean', function(){
  return del('public');
});

gulp.task('watch', function() {
    gulp.watch('app/*.html', gulp.series('html'));
    gulp.watch('app/css/**/*.css', gulp.series('styles'));
    gulp.watch('app/js/**/*.js', gulp.series('script'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'public'
  });
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', 'html', 'styles', 'libs', 'script', 'img'));
gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));
