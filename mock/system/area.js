const list = [
  {
    'id': '11010100102',
    'lat': '',
    'level': 5,
    'levelName': '社区',
    'lng': '',
    'name': '测试社区3',
    'num': 1,
    'pid': '110101001',
    'pids': '[0],[110000],[110100],[110101],[110101001],',
    'simplename': '测试社区2'
  }
]
module.exports = [
  // mock get all routes form server
  {
    url: '/area/listPage',
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
    url: '/area/list',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: [
          {
            'id': '110000',
            'pid': '0',
            'name': '北京市',
            'level': 1,
            'pids': [0],
            'levelName': '省级',
            'simplename': '北京'
          }
        ]
      }
    }
  },
  {
    url: '/area/add',
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
    url: '/area/update',
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
    url: '/area/delete',
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
    url: '/dict/code/levelType',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        message: 'success',
        data: [
          {
            'name': '省级',
            'id': '166',
            'value': '1'
          },
          {
            'name': '市级',
            'id': '167',
            'value': '2'
          },
          {
            'name': '区级',
            'id': '168',
            'value': '3'
          },
          {
            'name': '街道',
            'id': '169',
            'value': '4'
          },
          {
            'name': '社区',
            'id': '170',
            'value': '5'
          },
          {
            'name': '网格',
            'id': '171',
            'value': '6'
          },
          {
            'name': '责任网格',
            'id': '172',
            'value': '7'
          }
        ]
      }
    }
  }
]
