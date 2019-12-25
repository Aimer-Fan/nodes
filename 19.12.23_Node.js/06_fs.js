var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
  if (req.url === "/favicon.ico") {
    return;
  }
  // // 两个参数，第一个时完整路劲，当前目录写 ./
  // // 第二个参数，就是回调函数，表示读取文件成功后做的事情
  // fs.readFile("./index.html", function (err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //   res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  //   res.end(data);
  // });
  // // 创建文件夹
  // fs.mkdir("./temp", { recursive: true }, err => {
  //   if (err) { throw err; }
  // });
  // // stat检测状态
  // fs.stat("./temp", (err, data) => {
  //   // 检查这个文件是不是文件夹
  //   console.log(data.isDirectory());
  // });

  // 存在异步读取文件的问题
  // var directories = [];
  // fs.readdir("./", (err, files) => {
  //   for (var i = 0; i < files.length; i++) {
  //     var fileName = "./" + files[i];
  //     fs.stat(fileName, (err, data) => {
  //       if (data.isDirectory()) {
  //         directories.push(data)
  //       }
  //     });
  //   }
  //   console.log(directories);
  // });

  fs.readdir("./", function (err, files) {
    var directories = [];

    (function iterator(i) {
      if (i === files.length) {
        console.log(directories);
        return;
      }
      fs.stat("./" + files[i], function (err, data) {
        if (data.isDirectory()) {
          directories.push(files[i]);
        }
        iterator(i + 1);
      })
    })(0);
  });
});

server.listen(3000, "127.0.0.1");