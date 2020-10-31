import Vue from "vue";
import App from "@/App.vue";
import { router } from "@/router";
import store from "@/store";
// vue原型扩展、ui组件扩展
import "@/libs/augment.js";
import "@/libs/directive.js"; // 扩展弹窗拖拽
// 重置样式，全局样式，字体图标样式
import "@/assets/css/normalize.css";
import "@/assets/css/base.css";
import "@/assets/css/common.scss";
import "@/assets/iconfont/iconfont.css";
import "@/assets/css/element-variables.scss"; // 主题色修改文件

// 线上启用模拟数据
const mock = true;
if(mock){
  require('@/mock/index.js');
}

Vue.config.productionTip = false;

let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
export default vue;
