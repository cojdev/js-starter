import autoprefixer from 'autoprefixer';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import dartSass from 'sass';
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'cssnano';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';

// use dart-sass to support @use rules in scss files
sass.compiler = dartSass;

const webpackConfig = require('./webpack.config');

const src = {
  scss: 'src/scss',
  js: 'src/js',
};

const dest = {
  css: 'dist/css',
  js: 'dist/js',
};

/**
 * Compile scss files to css
 */
export const styles = () => {

  return gulp
    .src(`${src.scss}/main.scss`)
    .pipe(
      plumber({
        errorHandler: () => {
          gulp.emit('end');
        },
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest.css))
    .pipe(browserSync.stream());
};

/**
 * Generate js files for development (include sourcemaps)
 */
export const scripts = () => gulp
  .src(`${src.js}/index.js`)
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(dest.js))
  .pipe(browserSync.stream());

/**
 * Watch for changes in scripts and styles files and rebuild them
 */
export const watch = () => {
  gulp.watch(`${src.scss}/**/*.scss`, styles).on('change', browserSync.reload);
  gulp.watch(`${src.js}/**/*.js`, scripts).on('change', browserSync.reload);
};

/**
 * Run browsersync server and watch for changes in project files
 */
export const serve = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    open: false,
  });

  watch();
};

// Build task
export const build = gulp.parallel(styles, scripts);

// Deploy task
export const deploy = gulp.parallel(styles);

// Default task
export default gulp.series(build, serve);
