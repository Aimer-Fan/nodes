/**
 * 函数防抖（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，
 *                      如果设定的时间到来之前，又一次触发了事件，就重新开始延时。
 *                      （类似于延迟触发）
 * 
 * 函数节流（throttle）：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
 *                      （类似于技能冷却）
 */


function debounce(fn, wait) {
  var timer = null;
  return function () {
    const context = this
    const args = arguments
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}


// 节流函数（时间戳版） 缺点是最后一次函数触发有可能会被忽略
// 基本思想是 每次调用函数都记录调用的时间戳 与上一次的时间戳对比，超过一定时间才放行执行函数
function throttle(fn, delay) {
  // 获取上一个记录的时间戳
  let prev = Date.now()
  return function () {
    // 保存当前的上下文对象用于同步 this 和 参数
    const context = this
    const args = arguments
    // 记录当前的时间戳
    let now = Date.now()
    // 如果当前时间和上一次执行的时间相差 大于指定的时间差
    if (now - prev >= delay) {
      // 给fn函数绑定this对象和参数列表 由于参数列表个数不一定 所以这里使用apply方法
      fn.apply(context, args)
      // 重新绑定上一次的时间戳
      prev = Date.now()
    }
  }
}


// 节流函数（时间戳+定时器） 最后一次点击不会被忽略
// 基本思想是 用一个变量 remaining 保存上次函数被执行到现在的时间 与设定的时间的间隔
// 如果小于0 表示很久（超过规定时间）没有再次调用fn函数了
// 如果大于0 表示刚刚（在规定时间内） 再次调用了fn函数 那就是符合上面的函数防抖的思想 让函数在指定时间后在调用
// var throttle = function (fn, delay) {
//   let timer = null
//   let startTime = Date.now()
//   return function () {
//     let curTime = Date.now()
//     let remaining = delay - (curTime - startTime)
//     const context = this
//     const args = arguments
//     clearTimeout(timer)
//     if (remaining <= 0) {
//       fn.apply(context, args)
//       startTime = Date.now()
//     } else {
//       timer = setTimeout(() => {
//         fn.apply(context, args)
//       }, remaining)
//     }
//   }
// }