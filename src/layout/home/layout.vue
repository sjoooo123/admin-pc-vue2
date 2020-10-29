<template>
  <el-container class="layout">
    <el-header class="header" height="60px">
      <layout-logo />
      <layout-menu />
      <layout-user />
    </el-header>
    <el-container class="contianer">
      <LayoutAside />
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import LayoutLogo from "./components/layout-logo/index.vue";
import LayoutMenu from "./components/layout-menu/index.vue";
import LayoutUser from "./components/layout-user/index.vue";
import LayoutAside from "./components/layout-aside/index.vue";
export default {
  name: "router-view-home-layout",
  components: {
    LayoutLogo,
    LayoutMenu,
    LayoutUser,
    LayoutAside
  }
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
.header {
  display: flex;
  padding: 0 20px !important;
  background: #00b4ba !important;
  color: #d8f4f4;
  height: 60px;
  line-height: 60px;
  justify-content: space-between;
}
.contianer {
  background-color: rgba(244, 244, 244, 1);
  .main {
    background-color: rgba(244, 244, 244, 1);
  }
}
</style>
