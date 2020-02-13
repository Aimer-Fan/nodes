const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

// cleanWebpackPlugin 打包时先清空文件夹
// copyWebpackPlugin 复制文件到输出的文件夹中
// bannerPlugin 内置 在生成的代码前添加版权信息
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
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: './doc', to: './' }
    ]),
    new webpack.BannerPlugin('make by AimerFan')
  ]
}