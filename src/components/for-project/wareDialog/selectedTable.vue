<template>
  <MyTable ref="tb" :tableData="items" :columns="columns" :totalPage="totalPage" :total="tableData.length" @change-page="changePage" @page-size-change="pageSizeChange" :currentPage="defaultParams.page" :max-height="maxHeight"></MyTable>
</template>

<script>
import TablePageMixin from "@/libs/mixin/tableStaticMixin.js";
import MyTable from "@/components/jptTable";
export default {
  mixins: [TablePageMixin()],
  components: {
    MyTable
  },
  props: ["tableData", "columns", "maxHeight"],
  watch: {
    tableData() {
      this.handleFetch();
    }
  }
};
</script>

<style>
</style>
