/**
 * Created by humorHan on 2016/11/2.
 */
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var jsDir = path.resolve(__dirname, 'src', 'js');
var htmlDir = path.resolve(__dirname, 'src', 'html');
var node_modules = path.resolve(__dirname, 'node_modules');

//入口文件
var entries = (function(){
    var entryJs = glob.sync(jsDir + '/**/*.js'),
        map = {};
    entryJs.forEach(function(filePath){
        var fileName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[fileName] = filePath;
    });
    map['common'] = [
        path.join(__dirname, '/src/dep/mock.js'),
        path.join(__dirname, '/src/dep/jquery-2.2.4.js')
    ];
    return map;
})();

//TODO 放在配置文件内通过传参决定html的hash是否添加
var htmlPlugin = (function(){
    var entryHtml = glob.sync(htmlDir + '/**/*.html');
    var tempArr = [];
    entryHtml.forEach(function(filePath){
        var fileName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        var conf = {
            template: filePath,
            filename: '../app/views/templates/' + fileName + '.scala' + '.html'
        };
        if (fileName in entries) {
            conf.inject = 'body';
            conf.chunks = ['vendor', 'common', fileName]
        } else {
            conf.inject = 'body';
            conf.chunks = ['vendor', 'common'];
            console.error('没有匹配到和html相同文件名的js,请检查!');
            //throw new Error('没有匹配到和html相同文件名的js,请检查!');
        }
        conf.chunksSortMode = function(chunks){
            var orderArr = [];
            conf.chunks.forEach(function(orderItem){
                chunks.forEach(function(item){
                    if (item.names[0] == orderItem) {
                        orderArr.push(item);
                    }
                });
            });
            return orderArr;
        };
        tempArr.push(new HtmlWebpackPlugin(conf))
    });
    return tempArr;
})();

/**
 * webpack 配置
 * @param isWatch 监听模式包括watch和cache参数
 * @param isDev   调试模式 vs 线上
 */
module.exports = function(isWatch, isDev) {
    var cssName = isDev ? 'css/[name].css' : 'css/[name]-[contenthash].css';
    var cssExtractTextPlugin = new ExtractTextPlugin(cssName, {
        disable: false,
        allChunks: false //不将所有的文件都打包到一起
    });
    return {
        watch: isWatch,
        cache: isWatch,
        devtool: isDev ? "#inline-source-map" : null,//eval-source-map / source-map
        entry: entries,
        output: {
            path: path.join(__dirname, 'public'),
            publicPath: '/reaf-print-dom-server/public/',
            filename: isDev ? "js/[name].js" : "js/[name]-[chunkhash].js",
            chunkFilename: isDev ? "js/[name]-chunk.js" : "js/[name]-chunk-[chunkhash].js"
        },
        resolve: {
            root: [path.join(__dirname, 'js'), path.join(__dirname, 'dep'), path.join(__dirname, 'less')],
            extensions:['.js','.tpl','.less','.json',''],
            modulesDirectories:['dep','tpl','node_modules'],
            alias: {
                'mock': path.join(__dirname, 'src', 'dep', 'mock.js'),
                'jquery': path.join(__dirname, 'src', 'dep', 'jquery-2.2.4.js')
            }
        },
        module: {
            loaders: [
                {
                    test: /\.less$/,
                    loader: isDev ? cssExtractTextPlugin.extract(
                        'css?sourceMap!' +
                        'less?sourceMap'
                    ) : cssExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                    //loader: 'style!css!less'
                },
                {
                    test: /\.tpl$/,
                    loader: 'tmodjs-loader'
                },
                {
                    test: /\.(png|jpeg|jpg|gif)$/,
                    //loader: 'url?limit=8192&name=img/[hash:8]-[name].[ext]'
                    loader: 'url?limit=8192&name=img/[name].[ext]'
                },
                {
                    test: /^es5-sham\.min\.js|es5-shim\.min\.js$/,
                    loader: 'script',
                    exclude: node_modules
                },
                {
                    test: /\.html$/,
                    //loader: 'html?minimize=false&interpolate=true',
                    loader: 'html'
                }
            ]
        },
        plugins: (function (){
            var pluginsArr = [];
            if (isDev) {
                pluginsArr.push(
                    new webpack.optimize.CommonsChunkPlugin({
                        name: "vendor",
                        filename: "js/vendor.js",
                        minChunks: Infinity
                    }), cssExtractTextPlugin);
            } else {
                pluginsArr.push(
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        },
                        output: {
                            comments: false
                        },
                        mangle: {
                            except: ['$', 'exports', 'require']
                        }
                    }),
                    new webpack.optimize.CommonsChunkPlugin({
                        name: "vendor",
                        filename: "js/vendor-[hash].js",
                        minChunks: 5,
                        hash: true
                    }), cssExtractTextPlugin);
            }
            return pluginsArr.concat(htmlPlugin);
        })(),
        externals: {
            'jquery': '$'
        }
    }
};
