/**
 * 权限管理
 */
import { asyncRouterMap, constantRouterMap } from '@/router'
import { getMenus } from '@/api/login'

/**
 * 通过meta.permission判断是否与当前用户权限匹配, 该方法暂时废弃,old
 * @param roles
 * @param route
 */
// function hasPermission(menus, route) {
//   if (route.meta && route.meta.permission) {
//     return menus.some(menu => { // 遍历menus，查找route.meta.permission是否有匹配的menu
//       route.meta.permission.includes(menu.url)
//     })
//   } else {
//     return true
//   }
// }
/**
 * 判断路由是否在菜单列表里，在则返回菜单对象，否则返回undefined
 * @param menus 菜单列表（用户拥有权限的菜单列表）
 * @param route 路由
 * @returns menu_res 匹配成功的菜单对象
 */
function getMenu(menus, route) {
  let menu_res
  if (route.meta && route.meta.permission) {
    menu_res = menus.find(menu => { // 遍历menus，查找route.meta.permission是否有匹配的menu
      return route.meta.permission.includes(menu.url)
    })
  }
  return menu_res
}

/**
 * 递归过滤异步路由表，返回符合用户权限的路由表
 * @param routes asyncRouterMap 动态路由表
 * @param menus 用户可看到的菜单项
 */
function filterAsyncRouter(routes, menus) {
  const res = []
  // 遍历每一个路由，判断是否有权限
  routes.forEach(route => {
    const tmp = { ...route }
    const menu = getMenu(menus, tmp)
    if (menu) { // 如果有权限,添加该路由,并根据url的icon更新图标
      tmp.meta.icon = menu.icon // 给route更新icon
      tmp.meta.title = menu.name // 给route更新名称
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, menus)
        if (tmp.path && tmp.children.length > 0) {
          console.log(tmp.path + '->' + tmp.children[0].path)
          tmp.redirect = tmp.children[0].path
        } else {
          tmp.redirect = '/dashboard'
        }
      }
      res.push(tmp)
    } else {
      if (!tmp.meta || (tmp.meta && !tmp.meta.permission)) {
        res.push(tmp)
      }
    }
  })
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    systems: [], // 子系统
    menus: [], // 菜单
    btns: [] // 按钮
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_SYSTEMS: (state, systems) => {
      state.systems = Array.from(systems)
    },
    SET_MENUS: (state, menus) => {
      state.menus = Array.from(menus)
    },
    SET_BTNS: (state, btns) => {
      state.btns = Array.from(btns)
    }
  },
  actions: {
    // 获取用户子系统权限
    GetSystems({ commit, state }) {
      return new Promise((resolve, reject) => {
        const params = {
          resourceType: '02' // 02 是子系统
        }
        // 获取权限内所有的子系统
        getMenus(params).then(response => { // 处理返回值
          const data = response.data
          const systems = [] // 子系统
          if (data.menus && data.menus.length > 0) {
            commit('SET_SYSTEMS', data.menus)
            for (const menu of data.menus) { // 遍历子系统资源，放入systems
              const menu_tmp = {}
              menu_tmp.id = menu.id
              menu_tmp.url = menu.url
              menu_tmp.icon = menu.icon
              menu_tmp.name = menu.name
              systems.push(menu_tmp)
            }
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户权限
    GetMenus({ commit, state }, currentSystem) {
      let params = {} // 参数
      // 若是子系统，则仅获取子系统菜单
      if (currentSystem) {
        console.log('获取' + currentSystem.name + '的菜单')
        params = {
          parentCode: currentSystem.code // 传入该子系统的code，获取子系统的权限
        }
      }
      return new Promise((resolve, reject) => {
        // 此处获取用户所有权限
        getMenus(params).then(response => { // 处理返回值
          const data = response.data
          const menus = [] // 仅菜单
          const btns = [] // 非菜单
          if (data.menus && data.menus.length > 0) {
            const allmenus = [...data.menus]
            commit('SET_MENUS', allmenus)
            for (const menu of allmenus) { // 遍历菜单，获取所有的权限项
              if (menu.resourceType === '02' || menu.resourceType === '03') { // 将是菜单的放入menus
                const menu_tmp = {}
                menu_tmp.url = menu.url
                menu_tmp.icon = menu.icon
                menu_tmp.name = menu.name
                menus.push(menu_tmp)
              }
              const btn_tmp = {}
              btn_tmp.url = menu.url
              btn_tmp.name = menu.name
              btn_tmp.icon = menu.icon
              btns.push(btn_tmp)
            }
          }
          // 过滤路由表
          const accessedRouters = filterAsyncRouter(asyncRouterMap, menus)
          commit('SET_BTNS', btns)
          commit('SET_ROUTERS', accessedRouters)
          resolve(accessedRouters)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
