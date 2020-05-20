/**
 * RSA 非对称加密算法（加密用的密钥和解密用的密钥不一致）
 * 两个质数相乘得到一个结果，正向乘很容易
 * 但是给你一个乘积，算出两个质数却很难
 * p * q = K
 */

let p = 3
let q = 11
let N = p * q // 33
let fn = (p - 1) * (q - 1) // 欧拉函数
let e = 7 // 随意挑选一个指数e
{ e, N } // 就是公钥 公钥可以发给任何人
// 公钥私钥是一对，公钥加密的数据用对应的私钥解密，私钥加密的数据用对应的公钥解密
// 可以通过公钥去推算私钥，但是前提是需要知道fn
// e * d % fn === 1 说明就是我们要找的密钥
for (var d = 1; e * d % fn !== 1; d++) {
}
console.log(d) // d = 3

let data = 5
let c = Math.pow(data, e) % N
console.log('c', c)
let original = Math.pow(c, d) % N
console.log(original)