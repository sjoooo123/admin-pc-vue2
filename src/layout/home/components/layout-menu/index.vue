<template>
  <el-menu class="header-menu" mode="horizontal" :default-active="$route.fullPath" router>
    <template v-for="menu in menus">
      <!--不含二级导航-->
      <el-menu-item v-if="!menu.children" :key="menu.path" :index="menu.path">
        {{ menu.meta.title }}
      </el-menu-item>
      <!--包含二级导航-->
      <el-submenu v-else :key="menu.path" :index="menu.path" popper-class="header-menu-poup">
        <template slot="title">
          <span>{{ menu.meta.title }}</span>
        </template>
        <el-menu-item v-for="item in menu.children" :key="item.path" :index="item.path">
          <i v-if="item.meta.icon" :class="item.meta.icon" />
          {{ item.meta.title }}
          <img src="@/assets/images/hot.gif" v-if="item.isHot" class="hot" />
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "layout-menu",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("index", ["menus"])
  }
};
</script>

<style lang="scss" module>
:global {
  .header-menu {
    &.el-menu--horizontal {
      display: flex;
      flex: 1;
      flex-grow: 1;
      flex-shrink: 1;
      background: none;
      border-bottom: 0;
      line-height: 60px;
      border-bottom: none !important;
      &.el-menu {
        .el-menu-item {
          border-bottom: none;
          line-height: 60px;
          padding: 0 30px;
          &.is-active {
            color: #fff;
            font-weight: bold;
            background-color: #00acb1;
            border-bottom: none;
          }
          &:not(.is-disabled):focus {
            background-color: #00acb1 !important;
          }
        }
        .el-submenu {
          &.is-active {
            font-weight: bold;
            background-color: #00acb1;
            border-bottom: none;
            .el-submenu__title {
              border-bottom: none;
            }
          }
          .el-submenu__title {
            border-bottom: none;
            line-height: 60px;
            padding: 0 30px;
          }
        }
      }
      .el-submenu__title,
      .el-menu-item {
        color: #f0f2f5 !important;
      }
      .el-menu-item:not(.is-disabled):hover {
        background-color: #00acb1;
      }
      .el-submenu {
        .el-submenu__icon-arrow {
          display: none;
        }
      }
      & > .el-menu-item,
      & > .el-submenu {
        top: 0;
        .el-submenu__title:hover {
          background-color: #00acb1;
        }
      }
      & > .el-menu-item:hover,
      & > .el-submenu:hover,
      & > .el-menu-item-active,
      & > .el-submenu-active,
      & > .el-menu-item-open,
      & > .el-submenu-open,
      & > .el-menu-item-selected,
      & > .el-submenu-selected {
        background-color: #00acb1;
        color: #fff;
        border-bottom: 0;
        .el-submenu-title {
          color: #fff;
        }
      }
    }
  }
  .header-menu-poup {
    left: 0px !important;
    right: 0px;
    top: 61px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    .hot {
      position: relative;
      top: -2px;
    }
    .el-menu {
      margin-left: 188px;
      max-width: 900px;
      box-shadow: none;
      .el-menu-item {
        width: calc(100% / 6);
        float: left !important;
        &.is-active,
        &:hover {
          color: #00acb1 !important;
          [class^="el-icon-"] {
            color: #00acb1;
          }
        }
        [class^="el-icon-"] {
          margin-right: 0;
          font-size: 14px;
        }
      }
      &:not(.ant-menu-horizontal) {
        .ant-menu-item-selected {
          background: none;
        }
      }
    }
  }
}
</style>
