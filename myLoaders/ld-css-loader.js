// 对css进行序列化处理

module.exports = function (source) {
  console.log('css未序列化：\n', source);
  const info = JSON.stringify(source);
  console.log('css序列化后：\n', info);
  return info;
};
