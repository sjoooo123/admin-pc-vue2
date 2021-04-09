import axios from "@/libs/axios";
//
export const login_post = (...args) => axios.post("/api/login", ...args); // 登录
export const admin_user_resPass_post = (...args) => axios.post("/api/admin/user/resPass", ...args); // 修改密码
export const admin_user_logout_get = (...args) => axios.get("/api/admin/user/logout", ...args); // 退出登录

export const admin_user_self_get = (...args) => axios.get("/api/admin/user/self", ...args);
export const admin_user_lists_post = (...args) => axios.post("/api/admin/user/lists", ...args);
// 账号
export const admin_user_ad_post = (...args) => axios.post("/api/admin/user/ad", ...args); // 新增
export const admin_user_up_post = (...args) => axios.post("/api/admin/user/up", ...args); // 修改
export const admin_user_refPass_get = (...args) => axios.get("/api/admin/user/refPass", ...args); // 重置密码
