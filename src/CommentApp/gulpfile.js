/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');

var arrModules = [
    "react",
    "react-dom",
    "react-router"
];
gulp.copy = function (src, dest) {
    return gulp.src(src, { base: "." })
        .pipe(gulp.dest(dest));
};

gulp.task('copy:modules', function () {
    //var mod = 'react';
    //try{
    //    return gulp.src(['node_modules/' + mod + "/*/**"], {base: "."})
    //          .pipe(debug())
    //          .pipe(gulp.dest('wwwroot/node_modules/' + mod ));

    //}
    //catch(ex){
    //    console.log(ex.message);
    //}
    arrModules.forEach(function (mod) {
        gulp.copy('node_modules/' + mod + '/*/**', 'wwwroot/');
        
    });
    
});