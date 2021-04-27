let obj1 = {
    a: {
        b: 1
    }
}
function deepClone(obj) {
    let cloneObj = {};
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            cloneObj[key] = deepClone(obj[key]);
        } else {
            cloneObj[key] = obj[key];
        }
    }
    return cloneObj;
}

var total = [1, 2, 3];
var a = Object.prototype.toString.call(total);
console.log(a);

var b = Array.isArray(total);
console.log(b);


console.log(typeof (undefined));
console.log(typeof (null));
console.log(typeof (NaN));

console.log(Number.MAX_SAFE_INTEGER);

var b = ["1", "2", "3"].map(parseInt);

console.log(b);


function New(func) {
    let res = {};
    if (func.prototype !== null) {
        res.__proto__ = func.prototype;
    }
    //这里是
    var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
    if (typeof ret === "null" || typeof ret === "function" || typeof ret === "null") {
        return ret;
    }
    return res;
}

function instance(left, right) {
    var leftVal = left.__proto__;
    var rightVal = rightVal.prototype;
    while (leftVal !== null) {
        if (leftVal === rightVal) return true;
        leftVal = leftVal.__proto__;
        rightVal = rightVal.prototype;
    }
    return false;
}

//防抖
function debounce(fn, wait) {
    let timer = null;
    return function () {
        var context = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, wait)
    }
}

//节流
function throttle(fn, wait) {
    let timer = null;
    return function () {
        var context = this;
        var args = arguments;
        if (timer) {
            return;
        }
        timer = setTimeout(function () {
            fn.apply(context, args);
            timer = null;
        }, wait);
    }
}
