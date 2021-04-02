import axios from "@/libs/axios";
export const api_table_post = (...args) => axios.post("/api/table", ...args);
