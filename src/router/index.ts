import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'
import { generateRoute } from './generateRoute'
import { mockRoutes } from './mock-route'

Vue.use(VueRouter)

const modules = import.meta.glob('../views/**/*.vue')

const routes = generateRoute(mockRoutes)
const routes2 = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
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
    children: [
      {
        path: 'index',
        component: () => import('@/views/about/index.vue'),
        name: 'About',
        meta: { title: '关于我', icon: 'about', affix: true }
      }
    ]
  }
]

const routes3 = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: modules['../views/home/index.vue'],
        name: 'Home',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/about',
    redirect: '/about/index',
    component: Layout,
    children: [
      {
        path: 'index',
        component: modules['../views/about/index.vue'],
        name: 'About',
        meta: { title: '关于我', icon: 'about', affix: true }
      }
    ]
  }
]
console.log('routes')
console.log(routes)

console.log('routes3')
console.log(routes3)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: routes
})

export default router
