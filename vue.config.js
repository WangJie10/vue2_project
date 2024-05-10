'use strict'// 启用语法严格模式
 
// 绝对路径
const path = require('path')
 
function resolve(dir) {
  return path.join(__dirname, dir)
}
 
// const CompressionPlugin = require('compression-webpack-plugin')
 
const name = process.env.VUE_APP_TITLE // 网页标题
 
const port = process.env.port || process.env.npm_config_port || 8010 // 端口
 
// vue.config.js 配置说明
// 官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: false,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    // 反向代理
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: { // 表示拦截以 process.env.VUE_APP_BASE_API开头的请求路径
        target: `http://localhost:9010/txj-api/`, // 代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 开启代理 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '' // 重写路径，把'^' + process.env.VUE_APP_BASE_API 变成空字符
// ^ 符号用于确保只有请求路径以 process.env.VUE_APP_BASE_API 开头的部分才会被重写
        }
      }
    },
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: { outputStyle: 'expanded' },
        data: `@import "@/assets/base.scss";`
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src') // 路径重写
      }
    },
    devtool: 'source-map'
  }
}