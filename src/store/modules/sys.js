import api from "@/api";

const filterMenuByActions = (sidemenu, actions) => {
  let okNum = 0;

  for (let i = 0; i < sidemenu.length; i++) {
    const menu = sidemenu[i];

    if (menu.children) {
      menu.ok = filterMenuByActions(menu.children, actions);
    } else {
      if (menu.actions) {
        menu.ok = false;
        for (let j = 0; j < menu.actions.length; j++) {
          const action = menu.actions[j];
          if (actions.indexOf(action) !== -1) {
            menu.ok = true;
            break;
          }
        }
      } else {
        menu.ok = true;
      }
    }

    if (menu.ok) {
      okNum++;
    }
  }
  return okNum > 0;
};

const state = {
  accounts: [],
  roles: [],
  actions: [],
  actionsText: {},
  config: {},
  sidebar: {}
};

const mutations = {
  SET_ACTIONS: (state, actions) => {
    let ktext = {};
    actions.forEach(action => (ktext[action.key] = action.text));

    state.actions = actions;
    state.actionsText = ktext;
  },
  SET_CONFIG: (state, config) => {
    state.config = config;
  },
  SET_SIDEBAR: (state, sidebar) => {
    state.sidebar = sidebar;
  },
  SET_ROLES: (state, roleList) => {
    state.roles = roleList;
  },
  SET_ACCOUNTS: (state, accountList) => {
    state.accounts = accountList;
  }
};

const actions = {
  loadSetup({ commit }) {
    return new Promise(resolve => {
      api.sysSetup().then(resp => {
        let actions = resp.action.actions;
        let projconf = resp.projconf;
        let sidebar = resp.sidebar;
        commit("SET_ACTIONS", actions);
        commit("SET_CONFIG", projconf);
        commit("SET_SIDEBAR", sidebar);
        resolve();
      });
    });
  },
  loadRoles({ commit }) {
    return new Promise(resolve => {
      api.sysRoles().then(resp => {
        let roleList = resp.list;
        commit("SET_ROLES", roleList);
        resolve();
      });
    });
  },
  loadAccounts({ commit }) {
    return new Promise(resolve => {
      api.sysAccounts().then(resp => {
        let accountList = resp.list;
        commit("SET_ACCOUNTS", accountList);
        resolve();
      });
    });
  },

  getRole({ state }, roleNm) {
    return new Promise(resolve => {
      // console.log("get-role:" + roleNm);
      const roleConf = state.roles.find(role => role.nm == roleNm);
      // console.log("get-role:" + JSON.stringify(roleConf));
      resolve(
        roleConf || {
          roleText: "未定义角色",
          actions: []
        }
      );
    });
  },

  getSidemenu({ state }, actions) {
    return new Promise(resolve => {
      let sidemenu = state.sidebar.sidemenu;
      filterMenuByActions(sidemenu, actions);
      resolve(sidemenu);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
