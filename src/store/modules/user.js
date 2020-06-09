import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";
import api from "@/api";

// 处理登陆结果
const handleLoginResult = data => {
  if (data && data.ticket) {
    let token = data.ticket;
    let me = data.me;
    let userInfo = {
      id: me.id || "",
      thumb: me.thumb || "",
      nickname: me.nickname || "",
      sex: me.sex || 0,
      company_id: me.company_id || "",
      company_name: me.company_name || "",
      company_dept: me.company_dept || "",
      company_pos: me.company_pos || "",
      phone: me.phone || "",
      phone_verified: me.phone_verified || false,
      email: me.email || "",
      email_verified: me.email_verified || false,
      role: me.role || ""
    };
    return {
      token,
      userInfo
    };
  }
  return {};
};

const state = {
  userInfo: {},
  userId: "",
  name: "",
  avatar: "",
  role: "",
  roleText: "",
  actions: [],
  sidemenu: []
};

const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
    state.userId = userInfo.id || "";
    state.name = userInfo.nickname || "";
    state.avatar = userInfo.thumb || "";
    state.role = userInfo.role || "";
  },
  SET_SIDEMENU: (state, sidemenu) => {
    state.sidemenu = sidemenu;
  },
  SET_ROLE: (state, roleConf) => {
    state.roleText = roleConf.title;
    state.actions = roleConf.actions;
  }
};

const actions = {
  // 密码登陆
  loginByPasswd({ commit }, loginForm) {
    const { name, passwd } = loginForm;
    return new Promise((resolve, reject) => {
      api
        .authLoginByPasswd({ name: name.trim(), passwd: passwd })
        .then(data => {
          let loginRe = handleLoginResult(data);
          if (loginRe.token) {
            setToken(loginRe.token);
            commit("SET_USERINFO", loginRe.userInfo);
          }
          resolve(loginRe);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // uid登陆
  loginByUserId({ commit }, userId) {
    return new Promise((resolve, reject) => {
      api
        .mockLogin({ uid: userId })
        .then(data => {
          let loginRe = handleLoginResult(data);
          if (loginRe.token) {
            setToken(loginRe.token);
            commit("SET_USERINFO", loginRe.userInfo);
          }
          resolve(loginRe);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit("SET_SIDEMENU", []);
      commit("SET_USERINFO", {});
      removeToken();
      resetRouter();
      resolve();
    });
  },

  setUserRole({ commit }, roleConf) {
    return new Promise(resolve => {
      // console.log("set-role:" + JSON.stringify(roleConf));
      commit("SET_ROLE", roleConf);
      resolve();
    });
  },

  getUserRole({ state }) {
    return new Promise(resolve => {
      let userRole = { role: state.role, roleText: state.roleText, actions: state.actions };
      // console.log("user-role:" + JSON.stringify(userRole));
      resolve(userRole);
    });
  },

  setSidemenu({ commit }, sidemenu) {
    return new Promise(resolve => {
      commit("SET_SIDEMENU", sidemenu);
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
