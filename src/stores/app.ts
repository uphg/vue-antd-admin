import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    collapsed: false
  }),

  actions: {
    setCollapsed(value: boolean) {
      this.collapsed = value
    }
  }
})
