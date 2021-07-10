const { SyncWaterfallHook } = require('tapable');
class Lessson {
    constructor() {
        this.hooks = {
            arch: new SyncWaterfallHook(['name'])
        }
    }
    /**
     * 监听函数
     */
    tap() {
        this.hooks.arch.tap('node', function (name) {
            console.log(`node ${name}`);
            return 'node学的还行'
        })
        this.hooks.arch.tap('react', function (data) {
            console.log(`react ${data}`);
            return 'react学的不行'
        })
        this.hooks.arch.tap('webpack', function (data) {
            console.log(`webpack ${data}`);
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