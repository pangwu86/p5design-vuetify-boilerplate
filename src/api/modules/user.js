import dftAvatar from "@/assets/default_avatar.jpg";
import { setAccessToken, handleReturn } from "../conf";
// URL配置
const urlConf = {
  // 基本功能
  avatarMy: {
    url: "/thumb",
    method: function(val) {
      if (!val) {
        return dftAvatar;
      }
      if (val.indexOf("id:") == -1) {
        val = "id:" + val;
      }
      return this.baseURL + this.url + "?" + val;
    }
  },
  avatarById: {
    url: "/avatar",
    method: function(val) {
      if (!val) {
        return dftAvatar;
      }
      if (val.indexOf("id:") == -1) {
        val = "id:" + val;
      }
      return this.baseURL + this.url + "?" + val;
    }
  },
  // 基本信息
  authSite: {
    url: "/auth/site"
  },
  authLoginByCode: {
    url: "/auth/login_by_wxcode",
    before: setAccessToken,
    after: handleReturn
  },
  authLoginByPasswd: {
    url: "/auth/login_by_passwd",
    before: setAccessToken,
    after: handleReturn
  },
  authSetme: {
    url: "/auth/setme",
    method: "post",
    before: setAccessToken,
    after: handleReturn
  },
  authCheckme: {
    url: "/auth/checkme",
    method: "post",
    before: setAccessToken,
    after: handleReturn
  },
  authPwd: {
    url: "/auth/chpasswd",
    method: "post",
    before: setAccessToken,
    after: handleReturn
  },
  // 模拟登陆
  mockLogin: {
    url: "/mock_login",
    before: setAccessToken,
    after: handleReturn
  }
};

export default urlConf;
