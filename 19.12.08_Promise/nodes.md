# Promise

# 1. Promise 是什么？

### 1.1 理解

1. 抽象表达：

   Promise是JS中进行异步编程的新的解决方案（旧的是谁？）（回调）

2. 具体表达：
   1. 从语法上来说：Promise是一个构造函数
   2. 从功能上来说：promise对象用来封装一个异步操作并可以获取结果

### 1.2 promise的状态改变

1. pending变为resolved

2. pending变为rejected

   说明：只有这2种，且一个promise对象只能改变一次

   无论变为成功还是失败都会有一个结果数据

   成功的结果数据一般为value，失败的结果一般称为reason

### 1.3 Promise的基本流程

![promises](./img/promises.png)

## 2. 为什么要用Promise？

### 2.1 指定回调函数的方式更加灵活

1. 旧的：必须在启动异步任务前指定
2. prmise：启动异步任务 => 返回promise对象 => 给promise对象绑定回调函数（升值可以在异步任务结束后指定/多个）

### 2.2 支持链式调用，可以解决回调地狱问题

1. 什么是回调地狱？

   回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行的条件

2. 回调地狱的缺点？

   不便于阅读

   不便于异常处理

3. 解决方案？

   promise链式调用

4. 终极解决方案？

   async/await

## 3. 如何使用Promise?

### 3.1 API

1. Promise 构造函数：Promise(excutor) {}

   1. excutor函数：同步执行 (resolve, reject) => {}
   2. resolve函数：内部定义成功时我们调用的函数 value => {}
   3. reject函数：内部定义失败时我们调用的函数 reason => {}

   说明：excutor会在Promise内部立即同步回调，异步操作再执行器中执行

2. Promise.prototype.then 方法: (onResolved, onRejected) => {}

   1. onResolved函数：成功的回调函数 (value) => {}
   2. onRejected函数：失败的回调函数 (reason) => {}

   说明：指定用于得到成功value的成功回调和用于得到失败reason的失败回调

​       返回一个新的promise对象

3. Promise.prototype.catch 方法：(onRejected) => {}
   1. onRejected函数：失败的回调函数 (reason) => {}

   说明：then()的语法糖，相当于：then(undefined, onRejected)

4. Promise.resolve 方法：(value) => {}

   1. value：成功的数据或promise对象

   说明：返回一个成功/失败的promise对象

5. Promise.reject 方法：(reason) => {}
   1. reason：失败的原因

​        说明：返回一个失败的promise对象

6. Promise.all 方法：(pormises) => {}

   1. pormises：包含n个promise的数组

   说明：返回一个新的promise，只有所有的promise都成功才成功，只要有一个失败了就直接失败

7. Promise.race 方法：(pormises) => {}

   1. pormises：包含n个promise的数组

   说明：返回一个新的promise，第一个完成的promise的结果就是最终的结果状态

### 3.2 promise的几个关键问题

