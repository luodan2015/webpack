const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.base.js');
const devConfig = require('./webpack.config.dev.js');
const proConfig = require('./webpack.config.pro.js');

console.log(process.env.NODE_ENV);

module.exports = (env) => {
  // 如果外部传进env.production是生产环境，否则是开发环境
  if (env && env.production) {
    console.log('env.production - ', env.production);
    return merge(baseConfig, proConfig);
  }
  return merge(baseConfig, devConfig);
};
