// less ==> css

const less = require('less');
module.exports = function (source) {
  return less.render(source, (error, { css }) => {
    this.callback(error, css);
  });
};
