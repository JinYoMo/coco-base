import store from '../store'
/**
 * 获取系统配置辅助工具
 */
/**
 * 用来控制是否开启校验验证码
 */

export function hasKaptcha() {
  return store.getters.kaptcha
}
