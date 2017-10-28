'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 设置环境为开发环境
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
