import HomeChildLayout from "@/layout/child-layout.vue";

const showMenus = JSON.parse(localStorage.getItem('menus')) || [];

// name为唯一标识
let menus = [
  {
    path: "/index",
    id: 1,
    name: "index",
    disabled: true, // 菜单权限，不能选择
    meta: {
      title: "首页",
      icon: "el-icon-s-home",
      isHot: true,
      affix: true, // 附加标识:默认存在，不能关闭
    },
    component: () => import("@/views/home/index")
  },
  {
    path: "/componentDemo",
    id: 2,
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
        id: 20,
        name: "componentDemo_demo0",
        meta: {
          title: "组件0",
          icon: "el-icon-edit"
        },
        component: () => import("@/views/home/componentDemo/demo0")
      },
      {
        path: "/componentDemo/collapse",
        id: 21,
        name: "componentDemo_collapse",
        meta: {
          title: "折叠",
          icon: "el-icon-edit"
        },
        component: () => import("@/views/home/componentDemo/collapse")
      },
      {
        path: "/componentDemo/treeselect",
        id: 22,
        name: "componentDemo_treeselect",
        meta: {
          title: "树选择",
          icon: "el-icon-edit"
        },
        component: () => import("@/views/home/componentDemo/treeselect")
      },
      {
        path: "/componentDemo/ueditor",
        id: 23,
        name: "componentDemo_ueditor",
        meta: {
          title: "编辑器",
          icon: "el-icon-edit"
        },
        component: () => import("@/views/home/componentDemo/ueditor")
      },
      {
        path: "/componentDemo/myTable",
        id: 24,
        name: "componentDemo_myTable",
        meta: {
          title: "动态表格",
          icon: "el-icon-edit"
        },
        component: () => import("@/views/home/componentDemo/myTable")
      },
      {
        path: "/componentDemo/myTableStatic",
        id: 25,
        name: "componentDemo_myTableStatic",
        meta: {
          title: "静态表格",
          icon: "el-icon-edit"
        },
        component: () =>
          import("@/views/home/componentDemo/myTableStatic")
      },
      {
        path: "/componentDemo/echart",
        id: 26,
        name: "componentDemo_echart",
        meta: {
          title: "图表",
          icon: "el-icon-edit"
        },
        component: () => import("@/views/home/componentDemo/echart")
      },
      {
        path: "/componentDemo/baiduMap",
        id: 27,
        name: "componentDemo_baiduMap",
        meta: {
          title: "百度地图",
          icon: "el-icon-edit"
        },
        component: () => import("@/views/home/componentDemo/baiduMap")
      },
    ]
  },
  {
    path: "/d3",
    id: 3,
    name: "d3",
    meta: {
      title: "d3",
      icon: "el-icon-edit"
    },
    component: HomeChildLayout,
    redirect: "/d3/bar",
    children: [
      {
        path: "/d3/bar",
        id: 30,
        name: "d3_bar",
        meta: {
          title: "柱状图",
          icon: "el-icon-edit"
        },
        component: () => import("@/views/home/d3/bar")
      },
      // {
      //   path: "/d3/force",
      //   id: 31,
      //   name: "d3_force",
      //   meta: {
      //     title: "力导向图",
      //     icon: "el-icon-edit"
      //   },
      //   component: () => import("@/views/home/d3/force")
      // }
    ]
  }
];

// 遍历修改菜单属性
const filterFun = (menu) => {
  for(let i=0,l=showMenus.length;i<l;i++) {
    if(showMenus[i].id == menu.id){
      menu.meta.title = showMenus[i].name;
      break;
    }
  }
}
let paths = [];
menus.forEach(menu => {
  paths.push(menu.path);
  // 遍历修改菜单属性
  filterFun(menu);
  
  if(menu.children){
    menu.children.forEach(c=>{
      paths.push(c.path);
      // 遍历修改菜单属性
      filterFun(c);
    })
  }
})
export {paths, menus};
