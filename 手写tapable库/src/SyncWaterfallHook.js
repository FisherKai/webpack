// 同步的钩子
class SyncWaterfallHook {
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
        let [first, ...other] = this.tasks;
        ret = first(...args);
        other.reduce((a, b) => {
            return b(a);
        }, ret)
    }
}

let hook = new SyncWaterfallHook(['name']);
hook.tap('react', function (name) {
    console.log('react', name);
    return 'react学的还行';
});
hook.tap('node', function (name) {
    console.log('node', name);
    return 'node学的还行';
});
hook.tap('webpack', function (name) {
    console.log('webpack', name);
    return 'webpack学的还行';
});
hook.call('yukai')