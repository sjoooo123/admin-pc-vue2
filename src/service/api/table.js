import axios from "@/libs/axios";
export const api_table_testData_post = (...args) => axios.post("/api/table/testData", ...args);
