## 1 准备 ## 
### 1.1 安装命令行工具cli ### 
- vue.js 提供了很人性化的命令行工具
- 全局安装依赖之后
- 利用脚手架创建并启动了一个配备了
  - 带热重载
  - 保存时静态检查
  - 用于生态环境的构建配置

```cmd
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 安装依赖
$ cd my-project
$ npm install
$ npm run dev
```

### 1.2 查看安装结果 ### 

```cmd
vue -V
2.8.1
```

### 1.3 项目组成 ### 
#### 1.3.1 目录结构 #### 
```cmd
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   ├── webpack.test.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   ├── test.env.js
│   └── prod.env.js
├── node_modules    
├── src
│   ├── App.vue
│   ├── assets
│   │   └── img.png
│   ├── components
│   │   └── Hello.vue
│   └── main.js
├── static
├── test
│   └── unit
│   │   ├─── coverage
│   │   ├─── specs
│   │   ├─── .eslintrc
│   │   ├─── index.js
│   │   └── karma.conf.js
│   └── e2e
├── .babelrc
├── .editorconfig
├── .gitignore
├── .postcssrc.js
├── index.html
├── package.json
└── README.md
```

#### 1.3.2 子目录build(/build) #### 
##### 1.3.2.1 build.js #####
- 作用：执行`npm run build`的时候，执行的js脚本
  - 加载了生产环境下的webpack配置
  - 根据webpack配置重新构建出 生产环境下 使用的压缩项目
  - **最终资源文件会生成根目录下的 dist 文件**

##### 1.3.2.2 check-version.js #####
- 作用：在build之前的一个check步骤，作为构建生产项目包之前的一个校验处理

##### 1.3.2.3 dev-client.js #####
- 作用：加载热重载插件，并监听到时间的action变化为reload，实现自动更新

```javascript
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
```

##### 1.3.2.4 dev-server.js #####
- 作用：
  - 利用express实现一个本地开发的服务
  - 同时配置了热重载功能，配合本地开发浏览器端自动刷新

```javascript
var app = express();
...
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
```

##### 1.3.2.5 utils.js #####
- 作用：
  - 对外给响应的webpack配置使用的工具方法，包含了对外提供静态资源的asset路径

```javascript
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}
```
  - 对外提供各种loaders的配置，如cssLoaders, css/postcss/less/sass/scss/stylus/styl等预处理或后处理器配置等
```javascript
return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
}
```

##### 1.3.2.6 vue-loader.conf.js #####
- 作用：为vue单文件所用的配置，主要是一些单文件内使用css预处理的配置，还有一些文件资源的转化配置项

##### 1.3.2.7 webpack.base.conf.js #####
- 作用：
  - webpack 的通用配置文件，即无论环境是test，develop，production，都需要加载的webpack配置
  - **这文件很重要**

> 入口 entry
- 作用：
  - 默认只有app为入口的main.js
  - utils为自定义入口，可配置多个文件入口，可减少build后的文件大小
  - 可配合 CommonsChunkPlugin 插件进行项目分包

```javascript
entry: {
  app: './src/main.js',
  utils:['./src/assets/libs/jquery.js']
}
```

> 输出 output
- 作用：
  - config的配置在config/index.js文件中
```javascript
output: {
  path: config.build.assetsRoot, //导出目录的绝对路径
  filename: '[name].js', //导出文件的文件名
  publicPath: process.env.NODE_ENV === 'production'? config.build.assetsPublicPath : config.dev.assetsPublicPath //生产模式或开发模式下html、js等文件内部引用的公共路径
}
```

> 文件解析 resolve
- 作用：
  - 主要设置模块如何被解析
- 默认的配置：
  - 默认定义了vue$为vue.esm.js文件的别名
  - @为/src目录的别名，可通过@/xxx.js或者@/xxx.vue可快速引入文件

```javascript
resolve: {
  extensions: ['.js', '.vue', '.json'], //自动解析确定的拓展名,使导入模块时不带拓展名
  alias: {   // 创建import或require引入时，文件使用的别名
    'vue$': 'vue/dist/vue.esm.js', 
    '@': resolve('src')
  }
}
```
> 模块解析机制 module
- 作用：
  - 主要设置模块如何被解析
  - 主要用于定义不同文件后缀的文件，使用何种loaders（加载器）进行加载解析
  - 默认的vue-cli配备了.vue，.js，.img，媒体类，字体类等文件的解析
  - **.vue组件中，如果需要用到预处理语言，则需在style标签上增加lang属性**
- 区别（与webpack1.x相比）：
  - 原来的loaders被替换为rules

```javascript
<style lang="scss" scoped>
body{
  background-color:#FFF;
}
</style>
```

##### 1.3.2.8 webpack.dev.conf.js #####
- 作用：
  - 通过merge方法合并webpack.base.conf.js基础配置
```javascript
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
module.exports = merge(baseWebpackConfig, {})
```
  - 模块配置
```javascript
module: {
  //通过传入一些配置来获取rules配置，此处传入了sourceMap: false,表示不生成sourceMap
  rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }) 
}
```

这里引用了刚才utils.js中styleLoaders方法，自动生成的配置如下
```javascript
exports.styleLoaders = function (options) {
   //定义输出的数组
  var output = []
  // 调用cssLoaders方法返回各类型的样式对象(css: loader)
  var loaders = exports.cssLoaders(options) 
  //循环遍历loaders
  for (var extension in loaders) {  
    //根据遍历获得的key(extension)来得到value(loader)
    var loader = loaders[extension] 
    output.push({     
      // 通过正则匹配判断各类型的样式文件，并生成test和对应loaders
      test: new RegExp('\\.' + extension + '$'), 
      use: loader
    })
  }
  return output
}
```
上面的代码中调用了exports.cssLoaders(options),主要用于对各类css预处理的loaders实现,具体实现如下
```javascript
exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = { 
    loader: 'css-loader',
    options: {  
      //生成环境下压缩文件
      minimize: process.env.NODE_ENV === 'production', 
      //根据参数是否生成sourceMap文件
      sourceMap: options.sourceMap  
    }
  }
  function generateLoaders (loader, loaderOptions) {  
    // 预置css-loader
    var loaders = [cssLoader] 
    // 如果参数loader存在
    if (loader) { 
      //如果配置的预处理需要，则push一个进入loaders数组
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, { 
          sourceMap: options.sourceMap
        })
      })
    }
    // 如果传入的options存在extract且为true
    if (options.extract) { 
      //通过使用ExtractTextPlugin插件分离js中引入的css文件
      return ExtractTextPlugin.extract({  
        use: loaders,  
        //没有被提取分离的使用vue-style-loader加载
        fallback: 'vue-style-loader' 
      })
    } else {
        //如果没有传入的options存在extract或为false时，统一使用vue-style-loader处理
      return ['vue-style-loader'].concat(loaders)
    }
  }
  return {  //返回css类型对应的loader组成的对象 generateLoaders()来生成loader
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
```
  - 插件配置
```javascript
plugins: [
  // 编译时配置的全局变量
  new webpack.DefinePlugin({ 
    //当前环境为开发环境
    'process.env': config.dev.env 
  }),
  //热重载插件
  new webpack.HotModuleReplacementPlugin(), 
  //不触发错误,即编译后运行的包正常运行
  new webpack.NoEmitOnErrorPlugin(), 
  //自动生成html文件
  new HtmlWebpackPlugin({  
    filename: 'index.html', //生成的文件名
    template: 'index.html', //模板
    inject: true
  }),
  //友好的错误提示
  new FriendlyErrorsPlugin() 
]
```

##### 1.3.2.9 webpack.prod.conf.js #####
- 作用：
  - 生产环境打包用的配置文件
  - 使用了merge的方式合并了基础配置，形成了生产要用的配置

> 判断环境
```javascript
  //判断环境，如果是testing的话，则加载test.env
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env
```
> 加载样式处理器
```javascript
module: {
  //同样使用了utils.styleLoaders的方法处理，这里不赘述
  rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  //通过判断配置值，判断是否生产source-map
  devtool: config.build.productionSourceMap ? '#source-map' : false
}
```
> 输出文件
```javascript
output: {
  //配置的生产资源路径
  path: config.build.assetsRoot,
  //生成的文件名，一般会生成入口名称.[hash].js，如app.7d0bcfcc47ab773ebe20834b27a0927a.js
  filename: utils.assetsPath('js/[name].[chunkhash].js'),
  //生成的异步文件块，一般是分配id.[hash].js，如0.app.7d0bcfcc47ab773ebe20834b27a0927a.js
  chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
}
```
**注意**:
- 这里的异步文件块，系统会根据自己在 router下index.js当中引入的异步组件自动生产，所有我们无需重命名这部分的文件，不然容易导致文件索引404出错
 
> 插件
```javascript
//这里定义全局环境为生产
new webpack.DefinePlugin({
    'process.env': env
  }),
//js压缩插件
new webpack.optimize.UglifyJsPlugin({
  compress: {
    //不显示警告
    warnings: false
  },
  //生产source-map
  sourceMap: true
}), 
//在css文件单独分离出来
new ExtractTextPlugin({
    //生成的文件名，一般会生成入口名称.[hash].css，如app.7d0bcfcc47ab773ebe20834b27a0927a.css
    filename: utils.assetsPath('css/[name].[contenthash].css')
  }),
  //css配置插件，可以提取并压缩css文件
new OptimizeCSSPlugin({
    cssProcessorOptions: {
      safe: true
    }
  }),
//CommonsChunkPlugin 公共块提取插件
new webpack.optimize.CommonsChunkPlugin({
  //配置生成的文件名称：vendor
  name: 'vendor',
  minChunks: function (module, count) {
   //这里是默认的使用方法，将node_module引用到打包在一起
    return (
      //正则匹配
      module.resource &&
      /\.js$/.test(module.resource) &&
      module.resource.indexOf(
        path.join(__dirname, '../node_modules')
      ) === 0
    )
  }
}),
```

**注意**：
- 这里通过 CommonsChunkPlugin 插件将vue，vuex等包文件统一打在了名为:vendor的js中
- 最后生成一个类似叫 vendor.7d0bcfcc47ab773ebe20834b27a0927a.js
- 为了防止app打包时的hash的每次变化，导致资源无法缓存，需要增加一个mainfest，去将运行时的代码单独编译到mainfest文件，以防止每次编译到导致vendor.js的hash改变
```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: 'manifest',
  chunks: ['vendor']
}),
```
- 有时候，需要引入第三方库js，单独打包为一个文件，叫utils.js
```javascript
new webpack.optimize.CommonsChunkPlugin({
   names: ["utils"]
})
```

别忘了需要为它加入mainfest处理，只需在已有的基础上简单修改
```javascript
new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor','utils']
}),
```

当然需要为其增加一个入口文件
```javascript
entry: {
  app: './src/main.js',
  utils:['./src/assets/libs/jquery.js'] //这里可以根据你自己需求增加其他三方库文件
}
```
> 其他插件
- compression-webpack-plugin
  - 用于根据正则匹配进行压缩处理
- webpack-bundle-analyzer
  - 为你的包进行尺寸优化

#### 1.3.3 子目录config(/config) #### 
##### 1.3.3.1 环境变量定义 ##### 
- 作用：
  - 定义了生产、开发、测试的全局环境变量
  - 目的是调整在不同环境下使用不同的webpack配置，通过定义NODE_ENV变量
```javascript
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
```

#### 1.3.4 子目录node_modules(/node_modules) #### 
##### 1.3.4.1 npm安装的第三包 ##### 
通过`npm install`方式安装的第三方工具类

#### 1.3.5 子目录test(/test) #### 


### 1.4 根目录 ### 
#### 1.4.1 .babelrc #### 
- 作用：
  - 制定了babel的配置
  - 定义了加载的插件和测试运行时所需的插件istanbul
```javascript
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-runtime"],
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": ["istanbul"]
    }
  }
}
```

#### 1.4.2 .editorconfig #### 
- 作用：
  - 定义了编辑格式
    - 利用utf-8编码 utf-8
    - 空格缩进方式 space
    - 行缩进 两个字符
    - 结尾插入信行
    - 处理字符首尾空白字符
```javascript
root = true
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

#### 1.4.3 .gitignore #### 
- 作用：
  - git仓库同步时需要忽略提交的文件

#### 1.4.4 .postcssrc.js #### 
- 作用：
  - 新版的webpack只要配备了postcss的loaders，都会检查根目录是否有该配置文件
  - 通过导出plugins，进行配置你所需要的

这是autoprefixer和postcss-sprites
```javascript
module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-sprites":{
      // stylesheetPath: './css',
      spritePath: './css/images/',
      filterBy: function(image) {
        // Allow only png files
        if (!/\.png$/.test(image.url)) {
          return Promise.reject();
        }

        return Promise.resolve();
      }
    }
  }
}
```

#### 1.4.5 index.html #### 
你懂的

#### 1.4.6 package.json #### 
- 作用：用于记录和管理npm包的依赖和版本号

#### 1.4.7 README.md ####
- 作用：阅读说明




















