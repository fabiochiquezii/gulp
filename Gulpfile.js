// plugins do gulp
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass')
var minifyHTML = require('gulp-minify-html');
var git = require('gulp-git');

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





//============/ Git /===============//

// Run git init 
// src is the root folder for git to initialize
gulp.task('init', function(done){
  git.init({}, done);
});

// Run git init with options
gulp.task('init', function(){
  git.init({args: '--quiet --bare'});
});

// Run git add 
// src is the file(s) to add (or ./*)
gulp.task('add', function(){
  return gulp.src('./git-test/*')
  .pipe(git.add());
});

// Run git add with options
gulp.task('add', function(){
  return gulp.src('./git-test/*')
  .pipe(git.add({args: '-f -i -p'}));
});

// Run git commit
// src are the files to commit (or ./*)
gulp.task('commit', function(){
  return gulp.src('./git-test/*')
  .pipe(git.commit('initial commit'));
});

// Run git commit with options
gulp.task('commit', function(){
  return gulp.src('./git-test/*')
  .pipe(git.commit('initial commit', {args: '-A --amend -s'}));
});

// Run git remote add
// remote is the remote repo
// repo is the https url of the repo
gulp.task('remote', function(done){
  git.addRemote('origin', 'https://github.com/stevelacy/git-test', {}, done);
});

// Run git push 
// remote is the remote repo
// branch is the remote branch to push to
gulp.task('push', function(){
  git.push('origin', 'master');
});

// Run git push with options
// branch is the remote branch to push to
gulp.task('push', function(done){
  git.push('origin', 'master', {args: " -f"}, done);
});

// Run git pull
// remote is the remote repo
// branch is the remote branch to pull from
gulp.task('pull', function(done){
  git.pull('origin', 'master', {args: '--rebase'}, done);
});

// Tag the repo with a version
gulp.task('tag', function(){
  git.tag('v1.1.1', 'Version message');
});

// Tag the repo With signed key
gulp.task('tagsec', function(done){
  git.tag('v1.1.1', 'Version message with signed key', {args: "signed"}, done);
});

// Create a git branch
gulp.task('branch', function(done){
  git.branch('newBranch', {}, done);
});

// Checkout a git branch
gulp.task('checkout', function(){
  return gulp.src('./*')
  .pipe(git.checkout('branchName'));
});

// Merge branches to master
gulp.task('merge', function(done){
  git.merge('branchName', {}, done);
});

// Reset a commit
gulp.task('reset', function(){
  git.reset('SHA');
});

// Git rm a file or folder
gulp.task('rm', function(){
  return gulp.src('./gruntfile.js')
  .pipe(git.rm());
});





//função principal
gulp.task('default', function() {
	gulp.run('script', 'oocss', 'minify-html');

	gulp.watch(files, function(evt) {
		gulp.run('script', 'oocss', 'minify-html');
	});
});