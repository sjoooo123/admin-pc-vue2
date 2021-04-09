import Vue from "vue";
import Router from "vue-router";
import HomeLayout from "@/layout/layout.vue";
import { paths, menus } from "@/router/menu";
// 添加页面进度条
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

Vue.use(Router);

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法

Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
    routes: [
        {
            path: "/",
            component: HomeLayout,
            // redirect: "/index",
            children: [...menus]
        },
        // 其他路由定义
        {
            path: "/login",
            component: () => import("@/views/login"),
            meta: {
                title: "登录"
            }
        },
        {
            path: "/amap",
            component: () => import("@/views/home/componentDemo/amap"),
            meta: {
                title: "高德地图"
            }
        },
        {
            path: "/404",
            component: () => import("@/views/404")
        }
    ]
    // mode: "history" // 除去#号，部署gitee不需要
});

router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        return next({ path: "/404" });
    }
    NProgress.start();
    return next();

});
router.afterEach(to => {
    NProgress.done();

    // 添加菜单tags
    if (paths.includes(to.path) && to.path !== '/empty') {
        router.app.$store.dispatch("tagsView/addView", to);
        router.app.$store.commit("tagsView/setCurrentView", to);
    }
    // 更改标题
    router.app.$store && router.app.$store.commit("index/setCurrentTopMenu", to.fullPath);
    window.document.title =
        (to.meta.title || "未命名") + " | " + process.env.VUE_APP_TITLE;
});

export { router };
