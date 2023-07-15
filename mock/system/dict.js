const list = [
  {
    'code': 'sysStatus',
    'num': 0,
    'name': '状态',
    'pid': '0',
    'id': '16',
    'detail': '1:启用:1;2:禁用:2',
    'tips': ''
  },
  {
    'code': 'sysSex',
    'num': 0,
    'name': '性别',
    'pid': '0',
    'id': '29',
    'detail': '1:男:1;2:女:2',
    'tips': ''
  }
]
module.exports = [
  // mock get all routes form server
  {
    url: '/dict/listPage',
    type: 'get',
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
    url: '/dict/add',
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
    url: '/dict/update',
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
    url: '/dict/delete',
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
