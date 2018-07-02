var gulp = require('gulp'),
	sass = require('gulp-sass'),
	less = require('gulp-less'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	browserSync = require('browser-sync'),
	ejs = require('gulp-ejs'),
	ejsLog = require('fancy-log'),
	autoprefixer = require('gulp-autoprefixer'),
	config = require('./gulpfile.config.js');
	
/*
 * gulp-autoprefixer的browsers参数详解 ：
 * ● last 2 versions: 主流浏览器的最新两个版本
 * ● last 1 Chrome versions: 谷歌浏览器的最新版本
 * ● last 2 Explorer versions: IE的最新两个版本
 * ● last 3 Safari versions: 苹果浏览器最新三个版本
 * ● Firefox >= 20: 火狐浏览器的版本大于或等于20
 * ● iOS 7: IOS7版本
 * ● Firefox ESR: 最新ESR版本的火狐
 * ● > 5%: 全球统计有超过5%的使用率
 * 
 * */

function dev() {
	
	//sass&&scss编译输出
	gulp.task('sass:dev', function() {
		return gulp.src(config.scss.src)
			.pipe(sass({
				outputStyle: 'expanded'
			}).on('error', sass.logError))
			.pipe(autoprefixer({
              browsers: 'last 2 versions'
            }))
			.pipe(gulp.dest(config.scss.dev))
			.pipe(notify())
	});
	
	
	//less编译输出
	gulp.task('less:dev', function() {
		return gulp.src(config.less.src)
			.pipe(plumber())
			.pipe(less())
			.pipe(autoprefixer({
              browsers: 'last 2 versions'
            }))
			.pipe(gulp.dest(config.less.dev))
			.pipe(notify())
	});
	
	//ejs编译输出
	gulp.task('ejs:dev', function() {
		return gulp.src(config.ejs.src)
		.pipe(ejs({}, {}, { ext: '.html' }))
		.on('error', ejsLog)
		.pipe(gulp.dest('src/'))
	});

	gulp.task('dev', function() {
		gulp.watch(config.scss.watch,['sass:dev']);
		gulp.watch(config.less.watch,['less:dev']);
		gulp.watch(config.ejs.watch,['ejs:dev']);
		
		browserSync({
			server: {
				baseDir: './src',
				index: "index.html"
			},
			https: false,
			port: 3000
		});
		var reload = browserSync.reload;
		var watchConfig = ['src/**/*'];
		gulp.watch(watchConfig, reload);
	});
}

module.exports = dev;