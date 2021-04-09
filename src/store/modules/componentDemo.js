const state = {
        shopCategories: [],
        jdCategories: [],
        jdImageCategory: [],
        baseConfig: {},
        detailConfig: {},
        filterConfig: {}
    },

    getters = {
        getShopCates: _state => _state.shopCategories,
        getJdCates: _state => _state.jdCategories,
        getJdImageCategory: _state => _state.jdImageCategory,
        getBaseConfig: _state => _state.baseConfig,
        getDetailConfig: _state => _state.detailConfig,
        getFilterConfig: _state => _state.filterConfig
    },

    actions = {},

    mutations = {
        setShopCates: (_state, payload) => {
            _state.shopCategories = payload;
        },
        setJdCates: (_state, payload) => {
            _state.jdCategories = payload;
        },
        setJdImageCategory: (_state, payload) => {
            _state.jdImageCategory = payload;
        },
        setBaseConfig: (_state, payload) => {
            _state.baseConfig = payload;
        },
        setDetailConfig: (_state, payload) => {
            _state.detailConfig = payload;
        },
        setFilterConfig: (_state, payload) => {
            _state.filterConfig = payload;
        }
    };

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
