'use strict'
// 引入 检查版本 的文件
require('./check-versions')()

// 引入 config/index.js 的默认配置
const config = require('../config')

/**
 * 若 Node 的环境无法判断当前是 dev/product 环境
 * 使用 config.dev.env.NODE_ENV 作为当前的环境
 */
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

/**
 * 以下是变量的说明 
 * opn, 可以打开浏览器并跳转到 url 的插件
 * path, 使用NodeJS 自带的文件路径工具
 * express, 使用express
 * webpack, 使用webpack
 * proxyMiddleware, ???
 * webpackconfig, 这是 dev 环境的 webpack 配置 
 */
const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
// 若没用指定端口，则使用默认端口 config.dev.port
const port = process.env.PORT || config.dev.port

// automatically open browser, if not set will be false
// 设置浏览器是否打开
const autoOpenBrowser = !!config.dev.autoOpenBrowser

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置
const proxyTable = config.dev.proxyTable

// 启动 express 服务
const app = express()

// webpack 编译 开发环境(webpack.dev.conf)的配置
const compiler = webpack(webpackConfig)

// 引入 webpack-dev-middleware，将编译后的文件暂存到内存中，???
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// 引入 webpack-hot-middleware，即无刷新浏览器热更新，hot-reload
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
// 将 hot-reload 挂载给 express 服务上，并输出相关的状态和错误
app.use(hotMiddleware)

// proxy api requests
// 进行枚举遍历，将 proxyTable 的请求配置挂载到启动的 express 服务上
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 使用 connect-history-api-fallback 匹配资源，若没匹配到，可进行重定向???
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 将暂存到内存中的 webpack 编译后的文件挂载到 express 服务上
app.use(devMiddleware)

// serve pure static assets
// 拼接 static 文件夹的静态资源路径
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// 浏览器打开后要指向的地址
const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    // 环境处于测试环境的时候，不打开浏览器
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    
    // 监听的端口号
    server = app.listen(port)
    _resolve()
  })
})

// 文件暴露的两个接口
module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
