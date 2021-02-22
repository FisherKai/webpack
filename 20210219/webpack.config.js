const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        // 不去解析jQuery的依赖关系
        noParse: /jquery/,
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: './public/index.html'
        }),
        new Webpack.IgnorePlugin(/\.\/locale/, /moment/)
    ]
}