var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },

  devtool: config.build.productionSourceMap ? '#source-map' : false,


  output: {
    //导出文件目录
    path: config.build.assetsRoot,
    //导出的文件名
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    //非入口文件的文件名，而又需要被打包出来的文件命名配置,如按需加载的模块
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env //配置全局环境为生产环境
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: { //压缩配置
        warnings: false // 不显示警告
      },
      sourceMap: true //生成sourceMap文件
    }),

    // extract css into its own file
    //将js中引入的css分离的插件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css') //分离出的css文件名
    }),


    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    //压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin

    // webpack提供的操作HTML的插件, 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件
    new HtmlWebpackPlugin({
      filename: config.build.index, //生成的html的文件名
      template: 'index.html', //指定处理的模板文件(这里指的就是s26/index.html)
      inject: true,
      minify: { //压缩配置
        removeComments: true, //删除html中的注释代码
        collapseWhitespace: true, //删除html中的空白符
        removeAttributeQuotes: true  //删除html元素中属性的引号



        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency' //按dependency的顺序引入
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),



    // split vendor js into its own file
    //分离公共js到vendor中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', //文件名

      // 声明公共的模块来自node_modules文件夹
      minChunks: function (module, count) {
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
    // 复制静态资源,将static文件内的内容复制到指定文件夹
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'] //忽视.*文件
      }
    ])
  ]
})

if (config.build.productionGzip) { //配置文件开启了gzip压缩

  //引入压缩文件的组件,该插件会对生成的文件进行压缩，生成一个.gz文件
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]', //目标文件名
      algorithm: 'gzip', //使用gzip压缩
      test: new RegExp( 
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240, //资源文件大于10240B=10kB时会被压缩
      minRatio: 0.8 //最小压缩比达到0.8时才会被压缩
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
