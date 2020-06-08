// 存储全局数据
const globalData = localStorage;

export function set(key, value) {
  if (!key) {
    return;
  }
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  globalData.setItem(key, value);
}

export function get(key) {
  var value = globalData.getItem(key);
  if (!value) {
    return value;
  }
  if (value[0] === "{" || value[0] === "[") {
    value = JSON.parse(value);
  }
  return value;
}

export function clear() {
  globalData.clear();
}

export function remove(k) {
  globalData.removeItem(k);
}

export default {
  set,
  get,
  remove,
  clear
};
