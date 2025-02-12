/*
 * @Author: 张慧茜 921879459@qq.com
 * @Date: 2023-12-11 17:22:24
 * @LastEditors: 张慧茜 921879459@qq.com
 * @LastEditTime: 2024-04-17 16:14:37
 * @FilePath: \douhuiAdmind:\交易所\主交易所\config\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use strict";
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    // proxyTable: {
    //   '/api':{
    //       target: 'http://api.skysp.info',
    //       secure: false, // https协议
    //       changeOrigin: true,
    //       logLevel: "debug",
    //       pathRewrite: {
    //         '^/api' : ''
    //       }
    //   },
    // '/market':{
    //     target: 'http://172.24.102.98:6004',
    //     secure: false
    // }
    // },

    // Various Dev Server settings
    host: "192.168.0.158",
    // host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../skyspPC/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../skyspPC"),
    assetsSubDirectory: "assets",
    // assetsPublicPath: 'https://bzeex.oss-cn-hongkong.aliyuncs.com/',
    assetsPublicPath: "https://SKYSP.oss-cn-hongkong.aliyuncs.com/",

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ["js", "css"],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  plugins: [
    // ... 其他插件
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]', // 目标资源名称（[path]会被替换成原资源路径，[query]会被替换成原查询字符串）
      algorithm: 'gzip', // 使用gzip压缩
      test: /\.(js|css|html|svg)$/, // 匹配需要进行压缩的文件类型
      threshold: 10240, // 只有大小大于该值的资源会被处理（单位是字节）
      minRatio: 0.8 // 只有压缩比小于这个值的资源会被处理（例如资源压缩前是100KB，压缩后是80KB，那么压缩比就是0.8）
    })
  ]
};
