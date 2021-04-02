import vue from "@/main";
import axios from "axios";
const qs = require("qs");

// 添加请求拦截器
axios.interceptors.request.use(
    function (request) {
        // 没有参数统一添加空对象
        request.data = request.data || {};
        // 在发送请求之前的处理-
        if (request.url !== "/user/login") {
            const token = localStorage.getItem("token");
            token && (request.headers.token = token);
        }
        return request;
    },
    function (error) {
        vue.$alert(error, "请求错误", { type: "error" });
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // code
        /**
         * + 0 成功
          + 101 用户未登录
          + 404 访问地址错误
          + 500 系统错误
          + 601 token过期
          + 10000 后端返回提示，直接输出
          + 10001 数据错误OR数据没找到
          + 10002 数据验证失败
         */
        if (response.data.code != 0) {
            const errCodeList = [101, 601];
            if (errCodeList.includes(response.data.code)) {
                vue.$router.push("/login");
                return;
            }
            vue.$alert(response.data.info, "提示", { type: "error" })
            return;
        }
        console.log(response.config.url, response.data); // 线上静态数据调用打印
        return response;
    },
    function (error) {
        vue.$alert(error, "响应错误", { type: "error" });
        return Promise.reject(error);
    }
);

export default {
    //get请求
    get (url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: "get",
                url: process.env.VUE_APP_API_PREFIX + url,
                params: param,
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    },
    //post请求
    post (url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: process.env.VUE_APP_API_PREFIX + url,
                data: param,
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    },
    //form-data
    postform (url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: process.env.VUE_APP_API_PREFIX + url,
                data: param,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    },
    put (url, param, isFormData = false) {
        let config = {
            method: "put",
            url: process.env.VUE_APP_API_PREFIX + url,
            data: param
        };
        if (isFormData) {
            config.headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            };
            config.data = qs.stringify(param);
        }
        return new Promise((resolve, reject) => {
            axios(config).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    },
    // blob下载
    file (url, param, method = "GET") {
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                url: process.env.VUE_APP_API_PREFIX + url,
                data: param,
                responseType: "blob",
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    },
    delete (url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: "delete",
                url: process.env.VUE_APP_API_PREFIX + url,
                params: param
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    },
};
