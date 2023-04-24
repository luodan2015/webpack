// webpack 是基于nodejs的 所以要遵守CommonJS的规范
// webpack 配置就是一个对象

const path = require('path');
// 目录清理，输出目录不会有冗余文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// ! 开发环境不推荐使用 MiniCssExtractPlugin，因为对HMR功能支持不好
// 本插件会将 CSS提取到单独的文件中，为每个包含CSS的JS文件创建一个CSS 文件，井且支持 CSS和 SourceMaps 的按需加载。
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');

const webpack = require('webpack');

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
    // filename: '[name].js', // 占位符[name]
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
  resolve: {
    // 查找第三方依赖 - 明确搜索范围
    modules: [path.resolve(__dirname, './node_modules')],
    // 起别名
    // 减少查找过程
    alias: {
      // 使用绝对路径更好 - 减少查找时间
      '@': path.resolve(__dirname, './src/css'),
      react: path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js'),
    },
    // 不建议使用，消耗性能
    // 适当使用，提升写代码的便捷性
    extensions: ['.js', '.jsx', '.ts'],
  },
  externals: {
    // jquery通过script引入之后，全局中即有了jQuery变量，webpack不会对其进行打包
    // lodash: '_',
  },
  devServer: {
    // 服务器目录 - 绝对路径和相对路径都可以，绝对路径更快
    // contentBase: path.resolve(__dirname, './dist'),
    // 是否自动打开默认浏览器窗口
    // open: true,
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
        // * loader 模块转换 模块处理
        // css-loader 言简意赅的说就是把css模块的内容加入到js模块中去 只是对css语法做了序列化处理，处理成字符串,将代码片段放到bundle文件里面去
        // css in js方式
        // style-loader 从js中提取css的loader在，在html头部中创建style标签，把css的内容放到这个style标签里
        use: ['style-loader', 'css-loader'], // loader的执行顺利是 从后往前
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
          // 单独提取css
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // css modules 开启
              modules: true,
            },
          },
          {
            // css 兼容
            loader: 'postcss-loader',
          },
          'less-loader',
        ],
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name]_[hash:6].[ext]',
      //       outputPath: 'images/',
      //     },
      //   },
      // },
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
  optimization: {
    usedExports: true, // 哪些导出的模块被使用了，再做打包
    splitChunks: {
      chunks: 'all', // 所有的chunks代码公共的部分分离出来成为一个单独的文件。对同步initial，异步async，所有的模块有效all
      minChunks: 1, // 打包生成的chunk文件最少有几个chunk引用了这个模块
    },
  },
  // 插件 - 提升开发体验，提高开发效率
  plugins: [
    new CleanWebpackPlugin(),
    // ! 开发环境不推荐使用 MiniCssExtractPlugin，因为对HMR功能支持不好
    // 样式抽取成独立的样式文件
    new MiniCssExtractPlugin({
      filename: '[name]-[chunkhash:8].css',
    }),
    new HtmlWebpackPlugin({
      title: 'webpack-test',
      // 选择html模板
      template: './src/index.html',
      filename: 'index.html',
      // chunks: [],
      minify: {
        // 压缩html文件
        removeComments: true, // 移除html中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 清楚无用css
    new PurgeCSSPlugin({
      paths: glob.sync([
        // 要做css Tree Shaking 的路径文件
        path.resolve(__dirname, './src/*.html'), // 同样需要对html文件进行 tree shaking
        path.resolve(__dirname, './src/*.js'),
      ]),
    }),
  ],
};

// * webpack 的默认配置
// 1. webpack执行构建会先找 webpack.config.js这个配置文件，如果没有配置文件，则执行默认配置

// * 1个chunk 对应 1个 bundle
// chunk  代码片段
// bundle 资源文件
// 一个chunk可以是多个模块组成的
// 模块 - nodejs里，万物皆模块
// bundle 包含 chunk

// * chunk chunks chunkNames bundle module
// chunk 代码片段 一个module对应一个chunk
// chunks chunk组（包含至少一个chunk (module))
// 一个bundle对应一个chunkName (chunks)
// 一个chunkName (chunks) 包含至少一个module(chunk)

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

// * loader
// webpack只会编译处理js json格式的模块，其他模块需要使用loader来模块处理，模块转换
// 一个优秀的loader只处理一件事情
