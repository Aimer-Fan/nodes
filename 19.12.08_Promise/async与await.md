# async与await

## async函数

1. 函数的返回值为promise对象

2. promise对象的结果由async函数执行的返回值决定

## await表达式

await右侧的表达式一般为promise对象，但也可以是其它的值

如果表达式是promise对象，await返回的是promise成功的值

如果表达式时其他值，直接将此值作为await的返回值

**注意：**

await必须写在async函数中，但async函数中可以没有await

如果await的promise失败了，就会抛出异常，需要通过try...catch来捕获处理