import type { RouteConfig } from "vue-router"
import Layout from '@/layout/index.vue'
import { camelize } from '@/utils'

type RouteData = {
  path: string
  name?: string
  redirect?: string
  component?: string
  meta?: { title: string, icon: string, affix?: 0 | 1 },
  children?: RouteData[]
}



const modules = import.meta.glob('../views/**/*.vue')

export function generateRoute(data: RouteData[]) {
  const result: RouteConfig[] = []

  data.forEach((item) => {
    const component = item.children?.[0].component
    const route = {
      path: item.path,
      redirect: item.redirect,
      component: Layout,
      children: [
        {
          path: item.children?.[0].path,
          component: modules[`../view/${component}.vue`],
          name: item.children?.[0].name,
          meta: item.children?.[0].meta
        }
      ]
    }
    result.push(route)
  })

  return result
}