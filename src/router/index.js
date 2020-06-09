import Vue from "vue";
import Router from "vue-router";
import { isArray } from "lodash";
import store from "@/store";

Vue.use(Router);

// 解决重复点击导航路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 布局
import Layout from "@/layout";

// 固定的路由
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  }
];

// 异步路由, 包含对应权限设定
let _asyncRoutes = [];
const addAsyncRouter = routerConf => {
  if (isArray(routerConf)) {
    routerConf.forEach(rc => _asyncRoutes.push(rc));
  } else {
    _asyncRoutes.push(routerConf);
  }
};

import dashboardRouter from "./modules/dashboard";
import baseInfoRouter from "./modules/baseInfo";
import errorRouter from "./modules/error";
import projRouter from "./modules/proj";
const all2notfound = { path: "*", redirect: "/404", hidden: true };

addAsyncRouter(dashboardRouter);
addAsyncRouter(baseInfoRouter);
addAsyncRouter(errorRouter);
addAsyncRouter(projRouter);
addAsyncRouter(all2notfound);

export const asyncRoutes = _asyncRoutes;

const createRouter = () => {
  return new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: constantRoutes,
    scrollBehavior: () => ({ x: 0, y: 0 }) // https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
  });
};
const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
