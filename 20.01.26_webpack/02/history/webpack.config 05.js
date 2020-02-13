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
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: { // 解析第三方包时的规则
    modules: [path.resolve('node_modules')],
    extensions: ['.js', '.css','.json', '.vue'], // 当import没有写扩展名时，会按照制定的顺序匹配相应扩展名的文件
    // mainFields: ['style', 'main'], // 优先引用目标模块package.json中的style属性对应的值
    // mainFiles: [] // 入口文件的名字 index.js
    // alias: { // 别名
    //   bootstrap: 'bootstrap/dist/css/bootstrap.css'
    // }
  },
  devServer: {
    // 有服务端 不用代理来处理 能不能在服务端中启动webpack 端口用服务端端口
    // 使用webpack-dev-middleware 在服务端启动项目

    // // 前端只想单纯模拟数据
    // before(app) { // 钩子函数
    //   app.get('/api/user', (req, res) => {
    //     res.json({ name: 'AimerFan before' })
    //   })
    // }

    // proxy: { // 重写的方式 把请求代理到express服务器上
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: { '/api': '' }
    //   }
    // }
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
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new CleanWebpackPlugin()
  ]
}