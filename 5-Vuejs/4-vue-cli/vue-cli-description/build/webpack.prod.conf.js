'use strict'
/**
 * 以下是变量的说明 
 * path, 
 * utils, 
 * webpack, 
 * config, 引入 config/index.js
 * merge,  引入 webpack-merge 插件的合并功能
 * baseWebpackConfig, 引入 webapack.base.conf.js 基础配置模块
 * CopyWebpackPlugin, 引入 webpack 拷贝资源插件
 * HtmlWebpackPlugin, 引入 可以插入 html，并创建新的 html文件的插件
 * ExtractTextPlugin, 引入 可以分离 css 和 js 的插件
 * OptimizeCSSPlugin, 引入 压缩提取出来的 css，并解决extract 分离出的 js 重复问题???
 */
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// 设置环境为 生产环境
const env = config.build.env

// 合并 基础配置文件和生产环境的配置文件
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot, // 编译输出的目录
    filename: utils.assetsPath('js/[name].[chunkhash].js'), // 编译输出文件名
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js') // 没指定输出名的文件名的输出文件名
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // 插入到代码中
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    // 压缩 js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    // // 分离出 css 的文件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // 压缩 CSS
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // 构建输出的 index.html 文件，HtmlWebpackPlugin 可以生成一个 html 且在其中插入构建生成的资源
    new HtmlWebpackPlugin({
      filename: config.build.index, // 生成的 html 文件名
      template: 'index.html', // 模板文件
      inject: true, // 是否注入 html
      minify: { // 压缩方式
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // split vendor js into its own file
    /* 用于生成在入口点之间共享的公共模块(如jquery)并分成独立的包
       为什么要 new 两次这个插件？解决bug
       为了将项目中的第三方依赖代码抽离出来，当我们在项目里实际使用之后，发现一旦更改了 app.js 内的代码，
       vendor.js 的hash也会改变，下次上线，用户仍旧需要重新下载 vendor.js 与 app.js */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 文件名
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    // 拷贝静态资源目录    
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

// 开启 gzip 之后的配置
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  // 加入一个新的压缩插件
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
