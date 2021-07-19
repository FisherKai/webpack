#! /usr/bin/env node
/**
 * 1. 需要找到当前执行的路径，拿到webpack.config.js
 */
let path = require('path');
// 获取config文件
let config = require(path.resolve('webpack.config.js'));

let Compiler = require('../lib/Compiler');
let compiler = new Compiler(config);
// 标识运行编译
compiler.run();