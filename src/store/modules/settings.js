import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, breadcrumb, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme, // 主题
  showSettings: showSettings, // 是否显示设置按钮
  breadcrumb: breadcrumb, // 是否显示面包屑
  tagsView: tagsView, // 是否显示tagsView
  fixedHeader: fixedHeader, // 是否固定面包屑
  sidebarLogo: sidebarLogo, // 是否显示logo
  bodyHeight: 400 // 内容高度
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state, 'key')) {
      state[key] = value
    }
  },
  SET_BODY_HEIGHT: (state, height) => {
    state.bodyHeight = height
    console.log('bodyHeight', height)
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  ChangeHeight({ commit }, height) {
    commit('SET_BODY_HEIGHT', height)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

