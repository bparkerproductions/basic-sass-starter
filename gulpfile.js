var gulp = require('gulp');
var autoprefexer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var fileinclude = require('gulp-file-include');

/*
 * CSS workflow & chain
 */

//prefixes
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

//the sequence
gulp.task('css', function(done){
  //define order tasks should run in
  runSequence('sass', 'prefix', 

    //end
    function(){ done(); });
});


/*
 * Reload & file include
 */
//reload
gulp.task('reload', function(){
  browserSync.reload();
});

//HTML file includes
gulp.task('file-include', function(){
  gulp.src('app/**')
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .on("error", function (err) { console.log("Error : " + err.message); })
  .pipe(gulp.dest('build/app'))
});

gulp.task('app-load', function(done){
  runSequence('reload', 'file-include',

    //end
    function(){ done(); })
});



/*
 * JS & bundling
 */
gulp.task('bundle', function(){
  var bundler = browserify('js/main.js')
  .bundle()
  .on("error", function (err) { console.log("Error : " + err.message); })
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(gulp.dest('build'))
});

/*
 * Watch prefixes
 */
gulp.task('watch',function(){
  browserSync.init({
    notify: false,
    injectChanges: true,
    open: false,
    server: {
      baseDir: "./"
    }
  });
  gulp.watch('css/scss/**', ['css']);
  gulp.watch('app/**', ['app-load']);
  gulp.watch('js/**', ['bundle']);
});
