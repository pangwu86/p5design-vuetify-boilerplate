// 权限处理，必备的信息
import { get, set, remove } from "./storage";

const tokenKey = "token_id"; // 通用属性
const siteKey = "site_id"; // walnut特有

export function getToken() {
  return get(tokenKey);
}
export function setToken(token) {
  return set(tokenKey, token);
}
export function removeToken() {
  return remove(tokenKey);
}

export function getSite() {
  return get(siteKey);
}
export function setSite(siteId) {
  return set(siteKey, siteId);
}
export function removeSite() {
  return remove(siteKey);
}
