function logClass1 (params: any) {
    console.log('类装饰器1')
}
function logClass2 (params: any) {
    console.log('类装饰器2')
}

function logProperty1 () {
    return function (target: any, attr: any) {
        console.log('属性装饰器1')
    }
}
function logProperty2 () {
    return function (target: any, attr: any) {
        console.log('属性装饰器2')
    }
}

function logMethod1 () {
    return function (target: any, methodName: string, desc: any) {
        console.log('方法装饰器1')
    }
}
function logMethod2 () {
    return function (target: any, methodName: string, desc: any) {
        console.log('方法装饰器2')
    }
}

function logParams1 () {
    return function (target: any, methodName: any, paramsIndex: any) {
        console.log('方法属性装饰器1')
    }
}
function logParams2 () {
    return function (target: any, methodName: any, paramsIndex: any) {
        console.log('方法属性装饰器2')
    }
}

@logClass1
@logClass2
class HttpClient {
    @logProperty1()
    @logProperty2()
    public apiUrl: string | undefined
    constructor () {
    }

    @logMethod1()
    @logMethod2()
    getData (@logParams1() p1: any, @logParams2() p2: any) {
    }
}

// 属性装饰器2
// 属性装饰器1
// 方法属性装饰器2
// 方法属性装饰器1
// 方法装饰器2
// 方法装饰器1
// 类装饰器2
// 类装饰器1