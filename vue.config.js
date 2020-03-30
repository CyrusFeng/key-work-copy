// const px2rem = require('postcss-px2rem')
//
// const postcss = px2rem({
//   remUnit: 100   //基准大小 baseSize，需要和rem.js中相同
// })
//
// module.exports = {
//   css: {
//     loaderOptions: {
//       postcss: {
//         plugins: [
//           postcss
//         ]
//       }
//     }
//   }
// }
const Timestamp = new Date().getTime();
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
      chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
    },
  },

}