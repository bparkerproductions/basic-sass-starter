var gulp = require('gulp');
var sass = require('gulp-sass');

//compile scss
gulp.task('sass', function() {
  return gulp.src("css/scss/main.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build'))
});

/*
 * Watch prefixes
 */
gulp.task('watch', function() {
	gulp.watch('css/scss/**', gulp.series('sass'));
});
