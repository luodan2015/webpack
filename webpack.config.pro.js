// 针对生产配置
const path = require('path');
const baseConfig = require('./webpack.config.base.js');

const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');
// 压缩 CSS 插件 - webpack v4
// "optimize-css-assets-webpack-plugin": "^6.0.1",
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩 CSS 插件 - webpack v5
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const proConfig = {
  output: {
    // 构建的文件资源放在哪？ 必须是绝对路径
    // __dirname 是nodejs的一个全局变量，会返回当前目录的绝对路径
    path: path.resolve(__dirname, './build'),
    // 构建的文件资源叫啥？ 无论是多出口还是单出口，都推荐使用占位符
    // filename: 'main.js',
    // 多出口 就不能指定文件名称 使用占位符
    // filename: '[name].js',
    // hash 一般指定6位，最多指定20位
    filename: '[name]-[hash:6].js',
    // chunkhash 用于多出口文件
    // filename: '[name]-[chunkhash:6].js',
    // publicPath: '', // 可以添加cdn域名
  },
  // 构建模式 none production(生产环境 - 不建议开启source-map) development(开发环境 - 默认开启source-map)
  mode: 'production',
  optimization: {
    minimize: true,
    /** webpack v4 */
    // minimizer: [
    //   // 压缩 js
    //   new TerserWebpackPlugin(),
    //   // 压缩 css
    //   new OptimizeCssAssetsWebpackPlugin(),
    // ],
     /** webpack v5 */
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerWebpackPlugin(),
    ],
    get minimizer() {
      return this._minimizer;
    },
    set minimizer(value) {
      this._minimizer = value;
    },
  },
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
          // 'style-loader',
          // ! 开发环境不推荐使用 MiniCssExtractPlugin，因为对HMR功能支持不好
          MiniCssExtractPlugin.loader,
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
    // ! 开发环境不推荐使用 MiniCssExtractPlugin，因为对HMR功能支持不好
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      title: 'webpack-test',
      // 选择html模板
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        // 压缩html文件
        removeComments: true, // 移除html中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
      },
    }),
  ],
};

module.exports = merge(baseConfig, proConfig);
