const urlConf = {
  // 全局配置
  sysConf: {
    url: "/sys/projconf"
  },
  // 权限列表
  sysActions: {
    url: "/sys/action"
  },
  // 系统配置
  sysSetup: {
    url: "/anju/setup"
  },
  // 获取全部角色
  sysRoles: {
    url: "/thing/query?ts=~/roles&limit=1000"
  },
  // 获取全部用户
  sysAccounts: {
    url: "/thing/query?ts=~/accounts&limit=1000"
  }
};

export default urlConf;
