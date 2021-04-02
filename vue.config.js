const path = require("path");
// const apiMocker = require("webpack-api-mocker");

module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    configureWebpack: {
        externals: {
            'BMap': 'BMap',
            'AMap': 'AMap',
        },
        devServer: {
            disableHostCheck: true, // 花生壳使用
            // 代理配置
            // proxy: {
            //   "/api": {
            //     // target: "http://192.168.13.89:100", // 后端服务
            //     target: "http://localhost:9999", // node服务，mock默认端口9999
            //     changeOrigin: true,
            //     pathRewrite: {
            //       // '^/api': ''
            //     }
            //   },
            // },
            // 数据模拟
            // before(app) {
            //   apiMocker(app, path.resolve(__dirname, "./mock/static/index.js"));
            // }
        }
    }
};
