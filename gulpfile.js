"use strict";
var gulp = require("gulp");
var crx = require("crx");
var fs = require("fs");
var join = require("path").join;
var pem = require("pem");
var stream = require("stream");
var file = require("gulp-file");
var useref = require("gulp-useref");
const codebase = "https://raw.githubusercontent.com/zhso/elf/master/dist/elf.crx"; // Define your crx file address.
gulp.task("pem", function () {
    pem.createPrivateKey((err, data)=> {
        return gulp.src("temp/*")
            .pipe(file("private.pem", data.key))
            .pipe(gulp.dest(''));
    });
});
gulp.task("pack", ()=> {
    let pack = new crx({
        "codebase": codebase,
        "privateKey": fs.readFileSync(join(__dirname, "private.pem"))
    });
console.log(pack);
    pack.load(join(__dirname, "dist")).then(function () {
        return crx.pack()
            .then(buffer=> {
                var updateXml = pack.generateUpdateXML();
                fs.writeFile(join(__dirname, "package/update.xml"), updateXml);
                fs.writeFile(join(__dirname, "package/elf.crx"), buffer);
            });
    });
});
gulp.task("build", ()=> {
    gulp.src("src/*.html")
        .pipe(useref())
        .pipe(gulp.dest("dist"));
    gulp.src(["src/images/*", "src/js/eventPage.js", "src/*.json"], {base: "src"})
        .pipe(gulp.dest("dist"));
    gulp.src("bower_components/font-awesome/fonts/*.woff2", {base: "bower_components/font-awesome"})
        .pipe(gulp.dest("dist"));
});
//TODO: optimize package schedule
//TODO: optimize build schedule
//TODO: auto generate version on pack