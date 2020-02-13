const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  
  // 多入口
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
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
    new webpack.DefinePlugin({
      MODE: JSON.stringify('dev'), // 向全局添加变量
      FLAG: 'true'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new CleanWebpackPlugin()
  ]
}