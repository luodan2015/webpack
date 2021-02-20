// 公共配置

// webpack 是基于nodejs的 所以要遵守CommonJS的规范
// webpack 配置就是一个对象

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 上下文 项目打包的相对路径 默认是当前项目的根目录 必须是绝对路径
  // context: process.cwd(),
  // 入口 执行构建的入口 项目入口 支持：字符串 数组 对象
  // 字符串
  entry: './src/index.js',
  // 数组 - 就是在做拼接
  // entry: ['./src/index.js', './src/other.js'],
  // 对象 - 多入口 就要对应多出口
  // entry: {
  //   main: './src/index.js',
  //   other: './src/other.js',
  // },
  // 出口
  output: {
    // 构建的文件资源放在哪？ 必须是绝对路径
    // __dirname 是nodejs的一个全局变量，会返回当前目录的绝对路径
    path: path.resolve(__dirname, './dist'),
    // 构建的文件资源叫啥？ 无论是多出口还是单出口，都推荐使用占位符
    // filename: 'main.js',
    // 多出口 就不能指定文件名称 使用占位符
    // filename: '[name].js',
    // hash 一般指定6位，最多指定20位
    filename: '[name]-[hash:6].js',
    // chunkhash 用于多出口文件
    // filename: '[name]-[chunkhash:6].js',
  },
  resolve: {
    // 查找第三方依赖 - 明确搜索范围
    modules: [path.resolve(__dirname, './node_modules')],
    // 起别名
    // 减少查找过程
    alias: {
      // 使用绝对路径更好 - 减少查找时间
      '@': path.resolve(__dirname, './src/css'),
      react: path.resolve(
        __dirname,
        './node_modules/react/umd/react.production.min.js'
      ),
      'react-dom': path.resolve(
        __dirname,
        './node_modules/react-dom/umd/react-dom.production.min.js'
      ),
    },
    // 不建议使用，消耗性能
    // 适当使用，提升写代码的便捷性
    extensions: ['.js', '.jsx', '.ts'],
  },
  // 插件
  plugins: [new CleanWebpackPlugin()],
};
