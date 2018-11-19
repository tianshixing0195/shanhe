var gulp = require("gulp");//require:相当于<script src="gulp.js"></script>
//
var sass = require("gulp-sass");

let basepath = "E:\\phpStudy\\WWW\\myProject\\shanhe";
//定义一个复制文件的任务
//task函数的第一个参数：copy-html是任务名
//task函数的第一个参数function是任务copy-html对应的功能
gulp.task("copy-html1",function(){
	//gulp.src("index.html").pipe(gulp.dest("dist"));
	gulp.src("*.html").pipe(gulp.dest(basepath));
});

gulp.task("copy-html2",function(){
	gulp.src("html/*.html")
	.pipe(gulp.dest(basepath+"\\html"));
});

gulp.task('copy-img',function(){
	gulp.src('img/**/*')
	.pipe(gulp.dest(basepath+"\\img"));
});

gulp.task('copy-css',function(){
	gulp.src('css/**/*')
	.pipe(gulp.dest(basepath+"\\css"));
});

gulp.task('copy-js',function(){
	gulp.src("js/*.js")
	.pipe(gulp.dest(basepath+"\\js"));
});

gulp.task('copy-php',function(){
	gulp.src("php/**/*")
	.pipe(gulp.dest(basepath+"\\php"));
});

gulp.task('copy-json',function(){
	gulp.src("json/*.json")
	.pipe(gulp.dest(basepath+"\\json"));
});

//sass的编译
gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sass())
	.pipe(gulp.dest(basepath+"\\css"));
});


//多个任务一起执行
gulp.task("build",["copy-html1","copy-html2","copy-img","copy-js","copy-json","copy-css","sass","copy-php"],function(){
	console.log("ok");
});


//监听
gulp.task("watchall",function(){
	//一旦过根目录下任何html文件的内容发生改变，那么就立即执行任务copy-html;
	gulp.watch("*.html",["copy-html1"]);
	gulp.watch("html/*.html",["copy-html2"]);
	gulp.watch("img/**/*",["copy-img"]);
	gulp.watch("js/*.js",["copy-js"]);
	gulp.watch("json/*.json",["copy-json"]);
	gulp.watch("css/*.css",["copy-css"]);
	gulp.watch("php/**/*",["copy-php"]);
	gulp.watch("sass/*.scss",["sass"]);
	
	
});
