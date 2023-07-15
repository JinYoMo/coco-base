/* Layout */
import Layout from '@/layout/Layout'
export const exampleRouters = [{
  path: 'example',
  component: Layout,
  redirect: '/exampleTable',
  name: 'Example',
  alwaysShow: true,
  meta: {
    title: '示例',
    icon: 'icon-config' // 图标
  },
  children: [
    {
      path: '/exampleTable',
      name: 'ExampleTable',
      component: () => import('@/views/example/tableExample'),
      meta: { title: '表格示例', icon: '' }
    }
  ]
}]
