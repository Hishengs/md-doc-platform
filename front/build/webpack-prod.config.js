const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const base = require('./webpack-base.config.js');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

base.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
}));

base.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));

base.plugins.push(new MinifyPlugin({}, {
  comments: false,
  sourceMap: true
}));

// base.plugins.push(new webpack.optimize.UglifyJsPlugin({
//   sourceMap: true,
//   /*mangle: {
//     screw_ie8: true,
//     keep_fnames: true
//   },*/
//   mangle: false,
//   compress: {
//     warnings: false,
//     drop_console: true
//   },
//   comments: false
// }));

module.exports = {
  entry: base.entry,
  output: base.output,
  module: {
    rules: base.rules,
  },
  // resolve: {
  //   alias: {
  //     vue: 'vue/dist/vue.min.js',
  //     iview: 'iview/dist/iview.min.js',
  //   },
  // },
  plugins: base.plugins,
  devServer:{
    inline: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:88',
        secure: false
      }
    }
  }
};
