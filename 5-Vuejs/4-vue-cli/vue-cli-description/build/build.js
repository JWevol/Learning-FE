'use strict'
require('./check-versions')()

// 当前环境为生产环境
process.env.NODE_ENV = 'production'

/**
 * 以下是变量的说明 
 * ora, 一个 loading 插件
 * rm, 一个 深度删除 node_modules 目录的模块插件
 * path, 
 * chalk, 让命令行彩色输出的 插件
 * webpack, 
 * config, 引入 config/index.js
 * webpackConfig, 引入 webpack.prod.conf.js 生产环境的配置
 */
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

// 删除已生成的目录和子目录
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 开始编译
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
