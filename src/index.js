// 模块化开发  当前流行的单页面入口应用 spa
// 引入模块 形成依赖
import { add } from './other'; // es module

import './css/index.css';
import css from './css/index.less';

import img from './images/image.png';

import axios from 'axios';

import counter from './counter';
import number from './number';

// Promise 浏览器不认识 => 需要引进 polyfill 垫片 ES6+的ECMA规范库
// @babel/polyfill不会做语法转换，垫片生成的语法是直接挂载到window对象上的，对于正常业务开发不会造成全局污染的问题，
// 对于做开源 UI库 组件库 工具库使用@babel/polyfill才会存在全局污染的问题
// import '@babel/polyfill';

import React, { Component } from 'react';
import ReactDom from 'react-dom';

console.log('hello webpack !');

console.log(add(2, 3));

const div = `<div class="${css.test}">css modules</div>`;
document.write(div);

const pic = new Image();
// 图片的路径
pic.src = img;
const wrapper = document.getElementById('wrapper');
wrapper.append(pic);

axios.get('/api/info').then((res) => {
  console.log('res', res);
});

const btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);
btn.onclick = function () {
  const div = document.createElement('div');
  div.innerHTML = 'item';
  div.className = css.item;
  document.body.appendChild(div);
};

counter();
number();

// 是否启用了HMR功能
if (module.hot) {
  // 需要监听的js文件
  module.hot.accept('./number.js', function () {
    document.body.removeChild(document.getElementById('number'));
    number();
  });
}
// ! 如果是要实现框架的HMR，使用对应的hot loader就可以了

// es6
const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map((item) => {
  console.log(item);
});

// react
class App extends Component {
  render() {
    return <div>hello react!!!</div>;
  }
}
ReactDom.render(<App />, document.getElementById('root'));
