const getters = {
  sidebar: state => state.app.sidebar,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  roleText: state => state.user.roleText,
  actions: state => state.user.actions,
  sidemenu: state => state.user.sidemenu,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  sysActions: state => state.sys.actions,
  sysConf: state => state.sys.config
};
export default getters;
