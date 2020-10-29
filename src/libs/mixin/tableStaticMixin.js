const getDefaultParams = () => ({
  page: 1,
  pageSize: 10
});
export default () => ({
  data: () => ({
    items: [],
    loading: false,
    loader: false,
    defaultParams: getDefaultParams()
  }),
  methods: {
    // 重置page = 1 再请求
    handleRefresh() {
      this.defaultParams.page = 1;
      this.handleFetch();
    },
    handleJump(page) {
      if (page) {
        this.defaultParams.page = 1;
      }
      this.handleFetch();
    },
    // 发送请求
    async handleFetch() {
      this.loader = false;
      // 调用者实现这个方法
      let start = (this.defaultParams.page - 1) * this.defaultParams.pageSize;
      let end = this.defaultParams.page * this.defaultParams.pageSize;
      let res = this.tableData.slice(start, end);
      this.items = res;
    },
    pageSizeChange(val) {
      this.defaultParams.pageSize = val;
      this.handleRefresh();
    },
    changePage(val) {
      this.defaultParams.page = val;
      this.handleFetch();
    },
    handleSortChange({ prop, order }) {
      if (!prop) {
        this.defaultParams.sort = "";
        this.defaultParams.sortType = "";
      } else {
        this.defaultParams.sort = prop;
        this.defaultParams.sortType = order === "ascending" ? 0 : 1;
      }
      this.handleRefresh();
    },
    handlePreviousPage(noPreviousPage) {
      if (this.loading) {
        return;
      }
      if (this.defaultParams.page === 1) {
        return noPreviousPage();
      }
      this.defaultParams.page--;
      this.handleFetch();
    },
    handleNextPage(noNextPage) {
      if (this.loading) {
        return;
      }
      if (this.total <= this.defaultParams.page * this.defaultParams.pageSize) {
        noNextPage();
        return;
      }
      this.defaultParams.page++;
      this.handleFetch();
    },
    reConfColums(conf) {
      this.columns = this.implementationGetColumns(conf);
    },
    // 子组件实现获取列配置
    implementationGetColumns(conf) {
      return [];
    },
    // 子组件实现获取数据之后
    implementationFetched() {
      //
    },
    checkEmpty() {
      if (this.items.length === 1 && this.tableData.length >= 1) {
        this.defaultParams.page--;
        this.handleFetch();
      }
    }
  },
  computed: {
    total: function() {
      return this.tableData.length;
    },
    totalPage: function() {
      return Math.ceil(this.total / this.defaultParams.pageSize);
    }
  }
});
