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
import sass from "gulp-sass";
import rucksack from "gulp-rucksack";
import cssnano from "gulp-cssnano";
import bust from "gulp-cache-bust";
import plumber from "gulp-plumber";

const bSync = browserSync.create();

const vhost = "http://wpstart.localdev";

const distDir = "assets/build";

gulp.task("env:set", function envSet(done) {
  gutil.env.production
    ? (process.env.NODE_ENV = "production")
    : (process.env.NODE_ENV = "development");
  done();
});

// https://medium.com/@zymnytskiy/how-to-setup-gulp-with-es7-and-react-41b0dcb73d65
gulp.task("scripts", function scripts() {
  let main = browserify({
    entries: `src/scripts/index.js`,
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
    .pipe(source("scripts.bundle.js"))
    .pipe(buffer());

  return process.env.NODE_ENV === "production"
    ? main
        .pipe(sourcemaps.init({ loadMaps: true })) // load browserify's sourcemaps
        .pipe(uglify())
        .pipe(rename("scripts.bundle.min.js"))
        .pipe(sourcemaps.write(".")) // write .map files near scripts
        .pipe(gulp.dest(distDir))
    : main
        .pipe(sourcemaps.init({ loadMaps: true })) // load browserify's sourcemaps
        .pipe(concat("scripts.bundle.js"))
        .pipe(sourcemaps.write(".")) // write .map files near scripts
        .pipe(gulp.dest(distDir))
        .pipe(bSync.stream());
});

gulp.task("styles", () => {
  let main = gulp
    .src(["src/styles/index.sass"]) // dev
    .pipe(
      plumber(function(error) {
        gutil.log(
          gutil.colors.red(`\n\n${error.name}: ${error.message}`),
          gutil.colors.yellow(
            `\nPlugin: ${error.plugin}\nFile Name: ${error.fileName}\n`
          )
        );
        this.emit("end");
      })
    );

  return process.env.NODE_ENV === "production"
    ? main
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass())
        .pipe(
          rucksack({
            autoprefixer: true
          })
        )
        .pipe(cssnano())
        .pipe(rename(path => (path.basename += ".min")))
        .pipe(bust())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(distDir))
    : main
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass())
        .pipe(
          rucksack({
            autoprefixer: true
          })
        )
        .pipe(sourcemaps.write("./"))
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
    port: 8210,
    logPrefix: vhost,
    notify: false,
    proxy: vhost,
    reloadOnRestart: true
  });

  gulp.watch(`src/scripts/**`, gulp.series("scripts"));
  gulp.watch(`src/styles/**`, gulp.series("styles"));
  gulp
    .watch(["./*.php", "./**/*.php", "./**/**/*.php", "./**/**/**/*.php"])
    .on("change", bSync.reload);
});

gulp.task("default", gulp.series(["env:set", "styles", "scripts", "watch"]));
gulp.task("build", gulp.series(["env:set", "styles", "scripts"]));
