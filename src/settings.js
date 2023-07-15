module.exports = {
  /**
   * @type {boolean} true | false
   * @description 是否显示设置按钮
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description 是否显示tagsView
   */
  tagsView: false,

  /**
   * @type {boolean} true | false
   * @description 是否显示面包屑
   */
  breadcrumb: false,

  /**
   * @type {boolean} true | false
   * @description 是否固定面包屑和tagsViews头
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description 是否要显示侧边栏logo
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',
  /**
   * @type {Boolean}
   * @description 是否允许token登录
   */
  loginByToken: false,
  /**
   * @type {Boolean},
   * @description 是否是某个子系统
   */
  isSubSystem: false,
  /**
   * @type {String},
   * @description 子系统编码，获取菜单权限用
   */
  sysCode: 'abc'
}
