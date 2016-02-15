var gulp = require("gulp");
var rimraf = require("gulp-rimraf");
var shell = require("gulp-shell");
var runSequence = require("run-sequence");
var replace = require("gulp-replace");
var insert = require("gulp-insert");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var tslint = require("gulp-tslint");
var tslintStylish = require('gulp-tslint-stylish');

var paths = {
    dist: "./dist",
    sources: "app/**/*.ts",
    sourcesToCopy: ["index.html"],
    targetHTML: "./dist/index.html",
    targetJS: "index.js",
    targetMinifiedJS: "index.min.js"
};

// lint
gulp.task("lint", function() {
    return gulp.src(paths.sources)
        .pipe(tslint())
        .pipe(tslint.report(tslintStylish, {
          emitError: true,
          sort: true,
          bell: true
        }));
});

// Delete the dist directory
gulp.task("clean", function() {
    return gulp.src(paths.dist, {read: false}).pipe(rimraf({ force: true }));
});

// copy required sources to the dist folder
gulp.task("copy", function(){
    return gulp.src(paths.sourcesToCopy).pipe(gulp.dest(paths.dist));
});

// bundle the app with jspm
gulp.task("bundle",
    shell.task(["jspm bundle-sfx app/main.ts " + paths.dist + "/" + paths.targetJS])
);

// minify the bundle
gulp.task("minify", function() {
    return gulp.src(paths.targetJS, {cwd: paths.dist})
        .pipe(uglify({mangle:false}))
        .pipe(concat("index.min.js"))
        .pipe(gulp.dest(paths.dist));
});

// update index.html to point to the minified bundle
gulp.task("update-target-html", function(){
    return gulp.src([paths.targetHTML])
        // remove scripts
        .pipe(replace(/<script.*<\/script>/g, ""))
        .pipe(replace(/<script.*\n.*<\/script>/g, ""))
        .pipe(replace(/<script.*\n.*\n<\/script>/g, ""))
        // cleanup
        .pipe(replace(/\n\n/g, "\n"))
        // link bundle script
        .pipe(insert.append("\n<script src='" + paths.targetMinifiedJS + "'></script>"))
        .pipe(gulp.dest(paths.dist))
});

// entry point - run tasks in a sequence
gulp.task("dist", function(callback) {
    runSequence(
        // "lint",
        "clean",
        "copy",
        "bundle",
        "minify",
        "update-target-html",
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log("FINISHED SUCCESSFULLY");
            }
            callback(error);
        });
});
