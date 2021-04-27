// typeof 和 instanceof 原生js实现
function type(obj) {
    var regexp = /\s(\w+)\]/;

    var result = regexp.exec(Object.prototype.toString.call(obj))[1];
    return result;
};
console.log(type([123]));//Array
console.log(type('123'));//String
console.log(type(123));//Number
console.log(type(null));//Null
console.log(type(undefined));//Undefined


function Person(name, age) {
    this.name = name;
    this.age = age;
}
var person = new Person("Tom", 12);
var obj = [];

function _instanceof(left, right) {
    //instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性
    var leftVal = left.__proto__;
    var rightVal = right.prototype;
    while (true) {
        if (leftVal === null) {
            return false;
        }
        if (leftVal === rightVal) {
            return true;
        }
        leftVal = leftVal.__proto__;
    }
}
console.log(_instanceof(obj, Object))
console.log(_instanceof(Person, Function))

// 数组对象null都会返回object的，但是function返回function

var a = 2 instanceof Array;
console.log(a);


// var imgs = document.querySelectorAll('img');
// function lozyLoad() {
//     var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
//     var winHeight = window.innerHeight;
//     for (var i = 0; i < imgs.length; i++) {
//         if (imgs[i].offsetTop < scrollTop + winHeight) {
//             imgs[i].src = imgs[i].getAttribute('data-src');
//         }
//     }
// }

// window.onload = lozyLoad();

var cmp = function (a, b) {
    let constructor = Array.prototype.shift.call(arguments);
    console.log(constructor);
    return a + b;
}

cmp(1, 20, 12321);

// Array.prototype.slice.call(ArrayLike);
// Array.prototype.splice.call(ArrayLike);
// Array.from();

//浅拷贝
function shallowClone(obj) {
    let cloneObj = {};

    for (let i in obj) {
        cloneObj[i] = obj[i];
    }

    return cloneObj;
}
//深拷贝
function deepCopy(obj) {
    if (typeof obj === 'object') {
        var result = obj.constructor === Array ? [] : {};

        for (var i in obj) {
            result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
        }
    } else {
        var result = obj;
    }
    return result;
}
// var result = obj.constructor === Array ? [] : {};
// for(let i in obj) {
//     // result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
// }


// let type = typeof obj;
// if(/string|undefined|function/.test(type)) {
//     obj = '"' + obj + '"';
// }
// return String(obj);
// else{
//     let json = [];
//     let arr = Array.isArray(obj);
//     for(let i in obj) {
//         let v = ojb[k];
//         let type = typeof v;
//         if(//.test(type)){

//         }
//     }
// }

//思路就是首先判断其是否为对象的，否则直
function jsonStringify(obj) {
    let type = typeof obj;
    if (type !== "object") {
        if (/string|undefined|function/.test(type)) {
            obj = '"' + obj + '"';
        }
        return String(obj);
    } else {
        let json = []
        let arr = Array.isArray(obj)
        for (let k in obj) {
            let v = obj[k];
            let type = typeof v;
            if (/string|undefined|function/.test(type)) {
                v = '"' + v + '"';
            } else if (type === "object") {
                v = jsonStringify(v);
            }
            json.push((arr ? "" : '"' + k + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
    }
}
jsonStringify({ x: 5 }) // "{"x":5}"
jsonStringify([1, "false", false]) // "[1,"false",false]"
jsonStringify({ b: undefined }) // "{"b":"undefined"}"

// 声明一个包含undefined、null、symbol、function的对象
var oldObj = {
    name: "old",
    age: undefined,
    // sex: Symbol("setter"),
    title: function () { },
    lastName: null
};
var newObj = JSON.parse(jsonStringify(oldObj));
// 可以看到会忽略undefined、symbol、function的对象
console.log(newObj); // {name: "old", lastName: null}


//类数组转换为数组的方式：
// Array.prototype.slice.call(arrayLike);
// Array.prototype.splice.call(arrayLike, 0);
// Array.prototype.concat.apply([], arrayLike);
// Array.from(arrayLike);
// array = [...arrayLike];

function foo() {
    Array.prototype.forEach.call(arguments, a => console.log(a))
}
function foo() {
    const arrArgs = [...arguments]
    arrArgs.forEach(a => console.log(a))
}

function ajax() {
    const SERVER_URL = "/server";
    let xhr = new XMLHttpRequest();
    // 创建 Http 请求
    xhr.open("GET", SERVER_URL, true);
    // 设置状态监听函数
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        // 当请求成功时
        if (this.status === 200) {
            handle(this.response);
        } else {
            console.error(this.statusText);
        }
    };
    // 设置请求失败时的监听函数
    xhr.onerror = function () {
        console.error(this.statusText);
    };
    // 设置请求头信息
    xhr.responseType = "json";
    xhr.setRequestHeader("Accept", "application/json");
    // 发送 Http 请求
    xhr.send(null);
}

function getJSON(url) {
    let promise = new Promise(function (resolve, reject) {
        const SERVER_URL = "/server";
        let xhr = new XMLHttpRequest();
        // 创建 Http 请求
        xhr.open("GET", SERVER_URL, true);
        // 设置状态监听函数
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            // 当请求成功时
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(this.statusText);
            }
        };
        // 设置请求失败时的监听函数
        xhr.onerror = function () {
            console.error(this.statusText);
        };
        // 设置请求头信息
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
        // 发送 Http 请求
        xhr.send(null);
    });
    return promise;
}


//事件类型类的定义：

const EventUtils = {
    // 视能力分别使用dom0||dom2||IE方式 来绑定事件
    // 添加事件
    addEvent: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
            //DOM0级别的事件处理函数
        }
    },
    // 移除事件
    removeEvent: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    // 获取事件目标
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
    getEvent: function (event) {
        return event || window.event;
    },
    // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    preventDefault: function (event) { // 取消事件的默认行为
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
};



// 来实现把 #list 下的 li 元素的事件代理委托到它的父层元素也就是 #list 上：
// 给父层元素绑定事件
// document.getElementById('list').addEventListener('click', function (e) {
//     // 兼容性处理
//     var event = e || window.event;
//     var target = event.target || event.srcElement;
//     // 判断是否匹配目标元素
//     if (target.nodeName.toLocaleLowerCase === 'li') {
//         console.log('the content is: ', target.innerHTML);
//     }
// });
//默认的时候就是冒泡的时候触发的方式的。

///a 标签中可能存在一些其它元素，需要确保点击其它元素的时候也可以触发a标签的点击事件。
// document.addEventListener("click", function (e) {
//     var node = e.target;
//     while (node.parentNode.nodeName != "BODY") {
//         if (node.nodeName == "A") {
//             console.log("a");
//             break;
//         }
//         node = node.parentNode;
//     }
// }, false);


// 1.实现一个new:
function New(func) {
    var res = {};
    if (func.prototype !== null) {
        res.__proto__ = func.prototype;
        ///保证传入的是一个函数
    }
    //这里是将对应的对象的__proto__属性指向其中的对象的原型链
    var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
    //这个函数是将对应的func上全部属性全部设置到res上，同时也就是通过this的方式来调用func的函数，如果其有返回值
    //有返回值的时候则对应的需要返回其中的返回值
    console.log(typeof ret);
    if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
        console.log("12323123");
        return ret;
    }
    // if (/object|function|null/.test(ret)) {

    // }
    return res;
}

function A(name, age) {
    this.name = name;
    this.age = age;
    this.method = function () {
        return 1;
    }
    //
    // let obj = {};
    // return obj;
    //根据其中得构造函数来的，其实上面的func.apply得方式就是将对应的属性全部加到其中的res上去
    //如果传递的构造函数没有对应的return 为 obj的或者函数的时候都不会直接返回对应的新的obj的。
}
var obj = New(A, 1, 2);
console.log(obj);


// JSON.stringify
function JsonStringfy(obj) {
    let type = typeof obj;
    //首先就是先判断其是否为对象，然后对应的去决定处理的方式！
    if (type !== "object") {
        if (/string|undefined|function/.test(type)) {
            obj = '"' + obj + '"';
        }
        return String(obj);
    } else {
        let json = [];
        let arr = Array.isArray(obj);
        for (let k in obj) {
            let v = obj[k];
            let type = typeof v;
            //需要取出全部的数据类型，然后去判断其是否属于对象！
            if (/string|undefined|function/.test(type)) {
                v = '"' + v + '"';
            } else if (type === "object") {
                v = jsonStringify(v);
                //对象的时候需要递归调用实现1
            }
            json.push((arr ? "" : '"' + k + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        // arr的判断只是用来实现其中的对应的返回的结果类型的确认的！
    }
}

// JSON.parse 函数/
var jsonstr = '{"age": 20, "name": "jack"}';
function jsonParse(opt) {
    return eval('(' + opt + ')');
}

// var json = (new Function('return' + jsonStr))();

Function.prototype.call2 = function (content = window) {
    content.fn = this;

    console.log(this);
    console.log(typeof this);
    //因为这个时候传进来的this就是其中的函数的!
    let args = [...arguments].slice(1);
    //得到传入的参数去掉其中的第一个参数！
    let result = content.fn(...args);
    //执行函数的结果！
    delete content.fn; //删除这个函数
    return result;
    //返回执行的结果！
}

let foo123 = {
    value: 1
}
function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}
bar.call2(foo123, 'black', '18') // black 18 1

Function.prototype.apply2 = function (content = window) {
    content.fn = this;
    let result;
    if (arguments[1]) {
        result = content.fn(...arguments[1]);
    } else {
        result = content.fn();
    }
    delete content.fn;
    return result;
}
//apply需要传递的是数组作为第二参数或者是没有，同时因为每个函数都有着对应的
//arguments的参数，所以其可以根据arguments的情况去判断。记住这个时候的this
//就是传递的第一个参数，或者是第一个参数函数。


// bind()函数的实现
//bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。
//这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。
Function.prototype.bind2 = function (content) {
    if (typeof this != "function") {
        throw Error("not a function")
    }
    // 若没问参数类型则从这开始写
    let fn = this;
    let args = [...arguments].slice(1);

    let resFn = function () {
        return fn.apply(this instanceof resFn ? this : content, args.concat(...arguments))
    }
    function tmp() { }
    tmp.prototype = this.prototype;
    resFn.prototype = new tmp();
    return resFn;
}

//实现继承！寄生组成继承方式：
function Parent(name) {
    this.name = name;
}
Parent.prototype.sayName = function () {
    console.log("name:", this.name);
}

function Child(name, parentName) {
    Parent.call(this, parentName);
    this.name = name;
}

function create(proto) {
    function F() { };
    F.prototype = proto;
    return new F();
}

Child.prototype = create(Parent.prototype);

Child.prototype.sayName = function () {
    console.log('child name:', this.name);
}
Child.prototype.constructor = Child;

var parent = new Parent('father');
parent.sayName();    // parent name: father

var child = new Child('son', 'father');


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


//柯里化
function curry(fn, args) {
    var length = fn.length;
    var args = args || [];
    return function () {
        newArgs = args.concat(Array.prototype.slice.call(arguments));
        if (newArgs.length < length) {
            return curry.call(this, fn, newArgs);
        } else {
            return fn.apply(this, newArgs);
        }
    }
}

function multiFn(a, b, c) {
    return a * b * c;
}

var multi = curry(multiFn);

multi(2)(3)(4);
multi(2, 3, 4);
multi(2)(3, 4);
multi(2, 3)(4);


// Promise
var promise = new Promise(function (resolve, reject) {
    if (success) {
        resolve(value);
    } else {
        reject(value);
    }
});
promise.then(function (value) {

}.function(params) {

});


// then() \ catch() \all() \race() \finally；
function myPromise(constructor) {
    let self = this;
    self.status = "pending";
    self.value = undefined;
    self.reason = undefined;
    function resolve(value) {
        if (self.status === "pending") {
            self.value = value;
            self.status = "resolved";
        }
    }
    function reject(reason) {
        if (self.status === "pending") {
            self.reason = reason;
            self.status = "rejected";
        }
    }
    try {
        constructor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

myPromise.prototype.then = function (onFullfilled, onRejected) {
    let self = this;
    switch (self.status) {
        case "resolved":
            onFullfilled(self.value);
            break;
        case "rejected":
            onRejected(self.reason);
            break;
        default:
    }
}

var p = new myPromise(function (resolve, reject) { resolve(1) });
p.then(function (x) { console.log(x) })
//输出1



fs.readFile(A, 'utf-8', function (err, data) {
    fs.readFile(B, 'utf-8', function (err, data) {
        fs.readFile(C, 'utf-8', function (err, data) {
            fs.readFile(D, 'utf-8', function (err, data) {
                //....
            });
        });
    });
});
//第一种是回调函数！

function read(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
read(A).then(data => {
    return read(B);
}).then(data => {
    return read(C);
}).then(data => {
    return read(D);
}).catch(reason => {
    console.log(reason);
});

// 题述： 一个数组中，每一行都按照从左至右递增的顺序排序，每一列按照从上到下递增的顺序排序。
// 完成：输入一个这样的二维数组和一个整数，判断数组是否含有这个整数
function findNumInSortedArray(arr, num) {
    if (!Array.isArray(arr) || typeof num != 'number' || isNaN(num)) {
        return;
    }
    let rows = arr.length;
    let columns = arr[0].length;
    let row = 0;
    let column = columns - 1;

    while (row < rows && column >= 0) {
        if (arr[row][column] == num) {
            return true;
        } else if (arr[row][column] > num) {
            column--;
        } else {
            row++;
        }
    }
    return false;
}

// 题述：实现一个函数, 将字符串中的每个空格替换成 % 20。如输入'we arr happy', 则输出'we%20are%20happy'
//使用遍历替换,需要遍历str，识别空格然后替换字符串
function replaceStr2(str) {
    if (typeof str !== 'string') {
        console.log('str is not string');
        return;
    }
    let strArr = [];
    let len = str.length;
    let i = 0;
    while (i < len) {
        if (str[i] === ' ') {
            strArr[i] = '%20';
        } else {
            strArr[i] = str[i];
        }
    }
    return strArr.join('');
}


// 题述：输入一个链表的头结点，从尾到头打印每个节点的值
function displayLinkList(head) {
    let stack = [];
    let node = head;
    while (node) {
        stack.push(node);
        node = node.next;
    }
    for (let len = stack.length - 1; len >= 0; len--) {
        console.log(stack[i].ele);
    }
}


//输入某二叉树的前序遍历和中序遍历的结果，重新构造二叉树！
//节点定义
function TreeNode(ele) {
    this.ele = ele;
    this.right = null;
    this.left = null;
}

function constructBinaryTree(preOrders, inOrders) {
    if (!inOrders.length) {
        return null;
    }
    let rootIndex = 0;
    let l_preOrders = [];
    let l_inOrders = [];
    let r_preOrders = [];
    let r_inOrders = [];
    //确定根节点
    let head = new TreeNode(preOrders[0]);
    for (let i = 0; i < inOrders.length; i++) {
        if (preOrders[0] === inOrders[i]) {
            rootIndex = i;
        }
    }
    //确定左右子节点树
    for (let i = 0; i < rootIndex; i++) {
        l_preOrders.push(preOrders[i + 1]);
        l_inOrders.push(inOrders[i]);
    }

    for (let i = rootIndex + 1; i < inOrders.length; i++) {
        r_preOrders.push(preOrders[i]);
        r_inOrders.push(inOrders[i]);
    }

    head.left = constructBinaryTree(l_preOrders, l_inOrders);
    head.right = constructBinaryTree(r_preOrders, r_inOrders);

    return head;
}

function getTreeFromPreInOrders(preOrders, inOrders) {
    if (Array.isArray(preOrders) && Array.isArray(inOrders)) {
        return constructBinaryTree(preOrders, inOrders);
    }
    console.error('preOrders or inOrders is no Array');
}


// 题述：用两个栈实现队列
let stack_a = [];
let stack_b = [];

function push(node) {
    stack_a.push(node);
}

function pop() {
    if (stack_b.length === 0) {
        for (let i = 0, len = stack_a.length; i < len; i++) {
            stack_b.push(stack_a.pop());
        }
    }
    return stack_b.pop();
}

// 使用两个队列实现栈
let queue_a = [];
let queue_b = [];

function push(node) {
    if (queue_a.length && queue_b.length) {
        return console.log('wrong !');
    }
    if (queue_a.length) {
        queue_a.push(node);
    } else if (queue_b.length) {
        queue_b.push(node);
    } else {
        queue_a.push(node);
    }
}

function pop() {
    if (queue_a.length && !queue_b.length) {
        for (let i = 0, len = queue_a.length; i < len; i++) {
            if (i == len - 1) {
                return queue_a.shift();
            } else {
                queue_b.push(queue_a.shift());
            }
        }
    } else if (!queue_a.length && queue_b.length) {
        for (let i = 0, len = queue_b.length; i < len; i++) {
            if (i == len - 1) {
                return queue_b.shift();
            } else {
                queue_a.push(queue_b.shift());
            }
        }
    } else if (queue_a.length && queue_b.length) {
        console.log('wrong!');
    } else {
        return null;
    }
    return null;
}

// 旋转数组的最小数字  数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1
function findMinFromRotateArr(arr) {
    if (!Array.isArray(arr)) {
        return console.error('wrong!')
    }
    let start = 0;
    let end = arr.length - 1;
    while ((end - start) > 1) {
        let mid = Math.floor(((end + start)) / 2);
        if (arr[mid] >= arr[end]) {
            start = mid;
        } else {
            end = mid;
        }
    }
    return arr[end];
}

//斐波那契
//递归解法
function fibonacci(n) {
    if (n <= 0) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }
    return fibonacci(n - 2) + fibonacci(n - 1);
}

//循环解法
function fibonacci(n) {
    if (n <= 0) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }
    let fiboOne = 1,
        fiboTwo = 0,
        fiboSum = 0;
    for (let i = 2; i <= n; i++) {
        fiboSum = fiboOne + fiboTwo;
        fiboTwo = fiboOne;
        fiboOne = fiboSum;
    }
    return fiboSum;
}

// 位运算 数据中1的总位数：
//缺陷版：
//缺陷在于不能针对负数情况。因为带符号的数字，其二进制最高位有一个数字为符号标志，负数为1
function numOf1(n) {
    if (n.toString().indexOf('.') != -1) {
        return console.error('n is not a int');
    }
    let num = 0;
    while (n) {
        if (n & 1) {
            num++;
        }
        n = n >> 1;
    }
    return num;
}

//改进：将1进行左移与i比较，这样来判断i二进制各个位是不是1
//如果是32位存储，那么会循环32次
function numOf1(n) {
    if (n.toString().indexOf('.') != -1) {
        return console.error('n is not a int');
    }
    let nums = 0;
    let flag = 1;
    while (flag) {
        if (flg & n) {
            nums++;
        }
        flag = flag << 1;
    }
    return nums;
}

//究极版：这个的原理是 一个二进制与其减去1的二进制进行位与运算后，产生的数与原先的二进制数相比，
//从右边看会少去一个1。问题可以简化到二进制数有多少个1，就会进行以上多少次的循环，这个是效率最高的
function numsOf1(n) {
    if (n.toString().indexOf('.') != -1) {
        return console.error('n is not a int');
    }
    let nums = 0;
    while (n) {
        nums++;
        n = (n - 1) & n;
    }
    return nums;
}


// 9、数值的整数次方
//使用递归减少乘积次数
//使用位与运算可判断奇偶， 整数右移一位可取数除2的整数
//可以通过互乘减少运算次数，如 数的8次方是数的4次幂的2次幂，数的4次幂是数的2次幂的2次幂 ...
function power(base, exponent) {
    if (exponent == 0) {
        return 1;
    }
    if (exponent == 1) {
        return base;
    }
    let result = power(base, exponent >> 1);
    result *= result;
    //为奇数
    if (exponent & 1 == 1) {
        result *= base;
    }
    return result;
}

// 题述：定义一个删除节点的函数，传参为头结点与待删除节点，要求时间复杂度为O(1)。
function deleteNode(headNode, deleteNode) {
    if (!headNode || !deleteNode) {
        return;
    }
    //删除的节点是头结点
    if (headNode == deleteNode) {
        headNode = null;
    }
    //删除的节点是尾节点
    else if (deleteNode.next == null) {
        let node = headNode;
        while (node.next != deleteNode) {
            node = node.next;
        }
        node.next = null;
        deleteNode = null;
    }
    //删除的节点是中间节点
    else {
        let nextNode = delete.next;
        deleteNode.ele = nextNode.ele;
        deleteNode.next = nextNode.next;
        nextNode = null;
    }
}
//整体时间：[(n-1)O(1) + O(n)]/n -> O(1)
//   题述：输入一个整数数组，实现一个函数来调整该数组中数字的顺序，
// 使得所有的奇数位于数组的前半部分，所有的偶数位于位于数组的后半部分。
function reOrderArray(arr) {
    // write code here
    if (!Array.isArray(arr)) {
        return;
    };
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
        let isOddS = arr[start] & 1;
        let isEvenE = !(arr[end] & 1);

        if (isOddS && !isEvenE) {
            start++;
        } else if (isOddS && isEvenE) {
            start++;
            end--;
        } else if (!isOddS && isEvenE) {
            end--;
        } else {
            let temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
    return arr;
}
// 题述：输入一个链表，输出该链表中倒数第k个结点。
//注意边界情况：头结点为空，节点数小于k个，k不大于0

function findKthToTial(head, k) {
    if (!head || k <= 0) {
        return null;
    }
    let startNode = head;
    let endNode = head;
    for (let i = 0; i < k - 1; i++) {
        if (!endNode.next) {
            return null;
        }
        endNode = endNode.next;
    }
    while (endNode.next) {
        startNode = startNode.next;
        endNode = endNode.next;
    }
    return startNode;
}
// 题述：输入一个链表，反转链表后，输出新链表的表头。
function resverseList(head) {
    if (!head) {
        return null;
    }
    if (head.next == null) {
        return head;
    }
    let node = head;
    let nextNode = null;
    let reservedNode = null;
    let newHead = head;
    while (node.next) {
        nextNode = node.next;
        reservedNode = nextNode.next;
        nextNode.next = newHead;
        node.next = reservedNode;
        newHead = nextNode;
    }
    return newHead;
}
// 题述：输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则
function mergeLinkList(head1, head2) {
    if (head1 == null) {
        return head2;
    }
    if (head2 == null) {
        return head1;
    }
    let mergeHead = null;
    if (head1.ele < head2.ele) {
        mergeHead = head1;
        mergeHead.next = mergeLinkList(haed1.next, head2);
    } else {
        mergeHead = head2;
        mergeHead.next = mergeLinkList(head1, head2.next);
    }
    return mergeHead;
}
// 输入两颗二叉树A和B，判断B是不是A的子结构。/
// 先找A包含B的根节点，然后根据该节点比较左右子树
//树节点定义
function Node(ele) {
    this.ele = ele;
    this.left = null;
    this.right = null;
}

//判断树A有树B
function hasSubTree(pRootA, pRootB) {
    if (pRootA == null || pRootB == null) {
        return false;
    }
    let result = false;
    if (pRootA.ele === pRootB.ele） {
        result = doesTreeAHaveTreeB(pRootA, pRootB);
    }
    if (!result) {
        result = hasSubTree(pRootA.left, pRootB);
    }
    if (!result) {
        result = hasSubTree(pRootA.right, pRootB)
    }
    return result;
}

function doesTreeAHaveTreeB(pRootA, pRootB) {
    //先要判断 pRootB
    if (pRootB == null) {
        return false;
    }

    if (pRootA == null) {
        return true;
    }

    if (pRootA.ele != pRootB.ele) {
        return false;
    }

    return doesTreeAHaveTreeB(pRootA.left, pRootB.left) && doesTreeAHaveTreeB(pRootA.right, pRootB.right)
}

// 题述：完成一个函数，输入一个二叉树，该函数输出它的镜像

function mirror(root) {
    if (root == null) {
        return;
    }

    let temp = root.left;
    root.left = root.right;
    root.right = temp;

    if (root.left) {
        mirror(root.left);
    }
    if (root.right) {
        mirror(root.right);
    }
}

// 顺时针打印矩阵
var spiralOrder = function (matrix) {
    let row_len = matrix.length;
    let col_len = matrix[0].length;
    if (row_len === 0) return [];
    let res = [];

    let up = 0;
    let down = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (true) {
        for (let i = left; i <= right; ++i) res.push(matrix[up][i]);
        if (++up > down) break;
        for (let i = up; i <= down; i++) res.push(matrix[i][right]);
        if (--right < left) break;
        for (let i = right; i >= left; --i) res.push(matrix[down][i]);
        if (--down < up) break;
        for (let i = down; i >= up; --i) res.push(matrix[i][left]);
        if (++left > right) break;
    }
    return res;
};

// 01-把数字转换成中文
function toChineseNum(num) {
    num += ''
    let numLength = num.length
    let numStr = '零一二三四五六七八九十'
    let unitArr = ['', '十', '百', '千', '万']
    function getResult(str) {
        let res = '';
        if (str.length > 5) {
            let first = str.slice(-5);
            //
            let second = str.slice(0, str.length - 5);
            for (let i in second) {
                res = res + numStr[second[i]] + unitArr[second.length - i];
            }
            for (let i in first) {
                res = res + numStr[first[i]] + unitArr[first.length - i - 1];
            }
        } else {
            let first = str.slice(-5);
            for (let i in first) {
                res = res + numStr[first[i]] + unitArr[first.length - i - 1];
            }
        }
        res = res.replace(/零[零十百千]+/g, '零').replace(/零+$/g, '').replace(/零万/g, '万')
        return res;
    }

    if (numLength > 8) {
        return getResult(num.slice(0, numLength - 8)) + '亿' + getResult(num.slice(-8))
    }
    return getResult(num)
}

console.log(toChineseNum(1000005600454456))

// 02 - 数字添加逗号   如：12000000.11 转化为 12,000,000.11。

function commafy(num) {
    let numStr = num + '';
    let arr = num < 0 ? numStr.slice(1).split('.') : numStr.split('.');
    let a = arr[0].split(''); // 整数部分切割成数组
    for (let i = a.length - 3; i > 0; i = i - 3) {
        a.splice(i, 0, ',')
    }
    let res = arr[1] ? a.join('') + '.' + arr[1] : a.join('')
    return num < 0 ? '-' + res : res;
}

console.log(commafy(12564654.456456)) // 12,564,654.456456

// 03-16进制颜色值转RGB值
const hexToRGB = (hex) => {
    if (!/(^\#([a-fA-F0-9]{3})$)|(^\#([a-fA-F0-9]{6})$)/g.test(hex)) return null
    let allNumberStr = '0123456789abcdef' // 十六进制的所有数字
    let len = hex.slice(1).length;
    let str = len === 6 ? hex.slice(1) : hex.slice(1)[0].repeat(2) + hex.slice(1)[1].repeat(2) + hex.slice(1)[2].repeat(2);
    let arrStr = str.split('');
    let newArrStr = arrStr.map((item, index) => {
        return allNumberStr.indexOf((item + '').toLowerCase())
    })
    let num1 = newArrStr[0] * 16 + newArrStr[1];
    let num2 = newArrStr[2] * 16 + newArrStr[3];
    let num3 = newArrStr[4] * 16 + newArrStr[5];
    return `rgb(${num1}, ${num2}, ${num3})`
}

console.log(hexToRGB('#fffaaa'))

//转成驼峰
const toCamelCaseVar = (variable) => {
    variable = variable.replace(/[\_|-](\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });
    return variable.slice(0, 1).toLowerCase() + variable.slice(1)
}

console.log(toCamelCaseVar('Foo_style_css')) // fooStyleCss
console.log(toCamelCaseVar('Foo-style-css')) // fooStyleCss

// 05 - 监听数组变化

function ObserverableArray() {
    return new Proxy([], {
        get(target, propKey) {
            const matArr = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
            matArr.indexOf(propKey) > -1 && console.log(propKey);
            return target[propKey]
        }
    })
}
const arr = new ObserverableArray()

arr.push('Good') // => 打印 'push'，a 变成了 ['Good']
arr.push('Good2') // => 打印 'push'，a 变成了 ['Good', 'Good2']
arr.unshift('Good2') // => 打印 'unshift'，a 变成了 ['Good2','Good', 'Good2']
console.log(arr) // ['Good2','Good', 'Good2']

// 06 - 验证一个数是否是素数
function isPrime(num) {
    if (typeof num !== 'number') {
        throw new TypeError('num should be number')
    }
    if (num === 2 || num === 3) {
        return true;
    };
    if (num % 2 === 0) {
        return false;
    };
    let divisor = 3, limit = Math.sqrt(num);
    while (limit >= divisor) {
        if (num % divisor === 0) {
            return false;
            //3到平方根的全部元素都判断，而且每次跳过偶数值
        }
        else {
            divisor += 2;
        }
    }
    return true;
}
console.log(isPrime(30));  // false
console.log(isPrime(31));  // true


// 08-两数相加 请你用 javascript 实现两个字符串数字相加（大数相加）？
// 直接每一次记录对应的元素的值，相加后对应的直接往后面的元素增加即可！
function add(a, b) {
    // 看看两个字符串长度相差多少，小的在前面补0， 如 10000 和 1， 补0后为 10000 和 00001
    let leng = Math.abs(a.length - b.length);
    if (a.length > b.length) {
        b = Array(leng).join('0') + '0' + b;
    } else if (a.length < b.length) {
        a = Array(leng).join('0') + '0' + a;
    }
    // 将字符串转化为数组并且倒装，如同小学加法从个位开始算起
    let textArrA = a.split('').reverse(),
        textArrB = b.split('').reverse(),
        resultArr = [];
    // 对数组进行循环
    for (let i = 0; i < a.length; i++) {
        // 求和，和小于10，则将和放进目标数组，若大于10，将除以10将余数放进目标数组，然后textArrA数组的下一位 + 1（textArrB数组也可以，选一个即可）
        let sum = parseInt(textArrA[i]) + parseInt(textArrB[i]);

        // 这里判断是否是最高位数值相加，即i === a.length - 1， 如果是不用取余直接放进去
        if (parseInt(sum / 10) === 0 || i === a.length - 1) {
            resultArr.push(sum);
        } else {
            resultArr.push(sum % 10);
            textArrA[i + 1] = parseInt(textArrA[i + 1]) + 1;
        }
    }
    // 最后将目标数组倒装一下，再转成字符串
    return resultArr.reverse().join('');
}

console.log(add('1045747', '10')); // 1045757

// 最大公约数：能同时被两数整除的最大数字

// 最小公倍数：能同时整除两数的最小数字
// 最大公约数
function maxDivisor(num1, num2) {
    let max = num1 > num2 ? num1 : num2,
        min = num1 > num2 ? num2 : num1;
    for (var i = min; i >= 1; i--) {
        if (max % i == 0 && min % i == 0) {
            return i;
        }
    }
}

console.log(maxDivisor(60, 30)); // 30

// 最小公倍数
function minDivisor(num1, num2) {
    let max = num1 > num2 ? num1 : num2,
        min = num1 > num2 ? num2 : num1,
        result = 0;
    // 这个循环，当两数同为质数时，终止的最大条件值为 i = min
    for (var i = 1; i <= min; i++) {
        result = i * max;
        if (result % max == 0 && result % min == 0) {
            return result;
        }
    }
}
console.log(minDivisor(6, 8)); // 24

// 10-验证是否为回文

function isPalindrome(str) {
    str = '' + str;
    if (!str || str.length < 2) {
        return false;
    }
    return (
        Array.from(str)
            .reverse()
            .join('') === str
    );
}


function isPalindrome(str) {
    str = '' + str;
    if (!str || str.length < 2) {
        return false;
    }
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

//409. 最长回文串 题目大意就是给出一个字符串然后去判断能构造出来的最长的回文串长度！
var longestPalindrome = function (s) {
    var set = new Set();
    var count = 0;
    for (var i = 0; i < s.length; i++) {
        if (set.has(s[i])) {
            count += 2;
            set.delete(s[i])
        } else {
            set.add(s[i])
        }
    }
    return set.size > 0 ? count + 1 : count;
};
//只要是有两个的随便放入，而且加2，最后判断是否还有剩下的单个的，将对应的单个放在中间的方式！


// 冒泡排序：
function bubbleSort(array) {
    for (let j = 0; j < array.length; j++) {
        let complete = true;
        for (let i = 0; i < array.length - 1 - j; i++) {
            // 比较相邻数
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                complete = false;
            }
        }
        // 没有冒泡结束循环
        if (complete) {
            break;
        }
    }
    return array;
}

//快速排序
var getIndex = function (nums, low, high) {
    var temp = nums[low];
    //最终每一次
    while (low < high) {
        while (nums[high] >= temp && low < high) {
            high--;
        }
        nums[low] = nums[high];
        while (nums[low] <= temp && low < high) {
            low++;
        }
        nums[high] = nums[low];
    }
    nums[low] = temp;

    console.log(low);

    return low;
}

var sort = function (nums, low, high) {
    if (low <= high) {
        var index = getIndex(nums, low, high);
        sort(nums, low, index - 1);
        sort(nums, index + 1, high);
    }
}

nums = [5, 10, 11, 1];
sort(nums, 0, nums.length - 1);
console.log(nums);

//归并排序
function mergeSort(array, left, right, temp) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSort(array, left, mid, temp)
        mergeSort(array, mid + 1, right, temp)
        merge(array, left, right, temp);
    }
    return array;
}

function merge(array, left, right, temp) {
    const mid = Math.floor((left + right) / 2);
    let leftIndex = left;
    let rightIndex = mid + 1;
    let tempIndex = 0;
    while (leftIndex <= mid && rightIndex <= right) {
        if (array[leftIndex] < array[rightIndex]) {
            temp[tempIndex++] = array[leftIndex++]
        } else {
            temp[tempIndex++] = array[rightIndex++]
        }
    }
    while (leftIndex <= mid) {
        temp[tempIndex++] = array[leftIndex++]
    }
    while (rightIndex <= right) {
        temp[tempIndex++] = array[rightIndex++]
    }
    tempIndex = 0;
    for (let i = left; i <= right; i++) {
        array[i] = temp[tempIndex++];
    }
}

//堆排序
function heapSort(array) {
    creatHeap(array);
    console.log(array);
    // 交换第一个和最后一个元素，然后重新调整大顶堆
    for (let i = array.length - 1; i > 0; i--) {
        [array[i], array[0]] = [array[0], array[i]];
        adjust(array, 0, i);
    }
    return array;
}
// 构建大顶堆，从第一个非叶子节点开始，进行下沉操作
function creatHeap(array) {
    const len = array.length;
    const start = parseInt(len / 2) - 1;
    for (let i = start; i >= 0; i--) {
        adjust(array, i, len);
    }
}
// 将第target个元素进行下沉，孩子节点有比他大的就下沉
function adjust(array, target, len) {
    for (let i = 2 * target + 1; i < len; i = 2 * i + 1) {
        // 找到孩子节点中最大的
        if (i + 1 < len && array[i + 1] > array[i]) {
            i = i + 1;
        }
        // 下沉
        if (array[i] > array[target]) {
            [array[i], array[target]] = [array[target], array[i]]
            target = i;
        } else {
            break;
        }
    }
}