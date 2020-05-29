let http = require('http')

http.createServer(function (req, res) {
  let buffer = Buffer.from('hello')
  res.end(buffer)
}).listen(4396, () => console.log('listen port 4396'))
