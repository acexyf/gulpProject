var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var babel = require('gulp-babel');

gulp.task('build-pages',function(cb){

    return gulp.src('./src/*.html')
        .pipe(gulp.dest('build/'));

})



gulp.task('build-less', function () {
    return gulp.src('./src/css/index.less')
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest('build/css/'));
});

gulp.task('build-js', function(){
    return gulp.src('./src/js/index.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('build/js'))
})


gulp.task('default', ['build-js','build-less','build-pages'],function() {
    console.log('done')
});