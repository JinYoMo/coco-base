import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/layout/Layout'
import { systemRouters } from './modules/system'
import { exampleRouters } from './modules/example'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
/**
 * 静态路由
 */
export const constantRouterMap = [
  { // 重定向
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 登录页面
  { path: '/login', component: () => import('@/views/login/index_2'), hidden: true },
  // 404错误页面
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  // 401 错误页面
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  // 主页
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    name: '/',
    // hidden: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
    }]
  }
]
// 实例化vue的时候直挂载constantRouter
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步挂载路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  ...exampleRouters,
  ...systemRouters,
  { path: '*', redirect: '/404', hidden: true }
]
