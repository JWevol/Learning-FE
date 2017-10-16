## 1 项目结构 ## 
需要遵守的规则：
- **应用层级的状态**应该集中到 **单个 store 对象** 中
- **提交 mutation 是更改状态的唯一方法**，并且**过程是同步的**
- **异步逻辑**都应该**封装到 action 里面**

如果文件太大，就将 action、mutation、getter分割成单个文件

对于大型应用的项目结构示例：
```shell
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

## 2 插件 ## 
...

## 3 严格模式 ## 
- 仅需在**创建 store 的时候**传入`strict: true`

```javascript
const store = new Vuex.Store({
  // ...
  strict: true
})
```

- 为什么要这么做？
- 在严格模式下，无论何时发生了状态变化，如果不是 mutation 函数引起的，就会报错，通常在**开发环境**上使用

### 3.1 开发环境与发布环境 ###
```javascript
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```
## 4 表单处理 ##
ing...


























