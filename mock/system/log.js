const logTypes = [
  {
    'value': '0',
    'name': '业务日志'
  },
  {
    'value': '1',
    'name': '登录日志'
  }
]
const loglist = [
  {
    'id': 'c4cdba483fb1449aaad1e6c49353c6b3',
    'logtype': '业务日志',
    'createtime': '2019-04-04 14:23:31',
    'logname': '修改用户',
    'succeed': '成功',
    'deptid': '24',
    'deptName': '总公司',
    'message': '账号=yxssadmin...',
    'userName': 'bruser',
    'userid': '45'
  }
]
const loginloglist = [
  {
    'createtime': '2020-03-26 16:03:23',
    'logname': '登录日志',
    'succeed': '成功',
    'ip': '192.168.8.184',
    'deptid': '0',
    'message': '',
    'userName': '超级管理员',
    'userid': '1'
  },
  {
    'createtime': '2020-03-26 15:13:50',
    'logname': '登录日志',
    'succeed': '成功',
    'ip': '192.168.8.184',
    'deptid': '0',
    'message': '',
    'userName': '超级管理员',
    'userid': '1'
  },
  {
    'createtime': '2020-03-26 14:47:05',
    'logname': '登录日志',
    'succeed': '成功',
    'ip': '192.168.8.105',
    'deptid': '0',
    'message': '',
    'userName': '超级管理员',
    'userid': '1'
  }]
module.exports = [
  {
    url: '/loginLog/list',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: {
          rows: loginloglist,
          total: 2
        }
      }
    }
  },
  {
    url: '/log/list',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: {
          rows: loglist,
          total: 2
        }
      }
    }
  },
  {
    url: '/log/detail',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: {
          'createtime': '2020-03-26',
          'logtype': '业务日志',
          'classname': 'com.casic.missiles.modular.system.controller.RoleController',
          'method': 'dataAuthor',
          'logname': '数据权限配置',
          'succeed': '成功',
          'id': '1243081729056264193',
          'message': '角色名称=十一室管理员,资源名称=',
          'userName': '超级管理员',
          'regularMessage': '角色名称=十一室管理员,资源名称=',
          'userid': '1'
        }
      }
    }
  },
  {
    url: '/dict/code/logType',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: logTypes
      }
    }
  }
]
