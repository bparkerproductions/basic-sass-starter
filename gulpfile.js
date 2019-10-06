var gulp = require('gulp');
var autoprefexer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

//prefixes
gulp.task('prefix', function(){
	gulp.src('build/main.css')
	.pipe(autoprefexer({
		overrideBrowserslist: ['last 2 versions']
	}))
	.pipe(gulp.dest('build'))
});

//compile scss
gulp.task('sass', function() {
  return gulp.src("css/scss/global/main.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build'))
});

/*
 * Watch prefixes
 */
gulp.task('watch', function() {
	gulp.watch('css/scss/**', gulp.series('sass'));
});
