import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

/** 自动添加全部modules文件夹下所有文件
 * 使用required.context实现从文件夹下自动化导入模块,
 * required.context(读取文件路径，是否遍历文件夹子目录，匹配文件的正则),返回一个函数，此函数有3个属性
 * modulesFiles.keys()返回匹配成功模块的名字(如./app.js)的数组
 **/
const modulesFiles = require.context('./modules', true, /\.js$/)
// arr.reduce(function(prev,cur,index,arr){...},init),
// 其中arr表示原数组，prev表示上次调用回调的返回值，cur当前正在处理的数组元素
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
const store = new Vuex.Store({
  modules,
  getters
})

export default store
