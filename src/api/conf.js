import { getSite, getToken } from "@/utils/auth";

// 错误代码
const errCode = {
  "e.auth.login.invalid.wxCode": "wxcode已使用，请点击授权登录",
  "e.auth.loginstr.invalid": "错误的登录名或密码",
  "e.auth.loginstr.invalid": "错误的登录名或密码",
  "e.auth.login.invalid.passwd": "错误的登录名或密码",
  "e.cmd.www_passwd.CheckFailed": "密码错误，请重新输入",
  "e.www.api.auth.nologin": "登录信息过期，请重新登录",
  "e.io.obj.exists": "已经存在相同的内容",
  "e.www.invalid.captcha": "无效的验证码",
  "e.auth.login.WxGhNoSubscribed": "请先关注公众号，再使用英致在线服务"
};

// 基本url
export function getBaseUrl(url) {
  let BASE_URL = process.env.VUE_APP_BASE_API || "/";
  return BASE_URL;
}

// 前置方法
export function setAccessToken(options) {
  options.params = Object.assign(options.params || {}, {
    site: getSite(),
    ticket: getToken()
  });
}

// 后置方法
export function handleReturn(respData) {
  // 错误
  if (respData.ok == false) {
    let msg = respData.msg || respData.errCode;
    msg = errCode[msg] || msg;

    // 登录wxcode已用
    if (respData.errCode.indexOf("e.auth.login.invalid.wxCode") != -1) {
      return Promise.resolve(null);
    }
    // 其他先提示
    window.$dialog.alert(msg);

    // token过期
    if (respData.errCode.indexOf("e.www.api.auth.nologin") != -1) {
      window.$logout();
      return;
    }

    // 错误返回空
    return Promise.resolve(null);
  }
  // 正常
  else {
    // 只返回结果
    return Promise.resolve(respData.data);
  }
}
