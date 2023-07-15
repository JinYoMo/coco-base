/**
 * 资源管理接口
 */
import request from '@/utils/request'
// 资源查询
export function getResourceList(params) {
  return request({
    url: 'sys/resource/list',
    method: 'get',
    params
  })
}
// 资源查询
export function getResourceListByRole(roleId) {
  return request({
    url: 'sys/resource/treeListByRoleId',
    method: 'get',
    params: {
      roleId: roleId
    }
  })
}
// 资源树列表
export function getResourceTreeList() {
  return request({
    url: 'sys/resource/tree',
    method: 'get'
  })
}

// 资源类型列表
export function getResourceTypeList() {
  return request({
    url: 'sys/dict/code/resourceType',
    method: 'get'
  })
}

// 添加资源
export function addResource(data) {
  return request({
    url: 'sys/resource/add',
    method: 'post',
    data
  })
}
// 修改资源
export function updateResource(data) {
  return request({
    url: 'sys/resource/update',
    method: 'post',
    data
  })
}
// 删除资源
export function delResource(id) {
  return request({
    url: 'sys/resource/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}
