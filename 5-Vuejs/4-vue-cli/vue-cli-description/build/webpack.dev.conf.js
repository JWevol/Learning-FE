'use strict'
/**
 * 以下是变量的说明 
 * utils, 辅助函数
 * webpack, 
 * config, 引入 config/index.js 的配置文件
 * merge, 使用 webpack-merge 插件合并配置文件
 * baseWebpackConfig, 导入 webpack.base.conf 的通用配置文件
 * HtmlWebpackPlugin, 这个插件可以帮我们自动生成 html，并且注入到 .html 文件中
 * FriendlyErrorsPlugin, 对 webpack 错误输出的优化
 */
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
// 将 热更新相关的代码(/build/dev-client.js) 加载到 入口之前
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 文件暴露的接口，使用了 webpack-merge 插件合并了 webpack 基础配置文件和 开发环境配置文件
module.exports = merge(baseWebpackConfig, {
  module: {
    // 使用小工具的 styleLoaders 方法
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // 使用 cheap-module-eval-source-map 模式作为开发工具！！!还有其他啥模式
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // definePlugin 接受字符串插入到代码当中
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // HotModule 插件在页面变更，进行重绘对应的页面模块，不重绘整个文件 
    new webpack.HotModuleReplacementPlugin(),
    // 使用了 NoErrorsPlugin 后页面中的报错不会阻塞，但是会在编译结束后报错
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 将 index.html 作为入口，注入html代码后生成 index.html 文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
