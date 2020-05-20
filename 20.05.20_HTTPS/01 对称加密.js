let secret = 3

let message = 'hello'

function encrypt(message) {
  let buffer = Buffer.from(message)

  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = buffer[i] + secret
  }

  return buffer.toString()
}

function decrypt(message) {
  let buffer = Buffer.from(message)

  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = buffer[i] - secret
  }

  return buffer.toString()
}


let encryptMessage = encrypt(message)
console.log(encryptMessage)

let decryptMessage = decrypt(encryptMessage)
console.log(decryptMessage)