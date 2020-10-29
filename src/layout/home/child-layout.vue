<template>
  <transition name="fade-transform" mode="out-in">
    <router-view v-if="$route.meta.notKeepAlive"></router-view>
    <keep-alive :max="5" v-else>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: "router-view-home-child-layout",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  created() {},
  methods: {
    // 缓存页面，提供刷新
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  }
};
</script>

<style lang="scss" scoped></style>
