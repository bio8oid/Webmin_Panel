import gulp from "gulp";
import del from "del";
import sass from "gulp-sass";
import clean from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import babel from "gulp-babel";


// gulp.task('default', gulp.task(['build']));

gulp.task('sass', (done) => {
    gulp.src('./sass/**/*.*')
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(clean())
    .pipe(gulp.dest('./dist/css/'));
    done();
});

gulp.task('js', gulp.series(function js() {
    return gulp.src([
        './js/script.js',
        './js/chart.js',
        './js/chat.js',
        './js/pagination.js',
        './js/slider.js',
    ])
    .pipe(babel({ presets: ['env']}))
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
},));

gulp.task('static', gulp.series(done => {

        gulp.src('index.html')
        .pipe(gulp.dest('./dist'));



        gulp.src('./pages/**/*.html')
        .pipe(gulp.dest('./dist/pages/'));


        gulp.src('./images/**/*.*')
        .pipe(gulp.dest('./dist/images/'));

    done()
}));

gulp.task('clean', () => {
    return del("./dist");
});

// gulp.task('watch', gulp.series(['default']), () => {
//     gulp.watch('./sass/**/*.*', gulp.series(['sass']));
//     gulp.watch('./js/**/*.*', gulp.series(['js']));
//     gulp.watch('./pages/**/*.*', gulp.series(['static']));
//     gulp.watch('index.html', gulp.series(['static']));
// });

gulp.task('build', gulp.series(['clean', 'sass', 'js', 'static']));