const path = require('path');
const webpack = require('webpack');


module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js', //产生文件名
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]'
    },
    plugins:[
        new webpack.DllPlugin({
            name:'_dll_[name]',
            path:path.resolve(__dirname,'dist','manifest.json')
        })
    ]
}