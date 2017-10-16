## 1 核心概念 ## 

- State
- Getter
- Mutation
- Action
- Module

## 2 State ## 
### 2.1 单一状态树 ## 
- Vuex 使用单一状态树。简单来说，**用一个对象包含了全部的应用层级状态**，作为**唯一数据源**存在
- 每个应用程序只包含一个 store 实例

### 2.2 在 Vue 组件中获得 Vuex 状态 ### 
- Vuex 的状态存储是响应式的
- 从 store 实例中读取状态最简单的方法
  - 在**计算属性**中返回某个状态
```javascript
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      // 重点
      return store.state.count
    }
  }
}
```

这样，每次 store.state.count 变化，就会重新获取。但是这种模式导致组件依赖于**全局状态单例模式**，所以我们应该这么做：
- 通过 store 选项，在根组件"注入"
```javascript
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

在根实例注册 store 之后，会这样
- 该 store 实例会注入到根组件中的所有子组件中
- 子组件能通过 this.$store 访问到状态

### 2.3 mapState 辅助函数（高级使用方法） ### 
一个组件获取一个状态还好，获取多个状态咋办呢？

你，可以选用**mapState**辅助函数生成计算属性
```javascript
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```  

如果发生这样的情况：**映射的计算属性的名称与 state 的子节点名称相同**

你可以给 mapState 传一个字符串数组
```javascript
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

### 2.4 对象展开运算符 ### 
mapState 函数返回的是一个对象，如何将它与局部计算属性混合使用？？？

提供一个工具函数，**将多个对象合并为一个最终对象，再传给 computed 属性**
```javascript
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

## 3 Getter（强化后的State） ## 
有时候，你需要从 store 中派生出一些状态，例如 列表过滤并计数
```javascript
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

如果发生多个组件需要用到此属性，那么可以抽取出一个共享函数后再导入。但其结果都不是很好

Vuex 提供一个 getters属性，类似store的计算属性，getter的返回值会根据依赖被缓存，值变重算

于是开始使用，且**注意 getter 接受 state 作为其第一个参数（第一夫人）**
```javascript
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

这时候，
- Getter 会被暴露成 store.getters 对象
```javascript
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```
- Getter 也可接受其他 getter 作为第二个参数(第二夫人)
```javascript
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -> 1
```


然后，在组件内该咋用就咋用了
```javascript
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

更高级的语法，通过 getter 返回一个函数，来实现给getter传参，这样就可以对 state 里的数组进行查询时非常有用
```javascript
getters: {
  // ...
  getTodoById: (state, getters) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

### 3.1 mapGetters 辅助函数（高级使用方法） ### 
mapGetters 辅助函数是将 store 中的 getter 映射到局部计算属性
```javascript
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

如果你想，想 getter 属性换个名字，你可以使用对象形式：
```javascript
mapGetters({
  // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

## 4 Mutation ## 
想改变 state 的状态吗？
想改变 Vuex 的 store 中的状态吗？

那么只有唯一的方法：**提交 mutation**

mutation 类似于事件：
- 有一个字符串的 事件类型  ？？？这是啥
- 一个回调函数。接受 state 为第一个参数（第一夫人）

```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

这样写了之后，是不直接调用，类似于事件注册
如果你想调用一个 mutation hanler，需要以相应的 type 调用store.commit 方法
```javascript
store.commit('increment')
```

### 4.1 提交载荷（payload） ###
看标题是什么鬼？

其实就是 store.commit 传入额外的参数，即 mutation 的载荷（payload）（这个名字可忽略）
```javascript
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit('increment', 10)
``` 

但是一般情况下，我们会传一个对象。使用更好，容易读
```javascript
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})
```

### 4.2 对象风格的提交方式 ### 
前面讲的是 mutations 传了一个对象，包含了方法
现在讲的是直接使用包含 type 属性的对象
```javascript
store.commit({
  type: 'increment',
  amount: 10
})
```

当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：
```javascript
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

### 4.3 Mutation 需要遵循的规则 ###
- 提前在 state 里初始化好所有属性
- 在对象上添加新属性，应该这么做：
  - Vue.set(obj, 'newProp', 123)
  - 用新对象换老对象
    - state.obj = `{ ...state.obj, newProp: 123 }`

### 4.4 使用常量替换 Mutation 事件类型 ### 
使用常量替代 mutation 事件类型 在各种Flux实现中是很常见的模式....

我表示我不知道，不知道，不知道

先看看是啥？？？(mutation-types为mutation服务的)

```javascript
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

### 4.5 mutation 原则问题请记住 ###
**mutation 必须是同步函数 **
```javascript
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

假如现在我们在做一些事：
- debug 一个 app 并且观察 devtool 中的 mutation 日志
- 每一条 mutation 的状态都会被记住

但对于异步函数中的回调是不可能完成的，为啥？
- 当 mutation 触发的时候，回调函数还没有被调用。这样就不可以追踪了

### 4.6 在组件里提交 Mutation ### 
- 在组件中可以使用`this.$store.commit('xxx')`提交mutation
- 使用 mapMutations 辅助函数将组件中的 methdos 映射为 store.commit 调用(这个需要在根节点注入 store)

```javascript
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

## 5 Action ## 
Mutation 只能解决同步的问题，那么异步的问题，咋整呢？

于是有了 **Action**

和 mutation 不同的是：
- Action 提交的是 mutation，而不是直接变更状态
- Action 可以包含异步操作

来个简单的栗子：
```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，你就能
- `context.commit` 提交一个 mutation
- 通过 `context.state` 或者 `context.getters` 来获取 state 和 getters

**注意**：context 对象不是 store 实例本身

**再注意**：
实战，经常用 参数结构来简化代码
```javascript
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

## 5.1 分发 Action ## 
Action 通过`store.dispatch`方法触发
```javascript
store.dispatch('increment')
```

这样，action 可以在内部执行**异步**操作
```javascript
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

action 也支持同样的载荷方式和对象方式进行分发：
- 载荷形式
```javascript
store.dispatch('incrementAsync', {
  amount: 10
})
```
- 对象形式
```javascript
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

**超级大栗子**
```javascript
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

### 5.2 在组件中分发 Action ### 
- `this.$store.dispatch('xxx')`可以分发 action
- mapActions 辅助函数 将组件的 **methods** 映射为 `store.dispatch` 调用（根节点注入store）
```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

### 5.3 组合 Action ### 
Action 的操作一般都是异步的。
- 但如何知道 action 什么时候结束呢？
- 如何组合多个 action，以处理更加复杂的异步流程？

我们必须了解的是
- **store.dispatch 可处理被触发的 action 返回的Promise实例对象**
- **且store.dispatch 仍旧返回 Promise**

```javascript
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在我们可以做些事情了
```javascript
store.dispatch('actionA').then(() => {
  // ...
})
```

在另一个 action 中可以这么做了：
```javascript
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

这样利用新来的 async / await 语法糖，来组合 action
```javascript
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

**严重注意**
- 一个 store.dispatch 在不同模块中可以触发多个 action 函数，在这种情况下，只有所有的触发函数完成后，返回的 Promise 才会执行


## 6 Module（模块） ## 
- 为什么需要这个？
- 使用的是单一状态树，应用复杂的时候，store 对象就会很大，很臃肿

为了解决以上问题，Vuex 允许我们 把 store 分割成模块。
每个模块有自己的东西：
- state
- mutaion
- action
- getter
- 还可以拥有自己的子模块

跟树一样，模块树
```javascript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

### 6.1 模块的局部状态 ###
- 对于模块内部的 mutaion 和 getter，接收的第一个参数是**模块的局部状态对象**
```javascript
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

- 对于模块内部的 action
  - 局部状态`context.state`暴露处理
  - 根节点状态`context.rootSate`

```javscript
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```
- 对于模块内部的 getter
  - 根节点状态作为第三个参数暴露
```javascript
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

### 6.2 命名空间 ###
**注意**：
- 默认情况下，模块内部的action、mutation和getter是注册在**全局命名空间**，目的是使多个模块能够对同一 mutation 或 action 作出响应

如果你想，模块具有更高的封装度和复用性，你可以这么做
- 添加`namespaced: true `，称为命名空间模块
- 模块注册后，所有getter、action、mutation都会自动根据模块注册的路径调整命名

```javascript
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

#### 6.2.1 在命名空间模块内访问全局内容 ####
如果你想，使用全局 state 和 getter，
- rootState和rootGetter会作为第三和第四参数传入getter
- 也会通过 context 对象的属性传入 action

如果你想，在全局命名空间内，分发 action 或 提交 mutation，
- 将 `{ root: true }` 作为第三参数传给 dispatch 或 commit即可

```javascript
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

#### 6.2.2 带命名空间的绑定函数 ####
当使用 mapState, mapGetters, mapActions 和 mapMutations 这些函数来绑定命名空间模块时，可能比较繁琐
```javascript
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo',
    'some/nested/module/bar'
  ])
}
```

面对这种情况，你可以将模块的空间名称字符串作为第一个参数传递，然后就会自动将该模块作为上下文
```javascript
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo',
    'bar'
  ])
}
```

### 6.3 模块动态注册 ### 
store创建之后，可以使用 store.registerModule 方法注册模块

### 6.4 模块重用 ### 







