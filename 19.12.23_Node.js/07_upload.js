var http = require("http");
var url = require("url");
var formidable = require("formidable");
var util = require("util");
var fs = require("fs");
var path = require("path");

var server = http.createServer(function (req, res) {
  if (req.url === "/upload" && req.method.toLocaleLowerCase() === "post") {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.type = true;
    form.parse(req, function(err, fields, files) {
      if (err) { console.log(err); }
      
      var oldPath = __dirname + "\\" + files.file.path;
      // var extName = path.extname(files.file.name);
      var fileName = files.file.name;
      var newPath = __dirname + "\\uploads\\" +  fileName;
      // console.log(oldPath, newPath, fileName);
      console.log(fields);

      fs.rename(oldPath, newPath, function (err) {
        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
      });
    });
    return;
  }

  
});

server.listen(3000, "127.0.0.1");