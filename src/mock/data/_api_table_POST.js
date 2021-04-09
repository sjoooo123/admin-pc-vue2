const Mock = require("mockjs"),
    {Random} = Mock;

Mock.mock("/api/table", {
    code: 0,
    info: "成功",
    data: () => {
        let d = [];

        for(var i=0; i<10; i++){
            d.push(
                {
                    "id|+1": 1,
                    "date": Random.date(),
                    "name": Random.cname(),
                    "address": Random.county(true) + Random.cword(5, 7)
                }
            )
        }
        return d;
    },
    total: 43
});