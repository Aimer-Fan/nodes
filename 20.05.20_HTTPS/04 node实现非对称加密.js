// 生成密钥对   私钥加密  公钥解密
let { generateKeyPairSync, privateEncrypt, publicDecrypt } = require('crypto')
// 生成密钥对 一个是公钥 一个是私钥
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

let message = 'hello'
let encryptMessage = privateEncrypt({
  key: rsa.privateKey,
  passphrase: 'passphrase'
}, Buffer.from(message, 'utf8'))
console.log('encryptMessage', encryptMessage)

let decryptMessage = publicDecrypt(rsa.publicKey, encryptMessage)
console.log('decryptMessage', decryptMessage.toString())

