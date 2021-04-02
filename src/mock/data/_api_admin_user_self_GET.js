const Mock = require("mockjs");
Mock.mock("/api/admin/user/self", {
    "code": 0,
    "info": "成功",
    "data": {
        "user": {
            "id": 8,
            "user_name": "管理员",
            "name": "sj",
            "sex_txt": null
        },
        "role": {
            "id": 5,
            "role_name": "超级管理员"
        },
        "menus": [
            { "id": 1, "name": "首页" },
            { "id": 2, "name": "组件示例" },
            { "id": 21, "name": "折叠" },
            { "id": 220, "name": "树相关" },
            { "id": 221, "name": "树选择" },
            { "id": 23, "name": "编辑器" },
            { "id": 24, "name": "表格·弹窗·表单" },
            { "id": 25, "name": "静态表格" },
            { "id": 26, "name": "图表" },
            { "id": 27, "name": "百度地图" },
            { "id": 28, "name": "高德地图（新窗口）" },
            { "id": 29, "name": "弹窗" },
            { "id": 3, "name": "d3" },
            { "id": 30, "name": "柱状图" },
            {"id": 31, "name": "力导向图"},
        ]
    },
    "url": ""
});