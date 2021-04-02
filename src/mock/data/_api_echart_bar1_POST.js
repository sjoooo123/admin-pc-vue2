const Mock = require("mockjs");
Mock.mock("/api/echart/bar1", {
    code: 0,
    info: "成功",
    data: Mock.mock({
        "d|6": [
            {
                product: "@name",
                "2015|30-100.1-2": 2,
                "2016|30-100.1-2": 2,
                "2017|30-100.1-2": 2
            }
        ]
    }).d,
    totalItem: 6
});