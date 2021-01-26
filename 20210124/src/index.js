require('./index.css');
require('./b.less');
require('@babel/polyfill');

class A {
}
console.log(new A())

console.log($);

console.log('123123'.includes('dadasd'))

let aObj = require('./a.js');

console.log(`${aObj}`);

// webpack打包图片
// 1、在JS中创建图片
import dog from './dog.jpg';
console.log(dog);
let image = new Image();
image.src = dog;
document.body.appendChild(image);
// 2、在CSS中background引入
// 3、在html引入  <img src="" alt="" srcset="">