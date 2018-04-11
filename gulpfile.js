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

gulp.task('copyJs', function() {
  gulp.src('src/js/*')
  .pipe(gulp.dest('public/js/'))
});

gulp.task('copySVG', function() {
  gulp.src('src/images/*.svg')
  .pipe(gulp.dest('public/images/'))
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
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


//Optimize images
gulp.task('imageMin', function() {
    return gulp.src('src/images/*')
                .pipe(imagemin())
                .on('error', handleError)
                .pipe(gulp.dest('public/images'))
                .pipe(browserSync.reload({
                  stream: true
                }));
});




//********* Build,  Deploy, and Watch Tasks ************//

gulp.task('build', [ 'clean:public', 'imageMin', 'sass', 'copyJs' ]);

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
});


gulp.task('watch', [ 'browserSync', 'sass' ], function() {
  gulp.watch('src/scss/**/*.scss', [ 'sass' ]);

  gulp.watch('*.html', [ 'bs-reload' ]);

  gulp.watch('src/images/*.+(png|jpg|jpeg)', [ 'imageMin' ]);

  gulp.watch('src/images/*.svg', [ 'copySVG' ]);

});
