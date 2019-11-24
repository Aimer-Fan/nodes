let http = require('http')
let url = require('url')

function createApplication() {
  // app 是一个监听函数
  let app = (req, res) => {

    // 获取请求的方法
    let m = req.method.toLowerCase()
    let { pathname } = url.parse(req.url, true)
    // 通过next方法进行迭代
    let index = 0
    function next(err) {
      // 如果数组全部迭代完成还没有找到 说明路径不存在
      if (index === app.routes.length) return res.end(`Cannot find ${m} ${pathname}`)
      let { method, path, handler } = app.routes[index++] // 每次调用next就应该去下一个layer
      if (err) {
        // 如果有错误 我们应该去找错误中间件 错误中间件有一个特点 有四个参数
        if (handler.length === 4) {
          handler(err, req, res, next)
        } else {
          // 如果没有匹配到 要将err继续传递下去
          next(err) // 继续走下一个layer继续判断
        }
      } else {
        if (method === 'middle') { // 处理中间件
          if (path === '/' || path === pathname || pathname.startsWith(path + '/')) {
            handler(req, res, next)
          } else {
            next() // 如果这个中间件没有匹配到 那么继续走下一层
          }
        } else { // 处理路由
          if ((method === m || method === 'all') && (path === pathname || path === '*')) {
            // 匹配成功后调用对应的方法
            handler(req, res)
          } else {
            next()
          }
        }
      }
    }
    next() // 中间件中的next
  }

  app.routes = []

  app.use = function (path, handler) {
    if (typeof handler !== 'function') {
      handler = path
      path = '/'
    }
    let layer = {
      method: 'middle', // 表示method是middleware
      path,
      handler
    }
    app.routes.push(layer) // 将中间件放到容器内
  }

  app.use(function (req, res, next) {
    let { pathname, query } = url.parse(req.url, true)
    let hostname = req.headers['host'].split(':')[0]
    req.path = pathname
    req.query = query
    req.hostname = hostname
    next()
  })

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