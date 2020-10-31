<template>
  <transition name="fade-transform" mode="out-in">
    <router-view v-if="isRouterAlive"></router-view>
    <!-- <keep-alive :exclude="exclude" :max="50">
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive> -->
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "router-view-home-child-layout",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isRouterAlive: 'index/isRouterAlive',
      exclude: 'index/exclude',
		}),
  },
};
</script>

<style lang="scss" scoped></style>
