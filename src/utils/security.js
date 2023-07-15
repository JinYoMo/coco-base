/**
 * 加密工具类
 * Created by wangxiaoying 2019/04/17
 * **/
import JsEncrypt from 'jsencrypt'
import store from '../store'

/**
 * 加密
 * @param value 待加密数据
 * @returns 加密结果
 */
export function RSAencrypt(value) {
  var encrypt = new JsEncrypt()
  // 如果公钥没有了，重新申请公钥
  if (store.getters.publicKey && store.getters.publicKey === '') {
    store.dispatch('GetConfig').then(() => {
      encrypt.setPublicKey(store.getters.publicKey)// 从store中读取公钥
      var enRes = encrypt.encrypt(value)
      console.log('加密结果为：' + enRes)
      return enRes
    }).catch((e) => {
      this.loading = false
    })
  } else {
    encrypt.setPublicKey(store.getters.publicKey)// 从store中读取公钥
    var enRes = encrypt.encrypt(value)
    console.log('加密结果为：' + enRes)
    return enRes
  }
}

