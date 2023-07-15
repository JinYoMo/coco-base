import Cookies from 'js-cookie'
import { getConfig } from '@/api/login'
import { getPublicKey, setPublicKey, getCurrentSys, setCurrentSys } from '@/utils/auth'
const state = {
  sidebar: {
    opened: !+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop',
  kaptcha: '', // 验证码
  publicKey: getPublicKey(), // 公钥
  currentSystem: getCurrentSys(), // 当前子系统
  sid: '' // sid
}
const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SYS_CONFIG: (state, config) => {
    state.kaptcha = config.appKaptcha
    state.publicKey = config.publicKey
    state.sid = config.sid
    setPublicKey(config.publicKey)
  },
  SET_SYSTEM: (state, system) => {
    state.currentSystem = system
    setCurrentSys(system)
  }
}

const actions = {
  ToggleSideBar: ({ commit }) => {
    commit('TOGGLE_SIDEBAR')
  },
  CloseSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  ToggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  // 获取系统配置
  GetConfig({ commit }) {
    return new Promise((resolve, reject) => {
      getConfig().then(response => {
        const data = response.data
        commit('SYS_CONFIG', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
