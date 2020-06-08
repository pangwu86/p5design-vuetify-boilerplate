// 网络请求封装
import axios from "axios";
import qs from "qs";
import merge from "deepmerge";

// 处理全局未捕获的catch
const onUnhandledRejection = function() {
  const isNode = typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

  if (isNode) {
    return function(cb) {
      process.on("unhandledRejection", cb);
    };
  }

  return function(cb) {
    self.addEventListener("unhandledrejection", ev => {
      cb(ev.reason, ev.promise);
    });
  };
};
onUnhandledRejection();

// const isDev = process.env.NODE_ENV === "development";
const isDev = false;

// 检查响应状态
function checkStatus(response) {
  const status = response.status || -1000; // -1000 自己定义，连接错误的status
  if ((status >= 200 && status < 300) || status === 304) {
    // 如果http状态码正常，则直接返回数据
    return response.data;
  } else {
    let errorInfo = "";
    switch (status) {
      case -1:
        errorInfo = "远程服务响应失败,请稍后重试";
        break;
      case 400:
        errorInfo = "400：错误请求";
        break;
      case 401:
        errorInfo = "401：访问令牌无效或已过期";
        break;
      case 403:
        errorInfo = "403：拒绝访问";
        break;
      case 404:
        errorInfo = "404：资源不存在";
        break;
      case 405:
        errorInfo = "405：请求方法未允许";
        break;
      case 408:
        errorInfo = "408：请求超时";
        break;
      case 500:
        errorInfo = "500：访问服务失败";
        break;
      case 501:
        errorInfo = "501：未实现";
        break;
      case 502:
        errorInfo = "502：无效网关";
        break;
      case 503:
        errorInfo = "503：服务不可用";
        break;
      default:
        errorInfo = `连接错误`;
    }
    return {
      status,
      msg: errorInfo,
      data: response.data
    };
  }
}

// 实例
const instance = axios.create({
  // baseURL: process.env.BASE_URL,
  timeout: 30000, // 请求超时时间
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  transformRequest: [
    function(data) {
      // 对 data 进行任意转换处理
      return data;
    }
  ],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function(data) {
      // 对 data 进行任意转换处理
      return JSON.parse(data);
    }
  ]
});

// 请求
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做处理...
    config.headers = merge(
      config.method === "get"
        ? {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8"
          }
        : {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
      config.headers
    );

    if (config.method === "post") {
      const contentType = config.headers["Content-Type"];
      // 根据Content-Type转换data格式
      if (contentType) {
        if (contentType.includes("multipart")) {
          // 类型 'multipart/form-data;'
          // config.data = data;
        } else if (contentType.includes("json")) {
          // 类型 'application/json;'
          // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
          config.data = JSON.stringify(config.data);
        } else {
          // 类型 'application/x-www-form-urlencoded;'
          // 服务器收到的raw body(原始数据) name=nowThen&age=18
          config.data = qs.stringify(config.data);
        }
      }
    }

    if (isDev) {
      console.log(
        "### request ###\n" +
          JSON.stringify(
            {
              baseURL: config.baseURL,
              url: config.url,
              method: config.method,
              headers: config.headers,
              data: config.data,
              params: config.params
            },
            null,
            2
          )
      );
    }

    return Promise.resolve(config);
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做处理，以下根据实际数据结构改动！！...
    return Promise.resolve(checkStatus(response));
  },
  function(error) {
    // 对响应错误做处理...
    return Promise.reject(checkStatus(error.response));
  }
);

// 请求方法
const request = async function(opt) {
  const options = merge(
    {
      method: "get",
      ifHandleError: true // 是否统一处理接口失败(提示)
    },
    opt
  );
  try {
    const res = await instance(options);

    if (isDev) {
      console.log("### response ###\n" + JSON.stringify(res, null, 2));
    }

    return res;
  } catch (err) {
    if (isDev) {
      console.log("### error ###\n" + JSON.stringify(err, null, 2));
    }

    // 处理错误
    if (options.ifHandleError) {
      // 自定义参数，是否允许全局提示错误信息
      console.log(err.msg || "请求处理失败！");
    }
    return err;
  }
};

export default request;
