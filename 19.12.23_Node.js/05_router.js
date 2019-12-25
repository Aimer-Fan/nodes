var http = require("http");
var url = require("url");

/** 
 * 当用户访问/student/1234567890 查询此用户的学生信息
 * 当用户访问/teacher/123456 的时候，查询此老师的信息
 * 其它的，提示错误。如果位数不对，也提示错误。
*/

var server = http.createServer(function (req, res) {
  var userUrl = req.url;

  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });

  // substring 判断次数的开头
  if (userUrl.substr(0, 9) === "/student/") {
    var studentId = userUrl.substr(9);
    // 用正则表达式判断测试的地址
    if (/^\d{10}$/.test(studentId)) {
      res.end("要查询的学生信息，id为：" + studentId);
    } else {
      res.end("学生学号位数不对");
    }
  } else if (userUrl.substr(0, 9) === "/teacher/") {
    var teacherId = userUrl.substr(9);
    if (/^\d{6}$/.test(teacherId)) {
      res.end("要查询的老师信息，id为：" + teacherId);
    } else {
      res.end("老师学号位数不对");
    }
  } else {
    res.end("输入的路径不正确");
  }
})

server.listen(3000, "127.0.0.1");