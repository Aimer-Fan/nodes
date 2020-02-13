const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  optimization: {
    splitChunks: { // 分割代码块
      cacheGroups: { // 缓存组
        common: { // 公共的模块
          chunks: 'initial', // 从入口处开始
          minSize: 0, // 大小
          minChunks: 2 // 引用多少次
        },
        vender: {
          priority: 1, // 权重
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        }
      }
    }
  },
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    noParse: /jquery/, // 不去解析jquery中的依赖项
    rules: [
      {
        test: /\.js$/,
        exclude: /node_mouldes/, // 排除node_moudle下的js文件
        include: path.resolve('./src'), // 包含src下的js文件
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    // }),
    // 通过 ignorePlugin 在打包时忽略 moment 中对 loacl 模块的引用
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}