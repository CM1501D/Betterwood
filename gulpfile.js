const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const server = require('gulp-webserver');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const minifycss = require('gulp-clean-css');
const postcss = require('gulp-postcss');


//compile less to css use gulp-sass;
gulp.task('sass',function(){
	return gulp.src('src/sass/style.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
})

//create dev server
gulp.task('server',['sass'],function(){
	return gulp.src('./')
	.pipe(server({
		open:'src/html/shouye.html',
		directoryListing: true,
		livereload:true
	}))
})

gulp.task('webpack',function(callback){
	webpack(config).run(function(err,stats){
		callback();
	})
})


gulp.task('watch',function(){
	gulp.watch('src/sass/*.scss',['sass']);
	gulp.watch('src/html/*.html');
	gulp.watch('src/js/*.js',['webpack']);
	gulp.watch('src/component/*.js',['webpack']);
})

//开发阶段执行的任务
gulp.task('default',['server','watch']);


//生成测试包执行的任务
gulp.task('prefixcss',function(){
	return gulp.src('dist/css/*.css')
	.pipe(sourcemaps.init())
	.pipe(postcss([autoprefixer()]))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('test/css'))
})

gulp.task('minifycss',['prefixcss'],function(){
	return gulp.src('test/css/*.css')
	.pipe(minifycss())
	.pipe(gulp.dest('public/css'))
})

gulp.task('uglify',function(){
	return gulp.src('dist/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('public/js'))
})

gulp.task('build',['minifycss','uglify']);