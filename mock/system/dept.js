const list = [
  {
    'id': '1',
    'simplename': '二分公司',
    'fullname': '二分公司',
    'num': 1,
    'pid': '0',
    'pids': '[0,1,2]',
    'pName': '顶级',
    'version': '',
    'tips': ''
  }
]
module.exports = [
  // mock get all routes form server
  {
    url: '/dept/list',
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
  {
    url: '/dept/tree',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: {
          list: [
            {
              'id': '0',
              'pid': '',
              'name': '顶级',
              'open': 'false',
              'checked': ''
            },
            {
              'id': '26',
              'pid': '24',
              'name': '运行二所',
              'open': 'false',
              'checked': ''
            }
          ]
        }
      }
    }
  },
  {
    url: '/dept/add',
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
    url: '/dept/update',
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
    url: '/dept/delete',
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
