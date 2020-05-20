let { generateKeyPairSync, createSign, createVerify, createHash } = require('crypto')

let passphrase = 'passphrase'
let serverRSA = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: passphrase
  }
})

let caRSA = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: passphrase
  }
})

const info = {
  domain: 'http://127.0.0.1:8080',
  publicKey: serverRSA.publicKey
}

// 把这个申请信息发给CA机构 请求颁发证书
// 实现的时候 签名的并不是info，而是它的hash，签名算法性能很差，一般不能计算大量的数据
let hash = createHash('sha256').update(JSON.stringify(info)).digest('hex')
let sign = getSign(hash, caRSA.privateKey, passphrase)
let cert = {
  info,
  sign // CA的签名
} // 这就是证书，客户端会先验证证书的合法性，用CA的公钥验证证书的合法性，然后取出公钥


let valid = verifySign(hash, sign, caRSA.publicKey)
console.log('浏览器验证签名', valid)

// 得到的serverPublicKey
let serverPublicKey = cert.info.publicKey
console.log('服务器公钥', serverPublicKey)

function getSign(content, privateKey, passphrase) {
  var signObj = createSign('RSA-SHA256')
  signObj.update(content)
  return signObj.sign({
    key: privateKey,
    format: 'pem',
    passphrase
  }, 'hex')
}

function verifySign (content, sign, publicKey) {
  var verifyObj = createVerify('RSA-SHA256')
  verifyObj.update(content)
  return verifyObj.verify(publicKey, sign, 'hex')
}