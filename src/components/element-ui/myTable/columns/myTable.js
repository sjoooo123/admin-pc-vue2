/*
 * columnName：数组的唯一标识
 * render:表示函数式组件，供渲染
 */
export default function () {
    return [
    // 表格测试
        { columnName: "myTable_date", prop: "date", label: "日期", align: "center", width: 180 },
        { columnName: "myTable_address", prop: "address", label: "地址", minWidth: 180 },
        { columnName: "myTable_name", prop: "name", label: "姓名", align: "center", width: 120 }
    ];
}
