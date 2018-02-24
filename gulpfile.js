const gulp = require('gulp');
const kss = require('kss');
const sass = require('gulp-sass');
const sync = require('browser-sync').create();

gulp.task('styleguide', () => kss({
  title: "Styleguide",
  homepage: "../README.md",
  source: "scss",
  destination: "docs/",
  css: [
    "./css"
  ],
  js: [

  ]
}));

gulp.task('sass', () => gulp.src('./scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./docs/css'))
  .pipe(sync.stream())
);

gulp.task('serve', ['styleguide'], () => {
  sync.init({
    server: './docs'
  });

  gulp.watch(['./scss/*.scss', './scss/*/*.scss'], ['sass', 'styleguide']);
  gulp.watch('./scss/*/*.hbs', ['styleguide']);
  gulp.watch('./docs/*').on('change', sync.reload);
});

gulp.task('default', ['serve']);
