<template>
  <div>
    <div><button @click="cb">切换</button></div>
    <el-collapse-transition>
      <div v-if="show" class="testshow">
        <div>sssssss</div>
        <div>sssssss</div>
        <div>sssssss</div>
        <div>sssssss</div>
        <div>sssssss</div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: true
  }),
  methods: {
    cb() {
      this.show = !this.show;
    }
  }
};
</script>

<style lang="scss">
.testshow {
  padding: 10px 10px;
  background-color: aqua;
}
</style>
