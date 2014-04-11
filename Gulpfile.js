// plugins do gulp
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass')
var minifyHTML = require('gulp-minify-html');

//diretório de arquivos
var files = "./src/**"
var js = "./src/js/*.js";
var css = "./src/css/*.css";
var scss = "./src/sass/*.scss";
var img = "./src/img/*.jpg";
var html = "./src/*.html";

//função html
gulp.task('minify-html', function() {
    var opts = {comments:true,spare:true};

  gulp.src(html)
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist'))
});

//funçao do js
gulp.task('script', function() {
	gulp.src(js)
	.pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});

//função do sass
gulp.task('oocss', function () {
    gulp.src(scss)
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

//função principal
gulp.task('default', function() {
	gulp.run('script', 'oocss', 'minify-html');

	gulp.watch(files, function(evt) {
		gulp.run('script', 'oocss', 'minify-html');
	});
});