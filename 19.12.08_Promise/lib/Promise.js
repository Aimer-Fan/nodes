/**
 * 自定义Promise函数模块：IIFE
 */
(function (window) {
  /**
   * @description Promise构造函数
   * @param {Function} excutor 执行器函数（同步）
   */
  function Promise(excutor) {
    const self = this
    self.status = 'pending' // 给promise对象指定status属性，初始值为pending
    self.data = undefined // 给promise对象指定一个存储结果数据的属性
    self.callbacks = [] // 每个元素的结构 { onResolved(){}, onRejected(){} }

    function resolve(value) {
      // 如果当前状态不是pending，直接结束
      if (self.status !== 'pending') {
        return
      }
      // 将状态改为resolved
      self.status = 'resolved'
      // 保存value数据
      self.data = value
      // 如果有待执行的callback函数，立即异步执行回调onResolved
      if (self.callbacks.length > 0) {
        setTimeout(() => { // 放入队列中执行所有成功的回调
          self.callbacks.forEach(callbacksObj => {
            debugger
            callbacksObj.onResolved(value)
          })
        })
      }
    }

    function reject(reason) {
      // 如果当前状态不是pending，直接结束
      if (self.status !== 'pending') {
        return
      }
      // 将状态改为rejected
      self.status = 'rejected'
      // 保存reason数据
      self.data = reason
      // 如果有待执行的callback函数，立即异步执行回调onRejected
      if (self.callbacks.lenght > 0) {
        setTimeout(() => { // 放入队列中执行所有成功的回调
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          })
        })
      }
    }

    // 立即同步执行excutor
    try {
      excutor(resolve, reject)
    } catch (error) { // 如果执行器抛出异常，promise对象变为rejected状态
      reject(error)
    }
  }

  /**
   * @description Promise原型对象的then()
   * @param {Function} onResolved
   * @param {Function} onRejected
   * @returns {Promise} 新的promise对象
   */
  Promise.prototype.then = function (onResolved, onRejected) {
    const self = this
    self.callbacks.push({
      onResolved,
      onRejected
    })
  }

  /**
   * @description Promise原型对象的catch()
   * @param {Function} onRejected
   * @returns {Promise} 新的promise对象
   */
  Promise.prototype.catch = function (onRejected) {

  }

  /**
   * @description Promise函数对象的resolve方法
   * @param {any} value
   * @returns {Promise} 返回一个指定结果的成功的promise
   */
  Promise.resolve = function (value) {

  }

  /**
   * @description Promise函数对象的reject方法
   * @param {any} reason
   * @returns {Promise} 返回一个指定结果的失败的promise
   */
  Promise.reject = function (reason) {

  }

  /**
   * @description Promise函数对象的all方法
   * @param {Array<Promise>} promises
   * @returns {Promise} 返回一个promise，只有所有的promise都成功时才成功，否则只要有一个失败的就失败
   */
  Promise.all = function (promises) {

  }

  /**
   * @description Promise函数对象的race方法
   * @param {Promise} promises
   * @returns {Promise} 返回一个promise，只有所有的promise都成功时才成功，只要有一个失败就失败
   */
  Promise.race = function (promises) {

  }


  // 向外暴露Promise函数
  window.Promise = Promise
})(window)