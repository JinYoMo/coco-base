import request from '@/utils/request'
// 登录
export function login(loginForm) {
  return request({
    url: 'sys/user/login',
    method: 'post',
    headers: {
      sid: loginForm.sid
    },
    data: loginForm
  })
}
// 获取用户信息
export function getInfo() {
  return request({
    url: 'sys/user/info',
    method: 'get'
  })
}
// 获取用户权限（菜单、按钮）
export function getMenus(params) {
  return request({
    url: 'sys/user/permission',
    method: 'get',
    params
  })
}
// 登出
export function logout() {
  return request({
    url: 'sys/user/logout',
    method: 'get'
  })
}
// 获取系统基础配置：公钥，验证码是否开启
export function getConfig() {
  return request({
    url: 'sys/config/baseConfig',
    method: 'get'
  })
}
// 获取验证码图片
export function getKaptcha(sid) {
  return request({
    url: 'sys/kaptcha/base64',
    method: 'get',
    params: {
      sid
    }
  })
}

// 获取业务权限
export function getBizPerm(token) {
  return request({
    url: '/config/getAuthorByDept',
    method: 'get',
    params: { token }
  })
}
