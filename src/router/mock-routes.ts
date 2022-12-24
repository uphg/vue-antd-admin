type RouteData = {
  path: string
  name?: string
  redirect?: string
  component?: string
  meta?: { title: string, icon: string, affix?: 0 | 1 },
  children?: RouteData[]
}


export const mockRoutes: RouteData[] = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: 'home/index',
        meta: { title: '首页', icon: 'home', affix: 1 },
      }
    ]
  },
  {
    path: '/about',
    redirect: '/about/index',
    children: [
      {
        path: 'index',
        name: 'About',
        component: 'about/index',
        meta: { title: '关于我', icon: 'about' },
      }
    ]
  }

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/home',
  //   children: [
  //     {
  //       path: 'home',
  //       component: () => import('@/views/Home.vue'),
  //       name: 'Home',
  //       meta: { title: '首页', icon: 'home', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/about',
  //   redirect: '/about/index',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/About.vue'),
  //       name: 'About',
  //       meta: { title: '关于我', icon: 'about', affix: true }
  //     }
  //   ]
  // }
]