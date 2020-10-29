module.exports = {
  publicPath: "/",
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      // 图片
      "/jpt/images": {
        target: "http://192.168.13.150:30010", // 开发服务器
        changeOrigin: false,
        ws: false
      },
      // 通用接口
      "/": {
        // target: "http://192.168.13.201:20690", // 开发服务器,
        target: "http://localhost:5300", // mock服务器
        changeOrigin: false,
        ws: false
      }
    },
    disableHostCheck: true
  }
};
