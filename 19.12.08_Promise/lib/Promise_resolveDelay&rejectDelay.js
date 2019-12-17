/**
 * 自定义Promise函数模块：IIFE
 */
(function (window) {

  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  /**
   * @description Promise构造函数
   * @param {Function} excutor 执行器函数（同步）
   */
  function Promise(excutor) {
    const self = this
    self.status = PENDING // 给promise对象指定status属性，初始值为pending
    self.data = undefined // 给promise对象指定一个存储结果数据的属性
    self.callbacks = [] // 每个元素的结构 { onResolved(){}, onRejected(){} }

    function resolve(value) {
      // 如果当前状态不是pending，直接结束
      if (self.status !== PENDING) {
        return
      }
      // 将状态改为resolved
      self.status = RESOLVED
      // 保存value数据
      self.data = value
      // 如果有待执行的callback函数，立即异步执行回调onResolved
      if (self.callbacks.length > 0) {
        setTimeout(() => { // 放入队列中执行所有成功的回调
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          })
        })
      }
    }

    function reject(reason) {
      // 如果当前状态不是pending，直接结束
      if (self.status !== PENDING) {
        return
      }
      // 将状态改为rejected
      self.status = REJECTED
      // 保存reason数据
      self.data = reason
      // 如果有待执行的callback函数，立即异步执行回调onRejected
      if (self.callbacks.length > 0) {
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
    // 向后传递成功的value
    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    // 实现异常穿透关键点，指定默认的失败的回调，向后传递失败的reason
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }


    // 返回一个新的promise对象
    return new Promise((resolve, reject) => {
      /**
       * @description 指定回调函数处理，根据执行的结果改变return的promise状态
       * @param {Function} callback
       */
      function handle(callback) {
        /**
         * 如果抛出异常，return的promise就会失败，reason就是error
         * 如果回调函数执行返回不是promise，return的promise就会成功，value就是返回的值
         * 如果回调函数返回的是promise，return的promise的结果就是这个promise的结果
         */
        try {
          const result = callback(self.data)
          // 这个值可能是promise也可能不是
          if (result instanceof Promise) {
            // 如果是promise，return的promise的结果就是这个promise的结果
            // result.then(
            //   value => { resolve(value) },
            //   reason => { reject(reason) }
            // )
            result.then(resolve, reject)
          } else {
            // 如果不是promise，return的promise就会成功，value就是返回的值
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }

      // 当前是pending状态，将回调函数保存起来
      if (self.status === PENDING) {
        self.callbacks.push({
          // 在这里要修改promise的状态
          onResolved (value) {
            handle(onResolved)
          },
          onRejected (reason) {
            handle(onRejected)
          }
        })
      } else if (self.status === RESOLVED) { // 如果当前是resolved的状态，异步执行onResolved并改变return的promise状态
        setTimeout(() => {
          handle(onResolved)
        })
      } else { // rejected
        setTimeout(() => {
          handle(onRejected)
        })
      }
    })
  }

  /**
   * @description Promise原型对象的catch()
   * @param {Function} onRejected
   * @returns {Promise} 新的promise对象
   */
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  }

  /**
   * @description Promise函数对象的resolve方法
   * @param {any} value
   * @returns {Promise} 返回一个指定结果的成功的promise
   */
  Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
      // value 是promise
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else {
        // value不是promise
        resolve(value)
      }
    })
  }

  /**
   * @description Promise函数对象的reject方法
   * @param {any} reason
   * @returns {Promise} 返回一个指定结果的失败的promise
   */
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  /**
   * @description Promise函数对象的all方法
   * @param {Array<Promise>} promises
   * @returns {Promise} 返回一个promise，只有所有的promise都成功时才成功，否则只要有一个失败的就失败
   */
  Promise.all = function (promises) {
    const values = new Array(promises.length) // 用来保存所有成功value的数组
    let resolvedCount = 0 // 用来保存成功promise的数量
    return new Promise((resolve, reject) => {
      // 遍历获取每个promise的结果
      promises.forEach((p, index) => {
        // 这里考虑到传入的参数不是promise的情况，直接将其转化成成功的promise
        Promise.resolve(p).then(
          value => { // 成功了，将成功的value保存到values中
            resolvedCount++ // 成功的数量加一
            values[index] = value
            // 如果全部成功了，将return的Promise改为成功
            if (resolvedCount === promises.length) {
              resolve(values)
            }
          },
          reason => { // 只要有一个失败了，return的promise就失败了
            reject(reason)
          }
        )
      })
    })
  }

  /**
   * @description Promise函数对象的race方法
   * @param {Array<Promise>} promises
   * @returns {Promise} 返回一个promise，只有所有的promise都成功时才成功，只要有一个失败就失败
   */
  Promise.race = function (promises) {
    // 返回一个promise
    return new Promise((resolve, reject) => {
      // 遍历获取每个promise的结果
      promises.forEach(p => {
        // 这里考虑到传入的参数不是promise的情况，直接将其转化成成功的promise
        Promise.resolve(p).then(
          value => { // 一旦有成功的，将return的promise变为成功
            resolve(value)
          },
          reason => { // 一旦有失败的，将return的promise变为失败
            reject(reason)
          }
        )
      })
    })
  }

  /**
   * @description 返回一个promise对象，在指定的时间后才确定结果
   * @param {any} value 成功的值
   * @param {Number} time 延迟时间
   * @returns {Promise}
   */
  Promise.resolveDelay = function (value, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      }, time)
    })
  }

  /**
   * @description 返回一个promise对象，在指定的时间后才失败
   * @param {any} reason 错误原因
   * @param {Number} time 延迟时间
   * @returns {Promise}
   */
  Promise.rejectDelay = function (reason, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason)
      }, time)
    })
  }


  // 向外暴露Promise函数
  window.Promise = Promise
})(window)