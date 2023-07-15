/* Layout */
import Layout from '@/layout/Layout'
export const systemRouters = [{
  path: 'system',
  component: Layout,
  redirect: '/resource',
  name: 'System',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'icon-config', // 图标
    permission: ['/system']// 权限名称
  },
  children: [
    {
      path: '/resource',
      name: 'Resource',
      component: () => import('@/views/system/resource/listResource'),
      meta: { title: '资源管理', icon: 'function', permission: ['/sys/resource'] }
    },
    {
      path: '/dict',
      name: 'Dict',
      component: () => import('@/views/system/dict/listDict'),
      meta: { title: '字典管理', icon: 'function', permission: ['/sys/dict'] }
    },
    {
      path: '/area',
      name: 'Area',
      component: () => import('@/views/system/area/listArea'),
      meta: { title: '区域管理', icon: 'function', permission: ['/sys/area'] }
    },
    {
      path: '/dept',
      name: 'Dept',
      component: () => import('@/views/system/dept/listDept'),
      meta: { title: '组织管理', icon: 'tree', permission: ['/sys/dept'] }
    },
    {
      path: '/role',
      component: () => import('@/views/system/role/listRole'), // Parent router-view
      name: 'Role',
      meta: { title: '角色管理', permission: ['/sys/role'] }
    },
    {
      path: '/user',
      component: () => import('@/views/system/user/listUser'), // Parent router-view
      name: 'User',
      meta: { title: '用户管理', permission: ['/sys/mgr'] }
    },
    {
      path: '/bizLog',
      component: () => import('@/views/system/log/listLog'), // Parent router-view
      name: 'BusinessLog',
      meta: { title: '日志管理', permission: ['/sys/log/biz/list'] }
    },
    {
      path: '/errLog',
      component: () => import('@/views/system/log/listErrorLog'), // Parent router-view
      name: 'ErrorLog',
      meta: { title: '日志管理', permission: ['/sys/log/error/list'] }
    },
    {
      path: '/loginLog',
      component: () => import('@/views/system/log/loginLog'), // Parent router-view
      name: 'LoginLog',
      meta: { title: '登录日志', permission: ['/sys/loginLog/list'] }
    }
  ]
}]
