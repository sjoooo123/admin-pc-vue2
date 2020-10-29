import Vue from "vue";
export function formatMoney(number, places, symbol, thousand, decimal) {
  number = number || 0;
  places = !isNaN((places = Math.abs(places))) ? places : 2;
  symbol = symbol !== undefined ? symbol : "￥";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var negative = number < 0 ? "-" : "",
    i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
    (places
      ? decimal +
        Math.abs(number - i)
          .toFixed(places)
          .slice(2)
      : "")
  );
}

//工具函数，获取element日期选择器返回值
export function getEleDatePickerValue(dataValue, index = 0) {
  if (Vue.$lodash.isArray(dataValue)) {
    return dataValue[index] ? dataValue[index] : "";
  }
  return "";
}

// 获取url中的参数
export function getUrlParam(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  const r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return decodeURIComponent(r[2]);
  return null; //返回参数值
}
