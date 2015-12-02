var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	imageminJpegRecompress = require('imagemin-jpeg-recompress'),
	imageminPngcrush = require('imagemin-pngcrush'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	htmlmin = require('gulp-htmlmin'),
	svgmin = require('gulp-svgmin'),
	critical = require('critical'),
	rename = require('gulp-rename'),
	uncss = require('gulp-uncss')

var paths = {
	scripts: ['src/js/*.js'],
	styles: ['src/css/*.css'],
	images: ['src/images/*'],
	jpgImages: ['src/images/*.jpg'],
	pngImages: ['src/images/*.png'],
	svgImages: ['src/images/*.svg'],
	content: ['src/*.html']
}

gulp.task('un-css', function (){
	return gulp.src('src/css/bootstrap.css')
	.pipe(uncss({
		html: ['src/index.html']
	}))
	.pipe(gulp.dest('dist/css'))
});


// copy styles for critical
gulp.task('copystyles', function(){
	return gulp.src(['src/css/bootstrap.min.css'])
		.pipe(rename ({
			basename: "site"
		}))
		.pipe(gulp.dest('src/css'));
});

//inline critical css
gulp.task('critical', ['copystyles'], function(){
	critical.generateInline({
		base: 'src/',
		src: 'index.html',
		styleTarget: 'bootstrap.min.css',
		htmlTarget: 'src/index.html',
		width: 320,
		height: 480,
		minify: false
	});
});

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

gulp.task('images', function(){
	return gulp.src(paths.images)
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest('dist/images/'))
});

// Compresses jpg files and outputs them to dist/img
gulp.task('jpgImages', function(){
	return gulp.src(paths.jpgImages)
		.pipe(imageminJpegRecompress({loops: 3})())
		.pipe(gulp.dest('dist/images'));
});

// Compresses png files and outputs them to dist/img
gulp.task('pngImages', function(){
	return gulp.src(paths.pngImages)
		.pipe(imageminPngcrush({reduce: true})())
		.pipe(gulp.dest('dist/images/'));
});

gulp.task('svgImages', function(){
	return gulp.src(paths.svgImages)
		.pipe(svgmin())
		.pipe(gulp.dest('dist/images/'));
});

// Minifies HTML and outputs it to dist
gulp.task('content', function(){
	return gulp.src(paths.content)
		.pipe(htmlmin({collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true,  removeOptionalTags: true}))
		.pipe(gulp.dest('dist'));
});

// Watches for changes and execute appropriate tasks
gulp.task('watch', function(){
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/css/*.css', ['styles']);
	//gulp.watch('src/images/*', ['images']);
	gulp.watch('src/images/*.jpg', ['jpgImages']);
	gulp.watch('src/images/*.png', ['pngImages']);
	gulp.watch('src/images/*.svg', ['svgImages']);
	gulp.watch('src/*.html', ['content']);
});

gulp.task('default', ['scripts', 'styles', 'jpgImages', 'pngImages', 'svgImages', 'content', 'watch']);
//gulp.task('default', ['scripts', 'styles', 'images', 'content', 'watch']);
//

