class Dep {
  constructor() {
    this.subs = [] // 存放所有的watcher
  }
  // 订阅
  addSub(watcher) { // 添加watcher的方法
    this.subs.push(watcher)
  }
  // 发布
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}

// 观察者模式（发布订阅）
class Watcher {
  constructor(vm, expr, callback) { // vm.$watcher(vm, 'school.name', newVal => {})
    this.vm = vm
    this.expr = expr
    this.callback = callback
    // 默认先存放一个老值
    this.oldVal = this.get()
  }
  get() {
    // 先把自己放在this上
    Dep.target = this
    // 取值 把这个观察者 和数据关联起来
    let value =  CompileUtil.getVal(this.vm, this.expr)
    // 不取消任何取值都会添加watcher
    Dep.target = null
    return value
  }
  // 更新操作 数据变化后会调用观察者的update方法
  update() {
    let newVal = CompileUtil.getVal(this.vm, this.expr)
    if (newVal !== this.oldVal) {
      this.callback(newVal)
    }
  }
}

class Observer { // 实现数据劫持
  constructor(data) {
    this.observer(data)
  }
  observer(data) {
    // 如果是对象才观察
    if (data && typeof data === 'object') {
      for (let key in data) {
        this.defineReactive(data, key, data[key])
      }
    }
  }
  defineReactive(obj, key, value) {
    this.observer(value)
    let dep = new Dep() // 给每一个属性都加上一个具有发布订阅的功能
    Object.defineProperty(obj, key, {
      get() {
        // 创建Wathcer时会取到对应的内容 并且把watcher放到全局上
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: newVal => {
        if (newVal !== value) {
          this.observer(newVal)
          value = newVal
          dep.notify()
        }
      }
    })
  }
}

class Compiler {
  constructor(el, vm) {
    // 判断el属性是不是元素 如果不是就获取他
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    // 把vm放到this中方便以后获取
    this.vm = vm

    // 把当前节点中的元素 获取到 放到内存中
    let fragment = this.node2fragment(this.el)

    // 把节点中的内容进行替换

    // 用数据编译模板
    this.compile(fragment)

    // 把内容在塞到页面中
    this.el.appendChild(fragment)
  }
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 编译元素
  compileElement(node) {
    // 拿到所有的属性（类数组）
    let attributes = node.attributes;
    [...attributes].forEach(attr => { // type=text v-model="school.name"
      // 拿到属性的key和value
      let { name, value:expr } = attr
      // 判断是不是指令
      if (this.isDirective(name)) {
        // console.log('element', node)
        let [, directive] = name.split('-')
        let [directiveName, eventName] = directive.split(':')
        // 需要调用不同的指令来处理
        CompileUtil[directiveName](node, expr, this.vm, eventName)
      }
    })
  }
  // 编译文本
  compileText(node) {
    // 判断当前文本节点中的内容是否包含模板语法
    let content = node.textContent
    if (/\{\{(.+?)\}\}/.test(content)) {  // RegExp 规则：匹配{{}}中的内容
      // 找到所有文本
      CompileUtil['text'](node, content, this.vm)
    }
  }
  // 核心的编译方法 编译内存中的dom节点
  compile(node) {
    let childNodes = node.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        this.compileElement(child)
        // 如果是元素的话 需要把自己传进去 再去遍历子节点
        this.compile(child)
      } else {
        this.compileText(child)
      }
    })
  }
  // 把节点移动到内存中
  node2fragment(node) {
    // 创建一个文档碎片
    let fragment = document.createDocumentFragment()
    let firstChild
    while (firstChild = node.firstChild) {
      // appendChild() 具有移动性
      fragment.appendChild(firstChild)
    }
    return fragment
  }
  // 是不是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}

CompileUtil = {
  // 根据表达式渠道对应的数据
  getVal(vm, expr) {
    // 循环的取出表达式中的值 去除表达式字符串两端的空白字符
    return expr.trim().split('.').reduce((data, current) => {
      return data[current]
    }, vm.$data)
  },
  setVal(vm, expr, value) {
    return expr.trim().split('.').reduce((data, current, index, arr) => {
      if (index == arr.length - 1) {
        return data[current] = value
      }
      return data[current]
    }, vm.$data)
  },
  // 解析v-model指令
  model(node, expr, vm) { // node是节点 expr是表达式 vm是当前实例
    // 1. 从vm中取出值
    let value = this.getVal(vm, expr)
    new Watcher(vm, expr, newVal => {
      // 给输入框加一个观察者 如果稍后数据更新了会触发此方法 会拿新值给输入框赋值
      fn(node, newVal)
    })
    // 2. 得到更新的函数（更新操作封装成一个对象）
    let fn = this.updater['modelUpdater']
    // 3. 调用更新的函数
    fn(node, value)
    node.addEventListener('input', e => {
      let value = e.target.value
      this.setVal(vm, expr, value)
    })
  },
  html(node, expr, vm) {
    // 1. 从vm中取出值
    let value = this.getVal(vm, expr)
    new Watcher(vm, expr, newVal => {
      // 给输入框加一个观察者 如果稍后数据更新了会触发此方法 会拿新值给输入框赋值
      fn(node, newVal)
    })
    // 2. 得到更新的函数（更新操作封装成一个对象）
    let fn = this.updater['htmlUpdater']
    // 3. 调用更新的函数
    fn(node, value)
  },
  on(node, expr, vm, eventName) {
    node.addEventListener(eventName, e => {
      vm[expr].call(vm, e)
    })
  },
  getContentValue(vm, expr) {
    // 遍历表达式 将内容重新替换成一个完整的内容返回去
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1])
    })
  },
  text(node, expr, vm) { // expr --> {{aaa}} {{bb}}
    let fn = this.updater['textUpdater']
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      // 给表达式每一个大括号都加上观察者
      new Watcher(vm, args[1], newVal => {
        fn(node, this.getContentValue(vm, expr)) // 返回了一个全的字符串
      })
      return this.getVal(vm, args[1]) 
    })
    fn(node, content)
  },
  updater: {
    // 把数据插入到节点中
    modelUpdater(node, value) {
      node.value = value
    },
    htmlUpdater(node, value) {
      node.innerHTML = value
    },
    textUpdater(node, value) {
      node.textContent = value
    }
  }
}

// 基类
class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    let computed = options.computed
    let methods = options.methods

    // 如果根元素存在 编译模板
    if (this.$el) {
      // 把数据全部转化成Object.defineProperty来定义
      new Observer(this.$data)

      // 计算属性
      for (let key in computed) {
        Object.defineProperty(this.$data, key, {
          get: () => {
            return computed[key].call(this)
          }
        })
      }

      for (let key in methods) {
        Object.defineProperty(this, key, {
          get() {
            return methods[key]
          }
        })
      }

      // 把数据获取操作 vm上的取值操作都代理到 vm.$data
      this.proxyVm(this.$data)

      // 编译模板
      new Compiler(this.$el, this)
    }
  }

  proxyVm(data) {
    for (let key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key] // 进行了转化操作
        },
        set(newVal) {
          data[key] = newVal
        }
      })
    }
  }
}