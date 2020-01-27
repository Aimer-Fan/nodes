console.log('hello webpack')

let str = require('./a.js')

console.log(str)

console.log('jquery', $)

require('./index.css')

require('./index.less')

const fn = () => {
  console.log('AimerFan')
}

fn()

@log
class A {
  a = 1;
}

function log(target) {
  console.log(target)
}

console.log(new A().a)


