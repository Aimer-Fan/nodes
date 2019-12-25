// require表示引包
var http = require("http");

// 创建服务器，参数是一个回调函数，表示如果有请求进来，要做什么
var server = http.createServer(function (req, res) {
  // req表示请求，res表示响应
  // 设置HTTP头部，状态码是200，文件类型是html，字符集是utf-8
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end("Hello World");
});

// 运行服务器，监听3000端口
server.listen(3000, "127.0.0.1");