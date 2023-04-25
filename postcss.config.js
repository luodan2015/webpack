const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    // postcss 使用 autoprefixer 添加前缀的标准
    // require('autoprefixer'),
    autoprefixer({
      // overrideBrowserslist 支持浏览器的列表 优先级高于package.json中配置的browserslist 和 .browserslistrc
      // 'last 2 versions' 兼容最新的两个版本
      // '>1%' 在全球浏览器的市场份额中大于1%的浏览器
      overrideBrowserslist: ['last 2 versions', '>1%'],
    }),
    // css 压缩
    require('cssnano'),
  ],
};
