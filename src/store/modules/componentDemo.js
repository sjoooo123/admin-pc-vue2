const state = {
  shopCategories: [],
  jdCategories: [],
  jdImageCategory: [],
  baseConfig: {},
  detailConfig: {},
  filterConfig: {}
};

const getters = {
  getShopCates: state => state.shopCategories,
  getJdCates: state => state.jdCategories,
  getJdImageCategory: state => state.jdImageCategory,
  getBaseConfig: state => state.baseConfig,
  getDetailConfig: state => state.detailConfig,
  getFilterConfig: state => state.filterConfig
};

const actions = {};

const mutations = {
  setShopCates: (state, payload) => {
    state.shopCategories = payload;
  },
  setJdCates: (state, payload) => {
    state.jdCategories = payload;
  },
  setJdImageCategory: (state, payload) => {
    state.jdImageCategory = payload;
  },
  setBaseConfig: (state, payload) => {
    state.baseConfig = payload;
  },
  setDetailConfig: (state, payload) => {
    state.detailConfig = payload;
  },
  setFilterConfig: (state, payload) => {
    state.filterConfig = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
