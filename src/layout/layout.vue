<template>
  <el-container class="layout">
    <el-header class="header" height="60px">
      <layout-logo />
      <layout-user />
    </el-header>
    <el-container class="contianer">
      <LayoutAside v-if="!isManage"/>
      <el-main class="main">
        <LayoutCrumbs/>
        <div class="viewBox">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapActions } from "vuex";
import LayoutLogo from "./components/layout-logo/index.vue";
import LayoutUser from "./components/layout-user/index.vue";
import LayoutAside from "./components/layout-aside/index.vue";
import LayoutCrumbs from "./components/layout-crumbs/index.vue";
export default {
  name: "router-view-home-layout",
  components: {
    LayoutLogo,
    LayoutUser,
    LayoutAside,
    LayoutCrumbs
  },
  data() {
    return {
      isManage: false, // 是否是管理员,管理员不显示侧边菜单
    }
  },
  mounted(){
    this.isManage = JSON.parse(localStorage.getItem('role')).id == 1;
    // 获取数据字典
    this.getParams({type: 'sex,room,watch,member,point'});
  },
  methods: {
    ...mapActions({
      getParams: "index/getParams",
    }),
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/element-variables.scss";
.layout {
  width: 100%;
  height: 100%;
}
.header {
  display: flex;
  padding: 0 20px !important;
  background: $--color-primary !important;
  color: #d8f4f4;
  height: 60px;
  line-height: 60px;
  justify-content: space-between;
}
.contianer {
  background-color: rgba(244, 244, 244, 1);
  .main {
    position: relative;
    padding: 0;
    .viewBox{
      margin-top: 50px;
      padding: 16px;
      box-sizing: border-box;
      height: calc(100vh - 110px);
      overflow-y: auto;
      background-color: rgba(244, 244, 244, 1);
      font-size: 14px;
    }
  }
}
</style>
