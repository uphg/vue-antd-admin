import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'
import { generateRoute } from './generateRoute'
import { mockRoutes } from './mock-routes'
import { navRoutes } from './nav-routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: navRoutes
})

console.log('router')
console.log(router)

export default router
