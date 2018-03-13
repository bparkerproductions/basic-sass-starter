var gulp = require('gulp');
var autoprefexer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

//set CSS prefixes
gulp.task('prefix', function(){
	gulp.src('css/main.css')
	.pipe(autoprefexer({
		browsers: ['last 2 versions']
	}))
	.pipe(gulp.dest('build'))
});

//compile scss
gulp.task('sass', function() {
  return gulp.src("css/scss/main.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

//reload
gulp.task('reload', function(){
	browserSync.reload();
});

//main css workflow
gulp.task('css', function(done){
	//define order tasks should run in
	runSequence('sass', 'prefix', 

		//end
		function(){ done(); });
});

//watch prefixes
gulp.task('watch',function(){

	browserSync.init({
		notify: false,
                injectChanges: true,
		server: {
			baseDir: "./"
		}
	});
	gulp.watch('css/scss/**', ['css']);
	gulp.watch('index.html', ['reload']);
})
