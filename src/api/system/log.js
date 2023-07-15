/**
 * 日志管理接口
 */
import request from '@/utils/request'
// 操作日志查询
export function getBizLogList(params) {
  return request({
    url: 'sys/log/biz/list',
    method: 'get',
    params
  })
}
// 操作日志详情
export function getBizLogDetail(id) {
  return request({
    url: 'sys/log/biz/detail/' + id,
    method: 'get'
  })
}
// 异常日志查询
export function getErrorLogList(params) {
  return request({
    url: 'sys/log/error/list',
    method: 'get',
    params
  })
}
// 异常日志详情
export function getErrorLogDetail(id) {
  return request({
    url: 'sys/log/error/detail/' + id,
    method: 'get'
  })
}
// 日志类型查询
export function getLogType() {
  return request({
    url: 'sys/dict/code/logType',
    method: 'get'
  })
}

// 删除业务日志
export function delLog() {
  return request({
    url: 'sys/log/biz/delLog',
    method: 'post'
  })
}

// 删除异常日志
export function delErrorLog() {
  return request({
    url: 'sys/log/error/delLog',
    method: 'post'
  })
}

// 登录日志查询
export function getLoginLogList(params) {
  return request({
    url: 'sys/loginLog/list',
    method: 'get',
    params
  })
}
// 删除日志
export function delLoginLog() {
  return request({
    url: 'sys/loginLog/delLoginLog',
    method: 'post'
  })
}
