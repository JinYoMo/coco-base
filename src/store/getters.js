const getters = {
  sidebar: state => state.app.sidebar, // 侧边栏
  device: state => state.app.device, // 设备
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  kaptcha: state => state.app.kaptcha, // 验证码
  publicKey: state => state.app.publicKey, // 公钥
  sid: state => state.app.sid, // 用户标识
  currentSystem: state => state.app.currentSystem, // 当前子系统
  token: state => state.user.token, // token
  id: state => state.user.id, // id
  account: state => state.user.account, // 账号
  name: state => state.user.name, // 姓名
  avatar: state => state.user.avatar, // 头像
  roleList: state => state.user.roleList, // 角色列表
  roleNames: state => state.user.roleNames, // 角色名称列表
  roleTips: state => state.user.roleTips, // 角色名称列表
  deptId: state => state.user.deptId, // 权属单位
  deptName: state => state.user.deptName, // 权属单位名称
  area: state => state.user.area, // 用户所在区域
  menus: state => state.permission.menus, // 菜单
  systems: state => state.permission.systems, // 子系统
  permission_routers: state => state.permission.routers, // 用户有权限的路由
  addRouters: state => state.permission.addRouters, // 添加的路由
  btns: state => state.permission.btns, // 用户所有的按钮权限
  theme: state => state.settings.theme, // 主题
  showSettings: state => state.settings.showSettings, // 是否显示设置
  tagsView: state => state.settings.tagsView, // 是否显示tagsView
  breadcrumb: state => state.settings.breadcrumb, // 面包屑
  fixedHeader: state => state.settings.fixedHeader, // 固定高度
  sidebarLogo: state => state.settings.sidebarLogo, // logo
  bodyHeight: state => state.settings.bodyHeight // 内容高度

}
export default getters
