var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	htmlmin = require('gulp-htmlmin'),
	copy = require('gulp-copy')
	//critical = require('critical'),
	//rename = require('gulp-rename'),


var paths = {
	scripts: ['src/js/*.js'],
	styles: ['src/css/*.css'],
	content: ['src/*.html'],
	copy: ['src/*.ico']
}

// copy styles for critical
// gulp.task('copystyles', function(){
// 	return gulp.src(['src/css/bootstrap.min.css'])
// 		.pipe(rename ({
// 			basename: "site"
// 		}))
// 		.pipe(gulp.dest('src/css'));
// });

//inline critical css
// gulp.task('critical', ['copystyles'], function(){
// 	critical.generateInline({
// 		base: 'src/',
// 		src: 'index.html',
// 		styleTarget: 'bootstrap.min.css',
// 		htmlTarget: 'src/index.html',
// 		width: 320,
// 		height: 480,
// 		minify: false
// 	});
// });

// Uglifies js files and outputs them to dist/js
gulp.task('scripts', function(){
	return gulp.src(paths.scripts)
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));
});

// Minifies css files and outputs them to dist/css
gulp.task('styles', function(){
	return gulp.src(paths.styles)
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/css/'));
});

// Minifies HTML and outputs it to dist
gulp.task('content', function(){
	return gulp.src(paths.content)
		.pipe(htmlmin({collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true,  removeOptionalTags: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('copy', function(){
	return gulp.src(paths.copy)
		.pipe($.copy('dist'))
})

// Watches for changes and execute appropriate tasks
gulp.task('watch', function(){
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/css/*.css', ['styles']);
	gulp.watch('src/*.html', ['content']);
});

gulp.task('default', ['scripts', 'styles', 'content', 'watch']);
//gulp.task('default', ['scripts', 'styles', 'jpgImages', 'pngImages', 'svgImages', 'content', 'watch']);
//gulp.task('default', ['scripts', 'styles', 'images', 'content', 'watch']);
//

