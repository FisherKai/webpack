import jquery from 'jquery';
import moment from 'moment';
// 由于使用IgnorePlugin让moment插件不加载语言模块，所以需要手动引入
import 'moment/locale/zh-cn';

moment.locale('zh-cn')

let r = moment().endOf('day').fromNow();
console.log(r);