import vue from "@/main";
import axios from "axios";
const qs = require("qs");

// 添加请求拦截器
axios.interceptors.request.use(
  function(request) {
    // 在发送请求之前做些什么
    // 前端控制失效时间10分钟
    const now = vue.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const lrt = localStorage.getItem("lastrequesttime");
    if (lrt) {
      const m1 = vue.$moment(now);
      const m2 = vue.$moment(lrt);
      const m = m1.diff(m2, "minute");
      // 10分钟则清空token
      if (m >= 30) {
        localStorage.removeItem("token");
      }
    }
    localStorage.setItem("lastrequesttime", now);

    // 在发送请求之前的处理
    // 排除不需要携带token的接口
    if (request.url !== "/user/login") {
      // 注入token
      const token = localStorage.getItem("token");
      request.headers.Authorization = token || "bearer xx";
    }
    return request;
  },
  function(error) {
    // 对请求错误做些什么
    vue.$alert(error, "请求错误", { type: "error" });
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // 业务失败
    if (response.data.code !== "000000") {
      // token失效或者不存在
      const errCodeList = ["105001", "105002"];
      if (errCodeList.includes(response.data.code)) {
        vue.$router.push("/login");
        return;
      }
      response.err = {
        showAlert: () =>
          vue.$alert(response.data.msg, "提示", { type: "error" })
      };
    }
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    vue.$alert(error, "响应错误", { type: "error" });
    return Promise.reject(error);
  }
);

export default {
  //get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url,
        params: param
      }).then(res => {
        resolve(res);
      });
    });
  },
  //post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data: param
      }).then(res => {
        resolve(res);
      });
    });
  },
  //form-data
  postform(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data: param,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        resolve(res);
      });
    });
  },
  put(url, param, isFormData = false) {
    let config = {
      method: "put",
      url,
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
      });
    });
  },
  // blob下载
  file(url, param, method = "GET") {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url,
        data: param,
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        resolve(res);
      });
    });
  },
  delete(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "delete",
        url,
        params: param
      }).then(res => {
        resolve(res);
      });
    });
  }
};
