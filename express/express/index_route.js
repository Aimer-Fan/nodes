let http = require('http')
let url = require('url')

function createApplication() {
  // app 是一个监听函数
  let app = (req, res) => {

    // 获取请求的方法
    let m = req.method.toLowerCase()
    let { pathname } = url.parse(req.url, true)
    // 取出每一个layer
    for (let i = 0; i < app.routes.length; i++) {
      let { method, path, handler } = app.routes[i]
      if ((method === m || method === 'all') && (path === pathname || path === '*')) {
        // 匹配成功后调用对应的方法
        handler(req, res)
      }
    }
    res.end(`Cannot find ${m} ${pathname}`)
  }
  app.routes = []
  app.all = function (path, handler) {
    let layer = {
      method: 'all', // 如果method是all表示全部匹配
      path,
      handler
    }
    // 把标识层存储到app.route数组中
    app.routes.push(layer)
  }
  // console.log(http.METHODS)
  // 针对不同的请求方法 批量生产 get post 等请求
  http.METHODS.forEach(method => {
    method = method.toLocaleLowerCase()
    app[method] = function (path, handler) {
      let layer = {
        method,
        path,
        handler
      }
      // 把标识层存储到app.route数组中
      app.routes.push(layer)
    }
  })
  app.listen = function () {
    let server = http.createServer(app)
    server.listen(...arguments)
  }
  return app
}

module.exports = createApplication