const state = {
        visitedViews: [], // 默认
        cachedViews: [], // 无效
        currentView: {} // 当前tag
    },

    getters = {
        visitedViews: _state => _state.visitedViews,
        cachedViews: _state => _state.visitedViews,
        currentView: _state => _state.currentView
    },

    actions = {
        addView({ dispatch }, view) {
            dispatch('addVisitedView', view)
            dispatch('addCachedView', view)
        },
        addVisitedView({ commit }, view) {
            commit('ADD_VISITED_VIEW', view)
        },
        addCachedView({ commit }, view) {
            commit('ADD_CACHED_VIEW', view)
        },

        delView({ dispatch, _state }, view) {
            return new Promise(resolve => {
                dispatch('delVisitedView', view)
                dispatch('delCachedView', view)
                resolve({
                    visitedViews: [..._state.visitedViews],
                    cachedViews: [..._state.cachedViews]
                })
            })
        },
        delVisitedView({ commit, _state}, view) {
            return new Promise(resolve => {
                commit('DEL_VISITED_VIEW', view)
                resolve([..._state.visitedViews])
            })
        },
        delCachedView({ commit, _state}, view) {
            return new Promise(resolve => {
                commit('DEL_CACHED_VIEW', view)
                resolve([..._state.cachedViews])
            })
        },

        delOthersViews({ dispatch, _state }, view) {
            return new Promise(resolve => {
                dispatch('delOthersVisitedViews', view)
                dispatch('delOthersCachedViews', view)
                resolve({
                    visitedViews: [..._state.visitedViews],
                    cachedViews: [..._state.cachedViews]
                })
            })
        },
        delOthersVisitedViews({ commit, _state}, view) {
            return new Promise(resolve => {
                commit('DEL_OTHERS_VISITED_VIEWS', view)
                resolve([..._state.visitedViews])
            })
        },
        delOthersCachedViews({ commit, _state}, view) {
            return new Promise(resolve => {
                commit('DEL_OTHERS_CACHED_VIEWS', view)
                resolve([..._state.cachedViews])
            })
        },

        delAllViews({ dispatch, _state }, view) {
            return new Promise(resolve => {
                dispatch('delAllVisitedViews', view)
                dispatch('delAllCachedViews', view)
                resolve({
                    visitedViews: [..._state.visitedViews],
                    cachedViews: [..._state.cachedViews]
                })
            })
        },
        delAllVisitedViews({ commit, _state}) {
            return new Promise(resolve => {
                commit('DEL_ALL_VISITED_VIEWS')
                resolve([..._state.visitedViews])
            })
        },
        delAllCachedViews({ commit, _state}) {
            return new Promise(resolve => {
                commit('DEL_ALL_CACHED_VIEWS')
                resolve([..._state.cachedViews])
            })
        },
        updateVisitedView({ commit }, view) {
            commit('UPDATE_VISITED_VIEW', view)
        }
    },

    mutations = {
        ADD_VISITED_VIEW: (_state, view) => {
            if (_state.visitedViews.some(v => v.path === view.path)) {
                return
            }
            _state.visitedViews.push(
                Object.assign({}, view)
            )
        },
        ADD_CACHED_VIEW: (_state, view) => {
            if (_state.cachedViews.includes(view.name)) {
                return
            }
            if (!view.meta.noCache) {
                _state.cachedViews.push(view.name)
            }
        },

        DEL_VISITED_VIEW: (_state, view) => {
            for (const [i, v] of _state.visitedViews.entries()) {
                if (v.path === view.path) {
                    _state.visitedViews.splice(i, 1)
                    break
                }
            }
        },
        DEL_CACHED_VIEW: (_state, view) => {
            const index = _state.cachedViews.indexOf(view.name)

            index > -1 && _state.cachedViews.splice(index, 1)
        },

        DEL_OTHERS_VISITED_VIEWS: (_state, view) => {
            _state.visitedViews = _state.visitedViews.filter(v => {
                return v.meta.affix || v.path === view.path
            })
        },
        DEL_OTHERS_CACHED_VIEWS: (_state, view) => {
            const index = _state.cachedViews.indexOf(view.name)

            if (index > -1) {
                _state.cachedViews = _state.cachedViews.slice(index, index + 1)
            } else {
                // if index = -1, there is no cached tags
                _state.cachedViews = []
            }
        },

        DEL_ALL_VISITED_VIEWS: _state => {
            // keep affix tags
            const affixTags = _state.visitedViews.filter(tag => tag.meta.affix)

            _state.visitedViews = affixTags
        },
        CLEAR_VIEWS: _state => {
            _state.visitedViews = []
            _state.cachedViews = []
        },
        DEL_ALL_CACHED_VIEWS: _state => {
            _state.cachedViews = []
        },
        UPDATE_VISITED_VIEW: (_state, view) => {
            for (let v of _state.visitedViews) {
                if (v.path === view.path) {
                    v = Object.assign(v, view)
                    break
                }
            }
        },
        setCurrentView: (_state, view) => {
            _state.currentView = view
        }
    }

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
