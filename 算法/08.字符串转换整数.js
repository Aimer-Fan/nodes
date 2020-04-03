/**
  请你来实现一个 atoi 函数，使其能将字符串转换成整数。

  首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。接下来的转化规则如下：

  如果第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字字符组合起来，形成一个有符号整数。
  假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成一个整数。
  该字符串在有效的整数部分之后也可能会存在多余的字符，那么这些字符可以被忽略，它们对函数不应该造成影响。
  注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换，即无法进行有效转换。

  在任何情况下，若函数不能进行有效的转换时，请返回 0 。

  提示：

  本题中的空白字符只包括空格字符 ' ' 。
  假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。
   

  示例 1:

  输入: "42"
  输出: 42
 
 */


/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {
  const START = 'START'
  const SIGNED = 'SIGNED'
  const IN_NUMBER = 'IN_NUMBER'
  const END = 'END'

  const MIN_VALUE = -2e31
  const MAX_VALUE = 2e31 - 1

  const status = {
    // ' ', +/-, number, other
    START: [START, SIGNED, IN_NUMBER, END],
    SIGNED: [END, END, IN_NUMBER, END],
    IN_NUMBER: [END, END, IN_NUMBER, END],
    END: [END, END, END, END]
  }

  let currentStatus = START

  for (let i = 0; i < str.length; i++) {
    let type = getType(str[i])
    currentStatus = status[currentStatus][type]
    if (currentStatus === IN_NUMBER) {
      let val = parseInt(str.slice(0, i))
      if (val > MAX_VALUE) return 'INT_MAX (2e31 − 1)'
      else if (val < MIN_VALUE) return 'INT_MIN (−2e31)'
    }
    if (currentStatus === END) {
      let val = str.slice(0, i)
      if (val.length == 1 && (val.charAt(0) === '+' || val.charAt(0) === '-')) return 0
      return parseInt(val)
    }
  }
}

function isEmpty (char) {
  return char === ' '
}

function isSign (char) {
  return ['+', '-'].indexOf(char) !== -1
}

function isNumber (char) {
  return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(char) !== -1
}

function getType(char) {
  return isEmpty(char) ? 0
          : isSign(char) ? 1
            : isNumber(char) ? 2
              : 3
}

console.log(myAtoi('-12321321455436546754634243246543654ad2131sadwaa'))
