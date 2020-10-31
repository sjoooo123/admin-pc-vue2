import axios from "@/libs/axios";
export const api_echart_bar1_get = (...args) => axios.get("/api/echart/bar1", ...args);
