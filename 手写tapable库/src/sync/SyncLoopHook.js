// 同步的钩子
class SyncLoopHook {
    constructor(args) {
        this.tasks = [];
    }
    /**
     * 
     * @param {*} name 标识作用，无实际意义
     * @param {*} task 
     */
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        let ret;
        this.tasks.forEach((task) => {
            do {
                ret = task(...args);
            } while (ret != undefined);
        })
    }
}

let hook = new SyncLoopHook(['name']);
let total = 0;
hook.tap('react', function (name) {
    console.log('react', name);
    return total++ === 3 ? undefined : '继续学';
});
hook.tap('node', function (name) {
    console.log('node', name);
});
hook.tap('webpack', function (name) {
    console.log('webpack', name);
});
hook.call('yukai')