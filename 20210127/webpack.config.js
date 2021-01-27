const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    ],
    // 增加映射文件，可以帮助我们调试源代码->源码映射
    // 会单独生成一个sourcemap文件，出错了会标识，帮助我们定位问题
    // 
    devtool: 'eval-source-map',
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