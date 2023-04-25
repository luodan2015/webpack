// * loader的结构
// loader就是一个函数，但不可以是箭头函数
// loader必须有返回值，string or buffer
// loader如何接收配置 通过loader API this.query
// 如何返回多个信息 this.callback有同步调用和异步调用两种方式
// loader有异步逻辑如何处理
// 多个loader如何配置 - use配置成数组
// 如何处理路径问题 - 配置resolveLoader下的modules

module.exports = function (source) {
  console.log('source: ', source);
  console.log('配置: ', this.query);
  const info = source.replace('hello', this.query.name);
  // return info;
  // 返回多个信息
  // this.callback(null, info);
  // 异步逻辑
  const callback = this.async();
  setTimeout(() => {
    callback(null, info);
  }, 1000);
};
