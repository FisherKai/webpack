const path = require('path');
const fs = require('fs');

class Compiler {
    constructor(config) {
        this.config = config;
        // 需要保存入口文件的路径
        this.entryId;// './src/index.js'
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
     * 获取源文件
     * @param {*} modulePath 
     */
    getSource(modulePath) {
        let content = fs.readFileSync(modulePath, 'utf-8');
        return content
    }

    /**
     * 创建模块
     * @param {*} modulePath 模块路径
     * @param {*} isEntry 是否是入口主文件
     */
    buildModule(modulePath, isEntry) {
        let source = this.getSource(modulePath);
        // 模块id modulePath = modulePath - this.root
        let moduleName = './' + path.relative(this.root, modulePath);

        if (isEntry) {
            this.entryId = moduleName;
        }

        // 解析需要把source源码进行改造 返回一个依赖列表
        let { sourceCode, dependencies } = this.parse(source, path.dirname(modulePath));
        // 把相对路径和模块中的内容对应起来
        this.modules[moduleName] = sourceCode;
    }

    /**
     * 解析源码 主要依靠AST解析语法树
     * @param {*} source 
     * @param {*} parentPath 
     */
    parse(source, parentPath) {
        console.log(source, parentPath);
        return {
            sourceCode: source
        }
    }

    emitAssets() {

    }
}

module.exports = Compiler;