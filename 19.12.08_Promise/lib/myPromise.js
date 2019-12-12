(function (window) {
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'
  function MyPromise (excutor) {
    const self = this

    self.status = PENDING
    self.data = undefined
    self.callbacks = []

    function resolve(value) {
      if (self.status !== PENDING) {
        return
      }
      self.status = RESOLVED
      self.data = value
      if (self.callbacks.length > 0 ) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          })
        })
      }
    }

    function reject(reason) {
      if (self.status !== PENDING) {
        return
      }
      self.status = REJECTED
      self.data = reason
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          })
        })
      }
    }

    try {
      excutor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  MyPromise.prototype.then = function (onResolved, onRejected) {
    const self = this
    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    return new MyPromise((resolve, reject) => {

      function handle(callback) {
        try {
          const result = callback(self.data)
          if (result instanceof MyPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }

      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved(value){ handle(onResolved) },
          onRejected(reason){ handle(onRejected) }
        })
      } else if (self.status === RESOLVED) {
        setTimeout(() => {
          handle(onResolved)
        })
      } else {
        setTimeout(() => {
          handle(onRejected)
        })
      }
    })
  }

  MyPromise.prototype.catch = function (reject) {
    return this.then(undefined, reject)
  }


  window.MyPromise = MyPromise
})(window)