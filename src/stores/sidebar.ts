import { defineStore } from 'pinia'

export const useSidebarStore = defineStore({
  id: 'sidebar',
  state: () => ({
    collapsed: false
  }),

  actions: {
    setCollapsed(value: boolean) {
      this.collapsed = value
    }
  }
})
