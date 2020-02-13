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
  watch: true, // 监视代码 源码修改后立即打包源文件
  watchOptions: { // 监控的选项
    poll: 1000, // 每秒问我多少次
    aggregateTimeout: 500, // 防抖 
    ignored: /node_modules/ // 忽略像
  },
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