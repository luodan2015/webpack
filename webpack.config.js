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
  // 构建模式 none production development
  mode: 'development',
  // 插件
  plugins: [new CleanWebpackPlugin()],
  // 处理不认识的模块
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader 模块转换 模块处理
        // * loader的执行顺利是 从后往前
        // css-loader 言简意赅的说就是把css模块的内容加入到js模块中去
        // css in js方式
        // style-loader 从js中提取css的loader在，在html中创建style标签，把css的内容放到这个style标签里
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

// * webpack 的默认配置
// 1. webpack执行构建会先找 webpack.config.js这个配置文件，如果没有配置文件，则执行默认配置

// * 1个chunk 对应 1个 bundle
// chunk  代码块
// bundle 资源文件
// 一个chunk可以是多个模块组成的
// 模块 - nodejs里，万物皆模块

// * entry
// 入口 执行构建的入口 项目入口
// 支持：字符串 数组 对象
// 字符串、数组 - 单入口， 单页面应用
// 对象 - 多入口，要对应多出口
// entry 的值为数组：
// webpack会自动生成另外一个入口模块，并将数组中的每个指定的模块加载进来，并将最后一个模块的module.exports作为入口模块的module.exports导出

// * 占位符
// hash 整个项目的hash值，每构建一次，就会有一个新的hash值
// chunkhash 根据不同入口entry进行依赖解析，构建对应的chunk，生成相应的hash；只要组成entry的模块没有内容改动，则对应的hash不变
// name
// id
