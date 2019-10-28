// express 是一个函数
// let express = require('express')
let express = require('./express/index_route')

// app监听函数
let app = express()

app.get('/name', function (req, res) { // req代表请求 res代表响应
  res.end('AimerFan')
})
app.get('/age', function (req, res) { // req代表请求 res代表响应
  res.end('22')
})
app.post('/name', function (req, res) {
  res.end('post AimerFan')
})
app.all('*', function (req, res) {
  res.end(req.method + 'all method')
})
app.listen(3000, function () {
  console.log('server start 3000')
}) // 在3000端口上开启服务