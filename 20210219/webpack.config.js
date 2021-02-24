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
        }),
        new Webpack.HotModuleReplacementPlugin(), // 热更新插件
    ],
    // externals: {
    //     'react': 'React',
    //     '_dll_react': 'React'
    // },
    devServer: {
        port: 4000,
        open: true,
        contentBase: './dist',
        hot: true, // 启用热更新
    },
    optimization: {
        // 分割代码块
        splitChunks: {
            // 缓存组
            cacheGrounp: {
                // common为抽离文件名的前缀
                common: {
                    chunks: 'initial', // 一开始就抽离
                    minSize: 0, // 抽离文件的最小字节数
                    minChunks: 2, // 当引用2次的时候才会抽离
                },
                // 抽离第三方模块
                vendor: {
                    priority: 1, // 权重。由于是从上往下执行，所以在抽离common的时候就发现node_modules引用的也会被抽离到common中。所以加上权重这个属性让webpack优先抽离第三方模块
                    test: /node_modules/, //抽离引用的node_modules下的模块
                    chunks: 'initial', // 一开始就抽离
                    minSize: 0, // 抽离文件的最小字节数
                    minChunks: 2, // 当引用2次的时候才会抽离
                }
            }
        }
    }
}