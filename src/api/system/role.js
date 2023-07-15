import qs from 'qs'
/**
 * 角色管理接口
 */
import request from '@/utils/request'
// 角色查询
export function getRoleList(params) {
  return request({
    url: 'sys/role/list',
    method: 'get',
    params
  })
}
// 角色机构树列表
export function getRoleTreeList() {
  return request({
    url: 'sys/role/tree',
    method: 'get'
  })
}
// 根据用户获取角色机构树列表
export function getRoleTreeListByUser(userId) {
  return request({
    url: 'sys/role/treeByUserId',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

// 添加角色机构
export function addRole(data) {
  return request({
    url: 'sys/role/add',
    method: 'post',
    data
  })
}
// 修改角色机构
export function updateRole(data) {
  return request({
    url: 'sys/role/update',
    method: 'post',
    data
  })
}
// 删除角色机构
export function delRole(id) {
  return request({
    url: 'sys/role/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}

// 功能授权
export function funcAuthor(roleId, ids) {
  return request({
    url: 'sys/role/funcAuthor',
    method: 'post',
    data: {
      roleId: roleId,
      ids: ids
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}
// 数据授权
export function dataAuthor(roleId, ids) {
  return request({
    url: 'sys/role/dataAuthor',
    method: 'post',
    data: {
      roleId: roleId,
      ids: ids
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}

// 角色类型列表
export function getDataScopeTypeList() {
  return request({
    url: 'sys/dict/code/dataScopeType',
    method: 'get'
  })
}
