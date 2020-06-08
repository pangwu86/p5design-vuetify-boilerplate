// 基于http与urlConf创建的api接口
import http from "@/utils/http";
import { getBaseUrl } from "./conf";

// 创造API
const createAPI = urlConf => {
  const api = {};
  for (let [nm, uc] of Object.entries(urlConf)) {
    api[nm] = function(params, options = {}) {
      try {
        // 匹配接口前缀 开发环境则通过proxy配置转发请求； 生产环境根据实际配置
        options.baseURL = uc.baseURL || getBaseUrl(uc.url);
        uc.baseURL = options.baseURL;

        // 前置处理
        if (uc.before) {
          uc.before.call(this, options);
        }

        // 如果是自定义方法，直接调用
        if (typeof uc.method == "function") {
          // 因为不走axios, url需要拼接
          return uc.method.call(uc, params, options);
        }

        // 处理请求
        const reqReturn = http[uc.method || "get"](uc.url, params, options);

        // 后置处理
        if (uc.after) {
          let curr = this;
          return reqReturn.then(respData => {
            return uc.after.call(curr, respData);
          });
        } else {
          return reqReturn;
        }
      } catch (err) {
        console.log("$api error: " + err);
      }
    };
  }
  return api;
};

// 读取module
const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

// 整合成一个urlConf
const urlConf = {};
for (let m in modules) {
  let moduleConf = modules[m];
  Object.assign(urlConf, moduleConf);
}

// 创造API实例
const api = createAPI(urlConf);

export default api;
