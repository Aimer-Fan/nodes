const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  // 多入口
  entry: {
    home: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  // 源码映射 增加源码映射文件 帮助调试源代码 出错时会标识报错的列和行
  // devtool: 'source-map', // 会单独生成一个sourcemap文件  大而全
  // devtool: 'eval-source-map', // 不会产生文件 但是可以显示行和列
  // devtool: 'cheap-module-source-map', // 不会产生列 但是会一个单独的映射文件
  devtool: 'cheap-module-eval-source-map', // 不会产生文件 集成在打包后的文件中 不会产生列
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'home.html',
      chunks: ['home']
    })
  ]
}