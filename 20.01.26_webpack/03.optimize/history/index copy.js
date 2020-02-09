import calc from './test.js'
// import 在生产环境下，会自动的去除没用的代码（minus）
// tree-shacking 把没用到的代码自动删除掉（require方法不支持）
// es6 模块会把结果放在default上

console.log(calc.sum(1, 2))


// scope hosting 变量提升
let a = 1
let b = 2
let c = 3
let d = a + b + c // 在webpack中会自动省略简化的代码
console.log(d)

// 编译后会直接复制变量d的值 而不会重新声明变量