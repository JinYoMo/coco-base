const tree = [
  {
    'checked': false,
    'code': 'system',
    'id': '105',
    'name': '系统管理',
    'open': false,
    'pcodes': '[0],[sys],',
    'pid': '1189107859077373954',
    'value': ''
  },
  {
    'checked': false,
    'code': 'mgr',
    'id': '106',
    'name': '用户管理',
    'open': false,
    'pcodes': '[0],[sys],[system],',
    'pid': '105',
    'value': ''
  },
  {
    'checked': false,
    'code': 'mgr_add',
    'id': '107',
    'name': '添加用户',
    'open': false,
    'pcodes': '[0],[sys],[system],[mgr],',
    'pid': '106',
    'value': ''
  },
  {
    'checked': false,
    'code': 'mgr_edit',
    'id': '108',
    'name': '修改用户',
    'open': false,
    'pcodes': '[0],[sys],[system],[mgr],',
    'pid': '106',
    'value': ''
  },
  {
    'checked': false,
    'code': 'mgr_delete',
    'id': '109',
    'name': '删除用户',
    'open': false,
    'pcodes': '[0],[sys],[system],[mgr],',
    'pid': '106',
    'value': ''
  },
  {
    'checked': false,
    'code': 'mgr_reset',
    'id': '110',
    'name': '重置密码',
    'open': false,
    'pcodes': '[0],[sys],[system],[mgr],',
    'pid': '106',
    'value': ''
  },
  {
    'checked': false,
    'code': 'mgr_freeze',
    'id': '111',
    'name': '冻结用户',
    'open': false,
    'pcodes': '[0],[sys],[system],[mgr],',
    'pid': '106',
    'value': ''
  },
  {
    'checked': false,
    'code': 'mgr_unfreeze',
    'id': '112',
    'name': '解除冻结用户',
    'open': false,
    'pcodes': '[0],[sys],[system],[mgr],',
    'pid': '106',
    'value': ''
  },
  {
    'checked': false,
    'code': 'mgr_setRole',
    'id': '113',
    'name': '分配角色',
    'open': false,
    'pcodes': '[0],[sys],[system],[mgr],',
    'pid': '106',
    'value': ''
  },
  {
    'checked': false,
    'code': 'role',
    'id': '114',
    'name': '角色管理',
    'open': false,
    'pcodes': '[0],[sys],[system],',
    'pid': '105',
    'value': ''
  },
  {
    'checked': false,
    'code': 'role_add',
    'id': '115',
    'name': '添加角色',
    'open': false,
    'pcodes': '[0],[sys],[system],[role],',
    'pid': '114',
    'value': ''
  },
  {
    'checked': false,
    'code': 'role_edit',
    'id': '116',
    'name': '修改角色',
    'open': false,
    'pcodes': '[0],[sys],[system],[role],',
    'pid': '114',
    'value': ''
  },
  {
    'checked': false,
    'code': 'role_remove',
    'id': '117',
    'name': '删除角色',
    'open': false,
    'pcodes': '[0],[sys],[system],[role],',
    'pid': '114',
    'value': ''
  },
  {
    'checked': false,
    'code': 'role_setAuthority',
    'id': '118',
    'name': '配置权限',
    'open': false,
    'pcodes': '[0],[sys],[system],[role],',
    'pid': '114',
    'value': ''
  },
  {
    'checked': false,
    'code': 'menu',
    'id': '119',
    'name': '资源管理',
    'open': false,
    'pcodes': '[0],[sys],[system],',
    'pid': '105',
    'value': ''
  },
  {
    'checked': false,
    'code': 'menu_add',
    'id': '120',
    'name': '添加菜单',
    'open': false,
    'pcodes': '[0],[sys],[system],[menu],',
    'pid': '119',
    'value': ''
  },
  {
    'checked': false,
    'code': 'menu_edit',
    'id': '121',
    'name': '修改菜单',
    'open': false,
    'pcodes': '[0],[sys],[system],[menu],',
    'pid': '119',
    'value': ''
  },
  {
    'checked': false,
    'code': 'menu_remove',
    'id': '122',
    'name': '删除菜单',
    'open': false,
    'pcodes': '[0],[sys],[system],[menu],',
    'pid': '119',
    'value': ''
  },
  {
    'checked': false,
    'code': 'log',
    'id': '128',
    'name': '日志管理',
    'open': false,
    'pcodes': '[0],[sys],[system],',
    'pid': '105',
    'value': ''
  },
  {
    'checked': false,
    'code': 'dept',
    'id': '131',
    'name': '组织管理',
    'open': false,
    'pcodes': '[0],[sys],[system],',
    'pid': '105',
    'value': ''
  },
  {
    'checked': false,
    'code': 'dict',
    'id': '132',
    'name': '字典管理',
    'open': false,
    'pcodes': '[0],[sys],[system],',
    'pid': '105',
    'value': ''
  },
  {
    'checked': false,
    'code': 'loginLog',
    'id': '133',
    'name': '登录日志',
    'open': false,
    'pcodes': '[0],[sys],[system],',
    'pid': '105',
    'value': ''
  },
  {
    'checked': false,
    'code': 'log_clean',
    'id': '134',
    'name': '清空日志',
    'open': false,
    'pcodes': '[0],[sys],[system],[log],',
    'pid': '128',
    'value': ''
  },
  {
    'checked': false,
    'code': 'dept_add',
    'id': '135',
    'name': '添加部门',
    'open': false,
    'pcodes': '[0],[sys],[system],[dept],',
    'pid': '131',
    'value': ''
  },
  {
    'checked': false,
    'code': 'dept_update',
    'id': '136',
    'name': '修改部门',
    'open': false,
    'pcodes': '[0],[sys],[system],[dept],',
    'pid': '131',
    'value': ''
  },
  {
    'checked': false,
    'code': 'dept_delete',
    'id': '137',
    'name': '删除部门',
    'open': false,
    'pcodes': '[0],[sys],[system],[dept],',
    'pid': '131',
    'value': ''
  },
  {
    'checked': false,
    'code': 'dict_add',
    'id': '138',
    'name': '添加字典',
    'open': false,
    'pcodes': '[0],[sys],[system],[dict],',
    'pid': '132',
    'value': ''
  },
  {
    'checked': false,
    'code': 'dict_update',
    'id': '139',
    'name': '修改字典',
    'open': false,
    'pcodes': '[0],[sys],[system],[dict],',
    'pid': '132',
    'value': ''
  },
  {
    'checked': false,
    'code': 'dict_delete',
    'id': '140',
    'name': '删除字典',
    'open': false,
    'pcodes': '[0],[sys],[system],[dict],',
    'pid': '132',
    'value': ''
  },
  {
    'checked': false,
    'code': 'menu_list',
    'id': '151',
    'name': '菜单列表',
    'open': false,
    'pcodes': '[0],[sys],[system],[menu],',
    'pid': '119',
    'value': ''
  },
  {
    'checked': false,
    'code': 'dept_list',
    'id': '153',
    'name': '部门列表',
    'open': false,
    'pcodes': '[0],[sys],[system],[dept],',
    'pid': '131',
    'value': ''
  },
  {
    'checked': false,
    'code': 'dept_detail',
    'id': '154',
    'name': '部门详情',
    'open': false,
    'pcodes': '[0],[sys],[system],[dept],',
    'pid': '131',
    'value': ''
  },
  {
    'checked': false,
    'code': 'dict_list',
    'id': '156',
    'name': '字典列表',
    'open': false,
    'pcodes': '[0],[sys],[system],[dict],',
    'pid': '132',
    'value': ''
  },
  {
    'checked': false,
    'code': 'dict_detail',
    'id': '157',
    'name': '字典详情',
    'open': false,
    'pcodes': '[0],[sys],[system],[dict],',
    'pid': '132',
    'value': ''
  },
  {
    'checked': false,
    'code': 'log_list',
    'id': '158',
    'name': '日志列表',
    'open': false,
    'pcodes': '[0],[sys],[system],[log],',
    'pid': '128',
    'value': ''
  },
  {
    'checked': false,
    'code': 'log_detail',
    'id': '159',
    'name': '日志详情',
    'open': false,
    'pcodes': '[0],[sys],[system],[log],',
    'pid': '128',
    'value': ''
  },
  {
    'checked': false,
    'code': 'del_login_log',
    'id': '160',
    'name': '清空登录日志',
    'open': false,
    'pcodes': '[0],[sys],[system],[loginLog],',
    'pid': '133',
    'value': ''
  },
  {
    'checked': false,
    'code': 'login_log_list',
    'id': '161',
    'name': '登录日志列表',
    'open': false,
    'pcodes': '[0],[sys],[system],[loginLog],',
    'pid': '133',
    'value': ''
  },
  {
    'checked': false,
    'code': 'role_list',
    'id': '164',
    'name': '角色列表',
    'open': false,
    'pcodes': '[0],[sys],[system],[role],',
    'pid': '114',
    'value': ''
  },
  {
    'checked': false,
    'code': 'mgr_list',
    'id': '167',
    'name': '用户列表',
    'open': false,
    'pcodes': '[0],[sys],[system],[mgr],',
    'pid': '106',
    'value': ''
  },
  {
    'checked': false,
    'code': 'data_author',
    'id': '1138364388198715393',
    'name': '数据权限',
    'open': false,
    'pcodes': '[0],[sys],[system],[role],',
    'pid': '114',
    'value': ''
  },
  {
    'checked': false,
    'code': 'AreaAdmin',
    'id': '1170945119300976642',
    'name': '区域管理',
    'open': false,
    'pcodes': '[0],[sys],[system],',
    'pid': '105',
    'value': ''
  },
  {
    'checked': false,
    'code': 'sys',
    'id': '1189107859077373954',
    'name': '基础权限管理',
    'open': true,
    'pcodes': '[0],',
    'pid': '0',
    'value': ''
  },
  {
    'checked': false,
    'code': 'area_listPage',
    'id': '1191975090689810434',
    'name': '区域列表',
    'open': false,
    'pcodes': '[0],[sys],[system],[AreaAdmin],',
    'pid': '1170945119300976642',
    'value': ''
  },
  {
    'checked': false,
    'code': 'area_add',
    'id': '1191975312815955969',
    'name': '新增区域',
    'open': false,
    'pcodes': '[0],[sys],[system],[AreaAdmin],',
    'pid': '1170945119300976642',
    'value': ''
  },
  {
    'checked': false,
    'code': 'area_update',
    'id': '1191975427559530497',
    'name': '修改区域',
    'open': false,
    'pcodes': '[0],[sys],[system],[AreaAdmin],',
    'pid': '1170945119300976642',
    'value': ''
  },
  {
    'checked': false,
    'code': 'area_delete',
    'id': '1191975543687225346',
    'name': '区域删除',
    'open': false,
    'pcodes': '[0],[sys],[system],[AreaAdmin],',
    'pid': '1170945119300976642',
    'value': ''
  },
  {
    'checked': true,
    'code': '',
    'id': '0',
    'name': '顶级',
    'open': true,
    'pcodes': '',
    'pid': '',
    'value': ''
  }
]
const list = [
  {
    'isopen': '1',
    'code': 'system',
    'pcode': 'sys',
    'num': 4,
    'icon': 'icon-setting',
    'pid': '1189107859077373954',
    'isMenu': '是',
    'url': '/system',
    'tips': '',
    'pcodes': '[0],[sys],',
    'name': '系统管理',
    'statusName': '启用',
    'id': '105',
    'ismenu': '1',
    'levels': 2,
    'open': true,
    'resourceTypeName': '菜单',
    'status': '1',
    'resourceType': '03'
  },
  {
    'isopen': '0',
    'code': 'mgr',
    'pcode': 'system',
    'num': 1,
    'icon': 'icon-user',
    'pid': '105',
    'isMenu': '是',
    'url': '/mgr',
    'tips': '',
    'pcodes': '[0],[sys],[system],',
    'name': '用户管理',
    'statusName': '启用',
    'id': '106',
    'ismenu': '1',
    'levels': 2,
    'open': false,
    'resourceTypeName': '菜单',
    'status': '1',
    'resourceType': '03'
  },
  {
    'isopen': '0',
    'code': 'mgr_add',
    'pcode': 'mgr',
    'num': 1,
    'icon': '',
    'pid': '106',
    'isMenu': '不是',
    'url': '/mgr/add',
    'tips': '',
    'pcodes': '[0],[sys],[system],[mgr],',
    'name': '添加用户',
    'statusName': '启用',
    'id': '107',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'mgr_edit',
    'pcode': 'mgr',
    'num': 2,
    'icon': '',
    'pid': '106',
    'isMenu': '不是',
    'url': '/mgr/update',
    'tips': '',
    'pcodes': '[0],[sys],[system],[mgr],',
    'name': '修改用户',
    'statusName': '启用',
    'id': '108',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'mgr_delete',
    'pcode': 'mgr',
    'num': 3,
    'icon': '',
    'pid': '106',
    'isMenu': '不是',
    'url': '/mgr/delete',
    'tips': '',
    'pcodes': '[0],[sys],[system],[mgr],',
    'name': '删除用户',
    'statusName': '启用',
    'id': '109',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'mgr_reset',
    'pcode': 'mgr',
    'num': 4,
    'icon': '',
    'pid': '106',
    'isMenu': '不是',
    'url': '/mgr/reset',
    'tips': '',
    'pcodes': '[0],[sys],[system],[mgr],',
    'name': '重置密码',
    'statusName': '启用',
    'id': '110',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'mgr_freeze',
    'pcode': 'mgr',
    'num': 5,
    'icon': '',
    'pid': '106',
    'isMenu': '不是',
    'url': '/mgr/freeze',
    'tips': '',
    'pcodes': '[0],[sys],[system],[mgr],',
    'name': '冻结用户',
    'statusName': '启用',
    'id': '111',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'mgr_unfreeze',
    'pcode': 'mgr',
    'num': 6,
    'icon': '',
    'pid': '106',
    'isMenu': '不是',
    'url': '/mgr/unfreeze',
    'tips': '',
    'pcodes': '[0],[sys],[system],[mgr],',
    'name': '解除冻结用户',
    'statusName': '启用',
    'id': '112',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'mgr_setRole',
    'pcode': 'mgr',
    'num': 7,
    'icon': '',
    'pid': '106',
    'isMenu': '不是',
    'url': '/mgr/roleAssign',
    'tips': '',
    'pcodes': '[0],[sys],[system],[mgr],',
    'name': '分配角色',
    'statusName': '启用',
    'id': '113',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'role',
    'pcode': 'system',
    'num': 2,
    'icon': 'permission',
    'pid': '105',
    'isMenu': '是',
    'url': '/role',
    'tips': '',
    'pcodes': '[0],[sys],[system],',
    'name': '角色管理',
    'statusName': '启用',
    'id': '114',
    'ismenu': '1',
    'levels': 2,
    'open': false,
    'resourceTypeName': '菜单',
    'status': '1',
    'resourceType': '03'
  },
  {
    'isopen': '0',
    'code': 'role_add',
    'pcode': 'role',
    'num': 1,
    'icon': '',
    'pid': '114',
    'isMenu': '不是',
    'url': '/role/add',
    'tips': '',
    'pcodes': '[0],[sys],[system],[role],',
    'name': '添加角色',
    'statusName': '启用',
    'id': '115',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'role_edit',
    'pcode': 'role',
    'num': 2,
    'icon': '',
    'pid': '114',
    'isMenu': '不是',
    'url': '/role/update',
    'tips': '',
    'pcodes': '[0],[sys],[system],[role],',
    'name': '修改角色',
    'statusName': '启用',
    'id': '116',
    'ismenu': '0',
    'levels': 2,
    'open': false,
    'resourceTypeName': '',
    'status': '1',
    'resourceType': '0'
  },
  {
    'isopen': '0',
    'code': 'role_remove',
    'pcode': 'role',
    'num': 3,
    'icon': '',
    'pid': '114',
    'isMenu': '不是',
    'url': '/role/delete',
    'tips': '',
    'pcodes': '[0],[sys],[system],[role],',
    'name': '删除角色',
    'statusName': '启用',
    'id': '117',
    'ismenu': '0',
    'levels': 2,
    'open': false,
    'resourceTypeName': '',
    'status': '1',
    'resourceType': '0'
  },
  {
    'isopen': '0',
    'code': 'role_setAuthority',
    'pcode': 'role',
    'num': 4,
    'icon': '',
    'pid': '114',
    'isMenu': '不是',
    'url': '/role/funcAuthor',
    'tips': '',
    'pcodes': '[0],[sys],[system],[role],',
    'name': '配置权限',
    'statusName': '启用',
    'id': '118',
    'ismenu': '0',
    'levels': 2,
    'open': false,
    'resourceTypeName': '',
    'status': '1',
    'resourceType': '0'
  },
  {
    'isopen': '0',
    'code': 'menu',
    'pcode': 'system',
    'num': 4,
    'icon': 'function',
    'pid': '105',
    'isMenu': '是',
    'url': '/resource',
    'tips': '',
    'pcodes': '[0],[sys],[system],',
    'name': '资源管理',
    'statusName': '启用',
    'id': '119',
    'ismenu': '1',
    'levels': 2,
    'open': false,
    'resourceTypeName': '菜单',
    'status': '1',
    'resourceType': '03'
  },
  {
    'isopen': '0',
    'code': 'menu_add',
    'pcode': 'menu',
    'num': 1,
    'icon': '',
    'pid': '119',
    'isMenu': '不是',
    'url': '/resource/add',
    'tips': '',
    'pcodes': '[0],[sys],[system],[menu],',
    'name': '添加菜单',
    'statusName': '启用',
    'id': '120',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'menu_edit',
    'pcode': 'menu',
    'num': 2,
    'icon': '',
    'pid': '119',
    'isMenu': '不是',
    'url': '/resource/update',
    'tips': '',
    'pcodes': '[0],[sys],[system],[menu],',
    'name': '修改菜单',
    'statusName': '启用',
    'id': '121',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'menu_remove',
    'pcode': 'menu',
    'num': 3,
    'icon': '',
    'pid': '119',
    'isMenu': '不是',
    'url': '/resource/delete',
    'tips': '',
    'pcodes': '[0],[sys],[system],[menu],',
    'name': '删除菜单',
    'statusName': '启用',
    'id': '122',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'log',
    'pcode': 'system',
    'num': 6,
    'icon': 'log',
    'pid': '105',
    'isMenu': '是',
    'url': '/log',
    'tips': '',
    'pcodes': '[0],[sys],[system],',
    'name': '日志管理',
    'statusName': '启用',
    'id': '128',
    'ismenu': '1',
    'levels': 2,
    'open': false,
    'resourceTypeName': '菜单',
    'status': '1',
    'resourceType': '03'
  },
  {
    'isopen': '0',
    'code': 'dept',
    'pcode': 'system',
    'num': 3,
    'icon': 'dept2',
    'pid': '105',
    'isMenu': '是',
    'url': '/dept',
    'tips': '',
    'pcodes': '[0],[sys],[system],',
    'name': '组织管理',
    'statusName': '启用',
    'id': '131',
    'ismenu': '1',
    'levels': 2,
    'open': false,
    'resourceTypeName': '菜单',
    'status': '1',
    'resourceType': '03'
  },
  {
    'isopen': '0',
    'code': 'dict',
    'pcode': 'system',
    'num': 4,
    'icon': 'icon-dict',
    'pid': '105',
    'isMenu': '是',
    'url': '/dict',
    'tips': '',
    'pcodes': '[0],[sys],[system],',
    'name': '字典管理',
    'statusName': '启用',
    'id': '132',
    'ismenu': '1',
    'levels': 3,
    'open': false,
    'resourceTypeName': '菜单',
    'status': '1',
    'resourceType': '03'
  },
  {
    'isopen': '0',
    'code': 'loginLog',
    'pcode': 'system',
    'num': 6,
    'icon': 'task',
    'pid': '105',
    'isMenu': '是',
    'url': '/loginLog',
    'tips': '',
    'pcodes': '[0],[sys],[system],',
    'name': '登录日志',
    'statusName': '启用',
    'id': '133',
    'ismenu': '1',
    'levels': 2,
    'open': false,
    'resourceTypeName': '菜单',
    'status': '1',
    'resourceType': '03'
  },
  {
    'isopen': '0',
    'code': 'log_clean',
    'pcode': 'log',
    'num': 3,
    'icon': '',
    'pid': '128',
    'isMenu': '不是',
    'url': '/log/delLog',
    'tips': '',
    'pcodes': '[0],[sys],[system],[log],',
    'name': '清空日志',
    'statusName': '启用',
    'id': '134',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'dept_add',
    'pcode': 'dept',
    'num': 1,
    'icon': '',
    'pid': '131',
    'isMenu': '不是',
    'url': '/dept/add',
    'tips': '',
    'pcodes': '[0],[sys],[system],[dept],',
    'name': '添加部门',
    'statusName': '启用',
    'id': '135',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'dept_update',
    'pcode': 'dept',
    'num': 1,
    'icon': '',
    'pid': '131',
    'isMenu': '不是',
    'url': '/dept/update',
    'tips': '',
    'pcodes': '[0],[sys],[system],[dept],',
    'name': '修改部门',
    'statusName': '启用',
    'id': '136',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'dept_delete',
    'pcode': 'dept',
    'num': 1,
    'icon': '',
    'pid': '131',
    'isMenu': '不是',
    'url': '/dept/delete',
    'tips': '',
    'pcodes': '[0],[sys],[system],[dept],',
    'name': '删除部门',
    'statusName': '启用',
    'id': '137',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'dict_add',
    'pcode': 'dict',
    'num': 1,
    'icon': '',
    'pid': '132',
    'isMenu': '不是',
    'url': '/dict/add',
    'tips': '',
    'pcodes': '[0],[sys],[system],[dict],',
    'name': '添加字典',
    'statusName': '启用',
    'id': '138',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'dict_update',
    'pcode': 'dict',
    'num': 1,
    'icon': '',
    'pid': '132',
    'isMenu': '不是',
    'url': '/dict/update',
    'tips': '',
    'pcodes': '[0],[sys],[system],[dict],',
    'name': '修改字典',
    'statusName': '启用',
    'id': '139',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'dict_delete',
    'pcode': 'dict',
    'num': 1,
    'icon': '',
    'pid': '132',
    'isMenu': '不是',
    'url': '/dict/delete',
    'tips': '',
    'pcodes': '[0],[sys],[system],[dict],',
    'name': '删除字典',
    'statusName': '启用',
    'id': '140',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'menu_list',
    'pcode': 'menu',
    'num': 5,
    'icon': '',
    'pid': '119',
    'isMenu': '不是',
    'url': '/resource/list',
    'tips': '',
    'pcodes': '[0],[sys],[system],[menu],',
    'name': '菜单列表',
    'statusName': '启用',
    'id': '151',
    'ismenu': '0',
    'levels': 2,
    'open': false,
    'resourceTypeName': '',
    'status': '1',
    'resourceType': '0'
  },
  {
    'isopen': '0',
    'code': 'dept_list',
    'pcode': 'dept',
    'num': 5,
    'icon': '',
    'pid': '131',
    'isMenu': '不是',
    'url': '/dept/list',
    'tips': '',
    'pcodes': '[0],[sys],[system],[dept],',
    'name': '部门列表',
    'statusName': '启用',
    'id': '153',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'dept_detail',
    'pcode': 'dept',
    'num': 6,
    'icon': '',
    'pid': '131',
    'isMenu': '不是',
    'url': '/dept/detail',
    'tips': '',
    'pcodes': '[0],[sys],[system],[dept],',
    'name': '部门详情',
    'statusName': '启用',
    'id': '154',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'dict_list',
    'pcode': 'dict',
    'num': 5,
    'icon': '',
    'pid': '132',
    'isMenu': '不是',
    'url': '/dict/list',
    'tips': '',
    'pcodes': '[0],[sys],[system],[dict],',
    'name': '字典列表',
    'statusName': '启用',
    'id': '156',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'dict_detail',
    'pcode': 'dict',
    'num': 6,
    'icon': '',
    'pid': '132',
    'isMenu': '不是',
    'url': '/dict/detail',
    'tips': '',
    'pcodes': '[0],[sys],[system],[dict],',
    'name': '字典详情',
    'statusName': '启用',
    'id': '157',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'log_list',
    'pcode': 'log',
    'num': 2,
    'icon': '',
    'pid': '128',
    'isMenu': '不是',
    'url': '/log/list',
    'tips': '',
    'pcodes': '[0],[sys],[system],[log],',
    'name': '日志列表',
    'statusName': '启用',
    'id': '158',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'log_detail',
    'pcode': 'log',
    'num': 3,
    'icon': '',
    'pid': '128',
    'isMenu': '不是',
    'url': '/log/detail',
    'tips': '',
    'pcodes': '[0],[sys],[system],[log],',
    'name': '日志详情',
    'statusName': '启用',
    'id': '159',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'del_login_log',
    'pcode': 'loginLog',
    'num': 1,
    'icon': '',
    'pid': '133',
    'isMenu': '不是',
    'url': '/loginLog/delLoginLog',
    'tips': '',
    'pcodes': '[0],[sys],[system],[loginLog],',
    'name': '清空登录日志',
    'statusName': '启用',
    'id': '160',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'login_log_list',
    'pcode': 'loginLog',
    'num': 2,
    'icon': '',
    'pid': '133',
    'isMenu': '不是',
    'url': '/loginLog/list',
    'tips': '',
    'pcodes': '[0],[sys],[system],[loginLog],',
    'name': '登录日志列表',
    'statusName': '启用',
    'id': '161',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'role_list',
    'pcode': 'role',
    'num': 7,
    'icon': '',
    'pid': '114',
    'isMenu': '不是',
    'url': '/role/list',
    'tips': '',
    'pcodes': '[0],[sys],[system],[role],',
    'name': '角色列表',
    'statusName': '启用',
    'id': '164',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'mgr_list',
    'pcode': 'mgr',
    'num': 10,
    'icon': '',
    'pid': '106',
    'isMenu': '不是',
    'url': ' /mgr/list',
    'tips': '',
    'pcodes': '[0],[sys],[system],[mgr],',
    'name': '用户列表',
    'statusName': '启用',
    'id': '167',
    'ismenu': '0',
    'levels': 3,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'data_author',
    'pcode': 'role',
    'num': 0,
    'icon': '',
    'pid': '114',
    'isMenu': '不是',
    'url': '/role/dataAuthor',
    'tips': '',
    'pcodes': '[0],[sys],[system],[role],',
    'name': '数据权限',
    'statusName': '启用',
    'id': '1138364388198715393',
    'ismenu': '0',
    'levels': 2,
    'open': false,
    'resourceTypeName': '',
    'status': '1',
    'resourceType': '0'
  },
  {
    'isopen': '0',
    'code': 'AreaAdmin',
    'pcode': 'system',
    'num': 0,
    'icon': 'icon-base',
    'pid': '105',
    'isMenu': '是',
    'url': '/area',
    'tips': '',
    'pcodes': '[0],[sys],[system],',
    'name': '区域管理',
    'statusName': '启用',
    'id': '1170945119300976642',
    'ismenu': '1',
    'levels': 3,
    'open': false,
    'resourceTypeName': '菜单',
    'status': '1',
    'resourceType': '03'
  },
  {
    'isopen': '0',
    'code': 'sys',
    'pcode': '0',
    'num': 0,
    'icon': 'icon-setting',
    'pid': '0',
    'isMenu': '不是',
    'url': '/sys',
    'tips': '',
    'pcodes': '[0],',
    'name': '基础权限管理',
    'statusName': '启用',
    'id': '1189107859077373954',
    'ismenu': '0',
    'levels': 1,
    'open': false,
    'resourceTypeName': '',
    'status': '1',
    'resourceType': '02'
  },
  {
    'isopen': '0',
    'code': 'area_listPage',
    'pcode': 'AreaAdmin',
    'num': 0,
    'icon': '',
    'pid': '1170945119300976642',
    'isMenu': '不是',
    'url': '/area/listPage',
    'tips': '',
    'pcodes': '[0],[sys],[system],[AreaAdmin],',
    'name': '区域列表',
    'statusName': '启用',
    'id': '1191975090689810434',
    'ismenu': '0',
    'levels': 4,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'area_add',
    'pcode': 'AreaAdmin',
    'num': 0,
    'icon': '',
    'pid': '1170945119300976642',
    'isMenu': '不是',
    'url': '/area/add',
    'tips': '',
    'pcodes': '[0],[sys],[system],[AreaAdmin],',
    'name': '新增区域',
    'statusName': '启用',
    'id': '1191975312815955969',
    'ismenu': '0',
    'levels': 4,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'area_update',
    'pcode': 'AreaAdmin',
    'num': 0,
    'icon': '',
    'pid': '1170945119300976642',
    'isMenu': '不是',
    'url': '/area/update',
    'tips': '',
    'pcodes': '[0],[sys],[system],[AreaAdmin],',
    'name': '修改区域',
    'statusName': '启用',
    'id': '1191975427559530497',
    'ismenu': '0',
    'levels': 4,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  },
  {
    'isopen': '0',
    'code': 'area_delete',
    'pcode': 'AreaAdmin',
    'num': 0,
    'icon': '',
    'pid': '1170945119300976642',
    'isMenu': '不是',
    'url': '/area/delete',
    'tips': '',
    'pcodes': '[0],[sys],[system],[AreaAdmin],',
    'name': '区域删除',
    'statusName': '启用',
    'id': '1191975543687225346',
    'ismenu': '0',
    'levels': 4,
    'open': false,
    'resourceTypeName': '按钮',
    'status': '1',
    'resourceType': '04'
  }
]
module.exports = [
  // mock get all routes form server
  {
    url: '/resource/list',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: {
          list: list
        }
      }
    }
  },

  // mock get all roles form server
  {
    url: '/resource/tree',
    type: 'get',
    response: _ => {
      return {
        'code': 200,
        'message': 'success',
        'data': {
          'list': tree
        }
      }
    }
  },
  {
    url: '/dict/code/resourceType',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        message: 'success',
        data: [
          {
            'name': '菜单',
            'id': '55',
            'value': '03'
          },
          {
            'name': '按钮',
            'id': '56',
            'value': '04'
          }
        ]
      }
    }
  },
  {
    url: '/resource/treeListByRoleId',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        message: 'success',
        data: {
          'list': tree
        }
      }
    }
  },
  {
    url: 'resource/add',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        message: 'success',
        data: {}
      }
    }
  },
  {
    url: '/resource/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        message: 'success',
        data: {}
      }
    }
  },
  {
    url: '/resource/delete',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        message: 'success',
        data: {}
      }
    }
  }
]
