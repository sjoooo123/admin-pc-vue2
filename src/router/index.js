import Vue from "vue";
import Router from "vue-router";
import HomeLayout from "@/layout/home/layout.vue";
// 添加页面进度条
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

Vue.use(Router);

// 引入home路由
const files = require.context("./modules", false, /\.js$/);
const routes = [];
files.keys().forEach(key => {
  routes.push(files(key).default);
});

const router = new Router({
  routes: [
    {
      path: "/",
      component: HomeLayout,
      redirect: "/index",
      children: [...routes]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/404")
    }
  ],
  mode: process.env.NODE_ENV === "production" ? "history" : "hash" // 除去#号
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next({ path: "/404" });
  } else {
    NProgress.start();
    next();
  }
});
router.afterEach(to => {
  NProgress.done();

  // 更改标题
  router.app.$store.commit("index/setCurrentTopMenu", to.fullPath);
  window.document.title =
    (to.meta.title || "未命名") + " | " + process.env.VUE_APP_TITLE;
});

export { routes, router };
