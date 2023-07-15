// 用户详情
const userinfo = {
  'account': 'admin',
  'avatar': 'girl.gif',
  'dataScope': [
    '0',
    '1236854643826184194',
    '1236856061500936193',
    '1236856816081391617',
    '1236856889875976194',
    '1236856952987668481',
    '1236857009937928194',
    '1236857134915604482',
    '1236857274443321346',
    '1236857346400800770',
    '1236857428776931330',
    '1236857492744261633',
    '1236857661695021057',
    '1236857767731220481',
    '1236857826057211905',
    '1236857873113108481',
    '1236857966566395906',
    '1236858049731055618',
    '1236858125752815618',
    '1236858179561541633',
    '1236858248830472194',
    '1236858330946555905',
    '1236858380556783617',
    '1236858422894088194',
    '1236858475780067330',
    '1236858517333037058',
    '1236858579396153346',
    '1236858642176495618',
    '1236858704961032194',
    '1236858748544045057',
    '1236858806672904193',
    '1236858863296008193',
    '1236858908317667330'
  ],
  'deptId': '0',
  'deptName': '顶级',
  'devices': [],
  'id': '1',
  'ipAddr': '124.64.16.144',
  'name': '超超级管理员',
  'phone': '18200000000',
  'roleList': [
    '1'
  ],
  'roleNames': [
    '超级管理员'
  ],
  'roleTips': [
    'administrator'
  ],
  'scopeType': '4',
  'targetId': '',
  'targetName': '',
  'tenantId': ''
}
const list = [
  {
    'birthday': '2017-05-05 00:00:00',
    'deptName': '顶级',
    'createtime': '2016-01-29 08:49:53',
    'roleid': '1',
    'sex': '2',
    'deptid': '0',
    'avatar': 'girl.gif',
    'version': 25,
    'phone': '18200000000',
    'sexName': '女',
    'name': '超级管理员',
    'roleName': '超级管理员',
    'statusName': '启用',
    'id': '1',
    'account': 'admin',
    'email': 'sn93@qq.com',
    'status': '1'
  }
]
// 权限列表
const permisson = {
  'menus': [
    {
      'children': '',
      'code': 'sys',
      'icon': 'icon-setting',
      'id': '1189107859077373954',
      'ismenu': '0',
      'levels': 1,
      'name': '基础权限管理',
      'num': 0,
      'parentId': '0',
      'resourceType': '02',
      'url': '/sys'
    },
    {
      'children': '',
      'code': 'data_author',
      'icon': '',
      'id': '1138364388198715393',
      'ismenu': '0',
      'levels': 2,
      'name': '数据权限',
      'num': 0,
      'parentId': '114',
      'resourceType': '0',
      'url': '/role/dataAuthor'
    },
    {
      'children': '',
      'code': 'mgr',
      'icon': 'icon-user',
      'id': '106',
      'ismenu': '1',
      'levels': 2,
      'name': '用户管理',
      'num': 1,
      'parentId': '105',
      'resourceType': '03',
      'url': '/mgr'
    },
    {
      'children': '',
      'code': 'role',
      'icon': 'permission',
      'id': '114',
      'ismenu': '1',
      'levels': 2,
      'name': '角色管理',
      'num': 2,
      'parentId': '105',
      'resourceType': '03',
      'url': '/role'
    },
    {
      'children': '',
      'code': 'role_edit',
      'icon': '',
      'id': '116',
      'ismenu': '0',
      'levels': 2,
      'name': '修改角色',
      'num': 2,
      'parentId': '114',
      'resourceType': '0',
      'url': '/role/update'
    },
    {
      'children': '',
      'code': 'role_remove',
      'icon': '',
      'id': '117',
      'ismenu': '0',
      'levels': 2,
      'name': '删除角色',
      'num': 3,
      'parentId': '114',
      'resourceType': '0',
      'url': '/role/delete'
    },
    {
      'children': '',
      'code': 'dept',
      'icon': 'dept2',
      'id': '131',
      'ismenu': '1',
      'levels': 2,
      'name': '组织管理',
      'num': 3,
      'parentId': '105',
      'resourceType': '03',
      'url': '/dept'
    },
    {
      'children': '',
      'code': 'menu',
      'icon': 'function',
      'id': '119',
      'ismenu': '1',
      'levels': 2,
      'name': '资源管理',
      'num': 4,
      'parentId': '105',
      'resourceType': '03',
      'url': '/resource'
    },
    {
      'children': '',
      'code': 'role_setAuthority',
      'icon': '',
      'id': '118',
      'ismenu': '0',
      'levels': 2,
      'name': '配置权限',
      'num': 4,
      'parentId': '114',
      'resourceType': '0',
      'url': '/role/funcAuthor'
    },
    {
      'children': '',
      'code': 'system',
      'icon': 'icon-setting',
      'id': '105',
      'ismenu': '1',
      'levels': 2,
      'name': '系统管理',
      'num': 4,
      'parentId': '1189107859077373954',
      'resourceType': '03',
      'url': '/system'
    },
    {
      'children': '',
      'code': 'menu_list',
      'icon': '',
      'id': '151',
      'ismenu': '0',
      'levels': 2,
      'name': '菜单列表',
      'num': 5,
      'parentId': '119',
      'resourceType': '0',
      'url': '/resource/list'
    },
    {
      'children': '',
      'code': 'loginLog',
      'icon': 'task',
      'id': '133',
      'ismenu': '1',
      'levels': 2,
      'name': '登录日志',
      'num': 6,
      'parentId': '105',
      'resourceType': '03',
      'url': '/loginLog'
    },
    {
      'children': '',
      'code': 'log',
      'icon': 'log',
      'id': '128',
      'ismenu': '1',
      'levels': 2,
      'name': '日志管理',
      'num': 6,
      'parentId': '105',
      'resourceType': '03',
      'url': '/log'
    },
    {
      'children': '',
      'code': 'AreaAdmin',
      'icon': 'icon-base',
      'id': '1170945119300976642',
      'ismenu': '1',
      'levels': 3,
      'name': '区域管理',
      'num': 0,
      'parentId': '105',
      'resourceType': '03',
      'url': '/area'
    },
    {
      'children': '',
      'code': 'visitor_permission',
      'icon': '',
      'id': '1202403877222735874',
      'ismenu': '1',
      'levels': 3,
      'name': '访客授权列表',
      'num': 0,
      'parentId': '1202403125913837569',
      'resourceType': '03',
      'url': '/acsPermission/listVisitorPerm'
    },
    {
      'children': '',
      'code': 'dept_delete',
      'icon': '',
      'id': '137',
      'ismenu': '0',
      'levels': 3,
      'name': '删除部门',
      'num': 1,
      'parentId': '131',
      'resourceType': '04',
      'url': '/dept/delete'
    },
    {
      'children': '',
      'code': 'role_add',
      'icon': '',
      'id': '115',
      'ismenu': '0',
      'levels': 3,
      'name': '添加角色',
      'num': 1,
      'parentId': '114',
      'resourceType': '04',
      'url': '/role/add'
    },
    {
      'children': '',
      'code': 'dict_add',
      'icon': '',
      'id': '138',
      'ismenu': '0',
      'levels': 3,
      'name': '添加字典',
      'num': 1,
      'parentId': '132',
      'resourceType': '04',
      'url': '/user/add'
    },
    {
      'children': '',
      'code': 'dict_delete',
      'icon': '',
      'id': '140',
      'ismenu': '0',
      'levels': 3,
      'name': '删除字典',
      'num': 1,
      'parentId': '132',
      'resourceType': '04',
      'url': '/user/delete'
    },
    {
      'children': '',
      'code': 'dept_add',
      'icon': '',
      'id': '135',
      'ismenu': '0',
      'levels': 3,
      'name': '添加部门',
      'num': 1,
      'parentId': '131',
      'resourceType': '04',
      'url': '/dept/add'
    },
    {
      'children': '',
      'code': 'del_login_log',
      'icon': '',
      'id': '160',
      'ismenu': '0',
      'levels': 3,
      'name': '清空登录日志',
      'num': 1,
      'parentId': '133',
      'resourceType': '04',
      'url': '/loginLog/delLoginLog'
    },
    {
      'children': '',
      'code': 'dict_update',
      'icon': '',
      'id': '139',
      'ismenu': '0',
      'levels': 3,
      'name': '修改字典',
      'num': 1,
      'parentId': '132',
      'resourceType': '04',
      'url': '/user/update'
    },
    {
      'children': '',
      'code': 'menu_add',
      'icon': '',
      'id': '120',
      'ismenu': '0',
      'levels': 3,
      'name': '添加菜单',
      'num': 1,
      'parentId': '119',
      'resourceType': '04',
      'url': '/resource/add'
    },
    {
      'children': '',
      'code': 'mgr_add',
      'icon': '',
      'id': '107',
      'ismenu': '0',
      'levels': 3,
      'name': '添加用户',
      'num': 1,
      'parentId': '106',
      'resourceType': '04',
      'url': '/mgr/add'
    },
    {
      'children': '',
      'code': 'dept_update',
      'icon': '',
      'id': '136',
      'ismenu': '0',
      'levels': 3,
      'name': '修改部门',
      'num': 1,
      'parentId': '131',
      'resourceType': '04',
      'url': '/dept/update'
    },
    {
      'children': '',
      'code': 'menu_edit',
      'icon': '',
      'id': '121',
      'ismenu': '0',
      'levels': 3,
      'name': '修改菜单',
      'num': 2,
      'parentId': '119',
      'resourceType': '04',
      'url': '/resource/update'
    },
    {
      'children': '',
      'code': 'mgr_edit',
      'icon': '',
      'id': '108',
      'ismenu': '0',
      'levels': 3,
      'name': '修改用户',
      'num': 2,
      'parentId': '106',
      'resourceType': '04',
      'url': '/mgr/update'
    },
    {
      'children': '',
      'code': 'log_list',
      'icon': '',
      'id': '158',
      'ismenu': '0',
      'levels': 3,
      'name': '日志列表',
      'num': 2,
      'parentId': '128',
      'resourceType': '04',
      'url': '/log/list'
    },
    {
      'children': '',
      'code': 'login_log_list',
      'icon': '',
      'id': '161',
      'ismenu': '0',
      'levels': 3,
      'name': '登录日志列表',
      'num': 2,
      'parentId': '133',
      'resourceType': '04',
      'url': '/loginLog/list'
    },
    {
      'children': '',
      'code': 'log_clean',
      'icon': '',
      'id': '134',
      'ismenu': '0',
      'levels': 3,
      'name': '清空日志',
      'num': 3,
      'parentId': '128',
      'resourceType': '04',
      'url': '/log/delLog'
    },
    {
      'children': '',
      'code': 'log_detail',
      'icon': '',
      'id': '159',
      'ismenu': '0',
      'levels': 3,
      'name': '日志详情',
      'num': 3,
      'parentId': '128',
      'resourceType': '04',
      'url': '/log/detail'
    },
    {
      'children': '',
      'code': 'menu_remove',
      'icon': '',
      'id': '122',
      'ismenu': '0',
      'levels': 3,
      'name': '删除菜单',
      'num': 3,
      'parentId': '119',
      'resourceType': '04',
      'url': '/resource/delete'
    },
    {
      'children': '',
      'code': 'mgr_delete',
      'icon': '',
      'id': '109',
      'ismenu': '0',
      'levels': 3,
      'name': '删除用户',
      'num': 3,
      'parentId': '106',
      'resourceType': '04',
      'url': '/mgr/delete'
    },
    {
      'children': '',
      'code': 'mgr_reset',
      'icon': '',
      'id': '110',
      'ismenu': '0',
      'levels': 3,
      'name': '重置密码',
      'num': 4,
      'parentId': '106',
      'resourceType': '04',
      'url': '/mgr/reset'
    },
    {
      'children': '',
      'code': 'dict',
      'icon': 'icon-dict',
      'id': '132',
      'ismenu': '1',
      'levels': 3,
      'name': '字典管理',
      'num': 4,
      'parentId': '105',
      'resourceType': '03',
      'url': '/user'
    },
    {
      'children': '',
      'code': 'dept_list',
      'icon': '',
      'id': '153',
      'ismenu': '0',
      'levels': 3,
      'name': '部门列表',
      'num': 5,
      'parentId': '131',
      'resourceType': '04',
      'url': '/dept/list'
    },
    {
      'children': '',
      'code': 'dict_list',
      'icon': '',
      'id': '156',
      'ismenu': '0',
      'levels': 3,
      'name': '字典列表',
      'num': 5,
      'parentId': '132',
      'resourceType': '04',
      'url': '/user/list'
    },
    {
      'children': '',
      'code': 'mgr_freeze',
      'icon': '',
      'id': '111',
      'ismenu': '0',
      'levels': 3,
      'name': '冻结用户',
      'num': 5,
      'parentId': '106',
      'resourceType': '04',
      'url': '/mgr/freeze'
    },
    {
      'children': '',
      'code': 'dept_detail',
      'icon': '',
      'id': '154',
      'ismenu': '0',
      'levels': 3,
      'name': '部门详情',
      'num': 6,
      'parentId': '131',
      'resourceType': '04',
      'url': '/dept/detail'
    },
    {
      'children': '',
      'code': 'dict_detail',
      'icon': '',
      'id': '157',
      'ismenu': '0',
      'levels': 3,
      'name': '字典详情',
      'num': 6,
      'parentId': '132',
      'resourceType': '04',
      'url': '/user/detail'
    },
    {
      'children': '',
      'code': 'mgr_unfreeze',
      'icon': '',
      'id': '112',
      'ismenu': '0',
      'levels': 3,
      'name': '解除冻结用户',
      'num': 6,
      'parentId': '106',
      'resourceType': '04',
      'url': '/mgr/unfreeze'
    },
    {
      'children': '',
      'code': 'role_list',
      'icon': '',
      'id': '164',
      'ismenu': '0',
      'levels': 3,
      'name': '角色列表',
      'num': 7,
      'parentId': '114',
      'resourceType': '04',
      'url': '/role/list'
    },
    {
      'children': '',
      'code': 'mgr_setRole',
      'icon': '',
      'id': '113',
      'ismenu': '0',
      'levels': 3,
      'name': '分配角色',
      'num': 7,
      'parentId': '106',
      'resourceType': '04',
      'url': '/mgr/roleAssign'
    },
    {
      'children': '',
      'code': 'mgr_list',
      'icon': '',
      'id': '167',
      'ismenu': '0',
      'levels': 3,
      'name': '用户列表',
      'num': 10,
      'parentId': '106',
      'resourceType': '04',
      'url': ' /mgr/list'
    },
    {
      'children': '',
      'code': 'area_add',
      'icon': '',
      'id': '1191975312815955969',
      'ismenu': '0',
      'levels': 4,
      'name': '新增区域',
      'num': 0,
      'parentId': '1170945119300976642',
      'resourceType': '04',
      'url': '/area/add'
    },
    {
      'children': '',
      'code': 'area_delete',
      'icon': '',
      'id': '1191975543687225346',
      'ismenu': '0',
      'levels': 4,
      'name': '区域删除',
      'num': 0,
      'parentId': '1170945119300976642',
      'resourceType': '04',
      'url': '/area/delete'
    },
    {
      'children': '',
      'code': 'area_listPage',
      'icon': '',
      'id': '1191975090689810434',
      'ismenu': '0',
      'levels': 4,
      'name': '区域列表',
      'num': 0,
      'parentId': '1170945119300976642',
      'resourceType': '04',
      'url': '/area/listPage'
    },
    {
      'children': '',
      'code': 'area_update',
      'icon': '',
      'id': '1191975427559530497',
      'ismenu': '0',
      'levels': 4,
      'name': '修改区域',
      'num': 0,
      'parentId': '1170945119300976642',
      'resourceType': '04',
      'url': '/area/update'
    }
  ]
}
module.exports = [
  {
    url: '/user/login',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        success: true,
        data: {
          kaptcha: '',
          token: '02deb42b-5298-431a-b690-d04573c18281'

        }
      }
    }
  },
  {
    url: '/user/info',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        success: true,
        data: userinfo
      }
    }
  },
  {
    url: '/user/permission',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        success: true,
        data: permisson
      }
    }
  },
  {
    url: '/user/logout',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        success: true
      }
    }
  },
  {
    url: '/mgr/list',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: {
          rows: list,
          total: 2
        }
      }
    }
  },
  {
    url: '/mgr/add',
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
    url: '/mgr/update',
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
    url: '/mgr/delete',
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
    url: '/mgr/freeze',
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
    url: '/mgr/unfreeze',
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
    url: '/mgr/reset',
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
    url: '/mgr/roleAssign',
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
    url: '/mgr/changePwd',
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
