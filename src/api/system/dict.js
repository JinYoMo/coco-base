/**
 * 字典接口
 */
import request from '@/utils/request'
// 字典查询
export function getDictList(params) {
  return request({
    url: 'sys/dict/listPage',
    method: 'get',
    params
  })
}

// 添加字典
export function addDict(data) {
  return request({
    url: 'sys/dict/add',
    method: 'post',
    data
  })
}
// 修改字典机构
export function updateDict(data) {
  return request({
    url: 'sys/dict/update',
    method: 'post',
    data
  })
}
// 删除字典机构
export function delDict(id) {
  return request({
    url: 'sys/dict/delete',
    method: 'post',
    data: {
      dictId: id
    }
  })
}
// 获取字典值列表
export function getDictByCode(params) {
  return request({
    url: 'sys/dict/code/' + params,
    method: 'get'
  })
}
