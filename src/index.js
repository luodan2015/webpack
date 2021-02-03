// 模块化开发  当前流行的单页面入口应用 spa
// 引入模块 形成依赖
import { add } from './other'; // es module

import './css/index.css';
import css from './css/index.less';

import img from './images/image.png';

console.log('hello webpack !');

console.log(add(2, 3));

const div = `<div class="${css.test}">css modules</div>`;
document.write(div);

const pic = new Image();
// 图片的路径
pic.src = img;
const wrapper = document.getElementById('wrapper');
wrapper.append(pic);
