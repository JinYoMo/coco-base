const tree = [
  {
    "id":1,
    "pid":"0",
    "name":"超级管理员"
  }
]
const list = [
  {
    "deptName":"顶级",
    "pName":"",
    "num":1,
    "name":"超级管理员",
    "deptid":"0",
    "pid":"0",
    "id":1,
    "version":1,
    "tips":"administrator"
  },
  {
    "deptName":"高压管网分公司",
    "pName":"超级管理员",
    "num":2,
    "name":"高压管网分公司系统管理员",
    "deptid":"24",
    "pid":1,
    "id":2,
    "version":"",
    "tips":"rqadmin"
  }
]
module.exports = [
  // mock get all routes form server
  {
    url: '/role/list',
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
    url: '/role/tree',
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
    url: '/dict/code/roleType',
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
    url: '/role/treeByUserId',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        message: 'success',
        data: {
          'list': [
            {
              "id":1,
              "pid":"0",
              "name":"超级管理员",
              "open":true,
              "checked":false
            }
          ]
        }
      }
    }
  },
  {
    url: '/role/treeByRoleId',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        message: 'success',
        data: {
          'list': [
            {
              "id":"26",
              "pid":"24",
              "name":"运行二所",
              "open":true,
              "checked":true
            }
          ]
        }
      }
    }
  },
  {
    url: '/role/add',
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
    url: '/role/update',
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
    url: '/role/delete',
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
    url: '/role/funcAuthor',
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
    url: '/role/dataAuthor',
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
    url: '/dict/code/dataScopeType',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        message: 'success',
        data: [
          {
            'name': '全部',
            'id': '55',
            'value': '03'
          },
          {
            'name': '本部门',
            'id': '56',
            'value': '04'
          },
          {
            'name': '自定义',
            'id': '57',
            'value': '04'
          }
        ]
      }
    }
  }
]
