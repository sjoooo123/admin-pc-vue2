export const getBar1Option = data => {
    // 与nameArray耦合较大，后续提炼
    const nameArray = ["product", "2015", "2016", "2017"];

    let dataArray = [];

    for (let i = 0, leni = data.length; i < leni; i++) {
        dataArray.push([]);
        for (let j = 0, lenj = nameArray.length; j < lenj; j++) {
            dataArray[i].push(data[i][nameArray[j]]);
        }
    }
    return {
        legend: {},
        tooltip: {},
        xAxis: { type: "category" },
        yAxis: {},
        dataset: {
            source: dataArray
        },
        series: new Array(nameArray.length - 1).fill({
            type: "bar"
        })
    };
};
