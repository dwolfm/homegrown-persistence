var gulp = require('gulp');

var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var stylish = require('jshint-stylish');

var workingFiles = ['lib/**/*.js', 'models/**/*.js', 'test/**/*.js', './*.js'];

gulp.task('nodemon', function(){
	nodemon({
		script: 'server.js',
		ext: 'js'
	});
});

gulp.task('lint', function(){
	return gulp.src(workingFiles).pipe(jshint()).pipe(jshint.reporter(stylish));
});

gulp.task('test', function(){
	var options = {
		read: false,
		ignoreLeaks: false,
		timeout: 3000,
		ul: 'bdd',
		globals: ['should']	
	};
	return gulp.src('test/**/*.js', options).pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function(){
	gulp.watch(workingFiles, ['lint']);
});

gulp.task('default', ['lint', 'test']);
