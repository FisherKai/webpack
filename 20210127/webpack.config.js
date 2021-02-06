const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
/**
 * 1、cleanWebpackPlugin-》每次打包前可以清理dist文件夹
 * 2、copyWebpackPlugin-》拷贝非打包生成的文件，例如文档等
 * 3、bannerPlugin (内置的)-》打包代码添加版权声明
 */

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',  // production development
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                // 当后端接口没有'/api'的前缀时候，可以在调用时把'/api'重写成空
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: "doc", to: "doc" }
        ]),
        new webpack.BannerPlugin('make 2021 by yukai')
    ],
    // 增加映射文件，可以帮助我们调试源代码->源码映射
    // 会单独生成一个sourcemap文件，出错了会标识，帮助我们定位问题
    // 
    // devtool: 'eval-source-map',
    // 监控代码，实时编译
    watch: true,
    // 监控的参数
    watchOptions: {
        poll: 1000, // 每秒询问多少次
        aggregateTimeout: 500, // 防抖
        ignored: /node_modules/ // 不需要监控的文件
    },
    resolve: {
        // 这里让查找node_modules只在当前目录下查找
        modules: [path.resolve('node_modules')],
        // 别名
        // alias: {
        //     bootstrap: 'bootstrap/dist/css/bootstrap.css'
        // }
        // 一般查找node_modules文件先去找pageage.json中设定好的main文件，mainFields配置可以改变查找文件顺序
        mainFields: ['style', 'main']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
}