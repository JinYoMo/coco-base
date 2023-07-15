import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      console.log('request.js  gettoken')
      config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      console.log(config.headers['token'])
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // 如果是文件
    if (res instanceof Blob) {
      return response
    } else if (res.code !== 200) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 401 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        Message({
          showClose: true,
          message: res.message,
          type: 'error',
          duration: 3000
        })
        return Promise.reject(res)
      }
      // return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    // 如果是下载文件返回的错误
    if (error.response && error.response.data instanceof Blob) {
      // 将blob强制转换为JSON
      var reader = new FileReader()
      reader.onload = e => {
        const err = JSON.parse(e.target.result)
        Message({
          showClose: true,
          message: err.message,
          type: 'error',
          duration: 3000
        })
      }
    } else if (error.response && error.response.data) {
      console.log('错误:' + error.response.data.message) // for debug
      // Message.error(error.response.data.message)
      Message({
        showClose: true,
        message: error.response.data.message,
        type: 'error',
        duration: 3000
      })
    } else if (error.message) {
      Message({
        showClose: true,
        message: error.message,
        type: 'error',
        duration: 3000
      })
    }

    return Promise.reject(error)
  }
)

export default service
