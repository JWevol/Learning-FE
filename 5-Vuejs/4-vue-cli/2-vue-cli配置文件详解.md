## 1 vue-cli 的配置分析 ## 

## 2 目录结构 ## 
```cmd
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── Hello.vue
│   └── main.js
└── static
```

### 2 主要关注点 ### 
- build：编译任务的代码
- config：webpack 的配置文件
- package.json：项目的基本信息

### 3 入口 ###
1. 先看 package.json 的代码
```javascript
"scripts": {
    "dev": "node build/dev-server.js",
    "build": "node build/build.js",
    "lint": "eslint --ext .js,.vue src"
}
```

得知：
- 运行`npm run dev`是运行的 `node build/dev-server.js`
- 运行`npm build`是运行的 `node build/build.js`

那么就从 dev-server.js 开始分析

#### 3.1 dev-server.js #### 
- 路径：build/dev-server.js



























