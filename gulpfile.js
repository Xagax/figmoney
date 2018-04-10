/* ************* Gulp Task Runner File ********************************/


//********* Plugins ***************//
var gulp = require('gulp'); //gulp package
var del = require('del'); //used for deleting public folder before running build
var sass = require('gulp-sass'); //compile .scss files; used in sass task
var cleanCSS = require('gulp-clean-css'); //to minify css files; used in sass task
var imagemin = require('gulp-imagemin'); // optimize image files; used in imageMin task
var browserSync = require('browser-sync').create(); //browserSync for change watching; used in watch task.


//******* User Variables and Functions **********//
function handleError (err) {
  console.log(err.toString());
  process.exit(-1);
}

//************* Gulp Tasks *************//

//delete generated folder
gulp.task('clean:public', function() {
  return del.sync('public');
});

//compile Sass and minify resulting css
gulp.task('sass', function() {
  gulp.src('src/scss/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS())
      .on('error', handleError)
      .pipe(gulp.dest('public/css/'))
      .pipe(browserSync.reload({
        stream: true
      }));
});
