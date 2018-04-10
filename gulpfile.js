/* ************* Gulp Task Runner File ********************************/


//********* Plugins ***************//
var gulp = require('gulp'); //gulp package
var del = require('del'); //used for deleting public folder before running build
var sass = require('gulp-sass'); //compile .scss files; used in sass task


//******* User Variables and Functions **********//


//************* Gulp Tasks *************//

//delete generated folder
gulp.task('clean:public', function() {
  return del.sync('public');
});
