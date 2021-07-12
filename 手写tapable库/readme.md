# tapable
    Webpack本质上是一种事件流的机制，而实现这一切的核心就是tapable。
Tapable有点类似于nodejs的envents库，核心原理也是依赖于发布订阅模式。


Tapable
1. sync* 同步
   1. SyncHook 同步顺序执行
   2. SyncBailHook 当监听函数返回一个非undefined的值的时候可以让监听函数停止执行
   3. SyncWaterfallHook 上一个执行的可以返回一个值作为下一个函数执行的参数
   4. SyncLoopHook 遇到某个不返回undefined的值的监听函数会多次执行
2. Async* 异步
   1. AsyncParallel*
      1. AsyncParallelHook
      2. AsyncParallelBailHook
   2. AsyncSeries*
      1. AsyncSeriesHook
      2. AsyncSeriesBailHook
      3. AsyncSerierWaterfallHook

* 注册事件的三个方法：tap tapAsync tapPromise
* 执行函数的三个方法：call callAsync promise