import type { RouteConfig } from "vue-router"
import Layout from '@/layout/index.vue'
import type { MenuData } from './types'

type CreateRoutesCallback = (item: RouteConfig, index: number) => MenuData

const modules = import.meta.glob('../views/**/*.vue')

export function generateRoutes(data: MenuData[], callback?: CreateRoutesCallback) {
  const newRoute = handleTopLevelRoute(data)
  return createRoutes(newRoute, callback)
}

function createRoutes(data: MenuData[], callback?: CreateRoutesCallback) {
  const result: RouteConfig[] = []
  data.forEach((menu, index) => {
    const item = menu
    const componentPath = `../views${item?.component || toPath(item.path, 'index')}.vue`
    result[index] = {
      path: item.path,
      redirect: item.redirect || (item.meta?.type === 1 ? item.children?.[0].path : void 0),
      name: createRouteName(item),
      meta: item.meta,
      component: item?.component === 'Layout' ? Layout : modules[componentPath],
    }

    callback && callback(result[index], index)
    if (item.children?.length) {
      result[index].children = createRoutes(item.children, callback)
    }
  })
  return result
}

function handleTopLevelRoute(data: MenuData[]) {
  const result: MenuData[] = []
  data.forEach((item, index) => {
    if (!item.meta?.type && !item.children?.length) {
      const childPath = toPath(item.path, 'index')
      result[index] = {
        ...item,
        meta: void 0,
        component: 'Layout',
        children: [{
          path: childPath,
          component: item.component || childPath,
          meta: Object.assign({}, item.meta)
        }]
      }
    } else {
      result[index] = item
    }
  })

  return result
}

export function createRouteName(item: MenuData) {
  const paths = item.path.trim().split(/\/|-|_/).filter(item => !!item)
  return paths.map(item => item.replace(/^(\w)/, (_, p) => p.toUpperCase())).join('')
}

export function toPath(_path: string, suffix?: string) {
  const path = _path.trim()
  const newPath = (/^\/[^/]/.test(path) ? '' : '/') + path + (/[^/]\/$/.test(path) ? '' : '/')
  return newPath + suffix || ''
}

