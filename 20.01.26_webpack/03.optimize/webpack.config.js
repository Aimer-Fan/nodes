const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    hot: true, // 热更新
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  entry: {
    index: './src/index.js'
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
    }),
    new webpack.NamedModulesPlugin(), // 打印更新的模块路径
    new webpack.HotModuleReplacementPlugin() // 热更新插件
    
  ]
}