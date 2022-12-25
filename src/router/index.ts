import Vue from 'vue'
import VueRouter from 'vue-router'
import { createRouter } from '@/composables'
import { generateRoutes } from './generateRoutes'
import { mockRoutes } from './mock-routes'

export const baseRoutes = generateRoutes(mockRoutes)

Vue.use(VueRouter)

const router = createRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: baseRoutes/* navRoutes */
})

export default router
