const path = require('path');
const baseDir = process.cwd();
const webpack = require('webpack');

const plugins = [
  // 提取无需多次打包的第三方库文件
  new webpack.optimize.CommonsChunkPlugin({
    // names: 'vendor',
    names: ['vendor', 'runtime'],
    minChunks: Infinity
  }),
  // 多个入口文件相同依赖的提取
  /*new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    filename: "common.bundle.js",
    minChunks: 3
  }),
  new webpack.optimize.CommonsChunkPlugin({
    children: true,
    minChunks: 3,
  })*/
];

const rules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
  },
  // { test: /iview.src.*?js$/, loader: 'babel-loader' }, // iview 按需引用必须加这句
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  { test: /\.(png|jpg|gif|svg|ttf|eot|woff)$/, loader: 'file-loader?name=[name].[hash].[ext]' },
  { test: /\.css$/, loader: 'style-loader!css-loader' },
  { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
];

module.exports = {
  entry: {
    app: ['babel-polyfill', './index.js'],
    vendor: ['vue', 'iview', 'axios', 'vue-router', 'vuex'],
  },
  output: {
    path: path.join(baseDir, './dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash:4].piece.js',
    publicPath: '/static/dist/',
  },
  plugins,
  rules,
};
