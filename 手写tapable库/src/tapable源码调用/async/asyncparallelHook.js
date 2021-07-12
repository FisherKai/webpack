const { AsyncParallelHook } = require('tapable');
class Lessson {
    constructor() {
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        }
    }
    /**
     * 监听函数
     * 注册事件分为tap tapAsync
     */
    tap() {
        /**
         * cb这个回调标识着什么时候这个异步执行完
         */
        this.hooks.arch.tapAsync('node', function (name, cb) {
            setTimeout(() => {
                console.log(`node ${name}`);
                cb();
            })
        })
        this.hooks.arch.tapAsync('react', function (name, cb) {
            setTimeout(() => {
                console.log(`react ${name}`);
                cb();
            })
        })
    }
    /**
     * 启动函数
     */
    start() {
        this.hooks.arch.callAsync('yk', function () {
            console.log(`end`);
        })
    }
}
let lesson = new Lessson();
lesson.tap();
lesson.start();