## 正则表达式
regular expression: RegExp
用来处理字符串的规则

+ 只能处理字符串

+ 他是一个规则：可以验证字符串是否符合某个规则（test），也可以把字符串中符合规则的内容捕获到(exec/match)

```js
let str = 'good good study, day day up!'
let reg = /\d+/
reg.test(str) // 验证当前字符串时候符合当前规则（是否包含数字） // => false
str = '1998-01-23'
reg.exec(str) // => ['1998', index: 0, inputs: '1998-01-23']
```

### 编写正则表达式

创建方式有两种

```js
// 字面量创建方式（两个斜杠包起来的，都是用来描述正则规则的元字符）
let reg1 = /\d+/

// 构造函数方式
// 两个参数： 元字符字符串 修饰符字符串
let reg2 = new RegExp('\\d+')
```

### 正则表达式有两部分组成

+ 元字符
+ 修饰符

```js
/* 常用的元字符
	1. 量词元字符（设置出现的次数）
		*		零到多次
		+		一到多次
		? 		零次或一次
		{n} 	出现n次
		{n,}	出现n到多次
		{n,m}	出现n到m次
		
    2. 特殊元字符（单个或组合一起代表特殊含义）
    	\		转义字符(普通->特殊->普通)
    	.		除\n(换行符)以外的任意字符
    	^		以哪一个元字符作为开始
    	$		以哪一个元字符作为结束
    	\n		换行符
    	\d		0~9之间的数字
    	\D		非0~9之间的数字（大写和小写的意思是相反的）
    	\w		数字、字母、下划线中的任意一个字符
    	\s		一个空白字符(包含空格、制表符、换页符等)
    	\t		一个制表符(一个tab键:四个空格)
    	\b		匹配一个单词的边界
    	x|y		x或者y中的一个字符
    	[xyz]	x或者y或者z中的一个字符
        [^xy]	除了x/y以外的任意字符
        [a-z]	指定a-z这个范围中的任意字符
        [^a-z]	除了a-z这个范围内的任意字符
        ()		正则中的分组符号
        (?:)	只匹配不捕获
        (?=)	正向预查
        (?!)	负向预查
    
    3. 普通元字符（代表本身含义）
*/
```

```js
/*
	正则表达式中的常用修饰符
        i => ignorecase		忽略单词的大小写
        m => multiline		可以进行多行匹配
        g => global			全局匹配
*/
```

### 元字符详细解析

+ ```^ &```

  ```js
  let reg = /^\d/
  reg.test('2019abc') // => true
  reg.test('abc2019') // => false
  reg.test('abc') // => false
  ```

  ```js
  let reg = /\d$/
  reg.test('2019abc') // => false
  reg.test('abc2019') // => true
  reg.test('abc') // => false
  ```

  ```js
  // ^和$ 都不加表示：字符串中包含规则的内容即可
  // ^和$ 都加表示： 字符串只能是和规则一直的内容
  ```

+ ```\```

  ```js
  // 这里的 . 代表的是除 \n 意外的任意字符
  let reg = /^2.3$/
  reg.test('2.3')		// => true
  reg.test('2@3')		// => true
  reg.test('23') 		// => false

  // 使用转义字符，让其只能代表小数点
  reg = /^2\.3$/
  reg.test('2.3')		// => true
  reg.test('2@3')		// => false
  
  let str = '\\d'
  reg = /^\d$/		// => \d 代表 0-9 的数字
  reg.test(str)		// => false
  reg = /^\\d$/		// => 把特殊符号转化成普通的
  reg.test(str)		// => true
  ```

+ ```x|y```

  ```js
  let reg = /^18|29$/
  reg.test('18')		// => true
  reg.test('29')		// => true
  reg.test('129')		// => true
  reg.test('189')		// => true
  reg.test('1829')	// => true	
  reg.test('829')		// => true
  reg.test('182')		// => true
  // -----直接 x|y 存在很乱的优先级，一般我们写的时候都伴随着小括号进行分组，因为小括号改变处理的优先级 => 小括号：分组
  reg = /^(18)|(29)$/
  // => 现在只能是 18 或 29 中的一个了
  reg.test('18')		// => true
  reg.test('29')		// => true
  reg.test('129')		// => false
  reg.test('189')		// => false
  ```

+ ```[]```

  ```js
  // 1. 中括号中出现的字符一般都代表本身的含义
  let reg = /^[@+]$/
  reg.test('@')		// => true
  reg.test('+')		// => true
  reg.test('@@')		// => false
  reg.test('@+')		// => false
  
  reg = /^[\d]$/		// => \d 在中括号中还是 0-9
  reg.test('d')		// => false
  reg.test('\\')		// => false
  reg.test('9')		// => true
  
  // 中括号中不存在多位数
  reg = /^[18]$/
  reg.test('1')		// => true
  reg.test('8')		// => true
  reg.test('18')		// => false
  
  reg = /^[10-29]$/	// => 1 或者 0-2 或者 9
  reg.test('1')		// => true
  reg.test('9')		// => true
  reg.test('0')		// => true
  reg.test('2')		// => true
  reg.test('10')		// => false
  ```

### 常用的正则表达式

+ 验证是否为有效数字

  ```js
  // 1. 可能出现 + - 号，也可能不出现		[+-]?
  // 2. 一位0-9都可以，多位首位不能是0		(\d|([1-9]\d+))
  // 3. 小数部分可能有可能没有，一旦有必须有小数点+数字		(\.\d+)?
  let reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/
  ```

+ 验证密码

  ```js
  // 1. 数字、字母、下划线
  // 2. 6~16位
  let reg = /^\w{6~16}$/
  ```

+ 验证真实姓名

  ```js
  // 1. 验证汉字 /^[\u4E00-\u9FA5]$/
  // 2. 名字长度 2~10 位
  // 3. 可能有译名
  let reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/
  ```

+ 验证邮箱

  ```js
  let reg = /^\w+((-\w+)|(\.\w+)*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  ```

+ 验证身份证号

  ```js
  // 小括号的第二个作用：分组捕获
  // 不仅可以把正则匹配的信息捕获到，还可以单独捕获到每个小分组的内容
  let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{2})(\d)(\d|X)$/
  let str = '41302619980123691X'
  reg.exec(str) // => ["41302619980123691X", "413026", "1998", "01", "23", "69", "1", "X"]
  ```

### 正则两种创建方式的区别

```js
// 构造函数因为传递的是字符串，\需要写两个才表示斜杠
let reg = /\d+/g
reg = new RegExp('\\d', 'g')

// 正则表达式中的部分内容是变量存储的值
// 两个斜杠中间包起来的都是元字符(如果正则中要包含某个变量的值，则不能使用字面量方式创建，只能使用构造函数方式创建)
let type = 'AimerFan'
reg = /^@"+type+"@$/
reg.test('@AimerFan@')		// => false
reg.test('@"""AimerFannn"@')// => true

reg = new RegExp('^@'+type+'@$')
reg.test('@AimerFan@')		// => true
```

## 正则的捕获

> 实现正则捕获的方法
>
> + 正则里的方法 RegExp.proptype 上的方法
>   + exec
>   + test
> + 字符串 String.proptype 上支持正则表达式处理的方法
>   + replace
>   + match
>   + splite

```js
// 实现正则捕获的前提是：当前字符串要与字符串匹配，如果不匹配，捕获的结果是null

/*
	基于exec实现正则的捕获
		1. 捕获的结果是null或者一个数组
			第一项：本次捕获到的内容
			其余项：对应小分组本次单独捕获的内容
			index：当前捕获的结果在字符串中起始索引
			input：原始字符串
        2. 每执行一次exec只能捕获到一个符合正则规则的（懒惰性）	
        	原因是：reg有一个属性lastIndex，该属性表示的当前正则下一次匹配的起始索引位置，默认情况下该变量不会被修改，且默认为0
        3. 设置全局模式后 匹配完会修改 lastIndex 的值
        4. 当捕获的结果为 null 的时候 lastIndex 的值会被修改成 0
        
        注意：test 方法在 全局匹配 模式下也会修改 lastIndex 的值
*/

let str = 'AimerFan2019AimerFan2020AimerFan1998'
let reg = /\d+/
reg.test(str)		// => true
reg.exec(str)		// => ["2019", index: 8, input: "AimerFan2019AimerFan2020AimerFan1998", groups: undefined]
```

> 一次性捕获所有匹配项方法
>
> + 必须设置为 global 全局模式
>
> + String.proptype 上的 match 方法支持匹配所有符合正则的结果

### 正则的分组捕获

```js
let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{2})(\d)(?:\d|X)$/
let str = '41302619980123691X'
reg.exec(str) // => ["41302619980123691X", "413026", "1998", "01", "23", "69", "1"]
// 如果设置了分组（改变优先级），但是捕获的时候不需要单独捕获，可以基于 :? 来处理
```

```javascript
// 即要捕获到{数字}，也想单独的把数组也捕获到
let str = '{0}年{1}月{2}日'
let reg = /\{(\d+)\}/g
reg.exec(str)		// => ["{0}", "0", index: 0, input: "{0}年{1}月{2}日", groups: undefined]
str.match(reg)		// => ["{0}", "{1}", "{2}"]
```

```js
// 分组的第三个作用：分组引用
let str = 'book' // => 'good', 'look', 'moon', 'foot'
let reg = /^[a-zA-Z]([a-zA-Z])\1[a-zA-Z]$/ // => 分组引用就是通过 \数字 让其代表和对应分组出现一模一样的内容
reg.test('book')		// => true
reg.test('deep')		// => true
reg.test('some')		// => false
```

### 正则捕获的贪婪性

```js
let str = 'AmierFan2019@2020'
// 正则捕获的贪婪性：默认情况下，正则捕获的时候，是按照当前正则所匹配的最长结果来获取的
let reg = /\d+/g
str.match(reg)		// => ['2019', '2020']

// 在量词元字符后面设置?	取消捕获时候的贪婪性（按照正则匹配的最短结果来获取）
reg = /\d+?/g
str.match(reg)		// => ["2", "0", "1", "9", "2", "0", "2", "0"]
```

### ？在正则中的用法

+ 问号左边是非量词元字符：本身代表量词元字符，出现零到一次
+ 问号左边是量词元字符：取消捕获时候的贪婪性
+ (?:) 之匹配不捕获
+ (?=)正向预查
+ (?!)负向预查

