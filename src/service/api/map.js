import axios from "@/libs/axios";
export const api_map_get = (...args) => axios.get("/api/map", ...args);
