<template>
  <div class="container">
    <div class="box">
      <img src="./logo.gif" width="200" />
      <br />
      <img src="./404.png" width="250" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  display: table;
  width: 100%;
  height: 100%;
  background: rgb(163, 213, 211) url(./bg.jpg) no-repeat;
  background-size: cover;
  .box {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
}
</style>
