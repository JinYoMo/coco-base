import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar 进度条
import 'nprogress/nprogress.css' // progress bar style 进度条样式
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie
import { loginByToken, isSubSystem, sysCode } from './settings'
import Vue from 'vue'

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login', 'config/baseconfig'] // 不重定向白名单
// 全局钩子
router.beforeEach((to, from, next) => {
  NProgress.start() // 加载进度条
  // 如果有token
  const oldToken = getToken() // 获取原token
  const newToken = to.query.token
  console.log('form other system token:' + to.query.token)
  // 允许使用token登录并且新旧token不一致，使用新token重新登录
  if (loginByToken && newToken && oldToken !== newToken) {
    // 调用自动登录接口，否则跳转到登录页
    store.dispatch('TokenLogin', newToken).then(() => {
      console.log('自动登录成功')
      console.log(to.path)
      next({ ...to, replace: true }) // 登录成功继续
    }).catch(() => {
      next('/401') // 否则全部重定向到401没有权限页面
    })
  }
  // 如果cookie中已有token，直接进行下一步
  if (oldToken) {
    // 登录后进入登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // 当进入非登陆页时
      if (store.getters.roleList && store.getters.roleList.length === 0) { // 判断当前用户是否已拉取完user_info信息
        try {
          store.dispatch('GetInfo').then(() => {
            // 如果是子系统，参数为setting文件中的sysCode属性
            if (isSubSystem) {
              store.dispatch('GetMenus', { code: sysCode }).then((accessRoute) => {
                router.addRoutes(accessRoute)
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              })
            } else { // 否则直接获取全部菜单权限
              store.dispatch('GetMenus').then((accessRoute) => {
                router.addRoutes(accessRoute)
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              })
            }
          })
        } catch (err) {
          store.dispatch('FedLogOut').then(() => {
            // Message.error(err || '权限验证失败，请重新登录系统')
            next({ path: '/' })
          })
        }
      } else { // 角色不为空
        next()
      }
    }
  } else {
    // has no token
    // 免登录白名单，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 如果允许通过链接上的token登录
      // 获取链接里的token
      const token = to.query.token
      console.log('form other system token:' + to.query.token)
      if (loginByToken && token) {
        // 调用自动登录接口，否则跳转到登录页
        store.dispatch('TokenLogin', token).then(() => {
          console.log('自动登录成功')
          console.log(to.path)
          next({ ...to, replace: true }) // 登录成功继续
        }).catch(() => {
          next('/401') // 否则全部重定向到401没有权限页面
        })
      } else {
        // 判断是独立运行的子系统还是和其他基础子系统一起的
        const config = Vue.prototype.baseConfig
        if (config.singleSys) {
          next(`/login`) // 重定向到本系统登录页
        } else { // 跳转到配置的主页
          window.location.href = config.mainPage
        }
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
