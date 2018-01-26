const webpack = require('webpack');

const config = require('./config.js');
const base = require('./webpack-base.config.js');

base.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
}));

// base.plugins.push(new webpack.SourceMapDevToolPlugin({
//   filename: '[file].map',
//   exclude: ['vendor.js']
// }));

// 打包分析
if(config.analyse){
  // 工具 1
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  base.plugins.push(new BundleAnalyzerPlugin());
  // 工具 2
  // const Visualizer = require('webpack-visualizer-plugin');
  // base.plugins.push(new Visualizer({
  //   filename: 'visualizer.html'
  // }));
}

module.exports = {
  entry: base.entry,
  output: base.output,
  module: {
    rules: base.rules,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
  },
  plugins: base.plugins,
  devServer:{
    inline: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8012',
        secure: false
      }
    }
  }
};
