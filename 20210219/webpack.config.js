const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const Happypack = require('happypack');

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
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: [
            //                 '@babel/preset-env',
            //                 '@babel/preset-react',
            //             ]
            //         }
            //     }
            // }
            // 用Happypack去打包js文件
            {
                test: /\.js$/,
                use: 'Happypack/loader?id=js'
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: './public/index.html'
        }),
        new Webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new Webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'manifest.json')
        }),
        new Happypack({
            id: 'js',
            use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ]
                    }
                }]
        })
    ],
    // externals: {
    //     'react': 'React',
    //     '_dll_react': 'React'
    // },
    devServer: {
        port: 4000,
        open: true,
        contentBase: './dist'
    }
}