var version = ["1.34.5", "1.23123.10", "1.1.1"];
function cmp(a, b) {
    var len_a = a.length;
    var len_b = b.length;
    var i = 0;
    var j = 0;
    for (; i < len_a, j < len_b; i++, j++) {
        var str_a = '';
        while (a[i] != '.' && i < len_a) {
            str_a += a[i];
            i++;
        }
        var num_a = Number(str_a);
        var str_b = '';
        while (b[j] != '.' && j < len_b) {
            str_b += b[j];
            j++;
        }
        var num_b = Number(str_b);
        if (num_b === num_a) {
            continue;
        } else {
            return num_b < num_a;
        }
    }
}
version.sort(cmp);
console.log(version);

var s = ['a', 'f', 'g', 'k'];
var cmp1 = function () {
    var number = Math.random();
    return number > 0.5;
}
s.sort(cmp1);
console.log(s);

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

let myInstanceof = (target, origin) => {
    while (target) {
        if (target.__proto__ === origin.prototype) {
            return true;
        }
        target = target.__proto__;
    }
    return false;
}


Array.prototype.myMap = function (fn, thisValue) {
    let res = [];
    thisValue = thisValue || [];
    let arr = this;
    for (let i in arr) {
        res.push(fn(arr[i]));
    }
    return res;
}

function depyCpoy(newObj, oldObj) {
    for (var k in oldObj) {
        let item = oldObj[k];
        if (item instanceof Array) {
            newObj[k] = [];
            depyCpoy(newObj[k], item);
        }
        if (item instanceof Object) {
            newObj[k] = {};
            depyCpoy(newObj[k], item);
        } else {
            newObj[k] = item;
        }
    }
}



var foo = function (a, b) {
    // return Object.prototype.toString.call(arguments);
    // return [...arguments];// return Array.from(arguments);return Array.prototype.slice.call(arguments);

}
console.log(foo(1, 2, 3)) //[object Arguments]


function _new(fun) {
    return function () {
        let obj = {
            __proto__: fun.prototype
        }
        fun.apply(obj, arguments);
        return obj;
    }
}
function person(name, age) {
    this.name = name
    this.age = age
}
let obj = _new(person)('LL', 100)
console.log(obj) //{name: 'LL', age: 100}

function _new1(fun) {
    return function () {
        let obj = {
            __proto__: fn.prototype
        }
        fun.apply(obj, arguments);
        return obj;
    }
}

JSON.stringify();
JSON.parse();

function ajax() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', "url");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let string = xhr.respondeText;
                let object = JSON.parse(string);
            }
        }
    }
    xhr.send(null);
}


const EventUtils = {
    // ?????????????????????dom0||dom2||IE?????? ???????????????
    // ????????????
    addEvent: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    // ????????????
    removeEvent: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    // ??????????????????
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    // ?????? event ????????????????????????????????????????????????????????????????????? event
    getEvent: function (event) {
        return event || window.event;
    },
    // ????????????????????????????????????????????? IE ????????????????????????
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    preventDefault: function (event) { // ???????????????????????????
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
};
