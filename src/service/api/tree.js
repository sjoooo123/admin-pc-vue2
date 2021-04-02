import axios from "@/libs/axios";

export const api_tree_post = (...args) => axios.post("/api/tree", ...args);
