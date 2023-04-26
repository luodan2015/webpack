// 插件的结构 类
// 必须要有apply函数

class TxtWebpackPlugin {
  constructor(options) {
    console.log('options ----- ', options);
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('TxtWebpackPlugin', (compilation, callback) => {
      console.log('compilation.assets ---- ', compilation.assets);
      const content = `这是一个测试的模块资源，里面的内容随便写写的`;

      compilation.assets['test.txt'] = {
        source: function () {
          return content;
        },
        size: function () {
          return content.length;
        },
      };

      callback();
    });
  }
}

module.exports = TxtWebpackPlugin;
