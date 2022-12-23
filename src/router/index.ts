import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/Home.vue'),
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
          component: () => import('@/views/About.vue'),
          name: 'About',
          meta: { title: '关于我', icon: 'about', affix: true }
        }
      ]
    }
  ]
})

export default router
