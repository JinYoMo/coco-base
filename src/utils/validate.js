/**
 * Created by wangxiaoying on 2019/04/15
 * 字符串验证模块，通过返回true，未通过返回false
 */

/**
 * 是否是外部地址
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 合法uri*/
export function validateNull(textval) {
  return !!textval
}

/* 验证小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 验证大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 验证大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 验证邮箱
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * 验证手机号
 * @param phone
 * @returns {boolean}
 */
export function validatePhone(phone) {
  const re = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
  return re.test(phone)
}

/**
 * 验证一定范围内的非负整数
 */
export function validateIntPlus(value, min, max) {
  const re = /^\d+$/
  if (re.test(value)) {
    const data = parseInt(value)
    if (data > max || data < min) {
      return false
    }
  } else {
    return true
  }
}
/**
 * 验证一定范围内的非负小数
 */
export function validateFloatPlus(value, min, max) {
  const re = /^\d+(\.\d+)?$/
  if (re.test(value)) {
    const data = parseFloat(value)
    if (data > max || data < min) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}
