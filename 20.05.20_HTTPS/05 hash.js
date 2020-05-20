/**
 * 1. 不同的输入有不同的输出
 * 2. 不能从hash反推出输入
 * 3. 长度固定
 */
function hash (num) {
  return (num % 1024 + '').padStart(4, '0')
}

console.log(hash(1200))