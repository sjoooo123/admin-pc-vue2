import {menus} from "@/router/menu";
import vue from "@/main";
const state = {
        params: {}, // 数据字典
        allMenus: [], // 所有菜单，供授权使用
        menus: [], // 菜单=路由
        currentTopMenu: {}, // 当前一级菜单，默认首页
        isCollapse: false, // 侧边栏状态, sidebar:1折叠，sidebar:0展开
        isRouterAlive: true, // 当前路由是否活动可见-用于刷新
        exclude: "" // 设置不缓存组件name，逗号隔开
    },

    getters = {
        params: _state => _state.params,
        menus: _state => _state.menus,
        allMenus: _state => _state.allMenus,
        currentTopMenu: _state => _state.currentTopMenu,
        isCollapse: _state => _state.isCollapse,
        isRouterAlive: _state => _state.isRouterAlive,
        exclude: _state => _state.exclude
    },

    actions = {
        async getParams({ commit }, payload) {
            const res = await vue.$svc.admin_param_lists_post(payload);

            if(!res) {
                return;
            }
            commit('setParams',res.data.data);
        }
    },

    mutations = {
        setParams: (_state, payload) => {
            _state.params = payload;
        },
        setMenus: (_state, payload) => {
            const { data, menuflag} = payload;
            // 没有菜单，则返回首页

            if(data.length === 0) {
                const inter = setInterval(()=>{
                    if(vue){
                        clearInterval(inter);
                        vue.$router.replace('/login');
                    }
                },500);

                return;
            }
            // 过滤与改造
            let filterFun = (menu) => {
                // 如果没有传入菜单，则置空
                if(data.length === 0) {
                    return false;
                }
                let flag = false;

                for(let i=0,l=data.length;i<l;i++) {
                    if(data[i].id === menu.id){
                        menu.meta.title = data[i].name;
                        menu.title = data[i].name; // 特殊处理，供授权使用
                        flag = true;
                        break;
                    }
                }
                return flag;
            }
            const wholeMenus = JSON.parse(JSON.stringify(menus)); // 复制一个
            // 第一层

            let a = wholeMenus.filter(filterFun);
            // 第二层

            a.forEach(menu => {
                if(menu.children){
                    const c = menu.children.filter(filterFun);

                    if(c.length) {
                        menu.children = c;
                    } else {
                        delete menu.children;
                    }
                }
            })

            if(menuflag === 'role') {
                // 当为角色菜单，则设置固定不删除菜单/首页跳转菜单
                let redirect = {};
                // 管理岗，则添加首页,否则按正常逻辑设置

                if(JSON.parse(localStorage.getItem('role')).id === 1) {
                    redirect = wholeMenus[0];
                    a.unshift(redirect);
                } else if(a[0].children) {
                    a[0].children[0].meta.affix = true;
                    redirect = a[0].children[0];
                } else {
                    a[0].meta.affix = true;
                    redirect = a[0];
                }

                const setInter = setInterval(()=>{
                    if(vue){
                        clearInterval(setInter);
                        // 修改visitedViews菜单，更新不删除标识
                        const visited = vue.$store._state.tagsView.visitedViews;

                        if(visited[0] && visited[0].path === redirect.path) {
                            vue.$store.commit('tagsView/DEL_VISITED_VIEW', redirect);
                            vue.$store.commit('tagsView/ADD_VISITED_VIEW', redirect);
                        } else {
                            visited.unshift(redirect);
                        }
                        // 首页跳转
                        if(vue.$route.path === '/'){
                            vue.$router.replace(redirect.path);
                        }
                    }
                },500)

                _state.menus = a;
            } else {
                // 否则，whole，直接设置全量菜单
                _state.allMenus = a
            }
        },
        setCurrentTopMenu: (_state, payload) => {
            const path = "/" + payload.split("/")[1];

            _state.currentTopMenu = _state.menus.find(menu => menu.path === path);
        },
        setSidebar: (_state, val) => {
            localStorage.setItem("sidebar", val);
            _state.isCollapse = val === 1;
        },
        // 缓存页面，提供刷新
        reload: _state => {
            _state.exclude = vue.$route.name;
            _state.isRouterAlive = false;
            vue.$nextTick(() => {
                _state.isRouterAlive = true;
                _state.exclude = "";
            });
        }
    };

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
