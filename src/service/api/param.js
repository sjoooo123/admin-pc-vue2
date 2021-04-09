import axios from "@/libs/axios";
export const admin_param_lists_post = (...args) => axios.post("/api/admin/param/lists", ...args); // 获取数据字典
export const admin_param_point_post = (...args) => axios.post("/api/admin/param/point", ...args); // 设置工作提示内容

export const guest_param_lists_post = (...args) => axios.post("/api/guest/param/lists", ...args); // 操作人员获取数据字典