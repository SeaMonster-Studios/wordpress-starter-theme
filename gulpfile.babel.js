import gulp from "gulp";
import gutil from "gulp-util";
import uglify from "gulp-uglify";
import sourcemaps from "gulp-sourcemaps";
import browserSync from "browser-sync";
import rename from "gulp-rename";
import concat from "gulp-concat";
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";

const bSync = browserSync.create();

const vhost =
  "https://127.0.0.1:5912/?_fd=0&fts=0&preview_theme_id=41958047834";

const distDir = "theme/assets/";

gulp.task("env:set", function envSet(done) {
  gutil.env.production
    ? (process.env.NODE_ENV = "production")
    : (process.env.NODE_ENV = "development");
  done();
});

// https://medium.com/@zymnytskiy/how-to-setup-gulp-with-es7-and-react-41b0dcb73d65
gulp.task("react", function react() {
  let main = browserify({
    entries: `src/index.js`,
    debug: true
  })
    .transform("babelify", {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        "@babel/transform-runtime",
        "@babel/plugin-proposal-class-properties"
      ]
    })
    .bundle()
    .on("error", function(error) {
      console.error(error);
      gutil.log(
        gutil.colors.red(`\n\n${error.name}: ${error.message}`),
        gutil.colors.yellow(
          `\nPlugin: ${error.plugin}\nFile Name: ${error.fileName}\n`
        )
      );
      this.emit("end");
    })
    .pipe(source("react-app.bundle.js"))
    .pipe(buffer());

  return process.env.NODE_ENV === "production"
    ? main
        .pipe(sourcemaps.init({ loadMaps: true })) // load browserify's sourcemaps
        .pipe(uglify())
        .pipe(rename("react-app.bundle.min.js"))
        .pipe(sourcemaps.write(".")) // write .map files near scripts
        .pipe(gulp.dest(distDir))
    : main
        .pipe(sourcemaps.init({ loadMaps: true })) // load browserify's sourcemaps
        .pipe(concat("react-app.bundle.js"))
        .pipe(sourcemaps.write(".")) // write .map files near scripts
        .pipe(gulp.dest(distDir))
        .pipe(bSync.stream());
});

gulp.task("watch", function watch() {
  // Serve files from this project's virtual host that has been configured with the server rendering this site
  bSync.init({
    files: [
      {
        options: {
          ignored: ".*"
        }
      }
    ],
    port: 8181,
    logPrefix: vhost,
    notify: false,
    proxy: vhost,
    reloadOnRestart: true
  });

  gulp.watch(`src/**`, gulp.series("react"));
  gulp.watch("theme/**").on("change", bSync.reload);
});

gulp.task("default", gulp.series(["env:set", "react", "watch"]));
gulp.task("build", gulp.series(["env:set", "react"]));
