import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/element-variables.scss'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
Vue.use(ElementUI, { locale })
import '@/styles/index.scss' // global css

import '@/icons' // icon
import '@/permission' // permission control

// 注册全局自定义布局组件
import NormalTable from '@/components/NormalTable/index'
import SearchArea from '@/components/SearchArea/SearchArea'
import SearchItem from '@/components/SearchArea/SearchItem'
import AppContainer from '@/components/layout/AppContainer'

Vue.component('app-container', AppContainer)
Vue.component('normal-table', NormalTable)
Vue.component('search-area', SearchArea)
Vue.component('search-item', SearchItem)

import resize from '@/directive/resize/resize' // resize directive
Vue.directive('resize', resize)

import { hasPermission } from './utils/permission'
Vue.prototype.hasPerm = hasPermission

Vue.config.productionTip = false

import axios from 'axios'
import service from '@/utils/request'
axios.get('./config/project.config.json').then((result) => {
  console.log('get config')
  Vue.prototype.baseConfig = result.data
  document.title = result.data.title // 首先设置网页的title
  service.defaults.baseURL = result.data.baseUrl // 设置默认请求网址
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}).catch((error) => {
  console.error('get baseConfig error...' + error)
})
