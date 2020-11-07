import { createRouter, createWebHashHistory } from "vue-router";

// 引入Home组件
// @符号代表src
import Home from "@/components/Home";
let routes = [
  // 首页路由
  {
    path: "/",
    component: Home
  },
  // 题目路由
  {
    path: "/item",
    component: () => import("@/components/Item")
  },
  //分数路由
  {
    path: "/score",
    component: () => import("@/components/Score")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
