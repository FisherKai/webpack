let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let Webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new Webpack.IgnorePlugin(/\.\/locale/, /moment/)
    ]
}