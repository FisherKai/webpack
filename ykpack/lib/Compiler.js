const path = require('path');

class Compiler {
    constructor(config) {
        this.config = config;
        // 需要保存入口文件的路径
        this.entryId;
        // 需要保存所有的模块依赖
        this.modules = {};
        this.entry = config.entry;
        // 工作路径
        this.root = process.cwd();
    }

    run() {
        // 执行 并且创建模块的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true);

        // 发射一个文件 打包后的文件
        this.emitAssets();
    }

    /**
     * 创建模块
     * @param {*} modulePath 模块路径
     * @param {*} isEntry 是否是入口主文件
     */
    buildModule(modulePath, isEntry) {

    }

    emitAssets() {

    }
}

module.exports = Compiler;