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

