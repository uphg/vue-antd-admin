import Layout from '../layout/index.vue'

// 0 目录，1 菜单
export const navRoutes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    name: 'Index',
    type: 1,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/about',
    redirect: '/about/index',
    component: Layout,
    name: 'About',
    type: 1,
    children: [
      {
        path: '/about/index',
        component: () => import('@/views/about/index.vue'),
        name: 'AboutIndex',
        meta: { title: '关于我', icon: 'bulb', affix: true }
      }
    ]
  },
  {
    path: '/system',
    redirect: '/system/account',
    meta: { title: '权限管理', icon: 'heart' },
    component: Layout,
    name: 'System',
    type: 0,
    children: [
      {
        path: '/system/account',
        component: () => import('@/views/system/account.vue'),
        name: 'SystemAccount',
        meta: { title: '账号管理' }
      },
      {
        path: '/system/role',
        component: () => import('@/views/system/role.vue'),
        name: 'SystemRole',
        meta: { title: '角色管理' }
      },
      {
        path: '/system/menu',
        component: () => import('@/views/system/menu.vue'),
        name: 'SystemMenu',
        meta: { title: '菜单管理' }
      },
      {
        path: '/system/department',
        component: () => import('@/views/system/department.vue'),
        name: 'SystemDepartment',
        meta: { title: '部门管理' }
      },
    ]
  },
  {
    path: '/level-menu',
    redirect: '/level-menu/menu1',
    meta: { title: '菜单嵌套', icon: 'profile' },
    component: Layout,
    name: 'LevelMenu',
    type: 0,
    children: [
      {
        path: '/level-menu/menu1',
        component: () => import('@/views/level-menu/menu1/index.vue'),
        name: 'LevelMenuMenu1',
        meta: { title: '菜单1' },
        children: [
          {
            path: '/level-menu/menu1/menu1-1',
            component: () => import('@/views/level-menu/menu1/menu1-1/index.vue'),
            name: 'LevelMenuMenu1Menu1-1',
            meta: { title: '菜单1-1' },
            children: [
              {
                path: '/level-menu/menu1/menu1-1/menu1-1-1',
                component: () => import('@/views/level-menu/menu1/menu1-1/menu1-1-1/index.vue'),
                name: 'LevelMenuMenu1Menu1-1Menu1-1-1',
                type: 1,
                meta: { title: '菜单1-1-1' }
              }
            ]
          }
        ]
      },
      {
        path: '/level-menu/menu2',
        component: () => import('@/views/level-menu/menu2/index.vue'),
        name: 'LevelMenuMenu2',
        meta: { title: '菜单2' }
      }
    ]
  }
]