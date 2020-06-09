import { asyncRoutes, constantRoutes } from "@/router";

function hasPermission(actions, route) {
  if (route.meta && route.meta.actions) {
    return actions.some(action => route.meta.actions.includes(action));
  } else {
    return true;
  }
}

export function filterAsyncRoutes(routes, actions) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(actions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, actions);
      }
      res.push(tmp);
    }
  });
  return res;
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  generateRoutes({ commit }, userRole) {
    return new Promise(resolve => {
      // console.log("route-role:" + JSON.stringify(userRole));
      let role = userRole.role;
      let actions = userRole.actions;
      let accessedRoutes;
      // 如果角色是管理员，全部看到
      if (role.indexOf("admin") != -1) {
        accessedRoutes = asyncRoutes || [];
      }
      // 否者根据权限来判断
      else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, actions);
      }
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
