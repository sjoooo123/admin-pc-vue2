<template>
  <el-aside v-if="currentTopMenu.children" class="aside" width="160px">
    <div class="title">
      <i v-if="currentTopMenu.meta.icon" :class="currentTopMenu.meta.icon" />
      {{currentTopMenu.meta.title}}
    </div>
    <el-menu class="slide-menu" ref="menu" :default-active="$route.fullPath" router>
      <template v-for="menu in currentTopMenu.children">
        <!--不含三级导航-->
        <el-menu-item v-if="!menu.children" :key="menu.path" :index="menu.path">
          <i v-if="menu.meta.icon" :class="menu.meta.icon" />
          {{ menu.meta.title }}
          <img src="@/assets/images/hot.gif" v-if="menu.isHot" class="hot" />
        </el-menu-item>
        <!--包含三级导航-->
        <el-submenu v-else :key="menu.path" :index="menu.path">
          <template slot="title">
            <i v-if="menu.meta.icon" :class="menu.meta.icon" />
            {{ menu.meta.title }}
          </template>
          <el-menu-item v-for="item in menu.children" :key="item.path" :index="item.path">
            <i v-if="item.meta.icon" :class="item.meta.icon" />
            {{item.meta.title}}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "layout-aside",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("index", ["menus", "currentTopMenu"])
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/element-variables.scss";
.aside {
  margin: 20px;
  margin-right: 0;
  background-color: #fff;
  .title {
    line-height: 54px;
    padding-left: 20px;
    font-weight: bold;
    font-size: 16px;
    color: #000;
    box-sizing: border-box;
    [class^="el-icon-"] {
      margin-right: 8px;
      font-size: 20px;
    }
  }
  .slide-menu {
    height: calc(100% - 54px);
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
        background-color: rgba(0, 180, 186, 0.149019607843137);
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
}
</style>