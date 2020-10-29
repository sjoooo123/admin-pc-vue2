export default {
  path: "/index",
  name: "index",
  meta: {
    title: "首页",
    icon: ""
  },
  component: () => import("@/views/home/index")
};
