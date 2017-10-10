var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')


// utils.js也是一个被使用频繁的文件，这个文件包含了三个工具函数：

/**
 * 生成静态资源的路径
 * @param _path  相对于静态资源文件夹的文件路径
 * @returns {string|*}  静态资源完整路径
 */

exports.assetsPath = function (_path) {
  // 根据环境(开发或运行)配置静态资源路径
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  // 拼接传入的字符串. (结构为: static/_path )
  //  path.posix.join与path.join一样，不过总是以 posix 兼容的方式交互
  return path.posix.join(assetsSubDirectory, _path)
}




// 生成对CSS文件处理的loader
// 生成cssLoaders用于加载.vue文件中的样式
/**
 *
 * 生成处理css的loaders配置
 * @param options 生成配置
 *                option = {
 *                  // 是否开启 sourceMap
 *                  sourceMap: true,
 *                  // 是否提取css
 *                  extract: true
 *                }
 * @returns {{css: *, postcss: *, less: *, sass: *, scss: *, stylus: *, styl: *}}  处理css的loaders配置对象
 */

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production', //生产环境下压缩文件
      sourceMap: options.sourceMap
      //根据参数是否生成sourceMap文件
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  // 返回对象, 里面存储了各种CSS预处理器对应的loader,
  // key值为CSS预处理器名称, value为 CSS预处理器对应的loader,
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}




// Generate loaders for standalone style files (outside of .vue)
// 对单独的style文件做处理, 比如不在.vue文件内部的style
// 生成styleLoaders用于加载不在.vue文件中的单独存在的样式文件
/**
 * 生成 style-loader的配置
 * @param options
 * @returns {Array}
 */
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)

  // 遍历 cssLoaders方法中返回的loaders
  for (var extension in loaders) {

    // extension 就是exports.cssLoaders中返回的key值(CSS预处理器名称)
    // 根据扩展名获取对应的loader.
    var loader = loaders[extension]

    // output数组存储了 监听有这些扩展名文件的监听对象.
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
