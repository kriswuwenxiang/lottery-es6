//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    less = require('gulp-less'),
    // cssmin = require('gulp-minify-css'), //gulp-minify-css变成gulp-clean-css
    cleanCSS = require('gulp-clean-css'),
    gif = require('gulp-if'),
    concat = require('gulp-concat'); //合并文件
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer');

var isProduction = process.env.ENV === 'prod'; //判断是生产还是开发环境
 
//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
  // gulp.src('src/less/index.less') //该任务针对的文件(多个文件以数组形式传入)
  gulp.src('src/less/*.less') //编译src目录下的所有less文件
    .pipe(less()) //该任务调用的模块
    // .pipe(cssmin()) //编译less后压缩css,兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
    .pipe(gif(isProduction, cleanCSS()))
    .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
    // .pipe(livereload()); //当监听文件发生变化时，浏览器自动刷新页面
});

//css使用autoprefixer任务y
gulp.task('autoprefixerCss', function () {
  gulp.src('src/oldcss/*.css')
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'iOS >= 7',
        'Android >= 4'
      ],
      cascade: false
    }))
    .pipe(gulp.dest('src/newcss'));
});
 
gulp.task('default',['testLess']); //定义默认任务
// gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
// gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
// gulp.dest(path[, options]) 处理完后文件生成路径

gulp.task('testWatch', function () {//启动监听事件（自动编译less）
  gulp.watch('src/**/*.less', ['testLess']); //当所有src目录下less文件发生改变时，调用testLess任务
});

// gulp.task('watch', function() {//当监听文件发生变化时，浏览器自动刷新页面
//     livereload.listen();
//     gulp.watch('src/less/**/*.less', ['testLess']);
// });