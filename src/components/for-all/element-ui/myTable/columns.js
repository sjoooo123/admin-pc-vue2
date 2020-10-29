/*
 * columnName：数组的唯一标识
 * render:表示函数式组件，供渲染
 */
export default function() {
  return [
    { columnName: "date", prop: "date", label: "日期", width: 180 },
    { columnName: "date1", prop: "date1", label: "日期1", width: 180 },
    { columnName: "name", prop: "name", label: "姓名", width: 180 },
    {
      columnName: "address",
      prop: "address",
      label: "地址",
      minWidth: 180,
      render: function(h, context) {
        return <p>{context.row.address}</p>;
      }
    }
  ];
}
