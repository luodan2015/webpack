// 针对开发配置
const path = require('path');
const baseConfig = require('./webpack.config.base.js');

const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const devConfig = {
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
  // 构建模式 none production(生产环境 - 不建议开启source-map) development(开发环境 - 默认开启source-map)
  mode: 'development',
  // eval: 速度最快，使用eval包裹模块代码
  // source-map: 产生.map文件
  // cheap: 较快，不包含列信息
  // module：第三方模块，包含loader的sourcmap（比如：jsx to js，babel的sourcemap）
  // inline: 将.map文件作为DataURI嵌入，不单独生成.map文件
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    compress: true,
    port: 9000,
    // 服务器目录 - 绝对路径和相对路径都可以，绝对路径更快
    // contentBase: path.resolve(__dirname, './dist'),
    // 是否自动打开默认浏览器窗口
    open: true,
    // 开启热模块更新
    // ! 注意启动HMR后，css抽离会不生效，还有不支持contenthash，chunkhash
    // hot: true,
    // 即便HMR没有生效，浏览器也不要自动刷新
    // hotOnly: true,
    // 代理
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:9092/',
    //   },
    // },
    // mock server
    // webpack-dev-server提供的两个hooks（钩子），一个在中间件启动之前（before）一个在中间件启动之后（after）
    // before(app, server) {
    //   app.get('/api/mock', (req, res) => {
    //     res.json({
    //       hello: 'express',
    //     });
    //   });
    // },
    // 端口号
    // port: 8080,
  },
  // 处理不认识的模块
  module: {
    // ! loader 是一个消耗性能的大户
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src'),
        // loader 模块转换 模块处理
        // * loader的执行顺利是 从后往前
        // css-loader 言简意赅的说就是把css模块的内容加入到js模块中去
        // css in js方式
        // style-loader 从js中提取css的loader在，在html中创建style标签，把css的内容放到这个style标签里
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './src'),
        // less 语法编译
        // less-loader 将less文件编译为css文件
        // use: ['style-loader', 'css-loader', 'less-loader'],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // css modules 开启
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:6].[ext]',
            outputPath: 'images/',
            // 推荐使用url-loader，因为url-loader支持limit
            // 推荐小体积的图片资源转成base64，因为大体积的图片资源转成base64以后，字符串太长了，增加js文件的体积
            limit: 60 * 1024, // 单位是字节，1024 = 1kb
          },
        },
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        exclude: /node_modules/,
        use: {
          // babel-loader 只是webpack与babel之间的通信桥梁，不会做语法转换
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-test',
      // 选择html模板
      template: './src/index.html',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(baseConfig, devConfig);
