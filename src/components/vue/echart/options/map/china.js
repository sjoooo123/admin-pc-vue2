import "./mapData/china";
// 中国地图
export const getChinaMap1Option = () => {
    return {
        title: {
            text: "地域流量分布图",
            textStyle: {
                fontSize: 16
            },
            top: 40,
            left: "center"
        },
        tooltip: {
            trigger: "item",
            confine: true,
            transitionDuration: 0,
            enterable: true,
            padding: 10,
            backgroundColor: "#fff",
            textStyle: {
                color: "#000"
            },
            extraCssText: "box-shadow: 10px 10px 30px rgba(0, 0, 0, .5);"
        },
        legend: {
            orient: "vertical",
            align: "right",
            top: 5,
            right: 5,
            data: "数据值"
        },
        visualMap: {
            left: "left",
            top: "bottom",
            text: ["高", "低"], // 文本，默认为数值文本
            calculable: true
        },
        series: {
            name: "数据值",
            type: "map",
            map: "china",
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data: []
        }
    };
};
