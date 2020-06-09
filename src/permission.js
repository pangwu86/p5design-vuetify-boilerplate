import Vue from "vue";
import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import { getPageTitle } from "@/utils/page";

NProgress.configure({ showSpinner: true });

const whiteList = ["/login"];
let hasRouter = false;

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 修改标题
  document.title = getPageTitle(to.meta && to.meta.title);
  // Vue.prototype.$bus.$emit("pageTitle", to.meta && to.meta.title);

  const hasToken = getToken();
  // 已登陆
  if (hasToken) {
    if (to.path === "/login") {
      next();
      NProgress.done();
    } else {
      console.log("has-router: " + hasRouter + ", path:" + to.path);
      if (hasRouter) {
        next();
      } else {
        try {
          // 根据权限添加路由
          const userRole = await store.dispatch("user/getUserRole");
          const accessRoutes = await store.dispatch("permission/generateRoutes", userRole);
          router.addRoutes(accessRoutes);
          hasRouter = true;
          next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch("user/logout");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  }
  // 没有登陆
  else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export async function initRouter() {
  const userRole = await store.dispatch("user/getUserRole");
  const accessRoutes = await store.dispatch("permission/generateRoutes", userRole);
  console.log("init-router: " + accessRoutes.length);
  router.addRoutes(accessRoutes);
  hasRouter = true;
}
