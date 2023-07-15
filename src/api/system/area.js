/**
 * 区域管理接口
 */
import request from '@/utils/request'
// 区域查询
export function getAreaListPage(params) {
  return request({
    url: 'sys/area/listPage',
    method: 'get',
    params
  })
}

// 根据部门找其默认区域
export function getAreaByDept(deptid) {
  return request({
    url: 'sys/config/getAreaByDept',
    method: 'get',
    params: {
      deptId: deptid
    }
  })
}
// 区域查询
export function getAreaList(pid) {
  return request({
    url: 'sys/area/list',
    method: 'get',
    params: {
      pid: pid
    }
  })
}

// 区域查询,非分页，加载树用
export function getAreaTree(params) {
  return request({
    url: 'sys/area/list',
    method: 'get',
    params
  })
}
// 区域类型查询
export function getAreaType() {
  return request({
    url: 'sys/dict/code/levelType',
    method: 'get'
  })
}

// 添加区域
export function addArea(data) {
  return request({
    url: 'sys/area/add',
    method: 'post',
    data
  })
}
// 修改区域机构
export function updateArea(data) {
  return request({
    url: 'sys/area/update',
    method: 'post',
    data
  })
}
// 删除区域机构
export function delArea(id) {
  return request({
    url: 'sys/area/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}
