<template>
  <div
    class="chart-box"
  >
    <!--标题-->
    <h2>Age distribution of the world, 2010</h2>
    <div class="clearfix">
      <p class="top-label age-label">age group</p>
      <p class="top-label">portion of the population</p>
    </div>
    <!--图形区域-->
    <svg class="chart">
      <!--bar-->
      <g :transform="barTransform" class="bar">
        <rect v-for="(d,i) in barData" :key="i" x="0" :y="i*(barHeight + barGap)" :height="barHeight" :width="d"></rect>
      </g>
      <g :transform="translateText" class="bar-label">
        <text v-for="(d,i) in barLabelData" :key="i" x="-10" :y="i * (barHeight + barGap) + barHeight * (2 / 3)">{{d}}</text>
      </g>
      <g :transform="translateText" class="axis-tick">
        <line v-for="(d,i) in axisData" :key="i" :x1="d * scaleFactor" :x2="d * scaleFactor" y1="0" :y2="-tickHeight"></line>
      </g>
      <g :transform="translateText" class="axis-label">
        <text v-for="(d,i) in axisData" :key="i" :x="d * scaleFactor" :y="-tickHeight - tickGap">{{d}}%</text>
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: "d3-bar",
  components: {},
  data() {
    return {
      width: 400,
      leftMargin: 100,
      topMargin: 30,
      barHeight: 20,
      barGap: 5,
      tickGap: 5,
      tickHeight: 10,
      barData: [],
      barLabelData: [],
      axisData: []
    }
  },
  computed: {
    translateText(){
      return "translate(" + this.leftMargin + "," + this.topMargin + ")";
    },
    scaleFactor() {
      const maxData = Math.max.apply(null,this.barData);
      return maxData ? this.width / maxData : 0;
    },
    barTransform() {
      return this.translateText + " scale(" + this.scaleFactor + ",1)";
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // const data = [
      //   {"80 and up":1.6},
      //   {"75-79": 1.5},
      //   {"70-74": 2.1},
      //   {"65-69": 2.6},
      //   {"60-64": 3.4},
      //   {"55-59": 4.5},
      //   {"50-54": 5.1},
      //   {"45-49": 6.0},
      //   {"40-44": 6.6},
      //   {"35-39": 7.1},
      //   {"30-34": 7.3},
      //   {"25-29": 8.1},
      //   {"20-24": 8.9},
      //   {"15-19": 8.8},
      //   {"10-14": 8.6},
      //   {"5-9": 8.8},
      //   {"0-4": 9.3}
      // ];

      // 数据
      this.barData = [
        1.6,
        1.5,
        2.1,
        2.6,
        3.4,
        4.5,
        5.1,
        6.0,
        6.6,
        7.1,
        7.3,
        8.1,
        8.9,
        8.8,
        8.6,
        8.8,
        9.3
      ];
      this.barLabelData = [
        "80 and up",
        "75-79",
        "70-74",
        "65-69",
        "60-64",
        "55-59",
        "50-54",
        "45-49",
        "40-44",
        "35-39",
        "30-34",
        "25-29",
        "20-24",
        "15-19",
        "10-14",
        "5-9",
        "0-4"
      ];
      this.axisData = [0, 2.5, 5.0, 7.5, 10];
    }
  }
};
</script>

<style lang="scss" scoped>
.chart {
  width: 600px;
  height: 500px;
  font-family: Arial, Helvetica, sans-serif;
}
.top-label {
  font-size: 13px;
  font-style: italic;
  text-transform: uppercase;
  float: left;
}
.age-label {
  text-align: right;
  font-weight: bold;
  width: 90px;
  padding-right: 10px;
}
.clearfix {
  clear: both;
}
.bar {
  fill: darkslateblue;
}
.bar-label {
  text-anchor: end;
}
.axis-tick {
  line {
    stroke: rgb(0,0,0);
    stroke-width: 1;
  }
}
.axis-label {
  text-anchor: middle;
  font-size: 13px;
}
</style>
