import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(), // token
    id: '', // id,
    account: '', // 账号
    name: '', // 姓名
    deptId: '', // 部门id
    deptName: '', // 部门名称
    avatar: '', // 头像
    attr1: '', // 备用属性
    tenantId: '', // 租户id
    roleList: [], // 角色id集合
    roleNames: [], // 角色名称集合
    roleTips: [], // 角色标签集合
    area: '' // 默认地区
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_DEPTID: (state, deptId) => {
      state.deptId = deptId
    },
    SET_DEPTNAME: (state, deptName) => {
      state.deptName = deptName
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ATTR1: (state, attr1) => {
      state.attr1 = attr1
    },
    SET_TENANT_ID: (state, tenantId) => {
      state.tenantId = tenantId
    },
    SET_ROLELIST: (state, roleList) => {
      state.roleList = roleList
    },
    SET_ROLENAMES: (state, roleNames) => {
      state.roleNames = roleNames
    },
    SET_ROLETIPS: (state, roleTips) => {
      state.roleTips = roleTips
    },

    SET_AREA: (state, area) => {
      state.area = area
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response.code === 200) {
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            resolve()
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用token自动登录接口
    TokenLogin({ commit }, token) {
      return new Promise((resolve, reject) => {
        // 如果token存在直接setToken
        if (token) {
          setToken(token)
          commit('SET_TOKEN', token)
          resolve()
        } else {
          reject()
        }
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.roleIds && data.roleIds.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLELIST', data.roleIds)
            commit('SET_ROLENAMES', data.roleNames)
            commit('SET_ROLETIPS', data.roleTips)
          } else {
            reject('该用户无角色')
          }
          if (data.deptId) {
            commit('SET_DEPTID', data.deptId)
            commit('SET_DEPTNAME', data.deptName)
          } else {
            reject('该用户无组织机构')
          }
          commit('SET_ID', data.id)
          commit('SET_ACCOUNT', data.account)
          commit('SET_NAME', data.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
