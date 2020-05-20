let crypto = require('crypto')

let content = '123456'

let md5Hash = crypto.createHash('md5').update(content).digest('hex')
console.log(md5Hash, md5Hash.length)
// e10adc3949ba59abbe56e057f20f883e 32

let salt = '123456'
let sha1Hash = crypto.createHmac('sha256', salt).update(content).digest('hex')
console.log(sha1Hash, sha1Hash.length)
// b8ad08a3a547e35829b821b75370301dd8c4b06bdd7771f9b541a75914068718 64