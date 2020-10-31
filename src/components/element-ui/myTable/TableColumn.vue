<template>
  <el-table-column :key="coloumnHeader.columnName" :width="coloumnHeader.width" :label="coloumnHeader.label" :min-width="coloumnHeader.minWidth" :align="coloumnHeader.align" :fixed="coloumnHeader.fixed">
    <template v-for="column in coloumnHeader.children">
      <!--多级表头-递归-->
      <table-column v-if="column.children && column.children.length" :key="column.columnName" :coloumn-header="column"></table-column>
      <!--普通表头-->
      <el-table-column v-else :prop="column.prop" :key="column.columnName" :width="column.width" :label="column.label" :min-width="column.minWidth" :align="column.align" :fixed="column.fixed">
        <template slot-scope="scope">
          <my-render v-if="column.render" :row="scope.row" :render="column.render"></my-render>
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
import MyRender from "./MyRender";
export default {
  name: 'tableColumn',
  components: {
    MyRender
  },
  props: {
    coloumnHeader: {
      type: Object,
      required: true
    }
  },
  
}
</script>

<style scoped>

</style>