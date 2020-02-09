const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 使用 happypack 可以实现多线程来打包
const Happypack = require('happypack')

module.exports = {
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    noParse: /jquery/, // 不去解析jquery中的依赖项
    rules: [
      {
        test: /\.js$/,
        exclude: /node_mouldes/, // 排除node_moudle下的js文件
        include: path.resolve('./src'), // 包含src下的js文件
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: [
        //       '@babel/preset-env',
        //       '@babel/preset-react'
        //     ]
        //   }
        // }
        use: 'Happypack/loader?id=js'
      }
    ]
  },
  plugins: [
    new Happypack({
      id: 'js',
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      ]
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }),
    // 通过 ignorePlugin 在打包时忽略 moment 中对 loacl 模块的引用
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}