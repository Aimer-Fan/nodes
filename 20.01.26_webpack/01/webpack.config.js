// webpack是node写出来的 支持CommandJs规范
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	optimization: { // 优化项
		minimizer: [
			new UglifyJsPlugin({
				cache: true, // 使用缓存
				parallel: true, // 并发打包
				sourceMap: true // 资源映射
			}),
			new OptimizeCss() // 压缩css的插件
		]
	},
	devServer: { // 开发服务器的配置
		port: 3000, // 端口号
		progress: true, // 打包时的进度条
		contentBase: './dist', // 默认指向的路径
		compress: true, // 启动gzip压缩
	},
	mode: 'production', // 模式默认两种 production or development
	entry: './src/index.js', // 入口
	output: {
		// filename: 'bundle.[hash:8].js', // 打包后的文件名 包含哈希戳
		filename: 'bundle.js', // 打包后的文件名
		path: path.resolve(__dirname, 'dist'), // 路径必须是绝对路径
		// publicPath: 'http://www.baidu.com' // 在所有引用的静态资源前添加前缀
	},
	externals: {
		'jquery': '$' // 表示该模块是外部应用的不需要打包
	},
	plugins: [ // 数组 放着所以的webpack插件
		new HtmlWebpackPlugin({ // 这个插件用于将源码中的html复制到目标目录下
			template: './src/index.html', // 复制的html模板
			filename: 'index.html', // 复制之后的文件名
			minify: {
				removeAttributeQuotes: true, // 删除双引号
				collapseWhitespace: true, // 折叠空行
			},
			hash: false // 打包后的文件是否包含哈希戳
		}),
		new MiniCssExtractPlugin({
			filename: 'css/main.css'
		}),
		new webpack.ProvidePlugin({ // 给每个模块引入jquery
			$: 'jquery'
		})
	],
	module: { // 模块
		rules: [ // 规则
			// loader 的用法 字符串只用一个loader 多个loader需要用数组
			// loader的顺序 默认是从右往左 从下往上执行
			// loader还可以写成对象的形式 对象形式的好处在于能够传递参数
			// {
			// 	test: /\.js$/,
			// 	use: {
			// 		loader: 'eslint-loader',
			// 	},
			// 	enforce: 'pre', // previous 强制前置执行 post 强制后置执行
			// 	include: path.resolve(__dirname, 'src'),
			// 	exclude: /node_modules/
			// },
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 1, // 表示超过1kb就会复制到对应的目录下，否则转化成base64
						outputPath: '/img/', // 输出的图片会放到对应的目录下
						publicPath: 'http://www.baidu.com'  // 引用的图片会添加前缀
					}
				}
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ // 使用babel-loader把es6转换成es5
							'@babel/preset-env'
						],
						plugins: [
							['@babel/plugin-proposal-decorators', { 'legacy': true }],
							['@babel/plugin-proposal-class-properties', { 'loose':true }],
							'@babel/plugin-transform-runtime'
						]
					}
				},
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/
			},
			{
				test: /\.css$/, 
				use: [
					// {
					// 	loader: 'style-loader',  // 把css插入到html的标签中
					// 	options: {
					// 		insert: 'head' // 配置将生成的style标签插入到head标签中
					// 	}
					// },	
					MiniCssExtractPlugin.loader, // 使用link标签连接样式文件
					'css-loader', // 解析 @import 语法
					'postcss-loader',
				]
			},
			{
				test: /\.less$/,
				use: [
					// {
					// 	loader: 'style-loader',  // 把css插入到html的标签中
					// 	options: {
					// 		insert: 'head' // 配置将生成的style标签插入到head标签中
					// 	}
					// },	
					MiniCssExtractPlugin.loader, // 使用link标签连接样式文件
					'css-loader', // 解析 @import 语法
					'less-loader', // less -> css
					'postcss-loader', // 
				]
			}
		]
	}
}