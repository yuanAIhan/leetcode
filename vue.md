#### [实例生命周期钩子](https://cn.vuejs.org/v2/guide/instance.html#实例生命周期钩子)

![Vue 实例生命周期](https://cn.vuejs.org/images/lifecycle.png)





​	每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

```vue
	<span v-once>{{msg}}</span>
//使用v-once的时候对应的属性值不会根据其中的数据的改变而改变的，也就是说这里的值是不会改变的


	<p>Using v-html directive: <span v-html="rawHtml"></span></p>
//这个 span 的内容将会被替换成为 property 值 rawHtml，直接作为 HTML——会忽略解析 property 值中的数据绑定。注意，你不能使用 v-html 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。反之，对于用户界面 (UI)，组件更适合作为可重用和可组合的基本单位。

<button v-bind:disabled="isButtonDisabled">Button</button>
//其可以将后面的对应的属性的值绑定显示出来，然后对应的放在对应的标签上！而且当其中的值是一个bool值的时候甚至其是不会显示对应的属性的。
//如果 isButtonDisabled 的值是 null、undefined 或 false，则 disabled attribute 甚至不会被包含在渲染出来的 <button> 元素中。

  
使用JS表达式：
    {{ number + 1 }}
    {{ ok ? 'YES' : 'NO' }}
    {{ message.split('').reverse().join('') }}
    <div v-bind:id="'list-' + id"></div>
但是其中的表达式智只可以是单个表达式，否则不会生效的。如下面的则无效的：
    {{ if(ok) {return message} }}

<p v-if="seen">看得到嘛？</p>
    
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
    
```

```html
v-if 和 v-show:
v-if是真正的条件渲染，因为其会确保在切换的过程中条件块内的事件监听器和子组件会适当的被销毁和重建。其也是惰性的，假设在渲染开始的时候条件为假的，那么什么都不会做直到条件为真的时候才会开始渲染条件块。标签可以存在和不存在的选择。还可以结合template使用实现对应的一整块的模块的渲染。
v-show简单很多，不论什么条件都会渲染的，只是简单的切换css样式进行却换的。实际上标签是永远存在的，只是使用display:none的方式来隐藏。注意，v-show 不支持 <template> 元素，也不支持 v-else。
v-if的切换开销更大，v-show初始的时候渲染的开销会大一些，假设需要频繁的切换的话使用v-show好一些，很少改变的话则使用v-if。v-if的原理是根据判断条件来动态的进行增删DOM元素，v-show是根据判断条件来动态的进行显示和隐藏元素，频繁的进行增删DOM操作会影响页面加载速度和性能，而且v-if还可以结合v-else等一起使用功能会强大一些！
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
在 <template> 元素上使用 v-if 条件渲染分组：
因为 v-if 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 <template> 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 <template> 元素。
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
    
当需要复用的时候对应的可以不传入key的值，假如不需要复用的时候则可以传入key的值，使用key的时候会重新渲染包含的重复部分。注意，<label> 元素仍然会被高效地复用，因为它们没有添加 key attribute。
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>    
可以理解为在if中只要没有添加key的值的就是可以高效的复用的实现的。
    

v-bind 和 v-on:

<a v-bind:[someAttr]="value"> ... </a>
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
还有就是当其中的取值为null的时候则代表移除当前的属性绑定，不需要绑定值。
然而其中的属性值使用的一般尽量小写，因为浏览器会自动转换为小写！
同时为v-bind 和 v-on提供了特定的简写：
v-bind 缩写：

<!-- 完整语法 --> 直接省略掉其中的v-bind的
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>

v-on 缩写: 将v-on: -> @操作符号！
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>

-->

修饰符.可以完成一些默认事件等的限制，不让其触发。
<form v-on:submit.prevent="onSubmit">...</form>
.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault();



计算属性（computed） 和 方法（methods）：
	1、computed和methods ： 前者有缓存只有更新之后才会再次调用、后者一直会调用的。
	共同点：computed能现实的methods也能实现；而且computed中是没有setter的方法的，需要自己实现。计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：
	不同点：computed是基于它的依赖进行缓存的。computed只有在它的相关依赖发生变化才会重新计算求值。 而只要它的相关依赖没有发生变化，多次访问会立即返回之前的计算结果，而不必再次执行计算。相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。也就是说当我们不希望有缓存，用方法来替代。前者有利于实现一个数据受到多个数据的影响的时候决定的操作！
	
计算属性 vs 侦听属性：
	前者是之哟依赖发生变化的时候对应的才会发生再次计算实现的。首先它们都是以Vue的依赖追踪机制为基础的，它们的共同点是：都是希望在依赖数据发生改变的时候，被依赖的数据根据预先定义好的函数，发生“自动”的变化。
但watch和computed也有明显不同的地方：
watch和computed各自处理的数据关系场景不同
(1).watch擅长处理的场景：一个数据影响多个数据
(2).computed擅长处理的场景：一个数据受多个数据影响
1.共同点：都是以Vue的依赖追踪机制为基础的，都是希望在依赖数据发生改变的时候，被依赖的数据根据预先定义好的函数，发生“自动”的变化。、；
2.不同点：watch擅长处理的场景：一个数据影响多个数据；computed擅长处理的场景：一个数据受多个数据影响。虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器，当需要在数据变化时执行异步或开销较大的操作时，通过侦听器最有用。
3使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。



v-bind:class="" 
v-bind:style=""
https://cn.vuejs.org/v2/guide/class-and-style.html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
>
</div>
data: {
  isActive: true,
  hasError: false
}
<div class="static active"></div>
<div v-bind:class="classObject"></div>
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}

    
 V-for<   
列表渲染：用 v-for 把一个数组对应为一组元素
v-for：可以遍历数组也可以遍历对象，使用两个以上下标的时候可以完成将其中的key value的形式的值全部访问出来。而且在对象中还可以用第三个数作为索引的值来完成索引的访问。

    为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute：

<div v-for="item in items" v-bind:key="item.id">
  <!-- 内容 -->
</div>
<
v-for 与 v-if 一同使用：不推荐
 当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。当你只想为部分项渲染节点时，这种优先级的机制会十分有用，如下：></v-for>   

v-on: 绑定事件的，或者是直接事件绑定，或者是使用一个methods中的一个方法完成绑定！
    
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
    <
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
>

表单输入绑定：v-model    绑定的时候是将其中的需要存储的值绑定到对应的数组中去的！然后再进行使用的，选择的时候是根据对应的选择框的性质来完成选择的。

<v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

text 和 textarea 元素使用 value property 和 input 事件；
checkbox 和 radio 使用 checked property 和 change 事件；
select 字段将 value 作为 prop 并将 change 作为事件。></v-model>


<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>
    
 
< 多个复选框，绑定到同一个数组：
  new Vue({
  el: '...',
  data: {
    checkedNames: []
  }
})  
>
<使用v-for的方式来渲染动态选项：
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
<

new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
    
>
.lazy
在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转为在 change 事件_之后_进行同步：

<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">
.number
如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符：

<input v-model.number="age" type="number">
这通常很有用，因为即使在 type="number" 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 parseFloat() 解析，则会返回原始的值。
    
.trim
如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符：

<input v-model.trim="msg">
    
    
组件基础/;::
    
// 定义一个名为 button-counter 的新组件
< Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
}) />
    
//data 必须是一个函数! 如果是单独的一个值的时候对应的每次点击之后得到的结果会每次都修改其中的单个元素的值的！
    
    《全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。》
    
    


```

```
https://blog.csdn.net/weixin_45082369/article/details/114300080
1. 什么是 MVVM？
MVVM 是Model-View-ModelView的缩写，是一种脱胎于 MVC 模式的设计模式。
Model 代表数据层，负责存放业务相关的数据；
View 代表视图层，负责在页面上展示数据；
ViewModel 是的作用是同步 View 和 Model 之间的关联，其实现同步关联的核心是DOM Listeners和 Data Bindings两个工具。DOMListeners 工具用于监听 View 中 DOM 的变化，并会选择性的传给 Model；Data Bindings 工具用于监听 Model 数据变化，并将其更新给 View。关键在于DOM监听和数据绑定！
MVC：相同的view层都是保存着对对应的数据显示界面和对应的视图的，同时Model层中就是对应数据和业务逻辑代码，两者通过C来控制，当其中的view的数据发生改变的时候，C会捕捉到对应的数据，然后在通知Model更新数据，更新后直接将数据显示在对应的view上。

组件之间的通信：
父传子：利用props，子组件使用props接受来自父组件的传来的值。而且子组件通过$emit的方式给父组件发送数据。

子穿父：利用this.$emit 和 on 的方式绑定事件，然后在父组件中监听对应的事件。
非父子的时候：创建一个空的vue实例，然后挂载到当前的vue实例的原型上,然后一个组件进行e m i t 传 递 事 件 以 及 需 要 传 递 的 数 据 。 在 另 一 个 组 件 那 里 就 可 以 进 行 使 用 emit传递事件以及需要传递的数据。在另一个组件那里就可以进行使用emit传递事件以及需要传递的数据。在另一个组件那里就可以进行使用on来接受这个事件并处理这个传递参数
let bus =new Vue()
Vue.prototype.bus = bus

3.生命周期
beforeCreate：vue实例的挂载元素el和数据对象data都是undefined，还没用初始化
created：vue实例的数据对象data有了，可以访问里面的数据和方法，未挂载到DOM，el还没有
beforeMount：vue实例的el和data都初始化了，但是挂载之前未虚拟DOM节点
mounted：vue实例挂载到真实DOM上，就可以通过DOM获取DOM节点
beforeupdated：响应式数据更新时调用，发生在虚拟DOM打补丁之前，适合在更新之前访问现有的DOM，比如手动一处已添加的事件监听器
updated：虚拟DOM重新渲染和打补丁之后调用，组成新的DOM已经更新，避免在这个钩子函数中操作数据，防止死循环
beforeDestroy：实例销毁前调用，实例还可以用，this能获取到实例，常用于销毁定时器，解绑事件
destroyed：实例销毁后调用，调用后所有事件监听器会被移除，所有的子实例都会被销毁
4.vue组件中data必须是一个函数
如果 data 是一个对象，当复用组件时，因为 data 都会指向同一个引用类型地址，其中一个组件的 data 一旦发生修改，则其他重用的组件中的 data 也会被一并修改。如果 data 是一个返回对象的函数，因为每次重用组件时返回的都是一个新对象，引用地址不同，便不会出现如上问题。

5vue的双向数据绑定的原理：
	首先其是基于数据劫持和发布订阅者模式实现，首先会通过Object.defineProperty()的方法为data中的每个属性都添加get和 set的方法，在数据发生变动的时候，就会触发set钟的监听回调函数，将对应的更改信息发布给每一个订阅者。
	首先会创建一个dep的对象作为观察者，其来收集对应的data中的属性的改变，添加对应的set和get函数的时候，get的时候便会去dep中注册函数，调用set的时候便会去通知对应的注册函数////
	组件会定义一个watcher作为订阅者，其可以视为是dep和组件之间的桥梁，当观察者发现数据更新之后便会通知对应的watcher对应的调用update的更新对应的数据。
	
this.$set(要改变的数组/对象，要改变的位置/key，要改成的value)
this.$set(this.arr, 0, "OBKoro1");
// 改变数组 
this.$set(this.obj, "c", "OBKoro1"); // 改变对象
数组原生方法造成的数据更新，可以被 Vue 监听到。如 splice()push()pop()等。


v-cloak:因为在项目很大的时候，加载的时候还没有加载完成，但是此时的DOM就会优先显示其中的vue的源码，当加载完毕的时候就会出现一次闪烁。要么在代码CSS中添加，要么在HTMl中添加。
[v-cloak] { display: none; }

<div v-cloak>
 {{ message }}
</div>

Vue-cli 项目中 assets 和 static 文件夹有什么区别？
前者的文件在使用npm run build的时候会被打包的，后者的数据则不会打包！

vuex的几个属性：就是一个数据仓库！
state：基本数据，也就是存储数据的
getters：从state中派生出来的数据
mutation：更新store的唯一途经，也就是说数据只可以在这里被更新。
action：提交其中的mutation一更改state的，其中可以有异步的操作！
module:用于将store分割为不同的模块

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment2(context) {
      context.commit('increment');
    },
    fun(context) {
      context.dispatch('increment2');
    },
  },
});




```

