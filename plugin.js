const webpack = require('webpack');
const config = require('./webpack.config.pro');

const compiler = webpack(config);
Object.keys(compiler.hooks).forEach((hookName) => {
  // 同步钩子 用tap
  // 异步钩子 用tapAsync
  compiler.hooks[hookName].tap('事件名称', (compilation) => {
    // 事件主体
    console.log('run ----- ', hookName);
  });
});

// compiler 入口函数
compiler.run();
