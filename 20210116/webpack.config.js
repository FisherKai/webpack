let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // 模式 默认两种 production / development
    entry: './src/index.js',   // 入口
    output: {
        filename: 'bundle.[hash:8].js', // 打包文件名
        path: path.resolve(__dirname, 'build'), // 打包路径为一个绝对路径
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
        })
    ]
}