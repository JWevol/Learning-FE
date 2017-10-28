
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  // 生产环境配置
  build: {
    env: require('./prod.env'), // 引入 ./prod.env.js 生产的编译环境
    index: path.resolve(__dirname, '../dist/index.html'), // 编译后输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态资源路径
    assetsSubDirectory: 'static', // 编译输出的静态资源二级目录
    assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器或 CDN域名
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false, // 是否开启 gzip 压缩
    productionGzipExtensions: ['js', 'css'], // 需要压缩的文件类型
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // 开发环境配置
  dev: {
    env: require('./dev.env'), // 引入 ./dev.env.js 开发的编译环境
    port: process.env.PORT || 8080, // 运行测试页面的端口
    autoOpenBrowser: true, // 是否自动打开浏览器
    assetsSubDirectory: 'static', // 编译输出的静态资源二级目录
    assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器或 CDN域名
    proxyTable: {}, // 需要 proxyTable 代理的接口(可跨域)
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
