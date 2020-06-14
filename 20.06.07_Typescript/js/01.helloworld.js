"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function logClass1(params) {
    console.log('类装饰器1');
}
function logClass2(params) {
    console.log('类装饰器2');
}
function logProperty1() {
    return function (target, attr) {
        console.log('属性装饰器1');
    };
}
function logProperty2() {
    return function (target, attr) {
        console.log('属性装饰器2');
    };
}
function logMethod1() {
    return function (target, methodName, desc) {
        console.log('方法装饰器1');
    };
}
function logMethod2() {
    return function (target, methodName, desc) {
        console.log('方法装饰器2');
    };
}
function logParams1() {
    return function (target, methodName, paramsIndex) {
        console.log('方法属性装饰器1');
    };
}
function logParams2() {
    return function (target, methodName, paramsIndex) {
        console.log('方法属性装饰器2');
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function (p1, p2) {
    };
    __decorate([
        logProperty1(),
        logProperty2()
    ], HttpClient.prototype, "apiUrl", void 0);
    __decorate([
        logMethod1(),
        logMethod2(),
        __param(0, logParams1()), __param(1, logParams2())
    ], HttpClient.prototype, "getData", null);
    HttpClient = __decorate([
        logClass1,
        logClass2
    ], HttpClient);
    return HttpClient;
}());
// 属性装饰器2
// 属性装饰器1
// 方法属性装饰器2
// 方法属性装饰器1
// 方法装饰器2
// 方法装饰器1
// 类装饰器2
// 类装饰器1
