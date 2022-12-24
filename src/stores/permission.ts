import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { RouteConfig } from 'vue-router'

type PermissionStore = { menus: Ref<RouteConfig[]>, setMenus: (value: RouteConfig[]) => void }

export const usePermissionStore = defineStore<string, PermissionStore>('permission', () => {
  const menus = ref<RouteConfig[]>([])
  function setMenus(value: RouteConfig[]) {
    menus.value = value
  }

  return { menus, setMenus }
})
