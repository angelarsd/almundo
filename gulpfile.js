var gulp = require('gulp'),
	express = require('gulp-express'),
	webserver = require('gulp-webserver');
  mongodbData = require('gulp-mongodb-data'),
  notify = require('gulp-notify'),
  open = require('gulp-open'),
  minifyJs  = require('gulp-minify'),
  concatJS = require('gulp-concat'),
  minifyCss  = require('gulp-minify-css'),
  concatCss = require('gulp-concat-css'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('seeding', function() {
  gulp.src('./backend/backup/hotels.json')
    .pipe(mongodbData({
      mongoUrl: 'mongodb://localhost/hotels',
      collectionName: 'hotels',
      dropCollection: true
  })).pipe(notify({message:"Se ha completado el Seeding en MongoDB",onLast: true}));
});

gulp.task('css', function () {
  gulp.src('./frontend/src/css/*.css')
    .pipe(concatCss("build.min.css"))
    .pipe(minifyCss({keepBreaks:false}))
    .pipe(gulp.dest('./frontend/build/css/'))
    .pipe(notify({message:"Se ha completado el task CSS",onLast: true}));
});

gulp.task('js', function () {
  gulp.src('./frontend/src/js/*.js')
    //.pipe(concatJS('build.js'))
    .pipe(minifyJs({ext:{min:'.min.js'},exclude: ['tasks']}))
    .pipe(gulp.dest('./frontend/build/js/'))
    .pipe(notify({message:"Se ha completado el task JS",onLast: true}));
});

gulp.task('sass', function() {
  gulp.src('./frontend/src/sass/*.scss')
    .pipe(sass({includePaths: 'bower_components/compass-mixins/lib', outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 version', 'safari 5', 'ie >= 9'] }))
    .pipe(gulp.dest('./frontend/src/css/'))
    .pipe(notify({message:"Se ha completado el task SASS",onLast: true}));
});

gulp.task('watch', function() {
  gulp.watch('./frontend/src/js/*.jsx', ['js']);
  gulp.watch('./frontend/src/css/*.css', ['css']);
  gulp.watch('./frontend/src/sass/*.scss', ['sass']);
})

gulp.task('default', function() {
	//Ejecurtar server API RESTFUL (BackEnd)
	express.run(['./backend/app.js']);
  //Ejecurtar server Angular (FrontEnd)
	gulp.src('./frontend/build').pipe(webserver({
      host: '127.1.1.0',
      port: 8080,
      fallback: 'index.html',
      livereload: true
  })).pipe(open({uri:'http:127.1.1.0:8080'}))
  .pipe(notify({message:"ejecutando BackEnd en http:127.1.1.0:3000\n ejecutando FrontEnd en http:127.1.1.0:8080",onLast: true}));
});