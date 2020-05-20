/**
 * 数字签名和数据证书实现过程
 */

let { generateKeyPairSync, createSign, createVerify } = require('crypto')

let rsa = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'passphrase'
  }
})

let file = 'file'
// 创建签名对象
let signObj = createSign('RSA-SHA256')
// 放入文件内容
signObj.update(file)
// 用RSA私钥签名，输出一个16进制的字符串
let sign = signObj.sign({
  key: rsa.privateKey,
  format: 'pem',
  passphrase: 'passphrase'
}, 'hex')
console.log('sign', sign)

// 创建验证签名对象
let verifyObj = createVerify('RSA-SHA256')
// 放入文件内容
verifyObj.update(file)
// 验证签名是否合法
let isValid = verifyObj.verify(rsa.publicKey, sign, 'hex')
console.log('isValid', isValid)

/**
 * 如何知道签名是否正确？
 * 验证方拿到文件file，然后用publicKey计算签名sign，如果和对方的sign匹配，则验证通过
 * 
 */

