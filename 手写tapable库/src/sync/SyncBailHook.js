// 同步的钩子
class SyncBailHook {
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
        for (let index = 0; index < this.tasks.length; index++) {
            ret = this.tasks[index](...args);
            if (ret !== undefined) break;
        }
    }
}

let hook = new SyncBailHook(['name']);
hook.tap('react', function (name) {
    console.log('react', name);
});
hook.tap('node', function (name) {
    console.log('node', name)
});
hook.call('yukai')