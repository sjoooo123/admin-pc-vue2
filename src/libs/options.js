/* 配置项定义-可与后端协商，由后端接口提供 */

// 预约类型
export const bookStatus = [
  { value: 0, name: "提前预约"},
  { value: 1, name: "立即使用"},
];
// 谈话室状态
export const roomStatus = [
  {value: 0,label: '空闲'},
  {value: 1,label: '使用中'},
  {value: 2,label: '已预约'},
  {value: 3,label: '维修中'}
];

// 谈话室类型
export const roomType = [
  {value: 1,label: '一般谈话室'},
  {value: 2,label: '温馨谈话室'},
  {value: 3,label: '标准谈话室'}
];
// 配置项类型
export const confType = {
  "anbao": {label: '安保巡检项',value:'anbao'},
  'yunwei':{label: '运维巡检项',value:'yunwei'},
  'watch':{label: '异常项',value:'watch'}
}

