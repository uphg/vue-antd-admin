import type { RouteConfig } from "vue-router"
import Layout from '@/layout/index.vue'
import type { MenuData } from './types'

const modules = import.meta.glob('../views/**/*.vue')


export function generateDynamicRoute(data: MenuData[]) {
  return generateRoutes(data, handleTopLevelRoute)
}

function handleTopLevelRoute(item: MenuData) {
  if (!item.meta?.type && !item.children?.length) {
    const childPath = pathResolve(item.path, 'index')
    return {
      ...item,
      component: 'Layout',
      children: [{
        path: childPath,
        component: item.component || childPath,
        meta: cloneJson(item.meta)
      }]
    }
  } else {
    return item
  }
}

function generateRoutes(data: MenuData[], callback?: (item: MenuData, index: number) => MenuData) {
  const result: RouteConfig[] = []
  data.forEach((menu, index) => {
    const item = callback ? callback(menu, index) : menu
    const componentPath = `../views${item?.component || pathResolve(item.path, 'index')}.vue`
    result[index] = {
      path: item.path,
      redirect: item.redirect || (item.meta?.type === 1 ? item.children?.[0].path : void 0),
      name: handleRouteName(item),
      meta: item.meta,
      component: item?.component === 'Layout' ? Layout : modules[componentPath],
    }
    if (item.children?.length) {
      result[index].children = generateRoutes(item.children)
    }
  })
  return result
}

export function pathResolve(_path: string, suffix?: string) {
  const path = _path.trim()
  const newPath = (/^\/[^/]/.test(path) ? '' : '/') + path + (/[^/]\/$/.test(path) ? '' : '/')
  return newPath + suffix || ''
}

function cloneJson(value: unknown) {
  return JSON.parse(JSON.stringify(value))
}

export function handleRouteName(item: MenuData) {
  const paths = item.path.trim().split(/\/|-|_/).filter(item => !!item)
  return paths.map(item => item.replace(/^(\w)/, (_, p) => p.toUpperCase())).join('')
}
