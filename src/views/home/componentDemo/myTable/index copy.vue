<template>
  <div>
    <!--动态数据表格-->
    <p>动态表格：</p>
    <MyTable ref="table" :fetchFun="tableFetchFun" :columnNames="tableColumnNames" selections rowKey="date1"></MyTable>
  </div>

</template>

<script>
export default {
  data() {
    return {
      tableColumnNames: ["date1", "name", "address"]
    };
  },
  computed: {
    // 获取表格数据方法
    tableFetchFun: function() {
      return this.$svc.api_table_testData_post;
    }
  }
};
</script>
<style lang="scss" scoped></style>
