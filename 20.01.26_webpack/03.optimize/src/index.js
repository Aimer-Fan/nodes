// const button = document.createElement('button')
// button.innerHTML = 'click'

// // vue和react的懒加载
// button.addEventListener('click', function() {
//   // es6 草案中的语法 jsonp实现动态加载文件
//   import('./source.js').then(data => {
//     console.log(data)
//   })
//   console.log('click')
// })

// document.body.appendChild(button)

import source from './source.js'
console.log(source)
if (module.hot) {
  module.hot.accept('./source.js', () => {
    console.log('文件更新了')
    let r = require('./source.js')
    console.log(r)
  })
}