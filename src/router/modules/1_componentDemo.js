import HomeChildLayout from "@/layout/home/child-layout.vue";

export default {
  path: "/componentDemo",
  name: "componentDemo",
  meta: {
    title: "组件示例",
    icon: "el-icon-s-tools"
  },
  component: HomeChildLayout,
  redirect: "/componentDemo/demo0",
  children: [
    {
      path: "/componentDemo/demo0",
      name: "demo0",
      meta: {
        title: "组件0",
        icon: "el-icon-edit"
      },
      component: () => import("@/views/home/componentDemo/demo0")
    },
    {
      path: "/componentDemo/collapse",
      name: "collapse",
      meta: {
        title: "折叠",
        icon: "el-icon-edit"
      },
      component: () => import("@/views/home/componentDemo/collapse")
    },
    {
      path: "/componentDemo/treeselect",
      name: "treeselect",
      meta: {
        title: "树选择",
        icon: "el-icon-edit"
      },
      component: () => import("@/views/home/componentDemo/treeselect")
    },
    {
      path: "/componentDemo/ueditor",
      name: "ueditor",
      meta: {
        title: "编辑器",
        icon: "el-icon-edit"
      },
      component: () => import("@/views/home/componentDemo/ueditor")
    },
    {
      path: "/componentDemo/myTable",
      name: "myTable",
      meta: {
        title: "表格",
        icon: "el-icon-edit"
      },
      component: HomeChildLayout,
      redirect: "/componentDemo/myTable/table",
      children: [
        {
          path: "/componentDemo/myTable/table",
          name: "table",
          meta: {
            title: "动态表格",
            icon: "el-icon-edit"
          },
          component: () => import("@/views/home/componentDemo/myTable/table")
        },
        {
          path: "/componentDemo/myTable/staticTable",
          name: "staticTable",
          meta: {
            title: "静态表格",
            icon: "el-icon-edit"
          },
          component: () =>
            import("@/views/home/componentDemo/myTable/staticTable")
        }
      ]
    },
    {
      path: "/componentDemo/echart",
      name: "echart",
      meta: {
        title: "图表",
        icon: "el-icon-edit"
      },
      component: () => import("@/views/home/componentDemo/echart")
    },
    {
      path: "/componentDemo/baiduMap",
      name: "baiduMap",
      meta: {
        title: "百度地图",
        icon: "el-icon-edit"
      },
      component: () => import("@/views/home/componentDemo/baiduMap")
    },
    {
      path: "/componentDemo/d3",
      name: "d3",
      meta: {
        title: "d3",
        icon: "el-icon-edit"
      },
      component: HomeChildLayout,
      redirect: "/componentDemo/d3/bar",
      children: [
        {
          path: "/componentDemo/d3/bar",
          name: "bar",
          meta: {
            title: "柱状图",
            icon: "el-icon-edit"
          },
          component: () => import("@/views/home/componentDemo/d3/bar")
        },
        {
          path: "/componentDemo/d3/force",
          name: "force",
          meta: {
            title: "力导向图",
            icon: "el-icon-edit"
          },
          component: () => import("@/views/home/componentDemo/d3/force")
        }
      ]
    }
  ]
};
