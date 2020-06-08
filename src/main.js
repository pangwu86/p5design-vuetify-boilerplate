import Vue from "vue";
// 事件总线
Vue.prototype.$bus = new Vue();

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission";
import "@/utils/error-log";

import VueClipboard from "vue-clipboard2";
// 复制到剪切板
Vue.use(VueClipboard);

// 移动端，解决200ms问题
// import FastClick from "fastclick";
// FastClick.attach(document.body);

// 全局属性
import storage from "@/utils/storage";
Vue.prototype.$gset = storage.set;
Vue.prototype.$gget = storage.get;
Vue.prototype.$gremove = storage.remove;
Vue.prototype.$gclear = storage.clear;

if (window) {
  window.$gset = storage.set;
  window.$gget = storage.get;
  window.$gremove = storage.remove;
  window.$gclear = storage.clear;
}

// 引入网络请求
import req from "@/utils/request";
Vue.prototype.$req = req;
import http from "@/utils/http";
Vue.prototype.$http = http;

// 引入API接口
import api from "@/api";
Vue.prototype.$api = api;

// 模板方法
import tmplEngine from "@/utils/template";
Vue.prototype.$tmpl = tmplEngine;
window.$tmpl = tmplEngine;

// 引入vuetify库
import vuetify from "@/plugins/vuetify";

// 引入util方法
import { timeout } from "@/utils/common";
Vue.prototype.$timeout = timeout;
window.$timeout = timeout;

// uuid
import uuid4 from "uuid/v4";
Vue.prototype.$uuid = uuid4;
window.$uuid = uuid4;

// 引入常用组件
import Alert from "@/components/common/Alert.vue";
Vue.component("common-alert", Alert);
import Confirm from "@/components/common/Confirm.vue";
Vue.component("common-confirm", Confirm);
import Prompt from "@/components/common/Prompt.vue";
Vue.component("common-prompt", Prompt);
import Navbar from "@/components/common/Navbar.vue";
Vue.component("common-navbar", Navbar);

// 设置vue参数
Vue.config.devtools = process.env.NODE_ENV === "development";
Vue.config.productionTip = process.env.NODE_ENV === "production";

// 开始吧
window.appVue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
