var gulp = require('gulp');

var appDev = 'assets/app/';
var appProd = 'public/javascripts/app/';

var concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src(appDev + '/**/*.js')
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(appProd));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(appDev + '**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
