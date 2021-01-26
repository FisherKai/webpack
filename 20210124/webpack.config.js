let path = require('path');
// 拷贝Html的插件
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 抽离CSS插件，把原来直接插入html文档中的样式抽离出来
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩CSS
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩JS
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// webpack内置插件
let WebpackPlugin = require('webpack');

module.exports = {
    mode: 'development', // 模式 默认两种 production / development
    entry: './src/index.js',   // 入口
    output: {
        filename: 'bundle.[hash:8].js', // 打包文件名
        path: path.resolve(__dirname, 'build'), // 打包路径为一个绝对路径
        // 给静态资源加上域名前缀，用于当把打包资源都放在CDN上的时候
        // publicPath: 'http://www.test.com/',
    },
    devServer: { // 开发服务器配置
        port: "8888",
        progress: true, // 打包进度条
        contentBase: "./build",
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true, // 删除html中引号
                collapseWhitespace: true, // 折叠成一行
            },
            hash: true, // 加hash戳
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new OptimizeCssAssetsPlugin(),
        new WebpackPlugin.ProvidePlugin({
            $: 'jquery'
        })
    ],
    // 模块
    module: {
        // 规则
        rules: [
            // css-loader 解析@import语法及其他功能
            // style-loader 把css插入到head标签中
            // loader的用法：use可以直接写字符串，如果有多个loader，需要写成数组
            // loader执行顺序：如果同一种文件有多个规则，从右向左执行，从下到上。
            // loader还写成对象数组，
            // eg：{    loader: 'xxx-loader',options: {    可以传入参数     }}
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader']
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        // 用babel-loader把ES6->ES5
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                },
                    // {
                    //     loader: 'eslint-loader'
                    // }
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: require.resolve("jquery"),
                loader: "expose-loader",
                options: {
                    exposes: ["$", "jQuery"],
                },
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     loader: 'file-loader'
            // }
            // 用url-loader做一个限制，当我们图片小于多少kb的时候用base64来转化
            // 否则用file-loader来转化
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    outputPath: 'img/',
                    // 给静态资源加上域名前缀，用于当把打包资源都放在CDN上的时候
                    publicPath: 'http://www.test.com/',
                }
            }
        ]
    },
    // 优化项
    // 当mode=development时并不会执行优化项，只有在开发环境才会执行
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true, // 是否并发打包
                sourceMap: true
            })
        ]
    }
}