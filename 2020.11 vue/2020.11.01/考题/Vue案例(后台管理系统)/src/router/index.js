// 引用
import { createRouter, createWebHashHistory } from "vue-router";
import Users from "../components/Users.vue";
// 定义路由
const routes = [
  {
    path: "/",
    redirect: "/users"
  },
  {
    path: "/users",
    component: Users
  },
  {
    path: "/userinfo/:id",
    props: true,
    component: () => import("../components/UserInfo")
  },
  {
    path: "/rights",
    component: () => import("../components/Rights")
  },
  {
    path: "/goods",
    component: () => import("../components/Goods")
  },
  {
    path: "/orders",
    component: () => import("../components/Orders")
  },
  {
    path: "/settings",
    component: () => import("../components/Settings")
  }
];
// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
// 导出
export default router;
