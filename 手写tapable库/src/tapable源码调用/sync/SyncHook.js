const { SyncHook } = require('tapable');
class Lessson {
    constructor() {
        this.hooks = {
            arch: new SyncHook(['name'])
        }
    }
    /**
     * 监听函数
     */
    tap() {
        this.hooks.arch.tap('node', function (name) {
            console.log(`node ${name}`);
        })
        this.hooks.arch.tap('react', function (name) {
            console.log(`react ${name}`);
        })
    }
    /**
     * 启动函数
     */
    start() {
        this.hooks.arch.call('yk')
    }
}

let lesson = new Lessson();
lesson.tap();
lesson.start();