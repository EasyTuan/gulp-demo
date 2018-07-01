var gulp = require('gulp'),
	sass = require('gulp-sass'),
	less = require('gulp-less'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	browserSync = require('browser-sync'),
	ejs = require('gulp-ejs'),
	ejsLog = require('fancy-log'),
	config = require('./gulpfile.config.js');

function dev() {
	
	//sass&&scss编译输出
	gulp.task('sass:dev', function() {
		return gulp.src(config.scss.src)
			.pipe(sass({
				outputStyle: 'expanded'
			}).on('error', sass.logError))
			.pipe(gulp.dest(config.scss.dev))
			.pipe(notify())
	});
	
	//less编译输出
	gulp.task('less:dev', function() {
		return gulp.src(config.less.src)
			.pipe(plumber())
			.pipe(less())
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