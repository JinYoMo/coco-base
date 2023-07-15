/**
 * 组织机构接口
 */
import request from '@/utils/request'
// 组织查询
export function getDeptList(params) {
  return request({
    url: 'sys/dept/list',
    method: 'get',
    params
  })
}
// 组织机构树列表
export function getDeptTreeList(params) {
  return request({
    url: 'sys/dept/tree',
    method: 'get',
    params
  })
}

// 组织机构树列表
export function getDeptTreeListByPid(pid) {
  return request({
    url: 'sys/dept/listByPid',
    method: 'get',
    params: {
      pid: pid
    }
  })
}
// 根据角色获取组织机构树列表
export function getDeptTreeByRole(roleId) {
  return request({
    url: 'sys/role/treeByRoleId',
    method: 'get',
    params: {
      roleId
    }
  })
}

// 添加组织机构
export function addDept(data) {
  return request({
    url: 'sys/dept/add',
    method: 'post',
    data
  })
}
// 修改组织机构
export function updateDept(data) {
  return request({
    url: 'sys/dept/update',
    method: 'post',
    data
  })
}
// 删除组织机构
export function delDept(id) {
  return request({
    url: 'sys/dept/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}
