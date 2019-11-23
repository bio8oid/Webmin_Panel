import gulp from "gulp";


gulp.task('static', () => {
    gulp.src('index.html').pipe(gulp.dest('./dist'));
    gulp.src('./pages/**/*.html')
    .pipe(gulp.dest('./dist'));
})

gulp.task('default', () => {
    console.log('gulp is running');
})
