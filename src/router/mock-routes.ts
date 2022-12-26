import type { MenuData } from './types'

export const mockRoutes: MenuData[] = [
  {
    path: '/',
    redirect: '/home',
    component: 'Layout',
    children: [
      {
        path: '/home',
        component: '/home/index',
        meta: { title: '首页', icon: 'home', affix: 1 }
      }
    ]
  },
  // 可以根据简略的信息生成路由
  {
    path: '/about',
    meta: { title: '关于我', icon: 'bulb' }
  },
  {
    path: '/system',
    meta: { type: 1, title: '权限管理', icon: 'heart' },
    component: 'Layout',
    children: [
      {
        path: '/system/account',
        component: '/system/account',
        meta: { title: '账号管理' }
      },
      {
        path: '/system/role',
        component: '/system/role',
        meta: { title: '角色管理' }
      },
      {
        path: '/system/menu',
        component: '/system/menu',
        meta: { title: '菜单管理' }
      },
      {
        path: '/system/department',
        component: '/system/department',
        meta: { title: '部门管理' }
      }
    ]
  },
  {
    path: '/level-menu',
    meta: { type: 1, title: '嵌套菜单', icon: 'profile' },
    component: 'Layout',
    children: [
      {
        path: '/level-menu/menu1',
        component: '/level-menu/menu1/index',
        meta: { type: 1, title: '菜单1' },
        children: [
          {
            path: '/level-menu/menu1/menu1-1',
            component: '/level-menu/menu1/menu1-1/index',
            meta: { type: 1, title: '菜单1-1' },
            children: [
              {
                path: '/level-menu/menu1/menu1-1/menu1-1-1',
                component: '/level-menu/menu1/menu1-1/menu1-1-1/index',
                meta: { title: '菜单1-1-1' }
              }
            ]
          }
        ]
      },
      {
        path: '/level-menu/menu2',
        component: '/level-menu/menu2/index',
        meta: { title: '菜单2' }
      }
    ]
  }
]