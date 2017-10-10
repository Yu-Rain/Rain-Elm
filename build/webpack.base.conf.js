var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('../config')

// 工具函数集合
var vueLoaderConfig = require('./vue-loader.conf')

/**
 * 获得绝对路径
 * @param dir  相对于本文件的路径
 * @returns {string|*} 绝对路径
 */
function resolve (dir) {

  // 使用项目的根目录拼接dir路径.
  // .. 代表在build目录级别是根目录(s26目录下是根目录)
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    // 编译入口文件
    app: './src/main.js'
  },

  // 出口文件和存放路径
  output: {

    // 编译输出的静态资源根路径
    // 在s26目录下生成dist目录, 并把资源存放在dist目录下(会将资源存储在磁盘上).
    path: config.build.assetsRoot,


    // 生成的静态资源文件. [name] 代表是 entry对象下属性名称(例如: app).
    filename: '[name].js',


    // 正式发布环境下编译输出的上线路径的根路径
    // 请求的静态资源绝对路径, 通常是 '/'. 所以可以在浏览器中看到<script src = "/app.js"></script>
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },

  // 文件解析(在文件中使用require或import加载模块时的相关配置)
  resolve: {
    // 自动解析确定的扩展名，使导入模块时不带扩展名
    extensions: ['.js', '.vue', '.json'],

    // 提供路径别名, 简化路径
    alias: {

      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'pages': resolve('src/pages'), // 配置简写路径
    },
    symlinks: false
  },

  // 模块解析module
  // 如何处理项目中不同类型的模块
  module: {
    rules: [
      {
        test: /\.vue$/, // 根据后缀匹配文件
        loader: 'vue-loader', // 使用vue-loader处理.vue文件.
        options: vueLoaderConfig // 对vue-loader做的额外的选项配置
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')] // 在src和test的文件夹下必须对匹配文件进行ES6语法检查
      },
      {
        // 直接查看浏览器中图片的路径, 不足10kb的替换10kb以上的图片, 查看路径.
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,// 对于小于10Kb的以base64进行引用, 也就是生成一个base64串(例如: <img src="data:image/png;base64,iVBOR…DACog5YM65zugAAAAAElFTkSuQmCC">), 打包到编译后的js文件内, 超过10kb就会单独生成一个文件.
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 单独生成文件的文件名规则: 使用utils.assetsPath('img/[name].[hash:7].[ext]')生成文件名, 在这里应该是 /static/img/文件名称.生成的7位哈希串.后缀名 (例如: <img src="/static/img/logo.ddf2203.png">)
        }
      },


      {
        // 媒体文件
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        // 字体文件
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
