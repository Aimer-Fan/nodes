// 中间件
// let express = require('express')
let express = require('./express/index_middleware')
let app = express()

// 在执行路由前 要干一些处理工作 就可以采用中间件
// use的第一个参数如果不写默认就是 /
// 中间件可以扩展一些方法
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  next()
})

app.get('/name', function (req, res) {
  console.log(req.path)
  console.log(req.hostname)
  console.log(req.query)
  res.end('今天天气不错')
})

app.get('/age', function (req, res) {
  res.end('今天天气不错')
})

// app.use(function (err, req, res, next) {
//   console.log(err)
//   next(err)
// })

app.listen(8080, () => {
  console.log('server start in 8080')
})