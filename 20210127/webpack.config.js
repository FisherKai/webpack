const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

/**
 * 1、cleanWebpackPlugin-》每次打包前可以清理dist文件夹
 * 2、copyWebpackPlugin
 * 3、bannerPlugin (内置的)
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
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: "doc", to: "doc" }
        ])
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
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
}