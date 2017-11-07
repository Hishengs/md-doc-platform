require('babel-core/register')({
  ignore: /node_modules\/(?!heysoo)/, // 注意，这里是为了让 babel 编译 Heysoo 的代码
});
require('babel-core/register');

require('./boot.js');