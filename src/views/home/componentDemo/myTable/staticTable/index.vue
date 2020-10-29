<template>
  <div>
    <!--静态数据表格-->
    <p>静态表格：</p>
    <MyTable ref="staticTable" :outerData="staticTableData" :columnNames="staticTableColumnNames" selections rowKey="date"></MyTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staticTableColumnNames: ["date", "name", "address"],
      staticTableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped></style>
