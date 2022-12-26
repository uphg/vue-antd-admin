import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const collapsed = ref(false)

  function setCollapsed(value: boolean) {
    collapsed.value = value
  }

  return { collapsed, setCollapsed }
})
