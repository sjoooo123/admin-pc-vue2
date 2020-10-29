import axios from "@/libs/axios";
export const getTableTestData = (...args) =>
  axios.get("/table/testData", ...args);
export const getChartBar1TestData = (...args) =>
  axios.get("/echart/bar1", ...args);
