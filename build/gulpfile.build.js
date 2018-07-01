var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	cssmin = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),//图片压缩
    pngquant = require('imagemin-pngquant'),//图片深入压缩
    imageminOptipng = require('imagemin-optipng'),
    imageminSvgo = require('imagemin-svgo'),
    imageminGifsicle = require('imagemin-gifsicle'),
    imageminJpegtran = require('imagemin-jpegtran'),
    cache = require('gulp-cache'),//图片压缩缓存
    clean = require('gulp-clean'),//清空文件夹
	config = require('./gulpfile.config.js');

function build() {
	gulp.task('clean:build',function(){
	    return gulp.src(config.dist,{read:false})
	        .pipe(clean());
	});
	gulp.task('htmlmin:build', function () {
	    var options = {
	        removeComments: true,//清除HTML注释
	        collapseWhitespace: true,//压缩HTML
	        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
	        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
	        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
	        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
	        minifyJS: true,//压缩页面JS
	        minifyCSS: true//压缩页面CSS
	    };
	    gulp.src(config.html.src)
	        .pipe(htmlmin(options))
	        .pipe(gulp.dest(config.html.dist));
	});
	gulp.task('sass:build', function() {
		return gulp.src(config.scss.src)
			.pipe(sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError))
			.pipe(gulp.dest(config.scss.dist))
	});
	gulp.task('cssmin:build', function () {
	    gulp.src(config.css.src)
	        .pipe(cssmin())
	        .pipe(gulp.dest(config.css.dist));
	});
	gulp.task('jsmin:build', function(done) {
		return gulp.src(config.js.src)
			.pipe(uglify())
			.pipe(gulp.dest(config.js.dist))
	});
	gulp.task('imagemin:build', function () {
	    gulp.src(config.img.src)
	        .pipe(cache(imagemin({     
	            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片          
	            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
	            use: [pngquant(),
	            imageminJpegtran({progressive: true}),
	            imageminGifsicle({interlaced: true}),
	            imageminOptipng({optimizationLevel:3}), 
	            imageminSvgo()] //使用pngquant深度压缩png图片的imagemin插件
	        })))
	        .pipe(gulp.dest(config.img.dist));
	});
	gulp.task('copy:build', function() {
		return gulp.src(config.font.src)
    		.pipe(gulp.dest(config.font.dist))
	});
	gulp.task('build',['clean:build'],function() {
		gulp.start('htmlmin:build','sass:build','cssmin:build','jsmin:build','imagemin:build','copy:build');
	});
}

module.exports = build;