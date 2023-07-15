import store from '../store'
/**
 * 判断是否有权限
  */
export function hasPermission(permission) {
  const btns = store.getters.btns
  return btns.some(btn => { // 遍历btns，查找btn.url是否有匹配的permission，有则返回true，否则返回false
    return btn.url === permission
  })
}

// 判断用户是否为运维人员或其他管理员
export function isOperation() {
  const roleTips = store.getters.roleTips
  return roleTips.some(tip => { // 遍历btns，查找btn.url是否有匹配的permission，有则返回true，否则返回false
    return (tip === 'operation' || tip === 'administrator')
  })
}
