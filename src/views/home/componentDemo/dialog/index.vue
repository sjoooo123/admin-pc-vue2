<template>
  <div>
    <el-button @click="showDialog">show</el-button>
    <MyDialog title='标题' ref="myDialog" @onSubmit='onSubmit'  :clickEscClose='false' :centerLayout='false' @beforeClose="beforeClose">
       <template slot="body"> 
          <span>自定义弹窗内容</span>
       </template>
    </MyDialog>
  </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
      showDialog(){
        this.$refs.myDialog.showDialog();
      },
      onSubmit(){
        console.log(123)
      },
      beforeClose(){
        console.log('beforeClose')
      }
    }
};
</script>
<style scoped>
</style>