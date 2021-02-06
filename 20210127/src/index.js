// console.log('index');

// class Index {
//     constructor() {
//         console.log(`你好`)
//     }
// }

// let index = new Index();
// console.log(index);
import 'bootstrap';
// 因为在webpack.config.js里面起了别名，所以现在直接引用bootstrap去表示引用了bootstrap/dist/css/bootstrap.css这个文件
// import 'bootstrap/dist/css/bootstrap.css';
let xhr=new XMLHttpRequest();

xhr.open('GET','/api/user',true);

xhr.onload=function(){
    console.log(xhr.response);
}

xhr.send();