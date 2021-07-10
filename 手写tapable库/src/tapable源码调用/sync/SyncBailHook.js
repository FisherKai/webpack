const { SyncBailHook } = require('tapable');
class Lessson {
    constructor() {
        this.hooks = {
            arch: new SyncBailHook(['name'])
        }
    }
    /**
     * 监听函数
     */
    tap() {
        this.hooks.arch.tap('node', function (name) {
            console.log(`node ${name}`);
            return '想停止学习';
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
/**
 * new SyncBailHook
 * SyncBailHook {
    _args: [ 'name' ],
    name: undefined,
    taps: [],
    interceptors: [],
    _call: [Function: CALL_DELEGATE],
    call: [Function: CALL_DELEGATE],
    _callAsync: [Function: CALL_ASYNC_DELEGATE],
    callAsync: [Function: CALL_ASYNC_DELEGATE],
    _promise: [Function: PROMISE_DELEGATE],
    promise: [Function: PROMISE_DELEGATE],
    _x: undefined,
    compile: [Function: COMPILE],
    tap: [Function: tap],
    tapAsync: [Function: TAP_ASYNC],
    tapPromise: [Function: TAP_PROMISE],
    constructor: [Function: SyncBailHook]
  }
 */
let lesson = new Lessson();
lesson.tap();
lesson.start();