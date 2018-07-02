var SRC_DIR = './src/';     // 源文件目录  
var DIST_DIR = './dist/';   // 文件处理后存放的目录  
var DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件  

var config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    html: {  
        src: SRC_DIR + '*.html',  
        dist: DIST_DIR  
    },  
    ejs: {  
        src: SRC_DIR + 'pages/*.ejs',			 // ejs目录：./src/pages/
        watch: SRC_DIR + 'pages/**/*.ejs'		 // ejs监听目录
    },  
    css: {  
        src: SRC_DIR + 'css/lib/**/*.css',       // CSS目录：./src/css/lib  
        dist: DIST_DIR + 'css/lib'               // CSS文件build后存放的目录：./dist/css/lib  
    },  
    scss: {  
        src: SRC_DIR + 'scss/*.scss',         	 // SCSS目录：./src/scss/  
        dev: SRC_DIR + 'css',                    // SCSS文件生成CSS后存放的目录：./src/css  
        dist: DIST_DIR + 'css',                  // SCSS文件build后存放的目录：./dist/css  
        watch: SRC_DIR + 'scss/**/*.scss'		 // SCSS监听目录
    },  
    less: {
        src: SRC_DIR + 'less/*.less',   		// LESS目录：./src/less/  
        dev: SRC_DIR + 'css',                   // LESS文件生成CSS后存放的目录：./src/css  
        watch: SRC_DIR + 'less/**/*.less'	  	// LESS监听目录
    },
    js: {  
        src: SRC_DIR + 'js/**/*.js',             // JS目录：./src/js/  
        dist: DIST_DIR + 'js'	                 // JS文件build后存放的目录：./dist/js  
    },  
    img: {  
        src: SRC_DIR + 'images/**/*',            // images目录：./src/images/  
        dist: DIST_DIR + 'images'                // images文件build后存放的目录：./dist/images  
    },
    font: {
    	src: SRC_DIR + 'fonts/**/*',        		// font目录：./src/fonts
        dist: DIST_DIR + 'fonts/'                // font文件build后存放的目录：./dist/fonts
    }
};

module.exports = config;