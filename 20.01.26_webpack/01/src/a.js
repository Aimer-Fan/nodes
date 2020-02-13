require('@babel/polyfill')

class B {
}

function * gen(params) {
  yield 1
}

console.log(gen().next())

'aaa'.includes('a')
export const str = 'AimerFan from a.js'