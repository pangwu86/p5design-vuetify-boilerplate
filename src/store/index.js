import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const vuexPersisted = new createPersistedState({
  key: "VuexPersisted",
  storage: window.localStorage
});

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [vuexPersisted]
});

export default store;
