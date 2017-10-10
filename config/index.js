// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {

  // production 生产环境
  build: {
    // 构建环境
    env: require('./prod.env'),

    // 构建输出的index.html文件
    index: path.resolve(__dirname, '../dist/index.html'),

    // 构建输出的静态资源路径
    assetsRoot: path.resolve(__dirname, '../dist'),

    // 构建输出的二级目录
    assetsSubDirectory: 'static',

    // 构建发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',

    // 是否开启 cssSourceMap
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 默认关闭 gzip，因为很多流行的静态资源主机，例如 Surge、Netlify，已经为所有静态资源开启gzip
    productionGzip: false,

    // 需要使用 gzip 压缩的文件扩展名
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off

    // 运行“build”命令行时，加上一个参数，可以在构建完成后参看包分析报告
    // true为开启，false为关闭
    bundleAnalyzerReport: process.env.npm_config_report
  },

  // dev 开发环境
  dev: {
    // 构建环境
    env: require('./dev.env'),
    // 端口号
    port: 8080,
    // 是否自动打开浏览器
    autoOpenBrowser: false,

    // 构建输出的二级目录
    assetsSubDirectory: 'static',

    // 构建发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',

    // proxyTable 代理的接口（可跨域）
    // 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
    // 代理接口对象, 默认为空对象, 说明没有代理接口, 根据业务需求, 有需要转发的接口就直接在这里配置即可.
    proxyTable: {
      context: [ // 代理的路径
        '/bgs',
        '/shopping'
      ],

      options: {
        target: 'https://mainsite-restapi.ele.me',// 目标主机
        changeOrigin: true, // 虚拟托管网站需要, 那么本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了
        secure: false, // 默认情况下，不会接受在HTTPS上运行无效证书的后端服务器。
      }

    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // CSS 的Sourcemap 默认是关闭的, 因为相对路径存在一些bug
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false // 在开发环境下不使用css sourceMap
  }
}
