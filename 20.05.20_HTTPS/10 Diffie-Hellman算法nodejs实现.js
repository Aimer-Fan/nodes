let { createDiffieHellman } = require('crypto')

// 客户端
let client = createDiffieHellman(512)
let clientKeys = client.generateKeys() // A
let prime = client.getPrime() // P
let generator = client.getGenerator() // N

// 服务器端
let server = createDiffieHellman(prime, generator)
let serverKeys = server.generateKeys() // B

let client_secret = client.computeSecret(serverKeys)
let sercer_secret = server.computeSecret(clientKeys)

console.log(client_secret.toString('hex'), sercer_secret.toString('hex'))