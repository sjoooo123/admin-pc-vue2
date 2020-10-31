import vue from "@/main";
export const getLine1Option = () => ({
  symbolSize: true,
  title: {
    text: "金额 (万元)",
    left: 10,
    top: 40,
    textAlign: "left",
    textStyle: {
      fontWeight: "normal",
      fontSize: 12,
      color: "#DCEAFF"
    }
  },
  grid: {
    x: 75,
    y: 85,
    x2: 25,
    y2: 30
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      lineStyle: {
        color: "#DCEAFF"
      }
    },
    backgroundColor: "RGBA(0, 0, 0, .8)",
    padding: [7, 10],
    textStyle: {
      color: "#DCEAFF",
      fontSize: 12
    },
    formatter: function(params) {
      return params
        .map(item => {
          return `<span>
          <span class="dot" style="background-color: ${item.color}"></span>
          ${item.seriesName} ${item.axisValue}时：${item.data}
          </span>`;
        })
        .join("<br/>");
    }
  },
  legend: {
    right: 20,
    top: 40,
    textStyle: {
      color: "#DCEAFF"
    },
    orient: "horizontal",
    data: ["销售额"],
    itemWidth: 16,
    itemHeight: 10
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    axisTick: {
      show: false
    },
    axisLabel: {
      color: "#fff"
    },
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value",

    splitLine: {
      lineStyle: {
        color: ["#082D4A"]
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: "#082D4A"
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 12,
        color: "#fff"
      }
    }
  },
  series: {
    name: "销售额",
    type: "line",
    smooth: true,
    symbol: "circle",
    symbolSize: 6,

    areaStyle: {
      normal: {
        color: new vue.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0.3,
              color: "#F79426"
            },
            {
              offset: 1,
              color: "#F79426"
            }
          ],
          false
        )
      }
    },
    itemStyle: {
      normal: {
        color: "#FD9727"
      }
    },
    lineStyle: {
      normal: {
        width: 1
      }
    },
    data: [820, 932, 901, 934, 1290, 1330, 1320]
  }
});
