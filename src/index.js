// 模块化开发  当前流行的单页面入口应用 spa
// 引入模块 形成依赖
import { add } from './other';  // es module
import './index.css'

console.log(add(2, 3));

console.log('hello webpack !');
