const { SyncLoopHook } = require('tapable');
class Lessson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(['name'])
        }
    }
    /**
     * 监听函数
     */
    tap() {
        let self = this;
        this.hooks.arch.tap('node', function (name) {
            console.log(`node ${name}`);
            return ++self.index === 3 ? undefined : '继续学'
        })
        this.hooks.arch.tap('react', function (data) {
            console.log(`react ${data}`);
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