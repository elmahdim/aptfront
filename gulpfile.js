var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sprite = require('gulp-sprite-generator');


var sassOptions = {
 input: ['src/sass/**/*.scss', 'src/sass/*.scss'],
 output: 'dist/css',
 log : {
  outputStyle: 'expanded',
  errLogToConsole: true,
 }
};

var autoprefixerOptions = {  
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function() {
 return gulp
  .src(sassOptions.input)
  .pipe(sass(sassOptions.log).on('error', sass.logError))
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(gulp.dest(sassOptions.output))
  .pipe(browserSync.stream())
});

gulp.task('sprites', function() {
  var spriteOutput;
 
  spriteOutput = gulp.src("src/sass/**/*.scss")
    .pipe(sprite({
            baseUrl:         "src/image/icons",
            spriteSheetName: "sprite.png",
            spriteSheetPath: "dist/images"
    })
    spriteOutput.css.pipe(gulp.dest("dist/css"))
    spriteOutput.img.pipe(gulp.dest("dist/images"))
});

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        startPath : "plugin.html"
    });
    gulp.watch(sassOptions.input, ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
//gulp.task('default', ['sass', 'watch', 'browser-sync']);