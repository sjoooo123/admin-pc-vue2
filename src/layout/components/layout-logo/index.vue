<template>
  <div :class="$style['layout-logo']">
    <img :src="logo" height="31px" :alt="`${title}Logo`" :title="`${title}Logo`">
    <span>{{ title }}</span>
  </div>
</template>

<script>
import logo from "@/assets/images/logo.png";

export default {
  name: "layout-logo",
  data() {
    return {
      logo,
      title: process.env.VUE_APP_TITLE
    };
  }
};
</script>

<style lang="scss" module>
.layout-logo {
  display: flex;
  flex-grow: 0;
  align-items: center;
  width: 180px;
  font-size: 0;
  cursor: pointer;
  img {
    margin-right: 10px;
    vertical-align: middle;
  }
  span {
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    white-space: nowrap;
    letter-spacing: 1px;
  }
}
</style>
