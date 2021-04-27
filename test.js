// function createCompare(propertyName) {
//     return function (obj1, obj2) {
//         var value1 = obj1[propertyName];
//         var value2 = obj2[propertyName];
//         if (value1 < value2) {
//             return -1;
//         } else if (value1 > value2) {
//             return 1;
//         } else {
//             return 0;
//         }
//     }
// }

// var nums = [1, 9, 2, 3, 8, 5, 10];

// function cmp(a, b) {
//     return a > b;
// }

// nums.sort(cmp);

// // var cmp = function (a, b) {
// //     return a > b;
// // }

// nums.forEach(function (item) {
//     console.log(item);
// })

// var double = nums.map(function (x) {
//     return x * 2;
// })

// double.forEach(function (item) {
//     console.log(item);
// })

// // let { stat, exists, readFile } = require('fs');

// // // 等效于
// // let _fs = require('fs');
// // let stat = _fs.stat;
// // ...

// // var a = 1;
// // var b;
// // console.log(typeof (b));

// // console.log(typeof (undefined));

// // console.log(typeof (null));



// function throttle(method, context) {
//     clearTimeout(method.timer);
//     method.timer = setTimeout(function () {
//         method.call(context);
//     }, 500)
// }
// function fun() {
//     close.log("onresize");
// }

// // window.onresize = () => throttle(fun, window);



// //h函数节流的话使用一个参数来判断当前函数是var
// let a = 1;
// let b = 2;
// a = a ^ b;
// b = a ^ b;
// a = a ^ b;
// console.log(a, b);



// // `sdfs `;
// let arr = [1, 2, 34, 5, 4];
// let arr1 = [...arr];
// console.log(arr1);

// var proxy = new Proxy({}, {
//     get: function (target, property) {
//         return 35;
//     }
// });
// // proxy.name
// console.log(proxy.name);


// class MakeIterator {
//     constructor(list) {
//         this.list = list;
//         this.index = 0;
//     }

//     next() {
//         if (this.index < this.list.length) {
//             return {
//                 value: this.list[this.index++],
//                 done: false
//             }
//         } else {
//             return {
//                 value: undefined,
//                 done: true
//             }
//         }
//     }
// }

// // 测试
// let iterator = new MakeIterator([1, 2, 3]);
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());



// class Person {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     toString() {
//         console.log("Da");
//     }
// }

// let obj = new Person(10, 20);

// console.log(obj.__proto__);
// console.log(Person.prototype.prototype);
// console.log(Reflect);


// // 我们的数据对象
// var data = { a: 1 }

// // 该对象被加入到一个 Vue 实例中
// // var vm = new Vue({
// //     data: data
// // })

// // // 获得这个实例上的 property
// // // 返回源数据中对应的字段
// // vm.a == data.a // => true

// // // 设置 property 也会影响到原始数据
// // vm.a = 2
// // data.a // => 2

// // // ……反之亦然
// // data.a = 3
// // vm.a // => 3


// // var data = { a: 1 }
// // var vm = new Vue({
// //     el: '#example',
// //     data: data
// // })


// // $data;
// // vm.$data === data // => true
// // vm.$el === document.getElementById('example') // => true

// // // $watch 是一个实例方法
// // vm.$watch('a', function (newValue, oldValue) {
// //     // 这个回调将在 `vm.a` 改变后调用
// // })


// // var vm = new Vue({
// //     el: '#example',
// //     data: {
// //         message: 'Hello'
// //     },
// //     computed: {
// //         // 计算属性的 getter
// //         reversedMessage: function () {
// //             // `this` 指向 vm 实例
// //             return this.message.split('').reverse().join('')
// //         }
// //     },
// //     // 在组件中
// //     methods: {
// //         reversedMessage: function () {
// //             return this.message.split('').reverse().join('')
// //         }
// //     }

// // })
// // {/* <p>Computed reversed message: "{{ reversedMessage }}"</p> */ }
// // // < p > Reversed message: "{{ reversedMessage() }}"</p>



// const EventUtils = {
//     // 视能力分别使用dom0||dom2||IE方式 来绑定事件
//     // 添加事件
//     addEvent: function (element, type, handler) {
//         if (element.addEventListener) {
//             element.addEventListener(type, handler, false);
//         } else if (element.attachEvent) {
//             element.attachEvent("on" + type, handler);
//         } else {
//             element["on" + type] = handler;
//         }
//     },

//     // 移除事件
//     removeEvent: function (element, type, handler) {
//         if (element.removeEventListener) {
//             element.removeEventListener(type, handler, false);
//         } else if (element.detachEvent) {
//             element.detachEvent("on" + type, handler);
//         } else {
//             element["on" + type] = null;
//         }
//     },

//     // 获取事件目标
//     getTarget: function (event) {
//         return event.target || event.srcElement;
//     },

//     // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
//     getEvent: function (event) {
//         return event || window.event;
//     },

//     // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
//     stopPropagation: function (event) {
//         if (event.stopPropagation) {
//             event.stopPropagation();
//         } else {
//             event.cancelBubble = true;
//         }
//     },

//     // 取消事件的默认行为
//     preventDefault: function (event) {
//         if (event.preventDefault) {
//             event.preventDefault();
//         } else {
//             event.returnValue = false;
//         }
//     }
// };



// /*
// addEventListener  ->attachEvent
// removeEventListener -> detachEvent
// event.target   ||   event.srcElement;

// */


// var ans = ["1", "2", "3"].map(parseInt)
// console.log(ans);

// // var res = this === window ? 'browser' : 'node';
// // console.log(res);

// function debounce(fn, wait) {
//     var timer = null;
//     return function () {
//         var context = this;
//         var args = arguments;
//         if (timer) {
//             clearTimeout(timer);
//             timer = null;
//         }
//         timer = setTimeout(() => {
//             fn.apply(context, args);
//         }, wait);
//     };
// }


// // 函数节流的实现;
// function throttle(fn, delay) {
//     var preTime = Date.now();

//     return function () {
//         var context = this,
//             args = arguments,
//             nowTime = Date.now();

//         // 如果两次时间间隔超过了指定时间，则执行函数。
//         if (nowTime - preTime >= delay) {
//             preTime = Date.now();
//             return fn.apply(context, args);
//         }
//     };
// }


// function shallowClone(obj) {
//     let cloneObj = {};

//     for (let i in obj) {
//         cloneObj[i] = obj[i];
//     }

//     return cloneObj;
// }
// function deepCopy(obj) {
//     if (typeof obj === 'object') {
//         var result = obj.constructor === Array ? [] : {};

//         for (var i in obj) {
//             result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
//         }
//     } else {
//         var result = obj;
//     }

//     return result;
// }

// function deepCopy(obj) {
//     if (typeof obbj === "object") {
//         var result = obj.constructor === Array ? [] : {};
//         for (let i in obj) {
//             result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];

//         }
//     } else {
//         var result = obj;
//     }
//     return result;
// }



// console.log(typeof NaN);


// // demo01  出自于上面我引用文章的一个例子，我们来根据上面的结论，一步一步分析具体的执行过程。
// // 为了方便理解，我以打印出来的字符作为当前的任务名称
// setTimeout(function () {
//     console.log('timeout1');
// })

// new Promise(function (resolve) {
//     console.log('promise1');
//     for (var i = 0; i < 1000; i++) {
//         i == 99 && resolve();
//     }
//     console.log('promise2');
// }).then(function () {
//     console.log('then1');
// })

// console.log('global1');

// // for (var i = 0; i < 5; i++) {
// //     (function (i) {
// //         setTimeout(function () {
// //             console.log(i);
// //         }, 100);
// //     })(i)
// // }

// // for (var i = 0; i < 4; i++) {
// //     setTimeout((function (i) {
// //         return function () {
// //             console.log(i);
// //         }
// //     })(i), 1000);
// // }

// //函数本身可以作为一个函数值返回的，既然需要一个函数，那么我就直接返回一个函数给你即可！
// //使用一个立即执行函数的方式，直接对用的便可以完成其中的函数的返回1
// // demo01
// function foo() {
//     var a = 20;
//     var b = 30;

//     function bar() {
//         return a + b;
//     }

//     return bar;
// }

// var bar = foo();
// bar();

// //立即执行函数本身返回的就是一个函数所有实际使用的时候只需要直接立即执行函数返回即可！
// arr1 = [1, 2, 3]
// var x = Object.prototype.toString.call([1, 2, 3])

// console.log(x);

// console.log("Dada");

// var a123 = void 0;
// console.log(a123);

// function Car(make, model, year) {
//     this.make = make;
//     this.model = model;
//     this.year = year;
// }
// const auto = new Car('Honda', 'Accord', 1998);
// console.log(auto.constructor.prototype);

// var arr123 = [1, 2, 3];
// console.log(arr123.constructor);
// // var number = arr123.isArray();
// console.log(Array.isArray(arr123));




// console.log(auto instanceof Car);
// // expected output: true

// console.log(auto instanceof Object);
// // expected output: true

// var arr123 = [1, 2, 3];
// console.log(Object.prototype.toString.call(arr123));
// ///[object Array]

// console.log(Array.prototype.toString.call(arr123));
// // 1,2,3

// function num() {
//     return 1;
// }
// console.log(Object.prototype.toString.call(num));
// //[object Function]

// function debounce(fn, wait) {
//     var time = null;
//     return function () {
//         var context = this,
//             args = arguments;
//         if (timer) {
//             clearTimeout(timer);
//             timer = null;
//         }
//         timer = setTimeout(function () {
//             fn.apply(context, args);
//         }, wait);
//     }
// }

// str = "123";
// console.log(Number(str[0]));



// var getIndex = function (nums, low, high) {
//     var temp = nums[low];
//     //最终每一次
//     while (low < high) {
//         while (nums[high] >= temp && low < high) {
//             high--;
//         }
//         nums[low] = nums[high];
//         while (nums[low] <= temp && low < high) {
//             low++;
//         }
//         nums[high] = nums[low];
//     }
//     nums[low] = temp;

//     console.log(low);

//     return low;
// }

// var sort = function (nums, low, high) {
//     if (low <= high) {
//         var index = getIndex(nums, low, high);
//         sort(nums, low, index - 1);
//         sort(nums, index + 1, high);
//     }
// }

// nums = [5, 10, 11, 1];
// sort(nums, 0, nums.length - 1);
// console.log(nums);

// function TreeNode(element) {
//     this.val = element;
//     this.left = null;
//     this.right = null;
// }
// function createBinary(pre, inOrder) {
//     if (!inOrder.length) {
//         return null;
//     }
//     let root_index = 0;
//     let l_pre = [];
//     let l_in = [];
//     let r_pre = [];
//     let r_in = [];
//     let head = new TreeNode(pre[0]);
//     for (let i = 0; i < inOrder.length; i++) {
//         if (pre[0] === inOrder[i]) {
//             // return i;
//             root_index = i;
//         }
//     }
//     for (let i = 0; i < root_index; i++) {
//         l_pre.push(pre[i + 1]);
//         l_in.push(inOrder[i]);
//     }

//     for (let i = root_index + 1; i < inOrder.length; i++) {
//         r_pre.push(pre[i]);
//         r_in.push(inOrder[i]);
//     }

//     head.left = createBinary(l_pre, l_in);
//     head.right = createBinary(r_pre, r_in);
//     return head;

// }

// var jsonStr = '{ "age": 20, "name": "jack" }'
// var json = (new Function('return ' + jsonStr))();

// console.log(json);

colors = ["black", "white", "red"];
a = Array.isArray(colors);
console.log(a);
console.log(colors.toString());