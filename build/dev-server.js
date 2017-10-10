// 检查Node 和 npm 版本
require('./check-versions')()

/**
 * 加载 config/index.js模块
 * 此模块配置了项目运行环境(开发或构建), 端口号, 静态资源路径等.
 * 对开发时和运行时进行了配置
 */
var config = require('../config');

// 如果 Node 的环境无法判断当前是 dev / product 环境
// 使用 config.dev.env.NODE_ENV 作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// 可以强制打开浏览器并跳转到指定 url 的插件
// https://github.com/sindresorhus/opn
var opn = require('opn')

// Node.js提供的API, 提供一些文件, 路径操作的方法.
var path = require('path')

// express 是Node.js提供的框架, 使用express启动一个WebServer
var express = require('express')

// 核心编译工具, 使用webpack 进行编译打包
// 使用方式1: 全局安装webpack, 通过执行全局命令, 进行webpack编译.
// 使用方式2: webpack也提供了一个Node.js的API, 可以在Node.js里引入webpack进行编译. (vue项目使用的正是这种方式)
var webpack = require('webpack')

// HTTP协议代理中间件, 可以代理和转换一些, 我们需要的API
var proxyMiddleware = require('http-proxy-middleware')

// 加载webpack.dev.conf文件,这个配置文件中加载了webpack的基本配置文件. 相当于将webpack需要用到的配置整合到一个文件中.
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
// 设置的默认端口号(如果环境变量中没有端口号, 那么就从配置中获取)
// 端口号为命令行输入的PORT参数或者配置文件中的默认值
var port = process.env.PORT || config.dev.port


// automatically open browser, if not set will be false
// 配置文件中 是否自动打开浏览器
var autoOpenBrowser = !!config.dev.autoOpenBrowser



// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 从dev.proxyTable中获取一些HTTP代理的接口
var proxyTable = config.dev.proxyTable

// 创建experss实例app, 同时使用express启动webServer
var app = express()


// 根据配置文件内容, 使用webpack进行编译打包
// 返回的编译对象compiler, 实际上是为了express启动的webServer 和 webpack 中间件 使用的.
var compiler = webpack(webpackConfig)


//webpack-dev-middleware的作用
// 是express专门为了webpack开发的中间件, 虽然我们调试运行此项目, 但是没有在当前目录下看到编译好的文件, 虽然可以在浏览器中请求app.js文件, 但是当前目录中也没有. 这是因为这个中间件将编译好的文件存储在内存中, 我们对app.js的访问其实是对内存进行访问.
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  // 指定静态资源访问目录(就是"/app.js"中的 / )
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// webpack-hot-middleware 是 express为了webpack的webpack-hot-reload 提供的中间件.
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})



// force page reload when html-webpack-plugin template changes

// 当html-webpack-plugin template更改之后，强制刷新浏览器
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})



// proxy api requests
// 做转发请求
// 将 proxyTable 中的请求配置挂载到启动的 express 服务上
app.use(proxyMiddleware(config.dev.proxyTable.context, config.dev.proxyTable.options));

// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })







// handle fallback for HTML5 history API
//使用connect-history-api-fallback匹配资源
//如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 为webpack编译打包输出服务
// 使用上面定义好的中间件 webpack-dev-middleware
// 将暂存到内存中的 webpack 编译后的文件挂载到 express 服务上
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
//使用上面定义好的中间件 webpack-hot-middleware
// 将 Hot-reload 挂载到 express 服务上
app.use(hotMiddleware)

// serve pure static assets
// 服务纯静态资产
// 静态资源的路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

// 将静态资源挂到express服务器上. 当访问到一个/static目录时, 就去访问./static目录, 设置静态访问资源路径.
app.use(staticPath, express.static('./static'))

// 应用的地址信息，例如：http://localhost:8080
var uri = 'https://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')

// webpack开发中间件合法（valid）之后(编译成功后)输出提示语到控制台，表明服务器已启动
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

// 设置https协议和证书
//使用nodejs自带的http、https模块
var https = require('https');
var fs = require('fs');

// 根据项目的路径导入生成的证书文件
var privateKey = fs.readFileSync(path.join(__dirname, '../config/private.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, '../config/file.crt'), 'utf8');
var credentials = {key: privateKey, cert: certificate};

//创建https服务器
var httpsServer = https.createServer(credentials, app);

// 监听端口号
var server = httpsServer.listen(port, function () {
  console.log('HTTPS');
})

// var server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
