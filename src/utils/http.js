// 常用网络请求封装
import request from "./request";
import merge from "deepmerge";

const http = {
  // GET请求
  get(url, params, options) {
    return request(
      merge(
        {
          method: "GET",
          url,
          params
        },
        options
      )
    );
  },
  // POST请求（JSON）
  post(url, params, options) {
    return request(
      merge(
        {
          method: "POST",
          url,
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          data: params
        },
        options
      )
    );
  },
  // postJson等价post
  postJson(url, params, options) {
    return http.post(url, params, options);
  },
  // POST提交（表单）
  postForm(url, params, options) {
    return request(
      merge(
        {
          method: "POST",
          url,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          data: params
        },
        options
      )
    );
  },
  // 文件上传
  uploadFile(url, params, options) {
    let data = params.data;
    delete params.data;
    return request(
      merge(
        {
          method: "POST",
          url,
          headers: {
            "Content-Type": "multipart/form-data"
          },
          params,
          data
        },
        options
      )
    );
  }
};

export default http;
