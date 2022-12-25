import Vue from 'vue'
import VueRouter from 'vue-router'
import { generateDynamicRoute } from './generateRoute'
import { mockRoutes } from './mock-routes'

Vue.use(VueRouter)

export const baseRoutes = generateDynamicRoute(mockRoutes)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: baseRoutes/* navRoutes */
})

export default router
