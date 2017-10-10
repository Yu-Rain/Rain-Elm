// 工具函数集合
var utils = require('./utils')
var webpack = require('webpack')

// 配置文件
var config = require('../config')

// 一个可以合并数组和对象的插件
var merge = require('webpack-merge')


// webpack的基本配置文件(开发和运行都要用到的配置文件)
var baseWebpackConfig = require('./webpack.base.conf')


// webpack提供的操作HTML的插件, 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件
// https://github.com/ampedandwired/html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin')



// 用于更友好地输出webpack的警告、错误等信息
// https://github.com/geowarin/friendly-errors-webpack-plugin
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks

// 向webpack配置中增加入口文件
Object.keys(baseWebpackConfig.entry).forEach(function (name) {

  // 将入口文件的配置从  app: './src/main.js' 变成了 app: ['./build/dev-client', './src/main.js']
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 将 baseWebpackConfig 和 后面对象 合并
module.exports = merge(baseWebpackConfig, {

  // 配置样式文件的处理规则，使用styleLoaders
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },



  // cheap-module-eval-source-map is faster for development
  // 配置Source Maps。在开发中使用cheap-module-eval-source-map更快

  devtool: '#cheap-module-eval-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),


    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // HotModule 插件在页面进行变更的时候只会重绘对应的页面模块，不会重绘整个 html 文件
    new webpack.HotModuleReplacementPlugin(),

    //不触发错误,即编译后运行的包正常运行
    new webpack.NoEmitOnErrorsPlugin(),


    // https://github.com/ampedandwired/html-webpack-plugin

    //自动生成html文件,比如编译后文件的引入
    new HtmlWebpackPlugin({
      filename: 'index.html', //处理完模板文件后生成的文件名(和模板文件同名)
      template: 'index.html', //指定处理的模板文件(这里指的就是sell2/index.html)
      inject: true // 表示打包过程中输出的css, js 路径会自动添加到模板文件中. css文件路径会默认添加<head>元素内,  js文件路径会默认插入到body(最后面)中, 这个也是可以配置的, 可以去官网查看HtmlWebpackPlugin配置
    }),

    // webpack错误信息提示插件
    new FriendlyErrorsPlugin()
  ]
})
