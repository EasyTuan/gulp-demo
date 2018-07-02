## Gulp构建前端自动化工作流

##已完成功能

 - sass && less的编译
 - ejs模版的编译（适用于模块化开发）
 - 样式、脚本、图片的压缩优化

#### 什么是Gulp? 

Gulp是基于Node.js的一个构建工具（自动任务运行器），开发者可以使用它构建自动化工作流程（前端集成开发环境）。
一些常见、重复的任务，例如：网页自动刷新、CSS预处理、代码检测、压缩图片、等等…… 只需用简单的命令就能全部完成。
使用它，可以简化工作，让你把重点放在功能开发上；同时减少人为失误，提高开发效率和项目质量，让专注更为专注。
如果你之前接触过Grunt，那上手Gulp就会觉得非常容易理解。

Gulp的核心API只有4个：src、dest、task、watch

* gulp.src(globs[, options])：指明源文件路径
globs：路径模式匹配；
options：可选参数；

- gulp.dest(path[, options])：指明处理后的文件输出路径
path：路径（一个任务可以有多个输出路径）；
options：可选参数；

* gulp.task(name[, deps], fn)：注册任务
name：任务名称（通过 gulp name 来执行这个任务）； 
deps：可选的数组，在本任务运行中所需要所依赖的其他任务（当前任务在依赖任务执行完毕后才会执行）； 
fn：任务函数（function方法）；

* gulp.watch(glob [, opts], tasks)：监视文件的变化并运行相应的任务
glob：路径模式匹配；
opts：可以选配置对象；
taks：执行的任务；



## 1. 如何运行

> node版本 `[8.0.0]`

### 1.1 开发环境配置

```sh
# 安装 cnpm 命令行工具。
npm i -g cnpm --registry=https://registry.npm.taobao.org

# 安装依赖包
cnpm i
```


设计目录结构
----------
我们将文件分为2类，一类是源码，一类是编译压缩后的版本。文件夹分别为 `src` 和 `dist`。(注意区分 `dist` 和 ·`dest` 的区别)

```
└── src/
│
└── dist/
```

`dist/` 目录下的文件都是根据 `src/` 下所有源码文件构建而成。

在 `src/` 下创建前端资源对应的的文件夹

```
└── src/
	├── less/    *.less 文件
	├── sass/    *.scss *.sass 文件
	├── css/     *.css  文件
	├── js/      *.js 文件
	├── fonts/   字体文件
	├── images/   图片
	└── pages/   ejs文件，用于前端模块化开发（注：src/home.html为pages/home.ejs编译输出文件）
└── dist/
```

### 1.2 开发过程

#### 1.2.1 命令

```sh
# 该命令会时时编译scss&&less ejs等文件，适用于前端出静态页面给到后端jsp、php时使用
npm run dev

# 该命令适用于前后端完全分离模式，前端最后压缩打包
npm run build
```