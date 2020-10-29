<template>
  <el-dialog
    title="添加商品"
    :visible.sync="visible"
    width="1200px"
    class="add-dialog ware-dialog"
    custom-class="abow_dialog"
    @open="dialogOpen"
    @close="dialogClose"
    :append-to-body="true"
  >
    <!-- 筛选项 -->
    <div class="search-section">
      <el-cascader
        v-loading="cateLoading"
        :options="shopCategories"
        size="small"
        :props="cascaderProps"
        v-model="filter.category"
        clearable
      ></el-cascader>
      <el-select
        v-model="filter.wareStatus"
        size="small"
        placeholder="商品状态选择"
        clearable
        class="search-select"
      >
        <el-option
          v-for="item in wareStatus"
          :key="item.id"
          :label="item.msg"
          :value="item.code"
        ></el-option>
      </el-select>
      <el-input
        style="width:273px"
        class="search-input"
        placeholder="SPU SKU 商品关键词"
        @keyup.enter.native="handleFetch"
        v-model="filter.search"
        size="small"
      >
        <i
          slot="suffix"
          class="el-input__icon el-icon-search searchIcon"
          @click="handleFetch"
        ></i>
      </el-input>
    </div>
    <!-- 切换 -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="全部商品" name="all">
        <MyTable
          ref="tableAll"
          :tableData="items"
          @change-page="changePage"
          :currentPage="defaultParams.pageNo"
          v-loading="loading"
          :columns="columns"
          :total="total"
          :totalPage="totalPage"
          selections
          @selection-change="handleSelectionChange"
          @page-size-change="pageSizeChange"
          rowKey="wareId"
        ></MyTable>
      </el-tab-pane>
      <el-tab-pane
        :label="`已选商品(${selectedSelections.length})`"
        name="selected"
      >
        <SelectedTable
          ref="sel"
          :tableData="selectedSelections"
          :columns="selectedColumns"
        />
      </el-tab-pane>
    </el-tabs>
    <!-- confirm -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="doAdd()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import MyTable from "@/components/jptTable";
import TablePageMixin from "@/libs/mixin/tableMixin";
import svc from "@/service";
import SelectedTable from "./selectedTable.vue";
import columns from "./columns.js";
export default {
  mixins: [TablePageMixin(svc.wares, true, true)],
  components: {
    MyTable,
    SelectedTable
  },
  // props: ["columns"],
  data() {
    return {
      visible: false,
      value: "",
      total: 1,
      selectedSelections: [],
      disableRows: [], // 禁止选择列表
      wareStatus: {},
      shopCategories: [],
      activeName: "all",
      filter: {},
      cascaderProps: {
        value: "cid",
        label: "name",
        children: "shopCategoryVos"
      },
      cateLoading: false,
      selectionsCopy: [],
      isConfirm: false
    };
  },
  async created() {
    this.getWarestatus();
    this.handleFetch();
    this.cateLoading = true;
    this.getShopcategories();
    this.cateLoading = false;
  },
  methods: {
    dialogOpen() {
      this.isConfirm = false;
      this.selectionsCopy = this.selectedSelections;
      this.handleRefresh();
    },
    switchShow(flag) {
      this.visible = flag;
    },
    handleSelectionChange(val) {
      this.selectedSelections = val;
    },
    async getWarestatus() {
      let { data, err } = await svc.warestatus({});
      if (err) {
        err.showAlert();
        return;
      }
      this.wareStatus = data.data;
    },
    async getShopcategories() {
      let { data, err } = await svc.shopcategories({});
      if (err) {
        err.showAlert();
        return;
      }
      this.shopCategories = data.data;
    },
    refreshSelected(row) {
      let tableAll = this.$refs.tableAll;
      this.selectedSelections.forEach(row => {
        tableAll.toggleRowSelection(row);
      });
      tableAll.disableRows = this.disableRows;
    },
    refreshSelectedCopy() {
      let tableAll = this.$refs.tableAll;
      this.clearSelection();
      this.selectionsCopy.forEach(row => {
        tableAll.toggleRowSelection(row);
      });
    },
    delRow(row) {
      let tableAll = this.$refs.tableAll;
      let target = this.selectedSelections.find(item => {
        return item.wareId == row.wareId;
      });
      if (target) {
        this.$nextTick(() => {
          tableAll.toggleRowSelection(target, false);
          this.delRow(row);
        });
      }
    },
    doAdd() {
      this.isConfirm = true;
      this.$emit("addRow", this.selectedSelections);
      this.visible = false;
    },
    clearSelection() {
      // this.selectedSelections = [];
      this.$refs.tableAll.clearSelection();
    },
    cancel() {
      // this.selectedSelections = this.selectionsCopy;
      // this.refreshSelectedCopy();
      this.visible = false;
    },
    dialogClose() {
      if (!this.isConfirm) {
        this.refreshSelectedCopy();
      }
    }
  },
  computed: {
    formatedFilter: function() {
      let param = {};
      if (this.filter.wareStatus) {
        param.status = this.filter.wareStatus;
      }
      if (this.filter.category) {
        param.level1 = this.filter.category[0];
        param.level2 = this.filter.category[1];
      }
      if (this.filter.search) {
        param.search = this.filter.search;
      }
      return param;
    },
    selectedColumns: function() {
      let columns = this.$lodash.cloneDeep(this.columns);
      let that = this;
      columns.push({
        prop: "handel",
        label: "操作",
        render: function(h, param) {
          return h(
            "el-button",
            {
              on: {
                click: () => {
                  let row = that.selectedSelections.find(item => {
                    return item.wareId == param.row.wareId;
                  });
                  that.$refs.sel.checkEmpty();
                  that.delRow(row, false);
                }
              },
              props: {
                type: "text"
              }
            },
            "移除商品"
          );
        }
      });
      return columns;
    },
    columns: function() {
      return columns();
    }
  }
};
</script>
<style lang="scss" scoped>
.add-dialog {
  /deep/ .el-dialog {
    margin: 2.5vh auto !important;
    /deep/ .el-dialog__body {
      padding: 0 20px !important;
      /deep/ .el-table__body-wrapper {
        height: calc(95vh - 350px);
        overflow-y: auto;
      }
    }
  }
}
.search-section {
  padding: 15px 20px;
  margin-bottom: 10px;
  background-color: #eee;
  overflow: hidden;
  .search-select {
    margin-left: 20px;
  }
  .search-input {
    float: right;
  }
  .searchIcon {
    cursor: pointer;
  }
}
.type-section {
  padding: 15px 0;
}
</style>
