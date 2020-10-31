<template>
  <el-aside class="aside" :class="{'close': isCollapse}">
    <div class="title" v-if="!isCollapse"><i class="el-icon-s-fold" @click="setSidebar(1)"/>收起菜单</div>
    <div class="title" v-else>
      <el-tooltip class="item" content="展开菜单" placement="right">
        <i class="el-icon-s-unfold" @click="setSidebar(0)"/>
      </el-tooltip>
    </div>
    <el-menu class="slide-menu" ref="menu" :default-active="$route.fullPath" router mode="vertical" :collapse="isCollapse">
      <template v-for="menu in menus0">
        <!--不含二级导航-->
        <el-menu-item v-if="!menu.children" :key="menu.path" :index="menu.path">
          <i v-if="menu.meta.icon" :class="menu.meta.icon" />
          <span slot="title" class="ml5">{{menu.meta.title}}</span>
          <!-- <img src="@/assets/images/hot.gif" v-if="menu.meta.isHot" class="hot" /> -->
        </el-menu-item>
        <!--包含二级导航-->
        <el-submenu v-else :key="menu.path" :index="menu.path">
          <template slot="title">
            <i v-if="menu.meta.icon" :class="menu.meta.icon" />
            <span slot="title" class="ml5">{{ menu.meta.title }}</span>
          </template>
          <el-menu-item v-for="item in menu.children" :key="item.path" :index="item.path">
            <i v-if="item.meta.icon" :class="item.meta.icon" />
            <span slot="title" class="ml5">{{item.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "layout-aside",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
			menus0: 'index/menus',
			isCollapse: 'index/isCollapse',
		}),
  },
  mounted(){
    // 设置菜单
    this.setMenu();

    let s = localStorage.getItem("sidebar");
    if(typeof s === "undefined"){
      s = 1;
    }
    this.setSidebar(s);
  },
  methods: {
    ...mapMutations({
      setMenus: "index/setMenus",
      setSidebar: "index/setSidebar"
    }),
    setMenu() {
      // 根据权限（菜单名数组）设置菜单
      const showMenus = JSON.parse(localStorage.getItem('menus')) || [];
      this.setMenus({data: showMenus, menuflag: 'role'});
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/element-variables.scss";
.aside {
  width: 200px !important;
  margin-right: 0;
  background-color: #f4f4f4;
  .title {
    line-height: 50px;
    padding-left: 20px;
    font-size: 16px;
    color: #000;
    box-sizing: border-box;
    transition: all .3s;
    [class*="el-icon-"] {
      margin-right: 8px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .slide-menu {
    height: calc(100vh - 110px);
    overflow-y: auto;
    border-right: none;
    .el-menu-item {
      min-width: auto;
      height: 46px;
      line-height: 46px;
      overflow: hidden;
      text-overflow: ellipsis;
      &.is-active,
      &:hover {
        background-color: $--color-primary-light-9;
        border-right: 4px solid $--color-primary;
        color: $--color-primary;
        [class^="el-icon-"] {
          color: $--color-primary;
        }
      }
      [class^="el-icon-"] {
        margin-right: 0;
        font-size: 14px;
      }
    }
    .el-submenu {
      &.is-active{
        /deep/ .el-submenu__title,
        /deep/ .el-submenu__title i{
          color: $--color-primary;
        }
      }
      [class^="el-icon-"] {
        margin-right: 0;
        font-size: 14px;
      }
      .el-menu-item {
        [class^="el-icon-"] {
          margin-right: 0;
          font-size: 12px;
        }
      }
    }
    .hot {
      position: relative;
      top: -2px;
    }
  }
  &.close{
    width: 64px !important;
  }
}
</style>