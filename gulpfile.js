var gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
	sass = require('gulp-sass'),
	clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    copy = require('gulp-copy'),
    useref = require('gulp-useref'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    argv = require('yargs').argv;

var env = process.env.GULP_ENV;

gulp.task('default', ['css', 'js'], function() {
    return gulpUtil.log('Gulp process has finished');
});

gulp.task('css', ['sass', 'fonts'], function() {
    return gulpUtil.log('CSS gulp finished');
})
gulp.task('sass', function() {
	gulp.src('./web/bundles/app/sass/master.scss')
        .pipe(gulpif(argv.production, uglifycss()))
        .pipe(gulpif(argv.production, rename({suffix: '.min'})))
		.pipe(sass({sourceComments: 'map'}))
		.pipe(gulp.dest('./web/css/'));
});

gulp.task('fonts', function() {
    gulp.src([
            './web/components/bootstrap-sass/assets/fonts/bootstrap/*',
            './web/components/font-awesome/fonts/*'
        ])
        .pipe(copy('./web/fonts', {prefix:7}));
});
gulp.task('js', function() {
	return gulp.src([
            './web/components/jquery/dist/jquery.js',
            './web/components/bootstrap/dist/js/bootstrap.js',
            './web/components/angular/angular.js',
            './web/components/angular-smart-table/dist/smart-table.js',
            './web/components/angular-bootstrap/ui-bootstrap.js',
            './web/components/angular-bootstrap/ui-bootstrap-tpls.js',
            './web/bundles/*/**/*.js'
		])
        .pipe(useref())
        // .pipe(jshint())
        // .pipe(jshint.reporter('default'))
        .pipe(concat('javascript.js'))
        // .pipe(gulpif(env == 'prod', uglify()))
        // .pipe(uglify())
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('web/js'));
});

gulp.task('watch', function() {
	var onChange = function(event) {
	   console.log('File '+ event.path + 'has been ' + event.type);
	};
	gulp.watch('./web/bundles/*/sass/**.scss', ['sass']);
    gulp.watch('./web/bundles/*/**/*.js', ['js']);
});