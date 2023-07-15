/**
 * 常用接口
 */
import request from '@/utils/request'
// 模板下载
export function downloadTemplate(fileName) {
  return request({
    url: 'sys/template/download',
    method: 'get',
    params: {
      filename: fileName
    },
    responseType: 'blob' // 这一步也很关键，一定要加上 responseType 值为 blob
  })
}

// 图片上传
export function Uploadimg(fileobj) {
  const param = new FormData()
  param.append('file', fileobj.file)
  return request({
    url: 'sys/imageUpload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: param
  })
}
