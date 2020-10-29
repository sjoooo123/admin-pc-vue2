<template>
  <div>
    <el-row>
      <el-table ref="table" :data="items" border stripe class="w tc" :row-key="getRowKeys" @selection-change="selectionChange" :header-cell-style="{ 'text-align': 'center' }" :size="size" :max-height="maxHeight" v-loading="loading" :element-loading-text="loadingOption.text" :element-loading-spinner="loadingOption.spinner" :element-loading-background="loadingOption.background">
        <!--选择列-->
        <el-table-column v-if="selections" type="selection" width="55" :selectable="selectable" align="center" :reserve-selection="true"></el-table-column>
        <!--序号列-->
        <el-table-column label="序号" width="70" align="center" v-if="isSort">
          <template slot-scope="scope">
            <span>{{ getIndex(scope.$index) }}</span>
          </template>
        </el-table-column>
        <!--自定义列-->
        <el-table-column v-for="(column, index) in columns" :prop="column.prop" :key="index" :width="column.width" :label="column.label" :min-width="column.minWidth" align="center" :fixed="column.fixed">
          <template slot-scope="scope">
            <my-render v-if="column.render" :row="scope.row" :render="column.render"></my-render>
            <span v-else>{{ scope.row[column.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination class="mt20 tr" :current-page="pageNo" :page-size="pageSize" :total="total" @current-change="currentChange" @size-change="sizeChange" background layout="sizes, prev, pager, next, jumper, slot">
        <span style="float:left">共{{ total }}条记录,{{ pageNo }}/{{ totalPage }}页</span>
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import MyRender from "./MyRender";
import columnsAll from "./columns.js";
export default {
  name: "MyTable",
  components: {
    MyRender
  },
  props: {
    // 静态数据
    outerData: { type: Array, default: () => [] },
    // 获取数据方法
    fetchFun: Function,
    outParams: { type: Object, default: () => {} },
    // 表格列名
    columnNames: { type: Array, default: () => [] },
    disableItems: { type: Array, default: () => [] },
    // 是否支持选择
    selections: { type: Boolean, default: false },
    //加载配置选项
    loadingOption: {
      type: Object,
      default: function() {
        return {
          text: "",
          spinner: "",
          background: ""
        };
      }
    },
    rowKey: { type: String, default: "" },
    maxHeight: Number,
    isSort: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "medium"
    }
  },
  data() {
    return {
      loading: false,
      pageNo: 1,
      pageSize: 10,
      items: [],
      selectedItems: [],
      total: 0
    };
  },
  computed: {
    totalPage: function() {
      return Math.ceil(this.total / this.pageSize);
    },
    columns() {
      return this.getColumns(this.columnNames);
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    /* 获取列
     * colsName： 表格使用列
     */
    getColumns(columnNames = []) {
      // 所有表格列
      let colsAll = columnsAll();
      let cols = [];
      for (let i = 0, leni = columnNames.length; i < leni; i++) {
        for (let j = 0, lenj = colsAll.length; j < lenj; j++) {
          if (columnNames[i] === colsAll[j].columnName) {
            cols.push(colsAll[j]);
            break;
          }
        }
      }
      return cols;
    },
    // 行禁止
    selectable(row) {
      let flag = true;
      this.disableItems.map(item => {
        if (item.wareId === row.wareId || item.wareId === 0) {
          flag = false;
        }
        return;
      });
      return flag;
    },
    // 初始化表格数据
    initData() {
      // 静态
      if (this.outerData.length) {
        let start = (this.pageNo - 1) * this.pageSize;
        let end = this.pageNo * this.pageSize;
        this.items = this.outerData.slice(start, end);
        this.total = this.outerData.length;
      } else {
        // 动态
        this.handleFetch();
      }
    },
    // 表格数据请求
    async handleFetch() {
      this.loading = true;
      const params = {
        ...this.outParams,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      const { data, err } = await this.fetchFun(params);
      this.loading = false;
      if (err) {
        err.showAlert();
        return;
      }
      // 异常处理
      if (!data) {
        this.total = 0;
        this.items = [];
        return;
      }
      this.total = data.totalItem;
      this.items = data.data;
    },
    // 选项选择
    selectionChange(val) {
      this.selectedItems = val;
    },
    // 页码跳转
    currentChange(val) {
      if (this.loading) {
        return;
      }
      this.pageNo = val;
      this.initData();
    },
    // 上一页
    handlePreviousPage(noPreviousPage) {
      if (this.loading) {
        return;
      }
      if (this.pageNo === 1) {
        return noPreviousPage();
      }
      this.pageNo--;
      this.initData();
    },
    // 下一页
    handleNextPage(noNextPage) {
      if (this.loading) {
        return;
      }
      if (this.total <= this.pageNo * this.pageSize) {
        noNextPage();
        return;
      }
      this.pageNo++;
      this.initData();
    },
    // 每页数据条数改变
    sizeChange(val) {
      this.pageSize = val;
      this.pageNo = 1;
      this.initData();
    },
    getIndex(idx) {
      let orign = String(idx + 1);
      if (orign.length <= 1) {
        orign = "0" + orign;
      }
      return orign;
    },
    getRowKeys(row) {
      return row[this.rowKey];
    }
  }
};
</script>

<style lang="scss" scoped></style>
