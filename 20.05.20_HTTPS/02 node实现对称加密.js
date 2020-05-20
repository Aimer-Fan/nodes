let crypto = require('crypto')

function encrypt(data, key, iv) {
  let cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
  cipher.update(data, 'utf8', 'hex')
  return cipher.final('hex')
}

function decrypt(data, key, iv) {
  let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  decipher.update(data, 'hex', 'utf8')
  return decipher.final('utf8')
}

const key = '1234567890123456'
const iv = '1234567890123456'

let data = 'hello'
let encryptData = encrypt(data, key, iv)
console.log(encryptData)

let decryptData = decrypt(encryptData, key, iv)
console.log(decryptData)
