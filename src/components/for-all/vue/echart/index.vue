<template>
  <!-- 每一个图表都有自己唯一的id,所有需要动态传入。 -->
  <div :id="id" :style="style"></div>
</template>
<script>
import svc from "@/service";
export default {
  name: "Echart",
  props: {
    // 静态数据
    outerData: { type: Array, default: () => [] },
    // 获取动态数据方法
    svcFunString: String,
    outParams: { type: Object, default: () => {} },
    // 获取配置方法
    optionFun: Function,
    id: {
      type: String,
      required: true
    },
    width: { type: String, default: "100%" },
    height: { type: String, default: "100%" }
  },
  data() {
    return {
      // echarts实例
      theEcharts: "",
      // 通用设置，用于统一风格
      baseOptions: {
        backgroundColor: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(255,255,255,0)" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(20,140,240,.35)" // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        }
      },
      options: {}
    };
  },
  computed: {
    style: function() {
      return {
        width: this.width,
        height: this.height
      };
    }
  },
  watch: {
    //要监听的对象 option
    //由于echarts采用的数据驱动，所以需要监听数据的变化来重绘图表
    options: {
      handler(newVal, oldVal) {
        this.drawChart(newVal);
      },
      deep: true
    }
  },
  mounted() {
    // 初始化图表
    this.theEcharts = this.$echarts.init(document.getElementById(this.id));
    this.theEcharts.clear(); //适用于大数据量的切换时图表绘制错误,先清空在重绘
    // 装载数据
    this.initData();
  },
  methods: {
    // 装载数据
    initData() {
      // 静态,可用outerData来判断，也可用svcFunString来判断
      if (this.svcFunString === undefined) {
        this.options = this.optionFun(this.outerData);
      } else {
        // 动态
        this.handleFetch();
      }
    },
    drawChart(options) {
      this.theEcharts.setOption(
        Object.assign({}, this.baseOptions, options),
        true
      ); //设置为true可以是图表切换数据时重新渲染
    },
    // 图表数据请求
    async handleFetch() {
      this.theEcharts.showLoading();
      const { data, err } = await svc[this.svcFunString](this.outParams);
      this.theEcharts.hideLoading();
      if (err) {
        err.showAlert();
        return;
      }
      this.options = this.optionFun(data.data);
    }
  }
};
</script>
