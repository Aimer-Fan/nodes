var http = require("http");
var https = require("https");

// 创建一个服务器，回调函数表示接收到请求之后做的事情
var server = http.createServer(function (req, res) {
  console.log("服务器接收到请求", req.url);
  // res.setHeader("Content-Type", "text/plain;charset=utf-8");
  // 等同于下面这条语句
  res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
  res.write("write 001");
  // This method signals to the server that all of the response headers and body have been sent.
  res.end("success");
});

// 监听端口
server.listen(3000, "127.0.0.1");