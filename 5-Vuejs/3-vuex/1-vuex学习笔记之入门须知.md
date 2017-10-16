## 1 安装 ## 
### 1.1 CDN ### 
在 Vue 之后加载 vux

- https://unpkg.com/vuex
- 指定版本号：https://unpkg.com/vuex@2.0.0

### 1.2 NPM ### 
```
npm install vuex --save
```

在模块化工程中使用对应的语法糖：
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

## 2 Vuex 是什么 ## 
Vuex 是一个专为 Vue.js 应用程序开发的 **状态管理模式**
有以下特性
- **集中式管理**应用中的所有组件的状态
- 有一定的规则保证状态以可预测的方式发生变化

### 2.1 什么是状态管理模式 ###
从一个栗子开始：
```javascript
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```

这个状态资管理应用包含以下几个部分：
- state, 驱动应用的数据源（即组件的状态）
- view, 以声明方式将 state 映射到视图
- actions, 响应在 view 上的用户输入导致的状态变化

单向数据流的图示：
![](https://i.imgur.com/vFeQcIF.png)


**注意**，这时候如果遇到 **多个组件共享状态**，会发生以下问题:
- 多个视图依赖于同一状态
  - 这个问题，对于多层嵌套的组件会很麻烦
  - 兄弟组件间的状态传递无能为力
- 来自不同视图的行为需要修改同一状态
  - 采用父子组件直接引用，或通过事件变更和同步状态的多份拷贝

**严重注意**：为了解决以上问题，我们把**组件的共享状态进行抽取，用全局单例模式管理（涉及到了设计模式单例）**

这时候，就会发生了以下变化，
- 组件数变成了一个巨大的"视图"
- 每个组件都能获取状态，或触发行为

借鉴了Flue, Redux和 The Elm Architecture的设计思想，开发了Vuex，如图所示
![](https://i.imgur.com/Oqmmi2c.png)


## 3 开始 ## 
Vuex 应用的核心就是 store(仓库)。类似一个容器，包含应用中大部分状态。
与单纯的全局对象的不同：
- Vuex 的状态存储是响应式的
- 不能直接改变 store 中的状态。改变状态的唯一途径是显示的提交 (commit) mutation

### 3.1 最简单的 Store ### 
来吧！！！
创建一个 store：
- 提供一个初始 state 对象
- mutation

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

now!！！ 你可以做些事情：
- 通过 store.state 来获取状态对象
- store.commit 方法来进行修改状态

```javascript
store.commit('increment')

console.log(store.state.count) // -> 1
```

**值得再次强调的是**：
- 改变状态只能通过提交 mutation 方式，**而不是直接改变store.state.count的值**
- 为什么要这么做？因为想更明确的追踪状态的变化，也可以做一些其它的事情
- store 的状态是响应式的，在组件中调用 store 中的状态需要在**计算属性**中返回






































