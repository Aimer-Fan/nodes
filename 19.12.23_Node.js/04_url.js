var http = require("http");
var url = require("url");

// 创建一个服务器，回调函数表示接收到请求之后做的事情
var server = http.createServer(function (req, res) {
  // url.parse() 可以将一个完整的url地址，分成很多部分
  var path = url.parse(req.url).pathname;
  var query = url.parse(req.url, true).query;
  var hash = url.parse(req.url).hash;

  console.log("path", path);
  console.log("query", query);
  console.log("hash", hash);
  res.end();
});

// 监听端口
server.listen(3000, "127.0.0.1");