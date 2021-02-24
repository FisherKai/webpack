const { SyncHook, SyncBailHook, SyncWaterfallHook, SyncLoopHook } = require('tapable');

// class Lesson {
//     constructor() {
//         this.hooks = {
//             arch: new SyncHook(['name']),
//         }
//     }
//     // 注册监听函数
//     tap() {
//         this.hooks.arch.tap('node', function (name) {
//             console.log('node', name);
//         })
//         this.hooks.arch.tap('react', function (name) {
//             console.log('react', name);
//         })
//     }
//     start() {
//         this.hooks.arch.call('yukai');
//     }
// }

// let l = new Lesson();
// l.tap();
// l.start();

// class Lesson {
//     constructor() {
//         this.hooks = {
//             arch: new SyncBailHook(['name']),
//         }
//     }
//     // 注册监听函数
//     tap() {
//         this.hooks.arch.tap('node', function (name) {
//             console.log('node', name);
//             return '想停止学习';
//             // return undefined;
//         })
//         this.hooks.arch.tap('react', function (name) {
//             console.log('react', name);
//         })
//     }
//     start() {
//         this.hooks.arch.call('yukai');
//     }
// }

// let l = new Lesson();
// l.tap();
// l.start();

// class Lesson {
//     constructor() {
//         this.hooks = {
//             arch: new SyncWaterfallHook(['name']),
//         }
//     }
//     // 注册监听函数
//     tap() {
//         this.hooks.arch.tap('node', function (name) {
//             console.log('node', name);
//             return 'node学的还行';
//         })
//         this.hooks.arch.tap('react', function (name) {
//             console.log('react', name);
//         })
//     }
//     start() {
//         this.hooks.arch.call('yukai');
//     }
// }

// let l = new Lesson();
// l.tap();
// l.start();

class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(['name']),
        }
    }
    // 注册监听函数
    tap() {
        this.hooks.arch.tap('node', (name) => {
            console.log('node', name);
            return ++this.index === 3 ? undefined : '继续学'
        })
        this.hooks.arch.tap('react', (name) => {
            console.log('react', name);
        })
    }
    start() {
        this.hooks.arch.call('yukai');
    }
}

let l = new Lesson();
l.tap();
l.start();