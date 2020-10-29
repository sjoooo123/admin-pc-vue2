import { routes } from "@/router";
const state = {
  menus: routes, // 菜单=路由
  currentTopMenu: routes[0] // 当前一级菜单，默认首页
};

const getters = {
  menus: state => state.menus,
  currentTopMenu: state => state.currentTopMenu
};

const actions = {};

const mutations = {
  setCurrentTopMenu: (state, payload) => {
    const path = "/" + payload.split("/")[1];
    state.currentTopMenu = state.menus.find(menu => menu.path === path);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
