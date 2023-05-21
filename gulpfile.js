const gulp = require("gulp"),
  cleanCSS = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  merge = require("merge-stream"),
  browserSync = require("browser-sync").create();

const cssFiles = ["markup/css/style.css"];
const cssListen = ["markup/scss/style.scss"];

const jsListen = ["markup/js/main.js"];

//for css
function styles() {
  let cssFile = gulp
    .src(cssFiles, { allowEmpty: true })
    .pipe(concat("css-files.css"));

  let sassFile = gulp
    .src("markup/scss/style.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("markup/css"))
    .pipe(browserSync.reload({ stream: true }));

  return merge(cssFile, sassFile)
    .pipe(concat("all.css"))
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("markup/css"))
    .pipe(browserSync.stream());
}

//watch
function watch() {
  browserSync.init({
    server: {
      baseDir: "markup/",
    },
    browser: "chrome",
    proxy: false,
    port: "3000",
    notify: false,
  });
  gulp.watch(cssListen, styles);
  gulp.watch("./markup/*.html").on("change", browserSync.reload);
}

gulp.task("styles", styles);

gulp.task("watch", watch);

gulp.task("build", gulp.series(gulp.parallel(styles)));
gulp.task("dev", gulp.series("build", "watch"));
