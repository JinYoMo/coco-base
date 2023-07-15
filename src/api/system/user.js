/**
 * 用户管理接口
 */
import request from '@/utils/request'
import qs from 'qs'

// 用户查询
export function getUserList(params) {
  return request({
    url: 'sys/mgr/list',
    method: 'get',
    params
  })
}

// 添加用户
export function addUser(data) {
  return request({
    url: 'sys/mgr/add',
    method: 'post',
    data
  })
}
// 修改用户
export function updateUser(data) {
  return request({
    url: 'sys/mgr/update',
    method: 'post',
    data
  })
}
// 删除用户
export function delUser(id) {
  return request({
    url: 'sys/mgr/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}

// 冻结用户
export function freezeUser(id) {
  return request({
    url: 'sys/mgr/freeze',
    method: 'post',
    data: {
      id: id
    }
  })
}
// 冻结用户
export function unfreezeUser(id) {
  return request({
    url: 'sys/mgr/unfreeze',
    method: 'post',
    data: {
      id: id
    }
  })
}

// 重置用户密码
export function resetPwd(data) {
  return request({
    url: 'sys/mgr/reset',
    method: 'post',
    data
  })
}

// 修改密码
export function changePwd(data) {
  return request({
    url: 'sys/mgr/changePwd',
    method: 'post',
    data
  })
}

// 分配角色
export function roleAssign(userId, ids) {
  return request({
    url: 'sys/mgr/roleAssign',
    method: 'post',
    data: {
      userId: userId,
      roleIds: ids
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}
