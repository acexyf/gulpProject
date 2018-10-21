var gulp = require('gulp');
var gulpLess = require('gulp-less');
var path = require('path');
var babel = require('gulp-babel');
var uglify = require("gulp-uglify");
var gulpMinifyCss = require('gulp-minify-css');
var fileinclude = require('gulp-file-include');
var gulpif = require('gulp-if');
var gulpSourcemaps = require('gulp-sourcemaps');

//环境变量
var env = process.env.NODE_ENV || 'prod';

//生产环境打包文件
var buildFile = 'build';
//开发环境打包环境
var devFile = 'server'


if(env == 'prod'){
    gulp.task('default', ['build-js','build-less','build-pages'],function() {
        console.log('done');
    });
    
} else {
    gulp.task('default', ['dev-js','dev-less','dev-pages'],function() {
        console.log('done');
    });
}



gulp.task('build-pages',function(cb){
    return gulp.src('./src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(buildFile));
})

gulp.task('build-less', function () {
    return gulp.src('./src/css/index.less')
      .pipe(gulpLess({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulpMinifyCss())
      .pipe(gulp.dest(`${buildFile}/css/`));
});

gulp.task('build-js', function(){
    return gulp.src('./src/js/index.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(`${buildFile}/js`))
})






gulp.task('dev-pages',function(cb){
    return gulp.src('./src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(devFile));
})
gulp.task('dev-js', function(){
    return gulp.src('./src/js/index.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest(`${devFile}/js`))
})

gulp.task('dev-less', function () {
    return gulp.src('./src/css/index.less')
      .pipe(gulpLess({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest(`${devFile}/css/`));
});
