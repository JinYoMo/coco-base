import { param2Obj } from './utils'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    btns: ['kaptcha'],
    introduction: 'I am a 超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'mock Admin'
  },
  'editor-token': {
    roles: ['editor'],
    btns: [],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = {
  login: res => {
    const { username } = JSON.parse(res.body)
    const data = tokens[username]

    if (data) {
      return {
        code: 200,
        success: true,
        data
      }
    }
    return {
      code: 60204,
      success: false,
      message: '账号或密码错误.'
    }
  },
  getInfo: res => {
    const { token } = param2Obj(res.url)
    const info = users[token]

    if (info) {
      return {
        code: 200,
        success: true,
        data: info
      }
    }
    return {
      code: 50008,
      success: false,
      message: '登录失败，无法获取用户信息.'
    }
  },
  logout: () => {
    return {
      code: 200,
      success: true
    }
  }
}
