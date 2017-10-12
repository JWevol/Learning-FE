## 1 安装 ## 
### 1.1 CDN ### 
在 Vue 之后加载 vue-router

- https://unpkg.com/vue-router/dist/vue-router.js
- 指定版本号：https://unpkg.com/vue-router@2.0.0/dist/vue-router.js

### 1.2 NPM ### 
```
npm install vue-router
```

在模块化工程中使用对应的语法糖：
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

## 2 基础 ## 
### 2.1 开始 ### 
- 意识：使用 Vue.js 和 vue-router 可创建单页应用，通过组合组件
- 我们要做的：
  - 将**组件**映射到**路由**
  - 然后告诉vue-router在哪里渲染

完整的例子：
```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

```javascript
// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 现在，应用已经启动了！
```

**严重警告**：
- <router-link> 对应的路由匹配成功，会自动设置class属性值 .router-link-active
- <router-link> 默认渲染成 a 标签

### 2.2 动态路由匹配 ### 
#### 2.2.1 来源 ####
有时候会按照某种模式进行匹配的 所有路由，全都映射到同一个组件。（举个例子，不同id的用户对应同一个个人中心组件）

#### 2.2.2 如何做 ####
解决办法：在 vue-router 的路由路径中使用【动态路径参数】

不懂？

意识: 动态路径参数 以 **冒号** 开头

实例：
```javascript
// 用户组件
const User = {
  template: '<div>User</div>'
}

// 重点
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

发现：类似 /user/foo 和 /user/bar 都将映射到同一个组件

需要了解到的：
- 当匹配一个路由时，参数会自动设置到 `this.$route.params`，可在每个组件使用

##### 2.2.2.1 多段【路径参数】 #####
| 模式 | 匹配路径 | $route.params |
|-|-|-|
| /user/:username | /user/evan | { username: 'evan' } |
| /user/:username/post/:post_id | 	/user/evan/post/123 | { username: 'evan', post_id: 123 } |

#### 2.2.3 响应参数的变化  #### 
这是什么？

理解：
- 使用路由参数时，从 /user/foo 导航到 user/bar，会发生什么呢？
  - 组件实例会被复用，比起**销毁再创建**，复用明显更好，同时问题出现，**组件的生命周期钩子不会再被调用（即不会再出生一次）**

这时候，你想 **对路由参数的变化作出一些处理**， 你可以这么**watch(监测变化) $route 对象**：

不懂，来个实例：
1. 方法1
```javascript
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

2. 方法2 
2.2版本引入的 **beforeRouteUpdate** 守卫：
```javascript
const User = {
  template: '...',
  // 重要
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

#### 2.2.4 高级匹配模式和匹配优先级  ####
- 高级匹配模式
  - 使用场景：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配
- 匹配优先级
  - 有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高
 
### 2.3 嵌套路由 ### 
- 我们用的应用程序，通常是由 **多层嵌套的组件** 组合而成 
- URL 中各段动态路径也按**某种结构**对应嵌套的**各层组件**

如下表示：
```
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

实例讲解：
```javascript
<div id="app">
  <router-view></router-view>
</div>
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

特点：
- 这里的 <router-view> 是最顶层的出口，渲染最高级路由匹配到的组件，即user
- 同样地，一个被渲染组件同样可以包含自己的嵌套 <router-view>

于是，改变了User组件的模板内容
```javascript
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

于是，要渲染二级路由，则需要 children 配置
```javascript
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

有一个问题，基于上面的配置，当你访问 /user/foo 时，User 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由
```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome },

        // ...其他子路由
      ]
    }
  ]
})
```


### 2.4 编程式导航（使用js控制导航） ### 
如何导航链接？
- 使用 <router-link> 创建 a 标签来定义导航链接
- 借助 router 的实例方法，通过编写代码来实现
```
router.push(location, onComplete?, onAbort?)
```

使用router.push之后的症状：
- 这个方法会向 history 栈添加一个新的记录（即返回则存在）

实际上，点击<router-link> 时，这个方法会在内部调用,即（点击 <router-link :to="..."> 等同于调用 router.push(...)）

于是有两种方式：
- 声明式：<router-link :to="...">
- 编程式：router.push(...)
```javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

**严重注意**：
- 提供了 path，就会忽略了 params 参数
- 2.2.0版本以上，对router.push 和 router.replace中提供了 onComplete 和 onAbort 作为第二和第三参数。这些是在导航成功（包括所有的异步钩子被解析之后）或终止（导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由）的时候进行的调用

**再次警告**：
- 如果目标路由和当前路由相同，只有参数发生了改变，可使用 beforeRouteUpdate 进行响应变化

#### 2.4.1 router.replace() 和 router.go() ####
- router.replace(location, onComplete?, onAbort?)
和 router.push 唯一的不同是，不会向 history 添加纪录，只是替换当前的 history 记录
- 在 history 记录中向前或向后退多少步

### 2.5 命名路由 ### 
- 是啥？
- 给路由用 一个名称 标识，可以简写

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

- 如何使用？
- <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
- router.push({ name: 'user', params: { userId: 123 }})

### 2.6 命名视图 ### 
- 是啥？
- 同时展示多个视图(router-view)，比如有一个布局，有侧导航和主内容，没名字，默认为default

```javascript
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，那么对同一个路由，多个视图就需要多个组件，需要使用 components 配置
```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

### 2.7 重定向和别名 ###
#### 2.7.1 重定向 #### 
- 实现方式？
- 配置 routes 来完成
```javascript
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

**注意**：
- 可以重定向为命名路由
- 甚至是一个方法，动态返回重定向目标

#### 2.7.2 别名 ####
【重定向】是：用户访问 /a 时，URL被替换成 /b，然后匹配路由 /b

/a 的别名是 /b，意思是，当用户访问 /b 式，URL会保持为 /b，但是路由匹配的是 /a，就像用户访问的 /a 

### 2.8 路由组件传递 props 解耦 ### 
- 为啥要这样？
- 组件中使用 $route 会与对应的路由 形成高度耦合，导致的结果呢？就是使组件只能在某些特定的 url 上使用，就大大限制其灵活性

- 解决办法？
- 使用 props 将组件和路由解耦

实例:
**错误的做法**：
```javascript
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```
**正确的做法（props）**：
```javascript
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true }

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加props选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```
#### 2.8.1 布尔模式 #### 

#### 2.8.2 对象模式 #### 

#### 2.8.3 函数模式 #### 

### 2.9 History 模式 ### 
**注意**：vue-router 默认是 hash 模式（使用 URL 的hash来模拟一个完成的URL，当URL改变时，页面不会重新加载） 

不想要很丑的hash???

你可以使用路由的 history 模式，这种模式充分利用 history.pushState API来完成跳转
```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

这种模式需要后台配置支持，若没有后台正确的配置，则用户访问就会返回 404

所以，需要在服务端增加一个覆盖所有情况的候选资源。即URL匹配不到任何静态资源，就返回一个 index 页面

#### 2.9.1 警告 #### 
这么设置之后，服务器不会再返回404错误页面，对于所有路径都会返回 index页面。
为了避免这种情况，需要在 Vue 应用里面覆盖所有的路由情况，然后在给出 404页面
```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```


