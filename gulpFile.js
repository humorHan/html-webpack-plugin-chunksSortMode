//TODO 删除文件夹

var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack');
var gulpUtil = require('gulp-util');
var webpackConfig = require('./webpack-config.js');

gulp.task('publish-img',function(){
    return gulp.src(path.join(__dirname, '/src/img/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname, '/public/img/')));
});

gulp.task('bundle', ['publish-img'], function (done) {
    webpack(webpackConfig(true, false), function(err, stats) {
        if (err) {
            throw new gulpUtil.PluginError('webpack', err);
        }
        gulpUtil.log('[webpack]', stats.toString({colors: true}));
        //done();
    });
});